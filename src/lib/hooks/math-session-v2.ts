'use client'

/**
 * useMathProblemSessionV2 Hook
 * 
 * Extended session hook for MathProblemV2 format with:
 * - V2 answer validation using expression parser
 * - Progressive hints tracking
 * - Step-by-step solution display
 * - Enhanced feedback with common mistake detection
 * 
 * Composes with existing session hooks for shared functionality.
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import { MathProblemV2, HintLevel } from '@/lib/types/math-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { EngagementState } from '@/lib/hooks/useEngagementTracking'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useRequireAuth } from '@/lib/hooks/useRequireAuth'
import { 
  validateAnswer, 
  ValidationResult as AnswerValidationResult 
} from '@/lib/math-v2/answer-validation'
import { XP_COSTS } from '@/lib/basics/xp-config'
import { useTelemetryCollector } from '@/lib/telemetry/collector'
import { useStruggleDetection } from '@/lib/hooks/useStruggleDetection'
import { useTransferChallenge } from '@/lib/hooks/useTransferChallenge'
import { useMisconceptionDetection } from '@/lib/hooks/useMisconceptionDetection'
import { logger } from '@/lib/logger'

// Re-export relevant constants
export const SKIP_XP_COST = XP_COSTS.SKIP_PROBLEM
export const SPACED_REPETITION_INTERVAL = 20

// ============================================================================
// Types
// ============================================================================

export interface RecentProblemV2 {
  id: string
  question: string
  topic: string
  difficulty: number
  correct: boolean
  userAnswer: string
  correctAnswer: string
}

export interface FeedbackV2 {
  correct: boolean
  message: string
  explanation: string
  xpEarned: number
  isConnectionError?: boolean
  errorType?: 'connection' | 'ai_unavailable' | 'unknown'
  /** Spaced repetition schedule message for visibility */
  reviewScheduleMessage?: {
    conceptId: string
    conceptName: string
    subject: string
    nextReviewDate: string
    daysUntilReview: number
    message: string
    isFirstReview: boolean
  }
}

export interface WorkBonusV2 {
  bonus: number
  feedback?: string
  improvements?: string[]
  whatWentWell?: string
}

export interface NextProblemDataV2 {
  problem: MathProblemV2
  progress: SubjectProgressDisplay
  xp: number
}

export interface UseMathProblemSessionV2Props {
  problem: MathProblemV2 | null
  progress: SubjectProgressDisplay | null
  engagement: EngagementState
  onProblemComplete: (
    nextProblem: MathProblemV2, 
    updatedProgress: SubjectProgressDisplay, 
    xpEarned?: number
  ) => void
  onSkip: () => void
  onXpSpent?: (amount: number) => void
}

// ============================================================================
// XP Calculation
// ============================================================================

const HINT_XP_COSTS: Record<HintLevel, number> = {
  gentle: 5,
  moderate: 10,
  explicit: 20,
}

function calculateXpReduction(hintsUsed: HintLevel[]): number {
  return hintsUsed.reduce((total, level) => total + HINT_XP_COSTS[level], 0)
}

function calculateBaseXp(difficulty: number, _engagement: EngagementState): number {
  const baseXp = Math.round(10 + difficulty * 2)
  // Removed streak bonus - not available in EngagementState
  return baseXp
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useMathProblemSessionV2({
  problem,
  progress,
  engagement,
  onProblemComplete,
  onSkip,
  onXpSpent
}: UseMathProblemSessionV2Props) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { requireAuth } = useRequireAuth()

  // Track start time for session duration
  const sessionStartRef = useRef<number>(Date.now())

  // ========== Core State ==========
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackV2 | null>(null)
  const [validationResult, setValidationResult] = useState<AnswerValidationResult | null>(null)
  const [incorrectAttempts, setIncorrectAttempts] = useState(0)

  // ========== Hints State ==========
  const [hintsUsed, setHintsUsed] = useState<HintLevel[]>([])

  // ========== Work Section State ==========
  const [workShown, setWorkShown] = useState('')
  const [showWorkSection, setShowWorkSection] = useState(false)
  const [workBonus, setWorkBonus] = useState<WorkBonusV2 | null>(null)

  // ========== Problem Navigation ==========
  const [nextProblemData, setNextProblemData] = useState<NextProblemDataV2 | null>(null)
  const [lastProblem, setLastProblem] = useState<MathProblemV2 | null>(null)
  const [showLastProblem, setShowLastProblem] = useState(false)

  // ========== Skip State ==========
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)

  // ========== Help Toolbar State ==========
  const [purchasedHint, setPurchasedHint] = useState<string | null>(null)
  const [hintPurchased, setHintPurchased] = useState(false)
  const [aiTutorUsed, setAiTutorUsed] = useState(false)
  const [showAIExplanation, setShowAIExplanation] = useState(false)

  // ========== Study Panel State ==========
  const [showStudyPanel, setShowStudyPanel] = useState(false)
  const [unlockedUnits, setUnlockedUnits] = useState<string[]>([])
  const [userXp, setUserXp] = useState(0)

  // ========== Spaced Repetition ==========
  const [recentProblems, setRecentProblems] = useState<RecentProblemV2[]>([])
  const [showSpacedRepetition, setShowSpacedRepetition] = useState(false)
  const [problemCount, setProblemCount] = useState(0)

  // ========== Alternate Explanation ==========
  const [alternateExplanation, setAlternateExplanation] = useState<string | null>(null)
  const [loadingAlternate, setLoadingAlternate] = useState(false)

  // ========== Cost Tracking ==========
  const [costsIncurred, setCostsIncurred] = useState(0)

  // ========== Telemetry ==========
  const telemetry = useTelemetryCollector({
    problemId: problem?.id || 'unknown',
    userId: user?.uid || 'anonymous',
    subject: 'math',
    difficulty: problem?.difficulty || 5,
    skills: problem?.pedagogy.skills || [],
    getToken: user ? () => user.getIdToken() : undefined
  })
  
  // ========== Struggle Detection ==========
  const struggleDetection = useStruggleDetection({
    problemId: problem?.id || 'unknown',
    subject: 'math',
    difficulty: problem?.difficulty || 5,
    problemType: problem?.type,
    problemText: problem?.question.text,
    getCurrentSignals: telemetry.getCurrentSignals,
    pollIntervalMs: 10000,
    enabled: !!problem && !feedback
  })
  
  // ========== Transfer Challenges ==========
  const transferChallenge = useTransferChallenge()
  
  // ========== Misconception Detection ==========
  const misconceptionDetection = useMisconceptionDetection({ subject: 'math' })

  // ========== Reset on problem change ==========
  useEffect(() => {
    if (problem) {
      setAnswer('')
      setFeedback(null)
      setValidationResult(null)
      setIncorrectAttempts(0)
      setHintsUsed([])
      setWorkShown('')
      setShowWorkSection(false)
      setWorkBonus(null)
      setNextProblemData(null)
      setShowSkipConfirm(false)
      setPurchasedHint(null)
      setHintPurchased(false)
      setAiTutorUsed(false)
      setShowAIExplanation(false)
      setAlternateExplanation(null)
      setCostsIncurred(0)
      // Reset telemetry for new problem
      telemetry.start()
      sessionStartRef.current = Date.now()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem?.id])

  // ========== Handlers ==========

  const addCost = useCallback((amount: number) => {
    setCostsIncurred(prev => prev + amount)
  }, [])

  const handleHintReveal = useCallback((level: HintLevel) => {
    if (!hintsUsed.includes(level)) {
      setHintsUsed(prev => [...prev, level])
      addCost(HINT_XP_COSTS[level])
      // Track hint request in telemetry
      telemetry.trackHintRequest()
    }
  }, [hintsUsed, addCost, telemetry])

  const handleSubmit = useCallback(async () => {
    if (!problem || !user || !answer.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      const correctAnswer = String(problem.answer.correct)
      const token = await user.getIdToken()
      
      // ALWAYS use AI grading for accurate evaluation
      const aiResponse = await fetch('/api/basics/ai-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: 'math',
          question: {
            text: problem.question.text,
            type: problem.type,
            difficulty: problem.difficulty,
            topic: problem.pedagogy.topic,
            correctAnswer: correctAnswer
          },
          userAnswer: answer.trim(),
          timeTaken: Math.round((Date.now() - sessionStartRef.current) / 1000)
        })
      })
      
      const aiResult = await aiResponse.json()
      
      if (!aiResponse.ok) {
        // Extract specific error message
        const errorText = aiResult.error || aiResult.message || ''
        let errorMessage = 'Error grading your answer. Please try again.'
        let errorType: 'connection' | 'ai_unavailable' | 'unknown' = 'unknown'
        
        if (errorText.includes('Insufficient credits') || errorText.includes('INSUFFICIENT_CREDITS')) {
          errorMessage = 'Insufficient credits to grade this answer. Add credits to continue.'
          errorType = 'ai_unavailable'
        } else if (errorText.includes('Rate limit') || errorText.includes('rate limit') || aiResponse.status === 429) {
          errorMessage = 'Too many requests. Please wait 30 seconds and try again.'
          errorType = 'ai_unavailable'
        } else if (aiResponse.status === 401) {
          errorMessage = 'Session expired. Please refresh the page.'
          errorType = 'connection'
        } else if (aiResponse.status === 503) {
          errorMessage = 'AI service is temporarily unavailable. Try again in a few minutes.'
          errorType = 'ai_unavailable'
        } else if (aiResponse.status === 500) {
          errorMessage = 'AI grading failed. Please try again.'
          errorType = 'ai_unavailable'
        }
        
        setFeedback({
          correct: false,
          message: errorMessage,
          explanation: '',
          xpEarned: 0,
          isConnectionError: true,
          errorType,
        })
        return
      }
      
      const gradeData = aiResult.data || aiResult
      const isCorrect = gradeData.isCorrect
      const aiXpEarned = gradeData.xpEarned || 0
      
      // Also run local validation for the validation result state
      const localValidation = validateAnswer(answer, correctAnswer, {
        precision: problem.answer.tolerance || 1e-9,
        allowEquivalent: true,
        includeDebug: false,
      })
      setValidationResult(localValidation)
      
      // Flush telemetry with outcome
      const attemptNumber = incorrectAttempts + 1
      telemetry.flush({
        correct: isCorrect,
        finalAnswer: answer,
        attemptCount: attemptNumber,
        skipped: false,
        timeToCorrectMs: isCorrect ? Date.now() - sessionStartRef.current : undefined
      }).catch(err => logger.error('MathSessionV2', 'Telemetry flush error', { error: err }))

      // Calculate XP based on AI result
      const hintReduction = calculateXpReduction(hintsUsed)
      const aiReduction = aiTutorUsed ? 10 : 0
      let xpEarned = Math.max(0, aiXpEarned - hintReduction - aiReduction - costsIncurred)

      // Work bonus calculation
      let workBonusValue: WorkBonusV2 | null = null
      if (workShown.trim().length > 20 && isCorrect) {
        const baseXp = calculateBaseXp(problem.difficulty, engagement)
        const bonus = Math.round(baseXp * 0.2)
        workBonusValue = {
          bonus,
          feedback: 'Great job showing your work!',
        }
        xpEarned += bonus
      }
      setWorkBonus(workBonusValue)
      
      // Get AI feedback details
      const aiFeedback = gradeData.feedback || {}

      // Set feedback based on AI validation
      if (isCorrect) {
        setFeedback({
          correct: true,
          message: aiFeedback.summary || 'Correct! Well done!',
          explanation: aiFeedback.detailedExplanation || problem.solution.steps[0]?.description || 'Great work!',
          xpEarned,
        })

        // Save last problem
        setLastProblem(problem)

        // Track for spaced repetition
        setRecentProblems(prev => {
          const newEntry: RecentProblemV2 = {
            id: problem.id,
            question: problem.question.text,
            topic: problem.pedagogy.topic,
            difficulty: problem.difficulty,
            correct: true,
            userAnswer: answer,
            correctAnswer,
          }
          return [newEntry, ...prev].slice(0, 20)
        })

        // Update problem count and check for spaced repetition
        setProblemCount(prev => {
          const newCount = prev + 1
          if (newCount > 0 && newCount % SPACED_REPETITION_INTERVAL === 0) {
            setShowSpacedRepetition(true)
          }
          return newCount
        })
        
        // Check for transfer challenge trigger (only if not already showing)
        // Also ensure we have a valid correct answer to display
        // Note: Transfer challenges are AI-generated and cost credits
        const safeCorrectAnswer = problem.answer?.correct ?? correctAnswer ?? 'the answer'
        if (!transferChallenge.state.showChallenge && !transferChallenge.state.isLoading) {
          const shouldTransfer = transferChallenge.checkForTransferTrigger(
            { topic: problem.pedagogy.topic, difficulty: problem.difficulty },
            true,
            'math'
          )
          if (shouldTransfer) {
            // Generate challenge synchronously
            const challenge = transferChallenge.generateTransferChallenge(
              {
                topic: problem.pedagogy.topic,
                difficulty: problem.difficulty,
                question: problem.question.text,
                correctAnswer: String(safeCorrectAnswer)
              },
              'math'
            )
            if (challenge) {
              transferChallenge.showTransferChallenge(challenge)
            }
          }
        }

        // Call API to update progress (wrapped in try-catch to not override AI feedback on failure)
        try {
          const result = await fetchApi('/api/basics/check-answer', {
            method: 'POST',
            body: JSON.stringify({
              userId: user.uid,
              subject: 'math',
              problemId: problem.id,
              userAnswer: answer,
              isCorrect: true,
              timeSpent: 0,
              workShown: workShown || undefined,
              hintsUsed: hintsUsed.length,
              version: 2,
            }),
          })

          if (result?.nextProblem) {
            setNextProblemData({
              problem: result.nextProblem,
              progress: { ...progress!, ...result.progressUpdate },
              xp: xpEarned,
            })
          }
          
          // Update feedback with schedule message from enhanced systems
          if (result?.reviewScheduleMessage) {
            setFeedback(prev => prev ? {
              ...prev,
              reviewScheduleMessage: result.reviewScheduleMessage
            } : prev)
          }
        } catch (err) {
          // Log but don't override the AI feedback - grading succeeded, only progress update failed
          logger.error('MathSessionV2', 'Failed to update progress for correct answer', { error: err })
          // User still sees correct AI feedback, but progress may not be saved
        }
      } else {
        setIncorrectAttempts(prev => prev + 1)
        
        // Use AI feedback for incorrect answers
        const message = aiFeedback.summary || 'That\'s not quite right. Try again!'
        const explanation = aiFeedback.detailedExplanation || problem.hints[0]?.text || 'Review the problem carefully.'

        setFeedback({
          correct: false,
          message,
          explanation,
          xpEarned: 0,
        })
        
        // Detect misconceptions on wrong answer
        misconceptionDetection.detect({
          problemId: problem.id,
          studentAnswer: answer,
          correctAnswer: correctAnswer,
          problemType: problem.type,
          difficulty: problem.difficulty,
          skills: problem.pedagogy.skills || [],
          problemText: problem.question.text
        }).catch(err => logger.error('MathSessionV2', 'Misconception detection error', { error: err }))

        // Track incorrect for spaced repetition
        setRecentProblems(prev => {
          const newEntry: RecentProblemV2 = {
            id: problem.id,
            question: problem.question.text,
            topic: problem.pedagogy.topic,
            difficulty: problem.difficulty,
            correct: false,
            userAnswer: answer,
            correctAnswer,
          }
          return [newEntry, ...prev].slice(0, 20)
        })

        // For incorrect answers, also fetch the next problem so user can continue after review
        try {
          const result = await fetchApi('/api/basics/check-answer', {
            method: 'POST',
            body: JSON.stringify({
              userId: user.uid,
              subject: 'math',
              problemId: problem.id,
              userAnswer: answer,
              isCorrect: false,
              timeSpent: 0,
              version: 2,
            }),
          })

          if (result?.nextProblem) {
            setNextProblemData({
              problem: result.nextProblem,
              progress: { ...progress!, ...result.progressUpdate },
              xp: 0, // No XP for incorrect
            })
          }
        } catch (err) {
          logger.error('MathSessionV2', 'Failed to fetch next problem for incorrect answer', { error: err })
        }
      }
    } catch (error) {
      logger.error('MathSessionV2', 'Submit error', { error: error })
      setFeedback({
        correct: false,
        message: 'Unable to check your answer. Please try again.',
        explanation: '',
        xpEarned: 0,
        isConnectionError: true,
        errorType: 'connection',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [
    problem,
    user,
    answer,
    isSubmitting,
    progress,
    engagement,
    hintsUsed,
    aiTutorUsed,
    workShown,
    costsIncurred,
    fetchApi,
    telemetry,
    incorrectAttempts,
    misconceptionDetection,
    transferChallenge,
  ])

  const handleContinue = useCallback(() => {
    if (nextProblemData) {
      setFeedback(null)
      onProblemComplete(
        nextProblemData.problem,
        nextProblemData.progress,
        nextProblemData.xp
      )
    }
  }, [nextProblemData, onProblemComplete])

  const handleTrySimilar = useCallback(async () => {
    if (!problem || !user) return

    try {
      setIsSubmitting(true)
      const result = await fetchApi('/api/basics/get-similar', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          currentProblemId: problem.id,
          topic: problem.pedagogy.topic,
          difficulty: problem.difficulty,
          version: 2,
        }),
      })

      if (result?.problem) {
        setFeedback(null)
        onProblemComplete(result.problem, progress!, 0)
      }
    } catch (error) {
      logger.error('MathSessionV2', 'Try similar error', { error: error })
    } finally {
      setIsSubmitting(false)
    }
  }, [problem, user, progress, fetchApi, onProblemComplete])

  const handleExplainAnother = useCallback(async () => {
    if (!problem || !user) return

    setLoadingAlternate(true)
    try {
      const result = await fetchApi('/api/basics/ai-explain', {
        method: 'POST',
        body: JSON.stringify({
          problemId: problem.id,
          problemText: problem.question.text,
          correctAnswer: String(problem.answer.correct),
          userAnswer: answer,
          type: 'alternate',
        }),
      })

      if (result?.explanation) {
        setAlternateExplanation(result.explanation)
      }
    } catch (error) {
      logger.error('MathSessionV2', 'Explain another error', { error: error })
    } finally {
      setLoadingAlternate(false)
    }
  }, [problem, user, answer, fetchApi])

  const handleSkipConfirm = useCallback(async () => {
    setShowSkipConfirm(false)

    requireAuth(async () => {
      if (!problem || !user) return

      setIsSubmitting(true)
      try {
        const result = await fetchApi('/api/basics/check-answer', {
          method: 'POST',
          body: JSON.stringify({
            userId: user.uid,
            subject: 'math',
            problemId: problem.id,
            userAnswer: '__SKIPPED__',
            skipCost: SKIP_XP_COST,
            timeSpent: 0,
            version: 2,
          }),
        })

        if (onXpSpent) {
          onXpSpent(SKIP_XP_COST)
        }

        if (result?.nextProblem) {
          setFeedback(null)
          onProblemComplete(
            result.nextProblem,
            { ...progress!, ...result.progressUpdate }
          )
        } else {
          setFeedback(null)
          onSkip()
        }
      } catch (error) {
        logger.error('MathSessionV2', 'Skip error', { error: error })
        setFeedback(null)
        onSkip()
      } finally {
        setIsSubmitting(false)
      }
    })
  }, [problem, user, progress, fetchApi, requireAuth, onProblemComplete, onSkip, onXpSpent])

  const handleUnlockUnit = useCallback(async (unitId: string, cost: number) => {
    if (!user) return false

    try {
      const result = await fetchApi('/api/basics/unlock-unit', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.uid,
          unitId,
          cost,
        }),
      })

      if (result?.success) {
        setUnlockedUnits(prev => [...prev, unitId])
        setUserXp(prev => prev - cost)
        if (onXpSpent) onXpSpent(cost)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [user, fetchApi, onXpSpent])

  const handleSpacedRepComplete = useCallback(() => {
    setShowSpacedRepetition(false)
  }, [])

  // ========== Return ==========
  return {
    // Core state
    answer,
    setAnswer,
    isSubmitting,
    feedback,
    validationResult,
    incorrectAttempts,

    // Hints
    hintsUsed,
    handleHintReveal,

    // Work section
    workShown,
    setWorkShown,
    showWorkSection,
    setShowWorkSection,
    workBonus,

    // Problem navigation
    nextProblemData,
    lastProblem,
    showLastProblem,
    setShowLastProblem,

    // Skip
    showSkipConfirm,
    setShowSkipConfirm,

    // Help toolbar
    purchasedHint,
    setPurchasedHint,
    hintPurchased,
    setHintPurchased,
    aiTutorUsed,
    setAiTutorUsed,
    showAIExplanation,
    setShowAIExplanation,

    // Study panel
    showStudyPanel,
    setShowStudyPanel,
    unlockedUnits,
    userXp,

    // Spaced repetition
    recentProblems,
    showSpacedRepetition,

    // Alternate explanation
    alternateExplanation,
    loadingAlternate,

    // Costs
    costsIncurred,
    addCost,

    // Handlers
    handleSubmit,
    handleContinue,
    handleTrySimilar,
    handleExplainAnother,
    handleSkipConfirm,
    handleUnlockUnit,
    handleSpacedRepComplete,

    // Auth
    user,
    fetchApi,
    
    // Telemetry (for wiring to input components)
    telemetry,
    
    // Struggle Detection (for proactive interventions)
    struggleDetection,
    
    // Transfer Challenges (for cross-context practice)
    transferChallenge,
    
    // Misconception Detection (for targeted feedback on wrong answers)
    misconceptionDetection,
  }
}
