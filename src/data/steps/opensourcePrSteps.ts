import { Step } from './cursorSetupSteps'

export const opensourcePrSteps: Step[] = [
  {
    id: 'step1',
    text: 'Visit the ',
    link: { url: 'https://github.com/cursorboston/cursorboston.com', text: 'cursorboston.com GitHub repo' },
    color: 'blue',
    details: 'Open the cursorboston.com repository on GitHub. This is a real open-source project where you\'ll make your first contribution. Take a moment to read the README and explore the codebase.',
  },
  {
    id: 'step2',
    text: 'Fork the repository to your own GitHub account',
    color: 'blue',
    details: 'Click the "Fork" button in the top-right corner of the repo page. This creates your own copy of the repository under your GitHub account. You\'ll make changes on your fork, then submit a pull request back to the original.',
  },
  {
    id: 'step3',
    text: 'Clone your fork locally (git clone)',
    color: 'green',
    details: 'On YOUR forked repository, click the green "Code" button, copy the HTTPS URL, then open your terminal and run: git clone https://github.com/YOUR-USERNAME/cursorboston.com.git. This downloads the project to your computer.',
  },
  {
    id: 'step4',
    text: 'Create a new branch (git checkout -b your-name/your-change)',
    color: 'green',
    details: 'Navigate into the cloned folder with "cd cursorboston.com", then create a new branch: git checkout -b your-name/your-change (e.g., "jane-doe/add-contributor"). Always work on a branch, never directly on main.',
  },
  {
    id: 'step5',
    text: 'Open the project in your AI tool (Cursor / Claude Code / OpenClaw)',
    color: 'purple',
    details: 'Open the cursorboston.com project folder in whichever AI tool you\'ve been using. If you\'re using Cursor, do File > Open Folder. If Claude Code, navigate to the folder in your terminal. If OpenClaw, point it to the project directory.',
  },
  {
    id: 'step6',
    text: 'Make a meaningful change (add your name to contributors, fix a typo, improve docs)',
    color: 'purple',
    details: 'Look for something you can improve. Ideas: add your name and GitHub link to the contributors section, fix a typo you notice, improve documentation, or add a small feature. Use your AI tool to help! Even small contributions matter.',
  },
  {
    id: 'step7',
    text: 'Test your changes locally',
    color: 'purple',
    details: 'Before submitting, make sure your changes work. Run the project locally (usually "npm install" then "npm run dev") and verify everything looks good in your browser. Check that you haven\'t broken anything.',
  },
  {
    id: 'step8',
    text: 'Stage your changes (git add)',
    color: 'orange',
    details: 'In your terminal, run "git add ." to stage all your changes, or "git add <filename>" to stage specific files. Staging prepares your changes to be committed. Run "git status" to verify the right files are staged.',
  },
  {
    id: 'step9',
    text: 'Commit with a descriptive message (git commit -m "...")',
    color: 'orange',
    details: 'Run: git commit -m "Add [your name] to contributors" (or whatever describes your change). A good commit message explains WHAT you changed and WHY. Keep it concise but descriptive.',
  },
  {
    id: 'step10',
    text: 'Push your branch to your fork (git push origin your-branch)',
    color: 'orange',
    details: 'Run: git push origin your-name/your-change (use the same branch name from step 4). This uploads your branch to your fork on GitHub. You may be prompted to authenticate with GitHub.',
  },
  {
    id: 'step11',
    text: 'Go to the original cursorboston.com repo on GitHub',
    color: 'blue',
    details: 'Navigate back to https://github.com/cursorboston/cursorboston.com in your browser. You should see a yellow banner saying "your-branch had recent pushes" with a "Compare & pull request" button.',
  },
  {
    id: 'step12',
    text: 'Click "New Pull Request" and select your branch',
    color: 'blue',
    details: 'Click "Compare & pull request" (or go to Pull Requests > New Pull Request). Make sure the base repository is cursorboston/cursorboston.com and the base branch is "main". The compare branch should be your fork and branch.',
  },
  {
    id: 'step13',
    text: 'Write a clear PR title and description',
    color: 'green',
    details: 'Give your PR a clear title (e.g., "Add Jane Doe to contributors list"). In the description, explain what you changed and why. Mention that you\'re a Ludwitt learner making your first open-source contribution!',
  },
  {
    id: 'step14',
    text: 'Submit the pull request',
    color: 'green',
    details: 'Click the green "Create pull request" button. Congratulations! You\'ve just submitted your first open-source pull request. The project maintainers will review your changes and provide feedback.',
  },
  {
    id: 'step15',
    text: 'Respond to review feedback and get your PR merged',
    color: 'green',
    details: 'Check back on your PR for comments from reviewers. They may request changes - that\'s normal! Make the requested changes on your branch, commit, and push again. The PR updates automatically. Once approved, your code will be merged into the project!',
  },
]
