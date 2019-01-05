const vscode = require('vscode');
const { insertSpaces } = require('./src/util')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.codeBlock', function () {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return
    }

    if (editor.document.languageId === 'markdown') {
      const cursorPosition = editor.selection.active
      const cursorCharacter = cursorPosition.character
      const cursorLine = cursorPosition.line

      editor.edit(editBuilder => {
        editBuilder.insert(cursorPosition, '```\n\n```')
      }).then(() => {
        const thirdLineStartPosition = new vscode.Position(cursorLine + 2, 0)
        editor.edit(editBuilder => {
          editBuilder.insert(thirdLineStartPosition, insertSpaces(cursorCharacter))
        })
      }).then(() => {
        const newCursorPosition = new vscode.Position(cursorLine, cursorCharacter + 3)
        editor.selection = new vscode.Selection(newCursorPosition, newCursorPosition)
      })
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
  activate,
  deactivate
}
