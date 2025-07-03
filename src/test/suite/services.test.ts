import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { ConfigService } from '../../services/configService';
import { FlexDatasetService } from '../../services/flexDatasetService';
import { ApiService } from '../../services/apiService';
import { ChatService } from '../../services/ChatService';
import { WebviewService } from '../../services/WebviewService';
import { logger } from '../../utils/logger';

suite('Services Test Suite', () => {

    let sandbox: sinon.SinonSandbox;

    setup(() => {
        sandbox = sinon.createSandbox();
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('ConfigService', () => {
        test('getConfig should return default values', () => {
            const get = sinon.stub().returns(undefined);
            sandbox.stub(vscode.workspace, 'getConfiguration').returns({ get } as unknown as vscode.WorkspaceConfiguration);

            const config = ConfigService.getConfig();

            assert.strictEqual(config.model, 'openai/gpt-4o-mini');
            assert.strictEqual(config.temperature, 0.7);
        });

        test('validateConfig should detect missing API key', () => {
            sandbox.stub(ConfigService, 'getConfig').returns({
                apiKey: '',
                model: 'test-model',
                temperature: 0.5,
                enableWebSearch: false,
                maxTokens: 100,
                timeout: 10000
            });

            const result = ConfigService.validateConfig();
            assert.strictEqual(result.isValid, false);
            assert.ok(result.errors.some(e => e.includes('API key is required')));
        });
    });

    suite('FlexDatasetService', () => {
        const extensionPath = '/mock/extension/path';

        test('getInstance should return a singleton', () => {
            const instance1 = FlexDatasetService.getInstance(extensionPath);
            const instance2 = FlexDatasetService.getInstance();
            assert.strictEqual(instance1, instance2);
        });

        test('getSystemPrompt should provide a fallback', () => {
            const service = FlexDatasetService.getInstance(extensionPath);
            const prompt = service.getSystemPrompt();
            assert.ok(prompt.length > 0, "Should return a non-empty fallback prompt");
            assert.ok(prompt.includes("Flex"), "Fallback should mention Flex");
        });
    });

    suite('ApiService', () => {
        test('validateApiKey should work correctly', () => {
            assert.strictEqual(ApiService.validateApiKey(''), false, "Empty key is invalid");
            assert.strictEqual(ApiService.validateApiKey('short'), false, "Short key is invalid");
            assert.strictEqual(ApiService.validateApiKey('sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), true, "Valid key is valid");
        });
    });

    suite('ChatService', () => {
        test('resetChat should clear history and post message', () => {
            const postMessageSpy = sinon.spy();
            const service = new ChatService(postMessageSpy, vscode.Uri.file('/'));

            // Simulate adding a message
            (service as unknown as { conversationHistory: unknown[] }).conversationHistory.push({ role: 'user', content: 'hello' });

            service.resetChat();

            assert.strictEqual((service as unknown as { conversationHistory: unknown[] }).conversationHistory.length, 0, "Conversation history should be cleared");
            assert.ok(postMessageSpy.calledWith({ command: 'chatCleared' }), "Should send chatCleared message");
        });
    });

    suite('WebviewService', () => {
        test('getHtmlContent should return valid HTML', () => {
            const mockWebview = {
                asWebviewUri: (uri: vscode.Uri) => uri,
                cspSource: 'https://example.com'
            };
            const service = new WebviewService(vscode.Uri.file('/'));
            const html = service.getHtmlContent(mockWebview as vscode.Webview);

            assert.ok(html.startsWith('<!DOCTYPE html>'), "Should be a valid HTML doc");
            assert.ok(html.includes('Flex Assistant'), "Should include the title");
        });
    });

    suite('Logger', () => {
        test('Should create a timer', () => {
            const timer = logger.createTimer('test-op');
            assert.ok(timer, 'Should create a timer object');
            assert.doesNotThrow(() => {
                timer.checkpoint('step 1');
                timer.end();
            });
        });
    });
}); 