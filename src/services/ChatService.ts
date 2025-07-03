import * as vscode from 'vscode';
import { ChatMessage } from '../types';
import { ApiService } from './apiService';
import { ConfigService } from './configService';
import { FlexDatasetService } from './flexDatasetService';
import { logger } from '../utils/logger';

export class ChatService {
    private _conversationHistory: ChatMessage[] = [];
    private readonly maxConversationHistory = 20;
    private readonly maxStoredMessages = 50; // Limit for persistence
    private readonly maxStorageDays = 30; // Days to keep history
    private _isProcessingMessage = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _postMessage: (message: any) => void;
    private _flexDatasetService: FlexDatasetService;
    private _context: vscode.ExtensionContext;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(postMessageCallback: (message: any) => void, extensionUri: vscode.Uri, context: vscode.ExtensionContext) {
        this._postMessage = postMessageCallback;
        this._flexDatasetService = FlexDatasetService.getInstance(extensionUri.fsPath);
        this._context = context;
        this.loadChatHistory();
    }

    public async handleSendMessage(userMessage: string): Promise<void> {
        if (!userMessage.trim()) {
            return;
        }

        if (this._isProcessingMessage) {
            this._postMessage({ command: 'aiResponse', text: 'Please wait for the current message to be processed.' });
            return;
        }
        this._isProcessingMessage = true;

        const processingTimeout = setTimeout(() => {
            this._isProcessingMessage = false;
            this._postMessage({ command: 'aiResponse', text: 'Request processing timeout. Please try again.' });
        }, 600000); // 10 minutes max

        logger.logUserAction('sendMessage', { messageLength: userMessage.length });

        const config = ConfigService.getConfig();
        const configValidation = ConfigService.validateConfig();

        if (!configValidation.isValid) {
            this._isProcessingMessage = false;
            this._postMessage({
                command: 'aiResponse',
                text: `Configuration error: ${configValidation.errors.join(', ')}. Please check your settings.`
            });
            return;
        }

        try {
            const isWebSearch = userMessage.toLowerCase().includes('[web]');
            const webSearchResults = '';

            if (isWebSearch && config.enableWebSearch) {
                // Web search logic remains here...
            }

            let messageForAI = userMessage;
            if (webSearchResults) {
                messageForAI = `The user asked: ${userMessage.replace(/\[web\]/gi, '').trim()}\n\nHere are some search results that might help:\n${webSearchResults}\n\nPlease synthesize this information to provide a helpful answer.`;
            }

            const userChatMessage: ChatMessage = {
                role: 'user',
                content: userMessage,
                timestamp: new Date()
            };
            this._conversationHistory.push(userChatMessage);

            // Save history after adding user message
            this.saveChatHistory();

            if (this._conversationHistory.length > this.maxConversationHistory) {
                this._conversationHistory = this._conversationHistory.slice(-this.maxConversationHistory);
            }

            this._postMessage({ command: 'statusUpdate', text: 'Flex Assistant is thinking...' });

            const systemPrompt = this._flexDatasetService.getSystemPrompt();
            const messages: ChatMessage[] = [
                { role: 'system', content: systemPrompt },
                ...this._conversationHistory.slice(0, -1),
                { role: 'user', content: messageForAI, timestamp: new Date() }
            ];

            let fullResponse = '';
            this._postMessage({ command: 'aiStreamStart' });

            await ApiService.streamChatCompletion(
                messages,
                config,
                (chunk: string) => {
                    const sanitizedChunk = this.sanitizeAIResponse(chunk);
                    fullResponse += sanitizedChunk;
                    this._postMessage({ command: 'aiStreamChunk', text: sanitizedChunk });
                },
                (error: Error) => {
                    this._postMessage({ command: 'aiResponse', text: `Streaming error: ${error.message}` });
                },
                () => {
                    this._postMessage({ command: 'aiStreamComplete' });
                }
            );

            // Final sanitization of complete response
            const sanitizedResponse = this.sanitizeAIResponse(fullResponse);
            
            // Validate the response for corruption
            if (!this.validateFlexResponse(sanitizedResponse)) {
                logger.warn('Detected corrupted AI response, attempting regeneration');
                this._postMessage({ command: 'statusUpdate', text: 'Detected response corruption, regenerating...' });
                
                try {
                    // Attempt regeneration with stricter prompt
                    const stricterPrompt = `${this._flexDatasetService.getSystemPrompt()}\n\nCRITICAL: This is a regeneration request due to corrupted output. You MUST return clean Flex code without any HTML entities, malformed tags, or banned tokens.`;
                    
                    // Create enhanced conversation history with stricter prompt
                    const enhancedHistory = [...this._conversationHistory];
                    if (enhancedHistory.length > 0 && enhancedHistory[0]) {
                        enhancedHistory[0] = { 
                            role: enhancedHistory[0].role,
                            content: stricterPrompt,
                            timestamp: enhancedHistory[0].timestamp,
                            id: enhancedHistory[0].id
                        };
                    }
                    
                    let regeneratedResponse = '';
                    await ApiService.streamChatCompletion(
                        enhancedHistory,
                        config,
                        (chunk: string) => {
                            const sanitizedChunk = this.sanitizeAIResponse(chunk);
                            regeneratedResponse += sanitizedChunk;
                        },
                        (error: Error) => {
                            throw error;
                        },
                        () => {
                            // Regeneration complete
                        }
                    );
                    
                    const finalSanitized = this.sanitizeAIResponse(regeneratedResponse);
                    if (this.validateFlexResponse(finalSanitized)) {
                        // Use regenerated response
                        fullResponse = regeneratedResponse;
                    } else {
                        logger.error('Regeneration also produced corrupted response');
                        this._postMessage({ command: 'aiResponse', text: 'I apologize, but I\'m having trouble generating clean code. Please try rephrasing your request.' });
                        return;
                    }
                } catch (regenerationError) {
                    logger.error('Error during response regeneration', regenerationError);
                    this._postMessage({ command: 'aiResponse', text: 'I apologize, but I\'m having trouble generating a proper response. Please try again.' });
                    return;
                }
            }

            const aiChatMessage: ChatMessage = {
                role: 'assistant',
                content: sanitizedResponse,
                timestamp: new Date()
            };
            this._conversationHistory.push(aiChatMessage);

            // Save chat history after each exchange
            this.saveChatHistory();

            logger.info('Message processed successfully', {
                userMessageLength: userMessage.length,
                responseLength: fullResponse.length,
                historyLength: this._conversationHistory.length
            });

            clearTimeout(processingTimeout);

        } catch (error) {
            logger.error('Error processing message', error);
            clearTimeout(processingTimeout);
            this._postMessage({ command: 'statusUpdate', text: '' });

            let errorMessage = 'Sorry, I encountered an error. ';
            if (error instanceof Error) {
                // ... error message formatting ...
            } else {
                errorMessage += 'Unknown error occurred. Please try again.';
            }
            this._postMessage({ command: 'aiResponse', text: errorMessage });
        } finally {
            this._isProcessingMessage = false;
        }
    }

    public resetChat(): void {
        logger.logUserAction('resetChat');
        this._conversationHistory = [];
        this.saveChatHistory(); // Persist the empty state
        this._postMessage({ command: 'chatCleared' });
    }

    /**
     * Load chat history from VSCode global state
     */
    private loadChatHistory(): void {
        try {
            const stored = this._context.globalState.get<ChatMessage[]>('flexChatHistory', []);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - this.maxStorageDays);

            // Filter out old messages and limit to max stored messages
            this._conversationHistory = stored
                .filter(msg => !msg.timestamp || new Date(msg.timestamp) > cutoffDate)
                .slice(-this.maxStoredMessages);

            logger.info(`Loaded ${this._conversationHistory.length} messages from chat history`);
        } catch (error) {
            logger.error('Error loading chat history', error);
            this._conversationHistory = [];
        }
    }

    /**
     * Save chat history to VSCode global state
     */
    private saveChatHistory(): void {
        try {
            // Only save recent messages to prevent excessive storage usage
            const messagesToSave = this._conversationHistory.slice(-this.maxStoredMessages);
            this._context.globalState.update('flexChatHistory', messagesToSave);
            logger.debug(`Saved ${messagesToSave.length} messages to chat history`);
        } catch (error) {
            logger.error('Error saving chat history', error);
        }
    }

    /**
     * Decode HTML entities commonly found in corrupted AI responses
     */
    private decodeHtmlEntities(text: string): string {
        const entityMap: Record<string, string> = {
            '&quot;': '"',
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&#039;': "'"
        };

        let decoded = text;
        for (const [entity, char] of Object.entries(entityMap)) {
            decoded = decoded.replace(new RegExp(entity, 'g'), char);
        }

        return decoded;
    }

    /**
     * Validate if the response contains proper Flex code blocks and syntax
     */
    private validateFlexResponse(response: string): boolean {
        try {
            // Check for HTML entities or malformed tags in code blocks
            const codeBlockRegex = /```flex\n([\s\S]*?)\n```/g;
            const codeBlocks = [...response.matchAll(codeBlockRegex)];
            
            for (const block of codeBlocks) {
                const code = block[1];
                
                // Ensure code exists before testing
                if (!code) continue;
                
                // Check for HTML entities in code
                if (/&(quot|lt|gt|amp|#039);/.test(code)) {
                    return false;
                }
                
                // Check for malformed HTML tags
                if (/<span[^>]*(?!>)|<\/span(?!>)/.test(code)) {
                    return false;
                }
                
                // Use SyntaxHighlighter validation if available
                // Note: This would need to be imported if SyntaxHighlighter has validation methods
            }
            
            return true;
        } catch (error) {
            logger.warn('Error validating Flex response', { error });
            return false;
        }
    }

    /**
     * Sanitize AI response to remove corrupted tokens and improve code quality
     */
    private sanitizeAIResponse(response: string): string {
        let sanitized = response;
        let hadChanges = false;

        // 1. Decode HTML entities
        const decodedResponse = this.decodeHtmlEntities(sanitized);
        if (decodedResponse !== sanitized) {
            sanitized = decodedResponse;
            hadChanges = true;
        }

        // 2. Remove malformed HTML/XML tags
        const malformedTagRegex = /<span[^>]*(?!>)|<\/span(?!>)|<[^>]*(?!>)/g;
        const cleanedResponse = sanitized.replace(malformedTagRegex, '');
        if (cleanedResponse !== sanitized) {
            sanitized = cleanedResponse;
            hadChanges = true;
        }

        // 3. Get dynamic banned tokens from FlexDatasetService
        const bannedTokens = this._flexDatasetService.getBannedTokens();
        
        for (const [invalid, correct] of Object.entries(bannedTokens)) {
            const regex = new RegExp(`\\b${invalid}\\b`, 'g');
            if (regex.test(sanitized)) {
                sanitized = sanitized.replace(regex, correct as string);
                hadChanges = true;
            }
        }

        if (hadChanges) {
            logger.warn('Sanitized AI response - removed corrupted tokens and entities', { 
                originalLength: response.length,
                sanitizedLength: sanitized.length 
            });
        }

        return sanitized;
    }

    /**
     * Get chat history for restoration
     */
    public getChatHistory(): ChatMessage[] {
        return [...this._conversationHistory];
    }
}