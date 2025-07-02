import * as assert from 'assert';
import * as path from 'path';
import { FlexDatasetService } from '../../services/flexDatasetService';
import { ConfigService } from '../../services/configService';
import { ApiService } from '../../services/apiService';
import { logger } from '../../utils/logger';

suite('Services Test Suite', () => {

    suite('FlexDatasetService', () => {
        test('Should create singleton instance', () => {
            const extensionPath = path.join(__dirname, '../../../');
            const service1 = FlexDatasetService.getInstance(extensionPath);
            const service2 = FlexDatasetService.getInstance();

            assert.strictEqual(service1, service2, 'Should return same instance');
        });

        test('Should provide fallback system prompt when dataset not loaded', () => {
            const extensionPath = path.join(__dirname, '../../../');
            const service = FlexDatasetService.getInstance(extensionPath);
            const systemPrompt = service.getSystemPrompt();

            assert.ok(systemPrompt.length > 0, 'Should provide non-empty system prompt');
            assert.ok(systemPrompt.includes('Flex'), 'Should mention Flex language');
        });

        test('Should return dataset statistics', () => {
            const extensionPath = path.join(__dirname, '../../../');
            const service = FlexDatasetService.getInstance(extensionPath);
            const stats = service.getDatasetStats();

            assert.ok(typeof stats === 'object', 'Should return object');
            assert.ok(typeof stats.loaded === 'number', 'Should have loaded count');
        });
    });

    suite('ApiService', () => {
        test('Should validate API keys correctly', () => {
            assert.strictEqual(ApiService.validateApiKey(''), false, 'Empty key should be invalid');
            assert.strictEqual(ApiService.validateApiKey('short'), false, 'Short key should be invalid');
            assert.strictEqual(ApiService.validateApiKey('sk-or-v1-1234567890abcdef1234567890abcdef'), true, 'Valid key should pass');
        });

        test('Should format web search results', () => {
            const results = [
                { title: 'Test Title', snippet: 'Test snippet', link: 'http://test.com' }
            ];
            const formatted = ApiService.formatWebSearchResults(results);

            assert.ok(formatted.includes('Test Title'), 'Should include title');
            assert.ok(formatted.includes('Test snippet'), 'Should include snippet');
            assert.ok(formatted.includes('http://test.com'), 'Should include link');
        });

        test('Should format model pricing', () => {
            const model = {
                id: 'test-model',
                context_length: 4000,
                pricing: { prompt: 0.001, completion: 0.002 }
            };
            const formatted = ApiService.formatModelPricing(model);

            assert.ok(formatted.includes('$'), 'Should include currency symbol');
            assert.ok(formatted.includes('1K tokens'), 'Should mention token unit');
        });

        test('Should return recommended models', () => {
            const recommended = ApiService.getRecommendedModels();

            assert.ok(Array.isArray(recommended), 'Should return array');
            assert.ok(recommended.length > 0, 'Should have recommendations');
            assert.ok(recommended.some(model => model.includes('gpt')), 'Should include GPT models');
        });
    });

    suite('Logger', () => {
        test('Should create timer for performance tracking', () => {
            const timer = logger.createTimer('test-operation');

            assert.ok(timer, 'Should create timer object');
            assert.ok(typeof timer.end === 'function', 'Should have end method');
            assert.ok(typeof timer.checkpoint === 'function', 'Should have checkpoint method');

            // Test that timer doesn't throw
            timer.checkpoint('test checkpoint');
            timer.end();
        });

        test('Should log different levels', () => {
            // These should not throw
            logger.info('Test info message');
            logger.warn('Test warning message');
            logger.error('Test error message');
            logger.debug('Test debug message');
        });

        test('Should provide statistics', () => {
            const stats = logger.getStats();

            assert.ok(typeof stats === 'object', 'Should return object');
            assert.ok(typeof stats.level === 'string', 'Should have level');
            assert.ok(typeof stats.consoleLogging === 'boolean', 'Should have console logging flag');
        });
    });

    suite('Integration Tests', () => {
        test('Services should work together', () => {
            const extensionPath = path.join(__dirname, '../../../');

            // Initialize services
            const datasetService = FlexDatasetService.getInstance(extensionPath);

            // Get system prompt
            const systemPrompt = datasetService.getSystemPrompt();
            assert.ok(systemPrompt.length > 0, 'Should get system prompt');

            // Validate a sample API key format
            const isValidKey = ApiService.validateApiKey('sk-or-v1-sample-key-1234567890abcdef');
            assert.strictEqual(isValidKey, true, 'Should validate API key format');

            // Check dataset stats
            const stats = datasetService.getDatasetStats();
            assert.ok(stats && typeof stats.loaded === 'number' && stats.loaded >= 0, 'Should have valid stats');

            logger.info('Integration test completed successfully');
        });
    });

    suite('Error Handling', () => {
        test('Should handle invalid paths gracefully', () => {
            const invalidPath = '/invalid/path/that/does/not/exist';

            // This should not throw, but should handle gracefully
            assert.doesNotThrow(() => {
                FlexDatasetService.getInstance(invalidPath);
            }, 'Should handle invalid paths without throwing');
        });

        test('Should handle invalid web search results', () => {
            const emptyResults = ApiService.formatWebSearchResults([]);
            assert.ok(emptyResults.includes('No web search results'), 'Should handle empty results');

            const invalidResults = ApiService.formatWebSearchResults([
                { title: '', snippet: '', link: '' }
            ]);
            assert.ok(typeof invalidResults === 'string', 'Should handle invalid result objects');
        });
    });
}); 