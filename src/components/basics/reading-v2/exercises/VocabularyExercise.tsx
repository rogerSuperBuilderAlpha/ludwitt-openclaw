'use client'

/**
 * Vocabulary Exercise Component
 *
 * Handles vocabulary-focused exercises:
 * - vocabulary-context (learning from context clues)
 * - vocabulary-direct (explicit vocabulary instruction)
 * - word-relationships (synonyms, antonyms, analogies)
 *
 * Based on Beck's 3-Tier Vocabulary Model
 */

import { useState } from 'react'
import {
  BookmarkSimple,
  Lightbulb,
  ArrowsLeftRight,
} from '@phosphor-icons/react'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
import { PassageDisplay } from '../shared/PassageDisplay'
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

interface VocabularyExerciseProps {
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

export function VocabularyExercise({
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
  onBonusEarned,
  hasNextExercise,
}: VocabularyExerciseProps) {
  const allQuestionsAnswered = exercise.questions.every((q) =>
    answers[q.id]?.trim()
  )

  // Get tier badge info
  const getTierBadge = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return {
          label: 'Tier 1 (Basic)',
          color: 'var(--b-math)',
          bg: 'var(--b-math-light)',
        }
      case 2:
        return {
          label: 'Tier 2 (Academic)',
          color: 'var(--b-reading)',
          bg: 'var(--b-reading-light)',
        }
      case 3:
        return {
          label: 'Tier 3 (Domain)',
          color: 'var(--b-writing)',
          bg: 'var(--b-writing-light)',
        }
    }
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
              skillId: exercise.primarySkill,
              skillName: exercise.primarySkill,
              performance: feedback.correct ? 'excellent' : 'needs-practice',
              message: feedback.message,
              masteryProgress: 0.5,
            },
          ],
          summary: aiFeedback?.summary || feedback.message,
          encouragement: feedback.correct
            ? 'Excellent vocabulary work! Words are the building blocks of comprehension.'
            : 'Building vocabulary takes time. Keep learning new words!',
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
      {/* Exercise Type Header */}
      <div className="flex items-center gap-3">
        {exercise.type === 'vocabulary-context' && (
          <>
            <Lightbulb
              size={20}
              style={{ color: 'var(--b-writing)' }}
              weight="duotone"
            />
            <span className="font-medium" style={{ color: 'var(--b-writing)' }}>
              Vocabulary in Context
            </span>
          </>
        )}
        {exercise.type === 'vocabulary-direct' && (
          <>
            <BookmarkSimple
              size={20}
              style={{ color: 'var(--b-reading)' }}
              weight="duotone"
            />
            <span className="font-medium" style={{ color: 'var(--b-reading)' }}>
              Vocabulary Study
            </span>
          </>
        )}
        {exercise.type === 'word-relationships' && (
          <>
            <ArrowsLeftRight
              size={20}
              style={{ color: 'var(--b-math)' }}
              weight="duotone"
            />
            <span className="font-medium" style={{ color: 'var(--b-math)' }}>
              Word Relationships
            </span>
          </>
        )}
      </div>

      {/* Target Vocabulary Display */}
      {exercise.targetVocabulary && exercise.targetVocabulary.length > 0 && (
        <div className="bg-white rounded-lg border b-border p-4">
          <h4 className="text-sm font-semibold b-text-primary mb-3">
            📚 Words to Learn
          </h4>
          <div className="space-y-3">
            {exercise.targetVocabulary.map((vocab, idx) => {
              const tierInfo = getTierBadge(vocab.tier)
              return (
                <div
                  key={idx}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: tierInfo.bg }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-bold text-lg"
                          style={{ color: tierInfo.color }}
                        >
                          {vocab.word}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: tierInfo.color,
                            color: 'white',
                          }}
                        >
                          {tierInfo.label}
                        </span>
                      </div>
                      <p className="text-sm b-text-secondary mt-1">
                        <span className="font-medium">Definition:</span>{' '}
                        {vocab.definition}
                      </p>
                      {vocab.contextSentence && (
                        <p className="text-sm b-text-muted mt-1 italic">
                          &quot;{vocab.contextSentence}&quot;
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Passage (if context-based) */}
      {exercise.passage && (
        <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {exercise.passage}
          </p>
        </div>
      )}

      {/* Loading indicator */}
      {isSubmitting && (
        <div
          className="flex items-center gap-2 text-sm p-3 rounded-lg"
          style={{
            backgroundColor: 'var(--b-writing-light)',
            color: 'var(--b-writing-dark)',
          }}
        >
          <div
            className="animate-spin rounded-full w-4 h-4 border-2 border-t-transparent"
            style={{ borderColor: 'var(--b-writing)' }}
          />
          <span>Checking your vocabulary knowledge...</span>
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

      {/* Strategy Tip */}
      {exercise.type === 'vocabulary-context' && (
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            💡 <span className="font-medium">Strategy:</span> Look for context
            clues around the word. Check for definitions, examples, synonyms, or
            contrast words nearby.
          </p>
        </div>
      )}

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
