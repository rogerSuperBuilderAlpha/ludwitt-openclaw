import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { ProfessorTimeSlot, DayOfWeek, AvailableSlot } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

const DAY_INDEX: Record<DayOfWeek, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const { searchParams } = new URL(request.url)
    const professorId = searchParams.get('professorId')

    if (!professorId) {
      return badRequestError('professorId is required')
    }

    // Get professor profile with time slots
    const profDoc = await db.collection('professorProfiles').doc(professorId).get()
    if (!profDoc.exists) {
      return notFoundError('Professor not found')
    }

    const profData = profDoc.data()!
    const timeSlots: ProfessorTimeSlot[] = profData.timeSlots || []

    if (timeSlots.length === 0) {
      return successResponse({ slots: [] })
    }

    // Get confirmed bookings for the next 14 days
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 14)

    const todayStr = today.toISOString().split('T')[0]
    const endStr = endDate.toISOString().split('T')[0]

    const bookingsSnap = await db.collection('officeHoursBookings')
      .where('professorId', '==', professorId)
      .where('status', '==', 'confirmed')
      .where('date', '>=', todayStr)
      .where('date', '<=', endStr)
      .get()

    const bookedSet = new Set<string>()
    bookingsSnap.docs.forEach(doc => {
      const b = doc.data()
      bookedSet.add(`${b.date}_${b.startTime}`)
    })

    // Generate available slots for each of the next 14 days
    const available: AvailableSlot[] = []

    for (let d = 0; d < 14; d++) {
      const date = new Date(today)
      date.setDate(date.getDate() + d)
      const dayOfWeek = date.getDay() // 0=Sun
      const dateStr = date.toISOString().split('T')[0]

      // Find matching time slot templates for this day
      for (const template of timeSlots) {
        if (DAY_INDEX[template.day] !== dayOfWeek) continue

        const startMin = timeToMinutes(template.startTime)
        const endMin = timeToMinutes(template.endTime)
        const duration = template.slotDurationMinutes

        for (let slotStart = startMin; slotStart + duration <= endMin; slotStart += duration) {
          const slotStartStr = minutesToTime(slotStart)
          const slotEndStr = minutesToTime(slotStart + duration)
          const key = `${dateStr}_${slotStartStr}`

          if (!bookedSet.has(key)) {
            available.push({
              date: dateStr,
              startTime: slotStartStr,
              endTime: slotEndStr,
              dayOfWeek: template.day,
            })
          }
        }
      }
    }

    return successResponse({ slots: available })
  } catch (error) {
    return serverError(error, 'Failed to load available slots')
  }
}
