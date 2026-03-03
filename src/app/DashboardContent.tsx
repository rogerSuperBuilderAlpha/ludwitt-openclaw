'use client'

/**
 * Dashboard Content Component
 *
 * This is the authenticated user's dashboard content.
 * Separated from page.tsx for code splitting - only loaded when user is authenticated.
 */

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { signInWithCustomToken } from 'firebase/auth'
import { auth as clientAuth } from '@/lib/firebase/config'

// Dashboard Components
import {
  useDashboardCore,
  useDashboardXP,
  useDashboardUI,
  useDashboardState,
  DashboardHeader,
  ProblemSection,
  ProgressSection,
  DashboardModals,
} from './dashboard'

// Components
import { LogicSectionInner as LogicSection } from '@/components/basics/LogicSection'
import { BasicsWelcomeBanner } from '@/components/basics/BasicsWelcomeBanner'
import { AvatarOnboarding } from '@/components/basics/AvatarOnboarding'
import { FeatureCardsGrid } from '@/components/basics/FeatureCardsGrid'
import { LoadingState, ErrorState } from '@/components/basics/DashboardStates'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { LogicWritingRow } from '@/components/basics/LogicWritingRow'
import { ClassicalLanguagesSection } from '@/components/basics/sections'
import {
  SubjectTabs,
  useSubjectTabs,
  type SubjectTab,
} from '@/components/basics/SubjectTabs'
import { DashboardInfoTabs } from '@/components/basics/DashboardInfoTabs'

// Onboarding Components
import {
  PlatformIntroWizard,
  ProfileReminderBanner,
} from '@/components/basics/onboarding'

// Hooks
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'

// Types
type OnboardingStep =
  | 'loading'
  | 'intro_wizard'
  | 'profile_setup'
  | 'credit_prompt'
  | 'complete'

interface DashboardContentProps {
  userId: string
}

export default function DashboardContent({ userId }: DashboardContentProps) {
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const fetchApi = useApiFetch()

  // Onboarding state
  const [onboardingStep, setOnboardingStep] =
    useState<OnboardingStep>('loading')
  const [showProfileReminder, setShowProfileReminder] = useState(false)
  const [onboardingLoaded, setOnboardingLoaded] = useState(false)

  const {
    isLoading,
    error,
    retryIn,
    mathProgress,
    readingProgress,
    setError,
    setRetryIn,
  } = useDashboardCore()

  const { dailyXP, dailyGoal, latinXP, greekXP, logicXP } = useDashboardXP()

  const {
    needsAvatar,
    avatarCheckComplete,
    logicExpanded,
    logicUnlocked,
    dismissedWelcome,
    forceShowIntro,
    focusMode,
    showKeyboardHelp,
    setNeedsAvatar,
    setAvatarCheckComplete,
    setLogicExpanded,
    setShowKeyboardHelp,
    setShowQuickActions,
    setShowPowerUpPanel,
    setFocusMode,
    setSidePanelOpen,
    setDismissedWelcome,
    setForceShowIntro,
    setShowCreditTransitionModal,
    setShowVoiceSettingsModal,
    setShowReviewsModal,
    setShowSkillsModal,
    setShowPetsModal,
    setShowTutorModal,
    setShowChallengesModal,
  } = useDashboardUI()

  // Subject tabs for cleaner navigation
  const { activeTab, setActiveTab, shouldShow } = useSubjectTabs('all')

  const dashboardHandlers = useDashboardState()
  const {
    handleLogicXPEarned,
    handleClassicalXpChange,
    handleToggleLogicExpand,
    loadProblems,
  } = dashboardHandlers

  // ---------------------------------------------------------------------------
  // Keyboard Shortcuts
  // ---------------------------------------------------------------------------

  useKeyboardShortcuts(
    {
      onHelp: () => setShowKeyboardHelp(true),
      onEscape: () => setShowKeyboardHelp(false),
      onQuickActions: () => setShowQuickActions(true),
      onPowerUps: () => setShowPowerUpPanel(true),
      onFocus: () => {
        setFocusMode((f) => !f)
        if (!focusMode) setSidePanelOpen(false)
      },
    },
    !showKeyboardHelp
  )

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  // Load problems when component mounts
  useEffect(() => {
    loadProblems()
  }, [loadProblems])

  // TimeBack auth
  useEffect(() => {
    const token = searchParams.get('token')
    const source = searchParams.get('source')
    if (token && source === 'timeback') {
      signInWithCustomToken(clientAuth, token)
        .then(() => window.history.replaceState({}, '', '/'))
        .catch(() => setError('Failed to authenticate with TimeBack.'))
    }
  }, [searchParams, setError])

  // Onboarding status check - uses Firestore via API
  useEffect(() => {
    if (!user || onboardingLoaded) return

    const checkOnboardingStatus = async () => {
      try {
        const status = await fetchApi<{
          introCompleted: boolean
          profileCompleted: boolean
          profileSkippedAt: string | null
          shouldRepromptProfile: boolean
          creditPromptSeen: boolean
        }>('/api/basics/onboarding-status')

        // Determine onboarding step
        if (!status.introCompleted) {
          // First time user - show intro wizard
          setOnboardingStep('intro_wizard')
          setNeedsAvatar(false)
          setAvatarCheckComplete(true)
        } else if (!status.profileCompleted) {
          // Intro complete but no profile
          if (status.shouldRepromptProfile || !status.profileSkippedAt) {
            // Never skipped or should re-prompt
            setOnboardingStep('profile_setup')
            setNeedsAvatar(true)
          } else {
            // Skipped recently - show reminder banner
            setShowProfileReminder(true)
            setOnboardingStep('complete')
            setNeedsAvatar(false)
          }
          setAvatarCheckComplete(true)
        } else if (!status.creditPromptSeen) {
          // Profile complete, show credit prompt
          setOnboardingStep('credit_prompt')
          setNeedsAvatar(false)
          setAvatarCheckComplete(true)
          setTimeout(() => setShowCreditTransitionModal(true), 500)
        } else {
          // All onboarding complete
          setOnboardingStep('complete')
          setNeedsAvatar(false)
          setAvatarCheckComplete(true)
        }
      } catch (err) {
        // On error, fall back to checking avatar only
        logger.warn('DashboardContent', 'Failed to load onboarding status', {
          error: err,
        })
        try {
          const token = await user.getIdToken()
          const response = await fetch(
            `/api/basics/check-avatar?userId=${user.uid}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          const result = await response.json()
          setNeedsAvatar(!result.data?.hasAvatar)
          setOnboardingStep(
            result.data?.hasAvatar ? 'complete' : 'profile_setup'
          )
        } catch {
          setNeedsAvatar(false)
          setOnboardingStep('complete')
        }
        setAvatarCheckComplete(true)
      } finally {
        setOnboardingLoaded(true)
      }
    }

    checkOnboardingStatus()
  }, [
    user,
    onboardingLoaded,
    fetchApi,
    setNeedsAvatar,
    setAvatarCheckComplete,
    setShowCreditTransitionModal,
  ])

  // Auto-retry on error
  useEffect(() => {
    if (!error) return
    let remaining = 10
    setRetryIn(remaining)
    const timerId = setInterval(() => {
      remaining -= 1
      setRetryIn(remaining)
      if (remaining <= 0) {
        clearInterval(timerId)
        setRetryIn(null)
        loadProblems()
      }
    }, 1000)
    return () => clearInterval(timerId)
  }, [error, loadProblems, setRetryIn])

  // ---------------------------------------------------------------------------
  // Onboarding Handlers
  // ---------------------------------------------------------------------------

  const handleIntroComplete = async () => {
    try {
      await fetchApi('/api/basics/onboarding-status', {
        method: 'POST',
        body: JSON.stringify({ action: 'complete_intro' }),
      })
    } catch (err) {
      logger.warn('DashboardContent', 'Failed to track intro completion', {
        error: err,
      })
    }
    // Go straight to dashboard - profile will be prompted later
    setOnboardingStep('complete')
    setNeedsAvatar(false)
    setShowProfileReminder(true) // Show reminder banner
  }

  const handleIntroSkip = async () => {
    try {
      await fetchApi('/api/basics/onboarding-status', {
        method: 'POST',
        body: JSON.stringify({ action: 'complete_intro' }),
      })
    } catch (err) {
      logger.warn('DashboardContent', 'Failed to track intro skip', {
        error: err,
      })
    }
    // Skip to dashboard
    setOnboardingStep('complete')
    setNeedsAvatar(false)
  }

  const handleProfileComplete = () => {
    setNeedsAvatar(false)
    setOnboardingStep('credit_prompt')
    setShowCreditTransitionModal(true)
  }

  const handleProfileSkip = () => {
    // Skip is now tracked in AvatarOnboarding via API
    setNeedsAvatar(false)
    setShowProfileReminder(true)
    setOnboardingStep('complete')
  }

  const handleShowProfileSetup = () => {
    setShowProfileReminder(false)
    setNeedsAvatar(true)
    setOnboardingStep('profile_setup')
  }

  // ---------------------------------------------------------------------------
  // Render Guards - Wait for ALL loading to complete before rendering
  // ---------------------------------------------------------------------------

  // Show error state if there's an error
  if (error)
    return <ErrorState error={error} retryIn={retryIn} onRetry={loadProblems} />

  // Wait for BOTH avatar check AND dashboard data to load
  // This prevents flickering by only rendering once everything is ready
  if (!avatarCheckComplete || isLoading) return <LoadingState />

  // Show platform intro wizard for first-time users
  if (onboardingStep === 'intro_wizard') {
    return (
      <PlatformIntroWizard
        onComplete={handleIntroComplete}
        onSkip={handleIntroSkip}
      />
    )
  }

  // Profile setup step
  if (needsAvatar || onboardingStep === 'profile_setup') {
    return (
      <AvatarOnboarding
        userId={userId}
        onComplete={handleProfileComplete}
        onSkip={handleProfileSkip}
      />
    )
  }

  const totalCompleted =
    (mathProgress?.totalCompleted || 0) + (readingProgress?.totalCompleted || 0)
  const showWelcome =
    forceShowIntro || (totalCompleted === 0 && !dismissedWelcome)

  // ---------------------------------------------------------------------------
  // Main Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <style jsx>{`
        .basics-theme .basics-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(
              900px 500px at 20% -10%,
              rgba(11, 29, 57, 0.06),
              transparent 60%
            ),
            radial-gradient(
              800px 450px at 90% 10%,
              rgba(212, 175, 55, 0.06),
              transparent 60%
            ),
            linear-gradient(180deg, #faf7ef, #f4efe3);
        }
        .basics-theme .glass-card {
          backdrop-filter: saturate(120%) blur(6px);
          background: rgba(255, 252, 244, 0.75);
          border: 1px solid rgba(11, 29, 57, 0.08);
          box-shadow: 0 6px 22px rgba(11, 29, 57, 0.06);
          border-radius: 12px;
        }
      `}</style>

      {/* Skip to main content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-blue-600 focus:text-gray-900 focus:font-medium"
      >
        Skip to main content
      </a>

      <ErrorBoundary componentName="Dashboard">
        <div
          className={`min-h-screen transition-all duration-300 ${focusMode ? 'opacity-95' : ''} basics-theme`}
        >
          <div aria-hidden="true" className="basics-bg" />

          {/* Header */}
          <DashboardHeader />

          {/* Main Content */}
          <main
            id="main-content"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10"
          >
            {/* Visually hidden page title for screen readers */}
            <h1 className="sr-only">Ludwitt Learning Dashboard</h1>
            {/* Profile Reminder Banner - for users who skipped profile setup */}
            {showProfileReminder && (
              <ProfileReminderBanner
                onSetupProfile={handleShowProfileSetup}
                onDismiss={() => setShowProfileReminder(false)}
              />
            )}

            {/* Welcome Banner */}
            {showWelcome && (
              <BasicsWelcomeBanner
                onDismiss={() => {
                  setDismissedWelcome(true)
                  setForceShowIntro(false)
                }}
              />
            )}

            {/* Info Tabs Row: Learning Study, Analytics, Due for Review */}
            <DashboardInfoTabs
              userId={userId}
              mathProgress={mathProgress}
              readingProgress={readingProgress}
              latinXP={latinXP}
              greekXP={greekXP}
              dailyXP={dailyXP}
              dailyGoal={dailyGoal}
              onStartReview={() => setShowReviewsModal(true)}
              onOpenStudyModal={() => {
                /* Will be handled by the component */
              }}
            />

            {/* Subject Tabs */}
            <div className="mb-4">
              <SubjectTabs
                activeTab={activeTab}
                onTabChange={(tab: SubjectTab) => {
                  setActiveTab(tab)
                  if (tab === 'math' || tab === 'reading') {
                    const section = document.querySelector(
                      `[data-section="${tab}"]`
                    )
                    section?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }
                }}
                showLogic={
                  logicUnlocked ||
                  Math.floor(mathProgress?.currentDifficulty || 1) >= 5 ||
                  Math.floor(readingProgress?.currentDifficulty || 1) >= 5
                }
                logicLocked={!logicUnlocked}
              />
            </div>

            {/* Logic Section Modal (full-width when expanded) */}
            {logicUnlocked && logicExpanded && (
              <LogicSection
                userId={userId}
                onXPEarned={handleLogicXPEarned}
                onClose={() => {
                  setLogicExpanded(false)
                  localStorage.setItem('logic_expanded', 'false')
                }}
              />
            )}

            {/* Logic & Writing Row - Side by Side (show for 'all' or 'logic') */}
            {(shouldShow('logic') || activeTab === 'all') && (
              <LogicWritingRow
                mathProgress={mathProgress}
                readingProgress={readingProgress}
                logicExpanded={logicExpanded}
                onToggleExpand={handleToggleLogicExpand}
                userId={userId}
              />
            )}

            {/* Core Topics Banner (Math + Reading) */}
            {(shouldShow('math') || shouldShow('reading')) && (
              <ProblemSection handlers={dashboardHandlers} />
            )}

            {/* Classical Languages */}
            {(shouldShow('latin') || shouldShow('greek')) && (
              <ClassicalLanguagesSection
                classicalXp={latinXP + greekXP}
                onXpChange={handleClassicalXpChange}
                dailyXP={dailyXP}
                dailyGoal={dailyGoal}
              />
            )}

            {/* Learning Tools Grid */}
            <FeatureCardsGrid
              onOpenTutor={() => setShowTutorModal(true)}
              onOpenAnalytics={() => setSidePanelOpen(true)}
              onOpenPets={() => setShowPetsModal(true)}
              onOpenPowerUps={() => setShowPowerUpPanel(true)}
              onOpenReviews={() => setShowReviewsModal(true)}
              onOpenVoice={() => setShowVoiceSettingsModal(true)}
              onOpenSkills={() => setShowSkillsModal(true)}
              onOpenChallenges={() => setShowChallengesModal(true)}
            />
          </main>

          {/* Progress Sidebar */}
          <ProgressSection />

          {/* All Modals */}
          <DashboardModals handlers={dashboardHandlers} />
        </div>
      </ErrorBoundary>
    </>
  )
}
