'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardCore, useDashboardXP, useDashboardUI } from '../DashboardContext'
import { useNotification } from '@/components/ui/NotificationProvider'
import { useWorkTimer } from '@/lib/hooks/useWorkTimer'
import { useBasicsAchievements } from '@/lib/hooks/useBasicsAchievements'
import { usePowerUps } from '@/lib/hooks/usePowerUps'
import { useRecentProblems } from '@/lib/hooks/useRecentProblems'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { MathProblem, ReadingExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { DashboardHandlers } from '../types'
import { XPSource } from '@/lib/basics/xp-service'
import { logger } from '@/lib/logger'

// Sources that are already saved by their API routes - don't double-save
// Defined outside component to avoid useCallback dependency issues
const API_SAVED_SOURCES: XPSource[] = ['math', 'reading', 'logic', 'latin', 'greek']

export function useDashboardState(): DashboardHandlers {
  const router = useRouter()

  const {
    user, mathProblem, readingExercise,
    mathProgress, readingProgress,
    problemStartTimeRef,
    setMathProblem, setReadingExercise,
    setMathProgress, setReadingProgress,
    setMathProblemsSeen,
    setIsLoading, setError, setRetryIn,
  } = useDashboardCore()

  const {
    latinXP, greekXP, logicXP,
    setDailyXP, setDailyGoal,
    setWtdXP, setMtdXP, setYtdXP, setAllTimeXP,
    setLatinXP, setGreekXP, setLogicXP,
  } = useDashboardXP()

  const {
    setShowReviewsModal, setLogicExpanded, setLogicUnlocked,
    setShowFirstProblemCelebration, setFirstProblemXP,
  } = useDashboardUI()

  const workTimer = useWorkTimer(user?.uid)
  const logicInitializedRef = useRef(false)
  const firstProblemCelebrationShownRef = useRef(false)

  const { showNotification } = useNotification()

  const achievements = useBasicsAchievements({
    userName: user?.displayName || user?.email?.split('@')[0] || 'Student',
    streakProtected: false,
    onStreakProtected: (subject) => showNotification(`🛡️ Streak Protected! Your ${subject} streak is safe.`)
  })

  const powerUps = usePowerUps({
    onNotification: showNotification
  })

  const recentProblems = useRecentProblems({
    userId: user?.uid,
    onSRSTrigger: () => setShowReviewsModal(true)
  })

  const fetchApi = useApiFetch()

  // Helper to add XP to all time-ranged values (daily, WTD, MTD, YTD, AllTime)
  // For sources not already saved by API routes, also persists to server with history tracking
  const addXP = useCallback((amount: number, source: XPSource = 'bonus') => {
    if (amount <= 0) return
    setDailyXP(prev => prev + amount)
    setWtdXP(prev => prev + amount)
    setMtdXP(prev => prev + amount)
    setYtdXP(prev => prev + amount)
    setAllTimeXP(prev => prev + amount)

    // Only persist to server if the source is NOT already handled by its API route
    // (math, reading, logic, latin, greek are saved by their check-answer/progress routes)
    if (!API_SAVED_SOURCES.includes(source)) {
      fetchApi('/api/basics/xp/award', {
        method: 'POST',
        body: JSON.stringify({
          source,
          baseXP: amount,
          costsIncurred: 0
        })
      }).catch(err => {
        logger.error('useDashboardState', 'Failed to persist XP to server', { error: err })
      })
    }
  }, [setDailyXP, setWtdXP, setMtdXP, setYtdXP, setAllTimeXP, fetchApi])

  // Helper to subtract XP from all time-ranged values
  const subtractXP = useCallback((amount: number) => {
    if (amount <= 0) return
    setDailyXP(prev => Math.max(0, prev - amount))
    setWtdXP(prev => Math.max(0, prev - amount))
    setMtdXP(prev => Math.max(0, prev - amount))
    setYtdXP(prev => Math.max(0, prev - amount))
    setAllTimeXP(prev => Math.max(0, prev - amount))
  }, [setDailyXP, setWtdXP, setMtdXP, setYtdXP, setAllTimeXP])

  // Load problems from API
  const loadProblems = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)
    setRetryIn(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/basics/current-problems', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.status === 401) {
        router.push('/login?redirect=/&reason=session_expired')
        return
      }

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        setError(result?.error || result?.message || 'Failed to load problems')
        return
      }

      if (result.success && result.data) {
        setMathProblem(result.data.mathProblem)
        setReadingExercise(result.data.readingExercise)
        setMathProgress(result.data.mathProgress)
        setReadingProgress(result.data.readingProgress)
        setDailyXP(result.data.dailyXP || 0)
        setDailyGoal(result.data.dailyGoal || 1000)

        // Load problems the user has already seen (from Firebase)
        if (result.data.mathProblemsSeen) {
          setMathProblemsSeen(result.data.mathProblemsSeen)
        }

        // Load time-ranged XP values (WTD = Week to Date, MTD = Month to Date)
        if (result.data.wtdXP !== undefined) setWtdXP(result.data.wtdXP)
        if (result.data.mtdXP !== undefined) setMtdXP(result.data.mtdXP)
        if (result.data.ytdXP !== undefined) setYtdXP(result.data.ytdXP)
        if (result.data.allTimeXP !== undefined) setAllTimeXP(result.data.allTimeXP)

        // Load Latin, Greek, and Logic XP from Firebase
        if (result.data.latinXP !== undefined) setLatinXP(result.data.latinXP)
        if (result.data.greekXP !== undefined) setGreekXP(result.data.greekXP)
        if (result.data.logicXP !== undefined) setLogicXP(result.data.logicXP)

        problemStartTimeRef.current = { math: Date.now(), reading: Date.now() }
      }
    } catch (err) {
      setError('Failed to load problems. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [user, router, setIsLoading, setError, setRetryIn, setMathProblem, setReadingExercise, setMathProgress, setReadingProgress, setMathProblemsSeen, setDailyXP, setDailyGoal, setWtdXP, setMtdXP, setYtdXP, setAllTimeXP, setLatinXP, setGreekXP, setLogicXP, problemStartTimeRef])

  // Handle math problem completion
  const handleMathComplete = useCallback((
    nextProblem: MathProblem,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => {
    if (!nextProblem?.id) {
      loadProblems()
      return
    }

    const wasCorrect = xpEarned && xpEarned > 0

    // Track for work timer
    if (problemStartTimeRef.current.math) {
      const timeSpent = (Date.now() - problemStartTimeRef.current.math) / 1000
      workTimer.trackProblemComplete(!!wasCorrect, timeSpent)
    }

    // Add to recent problems
    if (mathProblem) {
      recentProblems.addProblem({
        id: mathProblem.id,
        question: mathProblem.question,
        topic: mathProblem.topic,
        difficulty: mathProblem.difficulty,
        correct: !!wasCorrect,
        userAnswer: userAnswer || '',
        correctAnswer: String(mathProblem.correctAnswer)
      })
    }

    setMathProblem(nextProblem)
    problemStartTimeRef.current.math = Date.now()
    achievements.checkForAchievements('math', mathProgress, updatedProgress)
    setMathProgress(updatedProgress)

    if (xpEarned) {
      const multipliedXP = powerUps.calculateXP(xpEarned)
      addXP(multipliedXP, 'math') // 'math' source won't double-persist to API
      
      // Check if this is the user's first problem ever (celebrate!)
      const previousTotal = (mathProgress?.totalCompleted || 0)
      if (previousTotal === 0 && !firstProblemCelebrationShownRef.current) {
        firstProblemCelebrationShownRef.current = true
        setFirstProblemXP(multipliedXP)
        setTimeout(() => setShowFirstProblemCelebration(true), 500) // Slight delay for feedback
      }
    }
  }, [mathProblem, mathProgress, loadProblems, workTimer, recentProblems, achievements, powerUps, setMathProblem, setMathProgress, addXP, problemStartTimeRef, setFirstProblemXP, setShowFirstProblemCelebration])

  // Handle V2 math problem completion (V2-only mode)
  const handleMathCompleteV2 = useCallback((
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    _userAnswer?: string
  ) => {
    const wasCorrect = xpEarned && xpEarned > 0

    // Track for work timer
    if (problemStartTimeRef.current.math) {
      const timeSpent = (Date.now() - problemStartTimeRef.current.math) / 1000
      workTimer.trackProblemComplete(!!wasCorrect, timeSpent)
    }

    problemStartTimeRef.current.math = Date.now()
    achievements.checkForAchievements('math', mathProgress, updatedProgress)
    setMathProgress(updatedProgress)

    if (xpEarned) {
      const multipliedXP = powerUps.calculateXP(xpEarned)
      addXP(multipliedXP, 'math')
    }
  }, [mathProgress, workTimer, achievements, powerUps, setMathProgress, addXP, problemStartTimeRef])

  // Handle reading exercise completion
  const handleReadingComplete = useCallback((
    nextExercise: ReadingExercise | null,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => {
    if (!nextExercise?.id) {
      loadProblems()
      return
    }

    const wasCorrect = xpEarned && xpEarned > 0

    if (problemStartTimeRef.current.reading) {
      const timeSpent = (Date.now() - problemStartTimeRef.current.reading) / 1000
      workTimer.trackProblemComplete(!!wasCorrect, timeSpent)
    }

    if (readingExercise?.questions?.[0]) {
      recentProblems.addProblem({
        id: readingExercise.id,
        question: readingExercise.questions[0].question || readingExercise.passage?.slice(0, 100) || '',
        topic: readingExercise.type || 'Reading',
        difficulty: readingExercise.difficulty,
        correct: !!wasCorrect,
        userAnswer: userAnswer || '',
        correctAnswer: String(readingExercise.questions[0].correctAnswer || '')
      })
    }

    setReadingExercise(nextExercise)
    problemStartTimeRef.current.reading = Date.now()
    achievements.checkForAchievements('reading', readingProgress, updatedProgress)
    setReadingProgress(updatedProgress)

    if (xpEarned) {
      const multipliedXP = powerUps.calculateXP(xpEarned)
      addXP(multipliedXP, 'reading') // 'reading' source won't double-persist to API
      
      // Check if this is the user's first problem ever (celebrate!)
      const previousTotal = (readingProgress?.totalCompleted || 0)
      if (previousTotal === 0 && !firstProblemCelebrationShownRef.current) {
        firstProblemCelebrationShownRef.current = true
        setFirstProblemXP(multipliedXP)
        setTimeout(() => setShowFirstProblemCelebration(true), 500) // Slight delay for feedback
      }
    }
  }, [readingExercise, readingProgress, loadProblems, workTimer, recentProblems, achievements, powerUps, setReadingExercise, setReadingProgress, addXP, problemStartTimeRef, setFirstProblemXP, setShowFirstProblemCelebration])

  // Handle logic XP earned
  const handleLogicXPEarned = useCallback((xp: number) => {
    addXP(xp, 'logic') // 'logic' source won't double-persist to API
    setLogicXP(prev => prev + xp)
  }, [addXP, setLogicXP])

  // Handle classical language XP change
  const handleClassicalXpChange = useCallback((subject: 'latin' | 'greek', delta: number) => {
    if (delta > 0) {
      addXP(delta, subject) // 'latin'/'greek' source won't double-persist to API
      if (subject === 'latin') {
        setLatinXP(prev => prev + delta)
      } else {
        setGreekXP(prev => prev + delta)
      }
    }
  }, [addXP, setLatinXP, setGreekXP])

  // Handle XP spent on power-ups
  const handleXpSpent = useCallback((subject: 'math' | 'reading', amount: number) => {
    if (amount <= 0) return
    subtractXP(amount)
    if (subject === 'math') {
      setMathProgress(prev => prev ? { ...prev, totalXP: Math.max(0, prev.totalXP - amount) } : prev)
    } else {
      setReadingProgress(prev => prev ? { ...prev, totalXP: Math.max(0, prev.totalXP - amount) } : prev)
    }
  }, [subtractXP, setMathProgress, setReadingProgress])

  // Handle logic module expand/collapse
  const handleToggleLogicExpand = useCallback(() => {
    setLogicExpanded(prev => {
      const newValue = !prev
      localStorage.setItem('logic_expanded', String(newValue))
      if (newValue) {
        setLogicUnlocked(true)
      }
      return newValue
    })
  }, [setLogicExpanded, setLogicUnlocked])

  // Initialize logic state from localStorage
  useEffect(() => {
    if (!user?.uid || logicInitializedRef.current) return
    logicInitializedRef.current = true

    const savedSecret = localStorage.getItem(`logic_secret_unlocked_${user.uid}`)
    const isSecretUnlocked = savedSecret === 'true'

    const mathGrade = Math.floor(mathProgress?.currentDifficulty || 1)
    const readingGrade = Math.floor(readingProgress?.currentDifficulty || 1)
    const isNaturallyUnlocked = mathGrade >= 12 && readingGrade >= 12

    if (isSecretUnlocked || isNaturallyUnlocked) {
      setLogicUnlocked(true)
    }
  }, [user?.uid, mathProgress, readingProgress, setLogicUnlocked])

  return {
    handleMathComplete,
    handleMathCompleteV2,
    handleReadingComplete,
    handleLogicXPEarned,
    handleClassicalXpChange,
    handleXpSpent,
    handleToggleLogicExpand,
    loadProblems,
    showNotification,
    addXP,
    subtractXP,
  }
}
