'use client'

/**
 * Reading Feedback V2 Component
 *
 * Enhanced feedback display with:
 * - Skill-specific progress
 * - AI-powered detailed feedback
 * - Next steps guidance
 * - Achievement notifications
 * - Forced review period for incorrect answers (learning science principle)
 * - "Explain Another Way" AI alternative explanation
 */

import { useState, useEffect } from 'react'
import {
  CheckCircle,
  XCircle,
  Star,
  TrendUp,
  ArrowRight,
  Brain,
  Trophy,
  Sparkle,
  Timer,
  Lightbulb,
  ArrowsClockwise,
  BookOpen,
} from '@phosphor-icons/react'
import { ReadingFeedbackV2 as FeedbackType } from '@/lib/types/reading-v2'

/** Review period in seconds for incorrect answers before Continue is available */
const REVIEW_PERIOD_SECONDS = 5

interface ReadingFeedbackV2Props {
  feedback: FeedbackType
  isAiGrading?: boolean
  onContinue: () => void
  onReviewLast?: () => void
  onTrySimilar?: () => void
  onExplainAnother?: () => void
  loadingAlternate?: boolean
  alternateExplanation?: string | null
  incorrectAttempts?: number
  hasNextExercise: boolean
}

export function ReadingFeedbackV2({
  feedback,
  isAiGrading = false,
  onContinue,
  onReviewLast,
  onTrySimilar,
  onExplainAnother,
  loadingAlternate = false,
  alternateExplanation,
  incorrectAttempts = 0,
  hasNextExercise,
}: ReadingFeedbackV2Props) {
  // For incorrect answers, require a brief review period before Continue becomes available
  // This enforces the learning science principle of mandatory reflection
  const [reviewSecondsLeft, setReviewSecondsLeft] = useState(
    feedback.isCorrect ? 0 : REVIEW_PERIOD_SECONDS
  )
  const hasCompletedReview = feedback.isCorrect || reviewSecondsLeft === 0

  // Countdown timer for review period
  useEffect(() => {
    if (feedback.isCorrect || reviewSecondsLeft === 0) return

    const timer = setInterval(() => {
      setReviewSecondsLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [feedback.isCorrect, reviewSecondsLeft])

  // Reset review timer when feedback changes
  useEffect(() => {
    setReviewSecondsLeft(feedback.isCorrect ? 0 : REVIEW_PERIOD_SECONDS)
  }, [feedback.isCorrect, feedback.summary])
  // Get performance color
  const getPerformanceColor = (
    performance: 'excellent' | 'good' | 'needs-practice'
  ) => {
    switch (performance) {
      case 'excellent':
        return {
          bg: 'var(--b-reading-light)',
          text: 'var(--b-reading-dark)',
          icon: '🌟',
        }
      case 'good':
        return {
          bg: 'var(--b-math-light)',
          text: 'var(--b-math-dark)',
          icon: '✓',
        }
      case 'needs-practice':
        return { bg: '#fef3c7', text: '#92400e', icon: '📚' }
      default:
        return {
          bg: 'var(--b-bg-muted)',
          text: 'var(--b-text-muted)',
          icon: '•',
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Result Banner */}
      <div
        className={`rounded-xl p-6 ${feedback.isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'} border-2`}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              feedback.isCorrect ? 'bg-green-100' : 'bg-amber-100'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle size={28} weight="fill" className="text-green-600" />
            ) : (
              <Brain size={28} weight="duotone" className="text-amber-600" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3
              className={`text-lg font-bold ${feedback.isCorrect ? 'text-green-800' : 'text-amber-800'}`}
            >
              {feedback.isCorrect ? 'Excellent Work!' : 'Good Effort!'}
            </h3>
            <p
              className={`mt-1 ${feedback.isCorrect ? 'text-green-700' : 'text-amber-700'}`}
            >
              {feedback.summary}
            </p>

            {/* XP Display */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Star size={20} weight="fill" className="text-yellow-500" />
                <span className="font-bold text-lg">
                  +{feedback.xpEarned} XP
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm b-text-muted">
                <TrendUp size={16} />
                <span>Score: {Math.round(feedback.score)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Grading Indicator */}
      {isAiGrading && (
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="animate-spin w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full" />
          <span className="text-purple-700 font-medium">
            AI is analyzing your response...
          </span>
        </div>
      )}

      {/* Skill Progress */}
      {feedback.skillFeedback && feedback.skillFeedback.length > 0 && (
        <div className="bg-white rounded-lg border b-border p-4">
          <h4 className="font-semibold b-text-primary mb-3 flex items-center gap-2">
            <TrendUp size={18} />
            Skill Progress
          </h4>
          <div className="space-y-3">
            {feedback.skillFeedback.map((skill, idx) => {
              const colors = getPerformanceColor(skill.performance)
              return (
                <div key={idx} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {colors.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium b-text-primary capitalize">
                        {skill.skillName.replace(/-/g, ' ')}
                      </span>
                      <span className="text-xs b-text-muted">
                        {Math.round(skill.masteryProgress * 100)}% mastery
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.masteryProgress * 100}%`,
                          backgroundColor: colors.text,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Correct Answer & Explanation (if wrong) */}
      {!feedback.isCorrect &&
        (feedback.correctAnswer || feedback.explanation) && (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              Let&apos;s Learn
            </h4>
            {feedback.correctAnswer && (
              <div className="mb-2">
                <span className="text-sm text-blue-700 font-medium">
                  Correct answer:{' '}
                </span>
                <span className="text-sm text-blue-900">
                  {Array.isArray(feedback.correctAnswer)
                    ? feedback.correctAnswer.join(', ')
                    : feedback.correctAnswer}
                </span>
              </div>
            )}
            {feedback.explanation && (
              <p className="text-sm text-blue-700">{feedback.explanation}</p>
            )}
            {feedback.textEvidence && (
              <p className="text-sm text-blue-600 mt-2 italic">
                Evidence from text: &quot;{feedback.textEvidence}&quot;
              </p>
            )}
          </div>
        )}

      {/* Encouragement */}
      <div className="p-3 bg-gray-50 rounded-lg text-center">
        <p className="text-sm b-text-secondary">{feedback.encouragement}</p>
      </div>

      {/* Achievements */}
      {feedback.achievementsUnlocked &&
        feedback.achievementsUnlocked.length > 0 && (
          <div className="bg-yellow-50 rounded-lg border border-yellow-300 p-4">
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <Trophy size={18} weight="fill" />
              Achievements Unlocked!
            </h4>
            <div className="space-y-2">
              {feedback.achievementsUnlocked.map((achievement, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 bg-yellow-100 rounded"
                >
                  <Sparkle
                    size={20}
                    weight="fill"
                    className="text-yellow-600"
                  />
                  <div>
                    <span className="font-medium text-yellow-800">
                      {achievement.name}
                    </span>
                    <p className="text-xs text-yellow-700">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Milestones */}
      {feedback.milestones && feedback.milestones.length > 0 && (
        <div className="space-y-2">
          {feedback.milestones.map((milestone, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200"
            >
              <Star size={18} weight="fill" className="text-purple-500" />
              <span className="text-sm text-purple-800 font-medium">
                {milestone.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Alternate Explanation - AI-powered alternative */}
      {alternateExplanation && (
        <div className="b-card b-p-lg b-animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb
              size={20}
              weight="fill"
              className="text-purple-500 animate-pulse"
            />
            <h4 className="font-semibold text-purple-800">
              Another Way to Think About It
            </h4>
          </div>
          <p className="text-sm b-text-secondary leading-relaxed">
            {alternateExplanation}
          </p>
        </div>
      )}

      {/* Next Steps */}
      {feedback.nextExercise && (
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-sm b-text-muted">
            <span className="font-medium">Next up:</span>{' '}
            {feedback.nextExercise.reason}
          </p>
        </div>
      )}

      {/* Action Buttons - with review period for incorrect answers */}
      <div
        className="b-card p-4"
        style={{
          background: 'var(--b-bg-elevated)',
          boxShadow: 'var(--b-shadow-md)',
        }}
      >
        {/* Review Notice - Only for incorrect answers during review period */}
        {!feedback.isCorrect && !hasCompletedReview && (
          <div
            className="flex items-center gap-3 mb-4 p-3 rounded-lg"
            style={{
              backgroundColor: 'var(--b-reading-light)',
              border: '1px solid var(--b-reading-border)',
            }}
          >
            <Timer
              size={20}
              weight="fill"
              style={{ color: 'var(--b-reading)' }}
              className="flex-shrink-0"
            />
            <p className="text-sm" style={{ color: 'var(--b-reading-dark)' }}>
              Review the explanation above. Continue available in{' '}
              <strong>{reviewSecondsLeft}s</strong>
            </p>
          </div>
        )}

        {/* Primary Action - Continue */}
        {hasNextExercise && hasCompletedReview && (
          <button
            onClick={onContinue}
            className="b-btn b-btn-lg b-btn-primary w-full group mb-4 flex items-center justify-center gap-2"
          >
            <span>Continue to Next Exercise</span>
            <ArrowRight
              size={20}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        )}

        {/* Loading state when waiting for next exercise */}
        {!hasNextExercise && !feedback.isCorrect && hasCompletedReview && (
          <div className="flex items-center justify-center gap-2 mb-4 p-3 rounded-lg b-bg-muted">
            <div
              className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--b-reading)' }}
            />
            <span className="text-sm b-text-secondary">
              Loading next exercise...
            </span>
          </div>
        )}

        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-2">
          {/* Try Similar - For incorrect answers */}
          {onTrySimilar && !feedback.isCorrect && (
            <button
              onClick={onTrySimilar}
              className="b-btn b-btn-sm b-btn-reading-soft group flex-1 sm:flex-none flex items-center gap-2"
            >
              <ArrowsClockwise
                size={16}
                weight="bold"
                className="transition-transform group-hover:rotate-180"
              />
              Try Similar
            </button>
          )}

          {/* Review Last - If callback provided */}
          {onReviewLast && (
            <button
              onClick={onReviewLast}
              className="b-btn b-btn-sm b-btn-secondary group flex-1 sm:flex-none flex items-center gap-2"
            >
              <BookOpen
                size={16}
                weight="bold"
                className="transition-transform group-hover:scale-110"
              />
              Review Last
            </button>
          )}

          {/* Explain Another Way - After multiple incorrect attempts */}
          {!feedback.isCorrect &&
            onExplainAnother &&
            incorrectAttempts >= 2 && (
              <button
                onClick={onExplainAnother}
                disabled={loadingAlternate}
                className="b-btn b-btn-sm group flex-1 sm:flex-none flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--b-logic-light)',
                  color: 'var(--b-logic-dark)',
                  border: '1px solid var(--b-logic-border)',
                }}
              >
                <Lightbulb
                  size={16}
                  weight="fill"
                  className={`transition-transform group-hover:scale-110 ${loadingAlternate ? 'animate-pulse' : ''}`}
                />
                {loadingAlternate ? 'Loading...' : 'Explain Another Way'}
              </button>
            )}
        </div>
      </div>
    </div>
  )
}
