# Flex Chat Bot - VS Code Extension

🤖 **Advanced AI-powered assistant for the Flex programming language with comprehensive bilingual syntax support**

A professional-grade VS Code extension that provides intelligent assistance for the Flex programming language directly in your development environment. Chat with bor3i, an AI assistant specialized in Flex's unique bilingual syntax (Franco Arabic + English), and get instant help with coding, debugging, and learning.

## ✨ Features

### 🧠 **Intelligent AI Assistant**
- **Chat with bor3i:** Interactive AI conversations specialized in Flex programming
- **Comprehensive Knowledge:** Built-in understanding of Flex's complete language specification
- **Context-Aware Responses:** Maintains conversation context for better assistance
- **Multiple AI Models:** Choose from various OpenRouter AI models for optimal performance

### 🌍 **Bilingual Syntax Support**
- **Franco Arabic Syntax:** Native support for Franco Arabic keywords (`lw`, `karr`, `etb3`, etc.)
- **English Syntax:** Standard English programming keywords (`if`, `for`, `print`, etc.)
- **Mixed Syntax:** Seamless mixing of both syntax styles in the same codebase
- **Safety Warnings:** Built-in warnings for Franco loop safety (`l7d` inclusive loops)

### 🔧 **Advanced Configuration**
- **Flexible Model Selection:** Easy switching between AI models with detailed information
- **Temperature Control:** Adjust AI creativity and determinism
- **Web Search Integration:** Optional web search capabilities with `[web]` queries
- **Timeout Management:** Configurable request timeouts for reliability

### 📚 **Comprehensive Documentation**
- **Complete Language Specification:** 3000+ examples and patterns loaded from JSON dataset
- **Error Handling Guide:** Comprehensive troubleshooting and error prevention
- **Performance Optimization:** Best practices and optimization guidelines
- **Code Examples:** Extensive collection of real-world Flex code examples

### 🛠️ **Developer Tools**
- **Detailed Logging:** Comprehensive logging system for debugging
- **Configuration Validation:** Automatic validation with helpful error messages
- **Dataset Information:** View loaded specification statistics
- **Performance Monitoring:** Built-in performance tracking and optimization

## ✨ Enhanced UI/UX Features

### 🎨 **Modern Design System**
- **CSS Variables Architecture**: Consistent theming with professional color palette
- **Gradient Backgrounds**: Beautiful linear gradients optimized for dark themes
- **Advanced Typography**: Premium font stacks with proper spacing and hierarchy
- **Responsive Design**: Fluid layouts that adapt perfectly to any screen size
- **Animation System**: Smooth transitions, hover effects, and loading animations

### 🔧 **Flex Language Syntax Highlighting**
The chatbot now includes **comprehensive syntax highlighting** specifically designed for the Flex programming language:

#### **Bilingual Keyword Support**
- **Franco-Arabic Keywords**: `fonction`, `fi`, `law`, `walla`, `lamma`, `kol`, `men`, `ila`, `iza`, `yerga3`
- **English Keywords**: `function`, `if`, `else`, `while`, `for`, `class`, `return`, `import`, `export`
- **Mixed Language Detection**: Automatically detects and highlights both language sets

#### **Advanced Code Formatting**
- **Smart Code Block Detection**: Automatically identifies Flex code vs other languages
- **Color-Coded Elements**:
  - 🔴 Franco-Arabic keywords in red (`#ff6b6b`)
  - 🔵 English keywords in teal (`#4ecdc4`)
  - 🟢 Strings in mint green (`#95e1d3`)
  - 🟡 Numbers in yellow (`#fce38a`)
  - ⚪ Comments in gray with italic styling
  - 🟠 Operators in coral (`#ff8a80`)
  - 🔵 Functions in green (`#81c784`)
  - 🔷 Variables in blue (`#90caf9`)

#### **Enhanced Code Features**
- **Copy-to-Clipboard**: One-click copying for all code blocks
- **Language Detection Badge**: Visual indicator showing "Flex (Franco-Arabic)"
- **Line Numbers**: Optional line numbering for longer code examples
- **Syntax Validation**: Real-time highlighting as you type

### 💬 **Message Enhancement**
- **Rich Text Support**: **Bold**, *italic*, `inline code`, and [links](url)
- **Markdown Compatibility**: Full markdown rendering for better formatting
- **Message Animation**: Smooth slide-in animations for new messages
- **User/AI Distinction**: Clear visual separation with custom avatars and colors
- **Timestamp Integration**: Automatic message timestamping

### 🚀 **Interactive Features**
- **Typing Indicators**: Real-time "thinking" animations when AI is processing
- **Status Messages**: Clear feedback for loading, errors, and system states
- **Keyboard Shortcuts**:
  - `Enter` - Send message
  - `Shift + Enter` - New line
  - `Ctrl/Cmd + K` - Clear chat
  - `Ctrl/Cmd + M` - Change model
- **Auto-Resize Input**: Text area automatically expands as you type
- **Character Counter**: Real-time character count with warnings

### 🎯 **User Experience Improvements**
- **Welcome Message**: Helpful introduction when starting a new chat
- **Input Hints**: Contextual tips for formatting and features
- **Configuration Status**: Visual indicators for API and dataset status
- **Model Information**: Display current AI model with easy switching
- **Error Handling**: User-friendly error messages with clear instructions

### 🔧 **Technical Enhancements**
- **Performance Optimized**: Efficient rendering with minimal resource usage
- **Accessibility Support**: Full ARIA labels, keyboard navigation, and screen reader support
- **Security Hardened**: Content Security Policy (CSP) implementation
- **Cross-Platform**: Works seamlessly on Windows, macOS, and Linux
- **Memory Efficient**: Smart cleanup and resource management

### 📱 **Mobile-First Responsive Design**
- **Adaptive Layouts**: Perfect scaling from mobile to desktop
- **Touch-Friendly**: Optimized button sizes and spacing for touch devices
- **Readable Typography**: Legible text at all screen sizes
- **Efficient Navigation**: Streamlined interface for small screens

### 🎨 **Visual Polish**
- **Professional Icons**: Modern emoji-based iconography throughout
- **Smooth Scrolling**: Buttery smooth chat scrolling experience
- **Visual Hierarchy**: Clear information architecture and content flow
- **Brand Consistency**: Cohesive Flex-themed color scheme and styling

### ⚡ **Performance Features**
- **Lazy Loading**: Efficient resource loading for better startup time
- **Optimized Animations**: GPU-accelerated transitions and effects
- **Memory Management**: Automatic cleanup of old messages and resources
- **Caching Strategy**: Smart caching for better responsiveness

## 🚀 Installation

### Method 1: VS Code Marketplace
1. Open Visual Studio Code
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Flex Chat Bot"
4. Click **Install**

### Method 2: Manual Installation
1. Download the `.vsix` file from releases
2. Open VS Code Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Run `Extensions: Install from VSIX...`
4. Select the downloaded file

## ⚙️ Configuration

### 🔑 **Required Setup**
1. **Get OpenRouter API Key:** Visit [OpenRouter](https://openrouter.ai/keys) to get your API key
2. **Configure Extension:**
   - Open VS Code Settings (`Ctrl+,` / `Cmd+,`)
   - Search for "Flex Chatbot"
   - Enter your API key in `flexChatbot.apiKey`

### 🎛️ **Advanced Configuration**

| Setting | Description | Default |
|---------|-------------|---------|
| `flexChatbot.apiKey` | OpenRouter API key | *(required)* |
| `flexChatbot.model` | AI model to use | `openai/gpt-4-mini` |
| `flexChatbot.temperature` | Response creativity (0-2) | `0.7` |
| `flexChatbot.enableWebSearch` | Enable `[web]` search queries | `true` |
| `flexChatbot.maxTokens` | Maximum response length | `4000` |
| `flexChatbot.timeout` | Request timeout (ms) | `30000` |

### 🎯 **Quick Setup Commands**
- `Flex Chat Bot: Configure Settings` - Interactive configuration dialog
- `Flex Chat Bot: Select AI Model` - Choose from available models
- `Flex Chat Bot: Show Dataset Information` - View loaded specification stats

## 📖 Usage

### 💬 **Basic Chat**
1. Click the Flex Chat Bot icon in the sidebar
2. Type your Flex programming questions
3. Get instant, context-aware responses

### 🔍 **Web Search Queries**
Include `[web]` in your message to search for real-time information:
```
[web] latest Flex programming best practices 2024
```

### 🎭 **Bilingual Syntax Examples**

**Franco Arabic Style:**
```flex
rakm x = 10
lw x > 5 {
  etb3("x is greater than 5")
}
karr i=0 l7d length(myList) - 1 {
  etb3("Item: {myList[i]}")
}
```

**English Style:**
```flex
int x = 10
if (x > 5) {
  print("x is greater than 5")
}
for(i=0; i<length(myList); i++) {
  print("Item: {myList[i]}")
}
```

**Mixed Style:**
```flex
rakm counter = 0
for(i=0; i<10; i++) {
  etb3("Count: {counter}")
  counter++
}
```

### 🛡️ **Safety Features**
- **Franco Loop Safety:** Automatic warnings for inclusive `l7d` loops
- **Error Prevention:** Built-in validation and safety checks
- **Best Practices:** Guided recommendations for optimal code

## 🎯 Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| `Flex Chat Bot: Open` | Open chat interface | - |
| `Flex Chat Bot: Reset Chat` | Clear conversation history | - |
| `Flex Chat Bot: Select AI Model` | Choose AI model | - |
| `Flex Chat Bot: Configure Settings` | Open configuration dialog | - |
| `Flex Chat Bot: Show Logs` | View extension logs | - |
| `Flex Chat Bot: Show Dataset Information` | Display specification stats | - |

## 🏗️ Architecture

### 📁 **Project Structure**
```
src/
├── types/                 # TypeScript interfaces
├── services/              # Core business logic
│   ├── flexDatasetService.ts    # Dataset management
│   ├── apiService.ts           # API communications
│   └── configService.ts        # Configuration management
├── utils/                 # Utility functions
│   └── logger.ts              # Comprehensive logging
├── customSidebarViewProvider.ts # Main UI provider
└── extension.ts           # Extension entry point
```

### 🔧 **Services Architecture**

**FlexDatasetService:** Manages the comprehensive Flex language specification
- Loads 3000+ code examples and patterns from JSON
- Generates intelligent system prompts
- Provides fallback documentation
- Tracks dataset statistics

**ApiService:** Handles all external API communications
- OpenRouter API integration with retry logic
- Web search capabilities
- Model information retrieval
- Error handling and timeout management

**ConfigService:** Manages extension configuration
- Settings validation and sanitization
- Interactive configuration dialogs
- Configuration change monitoring
- Import/export capabilities

## 🐛 Troubleshooting

### ❌ **Common Issues**

**API Key Issues:**
- Ensure your OpenRouter API key is valid
- Check account credits and usage limits
- Verify key format (should start with `sk-`)

**Model Loading:**
- Use `Flex Chat Bot: Select AI Model` to refresh model list
- Check internet connection
- Verify API key permissions

**Dataset Issues:**
- Use `Flex Chat Bot: Show Dataset Information` to check status
- Ensure `flex_language_spec.json` exists in the dataset folder
- Check extension logs for detailed error information

### 📋 **Diagnostic Commands**
- `Flex Chat Bot: Show Logs` - View detailed logs
- `Flex Chat Bot: Show Dataset Information` - Check dataset status
- VS Code Developer Tools (`Help > Toggle Developer Tools`)

## 🤝 Contributing

We welcome contributions to improve the Flex Chat Bot! Here's how you can help:

### 🛠️ **Development Setup**
```bash
git clone https://github.com/Flex-Language/chatbot.git
cd chatbot
npm install
npm run compile
```

### 📝 **Contribution Guidelines**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper TypeScript types
4. Add tests if applicable
5. Update documentation
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### 🏷️ **Code Standards**
- TypeScript with strict mode enabled
- Comprehensive error handling
- Detailed logging for debugging
- JSDoc comments for public APIs
- Consistent naming conventions

## 📊 Performance

- **Fast Response Times:** Optimized API calls with caching
- **Efficient Memory Usage:** Lazy loading and resource management
- **Scalable Architecture:** Service-based design for maintainability
- **Error Recovery:** Robust error handling with graceful degradation

## 🔗 **Related Resources**

- [Flex Programming Language Documentation](https://github.com/Flex-Language)
- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [VS Code Extension API](https://code.visualstudio.com/api)

## 🙏 Acknowledgements

Special thanks to the amazing open-source projects that make this extension possible:

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[VS Code API](https://code.visualstudio.com/api)** - Extension framework
- **[OpenRouter](https://openrouter.ai/)** - AI model access
- **[Axios](https://axios-http.com/)** - HTTP client

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for the Flex programming community**

*Ready to revolutionize your Flex programming experience? Install the Flex Chat Bot today!*
