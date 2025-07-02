import axios, { AxiosResponse, AxiosError } from 'axios';
import { ChatMessage, ModelInfo, ApiResponse, ExtensionConfig, WebSearchResult } from '../types';
import { debugManager } from '../core/DebugManager';
import { errorHandler } from '../core/ErrorHandler';

/**
 * Enhanced API Service with debugging and error handling
 * Service for handling API communications with OpenRouter and web search
 */
export class ApiService {
    private static readonly OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
    private static readonly DEFAULT_TIMEOUT = 300000; // 5 minutes for large responses
    private static readonly MAX_RETRIES = 3;

    /**
     * Call OpenRouter API for streaming chat completions with progressive response
     */
    public static async streamChatCompletion(
        messages: ChatMessage[],
        config: ExtensionConfig,
        onChunk: (chunk: string) => void,
        onError?: (error: Error) => void,
        onComplete?: () => void
    ): Promise<string> {
        const sessionId = `api_stream_completion_${Date.now()}`;
        const startTime = Date.now();

        debugManager.startDebugSession(sessionId, {
            operation: 'stream_chat_completion',
            model: config.model,
            messageCount: messages.length,
            temperature: config.temperature
        });

        try {
            // Validate and fix model name if needed
            let modelName = config.model;
            if (modelName === 'openai/gpt-4.1-mini') {
                modelName = 'openai/gpt-4o-mini';
                console.warn('⚠️ Fixed invalid model name: openai/gpt-4.1-mini → openai/gpt-4o-mini');
            }

            const requestData = {
                model: modelName,
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                temperature: config.temperature,
                // No token limit - allow unlimited generation
                stream: true
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`,
                'HTTP-Referer': 'https://github.com/flex/flex-chatbot',
                'X-Title': 'Flex Chat Bot'
            };

            let fullResponse = '';

            const response = await axios.post(
                `${this.OPENROUTER_BASE_URL}/chat/completions`,
                requestData,
                {
                    headers,
                    timeout: this.DEFAULT_TIMEOUT,
                    responseType: 'stream'
                }
            );

            let chunkCount = 0;
            let totalBytes = 0;
            let lastChunkTime = Date.now();
            const MAX_RESPONSE_SIZE = 10 * 1024 * 1024; // 10MB limit
            const CHUNK_TIMEOUT = 30000; // 30 seconds per chunk

            return new Promise((resolve, reject) => {
                // Set up chunk timeout monitoring
                const chunkTimer = setInterval(() => {
                    const timeSinceLastChunk = Date.now() - lastChunkTime;
                    if (timeSinceLastChunk > CHUNK_TIMEOUT) {
                        debugManager.addDebugStep(sessionId, 'chunk_timeout', {
                            timeSinceLastChunk,
                            chunkCount,
                            responseLength: fullResponse.length
                        });
                        clearInterval(chunkTimer);
                        reject(new Error(`Streaming timeout: no data received for ${timeSinceLastChunk}ms`));
                    }
                }, 5000);
                response.data.on('data', (chunk: Buffer) => {
                    try {
                        chunkCount++;
                        totalBytes += chunk.length;
                        lastChunkTime = Date.now();

                        debugManager.addDebugStep(sessionId, 'chunk_received', {
                            chunkNumber: chunkCount,
                            chunkSize: chunk.length,
                            totalBytes,
                            responseLength: fullResponse.length
                        });

                        // Check for memory safety
                        if (fullResponse.length > MAX_RESPONSE_SIZE) {
                            clearInterval(chunkTimer);
                            debugManager.addDebugStep(sessionId, 'response_too_large', {
                                responseLength: fullResponse.length,
                                maxSize: MAX_RESPONSE_SIZE
                            });
                            reject(new Error(`Response too large: ${fullResponse.length} bytes exceeds ${MAX_RESPONSE_SIZE} bytes`));
                            return;
                        }

                        const chunkStr = chunk.toString('utf8');
                        const lines = chunkStr.split('\n');
                        
                        for (let i = 0; i < lines.length; i++) {
                            const lineRaw = lines[i];
                            if (!lineRaw) continue;
                            const line = lineRaw.trim();
                            
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6).trim();
                                
                                if (data === '[DONE]') {
                                    clearInterval(chunkTimer);
                                    const duration = Date.now() - startTime;
                                    debugManager.addDebugStep(sessionId, 'stream_completed', {
                                        chunkCount,
                                        totalBytes,
                                        responseLength: fullResponse.length
                                    });
                                    debugManager.endDebugSession(sessionId, {
                                        success: true,
                                        duration,
                                        responseLength: fullResponse.length,
                                        chunks: chunkCount
                                    });
                                    if (onComplete) onComplete();
                                    resolve(fullResponse);
                                    return;
                                }
                                
                                if (data && data !== '') {
                                    try {
                                        const parsed = JSON.parse(data);
                                        const content = parsed.choices?.[0]?.delta?.content;
                                        
                                        if (content && typeof content === 'string') {
                                            fullResponse += content;
                                            onChunk(content);
                                            
                                            // Log progress every 100 chunks
                                            if (chunkCount % 100 === 0) {
                                                debugManager.addDebugStep(sessionId, 'progress_update', {
                                                    chunkCount,
                                                    responseLength: fullResponse.length,
                                                    avgChunkSize: totalBytes / chunkCount
                                                });
                                            }
                                        }
                                    } catch (parseError) {
                                        debugManager.addDebugStep(sessionId, 'json_parse_error', {
                                            error: (parseError as Error).message,
                                            data: data.substring(0, 200), // First 200 chars for debugging
                                            chunkNumber: chunkCount,
                                            lineNumber: i
                                        });
                                        // Continue processing other lines instead of failing
                                    }
                                }
                            } else if (line.startsWith('event:') || line.startsWith('id:')) {
                                // SSE metadata, ignore but log
                                debugManager.addDebugStep(sessionId, 'sse_metadata', { line });
                            }
                        }
                    } catch (chunkError) {
                        clearInterval(chunkTimer);
                        debugManager.addDebugStep(sessionId, 'chunk_processing_error', {
                            error: (chunkError as Error).message,
                            chunkNumber: chunkCount,
                            chunkSize: chunk?.length || 0
                        });
                        if (onError) onError(chunkError as Error);
                        reject(chunkError);
                    }
                });

                response.data.on('error', (error: Error) => {
                    clearInterval(chunkTimer);
                    debugManager.addDebugStep(sessionId, 'stream_error', {
                        error: error.message,
                        chunkCount,
                        responseLength: fullResponse.length,
                        totalBytes
                    });
                    debugManager.endDebugSession(sessionId, {
                        success: false,
                        error: error.message,
                        duration: Date.now() - startTime,
                        chunks: chunkCount
                    });
                    if (onError) onError(error);
                    reject(error);
                });

                response.data.on('end', () => {
                    clearInterval(chunkTimer);
                    const duration = Date.now() - startTime;
                    
                    debugManager.addDebugStep(sessionId, 'stream_ended', {
                        chunkCount,
                        responseLength: fullResponse.length,
                        totalBytes,
                        hasResponse: !!fullResponse
                    });
                    
                    if (fullResponse && fullResponse.length > 0) {
                        debugManager.endDebugSession(sessionId, {
                            success: true,
                            duration,
                            responseLength: fullResponse.length,
                            chunks: chunkCount
                        });
                        if (onComplete) onComplete();
                        resolve(fullResponse);
                    } else {
                        const error = new Error('Stream ended without complete response');
                        debugManager.endDebugSession(sessionId, {
                            success: false,
                            error: error.message,
                            duration,
                            chunks: chunkCount
                        });
                        if (onError) onError(error);
                        reject(error);
                    }
                });
            });

        } catch (error) {
            const duration = Date.now() - startTime;
            debugManager.endDebugSession(sessionId, {
                success: false,
                error: (error as Error).message,
                duration
            });
            
            if (onError) onError(error as Error);
            throw error;
        }
    }

    /**
     * Call OpenRouter API for chat completions with enhanced debugging and error handling
     */
    public static async chatCompletion(
        messages: ChatMessage[],
        config: ExtensionConfig
    ): Promise<string> {
        const sessionId = `api_chat_completion_${Date.now()}`;
        const startTime = Date.now();

        debugManager.startDebugSession(sessionId, {
            operation: 'chat_completion',
            model: config.model,
            messageCount: messages.length,
            maxTokens: config.maxTokens,
            temperature: config.temperature
        });

        try {
            // Validate and fix model name if needed
            let modelName = config.model;
            if (modelName === 'openai/gpt-4.1-mini') {
                modelName = 'openai/gpt-4o-mini'; // Fix incorrect model name
                console.warn('⚠️ Fixed invalid model name: openai/gpt-4.1-mini → openai/gpt-4o-mini');
            }

            const requestData = {
                model: modelName,
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                temperature: config.temperature,
                // No token limit - allow unlimited generation
                stream: false
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`,
                'HTTP-Referer': 'https://github.com/flex/flex-chatbot',
                'X-Title': 'Flex Chat Bot'
            };

            debugManager.addDebugStep(sessionId, 'request_prepared', {
                model: config.model,
                tokenLimit: config.maxTokens
            });

            let lastError: Error | null = null;

            for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
                try {
                    debugManager.addDebugStep(sessionId, `attempt_${attempt}`, { attempt });

                    const response: AxiosResponse<ApiResponse> = await axios.post(
                        `${this.OPENROUTER_BASE_URL}/chat/completions`,
                        requestData,
                        {
                            headers,
                            timeout: config.timeout || this.DEFAULT_TIMEOUT,
                            validateStatus: (status) => status < 500 // Retry on 5xx errors
                        }
                    );

                    debugManager.addDebugStep(sessionId, 'response_received', {
                        status: response.status,
                        hasContent: !!response.data?.choices?.[0]?.message?.content
                    });

                    if (response.data?.choices?.[0]?.message?.content) {
                        const content = response.data.choices[0].message.content;
                        const duration = Date.now() - startTime;

                        debugManager.trackPerformance('api_chat_completion', duration, {
                            model: config.model,
                            attempts: attempt,
                            responseLength: content.length
                        });

                        debugManager.endDebugSession(sessionId, {
                            success: true,
                            duration,
                            attempts: attempt,
                            responseLength: content.length
                        });

                        return content;
                    } else {
                        throw new Error('Invalid response format from API');
                    }

                } catch (error) {
                    debugManager.addDebugStep(sessionId, `attempt_${attempt}_failed`, {
                        error: (error as Error).message,
                        status: (error as AxiosError)?.response?.status
                    });

                    lastError = this.handleApiError(error as AxiosError, attempt);

                    if (attempt === this.MAX_RETRIES) {
                        const errorResult = await errorHandler.handleError(lastError, {
                            component: 'api',
                            operation: 'chat_completion',
                            retryCount: attempt,
                            sessionId
                        });

                        debugManager.endDebugSession(sessionId, {
                            success: false,
                            error: lastError.message,
                            attempts: attempt,
                            duration: Date.now() - startTime
                        });

                        throw new Error(errorResult.userMessage);
                    }

                    // Exponential backoff
                    const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
                    debugManager.addDebugStep(sessionId, 'backoff_delay', { delay });
                    await this.sleep(delay);
                }
            }

            throw lastError || new Error('Unknown API error');

        } catch (error) {
            const duration = Date.now() - startTime;
            debugManager.trackPerformance('api_chat_completion_failed', duration, {
                model: config.model,
                error: (error as Error).message
            });

            debugManager.endDebugSession(sessionId, {
                success: false,
                error: (error as Error).message,
                duration
            });

            throw error;
        }
    }

    /**
     * Fetch available models from OpenRouter with debugging
     */
    public static async fetchAvailableModels(apiKey: string): Promise<ModelInfo[]> {
        const sessionId = `fetch_models_${Date.now()}`;
        const startTime = Date.now();

        debugManager.startDebugSession(sessionId, { operation: 'fetch_models' });

        try {
            const response = await axios.get(`${this.OPENROUTER_BASE_URL}/models`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'https://github.com/flex/flex-chatbot',
                    'X-Title': 'Flex Chat Bot'
                },
                timeout: this.DEFAULT_TIMEOUT
            });

            if (response.data?.data && Array.isArray(response.data.data)) {
                const models = response.data.data.map((model: any) => ({
                    id: model.id,
                    description: model.description || '',
                    context_length: model.context_length || 0,
                    pricing: model.pricing ? {
                        prompt: parseFloat(model.pricing.prompt) || 0,
                        completion: parseFloat(model.pricing.completion) || 0
                    } : undefined
                }));

                debugManager.endDebugSession(sessionId, {
                    success: true,
                    modelsCount: models.length
                });

                return models;
            }

            debugManager.endDebugSession(sessionId, {
                success: true,
                modelsCount: 0
            });

            return [];
        } catch (error) {
            const errorResult = await errorHandler.handleError(error as Error, {
                component: 'api',
                operation: 'fetch_models',
                sessionId
            });

            debugManager.endDebugSession(sessionId, {
                success: false,
                error: (error as Error).message,
                duration: Date.now() - startTime
            });

            throw new Error(errorResult.userMessage);
        }
    }

    /**
     * Perform web search using SerpAPI (with fallback options)
     */
    public static async performWebSearch(query: string): Promise<WebSearchResult[]> {
        try {
            // First try with demo API key (limited but free)
            const response = await axios.get('https://serpapi.com/search.json', {
                params: {
                    q: query,
                    api_key: 'demo',
                    num: 5,
                    format: 'json'
                },
                timeout: 10000
            });

            if (response.data?.organic_results) {
                return response.data.organic_results.map((result: any) => ({
                    title: result.title || 'No title',
                    snippet: result.snippet || 'No description available',
                    link: result.link || '#'
                }));
            }

            return [];
        } catch (error) {
            console.warn('Web search failed:', error);
            // Return empty results rather than throwing - web search is optional
            return [];
        }
    }

    /**
     * Format web search results for AI consumption
     */
    public static formatWebSearchResults(results: WebSearchResult[]): string {
        if (results.length === 0) {
            return 'No web search results found.';
        }

        return results
            .map((result, index) =>
                `[${index + 1}] ${result.title}\n${result.snippet}\nURL: ${result.link}\n`
            )
            .join('\n');
    }

    /**
     * Validate API key format
     */
    public static validateApiKey(apiKey: string): boolean {
        if (!apiKey || typeof apiKey !== 'string') {
            return false;
        }

        // Basic validation - OpenRouter keys typically start with 'sk-or-'
        const trimmedKey = apiKey.trim();
        return trimmedKey.length > 20 && /^sk-/.test(trimmedKey);
    }

    /**
     * Test API connectivity
     */
    public static async testApiConnection(apiKey: string): Promise<boolean> {
        try {
            const models = await this.fetchAvailableModels(apiKey);
            return models.length > 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * Handle API errors with appropriate user-friendly messages
     */
    private static handleApiError(error: AxiosError, attempt: number): Error {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as any;

            switch (status) {
                case 401:
                    return new Error('Invalid API key. Please check your OpenRouter API key in settings.');
                case 402:
                    return new Error('Insufficient credits. Please add credits to your OpenRouter account.');
                case 403:
                    return new Error('Access forbidden. Please check your API key permissions.');
                case 429:
                    return new Error('Rate limit exceeded. Please wait a moment before trying again.');
                case 500:
                case 502:
                case 503:
                case 504:
                    if (attempt < this.MAX_RETRIES) {
                        return new Error(`Server error (${status}). Retrying... (attempt ${attempt})`);
                    }
                    return new Error('Server is currently unavailable. Please try again later.');
                default:
                    return new Error(
                        data?.error?.message ||
                        `API error ${status}: ${error.response.statusText}`
                    );
            }
        } else if (error.code === 'ECONNABORTED') {
            return new Error('Request timed out. Please check your internet connection.');
        } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            return new Error('Unable to connect to the API. Please check your internet connection.');
        } else {
            return new Error(`Network error: ${error.message}`);
        }
    }

    /**
     * Extract error message from various error types
     */
    private static getErrorMessage(error: any): string {
        if (error?.response?.data?.error?.message) {
            return error.response.data.error.message;
        }
        if (error?.message) {
            return error.message;
        }
        return 'Unknown error occurred';
    }

    /**
     * Sleep utility for retry delays
     */
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get model pricing information formatted for display
     */
    public static formatModelPricing(model: ModelInfo): string {
        if (!model.pricing) {
            return 'Pricing N/A';
        }

        const promptPrice = (model.pricing.prompt * 1000).toFixed(6);
        const completionPrice = (model.pricing.completion * 1000).toFixed(6);

        return `$${promptPrice}/$${completionPrice} per 1K tokens`;
    }

    /**
     * Get recommended models for Flex programming
     */
    public static getRecommendedModels(): string[] {
        return [
            'openai/gpt-4o-mini',
            'openai/gpt-4o',
            'openai/gpt-4-turbo',
            'anthropic/claude-3.5-sonnet',
            'anthropic/claude-3-haiku',
            'google/gemini-flash-1.5',
            'mistralai/mistral-small'
        ];
    }
} 