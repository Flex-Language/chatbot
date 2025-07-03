import * as path from 'path';
import { runTests } from '@vscode/test-electron';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkForRunningVSCode(): Promise<boolean> {
	try {
		const { stdout } = await execAsync('ps aux | grep "Visual Studio Code" | grep -v grep');
		return stdout.trim().length > 0;
	} catch (error) {
		// If ps command fails or no processes found, assume no VS Code is running
		return false;
	}
}

async function killVSCodeInstances(): Promise<void> {
	try {
		console.log('🔄 Attempting to close VS Code instances...');
		await execAsync('killall "Visual Studio Code"');
		console.log('✅ VS Code instances closed');
		// Wait a moment for processes to fully terminate
		await new Promise(resolve => setTimeout(resolve, 2000));
	} catch (error) {
		console.log('ℹ️  No VS Code instances found or already closed');
	}
}

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		console.log('🧪 Starting VS Code Extension Tests...');
		console.log('📁 Extension path:', extensionDevelopmentPath);
		console.log('🔬 Test suite path:', extensionTestsPath);

		// Check for running VS Code instances
		const hasRunningVSCode = await checkForRunningVSCode();
		if (hasRunningVSCode) {
			console.log('⚠️  Detected running VS Code instances');

			// Auto-close if we're in CI or if forced
			if (process.env.CI || process.env.FORCE_CLOSE_VSCODE) {
				await killVSCodeInstances();
			} else {
				console.log('💡 Tip: Run "npm run kill-vscode" to close VS Code instances automatically');
				console.log('   Or set FORCE_CLOSE_VSCODE=true environment variable');
			}
		}

		// Download VS Code, unzip it and run the integration test
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			// Add launch options to avoid conflicts with running VS Code instances
			launchArgs: [
				'--no-sandbox',
				'--disable-background-networking',
				'--disable-background-timer-throttling',
				'--disable-backgrounding-occluded-windows',
				'--disable-renderer-backgrounding',
				'--disable-extensions',
				'--disable-gpu',
				'--disable-dev-shm-usage',
				'--user-data-dir=/tmp/vscode-test-user-data'
			]
		});

		console.log('✅ All tests passed!');
	} catch (err) {
		console.error('❌ Failed to run tests:');

		if (err instanceof Error) {
			if (err.message.includes('no other instance of Code is running')) {
				console.error('\n🚨 VS Code Instance Conflict:');
				console.error('   Please close all VS Code instances and run the tests again.');
				console.error('\n📝 Quick Solutions:');
				console.error('   1. Manual: Close all VS Code windows');
				console.error('   2. Auto: Run "npm run kill-vscode" then "npm test"');
				console.error('   3. Force: Run "FORCE_CLOSE_VSCODE=true npm test"');
				console.error('   4. Safe: Run "npm run test:unit" (no VS Code needed)');
			} else {
				console.error('   Error:', err.message);
			}
		} else {
			console.error('   Unknown error:', err);
		}

		console.error('\n💡 Alternative commands:');
		console.error('   • npm run test:unit      - Run unit tests only (fast)');
		console.error('   • npm run test:safe      - Same as test:unit');
		console.error('   • npm run test:force     - Force close VS Code and test');
		console.error('   • npm run kill-vscode    - Close VS Code instances');

		process.exit(1);
	}
}

main();
