/**
 * ALC Step Definitions
 *
 * Central configuration for all steps in the learning journey.
 * Supports three paths: cursor (default), claude-code, and openclaw.
 * Edit this file to adjust step order, descriptions, or requirements.
 */

import { ALCStepConfig, ALCStepId } from './types'
import { ALCPath } from './paths'
import { SURVEY_IDS } from '@/lib/types/survey'

// ============================================
// Shared steps (all paths)
// ============================================

const SHARED_PRE_STEPS: ALCStepConfig[] = [
  {
    id: 'github-setup',
    stepNumber: 0,
    title: 'Set Up GitHub',
    description: 'Create your GitHub account and learn Git basics',
    phase: 'pre-vercel',
    progressCollection: 'githubSetupProgress',
    showSidebar: false,
    nextMilestone: 'Complete welcome survey',
  },
  {
    id: 'post-github-survey',
    stepNumber: 1,
    title: 'Welcome Survey',
    description: 'Tell us about yourself and your goals',
    phase: 'pre-vercel',
    surveyId: SURVEY_IDS.POST_GITHUB,
    showSidebar: false,
    nextMilestone: 'Set up Cursor',
  },
]

const SHARED_POST_STEPS: ALCStepConfig[] = [
  {
    id: 'post-vercel-survey',
    stepNumber: 9,
    title: 'Congratulations Survey',
    description: 'Share your deployment experience',
    phase: 'post-vercel',
    surveyId: SURVEY_IDS.POST_VERCEL,
    showSidebar: false,
    nextMilestone: 'Make your first open-source pull request',
  },
  {
    id: 'opensource-pr',
    stepNumber: 10,
    title: 'Open Source Pull Request',
    description: 'Make your first contribution to an open-source project',
    phase: 'post-vercel',
    progressCollection: 'opensourcePrProgress',
    showSidebar: false,
    nextMilestone: 'Complete the PR experience survey',
  },
  {
    id: 'post-pr-survey',
    stepNumber: 11,
    title: 'PR Experience Survey',
    description: 'Share your open-source contribution experience',
    phase: 'post-vercel',
    surveyId: SURVEY_IDS.POST_OPENSOURCE_PR,
    showSidebar: false,
    nextMilestone: 'Define your 5-year vision',
  },
  {
    id: 'vision-input',
    stepNumber: 12,
    title: 'Define Your 5-Year Vision',
    description: 'Tell us about your dreams and goals',
    phase: 'post-vercel',
    progressCollection: 'userVisions',
    showSidebar: false,
    nextMilestone: 'Complete project preferences survey',
  },
  {
    id: 'pre-project-survey',
    stepNumber: 13,
    title: 'Project Preferences Survey',
    description: 'Help us tailor your custom project',
    phase: 'post-vercel',
    surveyId: SURVEY_IDS.PRE_CUSTOM_PROJECT,
    showSidebar: false,
    nextMilestone: 'Generate your personalized project',
  },
  {
    id: 'generate-project',
    stepNumber: 14,
    title: 'Generate Your Custom Project',
    description: 'AI creates a personalized project based on your vision',
    phase: 'post-vercel',
    showSidebar: false,
    nextMilestone: 'Start building your custom project',
  },
  {
    id: 'work-on-project',
    stepNumber: 15,
    title: 'Work on Project',
    description: 'Build your AI-generated custom project',
    phase: 'post-vercel',
    progressCollection: 'userProjectProgress',
    showSidebar: false,
    nextMilestone: 'Complete project and generate next one',
  },
  {
    id: 'completion',
    stepNumber: 16,
    title: 'Journey Complete',
    description: 'You have completed all 5 projects!',
    phase: 'post-vercel',
    showSidebar: false,
    nextMilestone: 'Explore new opportunities',
  },
]

// ============================================
// Path-specific steps (mid-section between shared pre & post)
// ============================================

const CURSOR_PATH_STEPS: ALCStepConfig[] = [
  {
    id: 'cursor-setup',
    stepNumber: 2,
    title: 'Install & Set Up Cursor',
    description: 'Install the AI-powered code editor',
    phase: 'pre-vercel',
    progressCollection: 'cursorSetupProgress',
    showSidebar: false,
    nextMilestone: 'Complete Cursor setup survey',
  },
  {
    id: 'post-cursor-survey',
    stepNumber: 3,
    title: 'Cursor Setup Survey',
    description: 'Share your setup experience',
    phase: 'pre-vercel',
    surveyId: SURVEY_IDS.POST_CURSOR,
    showSidebar: false,
    nextMilestone: 'Explore optional extras',
  },
  {
    id: 'optional-extras',
    stepNumber: 4,
    title: 'Optional Extras',
    description: 'Try Claude Code or OpenClaw',
    phase: 'pre-vercel',
    showSidebar: false,
    nextMilestone: 'Build your personal website',
  },
  {
    id: 'personal-website',
    stepNumber: 5,
    title: 'Build Your Personal Website',
    description: 'Create a portfolio website with AI assistance',
    phase: 'pre-vercel',
    progressCollection: 'personalWebsiteProgress',
    showSidebar: false,
    nextMilestone: 'Deploy to Vercel and unlock the platform',
  },
  {
    id: 'post-website-survey',
    stepNumber: 6,
    title: 'Website Building Survey',
    description: 'Share your project building experience',
    phase: 'pre-vercel',
    surveyId: SURVEY_IDS.POST_WEBSITE,
    showSidebar: false,
    nextMilestone: 'Deploy to Vercel and RISE!',
  },
  {
    id: 'vercel-deployment',
    stepNumber: 7,
    title: 'Deploy to Vercel',
    description: 'Make your website live on the internet',
    phase: 'pre-vercel',
    progressCollection: 'vercelDeploymentProgress',
    showSidebar: false,
    nextMilestone: 'RISE above the PITCH and unlock full platform',
  },
]

// Claude Code and OpenClaw are now optional extras accessed from the Cursor path.
// Step numbers here are relative within the optional extra flow.
const CLAUDE_CODE_PATH_STEPS: ALCStepConfig[] = [
  {
    id: 'claude-code-setup',
    stepNumber: 3,
    title: 'Set Up Claude Code',
    description: 'Install the CLI AI agent',
    phase: 'pre-vercel',
    progressCollection: 'claudeCodeSetupProgress',
    showSidebar: false,
    nextMilestone: 'Build a tweet function',
  },
  {
    id: 'post-claude-code-survey',
    stepNumber: 4,
    title: 'Claude Code Setup Survey',
    description: 'Share your setup experience',
    phase: 'pre-vercel',
    surveyId: SURVEY_IDS.POST_CLAUDE_CODE,
    showSidebar: false,
    nextMilestone: 'Build your automated tweet function',
  },
  {
    id: 'tweet-function',
    stepNumber: 5,
    title: 'Build a Tweet Function',
    description: 'Create an automated tweet agent with Claude Code',
    phase: 'pre-vercel',
    progressCollection: 'tweetFunctionProgress',
    showSidebar: false,
    nextMilestone: 'Deploy to Firebase',
  },
  {
    id: 'post-tweet-function-survey',
    stepNumber: 6,
    title: 'Tweet Function Survey',
    description: 'Share your build experience',
    phase: 'pre-vercel',
    surveyId: SURVEY_IDS.POST_TWEET_FUNCTION,
    showSidebar: false,
    nextMilestone: 'Deploy to Firebase and RISE!',
  },
  {
    id: 'firebase-deploy',
    stepNumber: 7,
    title: 'Deploy to Firebase',
    description: 'Deploy your function to Firebase Functions',
    phase: 'pre-vercel',
    progressCollection: 'firebaseDeployProgress',
    showSidebar: false,
    nextMilestone: 'RISE above the PITCH and unlock full platform',
  },
]

const OPENCLAW_PATH_STEPS: ALCStepConfig[] = [
  {
    id: 'openclaw-setup',
    stepNumber: 3,
    title: 'Set Up OpenClaw',
    description: 'Install and secure the open-source AI agent platform',
    phase: 'pre-vercel',
    progressCollection: 'openclawSetupProgress',
    showSidebar: false,
    nextMilestone: 'Command OpenClaw to build a website',
  },
  {
    id: 'post-openclaw-survey',
    stepNumber: 4,
    title: 'OpenClaw Setup Survey',
    description: 'Share your setup experience',
    phase: 'pre-vercel',
    surveyId: SURVEY_IDS.POST_OPENCLAW,
    showSidebar: false,
    nextMilestone: 'OpenClaw builds a website + email',
  },
  {
    id: 'openclaw-website',
    stepNumber: 5,
    title: 'OpenClaw Builds a Website + Email',
    description: 'Command OpenClaw to scaffold a site and set up email',
    phase: 'pre-vercel',
    progressCollection: 'openclawWebsiteProgress',
    showSidebar: false,
    nextMilestone: 'Verify deployment',
  },
  {
    id: 'post-openclaw-website-survey',
    stepNumber: 6,
    title: 'OpenClaw Website Survey',
    description: 'Share your experience with agent-built projects',
    phase: 'pre-vercel',
    surveyId: SURVEY_IDS.POST_OPENCLAW_WEBSITE,
    showSidebar: false,
    nextMilestone: 'Deploy and RISE!',
  },
  {
    id: 'openclaw-deploy',
    stepNumber: 7,
    title: 'Deploy via OpenClaw',
    description: 'Verify the website is live and email is working',
    phase: 'pre-vercel',
    progressCollection: 'openclawDeployProgress',
    showSidebar: false,
    nextMilestone: 'RISE above the PITCH and unlock full platform',
  },
]

const PATH_SPECIFIC_STEPS: Record<ALCPath, ALCStepConfig[]> = {
  cursor: CURSOR_PATH_STEPS,
  'claude-code': CLAUDE_CODE_PATH_STEPS,
  openclaw: OPENCLAW_PATH_STEPS,
}

// ============================================
// Path-aware step retrieval
// ============================================

/**
 * Get the full step sequence for a specific path
 */
export function getALCSteps(path: ALCPath): ALCStepConfig[] {
  const pathSteps = PATH_SPECIFIC_STEPS[path] || CURSOR_PATH_STEPS
  return [...SHARED_PRE_STEPS, ...pathSteps, ...SHARED_POST_STEPS]
}

/**
 * Get total step count for a path
 */
export function getTotalSteps(path: ALCPath): number {
  return getALCSteps(path).length
}

/**
 * All ALC steps in order (defaults to cursor path for backward compat)
 */
export const ALC_STEPS: ALCStepConfig[] = getALCSteps('cursor')

/**
 * All step configs across all paths (for lookup by ID)
 */
const ALL_STEP_CONFIGS: ALCStepConfig[] = [
  ...SHARED_PRE_STEPS,
  ...CURSOR_PATH_STEPS,
  ...CLAUDE_CODE_PATH_STEPS,
  ...OPENCLAW_PATH_STEPS,
  ...SHARED_POST_STEPS,
]

/**
 * Get step config by ID (searches all paths)
 */
export function getStepConfig(stepId: ALCStepId): ALCStepConfig | undefined {
  return ALL_STEP_CONFIGS.find(s => s.id === stepId)
}

/**
 * Get step by number (defaults to cursor path)
 */
export function getStepByNumber(stepNumber: number): ALCStepConfig | undefined {
  return ALC_STEPS.find(s => s.stepNumber === stepNumber)
}

/**
 * Get next step after the given step
 */
export function getNextStep(currentStepId: ALCStepId): ALCStepConfig | undefined {
  const currentIndex = ALC_STEPS.findIndex(s => s.id === currentStepId)
  if (currentIndex === -1 || currentIndex === ALC_STEPS.length - 1) {
    return undefined
  }
  return ALC_STEPS[currentIndex + 1]
}

/**
 * Get previous step before the given step
 */
export function getPreviousStep(currentStepId: ALCStepId): ALCStepConfig | undefined {
  const currentIndex = ALC_STEPS.findIndex(s => s.id === currentStepId)
  if (currentIndex <= 0) {
    return undefined
  }
  return ALC_STEPS[currentIndex - 1]
}

/**
 * Check if a step is in the pre-deployment phase
 */
export function isPreVercelStep(stepId: ALCStepId): boolean {
  const step = getStepConfig(stepId)
  return step?.phase === 'pre-vercel'
}

/**
 * Get all steps in a phase
 */
export function getStepsByPhase(phase: 'pre-vercel' | 'post-vercel'): ALCStepConfig[] {
  return ALC_STEPS.filter(s => s.phase === phase)
}

/**
 * Total number of steps (backward compat, defaults to cursor path)
 */
export const TOTAL_STEPS = ALC_STEPS.length
