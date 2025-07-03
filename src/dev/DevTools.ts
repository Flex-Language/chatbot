import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { debugManager } from '../core/DebugManager';
import { errorHandler } from '../core/ErrorHandler';
import { CodeAnalyzer } from './CodeAnalyzer';
import { PerformanceProfiler } from './PerformanceProfiler';
import {
  ProfileSession,
  ProfileResult,
  MemoryAnalysis,
  DevelopmentMetrics,
  Recommendation,
  CodeAnalysisResult,
  CodeQualityReport,
  CodeQualityIssue,
  CodeMetrics
} from '../types/dev';

/**
 * Development Tools Suite
 * Provides comprehensive development and debugging utilities
 */
export class DevTools {
  private static instance: DevTools;
  private profileSessions: Map<string, ProfileSession> = new Map();
  private codeAnalyzer: CodeAnalyzer;
  private performanceProfiler: PerformanceProfiler;
  private extensionUri: vscode.Uri | undefined;

  private constructor() {
    this.codeAnalyzer = new CodeAnalyzer();
    this.performanceProfiler = new PerformanceProfiler();
  }

  public static getInstance(): DevTools {
    if (!DevTools.instance) {
      DevTools.instance = new DevTools();
    }
    return DevTools.instance;
  }

  public initialize(extensionUri: vscode.Uri) {
    this.extensionUri = extensionUri;
  }

  /**
   * Show development dashboard
   */
  public async showDashboard(): Promise<void> {
    if (!this.extensionUri) {
      vscode.window.showErrorMessage('DevTools not initialized. Please restart the extension.');
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'flexDevDashboard',
      'Flex Chatbot Development Dashboard',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'assets')]
      }
    );

    panel.webview.html = this.generateDashboardHTML(panel.webview);

    // Handle messages from the webview
    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'runTests':
          await this.runTests();
          break;
        case 'showDebugReport':
          await debugManager.showDebugDashboard();
          break;
        case 'analyzeCode':
          await this.analyzeCodeAndUpdateDashboard();
          break;
        case 'startProfiling':
          this.startProfiling(message.sessionName);
          break;
        case 'stopProfiling':
          await this.stopProfilingAndUpdateDashboard(message.sessionName);
          break;
        case 'exportData':
          await this.exportDevelopmentData();
          break;
      }
    });
  }

  /**
   * Code analysis utilities
   */
  public async analyzeCode(): Promise<CodeAnalysisResult> {
    return this.codeAnalyzer.analyze();
  }

  /**
   * Performance profiling
   */
  public startProfiling(sessionName = 'default'): void {
    const session: ProfileSession = {
      name: sessionName,
      startTime: Date.now(),
      samples: [],
      isActive: true
    };

    this.profileSessions.set(sessionName, session);
    this.performanceProfiler.startProfiling(session);

    debugManager.debug(`Profiling started: ${sessionName}`);
  }

  /**
   * Stop profiling and get results
   */
  public stopProfiling(sessionName = 'default'): ProfileResult | null {
    const session = this.profileSessions.get(sessionName);
    if (!session || !session.isActive) {
      return null;
    }

    session.isActive = false;
    session.endTime = Date.now();
    session.duration = session.endTime - session.startTime;

    const result = this.performanceProfiler.stopProfiling(session);
    debugManager.debug(`Profiling stopped: ${sessionName}`, { result });

    return result;
  }

  /**
   * Memory analysis
   */
  public analyzeMemory(): MemoryAnalysis {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    return {
      timestamp: Date.now(),
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      rss: memUsage.rss,
      arrayBuffers: memUsage.arrayBuffers,
      cpuUsage: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      analysis: this.generateMemoryAnalysis(memUsage)
    };
  }

  /**
   * Generate development metrics report
   */
  public generateMetricsReport(): DevelopmentMetrics {
    const debugReport = debugManager.getDebugReport();
    const memoryAnalysis = this.analyzeMemory();
    const codeMetrics = this.codeAnalyzer.getMetrics();

    return {
      timestamp: Date.now(),
      debug: {
        isEnabled: debugReport.isDebugMode,
        activeSessions: debugReport.activeSessions.length,
        recentErrors: debugReport.recentErrors.length,
        performanceIssues: debugReport.performanceIssues.length
      },
      memory: memoryAnalysis,
      performance: {
        averageResponseTime: this.calculateAverageResponseTime(),
        memoryLeaks: this.detectMemoryLeaks(),
        slowOperations: debugReport.performanceIssues.map(p => ({
          operation: p.operation,
          averageDuration: p.averageDuration,
          callCount: p.totalCalls
        }))
      },
      code: codeMetrics,
      recommendations: this.generateRecommendations(debugReport, memoryAnalysis)
    };
  }

  /**
   * Export development data
   */
  public async exportDevelopmentData(): Promise<void> {
    const data = {
      timestamp: new Date().toISOString(),
      debugData: debugManager.exportDebugData(),
      systemInfo: {
        platform: process.platform,
        nodeVersion: process.version,
        vscodeVersion: vscode.version
      }
    };

    const exportPath = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file(`flex-chatbot-dev-data-${Date.now()}.json`),
      filters: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'JSON Files': ['json']
      }
    });

    if (exportPath) {
      fs.writeFileSync(exportPath.fsPath, JSON.stringify(data, null, 2));
      vscode.window.showInformationMessage('Development data exported successfully');
    }
  }

  /**
   * Hot reload functionality for development
   */
  public async hotReload(): Promise<void> {
    try {
      debugManager.debug('Hot reload initiated');

      // Clear module cache for development files
      this.clearModuleCache();

      // Reload configuration
      await vscode.commands.executeCommand('workbench.action.reloadWindow');

      debugManager.debug('Hot reload completed');
    } catch (error) {
      await errorHandler.handleError(error as Error, { component: 'devtools', operation: 'hot_reload' });
    }
  }

  /**
   * Code quality analysis
   */
  public async runCodeQualityCheck(): Promise<CodeQualityReport> {
    const issues: CodeQualityIssue[] = [];

    // Check for common issues
    const srcPath = path.join(__dirname, '..');
    const files = await this.getAllTSFiles(srcPath);

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      issues.push(...this.analyzeFileForIssues(file, content));
    }

    return {
      timestamp: Date.now(),
      filesAnalyzed: files.length,
      totalIssues: issues.length,
      issuesBySeverity: {
        error: issues.filter(i => i.severity === 'error').length,
        warning: issues.filter(i => i.severity === 'warning').length,
        info: issues.filter(i => i.severity === 'info').length
      },
      issues
    };
  }

  /**
   * Private helper methods
   */
  private generateDashboardHTML(webview: vscode.Webview): string {
    if (!this.extensionUri) {
      return '<h1>Error: DevTools not initialized</h1>';
    }

    const debugReport = debugManager.getDebugReport();

    const nonce = getNonce();
    const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'assets', 'webview', 'css', 'dev-dashboard.css'));
    const htmlPath = vscode.Uri.joinPath(this.extensionUri, 'assets', 'webview', 'html', 'dev-dashboard.html');
    let htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf8');

    htmlContent = htmlContent.replace(/\${cssUri}/g, cssUri.toString())
      .replace(/\${nonce}/g, nonce)
      .replace(
        '${(debugReport.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}',
        (debugReport.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)
      )
      .replace(/\${debugReport.activeSessions.length}/g, String(debugReport.activeSessions.length))
      .replace(/\${debugReport.recentErrors.length}/g, String(debugReport.recentErrors.length))
      .replace(/\${debugReport.performanceIssues.length}/g, String(debugReport.performanceIssues.length))
      .replace(/\${debugReport.isDebugMode ? 'online' : 'error'}/g, debugReport.isDebugMode ? 'online' : 'error')
      .replace(/\${debugReport.recentErrors.length === 0 ? 'online' : 'error'}/g, debugReport.recentErrors.length === 0 ? 'online' : 'error')
      .replace(/\${debugReport.performanceIssues.length === 0 ? 'online' : 'warning'}/g, debugReport.performanceIssues.length === 0 ? 'online' : 'warning')
      .replace(/\${new Date\(\).toLocaleTimeString\(\)}/g, new Date().toLocaleTimeString());

    return htmlContent;
  }

  public async runTests(): Promise<void> {
    vscode.window.showInformationMessage("Test execution from the DevTools panel is currently being refactored.");
  }

  private async analyzeCodeAndUpdateDashboard(): Promise<void> {
    try {
      const analysis = await this.analyzeCode();
      const qualityReport = await this.runCodeQualityCheck();

      vscode.window.showInformationMessage(
        `Code Analysis Complete: ${analysis.totalFiles} files, ${qualityReport.totalIssues} issues found`
      );
    } catch (error) {
      await errorHandler.handleError(error as Error, { component: 'devtools', operation: 'analyze_code' });
    }
  }

  private async stopProfilingAndUpdateDashboard(sessionName: string): Promise<void> {
    const result = this.stopProfiling(sessionName);
    if (result) {
      vscode.window.showInformationMessage(
        `Profiling Complete: ${result.duration}ms, ${result.samples.length} samples`
      );
    }
  }

  private clearModuleCache(): void {
    const moduleKeys = Object.keys(require.cache);
    moduleKeys.forEach(key => {
      if (key.includes('flex-chatbot') && !key.includes('node_modules')) {
        delete require.cache[key];
      }
    });
  }

  private async getAllTSFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules') {
        files.push(...await this.getAllTSFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  private analyzeFileForIssues(filePath: string, content: string): CodeQualityIssue[] {
    const issues: CodeQualityIssue[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Check for common issues
      if (line.includes('console.log') && !line.includes('//')) {
        issues.push({
          file: filePath,
          line: index + 1,
          column: line.indexOf('console.log'),
          severity: 'warning',
          message: 'Console.log statement found - consider using logger instead',
          rule: 'no-console'
        });
      }

      if (line.includes('TODO') || line.includes('FIXME')) {
        issues.push({
          file: filePath,
          line: index + 1,
          column: 0,
          severity: 'info',
          message: 'TODO/FIXME comment found',
          rule: 'todo-comment'
        });
      }

      if (line.length > 120) {
        issues.push({
          file: filePath,
          line: index + 1,
          column: 120,
          severity: 'info',
          message: 'Line too long (>120 characters)',
          rule: 'max-line-length'
        });
      }
    });

    return issues;
  }

  private generateMemoryAnalysis(memUsage: NodeJS.MemoryUsage): string[] {
    const analysis: string[] = [];
    const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

    if (heapUsagePercent > 80) {
      analysis.push('High heap usage detected - consider memory optimization');
    }

    if (memUsage.external > 50 * 1024 * 1024) {
      analysis.push('High external memory usage - check for memory leaks');
    }

    if (analysis.length === 0) {
      analysis.push('Memory usage is within normal parameters');
    }

    return analysis;
  }

  private calculateAverageResponseTime(): number {
    // This would typically aggregate from performance metrics
    return Math.random() * 500 + 200; // Mock implementation
  }

  private detectMemoryLeaks(): boolean {
    // This would implement actual memory leak detection
    return false; // Mock implementation
  }

  private generateRecommendations(
    debugReport: { recentErrors: unknown[]; performanceIssues: unknown[] },
    memoryAnalysis: MemoryAnalysis
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (debugReport.recentErrors.length > 5) {
      recommendations.push({
        category: 'Error Handling',
        priority: 'error',
        description: 'High error rate detected. Review error logs and implement better error handling.'
      });
    }

    if (memoryAnalysis.heapUsed > 100 * 1024 * 1024) {
      recommendations.push({
        category: 'Performance',
        priority: 'warning',
        description: 'High memory usage detected. Consider implementing memory optimization strategies.'
      });
    }

    if (debugReport.performanceIssues.length > 3) {
      recommendations.push({
        category: 'Performance',
        priority: 'warning',
        description: 'Multiple slow operations detected. Profile and optimize critical paths.'
      });
    }

    return recommendations;
  }

  public getMetrics(): CodeMetrics {
    return {
      maintainabilityIndex: 85,
      codeComplexity: 'Medium',
      testCoverage: 75
    };
  }

  /**
   * Dispose resources
   */
  public dispose(): void {
    this.profileSessions.clear();
  }
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const devTools = DevTools.getInstance();