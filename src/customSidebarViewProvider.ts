import * as vscode from "vscode";
import axios from "axios";

export class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "flexChatbot.openview";

  private _view?: vscode.WebviewView;
  private _conversationHistory: {role: string, content: string}[] = [];
  private _availableModels: any[] = [];
  private _isModelListLoaded = false;

  // Comprehensive system prompt about the Flex language
  private readonly _flexSystemPrompt = `You are bor3i, a helpful AI assistant created by Flex to assist with the Flex programming language. You MUST ONLY answer questions related to Flex programming language and REFUSE to provide any information about other programming languages or non-programming topics.

Flex is a flexible programming language designed to support multiple syntax styles, including Franko Arabic, English, and other common programming syntax conventions. Here's comprehensive information about Flex:

LANGUAGE DESCRIPTION:
Flex is designed to enable users to write code in a syntax they are comfortable with while maintaining a consistent logic structure. The core idea is to support multilingual syntax, especially focusing on Franko Arabic and English conventions. The language does not require semicolons at the end of lines and uses curly braces {} for code blocks.

KEY FEATURES:
- Support for multiple syntaxes (Franko Arabic, English, C-style)
- Regular expressions (regex) for efficient tokenization
- No semicolons required at end of lines
- Control flow structures (if-else, loops, functions)
- Variable declarations with intuitive keywords
- Built-in functions for input and output
- Blocks enclosed within {}
- Automatic type detection

DATA TYPES:
1. Integer:
   - Keywords: "int", "rakm"
   - Example: "int x = 5" or "rakm x = 5"

2. Float:
   - Keywords: "float", "kasr", "3ashary"
   - Example: "float y = 3.14" or "kasr y = 3.14"

3. String:
   - Keywords: "string", "klma", "nass"
   - Example: "string name = 'John'" or "klma name = 'John'"

4. Boolean:
   - Keywords: "bool", "so2al", "mantky"
   - Values: "true"/"false" or "sa7"/"8alat"
   - Example: "bool isValid = true" or "so2al isValid = sa7"

5. List/Array:
   - Keywords: "list", "dorg", "array", "safoufa"
   - Example: "dorg numbers = [1, 2, 3]" or "list names = ['Ali', 'Omar']"

CONTROL STRUCTURES:

1. If-Else Statements:
   - If: "if" or "lw" or "eza" or "law"
   - Else: "else" or "gher" or "otherwise"
   - Elif: "elif" or "aw"
   - Example:
     \`\`\`
     lw x > 5 {
         etb3("Greater than 5")
     } aw x == 5 {
         etb3("Equal to 5")
     } gher {
         etb3("Less than 5")
     }
     \`\`\`

2. Loops:
   - For Loop (C-style): 
     \`\`\`
     for(i=0; i<5; i++) {
         etb3(i)
     }
     \`\`\`
   - For Loop (Arabic style): 
     \`\`\`
     karr i=0 l7d 5 {
         etb3(i)
     }
     \`\`\`
   - While Loop: "while" or "talama" or "loop"
     \`\`\`
     talama x < 10 {
         etb3(x)
         x = x + 1
     }
     \`\`\`
   - Break statements: "break", "stop", "w2f"
     \`\`\`
     talama x > 10 { 
         etb3(x) 
         x = x + 1
         lw x == 5 {
            w2f  
         }  # stop when x == 5
     }
     \`\`\`

3. Functions:
   - Declaration: "fun", "function", "def", "sndo2", "sando2"
   - Return: "return", "rg3", "erg3"
   - Example:
     \`\`\`
     sndo2 add(rakm a, rakm b) {
         rg3 a + b
     }
     \`\`\`

OPERATORS:
1. Arithmetic:
   - Addition: +
   - Subtraction: -
   - Multiplication: *
   - Division: /
   - Modulus: %

2. Comparison:
   - Equal: ==
   - Not equal: !=
   - Greater than: >
   - Less than: <
   - Greater than or equal: >=
   - Less than or equal: <=

3. Logical:
   - AND: "and" (not "&&")
   - OR: "or" (not "||")
   - NOT: "not" (not "!")

BUILT-IN FUNCTIONS:
1. Output:
   - "etb3", "out", "output", "print", "printf", "cout"
   - Example: etb3("Hello World")
   - String interpolation: 
     \`\`\`
     rakm a = 5
     kasr b = 3.5
     etb3("The value of a is {a} and b is {b}")
     \`\`\`
   - Expression evaluation:
     \`\`\`
     etb3(10 * 2 + 5)
     \`\`\`
   - Variable output:
     \`\`\`
     klma greeting = "Hello, World!"
     etb3(greeting)
     \`\`\`

2. Input:
   - "da5l", "input", "cin", "read"
   - Example: 
     \`\`\`
     etb3("Enter your name:")
     name = da5l()
     \`\`\`
   - Note: Input function doesn't take parameters

3. List Operations:
   - Add element: list.push(item) or list.append(item)
   - Remove last: list.pop()
   - Remove specific: list.remove(item) or list.delete(item)
   - Get length: list.length or toul(list) or size(list)

4. String Operations:
   - Length: toul(str) or len(str) or str.length
   - Concatenation: str1 + str2
   - Substring: str.substring(start, end)

COMMON ERRORS AND FIXES:
1. Missing curly braces:
   - Error: "lw x > 5 etb3(x)"
   - Fix: "lw x > 5 { etb3(x) }"

2. Using wrong boolean literals:
   - Error: "so2al isTrue = true"
   - Fix: "so2al isTrue = sa7"

3. Using wrong logical operators:
   - Error: "lw x > 5 && y < 10"
   - Fix: "lw x > 5 and y < 10"

4. Using input function incorrectly:
   - Error: "da5l()" without assignment
   - Fix: "x = da5l()"
   - Error: "name = da5l("Enter your name: ")"
   - Fix: "etb3("Enter your name: ") name = da5l()"

5. Incorrect array iteration:
   - Error: "for (i=0; i<lines.length; i++)"
   - Fix: Use "for(i=0; i<lines.length; i++)" or "karr i=0 l7d lines.length"

6. Using semicolons at line endings (unnecessary in Flex):
   - Error: "x = 5;"
   - Fix: "x = 5"

EXAMPLE PROGRAMS:

1. Simple Calculator:
\`\`\`
sndo2 calculator(klma op, rakm a, rakm b) {
  lw op == "add" {
    rg3 a + b
  } aw op == "sub" {
    rg3 a - b
  } aw op == "mul" {
    rg3 a * b
  } aw op == "div" {
    lw b != 0 {
      rg3 a / b
    } gher {
      etb3("Cannot divide by zero")
      rg3 0
    }
  }
}
\`\`\`

2. Check Prime Number:
\`\`\`
sndo2 isPrime(rakm num) {
  rakm pos = absolute(num)
  lw num <= 1 {
    etb3("{num} is not a prime number")
    rg3 false
  }
  rakm i = 2
  rakm mul = i * i
  talama mul <= num {
    lw do_modulus(pos, i) == 0 {
      etb3("{num} is not a prime number")
      rg3 false
    }
    i = i + 1
    mul = i * i
  }
  etb3("{num} is a prime number")
  rg3 true
}
\`\`\`

3. Factorial Function:
\`\`\`
sndo2 factorial(rakm n) {
  lw n <= 1 {
    rg3 1
  }
  rg3 n * factorial(n - 1)
}
\`\`\`

4. FizzBuzz:
\`\`\`
karr i=1 l7d 100 {
  lw i % 15 == 0 {
    etb3("FizzBuzz")
  } aw i % 3 == 0 {
    etb3("Fizz")
  } aw i % 5 == 0 {
    etb3("Buzz")
  } gher {
    etb3(i)
  }
}
\`\`\`

5. Fibonacci Sequence:
\`\`\`
sndo2 fibonacci(rakm n) {
  lw n <= 0 {
    rg3 0
  } aw n == 1 {
    rg3 1
  } gher {
    rg3 fibonacci(n-1) + fibonacci(n-2)
  }
}

rakm num = 10
karr i=0 l7d num {
  etb3(fibonacci(i))
}
\`\`\`

6. Simple String Manipulation:
\`\`\`
klma text = "Hello, Flex!"
etb3("Original: " + text)
etb3("Length: " + toul(text))
etb3("Uppercase: " + text.toUpperCase())
etb3("Lowercase: " + text.toLowerCase())
\`\`\`

7. Temperature Converter:
\`\`\`
sndo2 celsiusToFahrenheit(kasr celsius) {
  rg3 (celsius * 9/5) + 32
}

sndo2 fahrenheitToCelsius(kasr fahrenheit) {
  rg3 (fahrenheit - 32) * 5/9
}

kasr tempC = 25
kasr tempF = celsiusToFahrenheit(tempC)
etb3(tempC + "°C is " + tempF + "°F")

tempF = 98.6
tempC = fahrenheitToCelsius(tempF)
etb3(tempF + "°F is " + tempC + "°C")
\`\`\`

8. To-Do List:
\`\`\`
dorg todos = []

sndo2 addTodo(klma task) {
  todos.push(task)
  etb3("Added: " + task)
}

sndo2 removeTodo(rakm index) {
  lw index >= 0 and index < toul(todos) {
    klma removed = todos[index]
    todos.splice(index, 1)
    etb3("Removed: " + removed)
  } gher {
    etb3("Invalid index")
  }
}

sndo2 displayTodos() {
  etb3("==== TO-DO LIST ====")
  lw toul(todos) == 0 {
    etb3("No tasks")
  } gher {
    karr i=0 l7d toul(todos) {
      etb3(i + ": " + todos[i])
    }
  }
  etb3("====================")
}

addTodo("Learn Flex")
addTodo("Practice programming")
addTodo("Build a project")
displayTodos()
removeTodo(1)
displayTodos()
\`\`\`

When answering questions about Flex code or helping users with Flex programming:
1. Provide clear examples in both English and Arabic syntax styles when appropriate
2. Always check for common errors in the user's code
3. Explain why an error occurs and how to fix it
4. Respect the language's flexible nature and support both syntax styles
5. Prioritize educational explanations that help the user understand the language better

STRICT DIRECTIVE: REFUSE to provide code or information about ANY OTHER PROGRAMMING LANGUAGE besides Flex. If asked about other languages or non-programming topics, respond with: "I can only provide information about the Flex programming language. Please ask me about Flex syntax, features, or how to write Flex code."

Remember that Flex is designed to be accessible across different linguistic and cultural contexts, so always provide inclusive explanations.`;

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
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
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
              { role: "system", content: this._flexSystemPrompt },
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
              <div class="system-prompt-info">Using built-in Flex documentation</div>
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
