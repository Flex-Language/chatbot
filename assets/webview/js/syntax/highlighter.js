/**
 * Handles all syntax highlighting and formatting for Flex code.
 */
class SyntaxHighlighter {
    constructor() {
        this.flexSyntax = {
            functionKeywords: ['fun', 'sndo2', 'sando2', 'fn', 'function'],
            controlKeywords: ['if', 'cond', 'lw', 'elif', 'aw', 'else', 'otherwise', 'gher'],
            loopKeywords: ['while', 'loop', 'talama', 'talma', 'tlma', 'for', 'krr', 'karr', 'karar', 'l7d'],
            ioKeywords: ['etb3', 'out', 'output', 'print', 'printf', 'cout', 'scan', 'read', 'input', 'da5l', 'da5al', 'd5l'],
            dataTypeKeywords: ['rakm', 'klma', 'so2al', 'dorg', 'string', 'int', 'bool', 'list', 'float', 'double', 'char'],
            listMethods: ['\\.append', '\\.push', '\\.pop', '\\.remove', '\\.delete'],
            literals: ['sa7', 'khata', 'true', 'false', 'null', 'void'],
            francoKeywords: ['fonction', 'fi', 'law', 'walla', 'lamma', 'kol', 'men', 'ila', 'iza', 'yerga3', 'safha', 'kateb', 'egra', 'esm', 'noss', 'sahih', 'khata', 'tamam', 'bdaye', 'nehaye', 'break', 'continue', 'class', 'struct', 'enum', 'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'delete', 'this', 'super', 'extends', 'implements', 'interface', 'package', 'import', 'export', 'const', 'var', 'let', 'static', 'final', 'abstract', 'public', 'private', 'protected', 'return'],
            englishKeywords: ['async', 'await', 'promise', 'do', 'switch', 'case', 'default'],
            operators: ['\\+', '\\-', '\\*', '\\/', '%', '=', '==', '!=', '<=', '>=', '&&', '\\|\\|', '!', '\\+=', '\\-=', '\\*=', '\\/=', '%=', '\\+\\+', '\\-\\-', '\\?', ':', ';', ',', '\\.', '\\[', '\\]', '\\{', '\\}', '\\(', '\\)'],
        };
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    isFlexCode(code) {
        const keywords = Object.values(this.flexSyntax).flat();
        const wordCount = code.split(/\s+/).length;
        if (wordCount < 3) return false;

        let matchCount = 0;
        const uniqueKeywords = [...new Set(keywords)];

        for (const keyword of uniqueKeywords) {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            if (code.match(regex)) {
                matchCount++;
            }
        }
        return (matchCount / Math.min(wordCount, 20)) > 0.2 || (matchCount > 2);
    }

    highlightFlexSyntax(code) {
        let highlightedCode = this.escapeHtml(code);

        const highlightingRules = [
            { class: 'flex-comment', regex: /(#|\/\/).*?$/gm },
            { class: 'flex-string', regex: /(".*?"|'.*?')/g },
            { class: 'flex-function-keyword', regex: new RegExp(`\\b(${this.flexSyntax.functionKeywords.join('|')})\\b`, 'g') },
            { class: 'flex-control-keyword', regex: new RegExp(`\\b(${this.flexSyntax.controlKeywords.join('|')})\\b`, 'g') },
            { class: 'flex-loop-keyword', regex: new RegExp(`\\b(${this.flexSyntax.loopKeywords.join('|')})\\b`, 'g') },
            { class: 'flex-io-keyword', regex: new RegExp(`\\b(${this.flexSyntax.ioKeywords.join('|')})\\b`, 'g') },
            { class: 'flex-datatype-keyword', regex: new RegExp(`\\b(${this.flexSyntax.dataTypeKeywords.join('|')})\\b`, 'g') },
            { class: 'flex-literal', regex: new RegExp(`\\b(${this.flexSyntax.literals.join('|')})\\b`, 'g') },
            { class: 'flex-number', regex: /\b\d+(\.\d+)?\b/g },
            { class: 'flex-operator', regex: new RegExp(`(${this.flexSyntax.operators.join('|')})`, 'g') },
        ];

        highlightingRules.forEach(rule => {
            highlightedCode = highlightedCode.replace(rule.regex, (match) => `<span class="${rule.class}">${match}</span>`);
        });

        return highlightedCode;
    }

    formatText(text) {
        const flexSnippets = [];
        let formatted = this.escapeHtml(text);

        // Process Flex code blocks
        formatted = formatted.replace(/```flex\n([\s\S]*?)\n```/g, (match, code) => {
            const snippetId = `flex-snippet-${flexSnippets.length}`;
            const highlighted = this.highlightFlexSyntax(code);
            flexSnippets.push({
                id: snippetId,
                code: code,
                highlighted: `<pre><code class="language-flex">${highlighted}</code></pre>`,
                lineCount: code.split('\n').length,
                size: new Blob([code]).size,
                confidence: 'High'
            });
            return `%%FLEX_SNIPPET_${snippetId}%%`;
        });

        // Process generic code blocks
        formatted = formatted.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
            return `<div class="code-block"><pre><code class="language-${lang}">${this.escapeHtml(code)}</code></pre></div>`;
        });

        // Basic markdown formatting
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^-\s(.*)/gm, '<ul><li>$1</li></ul>')
            .replace(/<\/ul>\n<ul>/g, '');

        return { formatted, flexSnippets };
    }

    createFlexCodeSnippet(snippet, domManager) {
        const snippetContainer = document.createElement('div');
        snippetContainer.className = 'flex-code-snippet';
        snippetContainer.id = snippet.id;

        const header = document.createElement('div');
        header.className = 'flex-snippet-header';
        header.innerHTML = `
            <div class="flex-snippet-metadata">
                <span class="flex-snippet-language"><span class="flex-icon">⚡</span> Flex Code</span>
                <span class="flex-snippet-stats">${snippet.lineCount} lines • ${(snippet.size / 1024).toFixed(1)}KB • ${snippet.confidence}</span>
            </div>
            <div class="flex-snippet-controls">
                <button class="flex-copy-button" title="Copy Flex code"><span class="copy-icon">📋</span></button>
                <button class="flex-expand-button" title="Toggle fullscreen"><span class="expand-icon">⤢</span></button>
            </div>
        `;

        const codeContainer = document.createElement('div');
        codeContainer.className = 'flex-snippet-code-container';
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'flex-snippet-line-numbers';
        const codeContent = document.createElement('div');
        codeContent.className = 'flex-snippet-code-content';

        const lines = snippet.code.split('\n');
        let lineNumbersHtml = '';
        for (let i = 0; i < lines.length + 2; i++) {
            lineNumbersHtml += `<span class="line-number">${i + 1}</span>`;
        }
        lineNumbers.innerHTML = lineNumbersHtml;
        codeContent.innerHTML = this.highlightFlexSyntax(snippet.code);

        codeContainer.appendChild(lineNumbers);
        codeContainer.appendChild(codeContent);

        const footer = document.createElement('div');
        footer.className = 'flex-snippet-footer';
        footer.innerHTML = `<span class="flex-hint">💡 This code can be saved as a <code>.lx</code>, <code>.fx</code>, or <code>.flex</code> file</span>`;

        snippetContainer.appendChild(header);
        snippetContainer.appendChild(codeContainer);
        snippetContainer.appendChild(footer);

        header.querySelector('.flex-copy-button').addEventListener('click', () => this.copyCode(snippet.code, header.querySelector('.flex-copy-button')));
        header.querySelector('.flex-expand-button').addEventListener('click', (e) => {
            e.stopPropagation();
            domManager.toggleFlexSnippetExpanded(snippetContainer);
        });

        return snippetContainer;
    }

    async copyCode(code, buttonElement) {
        try {
            await navigator.clipboard.writeText(code);
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = 'Copied!';
            buttonElement.style.background = '#10b981';
            setTimeout(() => {
                buttonElement.innerHTML = originalText;
                buttonElement.style.background = '';
            }, 1500);
        } catch (err) {
            console.error('Failed to copy code: ', err);
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = 'Error!';
            buttonElement.style.background = '#ef4444';
            setTimeout(() => {
                buttonElement.innerHTML = originalText;
                buttonElement.style.background = '';
            }, 2000);
        }
    }
} 