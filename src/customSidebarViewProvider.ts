import * as vscode from "vscode";
import { ChatMessage, ModelInfo, WebviewMessage, ExtensionConfig } from './types';
import { FlexDatasetService } from './services/flexDatasetService';
import { ApiService } from './services/apiService';
import { ConfigService } from './services/configService';
import { logger } from './utils/logger';

/**
 * Enhanced Custom Sidebar View Provider with improved architecture
 */
export class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "flexChatbot.openview";

  private _view?: vscode.WebviewView;
  private _conversationHistory: ChatMessage[] = [];
  private readonly MAX_CONVERSATION_HISTORY = 20; // Limit to prevent memory issues
  private _isProcessingMessage: boolean = false; // Prevent concurrent requests
  private _availableModels: ModelInfo[] = [];
  private _isModelListLoaded = false;
  private _flexDatasetService: FlexDatasetService;
  private _configWatcher?: vscode.Disposable;

  constructor(private readonly _extensionUri: vscode.Uri) {
    logger.logExtensionEvent('activate', { component: 'CustomSidebarViewProvider' });

    // Initialize services
    this._flexDatasetService = FlexDatasetService.getInstance(_extensionUri.fsPath);

    // Set up configuration watcher
    this._configWatcher = ConfigService.onConfigurationChanged((config) => {
      this.onConfigurationChanged(config);
    });

    // Initialize available models
    this.initializeModels();
  }

  /**
   * Dispose of resources
   */
  public dispose(): void {
    if (this._configWatcher) {
      this._configWatcher.dispose();
    }
    logger.logExtensionEvent('deactivate', { component: 'CustomSidebarViewProvider' });
  }

  /**
   * Get available models
   */
  public async getAvailableModels(): Promise<ModelInfo[]> {
    if (!this._isModelListLoaded) {
      await this.initializeModels();
    }
    return this._availableModels;
  }

  /**
   * Reset chat conversation
   */
  public resetChat(): void {
    logger.logUserAction('resetChat');
    this._conversationHistory = [];
    if (this._view) {
      this._view.webview.postMessage({ command: 'chatCleared' } as WebviewMessage);
    }
  }

  /**
   * Refresh webview content
   */
  public refreshWebview(): void {
    if (this._view) {
      this._view.webview.html = this.getHtmlContent(this._view.webview);
      logger.debug('Webview refreshed');
    }
  }

  /**
   * Initialize available models from API
   */
  private async initializeModels(): Promise<void> {
    const timer = logger.createTimer('initializeModels');

    try {
      const config = ConfigService.getConfig();

      if (!config.apiKey) {
        logger.warn('API key not configured, skipping model initialization');
        return;
      }

      this._availableModels = await ApiService.fetchAvailableModels(config.apiKey);
      this._isModelListLoaded = true;

      logger.info(`Loaded ${this._availableModels.length} models`);

      if (this._view) {
        this.refreshWebview();
      }
    } catch (error) {
      logger.error('Failed to initialize models', error);
    } finally {
      timer.end();
    }
  }

  /**
   * Handle configuration changes
   */
  private onConfigurationChanged(config: ExtensionConfig): void {
    logger.logConfigChange('configuration', 'previous', 'new');

    // Re-fetch models if API key changed
    if (config.apiKey && !this._isModelListLoaded) {
      this.initializeModels();
    }

    // Refresh webview to show updated configuration
    this.refreshWebview();
  }

  /**
   * Resolve webview view and set up message handling
   */
  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getHtmlContent(webviewView.webview);

    // Set up message handling
    webviewView.webview.onDidReceiveMessage(async (message: WebviewMessage) => {
      await this.handleWebviewMessage(message);
    });

    logger.info('Webview resolved and message handlers set up');
  }

  /**
   * Handle messages from the webview
   */
  private async handleWebviewMessage(message: WebviewMessage): Promise<void> {
    const timer = logger.createTimer(`handleMessage:${message.command}`);

    try {
      switch (message.command) {
        case 'sendMessage':
          await this.handleSendMessage(message.text || '');
          break;

        case 'clearChat':
          this.handleClearChat();
          break;

        case 'selectModel':
          await this.handleSelectModel();
          break;

        default:
          logger.warn(`Unknown message command: ${message.command}`);
      }
    } catch (error) {
      logger.error(`Error handling message: ${message.command}`, error);
      this.sendErrorMessage(`Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      timer.end();
    }
  }

  /**
   * Handle send message request
   */
  private async handleSendMessage(userMessage: string): Promise<void> {
    if (!userMessage.trim()) {
      return;
    }

    // Prevent concurrent requests and clear any hanging states
    if (this._isProcessingMessage) {
      this.sendErrorMessage('Please wait for the current message to be processed.');
      return;
    }
    this._isProcessingMessage = true;

    // Set up timeout to prevent hanging indefinitely
    const processingTimeout = setTimeout(() => {
      this._isProcessingMessage = false;
      this.sendErrorMessage('Request processing timeout. Please try again.');
    }, 600000); // 10 minutes max

    logger.logUserAction('sendMessage', { messageLength: userMessage.length });

    // Check configuration
    const config = ConfigService.getConfig();
    const configValidation = ConfigService.validateConfig();

    if (!configValidation.isValid) {
      this._isProcessingMessage = false;
      this.sendErrorMessage(
        `Configuration error: ${configValidation.errors.join(', ')}. Please check your settings.`
      );
      return;
    }

    try {
      // Check for web search request (disabled by default for stability)
      const isWebSearch = userMessage.toLowerCase().includes('[web]');
      let webSearchResults: string = '';

      if (isWebSearch && config.enableWebSearch) {
        try {
          this.sendStatusMessage('Searching the web...');
          const searchQuery = userMessage.replace(/\[web\]/gi, '').trim();
          const results = await Promise.race([
            ApiService.performWebSearch(searchQuery),
            new Promise<any[]>((_, reject) =>
              setTimeout(() => reject(new Error('Web search timeout')), 10000)
            )
          ]);
          webSearchResults = ApiService.formatWebSearchResults(results);
        } catch (error) {
          console.warn('Web search failed:', error);
          webSearchResults = ''; // Continue without web search results
        }
      }

      // Prepare AI message
      let messageForAI = userMessage;
      if (webSearchResults) {
        messageForAI = `The user asked: ${userMessage.replace(/\[web\]/gi, '').trim()}\n\nHere are some search results that might help:\n${webSearchResults}\n\nPlease synthesize this information to provide a helpful answer.`;
      }

      // Add user message to history (display version)
      const userChatMessage: ChatMessage = {
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      this._conversationHistory.push(userChatMessage);

      // Trim conversation history to prevent memory issues
      if (this._conversationHistory.length > this.MAX_CONVERSATION_HISTORY) {
        this._conversationHistory = this._conversationHistory.slice(-this.MAX_CONVERSATION_HISTORY);
      }

      // Send thinking status
      this.sendStatusMessage('Flex Assistant is thinking...');

      // Prepare messages with system prompt
      const systemPrompt = this._flexDatasetService.getSystemPrompt();
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: systemPrompt
        },
        ...this._conversationHistory.slice(0, -1), // All messages except the last one
        {
          role: 'user',
          content: messageForAI, // Use the enhanced message for AI
          timestamp: new Date()
        }
      ];

      // Initialize streaming response
      let fullResponse = '';
      this.sendAiStreamStart();

      // Get AI response with streaming
      const response = await ApiService.streamChatCompletion(
        messages, 
        config,
        (chunk: string) => {
          // Send each chunk as it arrives
          fullResponse += chunk;
          this.sendAiStreamChunk(chunk);
        },
        (error: Error) => {
          // Handle streaming errors
          this.sendErrorMessage(`Streaming error: ${error.message}`);
        },
        () => {
          // Mark streaming as complete
          this.sendAiStreamComplete();
        }
      );

      // Add AI response to history
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

      // Clear timeout on success
      clearTimeout(processingTimeout);

    } catch (error) {
      logger.error('Error processing message', error);
      
      // Clear timeout on error
      clearTimeout(processingTimeout);
      
      // Clear any status messages
      if (this._view) {
        this._view.webview.postMessage({ command: 'statusUpdate', text: '' });
      }
      
      // Provide user-friendly error message
      let errorMessage = 'Sorry, I encountered an error. ';
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage += 'The request timed out. Please try again with a shorter message.';
        } else if (error.message.includes('API key')) {
          errorMessage += 'Please check your OpenRouter API key in the extension settings.';
        } else if (error.message.includes('rate limit')) {
          errorMessage += 'Rate limit exceeded. Please wait a moment before trying again.';
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += 'Unknown error occurred. Please try again.';
      }
      
      this.sendErrorMessage(errorMessage);
    } finally {
      this._isProcessingMessage = false;
    }
  }

  /**
   * Handle clear chat request
   */
  private handleClearChat(): void {
    logger.logUserAction('clearChat');
    this._conversationHistory = [];
    if (this._view) {
      this._view.webview.postMessage({ command: 'chatCleared' } as WebviewMessage);
    }
  }

  /**
 * Handle select model request
 */
  private async handleSelectModel(): Promise<void> {
    logger.logUserAction('selectModel');
    await vscode.commands.executeCommand('flexChatbot.selectModel');
  }

  /**
   * Send AI response to webview
   */
  private sendAiResponse(text: string): void {
    if (this._view) {
      this._view.webview.postMessage({ command: 'aiResponse', text } as WebviewMessage);
    }
  }

  /**
   * Send status message to webview
   */
  private sendStatusMessage(text: string): void {
    if (this._view) {
      this._view.webview.postMessage({ command: 'statusUpdate', text } as WebviewMessage);
    }
  }

  /**
   * Send error message to webview
   */
  private sendErrorMessage(text: string): void {
    if (this._view) {
      this._view.webview.postMessage({ command: 'aiResponse', text } as WebviewMessage);
    }
  }

  /**
   * Start AI streaming response
   */
  private sendAiStreamStart(): void {
    if (this._view) {
      this._view.webview.postMessage({ command: 'aiStreamStart' } as WebviewMessage);
    }
  }

  /**
   * Send AI streaming chunk
   */
  private sendAiStreamChunk(chunk: string): void {
    if (this._view) {
      this._view.webview.postMessage({ command: 'aiStreamChunk', text: chunk } as WebviewMessage);
    }
  }

  /**
   * Complete AI streaming response
   */
  private sendAiStreamComplete(): void {
    if (this._view) {
      this._view.webview.postMessage({ command: 'aiStreamComplete' } as WebviewMessage);
    }
  }

  /**
   * Generate HTML content for the webview
   */
  private getHtmlContent(webview: vscode.Webview): string {
    // Get resource URIs for professional styling
    const mainStyleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "main.css")
    );

    const vscodeStyleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "vscode.css")
    );

    const resetStyleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "reset.css")
    );

    const robotGifUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "images", "robot.gif")
    );

    const flexLogoUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "images", "logo_flex.svg")
    );

    const userIconUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "images", "user-icon.png")
    );

    const highlighterUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "highlighter.js")
    );

    const chatJsUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "chat.js")
    );

    // Use a nonce for security
    const nonce = getNonce();

    // Get current configuration and status
    const config = ConfigService.getConfig();
    const configValidation = ConfigService.validateConfig();
    const isDatasetLoaded = this._flexDatasetService.isDatasetLoaded();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} data: https:; connect-src https:; font-src ${webview.cspSource} https:;">
      <title>Flex Programming Assistant</title>
      
      <!-- Professional CSS Imports -->
      <link rel="stylesheet" href="${resetStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${vscodeStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${mainStyleUri}" nonce="${nonce}">
    </head>
    <body data-config-status="${configValidation.isValid ? 'valid' : 'invalid'}">
      <div id="maincont">
        <!-- Minimalist Header Bar -->
        <div id="header-bar">
          <div class="header-left">
            <img src="${flexLogoUri}" alt="Flex" class="header-logo">
            <span class="header-title">Flex Assistant</span>
            <div class="status-indicators">
              <span class="status-dot ${configValidation.isValid ? 'success' : 'warning'}" title="${configValidation.isValid ? 'Configuration Ready' : 'Check Settings'}"></span>
              <span class="status-dot ${isDatasetLoaded ? 'success' : 'loading'}" title="${isDatasetLoaded ? 'Dataset Loaded' : 'Loading Dataset'}"></span>
            </div>
          </div>
          <div class="header-right">
            <div class="model-display">${config.model || 'Default'}</div>
            <button id="change-model" class="icon-button" title="Change Model">⚙️</button>
            <button id="clear-button" class="icon-button" title="Clear Chat">🗑️</button>
          </div>
        </div>

        <!-- Enhanced Chat Container -->
        <div id="chat-box">
          <div class="welcome-message">
            <div class="bot-avatar">
              <img src="${robotGifUri}" alt="Flex Assistant">
            </div>
            <div class="welcome-content">
              <h3>Welcome to Flex Programming Assistant! 🚀</h3>
              <p>I'm here to help you with Flex syntax, Franco-Arabic programming concepts, and best practices.</p>
            </div>
          </div>
        </div>

        <!-- Enhanced Input Area -->
        <div id="input-section">
          <div class="input-container">
            <div class="input-wrapper">
              <textarea 
                id="user-input" 
                placeholder="Ask me anything about Flex programming..."
                rows="1"
                maxlength="4000"
              ></textarea>
              <button id="send-button" class="send-button">
                <span class="send-icon">📤</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Load External Scripts -->
      <script src="${highlighterUri}" nonce="${nonce}"></script>
      <script src="${chatJsUri}" nonce="${nonce}"></script>
    </body>
    </html>`;
  }

  /**
   * Create status message for display
   */
  private createStatusMessage(
    configValidation: { isValid: boolean; errors: string[] },
    isDatasetLoaded: boolean,
    datasetStats: Record<string, number>
  ): string {
    if (!configValidation.isValid) {
      return `Configuration issues: ${configValidation.errors.join(', ')}`;
    }

    if (!isDatasetLoaded) {
      return 'Dataset not loaded - using fallback';
    }

    return `Ready (${datasetStats.codeExamples || 0} examples loaded)`;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

