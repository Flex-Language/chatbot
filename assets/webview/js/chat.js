// assets/webview/js/chat.js
(function () {
  const vscode = acquireVsCodeApi();

  // Select DOM elements
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const clearButton = document.getElementById('clear-button');
  const changeModelButton = document.getElementById('change-model');
  const syntaxToggleButton = document.getElementById('syntax-toggle');
  const chatBox = document.getElementById('chat-box');
  const welcomeMessage = document.querySelector('.welcome-message');

  // Initialize modules
  const syntaxHighlighter = new SyntaxHighlighter();
  const domManager = new DOMManager(chatBox, welcomeMessage, syntaxHighlighter);

  // Enhanced Flex Language Features
  let currentSyntaxMode = window.flexConfig?.syntaxMode || 'mixed';
  
  // Update syntax mode display
  function updateSyntaxMode(mode) {
    currentSyntaxMode = mode;
    const button = syntaxToggleButton;
    if (button) {
      const modes = {
        franco: { emoji: '🇲🇦', title: 'Franco Mode - Moroccan Arabic keywords' },
        english: { emoji: '🇬🇧', title: 'English Mode - English keywords' },
        mixed: { emoji: '🌐', title: 'Mixed Mode - Franco & English' }
      };
      const modeInfo = modes[mode] || modes.mixed;
      button.innerHTML = modeInfo.emoji;
      button.title = modeInfo.title;
    }
    
    // Update placeholder text based on mode
    if (userInput) {
      const placeholders = {
        franco: "Ask me about Flex... (Franco: 'karr i l7d 10 { etb3(i) }')",
        english: "Ask me about Flex... (English: 'for i in range(10) { print(i) }')",
        mixed: "Ask me anything about Flex programming... (Franco: 'karr l7d 10 { etb3(i) }' or English: 'for(i=0; i<10; i++) { print(i) }')"
      };
      userInput.placeholder = placeholders[mode] || placeholders.mixed;
    }
  }

  // Add hint click handlers
  function setupInputHints() {
    const hintItems = document.querySelectorAll('.hint-item');
    console.log(`Found ${hintItems.length} hint items`);
    
    hintItems.forEach((hint, index) => {
      hint.addEventListener('click', () => {
        // Extract clean text from hint, removing emoji and prefixes
        const hintText = hint.textContent.replace(/[💡🔍⚠️]\s*/, '');
        console.log(`Hint ${index + 1} clicked:`, hintText);
        
        // Enhanced examples mapping with more comprehensive coverage
        const examples = {
          'Try: "Show me a safe loop in Franco"': 'Show me a safe loop in Franco',
          'Ask: "Explain the difference between Franco \'lw\' and English \'if\'"': 'Explain the difference between Franco \'lw\' and English \'if\'',
          'Safety: "How to avoid l7d loop errors?"': 'How to avoid l7d loop errors?',
          'Example: "Write me a simple calculator"': 'Write me a simple calculator',
          'Mixed: "Explain Franco-English syntax mixing"': 'Explain Franco-English syntax mixing',
          'Code: "Convert this to Flex: for i in range(10)"': 'Convert this to Flex: for i in range(10)',
          // Additional fallback mappings
          'Show me a safe loop in Franco': 'Show me a safe loop in Franco',
          'Explain the difference between Franco \'lw\' and English \'if\'': 'Explain the difference between Franco \'lw\' and English \'if\'',
          "What's the difference between 'lw' and 'if'?": 'Explain the difference between Franco \'lw\' and English \'if\'',
          'How to avoid l7d loop errors?': 'How to avoid l7d loop errors?',
          'Write me a simple calculator': 'Write me a simple calculator',
          'Explain Franco-English syntax mixing': 'Explain Franco-English syntax mixing',
          'Convert this to Flex: for i in range(10)': 'Convert this to Flex: for i in range(10)'
        };
        
        // Find matching example
        let selectedText = examples[hintText];
        
        // If no exact match, try to extract the quoted text
        if (!selectedText) {
          const quotedMatch = hintText.match(/"([^"]*)"/);
          if (quotedMatch) {
            selectedText = quotedMatch[1];
          } else {
            // Fallback: use the text after colon if present
            const colonMatch = hintText.match(/:\s*"?([^"]*)"?$/);
            selectedText = colonMatch ? colonMatch[1].trim() : hintText;
          }
        }
        
        if (selectedText && userInput) {
          userInput.value = selectedText;
          userInput.focus();
          
          // Add visual feedback
          hint.style.background = 'rgba(59, 130, 246, 0.3)';
          hint.style.transform = 'scale(0.95)';
          
          // Reset visual feedback after animation
          setTimeout(() => {
            hint.style.background = '';
            hint.style.transform = '';
          }, 150);
          
          console.log(`✅ Pasted into input: "${selectedText}"`);
        } else {
          console.warn('❌ Could not extract text from hint:', hintText);
        }
      });
      
      // Add keyboard accessibility
      hint.setAttribute('tabindex', '0');
      hint.setAttribute('role', 'button');
      hint.setAttribute('aria-label', `Click to use this example: ${hint.textContent}`);
      
      hint.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          hint.click();
        }
      });
    });
    
    // Add visual indicator that these are clickable
    hintItems.forEach(hint => {
      hint.style.userSelect = 'none';
      hint.title = 'Click to use this example';
    });
  }

  // --- Event Listeners ---
  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    sendButton.disabled = true;
    sendButton.innerHTML = '<span class="send-icon">⏳</span>';

    domManager.addMessage(message, 'user');

    userInput.value = '';
    userInput.focus();
    userInput.style.height = 'auto'; // Reset height

    vscode.postMessage({
      command: 'sendMessage',
      text: message
    });
  }

  sendButton.addEventListener('click', sendMessage);

  clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      vscode.postMessage({
        command: 'clearChat'
      });
    }
  });

  changeModelButton.addEventListener('click', () => {
    vscode.postMessage({
      command: 'selectModel'
    });
  });

  syntaxToggleButton.addEventListener('click', () => {
    const modes = ['franco', 'english', 'mixed'];
    const currentIndex = modes.indexOf(currentSyntaxMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    updateSyntaxMode(modes[nextIndex]);
  });

  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // --- VS Code Message Handling ---
  window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
      case 'aiStreamStart':
        domManager.startStreaming();
        break;
      case 'aiStreamChunk':
        domManager.addStreamingChunk(message.text);
        break;
      case 'aiStreamComplete':
        domManager.completeStreaming();
        sendButton.disabled = false;
        sendButton.innerHTML = '<span class="send-icon">📤</span>';
        break;
      case 'aiResponse':
        domManager.addMessage(message.text, 'ai');
        sendButton.disabled = false;
        sendButton.innerHTML = '<span class="send-icon">📤</span>';
        break;
      case 'chatCleared':
        domManager.clearChat();
        break;
      case 'hydrateChatHistory':
        handleChatHistoryRestoration(message.history);
        break;
      case 'error':
        domManager.addMessage(message.text, 'ai', true); // Treat errors as a status message from AI
        sendButton.disabled = false;
        sendButton.innerHTML = '<span class="send-icon">📤</span>';
        break;
      case 'modelUpdated':
        updateModelDisplay(message.model);
        break;
    }
  });

  // Handle chat history restoration
  function handleChatHistoryRestoration(history) {
    if (!history || !Array.isArray(history)) {
      console.warn('Invalid chat history data received');
      return;
    }

    try {
      // Hide welcome message if history exists
      if (history.length > 0 && welcomeMessage) {
        welcomeMessage.style.display = 'none';
      }

      // Restore each message in order
      history.forEach(message => {
        if (message.role === 'user') {
          domManager.addMessage(message.content, 'user');
        } else if (message.role === 'assistant') {
          domManager.addMessage(message.content, 'ai');
        }
      });

      console.log(`Restored ${history.length} messages from chat history`);
    } catch (error) {
      console.error('Error restoring chat history:', error);
    }
  }

  // Update model display in header
  function updateModelDisplay(modelName) {
    const modelDisplay = document.querySelector('.model-display');
    if (modelDisplay) {
      modelDisplay.textContent = modelName || 'Default';
      // Add a brief animation to show the change
      modelDisplay.style.background = '#10b981';
      modelDisplay.style.color = 'white';
      setTimeout(() => {
        modelDisplay.style.background = '';
        modelDisplay.style.color = '';
      }, 1000);
    }
  }

  // Auto-resize textarea
  userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // Initialize syntax mode and input hints
  updateSyntaxMode(currentSyntaxMode);
  setupInputHints();
  
  // Display dataset info if available
  if (window.flexConfig?.datasetStats) {
    const stats = window.flexConfig.datasetStats;
    console.log(`Flex Dataset v${stats.version} loaded: ${stats.totalKeywords} keywords, ${stats.totalExamples} examples`);
  }
})();