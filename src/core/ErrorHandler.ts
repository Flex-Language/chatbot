import * as vscode from 'vscode';
import { debugManager } from './DebugManager';
import { logger } from '../utils/logger';

/**
 * Enterprise Error Handler
 * Provides centralized error handling with classification, recovery, and reporting
 */
export class ErrorHandler {
    private static instance: ErrorHandler;
    private errorStrategies: Map<string, ErrorStrategy> = new Map();
    private errorCategories: Map<string, ErrorCategory> = new Map();
    private recoveryHistory: Map<string, RecoveryAttempt[]> = new Map();

    private constructor() {
        this.initializeErrorStrategies();
        this.initializeErrorCategories();
    }

    public static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    /**
     * Handle an error with automatic classification and recovery
     */
    public async handleError(error: Error, context?: ErrorContext): Promise<ErrorResult> {
        const sessionId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        debugManager.startDebugSession(sessionId, { error: error.message, context });

        try {
            // Step 1: Classify the error
            debugManager.addDebugStep(sessionId, 'classifying_error');
            const classification = this.classifyError(error, context);

            // Step 2: Record the error
            debugManager.addDebugStep(sessionId, 'recording_error');
            debugManager.recordError(error, context, classification.severity);

            // Step 3: Attempt recovery
            debugManager.addDebugStep(sessionId, 'attempting_recovery');
            const recoveryResult = await this.attemptRecovery(error, classification, context);

            // Step 4: Create user-friendly response
            debugManager.addDebugStep(sessionId, 'creating_user_response');
            const userMessage = this.createUserMessage(error, classification, recoveryResult);

            const result: ErrorResult = {
                handled: true,
                recovered: recoveryResult.success,
                userMessage,
                classification,
                recoveryStrategy: recoveryResult.strategy,
                technicalDetails: this.createTechnicalDetails(error, context)
            };

            debugManager.endDebugSession(sessionId, result);
            return result;

        } catch (handlingError) {
            debugManager.addDebugStep(sessionId, 'error_handling_failed', { handlingError: (handlingError as Error).message });
            debugManager.recordError(handlingError as Error, { originalError: error.message }, 'critical');

            // Fallback error handling
            const result: ErrorResult = {
                handled: false,
                recovered: false,
                userMessage: "An unexpected error occurred. Please check the logs for details.",
                classification: { category: 'unknown', severity: 'critical', code: 'HANDLER_FAILURE' },
                technicalDetails: {
                    originalError: error.message,
                    handlingError: (handlingError as Error).message,
                    timestamp: new Date().toISOString()
                }
            };

            debugManager.endDebugSession(sessionId, result);
            return result;
        }
    }

    /**
     * Classify an error into category and severity
     */
    private classifyError(error: Error, context?: ErrorContext): ErrorClassification {
        const errorMessage = error.message.toLowerCase();

        // API-related errors
        if (errorMessage.includes('api') || errorMessage.includes('fetch') || errorMessage.includes('network')) {
            if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
                return { category: 'authentication', severity: 'high', code: 'API_UNAUTHORIZED' };
            }
            if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
                return { category: 'rate_limit', severity: 'medium', code: 'API_RATE_LIMIT' };
            }
            if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
                return { category: 'timeout', severity: 'medium', code: 'API_TIMEOUT' };
            }
            return { category: 'api', severity: 'medium', code: 'API_ERROR' };
        }

        // Configuration errors
        if (errorMessage.includes('config') || errorMessage.includes('setting') || context?.component === 'config') {
            return { category: 'configuration', severity: 'high', code: 'CONFIG_ERROR' };
        }

        // Dataset errors
        if (errorMessage.includes('dataset') || errorMessage.includes('json') || context?.component === 'dataset') {
            if (errorMessage.includes('not found') || errorMessage.includes('missing')) {
                return { category: 'missing_resource', severity: 'medium', code: 'DATASET_MISSING' };
            }
            return { category: 'dataset', severity: 'medium', code: 'DATASET_ERROR' };
        }

        // Default classification
        return { category: 'unknown', severity: 'medium', code: 'UNKNOWN_ERROR' };
    }

    /**
     * Attempt to recover from an error
     */
    private async attemptRecovery(
        error: Error,
        classification: ErrorClassification,
        context?: ErrorContext
    ): Promise<RecoveryResult> {
        const strategy = this.errorStrategies.get(classification.category);

        if (!strategy) {
            return { success: false, strategy: 'none', message: 'No recovery strategy available' };
        }

        try {
            return await strategy.execute(error, classification, context);
        } catch (recoveryError) {
            return {
                success: false,
                strategy: strategy.name,
                message: `Recovery failed: ${(recoveryError as Error).message}`
            };
        }
    }

    /**
     * Create user-friendly error message
     */
    private createUserMessage(
        error: Error,
        classification: ErrorClassification,
        recovery: RecoveryResult
    ): string {
        const category = this.errorCategories.get(classification.category);

        if (!category) {
            return "An unexpected error occurred. Please try again or contact support.";
        }

        let message = category.userMessage;

        // Add specific details based on classification
        switch (classification.category) {
            case 'authentication':
                message += " Please check your API key in the settings.";
                break;
            case 'rate_limit':
                message += " Please wait a moment before trying again.";
                break;
            case 'configuration':
                message += " Please check your extension settings.";
                break;
            case 'missing_resource':
                message += " Please ensure all required files are present.";
                break;
            case 'timeout':
                message += " Please check your internet connection and try again.";
                break;
        }

        // Add recovery information
        if (recovery.success) {
            message += ` The issue has been automatically resolved.`;
        }

        return message;
    }

    /**
     * Create technical details for debugging
     */
    private createTechnicalDetails(error: Error, context?: ErrorContext): any {
        return {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            context,
            timestamp: new Date().toISOString(),
            environment: {
                platform: process.platform,
                nodeVersion: process.version,
                vscodeVersion: vscode.version
            }
        };
    }

    /**
     * Initialize error recovery strategies
     */
    private initializeErrorStrategies(): void {
        // API Authentication Recovery
        this.errorStrategies.set('authentication', {
            name: 'API Authentication Recovery',
            maxAttempts: 2,
            execute: async (error, classification, context) => {
                try {
                    await vscode.commands.executeCommand('flexChatbot.configure');
                    return { success: true, strategy: 'config_refresh', message: 'Configuration dialog opened' };
                } catch (recoveryError) {
                    return { success: false, strategy: 'config_refresh', message: 'Failed to refresh configuration' };
                }
            }
        });

        // Configuration Recovery
        this.errorStrategies.set('configuration', {
            name: 'Configuration Recovery',
            maxAttempts: 2,
            execute: async (error, classification, context) => {
                try {
                    const config = vscode.workspace.getConfiguration('flexChatbot');
                    await config.update('model', 'openai/gpt-4-mini', vscode.ConfigurationTarget.Global);
                    return { success: true, strategy: 'reset_config', message: 'Configuration reset to defaults' };
                } catch (recoveryError) {
                    return { success: false, strategy: 'reset_config', message: 'Failed to reset configuration' };
                }
            }
        });
    }

    /**
     * Initialize error categories
     */
    private initializeErrorCategories(): void {
        this.errorCategories.set('authentication', {
            name: 'Authentication Error',
            userMessage: 'There was an issue with your API authentication.',
            severity: 'high',
            recoverable: true
        });

        this.errorCategories.set('api', {
            name: 'API Error',
            userMessage: 'There was an issue communicating with the AI service.',
            severity: 'medium',
            recoverable: true
        });

        this.errorCategories.set('configuration', {
            name: 'Configuration Error',
            userMessage: 'There was an issue with the extension configuration.',
            severity: 'high',
            recoverable: true
        });

        this.errorCategories.set('unknown', {
            name: 'Unknown Error',
            userMessage: 'An unexpected error occurred.',
            severity: 'medium',
            recoverable: false
        });
    }

    /**
     * Get error statistics
     */
    public getErrorStatistics(): ErrorStatistics {
        const totalAttempts = Array.from(this.recoveryHistory.values())
            .reduce((total, attempts) => total + attempts.length, 0);

        const successfulRecoveries = Array.from(this.recoveryHistory.values())
            .reduce((total, attempts) =>
                total + attempts.filter(attempt => attempt.success).length, 0);

        const recoveryRate = totalAttempts > 0 ? (successfulRecoveries / totalAttempts) * 100 : 0;

        return {
            totalRecoveryAttempts: totalAttempts,
            successfulRecoveries,
            recoveryRate,
            strategiesCount: this.errorStrategies.size,
            categoriesCount: this.errorCategories.size
        };
    }

    /**
     * Dispose resources
     */
    public dispose(): void {
        this.errorStrategies.clear();
        this.errorCategories.clear();
        this.recoveryHistory.clear();
    }
}

// Type definitions
interface ErrorContext {
    component?: string;
    operation?: string;
    retryCount?: number;
    userAction?: string;
    sessionId?: string;
    metadata?: any;
}

interface ErrorClassification {
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    code: string;
}

interface ErrorResult {
    handled: boolean;
    recovered: boolean;
    userMessage: string;
    classification: ErrorClassification;
    recoveryStrategy?: string;
    technicalDetails?: any;
}

interface ErrorStrategy {
    name: string;
    maxAttempts: number;
    execute: (error: Error, classification: ErrorClassification, context?: ErrorContext) => Promise<RecoveryResult>;
}

interface RecoveryResult {
    success: boolean;
    strategy: string;
    message: string;
}

interface ErrorCategory {
    name: string;
    userMessage: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recoverable: boolean;
}

interface RecoveryAttempt {
    timestamp: number;
    strategy: string;
    classification: ErrorClassification;
    context?: ErrorContext;
    success?: boolean;
    message?: string;
}

interface ErrorStatistics {
    totalRecoveryAttempts: number;
    successfulRecoveries: number;
    recoveryRate: number;
    strategiesCount: number;
    categoriesCount: number;
}

export const errorHandler = ErrorHandler.getInstance(); 