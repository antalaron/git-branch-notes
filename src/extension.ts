import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('gitBranchNotes.openNote', async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace is open.');
      return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;
    let branchName: string;
    try {
      branchName = execSync('git rev-parse --abbrev-ref HEAD', { cwd: workspacePath }).toString().trim();
    } catch (err) {
      vscode.window.showErrorMessage('Unable to get current branch name.');
      return;
    }

    let noteDir = path.join(workspacePath, '.git', 'branch-notes');
    let noteFileName = `${branchName}.md`;

    if (branchName.includes('/')) {
      const branchParts = branchName.split('/');
      noteDir = path.join(noteDir, ...branchParts.slice(0, -1));
      noteFileName = `${branchParts[branchParts.length - 1]}.md`;
    }

    const notePath = path.join(noteDir, noteFileName);

    if (!fs.existsSync(noteDir)) {
      fs.mkdirSync(noteDir, { recursive: true });
    }
    if (!fs.existsSync(notePath)) {
      fs.writeFileSync(notePath, `<!-- Notes for branch: ${branchName} -->\n\n- [ ] Do something\n`, 'utf8');
    }

    const document = await vscode.workspace.openTextDocument(notePath);
    vscode.window.showTextDocument(document, { preview: false });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
