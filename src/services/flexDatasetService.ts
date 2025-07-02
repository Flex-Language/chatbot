import * as fs from 'fs';
import * as path from 'path';
import { FlexLanguageSpec } from '../types';

/**
 * Service for managing the Flex language dataset and generating system prompts
 */
export class FlexDatasetService {
    private static instance: FlexDatasetService;
    private flexSpec: FlexLanguageSpec | null = null;
    private readonly datasetPath: string;

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
                this.flexSpec = JSON.parse(fileContent) as FlexLanguageSpec;
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
     * Get the complete system prompt for AI interactions
     */
    public getSystemPrompt(): string {
        if (!this.flexSpec) {
            return this.getFallbackSystemPrompt();
        }

        try {
            const aiPrompt = this.flexSpec.ai_system_prompt;
            const essentialKnowledge = this.flexSpec.ESSENTIAL_FLEX_KNOWLEDGE;
            const syntaxPatterns = this.flexSpec.CRITICAL_SYNTAX_PATTERNS;
            const codeExamples = this.formatCodeExamples(this.flexSpec.code_examples);
            const commonPatterns = this.formatCommonPatterns(this.flexSpec.common_patterns);
            const errorHandling = this.formatErrorHandling(this.flexSpec.error_handling);

            return `# Flex Programming Assistant for VSCode

${aiPrompt.description}

You are integrated into a VSCode extension to provide real-time assistance to Flex developers. Your responses will be displayed in a professional chat interface within their development environment.

## VSCODE EXTENSION CONTEXT:
- **Environment**: Integrated VSCode extension sidebar
- **User Context**: Active Flex developers writing code
- **Response Format**: Markdown with syntax highlighting support
- **Interaction Style**: Professional, concise, immediately actionable

## CRITICAL INSTRUCTIONS:
${Object.entries(aiPrompt.CRITICAL_INSTRUCTIONS).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## ESSENTIAL FLEX LANGUAGE KNOWLEDGE:
- **Language**: ${essentialKnowledge.language_identity}
- **Philosophy**: ${essentialKnowledge.core_philosophy}
- **File Extensions**: ${essentialKnowledge.file_extensions.join(', ')}
- **Unique Features**: ${essentialKnowledge.unique_features.join(', ')}

## CRITICAL SYNTAX PATTERNS:
${this.formatSyntaxPatterns(syntaxPatterns)}

## CODE EXAMPLES:
${codeExamples}

## COMMON PATTERNS:
${commonPatterns}

## ERROR HANDLING GUIDE:
${errorHandling}

## PERFORMANCE OPTIMIZATION:
${this.formatPerformanceGuidelines()}

## VSCODE INTEGRATION GUIDELINES:
- Use \`\`\`flex code blocks for all Flex code examples
- Provide copy-pasteable, production-ready code snippets
- Assume users may have limited time - prioritize immediate solutions
- Reference line numbers when helping with debugging (if provided)
- Suggest VSCode shortcuts or extensions when relevant
- Format responses for easy scanning with headers and bullet points

Remember: You are an expert Flex programming assistant integrated into VSCode, helping developers write better Flex code efficiently. Always prioritize working code first, then provide clear explanations adapted to the user's expertise level.`;

        } catch (error) {
            console.error('Error generating system prompt:', error);
            return this.getFallbackSystemPrompt();
        }
    }

    /**
     * Format code examples for the system prompt
     */
    private formatCodeExamples(examples: Record<string, any>): string {
        if (!examples) return '';

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
    private formatCommonPatterns(patterns: Record<string, any>): string {
        if (!patterns) return '';

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
    private formatSyntaxPatterns(patterns: Record<string, any>): string {
        if (!patterns) return '';

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
     * Format error handling information
     */
    private formatErrorHandling(errorHandling: any): string {
        if (!errorHandling || !errorHandling.error_categories) return '';

        const categories = errorHandling.error_categories;
        return Object.entries(categories)
            .map(([categoryName, category]: [string, any]) => {
                const errors = Object.entries(category)
                    .filter(([key]) => key !== 'description')
                    .map(([errorName, errorInfo]: [string, any]) => {
                        return `**${errorName}**: ${errorInfo.solution || errorInfo.cause || 'See documentation'}`;
                    })
                    .join('\n');

                return `### ${categoryName}:
${category.description || ''}
${errors}`;
            })
            .join('\n\n');
    }

    /**
     * Format performance optimization guidelines
     */
    private formatPerformanceGuidelines(): string {
        if (!this.flexSpec?.performance_optimization) return '';

        const perf = this.flexSpec.performance_optimization;
        let guidelines = '';

        if (perf.optimization_guidelines) {
            guidelines += '### Guidelines:\n' + perf.optimization_guidelines.map((g: string) => `- ${g}`).join('\n') + '\n\n';
        }

        if (perf.memory_management?.best_practices) {
            guidelines += '### Memory Management:\n' + perf.memory_management.best_practices.map((p: string) => `- ${p}`).join('\n');
        }

        return guidelines;
    }

    /**
     * Get a fallback system prompt if the dataset isn't available
     */
    private getFallbackSystemPrompt(): string {
        return `# Flex Programming Assistant for VSCode (Fallback Mode)

You are a senior-level expert assistant for the Flex programming language, integrated into a VSCode extension. Flex is a bilingual programming language that supports both Franco Arabic and English syntax.

## CORE FLEX FEATURES:
- **Bilingual Syntax**: Mixed Franco Arabic and English keywords
- **String Interpolation**: Use {variable} syntax for string templating
- **No Semicolons**: Clean syntax without required semicolons
- **Automatic Type Detection**: Smart type inference
- **File Extensions**: .flex, .lx

## CRITICAL SAFETY WARNING:
⚠️ **Franco loops with 'l7d' are INCLUSIVE** - always use 'length(array) - 1' for safe array access to prevent out-of-bounds errors.

## SYNTAX QUICK REFERENCE:
### Variables:
- Franco: \`rakm x = 10\` | English: \`int x = 10\`
- Franco: \`kasr y = 3.14\` | English: \`float y = 3.14\`

### Functions:
- Franco: \`sndo2 sayHello() { etb3("Hello") }\`
- English: \`fun sayHello() { print("Hello") }\`

### Conditionals:
- Franco: \`lw x > 5 { etb3("Big") }\`
- English: \`if (x > 5) { print("Big") }\`

### Loops:
- Franco: \`karr l7d 10 { etb3(i) }\` (INCLUSIVE - use length-1 for arrays)
- English: \`for(i=0; i<10; i++) { print(i) }\`

## VSCODE INTEGRATION GUIDELINES:
- Use \`\`\`flex code blocks for all code examples
- Provide immediate, actionable solutions
- Format responses with clear headers and bullet points
- Prioritize working code first, then explanations

Always help users write safe, efficient Flex code while respecting their syntax preferences (Franco vs English).`;
    }

    /**
     * Get specific section of the specification
     */
    public getSpecSection(section: keyof FlexLanguageSpec): any {
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
     * Get dataset statistics
     */
    public getDatasetStats(): Record<string, number> {
        if (!this.flexSpec) {
            return { loaded: 0 };
        }

        return {
            loaded: 1,
            codeExamples: Object.keys(this.flexSpec.code_examples || {}).length,
            commonPatterns: Object.keys(this.flexSpec.common_patterns || {}).length,
            syntaxPatterns: Object.keys(this.flexSpec.CRITICAL_SYNTAX_PATTERNS || {}).length,
            tokens: Object.keys(this.flexSpec.tokens || {}).length
        };
    }
} 