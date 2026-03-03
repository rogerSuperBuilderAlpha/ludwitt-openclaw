'use client'

import { useCallback, useState, useEffect } from 'react'
import { BasicsModals } from '@/components/basics/BasicsModals'
import { BasicsFeatureModals } from '@/components/basics/sections'
import { DashboardSystems } from '@/components/basics/DashboardSystems'
import { FocusModeWarningModal } from '@/components/basics/FocusModeWarningModal'
// Focus Mode: v1 handles reading, v2 handles math — both are actively used
import {
  FocusModeModal,
  SessionCompleteModal,
} from '@/components/basics/focus-mode'
import { FocusModeModalV2 } from '@/components/basics/focus-mode-v2'
import { TransitionModal } from '@/components/credits'
import { FirstProblemCelebration } from '@/components/basics/onboarding'
import { createQuickActions } from '@/components/basics/QuickActionsBar'
import { TransferChallenge } from '@/components/basics/transfer'
import { PrerequisiteCheck } from '@/components/basics/prerequisites'
import {
  useDashboardCore,
  useDashboardXP,
  useDashboardUI,
} from './DashboardContext'
import { DashboardHandlers } from './types'
import { useBasicsAchievements } from '@/lib/hooks/useBasicsAchievements'
import { usePowerUps } from '@/lib/hooks/usePowerUps'
import { useRecentProblems } from '@/lib/hooks/useRecentProblems'
import { useFocusMode } from '@/lib/hooks/useFocusMode'
import { useWorkTimer } from '@/lib/hooks/useWorkTimer'
import { useCredits } from '@/lib/hooks/useCredits'
import { useTransferChallenge } from '@/lib/hooks/useTransferChallenge'
import { usePrerequisiteCheck } from '@/lib/hooks/usePrerequisiteCheck'
import { MathProblemV2 } from '@/lib/types/math-v2'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'

interface DashboardModalsProps {
  handlers: DashboardHandlers
}

export default function DashboardModals({ handlers }: DashboardModalsProps) {
  const {
    user,
    isLoading,
    mathProblem,
    mathProblemV2,
    setMathProblemV2,
    readingExercise,
    readingExerciseV2,
    setReadingExerciseV2,
    mathProgress,
    readingProgress,
  } = useDashboardCore()

  const { latinXP, greekXP, logicXP, dailyXP } = useDashboardXP()

  const {
    showKeyboardHelp,
    showQuickActions,
    showCreditTransitionModal,
    showPowerUpPanel,
    showVoiceSettingsModal,
    showReviewsModal,
    showPetsModal,
    showSkillsModal,
    showTutorModal,
    showChallengesModal,
    openViralChallenge,
    joinedChallenges,
    setShowKeyboardHelp,
    setShowQuickActions,
    setShowCreditTransitionModal,
    setShowPowerUpPanel,
    setShowVoiceSettingsModal,
    setShowReviewsModal,
    setShowPetsModal,
    setShowSkillsModal,
    setShowTutorModal,
    setShowChallengesModal,
    setOpenViralChallenge,
    intensiveFocusRef,
    showFirstProblemCelebration,
    firstProblemXP,
    setShowFirstProblemCelebration,
    needsAvatar,
    setNeedsAvatar,
  } = useDashboardUI()

  // Track focus mode V2 session stats (for both math and reading)
  const [focusModeV2ProblemsCompleted, setFocusModeV2ProblemsCompleted] =
    useState(0)
  const [focusModeV2XPEarned, setFocusModeV2XPEarned] = useState(0)
  const [readingFocusProblemsCompleted, setReadingFocusProblemsCompleted] =
    useState(0)
  const [readingFocusXPEarned, setReadingFocusXPEarned] = useState(0)

  const {
    handleMathComplete,
    handleReadingComplete,
    showNotification,
    addXP,
    subtractXP,
  } = handlers
  const { refresh: refreshCredits } = useCredits()
  const intensiveFocus = useFocusMode(user?.uid)

  // Update the ref on every render so ProblemSection always has access to current state
  // Using a ref avoids infinite re-render loops
  intensiveFocusRef.current = intensiveFocus
  const workTimer = useWorkTimer(user?.uid)

  const achievements = useBasicsAchievements({
    userName: user?.displayName || user?.email?.split('@')[0] || 'Student',
    streakProtected: false,
    onStreakProtected: (subject) =>
      showNotification(`🛡️ Streak Protected! Your ${subject} streak is safe.`),
  })

  const powerUps = usePowerUps({
    onNotification: showNotification,
  })

  const recentProblems = useRecentProblems({
    userId: user?.uid,
    onSRSTrigger: () => setShowReviewsModal(true),
  })

  // Transfer challenge hook for displaying challenge modals
  // NOTE: Triggering is handled by individual subject hooks (math-session-v2, useReadingExerciseV2, etc.)
  // This hook is ONLY for rendering the modal UI - do NOT add trigger logic here to avoid double-triggering
  const transferChallenge = useTransferChallenge()

  // Prerequisite check hook for verifying readiness before grade jumps
  const prerequisiteCheck = usePrerequisiteCheck()

  // Check for prerequisite verification when close to grade advancement
  useEffect(() => {
    // Check math progress
    if (
      mathProgress?.progressToNextLevel &&
      mathProgress.progressToNextLevel >= 90
    ) {
      prerequisiteCheck.triggerPrerequisiteCheck(
        mathProgress.currentDifficulty,
        'math',
        mathProgress.progressToNextLevel,
        mathProgress.accuracyRate
      )
    }
    // Check reading progress
    if (
      readingProgress?.progressToNextLevel &&
      readingProgress.progressToNextLevel >= 90
    ) {
      prerequisiteCheck.triggerPrerequisiteCheck(
        readingProgress.currentDifficulty,
        'reading',
        readingProgress.progressToNextLevel,
        readingProgress.accuracyRate
      )
    }
  }, [
    mathProgress?.progressToNextLevel,
    mathProgress?.currentDifficulty,
    mathProgress?.accuracyRate,
    readingProgress?.progressToNextLevel,
    readingProgress?.currentDifficulty,
    readingProgress?.accuracyRate,
    prerequisiteCheck,
  ])

  const quickActions = createQuickActions({
    onFocus: () => {},
    onHelp: () => setShowKeyboardHelp(true),
    canSubmit: !isLoading && !!(mathProblem || readingExercise),
    canSkip: !isLoading,
    canHint: !isLoading,
  })

  const handleCreditTransitionClose = useCallback(() => {
    if (user) {
      localStorage.setItem(`credit_transition_seen_${user.uid}`, 'true')
    }
    setShowCreditTransitionModal(false)
  }, [user, setShowCreditTransitionModal])

  return (
    <>
      {/* Credit Transition Modal */}
      <TransitionModal
        isOpen={showCreditTransitionModal}
        onClose={handleCreditTransitionClose}
      />

      {/* First Problem Celebration */}
      {showFirstProblemCelebration && (
        <FirstProblemCelebration
          xpEarned={firstProblemXP}
          onContinue={() => setShowFirstProblemCelebration(false)}
          onSetupProfile={() => {
            setShowFirstProblemCelebration(false)
            setNeedsAvatar(true)
          }}
        />
      )}

      {/* Transfer Challenge Loading Indicator */}
      {transferChallenge.state.isLoading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm text-center">
            <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">
              Generating Transfer Challenge...
            </h3>
            <p className="text-sm text-gray-600">
              Creating a unique challenge to test your skills in a new context.
            </p>
            <p className="text-xs text-amber-600 mt-2">
              ⚡ Credits charged based on usage
            </p>
          </div>
        </div>
      )}

      {/* Transfer Challenge Credit Error */}
      {transferChallenge.state.insufficientCredits && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💳</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Need More Credits</h3>
            <p className="text-sm text-gray-600 mb-4">
              Transfer challenges are AI-generated and require credits. Add
              credits to continue.
            </p>
            <button
              onClick={transferChallenge.hideTransferChallenge}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Transfer Challenge Modal - Promotes learning transfer to novel contexts */}
      {transferChallenge.state.currentChallenge && (
        <TransferChallenge
          challenge={transferChallenge.state.currentChallenge}
          isOpen={transferChallenge.state.showChallenge}
          onClose={transferChallenge.hideTransferChallenge}
          onComplete={(correct, xpEarned) => {
            transferChallenge.handleChallengeComplete(correct, xpEarned)
            if (correct) {
              addXP(xpEarned, 'challenge')
              showNotification(
                `🎯 Transfer Challenge complete! +${xpEarned} XP`
              )
            } else {
              showNotification('Keep practicing! Transfer takes time.')
            }
          }}
        />
      )}

      {/* Prerequisite Check Modal - Verifies readiness before grade jumps */}
      {prerequisiteCheck.checkData && (
        <PrerequisiteCheck
          checkData={prerequisiteCheck.checkData}
          isOpen={prerequisiteCheck.showCheck}
          onClose={prerequisiteCheck.hidePrerequisiteCheck}
          onProceed={() => {
            prerequisiteCheck.handleProceed()
            showNotification('📈 Great! Advancing to the next level.')
          }}
          onReview={(skillId) => {
            prerequisiteCheck.handleReview(skillId)
            showNotification(`📚 Starting review of ${skillId}`)
          }}
          onReviewAll={() => {
            prerequisiteCheck.handleReviewAll()
            setShowReviewsModal(true)
            showNotification('📚 Opening review session for prerequisites')
          }}
        />
      )}

      {/* Basics Modals (Keyboard Help, Quick Actions, Certificates, Challenges) */}
      <BasicsModals
        showKeyboardHelp={showKeyboardHelp}
        onCloseKeyboardHelp={() => setShowKeyboardHelp(false)}
        showQuickActions={showQuickActions}
        onCloseQuickActions={() => setShowQuickActions(false)}
        quickActions={quickActions}
        showCertificate={achievements.showCertificate}
        onCloseCertificate={achievements.closeCertificate}
        showSocialSharing={achievements.showSocialSharing}
        onCloseSocialSharing={achievements.closeSocialSharing}
        user={user}
        openViralChallenge={openViralChallenge}
        onCloseViralChallenge={() => setOpenViralChallenge(null)}
        onJoinChallenge={async () => {}}
        joinedChallenges={joinedChallenges}
      />

      {/* Feature Modals (Pets, Reviews, Skills) */}
      <BasicsFeatureModals
        userId={user?.uid}
        mathProgress={mathProgress}
        readingProgress={readingProgress}
        latinXP={latinXP}
        greekXP={greekXP}
        logicXP={logicXP}
        dailyXP={dailyXP}
        recentProblems={recentProblems.recentProblems}
        showPetsModal={showPetsModal}
        showReviewsModal={showReviewsModal}
        showSkillsModal={showSkillsModal}
        onClosePetsModal={() => setShowPetsModal(false)}
        onCloseReviewsModal={() => setShowReviewsModal(false)}
        onCloseSkillsModal={() => setShowSkillsModal(false)}
        onReviewComplete={(item, correct) => {
          if (correct) {
            addXP(5, 'review')
            showNotification('🧠 Review complete! +5 XP')
          }
        }}
        onSkillSelect={() => setShowSkillsModal(false)}
        onCreditsUsed={refreshCredits}
      />

      {/* Dashboard Systems (Voice, Power-ups, Breaks, Tutor, Challenges) */}
      <DashboardSystems
        userId={user?.uid}
        mathProgress={mathProgress}
        readingProgress={readingProgress}
        latinXP={latinXP}
        greekXP={greekXP}
        logicXP={logicXP}
        dailyXP={dailyXP}
        mathProblem={mathProblem}
        readingExercise={readingExercise}
        showVoiceSettingsModal={showVoiceSettingsModal}
        onVoiceSettingsToggle={setShowVoiceSettingsModal}
        showPowerUpPanel={showPowerUpPanel}
        onPowerUpPanelToggle={setShowPowerUpPanel}
        onPowerUpActivated={powerUps.activatePowerUp}
        onPowerUpExpired={powerUps.handlePowerUpExpired}
        onXpSpent={(amount) => subtractXP(amount)}
        showBreakIntervention={workTimer.showIntervention}
        currentIntervention={workTimer.currentIntervention}
        onBreakComplete={workTimer.completeBreak}
        onBreakSkip={workTimer.skipBreak}
        showTutorModal={showTutorModal}
        onCloseTutorModal={() => setShowTutorModal(false)}
        showChallengesModal={showChallengesModal}
        onCloseChallengesModal={() => setShowChallengesModal(false)}
        onClaimReward={(xp) => {
          addXP(xp, 'challenge')
          showNotification(`🎯 Challenge complete! +${xp} XP`)
        }}
      />

      {/* Focus Mode Modals */}
      <FocusModeWarningModal
        isOpen={intensiveFocus.isWarningOpen}
        subject={intensiveFocus.pendingSubject}
        onConfirm={() => {
          // Reset V2 session stats when starting
          setFocusModeV2ProblemsCompleted(0)
          setFocusModeV2XPEarned(0)
          setReadingFocusProblemsCompleted(0)
          setReadingFocusXPEarned(0)
          intensiveFocus.confirmFocusMode()
        }}
        onCancel={intensiveFocus.cancelFocusMode}
      />

      {/* V2 Focus Mode for Math */}
      <FocusModeModalV2
        isOpen={
          intensiveFocus.state.isActive &&
          intensiveFocus.state.subject === 'math'
        }
        onClose={() => {
          // End focus mode session
          intensiveFocus.endSession()
        }}
        problem={mathProblemV2}
        progress={mathProgress}
        onComplete={(
          nextProblem: MathProblemV2,
          updatedProgress: SubjectProgressDisplay,
          xpEarned?: number
        ) => {
          // Update the V2 problem in context
          setMathProblemV2(nextProblem)
          // Track XP earned
          if (xpEarned) {
            setFocusModeV2XPEarned((prev) => prev + xpEarned)
            intensiveFocus.addXP(xpEarned)
          }
          setFocusModeV2ProblemsCompleted((prev) => prev + 1)
        }}
        onXPEarned={(amount: number) => {
          setFocusModeV2XPEarned((prev) => prev + amount)
          intensiveFocus.addXP(amount)
        }}
        problemsCompleted={focusModeV2ProblemsCompleted}
        xpEarnedSession={focusModeV2XPEarned}
        totalProblems={10}
        xpMultiplier={intensiveFocus.getXPMultiplier()}
      />

      {/* V2 Focus Mode for Reading */}
      <FocusModeModal
        isOpen={
          intensiveFocus.state.isActive &&
          intensiveFocus.state.subject === 'reading'
        }
        state={intensiveFocus.state}
        formatTimeRemaining={intensiveFocus.formatTimeRemaining}
        mathProblem={mathProblem}
        mathProgress={mathProgress}
        onMathComplete={(
          nextProblem,
          updatedProgress,
          xpEarned,
          userAnswer
        ) => {
          // Apply 3x multiplier for focus mode
          const multipliedXP = xpEarned
            ? xpEarned * intensiveFocus.getXPMultiplier()
            : 0
          handleMathComplete(
            nextProblem,
            updatedProgress,
            multipliedXP,
            userAnswer
          )
        }}
        readingExercise={readingExerciseV2}
        readingProgress={readingProgress}
        onReadingComplete={(
          nextExercise: ReadingExerciseV2 | null,
          updatedProgress: SubjectProgressDisplay,
          xpEarned?: number
        ) => {
          // Update the V2 exercise in context
          if (nextExercise) {
            setReadingExerciseV2(nextExercise)
          }
          // Track XP earned
          if (xpEarned) {
            setReadingFocusXPEarned((prev) => prev + xpEarned)
            intensiveFocus.addXP(xpEarned)
          }
          setReadingFocusProblemsCompleted((prev) => prev + 1)
        }}
        onXPEarned={(amount: number) => {
          setReadingFocusXPEarned((prev) => prev + amount)
          intensiveFocus.addXP(amount)
        }}
        onProblemCompleted={() => {
          setReadingFocusProblemsCompleted((prev) => prev + 1)
          intensiveFocus.addProblemCompleted()
        }}
      />

      <SessionCompleteModal
        isOpen={intensiveFocus.isSessionComplete}
        results={intensiveFocus.sessionResults}
        onClose={() => {
          // Award the 3x XP bonus for the session
          if (intensiveFocus.sessionResults) {
            const bonusXP = intensiveFocus.sessionResults.xpEarned * 2 // Already earned 1x, add 2x more for 3x total
            addXP(bonusXP, 'focus-mode')
            showNotification(
              `🔥 Focus Mode complete! +${intensiveFocus.sessionResults.xpEarned * 3} XP total!`
            )
          }
          intensiveFocus.clearSessionResults()
        }}
      />
    </>
  )
}
