'use client'

import { Star, Check } from '@phosphor-icons/react'
import type { PeerReview } from '@/lib/types/university'

interface PeerReviewDisplayProps {
  review: PeerReview
  showEndorse?: boolean
  onEndorse?: (reviewId: string) => void
  isEndorsing?: boolean
}

function RubricBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-gray-500 w-24 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(n => (
          <Star
            key={n}
            size={12}
            weight={n <= score ? 'fill' : 'regular'}
            className={n <= score ? 'text-amber-400' : 'text-gray-200'}
          />
        ))}
      </div>
      <span className="text-[10px] text-gray-400">{score}/5</span>
    </div>
  )
}

export function PeerReviewDisplay({ review, showEndorse, onEndorse, isEndorsing }: PeerReviewDisplayProps) {
  const isEndorsed = review.status === 'endorsed'

  return (
    <div className={`border rounded-lg p-3 ${isEndorsed ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">{review.reviewerName}</span>
          {isEndorsed && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
              <Check size={8} weight="bold" /> Endorsed
            </span>
          )}
        </div>
        {review.completedAt && (
          <span className="text-[10px] text-gray-400">
            {new Date(review.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>

      {review.rubricScores && (
        <div className="space-y-1 mb-2">
          <RubricBar label="Clarity" score={review.rubricScores.clarity} />
          <RubricBar label="Completeness" score={review.rubricScores.completeness} />
          <RubricBar label="Technical" score={review.rubricScores.technicalQuality} />
        </div>
      )}

      {review.feedback && (
        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{review.feedback}</p>
      )}

      {showEndorse && !isEndorsed && review.status === 'completed' && onEndorse && (
        <button
          onClick={() => onEndorse(review.id)}
          disabled={isEndorsing}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-lg border border-green-200 disabled:opacity-50 transition-colors"
        >
          <Check size={12} weight="bold" />
          {isEndorsing ? 'Endorsing...' : 'Endorse Review'}
        </button>
      )}
    </div>
  )
}
