const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "revive-cmd.runCommands",
    async () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace opened!");
        return;
      }

      let jsonFilePath = path.join(
        workspaceFolders[0].uri.fsPath,
        "commands.json"
      );
      if (!fs.existsSync(jsonFilePath)) {
        vscode.window.showErrorMessage(
          "commands.json file not found in the workspace root!"
        );
      }

      try {
        const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
        const config = JSON.parse(fileContent);

        if (!config.commands || !Array.isArray(config.commands)) {
          vscode.window.showErrorMessage("Invalid commands.json format.");
          return;
        }

        //Create Terminals and send commands
        let commands = config.commands;
        commands.map((terminalCommand) => {
          const terminal = vscode.window.createTerminal(
            terminalCommand.terminal
          );
          terminal.sendText(terminalCommand.command, true);
          terminal.show();
        });
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error reading commands.json: ${error.message}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
