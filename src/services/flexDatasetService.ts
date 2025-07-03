import * as fs from 'fs';
import * as path from 'path';
import { FlexSpecification } from '../types';

/**
 * Enhanced Flex Language Dataset Service
 * Based on latest Flex-Language/Flex repository specifications
 * Supports comprehensive Franco/English syntax patterns and modern features
 */
export class FlexDatasetService {
    private static instance: FlexDatasetService;
    private flexSpec: FlexSpecification | null = null;
    private readonly datasetPath: string;
    
    // Core language specification derived from the official repository
    private readonly coreSpec = {
        version: "3.0_enhanced_repository_aligned",
        tokens: this.getEnhancedTokenPatterns(),
        keywords: this.getComprehensiveKeywords(),
        syntax_patterns: this.getModernSyntaxPatterns(),
        safety_warnings: this.getCriticalSafetyWarnings(),
        built_in_functions: this.getBuiltInFunctions(),
        examples: this.getComprehensiveExamples()
    };

    private constructor(extensionPath: string) {
        this.datasetPath = path.join(extensionPath, 'assets', 'datasets', 'flex_language_spec.json');
        this.loadFlexSpec();
    }

    /**
     * Get singleton instance of FlexDatasetService
     */
    public static getInstance(extensionPath?: string): FlexDatasetService {
        if (!FlexDatasetService.instance) {
            if (!extensionPath) {
                throw new Error('Extension path is required for first initialization');
            }
            FlexDatasetService.instance = new FlexDatasetService(extensionPath);
        }
        return FlexDatasetService.instance;
    }

    /**
     * Load the Flex language specification from JSON file
     */
    private loadFlexSpec(): void {
        try {
            if (fs.existsSync(this.datasetPath)) {
                const fileContent = fs.readFileSync(this.datasetPath, 'utf-8');
                this.flexSpec = JSON.parse(fileContent) as FlexSpecification;
                console.log('✅ Flex language specification loaded successfully');
            } else {
                console.warn(`⚠️ Flex dataset file not found at: ${this.datasetPath}`);
                this.flexSpec = null;
            }
        } catch (error) {
            console.error('❌ Error loading Flex language specification:', error);
            this.flexSpec = null;
        }
    }

    /**
     * Get the complete system prompt for AI interactions - Enhanced with repository data
     */
    public getSystemPrompt(): string {
        // Try to use dataset first, then fall back to enhanced core spec
        const sourceData = this.flexSpec || this.buildEnhancedSpecification();
        
        try {
            const promptSections = {
                "ROLE": "World-Class Flex Programming Language Expert - Repository-Aligned v3.0",
                
                "CRITICAL INSTRUCTIONS": this.buildCriticalInstructions(),
                
                "ESSENTIAL FLEX LANGUAGE KNOWLEDGE": this.buildEssentialKnowledge(),
                
                "⚠️ CRITICAL SAFETY WARNINGS": this.buildSafetyWarnings(),
                
                "COMPREHENSIVE SYNTAX PATTERNS": this.buildSyntaxPatterns(),
                
                "FRANCO ↔ ENGLISH KEYWORD MAPPINGS": this.buildKeywordMappings(),
                
                "MODERN CODE EXAMPLES": this.buildModernExamples(),
                
                "BUILT-IN FUNCTIONS & OPERATIONS": this.buildBuiltInFunctions(),
                
                "TOKEN PATTERNS & REGEX": this.buildTokenPatterns(),
                
                "CODE QUALITY STANDARDS": this.buildCodeQualityStandards()
            };

            const fullPrompt = Object.entries(promptSections)
                .map(([title, content]) => `## ${title}\n${content}`)
                .join('\n\n');

            return `# Enhanced Flex Programming Assistant for VSCode\n*Based on Official Flex-Language/Flex Repository*\n\n${fullPrompt}\n\n## VSCODE INTEGRATION GUIDELINES:\n- Use \`\`\`flex code blocks for all Flex code examples\n- Provide copy-pasteable, production-ready code snippets\n- Format responses with clear headers and bullet points\n- CRITICAL: Generate only clean Flex code without HTML entities or markup\n- Prioritize working code first, then explanations\n- Adapt verbosity to user expertise level\n\n**Remember: You are an expert Flex programming assistant with deep knowledge of both Franco Arabic and English syntax patterns. Always prioritize safety-first patterns, especially with Franco l7d loops.**`;

        } catch (error) {
            console.error('Error generating enhanced system prompt:', error);
            return this.getFallbackSystemPrompt();
        }
    }

    /**
     * Format code examples for the system prompt
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatCodeExamples(examples: Record<string, any>): string {
        if (!examples) { return ''; }

        return Object.entries(examples)
            .map(([name, example]) => {
                if (example.code && Array.isArray(example.code)) {
                    return `### ${example.description || name}:
\`\`\`flex
${example.code.join('\n')}
\`\`\``;
                }
                return '';
            })
            .filter(Boolean)
            .join('\n\n');
    }

    /**
     * Format common patterns for the system prompt
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatCommonPatterns(patterns: Record<string, any>): string {
        if (!patterns) { return ''; }

        return Object.entries(patterns)
            .map(([name, pattern]) => {
                if (Array.isArray(pattern)) {
                    return `### ${name}:
\`\`\`flex
${pattern.join('\n')}
\`\`\``;
                }
                return '';
            })
            .filter(Boolean)
            .join('\n\n');
    }

    /**
     * Format syntax patterns for the system prompt
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatSyntaxPatterns(patterns: Record<string, any>): string {
        if (!patterns) { return ''; }

        return Object.entries(patterns)
            .map(([category, pattern]) => {
                if (typeof pattern === 'object' && pattern.examples) {
                    return `### ${category}:
${Array.isArray(pattern.examples) ? pattern.examples.join('\n') : pattern.examples}`;
                }
                return '';
            })
            .filter(Boolean)
            .join('\n\n');
    }

    /**
     * Format syntax rules for the system prompt
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatSyntaxRules(rules: Record<string, any>): string {
        if (!rules) { return ''; }

        return Object.entries(rules)
            .map(([category, rule]) => {
                if (typeof rule === 'object' && rule.description) {
                    return `### ${category}:\n${rule.description}`;
                } else if (typeof rule === 'string') {
                    return `### ${category}:\n${rule}`;
                }
                return '';
            })
            .filter(Boolean)
            .join('\n\n');
    }

    /**
     * Format best practices for the system prompt
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatBestPractices(practices: Record<string, any>): string {
        if (!practices) { return ''; }

        return Object.entries(practices)
            .map(([name, practice]) => {
                return `### ${name}:\n${practice}`;
            })
            .filter(Boolean)
            .join('\n\n');
    }

    /**
     * Format error handling for the system prompt
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatErrorHandling(errorHandling: Record<string, any>): string {
        if (!errorHandling) { return ''; }

        const sections = [];
        
        if (errorHandling.description) {
            sections.push(`**Description**: ${errorHandling.description}`);
        }
        
        if (errorHandling.error_categories) {
            sections.push('**Error Categories**:');
            Object.entries(errorHandling.error_categories).forEach(([category, description]) => {
                sections.push(`- **${category}**: ${description}`);
            });
        }
        
        if (errorHandling.error_prevention_patterns) {
            sections.push('**Prevention Patterns**:');
            Object.entries(errorHandling.error_prevention_patterns).forEach(([pattern, description]) => {
                sections.push(`- **${pattern}**: ${description}`);
            });
        }

        return sections.join('\n');
    }

    /**
     * Format built-in functions for the system prompt
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private formatBuiltInFunctions(functions: Record<string, any>): string {
        if (!functions) { return ''; }

        const sections = [];
        
        if (functions.description) {
            sections.push(`**Description**: ${functions.description}`);
        }
        
        if (functions.core_functions) {
            sections.push('**Core Functions**:');
            Object.entries(functions.core_functions).forEach(([funcName, description]) => {
                sections.push(`- **${funcName}**: ${description}`);
            });
        }
        
        if (functions.list_methods) {
            sections.push('**List Methods**:');
            Object.entries(functions.list_methods).forEach(([method, description]) => {
                sections.push(`- **${method}**: ${description}`);
            });
        }

        return sections.join('\n');
    }

    /**
     * Enhanced fallback system prompt based on repository data
     */
    private getFallbackSystemPrompt(): string {
        return `# Enhanced Flex Programming Assistant for VSCode (Repository-Aligned v3.0)

You are a world-class expert assistant for the Flex programming language, with deep knowledge of both Franco Arabic and English syntax patterns. This assistant is based on the latest official Flex-Language/Flex repository specifications.

## CORE FLEX FEATURES (2024 Updated):
- **Bilingual Syntax**: Complete Franco Arabic + English keyword support
- **String Interpolation**: \`{variable}\` and \`{expression}\` syntax  
- **No Semicolons**: Clean, modern syntax
- **Auto Type Detection**: Smart inference with explicit typing available
- **File Extensions**: .flex, .lx
- **Import System**: geeb, geep, import keywords for modules

## ⚠️ CRITICAL SAFETY WARNING:
**Franco l7d loops are INCLUSIVE** - Always use \`karr i=0 l7d length(array) - 1\` for safe array access. The most common runtime error in Flex is out-of-bounds access from forgetting this rule.

## ENHANCED SYNTAX REFERENCE:

### Variables & Types:
| Franco | English | Example |
|--------|---------|---------|
| \`rakm\` | \`int\` | \`rakm x = 10\` |
| \`kasr\` | \`float\` | \`kasr pi = 3.14\` |
| \`so2al\` | \`bool\` | \`so2al active = sa7\` |
| \`klma\` | \`string\` | \`klma name = "Alex"\` |
| \`dorg\` | \`list\` | \`dorg items = [1,2,3]\` |

### Control Flow:
| Franco | English | Example |
|--------|---------|---------|
| \`lw\` | \`if\` | \`lw x > 5 { etb3("Big") }\` |
| \`aw\` | \`elif\` | \`aw x == 5 { etb3("Equal") }\` |
| \`gher\` | \`else\` | \`gher { etb3("Small") }\` |
| \`karr l7d\` | \`for\` | \`karr i=0 l7d 9 { etb3(i) }\` |
| \`talama\` | \`while\` | \`talama x < 10 { x++ }\` |

### Functions & I/O:
| Franco | English | Example |
|--------|---------|---------|
| \`sndo2\` | \`fun\` | \`sndo2 greet() { etb3("Hi") }\` |
| \`rg3\` | \`return\` | \`rg3 x + y\` |
| \`etb3\` | \`print\` | \`etb3("Hello {name}")\` |
| \`da5l\` | \`scan\` | \`x = da5l()\` |

### Enhanced List Operations:
- **Declaration**: \`dorg items = [1, 2.5, "text", sa7]\`
- **Access**: \`first = items[0]\`, \`nested = matrix[i][j]\`
- **Methods**: \`items.push(value)\`, \`items.pop()\`, \`items.remove(value)\`
- **Safety**: \`karr i=0 l7d length(items) - 1 { /* safe */ }\`

### Import System:
- **Franco**: \`geeb "path/to/module.lx"\`
- **Alternative**: \`geep "path/to/module.lx"\`
- **English**: \`import "path/to/module.lx"\`

## MODERN PATTERNS (2024):

### Safe Array Iteration:
\`\`\`flex
dorg numbers = [1, 2, 3, 4, 5]
karr i=0 l7d length(numbers) - 1 {
    etb3("Number {i}: {numbers[i]}")
}
\`\`\`

### Error-Safe Division:
\`\`\`flex
sndo2 safeDivide(rakm a, rakm b) {
    lw b != 0 {
        rg3 a / b
    } gher {
        etb3("Error: Division by zero")
        rg3 0
    }
}
\`\`\`

### Input Validation:
\`\`\`flex
etb3("Enter positive number:")
rakm num = da5l()
lw num > 0 {
    etb3("Valid: {num}")
} gher {
    etb3("Must be positive")
}
\`\`\`

## VSCODE INTEGRATION GUIDELINES:
- Use \`\`\`flex code blocks for all examples
- Provide immediate, actionable solutions
- Detect Franco vs English preference and maintain consistency
- Prioritize working code first, explanations second
- Include safety warnings for Franco loops
- Generate production-ready, copy-pasteable code

## RESPONSE OPTIMIZATION:
- **Beginner**: Provide step-by-step with both syntaxes
- **Intermediate**: Focus on practical solutions with brief explanations  
- **Expert**: Concise, technical responses with advanced patterns

Always help users write safe, efficient Flex code while respecting their syntax preferences and expertise level.`;
    }

    /**
     * Get specific section of the specification
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getSpecSection(section: keyof FlexSpecification): any {
        return this.flexSpec?.[section] || null;
    }

    /**
     * Check if dataset is loaded
     */
    public isDatasetLoaded(): boolean {
        return this.flexSpec !== null;
    }

    /**
     * Reload the dataset (useful for development)
     */
    public reload(): void {
        this.loadFlexSpec();
    }

    /**
     * Get enhanced dataset statistics
     */
    public getDatasetStats(): Record<string, number> {
        const keywords = this.getComprehensiveKeywords();
        const examples = this.getComprehensiveExamples();
        const tokens = this.getEnhancedTokenPatterns();
        const validTokens = this.getValidTokens();

        let totalKeywords = 0;
        let totalExamples = 0;

        // Count keywords from all categories
        Object.values(keywords).forEach(category => {
            if (category.franco) totalKeywords += category.franco.length;
            if (category.english) totalKeywords += category.english.length;
        });

        // Count examples from all categories
        Object.values(examples).forEach(category => {
            totalExamples += Object.keys(category).length;
        });

        return {
            loaded: 1,
            version: 3.0,
            keywordCategories: Object.keys(keywords).length,
            totalKeywords,
            tokenPatterns: Object.keys(tokens).length,
            exampleCategories: Object.keys(examples).length,
            totalExamples,
            validTokens: validTokens.length,
            bannedTokens: Object.keys(this.getBannedTokens()).length,
            safetyWarnings: Object.keys(this.getCriticalSafetyWarnings()).length,
            builtInFunctions: Object.keys(this.getBuiltInFunctions()).length,
            repositoryAligned: 1
        };
    }

    /**
     * Get banned tokens dynamically from enhanced dataset
     */
    public getBannedTokens(): Record<string, string> {
        const keywords = this.getComprehensiveKeywords();
        const bannedTokens: Record<string, string> = {};

        // Extract Franco to English mappings from all categories
        Object.values(keywords).forEach(category => {
            if (category.mappings) {
                Object.entries(category.mappings).forEach(([franco, english]) => {
                    bannedTokens[franco] = english;
                });
            }
        });

        // Add any additional banned tokens not covered by categories
        const additionalBanned = {
            'sando2': 'fun',
            'raga3': 'return',
            'out': 'print',
            'cout': 'print',
            'output': 'print',
            'printf': 'print',
            'read': 'scan',
            'input': 'scan',
            'd5l': 'scan',
            'da5al': 'scan',
            'stop': 'break',
            'wa2af': 'break',
            'otherwise': 'else',
            'cond': 'if',
            'loop': 'while',
            'fn': 'fun',
            'function': 'fun'
        };

        return { ...bannedTokens, ...additionalBanned };
    }

    /**
     * Get banned tokens as a comma-separated string for display
     */
    public getBannedTokensList(): string {
        const bannedTokens = this.getBannedTokens();
        return Object.keys(bannedTokens).map(token => `'${token}'`).join(', ');
    }

    /**
     * Get valid tokens for validation purposes from enhanced specification
     */
    public getValidTokens(): string[] {
        const keywords = this.getComprehensiveKeywords();
        const validTokens: string[] = [];

        // Extract all valid tokens from keyword categories
        Object.values(keywords).forEach(category => {
            if (category.franco) {
                validTokens.push(...category.franco);
            }
            if (category.english) {
                validTokens.push(...category.english);
            }
        });

        // Add additional valid tokens
        const additionalTokens = [
            // Additional function keywords
            'sando2', 'fn', 'function',
            // Additional I/O
            'out', 'cout', 'output', 'printf', 'read', 'input',
            // Additional control flow
            'cond', 'otherwise', 'loop', 'stop', 'wa2af',
            // List operations
            'push', 'pop', 'remove', 'delete', 'append',
            // Operators and literals
            '++', '--', 'and', 'or', 'not',
            // Built-in functions
            'length', 'scan',
            // Import keywords  
            'geeb', 'geep', 'import'
        ];

        return [...new Set([...validTokens, ...additionalTokens])];
    }

    /**
     * Enhanced token patterns based on official Flex repository regex definitions
     */
    private getEnhancedTokenPatterns() {
        return {
            // Function keywords - support multiple variations
            FUNCTION: /\b(?:fun|sndo2|sando2|fn|function)\b/,
            
            // Data types - Franco and English
            INTEGER: /\b(?:int|rakm)\b/,
            FLOAT: /\b(?:float|kasr|ksr)\b/,
            BOOLEAN: /\b(?:bool|so2al|s2al|so2l)\b/,
            STRING: /\b(?:string|klma|kalma)\b/,
            LIST: /\b(?:list|dorg|drg)\b/,
            
            // Control flow
            IF: /\b(?:if|lw|cond)\b/,
            ELIF: /\b(?:elif|aw)\b/,
            ELSE: /\b(?:else|gher|otherwise)\b/,
            WHILE: /\b(?:while|talama|tlma|loop)\b/,
            FOR: /\b(?:for|karr|krr|karar)\b/,
            REPEAT_UNTIL: /\b(?:l7d)\b/,
            
            // I/O operations
            PRINT: /\b(?:etb3|out|output|print|printf|cout)\b/,
            INPUT: /\b(?:scan|read|input|da5l|da5al|d5l)\b/,
            
            // Flow control
            RETURN: /\b(?:return|rg3|raga3)\b/,
            BREAK: /\b(?:break|stop|w2f|wa2af)\b/,
            
            // Import system
            IMPORT: /\b(?:geep|geeb|import)\b/,
            
            // List operations
            LIST_PUSH: /\.(?:append|push)\b/,
            LIST_POP: /\.(?:pop)\b/,
            LIST_REMOVE: /\.(?:remove|delete)\b/,
            
            // Operators
            COMPARISON: /(?:>=|=>|<=|=<|==|!=|>|<)/,
            LOGICAL: /\b(?:and|or|not)\b/,
            ARITHMETIC: /[+\-*/%]/,
            INCREMENT: /\+\+/,
            DECREMENT: /--/,
            
            // Boolean values
            TRUE: /\b(?:true|True|TRUE|sa7|s7|sah|saa7)\b/,
            FALSE: /\b(?:false|False|FALSE|ghalt|ghlt|ghalat)\b/,
            
            // Literals
            NUMBER: /\d+(?:\.\d+)?/,
            STRING_LITERAL: /".*?"/,
            
            // Structural
            BRACES: /[{}]/,
            BRACKETS: /[\[\]]/,
            PARENTHESES: /[()]/,
            
            // Comments
            SINGLE_COMMENT: /#.*|\/\/.*/,
            MULTI_COMMENT: /'''[\s\S]*?'''|\/\*[\s\S]*?\*\//
        };
    }

    /**
     * Comprehensive keyword mappings Franco ↔ English
     */
    private getComprehensiveKeywords() {
        return {
            // Data types
            data_types: {
                franco: ['rakm', 'kasr', 'so2al', 'klma', 'dorg'],
                english: ['int', 'float', 'bool', 'string', 'list'],
                mappings: {
                    'rakm': 'int',
                    'kasr': 'float', 
                    'so2al': 'bool',
                    'klma': 'string',
                    'dorg': 'list'
                }
            },
            
            // Control structures
            control_flow: {
                franco: ['lw', 'aw', 'gher', 'karr', 'l7d', 'talama'],
                english: ['if', 'elif', 'else', 'for', 'until', 'while'],
                mappings: {
                    'lw': 'if',
                    'aw': 'elif', 
                    'gher': 'else',
                    'karr': 'for',
                    'l7d': 'until',
                    'talama': 'while'
                }
            },
            
            // Functions
            functions: {
                franco: ['sndo2', 'sando2', 'rg3'],
                english: ['fun', 'function', 'return'],
                mappings: {
                    'sndo2': 'fun',
                    'sando2': 'fun',
                    'rg3': 'return'
                }
            },
            
            // I/O operations
            io_operations: {
                franco: ['etb3', 'da5l', 'da5al', 'd5l'],
                english: ['print', 'scan', 'input', 'read'],
                mappings: {
                    'etb3': 'print',
                    'da5l': 'input',
                    'da5al': 'input',
                    'd5l': 'input'
                }
            },
            
            // Boolean values
            boolean_values: {
                franco: ['sa7', 's7', 'sah', 'saa7', 'ghalt', 'ghlt', 'ghalat'],
                english: ['true', 'True', 'TRUE', 'false', 'False', 'FALSE'],
                mappings: {
                    'sa7': 'true',
                    's7': 'true',
                    'sah': 'true', 
                    'saa7': 'true',
                    'ghalt': 'false',
                    'ghlt': 'false',
                    'ghalat': 'false'
                }
            },
            
            // Flow control
            flow_control: {
                franco: ['w2f', 'wa2af'],
                english: ['break', 'stop'],
                mappings: {
                    'w2f': 'break',
                    'wa2af': 'break'
                }
            },
            
            // Import system
            imports: {
                franco: ['geeb', 'geep'],
                english: ['import'],
                mappings: {
                    'geeb': 'import',
                    'geep': 'import'
                }
            }
        };
    }

    /**
     * Modern syntax patterns reflecting current repository examples
     */
    private getModernSyntaxPatterns() {
        return {
            // Variable declarations
            variable_declaration: {
                franco_explicit: 'rakm x = 10, kasr pi = 3.14, so2al active = sa7',
                english_explicit: 'int x = 10, float pi = 3.14, bool active = true',
                auto_detection: 'x = 10, y = 3.14, z = "hello", active = true',
                multiple_same_line: 'int a, b, c  // All integers'
            },
            
            // Function definitions
            function_patterns: {
                franco_simple: 'sndo2 greet() { etb3("Hello") }',
                franco_with_params: 'sndo2 add(rakm a, rakm b) { rg3 a + b }',
                english_simple: 'fun greet() { print("Hello") }',
                english_with_params: 'fun add(int a, int b) { return a + b }',
                mixed_params: 'fun process(int x, y) { // y is untyped }'
            },
            
            // Control structures
            conditionals: {
                franco_if: 'lw x > 5 { etb3("Big") }',
                franco_if_elif_else: 'lw x > 10 { etb3("Big") } aw x > 5 { etb3("Medium") } gher { etb3("Small") }',
                english_if: 'if (x > 5) { print("Big") }',
                english_if_elif_else: 'if (x > 10) { print("Big") } elif (x > 5) { print("Medium") } else { print("Small") }',
                alternative_syntax: 'cond (x > 5) { print("Big") } otherwise { print("Small") }'
            },
            
            // Loop structures
            loops: {
                franco_for_range: 'karr i=1 l7d 5 { etb3(i) }  // INCLUSIVE: 1,2,3,4,5',
                franco_for_auto: 'karr l7d 10 { etb3("Hello") }  // 0 to 10 INCLUSIVE',
                franco_while: 'talama x < 10 { etb3(x); x++ }',
                english_for: 'for(i=0; i<10; i++) { print(i) }',
                english_while: 'while(x < 10) { print(x); x++ }',
                list_iteration: 'karr l7d length(array) - 1 { // SAFE array access }'
            },
            
            // I/O operations
            io_patterns: {
                franco_output: 'etb3("Hello {name}!")  // String interpolation',
                english_output: 'print("Hello {name}!")  // String interpolation',
                output_variations: 'out("text"), cout("text"), printf("text")',
                franco_input: 'name = da5l()  // General input',
                english_input: 'name = scan()  // General input',
                input_variations: 'read(), input(), d5l()'
            },
            
            // List operations
            list_operations: {
                declaration: 'dorg items = [1, 2.5, "text", sa7]  // Mixed types',
                english_declaration: 'list items = [1, 2.5, "text", true]',
                access: 'first = items[0], nested = matrix[i][j]',
                modification: 'items[0] = 99, items.push(new_item), items.pop()',
                methods: 'items.remove(value), length(items), items.append(item)'
            },
            
            // Import system
            imports: {
                franco_geeb: 'geeb "path/to/file.lx"',
                franco_geep: 'geep "path/to/file.lx"', 
                english: 'import "path/to/file.lx"'
            },
            
            // String interpolation
            string_interpolation: {
                simple: 'etb3("Value is {x}")',
                expression: 'etb3("Sum is {a + b}")',
                function_call: 'etb3("Length is {length(list)}")',
                nested: 'etb3("Matrix value: {matrix[i][j]}")'
            }
        };
    }

    /**
     * Critical safety warnings based on repository issues
     */
    private getCriticalSafetyWarnings() {
        return {
            franco_loop_safety: {
                title: "⚠️ CRITICAL: Franco Loop Safety",
                description: "Franco l7d loops are INCLUSIVE - they will cause out-of-bounds errors if not handled properly",
                safe_pattern: "karr i=0 l7d length(array) - 1 { /* Safe array access */ }",
                unsafe_pattern: "karr i=0 l7d length(array) { /* OUT OF BOUNDS ERROR! */ }",
                recommendation: "Always use 'length(array) - 1' for safe array iteration with Franco loops"
            },
            
            type_safety: {
                title: "Type Declaration Safety",
                description: "Once a variable is typed, it cannot change types",
                example: "int x = 5; x = \"hello\"; // ERROR: incompatible types"
            },
            
            division_safety: {
                title: "Division by Zero Protection",
                description: "Always check for zero before division or modulo operations",
                safe_pattern: "lw divisor != 0 { result = a / b } gher { etb3(\"Error: Division by zero\") }"
            },
            
            scope_awareness: {
                title: "Variable Scope Rules",
                description: "Variables declared inside functions are local and don't affect global variables",
                example: "Function parameters and local variables shadow global variables"
            }
        };
    }

    /**
     * Comprehensive built-in functions from repository
     */
    private getBuiltInFunctions() {
        return {
            core_functions: {
                'length': 'Returns the length of a string or list',
                'scan': 'Reads input from user (auto-detects type)',
                'print/etb3': 'Outputs text with string interpolation support',
                'input/da5l': 'Reads input as string or auto-detected type'
            },
            
            list_methods: {
                'push/append': 'Adds element to end of list',
                'pop': 'Removes and returns last element',
                'remove/delete': 'Removes first occurrence of value'
            },
            
            string_functions: {
                'length': 'Returns string length',
                'interpolation': 'Use {variable} syntax for string templating'
            },
            
            math_operations: {
                'arithmetic': 'Standard +, -, *, /, % operators',
                'comparison': '==, !=, >, <, >=, <=',
                'logical': 'and, or, not operators',
                'increment': '++ and -- operators'
            },
            
            flow_control: {
                'break/w2f': 'Exit from loops',
                'return/rg3': 'Return value from functions',
                'continue': 'Skip to next iteration (implied)'
            }
        };
    }

    /**
     * Comprehensive examples from repository analysis
     */
    private getComprehensiveExamples() {
        return {
            basic_programs: {
                hello_world: {
                    franco: 'etb3("Hello, Flex!")',
                    english: 'print("Hello, Flex!")'
                },
                
                variables_demo: {
                    code: `// Mixed syntax demonstration
rakm age = 25
klma name = "Flex User"
so2al isActive = sa7
dorg hobbies = ["coding", "reading", sa7]

etb3("Name: {name}, Age: {age}")
etb3("Active: {isActive}")
etb3("Hobbies: {hobbies}")`,
                    description: "Variable declaration and string interpolation"
                },
                
                control_flow_demo: {
                    code: `// Control structures
rakm x = 10

lw x > 15 {
    etb3("Big number")
} aw x > 5 {
    etb3("Medium number")  
} gher {
    etb3("Small number")
}

// Safe loop iteration
dorg numbers = [1, 2, 3, 4, 5]
karr i=0 l7d length(numbers) - 1 {
    etb3("Number {i}: {numbers[i]}")
}`,
                    description: "Conditionals and safe loop patterns"
                },
                
                function_demo: {
                    code: `// Function definitions
sndo2 add(rakm a, rakm b) {
    rg3 a + b
}

sndo2 greet(klma name) {
    etb3("Hello, {name}!")
}

// Function calls
rakm sum = add(5, 3)
greet("Flex User")
etb3("Sum: {sum}")`,
                    description: "Function definition and calling"
                },
                
                list_operations_demo: {
                    code: `// List operations
dorg items = [1, 2, 3]
etb3("Original: {items}")

// Add elements
items.push(4)
items.append("text")
etb3("After adding: {items}")

// Remove elements  
items.pop()
etb3("After pop: {items}")

items.remove(2)
etb3("After removing 2: {items}")

// Safe iteration
karr i=0 l7d length(items) - 1 {
    etb3("Item {i}: {items[i]}")
}`,
                    description: "Comprehensive list manipulation"
                }
            },
            
            advanced_patterns: {
                error_handling: {
                    code: `// Safe division
sndo2 safeDivide(rakm a, rakm b) {
    lw b != 0 {
        rg3 a / b
    } gher {
        etb3("Error: Cannot divide by zero")
        rg3 0
    }
}`,
                    description: "Error prevention pattern"
                },
                
                input_validation: {
                    code: `// Input with validation
etb3("Enter a positive number:")
rakm num = da5l()

lw num > 0 {
    etb3("Valid number: {num}")
} gher {
    etb3("Please enter a positive number")
}`,
                    description: "User input validation"
                }
            }
        };
    }

    /**
     * Build enhanced specification from repository data
     */
    private buildEnhancedSpecification() {
        return {
            language: "Flex",
            version: this.coreSpec.version,
            tokens: this.coreSpec.tokens,
            keywords: this.coreSpec.keywords,
            patterns: this.coreSpec.syntax_patterns,
            safety: this.coreSpec.safety_warnings,
            functions: this.coreSpec.built_in_functions,
            examples: this.coreSpec.examples
        };
    }

    /**
     * Build critical instructions section
     */
    private buildCriticalInstructions(): string {
        return `
### Response Optimization
- **Priority Order**: Working code first → Clear explanation → Best practices
- **Adaptive Verbosity**: Match complexity to user expertise level
- **Syntax Detection**: Auto-detect Franco vs English preference and maintain consistency

### Franco-English Keyword Explanations
- **CRITICAL**: When comparing Franco vs English keywords (e.g., 'lw' vs 'if'), ALWAYS show both versions correctly
- **Format**: Use exact keywords in code examples: 'lw' (Franco) vs 'if' (English)  
- **Clarity**: Never substitute one keyword for another in explanations
- **Examples**: Show working code for BOTH Franco and English versions side-by-side
- **MANDATORY**: Franco conditional = 'lw', English conditional = 'if' - NEVER mix these up
- **Side-by-side Format**: Always show Franco version first, then English equivalent
- **Never Confuse**: 'lw' is Franco, 'if' is English - these are NOT interchangeable in explanations

### Conditional Keywords - EXACT MAPPINGS
- **Franco Conditional**: 'lw' (Arabic-derived)
- **English Conditional**: 'if' (English)  
- **NEVER mix up**: 'lw' ≠ 'if' in explanations
- **Example Format**:
  Franco:  lw (age > 18) { ... }
  English: if (age > 18) { ... }

### Safety-First Approach  
- **Franco Loop Safety**: ⚠️ ALWAYS use \`length(array) - 1\` in l7d loops (they are INCLUSIVE)
- **Type Safety**: Once typed, variables cannot change types
- **Error Prevention**: Include validation for user input, division by zero, array bounds

### Code Quality Standards
- Generate production-ready, executable code only
- Use proper Flex syntax without HTML entities or markup
- Include meaningful variable names and inline comments
- Follow established patterns from the official repository

### Context Awareness
- Remember user's project patterns and naming conventions
- Track Franco vs English syntax preference throughout conversation
- Provide immediate fixes for errors, then explain root causes
`.trim();
    }

    /**
     * Build essential knowledge section
     */
    private buildEssentialKnowledge(): string {
        return `
### Language Identity
- **Name**: Flex - Bilingual Programming Language
- **Philosophy**: Maximum syntax flexibility with safety-first approach
- **File Extensions**: .flex, .lx
- **No Semicolons**: Clean syntax without required statement terminators

### Core Features
- **Bilingual Syntax**: Franco Arabic + English keywords
- **String Interpolation**: \`{variable}\` syntax for templating
- **Automatic Type Detection**: Smart inference with explicit typing available
- **Memory-Safe Operations**: Built-in bounds checking and error prevention
- **Module System**: Import operations with geeb/geep/import keywords
- **AI Debugging Support**: Enhanced error messages and suggestions

### Unique Characteristics
- Mixed Franco/English syntax in same file
- Inclusive Franco loops (l7d) requiring careful bounds handling
- Multiple keyword variations for same operations
- Auto-detection of numeric types from input
- Heterogeneous lists with mixed data types
- Built-in string interpolation with expression evaluation
`.trim();
    }

    /**
     * Build safety warnings section
     */
    private buildSafetyWarnings(): string {
        const warnings = this.getCriticalSafetyWarnings();
        return Object.entries(warnings).map(([key, warning]) => {
            if (typeof warning === 'object' && warning.title) {
                let section = `### ${warning.title}\n${warning.description}`;
                
                // Type-safe property access
                if ('safe_pattern' in warning && warning.safe_pattern) {
                    section += `\n\n**Safe Pattern:**\n\`\`\`flex\n${warning.safe_pattern}\n\`\`\``;
                }
                if ('unsafe_pattern' in warning && warning.unsafe_pattern) {
                    section += `\n\n**❌ Unsafe Pattern:**\n\`\`\`flex\n${warning.unsafe_pattern}\n\`\`\``;
                }
                if ('recommendation' in warning && warning.recommendation) {
                    section += `\n\n**Recommendation:** ${warning.recommendation}`;
                }
                if ('example' in warning && warning.example) {
                    section += `\n\n**Example:**\n\`\`\`flex\n${warning.example}\n\`\`\``;
                }
                
                return section;
            }
            return `### ${key}\n${warning}`;
        }).join('\n\n');
    }

    /**
     * Build comprehensive syntax patterns
     */
    private buildSyntaxPatterns(): string {
        const patterns = this.getModernSyntaxPatterns();
        return Object.entries(patterns).map(([category, pattern]) => {
            let section = `### ${category.replace(/_/g, ' ').toUpperCase()}`;
            
            if (typeof pattern === 'object') {
                Object.entries(pattern).forEach(([key, value]) => {
                    section += `\n**${key.replace(/_/g, ' ')}:**\n\`\`\`flex\n${value}\n\`\`\``;
                });
            } else {
                section += `\n\`\`\`flex\n${pattern}\n\`\`\``;
            }
            
            return section;
        }).join('\n\n');
    }

    /**
     * Build keyword mappings section
     */
    private buildKeywordMappings(): string {
        const keywords = this.getComprehensiveKeywords();
        return Object.entries(keywords).map(([category, data]) => {
            let section = `### ${category.replace(/_/g, ' ').toUpperCase()}`;
            
            if (data.mappings) {
                section += '\n\n| Franco | English | Description |';
                section += '\n|--------|---------|-------------|';
                Object.entries(data.mappings).forEach(([franco, english]) => {
                    section += `\n| \`${franco}\` | \`${english}\` | ${this.getKeywordDescription(franco)} |`;
                });
            }
            
            return section;
        }).join('\n\n');
    }

    /**
     * Build modern examples section
     */
    private buildModernExamples(): string {
        const examples = this.getComprehensiveExamples();
        let section = '';
        
        Object.entries(examples).forEach(([category, categoryExamples]) => {
            section += `\n### ${category.replace(/_/g, ' ').toUpperCase()}\n`;
            
            Object.entries(categoryExamples).forEach(([name, example]) => {
                if (typeof example === 'object') {
                    section += `\n#### ${name.replace(/_/g, ' ')}\n`;
                    
                    // Handle code examples
                    if ('code' in example && example.code) {
                        if ('description' in example && example.description) {
                            section += `${example.description}\n`;
                        }
                        section += `\`\`\`flex\n${example.code}\n\`\`\`\n`;
                    }
                    // Handle franco/english examples
                    else {
                        if ('franco' in example && example.franco) {
                            section += `**Franco:** \`${example.franco}\`\n`;
                        }
                        if ('english' in example && example.english) {
                            section += `**English:** \`${example.english}\`\n`;
                        }
                    }
                }
            });
        });
        
        return section;
    }

    /**
     * Build built-in functions section  
     */
    private buildBuiltInFunctions(): string {
        const functions = this.getBuiltInFunctions();
        return Object.entries(functions).map(([category, funcs]) => {
            let section = `### ${category.replace(/_/g, ' ').toUpperCase()}`;
            
            Object.entries(funcs).forEach(([name, description]) => {
                section += `\n- **${name}**: ${description}`;
            });
            
            return section;
        }).join('\n\n');
    }

    /**
     * Build token patterns section
     */
    private buildTokenPatterns(): string {
        const tokens = this.getEnhancedTokenPatterns();
        return Object.entries(tokens).map(([category, pattern]) => {
            return `### ${category}\n\`${pattern}\``;
        }).join('\n\n');
    }

    /**
     * Build code quality standards
     */
    private buildCodeQualityStandards(): string {
        return `
### Syntax Requirements
- Use only valid Flex keywords from the official specification
- Generate clean, executable code without HTML markup or entities
- Follow consistent indentation (4 spaces recommended)
- Include meaningful variable names and comments for complex logic

### Safety Standards
- Always validate user input before processing
- Use safe array iteration patterns with Franco loops
- Include error handling for division by zero and file operations
- Declare variable types when type safety is important

### Best Practices
- Prioritize working code over complex explanations
- Use string interpolation instead of concatenation
- Prefer explicit typing for function parameters
- Follow the repository's established patterns and conventions

### Negative Examples (Never Generate)
❌ \`<span class="keyword">int</span>\` or \`&quot;Hello&quot;\`
❌ \`karr i=0 l7d length(array) { }\` (out of bounds)
❌ Mixed syntax without proper context

### Positive Examples (Always Generate)
✅ \`int x = 10\` or \`rakm x = 10\`
✅ \`karr i=0 l7d length(array) - 1 { }\` (safe bounds)
✅ Consistent Franco or English syntax based on user preference
`.trim();
    }

    /**
     * Get description for a keyword
     */
    private getKeywordDescription(keyword: string): string {
        const descriptions: Record<string, string> = {
            'rakm': 'Integer type',
            'kasr': 'Float type', 
            'so2al': 'Boolean type',
            'klma': 'String type',
            'dorg': 'List type',
            'lw': 'If condition',
            'aw': 'Elif condition',
            'gher': 'Else condition',
            'karr': 'For loop',
            'l7d': 'Until/Range',
            'talama': 'While loop',
            'sndo2': 'Function definition',
            'rg3': 'Return statement',
            'etb3': 'Print output',
            'da5l': 'Input/scan',
            'sa7': 'True value',
            'ghalt': 'False value',
            'w2f': 'Break statement',
            'geeb': 'Import module',
            'geep': 'Import module'
        };
        return descriptions[keyword] || 'Flex keyword';
    }
}