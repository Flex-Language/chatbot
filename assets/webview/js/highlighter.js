// Highlighter and content processor for Flex Chatbot Webview
// This file is injected before the inline webview script and exposes
// window.processContent for rendering rich HTML with syntax highlighting.

(function () {
    /** Escape HTML entities */
    function escapeHTML(str) {
        const replaceMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
        return str.replace(/[&<>"']/g, (c) => replaceMap[c]);
    }

    /** Very light Flex syntax highlighter */
    function highlightFlexCode(code) {
        // Comments
        code = code.replace(/(\/\/.*?$)/gm, '<span class="flex-comment">$1</span>');
        // Strings
        code = code.replace(/(["'])(?:(?:\\.|[^\\])*?)\1/g, '<span class="flex-string">$&</span>');
        // Numbers
        code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="flex-number">$1</span>');

        const eng = ['if', 'else', 'for', 'while', 'function', 'return', 'const', 'let', 'var', 'print'];
        const fr = ['ila', 'akh', 'akhiri', 'bidaya', 'intaha'];

        code = code.replace(new RegExp('\\b(' + eng.join('|') + ')\\b', 'g'), '<span class="flex-keyword-english">$1</span>');
        code = code.replace(new RegExp('\\b(' + fr.join('|') + ')\\b', 'g'), '<span class="flex-keyword-franco">$1</span>');

        return code;
    }

    /** Transform raw markdown‐like text to HTML */
    function processContent(raw) {
        let text = escapeHTML(raw);

        // ```flex code blocks```
        text = text.replace(/```flex([\s\S]*?)```/gi, function (_m, code) {
            return '<div class="code-block flex-code">' + highlightFlexCode(code) + '</div>';
        });

        // Generic ```code blocks```
        text = text.replace(/```([\s\S]*?)```/g, function (_m, code) {
            return '<div class="code-block">' + highlightFlexCode(code) + '</div>';
        });

        // Inline code
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Bold / italic
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        // Newlines
        text = text.replace(/\n/g, '<br>');

        return text;
    }

    // Expose globally
    window.processContent = processContent;
})(); 