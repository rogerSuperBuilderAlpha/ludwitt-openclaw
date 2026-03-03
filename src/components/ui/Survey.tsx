'use client'

import { useState } from 'react'
import { Survey, SurveyQuestion } from '@/lib/types/survey'
import { Button } from './Button'
import { logger } from '@/lib/logger'

interface SurveyProps {
  survey: Survey
  onSubmit: (responses: {
    [questionId: string]: string | number
  }) => Promise<void>
  onSkip?: () => void
}

export function SurveyComponent({ survey, onSubmit, onSkip }: SurveyProps) {
  const [responses, setResponses] = useState<{
    [questionId: string]: string | number
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResponseChange = (questionId: string, value: string | number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const validateResponses = (): boolean => {
    const requiredQuestions = survey.questions.filter((q) => q.required)
    for (const question of requiredQuestions) {
      if (!responses[question.id] || responses[question.id] === '') {
        setError(`Please answer: ${question.question}`)
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateResponses()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(responses)
    } catch (err) {
      setError('Failed to submit survey. Please try again.')
      logger.error('Survey', 'Survey submission error', { error: err })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{survey.title}</h2>
        {survey.description && (
          <p className="text-gray-600">{survey.description}</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Questions */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {survey.questions.map((question, index) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            index={index}
            value={responses[question.id]}
            onChange={(value) => handleResponseChange(question.id, value)}
          />
        ))}

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </Button>
          {onSkip && (
            <Button
              type="button"
              onClick={onSkip}
              variant="secondary"
              disabled={isSubmitting}
            >
              Skip
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

interface QuestionRendererProps {
  question: SurveyQuestion
  index: number
  value: string | number | undefined
  onChange: (value: string | number) => void
}

function QuestionRenderer({
  question,
  index,
  value,
  onChange,
}: QuestionRendererProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {index + 1}. {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {question.type === 'text' && (
        <textarea
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          placeholder="Your answer..."
          required={question.required}
        />
      )}

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-2">
          {question.options.map((option, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
                required={question.required}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'yes-no' && (
        <div className="flex gap-4">
          <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
            <input
              type="radio"
              name={question.id}
              value="yes"
              checked={value === 'yes'}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600"
              required={question.required}
            />
            <span className="text-gray-700">Yes</span>
          </label>
          <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
            <input
              type="radio"
              name={question.id}
              value="no"
              checked={value === 'no'}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600"
              required={question.required}
            />
            <span className="text-gray-700">No</span>
          </label>
        </div>
      )}

      {question.type === 'rating' && (
        <div className="flex gap-2">
          {Array.from({ length: question.maxRating || 5 }, (_, i) => i + 1).map(
            (rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onChange(rating)}
                className={`w-12 h-12 rounded-lg border-2 font-semibold transition-colors ${
                  value === rating
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                {rating}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
