// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { CustomSidebarViewProvider } from './customSidebarViewProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Console diagnostic information (console.log) and errors (console.error)
	// Will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flex-chatbot" is active!');

	const provider = new CustomSidebarViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			CustomSidebarViewProvider.viewType,
		  provider
		)
	  );

	  context.subscriptions.push(
		vscode.commands.registerCommand("flexChatbot.menu.view", () => {
		  const message = "Flex Chat Bot menu clicked!";
		  vscode.window.showInformationMessage(message);
		})
	  );

	  context.subscriptions.push(
		vscode.commands.registerCommand("flexChatbot.resetChat", () => {
		  vscode.commands.executeCommand("flexChatbot.openview.focus");
		  provider.resetChat();
		})
	  );

	  context.subscriptions.push(
		vscode.commands.registerCommand("flexChatbot.selectModel", async () => {
		  const models = await provider.getAvailableModels();
		  
		  if (!models || models.length === 0) {
			vscode.window.showInformationMessage("No models available. Make sure your OpenRouter API key is set correctly.");
			return;
		  }

		  // Create QuickPick items from the available models
		  const items = models.map((model: any) => ({
			label: model.id,
			description: `${model.context_length} tokens - ${model.pricing?.prompt ? '$' + model.pricing.prompt.toFixed(6) + '/1K prompt tokens' : 'Pricing N/A'}`,
			detail: model.description || ''
		  }));

		  const selectedModel = await vscode.window.showQuickPick(items, {
			placeHolder: 'Select an AI model to use',
			matchOnDescription: true,
			matchOnDetail: true
		  });

		  if (selectedModel) {
			// Update the configuration with the selected model
			await vscode.workspace.getConfiguration('flexChatbot').update('model', selectedModel.label, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage(`Model set to: ${selectedModel.label}`);
			
			// Refresh the webview
			provider.refreshWebview();
		  }
		})
	  );

	// Command has been defined in the package.json file
	// Provide the implementation of the command with registerCommand
	// CommandId parameter must match the command field in package.json
	let openWebView = vscode.commands.registerCommand('flexChatbot.openview', () => {
		// Display a message box to the user
		vscode.window.showInformationMessage('Flex Chat Bot opened!');
	});

	context.subscriptions.push(openWebView);
}

// this method is called when your extension is deactivated
export function deactivate() {}
