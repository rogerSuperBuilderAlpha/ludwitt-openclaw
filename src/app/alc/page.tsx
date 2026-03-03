'use client'

import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { SURVEY_IDS } from '@/lib/types/survey'
import { generateVerificationCode } from '@/lib/utils/dashboardUtils'

// Centralized ALC system
import {
  useALCProgress,
  completeSurvey,
  skipSurvey,
  saveVision,
  generateProject,
  selectPath,
  ALCProject,
} from '@/lib/alc'

import { DashboardSteps } from '@/components/dashboard/DashboardSteps'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ToastProvider } from '@/components/ui/Toast'
import { logger } from '@/lib/logger'

export default function CursorTrackPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Use centralized ALC progress system
  const {
    progress,
    currentStep,
    isLoading: progressLoading,
    refreshProjectProgress,
  } = useALCProgress(user)

  const [showPortfolioPrompt, setShowPortfolioPrompt] = useState(false)
  const [justCompletedProject, setJustCompletedProject] =
    useState<ALCProject | null>(null)
  const [isSubmittingSurvey, setIsSubmittingSurvey] = useState(false)
  const [isSubmittingVision, setIsSubmittingVision] = useState(false)
  const [isGeneratingProject, setIsGeneratingProject] = useState(false)
  const generatingRef = useRef(false)
  const [projectError, setProjectError] = useState('')

  // Optional extras state
  const [activeExtra, setActiveExtra] = useState<
    'claude-code' | 'openclaw' | null
  >(null)
  const [extrasDismissed, setExtrasDismissed] = useState(false)

  // Show the optional extras prompt after post-cursor survey, before personal website
  // Only if user hasn't dismissed it and isn't already in an extra
  const showOptionalExtrasPrompt =
    !extrasDismissed &&
    activeExtra === null &&
    progress.postCursorSurveyComplete &&
    !progress.personalWebsiteComplete

  // Show the subtle banner from personal website onward if extras not all done
  const showExtrasBanner =
    !extrasDismissed &&
    progress.postCursorSurveyComplete &&
    (!(progress.claudeCodeSetupComplete && progress.firebaseDeployComplete) ||
      !(progress.openclawSetupComplete && progress.openclawDeployComplete))

  // Auto-select cursor path if no path selected
  useEffect(() => {
    if (!user || progress.selectedPath) return
    if (!progress.postGithubSurveyComplete) return
    // Auto-select cursor once the post-GitHub survey is done
    selectPath(user.uid, 'cursor').catch((err) =>
      logger.error('ALCPage', 'Failed to auto-select cursor path', {
        error: err,
      })
    )
  }, [user, progress.selectedPath, progress.postGithubSurveyComplete])

  // Clear active extra when extra flow is complete
  useEffect(() => {
    if (activeExtra === 'claude-code' && progress.firebaseDeployComplete) {
      setActiveExtra(null)
    }
    if (activeExtra === 'openclaw' && progress.openclawDeployComplete) {
      setActiveExtra(null)
    }
  }, [
    activeExtra,
    progress.firebaseDeployComplete,
    progress.openclawDeployComplete,
  ])

  // Generate verification code
  const verificationCode = useMemo(
    () => generateVerificationCode(user?.uid),
    [user?.uid]
  )

  // Calculate progress info from centralized current step
  const progressInfo = useMemo(() => {
    if (!currentStep) {
      return {
        currentStep: 0,
        stepTitle: 'Loading...',
        isPreVercel: true,
        nextMilestone: '',
      }
    }

    return {
      currentStep: currentStep.step.stepNumber,
      stepTitle: currentStep.step.title,
      isPreVercel: currentStep.step.phase === 'pre-vercel',
      nextMilestone: currentStep.step.nextMilestone,
      subStepCurrent: currentStep.subStepCurrent,
      subStepTotal: currentStep.subStepTotal,
      milestoneTitle: currentStep.step.title,
    }
  }, [currentStep])

  // Helper to check if survey is complete
  const isSurveyCompleted = useCallback(
    (surveyId: string): boolean => {
      switch (surveyId) {
        case SURVEY_IDS.POST_GITHUB:
          return progress.postGithubSurveyComplete
        case SURVEY_IDS.POST_CURSOR:
          return progress.postCursorSurveyComplete
        case SURVEY_IDS.POST_WEBSITE:
          return progress.postWebsiteSurveyComplete
        case SURVEY_IDS.POST_VERCEL:
          return progress.postVercelSurveyComplete
        case SURVEY_IDS.PRE_CUSTOM_PROJECT:
          return progress.preProjectSurveyComplete
        case SURVEY_IDS.POST_CLAUDE_CODE:
          return progress.postClaudeCodeSurveyComplete
        case SURVEY_IDS.POST_TWEET_FUNCTION:
          return progress.postTweetFunctionSurveyComplete
        case SURVEY_IDS.POST_OPENCLAW:
          return progress.postOpenclawSurveyComplete
        case SURVEY_IDS.POST_OPENCLAW_WEBSITE:
          return progress.postOpenclawWebsiteSurveyComplete
        case SURVEY_IDS.POST_OPENSOURCE_PR:
          return progress.postPrSurveyComplete
        default:
          return false
      }
    },
    [progress]
  )

  const handleSurveySubmit = async (
    surveyId: string,
    responses: { [key: string]: string | number }
  ) => {
    setIsSubmittingSurvey(true)
    try {
      const result = await completeSurvey(surveyId, responses)
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit survey')
      }
    } catch (error) {
      logger.error('ALCPage', 'Error submitting survey', { error })
      throw error
    } finally {
      setIsSubmittingSurvey(false)
    }
  }

  const handleSurveySkip = async (surveyId: string) => {
    setIsSubmittingSurvey(true)
    try {
      const result = await skipSurvey(surveyId)
      if (!result.success) {
        throw new Error(result.error || 'Failed to skip survey')
      }
    } catch (error) {
      logger.error('ALCPage', 'Error skipping survey', { error })
      throw error
    } finally {
      setIsSubmittingSurvey(false)
    }
  }

  const handleVisionSubmit = async (vision: string) => {
    if (!user) return

    setIsSubmittingVision(true)
    try {
      const result = await saveVision(user.uid, vision)
      if (!result.success) {
        throw new Error(result.error || 'Failed to save vision')
      }
    } catch (error) {
      logger.error('ALCPage', 'Failed to save vision', { error })
      throw error
    } finally {
      setIsSubmittingVision(false)
    }
  }

  const handleGenerateProject = async () => {
    if (!user || generatingRef.current) return
    generatingRef.current = true

    setIsGeneratingProject(true)
    setProjectError('')

    try {
      const visionDoc = await getDoc(doc(db, 'userVisions', user.uid))
      const vision = visionDoc.data()?.vision || ''

      const surveyDoc = await getDoc(doc(db, 'surveyProgress', user.uid))
      const surveyData = surveyDoc.data()?.[SURVEY_IDS.PRE_CUSTOM_PROJECT] || {}
      const surveyResponses = surveyData.responses || {}

      const result = await generateProject(user.uid, vision, surveyResponses)

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate project')
      }

      await refreshProjectProgress()
    } catch (error) {
      logger.error('ALCPage', 'Failed to generate project', { error })
      setProjectError(
        error instanceof Error ? error.message : 'Failed to generate project'
      )
    } finally {
      setIsGeneratingProject(false)
      generatingRef.current = false
    }
  }

  const handleProjectComplete = async () => {
    const currentProject = progress.currentProject
    if (!currentProject) return

    if (progress.projectsCompletedCount === 0) {
      setJustCompletedProject(currentProject)
      setShowPortfolioPrompt(true)
    }

    await refreshProjectProgress()
  }

  const handleStartOptionalExtra = (extra: 'claude-code' | 'openclaw') => {
    setActiveExtra(extra)
    setExtrasDismissed(true) // Don't show the prompt again
  }

  const handleDismissExtras = () => {
    setExtrasDismissed(true)
    setActiveExtra(null)
  }

  if (loading || (user && progressLoading)) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    )
  }

  return (
    <ToastProvider>
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <DashboardSteps
            user={user}
            progress={progress}
            progressInfo={progressInfo}
            verificationCode={verificationCode}
            isGeneratingProject={isGeneratingProject}
            projectError={projectError}
            showPortfolioPrompt={showPortfolioPrompt}
            justCompletedProject={justCompletedProject}
            isSurveyCompleted={isSurveyCompleted}
            onSurveySubmit={handleSurveySubmit}
            onSurveySkip={handleSurveySkip}
            onVisionSubmit={handleVisionSubmit}
            onGenerateProject={handleGenerateProject}
            onProjectComplete={handleProjectComplete}
            onPortfolioComplete={() => {
              setShowPortfolioPrompt(false)
              setJustCompletedProject(null)
            }}
            onSubStepProgressChange={() => {}}
            onVercelComplete={() => {}}
            onStartOptionalExtra={handleStartOptionalExtra}
            onDismissExtras={handleDismissExtras}
            showOptionalExtrasPrompt={showOptionalExtrasPrompt}
            showExtrasBanner={showExtrasBanner && !extrasDismissed}
            activeExtra={activeExtra}
          />
        </div>

        {isSubmittingSurvey && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <LoadingSpinner size="lg" text="Submitting survey..." />
          </div>
        )}
        {isSubmittingVision && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <LoadingSpinner size="lg" text="Saving your vision..." />
          </div>
        )}
      </main>
    </ToastProvider>
  )
}
