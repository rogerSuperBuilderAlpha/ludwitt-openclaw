'use client'

import { useMemo } from 'react'
import { useMyBookings } from './useMyBookings'
import { useAllAvailableSlots } from './useAllAvailableSlots'
import { useGoogleCalendarEvents } from './useGoogleCalendarEvents'
import { FIXED_CLASS_SESSIONS, DAY_INDEX } from '@/config/university-schedule'
import type { ScheduleEvent } from '@/lib/types/university'

export interface DaySummary {
  classCount: number
  bookedCount: number
  availableCount: number
  googleCount: number
}

interface UseScheduleEventsOptions {
  calendarConnected?: boolean
}

export function useScheduleEvents(
  month: number,
  year: number,
  role: 'student' | 'professor',
  options: UseScheduleEventsOptions = {}
) {
  const { calendarConnected = false } = options

  const { bookings, loading: bookingsLoading, refetch: refetchBookings } = useMyBookings(role)
  const { slots: availableSlots, loading: slotsLoading, refetch: refetchSlots } = useAllAvailableSlots(month, year)
  const { events: googleEvents, loading: googleLoading } = useGoogleCalendarEvents(
    month, year, role === 'student' && calendarConnected
  )

  const events = useMemo(() => {
    const result: ScheduleEvent[] = []

    // 1. Fixed class sessions for matching days in the month
    const daysInMonth = new Date(year, month, 0).getDate()
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month - 1, d)
      const dayOfWeek = date.getDay()
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`

      for (const session of FIXED_CLASS_SESSIONS) {
        if (DAY_INDEX[session.day] === dayOfWeek) {
          result.push({
            id: `class-${session.id}-${dateStr}`,
            type: 'class-session',
            title: session.title,
            date: dateStr,
            startTime: session.startTime,
            endTime: session.endTime,
          })
        }
      }
    }

    // 2. Booked office hours (filter to current month)
    const monthPrefix = `${year}-${String(month).padStart(2, '0')}`
    for (const booking of bookings) {
      if (!booking.date.startsWith(monthPrefix)) continue
      if (booking.status !== 'confirmed') continue

      result.push({
        id: `booking-${booking.id}`,
        type: 'office-hours-booked',
        title: role === 'student'
          ? `Office Hours with ${booking.professorName}`
          : `Office Hours: ${booking.studentName}`,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        meta: {
          professorId: booking.professorId,
          professorName: booking.professorName,
          bookingId: booking.id,
          notes: booking.notes,
        },
      })
    }

    // 3. Students: available office hours from all professors
    if (role === 'student') {
      for (const slot of availableSlots) {
        result.push({
          id: `avail-${slot.professorId}-${slot.date}-${slot.startTime}`,
          type: 'office-hours-available',
          title: `Available: ${slot.professorName}`,
          date: slot.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          meta: {
            professorId: slot.professorId,
            professorName: slot.professorName,
          },
        })
      }
    }

    // 4. Students with Google Calendar connected
    if (role === 'student' && calendarConnected) {
      for (const gEvent of googleEvents) {
        result.push({
          id: `gcal-${gEvent.id}`,
          type: 'google-calendar',
          title: gEvent.title,
          date: gEvent.date,
          startTime: gEvent.startTime,
          endTime: gEvent.endTime,
          meta: {
            googleEventId: gEvent.id,
            location: gEvent.location,
            isAllDay: gEvent.isAllDay,
          },
        })
      }
    }

    return result
  }, [bookings, availableSlots, googleEvents, month, year, role, calendarConnected])

  // Compute per-day summaries for calendar dots
  const daySummaries = useMemo(() => {
    const map: Record<string, DaySummary> = {}
    for (const event of events) {
      if (!map[event.date]) {
        map[event.date] = { classCount: 0, bookedCount: 0, availableCount: 0, googleCount: 0 }
      }
      const s = map[event.date]
      switch (event.type) {
        case 'class-session': s.classCount++; break
        case 'office-hours-booked': s.bookedCount++; break
        case 'office-hours-available': s.availableCount++; break
        case 'google-calendar': s.googleCount++; break
      }
    }
    return map
  }, [events])

  const loading = bookingsLoading || (role === 'student' && slotsLoading) || (role === 'student' && calendarConnected && googleLoading)

  return {
    events,
    daySummaries,
    loading,
    refetchBookings,
    refetchSlots,
  }
}
