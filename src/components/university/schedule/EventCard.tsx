'use client'

import { CircleNotch } from '@phosphor-icons/react'
import type { ScheduleEvent } from '@/lib/types/university'

const TYPE_COLORS: Record<string, string> = {
  'class-session': 'bg-gray-400',
  'office-hours-booked': 'bg-blue-500',
  'office-hours-available': 'bg-green-500',
  'google-calendar': 'bg-amber-500',
}

interface EventCardProps {
  event: ScheduleEvent
  role: 'student' | 'professor'
  onBook?: (event: ScheduleEvent) => void
  onCancel?: (bookingId: string) => void
  isCancelling?: boolean
}

export function EventCard({ event, role, onBook, onCancel, isCancelling }: EventCardProps) {
  const timeRange = event.meta?.isAllDay ? 'All day' : `${event.startTime} – ${event.endTime}`

  let subtitle = ''
  if (event.type === 'office-hours-available' && event.meta?.professorName) {
    subtitle = event.meta.professorName
  } else if (event.type === 'office-hours-booked' && event.meta?.notes) {
    subtitle = event.meta.notes
  } else if (event.type === 'google-calendar' && event.meta?.location) {
    subtitle = event.meta.location
  } else if (event.type === 'class-session') {
    subtitle = 'AI skills applied to your learning path'
  }

  return (
    <div className="flex items-stretch gap-0 bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Color stripe */}
      <div className={`w-1 shrink-0 ${TYPE_COLORS[event.type] || 'bg-gray-300'}`} />

      <div className="flex-1 px-3 py-2.5 flex items-center justify-between min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">{timeRange}</span>
            {subtitle && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400 truncate">{subtitle}</span>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0 ml-3">
          {event.type === 'office-hours-available' && role === 'student' && onBook && (
            <button
              onClick={() => onBook(event)}
              className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
            >
              Book
            </button>
          )}
          {event.type === 'office-hours-booked' && onCancel && event.meta?.bookingId && (
            <button
              onClick={() => onCancel(event.meta!.bookingId!)}
              disabled={isCancelling}
              className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              {isCancelling ? <CircleNotch size={12} className="animate-spin" /> : 'Cancel'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
