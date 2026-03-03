'use client'

import { CircleNotch, ClipboardText, ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import { usePeerReviewQueue } from '@/lib/hooks/usePeerReviewQueue'
import type { PeerReview } from '@/lib/types/university'

interface PeerReviewQueueProps {
  onSelectReview: (review: PeerReview) => void
  onBack: () => void
}

export function PeerReviewQueue({ onSelectReview, onBack }: PeerReviewQueueProps) {
  const { reviews, loading, error } = usePeerReviewQueue()

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <h2 className="text-lg font-bold text-gray-900 mb-3">Peer Reviews</h2>

      <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-600 leading-relaxed">
          Review deliverables submitted by other students. Giving thoughtful feedback sharpens your own understanding of the material, builds critical analysis skills, and earns endorsements from professors that strengthen your academic profile.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <CircleNotch size={24} className="text-gray-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <ClipboardText size={28} weight="duotone" className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No pending peer reviews assigned to you.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">{reviews.length} pending review{reviews.length !== 1 ? 's' : ''}</p>
          {reviews.map(review => (
            <button
              key={review.id}
              onClick={() => onSelectReview(review)}
              className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-0.5">
                    {review.deliverableTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    By {review.submitterName} &middot; {review.courseTitle}
                  </p>
                  {review.pathTopic && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{review.pathTopic}</p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">
                    Assigned {new Date(review.assignedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <ArrowRight size={14} className="text-gray-400 mt-1 shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
