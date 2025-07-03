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
            }
            this.chatBox.appendChild(messageDiv);
            this.animateMessageIn(messageDiv);
        }

        if (flexSnippets.length > 0) {
            this.appendFlexSnippets(flexSnippets);
        }

        this.scrollChatToBottom();
    }

    appendFlexSnippets(snippets) {
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
            // Basic markdown for now. Full formatting on complete.
            const formattedChunk = this.syntaxHighlighter.escapeHtml(this.streamingContent)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            contentDiv.innerHTML = `${formattedChunk}<span class="streaming-cursor"></span>`;
        }
        this.scrollChatToBottom();
    }

    completeStreaming() {
        if (!this.streamingMessage) return;

        const contentDiv = this.streamingMessage.querySelector('.message-content');
        if (contentDiv) {
            const { formatted } = this.syntaxHighlighter.formatText(this.streamingContent);
            contentDiv.innerHTML = formatted;
        }

        this.streamingMessage = null;
        this.streamingContent = '';
        this.scrollChatToBottom();
    }

    // ... other DOM manipulation methods
} 