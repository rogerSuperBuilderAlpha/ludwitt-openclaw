import { Step } from './cursorSetupSteps'

export const openclawSetupSteps: Step[] = [
  {
    id: 'oc-step1',
    text: 'Verify Node.js 22+ is installed: node --version',
    color: 'orange',
    details: 'OpenClaw requires Node.js 22 or higher. Type "node --version" in your terminal. If you see a version below 22, visit nodejs.org and download the latest LTS version. After installation, close and reopen your terminal.',
  },
  {
    id: 'oc-step2',
    text: 'Install OpenClaw globally: npm install -g openclaw@latest',
    color: 'orange',
    details: 'Type "npm install -g openclaw@latest" in your terminal. This installs the OpenClaw CLI and agent runtime globally. Installation may take a few minutes as it downloads the agent framework and dependencies.',
  },
  {
    id: 'oc-step3',
    text: 'Run the onboarding wizard: openclaw onboard --install-daemon',
    color: 'blue',
    details: 'Type "openclaw onboard --install-daemon" to start the guided setup. The wizard will walk you through initial configuration, install the background daemon process, and set up the agent runtime. Follow each prompt carefully.',
  },
  {
    id: 'oc-step4',
    text: 'Choose your LLM provider (Anthropic, OpenAI, or local)',
    color: 'blue',
    details: 'During onboarding, you\'ll be asked which LLM provider to use. Select "Anthropic" for the best experience with Claude. You can also choose OpenAI or a local model. OpenClaw supports multiple providers and you can change this later.',
  },
  {
    id: 'oc-step5',
    text: 'Set your API key via environment variable (not plaintext)',
    color: 'green',
    details: 'IMPORTANT: Never store API keys in plaintext config files. Set your key as an environment variable: "export ANTHROPIC_API_KEY=sk-..." (Mac/Linux) or "setx ANTHROPIC_API_KEY sk-..." (Windows). Add this to your shell profile (~/.zshrc or ~/.bashrc) so it persists.',
  },
  {
    id: 'oc-step6',
    text: 'Enable gateway authentication: openclaw config set auth.enabled true',
    color: 'green',
    details: 'Run "openclaw config set auth.enabled true" to enable authentication on the agent gateway. This prevents unauthorized access to your agent. The gateway will require a token for all requests, which OpenClaw manages automatically.',
  },
  {
    id: 'oc-step7',
    text: 'Enable sandbox mode: openclaw config set sandbox.enabled true',
    color: 'purple',
    details: 'Run "openclaw config set sandbox.enabled true" to enable the sandbox. Sandbox mode restricts what the agent can do on your system - it can\'t access files outside its workspace, can\'t make network requests to arbitrary hosts, and runs with limited permissions. This is critical for security.',
  },
  {
    id: 'oc-step8',
    text: 'Configure network isolation: openclaw config set network.allowlist "[]"',
    color: 'purple',
    details: 'By default, set the network allowlist to empty (no external access). You\'ll add specific domains as needed later. Run "openclaw config set network.allowlist \'[]\'". This ensures the agent can\'t phone home to unexpected servers.',
  },
  {
    id: 'oc-step9',
    text: 'Run a security audit: openclaw security audit',
    color: 'orange',
    details: 'Run "openclaw security audit" to check your configuration for potential security issues. The audit will flag any insecure settings, missing permissions restrictions, or exposed API keys. Address any warnings before proceeding.',
  },
  {
    id: 'oc-step10',
    text: 'Verify the daemon is running: openclaw status',
    color: 'orange',
    details: 'Type "openclaw status" to check that the background daemon is running. You should see "Daemon: running" and version information. If it\'s not running, start it with "openclaw daemon start".',
  },
  {
    id: 'oc-step11',
    text: 'Open the Control UI: openclaw ui',
    color: 'blue',
    details: 'Type "openclaw ui" to open the web-based Control UI in your browser. This provides a visual interface for interacting with your agent, monitoring its activities, viewing logs, and managing configurations. Explore the dashboard.',
  },
  {
    id: 'oc-step12',
    text: 'Test with a simple prompt in the Control UI',
    color: 'blue',
    details: 'In the Control UI chat panel, type a simple prompt like "What can you do?" or "List the files in your workspace". Verify the agent responds correctly and that responses appear in the activity log. This confirms the full pipeline works.',
  },
  {
    id: 'oc-step13',
    text: 'Review the activity log for your test prompt',
    color: 'green',
    details: 'In the Control UI, navigate to the Activity tab. You should see a log entry for your test prompt including the input, output, model used, tokens consumed, and execution time. This is your audit trail for all agent activity.',
  },
  {
    id: 'oc-step14',
    text: 'Create a workspace folder: mkdir openclaw-workspace && cd openclaw-workspace',
    color: 'green',
    details: 'Create a dedicated workspace for your OpenClaw projects. Type "mkdir openclaw-workspace && cd openclaw-workspace" in your terminal. This is where the agent will create files and projects in the next phase.',
  },
  {
    id: 'oc-step15',
    text: 'Verify secure configuration persists: openclaw security audit (again)',
    color: 'purple',
    details: 'Run "openclaw security audit" one more time to confirm all security settings are properly saved and persisting. You should see all green checks. If any warnings appear, fix them now before moving to the build phase.',
  },
]
