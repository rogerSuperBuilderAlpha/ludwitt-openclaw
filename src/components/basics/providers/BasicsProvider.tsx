'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
} from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import {
  MathProblem,
  ReadingExercise,
  SubjectProgressDisplay,
} from '@/lib/types/basics'
import { logger } from '@/lib/logger'

// ============================================================================
// Types
// ============================================================================

interface XPState {
  dailyXP: number
  dailyGoal: number
  mathXP: number
  readingXP: number
  latinXP: number
  greekXP: number
  logicXP: number
  classicalXp: number // For word lookups
  // Time-ranged XP values (WTD = Week to Date from Monday, MTD = Month to Date)
  wtdXP: number // Week to Date (Mon-Sun)
  mtdXP: number // Month to Date
  ytdXP: number // Year to Date
  allTimeXP: number
}

interface ProblemsState {
  mathProblem: MathProblem | null
  readingExercise: ReadingExercise | null
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  isLoading: boolean
  error: string | null
}

interface UIState {
  focusMode: boolean
  sidePanelOpen: boolean
  showKeyboardHelp: boolean
  showKeyboardNudge: boolean
  currentSection: 'math' | 'reading' | 'latin' | 'greek' | 'logic' | null
}

interface BasicsContextValue {
  // User
  userId: string | undefined

  // XP State
  xp: XPState
  addXP: (
    subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic',
    amount: number
  ) => void
  spendXP: (subject: 'math' | 'reading', amount: number) => void

  // Problems State
  problems: ProblemsState
  setMathProblem: (problem: MathProblem | null) => void
  setReadingExercise: (exercise: ReadingExercise | null) => void
  setMathProgress: (progress: SubjectProgressDisplay | null) => void
  setReadingProgress: (progress: SubjectProgressDisplay | null) => void
  loadProblems: () => Promise<void>

  // UI State
  ui: UIState
  setFocusMode: (value: boolean) => void
  setSidePanelOpen: (value: boolean) => void
  setShowKeyboardHelp: (value: boolean) => void
  setShowKeyboardNudge: (value: boolean) => void
  setCurrentSection: (section: UIState['currentSection']) => void

  // Logic Module
  logicUnlocked: boolean
  logicExpanded: boolean
  setLogicExpanded: (value: boolean) => void

  // Daily Progress Tracking
  trackDailyProgress: (
    xp: number,
    mathProblems: number,
    readingProblems: number
  ) => void
}

// ============================================================================
// Context
// ============================================================================

const BasicsContext = createContext<BasicsContextValue | null>(null)

export function useBasics() {
  const context = useContext(BasicsContext)
  if (!context) {
    throw new Error('useBasics must be used within a BasicsProvider')
  }
  return context
}

// ============================================================================
// Provider
// ============================================================================

interface BasicsProviderProps {
  children: ReactNode
}

export function BasicsProvider({ children }: BasicsProviderProps) {
  const { user } = useAuth()
  const userId = user?.uid

  // ---------------------------------------------------------------------------
  // XP State
  // ---------------------------------------------------------------------------
  const [xpState, setXPState] = useState<XPState>({
    dailyXP: 0,
    dailyGoal: 1000,
    mathXP: 0,
    readingXP: 0,
    latinXP: 0,
    greekXP: 0,
    logicXP: 0,
    classicalXp: 100, // Starting XP for lookups
    wtdXP: 0, // Week to Date
    mtdXP: 0, // Month to Date
    ytdXP: 0,
    allTimeXP: 0,
  })

  const addXP = useCallback(
    (
      subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic',
      amount: number
    ) => {
      if (amount <= 0) return

      setXPState((prev) => {
        const updates: Partial<XPState> = {
          dailyXP: prev.dailyXP + amount,
        }

        switch (subject) {
          case 'math':
            updates.mathXP = prev.mathXP + amount
            break
          case 'reading':
            updates.readingXP = prev.readingXP + amount
            break
          case 'latin':
            updates.latinXP = prev.latinXP + amount
            updates.classicalXp = prev.classicalXp + amount
            break
          case 'greek':
            updates.greekXP = prev.greekXP + amount
            updates.classicalXp = prev.classicalXp + amount
            break
          case 'logic':
            updates.logicXP = prev.logicXP + amount
            break
        }

        return { ...prev, ...updates }
      })

      // Track for analytics
      if (userId) {
        trackDailyProgressInternal(
          userId,
          amount,
          subject === 'math' ? 1 : 0,
          subject === 'reading' ? 1 : 0
        )
      }
    },
    [userId]
  )

  const spendXP = useCallback((subject: 'math' | 'reading', amount: number) => {
    if (amount <= 0) return

    setXPState((prev) => {
      const updates: Partial<XPState> = {
        dailyXP: Math.max(0, prev.dailyXP - amount),
      }

      if (subject === 'math') {
        updates.mathXP = Math.max(0, prev.mathXP - amount)
      } else {
        updates.readingXP = Math.max(0, prev.readingXP - amount)
      }

      return { ...prev, ...updates }
    })
  }, [])

  // ---------------------------------------------------------------------------
  // Problems State
  // ---------------------------------------------------------------------------
  const [mathProblem, setMathProblem] = useState<MathProblem | null>(null)
  const [readingExercise, setReadingExercise] =
    useState<ReadingExercise | null>(null)
  const [mathProgress, setMathProgress] =
    useState<SubjectProgressDisplay | null>(null)
  const [readingProgress, setReadingProgress] =
    useState<SubjectProgressDisplay | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProblems = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/basics/current-problems', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        window.location.href = '/login?redirect=/&reason=session_expired'
        return
      }

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        const msg =
          result?.error || result?.message || 'Failed to load problems'
        setError(msg)
        return
      }

      if (result.success && result.data) {
        setMathProblem(result.data.mathProblem)
        setReadingExercise(result.data.readingExercise)
        setMathProgress(result.data.mathProgress)
        setReadingProgress(result.data.readingProgress)

        setXPState((prev) => ({
          ...prev,
          dailyXP: result.data.dailyXP || 0,
          dailyGoal: result.data.dailyGoal || 1000,
          wtdXP: result.data.wtdXP || 0, // Week to Date
          mtdXP: result.data.mtdXP || 0, // Month to Date
          ytdXP: result.data.ytdXP || 0,
          allTimeXP: result.data.allTimeXP || 0,
        }))
      } else {
        setError(result.error || 'Failed to load problems')
      }
    } catch (err) {
      logger.error('BasicsProvider', 'Failed to load problems', { error: err })
      setError('Failed to load problems. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const problems = useMemo<ProblemsState>(
    () => ({
      mathProblem,
      readingExercise,
      mathProgress,
      readingProgress,
      isLoading,
      error,
    }),
    [
      mathProblem,
      readingExercise,
      mathProgress,
      readingProgress,
      isLoading,
      error,
    ]
  )

  // ---------------------------------------------------------------------------
  // UI State
  // ---------------------------------------------------------------------------
  const [focusMode, setFocusMode] = useState(false)
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [showKeyboardNudge, setShowKeyboardNudge] = useState(false)
  const [currentSection, setCurrentSection] =
    useState<UIState['currentSection']>(null)

  const ui = useMemo<UIState>(
    () => ({
      focusMode,
      sidePanelOpen,
      showKeyboardHelp,
      showKeyboardNudge,
      currentSection,
    }),
    [
      focusMode,
      sidePanelOpen,
      showKeyboardHelp,
      showKeyboardNudge,
      currentSection,
    ]
  )

  // ---------------------------------------------------------------------------
  // Logic Module State
  // ---------------------------------------------------------------------------
  const [logicExpanded, setLogicExpandedState] = useState(false)
  const [logicUnlocked, setLogicUnlocked] = useState(false)

  const REQUIRED_GRADE = 12
  const mathGrade = Math.floor(mathProgress?.currentDifficulty || 1)
  const readingGrade = Math.floor(readingProgress?.currentDifficulty || 1)
  const isNaturallyUnlocked =
    mathGrade >= REQUIRED_GRADE && readingGrade >= REQUIRED_GRADE

  // Load logic state from localStorage
  useEffect(() => {
    if (!userId) return

    const savedExpanded = localStorage.getItem('logic_expanded')
    const savedSecret = localStorage.getItem(`logic_secret_unlocked_${userId}`)

    const isSecretUnlocked = savedSecret === 'true'
    const isUnlocked = isNaturallyUnlocked || isSecretUnlocked

    setLogicUnlocked(isUnlocked)

    if (savedExpanded === 'true' && isUnlocked) {
      setLogicExpandedState(true)
    }
  }, [userId, isNaturallyUnlocked])

  const setLogicExpanded = useCallback(
    (value: boolean) => {
      setLogicExpandedState(value)
      localStorage.setItem('logic_expanded', String(value))

      // Sync unlock state
      if (value && !logicUnlocked) {
        setLogicUnlocked(true)
      }
    },
    [logicUnlocked]
  )

  // ---------------------------------------------------------------------------
  // Daily Progress Tracking (internal)
  // ---------------------------------------------------------------------------
  const trackDailyProgressInternal = (
    userId: string,
    xp: number,
    mathProblems: number,
    readingProblems: number
  ) => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const saved = localStorage.getItem(`daily_history_${userId}`)
      const history = saved ? JSON.parse(saved) : []

      const todayIndex = history.findIndex(
        (d: { date: string }) => d.date === today
      )
      if (todayIndex >= 0) {
        history[todayIndex].mathXP =
          (history[todayIndex].mathXP || 0) + (mathProblems > 0 ? xp : 0)
        history[todayIndex].readingXP =
          (history[todayIndex].readingXP || 0) + (readingProblems > 0 ? xp : 0)
        history[todayIndex].problemsCompleted =
          (history[todayIndex].problemsCompleted || 0) +
          mathProblems +
          readingProblems
      } else {
        history.push({
          date: today,
          mathXP: mathProblems > 0 ? xp : 0,
          readingXP: readingProblems > 0 ? xp : 0,
          problemsCompleted: mathProblems + readingProblems,
        })
      }

      localStorage.setItem(
        `daily_history_${userId}`,
        JSON.stringify(history.slice(-30))
      )
    } catch (error) {
      // Silent fail for analytics
    }
  }

  const trackDailyProgress = useCallback(
    (xp: number, mathProblems: number, readingProblems: number) => {
      if (!userId) return
      trackDailyProgressInternal(userId, xp, mathProblems, readingProblems)
    },
    [userId]
  )

  // ---------------------------------------------------------------------------
  // Load problems on mount
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (user) {
      loadProblems()
    }
  }, [user, loadProblems])

  // ---------------------------------------------------------------------------
  // Context Value (memoized)
  // ---------------------------------------------------------------------------
  const value = useMemo<BasicsContextValue>(
    () => ({
      userId,
      xp: xpState,
      addXP,
      spendXP,
      problems,
      setMathProblem,
      setReadingExercise,
      setMathProgress,
      setReadingProgress,
      loadProblems,
      ui,
      setFocusMode,
      setSidePanelOpen,
      setShowKeyboardHelp,
      setShowKeyboardNudge,
      setCurrentSection,
      logicUnlocked,
      logicExpanded,
      setLogicExpanded,
      trackDailyProgress,
    }),
    [
      userId,
      xpState,
      addXP,
      spendXP,
      problems,
      loadProblems,
      ui,
      logicUnlocked,
      logicExpanded,
      setLogicExpanded,
      trackDailyProgress,
    ]
  )

  return (
    <BasicsContext.Provider value={value}>{children}</BasicsContext.Provider>
  )
}
