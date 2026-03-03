/* eslint-disable jsx-a11y/no-autofocus */
'use client'

/**
 * Reading Questions Component
 * Displays questions and answer inputs with auto-resize textareas
 * Includes animated grading feedback stages
 */

import { FloppyDisk, Lightbulb } from '@phosphor-icons/react'
import { ReadingExercise } from '@/lib/types/basics'
import { useCallback, useRef, useState, useEffect } from 'react'

// Grading stages for animated feedback
const GRADING_STAGES = [
  'Reading your response...',
  'Checking comprehension accuracy...',
  'Evaluating evidence usage...',
  'Calculating your score...',
]

interface ReadingQuestionsProps {
  exercise: ReadingExercise
  answers: Record<string, string>
  isSubmitting: boolean
  onAnswerChange: (questionId: string, value: string) => void
  onSubmit: () => void
  onSkip?: () => void
}

// Answer guidance based on question type
const ANSWER_GUIDANCE: Record<
  string,
  { hint: string; minChars: number; maxChars: number }
> = {
  literal: { hint: '1-2 sentences', minChars: 20, maxChars: 200 },
  inferential: {
    hint: '2-3 sentences with evidence',
    minChars: 40,
    maxChars: 300,
  },
  evaluative: {
    hint: 'Short paragraph with reasoning',
    minChars: 60,
    maxChars: 400,
  },
  'true-false': {
    hint: 'State true/false and explain',
    minChars: 30,
    maxChars: 250,
  },
  default: { hint: '2-3 sentences', minChars: 30, maxChars: 250 },
}

// Question-type specific hints for when students need help
const QUESTION_TYPE_HINTS: Record<string, string> = {
  literal:
    'Look for exact words or phrases in the passage that directly answer this question. The answer is stated explicitly in the text.',
  inferential:
    "Think about what the author implies but doesn't directly state. Use clues from the passage to make a logical conclusion.",
  evaluative:
    'Consider why the author made this choice and what effect it has. Think about the purpose, tone, or impact on the reader.',
  'true-false':
    'Find the specific part of the passage that supports or contradicts this statement. Quote the evidence in your explanation.',
  default:
    'Re-read the relevant section of the passage carefully. Look for key words that connect to the question.',
}

function getAnswerGuidance(questionType: string) {
  return ANSWER_GUIDANCE[questionType] || ANSWER_GUIDANCE.default
}

function getQuestionHint(questionType: string) {
  return QUESTION_TYPE_HINTS[questionType] || QUESTION_TYPE_HINTS.default
}

export function ReadingQuestions({
  exercise,
  answers,
  isSubmitting,
  onAnswerChange,
  onSubmit,
  onSkip,
}: ReadingQuestionsProps) {
  const hasAnswers = Object.keys(answers).length > 0
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({})
  const [gradingStage, setGradingStage] = useState(0)
  const [showHintFor, setShowHintFor] = useState<string | null>(null)

  // Animate through grading stages
  useEffect(() => {
    if (isSubmitting) {
      setGradingStage(0)
      const interval = setInterval(() => {
        setGradingStage((prev) => (prev + 1) % GRADING_STAGES.length)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isSubmitting])

  // Auto-resize textarea based on content
  const handleTextareaResize = useCallback((textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`
  }, [])

  const handleChange = useCallback(
    (questionId: string, value: string, textarea: HTMLTextAreaElement) => {
      onAnswerChange(questionId, value)
      handleTextareaResize(textarea)
    },
    [onAnswerChange, handleTextareaResize]
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Auto-save indicator */}
      {hasAnswers && !isSubmitting && (
        <div className="flex items-center gap-2 b-text-xs b-text-muted b-pt-sm b-animate-fade-in">
          <FloppyDisk size={14} weight="fill" className="b-text-reading" />
          <span>Answers saved automatically</span>
        </div>
      )}

      {/* Animated Grading Feedback */}
      {isSubmitting && (
        <div className="b-pt-sm b-bg-reading-light b-rounded-lg b-p-md border b-border-reading">
          <div className="flex items-center gap-3">
            <div
              className="b-animate-spin b-rounded-full w-5 h-5 border-2 border-b-transparent"
              style={{
                borderColor: 'var(--b-reading)',
                borderBottomColor: 'transparent',
              }}
            />
            <div className="flex-1">
              <p className="b-text-sm b-font-medium b-text-reading">
                {GRADING_STAGES[gradingStage]}
              </p>
              {/* Progress dots */}
              <div className="flex gap-1.5 mt-2">
                {GRADING_STAGES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === gradingStage
                        ? 'bg-reading scale-125'
                        : idx < gradingStage
                          ? 'b-bg-reading opacity-50'
                          : 'b-bg-reading opacity-20'
                    }`}
                    style={{
                      backgroundColor:
                        idx <= gradingStage ? 'var(--b-reading)' : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div
        className={`flex flex-col gap-6 b-pt-lg b-border-t ${isSubmitting ? 'opacity-75 pointer-events-none' : ''}`}
      >
        {exercise.questions.map((question, qIdx) => {
          const guidance = getAnswerGuidance(question.type || 'default')
          const charCount = (answers[question.id] || '').length
          const isUnderMin = charCount > 0 && charCount < guidance.minChars

          return (
            <div key={question.id}>
              <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
                {qIdx + 1}. {question.question}
              </label>
              <textarea
                ref={(el) => {
                  textareaRefs.current[question.id] = el
                }}
                value={answers[question.id] || ''}
                onChange={(e) =>
                  handleChange(question.id, e.target.value, e.target)
                }
                placeholder={
                  question.type === 'true-false'
                    ? 'Is this true or false? Explain your reasoning...'
                    : 'Write your answer and explain your thinking...'
                }
                disabled={isSubmitting}
                rows={5}
                className="b-input b-textarea min-h-[120px] resize-y"
                autoFocus={qIdx === 0}
              />
              {/* Answer guidance and hint button */}
              <div className="flex items-center justify-between b-text-xs b-mt-xs">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 b-text-muted">
                    <Lightbulb size={12} weight="fill" />
                    {guidance.hint}
                  </span>
                  {/* Need help button */}
                  {showHintFor !== question.id && (
                    <button
                      onClick={() => setShowHintFor(question.id)}
                      className="text-xs hover:underline flex items-center gap-1"
                      style={{ color: 'var(--b-reading)' }}
                    >
                      💡 Need help?
                    </button>
                  )}
                </div>
                <span
                  className={
                    isUnderMin
                      ? 'text-amber-600'
                      : charCount >= guidance.minChars
                        ? 'text-green-600'
                        : 'b-text-muted'
                  }
                >
                  {charCount} characters
                  {isUnderMin && ` (aim for ${guidance.minChars}+)`}
                </span>
              </div>

              {/* Question hint */}
              {showHintFor === question.id && (
                <div
                  className="mt-2 p-3 rounded-lg border b-animate-fade-in"
                  style={{
                    backgroundColor: 'var(--b-reading-light)',
                    borderColor: 'var(--b-reading-border)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--b-text-primary)' }}
                      >
                        {getQuestionHint(question.type || 'default')}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowHintFor(null)}
                      className="text-xs b-text-muted hover:b-text-secondary flex-shrink-0"
                    >
                      Hide
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 b-pt-lg b-border-t">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="b-btn b-btn-lg b-btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {isSubmitting && (
            <div className="b-animate-spin b-rounded-full w-4 h-4 border-b-2 border-white" />
          )}
          {isSubmitting ? 'Checking Answers...' : 'Submit Answers'}
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            disabled={isSubmitting}
            className="b-btn b-btn-lg b-btn-secondary flex items-center gap-2"
          >
            Skip
            <span className="b-badge b-badge-danger b-badge-sm">-5 XP</span>
          </button>
        )}
      </div>
    </div>
  )
}
