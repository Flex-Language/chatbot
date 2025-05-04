import * as vscode from "vscode";
import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';

export class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "flexChatbot.openview";

  private _view?: vscode.WebviewView;
  private _conversationHistory: {role: string, content: string}[] = [];
  private _availableModels: any[] = [];
  private _isModelListLoaded = false;
  private _datasetCache: any = {};
  private _isDatasetLoaded = false;

  constructor(private readonly _extensionUri: vscode.Uri) {
    // Fetch available models when the extension is loaded
    this.fetchAvailableModels();
    // Load the datasets
    this.loadDatasets();
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

  // Load all datasets from the specified paths
  private async loadDatasets() {
    try {
      const datasetPaths = [
        // path.join(this._extensionUri.fsPath, 'dataset', 'combined_data.json'),
        path.join(this._extensionUri.fsPath, 'dataset', 'data.json'),
        path.join(this._extensionUri.fsPath, 'dataset', 'data.txt'),
        path.join(this._extensionUri.fsPath, 'dataset', 'dataset.json'),
        path.join(this._extensionUri.fsPath, 'dataset', 'datset_finetune_gpt.jsonl')
      ];

      for (const datasetPath of datasetPaths) {
        try {
          if (fs.existsSync(datasetPath)) {
            const fileContent = fs.readFileSync(datasetPath, 'utf8');
            const fileExt = path.extname(datasetPath).toLowerCase();
            
            if (fileExt === '.json') {
              this._datasetCache[datasetPath] = JSON.parse(fileContent);
            } else if (fileExt === '.jsonl') {
              // Parse JSONL (one JSON object per line)
              this._datasetCache[datasetPath] = fileContent
                .split('\n')
                .filter(line => line.trim())
                .map(line => JSON.parse(line));
            } else {
              // Plain text file
              this._datasetCache[datasetPath] = fileContent;
            }
            
            console.log(`Loaded dataset: ${datasetPath}`);
          }
        } catch (err) {
          console.error(`Error loading dataset ${datasetPath}:`, err);
        }
      }
      
      this._isDatasetLoaded = Object.keys(this._datasetCache).length > 0;
      console.log(`Dataset loaded: ${this._isDatasetLoaded}`);
    } catch (error) {
      console.error("Error loading datasets:", error);
    }
  }

  // Perform a search in the loaded datasets
  private searchDatasets(query: string): string {
    if (!this._isDatasetLoaded) {
      return "No dataset loaded for reference.";
    }

    try {
      // Convert the query to lowercase for case-insensitive search
      const searchTerms = query.toLowerCase().split(/\s+/);
      
      let results: {content: string, score: number}[] = [];
      
      // Search through each dataset
      for (const [datasetPath, dataContent] of Object.entries(this._datasetCache)) {
        // Different search strategies based on data type
        if (typeof dataContent === 'string') {
          // For plain text
          const score = this.calculateRelevanceScore(dataContent.toLowerCase(), searchTerms);
          if (score > 0) {
            // Extract relevant portion
            const excerpt = this.extractRelevantSection(dataContent, searchTerms);
            results.push({
              content: `From ${path.basename(datasetPath)}:\n${excerpt}`,
              score
            });
          }
        } else if (Array.isArray(dataContent)) {
          // For array data (like JSONL)
          for (const item of dataContent) {
            const itemStr = JSON.stringify(item);
            const score = this.calculateRelevanceScore(itemStr.toLowerCase(), searchTerms);
            if (score > 0) {
              results.push({
                content: `From ${path.basename(datasetPath)}:\n${JSON.stringify(item, null, 2)}`,
                score
              });
            }
          }
        } else if (typeof dataContent === 'object') {
          // For JSON objects, do a recursive search
          this.searchNestedObject(dataContent, searchTerms, path.basename(datasetPath), results);
        }
      }
      
      // Sort results by relevance score (highest first)
      results.sort((a, b) => b.score - a.score);
      
      // Return the top results, limited to keep context size reasonable
      const maxResults = 5;
      const topResults = results.slice(0, maxResults);
      
      if (topResults.length === 0) {
        return "No relevant information found in the dataset.";
      }
      
      return topResults.map(r => r.content).join("\n\n");
    } catch (error) {
      console.error("Error searching datasets:", error);
      return "Error searching the reference dataset.";
    }
  }

  // Search nested objects recursively
  private searchNestedObject(obj: any, searchTerms: string[], datasetName: string, results: {content: string, score: number}[], path: string[] = []) {
    if (!obj) return;
    
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        // For arrays, search each element
        for (let i = 0; i < obj.length; i++) {
          this.searchNestedObject(obj[i], searchTerms, datasetName, results, [...path, i.toString()]);
        }
      } else {
        // For objects, scan properties
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Check if the key itself matches any search term
            const keyStr = key.toLowerCase();
            let keyScore = 0;
            for (const term of searchTerms) {
              if (keyStr.includes(term)) {
                keyScore += 2; // Give higher weight to key matches
              }
            }
            
            const value = obj[key];
            // If value is a primitive, check for matches
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
              const valueStr = String(value).toLowerCase();
              const valueScore = this.calculateRelevanceScore(valueStr, searchTerms);
              
              if (keyScore > 0 || valueScore > 0) {
                // If key or value matched, add the full object or specific property
                const totalScore = keyScore + valueScore;
                let contextObj: any;
                
                // Get the parent object to provide context
                if (path.length === 0) {
                  // If at root, or direct child of root, include the full object
                  contextObj = key ? { [key]: value } : obj;
                } else {
                  // Otherwise, navigate to parent
                  let parent = obj;
                  let pathCopy = [...path];
                  contextObj = { [key]: value };
                }
                
                results.push({
                  content: `From ${datasetName} (matched '${key}'):\n${JSON.stringify(contextObj, null, 2)}`,
                  score: totalScore
                });
              }
            }
            
            // Recursively search nested objects
            this.searchNestedObject(value, searchTerms, datasetName, results, [...path, key]);
          }
        }
      }
    }
  }

  // Calculate a relevance score based on term matches
  private calculateRelevanceScore(text: string, searchTerms: string[]): number {
    let score = 0;
    for (const term of searchTerms) {
      if (term.length < 3) continue; // Skip very short terms
      
      const regex = new RegExp(term, 'g');
      const matches = text.match(regex);
      if (matches) {
        // Award points based on number of matches
        score += matches.length;
      }
    }
    return score;
  }

  // Extract a relevant section of text around the search terms
  private extractRelevantSection(text: string, searchTerms: string[]): string {
    // Find the position of the first matching term
    let position = -1;
    for (const term of searchTerms) {
      if (term.length < 3) continue;
      const pos = text.toLowerCase().indexOf(term);
      if (pos !== -1 && (position === -1 || pos < position)) {
        position = pos;
      }
    }
    
    if (position === -1) {
      return text.substring(0, 500) + (text.length > 500 ? "..." : "");
    }
    
    // Extract a window of text around the match
    const contextSize = 500; // Characters before and after the match
    const start = Math.max(0, position - contextSize);
    const end = Math.min(text.length, position + contextSize);
    
    return (start > 0 ? "..." : "") + text.substring(start, end) + (end < text.length ? "..." : "");
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

            // Search the Flex language dataset for relevant information
            webviewView.webview.postMessage({ 
              command: 'statusUpdate', 
              text: 'Searching Flex language documentation...' 
            });
            
            const datasetResults = this.searchDatasets(userMessage);
            
            // Generate a message to send to the AI
            let messageForAI = userMessage;
            let systemMessage = "You are bor3i, a helpful AI assistant created by Flex to assist with the Flex programming language. ";
            
            // Add dataset context to the system message
            if (datasetResults) {
              systemMessage += "Use the following information from the Flex language documentation to answer the query. ONLY provide information that is supported by this documentation and do not hallucinate or make up details. If you don't find relevant information, admit that you don't know:\n\n" + datasetResults;
            }
            
            // Add web search results if available
            if (webSearchResults) {
              messageForAI = `The user asked: ${userMessage.replace(/\[web\]/gi, '').trim()}\n\nHere are some search results that might help answer the query:\n${webSearchResults}\n\nPlease synthesize this information to provide a helpful answer.`;
            }

            // Send a message to the AI service
            webviewView.webview.postMessage({ 
              command: 'statusUpdate', 
              text: 'bor3i is thinking...' 
            });

            // Prepare messages for the API
            const messages = [
              { role: "system", content: systemMessage },
              ...this._conversationHistory
            ];
            
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
    
    // Include dataset status
    const datasetStatus = this._isDatasetLoaded ? 
      '<div class="dataset-info">Flex documentation loaded</div>' : 
      '<div class="dataset-info warning">Flex documentation not loaded</div>';

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
              ${datasetStatus}
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
