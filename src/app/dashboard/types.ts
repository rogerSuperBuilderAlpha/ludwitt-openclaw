import { MathProblem, ReadingExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { MathProblemV2 } from '@/lib/types/math-v2'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
import { User } from 'firebase/auth'
import { ViralChallenge } from '@/components/basics/ViralChallenges'
import { FocusModeReturn } from '@/lib/hooks/useFocusMode'

// ---------------------------------------------------------------------------
// Sub-context: Core (problems, progress, loading, error)
// ---------------------------------------------------------------------------

export interface DashboardCoreState {
  mathProblem: MathProblem | null
  mathProblemV2: MathProblemV2 | null
  readingExercise: ReadingExercise | null
  readingExerciseV2: ReadingExerciseV2 | null
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  mathProblemsSeen: string[]
  isLoading: boolean
  error: string | null
  retryIn: number | null
}

export interface DashboardCoreActions {
  setMathProblem: (problem: MathProblem | null) => void
  setMathProblemV2: (problem: MathProblemV2 | null) => void
  setReadingExercise: (exercise: ReadingExercise | null) => void
  setReadingExerciseV2: (exercise: ReadingExerciseV2 | null) => void
  setMathProgress: (progress: SubjectProgressDisplay | null | ((prev: SubjectProgressDisplay | null) => SubjectProgressDisplay | null)) => void
  setReadingProgress: (progress: SubjectProgressDisplay | null | ((prev: SubjectProgressDisplay | null) => SubjectProgressDisplay | null)) => void
  setMathProblemsSeen: (ids: string[]) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setRetryIn: (seconds: number | null) => void
}

export interface DashboardCoreContextValue extends DashboardCoreState, DashboardCoreActions {
  user: User | null
  problemStartTimeRef: React.MutableRefObject<{ math: number | null; reading: number | null }>
}

// ---------------------------------------------------------------------------
// Sub-context: XP (all XP-related values)
// ---------------------------------------------------------------------------

export interface DashboardXPState {
  dailyXP: number
  dailyGoal: number
  latinXP: number
  greekXP: number
  logicXP: number
  classicalXp: number
  wtdXP: number
  mtdXP: number
  ytdXP: number
  allTimeXP: number
}

export interface DashboardXPActions {
  setDailyXP: (xp: number | ((prev: number) => number)) => void
  setDailyGoal: (goal: number) => void
  setLatinXP: (xp: number | ((prev: number) => number)) => void
  setGreekXP: (xp: number | ((prev: number) => number)) => void
  setLogicXP: (xp: number | ((prev: number) => number)) => void
  setClassicalXp: (xp: number | ((prev: number) => number)) => void
  setWtdXP: (xp: number | ((prev: number) => number)) => void
  setMtdXP: (xp: number | ((prev: number) => number)) => void
  setYtdXP: (xp: number | ((prev: number) => number)) => void
  setAllTimeXP: (xp: number | ((prev: number) => number)) => void
}

export interface DashboardXPContextValue extends DashboardXPState, DashboardXPActions {}

// ---------------------------------------------------------------------------
// Sub-context: UI (modals, focus mode, onboarding, challenges)
// ---------------------------------------------------------------------------

export interface DashboardUIState {
  focusMode: boolean
  sidePanelOpen: boolean
  showKeyboardHelp: boolean
  showKeyboardNudge: boolean
  dismissedWelcome: boolean
  forceShowIntro: boolean
  showQuickActions: boolean
  showPowerUpPanel: boolean
  showVoiceSettingsModal: boolean
  showReviewsModal: boolean
  showPetsModal: boolean
  showSkillsModal: boolean
  showTutorModal: boolean
  showChallengesModal: boolean
  showCreditTransitionModal: boolean
  showFirstProblemCelebration: boolean
  firstProblemXP: number
  logicExpanded: boolean
  logicUnlocked: boolean
  needsAvatar: boolean
  avatarCheckComplete: boolean
  openViralChallenge: ViralChallenge | null
  joinedChallenges: string[]
}

export interface DashboardUIActions {
  setFocusMode: (mode: boolean | ((prev: boolean) => boolean)) => void
  setSidePanelOpen: (open: boolean) => void
  setShowKeyboardHelp: (show: boolean) => void
  setShowKeyboardNudge: (show: boolean) => void
  setDismissedWelcome: (dismissed: boolean) => void
  setForceShowIntro: (show: boolean) => void
  setShowQuickActions: (show: boolean) => void
  setShowPowerUpPanel: (show: boolean) => void
  setShowVoiceSettingsModal: (show: boolean) => void
  setShowReviewsModal: (show: boolean) => void
  setShowPetsModal: (show: boolean) => void
  setShowSkillsModal: (show: boolean) => void
  setShowTutorModal: (show: boolean) => void
  setShowChallengesModal: (show: boolean) => void
  setShowCreditTransitionModal: (show: boolean) => void
  setShowFirstProblemCelebration: (show: boolean) => void
  setFirstProblemXP: (xp: number) => void
  setLogicExpanded: (expanded: boolean | ((prev: boolean) => boolean)) => void
  setLogicUnlocked: (unlocked: boolean) => void
  setNeedsAvatar: (needs: boolean) => void
  setAvatarCheckComplete: (complete: boolean) => void
  setOpenViralChallenge: (challenge: ViralChallenge | null) => void
  setJoinedChallenges: (challenges: string[]) => void
}

export interface DashboardUIContextValue extends DashboardUIState, DashboardUIActions {
  intensiveFocusRef: React.MutableRefObject<FocusModeReturn | null>
}

// ---------------------------------------------------------------------------
// Combined type (for useDashboard backward compat & DashboardHandlers)
// ---------------------------------------------------------------------------

export type DashboardContextValue = DashboardCoreContextValue & DashboardXPContextValue & DashboardUIContextValue

// Legacy interfaces kept for type compatibility
export type DashboardState = DashboardCoreState & DashboardXPState & DashboardUIState
export type DashboardActions = DashboardCoreActions & DashboardXPActions & DashboardUIActions

export interface DashboardHandlers {
  handleMathComplete: (
    nextProblem: MathProblem,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  handleMathCompleteV2: (
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  handleReadingComplete: (
    nextExercise: ReadingExercise | null,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  handleLogicXPEarned: (xp: number) => void
  handleClassicalXpChange: (subject: 'latin' | 'greek', delta: number) => void
  handleXpSpent: (subject: 'math' | 'reading', amount: number) => void
  handleToggleLogicExpand: () => void
  loadProblems: () => Promise<void>
  showNotification: (message: string) => void
  addXP: (amount: number, source?: 'math' | 'reading' | 'logic' | 'latin' | 'greek' | 'review' | 'challenge' | 'bonus' | 'focus-mode') => void
  subtractXP: (amount: number) => void
}
