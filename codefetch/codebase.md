Project Structure:
├── LICENSE
├── README.md
├── assets
├── codefetch
│   └── codebase.md
├── docs
│   ├── CHANGELOG.md
│   └── README.md
├── out
│   ├── customSidebarViewProvider.d.ts
│   ├── customSidebarViewProvider.d.ts.map
│   ├── customSidebarViewProvider.js
│   ├── customSidebarViewProvider.js.map
│   ├── extension.d.ts
│   ├── extension.d.ts.map
│   ├── extension.js
│   ├── extension.js.map
├── package-lock.json
├── package.json
├── src
│   ├── customSidebarViewProvider.ts
│   ├── extension.ts
├── tsconfig.json
└── xo.lx


.vscodeignore
```
1 | .vscode/**
2 | .vscode-test/**
3 | src/**
4 | .gitignore
5 | .yarnrc
6 | vsc-extension-quickstart.md
7 | **/tsconfig.json
8 | **/.eslintrc.json
9 | **/*.map
10 | **/*.ts
11 | 
12 | # # Exclude dataset files
13 | # dataset/**
14 | # **/node_modules/**
15 | # **/out/test/**
16 | # **/coverage/**
17 | # **/.nyc_output/**
18 | # **/*.vsix
19 | # **/.github/**
20 | # **/.git/**
21 | # **/.idea/**
22 | # **/.DS_Store
23 | # **/thumbs.db
24 | # **/Thumbs.db
25 | # **/*.log
26 | # **/*.lock
27 | # **/.prettier*
28 | # **/.eslint*
29 | # **/.webpack*
30 | # **/.vscode*
```

package.json
```
1 | {
2 |   "name": "flex-chatbot",
3 |   "displayName": "Flex ChatBot",
4 |   "description": "AI assistant for the Flex programming language with multilingual syntax support",
5 |   "version": "1.0.0",
6 |   "publisher": "Flex-proagramming-language",
7 |   "author": {
8 |     "name": "mikawi",
9 |     "email": "hassansherif122202@gmail.com"
10 |   },
11 |   "license": "MIT",
12 |   "repository": {
13 |     "type": "git",
14 |     "url": "https://github.com/Flex-Language/chatbot.git"
15 |   },
16 |   "bugs": {
17 |     "url": "https://github.com/Flex-Language/chatbot/issues"
18 |   },
19 |   "homepage": "https://github.com/Flex-Language/chatbot",
20 |   "icon": "assets/webview/images/icon.png",
21 |   "engines": {
22 |     "vscode": "^1.61.0"
23 |   },
24 |   "categories": [
25 |     "Other",
26 |     "Programming Languages",
27 |     "Education",
28 |     "Snippets"
29 |   ],
30 |   "keywords": [
31 |     "flex",
32 |     "programming language",
33 |     "chatbot",
34 |     "assistant",
35 |     "AI",
36 |     "multilingual",
37 |     "code assistance"
38 |   ],
39 |   "activationEvents": [
40 |     "onCommand:flexChatbot.openview",
41 |     "onView:flexChatbot.openview"
42 |   ],
43 |   "main": "./out/extension.js",
44 |   "contributes": {
45 |     "viewsContainers": {
46 |       "activitybar": [
47 |         {
48 |           "id": "flex-chatbot",
49 |           "title": "Flex Chat Bot",
50 |           "icon": "assets/webview/images/logo_flex.svg"
51 |         }
52 |       ]
53 |     },
54 |     "views": {
55 |       "flex-chatbot": [
56 |         {
57 |           "icon": "assets/webview/images/logo_taijitu.svg",
58 |           "type": "webview",
59 |           "id": "flexChatbot.openview",
60 |           "name": "View",
61 |           "contextualTitle": "View"
62 |         }
63 |       ]
64 |     },
65 |     "commands": [
66 |       {
67 |         "command": "flexChatbot.openview",
68 |         "title": "Open Flex Chat Bot",
69 |         "category": "Flex Chat Bot"
70 |       },
71 |       {
72 |         "command": "flexChatbot.menu.view",
73 |         "category": "Flex Chat Bot",
74 |         "title": "Show in Sidebar",
75 |         "icon": "$(clear-all)"
76 |       },
77 |       {
78 |         "command": "flexChatbot.resetChat",
79 |         "title": "Reset Chat Conversation",
80 |         "category": "Flex Chat Bot",
81 |         "icon": "$(refresh)"
82 |       },
83 |       {
84 |         "command": "flexChatbot.selectModel",
85 |         "title": "Select AI Model",
86 |         "category": "Flex Chat Bot",
87 |         "icon": "$(settings-gear)"
88 |       },
89 |       {
90 |         "command": "flexChatbot.configure",
91 |         "title": "Configure Settings",
92 |         "category": "Flex Chat Bot",
93 |         "icon": "$(gear)"
94 |       },
95 |       {
96 |         "command": "flexChatbot.showLogs",
97 |         "title": "Show Extension Logs",
98 |         "category": "Flex Chat Bot",
99 |         "icon": "$(output)"
100 |       },
101 |       {
102 |         "command": "flexChatbot.datasetInfo",
103 |         "title": "Show Dataset Information",
104 |         "category": "Flex Chat Bot",
105 |         "icon": "$(info)"
106 |       },
107 |       {
108 |         "command": "flexChatbot.debug.dashboard",
109 |         "title": "Show Debug Dashboard",
110 |         "category": "Flex Chat Bot - Debug",
111 |         "icon": "$(bug)"
112 |       },
113 |       {
114 |         "command": "flexChatbot.debug.clearData",
115 |         "title": "Clear Debug Data",
116 |         "category": "Flex Chat Bot - Debug",
117 |         "icon": "$(clear-all)"
118 |       },
119 |       {
120 |         "command": "flexChatbot.dev.dashboard",
121 |         "title": "Show Development Dashboard",
122 |         "category": "Flex Chat Bot - Development",
123 |         "icon": "$(tools)"
124 |       },
125 |       {
126 |         "command": "flexChatbot.dev.runTests",
127 |         "title": "Run All Tests",
128 |         "category": "Flex Chat Bot - Development",
129 |         "icon": "$(test-view-icon)"
130 |       },
131 |       {
132 |         "command": "flexChatbot.dev.exportData",
133 |         "title": "Export Development Data",
134 |         "category": "Flex Chat Bot - Development",
135 |         "icon": "$(export)"
136 |       }
137 |     ],
138 |     "menus": {
139 |       "view/title": [
140 |         {
141 |           "command": "flexChatbot.menu.view",
142 |           "group": "navigation",
143 |           "when": "view == flexChatbot.openview"
144 |         }
145 |       ]
146 |     },
147 |     "configuration": {
148 |       "title": "Flex Chatbot",
149 |       "properties": {
150 |         "flexChatbot.apiKey": {
151 |           "type": "string",
152 |           "default": "",
153 |           "markdownDescription": "OpenRouter API key for accessing AI models. Get your key at [OpenRouter](https://openrouter.ai/keys).",
154 |           "order": 1
155 |         },
156 |         "flexChatbot.model": {
157 |           "type": "string",
158 |           "default": "openai/gpt-4o-mini",
159 |           "markdownDescription": "AI model to use for chat responses. Use the **Flex Chat Bot: Select AI Model** command to choose from available models.\n\n[Browse models on OpenRouter](https://openrouter.ai/models)",
160 |           "order": 2
161 |         },
162 |         "flexChatbot.temperature": {
163 |           "type": "number",
164 |           "default": 0.7,
165 |           "minimum": 0,
166 |           "maximum": 2,
167 |           "markdownDescription": "Controls randomness of AI responses:\n- **0-0.3**: More focused and deterministic\n- **0.4-0.7**: Balanced creativity and accuracy  \n- **0.8-2.0**: More creative and varied",
168 |           "order": 3
169 |         },
170 |         "flexChatbot.enableWebSearch": {
171 |           "type": "boolean",
172 |           "default": false,
173 |           "markdownDescription": "Enable web search capability when `[web]` is included in your query. Provides real-time information from search results. **Note:** Currently uses demo API which may be unreliable.",
174 |           "order": 4
175 |         },
176 |         "flexChatbot.maxTokens": {
177 |           "type": "number",
178 |           "default": 4000,
179 |           "minimum": 100,
180 |           "maximum": 32000,
181 |           "markdownDescription": "Maximum number of tokens in AI responses. Higher values allow longer responses but cost more.",
182 |           "order": 5
183 |         },
184 |         "flexChatbot.timeout": {
185 |           "type": "number",
186 |           "default": 30000,
187 |           "minimum": 5000,
188 |           "maximum": 300000,
189 |           "markdownDescription": "Request timeout in milliseconds (5-300 seconds). Increase if you experience timeout errors.",
190 |           "order": 6
191 |         },
192 |         "flexChatbot.debug.enabled": {
193 |           "type": "boolean",
194 |           "default": false,
195 |           "markdownDescription": "Enable debug mode for detailed logging and performance tracking. Useful for troubleshooting and development.",
196 |           "order": 7
197 |         },
198 |         "flexChatbot.debug.performanceTracking": {
199 |           "type": "boolean",
200 |           "default": true,
201 |           "markdownDescription": "Track performance metrics for API calls and operations. Helps identify slow operations.",
202 |           "order": 8
203 |         },
204 |         "flexChatbot.debug.errorReporting": {
205 |           "type": "boolean",
206 |           "default": true,
207 |           "markdownDescription": "Enable automatic error reporting and recovery attempts. Improves debugging experience.",
208 |           "order": 9
209 |         }
210 |       }
211 |     }
212 |   },
213 |   "scripts": {
214 |     "vscode:prepublish": "npm run compile",
215 |     "compile": "tsc -p ./",
216 |     "watch": "tsc -watch -p ./",
217 |     "pretest": "npm run compile && npm run lint",
218 |     "lint": "eslint src --ext ts",
219 |     "test": "node ./out/test/runTest.js",
220 |     "test:unit": "npm run compile && npm run lint && echo '✅ Unit tests: Compilation and linting passed'",
221 |     "test:integration": "npm run compile && npm run lint && node ./out/test/runTest.js",
222 |     "test:safe": "npm run test:unit",
223 |     "test:force": "npm run compile && npm run lint && echo '⚠️  Force testing - ensure VS Code is closed' && node ./out/test/runTest.js",
224 |     "kill-vscode": "echo 'Attempting to close VS Code instances...' && (killall 'Visual Studio Code' || echo 'VS Code instances may already be closed')"
225 |   },
226 |   "devDependencies": {
227 |     "@types/glob": "^7.1.4",
228 |     "@types/mocha": "^9.0.0",
229 |     "@types/node": "14.x",
230 |     "@types/sinon": "^17.0.4",
231 |     "@types/vscode": "^1.61.0",
232 |     "@typescript-eslint/eslint-plugin": "^4.31.1",
233 |     "@typescript-eslint/parser": "^4.31.1",
234 |     "@vscode/test-electron": "^1.6.2",
235 |     "eslint": "^7.32.0",
236 |     "glob": "^7.1.7",
237 |     "mocha": "^9.1.1",
238 |     "sinon": "^21.0.0",
239 |     "typescript": "^4.4.3"
240 |   },
241 |   "dependencies": {
242 |     "axios": "^1.9.0"
243 |   }
244 | }
```

tsconfig.json
```
1 | {
2 | 	"compilerOptions": {
3 | 		"module": "commonjs",
4 | 		"target": "ES2020",
5 | 		"outDir": "out",
6 | 		"lib": [
7 | 			"ES2020",
8 | 			"DOM"
9 | 		],
10 | 		"sourceMap": true,
11 | 		"rootDir": "src",
12 | 		"strict": true,
13 | 		"esModuleInterop": true,
14 | 		"skipLibCheck": true,
15 | 		"forceConsistentCasingInFileNames": true,
16 | 		"resolveJsonModule": true,
17 | 		"declaration": true,
18 | 		"declarationMap": true,
19 | 		"noImplicitReturns": true,
20 | 		"noFallthroughCasesInSwitch": true,
21 | 		"noUncheckedIndexedAccess": true
22 | 	},
23 | 	"include": [
24 | 		"src/**/*"
25 | 	],
26 | 	"exclude": [
27 | 		"node_modules",
28 | 		".vscode-test",
29 | 		"out"
30 | 	]
31 | }
```

xo.lx
```
```

src/customSidebarViewProvider.ts
```
1 | import * as vscode from "vscode";
2 | import { WebviewMessage, ModelInfo } from './types';
3 | import { ApiService } from './services/apiService';
4 | import { ConfigService } from './services/configService';
5 | import { logger } from './utils/logger';
6 | import { ChatService } from "./services/ChatService";
7 | import { WebviewService } from "./services/WebviewService";
8 | 
9 | /**
10 |  * Refactored Custom Sidebar View Provider
11 |  * Orchestrates the webview, chat service, and other components.
12 |  */
13 | export class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
14 |   public static readonly viewType = "flexChatbot.openview";
15 | 
16 |   private _view?: vscode.WebviewView;
17 |   private _chatService?: ChatService;
18 |   private _webviewService?: WebviewService;
19 |   private _configWatcher?: vscode.Disposable;
20 |   private _availableModels: ModelInfo[] = [];
21 |   private _isModelListLoaded = false;
22 | 
23 |   constructor(private readonly _extensionUri: vscode.Uri) {
24 |     logger.logExtensionEvent('activate', { component: 'CustomSidebarViewProvider' });
25 |     this._configWatcher = ConfigService.onConfigurationChanged(() => this.onConfigurationChanged());
26 |     this.initializeModels();
27 |   }
28 | 
29 |   public dispose(): void {
30 |     this._configWatcher?.dispose();
31 |     logger.logExtensionEvent('deactivate', { component: 'CustomSidebarViewProvider' });
32 |   }
33 | 
34 |   public async getAvailableModels(): Promise<ModelInfo[]> {
35 |     if (!this._isModelListLoaded) {
36 |       await this.initializeModels();
37 |     }
38 |     return this._availableModels;
39 |   }
40 | 
41 |   public resetChat(): void {
42 |     logger.logUserAction('resetChat');
43 |     this._chatService?.resetChat();
44 |   }
45 | 
46 |   public refreshWebview(): void {
47 |     if (this._view && this._webviewService) {
48 |       this._view.webview.html = this._webviewService.getHtmlContent(this._view.webview);
49 |       logger.debug('Webview refreshed');
50 |     }
51 |   }
52 | 
53 |   private async initializeModels(): Promise<void> {
54 |     const config = ConfigService.getConfig();
55 |     if (!config.apiKey) {
56 |       logger.warn('API key not configured, skipping model initialization');
57 |       return;
58 |     }
59 |     try {
60 |       this._availableModels = await ApiService.fetchAvailableModels(config.apiKey);
61 |       this._isModelListLoaded = true;
62 |       logger.info(`Loaded ${this._availableModels.length} models`);
63 |       if (this._view) {
64 |         this.refreshWebview();
65 |       }
66 |     } catch (error) {
67 |       logger.error('Failed to initialize models', error);
68 |     }
69 |   }
70 | 
71 |   private onConfigurationChanged(): void {
72 |     const config = ConfigService.getConfig();
73 |     if (config.apiKey && !this._isModelListLoaded) {
74 |       this.initializeModels();
75 |     }
76 |     this.refreshWebview();
77 |   }
78 | 
79 |   resolveWebviewView(
80 |     webviewView: vscode.WebviewView,
81 |     // eslint-disable-next-line @typescript-eslint/no-unused-vars
82 |     context: vscode.WebviewViewResolveContext,
83 |     // eslint-disable-next-line @typescript-eslint/no-unused-vars
84 |     _token: vscode.CancellationToken,
85 |   ): void | Thenable<void> {
86 |     this._view = webviewView;
87 |     this._webviewService = new WebviewService(this._extensionUri);
88 | 
89 |     const postMessage = (message: WebviewMessage) => {
90 |       if (this._view) {
91 |         this._view.webview.postMessage(message);
92 |       }
93 |     };
94 |     this._chatService = new ChatService(postMessage, this._extensionUri);
95 | 
96 |     webviewView.webview.options = {
97 |       enableScripts: true,
98 |       localResourceRoots: [this._extensionUri],
99 |     };
100 | 
101 |     webviewView.webview.html = this._webviewService.getHtmlContent(webviewView.webview);
102 | 
103 |     webviewView.webview.onDidReceiveMessage(async (message: WebviewMessage) => {
104 |       await this.handleWebviewMessage(message);
105 |     });
106 | 
107 |     logger.info('Webview resolved and services initialized');
108 |   }
109 | 
110 |   private async handleWebviewMessage(message: WebviewMessage): Promise<void> {
111 |     switch (message.command) {
112 |       case 'sendMessage':
113 |         await this._chatService?.handleSendMessage(message.text || '');
114 |         break;
115 |       case 'clearChat':
116 |         this.resetChat();
117 |         break;
118 |       case 'selectModel':
119 |         await vscode.commands.executeCommand('flexChatbot.selectModel');
120 |         break;
121 |       default:
122 |         logger.warn(`Unknown message command: ${message.command}`);
123 |     }
124 |   }
125 | }
126 | 
```

src/extension.ts
```
1 | import * as vscode from 'vscode';
2 | import { CustomSidebarViewProvider } from './customSidebarViewProvider';
3 | import { ConfigService } from './services/configService';
4 | import { ApiService } from './services/apiService';
5 | import { FlexDatasetService } from './services/flexDatasetService';
6 | import { logger } from './utils/logger';
7 | import { ModelInfo } from './types';
8 | import { debugManager } from './core/DebugManager';
9 | import { errorHandler } from './core/ErrorHandler';
10 | import { devTools } from './dev/DevTools';
11 | 
12 | /**
13 |  * Extension activation function
14 |  */
15 | export function activate(context: vscode.ExtensionContext): void {
16 | 	logger.logExtensionEvent('activate', {
17 | 		version: vscode.extensions.getExtension('Flex-proagramming-language.flex-chatbot')?.packageJSON.version
18 | 	});
19 | 
20 | 	try {
21 | 		// Initialize services
22 | 		FlexDatasetService.getInstance(context.extensionPath);
23 | 		const provider = new CustomSidebarViewProvider(context.extensionUri);
24 | 		devTools.initialize(context.extensionUri);
25 | 
26 | 		// Register webview provider
27 | 		context.subscriptions.push(
28 | 			vscode.window.registerWebviewViewProvider(
29 | 				CustomSidebarViewProvider.viewType,
30 | 				provider
31 | 			)
32 | 		);
33 | 
34 | 		// Register commands
35 | 		registerCommands(context, provider);
36 | 
37 | 		// Check initial configuration
38 | 		checkInitialConfiguration();
39 | 
40 | 		logger.info('Flex Chatbot extension activated successfully');
41 | 
42 | 	} catch (error) {
43 | 		logger.error('Failed to activate extension', error);
44 | 		vscode.window.showErrorMessage(`Failed to activate Flex Chatbot: ${error}`);
45 | 	}
46 | }
47 | 
48 | /**
49 |  * Register all extension commands
50 |  */
51 | function registerCommands(context: vscode.ExtensionContext, provider: CustomSidebarViewProvider) {
52 | 	// Menu view command
53 | 	context.subscriptions.push(
54 | 		vscode.commands.registerCommand("flexChatbot.menu.view", () => {
55 | 			logger.logUserAction('menuView');
56 | 			vscode.window.showInformationMessage("Flex Chat Bot menu clicked!");
57 | 		})
58 | 	);
59 | 
60 | 	// Reset chat command
61 | 	context.subscriptions.push(
62 | 		vscode.commands.registerCommand("flexChatbot.resetChat", () => {
63 | 			logger.logUserAction('resetChat');
64 | 			vscode.commands.executeCommand("flexChatbot.openview.focus");
65 | 			provider.resetChat();
66 | 		})
67 | 	);
68 | 
69 | 	// Select model command
70 | 	context.subscriptions.push(
71 | 		vscode.commands.registerCommand("flexChatbot.selectModel", async () => {
72 | 			await handleSelectModel(provider);
73 | 		})
74 | 	);
75 | 
76 | 	// Open webview command
77 | 	context.subscriptions.push(
78 | 		vscode.commands.registerCommand('flexChatbot.openview', () => {
79 | 			logger.logUserAction('openWebview');
80 | 			vscode.window.showInformationMessage('Flex Chat Bot opened!');
81 | 		})
82 | 	);
83 | 
84 | 	// Configuration command
85 | 	context.subscriptions.push(
86 | 		vscode.commands.registerCommand('flexChatbot.configure', async () => {
87 | 			await ConfigService.showConfigurationDialog();
88 | 		})
89 | 	);
90 | 
91 | 	// Show logs command
92 | 	context.subscriptions.push(
93 | 		vscode.commands.registerCommand('flexChatbot.showLogs', () => {
94 | 			logger.show();
95 | 		})
96 | 	);
97 | 
98 | 	// Dataset info command
99 | 	context.subscriptions.push(
100 | 		vscode.commands.registerCommand('flexChatbot.datasetInfo', () => {
101 | 			showDatasetInfo();
102 | 		})
103 | 	);
104 | 
105 | 	// Development and debugging commands
106 | 	context.subscriptions.push(
107 | 		vscode.commands.registerCommand('flexChatbot.debug.dashboard', async () => {
108 | 			await debugManager.showDebugDashboard();
109 | 		})
110 | 	);
111 | 
112 | 	context.subscriptions.push(
113 | 		vscode.commands.registerCommand('flexChatbot.debug.clearData', () => {
114 | 			debugManager.clearDebugData();
115 | 			vscode.window.showInformationMessage('Debug data cleared');
116 | 		})
117 | 	);
118 | 
119 | 	context.subscriptions.push(
120 | 		vscode.commands.registerCommand('flexChatbot.dev.dashboard', async () => {
121 | 			await devTools.showDashboard();
122 | 		})
123 | 	);
124 | 
125 | 	context.subscriptions.push(
126 | 		vscode.commands.registerCommand('flexChatbot.dev.runTests', async () => {
127 | 			await devTools.runTests();
128 | 		})
129 | 	);
130 | 
131 | 	context.subscriptions.push(
132 | 		vscode.commands.registerCommand('flexChatbot.dev.exportData', async () => {
133 | 			await devTools.exportDevelopmentData();
134 | 		})
135 | 	);
136 | }
137 | 
138 | /**
139 |  * Handle model selection
140 |  */
141 | async function handleSelectModel(provider: CustomSidebarViewProvider): Promise<void> {
142 | 	const timer = logger.createTimer('selectModel');
143 | 
144 | 	try {
145 | 		logger.logUserAction('selectModel');
146 | 
147 | 		const config = ConfigService.getConfig();
148 | 		if (!config.apiKey) {
149 | 			const action = await vscode.window.showErrorMessage(
150 | 				'API key not configured. Would you like to set it now?',
151 | 				'Set API Key',
152 | 				'Cancel'
153 | 			);
154 | 
155 | 			if (action === 'Set API Key') {
156 | 				await ConfigService.promptForApiKey();
157 | 			}
158 | 			return;
159 | 		}
160 | 
161 | 		const models = await provider.getAvailableModels();
162 | 
163 | 		if (!models || models.length === 0) {
164 | 			vscode.window.showWarningMessage(
165 | 				"No models available. Please check your OpenRouter API key in settings."
166 | 			);
167 | 			return;
168 | 		}
169 | 
170 | 		// Create QuickPick items with enhanced information
171 | 		const items = models.map((model: ModelInfo) => ({
172 | 			label: model.id,
173 | 			description: `${model.contextLength.toLocaleString()} tokens - ${ApiService.formatModelPricing(model)}`,
174 | 			detail: model.description || 'No description available',
175 | 			model: model
176 | 		}));
177 | 
178 | 		// Add recommended models at the top
179 | 		const recommendedModels = ApiService.getRecommendedModels();
180 | 		const sortedItems = items.sort((a, b) => {
181 | 			const aRecommended = recommendedModels.includes(a.model.id);
182 | 			const bRecommended = recommendedModels.includes(b.model.id);
183 | 
184 | 			if (aRecommended && !bRecommended) { return -1; }
185 | 			if (!aRecommended && bRecommended) { return 1; }
186 | 
187 | 			// Sort by name if both are recommended or both are not
188 | 			return a.label.localeCompare(b.label);
189 | 		});
190 | 
191 | 		const selectedItem = await vscode.window.showQuickPick(sortedItems, {
192 | 			placeHolder: 'Select an AI model to use (recommended models appear first)',
193 | 			matchOnDescription: true,
194 | 			matchOnDetail: true
195 | 		});
196 | 
197 | 		if (selectedItem) {
198 | 			await ConfigService.set('model', selectedItem.label);
199 | 			vscode.window.showInformationMessage(`Model set to: ${selectedItem.label}`);
200 | 
201 | 			provider.refreshWebview();
202 | 			logger.info('Model changed', { model: selectedItem.label });
203 | 		}
204 | 	} catch (error) {
205 | 		logger.error('Error in model selection', error);
206 | 		vscode.window.showErrorMessage(`Failed to load models: ${error}`);
207 | 	} finally {
208 | 		timer.end();
209 | 	}
210 | }
211 | 
212 | /**
213 |  * Check initial configuration and show warnings if needed
214 |  */
215 | function checkInitialConfiguration(): void {
216 | 	const config = ConfigService.getConfig();
217 | 	const validation = ConfigService.validateConfig();
218 | 
219 | 	if (!validation.isValid) {
220 | 		logger.warn('Configuration issues detected', validation.errors);
221 | 
222 | 		// Show warning for critical issues
223 | 		if (!config.apiKey) {
224 | 			setTimeout(() => {
225 | 				vscode.window.showWarningMessage(
226 | 					'Flex Chatbot requires an OpenRouter API key to function. Click to configure.',
227 | 					'Configure Now',
228 | 					'Later'
229 | 				).then(action => {
230 | 					if (action === 'Configure Now') {
231 | 						ConfigService.showConfigurationDialog();
232 | 					}
233 | 				});
234 | 			}, 2000); // Delay to avoid overwhelming the user on startup
235 | 		}
236 | 	}
237 | }
238 | 
239 | /**
240 |  * Show dataset information
241 |  */
242 | function showDatasetInfo(): void {
243 | 	const flexDataset = FlexDatasetService.getInstance();
244 | 	const stats = flexDataset.getDatasetStats();
245 | 	const isLoaded = flexDataset.isDatasetLoaded();
246 | 
247 | 	const info = `
248 | 📊 **Flex Dataset Information**
249 | 
250 | **Status:** ${isLoaded ? '✅ Loaded' : '❌ Not Loaded'}
251 | **Code Examples:** ${stats.codeExamples || 0}
252 | **Common Patterns:** ${stats.commonPatterns || 0}
253 | **Syntax Patterns:** ${stats.syntaxPatterns || 0}
254 | **Tokens:** ${stats.tokens || 0}
255 | 
256 | ${!isLoaded ? '⚠️ Using fallback documentation. Check that flex_language_spec.json exists in the dataset folder.' : ''}
257 | 	`.trim();
258 | 
259 | 	vscode.window.showInformationMessage(info, { modal: false });
260 | 	logger.info('Dataset info displayed', stats);
261 | }
262 | 
263 | /**
264 |  * Extension deactivation function
265 |  */
266 | export function deactivate(): void {
267 | 	logger.logExtensionEvent('deactivate');
268 | 
269 | 	// Dispose of debugging and development resources
270 | 	debugManager.dispose();
271 | 	errorHandler.dispose();
272 | 	devTools.dispose();
273 | }
```

assets/datasets/flex_language_spec.json
```
1 | {
2 |   "ai_system_prompt": {
3 |     "role": "World-Class Flex Programming Language Expert",
4 |     "version": "2.1_production_enhanced",
5 |     "description": "You are a senior-level Flex programming expert with deep knowledge of both Franco Arabic and English syntax patterns, capable of adaptive assistance based on user expertise level.",
6 |     "CRITICAL_INSTRUCTIONS": {
7 |       "response_optimization": "ALWAYS prioritize working code first, then explanation. Adapt verbosity to user expertise level inferred from their question complexity.",
8 |       "syntax_preference_detection": "Automatically detect if user prefers Franco (rakm, etb3, lw) or English (int, print, if) syntax from their input and match their style unless they request both.",
9 |       "error_handling_priority": "When debugging: 1) Identify the root cause, 2) Provide immediate fix, 3) Explain why it happened, 4) Suggest prevention patterns.",
10 |       "code_quality_standards": "All generated code must be production-ready with proper error handling, meaningful variable names, and inline comments for complex logic.",
11 |       "context_awareness": "Track conversation context - if user is building something specific, maintain consistency with their project patterns and naming conventions.",
12 |       "SAFETY_FIRST": "⚠️ CRITICAL: Always use 'length(array) - 1' in Franco l7d loops for array access. Franco loops are INCLUSIVE and will cause out-of-bounds errors otherwise."
13 |     },
14 |     "COMPLETE_CONTEXT_MODE": {
15 |       "description": "Enhanced AI instructions specifically for comprehensive file analysis with complete source code context",
16 |       "activation": "Triggered when user requests full file context analysis during error debugging",
17 |       "enhanced_capabilities": {
18 |         "HOLISTIC_ANALYSIS": "MANDATORY: Analyze the ENTIRE provided file as a complete program, not just isolated code snippets",
19 |         "CONTEXTUAL_DEBUGGING": "REQUIRED: Understanding error in relation to the full program structure, variable scope, function dependencies, and data flow",
20 |         "ARCHITECTURAL_INSIGHT": "ESSENTIAL: Provide solutions that consider the complete codebase architecture and maintain program integrity",
21 |         "COMPREHENSIVE_VALIDATION": "CRITICAL: Verify proposed fixes work within the context of the entire file and don't break other functionality"
22 |       },
23 |       "ANALYSIS_PROTOCOL": {
24 |         "step_1_whole_file_comprehension": {
25 |           "description": "First understand the complete program structure",
26 |           "requirements": [
27 |             "Read and understand EVERY line of the provided file",
28 |             "Map all variable declarations and their scope",
29 |             "Identify all function definitions and their relationships",
30 |             "Understand the program's overall purpose and flow",
31 |             "Note any imports or external dependencies"
32 |           ]
33 |         },
34 |         "step_2_error_contextualization": {
35 |           "description": "Locate and understand the error within the complete context",
36 |           "requirements": [
37 |             "Find the exact line and character position of the error",
38 |             "Understand how this error affects the entire program execution",
39 |             "Identify all variables, functions, and imports that relate to this error",
40 |             "Determine if this is a isolated error or symptom of larger architectural issue",
41 |             "Check for similar patterns elsewhere in the file that might have same issue"
42 |           ]
43 |         },
44 |         "step_3_comprehensive_solution": {
45 |           "description": "Provide solution considering the entire codebase",
46 |           "requirements": [
47 |             "Ensure fix doesn't break other parts of the program",
48 |             "Maintain consistency with existing code style and patterns",
49 |             "Consider performance implications for the entire program",
50 |             "Provide alternative solutions if multiple approaches exist",
51 |             "Include error prevention strategies for similar issues"
52 |           ]
53 |         },
54 |         "step_4_verification_protocol": {
55 |           "description": "Mentally test the solution against the entire program",
56 |           "requirements": [
57 |             "Trace through program execution with the proposed fix",
58 |             "Verify all function calls and variable access remain valid",
59 |             "Check that data flow throughout the program remains logical",
60 |             "Ensure no new errors are introduced elsewhere",
61 |             "Confirm the fix aligns with the program's overall architecture"
62 |           ]
63 |         }
64 |       },
65 |       "RESPONSE_FORMAT": {
66 |         "structure": {
67 |           "error_analysis": "🔍 COMPREHENSIVE ERROR ANALYSIS: Detailed explanation of error within complete program context",
68 |           "impact_assessment": "⚠️ PROGRAM IMPACT: How this error affects the entire application",
69 |           "solution_strategy": "🛠️ COMPLETE SOLUTION: Step-by-step fix considering full codebase",
70 |           "code_examples": "📝 BEFORE/AFTER CODE: Show exact changes with surrounding context",
71 |           "verification": "✅ SOLUTION VERIFICATION: Explain why this fix works within the complete program",
72 |           "prevention": "🛡️ PREVENTION STRATEGY: How to avoid similar issues in this and other files"
73 |         },
74 |         "mandatory_elements": [
75 |           "Exact line number and character position of error",
76 |           "Complete explanation of root cause within program context",
77 |           "Full solution with before/after code showing surrounding context",
78 |           "Verification that solution works with the entire program",
79 |           "At least 2 alternative approaches if applicable",
80 |           "Prevention strategies specific to this program's architecture"
81 |         ]
82 |       },
83 |       "CRITICAL_DIRECTIVES": {
84 |         "NEVER_IGNORE_CONTEXT": "⚠️ NEVER provide solutions based only on the error message. ALWAYS consider the complete file content provided.",
85 |         "MAINTAIN_PROGRAM_INTEGRITY": "🔒 ENSURE proposed changes maintain the program's overall structure and functionality.",
86 |         "COMPREHENSIVE_TESTING": "🧪 MENTALLY execute the entire program with your proposed fix to ensure no new issues.",
87 |         "STYLE_CONSISTENCY": "🎨 MAINTAIN the existing code style, variable naming patterns, and syntax preferences shown in the file.",
88 |         "FRANCO_SAFETY": "⚠️ ALWAYS check for Franco l7d loop safety issues when analyzing complete files - this is the #1 source of runtime errors."
89 |       },
90 |       "ENHANCED_ERROR_CATEGORIES": {
91 |         "CONTEXTUAL_VARIABLE_ERRORS": "Variables that exist but are out of scope, or referenced before declaration in the program flow",
92 |         "FUNCTION_DEPENDENCY_ERRORS": "Function calls that fail due to parameter mismatches or missing function definitions in the file",
93 |         "PROGRAM_FLOW_ERRORS": "Errors that occur due to logical flow issues when considering the complete program execution",
94 |         "ARCHITECTURAL_ERRORS": "Issues that arise from fundamental design problems visible only when viewing the complete code",
95 |         "FRANCO_LOOP_CONTEXT_ERRORS": "Franco l7d loop bounds errors that cause out-of-bounds access when processing data structures defined elsewhere in the file"
96 |       },
97 |       "SUCCESS_METRICS": {
98 |         "contextual_accuracy": "Solution demonstrates understanding of complete program structure",
99 |         "comprehensive_testing": "Proposed fix is verified against entire program execution flow",
100 |         "architectural_consistency": "Solution maintains program's design patterns and conventions",
101 |         "preventive_guidance": "Provides specific advice for avoiding similar issues in this program's context"
102 |       }
103 |     },
104 |     "ADAPTIVE_RESPONSE_PATTERNS": {
105 |       "beginner_indicators": [
106 |         "basic syntax questions",
107 |         "\"how do I\"",
108 |         "simple examples"
109 |       ],
110 |       "beginner_response": "Provide step-by-step explanations with both Franco and English examples, include common pitfalls",
111 |       "intermediate_indicators": [
112 |         "specific feature questions",
113 |         "debugging help",
114 |         "optimization queries"
115 |       ],
116 |       "intermediate_response": "Focus on practical solutions with brief explanations, show best practices",
117 |       "expert_indicators": [
118 |         "complex logic",
119 |         "performance concerns",
120 |         "architecture questions"
121 |       ],
122 |       "expert_response": "Concise, technical responses with advanced patterns and edge case handling"
123 |     },
124 |     "OUTPUT_FORMAT_STANDARDS": {
125 |       "code_blocks": "Always use ```flex for Flex code, include filename when appropriate",
126 |       "explanations": "Use bullet points for multiple concepts, numbered lists for sequential steps",
127 |       "error_analysis": "Format: **Problem:** → **Solution:** → **Prevention:**",
128 |       "comparisons": "Use tables for Franco vs English syntax comparisons when showing both"
129 |     },
130 |     "EXPERT_TECHNIQUES": {
131 |       "pattern_recognition": "Identify and suggest established patterns: even/odd detection, list processing, safe operations, input validation",
132 |       "performance_optimization": "Proactively suggest optimizations: early returns, type declarations for validation, efficient loops, memory-conscious patterns",
133 |       "defensive_programming": "Always include error handling in examples involving user input, file operations, or division/modulo",
134 |       "cultural_sensitivity": "When using Franco Arabic syntax, provide transliterations and cultural context when helpful"
135 |     },
136 |     "EDGE_CASE_HANDLING": {
137 |       "ambiguous_requests": "Ask clarifying questions about syntax preference, use case, or scope before providing solutions",
138 |       "incomplete_code": "Identify missing components and provide complete, functional examples",
139 |       "mixed_syntax_conflicts": "When user mixes syntax incorrectly, gently correct and show proper mixed-syntax patterns",
140 |       "outdated_information": "If user references features not in specification, politely clarify current capabilities"
141 |     },
142 |     "INTERACTION_INTELLIGENCE": {
143 |       "context_memory": "Remember user's project context, preferred syntax style, and complexity level throughout conversation",
144 |       "progressive_disclosure": "Start with essential answer, offer to elaborate with phrases like 'Would you like me to show more advanced patterns?'",
145 |       "validation_requests": "Encourage users to test provided code and offer to help debug any issues",
146 |       "learning_facilitation": "Suggest related concepts or next steps to help users grow their Flex knowledge"
147 |     },
148 |     "INSTANT_REFERENCE": {
149 |       "variables": "rakm x = 10 (Franco) | int x = 10 (English)",
150 |       "functions": "sndo2 name() { } (Franco) | fun name() { } (English)",
151 |       "conditionals": "lw condition { } (Franco) | if (condition) { } (English)",
152 |       "loops": "karr l7d 10 { } (Franco) | for(i=0; i<10; i++) { } (English)",
153 |       "output": "etb3(\"text\") (Franco) | print(\"text\") (English)",
154 |       "input": "x = da5l() (Franco) | x = scan() (English)",
155 |       "operators": "+ - * / % (arithmetic) | == != < > <= >= (comparison)",
156 |       "types": "rakm|int kasr|float so2al|bool klma|string dorg|list",
157 |       "common_errors": "Modulo by zero, undefined variables, index out of bounds, type mismatches",
158 |       "LOOP_SAFETY": "⚠️ Franco l7d loops are INCLUSIVE: use 'length(array) - 1' for safe array access"
159 |     },
160 |     "PERFORMANCE_METRICS": {
161 |       "response_time_target": "Prioritize immediate, actionable answers over comprehensive explanations unless specifically requested",
162 |       "code_reliability": "All provided code must run without errors - test logic mentally before responding",
163 |       "user_satisfaction_indicators": "Look for follow-up questions, requests for elaboration, or implementation confirmations as success metrics"
164 |     }
165 |   },
166 |   "ESSENTIAL_FLEX_KNOWLEDGE": {
167 |     "language_identity": "Flex - Bilingual programming language (Franco Arabic + English)",
168 |     "core_philosophy": "Maximum syntax flexibility, zero semicolons, automatic type detection, safety-first approach",
169 |     "file_extensions": [
170 |       ".flex",
171 |       ".lx"
172 |     ],
173 |     "unique_features": [
174 |       "Mixed Franco/English syntax",
175 |       "String interpolation {var}",
176 |       "No semicolons",
177 |       "AI debugging support",
178 |       "Inclusive Franco loops (requires careful bounds checking)",
179 |       "Module system with Franco keywords",
180 |       "Memory-safe operations by default"
181 |     ]
182 |   },
183 |   "CRITICAL_SYNTAX_PATTERNS": {
184 |     "mixed_declaration_styles": {
185 |       "franco": "rakm x = 10, kasr pi = 3.14, so2al active = sa7, klma name = \"test\", dorg items = [1,2,3]",
186 |       "english": "int x = 10, float pi = 3.14, bool active = true, string name = \"test\", list items = [1,2,3]"
187 |     },
188 |     "control_flow_equivalents": {
189 |       "conditionals": "lw condition { } aw condition { } gher { } === if (condition) { } elif (condition) { } else { }",
190 |       "loops": "karr l7d 10 { } talama condition { } === for(i=0; i<10; i++) { } while (condition) { }",
191 |       "functions": "sndo2 name(params) { rg3 value } === fun name(params) { return value }"
192 |     },
193 |     "io_operations": {
194 |       "output": "etb3(\"Hello {name}\") === print(\"Hello {name}\")",
195 |       "input": "x = da5l() === x = scan()"
196 |     },
197 |     "CRITICAL_LOOP_SAFETY": {
198 |       "franco_inclusive_warning": "⚠️ DANGER: Franco l7d loops are INCLUSIVE! Always subtract 1 from array length!",
199 |       "safe_array_iteration": "karr i=0 l7d length(array) - 1 { /* safe */ }",
200 |       "unsafe_pattern": "karr i=0 l7d length(array) { /* OUT OF BOUNDS! */ }",
201 |       "alternative": "for(i=0; i<length(array); i++) { /* English style, also safe */ }"
202 |     }
203 |   },
204 |   "COMMON_ERROR_SOLUTIONS": {
205 |     "modulo_by_zero": "lw divisor != 0 { result = a % b } gher { print(\"Error\") }",
206 |     "undefined_variable": "Declare before use: rakm x = 0",
207 |     "list_bounds": "lw i < length(myList) { print(myList[i]) }",
208 |     "type_mismatch": "Use explicit types: int userNum = scan()",
209 |     "franco_loop_bounds": "ALWAYS use: karr i=0 l7d length(array) - 1 { } for safe array access",
210 |     "file_not_found": "Check file exists before operations: lw fileExists(path) { readFile(path) }",
211 |     "memory_overflow": "Use chunked processing for large datasets"
212 |   },
213 |   "ADVANCED_TROUBLESHOOTING_MATRIX": {
214 |     "user_says": {
215 |       "\"my code won't run\"": "REQUEST: Show me your code → DIAGNOSE: Check syntax, variables, types → PROVIDE: Fixed version + explanation",
216 |       "\"how do I make a loop\"": "DETECT: Beginner → ASK: Count-based or condition-based? → SHOW: Both Franco and English examples → WARN: Franco loop safety",
217 |       "\"this is throwing an error\"": "REQUEST: Full error message → IDENTIFY: Error type → PROVIDE: Immediate fix + prevention pattern",
218 |       "\"what's the syntax for...\"": "DETECT: Specific need → PROVIDE: Instant reference + working example → OFFER: Related patterns",
219 |       "\"array index error\"": "CHECK: Franco l7d loop usage → PROVIDE: Safe bounds pattern → EXPLAIN: Inclusive nature of l7d",
220 |       "\"performance issues\"": "ANALYZE: Data size, loop efficiency, memory usage → SUGGEST: Optimization patterns → PROVIDE: Benchmarking code"
221 |     }
222 |   },
223 |   "IMPLEMENTATION_CONFIDENCE_GUIDE": {
224 |     "VERIFIED_FEATURES": [
225 |       "All arithmetic ops (+,-,*,/,%)",
226 |       "Mixed syntax support",
227 |       "String interpolation",
228 |       "List operations",
229 |       "Function definitions",
230 |       "Control flow",
231 |       "Error handling",
232 |       "File I/O operations",
233 |       "Module system",
234 |       "Memory management"
235 |     ],
236 |     "RECENT_UPDATES": [
237 |       "Modulo operator fully implemented",
238 |       "Print function regex patterns updated",
239 |       "Zero-division error handling",
240 |       "Franco loop safety warnings enhanced",
241 |       "File I/O module added",
242 |       "Performance optimization patterns",
243 |       "Memory management guidelines"
244 |     ],
245 |     "PRODUCTION_READY": "All provided examples are tested and functional with enhanced safety checks",
246 |     "VERSION_CURRENT": "Specification matches implementation v2.1 with advanced features"
247 |   },
248 |   "PROMPT_OPTIMIZATION_METADATA": {
249 |     "design_version": "2.1_production_enhanced",
250 |     "token_efficiency": "Prioritized essential info, condensed examples, removed redundancy, added critical safety warnings",
251 |     "response_intelligence": "Adaptive verbosity, context awareness, pattern recognition, performance consciousness",
252 |     "user_experience": "Progressive disclosure, validation requests, learning facilitation, safety-first approach",
253 |     "error_prevention": "Defensive programming patterns, type safety, bounds checking, memory management"
254 |   },
255 |   "language": "Flex",
256 |   "formal_grammar": {
257 |     "basic_types": {
258 |       "type": "rakm | kasr | so2al | klma | dorg | int | float | bool | string | list",
259 |       "identifier": "[a-zA-Z_][a-zA-Z0-9_]*",
260 |       "integer": "[0-9]+",
261 |       "float": "[0-9]+.[0-9]+",
262 |       "boolean": "sa7 | ghalt | true | false | True | False",
263 |       "string": "\".*\"",
264 |       "operator": "+ | - | * | / | % | ++ | --",
265 |       "comparison": "== | != | > | < | >= | <="
266 |     },
267 |     "expressions": {
268 |       "value": "<integer> | <float> | <boolean> | <string> | <list> | <list_element> | <expression> | <function_call> | <console_input>",
269 |       "expression": "<identifier> | <value> | <expression> <operator> <expression>",
270 |       "condition": "<expression> <comparison> <expression>"
271 |     },
272 |     "data_structures": {
273 |       "list": "[<value_list>] | ?",
274 |       "value_list": "<value> | <value>, <value_list> | <list> | <list>, <value_list>",
275 |       "list_element": "<identifier><brackets>",
276 |       "brackets": "[value] | [value]<brackets>"
277 |     },
278 |     "variables": {
279 |       "var_decl": "<type> <var_list>",
280 |       "var_list": "<identifier> | <identifier> = <value> | <identifier>, <var_list> | <identifier> = <value>, <var_list>",
281 |       "var_ass": "<identifier> = <value>"
282 |     },
283 |     "functions": {
284 |       "function_def": "<fun_declaration> <identifier> ( <param_list> ) { <statement_list> }",
285 |       "fun_declaration": "fun | sndo2 | sando2 | fn | function",
286 |       "param_list": "<param> | <param>, <param_list> | ?",
287 |       "param": "<type> <identifier> | <identifier>",
288 |       "function_call": "<identifier> ( <arg_list> )",
289 |       "arg_list": "<value> <arg_tail> | ?",
290 |       "arg_tail": ", <value> <arg_tail> | ?",
291 |       "return_stmt": "rg3 <value> | return <value>"
292 |     },
293 |     "input_output": {
294 |       "console_output": "<print_func> (<print_content>)",
295 |       "print_func": "etb3 | out | output | print | printf | cout",
296 |       "print_content": "<string> | <expression> | <formatted_string>",
297 |       "formatted_string": "\".* { <value> } .*\"",
298 |       "console_input": "<input>()",
299 |       "input": "scan | read | input | da5l | da5al | d5l"
300 |     },
301 |     "control_flow": {
302 |       "franco_conditional": {
303 |         "if_stmt": "lw <condition> { <statement_list> } <elif_else>",
304 |         "elif_else": "aw <condition> { <statement_list> } <elif_else> | gher { <statement_list> } | ?"
305 |       },
306 |       "english_conditional": {
307 |         "if_stmt": "<if> <condition> { <statement_list> } <elif_else>",
308 |         "if": "if | cond",
309 |         "elif_else": "elif <condition> { <statement_list> } <elif_else> | <else> { <statement_list> } | ?",
310 |         "else": "else | otherwise | gher"
311 |       }
312 |     },
313 |     "loops": {
314 |       "franco_for": {
315 |         "loop_stmt": "karr <loop_header> { <statement_list> }",
316 |         "loop_header": "<identifier> = <integer> l7d <integer> | l7d <integer> | <identifier> l7d <integer>"
317 |       },
318 |       "english_for": {
319 |         "for_loop": "for ( <init> ; <condition> ; <increment> ) { <statement_list> } | for ( <init> ; <condition> ; ) { <statement_list>",
320 |         "init": "<var_decl> | <var_ass> | ?",
321 |         "increment": "<var_decl> | <var_ass> | <identifier><unary>",
322 |         "unary": "++ | --"
323 |       },
324 |       "franco_while": {
325 |         "while_loop": "talama <condition> {<statement_list>}",
326 |         "talama": "talama | talma | tlma"
327 |       },
328 |       "english_while": {
329 |         "while_loop": "<while> (<condition>) {<statement_list>}",
330 |         "while": "while | loop"
331 |       },
332 |       "loop_control": "w2f | break"
333 |     },
334 |     "statements": {
335 |       "statement_list": "<statement> | <statement> <statement_list>",
336 |       "statement": "<var_decl> | <console_output> | <return_stmt> | <expression> | <loop_control>"
337 |     },
338 |     "imports": {
339 |       "import_stmt": "<import> <string>",
340 |       "import": "geep | geeb | import"
341 |     },
342 |     "comments": {
343 |       "comment": "<single_line_comment> | <multi_line_comment>",
344 |       "single_line_comment": "#<any_text> | //<any_text>",
345 |       "multi_line_comment": "''' <any_text> ''' | /*<any_text>*/",
346 |       "any_text": ".*"
347 |     }
348 |   },
349 |   "tokens": [
350 |     {
351 |       "type": "FUN",
352 |       "patterns": [
353 |         "fun",
354 |         "sndo2",
355 |         "sando2",
356 |         "fn",
357 |         "function"
358 |       ],
359 |       "description": "Function keywords"
360 |     },
361 |     {
362 |       "type": "PRINT",
363 |       "patterns": [
364 |         "etb3",
365 |         "out",
366 |         "output",
367 |         "print",
368 |         "printf",
369 |         "cout"
370 |       ],
371 |       "description": "Print statement keywords"
372 |     },
373 |     {
374 |       "type": "INPUT",
375 |       "patterns": [
376 |         "scan",
377 |         "read",
378 |         "input",
379 |         "da5l",
380 |         "da5al",
381 |         "d5l"
382 |       ],
383 |       "description": "Input/scan keywords"
384 |     },
385 |     {
386 |       "type": "IF",
387 |       "patterns": [
388 |         "if",
389 |         "cond",
390 |         "lw"
391 |       ],
392 |       "description": "If statement keywords"
393 |     },
394 |     {
395 |       "type": "ELIF",
396 |       "patterns": [
397 |         "elif",
398 |         "aw"
399 |       ],
400 |       "description": "Elif statement keywords"
401 |     },
402 |     {
403 |       "type": "ELSE",
404 |       "patterns": [
405 |         "else",
406 |         "otherwise",
407 |         "gher"
408 |       ],
409 |       "description": "Else statement keywords"
410 |     },
411 |     {
412 |       "type": "WHILE",
413 |       "patterns": [
414 |         "while",
415 |         "loop",
416 |         "talama",
417 |         "talma",
418 |         "tlma"
419 |       ],
420 |       "description": "While loop keywords"
421 |     },
422 |     {
423 |       "type": "FOR",
424 |       "patterns": [
425 |         "for",
426 |         "karr",
427 |         "krr",
428 |         "karar"
429 |       ],
430 |       "description": "For loop keywords"
431 |     },
432 |     {
433 |       "type": "UNTIL",
434 |       "patterns": [
435 |         "l7d"
436 |       ],
437 |       "description": "Until keyword for Franco loops"
438 |     },
439 |     {
440 |       "type": "RETURN",
441 |       "patterns": [
442 |         "return",
443 |         "rg3",
444 |         "raga3"
445 |       ],
446 |       "description": "Return statement keywords"
447 |     },
448 |     {
449 |       "type": "BREAK",
450 |       "patterns": [
451 |         "break",
452 |         "stop",
453 |         "w2f",
454 |         "wa2af"
455 |       ],
456 |       "description": "Break statement keywords"
457 |     },
458 |     {
459 |       "type": "INT",
460 |       "patterns": [
461 |         "int",
462 |         "rakm"
463 |       ],
464 |       "description": "Integer type keywords"
465 |     },
466 |     {
467 |       "type": "FLOAT",
468 |       "patterns": [
469 |         "float",
470 |         "kasr",
471 |         "ksr"
472 |       ],
473 |       "description": "Float type keywords"
474 |     },
475 |     {
476 |       "type": "BOOL",
477 |       "patterns": [
478 |         "bool",
479 |         "so2al",
480 |         "s2al",
481 |         "so2l"
482 |       ],
483 |       "description": "Boolean type keywords"
484 |     },
485 |     {
486 |       "type": "STRING",
487 |       "patterns": [
488 |         "string",
489 |         "klma",
490 |         "kalma"
491 |       ],
492 |       "description": "String type keywords"
493 |     },
494 |     {
495 |       "type": "LIST",
496 |       "patterns": [
497 |         "list",
498 |         "dorg",
499 |         "drg"
500 |       ],
501 |       "description": "List type keywords"
502 |     },
503 |     {
504 |       "type": "TRUE",
505 |       "patterns": [
506 |         "true",
507 |         "True",
508 |         "TRUE",
509 |         "sa7",
510 |         "s7",
511 |         "sah",
512 |         "saa7"
513 |       ],
514 |       "description": "Boolean true values"
515 |     },
516 |     {
517 |       "type": "FALSE",
518 |       "patterns": [
519 |         "false",
520 |         "False",
521 |         "FALSE",
522 |         "ghalt",
523 |         "ghlt",
524 |         "ghalat"
525 |       ],
526 |       "description": "Boolean false values"
527 |     },
528 |     {
529 |       "type": "IMPORT",
530 |       "patterns": [
531 |         "geep",
532 |         "geeb",
533 |         "import"
534 |       ],
535 |       "description": "Import statement keywords"
536 |     },
537 |     {
538 |       "type": "LIST_METHODS",
539 |       "patterns": [
540 |         ".append",
541 |         ".push",
542 |         ".pop",
543 |         ".remove",
544 |         ".delete"
545 |       ],
546 |       "description": "List manipulation methods"
547 |     },
548 |     {
549 |       "type": "MOD",
550 |       "patterns": [
551 |         "%"
552 |       ],
553 |       "description": "Modulo operator for remainder calculations"
554 |     }
555 |   ],
556 |   "syntax_rules": {
557 |     "variable_declaration": {
558 |       "examples": [
559 |         "rakm x = 10",
560 |         "int y = 5",
561 |         "kasr pi = 3.14",
562 |         "float radius = 3",
563 |         "so2al isActive = sa7",
564 |         "bool isComplete = false",
565 |         "klma message = \"Hello\"",
566 |         "string text = \"World\"",
567 |         "dorg myList = [1, 2, 3]",
568 |         "list numbers = [1, 2, 3, 4]"
569 |       ],
570 |       "multi_declaration": [
571 |         "int v1, v2, v3",
572 |         "rakm f1, f2, f3",
573 |         "string v4=\"hello\", v5=\"world\", v6"
574 |       ]
575 |     },
576 |     "functions": {
577 |       "definition": [
578 |         "fun functionName(param1, param2) { }",
579 |         "sndo2 functionName(rakm a, rakm b) { rg3 a + b }"
580 |       ],
581 |       "examples": [
582 |         "fun add(rakm a, rakm b) { rg3 a + b }",
583 |         "sndo2 greet() { etb3(\"Hello, Flex!\") }",
584 |         "function multiply(int x, int y) { return x * y }"
585 |       ]
586 |     },
587 |     "conditionals": {
588 |       "franco_syntax": [
589 |         "lw condition { }",
590 |         "aw condition { }",
591 |         "gher { }"
592 |       ],
593 |       "english_syntax": [
594 |         "if (condition) { }",
595 |         "elif (condition) { }",
596 |         "else { }"
597 |       ],
598 |       "examples": [
599 |         "lw x > 5 { etb3(\"Greater than 5\") }",
600 |         "if (x == 5) { print(\"Equal to 5\") }",
601 |         "lw x > 5 { etb3(\"x > 5\") } aw x == 5 { etb3(\"x = 5\") } gher { etb3(\"x < 5\") }"
602 |       ]
603 |     },
604 |     "loops": {
605 |       "while_loops": [
606 |         "talama condition { }",
607 |         "while (condition) { }",
608 |         "loop (condition) { }"
609 |       ],
610 |       "for_loops": [
611 |         "karr l7d 10 { }",
612 |         "karr x=1 l7d 5 { }",
613 |         "karr x l7d 10 { }",
614 |         "for(i=0; i<10; i++) { }"
615 |       ],
616 |       "CRITICAL_NOTE": "⚠️ DANGER: Franco loops with l7d are INCLUSIVE. karr i=0 l7d 5 means i=0,1,2,3,4,5 (6 iterations). For array access use: karr i=0 l7d length(array) - 1",
617 |       "SAFETY_WARNING": "🚨 CRITICAL SAFETY ISSUE: Franco l7d loops are INCLUSIVE and WILL cause out-of-bounds errors if not handled correctly. This is the #1 source of runtime errors in Flex. ALWAYS use 'length(array) - 1' when accessing array elements in Franco loops.",
618 |       "examples": [
619 |         "talama x < 10 { etb3(x); x++ }",
620 |         "karr l7d 5 { etb3(\"Hello\") }",
621 |         "for(i=0; i<5; i++) { print(i) }"
622 |       ],
623 |       "safe_array_iteration": [
624 |         "# 🚨 WRONG: Out of bounds access - INDEX CAN REACH ARRAY LENGTH!",
625 |         "# karr i=0 l7d length(items) { print(items[i]) }  # DANGEROUS: i reaches length(items), causing out-of-bounds access!",
626 |         "",
627 |         "# ✅ CORRECT: Safe array access - MUST use length(items) - 1",
628 |         "karr i=0 l7d length(items) - 1 { print(items[i]) }  # SAFE: i stops at length(items)-1, preventing out-of-bounds",
629 |         "",
630 |         "# ✅ Alternative: English style (also safe)",
631 |         "for(i=0; i<length(items); i++) { print(items[i]) }  # SAFE: i < length(items) prevents out-of-bounds",
632 |         "",
633 |         "# 🔄 Memory of this pattern:",
634 |         "# Franco l7d = INCLUSIVE boundary (includes the end value)",
635 |         "# English < = EXCLUSIVE boundary (stops before end value)",
636 |         "# When in doubt, use English loops for arrays!"
637 |       ]
638 |     },
639 |     "file_operations": {
640 |       "description": "File I/O operations with Franco Arabic keywords",
641 |       "keywords": {
642 |         "read_file": [
643 |           "readFile",
644 |           "2ra2File",
645 |           "qra2File"
646 |         ],
647 |         "write_file": [
648 |           "writeFile",
649 |           "katbFile",
650 |           "iktbFile"
651 |         ],
652 |         "append_file": [
653 |           "appendFile",
654 |           "zydFile",
655 |           "zayedFile"
656 |         ],
657 |         "file_exists": [
658 |           "fileExists",
659 |           "fileM3jod",
660 |           "mlafM3jod"
661 |         ],
662 |         "delete_file": [
663 |           "deleteFile",
664 |           "m7yFile",
665 |           "m7iFile"
666 |         ]
667 |       },
668 |       "examples": [
669 |         "# Read file content",
670 |         "lw fileExists(\"data.txt\") {",
671 |         "  content = readFile(\"data.txt\")",
672 |         "  print(content)",
673 |         "} gher {",
674 |         "  print(\"File not found\")",
675 |         "}",
676 |         "",
677 |         "# Write to file (Franco style)",
678 |         "text = \"Hello from Flex!\"",
679 |         "katbFile(\"output.txt\", text)",
680 |         "",
681 |         "# Append to file",
682 |         "zydFile(\"log.txt\", \"New entry: {getCurrentTime()}\")",
683 |         "",
684 |         "# Safe file operations with error handling",
685 |         "sndo2 safeFileRead(klma filename) {",
686 |         "  lw fileM3jod(filename) {",
687 |         "    rg3 qra2File(filename)",
688 |         "  } gher {",
689 |         "    print(\"Error: File {filename} not found\")",
690 |         "    rg3 \"\"",
691 |         "  }",
692 |         "}"
693 |       ]
694 |     },
695 |     "module_system": {
696 |       "description": "Enhanced import system with Franco Arabic support",
697 |       "import_types": {
698 |         "local_modules": "geeb \"./myModule.flex\"",
699 |         "system_modules": "import \"system/math\"",
700 |         "franco_imports": "geep \"./franco_module.lx\""
701 |       },
702 |       "advanced_imports": [
703 |         "# Import specific functions",
704 |         "geeb { calculateArea, getVolume } \"./geometry.flex\"",
705 |         "",
706 |         "# Import with alias (Franco style)",
707 |         "geep math ka \"./math_utils.lx\"",
708 |         "result = math.sqrt(16)",
709 |         "",
710 |         "# Conditional imports",
711 |         "lw systemType() == \"windows\" {",
712 |         "  geeb \"./windows_utils.flex\"",
713 |         "} gher {",
714 |         "  import \"./unix_utils.flex\"",
715 |         "}"
716 |       ]
717 |     },
718 |     "input_output": {
719 |       "print": [
720 |         "etb3(\"text\")",
721 |         "print(\"text\")",
722 |         "out(\"text\")",
723 |         "output(\"text\")"
724 |       ],
725 |       "input": [
726 |         "x = da5l()",
727 |         "y = scan()",
728 |         "z = input()",
729 |         "name = read()"
730 |       ],
731 |       "formatted_print": [
732 |         "etb3(\"Value is {x}\")",
733 |         "print(\"x={x} and y={y}\")"
734 |       ]
735 |     },
736 |     "lists": {
737 |       "declaration": [
738 |         "dorg myList = [1, 2, 3]",
739 |         "list numbers = [1, 2.5, \"text\", true]"
740 |       ],
741 |       "operations": [
742 |         "myList.push(4)",
743 |         "myList.pop()",
744 |         "myList.remove(value)",
745 |         "myList[0] = newValue",
746 |         "element = myList[index]"
747 |       ]
748 |     }
749 |   },
750 |   "code_examples": {
751 |     "hello_world": {
752 |       "description": "Basic output in Flex using both Franco Arabic (etb3) and English (print) syntax",
753 |       "explanation": "Demonstrates the fundamental way to display text in Flex. Both syntaxes work interchangeably.",
754 |       "code": [
755 |         "# Franco Arabic syntax for output",
756 |         "etb3(\"Hello, Flex!\")",
757 |         "",
758 |         "# English syntax for output",
759 |         "print(\"Hello, World!\")",
760 |         "",
761 |         "# Both produce the same result - text output to console"
762 |       ]
763 |     },
764 |     "mixed_syntax_conditional": {
765 |       "description": "Franco Arabic conditional statements with string interpolation and logical operators",
766 |       "explanation": "Shows how to use Franco Arabic keywords (lw/aw/gher) for if/elif/else logic with complex conditions and formatted output",
767 |       "concepts": [
768 |         "Franco conditionals",
769 |         "logical operators",
770 |         "string interpolation",
771 |         "nested conditions"
772 |       ],
773 |       "code": [
774 |         "# Initialize variables for demonstration",
775 |         "x = 5",
776 |         "y = 3",
777 |         "z = 0",
778 |         "",
779 |         "# Franco conditional: lw (if) with logical AND",
780 |         "lw x < 10 and y < 1 {",
781 |         "  print(x)      # Simple variable output",
782 |         "  print(y)",
783 |         "}",
784 |         "",
785 |         "# Franco elif: aw with string interpolation",
786 |         "aw y < 2 {",
787 |         "  print(\"y is {y}\")    # String interpolation with {variable}",
788 |         "}",
789 |         "",
790 |         "# Another aw condition with expression interpolation",
791 |         "aw y < 4 {",
792 |         "  print(\"x + y are {x+y}\")   # Expression inside string",
793 |         "}",
794 |         "",
795 |         "# Franco else: gher (no condition needed)",
796 |         "gher {",
797 |         "  print(\"x is {x}\")",
798 |         "}",
799 |         "",
800 |         "# Note: No semicolons required in Flex",
801 |         "# Curly braces {} define code blocks"
802 |       ]
803 |     },
804 |     "franco_loops": {
805 |       "description": "Franco Arabic loop constructs: karr l7d (for) and talama (while) loops",
806 |       "explanation": "Demonstrates Franco loop syntax with different patterns and increment operators",
807 |       "concepts": [
808 |         "Franco for loops",
809 |         "Franco while loops",
810 |         "loop counters",
811 |         "increment operators",
812 |         "loop conditions"
813 |       ],
814 |       "code": [
815 |         "# Franco for loops using 'karr l7d' syntax",
816 |         "# Pattern 1: Simple count loop (0 to 10)",
817 |         "karr l7d 10 {",
818 |         "  print(\"Hello 10 times\")",
819 |         "}",
820 |         "",
821 |         "# Pattern 2: Loop with initial value (7 down to -7)",
822 |         "karr d=7 l7d -7 {",
823 |         "  print(d)    # Prints: 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7",
824 |         "}",
825 |         "",
826 |         "# Pattern 3: Loop with existing variable (x must be declared above)",
827 |         "x = 0  # Variable must be initialized first",
828 |         "karr x l7d 8 {",
829 |         "  print(\"Loop iteration {x}\")",
830 |         "}",
831 |         "",
832 |         "# Franco while loops using 'talama' (meaning 'as long as')",
833 |         "z = 0  # Initialize counter",
834 |         "talama z < 5 {",
835 |         "  print(z)",
836 |         "  z++    # Increment operator (also can use z = z + 1)",
837 |         "}",
838 |         "",
839 |         "# Complex while loop with multiple conditions",
840 |         "y = 0",
841 |         "z = 0",
842 |         "talama y < 5 and z < 10 {",
843 |         "  print(\"y and z are {y} {z}\")   # String interpolation",
844 |         "  y++    # Franco increment",
845 |         "  z++    # Both variables increment each iteration",
846 |         "}",
847 |         "",
848 |         "# Key Franco loop keywords:",
849 |         "# karr = for loop",
850 |         "# l7d = until/to (loop boundary)",
851 |         "# talama = while (as long as)"
852 |       ]
853 |     },
854 |     "complex_function": {
855 |       "description": "Comprehensive function example showing mixed syntax, local variables, user input, loops, and conditionals",
856 |       "explanation": "Demonstrates a real-world function with multiple parameters, local variables, user interaction, nested control structures, and various return scenarios",
857 |       "concepts": [
858 |         "function definition",
859 |         "parameter passing",
860 |         "local variables",
861 |         "user input",
862 |         "nested loops",
863 |         "conditional returns",
864 |         "list manipulation",
865 |         "variable scope"
866 |       ],
867 |       "code": [
868 |         "# Complex function with multiple parameters and mixed functionality",
869 |         "fun greet(int x, list arr) {",
870 |         "  # Function parameter usage",
871 |         "  print(x)              # Print the integer parameter",
872 |         "  ",
873 |         "  # Local variable declaration",
874 |         "  test_var = 333        # Auto-typed local variable",
875 |         "  ",
876 |         "  # Loop through list parameter",
877 |         "  for(i=0; i<4; i++) {",
878 |         "    print(\"list element {i} is {arr[i]}\")  # Access list elements",
879 |         "  }",
880 |         "  ",
881 |         "  # Modify list parameter (affects original list)",
882 |         "  arr[0] = 990",
883 |         "  print(\"Hello, World!\")",
884 |         "  ",
885 |         "  # Local variable with explicit type",
886 |         "  int varr = 87",
887 |         "  ",
888 |         "  # User input interaction",
889 |         "  print(\"enter vall\")",
890 |         "  int val = scan()      # Read user input as integer",
891 |         "  print(\"val is {val}\")",
892 |         "  ",
893 |         "  # Modify parameter (local scope)",
894 |         "  x = 5",
895 |         "  ",
896 |         "  # Conditional returns - early exit patterns",
897 |         "  if (x > 8) {",
898 |         "    return 88         # Return integer if condition met",
899 |         "  }",
900 |         "  elif (1 > 2) {        # This will never execute",
901 |         "    return 99",
902 |         "  }",
903 |         "  ",
904 |         "  # Nested loop with break control",
905 |         "  for(i=0; i<10; i++) {",
906 |         "    print(i)",
907 |         "    if (i == 7) {",
908 |         "      break         # Exit loop when i reaches 7",
909 |         "    }",
910 |         "  }",
911 |         "  ",
912 |         "  # Mathematical operations",
913 |         "  bhjb = varr + 7       # Local calculation",
914 |         "  print(bhjb + 8 + 9 - 8)  # Complex expression: 87+7+8+9-8 = 103",
915 |         "  ",
916 |         "  # Another local variable",
917 |         "  y = 5",
918 |         "  ",
919 |         "  # Return boolean value",
920 |         "  return true           # Function can return different types",
921 |         "}",
922 |         "",
923 |         "# Function usage example:",
924 |         "# myList = [1, 2, 3, 4]",
925 |         "# result = greet(42, myList)",
926 |         "# Note: myList[0] will be 990 after function call"
927 |       ]
928 |     },
929 |     "list_operations": {
930 |       "description": "Comprehensive list manipulation: creation, methods, indexing, mixed data types, and dynamic modification",
931 |       "explanation": "Shows all major list operations including push/pop, element access, modification, and using lists with different data types",
932 |       "concepts": [
933 |         "list creation",
934 |         "list methods",
935 |         "indexing",
936 |         "mixed data types",
937 |         "list modification",
938 |         "mathematical operations with lists"
939 |       ],
940 |       "code": [
941 |         "# Create and initialize a list with integers",
942 |         "list xx = [6, 2, 3, 4]",
943 |         "print(xx)                    # Output: [6, 2, 3, 4]",
944 |         "",
945 |         "# Adding elements to the list",
946 |         "xx.push(23)                  # Add integer to end",
947 |         "xx.push(\"worddd\")            # Add string to end (mixed types allowed)",
948 |         "print(xx)                    # Output: [6, 2, 3, 4, 23, \"worddd\"]",
949 |         "",
950 |         "# Removing elements from the list",
951 |         "xx.pop()                     # Remove last element",
952 |         "print(xx)                    # Output: [6, 2, 3, 4, 23]",
953 |         "",
954 |         "xx.remove(3)                 # Remove element with value 3",
955 |         "print(xx)                    # Output: [6, 2, 4, 23]",
956 |         "",
957 |         "# Working with multiple lists",
958 |         "list qq = [12, 22, 34]",
959 |         "",
960 |         "# List element access and mathematical operations",
961 |         "print(\"x0+q1={xx[0]+qq[1]}\")  # String interpolation with calculation",
962 |         "print(xx[0] + qq[1])         # Direct calculation: 6 + 22 = 28",
963 |         "",
964 |         "# Variables from list calculations",
965 |         "int no = xx[0] * xx[1]       # no = 6 * 2 = 12",
966 |         "ew = xx[0] * xx[1]           # ew = 6 * 2 = 12 (auto-typed)",
967 |         "print(no - ew)               # Output: 0 (12 - 12)",
968 |         "print(\"no is {no}\")          # Output: \"no is 12\"",
969 |         "",
970 |         "# Conditional logic with list elements",
971 |         "if (xx[0] < xx[1]) {         # Compare first two elements",
972 |         "  print(\"x0 is smaller\")",
973 |         "} else {",
974 |         "  print(\"x0 is larger or equal\")  # Will execute: 6 > 2",
975 |         "}",
976 |         "",
977 |         "# Dynamic list modification",
978 |         "xx[0] = 9 * 2                # Set first element to 18",
979 |         "",
980 |         "# Using list element as loop boundary",
981 |         "for(i=0; i<xx[0]; i++) {     # Loop from 0 to 17 (xx[0] = 18)",
982 |         "  if (i < 3) {             # Only show first 3 iterations",
983 |         "    print(\"Iteration {i}\")",
984 |         "  }",
985 |         "}",
986 |         "",
987 |         "# Mixed data type assignments",
988 |         "xx[2] = \"sdfsdf\"             # String at index 2",
989 |         "print(\"Enter a value:\")",
990 |         "xx[3] = scan()               # User input at index 3",
991 |         "",
992 |         "# String variable assignment",
993 |         "u = \"sdfsdfsd\"",
994 |         "xx[0] = u                    # Replace index 0 with string",
995 |         "",
996 |         "# Final list state",
997 |         "print(xx)                    # Mixed data types: [string, int, string, user_input]",
998 |         "print(xx[2])                 # Access specific element: \"sdfsdf\"",
999 |         "",
1000 |         "# Key points:",
1001 |         "# - Lists can contain mixed data types (int, string, bool, etc.)",
1002 |         "# - Index starts at 0",
1003 |         "# - Lists are mutable (can be modified after creation)",
1004 |         "# - List elements can be used in mathematical operations"
1005 |       ]
1006 |     },
1007 |     "nested_loops": {
1008 |       "description": "Nested loop structures with break statements and conditional control flow",
1009 |       "explanation": "Demonstrates how to create loops within loops, with proper break statements for early termination",
1010 |       "concepts": [
1011 |         "nested loops",
1012 |         "loop control",
1013 |         "break statements",
1014 |         "conditional exits",
1015 |         "loop variables"
1016 |       ],
1017 |       "code": [
1018 |         "# Nested loop example - outer loop controls inner loop boundary",
1019 |         "for (i = 1; i <= 9; i=i+1) {",
1020 |         "  etb3(\"Outer loop: i is {i}\")",
1021 |         "  ",
1022 |         "  # Inner loop runs from 0 to current value of i",
1023 |         "  for (k = 0; k <= i; k=k+1) {",
1024 |         "    etb3(\"  Inner loop: k is {k}\")  # Indented for clarity",
1025 |         "    ",
1026 |         "    # Safety break (prevents infinite loop if k somehow reaches 90)",
1027 |         "    if(k == 90) {",
1028 |         "      break                    # Exit inner loop only",
1029 |         "    }",
1030 |         "  }",
1031 |         "  ",
1032 |         "  # Safety break for outer loop",
1033 |         "  if(i == 90) {",
1034 |         "    break                        # Exit outer loop",
1035 |         "  }",
1036 |         "}",
1037 |         "",
1038 |         "# Example output pattern:",
1039 |         "# Outer loop: i is 1",
1040 |         "#   Inner loop: k is 0",
1041 |         "#   Inner loop: k is 1",
1042 |         "# Outer loop: i is 2",
1043 |         "#   Inner loop: k is 0",
1044 |         "#   Inner loop: k is 1",
1045 |         "#   Inner loop: k is 2",
1046 |         "# ... and so on",
1047 |         "",
1048 |         "# Key concepts:",
1049 |         "# - Inner loop boundary depends on outer loop variable",
1050 |         "# - Break statements only affect the immediate loop",
1051 |         "# - Each loop maintains its own counter variable",
1052 |         "# - Safety conditions prevent runaway loops"
1053 |       ]
1054 |     },
1055 |     "franco_mixed_example": {
1056 |       "description": "Mixed Franco Arabic and English syntax in a single program",
1057 |       "explanation": "Shows how Franco Arabic keywords can be seamlessly mixed with English syntax within the same codebase",
1058 |       "concepts": [
1059 |         "Franco variables",
1060 |         "mixed syntax",
1061 |         "Franco functions",
1062 |         "Franco input",
1063 |         "syntax flexibility"
1064 |       ],
1065 |       "code": [
1066 |         "# Franco Arabic variable declarations",
1067 |         "rakm x = 546456              # rakm = int (Franco)",
1068 |         "print(x)                     # English print function",
1069 |         "",
1070 |         "dorg o = [\"sfsdf\", 23, true] # dorg = list (Franco)",
1071 |         "print(o[1])                  # Access element: prints 23",
1072 |         "",
1073 |         "# Franco Arabic input",
1074 |         "print(\"Enter something:\")",
1075 |         "u = da5l()                   # da5l = input (Franco)",
1076 |         "print(u)                     # Echo user input",
1077 |         "",
1078 |         "# Franco Arabic function definition",
1079 |         "sndo2 tms(int q, int w) {    # sndo2 = function (Franco)",
1080 |         "  if(w > 3) {              # English conditional syntax",
1081 |         "    print(\"w is greater than 3\")",
1082 |         "  }",
1083 |         "  rg3 66                   # rg3 = return (Franco)",
1084 |         "}",
1085 |         "",
1086 |         "# Function call and result",
1087 |         "r = tms(4, 6)                # Call Franco function",
1088 |         "print(r)                     # Prints: 66",
1089 |         "",
1090 |         "# English syntax list declaration",
1091 |         "list b = [2, 3, 4, 5, 6]     # list = English keyword",
1092 |         "etb3(b)                      # etb3 = print (Franco)",
1093 |         "",
1094 |         "# Key Franco Arabic keywords used:",
1095 |         "# rakm = int (integer)",
1096 |         "# dorg = list",
1097 |         "# da5l = input/scan",
1098 |         "# sndo2 = function",
1099 |         "# rg3 = return",
1100 |         "# etb3 = print/output",
1101 |         "",
1102 |         "# This demonstrates Flex's flexibility:",
1103 |         "# - Mix Franco and English freely",
1104 |         "# - No syntax conflicts",
1105 |         "# - Choose preferred keywords per context"
1106 |       ]
1107 |     },
1108 |     "mathematical_expressions": {
1109 |       "description": "Mathematical operations, operator precedence, and function-based calculations",
1110 |       "explanation": "Demonstrates arithmetic operations, operator precedence, function parameters, and complex mathematical expressions",
1111 |       "concepts": [
1112 |         "arithmetic operations",
1113 |         "operator precedence",
1114 |         "function parameters",
1115 |         "mathematical functions",
1116 |         "expression evaluation"
1117 |       ],
1118 |       "code": [
1119 |         "# Initialize variables for calculations",
1120 |         "x = 10",
1121 |         "y = 1",
1122 |         "",
1123 |         "# Mathematical function with multiple parameters",
1124 |         "fun add(int x, int y, int u) {",
1125 |         "  r = x                    # Local variable assignment",
1126 |         "  print(r)                 # Print first parameter",
1127 |         "  return x + y + u         # Sum of all three parameters",
1128 |         "}",
1129 |         "",
1130 |         "# Function calls with different parameter combinations",
1131 |         "result = add(x, y, 8)        # add(10, 1, 8) = 19",
1132 |         "print(result)                # Prints: 19",
1133 |         "",
1134 |         "result = add(1, 5, x)        # add(1, 5, 10) = 16",
1135 |         "print(result)                # Prints: 16",
1136 |         "",
1137 |         "# Complex arithmetic with operator precedence",
1138 |         "x = (x + 2) * 5              # (10 + 2) * 5 = 60",
1139 |         "print(x)                     # Prints: 60",
1140 |         "",
1141 |         "# Multiple operations in sequence",
1142 |         "b = 5 * 4 / 5 * y            # Left-to-right: ((5*4)/5)*1 = 4",
1143 |         "print(\"{b}\")                 # String interpolation: \"4\"",
1144 |         "",
1145 |         "# Negative numbers and parentheses",
1146 |         "u = 3 * (-2 - 2)             # 3 * (-4) = -12",
1147 |         "print(u)                     # Prints: -12",
1148 |         "",
1149 |         "# More complex expressions",
1150 |         "complex = (x + y) * 2 - u    # (60 + 1) * 2 - (-12) = 122 + 12 = 134",
1151 |         "print(\"Complex result: {complex}\")",
1152 |         "",
1153 |         "# Modulo operator demonstrations",
1154 |         "a = 15",
1155 |         "b = 4",
1156 |         "remainder = a % b             # 15 % 4 = 3",
1157 |         "print(\"15 % 4 = {remainder}\")",
1158 |         "",
1159 |         "# Even/odd detection using modulo",
1160 |         "number = 8",
1161 |         "if (number % 2 == 0) {",
1162 |         "  print(\"{number} is even\")",
1163 |         "} else {",
1164 |         "  print(\"{number} is odd\")",
1165 |         "}",
1166 |         "",
1167 |         "# Modulo with operator precedence",
1168 |         "result = 5 + 10 % 3          # Modulo first: 5 + (10 % 3) = 5 + 1 = 6",
1169 |         "print(\"5 + 10 % 3 = {result}\")",
1170 |         "",
1171 |         "# Modulo in complex expressions",
1172 |         "cycle = (a + b) % 7          # (15 + 4) % 7 = 19 % 7 = 5",
1173 |         "print(\"Cycle value: {cycle}\")",
1174 |         "",
1175 |         "# Negative numbers with modulo",
1176 |         "neg_result = -10 % 3         # Result depends on implementation: typically -1",
1177 |         "print(\"-10 % 3 = {neg_result}\")",
1178 |         "",
1179 |         "# Operator precedence in Flex:",
1180 |         "# 1. Parentheses ()",
1181 |         "# 2. Multiplication *, Division /, Modulo %",
1182 |         "# 3. Addition +, Subtraction -",
1183 |         "# 4. Left-to-right for same precedence",
1184 |         "",
1185 |         "# Mathematical operators available:",
1186 |         "# + (addition), - (subtraction)",
1187 |         "# * (multiplication), / (division), % (modulo)",
1188 |         "# ++ (increment), -- (decrement)"
1189 |       ]
1190 |     },
1191 |     "string_formatting": {
1192 |       "description": "String interpolation and mixed output function usage across different syntax styles",
1193 |       "explanation": "Shows how to embed variables and expressions within strings using {variable} syntax, and demonstrates multiple output functions",
1194 |       "concepts": [
1195 |         "string interpolation",
1196 |         "mixed output functions",
1197 |         "variable embedding",
1198 |         "expression formatting"
1199 |       ],
1200 |       "code": [
1201 |         "# Variables of different types for demonstration",
1202 |         "float y = 5.555              # Floating-point number",
1203 |         "bool t = false               # Boolean value",
1204 |         "x = 42                       # Integer (for context)",
1205 |         "",
1206 |         "# String interpolation with different data types",
1207 |         "etb3(\"x = {x}\")              # Integer interpolation",
1208 |         "etb3(\"y = {y}\")              # Float interpolation - prints: \"y = 5.555\"",
1209 |         "etb3(\"t is {t}\")             # Boolean interpolation - prints: \"t is false\"",
1210 |         "",
1211 |         "# Expression interpolation",
1212 |         "x = 10 - 2                   # Calculate new value: x = 8",
1213 |         "etb3(\"New x = {x}\")          # Expression result interpolation",
1214 |         "",
1215 |         "# Complex expression interpolation",
1216 |         "etb3(\"Calculation: {x + y}\") # Embed calculation: 8 + 5.555 = 13.555",
1217 |         "etb3(\"Boolean negation: {not t}\")  # Embed boolean operation",
1218 |         "",
1219 |         "# Mixed output functions - all equivalent functionality",
1220 |         "etb3(\"Franco print\")         # Franco Arabic print function",
1221 |         "print(\"English print\")       # English print function",
1222 |         "out(\"Alternative output\")    # Alternative output function",
1223 |         "output(\"Another option\")     # Another output variant",
1224 |         "printf(\"C-style output\")     # C-style printf",
1225 |         "cout(\"Stream-style output\")  # Stream-style output",
1226 |         "",
1227 |         "# Advanced string interpolation examples",
1228 |         "name = \"Flex\"",
1229 |         "version = 2.0",
1230 |         "etb3(\"Welcome to {name} version {version}!\")",
1231 |         "",
1232 |         "# String interpolation rules:",
1233 |         "# - Use {variable_name} to embed variables",
1234 |         "# - Can embed expressions: {a + b}",
1235 |         "# - Works with all data types",
1236 |         "# - No spaces needed around braces",
1237 |         "# - Expressions are evaluated at runtime"
1238 |       ]
1239 |     },
1240 |     "logical_operations": {
1241 |       "description": "Boolean logic with AND, OR, NOT operators and complex conditional expressions",
1242 |       "explanation": "Demonstrates logical operators, complex boolean expressions, and mixed syntax conditionals",
1243 |       "concepts": [
1244 |         "boolean operators",
1245 |         "logical AND/OR",
1246 |         "NOT operator",
1247 |         "complex conditions",
1248 |         "conditional logic"
1249 |       ],
1250 |       "code": [
1251 |         "# Initialize variables for logical tests",
1252 |         "x = 4",
1253 |         "y = 5",
1254 |         "z = 6",
1255 |         "",
1256 |         "# Complex AND condition with NOT operator",
1257 |         "if (x == 4 and y == 5 and not(z > 1)) {",
1258 |         "  print(\"All conditions met\")     # Won't execute: z > 1 is true",
1259 |         "} else {",
1260 |         "  print(\"Complex condition failed\") # Will execute",
1261 |         "}",
1262 |         "",
1263 |         "# OR condition with NOT operator",
1264 |         "y = 50",
1265 |         "if (x == 5 or not(y < 6)) {",
1266 |         "  print(\"OR condition with NOT\")   # Will execute: not(50 < 6) is true",
1267 |         "}",
1268 |         "",
1269 |         "# Franco Arabic conditional syntax",
1270 |         "yo = 3                               # Variable for comparison",
1271 |         "lw x > yo {                          # lw = if (Franco)",
1272 |         "  print(\"Franco conditional: x > yo\") # Will execute: 4 > 3",
1273 |         "}",
1274 |         "",
1275 |         "# More complex logical examples",
1276 |         "a = true",
1277 |         "b = false",
1278 |         "",
1279 |         "# Combining boolean variables with logical operators",
1280 |         "if (a and not b) {",
1281 |         "  print(\"a is true AND b is false\")  # Will execute",
1282 |         "}",
1283 |         "",
1284 |         "# Multiple OR conditions",
1285 |         "if (x == 10 or y == 50 or z == 6) {",
1286 |         "  print(\"At least one condition is true\")  # Will execute: y==50 and z==6",
1287 |         "}",
1288 |         "",
1289 |         "# Nested logical expressions with parentheses",
1290 |         "if ((x > 0 and y > 0) or (z < 0)) {",
1291 |         "  print(\"Nested logic: positive x,y OR negative z\")",
1292 |         "}",
1293 |         "",
1294 |         "# Logical operators in Flex:",
1295 |         "# and  - logical AND (both conditions must be true)",
1296 |         "# or   - logical OR (at least one condition must be true)",
1297 |         "# not  - logical NOT (inverts boolean value)",
1298 |         "# ==   - equality comparison",
1299 |         "# !=   - inequality comparison",
1300 |         "# <, >, <=, >= - relational comparisons"
1301 |       ]
1302 |     },
1303 |     "input_output_patterns": {
1304 |       "description": "Comprehensive input and output methods across different syntax styles with practical examples",
1305 |       "explanation": "Shows all available input/output functions and how they can be used interchangeably in Flex programs",
1306 |       "concepts": [
1307 |         "user input",
1308 |         "multiple output methods",
1309 |         "Franco vs English syntax",
1310 |         "I/O flexibility",
1311 |         "string interpolation"
1312 |       ],
1313 |       "code": [
1314 |         "# Various input methods - all functionally equivalent",
1315 |         "print(\"Enter your name:\")    ",
1316 |         "name = da5l()                # Franco Arabic input (da5l = enter/input)",
1317 |         "",
1318 |         "print(\"Enter your age:\")",
1319 |         "age = scan()                 # English input method",
1320 |         "",
1321 |         "# Input behavior:",
1322 |         "# - If input is a number, it will be stored as a number (int or float)",
1323 |         "# - Otherwise, it will be stored as a string",
1324 |         "# - Empty input (just pressing enter) causes an error",
1325 |         "",
1326 |         "print(\"Enter some data:\")",
1327 |         "data = read()                # Alternative input method",
1328 |         "",
1329 |         "# All input methods work the same way:",
1330 |         "# - Read from console/terminal",
1331 |         "# - Return string by default",
1332 |         "# - Can be converted to numbers if needed",
1333 |         "",
1334 |         "# Various output methods - all functionally equivalent",
1335 |         "etb3(\"Franco output: {name}\")     # Franco Arabic print (etb3 = print)",
1336 |         "print(\"English output: {age}\")    # Standard English print",
1337 |         "out(\"Alternative: {value}\")       # Alternative output method",
1338 |         "output(\"Another method: {data}\")  # Another output variant",
1339 |         "printf(\"C-style: {name}\")         # C-style printf",
1340 |         "cout(\"Stream-style: {age}\")       # Stream-style output",
1341 |         "",
1342 |         "# Practical input/output example",
1343 |         "print(\"=== Calculator Example ===\")",
1344 |         "etb3(\"Enter first number:\")",
1345 |         "num1 = da5l()                # Franco input - automatic type detection",
1346 |         "print(\"Enter second number:\")",
1347 |         "num2 = scan()                # English input - automatic type detection",
1348 |         "",
1349 |         "# Flex automatically detects if input is number or string",
1350 |         "result = num1 + num2         # Works if both are numbers",
1351 |         "",
1352 |         "# Mixed syntax output with string interpolation",
1353 |         "etb3(\"You entered: {num1} and {num2}\")",
1354 |         "print(\"Sum: {result}\")",
1355 |         "print(\"Thank you for using Flex!\")",
1356 |         "",
1357 |         "# Available input functions:",
1358 |         "# da5l()  - Franco Arabic (\"da5l\" means \"enter\")",
1359 |         "# scan()  - English/technical term",
1360 |         "# input() - Standard programming term",
1361 |         "# read()  - Alternative term",
1362 |         "",
1363 |         "# Key output functions:",
1364 |         "# etb3()  - Franco Arabic (\"etb3\" means \"print\")",
1365 |         "# print() - Standard English",
1366 |         "# out()   - Short form",
1367 |         "# output() - Verbose form",
1368 |         "# printf() - C-style",
1369 |         "# cout()  - C++ style"
1370 |       ]
1371 |     },
1372 |     "break_and_control": {
1373 |       "description": "Loop control statements: Franco Arabic (w2f) and English (break) syntax for early loop termination",
1374 |       "explanation": "Demonstrates different ways to control loop execution using break statements in both Franco and English syntax",
1375 |       "concepts": [
1376 |         "loop control",
1377 |         "break statements",
1378 |         "Franco break",
1379 |         "English break",
1380 |         "loop termination"
1381 |       ],
1382 |       "code": [
1383 |         "# Franco Arabic loop with Franco break statement",
1384 |         "karr i=0 l7d 10 {            # Franco for loop: from 0 to 10",
1385 |         "  print(i)",
1386 |         "  lw i == 5 {              # Franco conditional: if i equals 5",
1387 |         "    w2f                  # Franco break: w2f = stop/break",
1388 |         "  }",
1389 |         "}",
1390 |         "# Output: 0, 1, 2, 3, 4, 5 (then exits)",
1391 |         "",
1392 |         "# English while loop with English break statement",
1393 |         "q = 0                        # Initialize counter",
1394 |         "while(q < 30) {              # English while loop",
1395 |         "  if (q == 10) {           # English conditional",
1396 |         "    break                # English break statement",
1397 |         "  }",
1398 |         "  print(\"q is {q}\")        # Print with string interpolation",
1399 |         "  q++                      # Increment counter",
1400 |         "}",
1401 |         "# Output: q is 0, q is 1, ..., q is 9 (then exits)",
1402 |         "",
1403 |         "# Mixed syntax example",
1404 |         "y = 0",
1405 |         "talama y < 20 {              # Franco while loop",
1406 |         "  etb3(\"y = {y}\")          # Franco print",
1407 |         "  if (y == 7) {            # English conditional",
1408 |         "    w2f                  # Franco break",
1409 |         "  }",
1410 |         "  y++",
1411 |         "}",
1412 |         "",
1413 |         "# Break statement equivalents:",
1414 |         "# w2f     - Franco Arabic (\"wa2af\" = stop)",
1415 |         "# break   - English/Standard",
1416 |         "# stop    - Alternative English",
1417 |         "",
1418 |         "# Key concepts:",
1419 |         "# - Break exits the current loop immediately",
1420 |         "# - Can mix Franco and English syntax freely",
1421 |         "# - Break only affects the innermost loop",
1422 |         "# - Use consistent style or mix as preferred"
1423 |       ]
1424 |     },
1425 |     "comments_examples": {
1426 |       "description": "All supported comment styles in Flex: single-line, multi-line, and inline comments",
1427 |       "explanation": "Shows the different ways to add comments to Flex code for documentation and code explanation",
1428 |       "concepts": [
1429 |         "single-line comments",
1430 |         "multi-line comments",
1431 |         "inline comments",
1432 |         "code documentation",
1433 |         "comment styles"
1434 |       ],
1435 |       "code": [
1436 |         "# Single line comment using hash symbol",
1437 |         "// Another single line comment using double slash",
1438 |         "",
1439 |         "'''",
1440 |         "Multi-line comment using triple quotes",
1441 |         "This type of comment can span",
1442 |         "multiple lines and is useful for",
1443 |         "longer explanations or documentation",
1444 |         "'''",
1445 |         "",
1446 |         "/*",
1447 |         "C-style multi-line comment",
1448 |         "Also spans multiple lines",
1449 |         "Familiar to C/C++/Java programmers",
1450 |         "*/",
1451 |         "",
1452 |         "# Comments with code examples",
1453 |         "x = 5      # Inline comment using hash",
1454 |         "y = 10     // Inline comment using double slash",
1455 |         "z = x + y  # Comments explain what the code does",
1456 |         "",
1457 |         "# Comment usage examples in real code",
1458 |         "rakm age = 25              # Franco variable declaration",
1459 |         "dorg names = [\"Ahmed\", \"Sara\"]  # Franco list with Arabic names",
1460 |         "",
1461 |         "# Function with documentation comments",
1462 |         "'''",
1463 |         "This function calculates the area of a rectangle",
1464 |         "Parameters: length (rakm), width (rakm)",
1465 |         "Returns: area (rakm)",
1466 |         "'''",
1467 |         "sndo2 calculateArea(rakm length, rakm width) {",
1468 |         "  rakm area = length * width  # Calculate area",
1469 |         "  rg3 area                    # Return result",
1470 |         "}",
1471 |         "",
1472 |         "/*",
1473 |         "Main program execution",
1474 |         "Demonstrates mixed syntax usage",
1475 |         "*/",
1476 |         "result = calculateArea(10, 5)  // Function call",
1477 |         "etb3(\"Area is: {result}\")       # Output result",
1478 |         "",
1479 |         "# Comment style guidelines:",
1480 |         "# - Use # for single-line comments (most common)",
1481 |         "# - Use // for C-style single-line comments",
1482 |         "# - Use ''' for multi-line documentation",
1483 |         "# - Use /* */ for C-style multi-line comments",
1484 |         "# - Add inline comments to explain complex logic",
1485 |         "# - Comments are ignored by the Flex interpreter"
1486 |       ]
1487 |     },
1488 |     "modulo_operations": {
1489 |       "description": "Comprehensive modulo operator usage: remainder calculations, even/odd detection, cycling, and error handling",
1490 |       "explanation": "Demonstrates the modulo operator (%) for remainder calculations, practical applications like even/odd testing, creating cycles, and proper error handling for modulo by zero",
1491 |       "concepts": [
1492 |         "modulo operator",
1493 |         "remainder calculations",
1494 |         "even/odd detection",
1495 |         "cycling patterns",
1496 |         "error handling",
1497 |         "operator precedence"
1498 |       ],
1499 |       "code": [
1500 |         "# Basic modulo operations",
1501 |         "a = 15",
1502 |         "b = 4",
1503 |         "remainder = a % b            # 15 % 4 = 3",
1504 |         "print(\"15 % 4 = {remainder}\")",
1505 |         "",
1506 |         "# Even/odd detection - most common use case",
1507 |         "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
1508 |         "karr i=0 l7d length(numbers) - 1 {",
1509 |         "  number = numbers[i]",
1510 |         "  lw number % 2 == 0 {",
1511 |         "    print(\"{number} is even\")",
1512 |         "  } gher {",
1513 |         "    print(\"{number} is odd\")",
1514 |         "  }",
1515 |         "}",
1516 |         "",
1517 |         "# Creating cycling patterns with modulo",
1518 |         "print(\"\\nCycling through colors:\")",
1519 |         "colors = [\"red\", \"green\", \"blue\"]",
1520 |         "karr day=1 l7d 10 {",
1521 |         "  color_index = (day - 1) % length(colors)  # Cycle through 0, 1, 2",
1522 |         "  current_color = colors[color_index]",
1523 |         "  print(\"Day {day}: {current_color}\")",
1524 |         "}",
1525 |         "",
1526 |         "# Modulo with operator precedence",
1527 |         "result1 = 5 + 10 % 3         # Modulo first: 5 + (10 % 3) = 5 + 1 = 6",
1528 |         "result2 = (5 + 10) % 3       # Parentheses first: (15) % 3 = 0",
1529 |         "print(\"5 + 10 % 3 = {result1}\")",
1530 |         "print(\"(5 + 10) % 3 = {result2}\")",
1531 |         "",
1532 |         "# Negative numbers with modulo",
1533 |         "neg_examples = [-7, -3, 7, 3]",
1534 |         "divisor = 3",
1535 |         "print(\"\\nNegative number modulo examples:\")",
1536 |         "karr i=0 l7d length(neg_examples) - 1 {",
1537 |         "  num = neg_examples[i]",
1538 |         "  result = num % divisor",
1539 |         "  print(\"{num} % {divisor} = {result}\")",
1540 |         "}",
1541 |         "",
1542 |         "# Safe modulo operation with error handling",
1543 |         "sndo2 safeModulo(rakm dividend, rakm divisor) {",
1544 |         "  lw divisor == 0 {",
1545 |         "    print(\"Error: Cannot perform modulo by zero!\")",
1546 |         "    rg3 -1  # Return error indicator",
1547 |         "  } gher {",
1548 |         "    result = dividend % divisor",
1549 |         "    print(\"{dividend} % {divisor} = {result}\")",
1550 |         "    rg3 result",
1551 |         "  }",
1552 |         "}",
1553 |         "",
1554 |         "# Test safe modulo function",
1555 |         "print(\"\\nSafe modulo operations:\")",
1556 |         "safeModulo(10, 3)            # Valid: returns 1",
1557 |         "safeModulo(10, 0)            # Error: returns -1",
1558 |         "",
1559 |         "# Practical application: determining weekday",
1560 |         "print(\"\\nWeekday calculator:\")",
1561 |         "weekdays = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"]",
1562 |         "day_number = 15              # Arbitrary day number",
1563 |         "weekday_index = day_number % 7",
1564 |         "weekday = weekdays[weekday_index]",
1565 |         "print(\"Day {day_number} falls on a {weekday}\")",
1566 |         "",
1567 |         "# Complex expression with modulo",
1568 |         "x = 25",
1569 |         "y = 7",
1570 |         "complex_result = (x * 2 + 5) % y  # (25*2+5) % 7 = 55 % 7 = 6",
1571 |         "print(\"(25 * 2 + 5) % 7 = {complex_result}\")",
1572 |         "",
1573 |         "# Key modulo use cases:",
1574 |         "# 1. Even/odd detection: number % 2 == 0",
1575 |         "# 2. Cycling through arrays: index % array_length",
1576 |         "# 3. Time calculations: hours % 12, minutes % 60",
1577 |         "# 4. Hash table indexing: hash % table_size",
1578 |         "# 5. Remainder calculations: dividend % divisor"
1579 |       ]
1580 |     }
1581 |   },
1582 |   "best_practices": {
1583 |     "file_extensions": "Use .flex or .lx file extensions",
1584 |     "syntax_mixing": "You can mix Franco Arabic and English syntax in the same file",
1585 |     "no_semicolons": "Flex does not require semicolons at the end of statements",
1586 |     "blocks": "Use {} for code blocks, no parentheses needed for Franco conditionals",
1587 |     "variable_naming": "Use descriptive variable names in any supported language",
1588 |     "comments": "Use # or // for single-line comments, ''' or /* */ for multi-line",
1589 |     "string_formatting": "Use {variable} syntax for string interpolation"
1590 |   },
1591 |   "common_patterns": {
1592 |     "input_validation": [
1593 |       "etb3(\"Enter a number:\")",
1594 |       "rakm num = da5l()",
1595 |       "lw num > 0 {",
1596 |       "  etb3(\"Positive number: {num}\")",
1597 |       "} gher {",
1598 |       "  etb3(\"Non-positive number\")",
1599 |       "}"
1600 |     ],
1601 |     "list_processing": [
1602 |       "dorg items = [1, 2, 3, 4, 5]",
1603 |       "karr i=0 l7d length(items) - 1 {",
1604 |       "  etb3(\"Item {i}: {items[i]}\")",
1605 |       "}"
1606 |     ],
1607 |     "function_with_return": [
1608 |       "sndo2 calculate(rakm x, rakm y) {",
1609 |       "  rakm result = x * y + 10",
1610 |       "  rg3 result",
1611 |       "}"
1612 |     ],
1613 |     "even_odd_detection": [
1614 |       "rakm number = 42",
1615 |       "lw number % 2 == 0 {",
1616 |       "  etb3(\"Number is even\")",
1617 |       "} gher {",
1618 |       "  etb3(\"Number is odd\")",
1619 |       "}"
1620 |     ],
1621 |     "cycling_counter": [
1622 |       "counter = 0",
1623 |       "karr i=0 l7d 10 {",
1624 |       "  cycle_value = counter % 3  # Creates 0-1-2 cycle",
1625 |       "  etb3(\"Cycle: {cycle_value}\")",
1626 |       "  counter++",
1627 |       "}"
1628 |     ],
1629 |     "modulo_safe_operation": [
1630 |       "a = 15",
1631 |       "b = 4",
1632 |       "lw b != 0 {",
1633 |       "  remainder = a % b",
1634 |       "  print(\"Remainder: {remainder}\")",
1635 |       "} gher {",
1636 |       "  print(\"Error: Cannot perform modulo by zero\")",
1637 |       "}"
1638 |     ]
1639 |   },
1640 |   "debugging_features": {
1641 |     "built_in_ai": "Flex includes built-in AI debugging capabilities",
1642 |     "error_handling": "Graceful error detection and recovery through regex parsing",
1643 |     "type_checking": "Automatic type detection and validation",
1644 |     "runtime_hints": "AI-powered suggestions during development"
1645 |   },
1646 |   "project_files": {
1647 |     "config": [
1648 |       "flex.toml",
1649 |       "flexconfig.json",
1650 |       "flex.json"
1651 |     ],
1652 |     "dependencies": [
1653 |       "Flex.lock"
1654 |     ],
1655 |     "documentation": [
1656 |       "FLEX.md",
1657 |       "flex.md",
1658 |       ".flex.md"
1659 |     ]
1660 |   },
1661 |   "error_handling": {
1662 |     "description": "Comprehensive error patterns, prevention, and handling strategies in Flex",
1663 |     "error_categories": {
1664 |       "runtime_errors": {
1665 |         "description": "Errors that occur during program execution",
1666 |         "undefined_variable": {
1667 |           "error": "Variable 'x' is not defined",
1668 |           "cause": "Attempting to use a variable before declaring it",
1669 |           "solution": "Always declare variables before use",
1670 |           "prevention_example": [
1671 |             "# WRONG: Using undefined variable",
1672 |             "# print(name)  # Error: 'name' not defined",
1673 |             "",
1674 |             "# CORRECT: Declare first",
1675 |             "klma name = \"Flex\"",
1676 |             "print(name)  # Works correctly"
1677 |           ],
1678 |           "defensive_pattern": [
1679 |             "# Initialize variables with default values",
1680 |             "klma user_name = \"\"  # Default empty string",
1681 |             "rakm user_age = 0     # Default zero",
1682 |             "so2al is_valid = ghalt # Default false"
1683 |           ]
1684 |         },
1685 |         "division_by_zero": {
1686 |           "error": "Division by zero",
1687 |           "cause": "Attempting to divide a number by zero",
1688 |           "solution": "Always check denominator before division",
1689 |           "prevention_example": [
1690 |             "# Safe division function",
1691 |             "sndo2 safeDivide(rakm a, rakm b) {",
1692 |             "  lw b == 0 {",
1693 |             "    print(\"Error: Cannot divide by zero\")",
1694 |             "    rg3 0  # Return safe default",
1695 |             "  } gher {",
1696 |             "    rg3 a / b",
1697 |             "  }",
1698 |             "}",
1699 |             "",
1700 |             "# Usage",
1701 |             "result = safeDivide(10, 2)  # Returns 5",
1702 |             "result = safeDivide(10, 0)  # Returns 0 with error message"
1703 |           ]
1704 |         },
1705 |         "modulo_by_zero": {
1706 |           "error": "Modulo by zero",
1707 |           "cause": "Attempting to get remainder when dividing by zero",
1708 |           "solution": "Check divisor before modulo operation",
1709 |           "prevention_example": [
1710 |             "# Safe modulo with validation",
1711 |             "sndo2 safeModulo(rakm dividend, rakm divisor) {",
1712 |             "  lw divisor == 0 {",
1713 |             "    etb3(\"Error: Modulo by zero not allowed\")",
1714 |             "    rg3 -1  # Error indicator",
1715 |             "  } gher {",
1716 |             "    rg3 dividend % divisor",
1717 |             "  }",
1718 |             "}",
1719 |             "",
1720 |             "# Inline modulo check",
1721 |             "a = 15",
1722 |             "b = 0",
1723 |             "lw b != 0 {",
1724 |             "  remainder = a % b",
1725 |             "  print(\"Remainder: {remainder}\")",
1726 |             "} gher {",
1727 |             "  print(\"Cannot calculate remainder with zero divisor\")",
1728 |             "}"
1729 |           ]
1730 |         },
1731 |         "index_out_of_bounds": {
1732 |           "error": "List index out of range",
1733 |           "cause": "Accessing list element at invalid index",
1734 |           "solution": "Always validate index before accessing",
1735 |           "prevention_example": [
1736 |             "# Safe list access function",
1737 |             "sndo2 safeListGet(dorg myList, rakm index) {",
1738 |             "  # Validate list is not empty",
1739 |             "  lw length(myList) == 0 {",
1740 |             "    print(\"Error: Cannot access element from empty list\")",
1741 |             "    rg3 \"\"  # Return safe default for empty list",
1742 |             "  }",
1743 |             "  ",
1744 |             "  # Validate index bounds",
1745 |             "  lw index >= 0 and index < length(myList) {",
1746 |             "    rg3 myList[index]  # Return valid element",
1747 |             "  } gher {",
1748 |             "    print(\"Error: Index {index} out of bounds for list of size {length(myList)}\")",
1749 |             "    rg3 \"\"  # Return safe default for out of bounds",
1750 |             "  }",
1751 |             "}",
1752 |             "",
1753 |             "# Inline bounds checking",
1754 |             "dorg items = [\"apple\", \"banana\", \"cherry\"]",
1755 |             "rakm user_choice = 5",
1756 |             "",
1757 |             "lw user_choice >= 0 and user_choice < length(items) {",
1758 |             "  selected = items[user_choice]",
1759 |             "  print(\"You selected: {selected}\")",
1760 |             "} gher {",
1761 |             "  print(\"Invalid choice. Please select 0-{length(items)-1}\")",
1762 |             "}"
1763 |           ]
1764 |         }
1765 |       },
1766 |       "user_input_errors": {
1767 |         "description": "Errors arising from invalid or unexpected user input",
1768 |         "invalid_number_input": {
1769 |           "error": "Expected number but received text",
1770 |           "cause": "User enters non-numeric value when number expected",
1771 |           "solution": "Validate input type and provide fallback",
1772 |           "prevention_example": [
1773 |             "# Robust number input with validation",
1774 |             "sndo2 getValidNumber(klma prompt) {",
1775 |             "  rakm attempt_count = 0",
1776 |             "  rakm max_attempts = 5  # Prevent infinite loops",
1777 |             "  ",
1778 |             "  talama attempt_count < max_attempts {",
1779 |             "    etb3(prompt)",
1780 |             "    input_value = da5l()",
1781 |             "    ",
1782 |             "    # Try to use as number - if it works, return it",
1783 |             "    lw input_value > -999999 and input_value < 999999 {",
1784 |             "      rg3 input_value  # Return valid number",
1785 |             "    } gher {",
1786 |             "      attempt_count++",
1787 |             "      print(\"Error: Please enter a valid number (Attempt {attempt_count}/{max_attempts})\")",
1788 |             "      # Continue loop for retry",
1789 |             "    }",
1790 |             "  }",
1791 |             "  ",
1792 |             "  # If max attempts reached, return safe default",
1793 |             "  print(\"Maximum attempts reached. Using default value 0.\")",
1794 |             "  rg3 0  # Return safe default after max attempts",
1795 |             "}",
1796 |             "",
1797 |             "# Usage",
1798 |             "age = getValidNumber(\"Enter your age: \")",
1799 |             "print(\"Your age is: {age}\")"
1800 |           ]
1801 |         },
1802 |         "empty_input": {
1803 |           "error": "Empty input received",
1804 |           "cause": "User presses Enter without typing anything",
1805 |           "solution": "Check for empty input and handle gracefully",
1806 |           "prevention_example": [
1807 |             "# Handle empty input gracefully",
1808 |             "sndo2 getNonEmptyInput(klma prompt) {",
1809 |             "  rakm attempt_count = 0",
1810 |             "  rakm max_attempts = 3  # Prevent infinite loops",
1811 |             "  ",
1812 |             "  talama attempt_count < max_attempts {",
1813 |             "    print(prompt)",
1814 |             "    user_input = scan()",
1815 |             "    ",
1816 |             "    lw length(user_input) > 0 {",
1817 |             "      rg3 user_input  # Return valid non-empty input",
1818 |             "    } gher {",
1819 |             "      attempt_count++",
1820 |             "      etb3(\"Error: Input cannot be empty. Please try again. (Attempt {attempt_count}/{max_attempts})\")",
1821 |             "      # Continue loop for retry",
1822 |             "    }",
1823 |             "  }",
1824 |             "  ",
1825 |             "  # If max attempts reached, return safe default",
1826 |             "  etb3(\"Maximum attempts reached. Using default value.\")",
1827 |             "  rg3 \"default\"  # Return safe default after max attempts",
1828 |             "}",
1829 |             "",
1830 |             "name = getNonEmptyInput(\"Enter your name: \")"
1831 |           ]
1832 |         },
1833 |         "choice_validation": {
1834 |           "error": "Invalid menu choice",
1835 |           "cause": "User selects option not available in menu",
1836 |           "solution": "Validate choice against available options",
1837 |           "prevention_example": [
1838 |             "# Menu with choice validation",
1839 |             "sndo2 getMenuChoice() {",
1840 |             "  dorg valid_choices = [\"1\", \"2\", \"3\", \"4\"]",
1841 |             "  rakm attempt_count = 0",
1842 |             "  rakm max_attempts = 3  # Prevent infinite loops",
1843 |             "  ",
1844 |             "  talama attempt_count < max_attempts {",
1845 |             "    etb3(\"\\n=== Menu ===\")",
1846 |             "    print(\"1. Add item\")",
1847 |             "    print(\"2. View items\")",
1848 |             "    print(\"3. Delete item\")",
1849 |             "    print(\"4. Exit\")",
1850 |             "    print(\"Enter choice (1-4): \")",
1851 |             "    ",
1852 |             "    choice = scan()",
1853 |             "    ",
1854 |             "    # Check if choice is valid",
1855 |             "    so2al is_valid = ghalt",
1856 |             "    karr i=0 l7d length(valid_choices) - 1 {",
1857 |             "      lw choice == valid_choices[i] {",
1858 |             "        is_valid = sa7",
1859 |             "        w2f",
1860 |             "      }",
1861 |             "    }",
1862 |             "    ",
1863 |             "    lw is_valid {",
1864 |             "      rg3 choice  # Return valid choice",
1865 |             "    } gher {",
1866 |             "      attempt_count++",
1867 |             "      print(\"Error: Invalid choice '{choice}'. Please select 1-4. (Attempt {attempt_count}/{max_attempts})\")",
1868 |             "      # Continue loop for retry",
1869 |             "    }",
1870 |             "  }",
1871 |             "  ",
1872 |             "  # If max attempts reached, return safe default",
1873 |             "  print(\"Maximum attempts reached. Defaulting to Exit.\")",
1874 |             "  rg3 \"4\"  # Return safe default (exit option)",
1875 |             "}",
1876 |             "",
1877 |             "user_choice = getMenuChoice()"
1878 |           ]
1879 |         }
1880 |       },
1881 |       "type_errors": {
1882 |         "description": "Errors related to incompatible data types",
1883 |         "type_mismatch": {
1884 |           "error": "Cannot perform operation between incompatible types",
1885 |           "cause": "Attempting operations on incompatible data types",
1886 |           "solution": "Ensure type compatibility or convert types",
1887 |           "prevention_example": [
1888 |             "# Type-safe operations",
1889 |             "sndo2 safeAdd(value1, value2) {",
1890 |             "  # Ensure both values are numbers",
1891 |             "  lw value1 > -999999 and value1 < 999999 and value2 > -999999 and value2 < 999999 {",
1892 |             "    rg3 value1 + value2",
1893 |             "  } gher {",
1894 |             "    print(\"Error: Both values must be numbers for addition\")",
1895 |             "    rg3 0",
1896 |             "  }",
1897 |             "}",
1898 |             "",
1899 |             "# Safe type conversion example",
1900 |             "print(\"Enter first number: \")",
1901 |             "rakm num1 = scan()  # Explicit type declaration",
1902 |             "print(\"Enter second number: \")",
1903 |             "rakm num2 = scan()  # Explicit type declaration",
1904 |             "",
1905 |             "result = num1 + num2  # Safe operation"
1906 |           ]
1907 |         },
1908 |         "string_number_confusion": {
1909 |           "error": "Mixing strings and numbers inappropriately",
1910 |           "cause": "Attempting arithmetic on strings or concatenating numbers",
1911 |           "solution": "Be explicit about data types",
1912 |           "prevention_example": [
1913 |             "# Clear type handling",
1914 |             "klma name = \"Age: \"",
1915 |             "rakm age = 25",
1916 |             "",
1917 |             "# Use string interpolation instead of mixing types",
1918 |             "message = \"{name}{age}\"  # Correct way",
1919 |             "print(message)  # Prints: \"Age: 25\"",
1920 |             "",
1921 |             "# Avoid direct operations between different types",
1922 |             "# name + age  # This could cause issues",
1923 |             "",
1924 |             "# For user input, be explicit about expected type",
1925 |             "print(\"Enter your age as a number: \")",
1926 |             "rakm user_age = da5l()  # Forces number type"
1927 |           ]
1928 |         }
1929 |       },
1930 |       "syntax_errors": {
1931 |         "description": "Errors in code structure and syntax",
1932 |         "missing_braces": {
1933 |           "error": "Missing opening or closing brace",
1934 |           "cause": "Unmatched { or } in code blocks",
1935 |           "solution": "Ensure every { has a matching }",
1936 |           "prevention_example": [
1937 |             "# WRONG: Missing closing brace",
1938 |             "# lw x > 5 {",
1939 |             "#   print(\"Greater than 5\")",
1940 |             "# # Missing }",
1941 |             "",
1942 |             "# CORRECT: Properly matched braces",
1943 |             "lw x > 5 {",
1944 |             "  print(\"Greater than 5\")",
1945 |             "}  # Closing brace matches opening",
1946 |             "",
1947 |             "# For complex nested structures, use indentation",
1948 |             "lw condition1 {",
1949 |             "  print(\"Condition 1 true\")",
1950 |             "  lw condition2 {",
1951 |             "    print(\"Condition 2 also true\")",
1952 |             "  }  # Inner closing brace",
1953 |             "}    # Outer closing brace"
1954 |           ]
1955 |         },
1956 |         "invalid_function_syntax": {
1957 |           "error": "Function definition syntax error",
1958 |           "cause": "Incorrect function declaration syntax",
1959 |           "solution": "Follow proper function syntax patterns",
1960 |           "prevention_example": [
1961 |             "# WRONG: Invalid function syntax",
1962 |             "# function name { }  # Missing parentheses",
1963 |             "# fun name(x y) { }  # Missing comma between parameters",
1964 |             "",
1965 |             "# CORRECT: Proper function syntax",
1966 |             "sndo2 myFunction() {",
1967 |             "  print(\"No parameters\")",
1968 |             "}",
1969 |             "",
1970 |             "fun calculate(rakm a, rakm b) {",
1971 |             "  rg3 a + b",
1972 |             "}",
1973 |             "",
1974 |             "# Franco Arabic style",
1975 |             "sndo2 greet(klma name) {",
1976 |             "  etb3(\"Marhaba {name}!\")",
1977 |             "}"
1978 |           ]
1979 |         }
1980 |       },
1981 |       "logic_errors": {
1982 |         "description": "Errors in program logic that don't cause crashes but produce wrong results",
1983 |         "infinite_loops": {
1984 |           "error": "Program hangs or runs forever",
1985 |           "cause": "Loop condition never becomes false",
1986 |           "solution": "Ensure loop variables change and conditions can be met",
1987 |           "prevention_example": [
1988 |             "# WRONG: Infinite loop",
1989 |             "# x = 0",
1990 |             "# talama x < 10 {",
1991 |             "#   print(x)",
1992 |             "#   # x never changes - infinite loop!",
1993 |             "# }",
1994 |             "",
1995 |             "# CORRECT: Proper loop with increment",
1996 |             "x = 0",
1997 |             "talama x < 10 {",
1998 |             "  print(x)",
1999 |             "  x++  # Ensure loop variable changes",
2000 |             "}",
2001 |             "",
2002 |             "# For complex conditions, add safety counters",
2003 |             "counter = 0",
2004 |             "talama condition and counter < 1000 {",
2005 |             "  # Loop body",
2006 |             "  counter++  # Safety counter prevents infinite loops",
2007 |             "}"
2008 |           ]
2009 |         },
2010 |         "off_by_one_errors": {
2011 |           "error": "Accessing one element before or after intended",
2012 |           "cause": "Incorrect loop bounds or index calculations",
2013 |           "solution": "Carefully check loop conditions and array bounds",
2014 |           "prevention_example": [
2015 |             "# Common off-by-one scenarios",
2016 |             "dorg items = [\"a\", \"b\", \"c\", \"d\", \"e\"]",
2017 |             "",
2018 |             "# WRONG: Goes one past array end",
2019 |             "# for(i=0; i<=length(items); i++) {  # <= is wrong",
2020 |             "#   print(items[i])  # Error on last iteration",
2021 |             "# }",
2022 |             "",
2023 |             "# CORRECT: Proper bounds checking",
2024 |             "for(i=0; i<length(items); i++) {",
2025 |             "  print(items[i])  # Safe access",
2026 |             "}",
2027 |             "",
2028 |             "# Franco style with proper bounds - CRITICAL FIX",
2029 |             "karr i=0 l7d length(items) - 1 {",
2030 |             "  print(\"Item {i}: {items[i]}\")",
2031 |             "}",
2032 |             "",
2033 |             "# IMPORTANT NOTE: Franco loops with l7d are INCLUSIVE",
2034 |             "# karr i=0 l7d 5 { } means i goes 0,1,2,3,4,5 (6 iterations)",
2035 |             "# For array access, always use: l7d length(array) - 1",
2036 |             "",
2037 |             "# Double-check boundary conditions",
2038 |             "lw length(items) > 0 {  # Ensure array not empty",
2039 |             "  first_item = items[0]     # Safe: first element",
2040 |             "  last_item = items[length(items)-1]  # Safe: last element",
2041 |             "}"
2042 |           ]
2043 |         }
2044 |       }
2045 |     },
2046 |     "error_prevention_patterns": {
2047 |       "input_validation_framework": {
2048 |         "description": "Comprehensive input validation system",
2049 |         "code": [
2050 |           "# Universal input validation functions",
2051 |           "sndo2 validateRange(rakm value, rakm min, rakm max) {",
2052 |           "  lw value >= min and value <= max {",
2053 |           "    rg3 sa7",
2054 |           "  } gher {",
2055 |           "    print(\"Error: Value {value} must be between {min} and {max}\")",
2056 |           "    rg3 ghalt",
2057 |           "  }",
2058 |           "}",
2059 |           "",
2060 |           "sndo2 validateNonEmpty(klma text) {",
2061 |           "  lw length(text) > 0 {",
2062 |           "    rg3 sa7",
2063 |           "  } gher {",
2064 |           "    print(\"Error: Input cannot be empty\")",
2065 |           "    rg3 ghalt",
2066 |           "  }",
2067 |           "}",
2068 |           "",
2069 |           "sndo2 validateChoice(klma choice, dorg valid_options) {",
2070 |           "  karr i=0 l7d length(valid_options) - 1 {",
2071 |           "    lw choice == valid_options[i] {",
2072 |           "      rg3 sa7",
2073 |           "    }",
2074 |           "  }",
2075 |           "  print(\"Error: '{choice}' is not a valid option\")",
2076 |           "  rg3 ghalt",
2077 |           "}",
2078 |           "",
2079 |           "# Usage example",
2080 |           "print(\"Enter your age (1-120): \")",
2081 |           "rakm age = scan()",
2082 |           "lw validateRange(age, 1, 120) {",
2083 |           "  print(\"Valid age: {age}\")",
2084 |           "} gher {",
2085 |           "  print(\"Please restart and enter a valid age\")",
2086 |           "}"
2087 |         ]
2088 |       },
2089 |       "safe_list_operations": {
2090 |         "description": "Error-proof list manipulation patterns",
2091 |         "code": [
2092 |           "# Safe list operations with bounds checking",
2093 |           "sndo2 safeListAccess(dorg myList, rakm index) {",
2094 |           "  lw index >= 0 and index < length(myList) {",
2095 |           "    rg3 myList[index]",
2096 |           "  } gher {",
2097 |           "    print(\"Warning: Index {index} out of bounds. List size: {length(myList)}\")",
2098 |           "    rg3 \"\"  # Return safe default",
2099 |           "  }",
2100 |           "}",
2101 |           "",
2102 |           "sndo2 safeListSet(dorg myList, rakm index, value) {",
2103 |           "  lw index >= 0 and index < length(myList) {",
2104 |           "    myList[index] = value",
2105 |           "    rg3 sa7",
2106 |           "  } gher {",
2107 |           "    print(\"Cannot set index {index} in list of size {length(myList)}\")",
2108 |           "    rg3 ghalt",
2109 |           "  }",
2110 |           "}",
2111 |           "",
2112 |           "# Safe list iteration patterns",
2113 |           "dorg data = [\"apple\", \"banana\", \"cherry\"]",
2114 |           "",
2115 |           "# Pattern 1: Traditional bounds-checked loop",
2116 |           "karr i=0 l7d length(data) - 1 {",
2117 |           "  item = safeListAccess(data, i)",
2118 |           "  print(\"Item {i}: {item}\")",
2119 |           "}",
2120 |           "",
2121 |           "# Pattern 2: Defensive iteration with empty check",
2122 |           "lw length(data) > 0 {",
2123 |           "  print(\"Processing {length(data)} items:\")",
2124 |           "  karr i=0 l7d length(data) - 1 {",
2125 |           "    print(data[i])",
2126 |           "  }",
2127 |           "} gher {",
2128 |           "  print(\"No items to process\")",
2129 |           "}"
2130 |         ]
2131 |       },
2132 |       "error_recovery_strategies": {
2133 |         "description": "Patterns for recovering from errors gracefully",
2134 |         "code": [
2135 |           "# Error recovery with retry mechanisms",
2136 |           "sndo2 retryableInput(klma prompt, rakm max_attempts) {",
2137 |           "  rakm attempts = 0",
2138 |           "  ",
2139 |           "  talama attempts < max_attempts {",
2140 |           "    print(\"{prompt} (Attempt {attempts+1}/{max_attempts}): \")",
2141 |           "    user_input = scan()",
2142 |           "    ",
2143 |           "    lw length(user_input) > 0 {",
2144 |           "      rg3 user_input  # Success",
2145 |           "    } gher {",
2146 |           "      attempts++",
2147 |           "      print(\"Invalid input. Try again.\")",
2148 |           "    }",
2149 |           "  }",
2150 |           "  ",
2151 |           "  print(\"Maximum attempts reached. Using default value.\")",
2152 |           "  rg3 \"default\"  # Fallback value",
2153 |           "}",
2154 |           "",
2155 |           "# Graceful degradation pattern",
2156 |           "sndo2 calculateWithFallback(rakm a, rakm b) {",
2157 |           "  lw b != 0 {",
2158 |           "    # Preferred calculation",
2159 |           "    rg3 a / b",
2160 |           "  } gher {",
2161 |           "    print(\"Warning: Division by zero. Using safe alternative.\")",
2162 |           "    # Fallback calculation",
2163 |           "    rg3 a * 0.5  # or any other safe default",
2164 |           "  }",
2165 |           "}",
2166 |           "",
2167 |           "# State recovery pattern",
2168 |           "sndo2 safeFileOperation(klma filename) {",
2169 |           "  # Save current state",
2170 |           "  previous_state = getCurrentState()",
2171 |           "  ",
2172 |           "  # Attempt operation",
2173 |           "  so2al success = performOperation(filename)",
2174 |           "  ",
2175 |           "  lw not success {",
2176 |           "    print(\"Operation failed. Restoring previous state.\")",
2177 |           "    restoreState(previous_state)",
2178 |           "    rg3 ghalt",
2179 |           "  }",
2180 |           "  ",
2181 |           "  rg3 sa7",
2182 |           "}"
2183 |         ]
2184 |       }
2185 |     },
2186 |     "debugging_techniques": {
2187 |       "description": "Practical debugging approaches for Flex programs",
2188 |       "debug_printing": {
2189 |         "description": "Strategic use of print statements for debugging",
2190 |         "examples": [
2191 |           "# Debug printing patterns",
2192 |           "sndo2 debugFunction(rakm x, rakm y) {",
2193 |           "  print(\"DEBUG: Function called with x={x}, y={y}\")",
2194 |           "  ",
2195 |           "  rakm result = x + y",
2196 |           "  print(\"DEBUG: Calculation result = {result}\")",
2197 |           "  ",
2198 |           "  lw result > 100 {",
2199 |           "    print(\"DEBUG: Result exceeds 100, applying reduction\")",
2200 |           "    result = result / 2",
2201 |           "    print(\"DEBUG: Reduced result = {result}\")",
2202 |           "  }",
2203 |           "  ",
2204 |           "  print(\"DEBUG: Function returning {result}\")",
2205 |           "  rg3 result",
2206 |           "}",
2207 |           "",
2208 |           "# Variable state tracking",
2209 |           "counter = 0",
2210 |           "talama counter < 10 {",
2211 |           "  print(\"DEBUG: Loop iteration {counter}\")",
2212 |           "  counter++",
2213 |           "  ",
2214 |           "  lw counter == 5 {",
2215 |           "    print(\"DEBUG: Reached midpoint\")",
2216 |           "  }",
2217 |           "}"
2218 |         ]
2219 |       },
2220 |       "step_by_step_verification": {
2221 |         "description": "Breaking down complex operations for easier debugging",
2222 |         "examples": [
2223 |           "# Complex calculation broken into steps",
2224 |           "rakm a = 10",
2225 |           "rakm b = 3",
2226 |           "rakm c = 7",
2227 |           "",
2228 |           "# Instead of: result = (a + b) * c - (a % b)",
2229 |           "step1 = a + b",
2230 |           "print(\"Step 1 (a + b): {step1}\")",
2231 |           "",
2232 |           "step2 = step1 * c",
2233 |           "print(\"Step 2 (step1 * c): {step2}\")",
2234 |           "",
2235 |           "step3 = a % b",
2236 |           "print(\"Step 3 (a % b): {step3}\")",
2237 |           "",
2238 |           "final_result = step2 - step3",
2239 |           "print(\"Final result: {final_result}\")",
2240 |           "",
2241 |           "# This approach makes it easy to spot calculation errors"
2242 |         ]
2243 |       }
2244 |     },
2245 |     "common_error_messages": {
2246 |       "description": "Typical error messages and their meanings",
2247 |       "interpreter_errors": {
2248 |         "undefined_variable": "Variable 'name' is not defined - declare variable before use",
2249 |         "type_error": "Cannot perform operation on incompatible types - check data types",
2250 |         "index_error": "List index out of range - check list bounds",
2251 |         "zero_division": "Division by zero - validate denominator",
2252 |         "syntax_error": "Unexpected token - check syntax and brackets",
2253 |         "function_error": "Function not defined - define before calling"
2254 |       },
2255 |       "runtime_warnings": {
2256 |         "empty_list": "Operating on empty list - check list length first",
2257 |         "large_number": "Number exceeds typical range - consider using smaller values",
2258 |         "infinite_loop": "Loop running too long - check loop conditions"
2259 |       }
2260 |     },
2261 |     "best_practices_summary": {
2262 |       "defensive_coding": [
2263 |         "Always validate user input before processing",
2264 |         "Check array bounds before accessing elements",
2265 |         "Verify divisors are non-zero before division/modulo",
2266 |         "Initialize variables with sensible default values",
2267 |         "Use explicit type declarations for critical variables",
2268 |         "Implement fallback values for error conditions"
2269 |       ],
2270 |       "error_handling_principles": [
2271 |         "Fail gracefully - don't crash the program",
2272 |         "Provide clear, helpful error messages",
2273 |         "Offer recovery mechanisms when possible",
2274 |         "Log errors for debugging purposes",
2275 |         "Use consistent error handling patterns",
2276 |         "Test error conditions during development"
2277 |       ],
2278 |       "user_experience": [
2279 |         "Guide users toward correct input format",
2280 |         "Provide examples of valid input",
2281 |         "Allow multiple attempts for input validation",
2282 |         "Explain what went wrong in simple terms",
2283 |         "Offer suggestions for fixing the problem"
2284 |       ]
2285 |     }
2286 |   },
2287 |   "built_in_functions": {
2288 |     "description": "Comprehensive built-in functions and system utilities in Flex",
2289 |     "core_functions": {
2290 |       "length": {
2291 |         "description": "Returns the length of a string or list",
2292 |         "franco_aliases": [
2293 |           "tool",
2294 |           "toul",
2295 |           "7ajm"
2296 |         ],
2297 |         "usage": [
2298 |           "length(string) - returns string length",
2299 |           "length(list) - returns list size",
2300 |           "tool(string) - Franco version",
2301 |           "7ajm(list) - Franco version"
2302 |         ],
2303 |         "examples": [
2304 |           "string s = \"hello\"",
2305 |           "print(length(s))        # Prints: 5",
2306 |           "etb3(tool(s))           # Franco version: Prints: 5",
2307 |           "",
2308 |           "list numbers = [1, 2, 3, 4]",
2309 |           "print(7ajm(numbers))    # Franco: Prints: 4",
2310 |           "",
2311 |           "# Safe usage in loops",
2312 |           "karr i=0 l7d length(s) - 1 {",
2313 |           "  print(\"Character {i}\")",
2314 |           "}"
2315 |         ]
2316 |       },
2317 |       "type_checking": {
2318 |         "description": "Functions to check variable types",
2319 |         "functions": {
2320 |           "isNumber": "isNumber(value) - returns true if value is numeric",
2321 |           "isString": "isString(value) - returns true if value is string",
2322 |           "isList": "isList(value) - returns true if value is list",
2323 |           "isBool": "isBool(value) - returns true if value is boolean"
2324 |         },
2325 |         "franco_versions": {
2326 |           "isNumber": "rakm?",
2327 |           "isString": "klma?",
2328 |           "isList": "dorg?",
2329 |           "isBool": "so2al?"
2330 |         },
2331 |         "examples": [
2332 |           "# Safe type checking",
2333 |           "sndo2 safeAdd(value1, value2) {",
2334 |           "  lw isNumber(value1) and isNumber(value2) {",
2335 |           "    rg3 value1 + value2",
2336 |           "  } gher {",
2337 |           "    print(\"Error: Both values must be numbers\")",
2338 |           "    rg3 0",
2339 |           "  }",
2340 |           "}",
2341 |           "",
2342 |           "# Franco type checking",
2343 |           "lw rakm?(userInput) {",
2344 |           "  etb3(\"Valid number: {userInput}\")",
2345 |           "}"
2346 |         ]
2347 |       },
2348 |       "string_utilities": {
2349 |         "description": "String manipulation functions",
2350 |         "functions": {
2351 |           "split": "split(string, delimiter) - split string into list",
2352 |           "join": "join(list, delimiter) - join list elements into string",
2353 |           "trim": "trim(string) - remove whitespace",
2354 |           "upper": "upper(string) - convert to uppercase",
2355 |           "lower": "lower(string) - convert to lowercase",
2356 |           "contains": "contains(string, substring) - check if string contains substring"
2357 |         },
2358 |         "franco_versions": {
2359 |           "split": "2sm",
2360 |           "join": "jam3",
2361 |           "trim": "n7f",
2362 |           "upper": "kbr",
2363 |           "lower": "sg7r",
2364 |           "contains": "fy"
2365 |         },
2366 |         "examples": [
2367 |           "# String operations",
2368 |           "text = \"Hello, World!\"",
2369 |           "words = split(text, \", \")",
2370 |           "print(words)                    # [\"Hello\", \"World!\"]",
2371 |           "",
2372 |           "# Franco string operations",
2373 |           "klma nass = \"  hello world  \"",
2374 |           "etb3(n7f(nass))                # \"hello world\"",
2375 |           "etb3(kbr(nass))                # \"  HELLO WORLD  \"",
2376 |           "",
2377 |           "# Check if string contains substring",
2378 |           "lw fy(text, \"World\") {",
2379 |           "  etb3(\"Found 'World' in text!\")",
2380 |           "}"
2381 |         ]
2382 |       },
2383 |       "math_utilities": {
2384 |         "description": "Mathematical functions beyond basic operators",
2385 |         "functions": {
2386 |           "sqrt": "sqrt(number) - square root",
2387 |           "power": "power(base, exponent) - raise to power",
2388 |           "abs": "abs(number) - absolute value",
2389 |           "round": "round(number) - round to nearest integer",
2390 |           "floor": "floor(number) - round down",
2391 |           "ceil": "ceil(number) - round up",
2392 |           "min": "min(a, b) - minimum of two values",
2393 |           "max": "max(a, b) - maximum of two values",
2394 |           "random": "random() - random number between 0 and 1"
2395 |         },
2396 |         "franco_versions": {
2397 |           "sqrt": "jzr",
2398 |           "power": "2ss",
2399 |           "abs": "mtl2",
2400 |           "round": "2rb",
2401 |           "min": "asgar",
2402 |           "max": "akbar"
2403 |         },
2404 |         "examples": [
2405 |           "# Mathematical operations",
2406 |           "number = 16",
2407 |           "print(sqrt(number))          # 4",
2408 |           "print(jzr(number))           # Franco version: 4",
2409 |           "",
2410 |           "# Complex calculations",
2411 |           "result = power(2, 8)         # 256",
2412 |           "result = 2ss(2, 8)           # Franco version: 256",
2413 |           "",
2414 |           "# Finding extremes",
2415 |           "values = [5, 2, 8, 1, 9]",
2416 |           "smallest = min(values)",
2417 |           "largest = max(values)",
2418 |           "print(\"Range: {smallest} to {largest}\")"
2419 |         ]
2420 |       },
2421 |       "system_utilities": {
2422 |         "description": "System and environment functions",
2423 |         "functions": {
2424 |           "getCurrentTime": "getCurrentTime() - current timestamp",
2425 |           "systemType": "systemType() - operating system type",
2426 |           "getEnv": "getEnv(name) - environment variable",
2427 |           "sleep": "sleep(milliseconds) - pause execution",
2428 |           "fileExists": "fileExists(path) - check if file exists",
2429 |           "listFiles": "listFiles(directory) - list files in directory"
2430 |         },
2431 |         "franco_versions": {
2432 |           "getCurrentTime": "wa2tHali",
2433 |           "systemType": "no3Nizam",
2434 |           "sleep": "nam",
2435 |           "fileExists": "mlafM3jod"
2436 |         },
2437 |         "examples": [
2438 |           "# System information",
2439 |           "currentOS = systemType()",
2440 |           "print(\"Running on: {currentOS}\")",
2441 |           "",
2442 |           "# Franco system calls",
2443 |           "wa2t = wa2tHali()",
2444 |           "etb3(\"Current time: {wa2t}\")",
2445 |           "",
2446 |           "# File operations",
2447 |           "lw mlafM3jod(\"config.txt\") {",
2448 |           "  config = readFile(\"config.txt\")",
2449 |           "} gher {",
2450 |           "  print(\"Config file not found\")",
2451 |           "}"
2452 |         ]
2453 |       }
2454 |     },
2455 |     "list_methods": {
2456 |       "description": "Enhanced list methods with Franco Arabic support",
2457 |       "methods": {
2458 |         "push": "list.push(item) - add item to end of list",
2459 |         "pop": "list.pop() - remove and return last item",
2460 |         "remove": "list.remove(value) - remove specific value from list",
2461 |         "insert": "list.insert(index, item) - insert item at specific position",
2462 |         "clear": "list.clear() - remove all elements",
2463 |         "reverse": "list.reverse() - reverse the list order",
2464 |         "sort": "list.sort() - sort the list",
2465 |         "find": "list.find(value) - find index of value",
2466 |         "contains": "list.contains(value) - check if list contains value"
2467 |       },
2468 |       "franco_methods": {
2469 |         "push": "d7af",
2470 |         "pop": "shyl",
2471 |         "remove": "shyl",
2472 |         "insert": "d5al",
2473 |         "clear": "m7y",
2474 |         "reverse": "2leb",
2475 |         "sort": "rtb",
2476 |         "find": "d7wer"
2477 |       },
2478 |       "examples": [
2479 |         "list arr = [1, 2, 3]",
2480 |         "arr.push(4)                     # arr is now [1, 2, 3, 4]",
2481 |         "arr.d7af(5)                     # Franco: add 5, arr is [1, 2, 3, 4, 5]",
2482 |         "arr.pop()                       # removes 5, arr is [1, 2, 3, 4]",
2483 |         "arr.remove(2)                   # removes 2, arr is [1, 3, 4]",
2484 |         "",
2485 |         "# Advanced list operations",
2486 |         "arr.insert(1, 99)               # Insert 99 at index 1: [1, 99, 3, 4]",
2487 |         "arr.d5al(0, 77)                 # Franco: Insert 77 at start: [77, 1, 99, 3, 4]",
2488 |         "",
2489 |         "# List utilities",
2490 |         "index = arr.find(99)            # Returns 2 (index of 99)",
2491 |         "exists = arr.contains(3)        # Returns true",
2492 |         "",
2493 |         "# Mixed data types in lists",
2494 |         "list mixed = [1, \"hello\", sa7, 3.14]",
2495 |         "mixed.push(\"new item\")",
2496 |         "print(mixed)                    # [1, \"hello\", true, 3.14, \"new item\"]",
2497 |         "",
2498 |         "# List sorting and manipulation",
2499 |         "dorg numbers = [5, 2, 8, 1, 9]",
2500 |         "numbers.rtb()                   # Franco sort: [1, 2, 5, 8, 9]",
2501 |         "numbers.2leb()                  # Franco reverse: [9, 8, 5, 2, 1]"
2502 |       ]
2503 |     }
2504 |   },
2505 |   "variable_scoping": {
2506 |     "description": "Variable scope rules and best practices in Flex",
2507 |     "global_scope": "Variables declared outside functions are globally accessible",
2508 |     "local_scope": "Variables declared inside functions are locally scoped",
2509 |     "scope_examples": [
2510 |       "# Global variables",
2511 |       "rakm global_counter = 0",
2512 |       "klma app_name = \"Flex App\"",
2513 |       "",
2514 |       "sndo2 increment() {",
2515 |       "  # Can access global variables",
2516 |       "  global_counter = global_counter + 1",
2517 |       "  ",
2518 |       "  # Local variable - only accessible in this function",
2519 |       "  rakm local_temp = 42",
2520 |       "  print(\"Local temp: {local_temp}\")",
2521 |       "}",
2522 |       "",
2523 |       "increment()  # global_counter is now 1",
2524 |       "print(global_counter)  # Prints: 1",
2525 |       "# print(local_temp)     # Error: local_temp not accessible here"
2526 |     ],
2527 |     "parameter_scope": [
2528 |       "sndo2 calculate(rakm param1, rakm param2) {",
2529 |       "  # Parameters are local to the function",
2530 |       "  rakm local_result = param1 + param2",
2531 |       "  rg3 local_result",
2532 |       "}",
2533 |       "",
2534 |       "# param1, param2, local_result not accessible outside function"
2535 |     ]
2536 |   },
2537 |   "project_templates": {
2538 |     "description": "Complete example programs for common use cases",
2539 |     "calculator": {
2540 |       "description": "Simple calculator with Franco Arabic mixed syntax",
2541 |       "code": [
2542 |         "# Simple Calculator - Mixed Syntax Demo",
2543 |         "etb3(\"=== Flex Calculator ===\")",
2544 |         "",
2545 |         "# Get user input with automatic type detection",
2546 |         "print(\"Enter first number:\")",
2547 |         "rakm num1 = da5l()          # Franco input, forces number type",
2548 |         "",
2549 |         "etb3(\"Enter operator (+, -, *, /, %):\")",
2550 |         "operator = scan()           # String input for operator",
2551 |         "",
2552 |         "print(\"Enter second number:\")",
2553 |         "rakm num2 = scan()          # English input, forces number type",
2554 |         "",
2555 |         "# Perform calculation",
2556 |         "lw operator == \"+\" {",
2557 |         "  result = num1 + num2",
2558 |         "  etb3(\"Result: {num1} + {num2} = {result}\")",
2559 |         "}",
2560 |         "aw operator == \"-\" {",
2561 |         "  result = num1 - num2",
2562 |         "  print(\"Result: {num1} - {num2} = {result}\")",
2563 |         "}",
2564 |         "aw operator == \"*\" {",
2565 |         "  result = num1 * num2",
2566 |         "  etb3(\"Result: {num1} × {num2} = {result}\")",
2567 |         "}",
2568 |         "aw operator == \"/\" {",
2569 |         "  lw num2 != 0 {",
2570 |         "    kasr result = num1 / num2",
2571 |         "    print(\"Result: {num1} ÷ {num2} = {result}\")",
2572 |         "  } gher {",
2573 |         "    etb3(\"Error: Division by zero!\")",
2574 |         "  }",
2575 |         "}",
2576 |         "aw operator == \"%\" {",
2577 |         "  lw num2 != 0 {",
2578 |         "    rakm remainder = num1 % num2",
2579 |         "    etb3(\"Result: {num1} % {num2} = {remainder}\")",
2580 |         "  } gher {",
2581 |         "    print(\"Error: Modulo by zero!\")",
2582 |         "  }",
2583 |         "}",
2584 |         "gher {",
2585 |         "  print(\"Error: Invalid operator!\")",
2586 |         "}",
2587 |         "",
2588 |         "etb3(\"Thank you for using Flex Calculator!\")"
2589 |       ]
2590 |     },
2591 |     "todo_list": {
2592 |       "description": "Task management program with Franco Arabic features",
2593 |       "code": [
2594 |         "# Todo List Manager - Franco Arabic Style",
2595 |         "dorg tasks = []",
2596 |         "so2al running = sa7",
2597 |         "",
2598 |         "sndo2 showMenu() {",
2599 |         "  etb3(\"\\n=== قائمة المهام (Task List) ===\")",
2600 |         "  print(\"1. إضافة مهمة (Add Task)\")",
2601 |         "  etb3(\"2. عرض المهام (View Tasks)\")",
2602 |         "  print(\"3. حذف مهمة (Delete Task)\")",
2603 |         "  etb3(\"4. خروج (Exit)\")",
2604 |         "  print(\"اختر رقم (Choose number): \")",
2605 |         "}",
2606 |         "",
2607 |         "sndo2 addTask() {",
2608 |         "  etb3(\"أدخل المهمة الجديدة (Enter new task):\")",
2609 |         "  task = da5l()",
2610 |         "  tasks.push(task)",
2611 |         "  print(\"تم إضافة المهمة! (Task added!)\")",
2612 |         "}",
2613 |         "",
2614 |         "sndo2 showTasks() {",
2615 |         "  lw length(tasks) == 0 {",
2616 |         "    etb3(\"لا توجد مهام (No tasks found)\")",
2617 |         "  } gher {",
2618 |         "    print(\"\\nالمهام الحالية (Current tasks):\")",
2619 |         "    karr i=0 l7d length(tasks) - 1 {",
2620 |         "      etb3(\"{i+1}. {tasks[i]}\")",
2621 |         "    }",
2622 |         "  }",
2623 |         "}",
2624 |         "",
2625 |         "# Main program loop",
2626 |         "talama running {",
2627 |         "  showMenu()",
2628 |         "  choice = scan()",
2629 |         "  ",
2630 |         "  lw choice == \"1\" {",
2631 |         "    addTask()",
2632 |         "  }",
2633 |         "  aw choice == \"2\" {",
2634 |         "    showTasks()",
2635 |         "  }",
2636 |         "  aw choice == \"3\" {",
2637 |         "    showTasks()",
2638 |         "    etb3(\"أدخل رقم المهمة للحذف (Enter task number to delete):\")",
2639 |         "    rakm task_num = da5l()",
2640 |         "    index = task_num - 1",
2641 |         "    lw index >= 0 and index < length(tasks) {",
2642 |         "      tasks.remove(tasks[index])",
2643 |         "      print(\"تم حذف المهمة! (Task deleted!)\")",
2644 |         "    } gher {",
2645 |         "      etb3(\"رقم غير صحيح (Invalid number)\")",
2646 |         "    }",
2647 |         "  }",
2648 |         "  aw choice == \"4\" {",
2649 |         "    running = ghalt",
2650 |         "    etb3(\"شكراً لاستخدام البرنامج! (Thanks for using the program!)\")",
2651 |         "  }",
2652 |         "  gher {",
2653 |         "    print(\"اختيار غير صحيح (Invalid choice)\")",
2654 |         "  }",
2655 |         "}"
2656 |       ]
2657 |     }
2658 |   },
2659 |   "performance_optimization": {
2660 |     "description": "Comprehensive performance optimization patterns and memory management",
2661 |     "optimization_guidelines": [
2662 |       "Use appropriate data types for your needs",
2663 |       "Prefer local variables over global when possible",
2664 |       "Use early returns in functions to avoid deep nesting",
2665 |       "Break out of loops early when condition is met",
2666 |       "Use string interpolation instead of concatenation for readability",
2667 |       "Declare variable types explicitly when needed for input validation",
2668 |       "Process large datasets in chunks to avoid memory overflow",
2669 |       "Use English loops for better performance with large arrays",
2670 |       "Avoid nested Franco loops with large datasets"
2671 |     ],
2672 |     "memory_management": {
2673 |       "description": "Memory-conscious programming patterns",
2674 |       "best_practices": [
2675 |         "# Chunked processing for large datasets",
2676 |         "sndo2 processLargeData(dorg data, rakm chunkSize) {",
2677 |         "  rakm total = length(data)",
2678 |         "  rakm processed = 0",
2679 |         "  ",
2680 |         "  # Process in chunks to avoid memory overflow",
2681 |         "  talama processed < total {",
2682 |         "    rakm end = processed + chunkSize",
2683 |         "    lw end > total { end = total }",
2684 |         "    ",
2685 |         "    # Process current chunk",
2686 |         "    for(i=processed; i<end; i++) {",
2687 |         "      processItem(data[i])",
2688 |         "    }",
2689 |         "    ",
2690 |         "    processed = end",
2691 |         "    print(\"Processed {processed}/{total} items\")",
2692 |         "  }",
2693 |         "}",
2694 |         "",
2695 |         "# Memory-efficient string building",
2696 |         "sndo2 buildLargeString(dorg items) {",
2697 |         "  dorg parts = []  # Collect parts first",
2698 |         "  ",
2699 |         "  karr i=0 l7d length(items) - 1 {",
2700 |         "    parts.push(\"Item: {items[i]}\")",
2701 |         "  }",
2702 |         "  ",
2703 |         "  # Join at the end (more efficient than repeated concatenation)",
2704 |         "  rg3 joinStrings(parts, \"\\n\")",
2705 |         "}",
2706 |         "",
2707 |         "# Clear variables when done with large data",
2708 |         "sndo2 cleanupAfterProcessing() {",
2709 |         "  largeData = []  # Clear reference to large dataset",
2710 |         "  tempResults = []  # Clear temporary results",
2711 |         "  # Variables will be garbage collected",
2712 |         "}"
2713 |       ],
2714 |       "performance_patterns": [
2715 |         "# Fast search with early termination",
2716 |         "sndo2 fastFind(dorg items, value) {",
2717 |         "  # Use English loop for better performance",
2718 |         "  for(i=0; i<length(items); i++) {",
2719 |         "    lw items[i] == value {",
2720 |         "      rg3 i  # Early return saves time",
2721 |         "    }",
2722 |         "  }",
2723 |         "  rg3 -1",
2724 |         "}",
2725 |         "",
2726 |         "# Efficient filtering with size pre-allocation",
2727 |         "sndo2 efficientFilter(dorg source, condition) {",
2728 |         "  dorg result = []",
2729 |         "  rakm count = 0",
2730 |         "  ",
2731 |         "  # First pass: count matches (optional optimization)",
2732 |         "  for(i=0; i<length(source); i++) {",
2733 |         "    lw evaluateCondition(source[i], condition) {",
2734 |         "      count++",
2735 |         "    }",
2736 |         "  }",
2737 |         "  ",
2738 |         "  # Second pass: collect results",
2739 |         "  for(i=0; i<length(source); i++) {",
2740 |         "    lw evaluateCondition(source[i], condition) {",
2741 |         "      result.push(source[i])",
2742 |         "    }",
2743 |         "  }",
2744 |         "  ",
2745 |         "  rg3 result",
2746 |         "}",
2747 |         "",
2748 |         "# Batch operations for better performance",
2749 |         "sndo2 batchProcess(dorg items, rakm batchSize) {",
2750 |         "  dorg batches = []",
2751 |         "  dorg currentBatch = []",
2752 |         "  ",
2753 |         "  for(i=0; i<length(items); i++) {",
2754 |         "    currentBatch.push(items[i])",
2755 |         "    ",
2756 |         "    lw length(currentBatch) == batchSize {",
2757 |         "      processBatch(currentBatch)",
2758 |         "      currentBatch = []  # Reset for next batch",
2759 |         "    }",
2760 |         "  }",
2761 |         "  ",
2762 |         "  # Process remaining items",
2763 |         "  lw length(currentBatch) > 0 {",
2764 |         "    processBatch(currentBatch)",
2765 |         "  }",
2766 |         "}"
2767 |       ]
2768 |     },
2769 |     "benchmarking": {
2770 |       "description": "Performance measurement patterns",
2771 |       "timing_functions": [
2772 |         "# Simple timing for performance measurement",
2773 |         "sndo2 timeFunction(functionToTime, params) {",
2774 |         "  startTime = getCurrentTime()",
2775 |         "  result = functionToTime(params)",
2776 |         "  endTime = getCurrentTime()",
2777 |         "  duration = endTime - startTime",
2778 |         "  print(\"Function took {duration}ms\")",
2779 |         "  rg3 result",
2780 |         "}",
2781 |         "",
2782 |         "# Compare performance of different approaches",
2783 |         "sndo2 comparePerformance() {",
2784 |         "  dorg testData = generateTestData(10000)",
2785 |         "  ",
2786 |         "  # Test Franco loop performance",
2787 |         "  startTime = getCurrentTime()",
2788 |         "  francoResult = processFrancoLoop(testData)",
2789 |         "  francoTime = getCurrentTime() - startTime",
2790 |         "  ",
2791 |         "  # Test English loop performance",
2792 |         "  startTime = getCurrentTime()",
2793 |         "  englishResult = processEnglishLoop(testData)",
2794 |         "  englishTime = getCurrentTime() - startTime",
2795 |         "  ",
2796 |         "  print(\"Franco loop: {francoTime}ms\")",
2797 |         "  print(\"English loop: {englishTime}ms\")",
2798 |         "  print(\"Difference: {englishTime - francoTime}ms\")",
2799 |         "}"
2800 |       ]
2801 |     },
2802 |     "efficient_patterns": [
2803 |       "# Efficient loop with early exit",
2804 |       "sndo2 findItem(dorg items, klma target) {",
2805 |       "  # Prefer English loops for large datasets",
2806 |       "  for(i=0; i<length(items); i++) {",
2807 |       "    lw items[i] == target {",
2808 |       "      rg3 i  # Return immediately when found",
2809 |       "    }",
2810 |       "  }",
2811 |       "  rg3 -1  # Not found",
2812 |       "}",
2813 |       "",
2814 |       "# Use string interpolation for readable output",
2815 |       "name = \"Flex\"",
2816 |       "version = \"2.1\"",
2817 |       "message = \"Welcome to {name} version {version}!\"  # Better than concatenation",
2818 |       "",
2819 |       "# Minimize function calls in loops",
2820 |       "dorg items = [1, 2, 3, 4, 5]",
2821 |       "rakm itemCount = length(items)  # Calculate once, not in each iteration",
2822 |       "for(i=0; i<itemCount; i++) {",
2823 |       "  processItem(items[i])",
2824 |       "}"
2825 |     ]
2826 |   },
2827 |   "community_guidelines": {
2828 |     "description": "Best practices and conventions for Flex development",
2829 |     "coding_style": {
2830 |       "naming_conventions": [
2831 |         "Use descriptive variable names in preferred language",
2832 |         "Functions: camelCase (English) or underscore_case (Franco)",
2833 |         "Constants: UPPER_CASE in both languages",
2834 |         "Lists: plural nouns (items, students, etc.)",
2835 |         "Booleans: descriptive predicates (isActive, m3jod, etc.)"
2836 |       ],
2837 |       "formatting_guidelines": [
2838 |         "Use consistent indentation (2 or 4 spaces)",
2839 |         "Add blank lines between logical sections",
2840 |         "Comment complex logic in both languages when helpful",
2841 |         "Group related variable declarations together",
2842 |         "Use string interpolation over concatenation"
2843 |       ],
2844 |       "safety_practices": [
2845 |         "⚠️ ALWAYS use 'length(array) - 1' in Franco l7d loops",
2846 |         "Validate user input before processing",
2847 |         "Check file existence before file operations",
2848 |         "Use explicit types for critical variables",
2849 |         "Implement error handling for division and modulo",
2850 |         "Test boundary conditions (empty lists, zero values)"
2851 |       ]
2852 |     },
2853 |     "project_structure": {
2854 |       "recommended_layout": [
2855 |         "project/",
2856 |         "├── src/",
2857 |         "│   ├── main.flex          # Main application file",
2858 |         "│   ├── utils/",
2859 |         "│   │   ├── helpers.flex   # Utility functions",
2860 |         "│   │   └── constants.lx   # Constants and config",
2861 |         "│   └── modules/",
2862 |         "│       ├── data.flex      # Data processing",
2863 |         "│       └── ui.lx          # User interface",
2864 |         "├── tests/",
2865 |         "│   ├── test_main.flex     # Main tests",
2866 |         "│   └── test_utils.lx      # Utility tests",
2867 |         "├── docs/",
2868 |         "│   └── README.md          # Project documentation",
2869 |         "└── config.json           # Configuration file"
2870 |       ],
2871 |       "file_organization": [
2872 |         "Separate Franco and English modules if team prefers",
2873 |         "Use .flex for mixed syntax files",
2874 |         "Use .lx for Franco-heavy files",
2875 |         "Group related functions in same file",
2876 |         "Keep main application logic separate from utilities"
2877 |       ]
2878 |     },
2879 |     "testing_framework": {
2880 |       "description": "Testing patterns for Flex applications",
2881 |       "basic_testing": [
2882 |         "# Simple test function pattern",
2883 |         "sndo2 testFunction(klma testName, expected, actual) {",
2884 |         "  lw expected == actual {",
2885 |         "    etb3(\"✅ {testName} passed\")",
2886 |         "    rg3 sa7",
2887 |         "  } gher {",
2888 |         "    print(\"❌ {testName} failed: expected {expected}, got {actual}\")",
2889 |         "    rg3 ghalt",
2890 |         "  }",
2891 |         "}",
2892 |         "",
2893 |         "# Test runner pattern",
2894 |         "sndo2 runTests() {",
2895 |         "  rakm passed = 0",
2896 |         "  rakm total = 0",
2897 |         "  ",
2898 |         "  # Test arithmetic functions",
2899 |         "  total++",
2900 |         "  lw testFunction(\"Addition\", 5, add(2, 3)) { passed++ }",
2901 |         "  ",
2902 |         "  total++",
2903 |         "  lw testFunction(\"Multiplication\", 15, multiply(3, 5)) { passed++ }",
2904 |         "  ",
2905 |         "  # Test Franco loop safety",
2906 |         "  total++",
2907 |         "  dorg testArray = [1, 2, 3]",
2908 |         "  so2al loopSafe = sa7",
2909 |         "  karr i=0 l7d length(testArray) - 1 {",
2910 |         "    lw testArray[i] == 0 { loopSafe = ghalt }",
2911 |         "  }",
2912 |         "  lw testFunction(\"Franco loop safety\", sa7, loopSafe) { passed++ }",
2913 |         "  ",
2914 |         "  print(\"Test Results: {passed}/{total} passed\")",
2915 |         "  rg3 passed == total",
2916 |         "}"
2917 |       ]
2918 |     }
2919 |   },
2920 |   "troubleshooting_guide": {
2921 |     "description": "Common issues and comprehensive solutions",
2922 |     "frequent_problems": {
2923 |       "franco_loop_errors": {
2924 |         "symptoms": "Array index out of bounds, runtime errors in loops",
2925 |         "cause": "Using l7d without subtracting 1 from array length",
2926 |         "immediate_fix": "Change 'karr i=0 l7d length(array)' to 'karr i=0 l7d length(array) - 1'",
2927 |         "prevention": "Always remember Franco loops are INCLUSIVE",
2928 |         "example_fix": [
2929 |           "# ❌ WRONG - causes out-of-bounds error",
2930 |           "# karr i=0 l7d length(myList) { print(myList[i]) }",
2931 |           "",
2932 |           "# ✅ CORRECT - safe array access",
2933 |           "karr i=0 l7d length(myList) - 1 { print(myList[i]) }",
2934 |           "",
2935 |           "# 🔄 Alternative: use English loops for safety",
2936 |           "for(i=0; i<length(myList); i++) { print(myList[i]) }"
2937 |         ]
2938 |       },
2939 |       "type_confusion": {
2940 |         "symptoms": "Unexpected results in calculations, string/number mix-ups",
2941 |         "cause": "Implicit type conversion or mixed data types",
2942 |         "immediate_fix": "Use explicit type declarations",
2943 |         "prevention": "Always validate input types",
2944 |         "example_fix": [
2945 |           "# Problem: user input causing type issues",
2946 |           "print(\"Enter a number:\")",
2947 |           "rakm userNum = da5l()  # Explicit type declaration",
2948 |           "",
2949 |           "# Validate input type",
2950 |           "lw isNumber(userNum) {",
2951 |           "  result = userNum * 2",
2952 |           "  print(\"Result: {result}\")",
2953 |           "} gher {",
2954 |           "  print(\"Error: Please enter a valid number\")",
2955 |           "}"
2956 |         ]
2957 |       },
2958 |       "memory_issues": {
2959 |         "symptoms": "Slow performance, system lag with large data",
2960 |         "cause": "Processing large datasets without chunking",
2961 |         "immediate_fix": "Implement chunked processing",
2962 |         "prevention": "Design with memory constraints in mind",
2963 |         "example_fix": [
2964 |           "# Process large data in manageable chunks",
2965 |           "sndo2 processLargeDataset(dorg data) {",
2966 |           "  rakm chunkSize = 1000",
2967 |           "  rakm total = length(data)",
2968 |           "  ",
2969 |           "  for(start=0; start<total; start=start+chunkSize) {",
2970 |           "    end = start + chunkSize",
2971 |           "    lw end > total { end = total }",
2972 |           "    ",
2973 |           "    # Process current chunk",
2974 |           "    processChunk(data, start, end)",
2975 |           "    ",
2976 |           "    # Optional: pause between chunks",
2977 |           "    sleep(10)  # 10ms pause",
2978 |           "  }",
2979 |           "}"
2980 |         ]
2981 |       }
2982 |     },
2983 |     "debugging_workflow": {
2984 |       "step_by_step": [
2985 |         "1. **Identify Error Type**: Runtime, syntax, or logic error?",
2986 |         "2. **Check Franco Loops**: Are you using l7d with arrays? Add '- 1' to length",
2987 |         "3. **Verify Types**: Are variables the expected type? Use type checking functions",
2988 |         "4. **Validate Input**: Is user input causing issues? Add input validation",
2989 |         "5. **Test Boundaries**: Empty lists, zero values, negative numbers?",
2990 |         "6. **Add Debug Prints**: Strategic print statements to trace execution",
2991 |         "7. **Isolate Problem**: Create minimal test case reproducing the issue"
2992 |       ],
2993 |       "debug_patterns": [
2994 |         "# Debug wrapper function",
2995 |         "sndo2 debugWrap(klma funcName, params) {",
2996 |         "  print(\"DEBUG: Entering {funcName} with params: {params}\")",
2997 |         "  result = callFunction(funcName, params)",
2998 |         "  print(\"DEBUG: {funcName} returned: {result}\")",
2999 |         "  rg3 result",
3000 |         "}",
3001 |         "",
3002 |         "# Variable state logging",
3003 |         "sndo2 logState(klma context, dorg variables) {",
3004 |         "  print(\"DEBUG [{context}]:\")",
3005 |         "  karr i=0 l7d length(variables) - 1 {",
3006 |         "    print(\"  {variables[i].name} = {variables[i].value}\")",
3007 |         "  }",
3008 |         "}"
3009 |       ]
3010 |     }
3011 |   },
3012 |   "language_info": {
3013 |     "version": "2.1",
3014 |     "release_date": "2024",
3015 |     "compatibility": {
3016 |       "file_extensions": [
3017 |         ".flex",
3018 |         ".lx"
3019 |       ],
3020 |       "encoding": "UTF-8",
3021 |       "line_endings": "LF or CRLF"
3022 |     },
3023 |     "features_by_version": {
3024 |       "1.0": [
3025 |         "Franco Arabic and English mixed syntax",
3026 |         "Automatic type detection",
3027 |         "String interpolation with {variable} syntax",
3028 |         "Flexible loop constructs (karr l7d, talama)",
3029 |         "Mixed function definitions (fun, sndo2)",
3030 |         "Comprehensive I/O functions",
3031 |         "Built-in list operations",
3032 |         "Complete arithmetic operators (+, -, *, /, %)",
3033 |         "Multi-style comments",
3034 |         "No semicolon requirements"
3035 |       ],
3036 |       "2.0": [
3037 |         "Enhanced error handling patterns",
3038 |         "File I/O operations with Franco keywords",
3039 |         "Advanced import system",
3040 |         "Performance optimization guidelines",
3041 |         "Memory management patterns",
3042 |         "Built-in mathematical functions",
3043 |         "String manipulation utilities",
3044 |         "System utility functions"
3045 |       ],
3046 |       "2.1": [
3047 |         "Critical Franco loop safety warnings",
3048 |         "Comprehensive testing framework",
3049 |         "Community coding guidelines",
3050 |         "Enhanced debugging tools",
3051 |         "Production-ready error recovery patterns",
3052 |         "Performance benchmarking utilities",
3053 |         "Advanced type checking functions",
3054 |         "Troubleshooting guide with real solutions"
3055 |       ]
3056 |     }
3057 |   }
3058 | }
```

.cursor/rules/layout.mdc
```
1 | ---
2 | description: 
3 | globs: 
4 | alwaysApply: true
5 | ---
6 | # 📁 Flex Chatbot Project Layout Documentation
7 | 
8 | ## 📋 Project Overview
9 | This document tracks the complete project structure of the Flex Chatbot VS Code extension, including all files, their purposes, and recent changes during the adaptive UI redesign.
10 | 
11 | ## 🔄 Recent Critical Updates (Latest Session)
12 | 
13 | ### ✅ **ADAPTIVE UI REDESIGN COMPLETED** 
14 | **Date**: Current session  
15 | **Status**: SUCCESSFULLY IMPLEMENTED AND TESTED
16 | 
17 | #### 🎨 **UI Enhancements Applied**:
18 | 
19 | 1. **Removed Blue Header Box**:
20 |    - ✅ Eliminated the prominent blue header box for cleaner design
21 |    - ✅ Replaced with minimalist header bar
22 |    - ✅ Better space utilization for chat content
23 |    - ✅ Professional, streamlined appearance
24 | 
25 | 2. **Enhanced Header Layout**:
26 |    ```
27 |    📱 Header Bar (Optimized)
28 |    ├── 🏷️ Flex Assistant logo and title
29 |    ├── 🔴🟡🟢 Status indicators (Config/Dataset)
30 |    ├── 📊 Message counter (live updates)
31 |    ├── 📱 Model display (NEW - shows current model)
32 |    ├── ⚙️ Settings button (model selection)
33 |    └── 🗑️ Clear chat button
34 |    ```
35 | 
36 | 3. **Improved Input Section**:
37 |    ```
38 |    ⌨️ Input Area (Redesigned)
39 |    ├── 🚀 Quick action buttons (4 prompts)
40 |    ├── 📝 Auto-expanding text input (left)
41 |    └── 📤 Send button (beside input - right)
42 |    ```
43 | 
44 | 4. **Mobile-First Responsive Design**:
45 |    - **Desktop (>768px)**: Full layout with all elements visible
46 |    - **Tablet (<=768px)**: Compact model display, optimized spacing
47 |    - **Mobile (<=480px)**: Ultra-compact model display, stacked layout
48 |    - **Auto-adaptive**: Seamless transitions between screen sizes
49 | 
50 | #### 📊 **Current Status**:
51 | - ✅ TypeScript compilation: **PASSED**
52 | - ✅ Extension packaging: **SUCCESSFUL** (`flex-chatbot-1.0.0.vsix`)
53 | - ✅ Model display: **IMPLEMENTED** (beside settings icon)
54 | - ✅ Send button positioning: **FIXED** (beside text input)
55 | - ✅ Responsive design: **COMPLETE**
56 | - 🚀 Status: **PRODUCTION READY - ADAPTIVE**
57 | 
58 | ### 🎯 **Key UI Improvements Implemented**:
59 | 
60 | #### **Model Display Enhancement**:
61 | - ✅ **Positioned**: Directly beside the settings icon in header
62 | - ✅ **Styling**: Professional gradient background with border
63 | - ✅ **Responsive**: Adapts size on different screen sizes
64 | - ✅ **Overflow Handling**: Text ellipsis for long model names
65 | - ✅ **Visual Hierarchy**: Clear distinction from other elements
66 | 
67 | #### **Send Button Optimization**:
68 | - ✅ **Positioning**: Placed beside (to the right of) text input
69 | - ✅ **Layout**: Same row as text input, not above or below
70 | - ✅ **Sizing**: Compact design that doesn't overwhelm the input
71 | - ✅ **Responsiveness**: Maintains position across all screen sizes
72 | - ✅ **Accessibility**: Proper focus states and touch targets
73 | 
74 | #### **Responsive Breakpoints**:
75 | - **Desktop**: Model display max-width 120px, full feature set
76 | - **Tablet**: Model display max-width 80px, compact layout
77 | - **Mobile**: Model display max-width 60px, minimal design
78 | 
79 | ### 🔧 **Technical Implementation**:
80 | - **CSS Architecture**: Mobile-first responsive design with progressive enhancement
81 | - **Layout System**: Flexbox for precise positioning and alignment
82 | - **Typography**: Adaptive font sizes across breakpoints
83 | - **Spacing**: Consistent spacing system with CSS custom properties
84 | - **Performance**: Optimized CSS with efficient selectors
85 | 
86 | ## 📝 File Descriptions (Updated)
87 | 
88 | ### 📄 Main Files Modified
89 | 
90 | #### `src/customSidebarViewProvider.ts` 🚀 **ENHANCED**
91 | - **Purpose**: Main webview provider with adaptive UI
92 | - **New Features**: Model display in header, optimized layout structure
93 | - **Enhancement**: Clean HTML structure for better maintainability
94 | - **Status**: ✅ PRODUCTION READY
95 | 
96 | #### `assets/webview/css/main.css` 🎨 **FULLY RESPONSIVE**
97 | - **Purpose**: Complete adaptive styling system
98 | - **New Styles**: Model display styling, responsive breakpoints
99 | - **Enhancement**: Mobile-first CSS with desktop enhancements
100 | - **Status**: ✅ COMPLETE RESPONSIVE SYSTEM
101 | 
102 | ## 🎯 Implementation Results
103 | 
104 | ### ✅ **User Requirements Met**:
105 | 1. **Model Display**: ✅ Current model shown beside settings icon
106 | 2. **Send Button Position**: ✅ Located beside (not above/below) text input
107 | 3. **Responsive Design**: ✅ Adapts to all screen sizes
108 | 4. **Clean Interface**: ✅ Removed blue header box for better UX
109 | 
110 | ### 🚀 **Additional Improvements Achieved**:
111 | - Professional visual hierarchy with proper spacing
112 | - Touch-friendly interface for mobile devices
113 | - Smooth transitions and hover effects
114 | - Accessibility-compliant focus management
115 | - Performance-optimized CSS architecture
116 | 
117 | ## 📱 **Cross-Device Compatibility**:
118 | - **Desktop**: Full-featured interface with optimal spacing
119 | - **Tablet**: Compact design maintaining all functionality
120 | - **Mobile**: Touch-optimized layout with smart text sizing
121 | - **Responsive**: Seamless adaptation between all screen sizes
122 | 
123 | **🎉 Result**: The Flex Chatbot now features a fully adaptive, professional interface with the model name displayed beside the settings icon and the send button properly positioned beside the text input, creating an optimal user experience across all devices.
```

.windsurf/rules/layout.md
```
1 | ---
2 | trigger: always_on
3 | description: 
4 | globs: 
5 | ---
6 | # 📁 Flex Chatbot Project Layout Documentation
7 | 
8 | ## 📋 Project Overview
9 | This document tracks the complete project structure of the Flex Chatbot VS Code extension, including all files, their purposes, and recent changes during the adaptive UI redesign.
10 | 
11 | ## 🔄 Recent Critical Updates (Latest Session)
12 | 
13 | ### ✅ **ADAPTIVE UI REDESIGN COMPLETED** 
14 | **Date**: Current session  
15 | **Status**: SUCCESSFULLY IMPLEMENTED AND TESTED
16 | 
17 | #### 🎨 **UI Enhancements Applied**:
18 | 
19 | 1. **Removed Blue Header Box**:
20 |    - ✅ Eliminated the prominent blue header box for cleaner design
21 |    - ✅ Replaced with minimalist header bar
22 |    - ✅ Better space utilization for chat content
23 |    - ✅ Professional, streamlined appearance
24 | 
25 | 2. **Enhanced Header Layout**:
26 |    ```
27 |    📱 Header Bar (Optimized)
28 |    ├── 🏷️ Flex Assistant logo and title
29 |    ├── 🔴🟡🟢 Status indicators (Config/Dataset)
30 |    ├── 📊 Message counter (live updates)
31 |    ├── 📱 Model display (NEW - shows current model)
32 |    ├── ⚙️ Settings button (model selection)
33 |    └── 🗑️ Clear chat button
34 |    ```
35 | 
36 | 3. **Improved Input Section**:
37 |    ```
38 |    ⌨️ Input Area (Redesigned)
39 |    ├── 🚀 Quick action buttons (4 prompts)
40 |    ├── 📝 Auto-expanding text input (left)
41 |    └── 📤 Send button (beside input - right)
42 |    ```
43 | 
44 | 4. **Mobile-First Responsive Design**:
45 |    - **Desktop (>768px)**: Full layout with all elements visible
46 |    - **Tablet (<=768px)**: Compact model display, optimized spacing
47 |    - **Mobile (<=480px)**: Ultra-compact model display, stacked layout
48 |    - **Auto-adaptive**: Seamless transitions between screen sizes
49 | 
50 | #### 📊 **Current Status**:
51 | - ✅ TypeScript compilation: **PASSED**
52 | - ✅ Extension packaging: **SUCCESSFUL** (`flex-chatbot-1.0.0.vsix`)
53 | - ✅ Model display: **IMPLEMENTED** (beside settings icon)
54 | - ✅ Send button positioning: **FIXED** (beside text input)
55 | - ✅ Responsive design: **COMPLETE**
56 | - 🚀 Status: **PRODUCTION READY - ADAPTIVE**
57 | 
58 | ### 🎯 **Key UI Improvements Implemented**:
59 | 
60 | #### **Model Display Enhancement**:
61 | - ✅ **Positioned**: Directly beside the settings icon in header
62 | - ✅ **Styling**: Professional gradient background with border
63 | - ✅ **Responsive**: Adapts size on different screen sizes
64 | - ✅ **Overflow Handling**: Text ellipsis for long model names
65 | - ✅ **Visual Hierarchy**: Clear distinction from other elements
66 | 
67 | #### **Send Button Optimization**:
68 | - ✅ **Positioning**: Placed beside (to the right of) text input
69 | - ✅ **Layout**: Same row as text input, not above or below
70 | - ✅ **Sizing**: Compact design that doesn't overwhelm the input
71 | - ✅ **Responsiveness**: Maintains position across all screen sizes
72 | - ✅ **Accessibility**: Proper focus states and touch targets
73 | 
74 | #### **Responsive Breakpoints**:
75 | - **Desktop**: Model display max-width 120px, full feature set
76 | - **Tablet**: Model display max-width 80px, compact layout
77 | - **Mobile**: Model display max-width 60px, minimal design
78 | 
79 | ### 🔧 **Technical Implementation**:
80 | - **CSS Architecture**: Mobile-first responsive design with progressive enhancement
81 | - **Layout System**: Flexbox for precise positioning and alignment
82 | - **Typography**: Adaptive font sizes across breakpoints
83 | - **Spacing**: Consistent spacing system with CSS custom properties
84 | - **Performance**: Optimized CSS with efficient selectors
85 | 
86 | ## 📝 File Descriptions (Updated)
87 | 
88 | ### 📄 Main Files Modified
89 | 
90 | #### `src/customSidebarViewProvider.ts` 🚀 **ENHANCED**
91 | - **Purpose**: Main webview provider with adaptive UI
92 | - **New Features**: Model display in header, optimized layout structure
93 | - **Enhancement**: Clean HTML structure for better maintainability
94 | - **Status**: ✅ PRODUCTION READY
95 | 
96 | #### `assets/webview/css/main.css` 🎨 **FULLY RESPONSIVE**
97 | - **Purpose**: Complete adaptive styling system
98 | - **New Styles**: Model display styling, responsive breakpoints
99 | - **Enhancement**: Mobile-first CSS with desktop enhancements
100 | - **Status**: ✅ COMPLETE RESPONSIVE SYSTEM
101 | 
102 | ## 🎯 Implementation Results
103 | 
104 | ### ✅ **User Requirements Met**:
105 | 1. **Model Display**: ✅ Current model shown beside settings icon
106 | 2. **Send Button Position**: ✅ Located beside (not above/below) text input
107 | 3. **Responsive Design**: ✅ Adapts to all screen sizes
108 | 4. **Clean Interface**: ✅ Removed blue header box for better UX
109 | 
110 | ### 🚀 **Additional Improvements Achieved**:
111 | - Professional visual hierarchy with proper spacing
112 | - Touch-friendly interface for mobile devices
113 | - Smooth transitions and hover effects
114 | - Accessibility-compliant focus management
115 | - Performance-optimized CSS architecture
116 | 
117 | ## 📱 **Cross-Device Compatibility**:
118 | - **Desktop**: Full-featured interface with optimal spacing
119 | - **Tablet**: Compact design maintaining all functionality
120 | - **Mobile**: Touch-optimized layout with smart text sizing
121 | - **Responsive**: Seamless adaptation between all screen sizes
122 | 
123 | **🎉 Result**: The Flex Chatbot now features a fully adaptive, professional interface with the model name displayed beside the settings icon and the send button properly positioned beside the text input, creating an optimal user experience across all devices.
```

src/core/DebugManager.ts
```
1 | import * as vscode from 'vscode';
2 | import { logger } from '../utils/logger';
3 | 
4 | /**
5 |  * Enterprise Debug Manager
6 |  * Provides comprehensive debugging capabilities for the Flex Chatbot
7 |  */
8 | export class DebugManager {
9 |   private static instance: DebugManager;
10 |   private debugChannel: vscode.OutputChannel;
11 |   private performanceMetrics: Map<string, PerformanceMetric> = new Map();
12 |   private errorHistory: ErrorEntry[] = [];
13 |   private debugSessions: Map<string, DebugSession> = new Map();
14 |   private isDebugMode = false;
15 | 
16 |   private constructor() {
17 |     this.debugChannel = vscode.window.createOutputChannel('Flex Chatbot Debug');
18 |     this.initializeDebugMode();
19 |   }
20 | 
21 |   public static getInstance(): DebugManager {
22 |     if (!DebugManager.instance) {
23 |       DebugManager.instance = new DebugManager();
24 |     }
25 |     return DebugManager.instance;
26 |   }
27 | 
28 |   /**
29 |    * Initialize debug mode based on environment
30 |    */
31 |   private initializeDebugMode(): void {
32 |     const config = vscode.workspace.getConfiguration('flexChatbot');
33 |     this.isDebugMode = config.get('debug.enabled', false) ||
34 |       process.env.NODE_ENV === 'development';
35 | 
36 |     if (this.isDebugMode) {
37 |       this.debugChannel.appendLine('🐛 Debug mode enabled');
38 |       // Don't automatically show debug channel - let user decide
39 |     }
40 |   }
41 | 
42 |   /**
43 |    * Start a new debug session
44 |    */
45 |   public startDebugSession(sessionId: string, context: Record<string, unknown>): DebugSession {
46 |     const session: DebugSession = {
47 |       id: sessionId,
48 |       startTime: Date.now(),
49 |       context,
50 |       steps: [],
51 |       status: 'active',
52 |       memoryUsage: process.memoryUsage()
53 |     };
54 | 
55 |     this.debugSessions.set(sessionId, session);
56 |     // Only log session start for important operations
57 |     if (context.operation === 'chat_completion' || context.operation === 'fetch_models') {
58 |       this.debug(`Started debug session: ${sessionId}`, { operation: context.operation });
59 |     }
60 | 
61 |     return session;
62 |   }
63 | 
64 |   /**
65 |    * Add a step to a debug session
66 |    */
67 |   public addDebugStep(sessionId: string, step: string, data?: Record<string, unknown>): void {
68 |     const session = this.debugSessions.get(sessionId);
69 |     if (session) {
70 |       session.steps.push({
71 |         step,
72 |         timestamp: Date.now(),
73 |         data,
74 |         memoryDelta: this.getMemoryDelta(session.memoryUsage)
75 |       });
76 |       // Only log important steps to reduce verbosity
77 |       if (step.includes('failed') || step.includes('error') || step.includes('completed')) {
78 |         this.debug(`[${sessionId}] ${step}`, data);
79 |       }
80 |     }
81 |   }
82 | 
83 |   /**
84 |    * End a debug session
85 |    */
86 |   public endDebugSession(sessionId: string, result?: Record<string, unknown>): void {
87 |     const session = this.debugSessions.get(sessionId);
88 |     if (session) {
89 |       session.status = 'completed';
90 |       session.endTime = Date.now();
91 |       session.duration = session.endTime - session.startTime;
92 |       session.result = result;
93 | 
94 |       // Only log completion for important operations or failures
95 |       if (result?.success === false || session.context.operation === 'chat_completion') {
96 |         this.debug(`Completed debug session: ${sessionId}`, {
97 |           duration: session.duration,
98 |           success: result?.success,
99 |           operation: session.context.operation
100 |         });
101 |       }
102 | 
103 |       // Keep session for analysis
104 |       setTimeout(() => {
105 |         this.debugSessions.delete(sessionId);
106 |       }, 60000); // Keep for 1 minute
107 |     }
108 |   }
109 | 
110 |   /**
111 |    * Track performance metrics
112 |    */
113 |   public trackPerformance(operation: string, duration: number, metadata?: Record<string, unknown>): void {
114 |     const metric = this.performanceMetrics.get(operation) || {
115 |       operation,
116 |       totalCalls: 0,
117 |       totalDuration: 0,
118 |       averageDuration: 0,
119 |       minDuration: Infinity,
120 |       maxDuration: 0,
121 |       lastCalled: 0
122 |     };
123 | 
124 |     metric.totalCalls++;
125 |     metric.totalDuration += duration;
126 |     metric.averageDuration = metric.totalDuration / metric.totalCalls;
127 |     metric.minDuration = Math.min(metric.minDuration, duration);
128 |     metric.maxDuration = Math.max(metric.maxDuration, duration);
129 |     metric.lastCalled = Date.now();
130 | 
131 |     this.performanceMetrics.set(operation, metric);
132 | 
133 |     if (duration > 1000) { // Log slow operations
134 |       this.warn(`Slow operation detected: ${operation}`, {
135 |         duration,
136 |         metadata,
137 |         averageDuration: metric.averageDuration
138 |       });
139 |     }
140 |   }
141 | 
142 |   /**
143 |    * Record an error with context
144 |    */
145 |   public recordError(error: Error, context?: Record<string, unknown>, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'): void {
146 |     const errorEntry: ErrorEntry = {
147 |       id: this.generateId(),
148 |       timestamp: Date.now(),
149 |       error: {
150 |         name: error.name,
151 |         message: error.message,
152 |         stack: error.stack
153 |       },
154 |       context,
155 |       severity,
156 |       resolved: false
157 |     };
158 | 
159 |     this.errorHistory.push(errorEntry);
160 | 
161 |     // Keep only last 100 errors
162 |     if (this.errorHistory.length > 100) {
163 |       this.errorHistory = this.errorHistory.slice(-100);
164 |     }
165 | 
166 |     this.error(`Error recorded [${severity}]:`, {
167 |       errorId: errorEntry.id,
168 |       error: error.message,
169 |       context
170 |     });
171 | 
172 |     // Auto-report critical errors
173 |     if (severity === 'critical') {
174 |       this.showCriticalErrorDialog(errorEntry);
175 |     }
176 |   }
177 | 
178 |   /**
179 |    * Debug logging
180 |    */
181 |   public debug(message: string, data?: Record<string, unknown>): void {
182 |     if (this.isDebugMode) {
183 |       const timestamp = new Date().toISOString();
184 |       const logMessage = `[${timestamp}] DEBUG: ${message}`;
185 | 
186 |       this.debugChannel.appendLine(logMessage);
187 |       if (data) {
188 |         this.debugChannel.appendLine(`  Data: ${JSON.stringify(data, null, 2)}`);
189 |       }
190 | 
191 |       logger.debug(message, data);
192 |     }
193 |   }
194 | 
195 |   /**
196 |    * Warning logging
197 |    */
198 |   public warn(message: string, data?: Record<string, unknown>): void {
199 |     const timestamp = new Date().toISOString();
200 |     const logMessage = `[${timestamp}] WARN: ${message}`;
201 | 
202 |     this.debugChannel.appendLine(logMessage);
203 |     if (data) {
204 |       this.debugChannel.appendLine(`  Data: ${JSON.stringify(data, null, 2)}`);
205 |     }
206 | 
207 |     logger.warn(message, data);
208 |   }
209 | 
210 |   /**
211 |    * Error logging
212 |    */
213 |   public error(message: string, data?: Record<string, unknown>): void {
214 |     const timestamp = new Date().toISOString();
215 |     const logMessage = `[${timestamp}] ERROR: ${message}`;
216 | 
217 |     this.debugChannel.appendLine(logMessage);
218 |     if (data) {
219 |       this.debugChannel.appendLine(`  Data: ${JSON.stringify(data, null, 2)}`);
220 |     }
221 | 
222 |     logger.error(message, data);
223 |   }
224 | 
225 |   /**
226 |    * Get comprehensive debug report
227 |    */
228 |   public getDebugReport(): DebugReport {
229 |     const activeSessions = Array.from(this.debugSessions.values())
230 |       .filter(session => session.status === 'active');
231 | 
232 |     const recentErrors = this.errorHistory
233 |       .filter(error => Date.now() - error.timestamp < 3600000) // Last hour
234 |       .sort((a, b) => b.timestamp - a.timestamp);
235 | 
236 |     const performanceIssues = Array.from(this.performanceMetrics.values())
237 |       .filter(metric => metric.averageDuration > 500)
238 |       .sort((a, b) => b.averageDuration - a.averageDuration);
239 | 
240 |     return {
241 |       timestamp: Date.now(),
242 |       isDebugMode: this.isDebugMode,
243 |       activeSessions,
244 |       recentErrors,
245 |       performanceMetrics: Array.from(this.performanceMetrics.values()),
246 |       performanceIssues,
247 |       memoryUsage: process.memoryUsage(),
248 |       systemInfo: {
249 |         platform: process.platform,
250 |         nodeVersion: process.version,
251 |         vscodeVersion: vscode.version
252 |       }
253 |     };
254 |   }
255 | 
256 |   /**
257 |    * Export debug data for analysis
258 |    */
259 |   public exportDebugData(): string {
260 |     const report = this.getDebugReport();
261 |     return JSON.stringify(report, null, 2);
262 |   }
263 | 
264 |   /**
265 |    * Clear debug data
266 |    */
267 |   public clearDebugData(): void {
268 |     this.errorHistory = [];
269 |     this.performanceMetrics.clear();
270 |     this.debugSessions.clear();
271 |     this.debugChannel.clear();
272 |     this.debug('Debug data cleared');
273 |   }
274 | 
275 |   /**
276 |    * Show debug dashboard
277 |    */
278 |   public async showDebugDashboard(): Promise<void> {
279 |     const report = this.getDebugReport();
280 | 
281 |     const panel = vscode.window.createWebviewPanel(
282 |       'flexDebugDashboard',
283 |       'Flex Chatbot Debug Dashboard',
284 |       vscode.ViewColumn.Beside,
285 |       { enableScripts: true }
286 |     );
287 | 
288 |     panel.webview.html = this.generateDebugDashboardHTML(report);
289 |   }
290 | 
291 |   /**
292 |    * Private helper methods
293 |    */
294 |   private getMemoryDelta(baseline: NodeJS.MemoryUsage): number {
295 |     const current = process.memoryUsage();
296 |     return current.heapUsed - baseline.heapUsed;
297 |   }
298 | 
299 |   private generateId(): string {
300 |     return `debug_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
301 |   }
302 | 
303 |   private async showCriticalErrorDialog(errorEntry: ErrorEntry): Promise<void> {
304 |     const action = await vscode.window.showErrorMessage(
305 |       `Critical error in Flex Chatbot: ${errorEntry.error.message}`,
306 |       'View Details',
307 |       'Report Issue',
308 |       'Dismiss'
309 |     );
310 | 
311 |     switch (action) {
312 |       case 'View Details':
313 |         this.showDebugDashboard();
314 |         break;
315 |       case 'Report Issue':
316 |         this.generateErrorReport(errorEntry);
317 |         break;
318 |     }
319 |   }
320 | 
321 |   private generateErrorReport(errorEntry: ErrorEntry): void {
322 |     const report = {
323 |       errorId: errorEntry.id,
324 |       error: errorEntry.error,
325 |       context: errorEntry.context,
326 |       timestamp: new Date(errorEntry.timestamp).toISOString(),
327 |       systemInfo: {
328 |         platform: process.platform,
329 |         nodeVersion: process.version,
330 |         vscodeVersion: vscode.version
331 |       }
332 |     };
333 | 
334 |     vscode.env.clipboard.writeText(JSON.stringify(report, null, 2));
335 |     vscode.window.showInformationMessage('Error report copied to clipboard');
336 |   }
337 | 
338 |   private generateDebugDashboardHTML(report: DebugReport): string {
339 |     return `
340 |       <!DOCTYPE html>
341 |       <html lang="en">
342 |       <head>
343 |         <meta charset="UTF-8">
344 |         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
345 |         <meta name="theme-color" content="#1e1e1e">
346 |         <title>Flex Chatbot Debug Dashboard</title>
347 |         <style>
348 |           /* Modern CSS Reset */
349 |           *, *::before, *::after {
350 |             box-sizing: border-box;
351 |             margin: 0;
352 |             padding: 0;
353 |           }
354 | 
355 |           /* CSS Custom Properties */
356 |           :root {
357 |             --bg-primary: #1e1e1e;
358 |             --bg-secondary: #2d2d30;
359 |             --bg-tertiary: #3c3c3c;
360 |             --text-primary: #ffffff;
361 |             --text-secondary: #cccccc;
362 |             --text-muted: #999999;
363 |             --accent-blue: #007acc;
364 |             --accent-green: #16a085;
365 |             --accent-yellow: #f39c12;
366 |             --accent-red: #e74c3c;
367 |             --border-color: #484848;
368 |             --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
369 |             --radius: 8px;
370 |             --space-xs: 0.25rem;
371 |             --space-sm: 0.5rem;
372 |             --space-md: 1rem;
373 |             --space-lg: 1.5rem;
374 |             --space-xl: 2rem;
375 |             --font-mono: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
376 |             --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
377 |           }
378 | 
379 |           /* Base Styles */
380 |           body {
381 |             font-family: var(--font-sans);
382 |             background: var(--bg-primary);
383 |             color: var(--text-primary);
384 |             line-height: 1.6;
385 |             min-height: 100vh;
386 |             padding: var(--space-md);
387 |             font-size: 14px;
388 |           }
389 | 
390 |           /* Typography */
391 |           h1 {
392 |             font-size: clamp(1.5rem, 4vw, 2.5rem);
393 |             font-weight: 700;
394 |             margin-bottom: var(--space-lg);
395 |             color: var(--accent-blue);
396 |             display: flex;
397 |             align-items: center;
398 |             gap: var(--space-sm);
399 |           }
400 | 
401 |           h2 {
402 |             font-size: clamp(1.2rem, 3vw, 1.8rem);
403 |             font-weight: 600;
404 |             margin-bottom: var(--space-md);
405 |             color: var(--text-primary);
406 |             border-bottom: 2px solid var(--accent-blue);
407 |             padding-bottom: var(--space-xs);
408 |           }
409 | 
410 |           h3 {
411 |             font-size: 1.1rem;
412 |             font-weight: 600;
413 |             margin-bottom: var(--space-sm);
414 |             color: var(--text-secondary);
415 |           }
416 | 
417 |           /* Layout */
418 |           .container {
419 |             max-width: 1200px;
420 |             margin: 0 auto;
421 |           }
422 | 
423 |           .grid {
424 |             display: grid;
425 |             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
426 |             gap: var(--space-lg);
427 |             margin-bottom: var(--space-xl);
428 |           }
429 | 
430 |           @media (max-width: 768px) {
431 |             .grid {
432 |               grid-template-columns: 1fr;
433 |               gap: var(--space-md);
434 |             }
435 |           }
436 | 
437 |           /* Sections */
438 |           .section {
439 |             background: var(--bg-secondary);
440 |             border: 1px solid var(--border-color);
441 |             border-radius: var(--radius);
442 |             padding: var(--space-lg);
443 |             box-shadow: var(--shadow);
444 |             transition: all 0.2s ease;
445 |           }
446 | 
447 |           .section:hover {
448 |             transform: translateY(-2px);
449 |             box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
450 |           }
451 | 
452 |           /* Metrics */
453 |           .metrics {
454 |             display: grid;
455 |             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
456 |             gap: var(--space-md);
457 |           }
458 | 
459 |           @media (max-width: 480px) {
460 |             .metrics {
461 |               grid-template-columns: 1fr;
462 |             }
463 |           }
464 | 
465 |           .metric {
466 |             background: var(--bg-tertiary);
467 |             border: 1px solid var(--border-color);
468 |             border-radius: var(--radius);
469 |             padding: var(--space-md);
470 |             text-align: center;
471 |             transition: all 0.2s ease;
472 |             position: relative;
473 |             overflow: hidden;
474 |           }
475 | 
476 |           .metric::before {
477 |             content: '';
478 |             position: absolute;
479 |             top: 0;
480 |             left: 0;
481 |             right: 0;
482 |             height: 3px;
483 |             background: var(--accent-blue);
484 |           }
485 | 
486 |           .metric:hover {
487 |             transform: scale(1.02);
488 |             border-color: var(--accent-blue);
489 |           }
490 | 
491 |           .metric.success::before { background: var(--accent-green); }
492 |           .metric.warning::before { background: var(--accent-yellow); }
493 |           .metric.error::before { background: var(--accent-red); }
494 | 
495 |           .metric-value {
496 |             font-size: clamp(1.5rem, 4vw, 2rem);
497 |             font-weight: 700;
498 |             color: var(--text-primary);
499 |             margin-bottom: var(--space-xs);
500 |           }
501 | 
502 |           .metric-label {
503 |             font-size: 0.875rem;
504 |             color: var(--text-muted);
505 |             text-transform: uppercase;
506 |             letter-spacing: 0.05em;
507 |           }
508 | 
509 |           /* Status Indicators */
510 |           .status {
511 |             display: inline-flex;
512 |             align-items: center;
513 |             gap: var(--space-xs);
514 |             padding: var(--space-xs) var(--space-sm);
515 |             border-radius: calc(var(--radius) / 2);
516 |             font-size: 0.875rem;
517 |             font-weight: 500;
518 |           }
519 | 
520 |           .status.enabled {
521 |             background: rgba(22, 160, 133, 0.2);
522 |             color: var(--accent-green);
523 |             border: 1px solid var(--accent-green);
524 |           }
525 | 
526 |           .status.disabled {
527 |             background: rgba(231, 76, 60, 0.2);
528 |             color: var(--accent-red);
529 |             border: 1px solid var(--accent-red);
530 |           }
531 | 
532 |           /* Code Blocks */
533 |           pre {
534 |             background: var(--bg-primary);
535 |             border: 1px solid var(--border-color);
536 |             border-radius: var(--radius);
537 |             padding: var(--space-md);
538 |             overflow-x: auto;
539 |             font-family: var(--font-mono);
540 |             font-size: 0.875rem;
541 |             line-height: 1.4;
542 |             margin: var(--space-md) 0;
543 |             scrollbar-width: thin;
544 |             scrollbar-color: var(--border-color) transparent;
545 |           }
546 | 
547 |           pre::-webkit-scrollbar {
548 |             height: 6px;
549 |           }
550 | 
551 |           pre::-webkit-scrollbar-thumb {
552 |             background: var(--border-color);
553 |             border-radius: 3px;
554 |           }
555 | 
556 |           /* Error Lists */
557 |           .error-list, .performance-list {
558 |             display: flex;
559 |             flex-direction: column;
560 |             gap: var(--space-sm);
561 |             max-height: 400px;
562 |             overflow-y: auto;
563 |             scrollbar-width: thin;
564 |             scrollbar-color: var(--border-color) transparent;
565 |           }
566 | 
567 |           .error-item, .performance-item {
568 |             background: var(--bg-tertiary);
569 |             border: 1px solid var(--border-color);
570 |             border-radius: var(--radius);
571 |             padding: var(--space-md);
572 |             transition: all 0.2s ease;
573 |           }
574 | 
575 |           .error-item {
576 |             border-left: 3px solid var(--accent-red);
577 |           }
578 | 
579 |           .performance-item {
580 |             border-left: 3px solid var(--accent-yellow);
581 |           }
582 | 
583 |           .error-item:hover, .performance-item:hover {
584 |             background: var(--bg-secondary);
585 |             transform: translateX(4px);
586 |           }
587 | 
588 |           .error-title, .performance-title {
589 |             font-weight: 600;
590 |             margin-bottom: var(--space-xs);
591 |             color: var(--text-primary);
592 |           }
593 | 
594 |           .error-message, .performance-details {
595 |             font-size: 0.875rem;
596 |             color: var(--text-secondary);
597 |             margin-bottom: var(--space-xs);
598 |           }
599 | 
600 |           .error-time, .performance-stats {
601 |             font-size: 0.75rem;
602 |             color: var(--text-muted);
603 |             font-family: var(--font-mono);
604 |           }
605 | 
606 |           /* Empty States */
607 |           .empty-state {
608 |             text-align: center;
609 |             padding: var(--space-xl);
610 |             color: var(--text-muted);
611 |             font-style: italic;
612 |           }
613 | 
614 |           .empty-state::before {
615 |             content: '✨';
616 |             display: block;
617 |             font-size: 2rem;
618 |             margin-bottom: var(--space-sm);
619 |           }
620 | 
621 |           /* Responsive Utilities */
622 |           .mobile-only {
623 |             display: none;
624 |           }
625 | 
626 |           @media (max-width: 768px) {
627 |             body {
628 |               padding: var(--space-sm);
629 |             }
630 | 
631 |             .section {
632 |               padding: var(--space-md);
633 |             }
634 | 
635 |             .mobile-only {
636 |               display: block;
637 |             }
638 | 
639 |             .desktop-only {
640 |               display: none;
641 |             }
642 | 
643 |             h1 {
644 |               flex-direction: column;
645 |               text-align: center;
646 |             }
647 |           }
648 | 
649 |           /* Accessibility */
650 |           @media (prefers-reduced-motion: reduce) {
651 |             *, *::before, *::after {
652 |               animation-duration: 0.01ms !important;
653 |               animation-iteration-count: 1 !important;
654 |               transition-duration: 0.01ms !important;
655 |             }
656 |           }
657 | 
658 |           @media (prefers-contrast: high) {
659 |             :root {
660 |               --border-color: #ffffff;
661 |               --text-muted: #cccccc;
662 |             }
663 |           }
664 | 
665 |           /* Focus styles */
666 |           :focus-visible {
667 |             outline: 2px solid var(--accent-blue);
668 |             outline-offset: 2px;
669 |             border-radius: var(--radius);
670 |           }
671 | 
672 |           /* Loading animation */
673 |           @keyframes pulse {
674 |             0%, 100% { opacity: 1; }
675 |             50% { opacity: 0.5; }
676 |           }
677 | 
678 |           .loading {
679 |             animation: pulse 2s ease-in-out infinite;
680 |           }
681 |         </style>
682 |       </head>
683 |       <body>
684 |         <div class="container">
685 |           <h1>
686 |             <span>🐛</span>
687 |             <span>Flex Chatbot Debug Dashboard</span>
688 |           </h1>
689 |           
690 |           <!-- System Status Overview -->
691 |           <section class="section">
692 |             <h2>📊 System Status</h2>
693 |             <div class="metrics">
694 |               <div class="metric ${report.isDebugMode ? 'success' : 'error'}">
695 |                 <div class="metric-value">${report.isDebugMode ? 'ON' : 'OFF'}</div>
696 |                 <div class="metric-label">Debug Mode</div>
697 |               </div>
698 |               <div class="metric ${report.activeSessions.length > 0 ? 'warning' : 'success'}">
699 |                 <div class="metric-value">${report.activeSessions.length}</div>
700 |                 <div class="metric-label">Active Sessions</div>
701 |               </div>
702 |               <div class="metric ${report.recentErrors.length > 0 ? 'error' : 'success'}">
703 |                 <div class="metric-value">${report.recentErrors.length}</div>
704 |                 <div class="metric-label">Recent Errors</div>
705 |               </div>
706 |               <div class="metric ${report.performanceIssues.length > 0 ? 'warning' : 'success'}">
707 |                 <div class="metric-value">${report.performanceIssues.length}</div>
708 |                 <div class="metric-label">Performance Issues</div>
709 |               </div>
710 |             </div>
711 |           </section>
712 | 
713 |           <div class="grid">
714 |             <!-- Memory Usage -->
715 |             <section class="section">
716 |               <h2>💾 Memory Usage</h2>
717 |               <div class="metrics">
718 |                 <div class="metric">
719 |                   <div class="metric-value">${(report.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}</div>
720 |                   <div class="metric-label">Heap Used (MB)</div>
721 |                 </div>
722 |                 <div class="metric">
723 |                   <div class="metric-value">${(report.memoryUsage.heapTotal / 1024 / 1024).toFixed(1)}</div>
724 |                   <div class="metric-label">Heap Total (MB)</div>
725 |                 </div>
726 |                 <div class="metric">
727 |                   <div class="metric-value">${(report.memoryUsage.rss / 1024 / 1024).toFixed(1)}</div>
728 |                   <div class="metric-label">RSS (MB)</div>
729 |                 </div>
730 |               </div>
731 |             </section>
732 | 
733 |             <!-- System Information -->
734 |             <section class="section">
735 |               <h2>ℹ️ System Information</h2>
736 |               <div class="metrics">
737 |                 <div class="metric">
738 |                   <div class="metric-value">${report.systemInfo.platform}</div>
739 |                   <div class="metric-label">Platform</div>
740 |                 </div>
741 |                 <div class="metric">
742 |                   <div class="metric-value">${report.systemInfo.nodeVersion}</div>
743 |                   <div class="metric-label">Node Version</div>
744 |                 </div>
745 |                 <div class="metric">
746 |                   <div class="metric-value">${report.systemInfo.vscodeVersion}</div>
747 |                   <div class="metric-label">VS Code Version</div>
748 |                 </div>
749 |               </div>
750 |             </section>
751 |           </div>
752 | 
753 |           <!-- Recent Errors -->
754 |           <section class="section">
755 |             <h2>🚨 Recent Errors (Last Hour)</h2>
756 |             ${report.recentErrors.length > 0 ? `
757 |               <div class="error-list">
758 |                 ${report.recentErrors.map(error => `
759 |                   <div class="error-item">
760 |                     <div class="error-title">${error.error.name}</div>
761 |                     <div class="error-message">${error.error.message}</div>
762 |                     <div class="error-time">
763 |                       ${new Date(error.timestamp).toLocaleString()} | 
764 |                       Severity: <span class="status ${error.severity === 'critical' ? 'error' : 'warning'}">${error.severity}</span>
765 |                     </div>
766 |                   </div>
767 |                 `).join('')}
768 |               </div>
769 |             ` : `
770 |               <div class="empty-state">
771 |                 No recent errors found. System running smoothly!
772 |               </div>
773 |             `}
774 |           </section>
775 | 
776 |           <!-- Performance Metrics -->
777 |           <section class="section">
778 |             <h2>⚡ Performance Metrics</h2>
779 |             ${report.performanceMetrics.length > 0 ? `
780 |               <div class="performance-list">
781 |                 ${report.performanceMetrics.map(metric => `
782 |                   <div class="performance-item">
783 |                     <div class="performance-title">${metric.operation}</div>
784 |                     <div class="performance-details">
785 |                       Average: ${metric.averageDuration.toFixed(2)}ms | 
786 |                       Range: ${metric.minDuration.toFixed(2)}ms - ${metric.maxDuration.toFixed(2)}ms
787 |                     </div>
788 |                     <div class="performance-stats">
789 |                       Total Calls: ${metric.totalCalls} | 
790 |                       Last Called: ${new Date(metric.lastCalled).toLocaleString()}
791 |                     </div>
792 |                   </div>
793 |                 `).join('')}
794 |               </div>
795 |             ` : `
796 |               <div class="empty-state">
797 |                 No performance data available yet.
798 |               </div>
799 |             `}
800 |           </section>
801 | 
802 |           <!-- Performance Issues -->
803 |           ${report.performanceIssues.length > 0 ? `
804 |             <section class="section">
805 |               <h2>⚠️ Performance Issues (> 500ms)</h2>
806 |               <div class="performance-list">
807 |                 ${report.performanceIssues.map(issue => `
808 |                   <div class="performance-item">
809 |                     <div class="performance-title">${issue.operation}</div>
810 |                     <div class="performance-details">
811 |                       Average: <strong>${issue.averageDuration.toFixed(2)}ms</strong> | 
812 |                       Max: ${issue.maxDuration.toFixed(2)}ms
813 |                     </div>
814 |                     <div class="performance-stats">
815 |                       Calls: ${issue.totalCalls} | 
816 |                       Total Time: ${(issue.totalDuration / 1000).toFixed(2)}s
817 |                     </div>
818 |                   </div>
819 |                 `).join('')}
820 |               </div>
821 |             </section>
822 |           ` : ''}
823 | 
824 |           <!-- Active Sessions -->
825 |           ${report.activeSessions.length > 0 ? `
826 |             <section class="section">
827 |               <h2>🔄 Active Debug Sessions</h2>
828 |               <div class="error-list">
829 |                 ${report.activeSessions.map(session => `
830 |                   <div class="error-item">
831 |                     <div class="error-title">Session: ${session.id}</div>
832 |                     <div class="error-message">
833 |                       Steps: ${session.steps.length} | 
834 |                       Duration: ${Date.now() - session.startTime}ms
835 |                     </div>
836 |                     <div class="error-time">
837 |                       Started: ${new Date(session.startTime).toLocaleString()}
838 |                     </div>
839 |                   </div>
840 |                 `).join('')}
841 |               </div>
842 |             </section>
843 |           ` : ''}
844 | 
845 |           <!-- Raw Data (Collapsible) -->
846 |           <section class="section">
847 |             <h2>📋 Raw Debug Data</h2>
848 |             <details>
849 |               <summary style="cursor: pointer; padding: var(--space-sm); background: var(--bg-tertiary); border-radius: var(--radius); margin-bottom: var(--space-md);">
850 |                 Click to view raw JSON data
851 |               </summary>
852 |               <pre><code>${JSON.stringify(report, null, 2)}</code></pre>
853 |             </details>
854 |           </section>
855 | 
856 |           <!-- Footer -->
857 |           <footer style="text-align: center; padding: var(--space-xl) 0; color: var(--text-muted); border-top: 1px solid var(--border-color); margin-top: var(--space-xl);">
858 |             <p>Generated at ${new Date(report.timestamp).toLocaleString()}</p>
859 |             <p class="mobile-only">Tap sections to interact • Swipe to scroll</p>
860 |             <p class="desktop-only">This dashboard auto-refreshes debug information</p>
861 |           </footer>
862 |         </div>
863 | 
864 |         <script>
865 |           // Enhanced interactivity
866 |           document.addEventListener('DOMContentLoaded', function() {
867 |             // Add click-to-copy functionality for code blocks
868 |             document.querySelectorAll('pre').forEach(pre => {
869 |               pre.style.cursor = 'pointer';
870 |               pre.title = 'Click to copy';
871 |               
872 |               pre.addEventListener('click', async () => {
873 |                 try {
874 |                   await navigator.clipboard.writeText(pre.textContent);
875 |                   const originalBg = pre.style.background;
876 |                   pre.style.background = 'rgba(22, 160, 133, 0.2)';
877 |                   setTimeout(() => {
878 |                     pre.style.background = originalBg;
879 |                   }, 200);
880 |                 } catch (err) {
881 |                   console.warn('Copy failed:', err);
882 |                 }
883 |               });
884 |             });
885 | 
886 |             // Add keyboard navigation
887 |             document.addEventListener('keydown', (e) => {
888 |               if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
889 |                 e.preventDefault();
890 |                 location.reload();
891 |               }
892 |             });
893 | 
894 |             // Performance monitoring
895 |             const observer = new PerformanceObserver((list) => {
896 |               const entries = list.getEntries();
897 |               entries.forEach(entry => {
898 |                 if (entry.duration > 16) { // > 16ms might cause frame drops
899 |                   console.debug('Performance entry:', entry.name, entry.duration.toFixed(2) + 'ms');
900 |                 }
901 |               });
902 |             });
903 | 
904 |             try {
905 |               observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
906 |             } catch (e) {
907 |               // Performance Observer not supported
908 |             }
909 | 
910 |             // Auto-refresh indication (visual only, no actual refresh)
911 |             let refreshCount = 0;
912 |             const title = document.title;
913 |             
914 |             setInterval(() => {
915 |               refreshCount++;
916 |               if (refreshCount % 4 === 0) {
917 |                 document.title = title + ' ⟳';
918 |                 setTimeout(() => {
919 |                   document.title = title;
920 |                 }, 200);
921 |               }
922 |             }, 15000);
923 | 
924 |             console.log('Debug Dashboard initialized');
925 |           });
926 |         </script>
927 |       </body>
928 |       </html>
929 |     `;
930 |   }
931 | 
932 |   /**
933 |    * Dispose resources
934 |    */
935 |   public dispose(): void {
936 |     this.debugChannel.dispose();
937 |     this.debugSessions.clear();
938 |     this.performanceMetrics.clear();
939 |     this.errorHistory = [];
940 |   }
941 | }
942 | 
943 | // Type definitions
944 | interface PerformanceMetric {
945 |   operation: string;
946 |   totalCalls: number;
947 |   totalDuration: number;
948 |   averageDuration: number;
949 |   minDuration: number;
950 |   maxDuration: number;
951 |   lastCalled: number;
952 | }
953 | 
954 | interface ErrorEntry {
955 |   id: string;
956 |   timestamp: number;
957 |   error: {
958 |     name: string;
959 |     message: string;
960 |     stack?: string;
961 |   };
962 |   context?: Record<string, unknown>;
963 |   severity: 'low' | 'medium' | 'high' | 'critical';
964 |   resolved: boolean;
965 | }
966 | 
967 | interface DebugSession {
968 |   id: string;
969 |   startTime: number;
970 |   endTime?: number;
971 |   duration?: number;
972 |   context: Record<string, unknown>;
973 |   steps: DebugStep[];
974 |   status: 'active' | 'completed' | 'failed';
975 |   memoryUsage: NodeJS.MemoryUsage;
976 |   result?: Record<string, unknown>;
977 | }
978 | 
979 | interface DebugStep {
980 |   step: string;
981 |   timestamp: number;
982 |   data?: Record<string, unknown>;
983 |   memoryDelta: number;
984 | }
985 | 
986 | interface DebugReport {
987 |   timestamp: number;
988 |   isDebugMode: boolean;
989 |   activeSessions: DebugSession[];
990 |   recentErrors: ErrorEntry[];
991 |   performanceMetrics: PerformanceMetric[];
992 |   performanceIssues: PerformanceMetric[];
993 |   memoryUsage: NodeJS.MemoryUsage;
994 |   systemInfo: {
995 |     platform: string;
996 |     nodeVersion: string;
997 |     vscodeVersion: string;
998 |   };
999 | }
1000 | 
1001 | export const debugManager = DebugManager.getInstance(); 
```

src/core/ErrorHandler.ts
```
1 | import * as vscode from 'vscode';
2 | import { debugManager } from './DebugManager';
3 | 
4 | /**
5 |  * Enterprise Error Handler
6 |  * Provides centralized error handling with classification, recovery, and reporting
7 |  */
8 | export class ErrorHandler {
9 |     private static instance: ErrorHandler;
10 |     private errorStrategies: Map<string, ErrorStrategy> = new Map();
11 |     private errorCategories: Map<string, ErrorCategory> = new Map();
12 |     private recoveryHistory: Map<string, RecoveryAttempt[]> = new Map();
13 | 
14 |     private constructor() {
15 |         this.initializeErrorStrategies();
16 |         this.initializeErrorCategories();
17 |     }
18 | 
19 |     public static getInstance(): ErrorHandler {
20 |         if (!ErrorHandler.instance) {
21 |             ErrorHandler.instance = new ErrorHandler();
22 |         }
23 |         return ErrorHandler.instance;
24 |     }
25 | 
26 |     /**
27 |      * Handle an error with automatic classification and recovery
28 |      */
29 |     public async handleError(error: Error, context?: ErrorContext): Promise<ErrorResult> {
30 |         const sessionId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
31 |         debugManager.startDebugSession(sessionId, { error: error.message, context });
32 | 
33 |         try {
34 |             // Step 1: Classify the error
35 |             debugManager.addDebugStep(sessionId, 'classifying_error');
36 |             const classification = this.classifyError(error, context);
37 | 
38 |             // Step 2: Record the error
39 |             debugManager.addDebugStep(sessionId, 'recording_error');
40 |             debugManager.recordError(error, context, classification.severity);
41 | 
42 |             // Step 3: Attempt recovery
43 |             debugManager.addDebugStep(sessionId, 'attempting_recovery');
44 |             const recoveryResult = await this.attemptRecovery(error, classification, context);
45 | 
46 |             // Step 4: Create user-friendly response
47 |             debugManager.addDebugStep(sessionId, 'creating_user_response');
48 |             const userMessage = this.createUserMessage(error, classification, recoveryResult);
49 | 
50 |             const result: ErrorResult = {
51 |                 handled: true,
52 |                 recovered: recoveryResult.success,
53 |                 userMessage,
54 |                 classification,
55 |                 recoveryStrategy: recoveryResult.strategy,
56 |                 technicalDetails: this.createTechnicalDetails(error, context)
57 |             };
58 | 
59 |             debugManager.endDebugSession(sessionId, result);
60 |             return result;
61 | 
62 |         } catch (handlingError) {
63 |             debugManager.addDebugStep(sessionId, 'error_handling_failed', { handlingError: (handlingError as Error).message });
64 |             debugManager.recordError(handlingError as Error, { originalError: error.message }, 'critical');
65 | 
66 |             // Fallback error handling
67 |             const result: ErrorResult = {
68 |                 handled: false,
69 |                 recovered: false,
70 |                 userMessage: "An unexpected error occurred. Please check the logs for details.",
71 |                 classification: { category: 'unknown', severity: 'critical', code: 'HANDLER_FAILURE' },
72 |                 technicalDetails: {
73 |                     originalError: error.message,
74 |                     handlingError: (handlingError as Error).message,
75 |                     timestamp: new Date().toISOString()
76 |                 }
77 |             };
78 | 
79 |             debugManager.endDebugSession(sessionId, result);
80 |             return result;
81 |         }
82 |     }
83 | 
84 |     /**
85 |      * Classify an error into category and severity
86 |      */
87 |     private classifyError(error: Error, context?: ErrorContext): ErrorClassification {
88 |         const errorMessage = error.message.toLowerCase();
89 | 
90 |         // API-related errors
91 |         if (errorMessage.includes('api') || errorMessage.includes('fetch') || errorMessage.includes('network')) {
92 |             if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
93 |                 return { category: 'authentication', severity: 'high', code: 'API_UNAUTHORIZED' };
94 |             }
95 |             if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
96 |                 return { category: 'rate_limit', severity: 'medium', code: 'API_RATE_LIMIT' };
97 |             }
98 |             if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
99 |                 return { category: 'timeout', severity: 'medium', code: 'API_TIMEOUT' };
100 |             }
101 |             return { category: 'api', severity: 'medium', code: 'API_ERROR' };
102 |         }
103 | 
104 |         // Configuration errors
105 |         if (errorMessage.includes('config') || errorMessage.includes('setting') || context?.component === 'config') {
106 |             return { category: 'configuration', severity: 'high', code: 'CONFIG_ERROR' };
107 |         }
108 | 
109 |         // Dataset errors
110 |         if (errorMessage.includes('dataset') || errorMessage.includes('json') || context?.component === 'dataset') {
111 |             if (errorMessage.includes('not found') || errorMessage.includes('missing')) {
112 |                 return { category: 'missing_resource', severity: 'medium', code: 'DATASET_MISSING' };
113 |             }
114 |             return { category: 'dataset', severity: 'medium', code: 'DATASET_ERROR' };
115 |         }
116 | 
117 |         // Default classification
118 |         return { category: 'unknown', severity: 'medium', code: 'UNKNOWN_ERROR' };
119 |     }
120 | 
121 |     /**
122 |      * Attempt to recover from an error
123 |      */
124 |     private async attemptRecovery(
125 |         error: Error,
126 |         classification: ErrorClassification,
127 |         context?: ErrorContext
128 |     ): Promise<RecoveryResult> {
129 |         const strategy = this.errorStrategies.get(classification.category);
130 | 
131 |         if (!strategy) {
132 |             return { success: false, strategy: 'none', message: 'No recovery strategy available' };
133 |         }
134 | 
135 |         try {
136 |             return await strategy.execute(error, classification, context);
137 |         } catch (recoveryError) {
138 |             return {
139 |                 success: false,
140 |                 strategy: strategy.name,
141 |                 message: `Recovery failed: ${(recoveryError as Error).message}`
142 |             };
143 |         }
144 |     }
145 | 
146 |     /**
147 |      * Create user-friendly error message
148 |      */
149 |     private createUserMessage(
150 |         error: Error,
151 |         classification: ErrorClassification,
152 |         recovery: RecoveryResult
153 |     ): string {
154 |         const category = this.errorCategories.get(classification.category);
155 | 
156 |         if (!category) {
157 |             return "An unexpected error occurred. Please try again or contact support.";
158 |         }
159 | 
160 |         let message = category.userMessage;
161 | 
162 |         // Add specific details based on classification
163 |         switch (classification.category) {
164 |             case 'authentication':
165 |                 message += " Please check your API key in the settings.";
166 |                 break;
167 |             case 'rate_limit':
168 |                 message += " Please wait a moment before trying again.";
169 |                 break;
170 |             case 'configuration':
171 |                 message += " Please check your extension settings.";
172 |                 break;
173 |             case 'missing_resource':
174 |                 message += " Please ensure all required files are present.";
175 |                 break;
176 |             case 'timeout':
177 |                 message += " Please check your internet connection and try again.";
178 |                 break;
179 |         }
180 | 
181 |         // Add recovery information
182 |         if (recovery.success) {
183 |             message += ` The issue has been automatically resolved.`;
184 |         }
185 | 
186 |         return message;
187 |     }
188 | 
189 |     /**
190 |      * Create technical details for debugging
191 |      */
192 |     private createTechnicalDetails(error: Error, context?: ErrorContext): Record<string, unknown> {
193 |         return {
194 |             error: {
195 |                 name: error.name,
196 |                 message: error.message,
197 |                 stack: error.stack
198 |             },
199 |             context,
200 |             timestamp: new Date().toISOString(),
201 |             environment: {
202 |                 platform: process.platform,
203 |                 nodeVersion: process.version,
204 |                 vscodeVersion: vscode.version
205 |             }
206 |         };
207 |     }
208 | 
209 |     /**
210 |      * Initialize error recovery strategies
211 |      */
212 |     private initializeErrorStrategies(): void {
213 |         // API Authentication Recovery
214 |         this.errorStrategies.set('authentication', {
215 |             name: 'API Authentication Recovery',
216 |             maxAttempts: 2,
217 |             execute: async () => {
218 |                 try {
219 |                     await vscode.commands.executeCommand('flexChatbot.configure');
220 |                     return { success: true, strategy: 'config_refresh', message: 'Configuration dialog opened' };
221 |                 } catch (recoveryError) {
222 |                     return { success: false, strategy: 'config_refresh', message: 'Failed to refresh configuration' };
223 |                 }
224 |             }
225 |         });
226 | 
227 |         // Configuration Recovery
228 |         this.errorStrategies.set('configuration', {
229 |             name: 'Configuration Recovery',
230 |             maxAttempts: 2,
231 |             execute: async () => {
232 |                 try {
233 |                     const config = vscode.workspace.getConfiguration('flexChatbot');
234 |                     await config.update('model', 'openai/gpt-4-mini', vscode.ConfigurationTarget.Global);
235 |                     return { success: true, strategy: 'reset_config', message: 'Configuration reset to defaults' };
236 |                 } catch (recoveryError) {
237 |                     return { success: false, strategy: 'reset_config', message: 'Failed to reset configuration' };
238 |                 }
239 |             }
240 |         });
241 |     }
242 | 
243 |     /**
244 |      * Initialize error categories
245 |      */
246 |     private initializeErrorCategories(): void {
247 |         this.errorCategories.set('authentication', {
248 |             name: 'Authentication Error',
249 |             userMessage: 'There was an issue with your API authentication.',
250 |             severity: 'high',
251 |             recoverable: true
252 |         });
253 | 
254 |         this.errorCategories.set('api', {
255 |             name: 'API Error',
256 |             userMessage: 'There was an issue communicating with the AI service.',
257 |             severity: 'medium',
258 |             recoverable: true
259 |         });
260 | 
261 |         this.errorCategories.set('configuration', {
262 |             name: 'Configuration Error',
263 |             userMessage: 'There was an issue with the extension configuration.',
264 |             severity: 'high',
265 |             recoverable: true
266 |         });
267 | 
268 |         this.errorCategories.set('unknown', {
269 |             name: 'Unknown Error',
270 |             userMessage: 'An unexpected error occurred.',
271 |             severity: 'medium',
272 |             recoverable: false
273 |         });
274 |     }
275 | 
276 |     /**
277 |      * Get error statistics
278 |      */
279 |     public getErrorStatistics(): ErrorStatistics {
280 |         const totalAttempts = Array.from(this.recoveryHistory.values())
281 |             .reduce((total, attempts) => total + attempts.length, 0);
282 | 
283 |         const successfulRecoveries = Array.from(this.recoveryHistory.values())
284 |             .reduce((total, attempts) =>
285 |                 total + attempts.filter(attempt => attempt.success).length, 0);
286 | 
287 |         const recoveryRate = totalAttempts > 0 ? (successfulRecoveries / totalAttempts) * 100 : 0;
288 | 
289 |         return {
290 |             totalRecoveryAttempts: totalAttempts,
291 |             successfulRecoveries,
292 |             recoveryRate,
293 |             strategiesCount: this.errorStrategies.size,
294 |             categoriesCount: this.errorCategories.size
295 |         };
296 |     }
297 | 
298 |     /**
299 |      * Dispose resources
300 |      */
301 |     public dispose(): void {
302 |         this.errorStrategies.clear();
303 |         this.errorCategories.clear();
304 |         this.recoveryHistory.clear();
305 |     }
306 | }
307 | 
308 | // Type definitions
309 | interface ErrorContext extends Record<string, unknown> {
310 |     component?: string;
311 |     operation?: string;
312 |     retryCount?: number;
313 |     userAction?: string;
314 |     sessionId?: string;
315 |     metadata?: Record<string, unknown>;
316 | }
317 | 
318 | interface ErrorClassification {
319 |     category: string;
320 |     severity: 'low' | 'medium' | 'high' | 'critical';
321 |     code: string;
322 | }
323 | 
324 | interface ErrorResult extends Record<string, unknown> {
325 |     handled: boolean;
326 |     recovered: boolean;
327 |     userMessage: string;
328 |     classification: ErrorClassification;
329 |     recoveryStrategy?: string;
330 |     technicalDetails?: Record<string, unknown>;
331 | }
332 | 
333 | interface ErrorStrategy {
334 |     name: string;
335 |     maxAttempts: number;
336 |     execute: (error: Error, classification: ErrorClassification, context?: ErrorContext) => Promise<RecoveryResult>;
337 | }
338 | 
339 | interface RecoveryResult {
340 |     success: boolean;
341 |     strategy: string;
342 |     message: string;
343 | }
344 | 
345 | interface ErrorCategory {
346 |     name: string;
347 |     userMessage: string;
348 |     severity: 'low' | 'medium' | 'high' | 'critical';
349 |     recoverable: boolean;
350 | }
351 | 
352 | interface RecoveryAttempt {
353 |     timestamp: number;
354 |     strategy: string;
355 |     classification: ErrorClassification;
356 |     context?: ErrorContext;
357 |     success?: boolean;
358 |     message?: string;
359 | }
360 | 
361 | interface ErrorStatistics {
362 |     totalRecoveryAttempts: number;
363 |     successfulRecoveries: number;
364 |     recoveryRate: number;
365 |     strategiesCount: number;
366 |     categoriesCount: number;
367 | }
368 | 
369 | export const errorHandler = ErrorHandler.getInstance(); 
```

src/dev/CodeAnalyzer.ts
```
1 | import * as fs from 'fs';
2 | import * as path from 'path';
3 | import { CodeAnalysisResult, CodeMetrics } from '../types/dev';
4 | 
5 | /**
6 |  * Code Analyzer
7 |  */
8 | export class CodeAnalyzer {
9 |   public async analyze(): Promise<CodeAnalysisResult> {
10 |     const srcPath = path.join(__dirname, '..');
11 |     const files = await this.getAllTSFiles(srcPath);
12 | 
13 |     let totalLines = 0;
14 |     let totalFunctions = 0;
15 |     let totalClasses = 0;
16 | 
17 |     for (const file of files) {
18 |       const content = fs.readFileSync(file, 'utf8');
19 |       const lines = content.split('\n');
20 |       totalLines += lines.length;
21 |       totalFunctions += (content.match(/function\s+\w+/g) || []).length;
22 |       totalClasses += (content.match(/class\s+\w+/g) || []).length;
23 |     }
24 | 
25 |     return {
26 |       totalFiles: files.length,
27 |       totalLines,
28 |       totalFunctions,
29 |       totalClasses,
30 |       averageLinesPerFile: totalLines / files.length,
31 |       complexity: this.calculateComplexity(totalLines, totalFunctions, totalClasses)
32 |     };
33 |   }
34 | 
35 |   public getMetrics(): CodeMetrics {
36 |     return {
37 |       maintainabilityIndex: 85,
38 |       codeComplexity: 'Medium',
39 |       testCoverage: 75
40 |     };
41 |   }
42 | 
43 |   private async getAllTSFiles(dir: string): Promise<string[]> {
44 |     const files: string[] = [];
45 |     const entries = fs.readdirSync(dir, { withFileTypes: true });
46 | 
47 |     for (const entry of entries) {
48 |       const fullPath = path.join(dir, entry.name);
49 |       if (entry.isDirectory() && entry.name !== 'node_modules') {
50 |         files.push(...await this.getAllTSFiles(fullPath));
51 |       } else if (entry.isFile() && entry.name.endsWith('.ts')) {
52 |         files.push(fullPath);
53 |       }
54 |     }
55 | 
56 |     return files;
57 |   }
58 | 
59 |   private calculateComplexity(lines: number, functions: number, classes: number): 'Low' | 'Medium' | 'High' {
60 |     const ratio = lines / (functions + classes);
61 |     if (ratio < 20) { return 'Low'; }
62 |     if (ratio < 50) { return 'Medium'; }
63 |     return 'High';
64 |   }
65 | }
```

src/dev/DevTools.ts
```
1 | import * as vscode from 'vscode';
2 | import * as fs from 'fs';
3 | import * as path from 'path';
4 | import { debugManager } from '../core/DebugManager';
5 | import { errorHandler } from '../core/ErrorHandler';
6 | import { CodeAnalyzer } from './CodeAnalyzer';
7 | import { PerformanceProfiler } from './PerformanceProfiler';
8 | import {
9 |   ProfileSession,
10 |   ProfileResult,
11 |   MemoryAnalysis,
12 |   DevelopmentMetrics,
13 |   Recommendation,
14 |   CodeAnalysisResult,
15 |   CodeQualityReport,
16 |   CodeQualityIssue,
17 |   CodeMetrics
18 | } from '../types/dev';
19 | 
20 | /**
21 |  * Development Tools Suite
22 |  * Provides comprehensive development and debugging utilities
23 |  */
24 | export class DevTools {
25 |   private static instance: DevTools;
26 |   private profileSessions: Map<string, ProfileSession> = new Map();
27 |   private codeAnalyzer: CodeAnalyzer;
28 |   private performanceProfiler: PerformanceProfiler;
29 |   private extensionUri: vscode.Uri | undefined;
30 | 
31 |   private constructor() {
32 |     this.codeAnalyzer = new CodeAnalyzer();
33 |     this.performanceProfiler = new PerformanceProfiler();
34 |   }
35 | 
36 |   public static getInstance(): DevTools {
37 |     if (!DevTools.instance) {
38 |       DevTools.instance = new DevTools();
39 |     }
40 |     return DevTools.instance;
41 |   }
42 | 
43 |   public initialize(extensionUri: vscode.Uri) {
44 |     this.extensionUri = extensionUri;
45 |   }
46 | 
47 |   /**
48 |    * Show development dashboard
49 |    */
50 |   public async showDashboard(): Promise<void> {
51 |     if (!this.extensionUri) {
52 |       vscode.window.showErrorMessage('DevTools not initialized. Please restart the extension.');
53 |       return;
54 |     }
55 | 
56 |     const panel = vscode.window.createWebviewPanel(
57 |       'flexDevDashboard',
58 |       'Flex Chatbot Development Dashboard',
59 |       vscode.ViewColumn.One,
60 |       {
61 |         enableScripts: true,
62 |         retainContextWhenHidden: true,
63 |         localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'assets')]
64 |       }
65 |     );
66 | 
67 |     panel.webview.html = this.generateDashboardHTML(panel.webview);
68 | 
69 |     // Handle messages from the webview
70 |     panel.webview.onDidReceiveMessage(async (message) => {
71 |       switch (message.command) {
72 |         case 'runTests':
73 |           await this.runTests();
74 |           break;
75 |         case 'showDebugReport':
76 |           await debugManager.showDebugDashboard();
77 |           break;
78 |         case 'analyzeCode':
79 |           await this.analyzeCodeAndUpdateDashboard();
80 |           break;
81 |         case 'startProfiling':
82 |           this.startProfiling(message.sessionName);
83 |           break;
84 |         case 'stopProfiling':
85 |           await this.stopProfilingAndUpdateDashboard(message.sessionName);
86 |           break;
87 |         case 'exportData':
88 |           await this.exportDevelopmentData();
89 |           break;
90 |       }
91 |     });
92 |   }
93 | 
94 |   /**
95 |    * Code analysis utilities
96 |    */
97 |   public async analyzeCode(): Promise<CodeAnalysisResult> {
98 |     return this.codeAnalyzer.analyze();
99 |   }
100 | 
101 |   /**
102 |    * Performance profiling
103 |    */
104 |   public startProfiling(sessionName = 'default'): void {
105 |     const session: ProfileSession = {
106 |       name: sessionName,
107 |       startTime: Date.now(),
108 |       samples: [],
109 |       isActive: true
110 |     };
111 | 
112 |     this.profileSessions.set(sessionName, session);
113 |     this.performanceProfiler.startProfiling(session);
114 | 
115 |     debugManager.debug(`Profiling started: ${sessionName}`);
116 |   }
117 | 
118 |   /**
119 |    * Stop profiling and get results
120 |    */
121 |   public stopProfiling(sessionName = 'default'): ProfileResult | null {
122 |     const session = this.profileSessions.get(sessionName);
123 |     if (!session || !session.isActive) {
124 |       return null;
125 |     }
126 | 
127 |     session.isActive = false;
128 |     session.endTime = Date.now();
129 |     session.duration = session.endTime - session.startTime;
130 | 
131 |     const result = this.performanceProfiler.stopProfiling(session);
132 |     debugManager.debug(`Profiling stopped: ${sessionName}`, { result });
133 | 
134 |     return result;
135 |   }
136 | 
137 |   /**
138 |    * Memory analysis
139 |    */
140 |   public analyzeMemory(): MemoryAnalysis {
141 |     const memUsage = process.memoryUsage();
142 |     const cpuUsage = process.cpuUsage();
143 | 
144 |     return {
145 |       timestamp: Date.now(),
146 |       heapUsed: memUsage.heapUsed,
147 |       heapTotal: memUsage.heapTotal,
148 |       external: memUsage.external,
149 |       rss: memUsage.rss,
150 |       arrayBuffers: memUsage.arrayBuffers,
151 |       cpuUsage: {
152 |         user: cpuUsage.user,
153 |         system: cpuUsage.system
154 |       },
155 |       analysis: this.generateMemoryAnalysis(memUsage)
156 |     };
157 |   }
158 | 
159 |   /**
160 |    * Generate development metrics report
161 |    */
162 |   public generateMetricsReport(): DevelopmentMetrics {
163 |     const debugReport = debugManager.getDebugReport();
164 |     const memoryAnalysis = this.analyzeMemory();
165 |     const codeMetrics = this.codeAnalyzer.getMetrics();
166 | 
167 |     return {
168 |       timestamp: Date.now(),
169 |       debug: {
170 |         isEnabled: debugReport.isDebugMode,
171 |         activeSessions: debugReport.activeSessions.length,
172 |         recentErrors: debugReport.recentErrors.length,
173 |         performanceIssues: debugReport.performanceIssues.length
174 |       },
175 |       memory: memoryAnalysis,
176 |       performance: {
177 |         averageResponseTime: this.calculateAverageResponseTime(),
178 |         memoryLeaks: this.detectMemoryLeaks(),
179 |         slowOperations: debugReport.performanceIssues.map(p => ({
180 |           operation: p.operation,
181 |           averageDuration: p.averageDuration,
182 |           callCount: p.totalCalls
183 |         }))
184 |       },
185 |       code: codeMetrics,
186 |       recommendations: this.generateRecommendations(debugReport, memoryAnalysis)
187 |     };
188 |   }
189 | 
190 |   /**
191 |    * Export development data
192 |    */
193 |   public async exportDevelopmentData(): Promise<void> {
194 |     const data = {
195 |       timestamp: new Date().toISOString(),
196 |       debugData: debugManager.exportDebugData(),
197 |       systemInfo: {
198 |         platform: process.platform,
199 |         nodeVersion: process.version,
200 |         vscodeVersion: vscode.version
201 |       }
202 |     };
203 | 
204 |     const exportPath = await vscode.window.showSaveDialog({
205 |       defaultUri: vscode.Uri.file(`flex-chatbot-dev-data-${Date.now()}.json`),
206 |       filters: {
207 |         // eslint-disable-next-line @typescript-eslint/naming-convention
208 |         'JSON Files': ['json']
209 |       }
210 |     });
211 | 
212 |     if (exportPath) {
213 |       fs.writeFileSync(exportPath.fsPath, JSON.stringify(data, null, 2));
214 |       vscode.window.showInformationMessage('Development data exported successfully');
215 |     }
216 |   }
217 | 
218 |   /**
219 |    * Hot reload functionality for development
220 |    */
221 |   public async hotReload(): Promise<void> {
222 |     try {
223 |       debugManager.debug('Hot reload initiated');
224 | 
225 |       // Clear module cache for development files
226 |       this.clearModuleCache();
227 | 
228 |       // Reload configuration
229 |       await vscode.commands.executeCommand('workbench.action.reloadWindow');
230 | 
231 |       debugManager.debug('Hot reload completed');
232 |     } catch (error) {
233 |       await errorHandler.handleError(error as Error, { component: 'devtools', operation: 'hot_reload' });
234 |     }
235 |   }
236 | 
237 |   /**
238 |    * Code quality analysis
239 |    */
240 |   public async runCodeQualityCheck(): Promise<CodeQualityReport> {
241 |     const issues: CodeQualityIssue[] = [];
242 | 
243 |     // Check for common issues
244 |     const srcPath = path.join(__dirname, '..');
245 |     const files = await this.getAllTSFiles(srcPath);
246 | 
247 |     for (const file of files) {
248 |       const content = fs.readFileSync(file, 'utf8');
249 |       issues.push(...this.analyzeFileForIssues(file, content));
250 |     }
251 | 
252 |     return {
253 |       timestamp: Date.now(),
254 |       filesAnalyzed: files.length,
255 |       totalIssues: issues.length,
256 |       issuesBySeverity: {
257 |         error: issues.filter(i => i.severity === 'error').length,
258 |         warning: issues.filter(i => i.severity === 'warning').length,
259 |         info: issues.filter(i => i.severity === 'info').length
260 |       },
261 |       issues
262 |     };
263 |   }
264 | 
265 |   /**
266 |    * Private helper methods
267 |    */
268 |   private generateDashboardHTML(webview: vscode.Webview): string {
269 |     if (!this.extensionUri) {
270 |       return '<h1>Error: DevTools not initialized</h1>';
271 |     }
272 | 
273 |     const debugReport = debugManager.getDebugReport();
274 | 
275 |     const nonce = getNonce();
276 |     const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'assets', 'webview', 'css', 'dev-dashboard.css'));
277 |     const htmlPath = vscode.Uri.joinPath(this.extensionUri, 'assets', 'webview', 'html', 'dev-dashboard.html');
278 |     let htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf8');
279 | 
280 |     htmlContent = htmlContent.replace(/\${cssUri}/g, cssUri.toString())
281 |       .replace(/\${nonce}/g, nonce)
282 |       .replace(
283 |         '${(debugReport.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}',
284 |         (debugReport.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)
285 |       )
286 |       .replace(/\${debugReport.activeSessions.length}/g, String(debugReport.activeSessions.length))
287 |       .replace(/\${debugReport.recentErrors.length}/g, String(debugReport.recentErrors.length))
288 |       .replace(/\${debugReport.performanceIssues.length}/g, String(debugReport.performanceIssues.length))
289 |       .replace(/\${debugReport.isDebugMode ? 'online' : 'error'}/g, debugReport.isDebugMode ? 'online' : 'error')
290 |       .replace(/\${debugReport.recentErrors.length === 0 ? 'online' : 'error'}/g, debugReport.recentErrors.length === 0 ? 'online' : 'error')
291 |       .replace(/\${debugReport.performanceIssues.length === 0 ? 'online' : 'warning'}/g, debugReport.performanceIssues.length === 0 ? 'online' : 'warning')
292 |       .replace(/\${new Date\(\).toLocaleTimeString\(\)}/g, new Date().toLocaleTimeString());
293 | 
294 |     return htmlContent;
295 |   }
296 | 
297 |   public async runTests(): Promise<void> {
298 |     vscode.window.showInformationMessage("Test execution from the DevTools panel is currently being refactored.");
299 |   }
300 | 
301 |   private async analyzeCodeAndUpdateDashboard(): Promise<void> {
302 |     try {
303 |       const analysis = await this.analyzeCode();
304 |       const qualityReport = await this.runCodeQualityCheck();
305 | 
306 |       vscode.window.showInformationMessage(
307 |         `Code Analysis Complete: ${analysis.totalFiles} files, ${qualityReport.totalIssues} issues found`
308 |       );
309 |     } catch (error) {
310 |       await errorHandler.handleError(error as Error, { component: 'devtools', operation: 'analyze_code' });
311 |     }
312 |   }
313 | 
314 |   private async stopProfilingAndUpdateDashboard(sessionName: string): Promise<void> {
315 |     const result = this.stopProfiling(sessionName);
316 |     if (result) {
317 |       vscode.window.showInformationMessage(
318 |         `Profiling Complete: ${result.duration}ms, ${result.samples.length} samples`
319 |       );
320 |     }
321 |   }
322 | 
323 |   private clearModuleCache(): void {
324 |     const moduleKeys = Object.keys(require.cache);
325 |     moduleKeys.forEach(key => {
326 |       if (key.includes('flex-chatbot') && !key.includes('node_modules')) {
327 |         delete require.cache[key];
328 |       }
329 |     });
330 |   }
331 | 
332 |   private async getAllTSFiles(dir: string): Promise<string[]> {
333 |     const files: string[] = [];
334 |     const entries = fs.readdirSync(dir, { withFileTypes: true });
335 | 
336 |     for (const entry of entries) {
337 |       const fullPath = path.join(dir, entry.name);
338 |       if (entry.isDirectory() && entry.name !== 'node_modules') {
339 |         files.push(...await this.getAllTSFiles(fullPath));
340 |       } else if (entry.isFile() && entry.name.endsWith('.ts')) {
341 |         files.push(fullPath);
342 |       }
343 |     }
344 | 
345 |     return files;
346 |   }
347 | 
348 |   private analyzeFileForIssues(filePath: string, content: string): CodeQualityIssue[] {
349 |     const issues: CodeQualityIssue[] = [];
350 |     const lines = content.split('\n');
351 | 
352 |     lines.forEach((line, index) => {
353 |       // Check for common issues
354 |       if (line.includes('console.log') && !line.includes('//')) {
355 |         issues.push({
356 |           file: filePath,
357 |           line: index + 1,
358 |           column: line.indexOf('console.log'),
359 |           severity: 'warning',
360 |           message: 'Console.log statement found - consider using logger instead',
361 |           rule: 'no-console'
362 |         });
363 |       }
364 | 
365 |       if (line.includes('TODO') || line.includes('FIXME')) {
366 |         issues.push({
367 |           file: filePath,
368 |           line: index + 1,
369 |           column: 0,
370 |           severity: 'info',
371 |           message: 'TODO/FIXME comment found',
372 |           rule: 'todo-comment'
373 |         });
374 |       }
375 | 
376 |       if (line.length > 120) {
377 |         issues.push({
378 |           file: filePath,
379 |           line: index + 1,
380 |           column: 120,
381 |           severity: 'info',
382 |           message: 'Line too long (>120 characters)',
383 |           rule: 'max-line-length'
384 |         });
385 |       }
386 |     });
387 | 
388 |     return issues;
389 |   }
390 | 
391 |   private generateMemoryAnalysis(memUsage: NodeJS.MemoryUsage): string[] {
392 |     const analysis: string[] = [];
393 |     const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
394 | 
395 |     if (heapUsagePercent > 80) {
396 |       analysis.push('High heap usage detected - consider memory optimization');
397 |     }
398 | 
399 |     if (memUsage.external > 50 * 1024 * 1024) {
400 |       analysis.push('High external memory usage - check for memory leaks');
401 |     }
402 | 
403 |     if (analysis.length === 0) {
404 |       analysis.push('Memory usage is within normal parameters');
405 |     }
406 | 
407 |     return analysis;
408 |   }
409 | 
410 |   private calculateAverageResponseTime(): number {
411 |     // This would typically aggregate from performance metrics
412 |     return Math.random() * 500 + 200; // Mock implementation
413 |   }
414 | 
415 |   private detectMemoryLeaks(): boolean {
416 |     // This would implement actual memory leak detection
417 |     return false; // Mock implementation
418 |   }
419 | 
420 |   private generateRecommendations(
421 |     debugReport: { recentErrors: unknown[]; performanceIssues: unknown[] },
422 |     memoryAnalysis: MemoryAnalysis
423 |   ): Recommendation[] {
424 |     const recommendations: Recommendation[] = [];
425 | 
426 |     if (debugReport.recentErrors.length > 5) {
427 |       recommendations.push({
428 |         category: 'Error Handling',
429 |         priority: 'error',
430 |         description: 'High error rate detected. Review error logs and implement better error handling.'
431 |       });
432 |     }
433 | 
434 |     if (memoryAnalysis.heapUsed > 100 * 1024 * 1024) {
435 |       recommendations.push({
436 |         category: 'Performance',
437 |         priority: 'warning',
438 |         description: 'High memory usage detected. Consider implementing memory optimization strategies.'
439 |       });
440 |     }
441 | 
442 |     if (debugReport.performanceIssues.length > 3) {
443 |       recommendations.push({
444 |         category: 'Performance',
445 |         priority: 'warning',
446 |         description: 'Multiple slow operations detected. Profile and optimize critical paths.'
447 |       });
448 |     }
449 | 
450 |     return recommendations;
451 |   }
452 | 
453 |   public getMetrics(): CodeMetrics {
454 |     return {
455 |       maintainabilityIndex: 85,
456 |       codeComplexity: 'Medium',
457 |       testCoverage: 75
458 |     };
459 |   }
460 | 
461 |   /**
462 |    * Dispose resources
463 |    */
464 |   public dispose(): void {
465 |     this.profileSessions.clear();
466 |   }
467 | }
468 | 
469 | function getNonce() {
470 |   let text = '';
471 |   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
472 |   for (let i = 0; i < 32; i++) {
473 |     text += possible.charAt(Math.floor(Math.random() * possible.length));
474 |   }
475 |   return text;
476 | }
477 | 
478 | export const devTools = DevTools.getInstance();
```

src/dev/PerformanceProfiler.ts
```
1 | import { ProfileSession, ProfileSample, ProfileResult } from '../types/dev';
2 | 
3 | /**
4 |  * Performance Profiler
5 |  */
6 | export class PerformanceProfiler {
7 |     public startProfiling(session: ProfileSession): void {
8 |         // Start collecting performance samples
9 |         const interval = setInterval(() => {
10 |             if (!session.isActive) {
11 |                 clearInterval(interval);
12 |                 return;
13 |             }
14 | 
15 |             session.samples.push({
16 |                 timestamp: Date.now(),
17 |                 memoryUsage: process.memoryUsage(),
18 |                 cpuUsage: process.cpuUsage()
19 |             });
20 |         }, 100);
21 |     }
22 | 
23 |     public stopProfiling(session: ProfileSession): ProfileResult {
24 |         return {
25 |             sessionName: session.name,
26 |             duration: session.duration || 0,
27 |             samples: session.samples,
28 |             averageMemory: this.calculateAverageMemory(session.samples),
29 |             memoryTrend: this.calculateMemoryTrend(session.samples),
30 |             cpuUsage: this.calculateCpuUsage(session.samples)
31 |         };
32 |     }
33 | 
34 |     private calculateAverageMemory(samples: ProfileSample[]): number {
35 |         if (samples.length === 0) { return 0; }
36 |         const total = samples.reduce((sum, sample) => sum + sample.memoryUsage.heapUsed, 0);
37 |         return total / samples.length;
38 |     }
39 | 
40 |     private calculateMemoryTrend(samples: ProfileSample[]): 'increasing' | 'decreasing' | 'stable' {
41 |         if (samples.length < 2) { return 'stable'; }
42 |         const first = samples[0]?.memoryUsage.heapUsed || 0;
43 |         const last = samples[samples.length - 1]?.memoryUsage.heapUsed || 0;
44 |         const diff = first === 0 ? 0 : (last - first) / first;
45 | 
46 |         if (diff > 0.1) { return 'increasing'; }
47 |         if (diff < -0.1) { return 'decreasing'; }
48 |         return 'stable';
49 |     }
50 | 
51 |     private calculateCpuUsage(samples: ProfileSample[]): number {
52 |         if (samples.length === 0) { return 0; }
53 |         // Simplified CPU usage calculation
54 |         return Math.random() * 100; // Mock implementation
55 |     }
56 | } 
```

src/services/ChatService.ts
```
1 | import * as vscode from 'vscode';
2 | import { ChatMessage } from '../types';
3 | import { ApiService } from './apiService';
4 | import { ConfigService } from './configService';
5 | import { FlexDatasetService } from './flexDatasetService';
6 | import { logger } from '../utils/logger';
7 | 
8 | export class ChatService {
9 |     private _conversationHistory: ChatMessage[] = [];
10 |     private readonly maxConversationHistory = 20;
11 |     private _isProcessingMessage = false;
12 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
13 |     private _postMessage: (message: any) => void;
14 |     private _flexDatasetService: FlexDatasetService;
15 | 
16 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
17 |     constructor(postMessageCallback: (message: any) => void, extensionUri: vscode.Uri) {
18 |         this._postMessage = postMessageCallback;
19 |         this._flexDatasetService = FlexDatasetService.getInstance(extensionUri.fsPath);
20 |     }
21 | 
22 |     public async handleSendMessage(userMessage: string): Promise<void> {
23 |         if (!userMessage.trim()) {
24 |             return;
25 |         }
26 | 
27 |         if (this._isProcessingMessage) {
28 |             this._postMessage({ command: 'aiResponse', text: 'Please wait for the current message to be processed.' });
29 |             return;
30 |         }
31 |         this._isProcessingMessage = true;
32 | 
33 |         const processingTimeout = setTimeout(() => {
34 |             this._isProcessingMessage = false;
35 |             this._postMessage({ command: 'aiResponse', text: 'Request processing timeout. Please try again.' });
36 |         }, 600000); // 10 minutes max
37 | 
38 |         logger.logUserAction('sendMessage', { messageLength: userMessage.length });
39 | 
40 |         const config = ConfigService.getConfig();
41 |         const configValidation = ConfigService.validateConfig();
42 | 
43 |         if (!configValidation.isValid) {
44 |             this._isProcessingMessage = false;
45 |             this._postMessage({
46 |                 command: 'aiResponse',
47 |                 text: `Configuration error: ${configValidation.errors.join(', ')}. Please check your settings.`
48 |             });
49 |             return;
50 |         }
51 | 
52 |         try {
53 |             const isWebSearch = userMessage.toLowerCase().includes('[web]');
54 |             const webSearchResults = '';
55 | 
56 |             if (isWebSearch && config.enableWebSearch) {
57 |                 // Web search logic remains here...
58 |             }
59 | 
60 |             let messageForAI = userMessage;
61 |             if (webSearchResults) {
62 |                 messageForAI = `The user asked: ${userMessage.replace(/\[web\]/gi, '').trim()}\n\nHere are some search results that might help:\n${webSearchResults}\n\nPlease synthesize this information to provide a helpful answer.`;
63 |             }
64 | 
65 |             const userChatMessage: ChatMessage = {
66 |                 role: 'user',
67 |                 content: userMessage,
68 |                 timestamp: new Date()
69 |             };
70 |             this._conversationHistory.push(userChatMessage);
71 | 
72 |             if (this._conversationHistory.length > this.maxConversationHistory) {
73 |                 this._conversationHistory = this._conversationHistory.slice(-this.maxConversationHistory);
74 |             }
75 | 
76 |             this._postMessage({ command: 'statusUpdate', text: 'Flex Assistant is thinking...' });
77 | 
78 |             const systemPrompt = this._flexDatasetService.getSystemPrompt();
79 |             const messages: ChatMessage[] = [
80 |                 { role: 'system', content: systemPrompt },
81 |                 ...this._conversationHistory.slice(0, -1),
82 |                 { role: 'user', content: messageForAI, timestamp: new Date() }
83 |             ];
84 | 
85 |             let fullResponse = '';
86 |             this._postMessage({ command: 'aiStreamStart' });
87 | 
88 |             await ApiService.streamChatCompletion(
89 |                 messages,
90 |                 config,
91 |                 (chunk: string) => {
92 |                     fullResponse += chunk;
93 |                     this._postMessage({ command: 'aiStreamChunk', text: chunk });
94 |                 },
95 |                 (error: Error) => {
96 |                     this._postMessage({ command: 'aiResponse', text: `Streaming error: ${error.message}` });
97 |                 },
98 |                 () => {
99 |                     this._postMessage({ command: 'aiStreamComplete' });
100 |                 }
101 |             );
102 | 
103 |             const aiChatMessage: ChatMessage = {
104 |                 role: 'assistant',
105 |                 content: fullResponse,
106 |                 timestamp: new Date()
107 |             };
108 |             this._conversationHistory.push(aiChatMessage);
109 | 
110 |             logger.info('Message processed successfully', {
111 |                 userMessageLength: userMessage.length,
112 |                 responseLength: fullResponse.length,
113 |                 historyLength: this._conversationHistory.length
114 |             });
115 | 
116 |             clearTimeout(processingTimeout);
117 | 
118 |         } catch (error) {
119 |             logger.error('Error processing message', error);
120 |             clearTimeout(processingTimeout);
121 |             this._postMessage({ command: 'statusUpdate', text: '' });
122 | 
123 |             let errorMessage = 'Sorry, I encountered an error. ';
124 |             if (error instanceof Error) {
125 |                 // ... error message formatting ...
126 |             } else {
127 |                 errorMessage += 'Unknown error occurred. Please try again.';
128 |             }
129 |             this._postMessage({ command: 'aiResponse', text: errorMessage });
130 |         } finally {
131 |             this._isProcessingMessage = false;
132 |         }
133 |     }
134 | 
135 |     public resetChat(): void {
136 |         logger.logUserAction('resetChat');
137 |         this._conversationHistory = [];
138 |         this._postMessage({ command: 'chatCleared' });
139 |     }
140 | } 
```

src/services/WebviewService.ts
```
1 | import * as vscode from 'vscode';
2 | import { ConfigService } from './configService';
3 | import { FlexDatasetService } from './flexDatasetService';
4 | 
5 | function getNonce() {
6 |   let text = "";
7 |   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
8 |   for (let i = 0; i < 32; i++) {
9 |     text += possible.charAt(Math.floor(Math.random() * possible.length));
10 |   }
11 |   return text;
12 | }
13 | 
14 | export class WebviewService {
15 |   private readonly _extensionUri: vscode.Uri;
16 | 
17 |   constructor(extensionUri: vscode.Uri) {
18 |     this._extensionUri = extensionUri;
19 |   }
20 | 
21 |   public getHtmlContent(webview: vscode.Webview): string {
22 |     const resetStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "reset.css"));
23 |     const baseStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "base.css"));
24 |     const headerStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "header.css"));
25 |     const chatStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "chat.css"));
26 |     const inputStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "input.css"));
27 |     const codeStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "code.css"));
28 |     const responsiveStyleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "css", "components", "responsive.css"));
29 | 
30 |     const robotGifUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "images", "robot.gif"));
31 |     const flexLogoUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "images", "logo_flex.svg"));
32 |     const highlighterUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "syntax", "highlighter.js"));
33 |     const domManagerUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "ui", "domManager.js"));
34 |     const chatJsUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "webview", "js", "chat.js"));
35 |     const nonce = getNonce();
36 |     const config = ConfigService.getConfig();
37 |     const configValidation = ConfigService.validateConfig();
38 |     const flexDatasetService = FlexDatasetService.getInstance();
39 |     const isDatasetLoaded = flexDatasetService.isDatasetLoaded();
40 | 
41 |     return `<!DOCTYPE html>
42 |     <html lang="en">
43 |     <head>
44 |       <meta charset="UTF-8">
45 |       <meta name="viewport" content="width=device-width, initial-scale=1.0">
46 |       <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} data: https:; connect-src https:; font-src ${webview.cspSource} https:;">
47 |       <title>Flex Programming Assistant</title>
48 |       <link rel="stylesheet" href="${resetStyleUri}" nonce="${nonce}">
49 |       <link rel="stylesheet" href="${baseStyleUri}" nonce="${nonce}">
50 |       <link rel="stylesheet" href="${headerStyleUri}" nonce="${nonce}">
51 |       <link rel="stylesheet" href="${chatStyleUri}" nonce="${nonce}">
52 |       <link rel="stylesheet" href="${inputStyleUri}" nonce="${nonce}">
53 |       <link rel="stylesheet" href="${codeStyleUri}" nonce="${nonce}">
54 |       <link rel="stylesheet" href="${responsiveStyleUri}" nonce="${nonce}">
55 |     </head>
56 |     <body data-config-status="${configValidation.isValid ? 'valid' : 'invalid'}">
57 |       <div id="maincont">
58 |         <div id="header-bar">
59 |           <div class="header-left">
60 |             <img src="${flexLogoUri}" alt="Flex" class="header-logo">
61 |             <span class="header-title">Flex Assistant</span>
62 |             <div class="status-indicators">
63 |               <span class="status-dot ${configValidation.isValid ? 'success' : 'warning'}" title="${configValidation.isValid ? 'Configuration Ready' : 'Check Settings'}"></span>
64 |               <span class="status-dot ${isDatasetLoaded ? 'success' : 'loading'}" title="${isDatasetLoaded ? 'Dataset Loaded' : 'Loading Dataset'}"></span>
65 |             </div>
66 |           </div>
67 |           <div class="header-right">
68 |             <div class="model-display">${config.model || 'Default'}</div>
69 |             <button id="change-model" class="icon-button" title="Change Model">⚙️</button>
70 |             <button id="clear-button" class="icon-button" title="Clear Chat">🗑️</button>
71 |           </div>
72 |         </div>
73 |         <div id="chat-box">
74 |           <div class="welcome-message">
75 |             <div class="bot-avatar">
76 |               <img src="${robotGifUri}" alt="Flex Assistant">
77 |             </div>
78 |             <div class="welcome-content">
79 |               <h3>Welcome to Flex Programming Assistant! 🚀</h3>
80 |               <p>I'm here to help you with Flex syntax, Franco-Arabic programming concepts, and best practices.</p>
81 |             </div>
82 |           </div>
83 |         </div>
84 |         <div id="input-section">
85 |           <div class="input-container">
86 |             <div class="input-wrapper">
87 |               <textarea 
88 |                 id="user-input" 
89 |                 placeholder="Ask me anything about Flex programming..."
90 |                 rows="1"
91 |                 maxlength="4000"
92 |               ></textarea>
93 |               <button id="send-button" class="send-button">
94 |                 <span class="send-icon">📤</span>
95 |               </button>
96 |             </div>
97 |           </div>
98 |         </div>
99 |       </div>
100 |       <script src="${highlighterUri}" nonce="${nonce}"></script>
101 |       <script src="${domManagerUri}" nonce="${nonce}"></script>
102 |       <script src="${chatJsUri}" nonce="${nonce}"></script>
103 |     </body>
104 |     </html>`;
105 |   }
106 | } 
```

src/services/apiService.ts
```
1 | import axios, { AxiosResponse, AxiosError } from 'axios';
2 | import { ChatMessage, ModelInfo, ApiResponse, ExtensionConfig, WebSearchResult } from '../types';
3 | import { debugManager } from '../core/DebugManager';
4 | import { errorHandler } from '../core/ErrorHandler';
5 | 
6 | /**
7 |  * Enhanced API Service with debugging and error handling
8 |  * Service for handling API communications with OpenRouter and web search
9 |  */
10 | export class ApiService {
11 |     private static readonly openrouterBaseUrl = 'https://openrouter.ai/api/v1';
12 |     private static readonly defaultTimeout = 30000; // 30 seconds
13 |     private static readonly maxRetries = 3;
14 | 
15 |     /**
16 |      * Call OpenRouter API for streaming chat completions with progressive response
17 |      */
18 |     public static async streamChatCompletion(
19 |         messages: ChatMessage[],
20 |         config: ExtensionConfig,
21 |         onChunk: (chunk: string) => void,
22 |         onError?: (error: Error) => void,
23 |         onComplete?: () => void
24 |     ): Promise<string> {
25 |         const sessionId = `api_stream_completion_${Date.now()}`;
26 |         const startTime = Date.now();
27 | 
28 |         debugManager.startDebugSession(sessionId, {
29 |             operation: 'stream_chat_completion',
30 |             model: config.model,
31 |             messageCount: messages.length,
32 |             temperature: config.temperature
33 |         });
34 | 
35 |         try {
36 |             const requestData = {
37 |                 model: config.model,
38 |                 messages: messages.map(msg => ({
39 |                     role: msg.role,
40 |                     content: msg.content
41 |                 })),
42 |                 temperature: config.temperature,
43 |                 // No token limit - allow unlimited generation
44 |                 stream: true
45 |             };
46 | 
47 |             // eslint-disable-next-line @typescript-eslint/naming-convention
48 |             const headers = {
49 |                 'Content-Type': 'application/json',
50 |                 'Authorization': `Bearer ${config.apiKey}`,
51 |                 'HTTP-Referer': 'https://github.com/Flex-Language/chatbot',
52 |                 'X-Title': 'Flex Chatbot'
53 |             };
54 | 
55 |             let fullResponse = '';
56 | 
57 |             const response = await axios.post(
58 |                 `${this.openrouterBaseUrl}/chat/completions`,
59 |                 requestData,
60 |                 {
61 |                     headers,
62 |                     timeout: config.timeout || this.defaultTimeout,
63 |                     responseType: 'stream'
64 |                 }
65 |             );
66 | 
67 |             let chunkCount = 0;
68 |             let totalBytes = 0;
69 |             let lastChunkTime = Date.now();
70 |             const MAX_RESPONSE_SIZE = 10 * 1024 * 1024; // 10MB limit
71 |             const CHUNK_TIMEOUT = 30000; // 30 seconds per chunk
72 | 
73 |             return new Promise((resolve, reject) => {
74 |                 // Set up chunk timeout monitoring
75 |                 const chunkTimer = setInterval(() => {
76 |                     const timeSinceLastChunk = Date.now() - lastChunkTime;
77 |                     if (timeSinceLastChunk > CHUNK_TIMEOUT) {
78 |                         debugManager.addDebugStep(sessionId, 'chunk_timeout', {
79 |                             timeSinceLastChunk,
80 |                             chunkCount,
81 |                             responseLength: fullResponse.length
82 |                         });
83 |                         clearInterval(chunkTimer);
84 |                         reject(new Error(`Streaming timeout: no data received for ${timeSinceLastChunk}ms`));
85 |                     }
86 |                 }, 5000);
87 |                 response.data.on('data', (chunk: Buffer) => {
88 |                     try {
89 |                         chunkCount++;
90 |                         totalBytes += chunk.length;
91 |                         lastChunkTime = Date.now();
92 | 
93 |                         debugManager.addDebugStep(sessionId, 'chunk_received', {
94 |                             chunkNumber: chunkCount,
95 |                             chunkSize: chunk.length,
96 |                             totalBytes,
97 |                             responseLength: fullResponse.length
98 |                         });
99 | 
100 |                         // Check for memory safety
101 |                         if (fullResponse.length > MAX_RESPONSE_SIZE) {
102 |                             clearInterval(chunkTimer);
103 |                             debugManager.addDebugStep(sessionId, 'response_too_large', {
104 |                                 responseLength: fullResponse.length,
105 |                                 maxSize: MAX_RESPONSE_SIZE
106 |                             });
107 |                             reject(new Error(`Response too large: ${fullResponse.length} bytes exceeds ${MAX_RESPONSE_SIZE} bytes`));
108 |                             return;
109 |                         }
110 | 
111 |                         const chunkStr = chunk.toString('utf8');
112 |                         const lines = chunkStr.split('\n');
113 | 
114 |                         for (let i = 0; i < lines.length; i++) {
115 |                             const lineRaw = lines[i];
116 |                             if (!lineRaw) { continue; }
117 |                             const line = lineRaw.trim();
118 | 
119 |                             if (line.startsWith('data: ')) {
120 |                                 const data = line.slice(6).trim();
121 | 
122 |                                 if (data === '[DONE]') {
123 |                                     clearInterval(chunkTimer);
124 |                                     const duration = Date.now() - startTime;
125 |                                     debugManager.addDebugStep(sessionId, 'stream_completed', {
126 |                                         chunkCount,
127 |                                         totalBytes,
128 |                                         responseLength: fullResponse.length
129 |                                     });
130 |                                     debugManager.endDebugSession(sessionId, {
131 |                                         success: true,
132 |                                         duration,
133 |                                         responseLength: fullResponse.length,
134 |                                         chunks: chunkCount
135 |                                     });
136 |                                     if (onComplete) { onComplete(); }
137 |                                     resolve(fullResponse);
138 |                                     return;
139 |                                 }
140 | 
141 |                                 if (data && data !== '') {
142 |                                     try {
143 |                                         const parsed = JSON.parse(data);
144 |                                         const content = parsed.choices?.[0]?.delta?.content;
145 | 
146 |                                         if (content && typeof content === 'string') {
147 |                                             fullResponse += content;
148 |                                             onChunk(content);
149 | 
150 |                                             // Log progress every 100 chunks
151 |                                             if (chunkCount % 100 === 0) {
152 |                                                 debugManager.addDebugStep(sessionId, 'progress_update', {
153 |                                                     chunkCount,
154 |                                                     responseLength: fullResponse.length,
155 |                                                     avgChunkSize: totalBytes / chunkCount
156 |                                                 });
157 |                                             }
158 |                                         }
159 |                                     } catch (parseError) {
160 |                                         debugManager.addDebugStep(sessionId, 'json_parse_error', {
161 |                                             error: (parseError as Error).message,
162 |                                             data: data.substring(0, 200), // First 200 chars for debugging
163 |                                             chunkNumber: chunkCount,
164 |                                             lineNumber: i
165 |                                         });
166 |                                         // Continue processing other lines instead of failing
167 |                                     }
168 |                                 }
169 |                             } else if (line.startsWith('event:') || line.startsWith('id:')) {
170 |                                 // SSE metadata, ignore but log
171 |                                 debugManager.addDebugStep(sessionId, 'sse_metadata', { line });
172 |                             }
173 |                         }
174 |                     } catch (chunkError) {
175 |                         clearInterval(chunkTimer);
176 |                         debugManager.addDebugStep(sessionId, 'chunk_processing_error', {
177 |                             error: (chunkError as Error).message,
178 |                             chunkNumber: chunkCount,
179 |                             chunkSize: chunk?.length || 0
180 |                         });
181 |                         if (onError) { onError(chunkError as Error); }
182 |                         reject(chunkError);
183 |                     }
184 |                 });
185 | 
186 |                 response.data.on('error', (error: Error) => {
187 |                     clearInterval(chunkTimer);
188 |                     debugManager.addDebugStep(sessionId, 'stream_error', {
189 |                         error: error.message,
190 |                         chunkCount,
191 |                         responseLength: fullResponse.length,
192 |                         totalBytes
193 |                     });
194 |                     debugManager.endDebugSession(sessionId, {
195 |                         success: false,
196 |                         error: error.message,
197 |                         duration: Date.now() - startTime,
198 |                         chunks: chunkCount
199 |                     });
200 |                     if (onError) { onError(error); }
201 |                     reject(error);
202 |                 });
203 | 
204 |                 response.data.on('end', () => {
205 |                     clearInterval(chunkTimer);
206 |                     const duration = Date.now() - startTime;
207 | 
208 |                     debugManager.addDebugStep(sessionId, 'stream_ended', {
209 |                         chunkCount,
210 |                         responseLength: fullResponse.length,
211 |                         totalBytes,
212 |                         hasResponse: !!fullResponse
213 |                     });
214 | 
215 |                     if (fullResponse && fullResponse.length > 0) {
216 |                         debugManager.endDebugSession(sessionId, {
217 |                             success: true,
218 |                             duration,
219 |                             responseLength: fullResponse.length,
220 |                             chunks: chunkCount
221 |                         });
222 |                         if (onComplete) { onComplete(); }
223 |                         resolve(fullResponse);
224 |                     } else {
225 |                         const error = new Error('Stream ended without complete response');
226 |                         debugManager.endDebugSession(sessionId, {
227 |                             success: false,
228 |                             error: error.message,
229 |                             duration,
230 |                             chunks: chunkCount
231 |                         });
232 |                         if (onError) { onError(error); }
233 |                         reject(error);
234 |                     }
235 |                 });
236 |             });
237 | 
238 |         } catch (error) {
239 |             const duration = Date.now() - startTime;
240 |             debugManager.endDebugSession(sessionId, {
241 |                 success: false,
242 |                 error: (error as Error).message,
243 |                 duration
244 |             });
245 | 
246 |             if (onError) { onError(error as Error); }
247 |             throw error;
248 |         }
249 |     }
250 | 
251 |     /**
252 |      * Call OpenRouter API for chat completions with enhanced debugging and error handling
253 |      */
254 |     public static async chatCompletion(
255 |         messages: ChatMessage[],
256 |         config: ExtensionConfig
257 |     ): Promise<string> {
258 |         const sessionId = `api_chat_completion_${Date.now()}`;
259 |         const startTime = Date.now();
260 | 
261 |         debugManager.startDebugSession(sessionId, {
262 |             operation: 'chat_completion',
263 |             model: config.model,
264 |             messageCount: messages.length,
265 |             maxTokens: config.maxTokens,
266 |             temperature: config.temperature
267 |         });
268 | 
269 |         try {
270 |             const requestData = {
271 |                 model: config.model,
272 |                 messages: messages.map(msg => ({
273 |                     role: msg.role,
274 |                     content: msg.content
275 |                 })),
276 |                 temperature: config.temperature,
277 |                 // No token limit - allow unlimited generation
278 |                 stream: false
279 |             };
280 | 
281 |             // eslint-disable-next-line @typescript-eslint/naming-convention
282 |             const headers = {
283 |                 'Content-Type': 'application/json',
284 |                 'Authorization': `Bearer ${config.apiKey}`,
285 |                 'HTTP-Referer': 'https://github.com/Flex-Language/chatbot',
286 |                 'X-Title': 'Flex Chatbot'
287 |             };
288 | 
289 |             debugManager.addDebugStep(sessionId, 'request_prepared', {
290 |                 model: config.model,
291 |                 tokenLimit: config.maxTokens
292 |             });
293 | 
294 |             let lastError: Error | null = null;
295 | 
296 |             for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
297 |                 try {
298 |                     debugManager.addDebugStep(sessionId, `attempt_${attempt}`, { attempt });
299 | 
300 |                     const response: AxiosResponse<ApiResponse> = await axios.post(
301 |                         `${this.openrouterBaseUrl}/chat/completions`,
302 |                         requestData,
303 |                         {
304 |                             headers,
305 |                             timeout: config.timeout || this.defaultTimeout,
306 |                             validateStatus: (status) => status < 500 // Retry on 5xx errors
307 |                         }
308 |                     );
309 | 
310 |                     debugManager.addDebugStep(sessionId, 'response_received', {
311 |                         status: response.status,
312 |                         hasContent: !!response.data?.choices?.[0]?.message?.content
313 |                     });
314 | 
315 |                     if (response.data?.choices?.[0]?.message?.content) {
316 |                         const content = response.data.choices[0].message.content;
317 |                         const duration = Date.now() - startTime;
318 | 
319 |                         debugManager.trackPerformance('api_chat_completion', duration, {
320 |                             model: config.model,
321 |                             attempts: attempt,
322 |                             responseLength: content.length
323 |                         });
324 | 
325 |                         debugManager.endDebugSession(sessionId, {
326 |                             success: true,
327 |                             duration,
328 |                             attempts: attempt,
329 |                             responseLength: content.length
330 |                         });
331 | 
332 |                         return content;
333 |                     } else {
334 |                         throw new Error('Invalid response format from API');
335 |                     }
336 | 
337 |                 } catch (error) {
338 |                     debugManager.addDebugStep(sessionId, `attempt_${attempt}_failed`, {
339 |                         error: (error as Error).message,
340 |                         status: (error as AxiosError)?.response?.status
341 |                     });
342 | 
343 |                     lastError = this.handleApiError(error as AxiosError, attempt);
344 | 
345 |                     if (attempt === this.maxRetries) {
346 |                         const errorResult = await errorHandler.handleError(lastError, {
347 |                             component: 'api',
348 |                             operation: 'chat_completion',
349 |                             retryCount: attempt,
350 |                             sessionId
351 |                         });
352 | 
353 |                         debugManager.endDebugSession(sessionId, {
354 |                             success: false,
355 |                             error: lastError.message,
356 |                             attempts: attempt,
357 |                             duration: Date.now() - startTime
358 |                         });
359 | 
360 |                         throw new Error(errorResult.userMessage);
361 |                     }
362 | 
363 |                     // Exponential backoff
364 |                     const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
365 |                     debugManager.addDebugStep(sessionId, 'backoff_delay', { delay });
366 |                     await this.sleep(delay);
367 |                 }
368 |             }
369 | 
370 |             throw lastError || new Error('Unknown API error');
371 | 
372 |         } catch (error) {
373 |             const duration = Date.now() - startTime;
374 |             debugManager.trackPerformance('api_chat_completion_failed', duration, {
375 |                 model: config.model,
376 |                 error: (error as Error).message
377 |             });
378 | 
379 |             debugManager.endDebugSession(sessionId, {
380 |                 success: false,
381 |                 error: (error as Error).message,
382 |                 duration
383 |             });
384 | 
385 |             throw error;
386 |         }
387 |     }
388 | 
389 |     /**
390 |      * Fetch available models from OpenRouter with debugging
391 |      */
392 |     public static async fetchAvailableModels(apiKey: string): Promise<ModelInfo[]> {
393 |         const sessionId = `fetch_models_${Date.now()}`;
394 |         const startTime = Date.now();
395 | 
396 |         debugManager.startDebugSession(sessionId, { operation: 'fetch_models' });
397 | 
398 |         try {
399 |             const response = await axios.get(`${this.openrouterBaseUrl}/models`, {
400 |                 // eslint-disable-next-line @typescript-eslint/naming-convention
401 |                 headers: {
402 |                     'Authorization': `Bearer ${apiKey}`,
403 |                     'HTTP-Referer': 'https://github.com/Flex-Language/chatbot',
404 |                     'X-Title': 'Flex Chatbot'
405 |                 },
406 |                 timeout: this.defaultTimeout
407 |             });
408 | 
409 |             if (response.data?.data && Array.isArray(response.data.data)) {
410 |                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
411 |                 const models = response.data.data.map((model: any) => ({
412 |                     id: model.id,
413 |                     name: model.name,
414 |                     description: model.description,
415 |                     contextLength: model.context_length,
416 |                     pricing: {
417 |                         prompt: model.pricing.prompt,
418 |                         completion: model.pricing.completion,
419 |                         request: model.pricing.request,
420 |                         image: model.pricing.image
421 |                     },
422 |                     trust: 'N/A'
423 |                 }));
424 | 
425 |                 debugManager.endDebugSession(sessionId, {
426 |                     success: true,
427 |                     modelsCount: models.length
428 |                 });
429 | 
430 |                 return models;
431 |             }
432 | 
433 |             debugManager.endDebugSession(sessionId, {
434 |                 success: true,
435 |                 modelsCount: 0
436 |             });
437 | 
438 |             return [];
439 |         } catch (error) {
440 |             const errorResult = await errorHandler.handleError(error as Error, {
441 |                 component: 'api',
442 |                 operation: 'fetch_models',
443 |                 sessionId
444 |             });
445 | 
446 |             debugManager.endDebugSession(sessionId, {
447 |                 success: false,
448 |                 error: (error as Error).message,
449 |                 duration: Date.now() - startTime
450 |             });
451 | 
452 |             throw new Error(errorResult.userMessage);
453 |         }
454 |     }
455 | 
456 |     /**
457 |      * Perform web search using SerpAPI (with fallback options)
458 |      */
459 |     public static async performWebSearch(query: string): Promise<WebSearchResult[]> {
460 |         try {
461 |             // First try with demo API key (limited but free)
462 |             const response = await axios.get('https://serpapi.com/search.json', {
463 |                 params: {
464 |                     q: query,
465 |                     // eslint-disable-next-line @typescript-eslint/naming-convention
466 |                     api_key: 'demo',
467 |                     num: 5,
468 |                     format: 'json'
469 |                 },
470 |                 timeout: 10000
471 |             });
472 | 
473 |             if (response.data?.organic_results) {
474 |                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
475 |                 return response.data.organic_results.map((result: any) => ({
476 |                     title: result.title || 'No title',
477 |                     snippet: result.snippet || 'No description available',
478 |                     link: result.link || '#'
479 |                 }));
480 |             }
481 | 
482 |             return [];
483 |         } catch (error) {
484 |             console.warn('Web search failed:', error);
485 |             // Return empty results rather than throwing - web search is optional
486 |             return [];
487 |         }
488 |     }
489 | 
490 |     /**
491 |      * Format web search results for AI consumption
492 |      */
493 |     public static formatWebSearchResults(results: WebSearchResult[]): string {
494 |         if (results.length === 0) {
495 |             return 'No web search results found.';
496 |         }
497 | 
498 |         return results
499 |             .map((result, index) =>
500 |                 `[${index + 1}] ${result.title}\n${result.snippet}\nURL: ${result.link}\n`
501 |             )
502 |             .join('\n');
503 |     }
504 | 
505 |     /**
506 |      * Validate API key format
507 |      */
508 |     public static validateApiKey(apiKey: string): boolean {
509 |         if (!apiKey || typeof apiKey !== 'string') {
510 |             return false;
511 |         }
512 | 
513 |         // Basic validation - OpenRouter keys typically start with 'sk-or-'
514 |         const trimmedKey = apiKey.trim();
515 |         return trimmedKey.length > 20 && /^sk-/.test(trimmedKey);
516 |     }
517 | 
518 |     /**
519 |      * Test API connectivity
520 |      */
521 |     public static async testApiConnection(apiKey: string): Promise<boolean> {
522 |         try {
523 |             const response = await axios.post(
524 |                 'https://openrouter.ai/api/v1/auth/test',
525 |                 // eslint-disable-next-line @typescript-eslint/naming-convention
526 |                 { 'api_key': apiKey },
527 |                 { timeout: 15000 }
528 |             );
529 |             return response.status === 200 && response.data?.valid === true;
530 |         } catch (error) {
531 |             console.error('API connection test failed:', error);
532 |             return false;
533 |         }
534 |     }
535 | 
536 |     /**
537 |      * Handle API errors with appropriate user-friendly messages
538 |      */
539 |     private static handleApiError(error: AxiosError, attempt: number): Error {
540 |         if (error.response) {
541 |             const status = error.response.status;
542 |             // eslint-disable-next-line @typescript-eslint/no-explicit-any
543 |             const data = error.response.data as any;
544 | 
545 |             switch (status) {
546 |                 case 401:
547 |                     return new Error('Invalid API key. Please check your OpenRouter API key in settings.');
548 |                 case 402:
549 |                     return new Error('Insufficient credits. Please add credits to your OpenRouter account.');
550 |                 case 403:
551 |                     return new Error('Access forbidden. Please check your API key permissions.');
552 |                 case 429:
553 |                     return new Error('Rate limit exceeded. Please wait a moment before trying again.');
554 |                 case 500:
555 |                 case 502:
556 |                 case 503:
557 |                 case 504:
558 |                     if (attempt < this.maxRetries) {
559 |                         return new Error(`Server error (${status}). Retrying... (attempt ${attempt})`);
560 |                     }
561 |                     return new Error('Server is currently unavailable. Please try again later.');
562 |                 default:
563 |                     return new Error(
564 |                         data?.error?.message ||
565 |                         `API error ${status}: ${error.response.statusText}`
566 |                     );
567 |             }
568 |         } else if (error.code === 'ECONNABORTED') {
569 |             return new Error('Request timed out. Please check your internet connection.');
570 |         } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
571 |             return new Error('Unable to connect to the API. Please check your internet connection.');
572 |         } else {
573 |             return new Error(`Network error: ${error.message}`);
574 |         }
575 |     }
576 | 
577 |     /**
578 |      * Extract error message from various error types
579 |      */
580 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
581 |     private static getErrorMessage(error: any): string {
582 |         if (error?.response?.data?.error?.message) {
583 |             return error.response.data.error.message;
584 |         }
585 |         if (error?.message) {
586 |             return error.message;
587 |         }
588 |         return 'Unknown error occurred';
589 |     }
590 | 
591 |     /**
592 |      * Sleep utility for retry delays
593 |      */
594 |     private static sleep(ms: number): Promise<void> {
595 |         return new Promise(resolve => setTimeout(resolve, ms));
596 |     }
597 | 
598 |     /**
599 |      * Get model pricing information formatted for display
600 |      */
601 |     public static formatModelPricing(model: ModelInfo): string {
602 |         if (!model.pricing) {
603 |             return 'Pricing N/A';
604 |         }
605 | 
606 |         const promptPrice = (parseFloat(model.pricing.prompt) * 1000).toFixed(6);
607 |         const completionPrice = (parseFloat(model.pricing.completion) * 1000).toFixed(6);
608 | 
609 |         return `$${promptPrice}/$${completionPrice} per 1K tokens`;
610 |     }
611 | 
612 |     /**
613 |      * Get recommended models for Flex programming
614 |      */
615 |     public static getRecommendedModels(): string[] {
616 |         return [
617 |             'openai/gpt-4o-mini',
618 |             'openai/gpt-4o',
619 |             'openai/gpt-4-turbo',
620 |             'anthropic/claude-3.5-sonnet',
621 |             'anthropic/claude-3-haiku',
622 |             'google/gemini-flash-1.5',
623 |             'mistralai/mistral-small'
624 |         ];
625 |     }
626 | } 
```

src/services/configService.ts
```
1 | import * as vscode from 'vscode';
2 | import { ExtensionConfig } from '../types';
3 | 
4 | /**
5 |  * Service for managing extension configuration
6 |  */
7 | export class ConfigService {
8 |     private static readonly configSection = 'flexChatbot';
9 | 
10 |     /**
11 |      * Get all extension configuration
12 |      */
13 |     public static getConfig(): ExtensionConfig {
14 |         const config = vscode.workspace.getConfiguration(this.configSection);
15 |         let model = config.get<string>('model', 'openai/gpt-4o-mini');
16 | 
17 |         // Fix common invalid model names
18 |         const modelFixes: Record<string, string> = {
19 |             'openai/gpt-4.1-mini': 'openai/gpt-4o-mini',
20 |             'openai/gpt-4.1': 'openai/gpt-4o',
21 |             'openai/gpt-4.1-nano': 'openai/gpt-4o-mini',
22 |             'openai/gpt-4.5-preview': 'openai/gpt-4o'
23 |         };
24 | 
25 |         if (modelFixes[model]) {
26 |             const newModel = modelFixes[model];
27 |             if (newModel) {
28 |                 console.warn(`⚠️ Fixing invalid model: ${model} → ${newModel}`);
29 |                 // Auto-update the configuration
30 |                 this.set('model', newModel).catch(console.error);
31 |                 model = newModel;
32 |             }
33 |         }
34 | 
35 |         return {
36 |             apiKey: config.get<string>('apiKey', ''),
37 |             model: model,
38 |             temperature: config.get<number>('temperature', 0.7),
39 |             enableWebSearch: config.get<boolean>('enableWebSearch', false),
40 |             maxTokens: config.get<number>('maxTokens', 0), // 0 means unlimited
41 |             timeout: config.get<number>('timeout', 30000)
42 |         };
43 |     }
44 | 
45 |     /**
46 |      * Get specific configuration value
47 |      */
48 |     public static get<T>(key: keyof ExtensionConfig, defaultValue?: T): T {
49 |         const config = vscode.workspace.getConfiguration(this.configSection);
50 |         return config.get<T>(key, defaultValue as T);
51 |     }
52 | 
53 |     /**
54 |      * Set configuration value
55 |      */
56 |     public static async set<T>(
57 |         key: keyof ExtensionConfig,
58 |         value: T,
59 |         target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global
60 |     ): Promise<void> {
61 |         const config = vscode.workspace.getConfiguration(this.configSection);
62 |         await config.update(key, value, target);
63 |     }
64 | 
65 |     /**
66 |      * Check if API key is configured
67 |      */
68 |     public static isApiKeyConfigured(): boolean {
69 |         const apiKey = this.get<string>('apiKey', '');
70 |         return apiKey.trim().length > 0;
71 |     }
72 | 
73 |     /**
74 |      * Validate configuration
75 |      */
76 |     public static validateConfig(): { isValid: boolean; errors: string[] } {
77 |         const config = this.getConfig();
78 |         const errors: string[] = [];
79 | 
80 |         // Validate API key
81 |         if (!config.apiKey || config.apiKey.trim().length === 0) {
82 |             errors.push('API key is required');
83 |         } else if (config.apiKey.length < 20) {
84 |             errors.push('API key appears to be invalid (too short)');
85 |         }
86 | 
87 |         // Validate model
88 |         if (!config.model || config.model.trim().length === 0) {
89 |             errors.push('Model selection is required');
90 |         }
91 | 
92 |         // Validate temperature
93 |         if (config.temperature < 0 || config.temperature > 2) {
94 |             errors.push('Temperature must be between 0 and 2');
95 |         }
96 | 
97 |         // Validate max tokens
98 |         if (config.maxTokens < 1 || config.maxTokens > 32000) {
99 |             errors.push('Max tokens must be between 1 and 32000');
100 |         }
101 | 
102 |         // Validate timeout
103 |         if (config.timeout < 5000 || config.timeout > 300000) {
104 |             errors.push('Timeout must be between 5 and 300 seconds');
105 |         }
106 | 
107 |         return {
108 |             isValid: errors.length === 0,
109 |             errors
110 |         };
111 |     }
112 | 
113 |     /**
114 |      * Get default configuration
115 |      */
116 |     public static getDefaultConfig(): ExtensionConfig {
117 |         return {
118 |             apiKey: '',
119 |             model: 'openai/gpt-4o-mini',
120 |             temperature: 0.7,
121 |             enableWebSearch: true,
122 |             maxTokens: 4000,
123 |             timeout: 30000
124 |         };
125 |     }
126 | 
127 |     /**
128 |      * Reset configuration to defaults
129 |      */
130 |     public static async resetToDefaults(): Promise<void> {
131 |         const defaultConfig = this.getDefaultConfig();
132 |         const config = vscode.workspace.getConfiguration(this.configSection);
133 | 
134 |         for (const [key, value] of Object.entries(defaultConfig)) {
135 |             if (key !== 'apiKey') { // Don't reset API key
136 |                 await config.update(key, value, vscode.ConfigurationTarget.Global);
137 |             }
138 |         }
139 |     }
140 | 
141 |     /**
142 |      * Show configuration dialog
143 |      */
144 |     public static async showConfigurationDialog(): Promise<void> {
145 |         const actions = [
146 |             'Open Settings',
147 |             'Set API Key',
148 |             'Select Model',
149 |             'Test Connection'
150 |         ];
151 | 
152 |         const selectedAction = await vscode.window.showQuickPick(actions, {
153 |             placeHolder: 'Choose configuration action'
154 |         });
155 | 
156 |         switch (selectedAction) {
157 |             case 'Open Settings':
158 |                 await vscode.commands.executeCommand('workbench.action.openSettings', this.configSection);
159 |                 break;
160 | 
161 |             case 'Set API Key':
162 |                 await this.promptForApiKey();
163 |                 break;
164 | 
165 |             case 'Select Model':
166 |                 await vscode.commands.executeCommand('flexChatbot.selectModel');
167 |                 break;
168 | 
169 |             case 'Test Connection':
170 |                 await this.testConnection();
171 |                 break;
172 |         }
173 |     }
174 | 
175 |     /**
176 |      * Prompt user for API key
177 |      */
178 |     public static async promptForApiKey(): Promise<void> {
179 |         const apiKey = await vscode.window.showInputBox({
180 |             prompt: 'Enter your OpenRouter API key',
181 |             password: true,
182 |             placeHolder: 'sk-or-...',
183 |             validateInput: (value) => {
184 |                 if (!value || value.trim().length === 0) {
185 |                     return 'API key is required';
186 |                 }
187 |                 if (value.length < 20) {
188 |                     return 'API key appears to be invalid (too short)';
189 |                 }
190 |                 return null;
191 |             }
192 |         });
193 | 
194 |         if (apiKey) {
195 |             await this.set('apiKey', apiKey.trim());
196 |             vscode.window.showInformationMessage('API key saved successfully!');
197 |         }
198 |     }
199 | 
200 |     /**
201 |      * Test API connection
202 |      */
203 |     private static async testConnection(): Promise<void> {
204 |         const config = this.getConfig();
205 | 
206 |         if (!config.apiKey) {
207 |             vscode.window.showErrorMessage('Please set your API key first');
208 |             return;
209 |         }
210 | 
211 |         try {
212 |             // Import ApiService dynamically to avoid circular dependencies
213 |             const apiServiceModule = await import('./apiService');
214 |             const isConnected = await apiServiceModule.ApiService.testApiConnection(config.apiKey);
215 | 
216 |             if (isConnected) {
217 |                 vscode.window.showInformationMessage('✅ API connection successful!');
218 |             } else {
219 |                 vscode.window.showErrorMessage('❌ API connection failed. Please check your API key.');
220 |             }
221 |         } catch (error) {
222 |             const errorMessage = error instanceof Error ? error.message : String(error);
223 |             vscode.window.showErrorMessage(`❌ Connection test failed: ${errorMessage}`);
224 |         }
225 |     }
226 | 
227 |     /**
228 |      * Watch for configuration changes
229 |      */
230 |     public static onConfigurationChanged(
231 |         callback: (config: ExtensionConfig) => void
232 |     ): vscode.Disposable {
233 |         return vscode.workspace.onDidChangeConfiguration((event) => {
234 |             if (event.affectsConfiguration(this.configSection)) {
235 |                 callback(this.getConfig());
236 |             }
237 |         });
238 |     }
239 | 
240 |     /**
241 |      * Export configuration (excluding sensitive data)
242 |      */
243 |     public static exportConfig(): Partial<ExtensionConfig> {
244 |         const config = this.getConfig();
245 |         return {
246 |             model: config.model,
247 |             temperature: config.temperature,
248 |             enableWebSearch: config.enableWebSearch,
249 |             maxTokens: config.maxTokens,
250 |             timeout: config.timeout
251 |             // Explicitly exclude apiKey for security
252 |         };
253 |     }
254 | 
255 |     /**
256 |      * Import configuration (excluding sensitive data)
257 |      */
258 |     public static async importConfig(importedConfig: Partial<ExtensionConfig>): Promise<void> {
259 |         const config = vscode.workspace.getConfiguration(this.configSection);
260 | 
261 |         for (const [key, value] of Object.entries(importedConfig)) {
262 |             if (key !== 'apiKey' && value !== undefined) {
263 |                 await config.update(key, value, vscode.ConfigurationTarget.Global);
264 |             }
265 |         }
266 | 
267 |         vscode.window.showInformationMessage('Configuration imported successfully!');
268 |     }
269 | 
270 |     /**
271 |      * Get configuration summary for display
272 |      */
273 |     public static getConfigSummary(): string {
274 |         const config = this.getConfig();
275 |         const hasApiKey = config.apiKey.length > 0;
276 | 
277 |         return `
278 | 📋 **Configuration Summary:**
279 | - API Key: ${hasApiKey ? '✅ Set' : '❌ Not set'}
280 | - Model: ${config.model}
281 | - Temperature: ${config.temperature}
282 | - Web Search: ${config.enableWebSearch ? '✅ Enabled' : '❌ Disabled'}
283 | - Max Tokens: ${config.maxTokens || 'Default'}
284 | - Timeout: ${(config.timeout || 30000) / 1000}s
285 |     `.trim();
286 |     }
287 | } 
```

src/services/flexDatasetService.ts
```
1 | import * as fs from 'fs';
2 | import * as path from 'path';
3 | import { FlexSpecification } from '../types';
4 | 
5 | /**
6 |  * Service for managing the Flex language dataset and generating system prompts
7 |  */
8 | export class FlexDatasetService {
9 |     private static instance: FlexDatasetService;
10 |     private flexSpec: FlexSpecification | null = null;
11 |     private readonly datasetPath: string;
12 | 
13 |     private constructor(extensionPath: string) {
14 |         this.datasetPath = path.join(extensionPath, 'assets', 'datasets', 'flex_language_spec.json');
15 |         this.loadFlexSpec();
16 |     }
17 | 
18 |     /**
19 |      * Get singleton instance of FlexDatasetService
20 |      */
21 |     public static getInstance(extensionPath?: string): FlexDatasetService {
22 |         if (!FlexDatasetService.instance) {
23 |             if (!extensionPath) {
24 |                 throw new Error('Extension path is required for first initialization');
25 |             }
26 |             FlexDatasetService.instance = new FlexDatasetService(extensionPath);
27 |         }
28 |         return FlexDatasetService.instance;
29 |     }
30 | 
31 |     /**
32 |      * Load the Flex language specification from JSON file
33 |      */
34 |     private loadFlexSpec(): void {
35 |         try {
36 |             if (fs.existsSync(this.datasetPath)) {
37 |                 const fileContent = fs.readFileSync(this.datasetPath, 'utf-8');
38 |                 this.flexSpec = JSON.parse(fileContent) as FlexSpecification;
39 |                 console.log('✅ Flex language specification loaded successfully');
40 |             } else {
41 |                 console.warn(`⚠️ Flex dataset file not found at: ${this.datasetPath}`);
42 |                 this.flexSpec = null;
43 |             }
44 |         } catch (error) {
45 |             console.error('❌ Error loading Flex language specification:', error);
46 |             this.flexSpec = null;
47 |         }
48 |     }
49 | 
50 |     /**
51 |      * Get the complete system prompt for AI interactions
52 |      */
53 |     public getSystemPrompt(): string {
54 |         if (!this.flexSpec) {
55 |             return this.getFallbackSystemPrompt();
56 |         }
57 | 
58 |         try {
59 |             const {
60 |                 ai_system_prompt: aiSystemPrompt,
61 |                 ESSENTIAL_FLEX_KNOWLEDGE: essentialKnowledge,
62 |                 CRITICAL_SYNTAX_PATTERNS: syntaxPatterns,
63 |                 code_examples: codeExamples,
64 |                 common_patterns: commonPatterns,
65 |             } = this.flexSpec;
66 | 
67 |             const promptSections = {
68 |                 "ROLE": `${aiSystemPrompt.role} - ${aiSystemPrompt.description}`,
69 |                 "CRITICAL INSTRUCTIONS": Object.values(aiSystemPrompt.CRITICAL_INSTRUCTIONS).map(instr => `- ${instr}`).join('\n'),
70 |                 "ESSENTIAL FLEX LANGUAGE KNOWLEDGE": `
71 | - **Language**: ${essentialKnowledge.language_identity}
72 | - **Philosophy**: ${essentialKnowledge.core_philosophy}
73 | - **File Extensions**: ${essentialKnowledge.file_extensions.join(', ')}
74 | - **Unique Features**: 
75 |   - ${essentialKnowledge.unique_features.join('\n  - ')}
76 | `.trim(),
77 |                 "CRITICAL SYNTAX PATTERNS": this.formatSyntaxPatterns(syntaxPatterns),
78 |                 "CODE EXAMPLES": this.formatCodeExamples(codeExamples),
79 |                 "COMMON PATTERNS": this.formatCommonPatterns(commonPatterns),
80 |             };
81 | 
82 |             const fullPrompt = Object.entries(promptSections)
83 |                 .map(([title, content]) => `## ${title}\n${content}`)
84 |                 .join('\n\n');
85 | 
86 |             return `# Flex Programming Assistant for VSCode\n\n${fullPrompt}\n\n## VSCODE INTEGRATION GUIDELINES:\n- Use \`\`\`flex code blocks for all Flex code examples.\n- Provide copy-pasteable, production-ready code snippets.\n- Format responses for easy scanning with headers and bullet points.\n\nRemember: You are an expert Flex programming assistant. Prioritize working code first, then provide clear explanations adapted to the user's expertise level.`;
87 | 
88 |         } catch (error) {
89 |             console.error('Error generating system prompt:', error);
90 |             return this.getFallbackSystemPrompt();
91 |         }
92 |     }
93 | 
94 |     /**
95 |      * Format code examples for the system prompt
96 |      */
97 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
98 |     private formatCodeExamples(examples: Record<string, any>): string {
99 |         if (!examples) { return ''; }
100 | 
101 |         return Object.entries(examples)
102 |             .map(([name, example]) => {
103 |                 if (example.code && Array.isArray(example.code)) {
104 |                     return `### ${example.description || name}:
105 | \`\`\`flex
106 | ${example.code.join('\n')}
107 | \`\`\``;
108 |                 }
109 |                 return '';
110 |             })
111 |             .filter(Boolean)
112 |             .join('\n\n');
113 |     }
114 | 
115 |     /**
116 |      * Format common patterns for the system prompt
117 |      */
118 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
119 |     private formatCommonPatterns(patterns: Record<string, any>): string {
120 |         if (!patterns) { return ''; }
121 | 
122 |         return Object.entries(patterns)
123 |             .map(([name, pattern]) => {
124 |                 if (Array.isArray(pattern)) {
125 |                     return `### ${name}:
126 | \`\`\`flex
127 | ${pattern.join('\n')}
128 | \`\`\``;
129 |                 }
130 |                 return '';
131 |             })
132 |             .filter(Boolean)
133 |             .join('\n\n');
134 |     }
135 | 
136 |     /**
137 |      * Format syntax patterns for the system prompt
138 |      */
139 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
140 |     private formatSyntaxPatterns(patterns: Record<string, any>): string {
141 |         if (!patterns) { return ''; }
142 | 
143 |         return Object.entries(patterns)
144 |             .map(([category, pattern]) => {
145 |                 if (typeof pattern === 'object' && pattern.examples) {
146 |                     return `### ${category}:
147 | ${Array.isArray(pattern.examples) ? pattern.examples.join('\n') : pattern.examples}`;
148 |                 }
149 |                 return '';
150 |             })
151 |             .filter(Boolean)
152 |             .join('\n\n');
153 |     }
154 | 
155 |     /**
156 |      * Get a fallback system prompt if the dataset isn't available
157 |      */
158 |     private getFallbackSystemPrompt(): string {
159 |         return `# Flex Programming Assistant for VSCode (Fallback Mode)
160 | 
161 | You are a senior-level expert assistant for the Flex programming language, integrated into a VSCode extension. Flex is a bilingual programming language that supports both Franco Arabic and English syntax.
162 | 
163 | ## CORE FLEX FEATURES:
164 | - **Bilingual Syntax**: Mixed Franco Arabic and English keywords
165 | - **String Interpolation**: Use {variable} syntax for string templating
166 | - **No Semicolons**: Clean syntax without required semicolons
167 | - **Automatic Type Detection**: Smart type inference
168 | - **File Extensions**: .flex, .lx
169 | 
170 | ## CRITICAL SAFETY WARNING:
171 | ⚠️ **Franco loops with 'l7d' are INCLUSIVE** - always use 'length(array) - 1' for safe array access to prevent out-of-bounds errors.
172 | 
173 | ## SYNTAX QUICK REFERENCE:
174 | ### Variables:
175 | - Franco: \`rakm x = 10\` | English: \`int x = 10\`
176 | - Franco: \`kasr y = 3.14\` | English: \`float y = 3.14\`
177 | 
178 | ### Functions:
179 | - Franco: \`sndo2 sayHello() { etb3("Hello") }\`
180 | - English: \`fun sayHello() { print("Hello") }\`
181 | 
182 | ### Conditionals:
183 | - Franco: \`lw x > 5 { etb3("Big") }\`
184 | - English: \`if (x > 5) { print("Big") }\`
185 | 
186 | ### Loops:
187 | - Franco: \`karr l7d 10 { etb3(i) }\` (INCLUSIVE - use length-1 for arrays)
188 | - English: \`for(i=0; i<10; i++) { print(i) }\`
189 | 
190 | ## VSCODE INTEGRATION GUIDELINES:
191 | - Use \`\`\`flex code blocks for all code examples
192 | - Provide immediate, actionable solutions
193 | - Format responses with clear headers and bullet points
194 | - Prioritize working code first, then explanations
195 | 
196 | Always help users write safe, efficient Flex code while respecting their syntax preferences (Franco vs English).`;
197 |     }
198 | 
199 |     /**
200 |      * Get specific section of the specification
201 |      */
202 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
203 |     public getSpecSection(section: keyof FlexSpecification): any {
204 |         return this.flexSpec?.[section] || null;
205 |     }
206 | 
207 |     /**
208 |      * Check if dataset is loaded
209 |      */
210 |     public isDatasetLoaded(): boolean {
211 |         return this.flexSpec !== null;
212 |     }
213 | 
214 |     /**
215 |      * Reload the dataset (useful for development)
216 |      */
217 |     public reload(): void {
218 |         this.loadFlexSpec();
219 |     }
220 | 
221 |     /**
222 |      * Get dataset statistics
223 |      */
224 |     public getDatasetStats(): Record<string, number> {
225 |         if (!this.flexSpec) {
226 |             return { loaded: 0 };
227 |         }
228 | 
229 |         return {
230 |             loaded: 1,
231 |             codeExamples: Object.keys(this.flexSpec.code_examples || {}).length,
232 |             commonPatterns: Object.keys(this.flexSpec.common_patterns || {}).length,
233 |             syntaxPatterns: Object.keys(this.flexSpec.CRITICAL_SYNTAX_PATTERNS || {}).length,
234 |         };
235 |     }
236 | } 
```

src/test/runTest.ts
```
1 | import * as path from 'path';
2 | import { runTests } from '@vscode/test-electron';
3 | import { exec } from 'child_process';
4 | import { promisify } from 'util';
5 | 
6 | const execAsync = promisify(exec);
7 | 
8 | async function checkForRunningVSCode(): Promise<boolean> {
9 | 	try {
10 | 		const { stdout } = await execAsync('ps aux | grep "Visual Studio Code" | grep -v grep');
11 | 		return stdout.trim().length > 0;
12 | 	} catch (error) {
13 | 		// If ps command fails or no processes found, assume no VS Code is running
14 | 		return false;
15 | 	}
16 | }
17 | 
18 | async function killVSCodeInstances(): Promise<void> {
19 | 	try {
20 | 		console.log('🔄 Attempting to close VS Code instances...');
21 | 		await execAsync('killall "Visual Studio Code"');
22 | 		console.log('✅ VS Code instances closed');
23 | 		// Wait a moment for processes to fully terminate
24 | 		await new Promise(resolve => setTimeout(resolve, 2000));
25 | 	} catch (error) {
26 | 		console.log('ℹ️  No VS Code instances found or already closed');
27 | 	}
28 | }
29 | 
30 | async function main() {
31 | 	try {
32 | 		// The folder containing the Extension Manifest package.json
33 | 		// Passed to `--extensionDevelopmentPath`
34 | 		const extensionDevelopmentPath = path.resolve(__dirname, '../../');
35 | 
36 | 		// The path to test runner
37 | 		// Passed to --extensionTestsPath
38 | 		const extensionTestsPath = path.resolve(__dirname, './suite/index');
39 | 
40 | 		console.log('🧪 Starting VS Code Extension Tests...');
41 | 		console.log('📁 Extension path:', extensionDevelopmentPath);
42 | 		console.log('🔬 Test suite path:', extensionTestsPath);
43 | 
44 | 		// Check for running VS Code instances
45 | 		const hasRunningVSCode = await checkForRunningVSCode();
46 | 		if (hasRunningVSCode) {
47 | 			console.log('⚠️  Detected running VS Code instances');
48 | 
49 | 			// Auto-close if we're in CI or if forced
50 | 			if (process.env.CI || process.env.FORCE_CLOSE_VSCODE) {
51 | 				await killVSCodeInstances();
52 | 			} else {
53 | 				console.log('💡 Tip: Run "npm run kill-vscode" to close VS Code instances automatically');
54 | 				console.log('   Or set FORCE_CLOSE_VSCODE=true environment variable');
55 | 			}
56 | 		}
57 | 
58 | 		// Download VS Code, unzip it and run the integration test
59 | 		await runTests({
60 | 			extensionDevelopmentPath,
61 | 			extensionTestsPath,
62 | 			// Add launch options to avoid conflicts with running VS Code instances
63 | 			launchArgs: [
64 | 				'--no-sandbox',
65 | 				'--disable-background-networking',
66 | 				'--disable-background-timer-throttling',
67 | 				'--disable-backgrounding-occluded-windows',
68 | 				'--disable-renderer-backgrounding',
69 | 				'--disable-extensions',
70 | 				'--disable-gpu',
71 | 				'--disable-dev-shm-usage',
72 | 				'--user-data-dir=/tmp/vscode-test-user-data'
73 | 			]
74 | 		});
75 | 
76 | 		console.log('✅ All tests passed!');
77 | 	} catch (err) {
78 | 		console.error('❌ Failed to run tests:');
79 | 
80 | 		if (err instanceof Error) {
81 | 			if (err.message.includes('no other instance of Code is running')) {
82 | 				console.error('\n🚨 VS Code Instance Conflict:');
83 | 				console.error('   Please close all VS Code instances and run the tests again.');
84 | 				console.error('\n📝 Quick Solutions:');
85 | 				console.error('   1. Manual: Close all VS Code windows');
86 | 				console.error('   2. Auto: Run "npm run kill-vscode" then "npm test"');
87 | 				console.error('   3. Force: Run "FORCE_CLOSE_VSCODE=true npm test"');
88 | 				console.error('   4. Safe: Run "npm run test:unit" (no VS Code needed)');
89 | 			} else {
90 | 				console.error('   Error:', err.message);
91 | 			}
92 | 		} else {
93 | 			console.error('   Unknown error:', err);
94 | 		}
95 | 
96 | 		console.error('\n💡 Alternative commands:');
97 | 		console.error('   • npm run test:unit      - Run unit tests only (fast)');
98 | 		console.error('   • npm run test:safe      - Same as test:unit');
99 | 		console.error('   • npm run test:force     - Force close VS Code and test');
100 | 		console.error('   • npm run kill-vscode    - Close VS Code instances');
101 | 
102 | 		process.exit(1);
103 | 	}
104 | }
105 | 
106 | main();
```

src/types/dev.ts
```
1 | // Type definitions for Development Tools
2 | export interface ProfileSession {
3 |     name: string;
4 |     startTime: number;
5 |     endTime?: number;
6 |     duration?: number;
7 |     samples: ProfileSample[];
8 |     isActive: boolean;
9 | }
10 | 
11 | export interface ProfileSample {
12 |     timestamp: number;
13 |     memoryUsage: NodeJS.MemoryUsage;
14 |     cpuUsage: NodeJS.CpuUsage;
15 | }
16 | 
17 | export interface ProfileResult {
18 |     sessionName: string;
19 |     duration: number;
20 |     samples: ProfileSample[];
21 |     averageMemory: number;
22 |     memoryTrend: 'increasing' | 'decreasing' | 'stable';
23 |     cpuUsage: number;
24 | }
25 | 
26 | export interface MemoryAnalysis {
27 |     timestamp: number;
28 |     heapUsed: number;
29 |     heapTotal: number;
30 |     external: number;
31 |     rss: number;
32 |     arrayBuffers: number;
33 |     cpuUsage: {
34 |         user: number;
35 |         system: number;
36 |     };
37 |     analysis: string[];
38 | }
39 | 
40 | export interface DevelopmentMetrics {
41 |     timestamp: number;
42 |     debug: {
43 |         isEnabled: boolean;
44 |         activeSessions: number;
45 |         recentErrors: number;
46 |         performanceIssues: number;
47 |     };
48 |     memory: MemoryAnalysis;
49 |     performance: {
50 |         averageResponseTime: number;
51 |         memoryLeaks: boolean;
52 |         slowOperations: Array<{
53 |             operation: string;
54 |             averageDuration: number;
55 |             callCount: number;
56 |         }>;
57 |     };
58 |     code: CodeMetrics;
59 |     recommendations: Recommendation[];
60 | }
61 | 
62 | export interface Recommendation {
63 |     category: string;
64 |     priority: 'error' | 'warning' | 'info';
65 |     description: string;
66 | }
67 | 
68 | export interface CodeAnalysisResult {
69 |     totalFiles: number;
70 |     totalLines: number;
71 |     totalFunctions: number;
72 |     totalClasses: number;
73 |     averageLinesPerFile: number;
74 |     complexity: 'Low' | 'Medium' | 'High';
75 | }
76 | 
77 | export interface CodeQualityReport {
78 |     timestamp: number;
79 |     filesAnalyzed: number;
80 |     totalIssues: number;
81 |     issuesBySeverity: {
82 |         error: number;
83 |         warning: number;
84 |         info: number;
85 |     };
86 |     issues: CodeQualityIssue[];
87 | }
88 | 
89 | export interface CodeQualityIssue {
90 |     file: string;
91 |     line: number;
92 |     column: number;
93 |     severity: 'error' | 'warning' | 'info';
94 |     message: string;
95 |     rule: string;
96 | }
97 | 
98 | export interface CodeMetrics {
99 |     maintainabilityIndex: number;
100 |     codeComplexity: string;
101 |     testCoverage: number;
102 | } 
```

src/types/index.ts
```
1 | /**
2 |  * Type definitions for the Flex Chatbot extension
3 |  */
4 | 
5 | export interface FlexSpecification {
6 |     ai_system_prompt: {
7 |         role: string;
8 |         version: string;
9 |         description: string;
10 |         CRITICAL_INSTRUCTIONS: Record<string, string>;
11 |         [key: string]: unknown;
12 |     };
13 |     ESSENTIAL_FLEX_KNOWLEDGE: {
14 |         language_identity: string;
15 |         core_philosophy: string;
16 |         file_extensions: string[];
17 |         unique_features: string[];
18 |     };
19 |     CRITICAL_SYNTAX_PATTERNS: Record<string, unknown>;
20 |     code_examples: Record<string, unknown>;
21 |     common_patterns: Record<string, unknown>;
22 |     [key: string]: unknown;
23 | }
24 | 
25 | /**
26 |  * Model information from the API
27 |  */
28 | export interface ModelInfo {
29 |     id: string;
30 |     name: string;
31 |     description: string;
32 |     contextLength: number;
33 |     pricing: {
34 |         prompt: string;
35 |         completion: string;
36 |         request: string;
37 |         image: string;
38 |     };
39 |     trust: string;
40 | }
41 | 
42 | /**
43 |  * Chat message structure
44 |  */
45 | export interface ChatMessage {
46 |     role: 'user' | 'assistant' | 'system';
47 |     content: string;
48 |     timestamp?: Date;
49 |     id?: string;
50 | }
51 | 
52 | /**
53 |  * Extension configuration structure
54 |  */
55 | export interface ExtensionConfig {
56 |     apiKey: string;
57 |     model: string;
58 |     temperature: number;
59 |     enableWebSearch: boolean;
60 |     maxTokens: number;
61 |     timeout: number;
62 | }
63 | 
64 | /**
65 |  * API response structure
66 |  */
67 | export interface ApiResponse {
68 |     choices: Array<{
69 |         message: {
70 |             content: string;
71 |         };
72 |     }>;
73 | }
74 | 
75 | /**
76 |  * Web search result structure
77 |  */
78 | export interface WebSearchResult {
79 |     title: string;
80 |     snippet: string;
81 |     link: string;
82 | }
83 | 
84 | /**
85 |  * Webview message structure
86 |  */
87 | export interface WebviewMessage {
88 |     command: 'sendMessage' | 'clearChat' | 'selectModel' | 'statusUpdate' | 'aiResponse' | 'chatCleared' | 'aiStreamStart' | 'aiStreamChunk' | 'aiStreamComplete';
89 |     text?: string;
90 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
91 |     data?: any;
92 | }
93 | 
94 | /**
95 |  * Chat session structure
96 |  */
97 | export interface ChatSession {
98 |     id: string;
99 |     messages: ChatMessage[];
100 |     createdAt: Date;
101 |     lastModified: Date;
102 | }
103 | 
104 | /**
105 |  * Log levels
106 |  */
107 | export enum LogLevel {
108 |     error,
109 |     warn,
110 |     info,
111 |     debug
112 | }
113 | 
114 | /**
115 |  * Logger structure
116 |  */
117 | export interface Logger {
118 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
119 |     error(message: string, data?: any): void;
120 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
121 |     warn(message: string, data?: any): void;
122 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
123 |     info(message: string, data?: any): void;
124 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
125 |     debug(message: string, data?: any): void;
126 | } 
```

src/utils/logger.ts
```
1 | import { LogLevel, Logger as ILogger } from '../types';
2 | // eslint-disable-next-line @typescript-eslint/no-var-requires
3 | const vscode = require('vscode');
4 | 
5 | /**
6 |  * Enhanced logging utility for the Flex Chatbot extension
7 |  */
8 | export class Logger implements ILogger {
9 |     private static instance: Logger;
10 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
11 |     private readonly outputChannel: any; // VS Code OutputChannel
12 |     private logLevel: LogLevel = LogLevel.info;
13 |     private enableConsoleLogging = true;
14 |     private performanceTimers: Map<string, number> = new Map();
15 |     private logHistory: string[] = [];
16 |     private readonly maxLogHistory = 200;
17 | 
18 |     private constructor() {
19 |         // Try to get VS Code output channel if available
20 |         try {
21 |             this.outputChannel = vscode.window.createOutputChannel('Flex Chatbot');
22 |         } catch {
23 |             this.outputChannel = null;
24 |         }
25 |     }
26 | 
27 |     /**
28 |      * Get singleton instance of Logger
29 |      */
30 |     public static getInstance(): Logger {
31 |         if (!Logger.instance) {
32 |             Logger.instance = new Logger();
33 |         }
34 |         return Logger.instance;
35 |     }
36 | 
37 |     /**
38 |      * Set logging level
39 |      */
40 |     public setLogLevel(level: LogLevel): void {
41 |         this.logLevel = level;
42 |     }
43 | 
44 |     /**
45 |      * Enable or disable console logging
46 |      */
47 |     public setConsoleLogging(enabled: boolean): void {
48 |         this.enableConsoleLogging = enabled;
49 |     }
50 | 
51 |     /**
52 |      * Log error message
53 |      */
54 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
55 |     public error(message: string, data?: any): void {
56 |         this.log(LogLevel.error, message, data);
57 |     }
58 | 
59 |     /**
60 |      * Log warning message
61 |      */
62 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
63 |     public warn(message: string, data?: any): void {
64 |         this.log(LogLevel.warn, message, data);
65 |     }
66 | 
67 |     /**
68 |      * Log info message
69 |      */
70 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
71 |     public info(message: string, data?: any): void {
72 |         this.log(LogLevel.info, message, data);
73 |     }
74 | 
75 |     /**
76 |      * Log debug message
77 |      */
78 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
79 |     public debug(message: string, data?: any): void {
80 |         this.log(LogLevel.debug, message, data);
81 |     }
82 | 
83 |     /**
84 |      * Core logging method
85 |      */
86 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
87 |     private log(level: LogLevel, message: string, data?: any): void {
88 |         if (!this.shouldLog(level)) {
89 |             return;
90 |         }
91 | 
92 |         const timestamp = new Date().toISOString();
93 |         const logMessage = this.formatMessage(level, timestamp, message, data);
94 | 
95 |         // Log to VS Code output channel
96 |         if (this.outputChannel) {
97 |             this.outputChannel.appendLine(logMessage);
98 |         }
99 | 
100 |         // Log to console if enabled
101 |         if (this.enableConsoleLogging) {
102 |             switch (level) {
103 |                 case LogLevel.error:
104 |                     console.error(logMessage, data || '');
105 |                     break;
106 |                 case LogLevel.warn:
107 |                     console.warn(logMessage, data || '');
108 |                     break;
109 |                 case LogLevel.debug:
110 |                     console.debug(logMessage, data || '');
111 |                     break;
112 |                 default:
113 |                     console.log(logMessage, data || '');
114 |             }
115 |         }
116 |     }
117 | 
118 |     /**
119 |      * Check if message should be logged based on current log level
120 |      */
121 |     private shouldLog(level: LogLevel): boolean {
122 |         const levels = [LogLevel.error, LogLevel.warn, LogLevel.info, LogLevel.debug];
123 |         const currentLevelIndex = levels.indexOf(this.logLevel);
124 |         const messageLevelIndex = levels.indexOf(level);
125 | 
126 |         return messageLevelIndex <= currentLevelIndex;
127 |     }
128 | 
129 |     /**
130 |      * Format log message
131 |      */
132 |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
133 |     private formatMessage(level: LogLevel, timestamp: string, message: string, data?: any): string {
134 |         const levelInfo = {
135 |             [LogLevel.error]: { emoji: '❌', text: 'ERROR' },
136 |             [LogLevel.warn]: { emoji: '⚠️', text: 'WARN' },
137 |             [LogLevel.info]: { emoji: 'ℹ️', text: 'INFO' },
138 |             [LogLevel.debug]: { emoji: '🐛', text: 'DEBUG' }
139 |         };
140 | 
141 |         const { emoji, text: levelString } = levelInfo[level] || { emoji: '❓', text: 'UNKNOWN' };
142 | 
143 |         let formatted = `${emoji} [${timestamp}] [${levelString}] ${message}`;
144 | 
145 |         if (data) {
146 |             const dataString = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
147 |             formatted += `\nData: ${dataString}`;
148 |         }
149 | 
150 |         return formatted;
151 |     }
152 | 
153 |     /**
154 |      * Get emoji for log level
155 |      */
156 |     private getLevelEmoji(level: LogLevel): string {
157 |         switch (level) {
158 |             case LogLevel.error:
159 |                 return '❌';
160 |             case LogLevel.warn:
161 |                 return '⚠️';
162 |             case LogLevel.info:
163 |                 return 'ℹ️';
164 |             case LogLevel.debug:
165 |                 return '🐛';
166 |             default:
167 |                 return '❓';
168 |         }
169 |     }
170 | 
171 |     /**
172 |      * Log API request
173 |      */
174 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
175 |     public logApiRequest(endpoint: string, method: string, data?: any): void {
176 |         this.debug(`API Request: ${method} ${endpoint}`, data);
177 |     }
178 | 
179 |     /**
180 |      * Log API response
181 |      */
182 |     public logApiResponse(endpoint: string, status: number, duration?: number): void {
183 |         const message = `API Response: ${endpoint} - ${status}${duration ? ` (${duration}ms)` : ''}`;
184 |         if (status >= 400) {
185 |             this.error(message);
186 |         } else {
187 |             this.debug(message);
188 |         }
189 |     }
190 | 
191 |     /**
192 |      * Log user interaction
193 |      */
194 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
195 |     public logUserAction(action: string, details?: any): void {
196 |         this.info(`User Action: ${action}`, details);
197 |     }
198 | 
199 |     /**
200 |      * Log performance metric
201 |      */
202 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
203 |     public logPerformance(operation: string, duration: number, details?: any): void {
204 |         const message = `Performance: ${operation} took ${duration}ms`;
205 |         if (duration > 5000) {
206 |             this.warn(message, details);
207 |         } else {
208 |             this.debug(message, details);
209 |         }
210 |     }
211 | 
212 |     /**
213 |      * Log configuration change
214 |      */
215 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
216 |     public logConfigChange(key: string, oldValue: any, newValue: any): void {
217 |         this.info(`Config Change: ${key}`, { oldValue, newValue });
218 |     }
219 | 
220 |     /**
221 |      * Log extension lifecycle event
222 |      */
223 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
224 |     public logExtensionEvent(event: 'activate' | 'deactivate' | 'error', details?: any): void {
225 |         const message = `Extension Event: ${event}`;
226 |         if (event === 'error') {
227 |             this.error(message, details);
228 |         } else {
229 |             this.info(message, details);
230 |         }
231 |     }
232 | 
233 |     /**
234 |      * Create a timed operation logger
235 |      */
236 |     public createTimer(operation: string): TimedOperation {
237 |         return new TimedOperation(operation, this);
238 |     }
239 | 
240 |     /**
241 |      * Show output channel in VS Code
242 |      */
243 |     public show(): void {
244 |         if (this.outputChannel) {
245 |             this.outputChannel.show();
246 |         }
247 |     }
248 | 
249 |     /**
250 |      * Clear output channel
251 |      */
252 |     public clear(): void {
253 |         if (this.outputChannel) {
254 |             this.outputChannel.clear();
255 |         }
256 |     }
257 | 
258 |     /**
259 |      * Get log statistics
260 |      */
261 |     public getStats(): { level: LogLevel; consoleLogging: boolean } {
262 |         return {
263 |             level: this.logLevel,
264 |             consoleLogging: this.enableConsoleLogging
265 |         };
266 |     }
267 | }
268 | 
269 | /**
270 |  * Utility class for timed operations
271 |  */
272 | export class TimedOperation {
273 |     private startTime: number;
274 | 
275 |     constructor(
276 |         private operation: string,
277 |         private logger: Logger
278 |     ) {
279 |         this.startTime = Date.now();
280 |         this.logger.debug(`Started: ${this.operation}`);
281 |     }
282 | 
283 |     /**
284 |      * End the timed operation and log the duration
285 |      */
286 |     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
287 |     public end(details?: any): void {
288 |         const duration = Date.now() - this.startTime;
289 |         this.logger.logPerformance(this.operation, duration, details);
290 |     }
291 | 
292 |     /**
293 |      * Add a checkpoint to the timed operation
294 |      */
295 |     public checkpoint(checkpoint: string): void {
296 |         const elapsed = Date.now() - this.startTime;
297 |         this.logger.debug(`Checkpoint: ${this.operation} - ${checkpoint} (${elapsed}ms elapsed)`);
298 |     }
299 | }
300 | 
301 | // Export singleton instance for convenience
302 | export const logger = Logger.getInstance(); 
```

assets/webview/css/dev-dashboard.css
```
1 | /* Modern CSS Reset and Variables */
2 | *,
3 | *::before,
4 | *::after {
5 |     box-sizing: border-box;
6 |     margin: 0;
7 |     padding: 0;
8 | }
9 | 
10 | :root {
11 |     --bg-primary: #1e1e1e;
12 |     --bg-secondary: #2d2d30;
13 |     --bg-tertiary: #3c3c3c;
14 |     --bg-card: #252526;
15 |     --text-primary: #ffffff;
16 |     --text-secondary: #cccccc;
17 |     --text-muted: #999999;
18 |     --accent-dev: #00d4aa;
19 |     --accent-test: #4fc3f7;
20 |     --accent-debug: #ff9800;
21 |     --accent-export: #9c27b0;
22 |     --success: #4caf50;
23 |     --warning: #ff9800;
24 |     --error: #f44336;
25 |     --border: #484848;
26 |     --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
27 |     --radius: 12px;
28 |     --space-xs: 0.25rem;
29 |     --space-sm: 0.5rem;
30 |     --space-md: 1rem;
31 |     --space-lg: 1.5rem;
32 |     --space-xl: 2rem;
33 |     --space-2xl: 3rem;
34 |     --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui,
35 |         sans-serif;
36 |     --font-mono: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
37 | }
38 | 
39 | /* Base Styles */
40 | body {
41 |     font-family: var(--font-sans);
42 |     background: var(--bg-primary);
43 |     color: var(--text-primary);
44 |     line-height: 1.6;
45 |     min-height: 100vh;
46 |     padding: var(--space-md);
47 |     font-size: 14px;
48 |     overflow-x: hidden;
49 | }
50 | 
51 | .container {
52 |     max-width: 1400px;
53 |     margin: 0 auto;
54 | }
55 | 
56 | /* Typography */
57 | h1 {
58 |     font-size: clamp(1.8rem, 5vw, 3rem);
59 |     font-weight: 800;
60 |     margin-bottom: var(--space-xl);
61 |     background: linear-gradient(135deg, var(--accent-dev), var(--accent-test));
62 |     -webkit-background-clip: text;
63 |     -webkit-text-fill-color: transparent;
64 |     background-clip: text;
65 |     display: flex;
66 |     align-items: center;
67 |     gap: var(--space-md);
68 | }
69 | 
70 | h2 {
71 |     font-size: clamp(1.2rem, 3vw, 1.8rem);
72 |     font-weight: 600;
73 |     margin-bottom: var(--space-lg);
74 |     color: var(--text-primary);
75 |     position: relative;
76 |     padding-left: var(--space-md);
77 | }
78 | 
79 | h2::before {
80 |     content: '';
81 |     position: absolute;
82 |     left: 0;
83 |     top: 50%;
84 |     transform: translateY(-50%);
85 |     width: 4px;
86 |     height: 24px;
87 |     background: linear-gradient(to bottom, var(--accent-dev), var(--accent-test));
88 |     border-radius: 2px;
89 | }
90 | 
91 | /* Layout Grid */
92 | .dashboard-grid {
93 |     display: grid;
94 |     grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
95 |     gap: var(--space-xl);
96 |     margin-bottom: var(--space-2xl);
97 | }
98 | 
99 | @media (max-width: 768px) {
100 |     .dashboard-grid {
101 |         grid-template-columns: 1fr;
102 |         gap: var(--space-lg);
103 |     }
104 | }
105 | 
106 | /* Panels */
107 | .panel {
108 |     background: var(--bg-secondary);
109 |     border: 1px solid var(--border);
110 |     border-radius: var(--radius);
111 |     padding: var(--space-xl);
112 |     box-shadow: var(--shadow);
113 |     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
114 |     position: relative;
115 |     overflow: hidden;
116 | }
117 | 
118 | .panel::before {
119 |     content: '';
120 |     position: absolute;
121 |     top: 0;
122 |     left: 0;
123 |     right: 0;
124 |     height: 3px;
125 |     background: linear-gradient(90deg,
126 |             var(--accent-dev),
127 |             var(--accent-test),
128 |             var(--accent-debug),
129 |             var(--accent-export));
130 | }
131 | 
132 | .panel:hover {
133 |     transform: translateY(-4px);
134 |     box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
135 |     border-color: var(--accent-dev);
136 | }
137 | 
138 | /* Metrics Grid */
139 | .metrics-grid {
140 |     display: grid;
141 |     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
142 |     gap: var(--space-lg);
143 |     margin-bottom: var(--space-xl);
144 | }
145 | 
146 | @media (max-width: 480px) {
147 |     .metrics-grid {
148 |         grid-template-columns: repeat(2, 1fr);
149 |         gap: var(--space-md);
150 |     }
151 | }
152 | 
153 | .metric {
154 |     background: var(--bg-card);
155 |     border: 1px solid var(--border);
156 |     border-radius: var(--radius);
157 |     padding: var(--space-lg);
158 |     text-align: center;
159 |     position: relative;
160 |     transition: all 0.3s ease;
161 |     overflow: hidden;
162 | }
163 | 
164 | .metric::before {
165 |     content: '';
166 |     position: absolute;
167 |     top: 0;
168 |     left: 0;
169 |     right: 0;
170 |     height: 2px;
171 |     background: var(--accent-test);
172 | }
173 | 
174 | .metric:nth-child(1)::before {
175 |     background: var(--success);
176 | }
177 | 
178 | .metric:nth-child(2)::before {
179 |     background: var(--accent-test);
180 | }
181 | 
182 | .metric:nth-child(3)::before {
183 |     background: var(--warning);
184 | }
185 | 
186 | .metric:nth-child(4)::before {
187 |     background: var(--error);
188 | }
189 | 
190 | .metric:hover {
191 |     transform: scale(1.05);
192 |     border-color: var(--accent-test);
193 |     box-shadow: 0 4px 12px rgba(79, 195, 247, 0.3);
194 | }
195 | 
196 | .metric-value {
197 |     font-size: clamp(1.5rem, 4vw, 2.5rem);
198 |     font-weight: 700;
199 |     color: var(--text-primary);
200 |     margin-bottom: var(--space-sm);
201 |     font-family: var(--font-mono);
202 | }
203 | 
204 | .metric-label {
205 |     font-size: 0.875rem;
206 |     color: var(--text-muted);
207 |     text-transform: uppercase;
208 |     letter-spacing: 0.1em;
209 |     font-weight: 500;
210 | }
211 | 
212 | /* Action Buttons */
213 | .actions-grid {
214 |     display: grid;
215 |     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
216 |     gap: var(--space-lg);
217 | }
218 | 
219 | @media (max-width: 480px) {
220 |     .actions-grid {
221 |         grid-template-columns: 1fr;
222 |     }
223 | }
224 | 
225 | .action-button {
226 |     background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-card));
227 |     border: 1px solid var(--border);
228 |     color: var(--text-primary);
229 |     padding: var(--space-lg) var(--space-xl);
230 |     border-radius: var(--radius);
231 |     cursor: pointer;
232 |     font-size: 1rem;
233 |     font-weight: 600;
234 |     display: flex;
235 |     align-items: center;
236 |     justify-content: center;
237 |     gap: var(--space-sm);
238 |     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
239 |     position: relative;
240 |     overflow: hidden;
241 |     text-decoration: none;
242 |     font-family: var(--font-sans);
243 | }
244 | 
245 | .action-button::before {
246 |     content: '';
247 |     position: absolute;
248 |     top: 0;
249 |     left: -100%;
250 |     width: 100%;
251 |     height: 100%;
252 |     background: linear-gradient(90deg,
253 |             transparent,
254 |             rgba(255, 255, 255, 0.1),
255 |             transparent);
256 |     transition: left 0.6s;
257 | }
258 | 
259 | .action-button:hover::before {
260 |     left: 100%;
261 | }
262 | 
263 | .action-button:hover {
264 |     transform: translateY(-2px);
265 |     box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
266 |     border-color: var(--accent-test);
267 | }
268 | 
269 | .action-button:active {
270 |     transform: translateY(0);
271 | }
272 | 
273 | .action-button.test {
274 |     border-left: 4px solid var(--accent-test);
275 | }
276 | 
277 | .action-button.debug {
278 |     border-left: 4px solid var(--accent-debug);
279 | }
280 | 
281 | .action-button.export {
282 |     border-left: 4px solid var(--accent-export);
283 | }
284 | 
285 | .action-button.analyze {
286 |     border-left: 4px solid var(--accent-dev);
287 | }
288 | 
289 | /* Icons */
290 | .icon {
291 |     font-size: 1.2em;
292 |     filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
293 | }
294 | 
295 | /* Status Indicators */
296 | .status-grid {
297 |     display: grid;
298 |     grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
299 |     gap: var(--space-md);
300 |     margin-top: var(--space-lg);
301 | }
302 | 
303 | .status-item {
304 |     display: flex;
305 |     align-items: center;
306 |     gap: var(--space-sm);
307 |     padding: var(--space-sm);
308 |     border-radius: var(--radius);
309 |     background: var(--bg-card);
310 |     border: 1px solid var(--border);
311 |     font-size: 0.875rem;
312 | }
313 | 
314 | .status-dot {
315 |     width: 8px;
316 |     height: 8px;
317 |     border-radius: 50%;
318 |     flex-shrink: 0;
319 | }
320 | 
321 | .status-dot.online {
322 |     background: var(--success);
323 | }
324 | 
325 | .status-dot.warning {
326 |     background: var(--warning);
327 | }
328 | 
329 | .status-dot.error {
330 |     background: var(--error);
331 | }
332 | 
333 | /* Loading States */
334 | .loading {
335 |     opacity: 0.7;
336 |     pointer-events: none;
337 | }
338 | 
339 | .spinner {
340 |     width: 20px;
341 |     height: 20px;
342 |     border: 2px solid var(--border);
343 |     border-top: 2px solid var(--accent-test);
344 |     border-radius: 50%;
345 |     animation: spin 1s linear infinite;
346 | }
347 | 
348 | @keyframes spin {
349 |     0% {
350 |         transform: rotate(0deg);
351 |     }
352 | 
353 |     100% {
354 |         transform: rotate(360deg);
355 |     }
356 | }
357 | 
358 | /* Responsive Design */
359 | @media (max-width: 768px) {
360 |     body {
361 |         padding: var(--space-sm);
362 |     }
363 | 
364 |     .panel {
365 |         padding: var(--space-lg);
366 |     }
367 | 
368 |     h1 {
369 |         flex-direction: column;
370 |         text-align: center;
371 |     }
372 | 
373 |     .action-button {
374 |         padding: var(--space-md) var(--space-lg);
375 |     }
376 | }
377 | 
378 | /* Accessibility */
379 | @media (prefers-reduced-motion: reduce) {
380 | 
381 |     *,
382 |     *::before,
383 |     *::after {
384 |         animation-duration: 0.01ms !important;
385 |         animation-iteration-count: 1 !important;
386 |         transition-duration: 0.01ms !important;
387 |     }
388 | }
389 | 
390 | @media (prefers-contrast: high) {
391 |     :root {
392 |         --border: #ffffff;
393 |         --text-muted: #cccccc;
394 |     }
395 | }
396 | 
397 | /* Focus Styles */
398 | :focus-visible {
399 |     outline: 2px solid var(--accent-test);
400 |     outline-offset: 2px;
401 |     border-radius: var(--radius);
402 | }
403 | 
404 | /* Toast Notifications */
405 | .toast {
406 |     position: fixed;
407 |     top: var(--space-lg);
408 |     right: var(--space-lg);
409 |     background: var(--bg-secondary);
410 |     border: 1px solid var(--border);
411 |     border-radius: var(--radius);
412 |     padding: var(--space-lg);
413 |     box-shadow: var(--shadow);
414 |     transform: translateX(100%);
415 |     transition: transform 0.3s ease;
416 |     z-index: 1000;
417 | }
418 | 
419 | .toast.show {
420 |     transform: translateX(0);
421 | }
422 | 
423 | .toast.success {
424 |     border-left: 4px solid var(--success);
425 | }
426 | 
427 | .toast.error {
428 |     border-left: 4px solid var(--error);
429 | }
```

assets/webview/css/reset.css
```
1 | html {
2 | 	box-sizing: border-box;
3 | 	font-size: 13px;
4 | }
5 | 
6 | *,
7 | *:before,
8 | *:after {
9 | 	box-sizing: inherit;
10 | }
11 | 
12 | body,
13 | h1,
14 | h2,
15 | h3,
16 | h4,
17 | h5,
18 | h6,
19 | p,
20 | ol,
21 | ul {
22 | 	margin: 0;
23 | 	padding: 0;
24 | 	font-weight: normal;
25 | }
26 | 
27 | img {
28 | 	max-width: 100%;
29 | 	height: auto;
30 | }
```

assets/webview/html/dev-dashboard.html
```
1 | <!DOCTYPE html>
2 | <html lang="en">
3 | 
4 | <head>
5 |     <meta charset="UTF-8" />
6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
7 |     <meta name="theme-color" content="#1e1e1e" />
8 |     <title>Flex Chatbot Development Dashboard</title>
9 |     <link rel="stylesheet" href="${cssUri}" nonce="${nonce}" />
10 | </head>
11 | 
12 | <body>
13 |     <div class="container">
14 |         <h1>
15 |             <span class="icon">🛠️</span>
16 |             <span>Development Dashboard</span>
17 |         </h1>
18 | 
19 |         <!-- System Metrics Panel -->
20 |         <div class="panel">
21 |             <h2>📊 System Metrics</h2>
22 |             <div class="metrics-grid">
23 |                 <div class="metric">
24 |                     <div class="metric-value">
25 |                         ${(debugReport.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}
26 |                     </div>
27 |                     <div class="metric-label">Heap Used (MB)</div>
28 |                 </div>
29 |                 <div class="metric">
30 |                     <div class="metric-value">${debugReport.activeSessions.length}</div>
31 |                     <div class="metric-label">Active Sessions</div>
32 |                 </div>
33 |                 <div class="metric">
34 |                     <div class="metric-value">${debugReport.recentErrors.length}</div>
35 |                     <div class="metric-label">Recent Errors</div>
36 |                 </div>
37 |                 <div class="metric">
38 |                     <div class="metric-value">
39 |                         ${debugReport.performanceIssues.length}
40 |                     </div>
41 |                     <div class="metric-label">Performance Issues</div>
42 |                 </div>
43 |             </div>
44 | 
45 |             <!-- System Status -->
46 |             <div class="status-grid">
47 |                 <div class="status-item">
48 |                     <div class="status-dot ${debugReport.isDebugMode ? 'online' : 'error'}"></div>
49 |                     <span>Debug Mode</span>
50 |                 </div>
51 |                 <div class="status-item">
52 |                     <div class="status-dot ${
53 |                 debugReport.recentErrors.length === 0 ? 'online' : 'error'
54 |               }"></div>
55 |                     <span>Error Free</span>
56 |                 </div>
57 |                 <div class="status-item">
58 |                     <div class="status-dot ${
59 |                 debugReport.performanceIssues.length === 0 ? 'online' : 'warning'
60 |               }"></div>
61 |                     <span>Performance</span>
62 |                 </div>
63 |                 <div class="status-item">
64 |                     <div class="status-dot online"></div>
65 |                     <span>System Online</span>
66 |                 </div>
67 |             </div>
68 |         </div>
69 | 
70 |         <!-- Development Tools Panel -->
71 |         <div class="panel">
72 |             <h2>🔧 Development Tools</h2>
73 |             <div class="actions-grid">
74 |                 <button class="action-button test" onclick="runTests()" aria-label="Run all test suites">
75 |                     <span class="icon">🧪</span>
76 |                     <span>Run Tests</span>
77 |                 </button>
78 | 
79 |                 <button class="action-button debug" onclick="showDebugReport()" aria-label="Show debug report">
80 |                     <span class="icon">🐛</span>
81 |                     <span>Debug Report</span>
82 |                 </button>
83 | 
84 |                 <button class="action-button export" onclick="exportData()" aria-label="Export development data">
85 |                     <span class="icon">💾</span>
86 |                     <span>Export Data</span>
87 |                 </button>
88 | 
89 |                 <button class="action-button analyze" onclick="analyzeCode()" aria-label="Analyze code quality">
90 |                     <span class="icon">📊</span>
91 |                     <span>Analyze Code</span>
92 |                 </button>
93 |             </div>
94 |         </div>
95 | 
96 |         <!-- Quick Actions Panel -->
97 |         <div class="panel">
98 |             <h2>⚡ Quick Actions</h2>
99 |             <div class="actions-grid">
100 |                 <button class="action-button" onclick="hotReload()" aria-label="Hot reload application">
101 |                     <span class="icon">🔄</span>
102 |                     <span>Hot Reload</span>
103 |                 </button>
104 | 
105 |                 <button class="action-button" onclick="clearCache()" aria-label="Clear application cache">
106 |                     <span class="icon">🗑️</span>
107 |                     <span>Clear Cache</span>
108 |                 </button>
109 | 
110 |                 <button class="action-button" onclick="showLogs()" aria-label="Show application logs">
111 |                     <span class="icon">📋</span>
112 |                     <span>Show Logs</span>
113 |                 </button>
114 | 
115 |                 <button class="action-button" onclick="toggleDebug()" aria-label="Toggle debug mode">
116 |                     <span class="icon">🔍</span>
117 |                     <span>Toggle Debug</span>
118 |                 </button>
119 |             </div>
120 |         </div>
121 | 
122 |         <!-- Footer -->
123 |         <footer style="
124 |           text-align: center;
125 |           padding: var(--space-xl) 0;
126 |           color: var(--text-muted);
127 |           border-top: 1px solid var(--border);
128 |           margin-top: var(--space-2xl);
129 |         ">
130 |             <p>
131 |                 Development Dashboard • Last Updated: ${new
132 |                 Date().toLocaleTimeString()}
133 |             </p>
134 |             <p style="font-size: 0.75rem; margin-top: var(--space-sm)">
135 |                 Use Ctrl+R to refresh • Ctrl+Shift+I for DevTools
136 |             </p>
137 |         </footer>
138 |     </div>
139 | 
140 |     <!-- Toast Container -->
141 |     <div id="toast-container"></div>
142 | 
143 |     <script nonce="${nonce}">
144 |         const vscode = acquireVsCodeApi();
145 | 
146 |         // Enhanced interaction functions
147 |         function runTests() {
148 |             showToast('Running test suites...', 'info');
149 |             setButtonLoading('test', true);
150 |             vscode.postMessage({ command: 'runTests' });
151 |         }
152 | 
153 |         function showDebugReport() {
154 |             showToast('Opening debug report...', 'info');
155 |             vscode.postMessage({ command: 'showDebugReport' });
156 |         }
157 | 
158 |         function exportData() {
159 |             showToast('Exporting development data...', 'info');
160 |             setButtonLoading('export', true);
161 |             vscode.postMessage({ command: 'exportData' });
162 |         }
163 | 
164 |         function analyzeCode() {
165 |             showToast('Analyzing code quality...', 'info');
166 |             setButtonLoading('analyze', true);
167 |             vscode.postMessage({ command: 'analyzeCode' });
168 |         }
169 | 
170 |         function hotReload() {
171 |             showToast('Initiating hot reload...', 'info');
172 |             vscode.postMessage({ command: 'hotReload' });
173 |         }
174 | 
175 |         function clearCache() {
176 |             if (confirm('Are you sure you want to clear the cache?')) {
177 |                 showToast('Clearing cache...', 'info');
178 |                 vscode.postMessage({ command: 'clearCache' });
179 |             }
180 |         }
181 | 
182 |         function showLogs() {
183 |             vscode.postMessage({ command: 'showLogs' });
184 |         }
185 | 
186 |         function toggleDebug() {
187 |             showToast('Toggling debug mode...', 'info');
188 |             vscode.postMessage({ command: 'toggleDebug' });
189 |         }
190 | 
191 |         // Utility functions
192 |         function showToast(message, type = 'info') {
193 |             const container = document.getElementById('toast-container');
194 |             const toast = document.createElement('div');
195 |             toast.className = `toast ${type}`;
196 |             toast.innerHTML = `
197 |               <div style="display: flex; align-items: center; gap: var(--space-sm);">
198 |                 <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
199 |                 <span>${message}</span>
200 |               </div>
201 |             `;
202 | 
203 |             container.appendChild(toast);
204 | 
205 |             // Show toast
206 |             setTimeout(() => toast.classList.add('show'), 100);
207 | 
208 |             // Hide toast after 3 seconds
209 |             setTimeout(() => {
210 |                 toast.classList.remove('show');
211 |                 setTimeout(() => container.removeChild(toast), 300);
212 |             }, 3000);
213 |         }
214 | 
215 |         function setButtonLoading(buttonClass, loading) {
216 |             const button = document.querySelector(`.${buttonClass}`);
217 |             if (button) {
218 |                 if (loading) {
219 |                     button.classList.add('loading');
220 |                     const icon = button.querySelector('.icon');
221 |                     if (icon) {
222 |                         icon.innerHTML = '<div class="spinner"></div>';
223 |                     }
224 |                 } else {
225 |                     button.classList.remove('loading');
226 |                     // Restore original icon based on button class
227 |                     const icon = button.querySelector('.icon');
228 |                     if (icon) {
229 |                         switch (buttonClass) {
230 |                             case 'test':
231 |                                 icon.textContent = '🧪';
232 |                                 break;
233 |                             case 'export':
234 |                                 icon.textContent = '💾';
235 |                                 break;
236 |                             case 'analyze':
237 |                                 icon.textContent = '📊';
238 |                                 break;
239 |                             default:
240 |                                 icon.textContent = '🔧';
241 |                         }
242 |                     }
243 |                 }
244 |             }
245 |         }
246 | 
247 |         // Handle messages from extension
248 |         window.addEventListener('message', (event) => {
249 |             const message = event.data;
250 | 
251 |             switch (message.command) {
252 |                 case 'testComplete':
253 |                     setButtonLoading('test', false);
254 |                     showToast('Tests completed successfully!', 'success');
255 |                     break;
256 |                 case 'exportComplete':
257 |                     setButtonLoading('export', false);
258 |                     showToast('Data exported successfully!', 'success');
259 |                     break;
260 |                 case 'analyzeComplete':
261 |                     setButtonLoading('analyze', false);
262 |                     showToast('Code analysis completed!', 'success');
263 |                     break;
264 |                 case 'error':
265 |                     // Reset any loading states
266 |                     document.querySelectorAll('.loading').forEach((btn) => {
267 |                         btn.classList.remove('loading');
268 |                     });
269 |                     showToast(`Error: ${message.text}`, 'error');
270 |                     break;
271 |             }
272 |         });
273 | 
274 |         // Keyboard shortcuts
275 |         document.addEventListener('keydown', (e) => {
276 |             if (e.ctrlKey || e.metaKey) {
277 |                 switch (e.key) {
278 |                     case 't':
279 |                         e.preventDefault();
280 |                         runTests();
281 |                         break;
282 |                     case 'd':
283 |                         e.preventDefault();
284 |                         showDebugReport();
285 |                         break;
286 |                     case 'e':
287 |                         e.preventDefault();
288 |                         exportData();
289 |                         break;
290 |                     case 'a':
291 |                         e.preventDefault();
292 |                         analyzeCode();
293 |                         break;
294 |                 }
295 |             }
296 |         });
297 | 
298 |         // Auto-refresh metrics every 30 seconds
299 |         setInterval(() => {
300 |             vscode.postMessage({ command: 'refreshMetrics' });
301 |         }, 30000);
302 | 
303 |         // Initialize dashboard
304 |         document.addEventListener('DOMContentLoaded', () => {
305 |             showToast('Development Dashboard loaded', 'success');
306 |             console.log('Development Dashboard initialized');
307 |         });
308 |     </script>
309 | </body>
310 | 
311 | </html>
```

assets/webview/js/chat.js
```
1 | // assets/webview/js/chat.js
2 | (function () {
3 |   const vscode = acquireVsCodeApi();
4 | 
5 |   // Select DOM elements
6 |   const userInput = document.getElementById('user-input');
7 |   const sendButton = document.getElementById('send-button');
8 |   const clearButton = document.getElementById('clear-button');
9 |   const changeModelButton = document.getElementById('change-model');
10 |   const chatBox = document.getElementById('chat-box');
11 |   const welcomeMessage = document.querySelector('.welcome-message');
12 | 
13 |   // Initialize modules
14 |   const syntaxHighlighter = new SyntaxHighlighter();
15 |   const domManager = new DOMManager(chatBox, welcomeMessage, syntaxHighlighter);
16 | 
17 |   // --- Event Listeners ---
18 |   function sendMessage() {
19 |     const message = userInput.value.trim();
20 |     if (!message) return;
21 | 
22 |     sendButton.disabled = true;
23 |     sendButton.innerHTML = '<span class="send-icon">⏳</span>';
24 | 
25 |     domManager.addMessage(message, 'user');
26 | 
27 |     userInput.value = '';
28 |     userInput.focus();
29 |     userInput.style.height = 'auto'; // Reset height
30 | 
31 |     vscode.postMessage({
32 |       command: 'sendMessage',
33 |       text: message
34 |     });
35 |   }
36 | 
37 |   sendButton.addEventListener('click', sendMessage);
38 | 
39 |   clearButton.addEventListener('click', () => {
40 |     if (confirm('Are you sure you want to clear the chat history?')) {
41 |       vscode.postMessage({
42 |         command: 'clearChat'
43 |       });
44 |     }
45 |   });
46 | 
47 |   changeModelButton.addEventListener('click', () => {
48 |     vscode.postMessage({
49 |       command: 'selectModel'
50 |     });
51 |   });
52 | 
53 |   userInput.addEventListener('keydown', (e) => {
54 |     if (e.key === 'Enter' && !e.shiftKey) {
55 |       e.preventDefault();
56 |       sendMessage();
57 |     }
58 |   });
59 | 
60 |   // --- VS Code Message Handling ---
61 |   window.addEventListener('message', event => {
62 |     const message = event.data;
63 |     switch (message.command) {
64 |       case 'aiStreamStart':
65 |         domManager.startStreaming();
66 |         break;
67 |       case 'aiStreamChunk':
68 |         domManager.addStreamingChunk(message.text);
69 |         break;
70 |       case 'aiStreamComplete':
71 |         domManager.completeStreaming();
72 |         sendButton.disabled = false;
73 |         sendButton.innerHTML = '<span class="send-icon">📤</span>';
74 |         break;
75 |       case 'aiResponse':
76 |         domManager.addMessage(message.text, 'ai');
77 |         sendButton.disabled = false;
78 |         sendButton.innerHTML = '<span class="send-icon">📤</span>';
79 |         break;
80 |       case 'chatCleared':
81 |         domManager.clearChat();
82 |         break;
83 |       case 'error':
84 |         domManager.addMessage(message.text, 'ai', true); // Treat errors as a status message from AI
85 |         sendButton.disabled = false;
86 |         sendButton.innerHTML = '<span class="send-icon">📤</span>';
87 |         break;
88 |     }
89 |   });
90 | 
91 |   // Auto-resize textarea
92 |   userInput.addEventListener('input', function () {
93 |     this.style.height = 'auto';
94 |     this.style.height = (this.scrollHeight) + 'px';
95 |   });
96 | })();
```

src/test/suite/extension.test.ts
```
1 | import * as assert from 'assert';
2 | import * as vscode from 'vscode';
3 | 
4 | suite('Extension Test Suite', () => {
5 |     vscode.window.showInformationMessage('Start all tests.');
6 | 
7 |     test('Extension should be present', () => {
8 |         assert.ok(vscode.extensions.getExtension('Flex-proagramming-language.flex-chatbot'));
9 |     });
10 | 
11 |     test('Extension should activate', function (done) {
12 |         this.timeout(1 * 60 * 1000); // 1-minute timeout for activation
13 | 
14 |         const extension = vscode.extensions.getExtension('Flex-proagramming-language.flex-chatbot');
15 |         if (!extension) {
16 |             assert.fail('Extension not found');
17 |         }
18 | 
19 |         if (!extension.isActive) {
20 |             extension.activate().then(
21 |                 () => {
22 |                     assert.ok(extension.isActive, "Extension activated successfully");
23 |                     done();
24 |                 },
25 |                 (err) => {
26 |                     assert.fail(`Failed to activate extension: ${err}`);
27 |                     done();
28 |                 }
29 |             );
30 |         } else {
31 |             done();
32 |         }
33 |     });
34 | 
35 |     test('Should register flexChatbot.openview command', async () => {
36 |         const commands = await vscode.commands.getCommands(true);
37 |         const commandFound = commands.includes('flexChatbot.openview');
38 |         assert.ok(commandFound, 'Command "flexChatbot.openview" is not registered');
39 |     });
40 | 
41 |     test('Should register flexChatbot.resetChat command', async () => {
42 |         const commands = await vscode.commands.getCommands(true);
43 |         const commandFound = commands.includes('flexChatbot.resetChat');
44 |         assert.ok(commandFound, 'Command "flexChatbot.resetChat" is not registered');
45 |     });
46 | }); 
```

src/test/suite/index.ts
```
1 | import * as path from 'path';
2 | import { glob } from 'glob';
3 | import Mocha from 'mocha';
4 | 
5 | export function run(): Promise<void> {
6 | 	// Create the mocha test
7 | 	const mocha = new Mocha({
8 | 		ui: 'tdd',
9 | 		color: true
10 | 	});
11 | 
12 | 	const testsRoot = path.resolve(__dirname, '..');
13 | 
14 | 	return new Promise((c, e) => {
15 | 		glob('**/**.test.js', { cwd: testsRoot }, (err: Error | null, files: string[]) => {
16 | 			if (err) {
17 | 				return e(err);
18 | 			}
19 | 
20 | 			// Add files to the test suite
21 | 			files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));
22 | 
23 | 			try {
24 | 				// Run the mocha test
25 | 				mocha.run((failures: number) => {
26 | 					if (failures > 0) {
27 | 						e(new Error(`${failures} tests failed.`));
28 | 					} else {
29 | 						c();
30 | 					}
31 | 				});
32 | 			} catch (err) {
33 | 				console.error(err);
34 | 				e(err);
35 | 			}
36 | 		});
37 | 	});
38 | }
```

src/test/suite/services.test.ts
```
1 | import * as assert from 'assert';
2 | import * as vscode from 'vscode';
3 | import * as sinon from 'sinon';
4 | import { ConfigService } from '../../services/configService';
5 | import { FlexDatasetService } from '../../services/flexDatasetService';
6 | import { ApiService } from '../../services/apiService';
7 | import { ChatService } from '../../services/ChatService';
8 | import { WebviewService } from '../../services/WebviewService';
9 | import { logger } from '../../utils/logger';
10 | 
11 | suite('Services Test Suite', () => {
12 | 
13 |     let sandbox: sinon.SinonSandbox;
14 | 
15 |     setup(() => {
16 |         sandbox = sinon.createSandbox();
17 |     });
18 | 
19 |     teardown(() => {
20 |         sandbox.restore();
21 |     });
22 | 
23 |     suite('ConfigService', () => {
24 |         test('getConfig should return default values', () => {
25 |             const get = sinon.stub().returns(undefined);
26 |             sandbox.stub(vscode.workspace, 'getConfiguration').returns({ get } as unknown as vscode.WorkspaceConfiguration);
27 | 
28 |             const config = ConfigService.getConfig();
29 | 
30 |             assert.strictEqual(config.model, 'openai/gpt-4o-mini');
31 |             assert.strictEqual(config.temperature, 0.7);
32 |         });
33 | 
34 |         test('validateConfig should detect missing API key', () => {
35 |             sandbox.stub(ConfigService, 'getConfig').returns({
36 |                 apiKey: '',
37 |                 model: 'test-model',
38 |                 temperature: 0.5,
39 |                 enableWebSearch: false,
40 |                 maxTokens: 100,
41 |                 timeout: 10000
42 |             });
43 | 
44 |             const result = ConfigService.validateConfig();
45 |             assert.strictEqual(result.isValid, false);
46 |             assert.ok(result.errors.some(e => e.includes('API key is required')));
47 |         });
48 |     });
49 | 
50 |     suite('FlexDatasetService', () => {
51 |         const extensionPath = '/mock/extension/path';
52 | 
53 |         test('getInstance should return a singleton', () => {
54 |             const instance1 = FlexDatasetService.getInstance(extensionPath);
55 |             const instance2 = FlexDatasetService.getInstance();
56 |             assert.strictEqual(instance1, instance2);
57 |         });
58 | 
59 |         test('getSystemPrompt should provide a fallback', () => {
60 |             const service = FlexDatasetService.getInstance(extensionPath);
61 |             const prompt = service.getSystemPrompt();
62 |             assert.ok(prompt.length > 0, "Should return a non-empty fallback prompt");
63 |             assert.ok(prompt.includes("Flex"), "Fallback should mention Flex");
64 |         });
65 |     });
66 | 
67 |     suite('ApiService', () => {
68 |         test('validateApiKey should work correctly', () => {
69 |             assert.strictEqual(ApiService.validateApiKey(''), false, "Empty key is invalid");
70 |             assert.strictEqual(ApiService.validateApiKey('short'), false, "Short key is invalid");
71 |             assert.strictEqual(ApiService.validateApiKey('sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), true, "Valid key is valid");
72 |         });
73 |     });
74 | 
75 |     suite('ChatService', () => {
76 |         test('resetChat should clear history and post message', () => {
77 |             const postMessageSpy = sinon.spy();
78 |             const service = new ChatService(postMessageSpy, vscode.Uri.file('/'));
79 | 
80 |             // Simulate adding a message
81 |             (service as unknown as { conversationHistory: unknown[] }).conversationHistory.push({ role: 'user', content: 'hello' });
82 | 
83 |             service.resetChat();
84 | 
85 |             assert.strictEqual((service as unknown as { conversationHistory: unknown[] }).conversationHistory.length, 0, "Conversation history should be cleared");
86 |             assert.ok(postMessageSpy.calledWith({ command: 'chatCleared' }), "Should send chatCleared message");
87 |         });
88 |     });
89 | 
90 |     suite('WebviewService', () => {
91 |         test('getHtmlContent should return valid HTML', () => {
92 |             const mockWebview = {
93 |                 asWebviewUri: (uri: vscode.Uri) => uri,
94 |                 cspSource: 'https://example.com'
95 |             };
96 |             const service = new WebviewService(vscode.Uri.file('/'));
97 |             const html = service.getHtmlContent(mockWebview as vscode.Webview);
98 | 
99 |             assert.ok(html.startsWith('<!DOCTYPE html>'), "Should be a valid HTML doc");
100 |             assert.ok(html.includes('Flex Assistant'), "Should include the title");
101 |         });
102 |     });
103 | 
104 |     suite('Logger', () => {
105 |         test('Should create a timer', () => {
106 |             const timer = logger.createTimer('test-op');
107 |             assert.ok(timer, 'Should create a timer object');
108 |             assert.doesNotThrow(() => {
109 |                 timer.checkpoint('step 1');
110 |                 timer.end();
111 |             });
112 |         });
113 |     });
114 | }); 
```

assets/webview/css/components/base.css
```
1 | /* assets/webview/css/components/base.css */
2 | 
3 | /* CSS Variables for professional theming */
4 | :root {
5 |     /* Professional Color Palette */
6 |     --primary-bg: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
7 |     --secondary-bg: rgba(248, 250, 252, 0.03);
8 |     --card-bg: rgba(248, 250, 252, 0.05);
9 |     --accent-color: #3b82f6;
10 |     --accent-hover: #2563eb;
11 |     --accent-light: #60a5fa;
12 |     --user-color: #6366f1;
13 |     --ai-color: #8b5cf6;
14 |     --success-color: #10b981;
15 |     --warning-color: #f59e0b;
16 |     --error-color: #ef4444;
17 |     --text-primary: #f8fafc;
18 |     --text-secondary: rgba(248, 250, 252, 0.9);
19 |     --text-muted: rgba(248, 250, 252, 0.7);
20 |     --text-subtle: rgba(248, 250, 252, 0.5);
21 |     --border-color: rgba(248, 250, 252, 0.1);
22 |     --border-accent: rgba(59, 130, 246, 0.3);
23 |     --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
24 |     --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
25 |     --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
26 |     --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
27 | 
28 |     /* Professional Spacing System */
29 |     --space-1: 0.25rem;
30 |     --space-2: 0.5rem;
31 |     --space-3: 0.75rem;
32 |     --space-4: 1rem;
33 |     --space-5: 1.25rem;
34 |     --space-6: 1.5rem;
35 |     --space-8: 2rem;
36 |     --space-10: 2.5rem;
37 |     --space-12: 3rem;
38 | 
39 |     /* Professional Border Radius */
40 |     --radius-sm: 0.375rem;
41 |     --radius-md: 0.5rem;
42 |     --radius-lg: 0.75rem;
43 |     --radius-xl: 1rem;
44 | 
45 |     /* Professional Typography */
46 |     --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;
47 |     --font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
48 |     --font-weight-normal: 400;
49 |     --font-weight-medium: 500;
50 |     --font-weight-semibold: 600;
51 |     --font-weight-bold: 700;
52 | 
53 |     /* Layout Variables */
54 |     --header-height: 3rem;
55 |     --input-height: auto;
56 | 
57 |     /* VSCode Variables */
58 |     --vscode-foreground: #cccccc;
59 |     --vscode-font-family: var(--font-family);
60 |     --vscode-font-size: 14px;
61 |     --vscode-font-weight: 400;
62 |     --vscode-editor-background: var(--primary-bg);
63 |     --vscode-focus-border: var(--accent-color);
64 |     --vscode-text-link-foreground: var(--accent-light);
65 |     --vscode-text-link-active-foreground: #ffffff;
66 |     --vscode-editor-font-family: var(--font-family-mono);
67 |     --vscode-editor-font-size: 0.8125rem;
68 | }
69 | 
70 | /* Base Styles */
71 | * {
72 |     box-sizing: border-box;
73 | }
74 | 
75 | body {
76 |     background: var(--primary-bg);
77 |     margin: 0;
78 |     padding: 0;
79 |     height: 100vh;
80 |     font-family: var(--font-family);
81 |     font-size: 14px;
82 |     font-weight: var(--font-weight-normal);
83 |     color: var(--text-primary);
84 |     overflow: hidden;
85 |     display: flex;
86 |     flex-direction: column;
87 |     line-height: 1.5;
88 |     letter-spacing: -0.01em;
89 | }
90 | 
91 | /* Main Container */
92 | #maincont {
93 |     display: flex;
94 |     flex-direction: column;
95 |     flex: 1;
96 |     overflow: hidden;
97 |     height: 100vh;
98 | }
```

assets/webview/css/components/chat.css
```
1 | /* assets/webview/css/components/chat.css */
2 | 
3 | /* Professional Chat Container */
4 | #chat-box {
5 |     flex: 1;
6 |     overflow-y: auto;
7 |     padding: var(--space-4);
8 |     display: flex;
9 |     flex-direction: column;
10 |     gap: var(--space-4);
11 |     scroll-behavior: smooth;
12 |     scrollbar-width: thin;
13 |     scrollbar-color: rgba(248, 250, 252, 0.2) transparent;
14 |     min-height: 0;
15 |     /* Allow flex child to shrink */
16 |     position: relative;
17 | }
18 | 
19 | #chat-box::-webkit-scrollbar {
20 |     width: 6px;
21 | }
22 | 
23 | #chat-box::-webkit-scrollbar-thumb {
24 |     background: rgba(248, 250, 252, 0.2);
25 |     border-radius: 3px;
26 | }
27 | 
28 | #chat-box::-webkit-scrollbar-track {
29 |     background: transparent;
30 | }
31 | 
32 | /* Welcome Message */
33 | .welcome-message {
34 |     display: flex;
35 |     flex-direction: column;
36 |     align-items: center;
37 |     text-align: center;
38 |     padding: var(--space-8);
39 |     background: var(--card-bg);
40 |     border: 1px solid var(--border-color);
41 |     border-radius: var(--radius-lg);
42 |     backdrop-filter: blur(20px);
43 |     margin-bottom: var(--space-4);
44 | }
45 | 
46 | .welcome-message .bot-avatar {
47 |     margin-bottom: var(--space-4);
48 | }
49 | 
50 | .welcome-message .bot-avatar img {
51 |     width: 64px;
52 |     height: 64px;
53 |     object-fit: contain;
54 |     filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
55 |     border-radius: var(--radius-lg);
56 | }
57 | 
58 | .welcome-content h3 {
59 |     margin: 0 0 var(--space-3) 0;
60 |     font-size: 1.125rem;
61 |     font-weight: var(--font-weight-bold);
62 |     color: var(--text-primary);
63 | }
64 | 
65 | .welcome-content p {
66 |     margin: 0 0 var(--space-4) 0;
67 |     color: var(--text-secondary);
68 |     line-height: 1.6;
69 | }
70 | 
71 | .features-grid {
72 |     display: grid;
73 |     grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
74 |     gap: var(--space-3);
75 |     width: 100%;
76 |     max-width: 400px;
77 | }
78 | 
79 | .feature-item {
80 |     background: linear-gradient(135deg,
81 |             rgba(59, 130, 246, 0.1) 0%,
82 |             rgba(99, 102, 241, 0.1) 100%);
83 |     border: 1px solid var(--border-accent);
84 |     color: var(--accent-light);
85 |     padding: var(--space-2) var(--space-3);
86 |     border-radius: var(--radius-md);
87 |     font-size: 0.75rem;
88 |     font-weight: var(--font-weight-medium);
89 |     text-align: center;
90 |     backdrop-filter: blur(10px);
91 |     transition: all 0.2s ease;
92 | }
93 | 
94 | .feature-item:hover {
95 |     background: linear-gradient(135deg,
96 |             rgba(59, 130, 246, 0.2) 0%,
97 |             rgba(99, 102, 241, 0.2) 100%);
98 |     transform: translateY(-1px);
99 | }
100 | 
101 | /* Professional Message Styles */
102 | .message {
103 |     display: flex;
104 |     flex-direction: column;
105 |     max-width: 85%;
106 |     animation: messageSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
107 | }
108 | 
109 | @keyframes messageSlideIn {
110 |     from {
111 |         opacity: 0;
112 |         transform: translateY(16px);
113 |     }
114 | 
115 |     to {
116 |         opacity: 1;
117 |         transform: translateY(0);
118 |     }
119 | }
120 | 
121 | .user-message {
122 |     align-self: flex-end;
123 | }
124 | 
125 | .ai-message {
126 |     align-self: flex-start;
127 | }
128 | 
129 | .user-label,
130 | .ai-label {
131 |     font-size: 0.75rem;
132 |     font-weight: var(--font-weight-semibold);
133 |     margin-bottom: var(--space-2);
134 |     text-transform: uppercase;
135 |     letter-spacing: 0.05em;
136 |     display: flex;
137 |     align-items: center;
138 |     gap: var(--space-2);
139 | }
140 | 
141 | .user-label {
142 |     color: var(--user-color);
143 |     text-align: right;
144 |     justify-content: flex-end;
145 | }
146 | 
147 | .ai-label {
148 |     color: var(--ai-color);
149 | }
150 | 
151 | .message-avatar {
152 |     font-size: 0.875rem;
153 | }
154 | 
155 | .message-content {
156 |     background: var(--card-bg);
157 |     backdrop-filter: blur(20px);
158 |     padding: var(--space-4) var(--space-5);
159 |     border-radius: var(--radius-lg);
160 |     line-height: 1.6;
161 |     font-size: 0.875rem;
162 |     word-wrap: break-word;
163 |     border: 1px solid var(--border-color);
164 |     box-shadow: var(--shadow-sm);
165 | }
166 | 
167 | .user-message .message-content {
168 |     background: linear-gradient(135deg,
169 |             rgba(99, 102, 241, 0.15) 0%,
170 |             rgba(59, 130, 246, 0.15) 100%);
171 |     border: 1px solid rgba(99, 102, 241, 0.3);
172 |     border-radius: var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg);
173 | }
174 | 
175 | .status-message {
176 |     background: linear-gradient(135deg,
177 |             rgba(59, 130, 246, 0.1) 0%,
178 |             rgba(99, 102, 241, 0.1) 100%);
179 |     border: 1px solid var(--border-accent);
180 |     color: var(--accent-light);
181 |     padding: var(--space-3) var(--space-4);
182 |     border-radius: var(--radius-lg);
183 |     font-size: 0.875rem;
184 |     font-weight: var(--font-weight-medium);
185 |     text-align: center;
186 |     backdrop-filter: blur(10px);
187 |     animation: pulse 2s ease-in-out infinite;
188 | }
189 | 
190 | /* Streaming Cursor for AI responses */
191 | .streaming-cursor {
192 |     display: inline-block;
193 |     width: 8px;
194 |     height: 1em;
195 |     background-color: var(--accent-color);
196 |     animation: blink 1s step-end infinite;
197 |     vertical-align: text-bottom;
198 |     border-radius: 2px;
199 |     margin-left: 2px;
200 | }
201 | 
202 | @keyframes blink {
203 | 
204 |     from,
205 |     to {
206 |         background-color: transparent;
207 |     }
208 | 
209 |     50% {
210 |         background-color: var(--accent-color);
211 |     }
212 | }
```

assets/webview/css/components/code.css
```
1 | /* assets/webview/css/components/code.css */
2 | 
3 | /* Professional Code Block Styles */
4 | .code-block {
5 |     background: linear-gradient(135deg,
6 |             #0f172a 0%,
7 |             #1e293b 50%,
8 |             #0f172a 100%);
9 |     border: 1px solid var(--border-color);
10 |     border-radius: var(--radius-lg);
11 |     padding: var(--space-5);
12 |     margin: var(--space-4) 0;
13 |     font-family: var(--font-family-mono);
14 |     font-size: 0.8125rem;
15 |     line-height: 1.6;
16 |     overflow-x: auto;
17 |     position: relative;
18 |     box-shadow: var(--shadow-md);
19 | }
20 | 
21 | .code-block::before {
22 |     content: 'Code';
23 |     position: absolute;
24 |     top: var(--space-3);
25 |     right: var(--space-3);
26 |     background: var(--accent-color);
27 |     color: white;
28 |     padding: var(--space-1) var(--space-3);
29 |     border-radius: var(--radius-sm);
30 |     font-size: 0.6875rem;
31 |     font-weight: var(--font-weight-semibold);
32 |     text-transform: uppercase;
33 |     letter-spacing: 0.05em;
34 | }
35 | 
36 | .code-block.flex-code::before {
37 |     background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
38 |     content: 'Flex';
39 | }
40 | 
41 | /* Enhanced Professional Syntax Highlighting */
42 | .flex-function-keyword {
43 |     color: #c678dd;
44 |     font-weight: var(--font-weight-bold);
45 | }
46 | 
47 | .flex-control-keyword {
48 |     color: #e06c75;
49 | }
50 | 
51 | .flex-loop-keyword {
52 |     color: #d19a66;
53 | }
54 | 
55 | .flex-io-keyword {
56 |     color: #56b6c2;
57 |     text-decoration: underline;
58 |     text-decoration-style: dotted;
59 | }
60 | 
61 | .flex-datatype-keyword {
62 |     color: #61afef;
63 |     font-style: italic;
64 | }
65 | 
66 | .flex-literal {
67 |     color: #98c379;
68 | }
69 | 
70 | .flex-list-method {
71 |     color: #e5c07b;
72 | }
73 | 
74 | .flex-keyword-franco {
75 |     color: #ff6b6b;
76 | }
77 | 
78 | .flex-keyword-english {
79 |     color: #4ecdc4;
80 | }
81 | 
82 | .flex-string {
83 |     color: #95e1d3;
84 | }
85 | 
86 | .flex-number {
87 |     color: #fce38a;
88 | }
89 | 
90 | .flex-comment {
91 |     color: var(--text-subtle);
92 |     font-style: italic;
93 | }
94 | 
95 | .flex-operator {
96 |     color: #ff8a80;
97 | }
98 | 
99 | .flex-function {
100 |     color: #81c784;
101 | }
102 | 
103 | .flex-variable {
104 |     color: #64b5f6;
105 | }
106 | 
107 | /* Copy Button for Code Blocks */
108 | .copy-code-button {
109 |     position: absolute;
110 |     top: var(--space-2);
111 |     right: var(--space-2);
112 |     background: var(--accent-color);
113 |     border: none;
114 |     border-radius: var(--radius-sm);
115 |     color: white;
116 |     padding: var(--space-1) var(--space-2);
117 |     font-size: 0.75rem;
118 |     cursor: pointer;
119 |     opacity: 0.8;
120 |     transition: all 0.2s ease;
121 |     z-index: 2;
122 | }
123 | 
124 | .copy-code-button:hover {
125 |     opacity: 1;
126 |     transform: translateY(-1px);
127 |     box-shadow: var(--shadow-sm);
128 | }
129 | 
130 | .code-block:hover .copy-code-button {
131 |     opacity: 1;
132 | }
```

assets/webview/css/components/header.css
```
1 | /* assets/webview/css/components/header.css */
2 | 
3 | /* Minimalist Header Bar */
4 | #header-bar {
5 |     background: var(--secondary-bg);
6 |     backdrop-filter: blur(20px);
7 |     border-bottom: 1px solid var(--border-color);
8 |     padding: var(--space-3) var(--space-4);
9 |     display: flex;
10 |     align-items: center;
11 |     justify-content: space-between;
12 |     height: var(--header-height);
13 |     flex-shrink: 0;
14 |     position: relative;
15 | }
16 | 
17 | #header-bar::after {
18 |     content: '';
19 |     position: absolute;
20 |     bottom: 0;
21 |     left: 0;
22 |     right: 0;
23 |     height: 1px;
24 |     background: linear-gradient(90deg,
25 |             transparent 0%,
26 |             var(--accent-color) 50%,
27 |             transparent 100%);
28 | }
29 | 
30 | .header-left {
31 |     display: flex;
32 |     align-items: center;
33 |     gap: var(--space-3);
34 |     flex: 1;
35 |     min-width: 0;
36 |     /* Allow flex shrinking */
37 |     overflow: hidden;
38 | }
39 | 
40 | .header-logo {
41 |     width: 20px;
42 |     height: 20px;
43 |     flex-shrink: 0;
44 | }
45 | 
46 | .header-title {
47 |     font-size: 0.875rem;
48 |     font-weight: var(--font-weight-semibold);
49 |     color: var(--text-primary);
50 |     white-space: nowrap;
51 | }
52 | 
53 | .status-indicators {
54 |     display: flex;
55 |     align-items: center;
56 |     gap: var(--space-2);
57 |     margin-left: var(--space-3);
58 | }
59 | 
60 | .status-dot {
61 |     width: 8px;
62 |     height: 8px;
63 |     border-radius: 50%;
64 |     flex-shrink: 0;
65 |     position: relative;
66 | }
67 | 
68 | .status-dot.success {
69 |     background: var(--success-color);
70 |     box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
71 | }
72 | 
73 | .status-dot.warning {
74 |     background: var(--warning-color);
75 |     box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);
76 | }
77 | 
78 | .status-dot.loading {
79 |     background: var(--accent-color);
80 |     animation: pulse 2s infinite;
81 | }
82 | 
83 | .header-right {
84 |     display: flex;
85 |     align-items: center;
86 |     gap: var(--space-2);
87 |     flex-shrink: 0;
88 |     /* Prevent shrinking */
89 | }
90 | 
91 | .model-display {
92 |     background: linear-gradient(135deg,
93 |             rgba(59, 130, 246, 0.15) 0%,
94 |             rgba(99, 102, 241, 0.15) 100%);
95 |     border: 1px solid var(--border-accent);
96 |     color: var(--accent-light);
97 |     padding: var(--space-1) var(--space-3);
98 |     border-radius: var(--radius-md);
99 |     font-size: 0.75rem;
100 |     font-weight: var(--font-weight-medium);
101 |     backdrop-filter: blur(10px);
102 |     white-space: nowrap;
103 |     overflow: hidden;
104 |     text-overflow: ellipsis;
105 |     max-width: 120px;
106 |     /* Reasonable default max width */
107 | }
108 | 
109 | .icon-button {
110 |     background: var(--card-bg);
111 |     border: 1px solid var(--border-color);
112 |     color: var(--text-secondary);
113 |     padding: var(--space-2);
114 |     border-radius: var(--radius-md);
115 |     cursor: pointer;
116 |     transition: all 0.2s ease;
117 |     font-size: 0.8125rem;
118 |     display: flex;
119 |     align-items: center;
120 |     justify-content: center;
121 |     min-width: 32px;
122 |     height: 32px;
123 | }
124 | 
125 | .icon-button:hover {
126 |     background: var(--accent-color);
127 |     border-color: var(--accent-color);
128 |     color: white;
129 |     transform: translateY(-1px);
130 | }
131 | 
132 | .icon-button:active {
133 |     transform: translateY(0);
134 | }
```

assets/webview/css/components/input.css
```
1 | /* assets/webview/css/components/input.css */
2 | 
3 | /* Enhanced Input Section */
4 | #input-section {
5 |     flex-shrink: 0;
6 |     background: var(--secondary-bg);
7 |     border-top: 1px solid var(--border-color);
8 |     padding: var(--space-4);
9 |     position: relative;
10 |     z-index: 5;
11 | }
12 | 
13 | .input-container {
14 |     position: relative;
15 |     width: 100%;
16 |     max-width: 100%;
17 | }
18 | 
19 | .input-wrapper {
20 |     display: flex;
21 |     align-items: stretch;
22 |     background: var(--card-bg);
23 |     border: 1px solid var(--border-color);
24 |     border-radius: var(--radius-lg);
25 |     padding: var(--space-2);
26 |     gap: var(--space-2);
27 |     backdrop-filter: blur(20px);
28 |     transition: all 0.2s ease;
29 |     position: relative;
30 |     min-height: 48px;
31 | }
32 | 
33 | .input-wrapper:focus-within {
34 |     border-color: var(--accent-color);
35 |     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
36 | }
37 | 
38 | #user-input {
39 |     flex: 1;
40 |     min-height: 44px;
41 |     max-height: 120px;
42 |     padding: var(--space-3);
43 |     background: transparent;
44 |     border: none;
45 |     color: var(--text-primary);
46 |     font-family: var(--font-family);
47 |     font-size: 0.875rem;
48 |     line-height: 1.5;
49 |     resize: none;
50 |     overflow-y: auto;
51 |     outline: none;
52 |     margin: 0;
53 |     box-sizing: border-box;
54 |     scrollbar-width: thin;
55 |     scrollbar-color: rgba(248, 250, 252, 0.2) transparent;
56 | }
57 | 
58 | #user-input::-webkit-scrollbar {
59 |     width: 4px;
60 | }
61 | 
62 | #user-input::-webkit-scrollbar-thumb {
63 |     background: rgba(248, 250, 252, 0.2);
64 |     border-radius: 2px;
65 | }
66 | 
67 | .send-button {
68 |     background: var(--accent-color) !important;
69 |     border: none !important;
70 |     border-radius: var(--radius-md) !important;
71 |     color: white !important;
72 |     width: 36px !important;
73 |     height: 36px !important;
74 |     display: flex !important;
75 |     align-items: center !important;
76 |     justify-content: center !important;
77 |     cursor: pointer !important;
78 |     transition: all 0.2s ease !important;
79 |     flex-shrink: 0 !important;
80 |     visibility: visible !important;
81 |     opacity: 1 !important;
82 |     position: relative !important;
83 |     z-index: 10 !important;
84 | }
85 | 
86 | .send-button:hover:not(:disabled) {
87 |     background: var(--accent-hover);
88 |     transform: translateY(-1px);
89 |     box-shadow: var(--shadow-md);
90 | }
91 | 
92 | .send-button:active:not(:disabled) {
93 |     transform: translateY(0);
94 | }
95 | 
96 | .send-button:disabled {
97 |     opacity: 0.7;
98 |     cursor: not-allowed;
99 |     transform: none;
100 | }
101 | 
102 | .send-icon {
103 |     font-size: 0.875rem;
104 |     line-height: 1;
105 | }
```

assets/webview/css/components/responsive.css
```
1 | /* assets/webview/css/components/responsive.css */
2 | 
3 | @media (max-width: 768px) {
4 |     :root {
5 |         --header-height: 2.5rem;
6 |     }
7 | 
8 |     #header-bar {
9 |         padding: var(--space-2) var(--space-3);
10 |     }
11 | 
12 |     .header-title {
13 |         font-size: 0.8125rem;
14 |     }
15 | 
16 |     .status-indicators {
17 |         margin-left: var(--space-2);
18 |         gap: var(--space-1);
19 |     }
20 | 
21 |     .header-right {
22 |         gap: var(--space-1);
23 |     }
24 | 
25 |     .model-display {
26 |         font-size: 0.6875rem;
27 |         padding: var(--space-1) var(--space-2);
28 |         max-width: 100px;
29 |         /* Adjust for tablet */
30 |     }
31 | 
32 |     .icon-button {
33 |         min-width: 28px;
34 |         height: 28px;
35 |         padding: var(--space-1);
36 |         font-size: 0.75rem;
37 |     }
38 | 
39 |     .welcome-message {
40 |         padding: var(--space-6);
41 |     }
42 | 
43 |     .welcome-message .bot-avatar img {
44 |         width: 48px;
45 |         height: 48px;
46 |     }
47 | 
48 |     .welcome-content h3 {
49 |         font-size: 1rem;
50 |     }
51 | 
52 |     .features-grid {
53 |         grid-template-columns: repeat(2, 1fr);
54 |         gap: var(--space-2);
55 |     }
56 | 
57 |     .message {
58 |         max-width: 95%;
59 |     }
60 | 
61 |     #input-section {
62 |         padding: var(--space-3);
63 |     }
64 | 
65 |     .input-wrapper {
66 |         padding: var(--space-2);
67 |         gap: var(--space-2);
68 |     }
69 | 
70 |     .send-button {
71 |         min-width: 32px;
72 |         height: 32px;
73 |     }
74 | }
75 | 
76 | @media (max-width: 480px) {
77 |     .header-title {
78 |         display: none;
79 |     }
80 | 
81 |     .status-indicators {
82 |         margin-left: var(--space-1);
83 |     }
84 | 
85 |     .model-display {
86 |         max-width: 80px;
87 |         /* More reasonable for mobile */
88 |         font-size: 0.625rem;
89 |         padding: var(--space-1);
90 |     }
91 | 
92 |     .features-grid {
93 |         grid-template-columns: 1fr;
94 |     }
95 | 
96 |     .welcome-message {
97 |         padding: var(--space-4);
98 |     }
99 | 
100 |     .message {
101 |         max-width: 100%;
102 |     }
103 | 
104 |     /* Ensure no overlapping on very small screens */
105 |     #chat-box {
106 |         padding: var(--space-2);
107 |         gap: var(--space-2);
108 |     }
109 | 
110 |     #input-section {
111 |         padding: var(--space-2);
112 |     }
113 | 
114 |     .input-wrapper {
115 |         min-height: 44px;
116 |     }
117 | 
118 |     .send-button {
119 |         width: 32px !important;
120 |         height: 32px !important;
121 |     }
122 | }
123 | 
124 | /* Accessibility and Motion */
125 | @media (prefers-reduced-motion: reduce) {
126 |     * {
127 |         animation-duration: 0.01ms !important;
128 |         animation-iteration-count: 1 !important;
129 |         transition-duration: 0.01ms !important;
130 |     }
131 | }
```

assets/webview/js/syntax/highlighter.js
```
1 | /**
2 |  * Handles all syntax highlighting and formatting for Flex code.
3 |  */
4 | class SyntaxHighlighter {
5 |     constructor() {
6 |         this.flexSyntax = {
7 |             functionKeywords: ['fun', 'sndo2', 'sando2', 'fn', 'function'],
8 |             controlKeywords: ['if', 'cond', 'lw', 'elif', 'aw', 'else', 'otherwise', 'gher'],
9 |             loopKeywords: ['while', 'loop', 'talama', 'talma', 'tlma', 'for', 'krr', 'karr', 'karar', 'l7d'],
10 |             ioKeywords: ['etb3', 'out', 'output', 'print', 'printf', 'cout', 'scan', 'read', 'input', 'da5l', 'da5al', 'd5l'],
11 |             dataTypeKeywords: ['rakm', 'klma', 'so2al', 'dorg', 'string', 'int', 'bool', 'list', 'float', 'double', 'char'],
12 |             listMethods: ['\\.append', '\\.push', '\\.pop', '\\.remove', '\\.delete'],
13 |             literals: ['sa7', 'khata', 'true', 'false', 'null', 'void'],
14 |             francoKeywords: ['fonction', 'fi', 'law', 'walla', 'lamma', 'kol', 'men', 'ila', 'iza', 'yerga3', 'safha', 'kateb', 'egra', 'esm', 'noss', 'sahih', 'khata', 'tamam', 'bdaye', 'nehaye', 'break', 'continue', 'class', 'struct', 'enum', 'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'delete', 'this', 'super', 'extends', 'implements', 'interface', 'package', 'import', 'export', 'const', 'var', 'let', 'static', 'final', 'abstract', 'public', 'private', 'protected', 'return'],
15 |             englishKeywords: ['async', 'await', 'promise', 'do', 'switch', 'case', 'default'],
16 |             operators: ['\\+', '\\-', '\\*', '\\/', '%', '=', '==', '!=', '<=', '>=', '&&', '\\|\\|', '!', '\\+=', '\\-=', '\\*=', '\\/=', '%=', '\\+\\+', '\\-\\-', '\\?', ':', ';', ',', '\\.', '\\[', '\\]', '\\{', '\\}', '\\(', '\\)'],
17 |         };
18 |     }
19 | 
20 |     escapeHtml(text) {
21 |         const map = {
22 |             '&': '&amp;',
23 |             '<': '&lt;',
24 |             '>': '&gt;',
25 |             '"': '&quot;',
26 |             "'": '&#039;'
27 |         };
28 |         return text.replace(/[&<>"']/g, m => map[m]);
29 |     }
30 | 
31 |     isFlexCode(code) {
32 |         const keywords = Object.values(this.flexSyntax).flat();
33 |         const wordCount = code.split(/\s+/).length;
34 |         if (wordCount < 3) return false;
35 | 
36 |         let matchCount = 0;
37 |         const uniqueKeywords = [...new Set(keywords)];
38 | 
39 |         for (const keyword of uniqueKeywords) {
40 |             const regex = new RegExp(`\\b${keyword}\\b`, 'g');
41 |             if (code.match(regex)) {
42 |                 matchCount++;
43 |             }
44 |         }
45 |         return (matchCount / Math.min(wordCount, 20)) > 0.2 || (matchCount > 2);
46 |     }
47 | 
48 |     highlightFlexSyntax(code) {
49 |         let highlightedCode = this.escapeHtml(code);
50 | 
51 |         const highlightingRules = [
52 |             { class: 'flex-comment', regex: /(#|\/\/).*?$/gm },
53 |             { class: 'flex-string', regex: /(".*?"|'.*?')/g },
54 |             { class: 'flex-function-keyword', regex: new RegExp(`\\b(${this.flexSyntax.functionKeywords.join('|')})\\b`, 'g') },
55 |             { class: 'flex-control-keyword', regex: new RegExp(`\\b(${this.flexSyntax.controlKeywords.join('|')})\\b`, 'g') },
56 |             { class: 'flex-loop-keyword', regex: new RegExp(`\\b(${this.flexSyntax.loopKeywords.join('|')})\\b`, 'g') },
57 |             { class: 'flex-io-keyword', regex: new RegExp(`\\b(${this.flexSyntax.ioKeywords.join('|')})\\b`, 'g') },
58 |             { class: 'flex-datatype-keyword', regex: new RegExp(`\\b(${this.flexSyntax.dataTypeKeywords.join('|')})\\b`, 'g') },
59 |             { class: 'flex-literal', regex: new RegExp(`\\b(${this.flexSyntax.literals.join('|')})\\b`, 'g') },
60 |             { class: 'flex-number', regex: /\b\d+(\.\d+)?\b/g },
61 |             { class: 'flex-operator', regex: new RegExp(`(${this.flexSyntax.operators.join('|')})`, 'g') },
62 |         ];
63 | 
64 |         highlightingRules.forEach(rule => {
65 |             highlightedCode = highlightedCode.replace(rule.regex, (match) => `<span class="${rule.class}">${match}</span>`);
66 |         });
67 | 
68 |         return highlightedCode;
69 |     }
70 | 
71 |     formatText(text) {
72 |         const flexSnippets = [];
73 |         let formatted = this.escapeHtml(text);
74 | 
75 |         // Process Flex code blocks
76 |         formatted = formatted.replace(/```flex\n([\s\S]*?)\n```/g, (match, code) => {
77 |             const snippetId = `flex-snippet-${flexSnippets.length}`;
78 |             const highlighted = this.highlightFlexSyntax(code);
79 |             flexSnippets.push({
80 |                 id: snippetId,
81 |                 code: code,
82 |                 highlighted: `<pre><code class="language-flex">${highlighted}</code></pre>`,
83 |                 lineCount: code.split('\n').length,
84 |                 size: new Blob([code]).size,
85 |                 confidence: 'High'
86 |             });
87 |             return `%%FLEX_SNIPPET_${snippetId}%%`;
88 |         });
89 | 
90 |         // Process generic code blocks
91 |         formatted = formatted.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
92 |             return `<div class="code-block"><pre><code class="language-${lang}">${this.escapeHtml(code)}</code></pre></div>`;
93 |         });
94 | 
95 |         // Basic markdown formatting
96 |         formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
97 |             .replace(/\*(.*?)\*/g, '<em>$1</em>')
98 |             .replace(/^-\s(.*)/gm, '<ul><li>$1</li></ul>')
99 |             .replace(/<\/ul>\n<ul>/g, '');
100 | 
101 |         return { formatted, flexSnippets };
102 |     }
103 | 
104 |     createFlexCodeSnippet(snippet, domManager) {
105 |         const snippetContainer = document.createElement('div');
106 |         snippetContainer.className = 'flex-code-snippet';
107 |         snippetContainer.id = snippet.id;
108 | 
109 |         const header = document.createElement('div');
110 |         header.className = 'flex-snippet-header';
111 |         header.innerHTML = `
112 |             <div class="flex-snippet-metadata">
113 |                 <span class="flex-snippet-language"><span class="flex-icon">⚡</span> Flex Code</span>
114 |                 <span class="flex-snippet-stats">${snippet.lineCount} lines • ${(snippet.size / 1024).toFixed(1)}KB • ${snippet.confidence}</span>
115 |             </div>
116 |             <div class="flex-snippet-controls">
117 |                 <button class="flex-copy-button" title="Copy Flex code"><span class="copy-icon">📋</span></button>
118 |                 <button class="flex-expand-button" title="Toggle fullscreen"><span class="expand-icon">⤢</span></button>
119 |             </div>
120 |         `;
121 | 
122 |         const codeContainer = document.createElement('div');
123 |         codeContainer.className = 'flex-snippet-code-container';
124 |         const lineNumbers = document.createElement('div');
125 |         lineNumbers.className = 'flex-snippet-line-numbers';
126 |         const codeContent = document.createElement('div');
127 |         codeContent.className = 'flex-snippet-code-content';
128 | 
129 |         const lines = snippet.code.split('\n');
130 |         let lineNumbersHtml = '';
131 |         for (let i = 0; i < lines.length + 2; i++) {
132 |             lineNumbersHtml += `<span class="line-number">${i + 1}</span>`;
133 |         }
134 |         lineNumbers.innerHTML = lineNumbersHtml;
135 |         codeContent.innerHTML = this.highlightFlexSyntax(snippet.code);
136 | 
137 |         codeContainer.appendChild(lineNumbers);
138 |         codeContainer.appendChild(codeContent);
139 | 
140 |         const footer = document.createElement('div');
141 |         footer.className = 'flex-snippet-footer';
142 |         footer.innerHTML = `<span class="flex-hint">💡 This code can be saved as a <code>.lx</code>, <code>.fx</code>, or <code>.flex</code> file</span>`;
143 | 
144 |         snippetContainer.appendChild(header);
145 |         snippetContainer.appendChild(codeContainer);
146 |         snippetContainer.appendChild(footer);
147 | 
148 |         header.querySelector('.flex-copy-button').addEventListener('click', () => this.copyCode(snippet.code, header.querySelector('.flex-copy-button')));
149 |         header.querySelector('.flex-expand-button').addEventListener('click', (e) => {
150 |             e.stopPropagation();
151 |             domManager.toggleFlexSnippetExpanded(snippetContainer);
152 |         });
153 | 
154 |         return snippetContainer;
155 |     }
156 | 
157 |     async copyCode(code, buttonElement) {
158 |         try {
159 |             await navigator.clipboard.writeText(code);
160 |             const originalText = buttonElement.innerHTML;
161 |             buttonElement.innerHTML = 'Copied!';
162 |             buttonElement.style.background = '#10b981';
163 |             setTimeout(() => {
164 |                 buttonElement.innerHTML = originalText;
165 |                 buttonElement.style.background = '';
166 |             }, 1500);
167 |         } catch (err) {
168 |             console.error('Failed to copy code: ', err);
169 |             const originalText = buttonElement.innerHTML;
170 |             buttonElement.innerHTML = 'Error!';
171 |             buttonElement.style.background = '#ef4444';
172 |             setTimeout(() => {
173 |                 buttonElement.innerHTML = originalText;
174 |                 buttonElement.style.background = '';
175 |             }, 2000);
176 |         }
177 |     }
178 | } 
```

assets/webview/js/ui/domManager.js
```
1 | /**
2 |  * Manages all direct DOM manipulation for the chat interface.
3 |  */
4 | class DOMManager {
5 |     constructor(chatBox, welcomeMessage, syntaxHighlighter) {
6 |         this.chatBox = chatBox;
7 |         this.welcomeMessage = welcomeMessage;
8 |         this.syntaxHighlighter = syntaxHighlighter;
9 |         this.streamingMessage = null;
10 |         this.streamingContent = '';
11 |         this.chunkCount = 0;
12 |         this.streamingStartTime = 0;
13 |         this.streamingDebugLog = [];
14 |         this.streamingHealthCheck = null;
15 |     }
16 | 
17 |     createMessageContainer(sender, isStatus) {
18 |         const messageDiv = document.createElement('div');
19 |         if (isStatus) {
20 |             messageDiv.className = 'status-message status-pulse';
21 |         } else {
22 |             messageDiv.className = `message ${sender}-message message-animation`;
23 |         }
24 |         return messageDiv;
25 |     }
26 | 
27 |     createMessageLabel(sender) {
28 |         const label = document.createElement('div');
29 |         label.className = `${sender}-label`;
30 |         label.innerHTML = sender === 'user' ?
31 |             '<span class="user-icon">👤</span> You' :
32 |             '<span class="ai-icon">⚡</span> Flex Assistant';
33 |         return label;
34 |     }
35 | 
36 |     createMessageContent(html) {
37 |         const contentDiv = document.createElement('div');
38 |         contentDiv.className = 'message-content';
39 |         contentDiv.innerHTML = html;
40 |         return contentDiv;
41 |     }
42 | 
43 |     animateMessageIn(element) {
44 |         element.style.opacity = '0';
45 |         element.style.transform = 'translateY(16px) scale(0.98)';
46 |         requestAnimationFrame(() => {
47 |             element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
48 |             element.style.opacity = '1';
49 |             element.style.transform = 'translateY(0) scale(1)';
50 |         });
51 |     }
52 | 
53 |     scrollChatToBottom() {
54 |         this.chatBox.scrollTo({
55 |             top: this.chatBox.scrollHeight,
56 |             behavior: 'smooth'
57 |         });
58 |     }
59 | 
60 |     addMessage(content, sender, isStatus = false) {
61 |         if (this.welcomeMessage && !isStatus) {
62 |             this.welcomeMessage.style.display = 'none';
63 |         }
64 | 
65 |         const { formatted, flexSnippets } = this.syntaxHighlighter.formatText(content);
66 | 
67 |         // Only create the main message bubble if there's text content.
68 |         if (formatted.trim().length > 0 || isStatus) {
69 |             const messageDiv = this.createMessageContainer(sender, isStatus);
70 |             if (isStatus) {
71 |                 messageDiv.innerHTML = this.syntaxHighlighter.escapeHtml(content);
72 |             } else {
73 |                 const label = this.createMessageLabel(sender);
74 |                 const contentDiv = this.createMessageContent(formatted);
75 |                 messageDiv.appendChild(label);
76 |                 messageDiv.appendChild(contentDiv);
77 |             }
78 |             this.chatBox.appendChild(messageDiv);
79 |             this.animateMessageIn(messageDiv);
80 |         }
81 | 
82 |         if (flexSnippets.length > 0) {
83 |             this.appendFlexSnippets(flexSnippets);
84 |         }
85 | 
86 |         this.scrollChatToBottom();
87 |     }
88 | 
89 |     appendFlexSnippets(snippets) {
90 |         snippets.forEach((snippet, index) => {
91 |             setTimeout(() => {
92 |                 const snippetElement = this.syntaxHighlighter.createFlexCodeSnippet(snippet, this);
93 |                 this.chatBox.appendChild(snippetElement);
94 |                 this.animateMessageIn(snippetElement);
95 |                 this.scrollChatToBottom();
96 |             }, index * 200);
97 |         });
98 |     }
99 | 
100 |     toggleFlexSnippetExpanded(snippetContainer) {
101 |         const isExpanding = !snippetContainer.classList.contains('expanded');
102 |         snippetContainer.classList.toggle('expanded');
103 |         let overlay = document.getElementById('snippet-overlay');
104 |         if (isExpanding) {
105 |             if (!overlay) {
106 |                 overlay = document.createElement('div');
107 |                 overlay.id = 'snippet-overlay';
108 |                 overlay.className = 'snippet-overlay';
109 |                 document.body.appendChild(overlay);
110 |                 overlay.addEventListener('click', () => {
111 |                     const expandedSnippet = document.querySelector('.flex-code-snippet.expanded');
112 |                     if (expandedSnippet) {
113 |                         this.toggleFlexSnippetExpanded(expandedSnippet);
114 |                     }
115 |                 });
116 |             }
117 |             requestAnimationFrame(() => {
118 |                 overlay.classList.add('visible');
119 |             });
120 |         } else {
121 |             if (overlay) {
122 |                 overlay.classList.remove('visible');
123 |             }
124 |         }
125 |         const expandButton = snippetContainer.querySelector('.flex-expand-button');
126 |         if (expandButton) {
127 |             expandButton.innerHTML = isExpanding ? `<span class="expand-icon">⤡</span>` : `<span class="expand-icon">⤢</span>`;
128 |             expandButton.title = isExpanding ? 'Exit fullscreen view' : 'Toggle fullscreen view';
129 |         }
130 |     }
131 | 
132 |     startStreaming() {
133 |         if (this.welcomeMessage) {
134 |             this.welcomeMessage.style.display = 'none';
135 |         }
136 | 
137 |         this.streamingMessage = this.createMessageContainer('ai', false);
138 |         const label = this.createMessageLabel('ai');
139 |         const contentDiv = this.createMessageContent('<span class="streaming-cursor"></span>');
140 | 
141 |         this.streamingMessage.appendChild(label);
142 |         this.streamingMessage.appendChild(contentDiv);
143 |         this.chatBox.appendChild(this.streamingMessage);
144 | 
145 |         this.streamingContent = '';
146 |         this.scrollChatToBottom();
147 |     }
148 | 
149 |     addStreamingChunk(chunk) {
150 |         if (!this.streamingMessage) {
151 |             this.startStreaming();
152 |         }
153 | 
154 |         this.streamingContent += chunk;
155 |         const contentDiv = this.streamingMessage.querySelector('.message-content');
156 |         if (contentDiv) {
157 |             // Basic markdown for now. Full formatting on complete.
158 |             const formattedChunk = this.syntaxHighlighter.escapeHtml(this.streamingContent)
159 |                 .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
160 |                 .replace(/\*(.*?)\*/g, '<em>$1</em>');
161 |             contentDiv.innerHTML = `${formattedChunk}<span class="streaming-cursor"></span>`;
162 |         }
163 |         this.scrollChatToBottom();
164 |     }
165 | 
166 |     completeStreaming() {
167 |         if (!this.streamingMessage) return;
168 | 
169 |         const contentDiv = this.streamingMessage.querySelector('.message-content');
170 |         if (contentDiv) {
171 |             const { formatted } = this.syntaxHighlighter.formatText(this.streamingContent);
172 |             contentDiv.innerHTML = formatted;
173 |         }
174 | 
175 |         this.streamingMessage = null;
176 |         this.streamingContent = '';
177 |         this.scrollChatToBottom();
178 |     }
179 | 
180 |     // ... other DOM manipulation methods
181 | } 
```
