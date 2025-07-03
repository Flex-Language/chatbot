import * as vscode from 'vscode';
import { ConfigService } from './configService';
import { FlexDatasetService } from './flexDatasetService';

function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export class WebviewService {
  private readonly _extensionUri: vscode.Uri;

  constructor(extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;
  }

  public getHtmlContent(webview: vscode.Webview): string {
    const resetStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "reset.css"));
    const baseStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "base.css"));
    const headerStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "header.css"));
    const chatStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "chat.css"));
    const inputStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "input.css"));
    const codeStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "code.css"));
    const responsiveStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "responsive.css"));

    const robotGifUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "images", "robot.gif"));
    const flexLogoUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "images", "logo_flex.svg"));
    const highlighterUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "syntax", "highlighter.js"));
    const domManagerUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "ui", "domManager.js"));
    const chatJsUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "chat.js"));
    const nonce = getNonce();
    const config = ConfigService.getConfig();
    const configValidation = ConfigService.validateConfig();
    const flexDatasetService = FlexDatasetService.getInstance();
    const isDatasetLoaded = flexDatasetService.isDatasetLoaded();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} data: https:; connect-src https:; font-src ${webview.cspSource} https:;">
      <title>Flex Programming Assistant</title>
      <link rel="stylesheet" href="${resetStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${baseStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${headerStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${chatStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${inputStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${codeStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${responsiveStyleUri}" nonce="${nonce}">
    </head>
    <body data-config-status="${configValidation.isValid ? 'valid' : 'invalid'}">
      <div id="maincont">
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
      <script src="${highlighterUri}" nonce="${nonce}"></script>
      <script src="${domManagerUri}" nonce="${nonce}"></script>
      <script src="${chatJsUri}" nonce="${nonce}"></script>
    </body>
    </html>`;
  }
} 