'use client'

/**
 * ReviewScheduleMessage Component
 *
 * Shows a post-problem message about when the concept will be reviewed next.
 * Makes the spaced repetition scheduling VISIBLE to users.
 *
 * Example: "We'll remind you to review 'Algebraic Equations' in 3 days
 * to strengthen your memory."
 */

import { useState } from 'react'
import { Calendar, CheckCircle, Brain, X } from '@phosphor-icons/react'
import { ReviewScheduleMessage as ReviewScheduleMessageType } from '@/lib/types/spaced-repetition'

interface ReviewScheduleMessageProps {
  message: ReviewScheduleMessageType
  onDismiss: () => void
  onViewSchedule?: () => void
  variant?: 'inline' | 'toast' | 'card'
}

export function ReviewScheduleMessage({
  message,
  onDismiss,
  onViewSchedule,
  variant = 'inline',
}: ReviewScheduleMessageProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss()
  }

  // Format the date nicely
  const formatReviewDate = () => {
    const date = new Date(message.nextReviewDate)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'later today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'tomorrow'
    } else if (message.daysUntilReview <= 7) {
      return `in ${message.daysUntilReview} days`
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  if (variant === 'toast') {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{message.message}</p>
              <div className="flex gap-2 mt-3">
                {onViewSchedule && (
                  <button
                    onClick={onViewSchedule}
                    className="text-xs font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Schedule
                  </button>
                )}
                <button
                  onClick={handleDismiss}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Got it
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Brain size={20} weight="fill" className="text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-purple-900 mb-1">
              {message.isFirstReview
                ? '📚 New Concept Added!'
                : '📅 Review Scheduled'}
            </h4>
            <p className="text-sm text-purple-700">{message.message}</p>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-purple-600">
                <Calendar size={14} />
                <span>Next review: {formatReviewDate()}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              {onViewSchedule && (
                <button
                  onClick={onViewSchedule}
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 px-3 py-1.5 bg-purple-100 rounded-lg transition-colors"
                >
                  View Schedule
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="text-sm font-medium text-gray-600 hover:text-gray-700 px-3 py-1.5 hover:bg-purple-100 rounded-lg transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default inline variant
  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
        <Calendar size={16} className="text-purple-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 truncate">{message.message}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {onViewSchedule && (
          <button
            onClick={onViewSchedule}
            className="text-xs font-medium text-purple-600 hover:text-purple-700 whitespace-nowrap"
          >
            View Schedule
          </button>
        )}
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}
