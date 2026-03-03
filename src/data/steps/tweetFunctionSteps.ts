import { Step } from './cursorSetupSteps'

export const tweetFunctionSteps: Step[] = [
  {
    id: 'tf-step1',
    text: 'Create a Firebase project at ',
    link: { url: 'https://console.firebase.google.com', text: 'console.firebase.google.com' },
    color: 'orange',
    details: 'Go to the Firebase Console and click "Create a project". Name it something like "tweet-agent". Accept the terms and click Continue. You can disable Google Analytics if prompted. Wait for the project to be created.',
  },
  {
    id: 'tf-step2',
    text: 'Upgrade to Blaze (pay-as-you-go) plan for Cloud Functions',
    color: 'orange',
    details: 'Firebase Functions requires the Blaze plan. In your Firebase project, click the gear icon → Usage and billing → Modify plan → Select Blaze. You\'ll need a credit card but you get generous free tier limits. Cloud Functions gives you 2M free invocations/month.',
  },
  {
    id: 'tf-step3',
    text: 'Install Firebase CLI: npm install -g firebase-tools',
    color: 'blue',
    details: 'In your terminal, type "npm install -g firebase-tools" and press Enter. This installs the Firebase command-line tools globally. After installation, verify with "firebase --version".',
  },
  {
    id: 'tf-step4',
    text: 'Login to Firebase CLI: firebase login',
    color: 'blue',
    details: 'Type "firebase login" in your terminal. A browser window will open asking you to sign in with your Google account. After signing in, you\'ll see "Success! Logged in as your@email.com" in the terminal.',
  },
  {
    id: 'tf-step5',
    text: 'Initialize Functions in your project: firebase init functions',
    color: 'purple',
    details: 'Navigate to your project folder and type "firebase init functions". Select your Firebase project from the list. Choose TypeScript as the language. Say Yes to ESLint. Say Yes to install dependencies. This creates a /functions directory with all the boilerplate.',
  },
  {
    id: 'tf-step6',
    text: 'Apply for a Twitter/X Developer account at ',
    link: { url: 'https://developer.twitter.com', text: 'developer.twitter.com' },
    color: 'green',
    details: 'Go to developer.twitter.com and sign in with your X/Twitter account. Apply for a developer account. Describe your use case as "automated content posting for learning purposes". Approval is usually instant for free tier. Once approved, create a new Project and App.',
  },
  {
    id: 'tf-step7',
    text: 'Generate Twitter API keys (API Key, Secret, Bearer Token, Access Token)',
    color: 'green',
    details: 'In your Twitter Developer Portal, go to your App → Keys and tokens. Generate: API Key & Secret, Bearer Token, and Access Token & Secret. Save ALL of these securely - you\'ll need them in the next steps. Never commit these to Git!',
  },
  {
    id: 'tf-step8',
    text: 'Prompt Claude Code: "Build a tweet scheduling function"',
    color: 'purple',
    details: 'In your functions directory, start Claude Code: claude "Create a Firebase Cloud Function in TypeScript that posts tweets using the Twitter API v2. It should run on a schedule (every 12 hours) and pick a tweet from a predefined list of tech/coding tips. Use the twitter-api-v2 npm package."',
  },
  {
    id: 'tf-step9',
    text: 'Review and apply Claude Code\'s generated function',
    color: 'purple',
    details: 'Claude Code will create the function file with scheduling logic, Twitter API integration, and a tweet content list. Review the code to understand: the onSchedule trigger, the Twitter client setup, and how tweets are selected. Apply the changes.',
  },
  {
    id: 'tf-step10',
    text: 'Set environment variables with Firebase config',
    color: 'orange',
    details: 'Store your API keys securely using Firebase environment config. Run: "firebase functions:secrets:set TWITTER_API_KEY" and paste your key when prompted. Repeat for TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_SECRET. These are encrypted at rest.',
  },
  {
    id: 'tf-step11',
    text: 'Install the twitter-api-v2 package: cd functions && npm install twitter-api-v2',
    color: 'blue',
    details: 'Navigate to the functions directory (cd functions) and install the Twitter API package: "npm install twitter-api-v2". This is the official community library for interacting with the Twitter/X API v2.',
  },
  {
    id: 'tf-step12',
    text: 'Test locally with Firebase Emulator: firebase emulators:start',
    color: 'blue',
    details: 'Run "firebase emulators:start --only functions" to start the local emulator. You can trigger your scheduled function manually through the emulator UI at localhost:4000. Check the logs to verify the function runs without errors.',
  },
  {
    id: 'tf-step13',
    text: 'Prompt Claude Code: "Add tweet variety and content rotation"',
    color: 'green',
    details: 'Ask Claude Code to enhance the tweet content: claude "Add a larger list of 20+ coding/tech tip tweets. Add logic to track which tweets have been posted (store in Firestore) so it never repeats. Add hashtag rotation and time-aware content."',
  },
  {
    id: 'tf-step14',
    text: 'Verify the function compiles: cd functions && npm run build',
    color: 'green',
    details: 'In the functions directory, run "npm run build" to compile the TypeScript. Fix any type errors that come up. A clean build means your function is ready for deployment. Check that the /lib output directory was created.',
  },
  {
    id: 'tf-step15',
    text: 'Commit your work: git add . && git commit -m "Add tweet scheduling function"',
    color: 'orange',
    details: 'Save your progress with Git. Stage all files with "git add ." then commit with "git commit -m \'Add tweet scheduling function\'". Push to GitHub with "git push". Your tweet agent code is now safely stored!',
  },
]
