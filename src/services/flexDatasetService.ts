import * as fs from 'fs';
import * as path from 'path';
import { FlexSpecification } from '../types';

/**
 * Service for managing the Flex language dataset and generating system prompts
 */
export class FlexDatasetService {
    private static instance: FlexDatasetService;
    private flexSpec: FlexSpecification | null = null;
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
     * Get the complete system prompt for AI interactions
     */
    public getSystemPrompt(): string {
        if (!this.flexSpec) {
            return this.getFallbackSystemPrompt();
        }

        try {
            const {
                ai_system_prompt: aiSystemPrompt,
                ESSENTIAL_FLEX_KNOWLEDGE: essentialKnowledge,
                CRITICAL_SYNTAX_PATTERNS: syntaxPatterns,
                code_examples: codeExamples,
                common_patterns: commonPatterns,
            } = this.flexSpec;

            const promptSections = {
                "ROLE": `${aiSystemPrompt.role} - ${aiSystemPrompt.description}`,
                "CRITICAL INSTRUCTIONS": Object.values(aiSystemPrompt.CRITICAL_INSTRUCTIONS).map(instr => `- ${instr}`).join('\n'),
                "ESSENTIAL FLEX LANGUAGE KNOWLEDGE": `
- **Language**: ${essentialKnowledge.language_identity}
- **Philosophy**: ${essentialKnowledge.core_philosophy}
- **File Extensions**: ${essentialKnowledge.file_extensions.join(', ')}
- **Unique Features**: 
  - ${essentialKnowledge.unique_features.join('\n  - ')}
`.trim(),
                "CRITICAL SYNTAX PATTERNS": this.formatSyntaxPatterns(syntaxPatterns),
                "CODE EXAMPLES": this.formatCodeExamples(codeExamples),
                "COMMON PATTERNS": this.formatCommonPatterns(commonPatterns),
            };

            const fullPrompt = Object.entries(promptSections)
                .map(([title, content]) => `## ${title}\n${content}`)
                .join('\n\n');

            return `# Flex Programming Assistant for VSCode\n\n${fullPrompt}\n\n## VSCODE INTEGRATION GUIDELINES:\n- Use \`\`\`flex code blocks for all Flex code examples.\n- Provide copy-pasteable, production-ready code snippets.\n- Format responses for easy scanning with headers and bullet points.\n\nRemember: You are an expert Flex programming assistant. Prioritize working code first, then provide clear explanations adapted to the user's expertise level.`;

        } catch (error) {
            console.error('Error generating system prompt:', error);
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
        };
    }
} 