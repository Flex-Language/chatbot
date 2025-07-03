import * as vscode from 'vscode';
import { ExtensionConfig } from '../types';

/**
 * Service for managing extension configuration
 */
export class ConfigService {
    private static readonly configSection = 'flexChatbot';

    /**
     * Get all extension configuration
     */
    public static getConfig(): ExtensionConfig {
        const config = vscode.workspace.getConfiguration(this.configSection);
        const model = config.get<string>('model', 'openai/gpt-4o-mini');

        // Log when users select models that might not exist, but preserve their choice
        const commonModels = [
            'openai/gpt-4o-mini',
            'openai/gpt-4o',
            'openai/gpt-3.5-turbo',
            'anthropic/claude-3-sonnet',
            'anthropic/claude-3-haiku'
        ];

        if (!commonModels.includes(model)) {
            console.info(`ℹ️ User selected custom model: ${model}. This model may not exist or may have limited functionality.`);
        }

        return {
            apiKey: config.get<string>('apiKey', ''),
            model: model,
            temperature: config.get<number>('temperature', 0.7),
            enableWebSearch: config.get<boolean>('enableWebSearch', false),
            maxTokens: config.get<number>('maxTokens', 0), // 0 means unlimited
            timeout: config.get<number>('timeout', 30000)
        };
    }

    /**
     * Get specific configuration value
     */
    public static get<T>(key: keyof ExtensionConfig, defaultValue?: T): T {
        const config = vscode.workspace.getConfiguration(this.configSection);
        return config.get<T>(key, defaultValue as T);
    }

    /**
     * Set configuration value
     */
    public static async set<T>(
        key: keyof ExtensionConfig,
        value: T,
        target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global
    ): Promise<void> {
        const config = vscode.workspace.getConfiguration(this.configSection);
        await config.update(key, value, target);
    }

    /**
     * Check if API key is configured
     */
    public static isApiKeyConfigured(): boolean {
        const apiKey = this.get<string>('apiKey', '');
        return apiKey.trim().length > 0;
    }

    /**
     * Validate configuration
     */
    public static validateConfig(): { isValid: boolean; errors: string[] } {
        const config = this.getConfig();
        const errors: string[] = [];

        // Validate API key
        if (!config.apiKey || config.apiKey.trim().length === 0) {
            errors.push('API key is required');
        } else if (config.apiKey.length < 20) {
            errors.push('API key appears to be invalid (too short)');
        }

        // Validate model
        if (!config.model || config.model.trim().length === 0) {
            errors.push('Model selection is required');
        }

        // Validate temperature
        if (config.temperature < 0 || config.temperature > 2) {
            errors.push('Temperature must be between 0 and 2');
        }

        // Validate max tokens
        if (config.maxTokens < 1 || config.maxTokens > 32000) {
            errors.push('Max tokens must be between 1 and 32000');
        }

        // Validate timeout
        if (config.timeout < 5000 || config.timeout > 300000) {
            errors.push('Timeout must be between 5 and 300 seconds');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Get default configuration
     */
    public static getDefaultConfig(): ExtensionConfig {
        return {
            apiKey: '',
            model: 'openai/gpt-4o-mini',
            temperature: 0.7,
            enableWebSearch: true,
            maxTokens: 4000,
            timeout: 30000
        };
    }

    /**
     * Reset configuration to defaults
     */
    public static async resetToDefaults(): Promise<void> {
        const defaultConfig = this.getDefaultConfig();
        const config = vscode.workspace.getConfiguration(this.configSection);

        for (const [key, value] of Object.entries(defaultConfig)) {
            if (key !== 'apiKey') { // Don't reset API key
                await config.update(key, value, vscode.ConfigurationTarget.Global);
            }
        }
    }

    /**
     * Show configuration dialog
     */
    public static async showConfigurationDialog(): Promise<void> {
        const actions = [
            'Open Settings',
            'Set API Key',
            'Select Model',
            'Test Connection'
        ];

        const selectedAction = await vscode.window.showQuickPick(actions, {
            placeHolder: 'Choose configuration action'
        });

        switch (selectedAction) {
            case 'Open Settings':
                await vscode.commands.executeCommand('workbench.action.openSettings', this.configSection);
                break;

            case 'Set API Key':
                await this.promptForApiKey();
                break;

            case 'Select Model':
                await vscode.commands.executeCommand('flexChatbot.selectModel');
                break;

            case 'Test Connection':
                await this.testConnection();
                break;
        }
    }

    /**
     * Prompt user for API key
     */
    public static async promptForApiKey(): Promise<void> {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your OpenRouter API key',
            password: true,
            placeHolder: 'sk-or-...',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'API key is required';
                }
                if (value.length < 20) {
                    return 'API key appears to be invalid (too short)';
                }
                return null;
            }
        });

        if (apiKey) {
            await this.set('apiKey', apiKey.trim());
            vscode.window.showInformationMessage('API key saved successfully!');
        }
    }

    /**
     * Test API connection
     */
    private static async testConnection(): Promise<void> {
        const config = this.getConfig();

        if (!config.apiKey) {
            vscode.window.showErrorMessage('Please set your API key first');
            return;
        }

        try {
            // Import ApiService dynamically to avoid circular dependencies
            const apiServiceModule = await import('./apiService');
            const isConnected = await apiServiceModule.ApiService.testApiConnection(config.apiKey);

            if (isConnected) {
                vscode.window.showInformationMessage('✅ API connection successful!');
            } else {
                vscode.window.showErrorMessage('❌ API connection failed. Please check your API key.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`❌ Connection test failed: ${errorMessage}`);
        }
    }

    /**
     * Watch for configuration changes
     */
    public static onConfigurationChanged(
        callback: (config: ExtensionConfig) => void
    ): vscode.Disposable {
        return vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration(this.configSection)) {
                callback(this.getConfig());
            }
        });
    }

    /**
     * Export configuration (excluding sensitive data)
     */
    public static exportConfig(): Partial<ExtensionConfig> {
        const config = this.getConfig();
        return {
            model: config.model,
            temperature: config.temperature,
            enableWebSearch: config.enableWebSearch,
            maxTokens: config.maxTokens,
            timeout: config.timeout
            // Explicitly exclude apiKey for security
        };
    }

    /**
     * Import configuration (excluding sensitive data)
     */
    public static async importConfig(importedConfig: Partial<ExtensionConfig>): Promise<void> {
        const config = vscode.workspace.getConfiguration(this.configSection);

        for (const [key, value] of Object.entries(importedConfig)) {
            if (key !== 'apiKey' && value !== undefined) {
                await config.update(key, value, vscode.ConfigurationTarget.Global);
            }
        }

        vscode.window.showInformationMessage('Configuration imported successfully!');
    }

    /**
     * Get configuration summary for display
     */
    public static getConfigSummary(): string {
        const config = this.getConfig();
        const hasApiKey = config.apiKey.length > 0;

        return `
📋 **Configuration Summary:**
- API Key: ${hasApiKey ? '✅ Set' : '❌ Not set'}
- Model: ${config.model}
- Temperature: ${config.temperature}
- Web Search: ${config.enableWebSearch ? '✅ Enabled' : '❌ Disabled'}
- Max Tokens: ${config.maxTokens || 'Default'}
- Timeout: ${(config.timeout || 30000) / 1000}s
    `.trim();
    }
} 