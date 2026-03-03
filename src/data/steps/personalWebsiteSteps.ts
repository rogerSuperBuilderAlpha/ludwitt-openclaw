export interface Step {
  id: string
  text: string
  link?: { url: string; text: string }
  color: string
  details: string
  command?: string
}

export const personalWebsiteSteps: Step[] = [
  { 
    id: 'step1', 
    text: 'Visit ', 
    link: { url: 'https://nodejs.org', text: 'nodejs.org' }, 
    color: 'blue',
    details: 'Node.js is required to run Next.js applications. Open your web browser and go to nodejs.org. Download the LTS (Long Term Support) version for your operating system. The website will automatically detect if you\'re on Windows, Mac, or Linux.'
  },
  { 
    id: 'step2', 
    text: 'Run the Node.js installer', 
    color: 'blue',
    details: 'Find the downloaded installer in your Downloads folder (usually named "node-vXX.X.X-x64.msi") and double-click it. Follow the installation wizard, accepting the default settings. This will install both Node.js and npm (Node Package Manager).'
  },
  { 
    id: 'step3', 
    text: 'Verify Node.js installation: node --version', 
    color: 'green',
    details: 'Open your system terminal (NOT Cursor). WINDOWS: Click Start and type "cmd" or "powershell". MAC: Press Command+Space and type "terminal". Then type "node --version" and press Enter. You should see a version number like "v20.x.x". This confirms Node.js is installed correctly.'
  },
  { 
    id: 'step4', 
    text: 'Verify npm installation: npm --version', 
    color: 'green',
    details: 'In the same system terminal, type "npm --version" and press Enter. You should see a version number. npm comes bundled with Node.js and is used to install JavaScript packages. You can now close this system terminal - we\'ll use Cursor\'s terminal for the rest.'
  },
  { 
    id: 'step5', 
    text: 'Open Cursor and create a new folder in Documents', 
    color: 'purple',
    details: 'Open Cursor, then go to File → Open Folder. Navigate to your Documents folder and click "New Folder". Name it "my-portfolio" and select it to open in Cursor. This keeps your projects organized in one place!'
  },
  { 
    id: 'step6', 
    text: 'Open Cursor\'s AI Chat (Cmd+L or Ctrl+L)', 
    color: 'purple',
    details: 'Press Cmd+L (Mac) or Ctrl+L (Windows) to open the AI chat sidebar in Cursor. This is where you\'ll give instructions to build your Next.js website.'
  },
  { 
    id: 'step7', 
    text: 'Prompt: "Create a Next.js personal portfolio website"',
    color: 'orange',
    details: 'Type this prompt: "Create a Next.js personal portfolio website with App Router. Include a modern homepage with Hero section, About Me, Projects grid, and Contact section. Use Tailwind CSS for styling. Make it look professional and modern."'
  },
  { 
    id: 'step8', 
    text: 'Review and apply the AI\'s generated files', 
    color: 'orange',
    details: 'Cursor will generate all necessary files including package.json, next.config.js, app/page.tsx, and more. Review the files and click "Apply" or "Accept" to add them to your project.'
  },
  { 
    id: 'step9', 
    text: 'Open Cursor\'s integrated terminal', 
    color: 'blue',
    details: 'Now we switch to using Cursor\'s INTEGRATED terminal (NOT your system terminal). Press Ctrl+` (backtick key) or go to Terminal → New Terminal to open Cursor\'s built-in terminal at the bottom. This terminal is already in your project folder, which is convenient!'
  },
  { 
    id: 'step10', 
    text: 'Install dependencies: npm install', 
    color: 'blue',
    details: 'In Cursor\'s integrated terminal (at the bottom), type "npm install" and press Enter. This will download and install all the packages your Next.js project needs. It may take 1-2 minutes. You\'ll see a progress bar and lots of text scrolling by - this is normal!'
  },
  { 
    id: 'step11', 
    text: 'Start the development server: npm run dev', 
    color: 'green',
    details: 'In Cursor\'s integrated terminal, type "npm run dev" and press Enter. This starts your Next.js development server. You\'ll see a message like "Local: http://localhost:3000". Your website is now running! Keep this terminal open - the server needs to stay running.'
  },
  { 
    id: 'step12', 
    text: 'Open your browser and visit localhost:3000', 
    color: 'green',
    details: 'Open your web browser and type "localhost:3000" in the address bar. You should see your personal portfolio website! Try clicking on different sections and testing the navigation. Any changes you make in Cursor will automatically refresh the page. Keep the terminal running in the background!'
  },
  { 
    id: 'step13', 
    text: 'Prompt: "Update the Hero section with my information"', 
    color: 'orange',
    details: 'In the AI chat, type: "Update the Hero section with this info: My name is [Your Name], I\'m a [your title/role], and I\'m learning to build with AI and Next.js. Add a professional tagline."'
  },
  { 
    id: 'step14', 
    text: 'Prompt: "Add a gradient background to the Hero section"', 
    color: 'orange',
    details: 'Ask Cursor: "Add a beautiful gradient background to the Hero section using Tailwind CSS. Use modern colors like purple and blue. Make it eye-catching and professional."'
  },
  { 
    id: 'step15', 
    text: 'Prompt: "Create 3 project cards with images and descriptions"', 
    color: 'blue',
    details: 'Type: "In the Projects section, create 3 project cards. Each should have a placeholder image, title, description, tech stack tags, and a \'View Project\' button. Use Tailwind CSS for styling."'
  },
  { 
    id: 'step16', 
    text: 'Prompt: "Make the navbar sticky and add smooth scrolling"', 
    color: 'blue',
    details: 'Ask: "Make the navigation bar sticky at the top when scrolling. Add smooth scrolling to each section when clicking nav links. Add a subtle shadow when scrolled."'
  },
  { 
    id: 'step17', 
    text: 'Check your browser to see the updates', 
    color: 'green',
    details: 'Go back to your browser at localhost:3000 and scroll through your site. You should see smooth scrolling when clicking nav links and the navbar should stick to the top. Test it out - everything should feel smooth and professional!'
  },
  { 
    id: 'step18', 
    text: 'Prompt: "Add animations on scroll"', 
    color: 'green',
    details: 'Type: "Add fade-in and slide-up animations when sections come into view. Use intersection observer or a library like framer-motion. Make it smooth and professional."'
  },
  { 
    id: 'step19', 
    text: 'Prompt: "Add a contact form component"', 
    color: 'purple',
    details: 'Ask Cursor: "Create a Contact form component with fields for name, email, and message. Add form validation and styling. Make it responsive and user-friendly."'
  },
  { 
    id: 'step20', 
    text: 'Prompt: "Add social media icons to the footer"', 
    color: 'orange',
    details: 'Type: "Add GitHub, LinkedIn, and Twitter icons to the footer. Use Lucide React icons or similar. Make them clickable with hover effects and link to social media profiles."'
  },
  { 
    id: 'step21', 
    text: 'Prompt: "Make the entire site mobile responsive"', 
    color: 'orange',
    details: 'Ask: "Ensure the entire website is fully responsive for mobile, tablet, and desktop. Use Tailwind\'s responsive breakpoints. Add a mobile hamburger menu for navigation."'
  },
  { 
    id: 'step22', 
    text: 'Test your website on different screen sizes', 
    color: 'blue',
    details: 'In your browser, press F12 to open Developer Tools. Click the device icon (looks like a phone and tablet) to test your site on different screen sizes. Try iPhone, iPad, and desktop views. The hamburger menu should appear on mobile. Everything should look great on all sizes!'
  },
  { 
    id: 'step23', 
    text: 'Prompt: "Add a dark mode toggle"', 
    color: 'blue',
    details: 'Type: "Add a dark mode toggle button. Implement dark mode using Tailwind\'s dark mode class. Save the user\'s preference in localStorage. Make all colors work well in both modes."'
  },
  { 
    id: 'step24', 
    text: 'Test the dark mode toggle', 
    color: 'purple',
    details: 'Go back to your browser and find the dark mode toggle button. Click it to switch between light and dark modes. All your colors should look great in both modes. Try navigating around the site in dark mode!'
  },
  { 
    id: 'step25', 
    text: 'Your portfolio is complete! Now let\'s save it to GitHub', 
    color: 'green',
    details: 'Amazing work! You\'ve built a professional portfolio website. Before we deploy it to the internet, we need to save it to GitHub. This is called version control - it keeps your code safe and allows you to deploy it.'
  },
  { 
    id: 'step26', 
    text: 'Initialize Git in your project', 
    color: 'orange',
    details: 'In Cursor\'s integrated terminal, type "git init" and press Enter. This creates a new Git repository in your project folder. Git is now tracking your files and ready to save your work. You\'ll see a message like "Initialized empty Git repository".',
    command: 'git init'
  },
  { 
    id: 'step27', 
    text: 'Create a .gitignore file', 
    color: 'orange',
    details: 'In Cursor\'s AI chat, type: "Create a .gitignore file for Next.js that ignores node_modules, .next, and other build files." Click Apply. This file tells Git which files NOT to track (like dependencies and build files that can be regenerated).'
  },
  { 
    id: 'step28', 
    text: 'Stage all your files: git add .', 
    color: 'blue',
    details: 'In Cursor\'s integrated terminal, type "git add ." (don\'t forget the dot!) and press Enter. This stages all your files for the first commit. You\'re telling Git "I want to save all these files."',
    command: 'git add .'
  },
  { 
    id: 'step29', 
    text: 'Make your first commit: git commit -m "Initial commit"', 
    color: 'blue',
    details: 'In Cursor\'s integrated terminal, type: git commit -m "Initial commit" and press Enter. This creates your first saved snapshot of the project. Think of it like saving your game - you can always come back to this point!',
    command: 'git commit -m "Initial commit"'
  },
  { 
    id: 'step30', 
    text: 'Create a new repository on GitHub', 
    color: 'purple',
    details: 'Go to GitHub.com in your browser. Click the "+" icon in the top-right corner and select "New repository". This will create a place on GitHub to store your portfolio code.'
  },
  { 
    id: 'step31', 
    text: 'Name it "my-portfolio" and create it', 
    color: 'purple',
    details: 'In the "Repository name" field, type "my-portfolio". Make sure "Public" is selected. IMPORTANT: Do NOT check "Add a README file" - your project already has files! Click "Create repository" at the bottom.'
  },
  { 
    id: 'step32', 
    text: 'Copy the commands from GitHub', 
    color: 'green',
    details: 'After creating the repository, GitHub will show you a page with commands. Look for the section "...or push an existing repository from the command line". You\'ll see two commands starting with "git remote add origin" and "git push". Keep this page open!'
  },
  { 
    id: 'step33', 
    text: 'Add the remote: git remote add origin <your-URL>', 
    color: 'green',
    details: 'Copy the first command from GitHub (starts with "git remote add origin") and paste it into Cursor\'s integrated terminal. Press Enter. This connects your local project to GitHub. The URL will look like: https://github.com/yourusername/my-portfolio.git',
    command: 'git remote add origin https://github.com/YOUR-USERNAME/my-portfolio.git'
  },
  { 
    id: 'step34', 
    text: 'Push to GitHub: git push -u origin main', 
    color: 'green',
    details: 'Copy the second command from GitHub (git push -u origin main OR git push -u origin master) and paste it into Cursor\'s integrated terminal. Press Enter. This uploads your code to GitHub! You may be asked to sign in - follow the prompts. Wait for it to finish.',
    command: 'git push -u origin main'
  },
  { 
    id: 'step35', 
    text: 'Verify on GitHub - refresh and see your files!', 
    color: 'purple',
    details: 'Go back to your browser and refresh your GitHub repository page. You should now see all your portfolio files! Click around to explore your code on GitHub. This is your code, safely stored in the cloud. Now you\'re ready to deploy to Vercel!'
  },
]

