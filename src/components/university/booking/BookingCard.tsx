'use client'

import { CalendarBlank, CalendarPlus, Clock, X, CircleNotch } from '@phosphor-icons/react'
import type { OfficeHoursBooking } from '@/lib/types/university'

interface BookingCardProps {
  booking: OfficeHoursBooking
  role: 'student' | 'professor'
  onCancel?: (bookingId: string) => void
  isCancelling?: boolean
  onDownloadICS?: (bookingId: string) => void
  isDownloadingICS?: boolean
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function BookingCard({ booking, role, onCancel, isCancelling, onDownloadICS, isDownloadingICS }: BookingCardProps) {
  const date = new Date(booking.date + 'T00:00:00')
  const dayName = DAY_NAMES[date.getDay()]
  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarBlank size={14} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {dayName}, {formatted}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {booking.startTime} - {booking.endTime}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {role === 'student'
              ? `With ${booking.professorName}`
              : `${booking.studentName} (${booking.studentEmail})`
            }
          </p>
          {booking.notes && (
            <p className="text-xs text-gray-400 mt-1 italic">{booking.notes}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onDownloadICS && (
            <button
              onClick={() => onDownloadICS(booking.id)}
              disabled={isDownloadingICS}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              {isDownloadingICS ? <CircleNotch size={12} className="animate-spin" /> : <CalendarPlus size={12} />}
              Add to Calendar
            </button>
          )}
          {onCancel && (
            <button
              onClick={() => onCancel(booking.id)}
              disabled={isCancelling}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              {isCancelling ? <CircleNotch size={12} className="animate-spin" /> : <X size={12} />}
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
