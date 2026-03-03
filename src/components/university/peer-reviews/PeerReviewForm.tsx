'use client'

import { useState } from 'react'
import { Star, CircleNotch, ArrowLeft } from '@phosphor-icons/react'
import { useSubmitPeerReview } from '@/lib/hooks/useSubmitPeerReview'
import type { PeerReview, PeerReviewRubricScores } from '@/lib/types/university'

interface PeerReviewFormProps {
  review: PeerReview
  onBack: () => void
  onSubmitted: () => void
}

function StarRating({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-gray-700">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="p-0.5 transition-colors"
          >
            <Star
              size={20}
              weight={n <= value ? 'fill' : 'regular'}
              className={n <= value ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export function PeerReviewForm({ review, onBack, onSubmitted }: PeerReviewFormProps) {
  const { submitReview, isSubmitting, error } = useSubmitPeerReview()
  const [scores, setScores] = useState<PeerReviewRubricScores>({
    clarity: 0,
    completeness: 0,
    technicalQuality: 0,
  })
  const [feedback, setFeedback] = useState('')

  const allScored = scores.clarity > 0 && scores.completeness > 0 && scores.technicalQuality > 0
  const feedbackValid = feedback.trim().length >= 10

  async function handleSubmit() {
    if (!allScored || !feedbackValid) return

    const result = await submitReview({
      reviewId: review.id,
      rubricScores: scores,
      feedback: feedback.trim(),
    })

    if (result.success) {
      onSubmitted()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Queue
      </button>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Peer Review</h3>
        <p className="text-xs text-gray-500 mb-4">
          Review {review.submitterName}&apos;s work on &ldquo;{review.deliverableTitle}&rdquo; ({review.courseTitle})
        </p>

        {/* Rubric */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-gray-900">Rubric Scores</h4>
          <StarRating label="Clarity" value={scores.clarity} onChange={v => setScores(prev => ({ ...prev, clarity: v }))} />
          <StarRating label="Completeness" value={scores.completeness} onChange={v => setScores(prev => ({ ...prev, completeness: v }))} />
          <StarRating label="Technical Quality" value={scores.technicalQuality} onChange={v => setScores(prev => ({ ...prev, technicalQuality: v }))} />
        </div>

        {/* Feedback */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Written Feedback
            <span className="text-gray-400 font-normal ml-1">({feedback.length}/2000)</span>
          </label>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value.slice(0, 2000))}
            placeholder="Provide constructive feedback (minimum 10 characters)..."
            rows={5}
            maxLength={2000}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          {feedback.length > 0 && feedback.length < 10 && (
            <p className="text-[10px] text-amber-600 mt-1">Minimum 10 characters required</p>
          )}
        </div>

        {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !allScored || !feedbackValid}
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting && <CircleNotch size={14} className="animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'Submit Review (+25 XP)'}
        </button>
      </div>
    </div>
  )
}
