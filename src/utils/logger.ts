import { LogLevel, Logger as ILogger } from '../types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vscode = require('vscode');

/**
 * Enhanced logging utility for the Flex Chatbot extension
 */
export class Logger implements ILogger {
    private static instance: Logger;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly outputChannel: any; // VS Code OutputChannel
    private logLevel: LogLevel = LogLevel.info;
    private enableConsoleLogging = true;
    private performanceTimers: Map<string, number> = new Map();
    private logHistory: string[] = [];
    private readonly maxLogHistory = 200;

    private constructor() {
        // Try to get VS Code output channel if available
        try {
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public error(message: string, data?: any): void {
        this.log(LogLevel.error, message, data);
    }

    /**
     * Log warning message
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public warn(message: string, data?: any): void {
        this.log(LogLevel.warn, message, data);
    }

    /**
     * Log info message
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public info(message: string, data?: any): void {
        this.log(LogLevel.info, message, data);
    }

    /**
     * Log debug message
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public debug(message: string, data?: any): void {
        this.log(LogLevel.debug, message, data);
    }

    /**
     * Core logging method
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                case LogLevel.error:
                    console.error(logMessage, data || '');
                    break;
                case LogLevel.warn:
                    console.warn(logMessage, data || '');
                    break;
                case LogLevel.debug:
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
        const levels = [LogLevel.error, LogLevel.warn, LogLevel.info, LogLevel.debug];
        const currentLevelIndex = levels.indexOf(this.logLevel);
        const messageLevelIndex = levels.indexOf(level);

        return messageLevelIndex <= currentLevelIndex;
    }

    /**
     * Format log message
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatMessage(level: LogLevel, timestamp: string, message: string, data?: any): string {
        const levelInfo = {
            [LogLevel.error]: { emoji: '❌', text: 'ERROR' },
            [LogLevel.warn]: { emoji: '⚠️', text: 'WARN' },
            [LogLevel.info]: { emoji: 'ℹ️', text: 'INFO' },
            [LogLevel.debug]: { emoji: '🐛', text: 'DEBUG' }
        };

        const { emoji, text: levelString } = levelInfo[level] || { emoji: '❓', text: 'UNKNOWN' };

        let formatted = `${emoji} [${timestamp}] [${levelString}] ${message}`;

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
            case LogLevel.error:
                return '❌';
            case LogLevel.warn:
                return '⚠️';
            case LogLevel.info:
                return 'ℹ️';
            case LogLevel.debug:
                return '🐛';
            default:
                return '❓';
        }
    }

    /**
     * Log API request
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public logUserAction(action: string, details?: any): void {
        this.info(`User Action: ${action}`, details);
    }

    /**
     * Log performance metric
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public logConfigChange(key: string, oldValue: any, newValue: any): void {
        this.info(`Config Change: ${key}`, { oldValue, newValue });
    }

    /**
     * Log extension lifecycle event
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
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