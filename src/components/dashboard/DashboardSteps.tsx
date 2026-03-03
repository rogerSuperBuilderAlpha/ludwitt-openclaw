'use client'

import { VisionInput } from '@/components/projects/VisionInput'
import { OptionalExtrasBanner } from '@/components/dashboard/OptionalExtrasBanner'
import { OptionalExtrasPrompt } from '@/components/dashboard/OptionalExtrasPrompt'
import { SURVEY_IDS } from '@/lib/types/survey'
import { DashboardStepsProps, MAX_PROJECTS } from '@/components/dashboard/types'
import { useStepKey } from '@/components/dashboard/useStepKey'

import { GithubSetupStep } from '@/components/dashboard/GithubSetupStep'
import { CursorSetupStep } from '@/components/dashboard/CursorSetupStep'
import { SurveyStep } from '@/components/dashboard/SurveyStep'
import { ClaudeCodeExtraSteps } from '@/components/dashboard/ClaudeCodeExtraSteps'
import { OpenClawExtraSteps } from '@/components/dashboard/OpenClawExtraSteps'
import { PersonalWebsiteStep } from '@/components/dashboard/PersonalWebsiteStep'
import { VercelDeploymentStep } from '@/components/dashboard/VercelDeploymentStep'
import { OpenSourcePrStep } from '@/components/dashboard/OpenSourcePrStep'
import {
  PortfolioPromptStep,
  CompletionStep,
  GenerateProjectStep,
  GeneratingProjectStep,
  WorkOnProjectStep,
  FallbackStep,
} from '@/components/dashboard/ProjectSteps'

export function DashboardSteps(props: DashboardStepsProps) {
  const {
    user,
    progress,
    isGeneratingProject,
    showPortfolioPrompt,
    justCompletedProject,
    isSurveyCompleted,
    onSurveySubmit,
    onSurveySkip,
    onSubStepProgressChange,
    onStartOptionalExtra,
    onDismissExtras,
    showOptionalExtrasPrompt,
    showExtrasBanner,
    activeExtra,
  } = props

  const stepKey = useStepKey(props)

  const showBanner =
    showExtrasBanner &&
    !showOptionalExtrasPrompt &&
    activeExtra === null &&
    progress.cursorSetupComplete &&
    progress.postCursorSurveyComplete

  const surveyProps = { onSurveySubmit, onSurveySkip }
  const userId = user?.uid ?? ''

  return (
    <div className="space-y-4">
      {showBanner && (
        <OptionalExtrasBanner
          claudeCodeDone={
            progress.claudeCodeSetupComplete && progress.firebaseDeployComplete
          }
          openclawDone={
            progress.openclawSetupComplete && progress.openclawDeployComplete
          }
          onStartClaudeCode={() => onStartOptionalExtra('claude-code')}
          onStartOpenClaw={() => onStartOptionalExtra('openclaw')}
          onDismiss={onDismissExtras}
        />
      )}
      <div key={stepKey} className="fade-in-scale">
        {renderCurrentStep()}
      </div>
    </div>
  )

  function renderCurrentStep() {
    // GitHub setup
    if (!progress.hasGithubLinked) {
      return (
        <GithubSetupStep
          user={user}
          onProgressChange={onSubStepProgressChange}
        />
      )
    }
    if (!isSurveyCompleted(SURVEY_IDS.POST_GITHUB)) {
      return <SurveyStep surveyId={SURVEY_IDS.POST_GITHUB} {...surveyProps} />
    }

    // Cursor setup
    if (!progress.cursorSetupComplete) {
      return (
        <CursorSetupStep
          userId={userId}
          verificationCode={props.verificationCode}
          onProgressChange={onSubStepProgressChange}
        />
      )
    }
    if (!isSurveyCompleted(SURVEY_IDS.POST_CURSOR)) {
      return <SurveyStep surveyId={SURVEY_IDS.POST_CURSOR} {...surveyProps} />
    }

    // Optional extras
    if (activeExtra === 'claude-code') {
      return (
        <ClaudeCodeExtraSteps
          userId={userId}
          progress={progress}
          isSurveyCompleted={isSurveyCompleted}
          onSubStepProgressChange={onSubStepProgressChange}
          {...surveyProps}
        />
      )
    }
    if (activeExtra === 'openclaw') {
      return (
        <OpenClawExtraSteps
          userId={userId}
          progress={progress}
          isSurveyCompleted={isSurveyCompleted}
          onSubStepProgressChange={onSubStepProgressChange}
          {...surveyProps}
        />
      )
    }
    if (showOptionalExtrasPrompt) {
      return (
        <OptionalExtrasPrompt
          onStartClaudeCode={() => onStartOptionalExtra('claude-code')}
          onStartOpenClaw={() => onStartOptionalExtra('openclaw')}
          onSkip={onDismissExtras}
        />
      )
    }

    // Personal website + deploy
    if (!progress.personalWebsiteComplete) {
      return (
        <PersonalWebsiteStep
          userId={userId}
          onProgressChange={onSubStepProgressChange}
        />
      )
    }
    if (!isSurveyCompleted(SURVEY_IDS.POST_WEBSITE)) {
      return <SurveyStep surveyId={SURVEY_IDS.POST_WEBSITE} {...surveyProps} />
    }
    if (!progress.vercelDeploymentComplete) {
      return (
        <VercelDeploymentStep
          onProgressChange={onSubStepProgressChange}
          postVercelSurveyComplete={isSurveyCompleted(SURVEY_IDS.POST_VERCEL)}
          onComplete={props.onVercelComplete}
        />
      )
    }

    // Post-deploy shared steps
    if (!isSurveyCompleted(SURVEY_IDS.POST_VERCEL)) {
      return <SurveyStep surveyId={SURVEY_IDS.POST_VERCEL} {...surveyProps} />
    }
    if (!progress.opensourcePrComplete) {
      return (
        <OpenSourcePrStep
          userId={userId}
          onProgressChange={onSubStepProgressChange}
        />
      )
    }
    if (!isSurveyCompleted(SURVEY_IDS.POST_OPENSOURCE_PR)) {
      return (
        <SurveyStep surveyId={SURVEY_IDS.POST_OPENSOURCE_PR} {...surveyProps} />
      )
    }
    if (!progress.hasVision) {
      return <VisionInput onSubmit={props.onVisionSubmit} />
    }
    if (!isSurveyCompleted(SURVEY_IDS.PRE_CUSTOM_PROJECT)) {
      return (
        <SurveyStep surveyId={SURVEY_IDS.PRE_CUSTOM_PROJECT} {...surveyProps} />
      )
    }

    // Portfolio / project lifecycle
    if (showPortfolioPrompt && justCompletedProject && user) {
      return (
        <PortfolioPromptStep
          user={user}
          project={justCompletedProject}
          onComplete={props.onPortfolioComplete}
        />
      )
    }
    if (
      progress.projectsCompletedCount >= MAX_PROJECTS &&
      !progress.currentProject
    ) {
      return <CompletionStep />
    }
    if (!progress.currentProject && !isGeneratingProject) {
      return (
        <GenerateProjectStep
          projectsCompletedCount={progress.projectsCompletedCount}
          projectError={props.projectError}
          onGenerateProject={props.onGenerateProject}
        />
      )
    }
    if (isGeneratingProject) {
      return <GeneratingProjectStep />
    }
    if (progress.currentProject) {
      return (
        <WorkOnProjectStep
          project={progress.currentProject}
          onComplete={props.onProjectComplete}
        />
      )
    }

    return <FallbackStep />
  }
}
