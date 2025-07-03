# Flex Chatbot VS Code Extension

AI assistant for the Flex programming language with multilingual syntax support (Franco-Arabic and English).

## 🚀 Features

- **Bilingual Support**: Works with both Franco-Arabic and English Flex syntax
- **Intelligent Code Assistance**: AI-powered help with Flex programming concepts
- **Syntax Highlighting**: Enhanced code highlighting for Flex language constructs
- **Real-time Chat Interface**: Interactive chat within VS Code sidebar
- **Multiple AI Models**: Support for various OpenRouter AI models
- **Professional UI**: Modern, responsive design optimized for development

## 📋 Requirements

- VS Code 1.61.0 or higher
- OpenRouter API key (get one at [OpenRouter](https://openrouter.ai/keys))

## 🔧 Installation

1. Install the extension from VS Code marketplace (coming soon)
2. Or manually install the `.vsix` file
3. Configure your OpenRouter API key in settings
4. Start chatting with the Flex Assistant!

## ⚙️ Configuration

Open VS Code settings and search for "Flex Chatbot" to configure:

- **API Key**: Your OpenRouter API key
- **Model**: AI model to use (default: openai/gpt-4o-mini)
- **Temperature**: Response creativity (0.0-2.0)
- **Web Search**: Enable web search capabilities
- **Timeouts**: Request timeout settings

## 🧪 Testing

The extension includes comprehensive testing capabilities:

### Available Test Commands

```bash
# Unit tests only (fast, no VS Code required)
npm run test:unit

# Safe testing (alias for test:unit)
npm run test:safe

# Full integration tests
npm test

# Force close VS Code and run tests
FORCE_CLOSE_VSCODE=true npm test

# Close VS Code instances manually
npm run kill-vscode
```

### Resolving Test Issues

If you encounter the "no other instance of Code is running" error:

**Option 1: Use Safe Testing**
```bash
npm run test:unit  # Runs compilation and linting only
```

**Option 2: Auto-close VS Code**
```bash
npm run kill-vscode
npm test
```

**Option 3: Force Testing**
```bash
FORCE_CLOSE_VSCODE=true npm test
```

**Option 4: Manual Approach**
1. Close all VS Code windows
2. Run `npm test`

### Test Types

- **Unit Tests** (`test:unit`): TypeScript compilation + ESLint validation
- **Integration Tests** (`test`): Full VS Code extension testing with isolated instance
- **Development Tests**: Available through the extension's debug dashboard

## 🛠️ Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Lint code
npm run lint

# Run all checks
npm run test:unit
```

## 🏗️ Architecture

The extension follows enterprise-grade architecture patterns:

- **Services Layer**: Modular services for API, configuration, dataset management
- **Core Systems**: Debugging and error handling infrastructure  
- **UI Components**: Professional webview with responsive design
- **Testing Framework**: Comprehensive unit and integration testing

## 📖 Flex Language Support

The assistant provides expert help with:

- **Franco-Arabic Syntax**: `rakm`, `etb3`, `lw`, `karr`, etc.
- **English Syntax**: `int`, `print`, `if`, `for`, etc.
- **Mixed Programming**: Seamless combination of both syntaxes
- **Best Practices**: Safe coding patterns and performance tips
- **Debugging**: Error identification and resolution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run test:unit` to verify
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Flex Language Documentation](https://github.com/Flex-Language)
- [OpenRouter API](https://openrouter.ai)
- [VS Code Extension Development](https://code.visualstudio.com/api) 