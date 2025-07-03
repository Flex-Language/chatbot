import * as vscode from 'vscode';
import { ChatMessage } from '../types';
import { ApiService } from './apiService';
import { ConfigService } from './configService';
import { FlexDatasetService } from './flexDatasetService';
import { logger } from '../utils/logger';

export class ChatService {
    private _conversationHistory: ChatMessage[] = [];
    private readonly maxConversationHistory = 20;
    private _isProcessingMessage = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _postMessage: (message: any) => void;
    private _flexDatasetService: FlexDatasetService;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(postMessageCallback: (message: any) => void, extensionUri: vscode.Uri) {
        this._postMessage = postMessageCallback;
        this._flexDatasetService = FlexDatasetService.getInstance(extensionUri.fsPath);
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
                    fullResponse += chunk;
                    this._postMessage({ command: 'aiStreamChunk', text: chunk });
                },
                (error: Error) => {
                    this._postMessage({ command: 'aiResponse', text: `Streaming error: ${error.message}` });
                },
                () => {
                    this._postMessage({ command: 'aiStreamComplete' });
                }
            );

            const aiChatMessage: ChatMessage = {
                role: 'assistant',
                content: fullResponse,
                timestamp: new Date()
            };
            this._conversationHistory.push(aiChatMessage);

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
        this._postMessage({ command: 'chatCleared' });
    }
} 