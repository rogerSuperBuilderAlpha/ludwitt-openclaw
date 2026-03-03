/**
 * ALC Path Configuration Registry
 *
 * Defines the three selectable learning paths and their associated
 * Firestore collections, display strings, and step data keys.
 */

export type ALCPath = 'cursor' | 'claude-code' | 'openclaw'

export interface PathConfig {
  id: ALCPath
  label: string
  tagline: string
  icon: string
  color: string
  /** Firestore collections for each phase */
  collections: {
    setup: string
    build: string
    deploy: string
  }
  /** Survey IDs for post-phase surveys */
  surveyIds: {
    postSetup: string
    postBuild: string
  }
  /** Keys used in ALCProgressState for completion flags */
  stateKeys: {
    setupComplete: string
    buildComplete: string
    deployComplete: string
  }
  /** Display strings for UI */
  display: {
    setupTitle: string
    setupDescription: string
    buildTitle: string
    buildDescription: string
    deployTitle: string
    deployDescription: string
  }
}

export const PATH_CONFIGS: Record<ALCPath, PathConfig> = {
  cursor: {
    id: 'cursor',
    label: 'Cursor',
    tagline: 'AI code editor — build a personal website — deploy to Vercel',
    icon: '🖱',
    color: 'blue',
    collections: {
      setup: 'cursorSetupProgress',
      build: 'personalWebsiteProgress',
      deploy: 'vercelDeploymentProgress',
    },
    surveyIds: {
      postSetup: 'post-cursor-setup',
      postBuild: 'post-personal-website',
    },
    stateKeys: {
      setupComplete: 'cursorSetupComplete',
      buildComplete: 'personalWebsiteComplete',
      deployComplete: 'vercelDeploymentComplete',
    },
    display: {
      setupTitle: 'Install & Set Up Cursor',
      setupDescription: 'Install the AI-powered code editor',
      buildTitle: 'Build Your Personal Website',
      buildDescription: 'Create a portfolio website with AI assistance',
      deployTitle: 'Deploy to Vercel',
      deployDescription: 'Make your website live on the internet',
    },
  },

  'claude-code': {
    id: 'claude-code',
    label: 'Claude Code',
    tagline: 'CLI AI agent — automated tweet function — deploy to Firebase',
    icon: '🤖',
    color: 'purple',
    collections: {
      setup: 'claudeCodeSetupProgress',
      build: 'tweetFunctionProgress',
      deploy: 'firebaseDeployProgress',
    },
    surveyIds: {
      postSetup: 'post-claude-code-setup',
      postBuild: 'post-tweet-function',
    },
    stateKeys: {
      setupComplete: 'claudeCodeSetupComplete',
      buildComplete: 'tweetFunctionComplete',
      deployComplete: 'firebaseDeployComplete',
    },
    display: {
      setupTitle: 'Set Up Claude Code',
      setupDescription: 'Install the CLI AI agent',
      buildTitle: 'Build a Tweet Function',
      buildDescription: 'Create an automated tweet agent with Claude Code',
      deployTitle: 'Deploy to Firebase',
      deployDescription: 'Deploy your function to Firebase Functions',
    },
  },

  openclaw: {
    id: 'openclaw',
    label: 'OpenClaw',
    tagline: 'Open-source AI agent — secure setup — builds its own website + email',
    icon: '🦀',
    color: 'orange',
    collections: {
      setup: 'openclawSetupProgress',
      build: 'openclawWebsiteProgress',
      deploy: 'openclawDeployProgress',
    },
    surveyIds: {
      postSetup: 'post-openclaw-setup',
      postBuild: 'post-openclaw-website',
    },
    stateKeys: {
      setupComplete: 'openclawSetupComplete',
      buildComplete: 'openclawWebsiteComplete',
      deployComplete: 'openclawDeployComplete',
    },
    display: {
      setupTitle: 'Set Up OpenClaw',
      setupDescription: 'Install and secure the open-source AI agent platform',
      buildTitle: 'OpenClaw Builds a Website + Email',
      buildDescription: 'Command OpenClaw to scaffold a site and set up email',
      deployTitle: 'Deploy via OpenClaw',
      deployDescription: 'Verify the website is live and email is working',
    },
  },
}

/**
 * Get config for a specific path
 */
export function getPathConfig(path: ALCPath): PathConfig {
  return PATH_CONFIGS[path]
}

/**
 * All available path IDs
 */
export const ALL_PATHS: ALCPath[] = ['cursor', 'claude-code', 'openclaw']
