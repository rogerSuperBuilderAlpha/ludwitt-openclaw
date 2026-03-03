'use client'

/**
 * Reciprocal Teaching Exercise Component
 *
 * Implements the four-strategy approach:
 * 1. PREDICT - What will this be about?
 * 2. QUESTION - Generate questions about the text
 * 3. CLARIFY - Clear up confusing parts
 * 4. SUMMARIZE - Condense the main ideas
 *
 * Research: Reciprocal teaching significantly improves comprehension
 */

import { useState } from 'react'
import {
  Eye,
  Question,
  Lightbulb,
  ListBullets,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
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

interface ReciprocalTeachingExerciseProps {
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

// Strategy definitions
const STRATEGIES = [
  {
    id: 'predict',
    name: 'Predict',
    icon: Eye,
    color: '#8b5cf6',
    description: 'Before reading, predict what the text will be about',
    prompt:
      'Based on the title and what you see, what do you think this will be about?',
  },
  {
    id: 'question',
    name: 'Question',
    icon: Question,
    color: 'var(--b-math)',
    description: 'Generate questions about the important ideas',
    prompt:
      'What questions do you have about the text? What would you ask a teacher?',
  },
  {
    id: 'clarify',
    name: 'Clarify',
    icon: Lightbulb,
    color: '#f59e0b',
    description: 'Clear up confusing words, ideas, or concepts',
    prompt:
      'What parts were confusing? How did you figure out what they meant?',
  },
  {
    id: 'summarize',
    name: 'Summarize',
    icon: ListBullets,
    color: 'var(--b-reading)',
    description: 'Condense the main ideas in your own words',
    prompt: 'In 2-3 sentences, what are the main ideas of this text?',
  },
]

export function ReciprocalTeachingExercise({
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
}: ReciprocalTeachingExerciseProps) {
  const [currentStrategy, setCurrentStrategy] = useState(0)
  const [showPassage, setShowPassage] = useState(false)

  // Map questions to strategies
  const getQuestionForStrategy = (strategyId: string) => {
    return exercise.questions.find(
      (q) =>
        q.skill?.toLowerCase().includes(strategyId) ||
        q.id?.toLowerCase().includes(strategyId)
    )
  }

  // Check if all questions are answered
  const allQuestionsAnswered = exercise.questions.every((q) =>
    answers[q.id]?.trim()
  )

  // Check if current strategy question is answered
  const currentStrategyData = STRATEGIES[currentStrategy]
  const currentQuestion =
    getQuestionForStrategy(currentStrategyData.id) ||
    exercise.questions[currentStrategy]
  const currentAnswered = currentQuestion
    ? !!answers[currentQuestion.id]?.trim()
    : false

  // Navigate strategies
  const goToNextStrategy = () => {
    if (currentStrategy < STRATEGIES.length - 1) {
      setCurrentStrategy((prev) => prev + 1)
    }
  }

  const goToPrevStrategy = () => {
    if (currentStrategy > 0) {
      setCurrentStrategy((prev) => prev - 1)
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
          skillFeedback: STRATEGIES.map((s) => ({
            skillId: s.id,
            skillName: s.name,
            performance: feedback.correct ? 'excellent' : 'good',
            message: `${s.name} strategy applied`,
            masteryProgress: 0.6,
          })),
          summary: aiFeedback?.summary || feedback.message,
          encouragement:
            'These four strategies make you an active, strategic reader!',
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: currentStrategyData.color,
              color: 'white',
            }}
          >
            <currentStrategyData.icon size={18} weight="fill" />
          </div>
          <div>
            <span className="font-semibold b-text-primary">
              Strategic Reading
            </span>
            <span className="text-xs b-text-muted ml-2">
              Step {currentStrategy + 1} of {STRATEGIES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Strategy Progress */}
      <div className="flex items-center gap-2">
        {STRATEGIES.map((strategy, idx) => {
          const question =
            getQuestionForStrategy(strategy.id) || exercise.questions[idx]
          const isAnswered = question ? !!answers[question.id]?.trim() : false
          const isCurrent = idx === currentStrategy
          const Icon = strategy.icon

          return (
            <button
              key={strategy.id}
              onClick={() => setCurrentStrategy(idx)}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg border-2 transition-all ${
                isCurrent
                  ? 'scale-105 shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                borderColor: strategy.color,
                backgroundColor: isCurrent
                  ? strategy.color
                  : `${strategy.color}20`,
                color: isCurrent ? 'white' : strategy.color,
              }}
            >
              {isAnswered ? (
                <CheckCircle size={16} weight="fill" />
              ) : (
                <Icon size={16} />
              )}
              <span className="text-xs font-medium hidden md:inline">
                {strategy.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Current Strategy Card */}
      <div
        className="p-5 rounded-xl border-2"
        style={{
          borderColor: currentStrategyData.color,
          backgroundColor: `${currentStrategyData.color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: currentStrategyData.color,
              color: 'white',
            }}
          >
            <currentStrategyData.icon size={22} weight="fill" />
          </div>
          <div>
            <h3
              className="font-bold text-lg"
              style={{ color: currentStrategyData.color }}
            >
              {currentStrategyData.name}
            </h3>
            <p className="text-sm b-text-secondary">
              {currentStrategyData.description}
            </p>
          </div>
        </div>

        {/* Strategy-specific tip */}
        <div className="p-3 bg-white rounded-lg mb-4">
          <p className="text-sm" style={{ color: currentStrategyData.color }}>
            💡 {currentStrategyData.prompt}
          </p>
        </div>

        {/* Show/Hide Passage Toggle (especially for Predict) */}
        {currentStrategy === 0 && !showPassage && (
          <div className="mb-4">
            <p className="text-sm b-text-muted mb-2">
              Make your prediction first, then reveal the passage to check!
            </p>
            <button
              onClick={() => setShowPassage(true)}
              className="text-sm underline"
              style={{ color: currentStrategyData.color }}
            >
              Show passage after predicting →
            </button>
          </div>
        )}

        {/* Passage */}
        {(showPassage || currentStrategy > 0) && exercise.passage && (
          <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto mb-4 border b-border">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {exercise.passage}
            </p>
          </div>
        )}

        {/* Question for Current Strategy */}
        {currentQuestion && (
          <QuestionRenderer
            question={currentQuestion}
            questionNumber={currentStrategy + 1}
            value={answers[currentQuestion.id] || ''}
            onChange={(value) => onAnswerChange(currentQuestion.id, value)}
            disabled={isSubmitting}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevStrategy}
          disabled={currentStrategy === 0}
          className="b-btn b-btn-secondary flex items-center gap-2"
        >
          ← Previous
        </button>

        {currentStrategy < STRATEGIES.length - 1 ? (
          <button
            type="button"
            onClick={goToNextStrategy}
            disabled={!currentAnswered}
            className="b-btn b-btn-primary flex items-center gap-2"
            style={
              currentAnswered
                ? { backgroundColor: currentStrategyData.color }
                : {}
            }
          >
            Next Strategy
            <ArrowRight size={16} weight="bold" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !allQuestionsAnswered}
            className="b-btn b-btn-lg b-btn-primary flex items-center gap-2"
          >
            {isSubmitting && (
              <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? 'Analyzing...' : 'Submit All Strategies'}
          </button>
        )}
      </div>

      {/* Progress Summary */}
      <div className="text-center text-sm b-text-muted">
        {exercise.questions.filter((q) => answers[q.id]?.trim()).length} of{' '}
        {exercise.questions.length} strategies completed
      </div>

      {/* Skip Button */}
      <div className="flex justify-center pt-2 border-t b-border">
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting}
          className="b-btn b-btn-secondary text-sm flex items-center gap-2"
        >
          Skip Exercise
          <span className="b-badge b-badge-danger b-badge-sm">-5 XP</span>
        </button>
      </div>
    </div>
  )
}
