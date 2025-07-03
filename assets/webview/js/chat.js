// assets/webview/js/chat.js
(function () {
  const vscode = acquireVsCodeApi();

  // Select DOM elements
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const clearButton = document.getElementById('clear-button');
  const changeModelButton = document.getElementById('change-model');
  const chatBox = document.getElementById('chat-box');
  const welcomeMessage = document.querySelector('.welcome-message');

  // Initialize modules
  const syntaxHighlighter = new SyntaxHighlighter();
  const domManager = new DOMManager(chatBox, welcomeMessage, syntaxHighlighter);

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
      case 'error':
        domManager.addMessage(message.text, 'ai', true); // Treat errors as a status message from AI
        sendButton.disabled = false;
        sendButton.innerHTML = '<span class="send-icon">📤</span>';
        break;
    }
  });

  // Auto-resize textarea
  userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
})();