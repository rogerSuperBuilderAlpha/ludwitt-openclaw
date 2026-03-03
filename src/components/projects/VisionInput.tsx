'use client'

import { useEffect, useState } from 'react'
import { logger } from '@/lib/logger'

interface VisionInputProps {
  onSubmit: (vision: string) => Promise<void>
  initialVision?: string
  submitLabel?: string
}

export function VisionInput({
  onSubmit,
  initialVision = '',
  submitLabel,
}: VisionInputProps) {
  const [vision, setVision] = useState(initialVision)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setVision(initialVision)
    setSuccess(false)
  }, [initialVision])

  const wordCount = vision.trim().split(/\s+/).filter(Boolean).length
  const minWords = 50
  const maxWords = 500
  const isValid = wordCount >= minWords && wordCount <= maxWords

  const handleVisionChange = (value: string) => {
    if (success) {
      setSuccess(false)
    }
    if (error) {
      setError('')
    }
    setVision(value)
  }

  const handleSubmit = async () => {
    if (!isValid) return

    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      await onSubmit(vision)
      setSuccess(true)
    } catch (err) {
      logger.error('VisionInput', 'Failed to submit vision', { error: err })
      setError('Failed to submit your vision. Please try again.')
      setSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const buttonLabel = submitLabel ?? 'Generate My First Custom Project 🎯'

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-50 rounded-lg shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-5xl">🚀</div>
          <h2 className="text-3xl font-bold text-gray-900">
            What&apos;s Your 5-Year Vision?
          </h2>
          <p className="text-lg text-gray-700">
            You&apos;ve learned the fundamentals. Now let&apos;s build projects
            that take you where YOU want to go.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-6 space-y-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900">
            Tell us about your dream future:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>
                Where do you want to be in 5 years? (Career, lifestyle, income)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>What kind of projects do you want to build?</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>
                Who do you want to work with? (Clients, companies, yourself?)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>What skills or technologies excite you most?</span>
            </li>
          </ul>
          <div className="bg-blue-50 border border-gray-200 rounded p-3 text-xs text-blue-900">
            <p className="font-semibold mb-1">💡 Pro Tip:</p>
            <p>
              Be specific and honest! The AI will generate custom projects
              tailored to YOUR goals. The more detail you provide, the better
              your personalized learning path will be.
            </p>
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <textarea
            value={vision}
            onChange={(e) => handleVisionChange(e.target.value)}
            placeholder="In 5 years, I want to..."
            className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800"
          />
          <div className="flex justify-between items-center text-sm">
            <span
              className={`${
                wordCount < minWords
                  ? 'text-gray-500'
                  : wordCount > maxWords
                    ? 'text-red-600'
                    : 'text-green-600'
              }`}
            >
              {wordCount} / {minWords}-{maxWords} words
            </span>
            {!isValid && wordCount > 0 && (
              <span className="text-red-600 text-xs">
                {wordCount < minWords
                  ? `${minWords - wordCount} more words needed`
                  : `${wordCount - maxWords} words over limit`}
              </span>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
            {error}
          </div>
        )}

        {success && !error && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
            Vision saved! You can update it anytime as your goals evolve.
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full bg-gray-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl text-lg"
        >
          {isSubmitting ? 'Saving your vision...' : buttonLabel}
        </button>

        {/* Additional Context */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Your vision will guide the AI to create projects that help you
            achieve your goals. You can update it anytime as your dreams evolve!
          </p>
        </div>
      </div>
    </div>
  )
}
