import * as assert from 'assert';
import * as vscode from 'vscode';
import { debugManager } from '../core/DebugManager';
import { errorHandler } from '../core/ErrorHandler';

/**
 * Enterprise Test Framework
 * Provides comprehensive testing capabilities with mocking, performance testing, and utilities
 */
export class TestFramework {
    private static instance: TestFramework;
    private testSuites: Map<string, TestSuite> = new Map();
    private mockInstances: Map<string, any> = new Map();
    private performanceMetrics: Map<string, PerformanceTestResult[]> = new Map();
    private globalSetupCallbacks: (() => Promise<void>)[] = [];
    private globalTeardownCallbacks: (() => Promise<void>)[] = [];

    private constructor() { }

    public static getInstance(): TestFramework {
        if (!TestFramework.instance) {
            TestFramework.instance = new TestFramework();
        }
        return TestFramework.instance;
    }

    /**
     * Create a new test suite
     */
    public createSuite(name: string): TestSuiteBuilder {
        return new TestSuiteBuilder(name, this);
    }

    /**
     * Register a test suite
     */
    public registerSuite(suite: TestSuite): void {
        this.testSuites.set(suite.name, suite);
        debugManager.debug(`Test suite registered: ${suite.name}`, {
            testsCount: suite.tests.length
        });
    }

    /**
     * Run all test suites
     */
    public async runAllSuites(): Promise<TestRunResult> {
        const sessionId = 'test_run_all';
        debugManager.startDebugSession(sessionId, { suitesCount: this.testSuites.size });

        const results: TestRunResult = {
            totalSuites: this.testSuites.size,
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            skippedTests: 0,
            duration: 0,
            suiteResults: []
        };

        const startTime = Date.now();

        try {
            // Run global setup
            await this.runGlobalSetup();

            // Run each test suite
            for (const suite of this.testSuites.values()) {
                debugManager.addDebugStep(sessionId, `running_suite_${suite.name}`);
                const suiteResult = await this.runSuite(suite);
                results.suiteResults.push(suiteResult);

                results.totalTests += suiteResult.totalTests;
                results.passedTests += suiteResult.passedTests;
                results.failedTests += suiteResult.failedTests;
                results.skippedTests += suiteResult.skippedTests;
            }

            // Run global teardown
            await this.runGlobalTeardown();

            results.duration = Date.now() - startTime;
            debugManager.endDebugSession(sessionId, results);

            return results;
        } catch (error) {
            debugManager.recordError(error as Error, { sessionId }, 'high');
            results.duration = Date.now() - startTime;
            debugManager.endDebugSession(sessionId, results);
            throw error;
        }
    }

    /**
     * Run a specific test suite
     */
    public async runSuite(suite: TestSuite): Promise<TestSuiteResult> {
        const sessionId = `test_suite_${suite.name}`;
        debugManager.startDebugSession(sessionId, { testsCount: suite.tests.length });

        const result: TestSuiteResult = {
            name: suite.name,
            totalTests: suite.tests.length,
            passedTests: 0,
            failedTests: 0,
            skippedTests: 0,
            duration: 0,
            testResults: []
        };

        const startTime = Date.now();

        try {
            // Run suite setup
            if (suite.setup) {
                debugManager.addDebugStep(sessionId, 'running_suite_setup');
                await suite.setup();
            }

            // Run each test
            for (const test of suite.tests) {
                debugManager.addDebugStep(sessionId, `running_test_${test.name}`);
                const testResult = await this.runTest(test, suite);
                result.testResults.push(testResult);

                switch (testResult.status) {
                    case 'passed':
                        result.passedTests++;
                        break;
                    case 'failed':
                        result.failedTests++;
                        break;
                    case 'skipped':
                        result.skippedTests++;
                        break;
                }
            }

            // Run suite teardown
            if (suite.teardown) {
                debugManager.addDebugStep(sessionId, 'running_suite_teardown');
                await suite.teardown();
            }

            result.duration = Date.now() - startTime;
            debugManager.endDebugSession(sessionId, result);

            return result;
        } catch (error) {
            debugManager.recordError(error as Error, { sessionId, suite: suite.name }, 'high');
            result.duration = Date.now() - startTime;
            debugManager.endDebugSession(sessionId, result);
            throw error;
        }
    }

    /**
     * Run a single test
     */
    public async runTest(test: TestCase, suite: TestSuite): Promise<TestResult> {
        const sessionId = `test_${suite.name}_${test.name}`;
        debugManager.startDebugSession(sessionId, { test: test.name, suite: suite.name });

        const result: TestResult = {
            name: test.name,
            status: 'running',
            duration: 0,
            assertions: 0
        };

        const startTime = Date.now();

        try {
            // Skip test if marked
            if (test.skip) {
                result.status = 'skipped';
                result.skipReason = test.skipReason || 'Test marked as skipped';
                debugManager.addDebugStep(sessionId, 'test_skipped', { reason: result.skipReason });
                debugManager.endDebugSession(sessionId, result);
                return result;
            }

            // Run test setup
            if (test.setup) {
                debugManager.addDebugStep(sessionId, 'running_test_setup');
                await test.setup();
            }

            // Create test context
            const context = new TestContext(this);

            // Run the test
            debugManager.addDebugStep(sessionId, 'executing_test');
            await test.fn(context);

            result.status = 'passed';
            result.assertions = context.getAssertionCount();

        } catch (error) {
            result.status = 'failed';
            result.error = error as Error;
            debugManager.recordError(error as Error, {
                sessionId,
                test: test.name,
                suite: suite.name
            }, 'medium');

        } finally {
            // Run test teardown
            if (test.teardown) {
                try {
                    debugManager.addDebugStep(sessionId, 'running_test_teardown');
                    await test.teardown();
                } catch (teardownError) {
                    debugManager.recordError(teardownError as Error, {
                        sessionId,
                        test: test.name,
                        phase: 'teardown'
                    }, 'low');
                }
            }

            result.duration = Date.now() - startTime;
            debugManager.endDebugSession(sessionId, result);
        }

        return result;
    }

    /**
     * Performance testing
     */
    public async performanceTest(
        name: string,
        operation: () => Promise<any>,
        iterations: number = 100
    ): Promise<PerformanceTestResult> {
        const sessionId = `perf_test_${name}`;
        debugManager.startDebugSession(sessionId, { iterations, operation: name });

        const measurements: number[] = [];
        let totalMemory = 0;

        try {
            for (let i = 0; i < iterations; i++) {
                const startTime = Date.now();
                const startMemory = process.memoryUsage().heapUsed;

                await operation();

                const endTime = Date.now();
                const endMemory = process.memoryUsage().heapUsed;

                measurements.push(endTime - startTime);
                totalMemory += Math.max(0, endMemory - startMemory);
            }

            const result: PerformanceTestResult = {
                name,
                iterations,
                measurements,
                averageTime: measurements.reduce((a, b) => a + b, 0) / measurements.length,
                minTime: Math.min(...measurements),
                maxTime: Math.max(...measurements),
                medianTime: this.calculateMedian(measurements),
                percentile95: this.calculatePercentile(measurements, 95),
                averageMemoryDelta: totalMemory / iterations,
                timestamp: Date.now()
            };

            // Store performance metrics
            const existing = this.performanceMetrics.get(name) || [];
            existing.push(result);
            this.performanceMetrics.set(name, existing);

            debugManager.endDebugSession(sessionId, result);
            return result;

        } catch (error) {
            debugManager.recordError(error as Error, { sessionId, operation: name }, 'medium');
            debugManager.endDebugSession(sessionId, { error: (error as Error).message });
            throw error;
        }
    }

    /**
     * Mock system for testing
     */
    public createMock<T>(name: string, mockObject: Partial<T>): T {
        const mock = { ...mockObject } as T;
        this.mockInstances.set(name, mock);
        debugManager.debug(`Mock created: ${name}`, { mockObject });
        return mock;
    }

    /**
     * Get a mock instance
     */
    public getMock<T>(name: string): T | undefined {
        return this.mockInstances.get(name);
    }

    /**
     * Clear all mocks
     */
    public clearMocks(): void {
        this.mockInstances.clear();
        debugManager.debug('All mocks cleared');
    }

    /**
     * Add global setup callback
     */
    public addGlobalSetup(callback: () => Promise<void>): void {
        this.globalSetupCallbacks.push(callback);
    }

    /**
     * Add global teardown callback
     */
    public addGlobalTeardown(callback: () => Promise<void>): void {
        this.globalTeardownCallbacks.push(callback);
    }

    /**
     * Get performance metrics for a test
     */
    public getPerformanceMetrics(name: string): PerformanceTestResult[] {
        return this.performanceMetrics.get(name) || [];
    }

    /**
     * Generate test report
     */
    public generateReport(results: TestRunResult): string {
        const passed = results.passedTests;
        const failed = results.failedTests;
        const skipped = results.skippedTests;
        const total = results.totalTests;

        const report = `
# Test Report

## Summary
- **Total Tests**: ${total}
- **Passed**: ${passed} (${((passed / total) * 100).toFixed(1)}%)
- **Failed**: ${failed} (${((failed / total) * 100).toFixed(1)}%)
- **Skipped**: ${skipped} (${((skipped / total) * 100).toFixed(1)}%)
- **Duration**: ${results.duration}ms

## Test Suites
${results.suiteResults.map(suite => `
### ${suite.name}
- Tests: ${suite.totalTests}
- Passed: ${suite.passedTests}
- Failed: ${suite.failedTests}
- Duration: ${suite.duration}ms
${suite.testResults.filter(t => t.status === 'failed').map(test => `
#### ❌ ${test.name}
\`\`\`
${test.error?.message || 'Unknown error'}
\`\`\`
`).join('')}
`).join('')}

  ## Performance Metrics
  ${Array.from(this.performanceMetrics.entries()).map(([name, metrics]) => {
            const latest = metrics[metrics.length - 1];
            if (!latest) return '';
            return `
  ### ${name}
  - Average Time: ${latest.averageTime.toFixed(2)}ms
  - Min/Max: ${latest.minTime}ms / ${latest.maxTime}ms
  - 95th Percentile: ${latest.percentile95.toFixed(2)}ms
  `;
        }).join('')}
    `;

        return report.trim();
    }

    /**
     * Private helper methods
     */
    private async runGlobalSetup(): Promise<void> {
        for (const callback of this.globalSetupCallbacks) {
            await callback();
        }
    }

    private async runGlobalTeardown(): Promise<void> {
        for (const callback of this.globalTeardownCallbacks) {
            await callback();
        }
    }

    private calculateMedian(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? ((sorted[mid - 1] || 0) + (sorted[mid] || 0)) / 2
            : (sorted[mid] || 0);
    }

    private calculatePercentile(numbers: number[], percentile: number): number {
        if (numbers.length === 0) return 0;
        const sorted = [...numbers].sort((a, b) => a - b);
        const index = Math.ceil((percentile / 100) * sorted.length) - 1;
        return sorted[index] || 0;
    }

    /**
     * Dispose resources
     */
    public dispose(): void {
        this.testSuites.clear();
        this.mockInstances.clear();
        this.performanceMetrics.clear();
        this.globalSetupCallbacks = [];
        this.globalTeardownCallbacks = [];
    }
}

/**
 * Test Suite Builder
 */
export class TestSuiteBuilder {
    private suite: TestSuite;

    constructor(name: string, private framework: TestFramework) {
        this.suite = {
            name,
            tests: []
        };
    }

    public setup(fn: () => Promise<void>): TestSuiteBuilder {
        this.suite.setup = fn;
        return this;
    }

    public teardown(fn: () => Promise<void>): TestSuiteBuilder {
        this.suite.teardown = fn;
        return this;
    }

    public test(name: string, fn: (context: TestContext) => Promise<void>): TestSuiteBuilder {
        this.suite.tests.push({ name, fn });
        return this;
    }

    public skip(name: string, fn: (context: TestContext) => Promise<void>, reason?: string): TestSuiteBuilder {
        this.suite.tests.push({ name, fn, skip: true, skipReason: reason });
        return this;
    }

    public build(): TestSuite {
        this.framework.registerSuite(this.suite);
        return this.suite;
    }
}

/**
 * Test Context for assertions and utilities
 */
export class TestContext {
    private assertionCount = 0;

    constructor(private framework: TestFramework) { }

    public assert(condition: boolean, message?: string): void {
        this.assertionCount++;
        assert.ok(condition, message);
    }

    public assertEqual<T>(actual: T, expected: T, message?: string): void {
        this.assertionCount++;
        assert.strictEqual(actual, expected, message);
    }

    public assertNotEqual<T>(actual: T, expected: T, message?: string): void {
        this.assertionCount++;
        assert.notStrictEqual(actual, expected, message);
    }

    public assertThrows(fn: () => any, expectedError?: string | RegExp, message?: string): void {
        this.assertionCount++;
        try {
            fn();
            // If no error was thrown, fail the assertion
            assert.fail(message || 'Expected function to throw an error');
        } catch (error) {
            if (expectedError) {
                if (typeof expectedError === 'string') {
                    assert.ok((error as Error).message.includes(expectedError), message || `Expected error message to contain: ${expectedError}`);
                } else if (expectedError instanceof RegExp) {
                    assert.ok(expectedError.test((error as Error).message), message || `Expected error message to match: ${expectedError}`);
                }
            }
            // If no expectedError specified, any error thrown is considered success
        }
    }

    public async assertThrowsAsync(
        fn: () => Promise<any>,
        expectedError?: string | RegExp,
        message?: string
    ): Promise<void> {
        this.assertionCount++;
        try {
            await fn();
            // If no error was thrown, fail the assertion
            assert.fail(message || 'Expected async function to throw an error');
        } catch (error) {
            if (expectedError) {
                if (typeof expectedError === 'string') {
                    assert.ok((error as Error).message.includes(expectedError), message || `Expected error message to contain: ${expectedError}`);
                } else if (expectedError instanceof RegExp) {
                    assert.ok(expectedError.test((error as Error).message), message || `Expected error message to match: ${expectedError}`);
                }
            }
            // If no expectedError specified, any error thrown is considered success
        }
    }

    public getMock<T>(name: string): T {
        const mock = this.framework.getMock<T>(name);
        if (!mock) {
            throw new Error(`Mock '${name}' not found`);
        }
        return mock;
    }

    public createMock<T>(name: string, mockObject: Partial<T>): T {
        return this.framework.createMock(name, mockObject);
    }

    public getAssertionCount(): number {
        return this.assertionCount;
    }
}

// Type definitions
interface TestSuite {
    name: string;
    tests: TestCase[];
    setup?: () => Promise<void>;
    teardown?: () => Promise<void>;
}

interface TestCase {
    name: string;
    fn: (context: TestContext) => Promise<void>;
    setup?: () => Promise<void>;
    teardown?: () => Promise<void>;
    skip?: boolean;
    skipReason?: string;
}

interface TestRunResult {
    totalSuites: number;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
    duration: number;
    suiteResults: TestSuiteResult[];
}

interface TestSuiteResult {
    name: string;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
    duration: number;
    testResults: TestResult[];
}

interface TestResult {
    name: string;
    status: 'passed' | 'failed' | 'skipped' | 'running';
    duration: number;
    assertions: number;
    error?: Error;
    skipReason?: string;
}

interface PerformanceTestResult {
    name: string;
    iterations: number;
    measurements: number[];
    averageTime: number;
    minTime: number;
    maxTime: number;
    medianTime: number;
    percentile95: number;
    averageMemoryDelta: number;
    timestamp: number;
}

export const testFramework = TestFramework.getInstance(); 