'use client'

/**
 * RatingView
 *
 * Post-session rating interface for the Near Peer Tutor feature.
 * Shows a star-based rating form or a confirmation message after
 * the rating has been submitted.
 */

import { Star, Check } from '@phosphor-icons/react'
import { TutorSession } from '@/lib/types/tutor'

interface RatingViewProps {
  activeSession: TutorSession
  rating: number
  onRatingChange: (rating: number) => void
  ratingSubmitted: boolean
  loading: boolean
  onSubmitRating: () => void
  userId: string | undefined
}

export function RatingView({
  activeSession,
  rating,
  onRatingChange,
  ratingSubmitted,
  loading,
  onSubmitRating,
  userId,
}: RatingViewProps) {
  if (ratingSubmitted) {
    return (
      <div className="text-center py-8">
        <Check size={48} className="b-text-reading mx-auto mb-4" />
        <h3 className="text-xl font-bold b-text-primary mb-2">Thank you!</h3>
        <p className="b-text-secondary">Your rating has been submitted.</p>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <h3 className="text-xl font-bold b-text-primary mb-2">
        Session Complete!
      </h3>
      <p className="b-text-secondary mb-6">
        How was your experience with{' '}
        {activeSession.studentId === userId
          ? activeSession.tutorDisplayName
          : activeSession.studentDisplayName}
        ?
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="p-2 hover:scale-110 transition-transform"
          >
            <Star
              size={36}
              weight={rating >= star ? 'fill' : 'regular'}
              className={rating >= star ? 'b-text-writing' : 'b-text-muted'}
            />
          </button>
        ))}
      </div>

      <button
        onClick={onSubmitRating}
        disabled={rating === 0 || loading}
        className="px-8 py-3 b-bg-math text-white rounded-lg hover:b-bg-math disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Submit Rating
      </button>
    </div>
  )
}
