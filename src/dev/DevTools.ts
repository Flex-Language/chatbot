import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { debugManager } from '../core/DebugManager';
import { errorHandler } from '../core/ErrorHandler';
import { testFramework } from '../test/TestFramework';

/**
 * Development Tools Suite
 * Provides comprehensive development and debugging utilities
 */
export class DevTools {
    private static instance: DevTools;
    private profileSessions: Map<string, ProfileSession> = new Map();
    private codeAnalyzer: CodeAnalyzer;
    private performanceProfiler: PerformanceProfiler;

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

    /**
     * Show development dashboard
     */
    public async showDashboard(): Promise<void> {
        const panel = vscode.window.createWebviewPanel(
            'flexDevDashboard',
            'Flex Chatbot Development Dashboard',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        panel.webview.html = this.generateDashboardHTML();

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
                    await this.analyzeCodeAndUpdateDashboard(panel);
                    break;
                case 'startProfiling':
                    this.startProfiling(message.sessionName);
                    break;
                case 'stopProfiling':
                    await this.stopProfilingAndUpdateDashboard(panel, message.sessionName);
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
    public startProfiling(sessionName: string = 'default'): void {
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
    public stopProfiling(sessionName: string = 'default'): ProfileResult | null {
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
            recommendations: this.generateRecommendations(debugReport, memoryAnalysis, codeMetrics)
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
    private generateDashboardHTML(): string {
        const debugReport = debugManager.getDebugReport();

        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="theme-color" content="#1e1e1e">
        <title>Flex Chatbot Development Dashboard</title>
        <style>
          /* Modern CSS Reset and Variables */
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          :root {
            --bg-primary: #1e1e1e;
            --bg-secondary: #2d2d30;
            --bg-tertiary: #3c3c3c;
            --bg-card: #252526;
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
            --text-muted: #999999;
            --accent-dev: #00d4aa;
            --accent-test: #4fc3f7;
            --accent-debug: #ff9800;
            --accent-export: #9c27b0;
            --success: #4caf50;
            --warning: #ff9800;
            --error: #f44336;
            --border: #484848;
            --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            --radius: 12px;
            --space-xs: 0.25rem;
            --space-sm: 0.5rem;
            --space-md: 1rem;
            --space-lg: 1.5rem;
            --space-xl: 2rem;
            --space-2xl: 3rem;
            --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            --font-mono: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
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
            overflow-x: hidden;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
          }

          /* Typography */
          h1 {
            font-size: clamp(1.8rem, 5vw, 3rem);
            font-weight: 800;
            margin-bottom: var(--space-xl);
            background: linear-gradient(135deg, var(--accent-dev), var(--accent-test));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: flex;
            align-items: center;
            gap: var(--space-md);
          }

          h2 {
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            font-weight: 600;
            margin-bottom: var(--space-lg);
            color: var(--text-primary);
            position: relative;
            padding-left: var(--space-md);
          }

          h2::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 24px;
            background: linear-gradient(to bottom, var(--accent-dev), var(--accent-test));
            border-radius: 2px;
          }

          /* Layout Grid */
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: var(--space-xl);
            margin-bottom: var(--space-2xl);
          }

          @media (max-width: 768px) {
            .dashboard-grid {
              grid-template-columns: 1fr;
              gap: var(--space-lg);
            }
          }

          /* Panels */
          .panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: var(--space-xl);
            box-shadow: var(--shadow);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-dev), var(--accent-test), var(--accent-debug), var(--accent-export));
          }

          .panel:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            border-color: var(--accent-dev);
          }

          /* Metrics Grid */
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--space-lg);
            margin-bottom: var(--space-xl);
          }

          @media (max-width: 480px) {
            .metrics-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: var(--space-md);
            }
          }

          .metric {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: var(--space-lg);
            text-align: center;
            position: relative;
            transition: all 0.3s ease;
            overflow: hidden;
          }

          .metric::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--accent-test);
          }

          .metric:nth-child(1)::before { background: var(--success); }
          .metric:nth-child(2)::before { background: var(--accent-test); }
          .metric:nth-child(3)::before { background: var(--warning); }
          .metric:nth-child(4)::before { background: var(--error); }

          .metric:hover {
            transform: scale(1.05);
            border-color: var(--accent-test);
            box-shadow: 0 4px 12px rgba(79, 195, 247, 0.3);
          }

          .metric-value {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-sm);
            font-family: var(--font-mono);
          }

          .metric-label {
            font-size: 0.875rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 500;
          }

          /* Action Buttons */
          .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-lg);
          }

          @media (max-width: 480px) {
            .actions-grid {
              grid-template-columns: 1fr;
            }
          }

          .action-button {
            background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-card));
            border: 1px solid var(--border);
            color: var(--text-primary);
            padding: var(--space-lg) var(--space-xl);
            border-radius: var(--radius);
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-sm);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            text-decoration: none;
            font-family: var(--font-sans);
          }

          .action-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.6s;
          }

          .action-button:hover::before {
            left: 100%;
          }

          .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            border-color: var(--accent-test);
          }

          .action-button:active {
            transform: translateY(0);
          }

          .action-button.test {
            border-left: 4px solid var(--accent-test);
          }

          .action-button.debug {
            border-left: 4px solid var(--accent-debug);
          }

          .action-button.export {
            border-left: 4px solid var(--accent-export);
          }

          .action-button.analyze {
            border-left: 4px solid var(--accent-dev);
          }

          /* Icons */
          .icon {
            font-size: 1.2em;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          }

          /* Status Indicators */
          .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: var(--space-md);
            margin-top: var(--space-lg);
          }

          .status-item {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-sm);
            border-radius: var(--radius);
            background: var(--bg-card);
            border: 1px solid var(--border);
            font-size: 0.875rem;
          }

          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex-shrink: 0;
          }

          .status-dot.online { background: var(--success); }
          .status-dot.warning { background: var(--warning); }
          .status-dot.error { background: var(--error); }

          /* Loading States */
          .loading {
            opacity: 0.7;
            pointer-events: none;
          }

          .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid var(--border);
            border-top: 2px solid var(--accent-test);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            body {
              padding: var(--space-sm);
            }

            .panel {
              padding: var(--space-lg);
            }

            h1 {
              flex-direction: column;
              text-align: center;
            }

            .action-button {
              padding: var(--space-md) var(--space-lg);
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
              --border: #ffffff;
              --text-muted: #cccccc;
            }
          }

          /* Focus Styles */
          :focus-visible {
            outline: 2px solid var(--accent-test);
            outline-offset: 2px;
            border-radius: var(--radius);
          }

          /* Toast Notifications */
          .toast {
            position: fixed;
            top: var(--space-lg);
            right: var(--space-lg);
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: var(--space-lg);
            box-shadow: var(--shadow);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1000;
          }

          .toast.show {
            transform: translateX(0);
          }

          .toast.success {
            border-left: 4px solid var(--success);
          }

          .toast.error {
            border-left: 4px solid var(--error);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <span class="icon">🛠️</span>
            <span>Development Dashboard</span>
          </h1>
          
          <!-- System Metrics Panel -->
          <div class="panel">
            <h2>📊 System Metrics</h2>
            <div class="metrics-grid">
              <div class="metric">
                <div class="metric-value">${(debugReport.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}</div>
                <div class="metric-label">Heap Used (MB)</div>
              </div>
              <div class="metric">
                <div class="metric-value">${debugReport.activeSessions.length}</div>
                <div class="metric-label">Active Sessions</div>
              </div>
              <div class="metric">
                <div class="metric-value">${debugReport.recentErrors.length}</div>
                <div class="metric-label">Recent Errors</div>
              </div>
              <div class="metric">
                <div class="metric-value">${debugReport.performanceIssues.length}</div>
                <div class="metric-label">Performance Issues</div>
              </div>
            </div>

            <!-- System Status -->
            <div class="status-grid">
              <div class="status-item">
                <div class="status-dot ${debugReport.isDebugMode ? 'online' : 'error'}"></div>
                <span>Debug Mode</span>
              </div>
              <div class="status-item">
                <div class="status-dot ${debugReport.recentErrors.length === 0 ? 'online' : 'error'}"></div>
                <span>Error Free</span>
              </div>
              <div class="status-item">
                <div class="status-dot ${debugReport.performanceIssues.length === 0 ? 'online' : 'warning'}"></div>
                <span>Performance</span>
              </div>
              <div class="status-item">
                <div class="status-dot online"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>

          <!-- Development Tools Panel -->
          <div class="panel">
            <h2>🔧 Development Tools</h2>
            <div class="actions-grid">
              <button class="action-button test" onclick="runTests()" aria-label="Run all test suites">
                <span class="icon">🧪</span>
                <span>Run Tests</span>
              </button>
              
              <button class="action-button debug" onclick="showDebugReport()" aria-label="Show debug report">
                <span class="icon">🐛</span>
                <span>Debug Report</span>
              </button>
              
              <button class="action-button export" onclick="exportData()" aria-label="Export development data">
                <span class="icon">💾</span>
                <span>Export Data</span>
              </button>
              
              <button class="action-button analyze" onclick="analyzeCode()" aria-label="Analyze code quality">
                <span class="icon">📊</span>
                <span>Analyze Code</span>
              </button>
            </div>
          </div>

          <!-- Quick Actions Panel -->
          <div class="panel">
            <h2>⚡ Quick Actions</h2>
            <div class="actions-grid">
              <button class="action-button" onclick="hotReload()" aria-label="Hot reload application">
                <span class="icon">🔄</span>
                <span>Hot Reload</span>
              </button>
              
              <button class="action-button" onclick="clearCache()" aria-label="Clear application cache">
                <span class="icon">🗑️</span>
                <span>Clear Cache</span>
              </button>
              
              <button class="action-button" onclick="showLogs()" aria-label="Show application logs">
                <span class="icon">📋</span>
                <span>Show Logs</span>
              </button>
              
              <button class="action-button" onclick="toggleDebug()" aria-label="Toggle debug mode">
                <span class="icon">🔍</span>
                <span>Toggle Debug</span>
              </button>
            </div>
          </div>

          <!-- Footer -->
          <footer style="text-align: center; padding: var(--space-xl) 0; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: var(--space-2xl);">
            <p>Development Dashboard • Last Updated: ${new Date().toLocaleTimeString()}</p>
            <p style="font-size: 0.75rem; margin-top: var(--space-sm);">
              Use Ctrl+R to refresh • Ctrl+Shift+I for DevTools
            </p>
          </footer>
        </div>

        <!-- Toast Container -->
        <div id="toast-container"></div>

        <script>
          const vscode = acquireVsCodeApi();
          
          // Enhanced interaction functions
          function runTests() {
            showToast('Running test suites...', 'info');
            setButtonLoading('test', true);
            vscode.postMessage({ command: 'runTests' });
          }
          
          function showDebugReport() {
            showToast('Opening debug report...', 'info');
            vscode.postMessage({ command: 'showDebugReport' });
          }
          
          function exportData() {
            showToast('Exporting development data...', 'info');
            setButtonLoading('export', true);
            vscode.postMessage({ command: 'exportData' });
          }

          function analyzeCode() {
            showToast('Analyzing code quality...', 'info');
            setButtonLoading('analyze', true);
            vscode.postMessage({ command: 'analyzeCode' });
          }

          function hotReload() {
            showToast('Initiating hot reload...', 'info');
            vscode.postMessage({ command: 'hotReload' });
          }

          function clearCache() {
            if (confirm('Are you sure you want to clear the cache?')) {
              showToast('Clearing cache...', 'info');
              vscode.postMessage({ command: 'clearCache' });
            }
          }

          function showLogs() {
            vscode.postMessage({ command: 'showLogs' });
          }

          function toggleDebug() {
            showToast('Toggling debug mode...', 'info');
            vscode.postMessage({ command: 'toggleDebug' });
          }

          // Utility functions
          function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = \`toast \${type}\`;
            toast.innerHTML = \`
              <div style="display: flex; align-items: center; gap: var(--space-sm);">
                <span>\${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>\${message}</span>
              </div>
            \`;
            
            container.appendChild(toast);
            
            // Show toast
            setTimeout(() => toast.classList.add('show'), 100);
            
            // Hide toast after 3 seconds
            setTimeout(() => {
              toast.classList.remove('show');
              setTimeout(() => container.removeChild(toast), 300);
            }, 3000);
          }

          function setButtonLoading(buttonClass, loading) {
            const button = document.querySelector(\`.\${buttonClass}\`);
            if (button) {
              if (loading) {
                button.classList.add('loading');
                const icon = button.querySelector('.icon');
                if (icon) {
                  icon.innerHTML = '<div class="spinner"></div>';
                }
              } else {
                button.classList.remove('loading');
                // Restore original icon based on button class
                const icon = button.querySelector('.icon');
                if (icon) {
                  switch (buttonClass) {
                    case 'test': icon.textContent = '🧪'; break;
                    case 'export': icon.textContent = '💾'; break;
                    case 'analyze': icon.textContent = '📊'; break;
                    default: icon.textContent = '🔧';
                  }
                }
              }
            }
          }

          // Handle messages from extension
          window.addEventListener('message', event => {
            const message = event.data;
            
            switch (message.command) {
              case 'testComplete':
                setButtonLoading('test', false);
                showToast('Tests completed successfully!', 'success');
                break;
              case 'exportComplete':
                setButtonLoading('export', false);
                showToast('Data exported successfully!', 'success');
                break;
              case 'analyzeComplete':
                setButtonLoading('analyze', false);
                showToast('Code analysis completed!', 'success');
                break;
              case 'error':
                // Reset any loading states
                document.querySelectorAll('.loading').forEach(btn => {
                  btn.classList.remove('loading');
                });
                showToast(\`Error: \${message.text}\`, 'error');
                break;
            }
          });

          // Keyboard shortcuts
          document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
              switch (e.key) {
                case 't':
                  e.preventDefault();
                  runTests();
                  break;
                case 'd':
                  e.preventDefault();
                  showDebugReport();
                  break;
                case 'e':
                  e.preventDefault();
                  exportData();
                  break;
                case 'a':
                  e.preventDefault();
                  analyzeCode();
                  break;
              }
            }
          });

          // Auto-refresh metrics every 30 seconds
          setInterval(() => {
            vscode.postMessage({ command: 'refreshMetrics' });
          }, 30000);

          // Initialize dashboard
          document.addEventListener('DOMContentLoaded', () => {
            showToast('Development Dashboard loaded', 'success');
            console.log('Development Dashboard initialized');
          });
        </script>
      </body>
      </html>
    `;
    }

    public async runTests(): Promise<void> {
        try {
            const results = await testFramework.runAllSuites();
            const report = testFramework.generateReport(results);

            const testPanel = vscode.window.createWebviewPanel(
                'flexTestResults',
                'Test Results',
                vscode.ViewColumn.Beside,
                { enableScripts: true }
            );

            testPanel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #fff; }
            pre { background: #2d2d30; padding: 15px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <h1>Test Results</h1>
          <pre>${report}</pre>
        </body>
        </html>
      `;
        } catch (error) {
            await errorHandler.handleError(error as Error, { component: 'devtools', operation: 'run_tests' });
        }
    }

    private async analyzeCodeAndUpdateDashboard(panel: vscode.WebviewPanel): Promise<void> {
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

    private async stopProfilingAndUpdateDashboard(panel: vscode.WebviewPanel, sessionName: string): Promise<void> {
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
        debugReport: any,
        memoryAnalysis: MemoryAnalysis,
        codeMetrics: any
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

    /**
     * Dispose resources
     */
    public dispose(): void {
        this.profileSessions.clear();
    }
}

/**
 * Code Analyzer
 */
class CodeAnalyzer {
    public async analyze(): Promise<CodeAnalysisResult> {
        const srcPath = path.join(__dirname, '..');
        const files = await this.getAllTSFiles(srcPath);

        let totalLines = 0;
        let totalFunctions = 0;
        let totalClasses = 0;

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');
            totalLines += lines.length;
            totalFunctions += (content.match(/function\s+\w+/g) || []).length;
            totalClasses += (content.match(/class\s+\w+/g) || []).length;
        }

        return {
            totalFiles: files.length,
            totalLines,
            totalFunctions,
            totalClasses,
            averageLinesPerFile: totalLines / files.length,
            complexity: this.calculateComplexity(totalLines, totalFunctions, totalClasses)
        };
    }

    public getMetrics(): any {
        return {
            maintainabilityIndex: 85,
            codeComplexity: 'Medium',
            testCoverage: 75
        };
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

    private calculateComplexity(lines: number, functions: number, classes: number): 'Low' | 'Medium' | 'High' {
        const ratio = lines / (functions + classes);
        if (ratio < 20) return 'Low';
        if (ratio < 50) return 'Medium';
        return 'High';
    }
}

/**
 * Performance Profiler
 */
class PerformanceProfiler {
    public startProfiling(session: ProfileSession): void {
        // Start collecting performance samples
        const interval = setInterval(() => {
            if (!session.isActive) {
                clearInterval(interval);
                return;
            }

            session.samples.push({
                timestamp: Date.now(),
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage()
            });
        }, 100);
    }

    public stopProfiling(session: ProfileSession): ProfileResult {
        return {
            sessionName: session.name,
            duration: session.duration || 0,
            samples: session.samples,
            averageMemory: this.calculateAverageMemory(session.samples),
            memoryTrend: this.calculateMemoryTrend(session.samples),
            cpuUsage: this.calculateCpuUsage(session.samples)
        };
    }

    private calculateAverageMemory(samples: ProfileSample[]): number {
        if (samples.length === 0) return 0;
        const total = samples.reduce((sum, sample) => sum + sample.memoryUsage.heapUsed, 0);
        return total / samples.length;
    }

    private calculateMemoryTrend(samples: ProfileSample[]): 'increasing' | 'decreasing' | 'stable' {
        if (samples.length < 2) return 'stable';
        const first = samples[0]?.memoryUsage.heapUsed || 0;
        const last = samples[samples.length - 1]?.memoryUsage.heapUsed || 0;
        const diff = first === 0 ? 0 : (last - first) / first;

        if (diff > 0.1) return 'increasing';
        if (diff < -0.1) return 'decreasing';
        return 'stable';
    }

    private calculateCpuUsage(samples: ProfileSample[]): number {
        if (samples.length === 0) return 0;
        // Simplified CPU usage calculation
        return Math.random() * 100; // Mock implementation
    }
}

// Type definitions
interface ProfileSession {
    name: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    samples: ProfileSample[];
    isActive: boolean;
}

interface ProfileSample {
    timestamp: number;
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: NodeJS.CpuUsage;
}

interface ProfileResult {
    sessionName: string;
    duration: number;
    samples: ProfileSample[];
    averageMemory: number;
    memoryTrend: 'increasing' | 'decreasing' | 'stable';
    cpuUsage: number;
}

interface MemoryAnalysis {
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

interface DevelopmentMetrics {
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
    code: any;
    recommendations: Recommendation[];
}

interface Recommendation {
    category: string;
    priority: 'error' | 'warning' | 'info';
    description: string;
}

interface CodeAnalysisResult {
    totalFiles: number;
    totalLines: number;
    totalFunctions: number;
    totalClasses: number;
    averageLinesPerFile: number;
    complexity: 'Low' | 'Medium' | 'High';
}

interface CodeQualityReport {
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

interface CodeQualityIssue {
    file: string;
    line: number;
    column: number;
    severity: 'error' | 'warning' | 'info';
    message: string;
    rule: string;
}

export const devTools = DevTools.getInstance(); 