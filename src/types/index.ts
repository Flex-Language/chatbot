/**
 * Type definitions for the Flex Chatbot extension
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FlexSpecification {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ai_system_prompt: {
        role: string;
        version: string;
        description: string;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CRITICAL_INSTRUCTIONS: Record<string, string>;
        [key: string]: unknown;
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ESSENTIAL_FLEX_KNOWLEDGE: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        language_identity: string;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        core_philosophy: string;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        file_extensions: string[];
        // eslint-disable-next-line @typescript-eslint/naming-convention
        unique_features: string[];
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CRITICAL_SYNTAX_PATTERNS: Record<string, unknown>;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    code_examples: Record<string, unknown>;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    common_patterns: Record<string, unknown>;
    [key: string]: unknown;
}

/**
 * Model information from the API
 */
export interface ModelInfo {
    id: string;
    name: string;
    description: string;
    contextLength: number;
    pricing: {
        prompt: string;
        completion: string;
        request: string;
        image: string;
    };
    trust: string;
}

/**
 * Chat message structure
 */
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
    id?: string;
}

/**
 * Extension configuration structure
 */
export interface ExtensionConfig {
    apiKey: string;
    model: string;
    temperature: number;
    enableWebSearch: boolean;
    maxTokens: number;
    timeout: number;
}

/**
 * API response structure
 */
export interface ApiResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

/**
 * Web search result structure
 */
export interface WebSearchResult {
    title: string;
    snippet: string;
    link: string;
}

/**
 * Webview message structure
 */
export interface WebviewMessage {
    command: 'sendMessage' | 'clearChat' | 'selectModel' | 'statusUpdate' | 'aiResponse' | 'chatCleared' | 'aiStreamStart' | 'aiStreamChunk' | 'aiStreamComplete' | 'hydrateChatHistory' | 'modelSelectionError';
    text?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    history?: ChatMessage[];
}

/**
 * Chat session structure
 */
export interface ChatSession {
    id: string;
    messages: ChatMessage[];
    createdAt: Date;
    lastModified: Date;
}

/**
 * Log levels
 */
export enum LogLevel {
    error,
    warn,
    info,
    debug
}

/**
 * Logger structure
 */
export interface Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(message: string, data?: any): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(message: string, data?: any): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(message: string, data?: any): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(message: string, data?: any): void;
} 