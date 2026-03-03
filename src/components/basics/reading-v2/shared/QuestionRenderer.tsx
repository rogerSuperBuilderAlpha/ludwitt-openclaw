'use client'

/**
 * Question Renderer Component
 *
 * Renders different question types for reading exercises:
 * - Multiple choice
 * - Short answer
 * - True/false
 * - Sequencing
 * - Matching
 * - Highlighting
 */

import {
  CheckCircle,
  Circle,
  TextT,
  ListNumbers,
  ArrowsLeftRight,
} from '@phosphor-icons/react'
import { ReadingQuestionV2 } from '@/lib/types/reading-v2'

interface QuestionRendererProps {
  question: ReadingQuestionV2
  questionNumber: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  showFeedback?: boolean
  isCorrect?: boolean
}

export function QuestionRenderer({
  question,
  questionNumber,
  value,
  onChange,
  disabled = false,
  showFeedback = false,
  isCorrect,
}: QuestionRendererProps) {
  // Get icon for question type
  const getTypeIcon = () => {
    switch (question.type) {
      case 'multiple-choice':
        return <Circle size={14} />
      case 'short-answer':
        return <TextT size={14} />
      case 'sequencing':
        return <ListNumbers size={14} />
      case 'matching':
        return <ArrowsLeftRight size={14} />
      default:
        return null
    }
  }

  // Get DOK badge color
  const getDOKColor = () => {
    switch (question.depthOfKnowledge) {
      case 1:
        return { bg: 'var(--b-math-light)', text: 'var(--b-math-dark)' }
      case 2:
        return { bg: 'var(--b-reading-light)', text: 'var(--b-reading-dark)' }
      case 3:
        return { bg: 'var(--b-writing-light)', text: 'var(--b-writing-dark)' }
      case 4:
        return { bg: '#fef3c7', text: '#92400e' }
      default:
        return { bg: 'var(--b-bg-muted)', text: 'var(--b-text-muted)' }
    }
  }

  const dokColors = getDOKColor()

  // Render multiple choice options
  const renderMultipleChoice = () => (
    <div className="space-y-2 mt-3">
      {question.options?.map((option, idx) => {
        const isSelected = value === option
        const letter = String.fromCharCode(65 + idx) // A, B, C, D...

        return (
          <label
            key={idx}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              isSelected ? 'border-2' : 'border hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={
              isSelected
                ? {
                    borderColor: 'var(--b-reading)',
                    backgroundColor: 'var(--b-reading-light)',
                  }
                : {}
            }
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={isSelected}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="sr-only"
            />
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                isSelected ? 'text-white' : 'bg-gray-100 b-text-secondary'
              }`}
              style={isSelected ? { backgroundColor: 'var(--b-reading)' } : {}}
            >
              {letter}
            </span>
            <span className={`flex-1 ${isSelected ? 'font-medium' : ''}`}>
              {option}
            </span>
            {isSelected && (
              <CheckCircle
                size={20}
                weight="fill"
                style={{ color: 'var(--b-reading)' }}
              />
            )}
          </label>
        )
      })}
    </div>
  )

  // Render short answer textarea
  const renderShortAnswer = () => (
    <div className="mt-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here..."
        disabled={disabled}
        rows={4}
        className="b-input b-textarea w-full"
        style={{ minHeight: '100px' }}
      />
      {question.rubric && (
        <div className="mt-2 text-xs b-text-muted">
          <span className="font-medium">Grading criteria:</span>
          <ul className="list-disc list-inside mt-1">
            {question.rubric.map((criterion, idx) => (
              <li key={idx}>
                {criterion.criteria} ({criterion.points} pts)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  // Render true/false options
  const renderTrueFalse = () => (
    <div className="flex gap-4 mt-3">
      {['True', 'False'].map((option) => {
        const isSelected = value.toLowerCase() === option.toLowerCase()

        return (
          <label
            key={option}
            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              isSelected ? '' : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={
              isSelected
                ? {
                    borderColor:
                      option === 'True'
                        ? 'var(--b-reading)'
                        : 'var(--b-danger)',
                    backgroundColor:
                      option === 'True' ? 'var(--b-reading-light)' : '#fef2f2',
                  }
                : {}
            }
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={isSelected}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="sr-only"
            />
            <span
              className={`text-lg font-medium ${isSelected ? 'b-text-primary' : 'b-text-secondary'}`}
            >
              {option}
            </span>
          </label>
        )
      })}
    </div>
  )

  // Render the appropriate input type
  const renderInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return renderMultipleChoice()
      case 'short-answer':
      case 'constructed-response':
        return renderShortAnswer()
      case 'true-false':
        return renderTrueFalse()
      default:
        return renderShortAnswer() // Default to short answer
    }
  }

  return (
    <div
      className={`${showFeedback && isCorrect !== undefined ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : ''} rounded-lg p-4 transition-colors`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <label className="block text-sm font-medium b-text-primary flex-1">
          <span className="font-bold mr-2">{questionNumber}.</span>
          {question.question}
        </label>

        {/* Metadata Badges */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* DOK Badge */}
          <span
            className="px-2 py-0.5 rounded text-xs font-medium"
            style={{ backgroundColor: dokColors.bg, color: dokColors.text }}
            title={`Depth of Knowledge Level ${question.depthOfKnowledge}`}
          >
            DOK {question.depthOfKnowledge}
          </span>

          {/* Skill Badge */}
          {question.skill && (
            <span className="text-xs b-text-muted capitalize">
              {question.skill.replace(/-/g, ' ')}
            </span>
          )}
        </div>
      </div>

      {/* Question Input */}
      {renderInput()}

      {/* Hint (if available and not showing feedback) */}
      {question.hint && !showFeedback && (
        <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-800 border border-yellow-200">
          💡 <span className="font-medium">Hint:</span> {question.hint}
        </div>
      )}

      {/* Feedback (after submission) */}
      {showFeedback && (
        <div
          className={`mt-3 p-3 rounded-lg ${isCorrect ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'} border`}
        >
          <div className="flex items-start gap-2">
            <CheckCircle
              size={18}
              weight="fill"
              className={isCorrect ? 'text-green-600' : 'text-red-600'}
            />
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}
              >
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </p>
              {question.explanation && (
                <p className="text-sm mt-1 b-text-secondary">
                  {question.explanation}
                </p>
              )}
              {question.textEvidence && (
                <p className="text-sm mt-2 italic b-text-muted">
                  Text Evidence: &quot;{question.textEvidence}&quot;
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
