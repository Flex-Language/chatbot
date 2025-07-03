/**
 * Handles all syntax highlighting and formatting for Flex code.
 * Enhanced for repository-aligned v3.0 with Franco/English keyword mappings.
 */
class SyntaxHighlighter {
    constructor() {
        // Enhanced syntax based on the latest Flex-Language/Flex repository v3.0
        this.flexSyntax = {
            // Core Franco keywords (repository-aligned)
            francoKeywords: {
                control: ['lw', 'kida', 'gher', 'wla', 'aw', 'bass', 'iza'],
                loops: ['karr', 'l7d', 'tl', 'tlma', 'tlama'],
                functions: ['sndo2', 'sndog', 'arja3', 'yerja3', 'estd3i'],
                variables: ['mtaghayar', 'thabit', 'mwaqat'],
                io: ['etb3', 'da5al', 'da5l', 'awsal', 'era'],
                types: ['rakm', 'kasr', 'klma', 'so2al', 'ghalat', 'dorg'],
                operators: ['w', 'aw', 'mish', 'yesawi', 'akbar', 'asghar', 'zawad']
            },
            // English equivalents
            englishKeywords: {
                control: ['if', 'condition', 'else', 'elif', 'or', 'only', 'when'],
                loops: ['for', 'while', 'repeat', 'until', 'continue'],
                functions: ['function', 'def', 'return', 'returns', 'call'],
                variables: ['var', 'const', 'temp'],
                io: ['print', 'input', 'output', 'send', 'read'],
                types: ['int', 'float', 'string', 'bool', 'error', 'list'],
                operators: ['and', 'or', 'not', 'equals', 'greater', 'less', 'plus']
            },
            // Common patterns and safety keywords
            safetyKeywords: ['safe', 'check', 'validate', 'verify', 'secure', 'aman', 'ta2akkad'],
            literals: ['true', 'false', 'sa7', 'khata', 'tamam', 'null', 'void', 'fadi'],
            operators: ['\\+', '\\-', '\\*', '\\/', '%', '=', '==', '!=', '<=', '>=', '<', '>', '&&', '\\|\\|', '!', '\\+=', '\\-=', '\\*=', '\\/=', '%=', '\\+\\+', '\\-\\-', '\\?', ':', ';', ',', '\\.', '\\[', '\\]', '\\{', '\\}', '\\(', '\\)'],
            // Repository-aligned patterns
            builtinFunctions: ['sqrt', 'pow', 'max', 'min', 'len', 'size', 'join', 'split']
        };
        
        // Language detection patterns
        this.languagePatterns = {
            franco: /\b(lw|karr|sndo2|etb3|rakm|klma|gher|tlma)\b/g,
            english: /\b(if|for|function|print|int|string|else|while)\b/g
        };
    }

    /**
     * Detect the primary language of a code snippet
     */
    detectLanguage(code) {
        const francoMatches = (code.match(this.languagePatterns.franco) || []).length;
        const englishMatches = (code.match(this.languagePatterns.english) || []).length;
        
        // Enhanced detection logic
        if (francoMatches === 0 && englishMatches === 0) {
            return 'mixed'; // Default to mixed if no keywords detected
        }
        
        // If both languages are present, it's mixed
        if (francoMatches > 0 && englishMatches > 0) {
            return 'mixed';
        }
        
        // Clear dominance
        if (francoMatches > englishMatches) return 'franco';
        if (englishMatches > francoMatches) return 'english';
        
        // Equal counts or both zero - default to mixed
        return 'mixed';
    }

    /**
     * Add language indicator to code blocks
     */
    addLanguageIndicator(code, detectedLang) {
        const francoMatches = (code.match(this.languagePatterns.franco) || []).length;
        const englishMatches = (code.match(this.languagePatterns.english) || []).length;
        
        const indicators = {
            franco: `<span class="flex-language-indicator flex-franco">Franco</span>`,
            english: `<span class="flex-language-indicator flex-english">English</span>`,
            mixed: `<span class="flex-language-indicator flex-mixed">Mixed</span>`
        };
        
        // Add statistics for mixed mode
        if (detectedLang === 'mixed') {
            const total = francoMatches + englishMatches;
            if (total > 0) {
                const francoPercent = Math.round((francoMatches / total) * 100);
                const englishPercent = 100 - francoPercent;
                indicators.mixed = `<span class="flex-language-indicator flex-mixed" title="Franco: ${francoPercent}%, English: ${englishPercent}%">Mixed</span>`;
            }
        }
        
        return indicators[detectedLang] || indicators.mixed;
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

    /**
     * Validate if text contains proper Flex code blocks without corruption
     */
    isFlexCode(text) {
        // Check for HTML entities in code blocks
        const codeBlockRegex = /```flex\n([\s\S]*?)\n```/g;
        const codeBlocks = [...text.matchAll(codeBlockRegex)];
        
        for (const block of codeBlocks) {
            const code = block[1];
            if (!code) continue;
            
            // Check for HTML entities - these should not be present in clean Flex code
            if (/&(quot|lt|gt|amp|#039);/.test(code)) {
                console.warn('Found HTML entities in Flex code block - will clean');
                return false;
            }
            
            // Check for malformed HTML tags - these should not be in Flex code
            if (/<span[^>]*(?!>)|<\/span(?!>)|<[^>]+class=/.test(code)) {
                console.warn('Found HTML markup in Flex code block - will clean');
                return false;
            }
        }
        
        return true;
    }

    /**
     * Clean code of HTML entities and markup for copying
     */
    cleanFlexCode(code) {
        return code
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&#039;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/<span[^>]*>/g, '')
            .replace(/<\/span>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim();
    }

    /**
     * Extract clean code from highlighted HTML for copying
     */
    extractCleanCode(htmlCode) {
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlCode;
        
        // Get the text content which automatically strips HTML tags
        let cleanText = tempDiv.textContent || tempDiv.innerText || '';
        
        // Clean up any remaining HTML entities
        return this.cleanFlexCode(cleanText);
    }

    highlightFlexSyntax(code) {
        // Clean the code first to remove any HTML entities or markup
        let cleanCode = this.cleanFlexCode(code);
        
        // Detect the primary language
        const detectedLang = this.detectLanguage(cleanCode);

        // Create a tokens array to track what's already highlighted
        const tokens = [];
        let position = 0;
        
        // Tokenize the code to avoid overlapping highlights
        const patterns = [
            // Comments (highest priority)
            { name: 'comment', regex: /(#|\/\/).*?$/gm, class: 'flex-comment' },
            
            // Strings (high priority to avoid keyword conflicts inside strings)
            { name: 'string', regex: /"[^"]*"|'[^']*'/g, class: 'flex-string' },
            
            // Safety keywords (high priority for visibility)
            { name: 'safety', regex: new RegExp(`\\b(${this.flexSyntax.safetyKeywords.join('|')})\\b`, 'gi'), class: 'flex-safety-keyword' },
            
            // Franco keywords
            { name: 'franco', regex: new RegExp(`\\b(${Object.values(this.flexSyntax.francoKeywords).flat().join('|')})\\b`, 'g'), class: 'flex-franco-keyword' },
            
            // English keywords
            { name: 'english', regex: new RegExp(`\\b(${Object.values(this.flexSyntax.englishKeywords).flat().join('|')})\\b`, 'g'), class: 'flex-english-keyword' },
            
            // Built-in functions
            { name: 'builtin', regex: new RegExp(`\\b(${this.flexSyntax.builtinFunctions.join('|')})\\b`, 'g'), class: 'flex-builtin' },
            
            // Literals
            { name: 'literal', regex: new RegExp(`\\b(${this.flexSyntax.literals.join('|')})\\b`, 'g'), class: 'flex-literal' },
            
            // Numbers
            { name: 'number', regex: /\b\d+(\.\d+)?\b/g, class: 'flex-number' },
            
            // Operators
            { name: 'operator', regex: new RegExp(`(${this.flexSyntax.operators.join('|')})`, 'g'), class: 'flex-operator' },
        ];

        // Apply patterns in order of priority, avoiding overlaps
        let result = cleanCode;
        const placeholders = [];
        let placeholderIndex = 0;

        patterns.forEach(pattern => {
            let match;
            pattern.regex.lastIndex = 0; // Reset regex
            
            while ((match = pattern.regex.exec(result)) !== null) {
                const placeholder = `__PLACEHOLDER_${placeholderIndex}__`;
                const highlightedText = `<span class="${pattern.class}">${this.escapeHtml(match[0])}</span>`;
                
                placeholders[placeholderIndex] = highlightedText;
                result = result.substring(0, match.index) + placeholder + result.substring(match.index + match[0].length);
                
                // Adjust regex position after replacement
                pattern.regex.lastIndex = match.index + placeholder.length;
                placeholderIndex++;
            }
        });

        // Replace placeholders with highlighted text
        placeholders.forEach((highlightedText, index) => {
            result = result.replace(`__PLACEHOLDER_${index}__`, highlightedText);
        });

        return result;
    }

    formatText(text) {
        const flexSnippets = [];
        
        // First, process properly formatted Flex code blocks
        let processedText = text.replace(/```flex\n([\s\S]*?)\n```/g, (match, code) => {
            const snippetId = `flex-snippet-${flexSnippets.length}`;
            // Clean the code before highlighting and store clean version
            const cleanCode = this.cleanFlexCode(code);
            const detectedLang = this.detectLanguage(cleanCode);
            const highlighted = this.highlightFlexSyntax(cleanCode);
            
            flexSnippets.push({
                id: snippetId,
                originalCode: cleanCode, // Store clean code for copying
                code: cleanCode, // Keep for backward compatibility
                highlighted: `<pre><code class="language-flex">${highlighted}</code></pre>`,
                lineCount: cleanCode.split('\n').length,
                size: new Blob([cleanCode]).size,
                confidence: 'High',
                language: detectedLang,
                languageIndicator: this.addLanguageIndicator(cleanCode, detectedLang)
            });
            return `%%FLEX_SNIPPET_${snippetId}%%`;
        });

        // Auto-detect and format Flex code that's not in code blocks
        // Look for patterns that suggest Flex code (multiple lines with Flex keywords)
        processedText = this.autoDetectFlexCode(processedText, flexSnippets);

        // Now escape HTML for the remaining content (excluding placeholders)
        let formatted = this.escapeHtml(processedText);

        // Process generic code blocks
        formatted = formatted.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
            return `<div class="code-block"><pre><code class="language-${lang}">${this.escapeHtml(code)}</code></pre></div>`;
        });

        // Basic markdown formatting
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^-\s(.*)/gm, '<ul><li>$1</li></ul>')
            .replace(/<\/ul>\n<ul>/g, '')
            .replace(/\n/g, '<br>'); // Preserve line breaks in regular text

        // Replace Flex snippet placeholders with visual indicators
        formatted = this.replacePlaceholdersWithIndicators(formatted);

        return { formatted, flexSnippets };
    }

    /**
     * Auto-detect and format Flex code that's not properly wrapped in code blocks
     */
    autoDetectFlexCode(text, flexSnippets) {
        // Pattern to detect potential Flex code blocks
        // Look for lines that contain Flex keywords and code structure
        const flexCodePattern = /^((?:.*(?:list|int|string|fun|if|for|while|print|return|and|or)\s.*\n){3,})/gm;
        
        return text.replace(flexCodePattern, (match) => {
            const cleanMatch = match.trim();
            
            // Check if this looks like Flex code by counting keywords
            const francoMatches = (cleanMatch.match(this.languagePatterns.franco) || []).length;
            const englishMatches = (cleanMatch.match(this.languagePatterns.english) || []).length;
            
            // If we have enough keywords to suggest this is Flex code
            if (francoMatches + englishMatches >= 3) {
                const snippetId = `flex-snippet-${flexSnippets.length}`;
                const cleanCode = this.cleanFlexCode(cleanMatch);
                const detectedLang = this.detectLanguage(cleanCode);
                const highlighted = this.highlightFlexSyntax(cleanCode);
                
                flexSnippets.push({
                    id: snippetId,
                    originalCode: cleanCode,
                    code: cleanCode,
                    highlighted: `<pre><code class="language-flex">${highlighted}</code></pre>`,
                    lineCount: cleanCode.split('\n').length,
                    size: new Blob([cleanCode]).size,
                    confidence: 'Auto-detected',
                    language: detectedLang,
                    languageIndicator: this.addLanguageIndicator(cleanCode, detectedLang)
                });
                
                return `%%FLEX_SNIPPET_${snippetId}%%`;
            }
            
            // Not Flex code, return as-is
            return match;
        });
    }

    replacePlaceholdersWithIndicators(text) {
        return text.replace(/%%FLEX_SNIPPET_(flex-snippet-\d+)%%/g, (match, snippetId) => {
            return `<div class="flex-snippet-placeholder" data-snippet-id="${snippetId}">📄 Flex Code Snippet (${snippetId})</div>`;
        });
    }

    createFlexCodeSnippet(snippet, domManager) {
        const snippetContainer = document.createElement('div');
        snippetContainer.className = 'flex-code-snippet';
        snippetContainer.id = snippet.id;

        const header = document.createElement('div');
        header.className = 'flex-snippet-header';
        header.innerHTML = `
            <div class="flex-snippet-metadata">
                <span class="flex-snippet-language"><span class="flex-icon">⚡</span> Flex Code ${snippet.languageIndicator || ''}</span>
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
        
        // Ensure clean code display without HTML entities and preserve line breaks
        const cleanHighlightedCode = this.highlightFlexSyntax(snippet.code);
        codeContent.innerHTML = cleanHighlightedCode;

        codeContainer.appendChild(lineNumbers);
        codeContainer.appendChild(codeContent);

        const footer = document.createElement('div');
        footer.className = 'flex-snippet-footer';
        footer.innerHTML = `<span class="flex-hint">💡 This code can be saved as a <code>.lx</code> or <code>.flex</code> file</span>`;

        snippetContainer.appendChild(header); 
        snippetContainer.appendChild(codeContainer);
        snippetContainer.appendChild(footer);

        header.querySelector('.flex-copy-button').addEventListener('click', () => this.copyCode(snippet.originalCode || snippet.code, header.querySelector('.flex-copy-button')));
        header.querySelector('.flex-expand-button').addEventListener('click', (e) => {
            e.stopPropagation();
            domManager.toggleFlexSnippetExpanded(snippetContainer);
        });

        return snippetContainer;
    }

    async copyCode(code, buttonElement) {
        try {
            // Ensure we copy clean, executable Flex code without HTML entities or tags
            let cleanCode = code;
            
            // If the code contains HTML tags, extract clean text
            if (/<[^>]+>/.test(code)) {
                cleanCode = this.extractCleanCode(code);
            } else {
                cleanCode = this.cleanFlexCode(code);
            }
            
            await navigator.clipboard.writeText(cleanCode);
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = '<span class="copy-icon">✅</span>';
            buttonElement.style.background = '#10b981';
            setTimeout(() => {
                buttonElement.innerHTML = originalText;
                buttonElement.style.background = '';
            }, 1500);
        } catch (err) {
            console.error('Failed to copy code: ', err);
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = '<span class="copy-icon">❌</span>';
            buttonElement.style.background = '#ef4444';
            setTimeout(() => {
                buttonElement.innerHTML = originalText;
                buttonElement.style.background = '';
            }, 2000);
        }
    }
}