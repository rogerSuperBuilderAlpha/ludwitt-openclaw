'use client'

import { SurveyStep } from '@/components/dashboard/SurveyStep'
import { ChecklistStep } from '@/components/dashboard/ChecklistStep'
import { SURVEY_IDS } from '@/lib/types/survey'
import { ALCProgressState } from '@/lib/alc/types'
import { openclawSetupSteps } from '@/data/steps/openclawSetupSteps'
import { openclawWebsiteSteps } from '@/data/steps/openclawWebsiteSteps'
import type { StepBaseProps } from '@/components/dashboard/types'

interface OpenClawExtraStepsProps extends StepBaseProps {
  progress: ALCProgressState
  isSurveyCompleted: (surveyId: string) => boolean
  onSurveySubmit: (surveyId: string, responses: { [key: string]: string | number }) => Promise<void>
  onSurveySkip: (surveyId: string) => Promise<void>
}

/**
 * Renders the OpenClaw optional-extra flow:
 *   1. OpenClaw setup checklist
 *   2. Post-OpenClaw survey
 *   3. OpenClaw website checklist
 *   4. Post-OpenClaw-website survey
 *   5. OpenClaw deploy verification checklist
 *
 * Returns null when the entire extra is complete.
 */
export function OpenClawExtraSteps({
  userId,
  progress,
  isSurveyCompleted,
  onSurveySubmit,
  onSurveySkip,
  onSubStepProgressChange,
}: OpenClawExtraStepsProps) {
  if (!progress.openclawSetupComplete) {
    return (
      <ChecklistStep
        userId={userId}
        title="Set Up OpenClaw"
        description="Install and securely configure the open-source AI agent platform."
        steps={openclawSetupSteps}
        firestoreCollection="openclawSetupProgress"
        expandLabel="View OpenClaw Setup Steps"
        completionTitle="OpenClaw is ready!"
        analyticsLessonId="openclaw-setup"
        boundaryName="OpenClaw Setup Checklist"
        onSubStepProgressChange={onSubStepProgressChange}
      />
    )
  }

  if (!isSurveyCompleted(SURVEY_IDS.POST_OPENCLAW)) {
    return (
      <SurveyStep
        surveyId={SURVEY_IDS.POST_OPENCLAW}
        onSurveySubmit={onSurveySubmit}
        onSurveySkip={onSurveySkip}
      />
    )
  }

  if (!progress.openclawWebsiteComplete) {
    return (
      <ChecklistStep
        userId={userId}
        title="OpenClaw Builds a Website + Email"
        description="Command your AI agent to scaffold a website and set up its own email inbox."
        steps={openclawWebsiteSteps}
        firestoreCollection="openclawWebsiteProgress"
        expandLabel="View OpenClaw Website Steps"
        completionTitle="Website + email configured!"
        analyticsLessonId="openclaw-website"
        boundaryName="OpenClaw Website Checklist"
        onSubStepProgressChange={onSubStepProgressChange}
      />
    )
  }

  if (!isSurveyCompleted(SURVEY_IDS.POST_OPENCLAW_WEBSITE)) {
    return (
      <SurveyStep
        surveyId={SURVEY_IDS.POST_OPENCLAW_WEBSITE}
        onSurveySubmit={onSurveySubmit}
        onSurveySkip={onSurveySkip}
      />
    )
  }

  if (!progress.openclawDeployComplete) {
    return (
      <ChecklistStep
        userId={userId}
        title="Verify Deployment"
        description="Confirm your OpenClaw-built website is live and email is working."
        steps={openclawWebsiteSteps}
        firestoreCollection="openclawDeployProgress"
        expandLabel="View Deploy Verification Steps"
        completionTitle="Everything is live!"
        analyticsLessonId="openclaw-deploy"
        boundaryName="OpenClaw Deploy Checklist"
        onSubStepProgressChange={onSubStepProgressChange}
      />
    )
  }

  // OpenClaw extra is complete
  return null
}
