'use client'

/**
 * Morphology Exercise Component
 *
 * Teaches word structure and morphological awareness:
 * - Prefixes (un-, re-, pre-, dis-, etc.)
 * - Suffixes (-ful, -less, -tion, -able, etc.)
 * - Latin and Greek roots
 * - Word families and derivations
 *
 * Research shows morphological awareness accelerates vocabulary 4×
 */

import { useState } from 'react'
import {
  PuzzlePiece,
  TreeStructure,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import { ReadingExerciseV2, MorphologyFocus } from '@/lib/types/reading-v2'
import { QuestionRenderer } from '../shared/QuestionRenderer'
import { ReadingFeedbackV2 } from '../shared/ReadingFeedbackV2'

interface AIFeedback {
  summary: string
  strengths: string[]
  improvements: string[]
  detailedExplanation: string
  score: number
  grade: string
}

interface Feedback {
  correct: boolean
  message: string
  explanation: string
  xpEarned: number
}

interface MorphologyExerciseProps {
  exercise: ReadingExerciseV2
  answers: Record<string, string>
  isSubmitting: boolean
  feedback: Feedback | null
  aiFeedback: AIFeedback | null
  isAiGrading: boolean
  onAnswerChange: (questionId: string, value: string) => void
  onSubmit: () => void
  onSkip: () => void
  onContinue: () => void
  onBonusEarned: (points: number) => void
  hasNextExercise: boolean
}

export function MorphologyExercise({
  exercise,
  answers,
  isSubmitting,
  feedback,
  aiFeedback,
  isAiGrading,
  onAnswerChange,
  onSubmit,
  onSkip,
  onContinue,
  hasNextExercise,
}: MorphologyExerciseProps) {
  const allQuestionsAnswered = exercise.questions.every((q) =>
    answers[q.id]?.trim()
  )

  // Get morpheme type info
  const getMorphemeInfo = (morpheme: MorphologyFocus) => {
    const typeColors = {
      prefix: { color: 'var(--b-math)', bg: 'var(--b-math-light)', icon: '🔷' },
      suffix: {
        color: 'var(--b-writing)',
        bg: 'var(--b-writing-light)',
        icon: '🔶',
      },
      root: {
        color: 'var(--b-reading)',
        bg: 'var(--b-reading-light)',
        icon: '🌳',
      },
      compound: { color: '#f59e0b', bg: '#fef3c7', icon: '🔗' },
      inflection: { color: '#6b7280', bg: '#f3f4f6', icon: '📝' },
    }
    return typeColors[morpheme.type] || typeColors.root
  }

  // Get origin badge
  const getOriginBadge = (origin?: string) => {
    if (!origin) return null
    const origins = {
      latin: { label: 'Latin', color: '#dc2626' },
      greek: { label: 'Greek', color: '#2563eb' },
      'anglo-saxon': { label: 'Anglo-Saxon', color: '#059669' },
      french: { label: 'French', color: '#7c3aed' },
    }
    return origins[origin as keyof typeof origins]
  }

  // If we have feedback, show feedback view
  if (feedback) {
    return (
      <ReadingFeedbackV2
        feedback={{
          isCorrect: feedback.correct,
          score: aiFeedback?.score ?? (feedback.correct ? 1 : 0),
          xpEarned: feedback.xpEarned,
          skillFeedback: [
            {
              skillId: 'morphology',
              skillName: 'Word Structure',
              performance: feedback.correct ? 'excellent' : 'needs-practice',
              message: feedback.message,
              masteryProgress: 0.5,
            },
          ],
          summary: aiFeedback?.summary || feedback.message,
          encouragement: feedback.correct
            ? 'Understanding word parts helps you decode thousands of new words!'
            : "Word structure knowledge builds over time. You're making progress!",
          explanation: aiFeedback?.detailedExplanation || feedback.explanation,
        }}
        isAiGrading={isAiGrading}
        onContinue={onContinue}
        hasNextExercise={hasNextExercise}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center gap-3">
        <PuzzlePiece
          size={20}
          style={{ color: 'var(--b-reading)' }}
          weight="duotone"
        />
        <span className="font-medium" style={{ color: 'var(--b-reading)' }}>
          Word Structure (Morphology)
        </span>
      </div>

      {/* Why This Matters */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          🧠{' '}
          <span className="font-medium">
            Learning word parts helps you figure out the meaning of new words!
          </span>
          <br />
          <span className="text-xs">
            If you know &quot;un-&quot; means &quot;not&quot;, you can
            understand unfair, unhappy, unclear, and hundreds more words.
          </span>
        </p>
      </div>

      {/* Morphology Focus Display */}
      {exercise.morphologyFocus && exercise.morphologyFocus.length > 0 && (
        <div className="bg-white rounded-lg border b-border p-4">
          <h4 className="text-sm font-semibold b-text-primary mb-4 flex items-center gap-2">
            <TreeStructure size={18} />
            Word Parts to Learn
          </h4>
          <div className="space-y-4">
            {exercise.morphologyFocus.map((morpheme, idx) => {
              const info = getMorphemeInfo(morpheme)
              const origin = getOriginBadge(morpheme.origin)

              return (
                <div
                  key={idx}
                  className="p-4 rounded-lg border-2"
                  style={{ backgroundColor: info.bg, borderColor: info.color }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Morpheme & Type */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{info.icon}</span>
                        <span
                          className="text-2xl font-bold"
                          style={{ color: info.color }}
                        >
                          {morpheme.element}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                          style={{
                            backgroundColor: info.color,
                            color: 'white',
                          }}
                        >
                          {morpheme.type}
                        </span>
                        {origin && (
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: origin.color,
                              color: 'white',
                            }}
                          >
                            {origin.label}
                          </span>
                        )}
                      </div>

                      {/* Meaning */}
                      <div className="mb-3">
                        <span className="text-sm font-medium b-text-secondary">
                          Meaning:{' '}
                        </span>
                        <span className="text-sm b-text-primary">
                          {morpheme.meaning}
                        </span>
                      </div>

                      {/* Examples */}
                      <div>
                        <span className="text-sm font-medium b-text-secondary">
                          Examples:{' '}
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {morpheme.examples.map((example, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white rounded text-sm border"
                              style={{ borderColor: info.color }}
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Passage (if provided for context) */}
      {exercise.passage && (
        <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto border b-border">
          <div className="flex items-center gap-2 mb-2 text-sm font-medium b-text-secondary">
            <MagnifyingGlass size={16} />
            Find the word parts in context:
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap b-text-primary">
            {exercise.passage}
          </p>
        </div>
      )}

      {/* Loading indicator */}
      {isSubmitting && (
        <div
          className="flex items-center gap-2 text-sm p-3 rounded-lg"
          style={{
            backgroundColor: 'var(--b-reading-light)',
            color: 'var(--b-reading-dark)',
          }}
        >
          <div
            className="animate-spin rounded-full w-4 h-4 border-2 border-t-transparent"
            style={{ borderColor: 'var(--b-reading)' }}
          />
          <span>Analyzing your understanding of word structure...</span>
        </div>
      )}

      {/* Questions */}
      <div
        className={`space-y-4 ${isSubmitting ? 'opacity-75 pointer-events-none' : ''}`}
      >
        {exercise.questions.map((question, idx) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            questionNumber={idx + 1}
            value={answers[question.id] || ''}
            onChange={(value) => onAnswerChange(question.id, value)}
            disabled={isSubmitting}
          />
        ))}
      </div>

      {/* Strategy Tips */}
      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          🎯 <span className="font-medium">Strategy:</span> Break words into
          parts. Look for the root first, then check for prefixes at the
          beginning and suffixes at the end.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4 border-t b-border">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !allQuestionsAnswered}
          className="b-btn b-btn-lg b-btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {isSubmitting && (
            <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />
          )}
          {isSubmitting ? 'Checking...' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting}
          className="b-btn b-btn-lg b-btn-secondary flex items-center gap-2"
        >
          Skip
          <span className="b-badge b-badge-danger b-badge-sm">-5 XP</span>
        </button>
      </div>
    </div>
  )
}
