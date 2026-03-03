import { Step } from './cursorSetupSteps'

export const claudeCodeSetupSteps: Step[] = [
  {
    id: 'cc-step1',
    text: 'Open your system terminal (Terminal on Mac, PowerShell on Windows)',
    color: 'purple',
    details: 'Claude Code runs entirely in the terminal. On Mac, press Command+Space and type "Terminal". On Windows, press the Start key and type "PowerShell". On Linux, press Ctrl+Alt+T. Make sure you have a terminal open before proceeding.',
  },
  {
    id: 'cc-step2',
    text: 'Verify Node.js is installed: node --version',
    color: 'purple',
    details: 'Claude Code requires Node.js 18 or higher. Type "node --version" in your terminal and press Enter. You should see a version number like "v20.x.x". If you get an error, visit nodejs.org to install it first.',
  },
  {
    id: 'cc-step3',
    text: 'Install Claude Code: npm install -g @anthropic-ai/claude-code',
    color: 'blue',
    details: 'Type "npm install -g @anthropic-ai/claude-code" in your terminal and press Enter. The -g flag installs it globally so you can use the "claude" command from anywhere. Installation may take 1-2 minutes.',
  },
  {
    id: 'cc-step4',
    text: 'Verify installation: claude --version',
    color: 'blue',
    details: 'Type "claude --version" in your terminal to confirm Claude Code installed correctly. You should see a version number. If you get "command not found", try closing and reopening your terminal, or check that your npm global bin directory is in your PATH.',
  },
  {
    id: 'cc-step5',
    text: 'Authenticate with Anthropic: claude login',
    color: 'green',
    details: 'Type "claude login" and press Enter. This will open a browser window where you can sign in with your Anthropic account (or create one). After signing in, the browser will confirm the connection and your terminal will show "Authenticated successfully".',
  },
  {
    id: 'cc-step6',
    text: 'Create a project folder: mkdir my-claude-project && cd my-claude-project',
    color: 'green',
    details: 'Create a new folder for your project. Type "mkdir my-claude-project" then "cd my-claude-project" to move into it. This gives Claude Code a clean workspace to operate in.',
  },
  {
    id: 'cc-step7',
    text: 'Start an interactive session: claude',
    color: 'purple',
    details: 'Type just "claude" and press Enter to start an interactive chat session. You\'ll see a prompt where you can type messages to Claude. This is like having an AI pair programmer right in your terminal. Type "exit" or press Ctrl+C to leave the session.',
  },
  {
    id: 'cc-step8',
    text: 'Try a simple prompt: "Create a hello world Node.js script"',
    color: 'purple',
    details: 'In the Claude Code interactive session, type: "Create a hello world Node.js script". Claude will create the file for you and explain what it did. You can run it with "node index.js" (or whatever filename Claude chose).',
  },
  {
    id: 'cc-step9',
    text: 'Try a one-shot command: claude "explain this project"',
    color: 'orange',
    details: 'Exit the interactive session (Ctrl+C), then try a one-shot command by typing: claude "explain this project". Claude Code will analyze your project files and give you a summary. One-shot commands are great for quick tasks.',
  },
  {
    id: 'cc-step10',
    text: 'Explore the help menu: claude --help',
    color: 'orange',
    details: 'Type "claude --help" to see all available commands and flags. Key ones to know: "claude" for interactive mode, "claude <prompt>" for one-shot, "claude config" for settings. Familiarize yourself with the options.',
  },
  {
    id: 'cc-step11',
    text: 'Configure your preferred model: claude config',
    color: 'blue',
    details: 'Type "claude config" to adjust settings. You can set your preferred Claude model, default behavior, and other preferences. The default model works great for most tasks, but you can change it if you have a preference.',
  },
  {
    id: 'cc-step12',
    text: 'Try editing a file: claude "add error handling to index.js"',
    color: 'blue',
    details: 'Ask Claude Code to modify an existing file. Type: claude "add error handling to index.js". Claude will read the file, make changes, and show you a diff of what it modified. You can approve or reject the changes.',
  },
  {
    id: 'cc-step13',
    text: 'Try multi-file operations: claude "create a basic Express API with routes"',
    color: 'green',
    details: 'Claude Code can create multiple files at once. Try: claude "create a basic Express API with a health check route and a hello route". It will scaffold the project structure, install dependencies, and create all needed files.',
  },
  {
    id: 'cc-step14',
    text: 'Initialize a Git repository: git init && git add . && git commit -m "Initial commit"',
    color: 'green',
    details: 'Before moving to the next phase, save your work with Git. Type "git init" then "git add ." then "git commit -m \'Initial commit\'". This creates a checkpoint you can always return to.',
  },
  {
    id: 'cc-step15',
    text: 'Push to GitHub: create a repo and push your code',
    color: 'orange',
    details: 'Go to GitHub.com, create a new repository named "my-claude-project". Follow the instructions to add the remote and push: "git remote add origin <your-url>" then "git push -u origin main". Your code is now safely stored on GitHub!',
  },
]
