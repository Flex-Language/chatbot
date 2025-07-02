import { LogLevel, Logger as ILogger } from '../types';

/**
 * Enhanced logging utility for the Flex Chatbot extension
 */
export class Logger implements ILogger {
    private static instance: Logger;
    private readonly outputChannel: any; // VS Code OutputChannel
    private logLevel: LogLevel = LogLevel.INFO;
    private enableConsoleLogging: boolean = true;

    private constructor() {
        // Try to get VS Code output channel if available
        try {
            const vscode = require('vscode');
            this.outputChannel = vscode.window.createOutputChannel('Flex Chatbot');
        } catch {
            this.outputChannel = null;
        }
    }

    /**
     * Get singleton instance of Logger
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Set logging level
     */
    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    /**
     * Enable or disable console logging
     */
    public setConsoleLogging(enabled: boolean): void {
        this.enableConsoleLogging = enabled;
    }

    /**
     * Log error message
     */
    public error(message: string, data?: any): void {
        this.log(LogLevel.ERROR, message, data);
    }

    /**
     * Log warning message
     */
    public warn(message: string, data?: any): void {
        this.log(LogLevel.WARN, message, data);
    }

    /**
     * Log info message
     */
    public info(message: string, data?: any): void {
        this.log(LogLevel.INFO, message, data);
    }

    /**
     * Log debug message
     */
    public debug(message: string, data?: any): void {
        this.log(LogLevel.DEBUG, message, data);
    }

    /**
     * Core logging method
     */
    private log(level: LogLevel, message: string, data?: any): void {
        if (!this.shouldLog(level)) {
            return;
        }

        const timestamp = new Date().toISOString();
        const logMessage = this.formatMessage(level, timestamp, message, data);

        // Log to VS Code output channel
        if (this.outputChannel) {
            this.outputChannel.appendLine(logMessage);
        }

        // Log to console if enabled
        if (this.enableConsoleLogging) {
            switch (level) {
                case LogLevel.ERROR:
                    console.error(logMessage, data || '');
                    break;
                case LogLevel.WARN:
                    console.warn(logMessage, data || '');
                    break;
                case LogLevel.DEBUG:
                    console.debug(logMessage, data || '');
                    break;
                default:
                    console.log(logMessage, data || '');
            }
        }
    }

    /**
     * Check if message should be logged based on current log level
     */
    private shouldLog(level: LogLevel): boolean {
        const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
        const currentLevelIndex = levels.indexOf(this.logLevel);
        const messageLevelIndex = levels.indexOf(level);

        return messageLevelIndex <= currentLevelIndex;
    }

    /**
     * Format log message
     */
    private formatMessage(level: LogLevel, timestamp: string, message: string, data?: any): string {
        const levelEmoji = this.getLevelEmoji(level);
        let formatted = `${levelEmoji} [${timestamp}] [${level.toUpperCase()}] ${message}`;

        if (data) {
            const dataString = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
            formatted += `\nData: ${dataString}`;
        }

        return formatted;
    }

    /**
     * Get emoji for log level
     */
    private getLevelEmoji(level: LogLevel): string {
        switch (level) {
            case LogLevel.ERROR:
                return '❌';
            case LogLevel.WARN:
                return '⚠️';
            case LogLevel.INFO:
                return 'ℹ️';
            case LogLevel.DEBUG:
                return '🐛';
            default:
                return '📝';
        }
    }

    /**
     * Log API request
     */
    public logApiRequest(endpoint: string, method: string, data?: any): void {
        this.debug(`API Request: ${method} ${endpoint}`, data);
    }

    /**
     * Log API response
     */
    public logApiResponse(endpoint: string, status: number, duration?: number): void {
        const message = `API Response: ${endpoint} - ${status}${duration ? ` (${duration}ms)` : ''}`;
        if (status >= 400) {
            this.error(message);
        } else {
            this.debug(message);
        }
    }

    /**
     * Log user interaction
     */
    public logUserAction(action: string, details?: any): void {
        this.info(`User Action: ${action}`, details);
    }

    /**
     * Log performance metric
     */
    public logPerformance(operation: string, duration: number, details?: any): void {
        const message = `Performance: ${operation} took ${duration}ms`;
        if (duration > 5000) {
            this.warn(message, details);
        } else {
            this.debug(message, details);
        }
    }

    /**
     * Log configuration change
     */
    public logConfigChange(key: string, oldValue: any, newValue: any): void {
        this.info(`Config Change: ${key}`, { oldValue, newValue });
    }

    /**
     * Log extension lifecycle event
     */
    public logExtensionEvent(event: 'activate' | 'deactivate' | 'error', details?: any): void {
        const message = `Extension Event: ${event}`;
        if (event === 'error') {
            this.error(message, details);
        } else {
            this.info(message, details);
        }
    }

    /**
     * Create a timed operation logger
     */
    public createTimer(operation: string): TimedOperation {
        return new TimedOperation(operation, this);
    }

    /**
     * Show output channel in VS Code
     */
    public show(): void {
        if (this.outputChannel) {
            this.outputChannel.show();
        }
    }

    /**
     * Clear output channel
     */
    public clear(): void {
        if (this.outputChannel) {
            this.outputChannel.clear();
        }
    }

    /**
     * Get log statistics
     */
    public getStats(): { level: LogLevel; consoleLogging: boolean } {
        return {
            level: this.logLevel,
            consoleLogging: this.enableConsoleLogging
        };
    }
}

/**
 * Utility class for timed operations
 */
export class TimedOperation {
    private startTime: number;

    constructor(
        private operation: string,
        private logger: Logger
    ) {
        this.startTime = Date.now();
        this.logger.debug(`Started: ${this.operation}`);
    }

    /**
     * End the timed operation and log the duration
     */
    public end(details?: any): void {
        const duration = Date.now() - this.startTime;
        this.logger.logPerformance(this.operation, duration, details);
    }

    /**
     * Add a checkpoint to the timed operation
     */
    public checkpoint(checkpoint: string): void {
        const elapsed = Date.now() - this.startTime;
        this.logger.debug(`Checkpoint: ${this.operation} - ${checkpoint} (${elapsed}ms elapsed)`);
    }
}

// Export singleton instance for convenience
export const logger = Logger.getInstance(); 