(function () {
  const vscode = acquireVsCodeApi();
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const clearButton = document.getElementById('clear-button');
  const changeModelButton = document.getElementById('change-model');
  const chatBox = document.getElementById('chat-box');
  const welcomeMessage = document.querySelector('.welcome-message');

  // Official Flex language syntax highlighting rules from documentation
  const flexSyntax = {
    // Function keywords (official tokens)
    functionKeywords: [
      'fun', 'sndo2', 'sando2', 'fn', 'function'
    ],

    // Control flow keywords
    controlKeywords: [
      'if', 'cond', 'lw', 'elif', 'aw', 'else', 'otherwise', 'gher'
    ],

    // Loop keywords
    loopKeywords: [
      'while', 'loop', 'talama', 'talma', 'tlma', 'for', 'krr', 'karr', 'karar', 'l7d'
    ],

    // I/O keywords
    ioKeywords: [
      'etb3', 'out', 'output', 'print', 'printf', 'cout', 'scan', 'read', 'input', 'da5l', 'da5al', 'd5l'
    ],

    // Data type keywords
    dataTypeKeywords: [
      'rakm', 'klma', 'so2al', 'dorg', 'string', 'int', 'bool', 'list', 'float', 'double', 'char'
    ],

    // List operation methods
    listMethods: [
      '\\.append', '\\.push', '\\.pop', '\\.remove', '\\.delete'
    ],

    // Boolean and null literals
    literals: [
      'sa7', 'khata', 'true', 'false', 'null', 'void'
    ],

    // Franco Arabic keywords (from original codebase for backward compatibility)
    francoKeywords: [
      'fonction', 'fi', 'law', 'walla', 'lamma', 'kol', 'men', 'ila', 'iza', 'yerga3',
      'safha', 'kateb', 'egra', 'esm', 'noss', 'sahih', 'khata', 'tamam',
      'bdaye', 'nehaye', 'break', 'continue', 'class', 'struct', 'enum',
      'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'new',
      'delete', 'this', 'super', 'extends', 'implements', 'interface', 'package',
      'import', 'export', 'const', 'var', 'let', 'static', 'final', 'abstract',
      'public', 'private', 'protected', 'return'
    ],

    // English keywords (for compatibility)
    englishKeywords: [
      'async', 'await', 'promise', 'do', 'switch', 'case', 'default'
    ],

    // Operators (safe ones that won't break HTML)
    operators: [
      '\\+', '\\-', '\\*', '\\/', '%', '=', '==', '!=', '<=', '>=',
      '&&', '\\|\\|', '!', '\\+=', '\\-=', '\\*=', '\\/=', '%=', 
      '\\+\\+', '\\-\\-', '\\?', ':', ';', ',', '\\.',
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

  // Enhanced Flex code detection with confidence scoring
  function isFlexCode(text, threshold = 0.3) {
    const flexIndicators = {
      // High confidence indicators
      strong: [
        'fonction', 'fi', 'law', 'walla', 'lamma', 'kol', 'men', 'ila', 'iza', 'yerga3',
        'safha', 'kateb', 'egra', 'esm', 'rakam', 'noss', 'sahih', 'bdaye', 'nehaye',
        'flex', 'Flex', 'FLEX', '.lx', '.fx', '.flex', 'Franco-Arabic', 'franco'
      ],
      // Medium confidence indicators
      medium: [
        'function', 'if', 'else', 'while', 'for', 'class', 'struct', 'enum',
        'return', 'import', 'export', 'const', 'let', 'var', 'public', 'private'
      ],
      // Low confidence indicators
      weak: [
        '{', '}', '(', ')', ';', '=', '==', '!=', '&&', '||', '++', '--'
      ]
    };

    const textLower = text.toLowerCase();
    let score = 0;
    let totalWords = text.split(/\s+/).length;

    // Calculate confidence score
    flexIndicators.strong.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
      const matches = textLower.match(regex);
      if (matches) score += matches.length * 0.3;
    });

    flexIndicators.medium.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
      const matches = textLower.match(regex);
      if (matches) score += matches.length * 0.15;
    });

    flexIndicators.weak.forEach(keyword => {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      const matches = text.match(regex);
      if (matches) score += matches.length * 0.05;
    });

    const confidence = Math.min(score / Math.max(totalWords, 1), 1);
    return confidence >= threshold;
  }

  // Extract Flex code snippets from text
  function extractFlexCodeSnippets(text) {
    const snippets = [];
    
    // Extract code blocks with language specification
    const langCodeBlocks = text.match(/```(\w*)\n?([\s\S]*?)```/g);
    if (langCodeBlocks) {
      langCodeBlocks.forEach((block, index) => {
        const match = block.match(/```(\w*)\n?([\s\S]*?)```/);
        if (match) {
          const lang = match[1].toLowerCase();
          const code = match[2].trim();
          
          if (lang === 'flex' || lang === 'lx' || lang === 'fx' || isFlexCode(code, 0.4)) {
            snippets.push({
              id: `flex-snippet-${Date.now()}-${index}`,
              code: code,
              language: lang || 'flex',
              confidence: isFlexCode(code, 0) ? 'high' : 'medium',
              lineCount: code.split('\n').length,
              size: code.length
            });
          }
        }
      });
    }

    // Extract code blocks without language specification
    const genericCodeBlocks = text.match(/```([\s\S]*?)```/g);
    if (genericCodeBlocks) {
      genericCodeBlocks.forEach((block, index) => {
        const code = block.replace(/```/g, '').trim();
        
        if (isFlexCode(code, 0.5) && !snippets.some(s => s.code === code)) {
          snippets.push({
            id: `flex-snippet-generic-${Date.now()}-${index}`,
            code: code,
            language: 'flex',
            confidence: 'auto-detected',
            lineCount: code.split('\n').length,
            size: code.length
          });
        }
      });
    }

    return snippets;
  }

  // Enhanced Flex syntax highlighting with HTML corruption prevention
  function highlightFlexSyntax(code) {
    // DO NOT escape HTML here - we'll handle it differently to preserve syntax highlighting tags
    let highlighted = code;
    
    // Create a temporary placeholder system to protect HTML tags during highlighting
    const placeholders = [];
    let placeholderIndex = 0;

    // Helper function to create and store placeholders with proper HTML escaping
    function createPlaceholder(htmlTaggedContent) {
      const placeholder = `__FLEX_PLACEHOLDER_${placeholderIndex++}__`;
      placeholders.push({ placeholder, content: htmlTaggedContent });
      return placeholder;
    }
    
    // Helper function to safely escape HTML content inside spans
    function createHighlightedSpan(cssClass, textContent) {
      const escapedContent = escapeHtml(textContent);
      return `<span class="${cssClass}">${escapedContent}</span>`;
    }

    // Helper function to restore placeholders
    function restorePlaceholders(text) {
      let result = text;
      // Process placeholders in reverse order to handle nested placeholders correctly
      for (let i = placeholders.length - 1; i >= 0; i--) {
        const { placeholder, content } = placeholders[i];
        // Use a more robust replacement method
        while (result.includes(placeholder)) {
          result = result.replace(placeholder, content);
        }
      }
      
      // Debug: Check if any placeholders remain unreplaced
      const remainingPlaceholders = result.match(/__FLEX_PLACEHOLDER_\d+__/g);
      if (remainingPlaceholders) {
        console.warn('Unreplaced placeholders found:', remainingPlaceholders);
        // Force cleanup of any remaining placeholders
        remainingPlaceholders.forEach(placeholder => {
          result = result.replace(new RegExp(placeholder, 'g'), '');
        });
      }
      
      return result;
    }

    // Highlight comments first (// and /* */)
    highlighted = highlighted.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      (match) => createPlaceholder(createHighlightedSpan('flex-comment', match))
    );

    // Highlight strings (single and double quotes) - protect them from further highlighting
    highlighted = highlighted.replace(
      /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
      (match) => createPlaceholder(createHighlightedSpan('flex-string', match))
    );

    // Highlight numbers (integers, floats, hex)
    highlighted = highlighted.replace(
      /\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g,
      (match) => createPlaceholder(createHighlightedSpan('flex-number', match))
    );

    // Highlight function keywords (highest priority)
    flexSyntax.functionKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-function-keyword', match));
      });
    });

    // Highlight control flow keywords
    flexSyntax.controlKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-control-keyword', match));
      });
    });

    // Highlight loop keywords
    flexSyntax.loopKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-loop-keyword', match));
      });
    });

    // Highlight I/O keywords
    flexSyntax.ioKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-io-keyword', match));
      });
    });

    // Highlight data type keywords
    flexSyntax.dataTypeKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-datatype-keyword', match));
      });
    });

    // Highlight literals (boolean and null values)
    flexSyntax.literals.forEach(literal => {
      const regex = new RegExp(`\\b(${literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-literal', match));
      });
    });

    // Highlight list methods
    flexSyntax.listMethods.forEach(method => {
      const regex = new RegExp(`(${method.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-list-method', match));
      });
    });

    // Highlight Franco Arabic keywords (for backward compatibility)
    flexSyntax.francoKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-keyword-franco', match));
      });
    });

    // Highlight English keywords (for backward compatibility)
    flexSyntax.englishKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return createPlaceholder(createHighlightedSpan('flex-keyword-english', match));
      });
    });

    // Highlight function names (word followed by parentheses)
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
      (match, funcName) => {
        return createPlaceholder(createHighlightedSpan('flex-function', funcName)) + match.substring(funcName.length);
      }
    );

    // Highlight operators - be very careful with HTML-sensitive characters
    const safeOperators = flexSyntax.operators.filter(op => {
      // Skip operators that could interfere with HTML tags
      return !['<', '>', '&'].some(htmlChar => op.includes(htmlChar.replace(/\\/g, '')));
    });
    
    safeOperators.forEach(op => {
      const regex = new RegExp(`(${op})`, 'g');
      highlighted = highlighted.replace(regex, (match) => {
        // Double-check we're not inside a placeholder
        if (match.includes('__FLEX_PLACEHOLDER_')) {
          return match;
        }
        return createPlaceholder(createHighlightedSpan('flex-operator', match));
      });
    });

    // Restore all placeholders to get final highlighted code
    highlighted = restorePlaceholders(highlighted);

    return highlighted;
  }

  // Create specialized Flex code snippet container
  function createFlexCodeSnippet(snippet) {
    const snippetContainer = document.createElement('div');
    snippetContainer.className = 'flex-code-snippet';
    snippetContainer.id = snippet.id;

    // Header with metadata and controls
    const header = document.createElement('div');
    header.className = 'flex-snippet-header';
    
    const metadata = document.createElement('div');
    metadata.className = 'flex-snippet-metadata';
    metadata.innerHTML = `
      <span class="flex-snippet-language">
        <span class="flex-icon">⚡</span>
        Flex Code
      </span>
      <span class="flex-snippet-stats">
        ${snippet.lineCount} lines • ${(snippet.size / 1024).toFixed(1)}KB • ${snippet.confidence}
      </span>
    `;

    const controls = document.createElement('div');
    controls.className = 'flex-snippet-controls';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'flex-copy-button';
    copyButton.innerHTML = `
      <span class="copy-icon">📋</span>
      <span class="copy-text">Copy Code</span>
    `;
    copyButton.title = 'Copy Flex code to clipboard';

    const expandButton = document.createElement('button');
    expandButton.className = 'flex-expand-button';
    expandButton.innerHTML = `<span class="expand-icon">⤢</span>`;
    expandButton.title = 'Toggle fullscreen view';

    controls.appendChild(copyButton);
    controls.appendChild(expandButton);
    
    header.appendChild(metadata);
    header.appendChild(controls);

    // Code container with enhanced highlighting
    const codeContainer = document.createElement('div');
    codeContainer.className = 'flex-snippet-code-container';
    
    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'flex-snippet-line-numbers';
    
    const codeContent = document.createElement('div');
    codeContent.className = 'flex-snippet-code-content';
    
    // Generate line numbers
    const lines = snippet.code.split('\n');
    lineNumbers.innerHTML = lines.map((_, index) => 
      `<span class="line-number">${index + 1}</span>`
    ).join('');
    
    // Apply enhanced Flex syntax highlighting
    const highlightedCode = highlightFlexSyntax(snippet.code);
    codeContent.innerHTML = highlightedCode;

    codeContainer.appendChild(lineNumbers);
    codeContainer.appendChild(codeContent);

    // Footer with usage hint
    const footer = document.createElement('div');
    footer.className = 'flex-snippet-footer';
    footer.innerHTML = `
      <span class="flex-hint">
        💡 This code can be saved as a <code>.lx</code>, <code>.fx</code>, or <code>.flex</code> file
      </span>
    `;

    snippetContainer.appendChild(header);
    snippetContainer.appendChild(codeContainer);
    snippetContainer.appendChild(footer);

    // Add copy functionality
    copyButton.addEventListener('click', async () => {
      await copyFlexCodeToClipboard(snippet.code, copyButton);
    });

    // Add expand functionality
    expandButton.addEventListener('click', () => {
      toggleFlexSnippetExpanded(snippetContainer);
    });

    return snippetContainer;
  }

  // Advanced copy functionality for Flex code
  async function copyFlexCodeToClipboard(code, buttonElement) {
    try {
      // Clean the code (remove any HTML tags that might have been added)
      const cleanCode = code.replace(/<[^>]*>/g, '');
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(cleanCode);
        showCopySuccess(buttonElement, 'Code copied!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = cleanCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          showCopySuccess(buttonElement, 'Code copied!');
        } else {
          showCopyError(buttonElement, 'Copy failed');
        }
      }
    } catch (err) {
      console.warn('Copy failed:', err);
      showCopyError(buttonElement, 'Copy failed');
    }
  }

  // Visual feedback for copy operations
  function showCopySuccess(buttonElement, message) {
    const originalHTML = buttonElement.innerHTML;
    buttonElement.innerHTML = `
      <span class="copy-icon">✅</span>
      <span class="copy-text">${message}</span>
    `;
    buttonElement.classList.add('copy-success');
    
    setTimeout(() => {
      buttonElement.innerHTML = originalHTML;
      buttonElement.classList.remove('copy-success');
    }, 2000);
  }

  function showCopyError(buttonElement, message) {
    const originalHTML = buttonElement.innerHTML;
    buttonElement.innerHTML = `
      <span class="copy-icon">❌</span>
      <span class="copy-text">${message}</span>
    `;
    buttonElement.classList.add('copy-error');
    
    setTimeout(() => {
      buttonElement.innerHTML = originalHTML;
      buttonElement.classList.remove('copy-error');
    }, 2000);
  }

  // Toggle expanded view for large code snippets
  function toggleFlexSnippetExpanded(snippetContainer) {
    snippetContainer.classList.toggle('expanded');
    const expandButton = snippetContainer.querySelector('.flex-expand-button');
    const isExpanded = snippetContainer.classList.contains('expanded');
    
    expandButton.innerHTML = isExpanded 
      ? `<span class="expand-icon">⤡</span>` 
      : `<span class="expand-icon">⤢</span>`;
    expandButton.title = isExpanded ? 'Exit fullscreen view' : 'Toggle fullscreen view';
  }

  // Enhanced code block formatting with proper spacing and line breaks
  function formatCodeBlock(code, language = '') {
    const isFlexLang = language.toLowerCase() === 'flex' || isFlexCode(code);

    if (isFlexLang) {
      // Preserve original formatting and line breaks
      const formattedCode = code
        .split('\n')
        .map(line => line.trimEnd()) // Remove trailing spaces but preserve leading indentation
        .join('\n');
      
      const highlighted = highlightFlexSyntax(formattedCode);
      
      // Convert newlines to HTML line breaks after highlighting
      const finalHighlighted = highlighted.replace(/\n/g, '<br>\n');
      
      return `<div class="code-block flex-code" data-language="flex"><pre><code>${finalHighlighted}</code></pre></div>`;
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

      // Preserve line breaks and format with proper HTML structure
      const formattedHighlighted = highlighted.replace(/\n/g, '<br>\n');
      
      return `<div class="code-block" data-language="${language || 'code'}"><pre><code>${formattedHighlighted}</code></pre></div>`;
    }
  }

  // Enhanced text formatting function with Flex snippet extraction
  function formatText(text) {
    let formatted = text;

    // First, extract Flex code snippets for separate display
    const flexSnippets = extractFlexCodeSnippets(text);

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

    return { formatted, flexSnippets };
  }

  // Enhanced message adding with Flex snippet support
  function addMessageWithFlexSnippets(content, sender, isStatus = false) {
    // Hide welcome message when first real message is added
    if (welcomeMessage && !isStatus) {
      welcomeMessage.style.display = 'none';
    }

    let processedContent;
    let flexSnippets = [];

    if (sender === 'ai' && !isStatus) {
      const result = formatText(content);
      processedContent = result.formatted;
      flexSnippets = result.flexSnippets;
    } else {
      processedContent = sender === 'user' ? escapeHtml(content) : content;
    }

    // Create main message
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
      contentDiv.innerHTML = processedContent;

      messageDiv.appendChild(label);
      messageDiv.appendChild(contentDiv);
    }

    chatBox.appendChild(messageDiv);

    // Add Flex code snippets after the main message
    if (flexSnippets.length > 0) {
      flexSnippets.forEach((snippet, index) => {
        setTimeout(() => {
          const snippetElement = createFlexCodeSnippet(snippet);
          chatBox.appendChild(snippetElement);
          
          // Animate snippet appearance
          snippetElement.style.opacity = '0';
          snippetElement.style.transform = 'translateY(20px)';
          
          requestAnimationFrame(() => {
            snippetElement.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            snippetElement.style.opacity = '1';
            snippetElement.style.transform = 'translateY(0)';
          });
          
          scrollChatToBottom();
        }, index * 200); // Stagger snippet animations
      });
    }

    // Professional entrance animation for main message
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(16px) scale(0.98)';

    requestAnimationFrame(() => {
      messageDiv.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0) scale(1)';
    });

    // Smooth scroll to bottom
    scrollChatToBottom();

    // Add copy functionality to regular code blocks
    setTimeout(() => {
      addCopyButtonsToCodeBlocks();
    }, 150);

    return { messageDiv, flexSnippets };
  }

  // Professional message adding with enhanced animations and styling
  function addMessage(content, sender, isStatus = false) {
    return addMessageWithFlexSnippets(content, sender, isStatus);
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

  // Enhanced streaming response functions with debugging
  let streamingMessage = null;
  let streamingContent = '';
  let streamingStartTime = 0;
  let chunkCount = 0;
  let streamingDebugLog = [];
  let streamingHealthCheck = null;
  const MAX_STREAMING_TIME = 600000; // 10 minutes max
  const MAX_STREAMING_SIZE = 5 * 1024 * 1024; // 5MB frontend limit

  function logStreamingDebug(event, data = {}) {
    const debugEntry = {
      timestamp: Date.now(),
      event,
      data: { ...data, chunkCount, contentLength: streamingContent.length }
    };
    streamingDebugLog.push(debugEntry);
    console.debug('[STREAMING]', event, debugEntry.data);
    
    // Keep only last 1000 debug entries to prevent memory issues
    if (streamingDebugLog.length > 1000) {
      streamingDebugLog = streamingDebugLog.slice(-1000);
    }
  }

  function startStreamingMessage() {
    try {
      logStreamingDebug('streaming_start');
      
      // Reset streaming state
      streamingContent = '';
      chunkCount = 0;
      streamingStartTime = Date.now();
      streamingDebugLog = [];
      
      // Clear any existing health check
      if (streamingHealthCheck) {
        clearInterval(streamingHealthCheck);
      }

      // Hide welcome message when streaming starts
      if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
      }

      // Create streaming message container
      streamingMessage = document.createElement('div');
      streamingMessage.className = 'message ai-message message-animation streaming-message';
      streamingMessage.dataset.streamingId = Date.now().toString();

      const label = document.createElement('div');
      label.className = 'ai-label';
      label.innerHTML = '<span class="ai-icon">⚡</span> Flex Assistant <span class="streaming-status">Streaming...</span>';

      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content streaming-content';
      contentDiv.innerHTML = '<span class="streaming-cursor">|</span>';

      streamingMessage.appendChild(label);
      streamingMessage.appendChild(contentDiv);
      chatBox.appendChild(streamingMessage);

      // Professional entrance animation
      streamingMessage.style.opacity = '0';
      streamingMessage.style.transform = 'translateY(16px) scale(0.98)';

      requestAnimationFrame(() => {
        streamingMessage.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        streamingMessage.style.opacity = '1';
        streamingMessage.style.transform = 'translateY(0) scale(1)';
      });

      // Set up health monitoring
      streamingHealthCheck = setInterval(() => {
        const elapsed = Date.now() - streamingStartTime;
        const status = streamingMessage.querySelector('.streaming-status');
        
        if (elapsed > MAX_STREAMING_TIME) {
          logStreamingDebug('streaming_timeout', { elapsed });
          handleStreamingError(new Error('Streaming timeout exceeded'));
          return;
        }
        
        if (streamingContent.length > MAX_STREAMING_SIZE) {
          logStreamingDebug('streaming_size_limit', { contentLength: streamingContent.length });
          handleStreamingError(new Error('Response size limit exceeded'));
          return;
        }
        
        // Update status display
        if (status) {
          const seconds = Math.floor(elapsed / 1000);
          const size = (streamingContent.length / 1024).toFixed(1);
          status.textContent = `Streaming... ${seconds}s | ${size}KB | ${chunkCount} chunks`;
        }
      }, 1000);

      scrollChatToBottom();
      logStreamingDebug('streaming_initialized');
      
    } catch (error) {
      logStreamingDebug('streaming_start_error', { error: error.message });
      handleStreamingError(error);
    }
  }

  function addStreamingChunk(chunk) {
    try {
      if (!streamingMessage) {
        logStreamingDebug('chunk_received_no_message', { chunkLength: chunk.length });
        return;
      }

      if (!chunk || typeof chunk !== 'string') {
        logStreamingDebug('invalid_chunk', { chunk, type: typeof chunk });
        return;
      }

      chunkCount++;
      const chunkSize = chunk.length;
      
      // Memory safety check
      if (streamingContent.length + chunkSize > MAX_STREAMING_SIZE) {
        logStreamingDebug('chunk_size_exceeded', { 
          currentSize: streamingContent.length, 
          chunkSize, 
          maxSize: MAX_STREAMING_SIZE 
        });
        handleStreamingError(new Error('Response size limit exceeded during chunk processing'));
        return;
      }

      streamingContent += chunk;
      const contentDiv = streamingMessage.querySelector('.streaming-content');
      
      if (!contentDiv) {
        logStreamingDebug('content_div_missing');
        handleStreamingError(new Error('Streaming content container missing'));
        return;
      }
      
      // Throttle DOM updates for performance
      if (chunkCount % 3 === 0 || chunkSize > 100) {
        try {
          const result = formatText(streamingContent);
          const formattedContent = result.formatted;
          contentDiv.innerHTML = formattedContent + '<span class="streaming-cursor">|</span>';
          
          // Auto-scroll but don't force it every time
          if (chunkCount % 10 === 0) {
            scrollChatToBottom();
          }
        } catch (formatError) {
          logStreamingDebug('format_error', { 
            error: formatError.message, 
            contentLength: streamingContent.length 
          });
          // Fallback to plain text if formatting fails
          contentDiv.innerHTML = escapeHtml(streamingContent) + '<span class="streaming-cursor">|</span>';
        }
      }
      
      // Log progress periodically
      if (chunkCount % 50 === 0) {
        logStreamingDebug('chunk_progress', {
          chunkSize,
          totalSize: streamingContent.length,
          avgChunkSize: streamingContent.length / chunkCount,
          elapsed: Date.now() - streamingStartTime
        });
      }
      
    } catch (error) {
      logStreamingDebug('chunk_processing_error', { error: error.message, chunkCount });
      handleStreamingError(error);
    }
  }

  function completeStreamingMessage() {
    try {
      logStreamingDebug('streaming_complete_start');
      
      if (!streamingMessage) {
        logStreamingDebug('complete_no_message');
        return;
      }

      // Clear health check
      if (streamingHealthCheck) {
        clearInterval(streamingHealthCheck);
        streamingHealthCheck = null;
      }

      const contentDiv = streamingMessage.querySelector('.streaming-content');
      
      if (!contentDiv) {
        logStreamingDebug('complete_content_div_missing');
        return;
      }
      
      // Final content formatting and Flex snippet extraction
      let flexSnippets = [];
      try {
        const result = formatText(streamingContent);
        const finalContent = result.formatted;
        flexSnippets = result.flexSnippets;
        contentDiv.innerHTML = finalContent;
      } catch (formatError) {
        logStreamingDebug('final_format_error', { error: formatError.message });
        // Fallback to plain text
        contentDiv.innerHTML = escapeHtml(streamingContent);
      }
      
      // Remove streaming class and update status
      streamingMessage.classList.remove('streaming-message');
      const status = streamingMessage.querySelector('.streaming-status');
      if (status) {
        const elapsed = Date.now() - streamingStartTime;
        const size = (streamingContent.length / 1024).toFixed(1);
        status.textContent = `Complete - ${Math.floor(elapsed / 1000)}s | ${size}KB | ${chunkCount} chunks`;
        status.style.color = 'var(--success-color)';
      }
      
      // Add Flex code snippets after streaming completes
      if (flexSnippets.length > 0) {
        logStreamingDebug('adding_flex_snippets', { snippetCount: flexSnippets.length });
        
        flexSnippets.forEach((snippet, index) => {
          setTimeout(() => {
            const snippetElement = createFlexCodeSnippet(snippet);
            chatBox.appendChild(snippetElement);
            
            // Animate snippet appearance
            snippetElement.style.opacity = '0';
            snippetElement.style.transform = 'translateY(20px)';
            
            requestAnimationFrame(() => {
              snippetElement.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              snippetElement.style.opacity = '1';
              snippetElement.style.transform = 'translateY(0)';
            });
            
            scrollChatToBottom();
          }, index * 300); // Stagger snippet animations
        });
      }

      // Add copy functionality to regular code blocks
      setTimeout(() => {
        addCopyButtonsToCodeBlocks();
      }, 150);

      // Final scroll to show complete content
      scrollChatToBottom();
      
      logStreamingDebug('streaming_complete_success', {
        totalChunks: chunkCount,
        totalSize: streamingContent.length,
        elapsed: Date.now() - streamingStartTime,
        flexSnippets: flexSnippets.length
      });

      // Reset streaming state
      streamingMessage = null;
      streamingContent = '';
      chunkCount = 0;
      
    } catch (error) {
      logStreamingDebug('complete_error', { error: error.message });
      handleStreamingError(error);
    }
  }

  function handleStreamingError(error) {
    try {
      logStreamingDebug('streaming_error', { 
        error: error.message,
        contentLength: streamingContent.length,
        elapsed: Date.now() - streamingStartTime
      });

      // Clear health check
      if (streamingHealthCheck) {
        clearInterval(streamingHealthCheck);
        streamingHealthCheck = null;
      }

      // Show error in the UI
      if (streamingMessage) {
        const contentDiv = streamingMessage.querySelector('.streaming-content');
        if (contentDiv) {
          const errorHtml = `
            <div class="streaming-error">
              ⚠️ Streaming interrupted: ${escapeHtml(error.message)}
              <br><br>
              ${formatText(streamingContent)}
              <div class="streaming-debug">
                <details>
                  <summary>Debug Information</summary>
                  <pre>${JSON.stringify({
                    chunkCount,
                    contentLength: streamingContent.length,
                    elapsed: Date.now() - streamingStartTime,
                    lastLogs: streamingDebugLog.slice(-10)
                  }, null, 2)}</pre>
                </details>
              </div>
            </div>
          `;
          contentDiv.innerHTML = errorHtml;
        }

        streamingMessage.classList.remove('streaming-message');
        streamingMessage.classList.add('streaming-error-message');
        
        const status = streamingMessage.querySelector('.streaming-status');
        if (status) {
          status.textContent = 'Error - Check debug info below';
          status.style.color = 'var(--error-color)';
        }
      }

      // Re-enable send button
      if (sendButton) {
        sendButton.disabled = false;
        sendButton.innerHTML = '<span class="send-icon">📤</span>';
      }

      // Reset state
      streamingMessage = null;
      streamingContent = '';
      chunkCount = 0;

    } catch (handlerError) {
      console.error('[STREAMING] Error in error handler:', handlerError);
      // Last resort: show simple error message
      addMessage(`⚠️ Streaming error: ${error.message}. Check browser console for details.`, 'ai');
    }
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
    
    .streaming-status {
      font-size: 0.75rem;
      opacity: 0.7;
      margin-left: var(--space-2);
      font-family: var(--font-mono);
    }
    
    .streaming-error {
      background: rgba(239, 68, 68, 0.05);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: var(--radius);
      padding: var(--space-3);
      margin: var(--space-2) 0;
    }
    
    .streaming-error-message {
      border-left: 3px solid var(--error-color);
    }
    
    .streaming-debug {
      margin-top: var(--space-3);
      font-size: 0.875rem;
    }
    
    .streaming-debug details {
      background: rgba(0, 0, 0, 0.1);
      border-radius: var(--radius);
      padding: var(--space-2);
    }
    
    .streaming-debug summary {
      cursor: pointer;
      font-weight: var(--font-weight-semibold);
      padding: var(--space-1);
    }
    
    .streaming-debug pre {
      background: rgba(0, 0, 0, 0.2);
      padding: var(--space-2);
      border-radius: var(--radius);
      overflow-x: auto;
      font-size: 0.75rem;
      margin-top: var(--space-2);
    }
    
    /* Flex Code Snippet Professional Styling */
    .flex-code-snippet {
      background: linear-gradient(135deg, 
        rgba(0, 122, 204, 0.03) 0%, 
        rgba(0, 122, 204, 0.01) 100%);
      border: 2px solid rgba(0, 122, 204, 0.2);
      border-radius: var(--radius-lg);
      margin: var(--space-4) 0;
      box-shadow: 0 4px 20px rgba(0, 122, 204, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .flex-code-snippet:hover {
      border-color: rgba(0, 122, 204, 0.4);
      box-shadow: 0 8px 32px rgba(0, 122, 204, 0.15);
      transform: translateY(-2px);
    }
    
    .flex-code-snippet.expanded {
      position: fixed;
      top: var(--space-3);
      left: var(--space-3);
      right: var(--space-3);
      bottom: var(--space-3);
      z-index: 1000;
      background: var(--bg-secondary);
      border-color: var(--accent-color);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    /* Snippet Header */
    .flex-snippet-header {
      background: linear-gradient(135deg, 
        rgba(0, 122, 204, 0.08) 0%, 
        rgba(0, 122, 204, 0.04) 100%);
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid rgba(0, 122, 204, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(10px);
    }
    
    .flex-snippet-metadata {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .flex-snippet-language {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-weight: var(--font-weight-bold);
      color: var(--accent-color);
      font-size: 1rem;
    }
    
    .flex-icon {
      font-size: 1.2em;
      filter: drop-shadow(0 0 4px currentColor);
    }
    
    .flex-snippet-stats {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      background: rgba(0, 122, 204, 0.1);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius);
      border: 1px solid rgba(0, 122, 204, 0.2);
    }
    
    .flex-snippet-controls {
      display: flex;
      gap: var(--space-2);
    }
    
    .flex-copy-button, .flex-expand-button {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-3);
      background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
      color: white;
      border: none;
      border-radius: var(--radius);
      font-size: 0.875rem;
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 122, 204, 0.3);
    }
    
    .flex-copy-button:hover, .flex-expand-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(0, 122, 204, 0.4);
      background: linear-gradient(135deg, var(--accent-hover), var(--accent-color));
    }
    
    .flex-copy-button:active, .flex-expand-button:active {
      transform: translateY(0);
      box-shadow: 0 1px 4px rgba(0, 122, 204, 0.3);
    }
    
    .flex-copy-button.copy-success {
      background: linear-gradient(135deg, var(--success-color), #10b981);
    }
    
    .flex-copy-button.copy-error {
      background: linear-gradient(135deg, var(--error-color), #dc2626);
    }
    
    .flex-expand-button {
      padding: var(--space-2);
      min-width: auto;
    }
    
    /* Code Container */
    .flex-snippet-code-container {
      display: flex;
      background: var(--bg-primary);
      max-height: 400px;
      overflow: hidden;
    }
    
    .flex-code-snippet.expanded .flex-snippet-code-container {
      max-height: none;
      flex: 1;
      overflow-y: auto;
    }
    
    .flex-snippet-line-numbers {
      background: rgba(0, 122, 204, 0.05);
      border-right: 1px solid rgba(0, 122, 204, 0.2);
      padding: var(--space-3) var(--space-2);
      font-family: var(--font-mono);
      font-size: 0.875rem;
      color: var(--text-muted);
      user-select: none;
      min-width: 60px;
      text-align: right;
    }
    
    .flex-snippet-line-numbers .line-number {
      display: block;
      line-height: 1.5;
      transition: color 0.2s ease;
    }
    
    .flex-snippet-line-numbers .line-number:hover {
      color: var(--accent-color);
    }
    
    .flex-snippet-code-content {
      flex: 1;
      padding: var(--space-3);
      font-family: var(--font-mono);
      font-size: 0.875rem;
      line-height: 1.5;
      overflow-x: auto;
      white-space: pre;
      color: var(--text-primary);
      background: var(--bg-primary);
    }
    
    /* Enhanced Flex syntax highlighting in snippets */
    .flex-snippet-code-content .flex-keyword-franco {
      color: #ff6b9d;
      font-weight: var(--font-weight-bold);
      text-shadow: 0 0 2px rgba(255, 107, 157, 0.3);
    }
    
    .flex-snippet-code-content .flex-keyword-english {
      color: #4ecdc4;
      font-weight: var(--font-weight-bold);
    }
    
    .flex-snippet-code-content .flex-string {
      color: #45b7d1;
    }
    
    .flex-snippet-code-content .flex-number {
      color: #f9ca24;
    }
    
    .flex-snippet-code-content .flex-comment {
      color: var(--text-muted);
      font-style: italic;
    }
    
    .flex-snippet-code-content .flex-function {
      color: #6c5ce7;
      font-weight: var(--font-weight-medium);
    }
    
    .flex-snippet-code-content .flex-operator {
      color: #fd79a8;
    }
    
    .flex-snippet-code-content .flex-variable {
      color: #00b894;
    }
    
    /* Snippet Footer */
    .flex-snippet-footer {
      background: rgba(0, 122, 204, 0.03);
      border-top: 1px solid rgba(0, 122, 204, 0.1);
      padding: var(--space-2) var(--space-4);
      font-size: 0.875rem;
    }
    
    .flex-hint {
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .flex-hint code {
      background: rgba(0, 122, 204, 0.1);
      color: var(--accent-color);
      padding: var(--space-1);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.8em;
    }
    
    /* Responsive design for mobile */
    @media (max-width: 768px) {
      .flex-code-snippet.expanded {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      
      .flex-snippet-header {
        padding: var(--space-2) var(--space-3);
        flex-direction: column;
        gap: var(--space-2);
      }
      
      .flex-snippet-metadata {
        flex-direction: column;
        gap: var(--space-1);
        align-items: flex-start;
      }
      
      .flex-copy-button .copy-text {
        display: none;
      }
      
      .flex-snippet-line-numbers {
        min-width: 40px;
        padding: var(--space-2) var(--space-1);
      }
      
      .flex-snippet-code-content {
        padding: var(--space-2);
        font-size: 0.8rem;
      }
    }
    
    /* Scrollbar styling for code content */
    .flex-snippet-code-content::-webkit-scrollbar {
      height: 6px;
    }
    
    .flex-snippet-code-content::-webkit-scrollbar-thumb {
      background: rgba(0, 122, 204, 0.3);
      border-radius: 3px;
    }
    
    .flex-snippet-code-content::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 122, 204, 0.5);
    }
    
    /* Animation for snippet appearance */
    @keyframes flexSnippetAppear {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .flex-code-snippet {
      animation: flexSnippetAppear 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  `;

  document.head.appendChild(style);

  // Add global debugging function for streaming
  window.exportStreamingDebugLog = function() {
    const debugData = {
      timestamp: new Date().toISOString(),
      streamingDebugLog,
      currentState: {
        streamingMessage: !!streamingMessage,
        streamingContent: streamingContent.length,
        chunkCount,
        streamingStartTime,
        hasHealthCheck: !!streamingHealthCheck
      },
      memoryUsage: performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      } : 'Not available'
    };
    
    console.log('Streaming Debug Export:', debugData);
    
    // Also copy to clipboard if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(debugData, null, 2))
        .then(() => console.log('Debug data copied to clipboard'))
        .catch(err => console.warn('Could not copy to clipboard:', err));
    }
    
    return debugData;
  };

  // Initialize the chat interface
  initializeChat();
}());
