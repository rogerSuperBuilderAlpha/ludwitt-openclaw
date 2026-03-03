/**
 * ICS Calendar File Generator for Office Hours Bookings
 *
 * Generates RFC 5545-compliant .ics files with floating time (no timezone).
 */

import type { OfficeHoursBooking } from '@/lib/types/university'

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

function toICSDate(dateStr: string, timeStr: string): string {
  // dateStr: YYYY-MM-DD, timeStr: HH:mm → YYYYMMDDTHHMMSS (floating)
  const [y, m, d] = dateStr.split('-')
  const [h, min] = timeStr.split(':')
  return `${y}${m}${d}T${h}${min}00`
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export function generateBookingICS(
  booking: OfficeHoursBooking,
  role: 'student' | 'professor'
): string {
  const dtStart = toICSDate(booking.date, booking.startTime)
  const dtEnd = toICSDate(booking.date, booking.endTime)
  const counterpart = role === 'student' ? booking.professorName : booking.studentName
  const summary = `Office Hours with ${counterpart}`
  const description = booking.notes ? escapeICS(booking.notes) : ''
  const uid = `${booking.id}@ludwitt.com`
  const now = new Date()
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ludwitt//Office Hours//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICS(summary)}`,
    ...(description ? [`DESCRIPTION:${description}`] : []),
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return lines.join('\r\n')
}
