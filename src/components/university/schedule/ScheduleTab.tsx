/* eslint-disable jsx-a11y/aria-role */
'use client'

import { useState, useMemo } from 'react'
import { MonthlyCalendar } from './MonthlyCalendar'
import { DayDetailPanel } from './DayDetailPanel'
import { CalendarConnectBanner } from './CalendarConnectBanner'
import { useScheduleEvents } from '@/lib/hooks/useScheduleEvents'
import { useUniversityCalendarStatus } from '@/lib/hooks/useUniversityCalendarStatus'
import { useBookSlot } from '@/lib/hooks/useBookSlot'
import { useCancelBooking } from '@/lib/hooks/useCancelBooking'
import type { ScheduleEvent } from '@/lib/types/university'

export function ScheduleTab() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const {
    connected,
    email,
    loading: calLoading,
    connectCalendar,
  } = useUniversityCalendarStatus()
  const { events, daySummaries, loading, refetchBookings, refetchSlots } =
    useScheduleEvents(month, year, 'student', { calendarConnected: connected })
  const { bookSlot, isBooking } = useBookSlot()
  const { cancelBooking, isCancelling } = useCancelBooking()

  const dayEvents = useMemo(() => {
    if (!selectedDate) return []
    return events.filter((e) => e.date === selectedDate)
  }, [events, selectedDate])

  function handleChangeMonth(m: number, y: number) {
    setMonth(m)
    setYear(y)
    setSelectedDate(null)
  }

  async function handleBook(event: ScheduleEvent) {
    if (!event.meta?.professorId) return
    const notes =
      window.prompt('Add a note for the professor (optional):') ?? undefined
    const result = await bookSlot({
      professorId: event.meta.professorId,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      notes: notes || undefined,
    })
    if (result.success) {
      refetchBookings()
      refetchSlots()
    }
  }

  async function handleCancel(bookingId: string) {
    const result = await cancelBooking(bookingId)
    if (result.success) {
      refetchBookings()
      refetchSlots()
    }
  }

  return (
    <div>
      {/* Explainer */}
      <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-600 leading-relaxed">
          Your unified schedule — class sessions (Tue/Thu), professor office
          hours you can book, and your Google Calendar events in one view. Click
          a day to see details and book available slots.
        </p>
      </div>

      <CalendarConnectBanner
        connected={connected}
        email={email}
        loading={calLoading}
        onConnect={connectCalendar}
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-5">
          <MonthlyCalendar
            month={month}
            year={year}
            daySummaries={daySummaries}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onChangeMonth={handleChangeMonth}
          />

          {selectedDate && (
            <DayDetailPanel
              date={selectedDate}
              events={dayEvents}
              role="student"
              onBook={handleBook}
              onCancel={handleCancel}
              isCancelling={isCancelling || isBooking}
            />
          )}
        </div>
      )}
    </div>
  )
}
