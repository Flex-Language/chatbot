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
    const datasetStats = flexDatasetService.getDatasetStats();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} data: https:; connect-src https:; font-src ${webview.cspSource} https:;">
      <title>Flex Programming Assistant - Enhanced v3.0</title>
      <link rel="stylesheet" href="${resetStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${baseStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${headerStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${chatStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${inputStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${codeStyleUri}" nonce="${nonce}">
      <link rel="stylesheet" href="${responsiveStyleUri}" nonce="${nonce}">
      <style nonce="${nonce}">
        /* Enhanced Flex Language Specific Styles */
        .flex-enhanced {
          --flex-franco-color: #ff6b6b;
          --flex-english-color: #4ecdc4;
          --flex-accent-color: #ffa726;
          --flex-warning-color: #f44336;
          --flex-success-color: #4caf50;
          --flex-safety-bg: rgba(244, 67, 54, 0.1);
          --flex-example-bg: rgba(76, 175, 80, 0.1);
        }
        
        .flex-language-indicator {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .flex-franco { 
          background: var(--flex-franco-color); 
          color: white; 
        }
        
        .flex-english { 
          background: var(--flex-english-color); 
          color: white; 
        }
        
        .flex-mixed { 
          background: linear-gradient(90deg, var(--flex-franco-color) 50%, var(--flex-english-color) 50%); 
          color: white; 
        }
        
        .flex-safety-warning {
          background: var(--flex-safety-bg);
          border-left: 4px solid var(--flex-warning-color);
          padding: 12px 16px;
          margin: 12px 0;
          border-radius: 8px;
          font-weight: 500;
        }
        
        .flex-safety-warning::before {
          content: "⚠️ ";
          font-weight: bold;
        }
        
        .flex-code-example {
          background: var(--flex-example-bg);
          border-left: 4px solid var(--flex-success-color);
          padding: 12px 16px;
          margin: 12px 0;
          border-radius: 8px;
        }
        
        .flex-code-example::before {
          content: "✅ ";
          font-weight: bold;
        }
        
        .flex-keyword-mapping {
          display: inline-grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 8px;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px 12px;
          border-radius: 8px;
          margin: 4px 2px;
          font-family: var(--font-family-mono);
          font-size: 0.85rem;
        }
        
        .flex-franco-keyword {
          color: var(--flex-franco-color);
          font-weight: 600;
        }
        
        .flex-english-keyword {
          color: var(--flex-english-color);
          font-weight: 600;
        }
        
        .flex-arrow {
          color: var(--text-muted);
        }
        
        .syntax-comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .syntax-comparison-table th,
        .syntax-comparison-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .syntax-comparison-table th {
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          color: var(--flex-accent-color);
        }
        
        .dataset-info {
          font-size: 0.75rem;
          color: var(--text-muted);
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          margin-left: 8px;
        }
        
        .flex-features {
          display: flex;
          gap: 8px;
          margin: 8px 0;
          justify-content: center;
        }
        
        .dataset-summary {
          margin-top: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .input-hints {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0 4px;
          max-width: 100%;
          overflow-x: auto;
        }
        
        .hint-item {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 12px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          user-select: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        
        .hint-item:hover {
          background: rgba(59, 130, 246, 0.2);
          color: var(--text-primary);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .hint-item:active {
          transform: translateY(0) scale(0.95);
          background: rgba(59, 130, 246, 0.3);
        }
        
        .hint-item:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      </style>
    </head>
    <body data-config-status="${configValidation.isValid ? 'valid' : 'invalid'}" class="flex-enhanced">
      <div id="maincont">
        <div id="header-bar">
          <div class="header-left">
            <img src="${flexLogoUri}" alt="Flex" class="header-logo">
            <span class="header-title">Flex Assistant</span>
            <span class="dataset-info">v${datasetStats.version} • ${datasetStats.totalKeywords} keywords</span>
            <div class="status-indicators">
              <span class="status-dot ${configValidation.isValid ? 'success' : 'warning'}" title="${configValidation.isValid ? 'Configuration Ready' : 'Check Settings'}"></span>
              <span class="status-dot ${isDatasetLoaded ? 'success' : 'loading'}" title="${isDatasetLoaded ? 'Enhanced Dataset Loaded' : 'Loading Dataset'}"></span>
              <span class="status-dot ${datasetStats.repositoryAligned ? 'success' : 'warning'}" title="Repository Aligned v3.0"></span>
            </div>
          </div>
          <div class="header-right">
            <div class="model-display">${config.model || 'Default'}</div>
            <button id="syntax-toggle" class="icon-button" title="Toggle Franco/English Examples">🔄</button>
            <button id="clear-button" class="icon-button" title="Clear Chat">🗑️</button>
            <button id="change-model" class="icon-button" title="Change Model">⚙️</button>
          </div>
        </div>
        <div id="chat-box">
          <div class="welcome-message">
            <div class="bot-avatar">
              <img src="${robotGifUri}" alt="Flex Assistant">
            </div>
            <div class="welcome-content">
              <h3>Welcome to Enhanced Flex Programming Assistant! 🚀</h3>
              <p>I'm powered by the latest Flex-Language/Flex repository specifications with comprehensive Franco-Arabic and English syntax support.</p>
              <div class="flex-features">
                <span class="flex-language-indicator flex-franco">Franco</span>
                <span class="flex-language-indicator flex-english">English</span>
                <span class="flex-language-indicator flex-mixed">Mixed</span>
              </div>
              <div class="dataset-summary">
                <small>Dataset: ${datasetStats.totalKeywords} keywords • ${datasetStats.totalExamples} examples • ${datasetStats.safetyWarnings} safety warnings</small>
              </div>
            </div>
          </div>
        </div>
        <div id="input-section">
          <div class="input-container">
            <div class="input-wrapper">
              <textarea 
                id="user-input" 
                placeholder="Ask me anything about Flex programming... (Franco: 'karr l7d 10 { etb3(i) }' or English: 'for(i=0; i<10; i++) { print(i) }')"
                rows="1"
                maxlength="4000"
              ></textarea>
              <button id="send-button" class="send-button">
                <span class="send-icon">📤</span>
              </button>
            </div>
            <div class="input-hints">
              <span class="hint-item">💡 Try: "Show me a safe loop in Franco"</span>
              <span class="hint-item">🔍 Ask: "Explain the difference between Franco 'lw' and English 'if'"</span>
              <span class="hint-item">⚠️ Safety: "How to avoid l7d loop errors?"</span>
              <span class="hint-item">🎮 Example: "Write me a simple calculator"</span>
              <span class="hint-item">🌐 Mixed: "Explain Franco-English syntax mixing"</span>
              <span class="hint-item">📝 Code: "Convert this to Flex: for i in range(10)"</span>
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