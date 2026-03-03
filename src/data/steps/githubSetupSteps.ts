export interface Step {
  id: string
  text: string
  link?: { url: string; text: string }
  color: string
  details: string
  needsUsername?: boolean
  needsEmail?: boolean
  command?: string
}

export const githubSetupSteps: Step[] = [
  {
    id: 'step1',
    text: 'Visit ',
    link: { url: 'https://github.com', text: 'github.com' },
    color: 'blue',
    details: 'GitHub is where developers store and share code. Open your web browser (Chrome, Firefox, Safari, Edge, etc.) and type "github.com" in the address bar, then press Enter.'
  },
  {
    id: 'step2',
    text: 'Click "Sign up" in the top right corner',
    color: 'blue',
    details: 'Look for the "Sign up" button in the top-right corner of the GitHub homepage. Click it to start creating your account.'
  },
  {
    id: 'step3',
    text: 'Enter your email and create a username',
    color: 'blue',
    details: 'GitHub will ask for your email address first. Then choose a professional username (this will be visible on your profile - avoid silly names). Pick something like "johnsmith" or "jane-dev". Then create a strong password.'
  },
  {
    id: 'step4',
    text: 'Complete the verification puzzle',
    color: 'blue',
    details: 'GitHub will show you a puzzle to verify you\'re human (like selecting images or solving a simple challenge). Complete it to continue.'
  },
  {
    id: 'step5',
    text: 'Verify your email address',
    color: 'blue',
    details: 'Check your email inbox for a message from GitHub with the subject "Verify your email address". Open it and click the blue "Verify email address" button. This confirms your account is real.'
  },
  {
    id: 'step6',
    text: 'Download Git from ',
    link: { url: 'https://git-scm.com/downloads', text: 'git-scm.com' },
    color: 'green',
    details: 'Git is the software that lets you save and track changes to code. Click the link to visit git-scm.com/downloads. The website will automatically detect your operating system (Windows, Mac, or Linux) and show you the right download button. Click the download button.'
  },
  {
    id: 'step7',
    text: 'Run the Git installer',
    color: 'green',
    details: 'Find the downloaded file in your Downloads folder (it will be named something like "Git-2.43.0-64-bit.exe" on Windows or "git-2.43.0-intel.dmg" on Mac). Double-click the file to start the installation. Click "Yes" if Windows asks if you want to allow the app to make changes.'
  },
  {
    id: 'step8',
    text: 'Click "Next" through the installer (use default settings)',
    color: 'green',
    details: 'The installer will show you many screens with technical options. DON\'T WORRY - the default settings are perfect for beginners. Just keep clicking "Next" until you see an "Install" button, then click "Install", then click "Finish" when it\'s done.'
  },
  {
    id: 'step9',
    text: 'Open your system terminal (NOT Cursor)',
    color: 'purple',
    details: 'We need to use your computer\'s built-in terminal, not Cursor. WINDOWS: Click the Start menu and type "cmd" then press Enter (this opens Command Prompt). OR type "powershell" and press Enter. MAC: Press Command+Space, type "terminal" and press Enter. This is your command-line interface where you\'ll type Git commands.'
  },
  {
    id: 'step10',
    text: 'Verify Git is installed',
    color: 'purple',
    details: 'In your system terminal window (Command Prompt or Terminal), type exactly: git --version (then press Enter). You should see something like "git version 2.43.0". If you see this, Git is installed correctly! If you see "command not found", close the terminal, wait 30 seconds, and open a new one.',
    command: 'git --version'
  },
  {
    id: 'step11',
    text: 'Enter your GitHub username below (then click next)',
    color: 'purple',
    details: 'Before we configure Git, we need your GitHub username and email. In the box that appears when you check this step, type your EXACT GitHub username (the one you just created). This will be used to generate your personalized Git commands. Make sure it\'s spelled exactly like your GitHub account.',
    needsUsername: true
  },
  {
    id: 'step12',
    text: 'Enter your GitHub email below (then click next)',
    color: 'purple',
    details: 'Now enter the EXACT email address you used to sign up for GitHub. This must match exactly or Git won\'t link to your GitHub account. Double-check for typos!',
    needsEmail: true
  },
  {
    id: 'step13',
    text: 'Copy and paste this command to set your Git username:',
    color: 'purple',
    details: 'Copy the command that appears below and paste it into your system terminal (Command Prompt or Terminal). To paste: Windows (Right-click or Ctrl+V), Mac (Command+V). Then press Enter. This tells Git who you are when you make changes.',
    needsUsername: true,
    command: 'git config --global user.name "{username}"'
  },
  {
    id: 'step14',
    text: 'Copy and paste this command to set your Git email:',
    color: 'purple',
    details: 'Copy the command below and paste it into your system terminal, then press Enter. This links your work to your GitHub account.',
    needsEmail: true,
    command: 'git config --global user.email "{email}"'
  },
  {
    id: 'step15',
    text: 'Verify your Git configuration',
    color: 'purple',
    details: 'In your system terminal, type this command to verify your username and email were set correctly. WINDOWS: type "git config --list | findstr user" - MAC/LINUX: type "git config --list | grep user". You should see your username and email displayed. If they look wrong, go back and redo steps 13-14.',
    command: 'git config --list | findstr user (Windows) OR git config --list | grep user (Mac/Linux)'
  },
  {
    id: 'step16',
    text: 'Create a new repository on GitHub',
    color: 'orange',
    details: 'Go back to GitHub.com in your browser. Click the "+" icon in the top-right corner, then select "New repository" from the dropdown menu.'
  },
  {
    id: 'step17',
    text: 'Name your repository "my-first-repo"',
    color: 'orange',
    details: 'In the "Repository name" field, type exactly: my-first-repo (all lowercase, with hyphens). You can add a description like "Learning Git and GitHub" if you want (optional).'
  },
  {
    id: 'step18',
    text: 'Select "Public" and check "Add a README file"',
    color: 'orange',
    details: 'IMPORTANT: Make sure "Public" is selected (not Private). Then CHECK THE BOX that says "Add a README file". This is crucial - it initializes your repository so it\'s not empty. Leave everything else at default settings.'
  },
  {
    id: 'step19',
    text: 'Click "Create repository"',
    color: 'orange',
    details: 'Scroll down and click the green "Create repository" button at the bottom. GitHub will create your first repository and show you the repository page with your README file.'
  },
  {
    id: 'step20',
    text: 'Click the green "Code" button',
    color: 'orange',
    details: 'On your new repository page, look for a green button labeled "Code" (it\'s near the top-right of the file list). Click it to reveal a dropdown menu.'
  },
  {
    id: 'step21',
    text: 'Copy the HTTPS URL',
    color: 'orange',
    details: 'In the dropdown, make sure "HTTPS" is selected at the top (you\'ll see tabs for HTTPS, SSH, and GitHub CLI - click HTTPS). Then click the copy icon (two overlapping squares) next to the URL to copy it. The URL will look like: https://github.com/yourusername/my-first-repo.git'
  },
  {
    id: 'step22',
    text: 'Navigate to your Documents folder in system terminal',
    color: 'blue',
    details: 'Go back to your system terminal (Command Prompt or Terminal). WINDOWS: Type "cd %USERPROFILE%\\Documents" and press Enter. MAC/LINUX: Type "cd ~/Documents" and press Enter. This takes you to your Documents folder where we\'ll download your repository. If you get an error, you can use "cd Desktop" instead to use your Desktop folder.',
    command: 'cd %USERPROFILE%\\Documents (Windows) OR cd ~/Documents (Mac/Linux)'
  },
  {
    id: 'step23',
    text: 'Clone your repository',
    color: 'blue',
    details: 'In your system terminal, type "git clone " (with a space after clone), then paste the URL you copied from GitHub. Press Enter. Git will download your repository to a new folder called "my-first-repo" in your Documents. You should see messages about cloning and a "done" message.',
    command: 'git clone <paste-your-repo-URL-here>'
  },
  {
    id: 'step24',
    text: 'Navigate into your cloned repository',
    color: 'blue',
    details: 'In your system terminal, type this command to enter your new repository folder. You should see the folder name appear in your terminal prompt, confirming you\'re inside the repository.',
    command: 'cd my-first-repo'
  },
  {
    id: 'step25',
    text: 'List the files to verify the clone worked',
    color: 'blue',
    details: 'In your system terminal, type this command to see the files in your repository. WINDOWS: type "dir" and press Enter. MAC/LINUX: type "ls" and press Enter. You should see "README.md" listed. Congratulations - you\'ve successfully cloned your first GitHub repository! You can now close this system terminal window.',
    command: 'dir (Windows) or ls (Mac/Linux)'
  },
]

