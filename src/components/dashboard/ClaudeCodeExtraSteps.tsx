'use client'

import { SurveyStep } from '@/components/dashboard/SurveyStep'
import { ChecklistStep } from '@/components/dashboard/ChecklistStep'
import { SURVEY_IDS } from '@/lib/types/survey'
import { ALCProgressState } from '@/lib/alc/types'
import { claudeCodeSetupSteps } from '@/data/steps/claudeCodeSetupSteps'
import { tweetFunctionSteps } from '@/data/steps/tweetFunctionSteps'
import { firebaseDeploySteps } from '@/data/steps/firebaseDeploySteps'
import type { StepBaseProps } from '@/components/dashboard/types'

interface ClaudeCodeExtraStepsProps extends StepBaseProps {
  progress: ALCProgressState
  isSurveyCompleted: (surveyId: string) => boolean
  onSurveySubmit: (surveyId: string, responses: { [key: string]: string | number }) => Promise<void>
  onSurveySkip: (surveyId: string) => Promise<void>
}

/**
 * Renders the Claude Code optional-extra flow:
 *   1. Claude Code setup checklist
 *   2. Post-Claude Code survey
 *   3. Tweet function checklist
 *   4. Post-tweet-function survey
 *   5. Firebase deploy checklist
 *
 * Returns null when the entire extra is complete.
 */
export function ClaudeCodeExtraSteps({
  userId,
  progress,
  isSurveyCompleted,
  onSurveySubmit,
  onSurveySkip,
  onSubStepProgressChange,
}: ClaudeCodeExtraStepsProps) {
  if (!progress.claudeCodeSetupComplete) {
    return (
      <ChecklistStep
        userId={userId}
        title="Set Up Claude Code"
        description="Install the Claude Code CLI &mdash; your AI pair programmer that lives in the terminal."
        steps={claudeCodeSetupSteps}
        firestoreCollection="claudeCodeSetupProgress"
        expandLabel="View Claude Code Setup Steps"
        completionTitle="Claude Code is ready!"
        analyticsLessonId="claude-code-setup"
        boundaryName="Claude Code Setup Checklist"
        onSubStepProgressChange={onSubStepProgressChange}
      />
    )
  }

  if (!isSurveyCompleted(SURVEY_IDS.POST_CLAUDE_CODE)) {
    return (
      <SurveyStep
        surveyId={SURVEY_IDS.POST_CLAUDE_CODE}
        onSurveySubmit={onSurveySubmit}
        onSurveySkip={onSurveySkip}
      />
    )
  }

  if (!progress.tweetFunctionComplete) {
    return (
      <ChecklistStep
        userId={userId}
        title="Build a Tweet Function"
        description="Use Claude Code to build an automated tweet agent that posts 2 tweets per day."
        steps={tweetFunctionSteps}
        firestoreCollection="tweetFunctionProgress"
        expandLabel="View Tweet Function Steps"
        completionTitle="Tweet function built!"
        analyticsLessonId="tweet-function"
        boundaryName="Tweet Function Checklist"
        onSubStepProgressChange={onSubStepProgressChange}
      />
    )
  }

  if (!isSurveyCompleted(SURVEY_IDS.POST_TWEET_FUNCTION)) {
    return (
      <SurveyStep
        surveyId={SURVEY_IDS.POST_TWEET_FUNCTION}
        onSurveySubmit={onSurveySubmit}
        onSurveySkip={onSurveySkip}
      />
    )
  }

  if (!progress.firebaseDeployComplete) {
    return (
      <ChecklistStep
        userId={userId}
        title="Deploy to Firebase"
        description="Deploy your tweet function to Firebase Functions so it runs automatically."
        steps={firebaseDeploySteps}
        firestoreCollection="firebaseDeployProgress"
        expandLabel="View Firebase Deploy Steps"
        completionTitle="Deployed to Firebase!"
        analyticsLessonId="firebase-deploy"
        boundaryName="Firebase Deploy Checklist"
        onSubStepProgressChange={onSubStepProgressChange}
      />
    )
  }

  // Claude Code extra is complete
  return null
}
