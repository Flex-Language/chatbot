// Type definitions for Development Tools
export interface ProfileSession {
    name: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    samples: ProfileSample[];
    isActive: boolean;
}

export interface ProfileSample {
    timestamp: number;
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: NodeJS.CpuUsage;
}

export interface ProfileResult {
    sessionName: string;
    duration: number;
    samples: ProfileSample[];
    averageMemory: number;
    memoryTrend: 'increasing' | 'decreasing' | 'stable';
    cpuUsage: number;
}

export interface MemoryAnalysis {
    timestamp: number;
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss: number;
    arrayBuffers: number;
    cpuUsage: {
        user: number;
        system: number;
    };
    analysis: string[];
}

export interface DevelopmentMetrics {
    timestamp: number;
    debug: {
        isEnabled: boolean;
        activeSessions: number;
        recentErrors: number;
        performanceIssues: number;
    };
    memory: MemoryAnalysis;
    performance: {
        averageResponseTime: number;
        memoryLeaks: boolean;
        slowOperations: Array<{
            operation: string;
            averageDuration: number;
            callCount: number;
        }>;
    };
    code: CodeMetrics;
    recommendations: Recommendation[];
}

export interface Recommendation {
    category: string;
    priority: 'error' | 'warning' | 'info';
    description: string;
}

export interface CodeAnalysisResult {
    totalFiles: number;
    totalLines: number;
    totalFunctions: number;
    totalClasses: number;
    averageLinesPerFile: number;
    complexity: 'Low' | 'Medium' | 'High';
}

export interface CodeQualityReport {
    timestamp: number;
    filesAnalyzed: number;
    totalIssues: number;
    issuesBySeverity: {
        error: number;
        warning: number;
        info: number;
    };
    issues: CodeQualityIssue[];
}

export interface CodeQualityIssue {
    file: string;
    line: number;
    column: number;
    severity: 'error' | 'warning' | 'info';
    message: string;
    rule: string;
}

export interface CodeMetrics {
    maintainabilityIndex: number;
    codeComplexity: string;
    testCoverage: number;
} 