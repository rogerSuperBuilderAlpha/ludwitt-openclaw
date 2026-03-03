/* eslint-disable jsx-a11y/aria-role */
'use client'

import { useState, useMemo } from 'react'
import { MonthlyCalendar } from './MonthlyCalendar'
import { DayDetailPanel } from './DayDetailPanel'
import { useScheduleEvents } from '@/lib/hooks/useScheduleEvents'
import { useCancelBooking } from '@/lib/hooks/useCancelBooking'
import { OfficeHoursManager } from '@/components/professors/OfficeHoursManager'

export function ProfessorScheduleTab() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const { events, daySummaries, loading, refetchBookings } = useScheduleEvents(
    month,
    year,
    'professor'
  )
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

  async function handleCancel(bookingId: string) {
    const result = await cancelBooking(bookingId)
    if (result.success) {
      refetchBookings()
    }
  }

  return (
    <div className="space-y-6">
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
              role="professor"
              onCancel={handleCancel}
              isCancelling={isCancelling}
            />
          )}
        </div>
      )}

      <OfficeHoursManager />
    </div>
  )
}
