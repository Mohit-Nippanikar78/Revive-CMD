const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
  // Register the main command to run commands from commands.json
  let runCommandsDisposable = vscode.commands.registerCommand(
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
        return;
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

  // Prebuilt commands for common development tasks
  let prebuiltCommands = [
    {
      id: "revive-cmd.npmRunDev",
      title: "Run: npm run dev",
      command: "npm run dev"
    },
    {
      id: "revive-cmd.npmStart",
      title: "Run: npm start",
      command: "npm start"
    },
    {
      id: "revive-cmd.npmBuild",
      title: "Run: npm run build",
      command: "npm run build"
    },
    {
      id: "revive-cmd.npmTest",
      title: "Run: npm test",
      command: "npm test"
    },
    {
      id: "revive-cmd.gitPull",
      title: "Run: git pull",
      command: "git pull"
    }
  ];

  // Register each prebuilt command
  prebuiltCommands.forEach(cmd => {
    let disposable = vscode.commands.registerCommand(cmd.id, () => {
      const terminal = vscode.window.createTerminal(cmd.title);
      terminal.sendText(cmd.command, true);
      terminal.show();
    });
    context.subscriptions.push(disposable);
  });

  // Get folders in workspace
  async function getWorkspaceFolders() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return ["./"];
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const folders = ["./"];  // Root folder

    try {
      const items = fs.readdirSync(rootPath);
      for (const item of items) {
        const itemPath = path.join(rootPath, item);
        if (fs.statSync(itemPath).isDirectory() && !item.startsWith('.')) {
          folders.push(item);
        }
      }
    } catch (error) {
      console.error("Error reading workspace folders:", error);
    }

    return folders;
  }

  // Command to show dropdown with all commands
  let dropdownDisposable = vscode.commands.registerCommand(
    "revive-cmd.showCommandsDropdown", 
    async () => {
      const quickPickItems = prebuiltCommands.map(cmd => ({
        label: cmd.title,
        description: cmd.command,
        command: cmd
      }));

      // Add option to run commands from JSON if it exists
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (workspaceFolders) {
        const jsonFilePath = path.join(
          workspaceFolders[0].uri.fsPath,
          "commands.json"
        );
        if (fs.existsSync(jsonFilePath)) {
          quickPickItems.push({
            label: "Run Commands from JSON",
            description: "Run all commands from commands.json",
            command: { 
              id: "revive-cmd.runCommands",
              title: "Run Commands from JSON",
              command: "Run all commands from commands.json"
            }
          });
        }
      }

      // Show the quick pick dropdown for commands
      const selectedItem = await vscode.window.showQuickPick(quickPickItems, {
        placeHolder: "Select a command to run"
      });

      if (selectedItem) {
        if (selectedItem.command.id === "revive-cmd.runCommands") {
          vscode.commands.executeCommand("revive-cmd.runCommands");
        } else {
          // Get the folders and show folder selection
          const folders = await getWorkspaceFolders();
          
          const folderItems = folders.map(folder => ({
            label: folder,
            description: folder === "./" ? "Current directory" : `Run in ${folder}/`
          }));
          
          const selectedFolder = await vscode.window.showQuickPick(folderItems, {
            placeHolder: "Select a folder to run the command in"
          });
          
          if (selectedFolder) {
            const terminal = vscode.window.createTerminal(selectedItem.label);
            
            // If not running in root directory, cd into the selected folder
            if (selectedFolder.label !== "./") {
              terminal.sendText(`cd ${selectedFolder.label}`, true);
            }
            
            terminal.sendText(selectedItem.command.command, true);
            terminal.show();
          }
        }
      }
    }
  );

  context.subscriptions.push(runCommandsDisposable);
  context.subscriptions.push(dropdownDisposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
