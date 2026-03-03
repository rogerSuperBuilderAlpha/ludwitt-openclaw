export interface Step {
  id: string
  text: string
  link?: { url: string; text: string }
  color: string
  details: string
}

export const cursorSetupSteps: Step[] = [
  {
    id: 'step1',
    text: 'Visit ',
    link: { url: 'https://www.cursor.com', text: 'cursor.com' },
    color: 'blue',
    details: 'Cursor is an AI-powered code editor built for developers. Open your web browser and go to cursor.com to download the application.'
  },
  { 
    id: 'step2', 
    text: 'Click the Download button', 
    color: 'blue',
    details: 'On the Cursor homepage, you\'ll see a prominent download button. Click it to download the installer for your operating system (Windows, Mac, or Linux). The download should start automatically and save to your Downloads folder.'
  },
  { 
    id: 'step3', 
    text: 'Run the downloaded Cursor installer', 
    color: 'green',
    details: 'Find the downloaded file (usually named "CursorSetup.exe") in your Downloads folder and double-click it to start the installation. You may need to allow the app to make changes to your device.'
  },
  { 
    id: 'step4', 
    text: 'Follow the installation wizard', 
    color: 'green',
    details: 'The installer will guide you through the setup process. Accept the license agreement and choose your installation preferences. The default settings work great for most users.'
  },
  { 
    id: 'step5', 
    text: 'Wait for installation to complete', 
    color: 'green',
    details: 'The installation process will take a few minutes. Cursor will extract files and set up the application on your computer. Once complete, you\'ll see a success message.'
  },
  { 
    id: 'step6', 
    text: 'Launch Cursor for the first time', 
    color: 'purple',
    details: 'After installation, Cursor should launch automatically. If not, find the Cursor icon on your desktop or in the Start menu and click it to open the application.'
  },
  { 
    id: 'step7', 
    text: 'Sign in or create a Cursor account', 
    color: 'purple',
    details: 'When Cursor opens, you\'ll be prompted to sign in. You can create a new account using your email, or sign in with GitHub, Google, or other providers. This account will sync your settings and preferences.'
  },
  { 
    id: 'step8', 
    text: 'Complete the onboarding tutorial', 
    color: 'purple',
    details: 'Cursor will show you a quick tutorial highlighting key features like AI autocomplete, chat, and code generation. Take a few minutes to go through this - it\'s really helpful for understanding what Cursor can do!'
  },
  { 
    id: 'step9', 
    text: 'Explore the AI features (Chat, Cmd+K)', 
    color: 'orange',
    details: 'Try opening a file and using Cmd+K (Ctrl+K on Windows) to edit code with AI, or open the chat panel to ask questions. These are Cursor\'s most powerful features that will supercharge your coding.'
  },
  { 
    id: 'step10', 
    text: 'Set up your preferences and themes', 
    color: 'orange',
    details: 'Go to Settings (File → Preferences → Settings) to customize Cursor to your liking. Choose a theme, adjust font size, and configure keyboard shortcuts. Make it feel like home!'
  },
  {
    id: 'step11',
    text: 'Open Settings → Subscription to review your plan',
    color: 'blue',
    details: 'Go to Settings → Subscription (or click the gear icon in the bottom-left corner). You\'ll see your current plan. Cursor\'s free Hobby plan includes 2,000 AI completions per month and 50 premium requests — that\'s more than enough for this course!'
  },
  {
    id: 'step12',
    text: 'Confirm you\'re on the Hobby (free) plan',
    color: 'blue',
    details: 'You should see "Hobby" as your current plan. This free tier gives you AI code completions, chat, and inline editing — everything you need to follow along. No credit card required! If you\'d like more AI requests later, you can optionally upgrade to Pro ($20/month), but it\'s not needed for this course.'
  },
  {
    id: 'step13',
    text: 'Try an AI completion: start typing code and see suggestions',
    color: 'blue',
    details: 'Open any file (or create a new one with File → New File) and start typing. Cursor will show ghost-text AI suggestions as you type. Press Tab to accept a suggestion. This is the AI autocomplete feature that makes Cursor so powerful — it works on the free plan!'
  },
  {
    id: 'step14',
    text: 'Try the AI Chat: ask a coding question',
    color: 'green',
    details: 'Open the AI Chat panel (Cmd+L on Mac, Ctrl+L on Windows) and ask a question like "How do I create a React component?" The AI will respond with an explanation and code. This chat feature is your coding assistant throughout the course. You\'re now ready to build!'
  },
  {
    id: 'step15',
    text: 'Visit the ',
    link: { url: 'https://github.com/YOUR_ORG/pitch-rise-verification', text: 'verification repository on GitHub' },
    color: 'purple',
    details: 'This is a special repository we created for verifying your Cursor setup. Click the link to open https://github.com/YOUR_ORG/pitch-rise-verification in your browser. You\'ll fork this repo, make changes, and submit a pull request to prove you can use Git and Cursor together.'
  },
  {
    id: 'step16',
    text: 'Fork the repository by clicking "Fork" button (top right)',
    color: 'purple',
    details: 'On the repository page, click the "Fork" button in the top right corner. This creates your own copy of the repository under your GitHub account. You\'ll make changes to your fork, then submit a pull request back to the original repo.'
  },
  {
    id: 'step17',
    text: 'On YOUR fork, click "Code" button and copy the HTTPS URL',
    color: 'purple',
    details: 'Now on YOUR forked repository (should say yourusername/pitch-rise-verification at the top), click the green "Code" button. Make sure "HTTPS" is selected, then click the copy icon. The URL should look like: https://github.com/YOUR-USERNAME/pitch-rise-verification.git'
  },
  {
    id: 'step18',
    text: 'Open Cursor\'s integrated terminal (NOT system terminal)',
    color: 'blue',
    details: 'In Cursor, open the INTEGRATED terminal (Terminal → New Terminal or press Ctrl+` which is the backtick key). This is Cursor\'s built-in terminal, different from your system Command Prompt or Terminal. Type: git clone [paste the URL from your fork] and press Enter. Example: git clone https://github.com/yourusername/pitch-rise-verification.git'
  },
  {
    id: 'step19',
    text: 'Navigate into the folder: cd pitch-rise-verification',
    color: 'blue',
    details: 'In Cursor\'s integrated terminal, type "cd pitch-rise-verification" (change directory) and press Enter to move into the repository folder. Now all your Git commands will work on this repository.'
  },
  {
    id: 'step20',
    text: 'Open the folder in Cursor: File → Open Folder',
    color: 'orange',
    details: 'Before continuing, we need to open this folder in Cursor\'s file explorer. Go to File → Open Folder and select the "pitch-rise-verification" folder you just cloned. This lets you see and edit files in the left sidebar. The integrated terminal will stay open at the bottom.'
  },
  {
    id: 'step21',
    text: 'Create a new branch: git checkout -b verify/your-github-username',
    color: 'orange',
    details: 'Back in Cursor\'s integrated terminal (at the bottom), type "git checkout -b verify/your-github-username" (replace "your-github-username" with your actual GitHub username) and press Enter. This creates and switches to a new branch that follows our verification format. Branches let you work without affecting the main code.'
  },
  { 
    id: 'step22', 
    text: 'Create a new file: verifications/YOUR-USERNAME.txt', 
    color: 'orange',
    details: 'In the file explorer on the left, find the "verifications" folder, right-click it, and select "New File". Name it YOUR-USERNAME.txt (using your GitHub username). This file will contain your verification code.'
  },
  { 
    id: 'step23', 
    text: 'Copy your verification code from the dashboard below', 
    color: 'green',
    details: 'Scroll down on this dashboard page - you\'ll see your unique verification code (looks like PITCH-A7F3-2K9L-X5M8). Copy this code, you\'ll need it in the next step.'
  },
  { 
    id: 'step24', 
    text: 'Paste your verification code into the file and save', 
    color: 'green',
    details: 'Open the file you just created and paste your verification code into it. Save the file (Ctrl+S or File → Save). This code proves that you completed these steps and links your setup to your account.'
  },
  { 
    id: 'step25', 
    text: 'Stage your changes: git add .', 
    color: 'purple',
    details: 'Back in Cursor\'s integrated terminal (at the bottom), type "git add ." (don\'t forget the dot!) and press Enter. This stages all your changes (the new file) so they\'re ready to be committed.'
  },
  { 
    id: 'step26', 
    text: 'Commit your changes: git commit -m "Verify setup"', 
    color: 'purple',
    details: 'In Cursor\'s integrated terminal, type: git commit -m "Verify setup" (with quotes around the message) and press Enter. This creates a commit (a saved snapshot) of your changes with a message describing what you did.'
  },
  {
    id: 'step27',
    text: 'Push your branch: git push origin verify/your-github-username',
    color: 'purple',
    details: 'In Cursor\'s integrated terminal, type "git push origin verify/your-github-username" (replace with your actual GitHub username) and press Enter. This uploads your branch to YOUR forked repository on GitHub. You may be prompted to sign in to GitHub - follow the authentication prompts in your browser or terminal.'
  },
  {
    id: 'step28',
    text: 'Go to YOUR fork on GitHub and click "Compare & pull request"',
    color: 'blue',
    details: 'After pushing, open YOUR forked repository in your browser (github.com/YOUR-USERNAME/pitch-rise-verification). GitHub will show a yellow banner at the top saying "Compare & pull request" - click that button to start creating your PR.'
  },
  {
    id: 'step29',
    text: 'In the PR, make sure base is "YOUR_ORG/pitch-rise-verification" → "main"',
    color: 'blue',
    details: 'IMPORTANT: At the top of the PR page, verify it shows: base repository: YOUR_ORG/pitch-rise-verification, base: main ← head repository: YOUR-USERNAME/pitch-rise-verification, compare: verify/your-github-username. This ensures your PR goes to the correct repository!'
  },
  {
    id: 'step30',
    text: 'Title: "Add verification for [YOUR-USERNAME]" then Create PR',
    color: 'blue',
    details: 'Set the PR title to "Add verification for [your GitHub username]" (e.g., "Add verification for john-doe"). In the description, paste your verification code. Then click the green "Create pull request" button.'
  },
  {
    id: 'step31',
    text: 'Wait for automatic verification (usually instant)',
    color: 'green',
    details: 'Our system automatically detects your pull request, checks if your verification code matches, and updates your dashboard. This usually happens within 5-30 seconds. Refresh this page - you\'ll see a success message when verified! If it takes longer than 1 minute, double-check that you included your verification code in the PR description or the file content.'
  },
]

