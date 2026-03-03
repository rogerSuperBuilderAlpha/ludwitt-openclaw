'use client'

import { CircleNotch } from '@phosphor-icons/react'
import { usePeerReviewsForDeliverable } from '@/lib/hooks/usePeerReviewsForDeliverable'
import { PeerReviewDisplay } from './PeerReviewDisplay'

interface PeerReviewsForDeliverableProps {
  deliverableId: string
  showEndorse?: boolean
  onEndorse?: (reviewId: string) => void
  isEndorsing?: boolean
}

export function PeerReviewsForDeliverable({
  deliverableId,
  showEndorse,
  onEndorse,
  isEndorsing,
}: PeerReviewsForDeliverableProps) {
  const { reviews, loading, error } = usePeerReviewsForDeliverable(deliverableId)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <CircleNotch size={16} className="text-gray-300 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <p className="text-xs text-red-500">{error}</p>
  }

  if (reviews.length === 0) {
    return null
  }

  const completed = reviews.filter(r => r.status === 'completed' || r.status === 'endorsed')
  const pending = reviews.filter(r => r.status === 'pending')

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <h5 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
        Peer Reviews ({completed.length} completed, {pending.length} pending)
      </h5>
      <div className="space-y-2">
        {completed.map(review => (
          <PeerReviewDisplay
            key={review.id}
            review={review}
            showEndorse={showEndorse}
            onEndorse={onEndorse}
            isEndorsing={isEndorsing}
          />
        ))}
        {pending.map(review => (
          <div key={review.id} className="border border-dashed border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-400">
              Awaiting review from {review.reviewerName}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
