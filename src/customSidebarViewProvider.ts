import * as vscode from "vscode";
import axios from "axios";

export class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "flexChatbot.openview";

  private _view?: vscode.WebviewView;
  private _conversationHistory: {role: string, content: string}[] = [];
  private _availableModels: any[] = [];
  private _isModelListLoaded = false;

  constructor(private readonly _extensionUri: vscode.Uri) {
    // Fetch available models when the extension is loaded
    this.fetchAvailableModels();
  }

  // Public methods
  public async getAvailableModels(): Promise<any[]> {
    // If models aren't loaded yet, try to fetch them
    if (!this._isModelListLoaded) {
      await this.fetchAvailableModels();
    }
    return this._availableModels;
  }

  public resetChat(): void {
    this._conversationHistory = [];
    if (this._view) {
      this._view.webview.postMessage({ command: 'chatCleared' });
    }
  }

  public refreshWebview(): void {
    if (this._view) {
      this._view.webview.html = this.getHtmlContent(this._view.webview);
    }
  }

  // Fetch available models from OpenRouter API
  private async fetchAvailableModels() {
    try {
      const apiKey = vscode.workspace.getConfiguration('flexChatbot').get('apiKey') as string;
      
      if (apiKey && apiKey.trim() !== '') {
        const response = await axios.get('https://openrouter.ai/api/v1/models', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://github.com/flex/flex-chatbot',
            'X-Title': 'Flex Chat Bot'
          }
        });
        
        if (response.data && Array.isArray(response.data.data)) {
          this._availableModels = response.data.data;
          this._isModelListLoaded = true;

          // Get the current selected model
          const currentModel = vscode.workspace.getConfiguration('flexChatbot').get('model') as string;
          
          // Create QuickPick items from the available models
          const items = this._availableModels.map(model => ({
            label: model.id,
            description: `${model.context_length} tokens - ${model.pricing?.prompt ? '$' + model.pricing.prompt.toFixed(6) + '/1K prompt tokens' : 'Pricing N/A'}`,
            detail: model.description || ''
          }));
          
          // Update the configuration schema with available models
          this.updateModelConfigurationSchema(items);
          
          // Refresh the webview if it exists
          if (this._view) {
            this._view.webview.html = this.getHtmlContent(this._view.webview);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching available models:', error);
    }
  }

  private updateModelConfigurationSchema(models: { label: string, description: string }[]) {
    // This is more of a placeholder since we can't actually modify the package.json at runtime
    // In a production environment, you'd want to store these models in user settings
    console.log('Available models:', models.map(m => m.label).join(', '));
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.html = this.getHtmlContent(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'sendMessage':
          const userMessage = message.text;
          this._conversationHistory.push({ role: "user", content: userMessage });
          
          // Check if user wants to search the web
          const isWebSearch = userMessage.toLowerCase().includes('[web]');
          
          try {
            // Get config values
            const apiKey = vscode.workspace.getConfiguration('flexChatbot').get('apiKey') as string;
            const selectedModel = vscode.workspace.getConfiguration('flexChatbot').get('model') as string;
            const temperature = vscode.workspace.getConfiguration('flexChatbot').get('temperature') as number;

            if (!apiKey || apiKey.trim() === '') {
              webviewView.webview.postMessage({ 
                command: 'aiResponse', 
                text: "Please set your OpenRouter API key in the settings (File > Preferences > Settings > Extensions > Flex Chat Bot)." 
              });
              return;
            }

            // If web search is requested and enabled in settings
            let webSearchResults = null;
            if (isWebSearch && vscode.workspace.getConfiguration('flexChatbot').get('enableWebSearch')) {
              webviewView.webview.postMessage({ 
                command: 'statusUpdate', 
                text: 'Searching the web...' 
              });
              
              // Extract the search query by removing the [web] tag
              const searchQuery = userMessage.replace(/\[web\]/gi, '').trim();
              webSearchResults = await this.performWebSearch(searchQuery);
            }

            // Generate a message to send to the AI
            let messageForAI = userMessage;
            if (webSearchResults) {
              messageForAI = `The user asked: ${userMessage.replace(/\[web\]/gi, '').trim()}\n\nHere are some search results that might help answer the query:\n${webSearchResults}\n\nPlease synthesize this information to provide a helpful answer.`;
            }

            // Send a message to the AI service
            webviewView.webview.postMessage({ 
              command: 'statusUpdate', 
              text: 'bor3i is thinking...' 
            });

            // Prepare messages for the API
            const messages = [...this._conversationHistory];
            
            // Send request to OpenRouter API
            const response = await this.callOpenRouterAPI(messages, selectedModel, temperature, apiKey);
            
            // Add AI response to conversation history
            if (response) {
              this._conversationHistory.push({ role: "assistant", content: response });
              webviewView.webview.postMessage({ command: 'aiResponse', text: response });
            }
          } catch (error) {
            console.error('Error in AI request:', error);
            webviewView.webview.postMessage({ 
              command: 'aiResponse', 
              text: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}` 
            });
          }
          break;
          
        case 'clearChat':
          this._conversationHistory = [];
          webviewView.webview.postMessage({ command: 'chatCleared' });
          break;
          
        case 'selectModel':
          vscode.commands.executeCommand('flexChatbot.selectModel');
          break;
      }
    });
  }

  private async callOpenRouterAPI(
    messages: {role: string, content: string}[], 
    model: string, 
    temperature: number,
    apiKey: string
  ): Promise<string | null> {
    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: model,
        messages: messages,
        temperature: temperature,
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://github.com/flex/flex-chatbot',
          'X-Title': 'Flex Chat Bot'
        }
      });
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
      }
      throw error;
    }
  }

  private async performWebSearch(query: string): Promise<string> {
    try {
      // Using the SerpAPI for search results
      const searchResponse = await axios.get(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=demo`);
      
      if (searchResponse.data && searchResponse.data.organic_results) {
        const results = searchResponse.data.organic_results.slice(0, 5);
        return results.map((result: any, index: number) => 
          `[${index + 1}] ${result.title}\n${result.snippet}\nURL: ${result.link}\n`
        ).join('\n');
      }
      
      return "No search results found";
    } catch (error) {
      console.error('Web search error:', error);
      return "Error performing web search";
    }
  }

  private getHtmlContent(webview: vscode.Webview): string {
    // Get the local path to main script run in the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "chat.js")
    );

    // Stylesheets
    const stylesheetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "main.css")
    );

    // Path to the image
    const robotGifUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "robot.gif")
    );

    // Get settings for API and model display
    const selectedModel = vscode.workspace.getConfiguration('flexChatbot').get('model') as string;
    const apiKey = vscode.workspace.getConfiguration('flexChatbot').get('apiKey') as string;
    const apiConfigured = apiKey && apiKey.trim() !== '';
    
    // Display the model name more user-friendly (remove the provider prefix)
    const modelDisplay = selectedModel.split('/').pop() || selectedModel;
    
    // Check if we have models loaded to display the model selection button
    const showModelSelector = this._isModelListLoaded && this._availableModels.length > 0;

    // Use a nonce to only allow a specific script to be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${stylesheetUri}" rel="stylesheet">
      <title>Flex Chat Bot</title>
    </head>
    <body>
      <div id="maincont">
        <div id="upbox">
          <div id="item-1">
            Welcome to Flex Chat Bot!
            ${apiConfigured ? 
              `<div class="model-info">Using: ${modelDisplay} ${showModelSelector ? '<button id="change-model" title="Change model">⚙️</button>' : ''}</div>` : 
              `<div class="model-info api-warning">API key not set</div>`
            }
            <button id="clear-button" title="Clear conversation">Clear</button>
          </div>
          <div id="item-2">
            <div>
              <img src="${robotGifUri}" alt="Flex Chat Bot">
            </div>
            <div id="ask">
              ........... < bor3i is here to help />
              <p class="me"><i>Powered by Flex</i></p>
            </div>
          </div>
        </div>
        <div id="chat-box"></div>
      </div>
      <div id="cont">
        <input type="text" id="user-input" placeholder="Type your message here (use [web] for web search)">
        <button id="send-button">Send</button>
      </div>
      <script nonce="${nonce}" src="${scriptUri}"></script>
      <script nonce="${nonce}">
        // Add event listener for model change button if it exists
        const changeModelBtn = document.getElementById('change-model');
        if (changeModelBtn) {
          changeModelBtn.addEventListener('click', () => {
            const vscode = acquireVsCodeApi();
            vscode.postMessage({
              command: 'selectModel'
            });
          });
        }
      </script>
    </body>
    </html>`;
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
