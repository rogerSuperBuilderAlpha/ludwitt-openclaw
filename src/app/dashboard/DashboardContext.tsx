'use client'

import { createContext, useContext, useState, useRef, ReactNode } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { MathProblem, ReadingExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { MathProblemV2 } from '@/lib/types/math-v2'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
import { ViralChallenge } from '@/components/basics/ViralChallenges'
import { FocusModeReturn } from '@/lib/hooks/useFocusMode'
import {
  DashboardCoreContextValue,
  DashboardXPContextValue,
  DashboardUIContextValue,
} from './types'

// ---------------------------------------------------------------------------
// Three focused contexts — subscribe only to what you need
// ---------------------------------------------------------------------------

const DashboardCoreContext = createContext<DashboardCoreContextValue | null>(null)
const DashboardXPContext = createContext<DashboardXPContextValue | null>(null)
const DashboardUIContext = createContext<DashboardUIContextValue | null>(null)

// ---------------------------------------------------------------------------
// Focused hooks — each subscribes to only one context slice
// ---------------------------------------------------------------------------

export function useDashboardCore() {
  const ctx = useContext(DashboardCoreContext)
  if (!ctx) throw new Error('useDashboardCore must be used within DashboardProvider')
  return ctx
}

export function useDashboardXP() {
  const ctx = useContext(DashboardXPContext)
  if (!ctx) throw new Error('useDashboardXP must be used within DashboardProvider')
  return ctx
}

export function useDashboardUI() {
  const ctx = useContext(DashboardUIContext)
  if (!ctx) throw new Error('useDashboardUI must be used within DashboardProvider')
  return ctx
}

/** Convenience hook that returns all three contexts merged. Prefer the specific hooks for better render perf. */
export function useDashboard() {
  return { ...useDashboardCore(), ...useDashboardXP(), ...useDashboardUI() }
}

// ---------------------------------------------------------------------------
// Provider — wraps children in all three context providers
// ---------------------------------------------------------------------------

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  // ---- Core State ----
  const [mathProblem, setMathProblem] = useState<MathProblem | null>(null)
  const [mathProblemV2, setMathProblemV2] = useState<MathProblemV2 | null>(null)
  const [readingExercise, setReadingExercise] = useState<ReadingExercise | null>(null)
  const [readingExerciseV2, setReadingExerciseV2] = useState<ReadingExerciseV2 | null>(null)
  const [mathProgress, setMathProgress] = useState<SubjectProgressDisplay | null>(null)
  const [readingProgress, setReadingProgress] = useState<SubjectProgressDisplay | null>(null)
  const [mathProblemsSeen, setMathProblemsSeen] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryIn, setRetryIn] = useState<number | null>(null)
  const problemStartTimeRef = useRef<{ math: number | null; reading: number | null }>({ math: null, reading: null })

  // ---- XP State ----
  const [dailyXP, setDailyXP] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(1000)
  const [latinXP, setLatinXP] = useState(0)
  const [greekXP, setGreekXP] = useState(0)
  const [logicXP, setLogicXP] = useState(0)
  const [classicalXp, setClassicalXp] = useState(100)
  const [wtdXP, setWtdXP] = useState(0)
  const [mtdXP, setMtdXP] = useState(0)
  const [ytdXP, setYtdXP] = useState(0)
  const [allTimeXP, setAllTimeXP] = useState(0)

  // ---- UI State ----
  const [focusMode, setFocusMode] = useState(false)
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [showKeyboardNudge, setShowKeyboardNudge] = useState(false)
  const [dismissedWelcome, setDismissedWelcome] = useState(false)
  const [forceShowIntro, setForceShowIntro] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showPowerUpPanel, setShowPowerUpPanel] = useState(false)
  const [showVoiceSettingsModal, setShowVoiceSettingsModal] = useState(false)
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [showPetsModal, setShowPetsModal] = useState(false)
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const [showTutorModal, setShowTutorModal] = useState(false)
  const [showChallengesModal, setShowChallengesModal] = useState(false)
  const [showCreditTransitionModal, setShowCreditTransitionModal] = useState(false)
  const [showFirstProblemCelebration, setShowFirstProblemCelebration] = useState(false)
  const [firstProblemXP, setFirstProblemXP] = useState(0)
  const [logicExpanded, setLogicExpanded] = useState(false)
  const [logicUnlocked, setLogicUnlocked] = useState(false)
  const [needsAvatar, setNeedsAvatar] = useState(false)
  const [avatarCheckComplete, setAvatarCheckComplete] = useState(false)
  const [openViralChallenge, setOpenViralChallenge] = useState<ViralChallenge | null>(null)
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([])
  const intensiveFocusRef = useRef<FocusModeReturn | null>(null)

  // ---- Context values ----
  const coreValue: DashboardCoreContextValue = {
    mathProblem, setMathProblem,
    mathProblemV2, setMathProblemV2,
    readingExercise, setReadingExercise,
    readingExerciseV2, setReadingExerciseV2,
    mathProgress, setMathProgress,
    readingProgress, setReadingProgress,
    mathProblemsSeen, setMathProblemsSeen,
    isLoading, setIsLoading,
    error, setError,
    retryIn, setRetryIn,
    user,
    problemStartTimeRef,
  }

  const xpValue: DashboardXPContextValue = {
    dailyXP, setDailyXP,
    dailyGoal, setDailyGoal,
    latinXP, setLatinXP,
    greekXP, setGreekXP,
    logicXP, setLogicXP,
    classicalXp, setClassicalXp,
    wtdXP, setWtdXP,
    mtdXP, setMtdXP,
    ytdXP, setYtdXP,
    allTimeXP, setAllTimeXP,
  }

  const uiValue: DashboardUIContextValue = {
    focusMode, setFocusMode,
    sidePanelOpen, setSidePanelOpen,
    showKeyboardHelp, setShowKeyboardHelp,
    showKeyboardNudge, setShowKeyboardNudge,
    dismissedWelcome, setDismissedWelcome,
    forceShowIntro, setForceShowIntro,
    showQuickActions, setShowQuickActions,
    showPowerUpPanel, setShowPowerUpPanel,
    showVoiceSettingsModal, setShowVoiceSettingsModal,
    showReviewsModal, setShowReviewsModal,
    showPetsModal, setShowPetsModal,
    showSkillsModal, setShowSkillsModal,
    showTutorModal, setShowTutorModal,
    showChallengesModal, setShowChallengesModal,
    showCreditTransitionModal, setShowCreditTransitionModal,
    showFirstProblemCelebration, setShowFirstProblemCelebration,
    firstProblemXP, setFirstProblemXP,
    logicExpanded, setLogicExpanded,
    logicUnlocked, setLogicUnlocked,
    needsAvatar, setNeedsAvatar,
    avatarCheckComplete, setAvatarCheckComplete,
    openViralChallenge, setOpenViralChallenge,
    joinedChallenges, setJoinedChallenges,
    intensiveFocusRef,
  }

  return (
    <DashboardCoreContext.Provider value={coreValue}>
      <DashboardXPContext.Provider value={xpValue}>
        <DashboardUIContext.Provider value={uiValue}>
          {children}
        </DashboardUIContext.Provider>
      </DashboardXPContext.Provider>
    </DashboardCoreContext.Provider>
  )
}
