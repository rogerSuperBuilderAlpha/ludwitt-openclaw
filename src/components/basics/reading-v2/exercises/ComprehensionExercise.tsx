'use client'

/**
 * Comprehension Exercise Component
 *
 * Handles all comprehension-type exercises:
 * - comprehension-literal
 * - comprehension-inferential
 * - comprehension-critical
 * - close-reading
 * - disciplinary-literacy
 *
 * Features:
 * - Passage display with word lookup
 * - Multiple question types
 * - AI grading integration
 * - Skill-based feedback
 * - Progressive hint system (learning science: scaffolding)
 * - Text evidence elaboration bonus (learning science: elaboration)
 */

import { useState, useMemo, useEffect, useRef } from 'react'
import { Sparkle, Quotes } from '@phosphor-icons/react'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
import { PassageDisplay } from '../shared/PassageDisplay'
import { QuestionRenderer } from '../shared/QuestionRenderer'
import { ReadingFeedbackV2 } from '../shared/ReadingFeedbackV2'
import {
  ReadingHints,
  generateDefaultReadingHints,
  ReadingHintLevel,
  ReadingHint,
} from '../shared/ReadingHints'
import { WordLookup } from '../../WordLookup'
import { ReadingAloudBonus } from '../../ReadingAloudBonus'

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

interface ComprehensionExerciseProps {
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

export function ComprehensionExercise({
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
}: ComprehensionExerciseProps) {
  const [wordLookupOpen, setWordLookupOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  // Hint system state
  const [hintsUsed, setHintsUsed] = useState<ReadingHintLevel[]>([])

  // Text evidence elaboration state (for bonus XP)
  const [textEvidence, setTextEvidence] = useState('')
  const [showEvidenceField, setShowEvidenceField] = useState(false)

  const hasAnswers = Object.keys(answers).length > 0
  const allQuestionsAnswered = exercise.questions.every((q) =>
    answers[q.id]?.trim()
  )

  // Generate hints based on exercise type
  const hints: ReadingHint[] = useMemo(() => {
    // Count paragraphs roughly by splitting on double newlines
    const paragraphCount = exercise.passage
      ? exercise.passage.split(/\n\n+/).length
      : 1
    return generateDefaultReadingHints(exercise.type, paragraphCount)
  }, [exercise.type, exercise.passage])

  // Handle hint reveal
  const handleHintReveal = (level: ReadingHintLevel) => {
    if (!hintsUsed.includes(level)) {
      setHintsUsed((prev) => [...prev, level])
    }
  }

  // Check if text evidence qualifies for bonus (at least 10 chars, contains quote-like content)
  const hasValidEvidence = textEvidence.trim().length >= 10

  // Track whether evidence bonus was already awarded for this exercise
  const evidenceBonusAwarded = useRef(false)

  // Award evidence bonus only after correct answer is confirmed
  useEffect(() => {
    if (
      feedback?.correct &&
      hasValidEvidence &&
      !evidenceBonusAwarded.current
    ) {
      evidenceBonusAwarded.current = true
      onBonusEarned(2) // +2 XP for text evidence on correct answer
    }
  }, [feedback, hasValidEvidence, onBonusEarned])

  // Submit without pre-awarding bonus (bonus deferred to feedback)
  const handleSubmitWithBonus = () => {
    onSubmit()
  }

  // Handle word click for vocabulary lookup
  const handleWordClick = (word: string) => {
    setSelectedWord(word)
    setWordLookupOpen(true)
  }

  // Handle word learned bonus
  const handleWordLearned = (word: string, points: number) => {
    onBonusEarned(points)
  }

  // If we have feedback, show the feedback view
  if (feedback) {
    return (
      <ReadingFeedbackV2
        feedback={{
          isCorrect: feedback.correct,
          score: aiFeedback?.score ?? (feedback.correct ? 1 : 0),
          xpEarned: feedback.xpEarned,
          skillFeedback: exercise.primarySkill
            ? [
                {
                  skillId: exercise.primarySkill,
                  skillName: exercise.primarySkill,
                  performance: feedback.correct
                    ? 'excellent'
                    : 'needs-practice',
                  message: feedback.message,
                  masteryProgress: 0.5, // Would come from actual mastery data
                },
              ]
            : [],
          summary: aiFeedback?.summary || feedback.message,
          encouragement: feedback.correct
            ? 'Great job demonstrating your reading comprehension skills!'
            : 'Keep practicing - every attempt helps you improve!',
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
      {/* Background Knowledge (for close reading) */}
      {exercise.backgroundKnowledge && (
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'var(--b-reading-light)',
            borderLeft: '4px solid var(--b-reading)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkle size={16} style={{ color: 'var(--b-reading-dark)' }} />
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--b-reading-dark)' }}
            >
              Background Knowledge
            </span>
          </div>
          <p className="text-sm b-text-secondary">
            {exercise.backgroundKnowledge}
          </p>
        </div>
      )}

      {/* Passage Display */}
      {exercise.passage && (
        <div
          className="max-h-72 overflow-y-auto rounded-lg p-4"
          style={{ backgroundColor: '#ffffff' }}
        >
          <WordLookup
            passage={exercise.passage}
            onWordLearned={handleWordLearned}
          />
        </div>
      )}

      {/* Reading Aloud Bonus */}
      {exercise.passage && (
        <ReadingAloudBonus
          passage={exercise.passage}
          exerciseId={exercise.id}
          onBonusEarned={onBonusEarned}
        />
      )}

      {/* Loading indicator - compact */}
      {isSubmitting && (
        <div
          className="flex items-center gap-2 text-sm p-2 rounded-lg"
          style={{
            backgroundColor: 'var(--b-reading-light)',
            color: 'var(--b-reading-dark)',
          }}
        >
          <div
            className="animate-spin rounded-full w-3 h-3 border-2 border-t-transparent"
            style={{ borderColor: 'var(--b-reading)' }}
          />
          <span>Analyzing...</span>
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

      {/* Text Evidence - Collapsible */}
      <button
        onClick={() => setShowEvidenceField(!showEvidenceField)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
          showEvidenceField || hasValidEvidence
            ? 'bg-green-50 border border-green-200'
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <Quotes
          size={16}
          className={hasValidEvidence ? 'text-green-600' : 'text-gray-400'}
        />
        <span
          className={
            hasValidEvidence ? 'text-green-700 font-medium' : 'text-gray-600'
          }
        >
          {hasValidEvidence ? 'Evidence Added (+2 XP)' : 'Add Evidence (+2 XP)'}
        </span>
      </button>

      {showEvidenceField && (
        <textarea
          value={textEvidence}
          onChange={(e) => setTextEvidence(e.target.value)}
          placeholder="Quote from the passage..."
          className="w-full p-2 rounded-lg border b-border text-sm resize-none bg-white"
          style={{ minHeight: '50px' }}
          disabled={isSubmitting}
        />
      )}

      {/* Hint System - Learning Science: Scaffolding */}
      <ReadingHints
        hints={hints}
        hintsUsed={hintsUsed}
        onHintReveal={handleHintReveal}
        firstHintFree={true}
      />

      {/* Compact Submit Row */}
      <div className="flex gap-2 pt-3 border-t b-border">
        <button
          type="button"
          onClick={handleSubmitWithBonus}
          disabled={isSubmitting || !allQuestionsAnswered}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor:
              isSubmitting || !allQuestionsAnswered
                ? 'var(--b-text-muted)'
                : 'var(--b-reading)',
          }}
        >
          {isSubmitting ? 'Checking...' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting}
          className="px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-all disabled:opacity-50"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
