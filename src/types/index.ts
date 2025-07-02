/**
 * Type definitions for the Flex Chatbot extension
 */

export interface FlexLanguageSpec {
    ai_system_prompt: {
        role: string;
        version: string;
        description: string;
        CRITICAL_INSTRUCTIONS: Record<string, string>;
        COMPLETE_CONTEXT_MODE: Record<string, any>;
        [key: string]: any;
    };
    ESSENTIAL_FLEX_KNOWLEDGE: {
        language_identity: string;
        core_philosophy: string;
        file_extensions: string[];
        unique_features: string[];
    };
    CRITICAL_SYNTAX_PATTERNS: Record<string, any>;
    code_examples: Record<string, any>;
    common_patterns: Record<string, any>;
    [key: string]: any;
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
    id?: string;
}

export interface ModelInfo {
    id: string;
    description?: string;
    context_length: number;
    pricing?: {
        prompt: number;
        completion: number;
    };
}

export interface ExtensionConfig {
    apiKey: string;
    model: string;
    temperature: number;
    enableWebSearch: boolean;
    maxTokens?: number;
    timeout?: number;
}

export interface WebSearchResult {
    title: string;
    snippet: string;
    link: string;
}

export interface ApiResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

export interface WebviewMessage {
    command: 'sendMessage' | 'clearChat' | 'selectModel' | 'statusUpdate' | 'aiResponse' | 'chatCleared' | 'aiStreamStart' | 'aiStreamChunk' | 'aiStreamComplete';
    text?: string;
    data?: any;
}

export interface ChatSession {
    id: string;
    messages: ChatMessage[];
    createdAt: Date;
    lastModified: Date;
}

export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug'
}

export interface Logger {
    error(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    info(message: string, data?: any): void;
    debug(message: string, data?: any): void;
} 