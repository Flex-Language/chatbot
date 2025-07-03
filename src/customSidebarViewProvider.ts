import * as vscode from "vscode";
import { WebviewMessage, ModelInfo } from './types';
import { ApiService } from './services/apiService';
import { ConfigService } from './services/configService';
import { logger } from './utils/logger';
import { ChatService } from "./services/ChatService";
import { WebviewService } from "./services/WebviewService";

/**
 * Refactored Custom Sidebar View Provider
 * Orchestrates the webview, chat service, and other components.
 */
export class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "flexChatbot.openview";

  private _view?: vscode.WebviewView;
  private _chatService?: ChatService;
  private _webviewService?: WebviewService;
  private _configWatcher?: vscode.Disposable;
  private _availableModels: ModelInfo[] = [];
  private _isModelListLoaded = false;

  constructor(private readonly _extensionUri: vscode.Uri) {
    logger.logExtensionEvent('activate', { component: 'CustomSidebarViewProvider' });
    this._configWatcher = ConfigService.onConfigurationChanged(() => this.onConfigurationChanged());
    this.initializeModels();
  }

  public dispose(): void {
    this._configWatcher?.dispose();
    logger.logExtensionEvent('deactivate', { component: 'CustomSidebarViewProvider' });
  }

  public async getAvailableModels(): Promise<ModelInfo[]> {
    if (!this._isModelListLoaded) {
      await this.initializeModels();
    }
    return this._availableModels;
  }

  public resetChat(): void {
    logger.logUserAction('resetChat');
    this._chatService?.resetChat();
  }

  public refreshWebview(): void {
    if (this._view && this._webviewService) {
      this._view.webview.html = this._webviewService.getHtmlContent(this._view.webview);
      logger.debug('Webview refreshed');
    }
  }

  private async initializeModels(): Promise<void> {
    const config = ConfigService.getConfig();
    if (!config.apiKey) {
      logger.warn('API key not configured, skipping model initialization');
      return;
    }
    try {
      this._availableModels = await ApiService.fetchAvailableModels(config.apiKey);
      this._isModelListLoaded = true;
      logger.info(`Loaded ${this._availableModels.length} models`);
      if (this._view) {
        this.refreshWebview();
      }
    } catch (error) {
      logger.error('Failed to initialize models', error);
    }
  }

  private onConfigurationChanged(): void {
    const config = ConfigService.getConfig();
    if (config.apiKey && !this._isModelListLoaded) {
      this.initializeModels();
    }
    this.refreshWebview();
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: vscode.WebviewViewResolveContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _token: vscode.CancellationToken,
  ): void | Thenable<void> {
    this._view = webviewView;
    this._webviewService = new WebviewService(this._extensionUri);

    const postMessage = (message: WebviewMessage) => {
      if (this._view) {
        this._view.webview.postMessage(message);
      }
    };
    this._chatService = new ChatService(postMessage, this._extensionUri);

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._webviewService.getHtmlContent(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message: WebviewMessage) => {
      await this.handleWebviewMessage(message);
    });

    logger.info('Webview resolved and services initialized');
  }

  private async handleWebviewMessage(message: WebviewMessage): Promise<void> {
    switch (message.command) {
      case 'sendMessage':
        await this._chatService?.handleSendMessage(message.text || '');
        break;
      case 'clearChat':
        this.resetChat();
        break;
      case 'selectModel':
        await vscode.commands.executeCommand('flexChatbot.selectModel');
        break;
      default:
        logger.warn(`Unknown message command: ${message.command}`);
    }
  }
}

