import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { logger } from '@/lib/logger'
import type { SubjectProgressDisplay } from '@/lib/types/basics'

const QUESTIONS_PER_SRS_TRIGGER = 20

export interface ReviewItem {
  id: string
  type: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  problemId: string
  question: string
  correctAnswer: string | string[]
  userAnswer?: string | string[]
  lastReviewed: number
  nextReview: number
  interval: number
  easeFactor: number
  repetitionCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subTopic?: string
  hint?: string
  explanation: string
}

export interface ReviewSession {
  items: ReviewItem[]
  currentIndex: number
  correctCount: number
  incorrectCount: number
  startTime: number
  completed: boolean
}

interface RecentProblem {
  id: string
  question: string
  topic: string
  difficulty: number
  correct: boolean
  userAnswer: string
  correctAnswer: string
}

interface UseSpacedRepetitionOptions {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP: number
  greekXP: number
  logicXP: number
  onReviewComplete: (item: ReviewItem, correct: boolean) => void
  onCreditsUsed?: (cost: number, newBalance: number) => void
  recentProblems: RecentProblem[]
}

export function useSpacedRepetition({
  mathProgress,
  readingProgress,
  latinXP,
  greekXP,
  logicXP,
  onReviewComplete,
  onCreditsUsed,
  recentProblems,
}: UseSpacedRepetitionOptions) {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([])
  const [currentSession, setCurrentSession] = useState<ReviewSession | null>(
    null
  )
  const [showReviewPanel, setShowReviewPanel] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)

  const latinExercises = Math.floor(latinXP / 20)
  const greekExercises = Math.floor(greekXP / 20)
  const logicExercises = Math.floor(logicXP / 25)

  const totalCompleted = useMemo(() => {
    return (
      (mathProgress?.totalCompleted || 0) +
      (readingProgress?.totalCompleted || 0) +
      latinExercises +
      greekExercises +
      logicExercises
    )
  }, [
    mathProgress?.totalCompleted,
    readingProgress?.totalCompleted,
    latinExercises,
    greekExercises,
    logicExercises,
  ])

  const progressToNextSRS = useMemo(() => {
    const completedSessions = Math.floor(
      totalCompleted / QUESTIONS_PER_SRS_TRIGGER
    )
    const progressInCurrentCycle =
      totalCompleted - completedSessions * QUESTIONS_PER_SRS_TRIGGER
    const justReachedMilestone =
      totalCompleted > 0 && totalCompleted % QUESTIONS_PER_SRS_TRIGGER === 0

    return {
      current: justReachedMilestone
        ? QUESTIONS_PER_SRS_TRIGGER
        : progressInCurrentCycle,
      target: QUESTIONS_PER_SRS_TRIGGER,
      percentage: justReachedMilestone
        ? 100
        : Math.round(
            (progressInCurrentCycle / QUESTIONS_PER_SRS_TRIGGER) * 100
          ),
      isReady: justReachedMilestone,
      totalCompleted,
      sessionsCompleted: completedSessions,
    }
  }, [totalCompleted])

  // Helper to start session with given questions
  const startSessionWithQuestions = useCallback((questions: ReviewItem[]) => {
    const session: ReviewSession = {
      items: questions,
      currentIndex: 0,
      correctCount: 0,
      incorrectCount: 0,
      startTime: Date.now(),
      completed: false,
    }

    setReviewItems(questions)
    setCurrentSession(session)
    setIsReviewing(true)
    setIsGenerating(false)
  }, [])

  const startSessionWithQuestionsRef = useRef(startSessionWithQuestions)
  startSessionWithQuestionsRef.current = startSessionWithQuestions

  const handleStartSRSSession = useCallback(async () => {
    if (isGenerating) return

    if (totalCompleted < QUESTIONS_PER_SRS_TRIGGER) {
      return
    }

    if (recentProblems.length < 5) {
      setGenerationError(
        `Need at least 5 recent problems to generate reviews. You have ${recentProblems.length}.`
      )
      setShowReviewPanel(true)
      return
    }

    setIsGenerating(true)
    setShowReviewPanel(true)
    setGenerationError(null)

    try {
      const response = await fetch('/api/basics/generate-review-problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recentProblems: recentProblems.slice(0, 20),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.code === 'INSUFFICIENT_CREDITS') {
          setGenerationError(
            'Insufficient credits. Please add funds to continue.'
          )
          setIsGenerating(false)
          return
        }
        throw new Error(data.error || 'Failed to generate review problems')
      }

      if (onCreditsUsed && data.costCharged !== undefined) {
        onCreditsUsed(data.costCharged, data.newBalance)
      }

      const reviewQuestions: ReviewItem[] = data.problems.map(
        (p: Record<string, unknown>) => ({
          id: p.id as string,
          type: 'math' as const,
          problemId: p.id as string,
          question: p.question as string,
          correctAnswer: p.correctAnswer as string,
          lastReviewed: Date.now(),
          nextReview: Date.now(),
          interval: 1,
          easeFactor: 2.5,
          repetitionCount: 0,
          difficulty:
            (p.difficulty as number) <= 3
              ? 'easy'
              : (p.difficulty as number) <= 6
                ? 'medium'
                : ('hard' as const),
          topic: p.topic as string,
          hint: p.hint as string | undefined,
          explanation: p.explanation as string,
        })
      )

      startSessionWithQuestionsRef.current(reviewQuestions)
    } catch (error) {
      logger.error(
        'SpacedRepetitionSystem',
        'Failed to generate review questions',
        { error }
      )
      setGenerationError(
        error instanceof Error
          ? error.message
          : 'Failed to generate questions. Please try again.'
      )
      setIsGenerating(false)
    }
  }, [isGenerating, recentProblems, onCreditsUsed, totalCompleted])

  const handleReviewAnswer = useCallback(
    (correct: boolean) => {
      if (!currentSession) return

      const currentItem = currentSession.items[currentSession.currentIndex]

      const updatedSession = {
        ...currentSession,
        correctCount: currentSession.correctCount + (correct ? 1 : 0),
        incorrectCount: currentSession.incorrectCount + (correct ? 0 : 1),
        currentIndex: currentSession.currentIndex + 1,
      }

      if (updatedSession.currentIndex >= currentSession.items.length) {
        updatedSession.completed = true
      }

      setCurrentSession(updatedSession)
      onReviewComplete(currentItem, correct)
      setCurrentAnswer('')
    },
    [currentSession, onReviewComplete]
  )

  const currentReviewItem = useMemo(() => {
    return currentSession?.items[currentSession.currentIndex] || null
  }, [currentSession])

  const checkAnswer = useCallback(() => {
    if (!currentReviewItem) return

    let correct = false

    if (currentReviewItem.type === 'math') {
      const userAns = currentAnswer.trim().toLowerCase().replace(/\s+/g, '')
      const correctAns = String(currentReviewItem.correctAnswer)
        .toLowerCase()
        .replace(/\s+/g, '')
      correct = userAns === correctAns
    } else {
      const userAns = currentAnswer.trim().toLowerCase()
      const correctAns = Array.isArray(currentReviewItem.correctAnswer)
        ? currentReviewItem.correctAnswer.join(' ').toLowerCase()
        : String(currentReviewItem.correctAnswer).toLowerCase()
      correct = correctAns.includes(userAns) || userAns.includes(correctAns)
    }

    handleReviewAnswer(correct)
  }, [currentReviewItem, currentAnswer, handleReviewAnswer])

  const canStartReview =
    totalCompleted >= QUESTIONS_PER_SRS_TRIGGER && recentProblems.length >= 5
  const questionsRemaining =
    QUESTIONS_PER_SRS_TRIGGER - progressToNextSRS.current

  const closeReviewSession = useCallback(() => {
    setShowReviewPanel(false)
    setIsReviewing(false)
    setCurrentSession(null)
  }, [])

  return {
    // State
    currentSession,
    showReviewPanel,
    isReviewing,
    currentAnswer,
    setCurrentAnswer,
    isGenerating,
    generationError,
    setGenerationError,
    reviewItems,

    // Computed
    totalCompleted,
    progressToNextSRS,
    currentReviewItem,
    canStartReview,
    questionsRemaining,
    questionsPerTrigger: QUESTIONS_PER_SRS_TRIGGER,

    // Actions
    handleStartSRSSession,
    handleReviewAnswer,
    checkAnswer,
    closeReviewSession,
  }
}
