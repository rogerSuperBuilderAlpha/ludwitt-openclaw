import { useMemo } from 'react'
import { SURVEY_IDS } from '@/lib/types/survey'
import { DashboardStepsProps, MAX_PROJECTS } from '@/components/dashboard/types'

/**
 * Derives a stable key string representing the current step.
 * React uses this key to remount with the fade-in-scale animation on transitions.
 */
export function useStepKey(props: DashboardStepsProps): string {
  const {
    progress,
    isSurveyCompleted,
    showPortfolioPrompt,
    justCompletedProject,
    isGeneratingProject,
    showOptionalExtrasPrompt,
    activeExtra,
  } = props

  return useMemo(() => {
    if (!progress.hasGithubLinked) return 'github-setup'
    if (!isSurveyCompleted(SURVEY_IDS.POST_GITHUB)) return 'post-github-survey'
    if (!progress.cursorSetupComplete) return 'cursor-setup'
    if (!isSurveyCompleted(SURVEY_IDS.POST_CURSOR)) return 'post-cursor-survey'

    if (activeExtra === 'claude-code') {
      if (!progress.claudeCodeSetupComplete) return 'claude-code-setup'
      if (!isSurveyCompleted(SURVEY_IDS.POST_CLAUDE_CODE)) return 'post-claude-code-survey'
      if (!progress.tweetFunctionComplete) return 'tweet-function'
      if (!isSurveyCompleted(SURVEY_IDS.POST_TWEET_FUNCTION)) return 'post-tweet-function-survey'
      if (!progress.firebaseDeployComplete) return 'firebase-deploy'
    }
    if (activeExtra === 'openclaw') {
      if (!progress.openclawSetupComplete) return 'openclaw-setup'
      if (!isSurveyCompleted(SURVEY_IDS.POST_OPENCLAW)) return 'post-openclaw-survey'
      if (!progress.openclawWebsiteComplete) return 'openclaw-website'
      if (!isSurveyCompleted(SURVEY_IDS.POST_OPENCLAW_WEBSITE)) return 'post-openclaw-website-survey'
      if (!progress.openclawDeployComplete) return 'openclaw-deploy'
    }

    if (showOptionalExtrasPrompt) return 'optional-extras'
    if (!progress.personalWebsiteComplete) return 'personal-website'
    if (!isSurveyCompleted(SURVEY_IDS.POST_WEBSITE)) return 'post-website-survey'
    if (!progress.vercelDeploymentComplete) return 'vercel-deployment'
    if (!isSurveyCompleted(SURVEY_IDS.POST_VERCEL)) return 'post-vercel-survey'
    if (!progress.opensourcePrComplete) return 'opensource-pr'
    if (!isSurveyCompleted(SURVEY_IDS.POST_OPENSOURCE_PR)) return 'post-pr-survey'
    if (!progress.hasVision) return 'vision-input'
    if (!isSurveyCompleted(SURVEY_IDS.PRE_CUSTOM_PROJECT)) return 'pre-project-survey'
    if (showPortfolioPrompt && justCompletedProject) return 'portfolio-prompt'
    if (progress.projectsCompletedCount >= MAX_PROJECTS && !progress.currentProject) return 'completion'
    if (!progress.currentProject && !isGeneratingProject) return 'generate-project'
    if (isGeneratingProject) return 'generating'
    if (progress.currentProject) return `work-on-project-${progress.currentProject.id}`
    return 'fallback'
  }, [
    progress, isSurveyCompleted, showPortfolioPrompt, justCompletedProject,
    isGeneratingProject, showOptionalExtrasPrompt, activeExtra,
  ])
}
