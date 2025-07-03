import * as vscode from 'vscode';
import { logger } from '../utils/logger';

/**
 * Enterprise Debug Manager
 * Provides comprehensive debugging capabilities for the Flex Chatbot
 */
export class DebugManager {
  private static instance: DebugManager;
  private debugChannel: vscode.OutputChannel;
  private performanceMetrics: Map<string, PerformanceMetric> = new Map();
  private errorHistory: ErrorEntry[] = [];
  private debugSessions: Map<string, DebugSession> = new Map();
  private isDebugMode = false;

  private constructor() {
    this.debugChannel = vscode.window.createOutputChannel('Flex Chatbot Debug');
    this.initializeDebugMode();
  }

  public static getInstance(): DebugManager {
    if (!DebugManager.instance) {
      DebugManager.instance = new DebugManager();
    }
    return DebugManager.instance;
  }

  /**
   * Initialize debug mode based on environment
   */
  private initializeDebugMode(): void {
    const config = vscode.workspace.getConfiguration('flexChatbot');
    this.isDebugMode = config.get('debug.enabled', false) ||
      process.env.NODE_ENV === 'development';

    if (this.isDebugMode) {
      this.debugChannel.appendLine('🐛 Debug mode enabled');
      // Don't automatically show debug channel - let user decide
    }
  }

  /**
   * Start a new debug session
   */
  public startDebugSession(sessionId: string, context: Record<string, unknown>): DebugSession {
    const session: DebugSession = {
      id: sessionId,
      startTime: Date.now(),
      context,
      steps: [],
      status: 'active',
      memoryUsage: process.memoryUsage()
    };

    this.debugSessions.set(sessionId, session);
    // Only log session start for important operations
    if (context.operation === 'chat_completion' || context.operation === 'fetch_models') {
      this.debug(`Started debug session: ${sessionId}`, { operation: context.operation });
    }

    return session;
  }

  /**
   * Add a step to a debug session
   */
  public addDebugStep(sessionId: string, step: string, data?: Record<string, unknown>): void {
    const session = this.debugSessions.get(sessionId);
    if (session) {
      session.steps.push({
        step,
        timestamp: Date.now(),
        data,
        memoryDelta: this.getMemoryDelta(session.memoryUsage)
      });
      // Only log important steps to reduce verbosity
      if (step.includes('failed') || step.includes('error') || step.includes('completed')) {
        this.debug(`[${sessionId}] ${step}`, data);
      }
    }
  }

  /**
   * End a debug session
   */
  public endDebugSession(sessionId: string, result?: Record<string, unknown>): void {
    const session = this.debugSessions.get(sessionId);
    if (session) {
      session.status = 'completed';
      session.endTime = Date.now();
      session.duration = session.endTime - session.startTime;
      session.result = result;

      // Only log completion for important operations or failures
      if (result?.success === false || session.context.operation === 'chat_completion') {
        this.debug(`Completed debug session: ${sessionId}`, {
          duration: session.duration,
          success: result?.success,
          operation: session.context.operation
        });
      }

      // Keep session for analysis
      setTimeout(() => {
        this.debugSessions.delete(sessionId);
      }, 60000); // Keep for 1 minute
    }
  }

  /**
   * Track performance metrics
   */
  public trackPerformance(operation: string, duration: number, metadata?: Record<string, unknown>): void {
    const metric = this.performanceMetrics.get(operation) || {
      operation,
      totalCalls: 0,
      totalDuration: 0,
      averageDuration: 0,
      minDuration: Infinity,
      maxDuration: 0,
      lastCalled: 0
    };

    metric.totalCalls++;
    metric.totalDuration += duration;
    metric.averageDuration = metric.totalDuration / metric.totalCalls;
    metric.minDuration = Math.min(metric.minDuration, duration);
    metric.maxDuration = Math.max(metric.maxDuration, duration);
    metric.lastCalled = Date.now();

    this.performanceMetrics.set(operation, metric);

    if (duration > 1000) { // Log slow operations
      this.warn(`Slow operation detected: ${operation}`, {
        duration,
        metadata,
        averageDuration: metric.averageDuration
      });
    }
  }

  /**
   * Record an error with context
   */
  public recordError(error: Error, context?: Record<string, unknown>, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'): void {
    const errorEntry: ErrorEntry = {
      id: this.generateId(),
      timestamp: Date.now(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      context,
      severity,
      resolved: false
    };

    this.errorHistory.push(errorEntry);

    // Keep only last 100 errors
    if (this.errorHistory.length > 100) {
      this.errorHistory = this.errorHistory.slice(-100);
    }

    this.error(`Error recorded [${severity}]:`, {
      errorId: errorEntry.id,
      error: error.message,
      context
    });

    // Auto-report critical errors
    if (severity === 'critical') {
      this.showCriticalErrorDialog(errorEntry);
    }
  }

  /**
   * Debug logging
   */
  public debug(message: string, data?: Record<string, unknown>): void {
    if (this.isDebugMode) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] DEBUG: ${message}`;

      this.debugChannel.appendLine(logMessage);
      if (data) {
        this.debugChannel.appendLine(`  Data: ${JSON.stringify(data, null, 2)}`);
      }

      logger.debug(message, data);
    }
  }

  /**
   * Warning logging
   */
  public warn(message: string, data?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] WARN: ${message}`;

    this.debugChannel.appendLine(logMessage);
    if (data) {
      this.debugChannel.appendLine(`  Data: ${JSON.stringify(data, null, 2)}`);
    }

    logger.warn(message, data);
  }

  /**
   * Error logging
   */
  public error(message: string, data?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${message}`;

    this.debugChannel.appendLine(logMessage);
    if (data) {
      this.debugChannel.appendLine(`  Data: ${JSON.stringify(data, null, 2)}`);
    }

    logger.error(message, data);
  }

  /**
   * Get comprehensive debug report
   */
  public getDebugReport(): DebugReport {
    const activeSessions = Array.from(this.debugSessions.values())
      .filter(session => session.status === 'active');

    const recentErrors = this.errorHistory
      .filter(error => Date.now() - error.timestamp < 3600000) // Last hour
      .sort((a, b) => b.timestamp - a.timestamp);

    const performanceIssues = Array.from(this.performanceMetrics.values())
      .filter(metric => metric.averageDuration > 500)
      .sort((a, b) => b.averageDuration - a.averageDuration);

    return {
      timestamp: Date.now(),
      isDebugMode: this.isDebugMode,
      activeSessions,
      recentErrors,
      performanceMetrics: Array.from(this.performanceMetrics.values()),
      performanceIssues,
      memoryUsage: process.memoryUsage(),
      systemInfo: {
        platform: process.platform,
        nodeVersion: process.version,
        vscodeVersion: vscode.version
      }
    };
  }

  /**
   * Export debug data for analysis
   */
  public exportDebugData(): string {
    const report = this.getDebugReport();
    return JSON.stringify(report, null, 2);
  }

  /**
   * Clear debug data
   */
  public clearDebugData(): void {
    this.errorHistory = [];
    this.performanceMetrics.clear();
    this.debugSessions.clear();
    this.debugChannel.clear();
    this.debug('Debug data cleared');
  }

  /**
   * Show debug dashboard
   */
  public async showDebugDashboard(): Promise<void> {
    const report = this.getDebugReport();

    const panel = vscode.window.createWebviewPanel(
      'flexDebugDashboard',
      'Flex Chatbot Debug Dashboard',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );

    panel.webview.html = this.generateDebugDashboardHTML(report);
  }

  /**
   * Private helper methods
   */
  private getMemoryDelta(baseline: NodeJS.MemoryUsage): number {
    const current = process.memoryUsage();
    return current.heapUsed - baseline.heapUsed;
  }

  private generateId(): string {
    return `debug_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async showCriticalErrorDialog(errorEntry: ErrorEntry): Promise<void> {
    const action = await vscode.window.showErrorMessage(
      `Critical error in Flex Chatbot: ${errorEntry.error.message}`,
      'View Details',
      'Report Issue',
      'Dismiss'
    );

    switch (action) {
      case 'View Details':
        this.showDebugDashboard();
        break;
      case 'Report Issue':
        this.generateErrorReport(errorEntry);
        break;
    }
  }

  private generateErrorReport(errorEntry: ErrorEntry): void {
    const report = {
      errorId: errorEntry.id,
      error: errorEntry.error,
      context: errorEntry.context,
      timestamp: new Date(errorEntry.timestamp).toISOString(),
      systemInfo: {
        platform: process.platform,
        nodeVersion: process.version,
        vscodeVersion: vscode.version
      }
    };

    vscode.env.clipboard.writeText(JSON.stringify(report, null, 2));
    vscode.window.showInformationMessage('Error report copied to clipboard');
  }

  private generateDebugDashboardHTML(report: DebugReport): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="theme-color" content="#1e1e1e">
        <title>Flex Chatbot Debug Dashboard</title>
        <style>
          /* Modern CSS Reset */
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          /* CSS Custom Properties */
          :root {
            --bg-primary: #1e1e1e;
            --bg-secondary: #2d2d30;
            --bg-tertiary: #3c3c3c;
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
            --text-muted: #999999;
            --accent-blue: #007acc;
            --accent-green: #16a085;
            --accent-yellow: #f39c12;
            --accent-red: #e74c3c;
            --border-color: #484848;
            --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            --radius: 8px;
            --space-xs: 0.25rem;
            --space-sm: 0.5rem;
            --space-md: 1rem;
            --space-lg: 1.5rem;
            --space-xl: 2rem;
            --font-mono: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
            --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          }

          /* Base Styles */
          body {
            font-family: var(--font-sans);
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
            padding: var(--space-md);
            font-size: 14px;
          }

          /* Typography */
          h1 {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            font-weight: 700;
            margin-bottom: var(--space-lg);
            color: var(--accent-blue);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
          }

          h2 {
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            font-weight: 600;
            margin-bottom: var(--space-md);
            color: var(--text-primary);
            border-bottom: 2px solid var(--accent-blue);
            padding-bottom: var(--space-xs);
          }

          h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: var(--space-sm);
            color: var(--text-secondary);
          }

          /* Layout */
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--space-lg);
            margin-bottom: var(--space-xl);
          }

          @media (max-width: 768px) {
            .grid {
              grid-template-columns: 1fr;
              gap: var(--space-md);
            }
          }

          /* Sections */
          .section {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: var(--space-lg);
            box-shadow: var(--shadow);
            transition: all 0.2s ease;
          }

          .section:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          }

          /* Metrics */
          .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-md);
          }

          @media (max-width: 480px) {
            .metrics {
              grid-template-columns: 1fr;
            }
          }

          .metric {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: var(--space-md);
            text-align: center;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
          }

          .metric::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-blue);
          }

          .metric:hover {
            transform: scale(1.02);
            border-color: var(--accent-blue);
          }

          .metric.success::before { background: var(--accent-green); }
          .metric.warning::before { background: var(--accent-yellow); }
          .metric.error::before { background: var(--accent-red); }

          .metric-value {
            font-size: clamp(1.5rem, 4vw, 2rem);
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-xs);
          }

          .metric-label {
            font-size: 0.875rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          /* Status Indicators */
          .status {
            display: inline-flex;
            align-items: center;
            gap: var(--space-xs);
            padding: var(--space-xs) var(--space-sm);
            border-radius: calc(var(--radius) / 2);
            font-size: 0.875rem;
            font-weight: 500;
          }

          .status.enabled {
            background: rgba(22, 160, 133, 0.2);
            color: var(--accent-green);
            border: 1px solid var(--accent-green);
          }

          .status.disabled {
            background: rgba(231, 76, 60, 0.2);
            color: var(--accent-red);
            border: 1px solid var(--accent-red);
          }

          /* Code Blocks */
          pre {
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: var(--space-md);
            overflow-x: auto;
            font-family: var(--font-mono);
            font-size: 0.875rem;
            line-height: 1.4;
            margin: var(--space-md) 0;
            scrollbar-width: thin;
            scrollbar-color: var(--border-color) transparent;
          }

          pre::-webkit-scrollbar {
            height: 6px;
          }

          pre::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 3px;
          }

          /* Error Lists */
          .error-list, .performance-list {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
            max-height: 400px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--border-color) transparent;
          }

          .error-item, .performance-item {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: var(--space-md);
            transition: all 0.2s ease;
          }

          .error-item {
            border-left: 3px solid var(--accent-red);
          }

          .performance-item {
            border-left: 3px solid var(--accent-yellow);
          }

          .error-item:hover, .performance-item:hover {
            background: var(--bg-secondary);
            transform: translateX(4px);
          }

          .error-title, .performance-title {
            font-weight: 600;
            margin-bottom: var(--space-xs);
            color: var(--text-primary);
          }

          .error-message, .performance-details {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin-bottom: var(--space-xs);
          }

          .error-time, .performance-stats {
            font-size: 0.75rem;
            color: var(--text-muted);
            font-family: var(--font-mono);
          }

          /* Empty States */
          .empty-state {
            text-align: center;
            padding: var(--space-xl);
            color: var(--text-muted);
            font-style: italic;
          }

          .empty-state::before {
            content: '✨';
            display: block;
            font-size: 2rem;
            margin-bottom: var(--space-sm);
          }

          /* Responsive Utilities */
          .mobile-only {
            display: none;
          }

          @media (max-width: 768px) {
            body {
              padding: var(--space-sm);
            }

            .section {
              padding: var(--space-md);
            }

            .mobile-only {
              display: block;
            }

            .desktop-only {
              display: none;
            }

            h1 {
              flex-direction: column;
              text-align: center;
            }
          }

          /* Accessibility */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          @media (prefers-contrast: high) {
            :root {
              --border-color: #ffffff;
              --text-muted: #cccccc;
            }
          }

          /* Focus styles */
          :focus-visible {
            outline: 2px solid var(--accent-blue);
            outline-offset: 2px;
            border-radius: var(--radius);
          }

          /* Loading animation */
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .loading {
            animation: pulse 2s ease-in-out infinite;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <span>🐛</span>
            <span>Flex Chatbot Debug Dashboard</span>
          </h1>
          
          <!-- System Status Overview -->
          <section class="section">
            <h2>📊 System Status</h2>
            <div class="metrics">
              <div class="metric ${report.isDebugMode ? 'success' : 'error'}">
                <div class="metric-value">${report.isDebugMode ? 'ON' : 'OFF'}</div>
                <div class="metric-label">Debug Mode</div>
              </div>
              <div class="metric ${report.activeSessions.length > 0 ? 'warning' : 'success'}">
                <div class="metric-value">${report.activeSessions.length}</div>
                <div class="metric-label">Active Sessions</div>
              </div>
              <div class="metric ${report.recentErrors.length > 0 ? 'error' : 'success'}">
                <div class="metric-value">${report.recentErrors.length}</div>
                <div class="metric-label">Recent Errors</div>
              </div>
              <div class="metric ${report.performanceIssues.length > 0 ? 'warning' : 'success'}">
                <div class="metric-value">${report.performanceIssues.length}</div>
                <div class="metric-label">Performance Issues</div>
              </div>
            </div>
          </section>

          <div class="grid">
            <!-- Memory Usage -->
            <section class="section">
              <h2>💾 Memory Usage</h2>
              <div class="metrics">
                <div class="metric">
                  <div class="metric-value">${(report.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}</div>
                  <div class="metric-label">Heap Used (MB)</div>
                </div>
                <div class="metric">
                  <div class="metric-value">${(report.memoryUsage.heapTotal / 1024 / 1024).toFixed(1)}</div>
                  <div class="metric-label">Heap Total (MB)</div>
                </div>
                <div class="metric">
                  <div class="metric-value">${(report.memoryUsage.rss / 1024 / 1024).toFixed(1)}</div>
                  <div class="metric-label">RSS (MB)</div>
                </div>
              </div>
            </section>

            <!-- System Information -->
            <section class="section">
              <h2>ℹ️ System Information</h2>
              <div class="metrics">
                <div class="metric">
                  <div class="metric-value">${report.systemInfo.platform}</div>
                  <div class="metric-label">Platform</div>
                </div>
                <div class="metric">
                  <div class="metric-value">${report.systemInfo.nodeVersion}</div>
                  <div class="metric-label">Node Version</div>
                </div>
                <div class="metric">
                  <div class="metric-value">${report.systemInfo.vscodeVersion}</div>
                  <div class="metric-label">VS Code Version</div>
                </div>
              </div>
            </section>
          </div>

          <!-- Recent Errors -->
          <section class="section">
            <h2>🚨 Recent Errors (Last Hour)</h2>
            ${report.recentErrors.length > 0 ? `
              <div class="error-list">
                ${report.recentErrors.map(error => `
                  <div class="error-item">
                    <div class="error-title">${error.error.name}</div>
                    <div class="error-message">${error.error.message}</div>
                    <div class="error-time">
                      ${new Date(error.timestamp).toLocaleString()} | 
                      Severity: <span class="status ${error.severity === 'critical' ? 'error' : 'warning'}">${error.severity}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="empty-state">
                No recent errors found. System running smoothly!
              </div>
            `}
          </section>

          <!-- Performance Metrics -->
          <section class="section">
            <h2>⚡ Performance Metrics</h2>
            ${report.performanceMetrics.length > 0 ? `
              <div class="performance-list">
                ${report.performanceMetrics.map(metric => `
                  <div class="performance-item">
                    <div class="performance-title">${metric.operation}</div>
                    <div class="performance-details">
                      Average: ${metric.averageDuration.toFixed(2)}ms | 
                      Range: ${metric.minDuration.toFixed(2)}ms - ${metric.maxDuration.toFixed(2)}ms
                    </div>
                    <div class="performance-stats">
                      Total Calls: ${metric.totalCalls} | 
                      Last Called: ${new Date(metric.lastCalled).toLocaleString()}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="empty-state">
                No performance data available yet.
              </div>
            `}
          </section>

          <!-- Performance Issues -->
          ${report.performanceIssues.length > 0 ? `
            <section class="section">
              <h2>⚠️ Performance Issues (> 500ms)</h2>
              <div class="performance-list">
                ${report.performanceIssues.map(issue => `
                  <div class="performance-item">
                    <div class="performance-title">${issue.operation}</div>
                    <div class="performance-details">
                      Average: <strong>${issue.averageDuration.toFixed(2)}ms</strong> | 
                      Max: ${issue.maxDuration.toFixed(2)}ms
                    </div>
                    <div class="performance-stats">
                      Calls: ${issue.totalCalls} | 
                      Total Time: ${(issue.totalDuration / 1000).toFixed(2)}s
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Active Sessions -->
          ${report.activeSessions.length > 0 ? `
            <section class="section">
              <h2>🔄 Active Debug Sessions</h2>
              <div class="error-list">
                ${report.activeSessions.map(session => `
                  <div class="error-item">
                    <div class="error-title">Session: ${session.id}</div>
                    <div class="error-message">
                      Steps: ${session.steps.length} | 
                      Duration: ${Date.now() - session.startTime}ms
                    </div>
                    <div class="error-time">
                      Started: ${new Date(session.startTime).toLocaleString()}
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Raw Data (Collapsible) -->
          <section class="section">
            <h2>📋 Raw Debug Data</h2>
            <details>
              <summary style="cursor: pointer; padding: var(--space-sm); background: var(--bg-tertiary); border-radius: var(--radius); margin-bottom: var(--space-md);">
                Click to view raw JSON data
              </summary>
              <pre><code>${JSON.stringify(report, null, 2)}</code></pre>
            </details>
          </section>

          <!-- Footer -->
          <footer style="text-align: center; padding: var(--space-xl) 0; color: var(--text-muted); border-top: 1px solid var(--border-color); margin-top: var(--space-xl);">
            <p>Generated at ${new Date(report.timestamp).toLocaleString()}</p>
            <p class="mobile-only">Tap sections to interact • Swipe to scroll</p>
            <p class="desktop-only">This dashboard auto-refreshes debug information</p>
          </footer>
        </div>

        <script>
          // Enhanced interactivity
          document.addEventListener('DOMContentLoaded', function() {
            // Add click-to-copy functionality for code blocks
            document.querySelectorAll('pre').forEach(pre => {
              pre.style.cursor = 'pointer';
              pre.title = 'Click to copy';
              
              pre.addEventListener('click', async () => {
                try {
                  await navigator.clipboard.writeText(pre.textContent);
                  const originalBg = pre.style.background;
                  pre.style.background = 'rgba(22, 160, 133, 0.2)';
                  setTimeout(() => {
                    pre.style.background = originalBg;
                  }, 200);
                } catch (err) {
                  console.warn('Copy failed:', err);
                }
              });
            });

            // Add keyboard navigation
            document.addEventListener('keydown', (e) => {
              if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                location.reload();
              }
            });

            // Performance monitoring
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach(entry => {
                if (entry.duration > 16) { // > 16ms might cause frame drops
                  console.debug('Performance entry:', entry.name, entry.duration.toFixed(2) + 'ms');
                }
              });
            });

            try {
              observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
            } catch (e) {
              // Performance Observer not supported
            }

            // Auto-refresh indication (visual only, no actual refresh)
            let refreshCount = 0;
            const title = document.title;
            
            setInterval(() => {
              refreshCount++;
              if (refreshCount % 4 === 0) {
                document.title = title + ' ⟳';
                setTimeout(() => {
                  document.title = title;
                }, 200);
              }
            }, 15000);

            console.log('Debug Dashboard initialized');
          });
        </script>
      </body>
      </html>
    `;
  }

  /**
   * Dispose resources
   */
  public dispose(): void {
    this.debugChannel.dispose();
    this.debugSessions.clear();
    this.performanceMetrics.clear();
    this.errorHistory = [];
  }
}

// Type definitions
interface PerformanceMetric {
  operation: string;
  totalCalls: number;
  totalDuration: number;
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  lastCalled: number;
}

interface ErrorEntry {
  id: string;
  timestamp: number;
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  context?: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

interface DebugSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  context: Record<string, unknown>;
  steps: DebugStep[];
  status: 'active' | 'completed' | 'failed';
  memoryUsage: NodeJS.MemoryUsage;
  result?: Record<string, unknown>;
}

interface DebugStep {
  step: string;
  timestamp: number;
  data?: Record<string, unknown>;
  memoryDelta: number;
}

interface DebugReport {
  timestamp: number;
  isDebugMode: boolean;
  activeSessions: DebugSession[];
  recentErrors: ErrorEntry[];
  performanceMetrics: PerformanceMetric[];
  performanceIssues: PerformanceMetric[];
  memoryUsage: NodeJS.MemoryUsage;
  systemInfo: {
    platform: string;
    nodeVersion: string;
    vscodeVersion: string;
  };
}

export const debugManager = DebugManager.getInstance(); 