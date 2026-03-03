'use client'

/**
 * Spaced Repetition Modal V2 - Main orchestrator component.
 * Sub-components: ReviewCard, CompletionScreen, ProgressRing.
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import {
  Brain,
  XCircle,
  ArrowRight,
  Spinner,
  Sparkle,
} from '@phosphor-icons/react'
import { Portal } from '../Portal'
import { HintLevel } from '@/lib/types/math-v2'
import { validateAnswer } from '@/lib/math-v2/answer-validation'
import { ProgressRing } from './ProgressRing'
import { ReviewCard, ReviewProblemV2 } from './ReviewCard'
import { CompletionScreen } from './CompletionScreen'
import { logger } from '@/lib/logger'

interface RecentProblemV2 {
  id: string
  question: string
  topic: string
  difficulty: number
  correct: boolean
  userAnswer: string
  correctAnswer: string
  latex?: string
}

interface SpacedRepetitionModalV2Props {
  isOpen: boolean
  recentProblems: RecentProblemV2[]
  onComplete: (results: {
    correct: number
    total: number
    xpEarned: number
  }) => void
}

/** Build fallback review problems from recent attempts when API fails. */
function buildFallbackProblems(
  recentProblems: RecentProblemV2[]
): ReviewProblemV2[] {
  const incorrect: ReviewProblemV2[] = recentProblems
    .filter((p) => !p.correct)
    .slice(0, 5)
    .map((p, i) => ({
      id: `fallback-${i}`,
      question: p.question,
      latex: p.latex,
      topic: p.topic,
      difficulty: Math.max(1, p.difficulty - 1),
      correctAnswer: p.correctAnswer,
      hint: 'Think about the steps you used before.',
      explanation: `This problem reinforces your understanding of ${p.topic.toLowerCase()}.`,
      solutionSteps: [
        { number: 1, description: 'Identify the key information' },
        { number: 2, description: 'Apply the relevant formula or concept' },
        { number: 3, description: 'Solve step by step' },
      ],
    }))

  if (incorrect.length < 5) {
    const correct = recentProblems
      .filter((p) => p.correct)
      .slice(0, 5 - incorrect.length)
      .map((p, i) => ({
        id: `fallback-correct-${i}`,
        question: p.question,
        latex: p.latex,
        topic: p.topic,
        difficulty: p.difficulty,
        correctAnswer: p.correctAnswer,
        hint: 'You got this right before - can you do it again?',
        explanation: `Great job reinforcing ${p.topic.toLowerCase()}!`,
        solutionSteps: [],
      }))
    incorrect.push(...correct)
  }

  return incorrect
}

export function SpacedRepetitionModalV2({
  isOpen,
  recentProblems,
  onComplete,
}: SpacedRepetitionModalV2Props) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()

  const [problems, setProblems] = useState<ReviewProblemV2[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [checking, setChecking] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hintsRevealed, setHintsRevealed] = useState<HintLevel[]>([])
  const [xpEarned, setXpEarned] = useState(0)
  const currentProblem = problems[currentIndex]

  const loadReviewProblems = useCallback(async () => {
    if (!user || recentProblems.length === 0) return
    setLoading(true)
    setError(null)
    try {
      const token = await user.getIdToken()
      const response = await fetchApi(
        '/api/basics/spaced-repetition/generate',
        {
          method: 'POST',
          body: JSON.stringify({
            recentProblems: recentProblems.slice(-20),
          }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.success && response.data?.problems) {
        setProblems(response.data.problems)
      } else {
        setProblems(buildFallbackProblems(recentProblems))
      }
    } catch (err) {
      logger.error(
        'SpacedRepetitionModalV2',
        'Failed to load review problems',
        { error: err }
      )
      setError('Failed to generate review problems. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [user, recentProblems, fetchApi])

  useEffect(() => {
    if (isOpen && problems.length === 0) {
      loadReviewProblems()
    }
  }, [isOpen, problems.length, loadReviewProblems])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setProblems([])
      setCurrentIndex(0)
      setCorrectCount(0)
      setLoading(true)
      setError(null)
      setShowFeedback(false)
      setIsCorrect(false)
      setIsComplete(false)
      setHintsRevealed([])
      setXpEarned(0)
    }
  }, [isOpen])

  const handleAnswer = useCallback(
    async (answer: string) => {
      if (!currentProblem || checking) return
      setChecking(true)
      try {
        const { isCorrect: isAnswerCorrect } = validateAnswer(
          answer,
          currentProblem.correctAnswer,
          {
            allowEquivalent: true,
            allowFractionDecimalEquivalence: true,
          }
        )
        setIsCorrect(isAnswerCorrect)
        if (isAnswerCorrect) {
          setCorrectCount((prev) => prev + 1)
          setXpEarned(
            (prev) => prev + Math.max(5, 20 - hintsRevealed.length * 5)
          )
        }
        setShowFeedback(true)
      } catch (err) {
        logger.error('SpacedRepetitionModalV2', 'Validation error', {
          error: err,
        })
        setIsCorrect(
          answer.trim().toLowerCase() ===
            currentProblem.correctAnswer.trim().toLowerCase()
        )
        setShowFeedback(true)
      } finally {
        setChecking(false)
      }
    },
    [currentProblem, checking, hintsRevealed.length]
  )

  const handleHintReveal = useCallback((level: HintLevel) => {
    setHintsRevealed((prev) => [...prev, level])
  }, [])

  const handleContinue = useCallback(() => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowFeedback(false)
      setIsCorrect(false)
      setHintsRevealed([])
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, problems.length])

  const handleComplete = useCallback(() => {
    onComplete({ correct: correctCount, total: problems.length, xpEarned })
  }, [onComplete, correctCount, problems.length, xpEarned])

  if (!isOpen) return null

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Spaced repetition"
          className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: 'var(--b-bg-card)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div
            className="p-5"
            style={{
              background:
                'linear-gradient(135deg, var(--b-greek) 0%, #7c3aed 100%)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  <Brain size={24} weight="bold" className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Spaced Repetition
                  </h2>
                  <p className="text-white/80 text-sm">
                    Reinforce your learning
                  </p>
                </div>
              </div>
              {!loading && !error && !isComplete && (
                <ProgressRing
                  current={currentIndex + (showFeedback ? 1 : 0)}
                  total={problems.length}
                  correctCount={correctCount}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading && (
              <div className="text-center py-12">
                <div className="relative inline-block">
                  <Spinner
                    size={48}
                    className="animate-spin mx-auto mb-4"
                    style={{ color: 'var(--b-greek)' }}
                  />
                  <Sparkle
                    size={20}
                    weight="fill"
                    className="absolute -top-1 -right-1"
                    style={{ color: 'var(--b-writing)' }}
                  />
                </div>
                <p className="b-text-secondary">
                  Generating personalized review...
                </p>
                <p className="text-sm b-text-muted mt-2">
                  Based on your recent {recentProblems.length} problems
                </p>
              </div>
            )}
            {error && (
              <div className="text-center py-8">
                <XCircle
                  size={48}
                  weight="fill"
                  className="mx-auto mb-4"
                  style={{ color: 'var(--b-latin)' }}
                />
                <p className="b-text-latin mb-4">{error}</p>
                <button
                  onClick={loadReviewProblems}
                  className="px-6 py-2 text-white font-medium rounded-lg transition-colors"
                  style={{ background: 'var(--b-greek)' }}
                >
                  Try Again
                </button>
              </div>
            )}
            {!loading && !error && !isComplete && currentProblem && (
              <>
                <ReviewCard
                  problem={currentProblem}
                  onAnswer={handleAnswer}
                  onHintReveal={handleHintReveal}
                  hintsRevealed={hintsRevealed}
                  showFeedback={showFeedback}
                  isCorrect={isCorrect}
                  checking={checking}
                />

                {showFeedback && (
                  <button
                    onClick={handleContinue}
                    className="w-full mt-6 py-3.5 text-white font-semibold rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--b-greek) 0%, #7c3aed 100%)',
                    }}
                  >
                    {currentIndex < problems.length - 1 ? (
                      <>
                        Next Problem
                        <ArrowRight size={20} className="inline ml-2" />
                      </>
                    ) : (
                      'See Results'
                    )}
                  </button>
                )}
              </>
            )}
            {isComplete && (
              <CompletionScreen
                correctCount={correctCount}
                totalCount={problems.length}
                xpEarned={xpEarned}
                onClose={handleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}
