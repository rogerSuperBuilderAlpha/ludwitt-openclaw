'use client'

/**
 * useLogicProgress Hook
 * Manages logic module progress, state, and Firebase sync
 */

import { useState, useCallback, useEffect, useMemo } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import {
  LogicProblem,
  getProblemsForUnit,
  getAvailableUnits,
} from '@/data/basics/logic'
import { calculateLogicXP } from '@/lib/basics/xp-config'
import { logger } from '@/lib/logger'

// Threshold for considering a unit "mastered" (percentage of problems completed)
const UNIT_MASTERY_THRESHOLD = 80

interface UseLogicProgressOptions {
  userId?: string
  onXPEarned?: (xp: number) => void
}

interface AIFeedback {
  summary: string
  strengths: string[]
  improvements: string[]
  detailedExplanation: string
  correctAnswer?: string
  score: number
  grade: string
}

interface UseLogicProgressReturn {
  // State
  currentProblem: LogicProblem | null
  selectedUnit: number
  streak: number
  totalCompleted: number
  totalXP: number
  completedProblemIds: Set<string>
  unitProgress: Record<number, number>
  isLoading: boolean
  feedback: 'correct' | 'incorrect' | null
  aiFeedback: AIFeedback | null
  isGrading: boolean
  showHint: boolean
  userAnswer: string
  userReasoning: string
  availableUnits: ReturnType<typeof getAvailableUnits>

  // AI Lesson state
  showAILesson: boolean
  aiLesson: string | null
  isLoadingLesson: boolean
  lessonPurchased: boolean

  // Mastery
  isLogicMastered: boolean
  masteredUnitsCount: number
  totalUnitsCount: number

  // Actions
  setSelectedUnit: (unit: number) => void
  setShowHint: (show: boolean) => void
  setUserAnswer: (answer: string) => void
  setUserReasoning: (reasoning: string) => void
  handleSubmit: () => Promise<void>
  handleNext: () => void
  purchaseAILesson: () => Promise<void>
  getUnitCompletion: (unitId: number) => number
  getCurrentProblemIndex: () => number
  getUnitProblemCount: () => number
}

export function useLogicProgress({
  userId,
  onXPEarned,
}: UseLogicProgressOptions = {}): UseLogicProgressReturn {
  const fetchApi = useApiFetch()

  // Core state
  const [currentProblem, setCurrentProblem] = useState<LogicProblem | null>(
    () => {
      const problems = getProblemsForUnit(1)
      return problems.length > 0 ? problems[0] : null
    }
  )
  const [selectedUnit, setSelectedUnit] = useState(1)
  const [streak, setStreak] = useState(0)
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [totalXP, setTotalXP] = useState(0)
  const [completedProblemIds, setCompletedProblemIds] = useState<Set<string>>(
    new Set()
  )
  const [unitProgress, setUnitProgress] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Answer state
  const [userAnswer, setUserAnswer] = useState('')
  const [userReasoning, setUserReasoning] = useState('')
  const [showHint, setShowHint] = useState(false)

  // Feedback state
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null)
  const [isGrading, setIsGrading] = useState(false)

  // AI Lesson state
  const [showAILesson, setShowAILesson] = useState(false)
  const [aiLesson, setAiLesson] = useState<string | null>(null)
  const [isLoadingLesson, setIsLoadingLesson] = useState(false)
  const [lessonPurchased, setLessonPurchased] = useState(false)

  const [availableUnits] = useState(() => getAvailableUnits())

  // Calculate mastery status
  const { isLogicMastered, masteredUnitsCount } = useMemo(() => {
    const unitsWithProblems = availableUnits.filter(
      (unit) => getProblemsForUnit(unit.id).length > 0
    )

    let masteredCount = 0
    for (const unit of unitsWithProblems) {
      const problems = getProblemsForUnit(unit.id)
      const completed = problems.filter((p) =>
        completedProblemIds.has(p.id)
      ).length
      const completionRate =
        problems.length > 0 ? (completed / problems.length) * 100 : 0

      if (completionRate >= UNIT_MASTERY_THRESHOLD) {
        masteredCount++
      }
    }

    return {
      isLogicMastered:
        masteredCount >= unitsWithProblems.length &&
        unitsWithProblems.length > 0,
      masteredUnitsCount: masteredCount,
    }
  }, [availableUnits, completedProblemIds])

  const totalUnitsCount = availableUnits.length

  // Load progress from Firebase
  useEffect(() => {
    const loadProgress = async () => {
      if (!userId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetchApi('/api/basics/logic/progress')
        if (response?.progress) {
          const data = response.progress
          setStreak(data.streak || 0)
          setTotalCompleted(data.totalCompleted || 0)
          setTotalXP(data.totalXP || 0)
          if (data.completedIds) {
            setCompletedProblemIds(new Set(data.completedIds))
          }
          if (data.unitProgress) {
            setUnitProgress(data.unitProgress)
          }
          if (data.currentUnit) {
            setSelectedUnit(data.currentUnit)
          }
        } else {
          // Fallback to localStorage
          const saved = localStorage.getItem(`logic_progress_${userId}`)
          if (saved) {
            const data = JSON.parse(saved)
            setStreak(data.streak || 0)
            setTotalCompleted(data.totalCompleted || 0)
            setTotalXP(data.totalXP || 0)
            if (data.completedIds)
              setCompletedProblemIds(new Set(data.completedIds))
            if (data.unitProgress) setUnitProgress(data.unitProgress)
            if (data.currentUnit) setSelectedUnit(data.currentUnit)
          }
        }
      } catch {
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem(`logic_progress_${userId}`)
          if (saved) {
            const data = JSON.parse(saved)
            setStreak(data.streak || 0)
            setTotalCompleted(data.totalCompleted || 0)
            setTotalXP(data.totalXP || 0)
            if (data.completedIds)
              setCompletedProblemIds(new Set(data.completedIds))
            if (data.unitProgress) setUnitProgress(data.unitProgress)
            if (data.currentUnit) setSelectedUnit(data.currentUnit)
          }
        } catch {
          // Ignore
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [userId, fetchApi])

  // Save progress to Firebase
  const saveProgressToFirebase = useCallback(
    async (xpEarned: number) => {
      if (!userId) return

      try {
        await fetchApi('/api/basics/logic/progress', {
          method: 'POST',
          body: JSON.stringify({
            streak,
            totalCompleted,
            totalXP,
            currentUnit: selectedUnit,
            completedIds: Array.from(completedProblemIds),
            unitProgress,
            xpDelta: xpEarned,
          }),
        })

        // Also save to localStorage as backup
        const data = {
          streak,
          totalCompleted,
          totalXP,
          completedIds: Array.from(completedProblemIds),
          unitProgress,
          currentUnit: selectedUnit,
        }
        localStorage.setItem(`logic_progress_${userId}`, JSON.stringify(data))
      } catch {
        // Ignore
      }
    },
    [
      userId,
      fetchApi,
      streak,
      totalCompleted,
      totalXP,
      selectedUnit,
      completedProblemIds,
      unitProgress,
    ]
  )

  // Load problem for selected unit
  useEffect(() => {
    const problems = getProblemsForUnit(selectedUnit)
    const uncompletedProblems = problems.filter(
      (p) => !completedProblemIds.has(p.id)
    )
    if (uncompletedProblems.length > 0) {
      setCurrentProblem(uncompletedProblems[0])
    } else if (problems.length > 0) {
      setCurrentProblem(problems[0])
    }
    setFeedback(null)
    setShowHint(false)
    setUserAnswer('')
    setUserReasoning('')
    setAiFeedback(null)
  }, [selectedUnit, completedProblemIds])

  const calculateXPLocal = useCallback(
    (problem: LogicProblem, usedHint: boolean) => {
      return calculateLogicXP({
        difficulty: problem.difficulty,
        usedHint,
      })
    },
    []
  )

  const handleSubmit = useCallback(async () => {
    if (!currentProblem || !userAnswer.trim() || isGrading) return

    setIsGrading(true)
    setAiFeedback(null)

    try {
      const response = await fetchApi('/api/basics/ai-grade', {
        method: 'POST',
        body: JSON.stringify({
          subject: 'logic',
          question: {
            text: currentProblem.question,
            description: currentProblem.description,
            type: currentProblem.topic,
            difficulty: currentProblem.difficulty,
            options: currentProblem.options,
            correctAnswer: currentProblem.correctAnswer,
            hint: currentProblem.hint,
            explanation: currentProblem.explanation,
            context: `Unit ${currentProblem.unit}: ${currentProblem.unitName}. Sub-topic: ${currentProblem.subTopic || 'General'}`,
          },
          userAnswer: userAnswer.trim(),
          answerParts: userReasoning.trim()
            ? { reasoning: userReasoning.trim() }
            : undefined,
        }),
      })

      const isCorrect = response.isCorrect
      setFeedback(isCorrect ? 'correct' : 'incorrect')
      setAiFeedback({
        summary: response.feedback?.summary || '',
        strengths: response.feedback?.strengths || [],
        improvements: response.feedback?.improvements || [],
        detailedExplanation: response.feedback?.detailedExplanation || '',
        correctAnswer: response.feedback?.correctAnswer,
        score: response.score || 0,
        grade: response.grade || 'F',
      })

      const xpEarned = response.xpEarned || 0

      if (isCorrect || response.score >= 70) {
        setTotalXP((prev) => prev + xpEarned)
        setStreak((prev) => prev + 1)
        setTotalCompleted((prev) => prev + 1)
        setCompletedProblemIds((prev) => new Set([...prev, currentProblem.id]))
        setUnitProgress((prev) => ({
          ...prev,
          [selectedUnit]: (prev[selectedUnit] || 0) + 1,
        }))
        onXPEarned?.(xpEarned)
        saveProgressToFirebase(xpEarned)
      } else {
        setStreak(0)
      }
    } catch (error: unknown) {
      // Show specific error message - NEVER use local fallback
      logger.error('Uselogicprogress', 'Logic AI grading error', {
        error: error,
      })

      let errorMessage = 'Error grading your answer. Please try again.'
      const errorText = error instanceof Error ? error.message : String(error)

      if (
        errorText.includes('Insufficient credits') ||
        errorText.includes('INSUFFICIENT_CREDITS')
      ) {
        errorMessage =
          'Insufficient credits to grade this answer. Add credits to continue.'
      } else if (
        errorText.includes('Rate limit') ||
        errorText.includes('rate limit') ||
        errorText.includes('429')
      ) {
        errorMessage =
          'Too many requests. Please wait 30 seconds and try again.'
      } else if (
        errorText.includes('Unauthorized') ||
        errorText.includes('401')
      ) {
        errorMessage = 'Session expired. Please refresh the page.'
      } else if (
        errorText.includes('Service unavailable') ||
        errorText.includes('503')
      ) {
        errorMessage =
          'AI service is temporarily unavailable. Try again in a few minutes.'
      } else if (
        errorText.includes('Failed to grade') ||
        errorText.includes('500')
      ) {
        errorMessage = 'AI grading failed. Please try again.'
      }

      setFeedback('incorrect')
      setAiFeedback({
        summary: errorMessage,
        strengths: [],
        improvements: [
          'Check your internet connection',
          'Try submitting again',
        ],
        detailedExplanation: '',
        score: 0,
        grade: 'F',
      })
    } finally {
      setIsGrading(false)
    }
  }, [
    currentProblem,
    userAnswer,
    userReasoning,
    isGrading,
    fetchApi,
    selectedUnit,
    onXPEarned,
    saveProgressToFirebase,
  ])

  const handleNext = useCallback(() => {
    const problems = getProblemsForUnit(selectedUnit)
    const currentIndex = problems.findIndex((p) => p.id === currentProblem?.id)
    const nextIndex = (currentIndex + 1) % problems.length
    setCurrentProblem(problems[nextIndex])
    setFeedback(null)
    setShowHint(false)
    setUserAnswer('')
    setUserReasoning('')
    setAiFeedback(null)
    setShowAILesson(false)
    setAiLesson(null)
    setLessonPurchased(false)
  }, [selectedUnit, currentProblem])

  const purchaseAILesson = useCallback(async () => {
    if (!currentProblem || isLoadingLesson || lessonPurchased) return

    setIsLoadingLesson(true)
    setShowAILesson(true)

    try {
      const response = await fetchApi('/api/basics/ai-lesson', {
        method: 'POST',
        body: JSON.stringify({
          subject: 'logic',
          topic: currentProblem.topic,
          subTopic: currentProblem.subTopic,
          unitName: currentProblem.unitName,
          question: currentProblem.question,
          description: currentProblem.description,
          difficulty: currentProblem.difficulty,
          symbols: currentProblem.symbols,
        }),
      })

      if (response?.lesson) {
        setAiLesson(response.lesson)
        setLessonPurchased(true)
      } else {
        setAiLesson('Unable to generate lesson. Please try again.')
      }
    } catch {
      setAiLesson('Failed to load lesson. Please try again.')
    } finally {
      setIsLoadingLesson(false)
    }
  }, [currentProblem, isLoadingLesson, lessonPurchased, fetchApi])

  const getUnitCompletion = useCallback(
    (unitId: number) => {
      const problems = getProblemsForUnit(unitId)
      const completed = problems.filter((p) =>
        completedProblemIds.has(p.id)
      ).length
      return problems.length > 0
        ? Math.round((completed / problems.length) * 100)
        : 0
    },
    [completedProblemIds]
  )

  const getCurrentProblemIndex = useCallback(() => {
    const problems = getProblemsForUnit(selectedUnit)
    return problems.findIndex((p) => p.id === currentProblem?.id) + 1
  }, [selectedUnit, currentProblem])

  const getUnitProblemCount = useCallback(() => {
    return getProblemsForUnit(selectedUnit).length
  }, [selectedUnit])

  return {
    currentProblem,
    selectedUnit,
    streak,
    totalCompleted,
    totalXP,
    completedProblemIds,
    unitProgress,
    isLoading,
    feedback,
    aiFeedback,
    isGrading,
    showHint,
    userAnswer,
    userReasoning,
    availableUnits,
    showAILesson,
    aiLesson,
    isLoadingLesson,
    lessonPurchased,

    // Mastery
    isLogicMastered,
    masteredUnitsCount,
    totalUnitsCount,

    // Actions
    setSelectedUnit,
    setShowHint,
    setUserAnswer,
    setUserReasoning,
    handleSubmit,
    handleNext,
    purchaseAILesson,
    getUnitCompletion,
    getCurrentProblemIndex,
    getUnitProblemCount,
  }
}
