export interface Step {
  id: string
  text: string
  link?: { url: string; text: string }
  color: string
  details: string
}

export const vercelDeploymentSteps: Step[] = [
  { 
    id: 'step1', 
    text: 'Visit ', 
    link: { url: 'https://vercel.com', text: 'vercel.com' }, 
    color: 'blue',
    details: 'Vercel is the best platform for deploying Next.js applications. Open your web browser and go to vercel.com. It\'s created by the same team that built Next.js!'
  },
  { 
    id: 'step2', 
    text: 'Click "Start Deploying" or "Sign Up"', 
    color: 'blue',
    details: 'On the Vercel homepage, click the "Start Deploying" or "Sign Up" button. You\'ll be taken to the signup page where you can create your account.'
  },
  { 
    id: 'step3', 
    text: 'Sign up with GitHub', 
    color: 'green',
    details: 'Click "Continue with GitHub" to sign up using your GitHub account. This is the easiest way and will automatically connect your repositories to Vercel.'
  },
  { 
    id: 'step4', 
    text: 'Authorize Vercel to access your GitHub account', 
    color: 'green',
    details: 'GitHub will ask you to authorize Vercel. Click "Authorize Vercel" to give Vercel permission to access your repositories. This is safe and necessary for deployment.'
  },
  { 
    id: 'step5', 
    text: 'Complete your Vercel profile setup', 
    color: 'purple',
    details: 'Vercel may ask for some additional information like your name or team preferences. Fill this out - you can always change it later in settings.'
  },
  { 
    id: 'step6', 
    text: 'Confirm your portfolio is on GitHub', 
    color: 'purple',
    details: 'Your portfolio should already be on GitHub from the previous guide (steps 26-35 of Personal Website). Open GitHub.com in your browser and navigate to your "my-portfolio" repository to confirm all your files are there. If you see all your portfolio files, you\'re ready to deploy! If not, go back and complete the Git setup steps.'
  },
  { 
    id: 'step7', 
    text: 'Click "Add New Project" or "Import Project"', 
    color: 'orange',
    details: 'On your Vercel dashboard, look for a button that says "Add New..." or "Import Project". Click it to start importing your portfolio from GitHub.'
  },
  { 
    id: 'step8', 
    text: 'Select "Import Git Repository"', 
    color: 'orange',
    details: 'Choose the option to import from Git. Vercel will show you a list of your GitHub repositories that you can deploy.'
  },
  { 
    id: 'step9', 
    text: 'Find and import your portfolio repository', 
    color: 'blue',
    details: 'Scroll through your repositories and find "my-portfolio" (or whatever you named it). Click "Import" next to that repository.'
  },
  { 
    id: 'step10', 
    text: 'Configure project settings - keep defaults', 
    color: 'blue',
    details: 'Vercel will auto-detect that it\'s a Next.js project and configure everything automatically. The default settings are perfect - you don\'t need to change anything! Just review and continue.'
  },
  { 
    id: 'step11', 
    text: 'Click "Deploy"', 
    color: 'green',
    details: 'Click the big "Deploy" button! Vercel will now build and deploy your website. This is the moment of truth - your site is going live!'
  },
  { 
    id: 'step12', 
    text: 'Wait for deployment to complete (1-2 minutes)', 
    color: 'green',
    details: 'Vercel will show you a build log with a progress indicator. Watch as it installs dependencies, builds your Next.js app, and deploys it. This usually takes 1-2 minutes. You\'ll see a success message with confetti when it\'s done!'
  },
  { 
    id: 'step13', 
    text: 'Click "Visit" to see your live website!', 
    color: 'purple',
    details: 'Once deployment is complete, click the "Visit" button or the URL shown. Your personal portfolio is now LIVE on the internet! Share the URL with friends and family!'
  },
  { 
    id: 'step14', 
    text: 'Copy your deployment URL', 
    color: 'purple',
    details: 'Your site will be at a URL like "my-portfolio-username.vercel.app". Copy this URL - you can share it on your resume, LinkedIn, or anywhere else. This is YOUR website!'
  },
  { 
    id: 'step15', 
    text: 'Test automatic deployments', 
    color: 'orange',
    details: 'Make a small change to your portfolio in Cursor (like updating text in the Hero section). Then in Cursor\'s integrated terminal, run: "git add .", "git commit -m \'Update text\'", and "git push". Vercel will automatically detect the change and redeploy your site in seconds. This is the power of continuous deployment!'
  },
  { 
    id: 'step16', 
    text: 'Explore the Vercel dashboard', 
    color: 'orange',
    details: 'Check out your Vercel dashboard. You can see deployment history, analytics, and more. Each commit you make will create a new deployment, and you can roll back to any previous version!'
  },
  { 
    id: 'step17', 
    text: 'Optional: Add a custom domain', 
    color: 'blue',
    details: 'If you own a domain name (like yourname.com), you can connect it to your Vercel site. Go to Project Settings → Domains and follow the instructions. This makes your site even more professional!'
  },
  { 
    id: 'step18', 
    text: 'Share your live portfolio!', 
    color: 'green',
    details: 'Congratulations! You\'ve built AND deployed a professional portfolio website. Share your URL everywhere - add it to your email signature, LinkedIn, resume, and social media. You\'re officially a web developer!'
  },
]

