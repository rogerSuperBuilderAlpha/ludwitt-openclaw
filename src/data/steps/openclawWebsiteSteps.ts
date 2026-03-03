import { Step } from './cursorSetupSteps'

export const openclawWebsiteSteps: Step[] = [
  {
    id: 'ow-step1',
    text: 'Add website hosting to network allowlist',
    color: 'orange',
    details: 'Before the agent can create a website, update the network allowlist to allow npm registry and common CDN domains. Run: openclaw config set network.allowlist \'["registry.npmjs.org", "cdn.jsdelivr.net"]\'. This gives the agent just enough access.',
  },
  {
    id: 'ow-step2',
    text: 'Command OpenClaw: "Scaffold a personal website using 11ty"',
    color: 'orange',
    details: 'In the Control UI or terminal, give OpenClaw this prompt: "Create a personal portfolio website using 11ty (Eleventy). Include a homepage, about page, and projects page. Use clean HTML with minimal CSS. Make it fast and accessible." Let the agent work.',
  },
  {
    id: 'ow-step3',
    text: 'Review the scaffolded project structure',
    color: 'blue',
    details: 'After OpenClaw finishes, check the workspace folder. You should see an 11ty project with src/ directory, templates, CSS, and config files. Review the structure to understand what the agent created. Check the Control UI activity log for the full action history.',
  },
  {
    id: 'ow-step4',
    text: 'Command OpenClaw: "Start the dev server and show me the site"',
    color: 'blue',
    details: 'Ask the agent: "Install dependencies with npm install, then start the 11ty dev server so I can preview the site locally." The agent will run the commands and tell you the local URL (usually localhost:8080). Open it in your browser.',
  },
  {
    id: 'ow-step5',
    text: 'Iterate on design: "Make the homepage more modern and add a dark theme"',
    color: 'purple',
    details: 'Chat with OpenClaw to refine the design: "Update the homepage with a modern design. Add a dark/light theme toggle. Use CSS custom properties for theming. Make the hero section more visually striking." Review changes in your browser.',
  },
  {
    id: 'ow-step6',
    text: 'Command OpenClaw: "Add my personal information and projects"',
    color: 'purple',
    details: 'Tell the agent: "Update the site with my information: [Your Name], [Your Role/Title], learning AI agent development. Add 3 project cards for: 1) This OpenClaw setup, 2) A future AI project, 3) My learning journey." The agent will update the content.',
  },
  {
    id: 'ow-step7',
    text: 'Set up AgentMail/Gmail integration for the agent\'s email',
    color: 'green',
    details: 'OpenClaw can have its own email inbox. Follow the OpenClaw docs to configure AgentMail or connect a Gmail account. Run: openclaw config set email.provider "agentmail" (or "gmail"). This gives your agent the ability to send and receive email.',
  },
  {
    id: 'ow-step8',
    text: 'Configure email credentials securely via environment variables',
    color: 'green',
    details: 'Set email credentials as environment variables, never in config files. For AgentMail: "export AGENTMAIL_API_KEY=..." For Gmail: "export GMAIL_APP_PASSWORD=..." Add to your shell profile for persistence.',
  },
  {
    id: 'ow-step9',
    text: 'Command OpenClaw: "Add a contact form that sends email to your inbox"',
    color: 'orange',
    details: 'Ask the agent: "Add a contact form to the website that sends submissions to the agent\'s email address. Use a simple POST handler." The agent will add the form HTML and the email-sending backend logic.',
  },
  {
    id: 'ow-step10',
    text: 'Test email receiving: send a test email to the agent\'s address',
    color: 'orange',
    details: 'Send a test email from your personal email to the agent\'s configured email address. Then ask OpenClaw: "Check your email and tell me what you received." Verify it can read the incoming test email correctly.',
  },
  {
    id: 'ow-step11',
    text: 'Verify the contact form sends email correctly',
    color: 'blue',
    details: 'Fill out the contact form on your local website and submit it. Check the agent\'s email inbox (via the Control UI or by asking the agent) to verify the form submission was received. This confirms the full email pipeline works.',
  },
  {
    id: 'ow-step12',
    text: 'Command OpenClaw: "Deploy the website to a public URL"',
    color: 'blue',
    details: 'Ask the agent: "Deploy this website so it\'s publicly accessible. Use a free hosting platform like Netlify, Surge, or GitHub Pages." The agent will handle the deployment process and give you the live URL.',
  },
  {
    id: 'ow-step13',
    text: 'Verify the website is accessible at the public URL',
    color: 'green',
    details: 'Open the URL the agent provided in your browser. Navigate through all pages: homepage, about, projects, and contact form. Verify everything looks correct and the site loads quickly. Test on mobile too (use browser dev tools).',
  },
  {
    id: 'ow-step14',
    text: 'Run a final security audit: openclaw security audit',
    color: 'green',
    details: 'Run "openclaw security audit" one final time. Verify that: sandbox is still enabled, network allowlist hasn\'t been over-broadened, API keys aren\'t exposed in any generated files, and email credentials are secure.',
  },
  {
    id: 'ow-step15',
    text: 'Save the project: git init && git add . && git commit -m "OpenClaw website + email"',
    color: 'purple',
    details: 'Initialize Git in your workspace: "git init && git add . && git commit -m \'OpenClaw-built website with email integration\'". Create a GitHub repo and push. Your agent-built website code is now version-controlled!',
  },
]
