(function() {
  const vscode = acquireVsCodeApi();
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const clearButton = document.getElementById('clear-button');
  const chatBox = document.getElementById('chat-box');

  // Function to properly escape HTML
  function escapeHtml(unsafe) {
    return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
  }
  
  // Function to format messages
  function formatText(text) {
    // Format code blocks with triple backticks
    let formatted = text.replace(/```([\s\S]*?)```/g, '<div class="code-block">$1</div>');
    
    // Format inline code with single backtick
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Replace newlines with <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  }
  
  // Function to add a message to the chat box
  function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const label = document.createElement('div');
    label.className = `${sender}-label`;
    label.textContent = sender === 'user' ? 'User:' : 'bor3i:';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = formatText(content);
    
    messageDiv.appendChild(label);
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    // Scroll to the bottom
    scrollChatToBottom();
  }
  
  function scrollChatToBottom() {
    // More robust scrolling that ensures we reach the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Also scroll after a short delay to handle any rendering delays
    setTimeout(() => { 
      chatBox.scrollTop = chatBox.scrollHeight; 
    }, 100);
    
    // And once more after messages have had time to render fully
    setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 300);
  }
  
  // Handle send button click
  sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
      // Add user message to chat
      addMessage(escapeHtml(message), 'user');
      
      // Send message to extension
      vscode.postMessage({
        command: 'sendMessage',
        text: message
      });
      
      // Clear input field
      userInput.value = '';
    }
  });
  
  // Handle clear button click
  clearButton.addEventListener('click', () => {
    vscode.postMessage({
      command: 'clearChat'
    });
  });
  
  // Handle Enter key press in input field
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
  
  // Handle messages from the extension
  window.addEventListener('message', event => {
    const message = event.data;
    
    switch (message.command) {
      case 'aiResponse':
        // Display AI response
        addMessage(escapeHtml(message.text), 'ai');
        break;
        
      case 'statusUpdate':
        // Show status update in chat (like "searching web" or "thinking")
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status-message';
        statusDiv.textContent = message.text;
        chatBox.appendChild(statusDiv);
        scrollChatToBottom();
        
        // Remove status message after it's replaced by actual response
        setTimeout(() => {
          if (statusDiv.parentNode === chatBox) {
            chatBox.removeChild(statusDiv);
          }
        }, 10000); // Remove after 10 seconds if not already removed
        break;
        
      case 'chatCleared':
        // Clear the chat box
        chatBox.innerHTML = '';
        break;
    }
  });
  
  // Focus input field on load
  userInput.focus();
}());
