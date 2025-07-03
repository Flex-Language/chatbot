/**
 * Manages all direct DOM manipulation for the chat interface.
 */
class DOMManager {
    constructor(chatBox, welcomeMessage, syntaxHighlighter) {
        this.chatBox = chatBox;
        this.welcomeMessage = welcomeMessage;
        this.syntaxHighlighter = syntaxHighlighter;
        this.streamingMessage = null;
        this.streamingContent = '';
        this.chunkCount = 0;
        this.streamingStartTime = 0;
        this.streamingDebugLog = [];
        this.streamingHealthCheck = null;
    }

    createMessageContainer(sender, isStatus) {
        const messageDiv = document.createElement('div');
        if (isStatus) {
            messageDiv.className = 'status-message status-pulse';
        } else {
            messageDiv.className = `message ${sender}-message message-animation`;
        }
        return messageDiv;
    }

    createMessageLabel(sender) {
        const label = document.createElement('div');
        label.className = `${sender}-label`;
        label.innerHTML = sender === 'user' ?
            '<span class="user-icon">👤</span> You' :
            '<span class="ai-icon">⚡</span> Flex Assistant';
        return label;
    }

    createMessageContent(html) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        // Verify that innerHTML assignment works correctly with updated SyntaxHighlighter output
        contentDiv.innerHTML = html;
        return contentDiv;
    }

    animateMessageIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(16px) scale(0.98)';
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        });
    }

    scrollChatToBottom() {
        this.chatBox.scrollTo({
            top: this.chatBox.scrollHeight,
            behavior: 'smooth'
        });
    }

    addMessage(content, sender, isStatus = false) {
        if (this.welcomeMessage && !isStatus) {
            this.welcomeMessage.style.display = 'none';
        }

        const { formatted, flexSnippets } = this.syntaxHighlighter.formatText(content);

        // Only create the main message bubble if there's text content.
        if (formatted.trim().length > 0 || isStatus) {
            const messageDiv = this.createMessageContainer(sender, isStatus);
            if (isStatus) {
                messageDiv.innerHTML = this.syntaxHighlighter.escapeHtml(content);
            } else {
                const label = this.createMessageLabel(sender);
                const contentDiv = this.createMessageContent(formatted);
                messageDiv.appendChild(label);
                messageDiv.appendChild(contentDiv);
                
                // Replace snippet placeholders with actual rendered snippets
                this.replaceSnippetPlaceholders(contentDiv, flexSnippets);
            }
            this.chatBox.appendChild(messageDiv);
            this.animateMessageIn(messageDiv);
        }

        this.scrollChatToBottom();
    }

    replaceSnippetPlaceholders(container, flexSnippets) {
        const placeholders = container.querySelectorAll('.flex-snippet-placeholder');
        placeholders.forEach(placeholder => {
            const snippetId = placeholder.getAttribute('data-snippet-id');
            const snippet = flexSnippets.find(s => s.id === snippetId);
            if (snippet) {
                // Ensure snippet replacement maintains code integrity and doesn't introduce additional HTML entity encoding
                const snippetElement = this.syntaxHighlighter.createFlexCodeSnippet(snippet, this);
                placeholder.parentNode.replaceChild(snippetElement, placeholder);
            }
        });
    }

    appendFlexSnippets(snippets) {
        // This method is now deprecated in favor of inline replacement
        // but kept for backwards compatibility
        snippets.forEach((snippet, index) => {
            setTimeout(() => {
                const snippetElement = this.syntaxHighlighter.createFlexCodeSnippet(snippet, this);
                this.chatBox.appendChild(snippetElement);
                this.animateMessageIn(snippetElement);
                this.scrollChatToBottom();
            }, index * 200);
        });
    }

    toggleFlexSnippetExpanded(snippetContainer) {
        const isExpanding = !snippetContainer.classList.contains('expanded');
        snippetContainer.classList.toggle('expanded');
        let overlay = document.getElementById('snippet-overlay');
        if (isExpanding) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'snippet-overlay';
                overlay.className = 'snippet-overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', () => {
                    const expandedSnippet = document.querySelector('.flex-code-snippet.expanded');
                    if (expandedSnippet) {
                        this.toggleFlexSnippetExpanded(expandedSnippet);
                    }
                });
            }
            requestAnimationFrame(() => {
                overlay.classList.add('visible');
            });
        } else {
            if (overlay) {
                overlay.classList.remove('visible');
            }
        }
        const expandButton = snippetContainer.querySelector('.flex-expand-button');
        if (expandButton) {
            expandButton.innerHTML = isExpanding ? `<span class="expand-icon">⤡</span>` : `<span class="expand-icon">⤢</span>`;
            expandButton.title = isExpanding ? 'Exit fullscreen view' : 'Toggle fullscreen view';
        }
    }

    startStreaming() {
        if (this.welcomeMessage) {
            this.welcomeMessage.style.display = 'none';
        }

        this.streamingMessage = this.createMessageContainer('ai', false);
        const label = this.createMessageLabel('ai');
        const contentDiv = this.createMessageContent('<span class="streaming-cursor"></span>');

        this.streamingMessage.appendChild(label);
        this.streamingMessage.appendChild(contentDiv);
        this.chatBox.appendChild(this.streamingMessage);

        this.streamingContent = '';
        this.scrollChatToBottom();
    }

    addStreamingChunk(chunk) {
        if (!this.streamingMessage) {
            this.startStreaming();
        }

        this.streamingContent += chunk;
        const contentDiv = this.streamingMessage.querySelector('.message-content');
        if (contentDiv) {
            // Apply enhanced HTML escaping logic to prevent entity corruption
            // Decode any pre-existing entities first, then apply proper escaping
            const decodedContent = this.streamingContent
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&#039;/g, "'");
            
            const formattedChunk = this.syntaxHighlighter.escapeHtml(decodedContent)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>'); // Preserve line breaks during streaming
            contentDiv.innerHTML = `${formattedChunk}<span class="streaming-cursor"></span>`;
        }
        this.scrollChatToBottom();
    }

    completeStreaming() {
        if (!this.streamingMessage) return;

        const contentDiv = this.streamingMessage.querySelector('.message-content');
        if (contentDiv) {
            // Ensure the final formatting call works correctly with updated highlighting pipeline
            const { formatted, flexSnippets } = this.syntaxHighlighter.formatText(this.streamingContent);
            contentDiv.innerHTML = formatted;
            
            // Validate that snippet placeholders maintain code integrity
            this.replaceSnippetPlaceholders(contentDiv, flexSnippets);
        }

        this.streamingMessage = null;
        this.streamingContent = '';
        this.scrollChatToBottom();
    }

    clearChat() {
        // Clear all messages except the welcome message
        const messages = this.chatBox.querySelectorAll('.message');
        messages.forEach(message => {
            message.remove();
        });
        
        // Reset streaming state
        this.streamingMessage = null;
        this.streamingContent = '';
        this.chunkCount = 0;
        
        // Show welcome message again
        if (this.welcomeMessage) {
            this.welcomeMessage.style.display = 'block';
        }
        
        console.log('Chat cleared successfully');
    }

    // ... other DOM manipulation methods
}