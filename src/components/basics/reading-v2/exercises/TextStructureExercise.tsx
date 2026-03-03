'use client'

/**
 * Text Structure Exercise Component
 *
 * Teaches recognition of text organization patterns:
 * - Narrative (story grammar)
 * - Descriptive
 * - Sequential/Chronological
 * - Compare & Contrast
 * - Cause & Effect
 * - Problem & Solution
 * - Argumentative
 *
 * Research: Text structure awareness improves comprehension by 30%
 */

import { useState } from 'react'
import {
  FlowArrow,
  Scales,
  Lightning,
  PuzzlePiece,
  ListNumbers,
  Article,
  SealQuestion,
} from '@phosphor-icons/react'
import { ReadingExerciseV2, TextStructure } from '@/lib/types/reading-v2'
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

interface TextStructureExerciseProps {
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

// Text structure info with signal words
const TEXT_STRUCTURES: Record<
  TextStructure,
  {
    name: string
    icon: React.ReactNode
    color: string
    description: string
    signalWords: string[]
  }
> = {
  narrative: {
    name: 'Narrative (Story)',
    icon: <Article size={20} />,
    color: 'var(--b-writing)',
    description:
      'Tells a story with characters, setting, problem, and resolution',
    signalWords: [
      'once upon a time',
      'first',
      'then',
      'finally',
      'in the end',
      'characters',
      'setting',
    ],
  },
  descriptive: {
    name: 'Descriptive',
    icon: <Article size={20} />,
    color: 'var(--b-math)',
    description: 'Describes characteristics, features, or examples of a topic',
    signalWords: [
      'for example',
      'such as',
      'characteristics',
      'features',
      'including',
      'looks like',
    ],
  },
  sequential: {
    name: 'Sequential/Chronological',
    icon: <ListNumbers size={20} />,
    color: '#f59e0b',
    description: 'Shows steps in order or events in time sequence',
    signalWords: [
      'first',
      'next',
      'then',
      'finally',
      'before',
      'after',
      'following',
      'steps',
    ],
  },
  'compare-contrast': {
    name: 'Compare & Contrast',
    icon: <Scales size={20} />,
    color: '#8b5cf6',
    description: 'Shows similarities and differences between things',
    signalWords: [
      'similarly',
      'however',
      'on the other hand',
      'both',
      'unlike',
      'in contrast',
      'but',
      'same',
    ],
  },
  'cause-effect': {
    name: 'Cause & Effect',
    icon: <Lightning size={20} />,
    color: 'var(--b-reading)',
    description: 'Explains why something happens and what results',
    signalWords: [
      'because',
      'therefore',
      'as a result',
      'consequently',
      'due to',
      'led to',
      'caused',
      'effect',
    ],
  },
  'problem-solution': {
    name: 'Problem & Solution',
    icon: <PuzzlePiece size={20} />,
    color: '#059669',
    description:
      'Presents a problem and explains how it was or could be solved',
    signalWords: [
      'problem',
      'solution',
      'solve',
      'resolved',
      'answer',
      'issue',
      'challenge',
      'addressed',
    ],
  },
  argumentative: {
    name: 'Argumentative/Persuasive',
    icon: <SealQuestion size={20} />,
    color: '#dc2626',
    description: 'Makes a claim and supports it with evidence and reasoning',
    signalWords: [
      'claim',
      'evidence',
      'because',
      'therefore',
      'should',
      'reason',
      'proves',
      'according to',
    ],
  },
}

export function TextStructureExercise({
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
}: TextStructureExerciseProps) {
  const [showSignalWords, setShowSignalWords] = useState(false)
  const allQuestionsAnswered = exercise.questions.every((q) =>
    answers[q.id]?.trim()
  )

  const structureInfo = exercise.textStructure
    ? TEXT_STRUCTURES[exercise.textStructure]
    : null

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
              skillId: 'text-structure',
              skillName: 'Text Structure',
              performance: feedback.correct ? 'excellent' : 'needs-practice',
              message: feedback.message,
              masteryProgress: 0.5,
            },
          ],
          summary: aiFeedback?.summary || feedback.message,
          encouragement: feedback.correct
            ? 'Understanding text structure helps you comprehend and remember what you read!'
            : "Recognizing patterns in text takes practice. You're building important skills!",
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
        <FlowArrow
          size={20}
          style={{ color: 'var(--b-reading)' }}
          weight="duotone"
        />
        <span className="font-medium" style={{ color: 'var(--b-reading)' }}>
          Text Structure
        </span>
      </div>

      {/* Learning Info */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          📐{' '}
          <span className="font-medium">
            Understanding how texts are organized
          </span>{' '}
          helps you predict what&apos;s coming next and remember important
          information.
        </p>
      </div>

      {/* Text Structure Reference (if known) */}
      {structureInfo && (
        <div
          className="p-4 rounded-lg border-2"
          style={{
            backgroundColor: `${structureInfo.color}10`,
            borderColor: structureInfo.color,
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span style={{ color: structureInfo.color }}>
              {structureInfo.icon}
            </span>
            <span
              className="font-semibold"
              style={{ color: structureInfo.color }}
            >
              {structureInfo.name}
            </span>
          </div>
          <p className="text-sm b-text-secondary mb-3">
            {structureInfo?.description}
          </p>

          {/* Signal Words Toggle */}
          <button
            onClick={() => setShowSignalWords(!showSignalWords)}
            className="text-xs underline b-text-muted"
          >
            {showSignalWords ? 'Hide' : 'Show'} signal words
          </button>

          {showSignalWords && (
            <div className="mt-2 flex flex-wrap gap-2">
              {structureInfo.signalWords.map((word, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white rounded text-xs font-medium"
                  style={{ color: structureInfo.color }}
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Text Structures Reference Card */}
      {!structureInfo && (
        <div className="bg-white rounded-lg border b-border p-4">
          <h4 className="text-sm font-semibold b-text-primary mb-3">
            Common Text Structures
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(TEXT_STRUCTURES).map(([key, info]) => (
              <div
                key={key}
                className="p-2 rounded-lg text-xs flex items-center gap-2"
                style={{ backgroundColor: `${info.color}10` }}
              >
                <span style={{ color: info.color }}>{info.icon}</span>
                <span style={{ color: info.color }}>{info.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passage */}
      {exercise.passage && (
        <div className="bg-white rounded-lg p-4 max-h-64 overflow-y-auto border b-border">
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
            backgroundColor: 'var(--b-reading-light)',
            color: 'var(--b-reading-dark)',
          }}
        >
          <div
            className="animate-spin rounded-full w-4 h-4 border-2 border-t-transparent"
            style={{ borderColor: 'var(--b-reading)' }}
          />
          <span>Analyzing your text structure understanding...</span>
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
      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          🔍 <span className="font-medium">Strategy:</span> Look for signal
          words! Words like &quot;because,&quot; &quot;however,&quot; or
          &quot;first, next, then&quot; tell you how the text is organized.
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
