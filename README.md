# Revive CMD

<p align="center">
  <img src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1744049591/Revive%20CMD/wzr7b1nw29sgkisw8usl.png" alt="Revive CMD Logo" width="430" height="128"/>
</p>

<p align="center">
  A VS Code extension for quickly running common commands with a single click
</p>

## Features

- **Run Custom Commands**: Configure your own commands in a `commands.json` file
- **Command Dropdown**: Quick access to all available commands via dropdown menu
- **Folder Selection**: Choose which directory to run your commands in
- **Prebuilt Commands**: One-click access to common commands:
  - `npm run dev`
  - `npm start`
  - `npm run build`
  - `npm test`
  - `git pull`
- **Multiple Terminals**: Each command runs in its own named terminal
- **Easy Access**: Terminal icons in the editor title bar and explorer view

## Usage

### Quick Start

1. After installation, you'll see terminal icons in your editor's title bar and explorer view
2. Click the "Select Command to Run..." icon to see all available commands
3. Choose a command and then select which folder to run it in
4. The command will execute in a new terminal window

### Using the Command Dropdown with Folder Selection

1. Click the terminal icon labeled "Select Command to Run..." in the editor title bar or explorer view
   <p align="center">
     <img src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1744050107/Revive%20CMD/rczvtodj28cvj7uomwyb.png" alt="Command Dropdown" width="300"/>
   </p>
2. Choose from the dropdown menu of available commands:
   
   <p align="center">
     <img src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1744050203/Revive%20CMD/gxdetnoz10i5p2reh9cu.png" alt="Command Dropdown" width="500"/>
   </p>
   
3. Select which folder to run the command in (current directory or any subfolder)
   
   <p align="center">
     <img src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1744050227/Revive%20CMD/thryhkrcv7ndxbltjz9i.png" alt="Folder Selection" width="500"/>
   </p>
   
4. The selected command will run in the chosen directory in a new terminal


### Setting Up Custom Commands

1. Create a `commands.json` file in the root of your workspace with this structure:

```json
{
  "commands": [
    {
      "terminal": "Frontend",
      "command": "npm run dev"
    },
    {
      "terminal": "Backend",
      "command": "cd api && npm start"
    },
    {
      "terminal": "Tests",
      "command": "npm test"
    }
  ]
}
```

2. Click the "Run Commands from JSON" terminal icon or select it from the dropdown menu
<p align="center">
  <img src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1744050395/Revive%20CMD/uber1cmlkvched0jeit7.png" alt="Multiple Terminals" width="300"/>
</p>

3. All commands will execute simultaneously in separate terminals:

<p align="center">
  <img src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1744050484/Revive%20CMD/gpypyizw1tsrdwitgxtf.png" alt="Multiple Terminals" width="400"/>
</p>

## Installation

### From Marketplace
1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X)
3. Search for "Revive CMD"
4. Click Install

### From VSIX File
1. Download the latest `.vsix` file from the [releases page](https://github.com/Mohit-Nippanikar78/Revive-CMD)
2. In VS Code, go to Extensions view (Ctrl+Shift+X)
3. Click "..." at the top of the Extensions panel
4. Select "Install from VSIX..."
5. Choose the downloaded `.vsix` file
6. Click "Install"

## Configuration Examples

### Simple React Project

```json
{
  "commands": [
    {
      "terminal": "React Dev",
      "command": "npm run start"
    },
    {
      "terminal": "Tests",
      "command": "npm test"
    }
  ]
}
```

### Full Stack Project

```json
{
  "commands": [
    {
      "terminal": "Backend",
      "command": "cd server && npm run dev"
    },
    {
      "terminal": "Frontend",
      "command": "cd client && npm start"
    },
    {
      "terminal": "Database",
      "command": "docker-compose up"
    }
  ]
}
```

### Next.js + API Project

```json
{
  "commands": [
    {
      "terminal": "Next.js",
      "command": "npm run dev"
    },
    {
      "terminal": "API",
      "command": "cd api && npm start"
    },
    {
      "terminal": "Prisma Studio",
      "command": "npx prisma studio"
    }
  ]
}
```

## Development

### Building the Extension

1. Clone the repository:
```
git clone https://github.com/Mohit-Nippanikar78/Revive-CMD
cd revive-cmd
```

2. Install dependencies:
```
npm install
```

3. Package the extension:
```
npm install -g @vscode/vsce
vsce package
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Feedback

If you have any feedback or issues, please file an issue at the [GitHub repository](https://github.com/Mohit-Nippanikar78/Revive-CMD).

---

Made by Mohit Nippanikar
