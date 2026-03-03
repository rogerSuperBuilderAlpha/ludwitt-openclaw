import { Step } from './cursorSetupSteps'

export const firebaseDeploySteps: Step[] = [
  {
    id: 'fd-step1',
    text: 'Verify Firebase CLI is logged in: firebase projects:list',
    color: 'blue',
    details: 'In your terminal, type "firebase projects:list" to verify you\'re logged in and can see your project. If you get an error, run "firebase login" first. You should see your tweet-agent project in the list.',
  },
  {
    id: 'fd-step2',
    text: 'Navigate to your project root (parent of /functions)',
    color: 'blue',
    details: 'Make sure your terminal is in the root of your project (where firebase.json is located), NOT inside the /functions subdirectory. Type "ls" or "dir" to verify you can see firebase.json in the current directory.',
  },
  {
    id: 'fd-step3',
    text: 'Run a final build check: cd functions && npm run build',
    color: 'green',
    details: 'Before deploying, do one final build to catch any issues. Navigate to the functions directory and run "npm run build". Fix any TypeScript errors. A clean build is required for deployment to succeed.',
  },
  {
    id: 'fd-step4',
    text: 'Set all required secrets if not already done',
    color: 'green',
    details: 'Verify your secrets are set by running "firebase functions:secrets:access TWITTER_API_KEY". If any are missing, set them with "firebase functions:secrets:set <SECRET_NAME>". All four Twitter keys must be configured.',
  },
  {
    id: 'fd-step5',
    text: 'Deploy your function: firebase deploy --only functions',
    color: 'purple',
    details: 'Navigate back to project root and run "firebase deploy --only functions". Firebase will upload your compiled code, configure the scheduled trigger, and make the function live. This takes 1-3 minutes. Watch for any errors in the output.',
  },
  {
    id: 'fd-step6',
    text: 'Check the Firebase Console for your deployed function',
    color: 'purple',
    details: 'Go to the Firebase Console → Functions tab. You should see your scheduled function listed with its schedule (every 12 hours). The status should show as "Active". Click on it to see details like memory allocation and timeout.',
  },
  {
    id: 'fd-step7',
    text: 'Trigger a test run from the Firebase Console',
    color: 'orange',
    details: 'In the Firebase Console Functions tab, you can manually trigger your function using the Cloud Scheduler UI (linked from Functions). Or use the Google Cloud Console → Cloud Scheduler to find your job and click "Run Now". Check logs to confirm it posted a tweet.',
  },
  {
    id: 'fd-step8',
    text: 'Verify the tweet was posted on your X/Twitter account',
    color: 'orange',
    details: 'Open Twitter/X in your browser and check your profile. You should see the tweet that your function just posted! This confirms the entire pipeline works: Firebase scheduled trigger → your function → Twitter API → live tweet.',
  },
  {
    id: 'fd-step9',
    text: 'Check function logs: firebase functions:log',
    color: 'blue',
    details: 'Type "firebase functions:log" in your terminal to see recent execution logs. You should see entries for each function invocation, including the tweet content that was posted. This is your debugging tool for production issues.',
  },
  {
    id: 'fd-step10',
    text: 'Monitor the next scheduled execution',
    color: 'blue',
    details: 'Your function is now set to run automatically every 12 hours. Check back after the next scheduled time to verify it runs on its own. In the Firebase Console, you can see execution history and any errors.',
  },
  {
    id: 'fd-step11',
    text: 'Set up error alerting in Firebase Console',
    color: 'green',
    details: 'Go to Firebase Console → Settings → Integrations. Set up email alerts for function errors. This way you\'ll know immediately if your tweet function fails. You can also configure Crashlytics for more detailed error reporting.',
  },
  {
    id: 'fd-step12',
    text: 'Prompt Claude Code: "Add error handling and retry logic"',
    color: 'green',
    details: 'Improve reliability by asking Claude Code: "Add retry logic for Twitter API failures with exponential backoff. Add error logging to Firestore for debugging. Handle rate limiting gracefully." Apply the changes and redeploy.',
  },
  {
    id: 'fd-step13',
    text: 'Redeploy with improvements: firebase deploy --only functions',
    color: 'purple',
    details: 'After making improvements, redeploy with "firebase deploy --only functions". Firebase will update your function in-place without any downtime. The schedule continues uninterrupted.',
  },
  {
    id: 'fd-step14',
    text: 'Wait 24 hours and verify 2 tweets were posted automatically',
    color: 'purple',
    details: 'The real test: wait a full day and check your Twitter/X profile. You should see 2 new tweets posted automatically by your function. Check Firebase logs to confirm both executions succeeded. Congratulations - you\'ve deployed a live AI-powered agent!',
  },
  {
    id: 'fd-step15',
    text: 'Commit and push final version: git add . && git commit -m "Production ready"',
    color: 'orange',
    details: 'Save your final production code. Stage all changes with "git add ." and commit with "git commit -m \'Production-ready tweet agent with error handling\'". Push to GitHub. Your deployed function and its code are now fully documented and version-controlled.',
  },
]
