'use client'

import { CircleNotch } from '@phosphor-icons/react'
import { useSubmissionHistory } from '@/lib/hooks/useSubmissionHistory'
import type { SubmissionHistoryEventType } from '@/lib/types/university'

const EVENT_COLORS: Record<SubmissionHistoryEventType, string> = {
  started: 'bg-blue-400',
  submitted: 'bg-amber-400',
  resubmitted: 'bg-amber-400',
  links_updated: 'bg-gray-400',
  reviewed: 'bg-green-500',
  comment_added: 'bg-gray-400',
  peer_review_submitted: 'bg-purple-400',
  peer_review_endorsed: 'bg-purple-500',
  deadline_set: 'bg-gray-400',
  deadline_updated: 'bg-gray-400',
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

interface SubmissionHistoryTimelineProps {
  courseId: string
  deliverableId: string
}

export function SubmissionHistoryTimeline({ courseId, deliverableId }: SubmissionHistoryTimelineProps) {
  const { events, loading, error } = useSubmissionHistory(courseId, deliverableId)

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-3">
        <CircleNotch size={14} className="text-gray-400 animate-spin" />
        <span className="text-xs text-gray-400">Loading history...</span>
      </div>
    )
  }

  if (error) {
    return <p className="text-xs text-red-500 py-2">{error}</p>
  }

  if (events.length === 0) {
    return <p className="text-xs text-gray-400 py-2">No history yet.</p>
  }

  return (
    <div className="relative pl-4 border-l-2 border-gray-200 space-y-3 py-2">
      {events.map(event => {
        const dotColor = EVENT_COLORS[event.eventType] || 'bg-gray-400'
        return (
          <div key={event.id} className="relative">
            <div
              className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${dotColor} ring-2 ring-white`}
            />
            <p className="text-xs text-gray-700">{event.description}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {formatTimestamp(event.createdAt)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
