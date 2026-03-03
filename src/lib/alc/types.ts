/**
 * ALC (Developer Training Track) - Type Definitions
 * 
 * Centralized types for the step-by-step learning journey
 */

import { ALCPath } from './paths'

export type ALCStepId =
  | 'github-setup'
  | 'post-github-survey'
  // Cursor path (primary)
  | 'cursor-setup'
  | 'post-cursor-survey'
  | 'optional-extras'
  | 'personal-website'
  | 'post-website-survey'
  | 'vercel-deployment'
  // Claude Code path (optional extra)
  | 'claude-code-setup'
  | 'post-claude-code-survey'
  | 'tweet-function'
  | 'post-tweet-function-survey'
  | 'firebase-deploy'
  // OpenClaw path (optional extra)
  | 'openclaw-setup'
  | 'post-openclaw-survey'
  | 'openclaw-website'
  | 'post-openclaw-website-survey'
  | 'openclaw-deploy'
  // Post-deploy (shared)
  | 'post-vercel-survey'
  | 'opensource-pr'
  | 'post-pr-survey'
  | 'vision-input'
  | 'pre-project-survey'
  | 'generate-project'
  | 'work-on-project'
  | 'completion'

// NOTE: 'pre-vercel' / 'post-vercel' are kept for backward compatibility.
// They represent pre-deployment / post-deployment for ALL paths.
export type ALCPhase = 'pre-vercel' | 'post-vercel'

export type { ALCPath } from './paths'

export interface ALCStepConfig {
  id: ALCStepId
  stepNumber: number
  title: string
  description: string
  phase: ALCPhase
  
  // Firestore collection where progress is stored
  progressCollection?: string
  
  // For survey steps, the survey ID
  surveyId?: string
  
  // Whether this step shows the sidebar (post-vercel only)
  showSidebar: boolean
  
  // Next milestone description
  nextMilestone: string
}

export interface ALCProgressState {
  // Path selection
  selectedPath: ALCPath | null

  // GitHub
  hasGithubLinked: boolean

  // Surveys
  postGithubSurveyComplete: boolean
  postCursorSurveyComplete: boolean
  postWebsiteSurveyComplete: boolean
  postVercelSurveyComplete: boolean
  preProjectSurveyComplete: boolean
  // Claude Code surveys
  postClaudeCodeSurveyComplete: boolean
  postTweetFunctionSurveyComplete: boolean
  // OpenClaw surveys
  postOpenclawSurveyComplete: boolean
  postOpenclawWebsiteSurveyComplete: boolean

  // Cursor path setup steps
  cursorSetupComplete: boolean
  personalWebsiteComplete: boolean
  vercelDeploymentComplete: boolean

  // Claude Code path setup steps
  claudeCodeSetupComplete: boolean
  tweetFunctionComplete: boolean
  firebaseDeployComplete: boolean

  // OpenClaw path setup steps
  openclawSetupComplete: boolean
  openclawWebsiteComplete: boolean
  openclawDeployComplete: boolean

  // Computed: any deploy done (vercel OR firebase OR openclaw)
  deploymentComplete: boolean

  // Post-deploy shared
  opensourcePrComplete: boolean
  postPrSurveyComplete: boolean
  loomVideoComplete: boolean

  // Vision & Projects
  hasVision: boolean
  currentProject: ALCProject | null
  lastCompletedProject: ALCProject | null
  projectLoomComplete: boolean

  // Stats
  projectsCompletedCount: number
  portfolioItemsCount: number
  mentorStatus: 'not_applied' | 'pending' | 'approved' | 'rejected'
}

export interface ALCProject {
  id: string
  userId: string
  title: string
  description: string
  projectNumber: number
  difficulty: number
  estimatedHours: number
  skills: string[]
  steps: ALCProjectStep[]
  completed: boolean
  completedAt?: string
  createdAt: string
}

export interface ALCProjectStep {
  id: string
  text: string
  link?: { url: string; text: string }
  color: 'blue' | 'green' | 'purple' | 'orange'
  details: string
}

export interface ALCCurrentStepInfo {
  step: ALCStepConfig
  subStepCurrent?: number
  subStepTotal?: number
}

// Completion callback types
export type StepCompletionCallback = () => void | Promise<void>

export interface StepCompletionResult {
  success: boolean
  error?: string
  nextStep?: ALCStepId
}

// Listener unsubscribe function
export type UnsubscribeFunction = () => void
