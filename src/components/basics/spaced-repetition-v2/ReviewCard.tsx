/* eslint-disable jsx-a11y/no-autofocus */
'use client'

/**
 * ReviewCard & FeedbackSection
 *
 * ReviewCard displays a single spaced-repetition review problem:
 *   - Topic badge and difficulty indicator
 *   - Question text (with optional LaTeX and graph)
 *   - Progressive hint system
 *   - Answer input with work-section toggle
 *
 * FeedbackSection (internal) renders the result banner, step-by-step
 * solution, and explanation after an answer is submitted.
 */

import { useState, useMemo } from 'react'
import {
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Spinner,
  Star,
  CaretRight,
} from '@phosphor-icons/react'
import { HintLevel, GraphConfig } from '@/lib/types/math-v2'
import { GraphRenderer } from '@/components/basics/math-v2/Visualization/GraphRenderer'

// ============================================================================
// Types
// ============================================================================

export interface ReviewProblemV2 {
  id: string
  question: string
  latex?: string
  topic: string
  difficulty: number
  correctAnswer: string
  hint: string
  explanation: string
  graphConfig?: GraphConfig
  solutionSteps?: Array<{ number: number; description: string; latex?: string }>
}

export interface ReviewCardProps {
  problem: ReviewProblemV2
  onAnswer: (answer: string) => void
  onHintReveal: (level: HintLevel) => void
  hintsRevealed: HintLevel[]
  showFeedback: boolean
  isCorrect: boolean
  checking: boolean
}

// ============================================================================
// FeedbackSection (internal)
// ============================================================================

function FeedbackSection({
  isCorrect,
  correctAnswer,
  explanation,
  solutionSteps,
}: {
  isCorrect: boolean
  correctAnswer: string
  explanation: string
  solutionSteps?: Array<{ number: number; description: string; latex?: string }>
}) {
  const [showSteps, setShowSteps] = useState(!isCorrect)

  return (
    <div className="space-y-4">
      {/* Result Banner */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl"
        style={{
          background: isCorrect
            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
          border: `2px solid ${isCorrect ? 'var(--b-reading, #22c55e)' : 'var(--b-latin, #ef4444)'}`,
        }}
      >
        {isCorrect ? (
          <CheckCircle
            size={32}
            weight="fill"
            style={{ color: 'var(--b-reading)' }}
          />
        ) : (
          <XCircle
            size={32}
            weight="fill"
            style={{ color: 'var(--b-latin)' }}
          />
        )}
        <div>
          <p
            className="font-bold text-lg"
            style={{ color: isCorrect ? 'var(--b-reading)' : 'var(--b-latin)' }}
          >
            {isCorrect ? 'Excellent!' : 'Not quite right'}
          </p>
          <p className="text-sm b-text-secondary">
            {isCorrect
              ? 'You remembered this concept well!'
              : `The correct answer is: ${correctAnswer}`}
          </p>
        </div>
        {isCorrect && (
          <div className="ml-auto">
            <Star
              size={24}
              weight="fill"
              style={{ color: 'var(--b-writing)' }}
            />
          </div>
        )}
      </div>

      {/* Solution Steps (for incorrect answers or on request) */}
      {solutionSteps && solutionSteps.length > 0 && (
        <div>
          {isCorrect && (
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center gap-2 text-sm b-text-secondary hover:b-text-primary mb-3"
            >
              <CaretRight
                size={16}
                style={{
                  transform: showSteps ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
              {showSteps ? 'Hide' : 'Show'} step-by-step solution
            </button>
          )}

          {showSteps && (
            <div
              className="space-y-3 p-4 rounded-xl"
              style={{
                background: 'var(--b-bg-muted)',
                border: '1px solid var(--b-border-default)',
              }}
            >
              <h4 className="font-semibold b-text-primary text-sm">
                Step-by-Step Solution:
              </h4>
              {solutionSteps.map((step) => (
                <div key={step.number} className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'var(--b-greek-light)',
                      color: 'var(--b-greek)',
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm b-text-primary">{step.description}</p>
                    {step.latex && (
                      <p className="mt-1 font-mono text-sm b-text-secondary">
                        {step.latex}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: 'var(--b-bg-muted)',
          border: '1px solid var(--b-border-default)',
        }}
      >
        <p className="text-sm b-text-primary">{explanation}</p>
      </div>
    </div>
  )
}

// ============================================================================
// ReviewCard
// ============================================================================

export function ReviewCard({
  problem,
  onAnswer,
  onHintReveal,
  hintsRevealed,
  showFeedback,
  isCorrect,
  checking,
}: ReviewCardProps) {
  const [answer, setAnswer] = useState('')
  const [showWork, setShowWork] = useState(false)

  // Generate hint levels based on the problem hint
  const hints: Array<{ level: HintLevel; text: string }> = useMemo(
    () => [
      {
        level: 'gentle' as HintLevel,
        text: `Think about what ${problem.topic.toLowerCase()} concepts apply here.`,
      },
      {
        level: 'moderate' as HintLevel,
        text: problem.hint || 'Break the problem into smaller steps.',
      },
      {
        level: 'explicit' as HintLevel,
        text: `The answer involves: ${problem.correctAnswer.substring(0, 2)}...`,
      },
    ],
    [problem]
  )

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswer(answer)
    }
  }

  return (
    <div className="space-y-5">
      {/* Topic & Difficulty Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 text-sm font-medium rounded-full"
            style={{
              background: 'var(--b-greek-light, rgba(139, 92, 246, 0.1))',
              color: 'var(--b-greek, #8b5cf6)',
            }}
          >
            {problem.topic}
          </span>
          <span className="text-xs b-text-muted">
            Grade {problem.difficulty}
          </span>
        </div>
        {problem.graphConfig && (
          <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600">
            Graph
          </span>
        )}
      </div>

      {/* Question Display */}
      <div
        className="rounded-xl p-5"
        style={{
          background:
            'linear-gradient(135deg, var(--b-bg-muted) 0%, var(--b-bg-card) 100%)',
          border: '1px solid var(--b-border-default)',
        }}
      >
        <p className="text-lg b-text-primary font-medium leading-relaxed">
          {problem.question}
        </p>
        {problem.latex && (
          <div className="mt-3 text-center text-xl font-mono">
            {problem.latex}
          </div>
        )}
      </div>

      {/* Graph Visualization */}
      {problem.graphConfig && (
        <div className="rounded-xl overflow-hidden border b-border">
          <GraphRenderer config={problem.graphConfig} height={200} />
        </div>
      )}

      {/* Progressive Hints */}
      {!showFeedback && (
        <div className="space-y-2">
          {hints.map((hint, index) => {
            const isRevealed = hintsRevealed.includes(hint.level)
            const canReveal =
              index === 0 || hintsRevealed.includes(hints[index - 1].level)

            return (
              <div key={hint.level}>
                {isRevealed ? (
                  <div
                    className="flex items-start gap-2 p-3 rounded-lg"
                    style={{
                      background:
                        'var(--b-writing-light, rgba(234, 179, 8, 0.1))',
                      border: '1px solid var(--b-writing, #eab308)',
                    }}
                  >
                    <Lightbulb
                      size={18}
                      weight="fill"
                      style={{ color: 'var(--b-writing)' }}
                    />
                    <div className="flex-1">
                      <span
                        className="text-xs font-medium uppercase tracking-wide mb-1 block"
                        style={{ color: 'var(--b-writing)' }}
                      >
                        Hint {index + 1}
                      </span>
                      <p className="text-sm b-text-primary">{hint.text}</p>
                    </div>
                  </div>
                ) : (
                  canReveal && (
                    <button
                      onClick={() => onHintReveal(hint.level)}
                      className="flex items-center gap-2 text-sm b-text-secondary hover:b-text-primary transition-colors"
                    >
                      <Lightbulb size={16} />
                      Reveal hint {index + 1}
                      <span className="text-xs b-text-muted">
                        (-{(index + 1) * 5} XP)
                      </span>
                    </button>
                  )
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Answer Input or Feedback */}
      {!showFeedback ? (
        <div className="space-y-4">
          {/* Work Section Toggle */}
          <button
            onClick={() => setShowWork(!showWork)}
            className="flex items-center gap-2 text-sm b-text-secondary hover:b-text-primary"
          >
            <CaretRight
              size={16}
              style={{
                transform: showWork ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            />
            Show work section
          </button>

          {showWork && (
            <div className="p-4 rounded-lg border b-border bg-white">
              <textarea
                placeholder="Write your work here..."
                className="w-full h-24 text-sm resize-none border-0 focus:ring-0 b-text-primary"
              />
            </div>
          )}

          {/* Answer Input */}
          <div className="relative">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && !checking && handleSubmit()
              }
              placeholder="Type your answer..."
              className="w-full px-4 py-3.5 text-lg border-2 rounded-xl focus:ring-2 focus:ring-offset-2 b-bg-card transition-all"
              style={{
                borderColor: 'var(--b-border-default)',
                outlineColor: 'var(--b-greek)',
              }}
              autoFocus
              disabled={checking}
            />
          </div>

          <p className="text-xs b-text-muted">
            Type <code className="px-1.5 py-0.5 rounded bg-gray-100">x^2</code>{' '}
            for x² or{' '}
            <code className="px-1.5 py-0.5 rounded bg-gray-100">sqrt(x)</code>{' '}
            for square root of x
          </p>

          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || checking}
            className="w-full py-3.5 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            style={{
              background: checking
                ? 'var(--b-border-default)'
                : 'var(--b-greek)',
              cursor: checking || !answer.trim() ? 'not-allowed' : 'pointer',
              opacity: checking || !answer.trim() ? 0.6 : 1,
            }}
          >
            {checking ? (
              <>
                <Spinner size={20} className="animate-spin" />
                Checking...
              </>
            ) : (
              <>
                Check Answer
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      ) : (
        <FeedbackSection
          isCorrect={isCorrect}
          correctAnswer={problem.correctAnswer}
          explanation={problem.explanation}
          solutionSteps={problem.solutionSteps}
        />
      )}
    </div>
  )
}
