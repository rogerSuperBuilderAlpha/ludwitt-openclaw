'use client'

import { CalendarBlank } from '@phosphor-icons/react'
import { EventCard } from './EventCard'
import type { ScheduleEvent } from '@/lib/types/university'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface DayDetailPanelProps {
  date: string // YYYY-MM-DD
  events: ScheduleEvent[]
  role: 'student' | 'professor'
  onBook?: (event: ScheduleEvent) => void
  onCancel?: (bookingId: string) => void
  isCancelling?: boolean
}

export function DayDetailPanel({ date, events, role, onBook, onCancel, isCancelling }: DayDetailPanelProps) {
  const dateObj = new Date(date + 'T00:00:00')
  const dayName = DAY_NAMES[dateObj.getDay()]
  const monthName = MONTH_NAMES[dateObj.getMonth()]
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  const sortedEvents = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime))

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        {dayName}, {monthName} {day}, {year}
      </h3>

      {sortedEvents.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <CalendarBlank size={24} weight="duotone" className="text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-gray-500">No events on this day</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              role={role}
              onBook={onBook}
              onCancel={onCancel}
              isCancelling={isCancelling}
            />
          ))}
        </div>
      )}
    </div>
  )
}
