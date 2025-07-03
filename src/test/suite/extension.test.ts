import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('Flex-proagramming-language.flex-chatbot'));
    });

    test('Extension should activate', function (done) {
        this.timeout(1 * 60 * 1000); // 1-minute timeout for activation

        const extension = vscode.extensions.getExtension('Flex-proagramming-language.flex-chatbot');
        if (!extension) {
            assert.fail('Extension not found');
        }

        if (!extension.isActive) {
            extension.activate().then(
                () => {
                    assert.ok(extension.isActive, "Extension activated successfully");
                    done();
                },
                (err) => {
                    assert.fail(`Failed to activate extension: ${err}`);
                    done();
                }
            );
        } else {
            done();
        }
    });

    test('Should register flexChatbot.openview command', async () => {
        const commands = await vscode.commands.getCommands(true);
        const commandFound = commands.includes('flexChatbot.openview');
        assert.ok(commandFound, 'Command "flexChatbot.openview" is not registered');
    });

    test('Should register flexChatbot.resetChat command', async () => {
        const commands = await vscode.commands.getCommands(true);
        const commandFound = commands.includes('flexChatbot.resetChat');
        assert.ok(commandFound, 'Command "flexChatbot.resetChat" is not registered');
    });
}); 