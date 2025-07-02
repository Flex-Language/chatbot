(function () {
  const vscode = acquireVsCodeApi();
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const clearButton = document.getElementById('clear-button');
  const changeModelButton = document.getElementById('change-model');
  const chatBox = document.getElementById('chat-box');
  const welcomeMessage = document.querySelector('.welcome-message');

  // Flex language keywords and patterns for syntax highlighting
  const flexSyntax = {
    // Franco Arabic keywords (common Franco-Arabic programming terms)
    francoKeywords: [
      'fonction', 'fi', 'law', 'walla', 'lamma', 'kol', 'men', 'ila', 'iza', 'yerga3',
      'safha', 'kateb', 'egra', 'esm', 'rakam', 'noss', 'sahih', 'khata', 'tamam',
      'bdaye', 'nehaye', 'loop', 'break', 'continue', 'class', 'struct', 'enum',
      'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'new',
      'delete', 'this', 'super', 'extends', 'implements', 'interface', 'package',
      'import', 'export', 'const', 'var', 'let', 'static', 'final', 'abstract',
      'public', 'private', 'protected', 'void', 'return', 'null', 'true', 'false'
    ],

    // English keywords
    englishKeywords: [
      'function', 'if', 'else', 'elif', 'while', 'for', 'do', 'switch', 'case',
      'default', 'break', 'continue', 'return', 'class', 'struct', 'enum',
      'try', 'catch', 'finally', 'throw', 'new', 'delete', 'this', 'super',
      'extends', 'implements', 'interface', 'package', 'import', 'export',
      'const', 'var', 'let', 'static', 'final', 'abstract', 'public', 'private',
      'protected', 'void', 'null', 'true', 'false', 'async', 'await', 'promise'
    ],

    // Operators
    operators: [
      '\\+', '\\-', '\\*', '\\/', '%', '=', '==', '!=', '<', '>', '<=', '>=',
      '&&', '\\|\\|', '!', '&', '\\|', '\\^', '<<', '>>', '\\+=', '\\-=',
      '\\*=', '\\/=', '%=', '\\+\\+', '\\-\\-', '\\?', ':', ';', ',', '\\.',
      '\\[', '\\]', '\\{', '\\}', '\\(', '\\)'
    ]
  };

  // Function to properly escape HTML
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Function to detect if text contains Flex code
  function isFlexCode(text) {
    const flexIndicators = [
      ...flexSyntax.francoKeywords.slice(0, 10), // Check first 10 Franco keywords
      ...flexSyntax.englishKeywords.slice(0, 10), // Check first 10 English keywords
      'flex', 'Flex', 'FLEX'
    ];

    return flexIndicators.some(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // Enhanced Flex syntax highlighting
  function highlightFlexSyntax(code) {
    let highlighted = code;

    // Highlight comments (// and /* */)
    highlighted = highlighted.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      '<span class="flex-comment">$1</span>'
    );

    // Highlight strings (single and double quotes)
    highlighted = highlighted.replace(
      /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
      '<span class="flex-string">$1$2$3</span>'
    );

    // Highlight numbers (integers, floats, hex)
    highlighted = highlighted.replace(
      /\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g,
      '<span class="flex-number">$1</span>'
    );

    // Highlight Franco Arabic keywords
    flexSyntax.francoKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="flex-keyword-franco">$1</span>');
    });

    // Highlight English keywords  
    flexSyntax.englishKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="flex-keyword-english">$1</span>');
    });

    // Highlight operators
    flexSyntax.operators.forEach(op => {
      const regex = new RegExp(`(${op})`, 'g');
      highlighted = highlighted.replace(regex, '<span class="flex-operator">$1</span>');
    });

    // Highlight function names (word followed by parentheses)
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
      '<span class="flex-function">$1</span>'
    );

    // Highlight variables (camelCase, snake_case patterns)
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\b(?![<>])/g,
      (match, p1) => {
        // Don't highlight if already highlighted
        if (highlighted.includes(`<span class="flex-keyword`) ||
          highlighted.includes(`<span class="flex-function">${p1}</span>`)) {
          return match;
        }
        return `<span class="flex-variable">${p1}</span>`;
      }
    );

    return highlighted;
  }

  // Enhanced code block formatting
  function formatCodeBlock(code, language = '') {
    const isFlexLang = language.toLowerCase() === 'flex' || isFlexCode(code);

    if (isFlexLang) {
      const highlighted = highlightFlexSyntax(code);
      return `<div class="code-block flex-code" data-language="flex">${highlighted}</div>`;
    } else {
      // Basic highlighting for other languages
      let highlighted = code;

      // Basic keyword highlighting for common languages
      const basicKeywords = ['function', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'const', 'let', 'var'];
      basicKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        highlighted = highlighted.replace(regex, '<span class="flex-keyword-english">$1</span>');
      });

      // Highlight strings
      highlighted = highlighted.replace(
        /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        '<span class="flex-string">$1$2$3</span>'
      );

      // Highlight numbers
      highlighted = highlighted.replace(
        /\b(\d+\.?\d*)\b/g,
        '<span class="flex-number">$1</span>'
      );

      return `<div class="code-block" data-language="${language || 'code'}">${highlighted}</div>`;
    }
  }

  // Enhanced text formatting function
  function formatText(text) {
    let formatted = text;

    // Format code blocks with language specification
    formatted = formatted.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
      return formatCodeBlock(code.trim(), lang);
    });

    // Format code blocks without language specification
    formatted = formatted.replace(/```([\s\S]*?)```/g, (match, code) => {
      return formatCodeBlock(code.trim());
    });

    // Format inline code with enhanced styling
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Format **bold** text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Format *italic* text
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Format links [text](url)
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Format line breaks but preserve code block formatting
    formatted = formatted.replace(/\n(?![^<]*<\/div>)/g, '<br>');

    // Add syntax highlighting for Flex keywords in regular text
    if (isFlexCode(formatted)) {
      // Highlight common Flex terms in regular text (but not in code blocks)
      const flexTerms = ['Flex', 'franco', 'arabic', 'bilingual', 'programming'];
      flexTerms.forEach(term => {
        const regex = new RegExp(`\\b(${term})\\b(?![^<]*<\/(code|span|div)>)`, 'gi');
        formatted = formatted.replace(regex, '<span class="flex-highlight">$1</span>');
      });
    }

    return formatted;
  }

  // Professional message adding with enhanced animations and styling
  function addMessage(content, sender, isStatus = false) {
    // Hide welcome message when first real message is added
    if (welcomeMessage && !isStatus) {
      welcomeMessage.style.display = 'none';
    }

    const messageDiv = document.createElement('div');

    if (isStatus) {
      messageDiv.className = 'status-message status-pulse';
      messageDiv.innerHTML = escapeHtml(content);
    } else {
      messageDiv.className = `message ${sender}-message message-animation`;

      const label = document.createElement('div');
      label.className = `${sender}-label`;
      label.innerHTML = sender === 'user' ?
        '<span class="user-icon">👤</span> You' :
        '<span class="ai-icon">⚡</span> Flex Assistant';

      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content';

      // Apply formatting based on content type
      const processedContent = sender === 'user' ? escapeHtml(content) : formatText(content);
      contentDiv.innerHTML = processedContent;

      messageDiv.appendChild(label);
      messageDiv.appendChild(contentDiv);
    }

    chatBox.appendChild(messageDiv);

    // Professional entrance animation using CSS classes
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(16px) scale(0.98)';

    requestAnimationFrame(() => {
      messageDiv.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0) scale(1)';
    });

    // Smooth scroll to bottom
    scrollChatToBottom();

    // Add copy functionality to code blocks
    setTimeout(() => {
      addCopyButtonsToCodeBlocks();
    }, 150);
  }

  // Professional copy button functionality for code blocks
  function addCopyButtonsToCodeBlocks() {
    const codeBlocks = chatBox.querySelectorAll('.code-block:not(.has-copy-button)');

    codeBlocks.forEach(block => {
      block.classList.add('has-copy-button');

      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.innerHTML = '📋';
      copyButton.title = 'Copy code to clipboard';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');

      copyButton.addEventListener('click', async () => {
        // Get clean text content without HTML tags
        const codeText = block.textContent || block.innerText;

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(codeText);

            // Professional success feedback
            copyButton.innerHTML = '✅';
            copyButton.title = 'Code copied!';
            copyButton.style.background = 'var(--success-color)';

            setTimeout(() => {
              copyButton.innerHTML = '📋';
              copyButton.title = 'Copy code to clipboard';
              copyButton.style.background = 'var(--accent-color)';
            }, 2000);
          } else {
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement('textarea');
            textArea.value = codeText;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
              copyButton.innerHTML = '✅';
              copyButton.title = 'Code copied!';
              setTimeout(() => {
                copyButton.innerHTML = '📋';
                copyButton.title = 'Copy code to clipboard';
              }, 2000);
            } else {
              throw new Error('Copy command failed');
            }
          }
        } catch (err) {
          console.warn('Copy failed:', err);
          copyButton.innerHTML = '❌';
          copyButton.title = 'Copy failed';
          setTimeout(() => {
            copyButton.innerHTML = '📋';
            copyButton.title = 'Copy code to clipboard';
          }, 2000);
        }
      });

      // Ensure proper positioning
      if (getComputedStyle(block).position === 'static') {
        block.style.position = 'relative';
      }

      block.appendChild(copyButton);
    });
  }

  // Enhanced scrolling function
  function scrollChatToBottom() {
    const scrollOptions = {
      top: chatBox.scrollHeight,
      behavior: 'smooth'
    };

    chatBox.scrollTo(scrollOptions);

    // Fallback for browsers that don't support smooth scrolling
    setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
  }

  // Streaming response functions
  let streamingMessage = null;
  let streamingContent = '';

  function startStreamingMessage() {
    // Hide welcome message when streaming starts
    if (welcomeMessage) {
      welcomeMessage.style.display = 'none';
    }

    // Create streaming message container
    streamingMessage = document.createElement('div');
    streamingMessage.className = 'message ai-message message-animation streaming-message';

    const label = document.createElement('div');
    label.className = 'ai-label';
    label.innerHTML = '<span class="ai-icon">⚡</span> Flex Assistant';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content streaming-content';
    contentDiv.innerHTML = '<span class="streaming-cursor">|</span>';

    streamingMessage.appendChild(label);
    streamingMessage.appendChild(contentDiv);
    chatBox.appendChild(streamingMessage);

    // Reset streaming content
    streamingContent = '';

    // Professional entrance animation
    streamingMessage.style.opacity = '0';
    streamingMessage.style.transform = 'translateY(16px) scale(0.98)';

    requestAnimationFrame(() => {
      streamingMessage.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      streamingMessage.style.opacity = '1';
      streamingMessage.style.transform = 'translateY(0) scale(1)';
    });

    scrollChatToBottom();
  }

  function addStreamingChunk(chunk) {
    if (!streamingMessage) return;

    streamingContent += chunk;
    const contentDiv = streamingMessage.querySelector('.streaming-content');
    
    // Update content with streaming cursor
    const formattedContent = formatText(streamingContent);
    contentDiv.innerHTML = formattedContent + '<span class="streaming-cursor">|</span>';
    
    scrollChatToBottom();
  }

  function completeStreamingMessage() {
    if (!streamingMessage) return;

    const contentDiv = streamingMessage.querySelector('.streaming-content');
    
    // Remove streaming cursor and finalize content
    const finalContent = formatText(streamingContent);
    contentDiv.innerHTML = finalContent;
    
    // Remove streaming class
    streamingMessage.classList.remove('streaming-message');
    
    // Add copy functionality to code blocks
    setTimeout(() => {
      addCopyButtonsToCodeBlocks();
    }, 150);

    // Reset streaming state
    streamingMessage = null;
    streamingContent = '';
  }

  // Enhanced send message function
  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Disable send button temporarily
    sendButton.disabled = true;
    sendButton.innerHTML = '<span class="send-icon">⏳</span>';

    // Add user message to chat
    addMessage(message, 'user');

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'status-message typing-indicator';
    typingIndicator.innerHTML = '<span class="typing-dots">Flex Assistant is thinking</span><span class="dots">...</span>';
    chatBox.appendChild(typingIndicator);
    scrollChatToBottom();

    // Send message to extension
    vscode.postMessage({
      command: 'sendMessage',
      text: message
    });

    // Clear input field and focus
    userInput.value = '';
    userInput.focus();

    // Store the typing indicator reference
    window.currentTypingIndicator = typingIndicator;

    // Re-enable send button after 2 seconds
    setTimeout(() => {
      sendButton.disabled = false;
      sendButton.innerHTML = '<span class="send-icon">📤</span>';
    }, 2000);
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);

  clearButton.addEventListener('click', () => {
    // Add confirmation for clearing chat
    const confirmClear = confirm('Are you sure you want to clear the chat history?');
    if (confirmClear) {
      vscode.postMessage({
        command: 'clearChat'
      });
    }
  });

  // Change model button event listener
  if (changeModelButton) {
    changeModelButton.addEventListener('click', () => {
      vscode.postMessage({
        command: 'selectModel'
      });
    });
  }

  // Professional input handling with enhanced UX
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Allow Shift+Enter for line breaks
      return true;
    }
  });

  // Auto-resize input with smooth animation
  userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    const newHeight = Math.min(this.scrollHeight, 120);
    this.style.height = newHeight + 'px';

    // Add subtle animation for height changes
    this.style.transition = 'height 0.2s ease-out';
  });

  // Professional focus effects
  userInput.addEventListener('focus', function () {
    const container = this.closest('.input-container');
    if (container) {
      container.classList.add('input-focus-ring', 'focused');
    }
  });

  userInput.addEventListener('blur', function () {
    const container = this.closest('.input-container');
    if (container) {
      container.classList.remove('focused');
    }
  });

  // Handle messages from the extension
  window.addEventListener('message', event => {
    const message = event.data;

    switch (message.command) {
      case 'aiStreamStart':
        // Remove typing indicator and start streaming response
        if (window.currentTypingIndicator) {
          window.currentTypingIndicator.remove();
          window.currentTypingIndicator = null;
        }

        // Create streaming message container
        startStreamingMessage();
        break;

      case 'aiStreamChunk':
        // Add chunk to streaming message
        addStreamingChunk(message.text);
        break;

      case 'aiStreamComplete':
        // Complete streaming response
        completeStreamingMessage();
        
        // Re-enable send button
        sendButton.disabled = false;
        sendButton.innerHTML = '<span class="send-icon">📤</span>';
        break;

      case 'aiResponse':
        // Fallback for non-streaming responses
        // Remove typing indicator
        if (window.currentTypingIndicator) {
          window.currentTypingIndicator.remove();
          window.currentTypingIndicator = null;
        }

        // Re-enable send button
        sendButton.disabled = false;
        sendButton.innerHTML = '<span class="send-icon">📤</span>';

        // Display AI response with enhanced formatting
        addMessage(message.text, 'ai');
        break;

      case 'statusUpdate':
        // Handle status updates - if empty, clear typing indicator
        if (!message.text || message.text.trim() === '') {
          if (window.currentTypingIndicator) {
            window.currentTypingIndicator.remove();
            window.currentTypingIndicator = null;
          }
          // Re-enable send button
          sendButton.disabled = false;
          sendButton.innerHTML = '<span class="send-icon">📤</span>';
        } else {
          // Show status update in chat
          addMessage(message.text, null, true);
        }
        break;

      case 'chatCleared':
        // Clear the chat box with animation
        const messages = chatBox.querySelectorAll('.message, .status-message');
        messages.forEach((msg, index) => {
          setTimeout(() => {
            msg.style.transition = 'all 0.2s ease-out';
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(-20px)';
            setTimeout(() => msg.remove(), 200);
          }, index * 50);
        });

        setTimeout(() => {
          chatBox.innerHTML = '';
          // Re-add welcome message if it exists
          if (welcomeMessage) {
            const welcomeClone = welcomeMessage.cloneNode(true);
            welcomeClone.style.display = 'flex';
            chatBox.appendChild(welcomeClone);
          }
        }, messages.length * 50 + 200);
        break;

      case 'error':
        // Display error messages with special styling
        const errorDiv = document.createElement('div');
        errorDiv.className = 'status-message error-message';
        errorDiv.innerHTML = `⚠️ ${escapeHtml(message.text)}`;
        chatBox.appendChild(errorDiv);
        scrollChatToBottom();
        break;
    }
  });

  // Initialize chat
  function initializeChat() {
    userInput.focus();

    // Add welcome message if chat is empty
    if (chatBox.children.length === 0) {
      setTimeout(() => {
        addMessage('Welcome! I\'m your Flex programming assistant. I can help you with Franco-Arabic programming, syntax, examples, and best practices. How can I assist you today?', null, true);
      }, 500);
    }
  }

  // Professional dynamic styles
  const style = document.createElement('style');
  style.textContent = `
    .typing-indicator .dots {
      animation: typing 1.8s ease-in-out infinite;
    }
    
    @keyframes typing {
      0%, 60%, 100% { opacity: 1; }
      30% { opacity: 0.4; }
    }
    
    .flex-highlight {
      background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
      color: white;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-semibold);
      box-shadow: var(--shadow-sm);
    }
    
    .error-message {
      background: linear-gradient(135deg, 
        rgba(239, 68, 68, 0.08) 0%, 
        rgba(239, 68, 68, 0.05) 100%);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-left: 3px solid var(--error-color);
      color: var(--error-color);
      backdrop-filter: blur(10px);
    }
    
    .message-animation {
      animation: messageAppear 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    @keyframes messageAppear {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .status-pulse {
      animation: statusPulse 2.5s ease-in-out infinite;
    }
    
    @keyframes statusPulse {
      0%, 100% { 
        opacity: 0.8; 
        transform: scale(1);
      }
      50% { 
        opacity: 1; 
        transform: scale(1.02);
      }
    }
    
    .input-focus-ring {
      position: relative;
    }
    
    .input-focus-ring::before {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
      border-radius: calc(var(--radius-lg) + 2px);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }
    
    .input-focus-ring.focused::before {
      opacity: 0.1;
    }
    
    .streaming-cursor {
      display: inline-block;
      background: var(--accent-color);
      color: transparent;
      margin-left: 2px;
      animation: blink 1.2s ease-in-out infinite;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    .streaming-message {
      position: relative;
    }
    
    .streaming-message::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        var(--accent-color) 30%, 
        transparent 70%);
      animation: streamingProgress 2s ease-in-out infinite;
    }
    
    @keyframes streamingProgress {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;

  document.head.appendChild(style);

  // Initialize the chat interface
  initializeChat();
}());
