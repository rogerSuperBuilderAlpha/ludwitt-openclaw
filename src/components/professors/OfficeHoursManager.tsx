'use client'

import { useState } from 'react'
import { CalendarBlank, Clock, CircleNotch, X, CalendarPlus, CaretDown, CaretRight, UserCircle } from '@phosphor-icons/react'
import { useProfessorProfile } from '@/lib/hooks/useProfessorProfile'
import { useMyBookings } from '@/lib/hooks/useMyBookings'
import { useCancelBooking } from '@/lib/hooks/useCancelBooking'
import { useDownloadBookingICS } from '@/lib/hooks/useDownloadBookingICS'
import { TimeSlotEditor } from '@/components/professors/editor/TimeSlotEditor'
import type { OfficeHoursBooking, ProfessorTimeSlot } from '@/lib/types/university'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function groupBookingsByDate(bookings: OfficeHoursBooking[]) {
  const groups: Record<string, OfficeHoursBooking[]> = {}
  for (const b of bookings) {
    if (!groups[b.date]) groups[b.date] = []
    groups[b.date].push(b)
  }
  // Sort each group by startTime
  for (const date in groups) {
    groups[date].sort((a, b) => a.startTime.localeCompare(b.startTime))
  }
  return groups
}

export function OfficeHoursManager() {
  const { profile, loading: profileLoading } = useProfessorProfile()
  const { bookings, loading: bookingsLoading, error: bookingsError, refetch } = useMyBookings('professor')
  const { cancelBooking, isCancelling } = useCancelBooking()
  const { downloadICS, isDownloadingICS } = useDownloadBookingICS()
  const [showScheduleEditor, setShowScheduleEditor] = useState(false)
  const [savedSlots, setSavedSlots] = useState<ProfessorTimeSlot[] | null>(null)

  const timeSlots = savedSlots ?? profile?.timeSlots ?? []
  const loading = profileLoading || bookingsLoading
  const grouped = groupBookingsByDate(bookings)
  const dates = Object.keys(grouped).sort()

  async function handleCancel(bookingId: string) {
    const result = await cancelBooking(bookingId)
    if (result.success) refetch()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <CircleNotch size={24} className="text-gray-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Schedule management */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <button
          type="button"
          onClick={() => setShowScheduleEditor(!showScheduleEditor)}
          className="flex items-center gap-2 w-full text-left"
        >
          {showScheduleEditor ? <CaretDown size={14} className="text-gray-400" /> : <CaretRight size={14} className="text-gray-400" />}
          <h3 className="text-sm font-semibold text-gray-900">Weekly Schedule</h3>
          <span className="text-xs text-gray-400 ml-auto">
            {timeSlots.length === 0
              ? 'No slots configured'
              : `${timeSlots.length} slot${timeSlots.length !== 1 ? 's' : ''} configured`
            }
          </span>
        </button>

        {/* Summary when collapsed */}
        {!showScheduleEditor && timeSlots.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {timeSlots.map((slot, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1"
              >
                <span className="font-medium capitalize">{slot.day.slice(0, 3)}</span>
                {slot.startTime}–{slot.endTime}
                <span className="text-gray-400">({slot.slotDurationMinutes}m)</span>
              </span>
            ))}
          </div>
        )}

        {/* Editor when expanded */}
        {showScheduleEditor && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <TimeSlotEditor
              initialSlots={timeSlots}
              onSaved={(slots) => {
                setSavedSlots(slots)
                setShowScheduleEditor(false)
              }}
            />
          </div>
        )}
      </div>

      {/* Upcoming student sign-ups */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Upcoming Student Sign-Ups
        </h3>

        {bookingsError && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 mb-3">
            {bookingsError}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <CalendarBlank size={28} weight="duotone" className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No upcoming office hours booked by students.</p>
            {timeSlots.length === 0 && (
              <p className="text-xs text-gray-400 mt-1">
                Configure your weekly schedule above so students can book time with you.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {dates.map(date => {
              const dateObj = new Date(date + 'T00:00:00')
              const dayName = DAY_NAMES[dateObj.getDay()]
              const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              const dayBookings = grouped[date]

              return (
                <div key={date} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Date header */}
                  <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                    <CalendarBlank size={14} className="text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900">
                      {dayName}, {formatted}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {dayBookings.length} student{dayBookings.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Bookings for this date */}
                  <div className="divide-y divide-gray-100">
                    {dayBookings.map(booking => (
                      <div key={booking.id} className="px-4 py-3 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <UserCircle size={28} weight="duotone" className="text-gray-300 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{booking.studentName}</p>
                            <p className="text-xs text-gray-500">{booking.studentEmail}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Clock size={11} className="text-gray-400" />
                              <span className="text-xs text-gray-600">{booking.startTime} – {booking.endTime}</span>
                            </div>
                            {booking.notes && (
                              <p className="text-xs text-gray-400 mt-1 italic">&ldquo;{booking.notes}&rdquo;</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => downloadICS(booking.id)}
                            disabled={isDownloadingICS}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                            title="Download calendar event"
                          >
                            {isDownloadingICS ? <CircleNotch size={12} className="animate-spin" /> : <CalendarPlus size={12} />}
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            disabled={isCancelling}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                            title="Cancel booking"
                          >
                            {isCancelling ? <CircleNotch size={12} className="animate-spin" /> : <X size={12} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
