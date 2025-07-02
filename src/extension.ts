import * as vscode from 'vscode';
import { CustomSidebarViewProvider } from './customSidebarViewProvider';
import { ConfigService } from './services/configService';
import { ApiService } from './services/apiService';
import { FlexDatasetService } from './services/flexDatasetService';
import { logger } from './utils/logger';
import { ModelInfo } from './types';
import { debugManager } from './core/DebugManager';
import { errorHandler } from './core/ErrorHandler';
import { testFramework } from './test/TestFramework';
import { devTools } from './dev/DevTools';

/**
 * Extension activation function
 */
export function activate(context: vscode.ExtensionContext) {
	logger.logExtensionEvent('activate', {
		version: vscode.extensions.getExtension('Flex-proagramming-language.flex-chatbot')?.packageJSON.version
	});

	try {
		// Initialize services
		const flexDatasetService = FlexDatasetService.getInstance(context.extensionPath);
		const provider = new CustomSidebarViewProvider(context.extensionUri);

		// Register webview provider
		context.subscriptions.push(
			vscode.window.registerWebviewViewProvider(
				CustomSidebarViewProvider.viewType,
				provider
			)
		);

		// Register commands
		registerCommands(context, provider);

		// Check initial configuration
		checkInitialConfiguration();

		logger.info('Flex Chatbot extension activated successfully');

	} catch (error) {
		logger.error('Failed to activate extension', error);
		vscode.window.showErrorMessage(`Failed to activate Flex Chatbot: ${error}`);
	}
}

/**
 * Register all extension commands
 */
function registerCommands(context: vscode.ExtensionContext, provider: CustomSidebarViewProvider) {
	// Menu view command
	context.subscriptions.push(
		vscode.commands.registerCommand("flexChatbot.menu.view", () => {
			logger.logUserAction('menuView');
			vscode.window.showInformationMessage("Flex Chat Bot menu clicked!");
		})
	);

	// Reset chat command
	context.subscriptions.push(
		vscode.commands.registerCommand("flexChatbot.resetChat", () => {
			logger.logUserAction('resetChat');
			vscode.commands.executeCommand("flexChatbot.openview.focus");
			provider.resetChat();
		})
	);

	// Select model command
	context.subscriptions.push(
		vscode.commands.registerCommand("flexChatbot.selectModel", async () => {
			await handleSelectModel(provider);
		})
	);

	// Open webview command
	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.openview', () => {
			logger.logUserAction('openWebview');
			vscode.window.showInformationMessage('Flex Chat Bot opened!');
		})
	);

	// Configuration command
	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.configure', async () => {
			await ConfigService.showConfigurationDialog();
		})
	);

	// Show logs command
	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.showLogs', () => {
			logger.show();
		})
	);

	// Dataset info command
	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.datasetInfo', () => {
			showDatasetInfo();
		})
	);

	// Development and debugging commands
	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.debug.dashboard', async () => {
			await debugManager.showDebugDashboard();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.debug.clearData', () => {
			debugManager.clearDebugData();
			vscode.window.showInformationMessage('Debug data cleared');
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.dev.dashboard', async () => {
			await devTools.showDashboard();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.dev.runTests', async () => {
			await devTools.runTests();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('flexChatbot.dev.exportData', async () => {
			await devTools.exportDevelopmentData();
		})
	);
}

/**
 * Handle model selection
 */
async function handleSelectModel(provider: CustomSidebarViewProvider): Promise<void> {
	const timer = logger.createTimer('selectModel');

	try {
		logger.logUserAction('selectModel');

		const config = ConfigService.getConfig();
		if (!config.apiKey) {
			const action = await vscode.window.showErrorMessage(
				'API key not configured. Would you like to set it now?',
				'Set API Key',
				'Cancel'
			);

			if (action === 'Set API Key') {
				await ConfigService.promptForApiKey();
			}
			return;
		}

		const models = await provider.getAvailableModels();

		if (!models || models.length === 0) {
			vscode.window.showWarningMessage(
				"No models available. Please check your OpenRouter API key in settings."
			);
			return;
		}

		// Create QuickPick items with enhanced information
		const items = models.map((model: ModelInfo) => ({
			label: model.id,
			description: `${model.context_length.toLocaleString()} tokens - ${ApiService.formatModelPricing(model)}`,
			detail: model.description || 'No description available',
			model: model
		}));

		// Add recommended models at the top
		const recommendedModels = ApiService.getRecommendedModels();
		const sortedItems = items.sort((a, b) => {
			const aRecommended = recommendedModels.includes(a.model.id);
			const bRecommended = recommendedModels.includes(b.model.id);

			if (aRecommended && !bRecommended) return -1;
			if (!aRecommended && bRecommended) return 1;

			// Sort by name if both are recommended or both are not
			return a.label.localeCompare(b.label);
		});

		const selectedItem = await vscode.window.showQuickPick(sortedItems, {
			placeHolder: 'Select an AI model to use (recommended models appear first)',
			matchOnDescription: true,
			matchOnDetail: true
		});

		if (selectedItem) {
			await ConfigService.set('model', selectedItem.label);
			vscode.window.showInformationMessage(`Model set to: ${selectedItem.label}`);

			provider.refreshWebview();
			logger.info('Model changed', { model: selectedItem.label });
		}
	} catch (error) {
		logger.error('Error in model selection', error);
		vscode.window.showErrorMessage(`Failed to load models: ${error}`);
	} finally {
		timer.end();
	}
}

/**
 * Check initial configuration and show warnings if needed
 */
function checkInitialConfiguration(): void {
	const config = ConfigService.getConfig();
	const validation = ConfigService.validateConfig();

	if (!validation.isValid) {
		logger.warn('Configuration issues detected', validation.errors);

		// Show warning for critical issues
		if (!config.apiKey) {
			setTimeout(() => {
				vscode.window.showWarningMessage(
					'Flex Chatbot requires an OpenRouter API key to function. Click to configure.',
					'Configure Now',
					'Later'
				).then(action => {
					if (action === 'Configure Now') {
						ConfigService.showConfigurationDialog();
					}
				});
			}, 2000); // Delay to avoid overwhelming the user on startup
		}
	}
}

/**
 * Show dataset information
 */
function showDatasetInfo(): void {
	const flexDataset = FlexDatasetService.getInstance();
	const stats = flexDataset.getDatasetStats();
	const isLoaded = flexDataset.isDatasetLoaded();

	const info = `
📊 **Flex Dataset Information**

**Status:** ${isLoaded ? '✅ Loaded' : '❌ Not Loaded'}
**Code Examples:** ${stats.codeExamples || 0}
**Common Patterns:** ${stats.commonPatterns || 0}
**Syntax Patterns:** ${stats.syntaxPatterns || 0}
**Tokens:** ${stats.tokens || 0}

${!isLoaded ? '⚠️ Using fallback documentation. Check that flex_language_spec.json exists in the dataset folder.' : ''}
	`.trim();

	vscode.window.showInformationMessage(info, { modal: false });
	logger.info('Dataset info displayed', stats);
}

/**
 * Extension deactivation function
 */
export function deactivate() {
	logger.logExtensionEvent('deactivate');

	// Dispose of debugging and development resources
	debugManager.dispose();
	errorHandler.dispose();
	testFramework.dispose();
	devTools.dispose();
}
