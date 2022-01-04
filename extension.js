//

const vscode = require('vscode');

const fire_change_event = false;

class Provider {
    constructor() {
        if (fire_change_event) {
            this._onDidChangeTreeData = new vscode.EventEmitter();
            this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        }
    }
    emitChangeTreeData() {
        if (fire_change_event) {
            this._onDidChangeTreeData.fire();
        }
    }

    getTreeItem(element) {
        return element;
    }
    async getChildren(element) {
        console.assert(!element);
        return [new vscode.TreeItem('test', vscode.TreeItemCollapsibleState.None)];
    }
}

function activate(context) {
    const provider = new Provider();
    context.subscriptions.push(
        vscode.commands.registerCommand('test-ext.start', () => {
            vscode.commands.executeCommand('setContext', 'test-ext.running', true);
            provider.emitChangeTreeData();
    }));
    context.subscriptions.push(
        vscode.commands.registerCommand('test-ext.pause', () => {
            vscode.commands.executeCommand('setContext', 'test-ext.running', false);
            provider.emitChangeTreeData();
    }));
    context.subscriptions.push(
        vscode.window.registerTreeDataProvider('test-ext-view', provider));
    vscode.commands.executeCommand('setContext', 'test-ext.running', false);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
