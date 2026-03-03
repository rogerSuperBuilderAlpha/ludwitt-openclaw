import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { ProfessorTimeSlot, DayOfWeek } from '@/lib/types/university'

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
    const month = parseInt(searchParams.get('month') || '', 10)
    const year = parseInt(searchParams.get('year') || '', 10)

    if (!month || !year || month < 1 || month > 12) {
      return badRequestError('Valid month and year are required')
    }

    // Query professors with time slots
    const profsSnap = await db.collection('professorProfiles')
      .where('displayName', '!=', '')
      .get()

    const professors = profsSnap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((p: Record<string, unknown>) => {
        const slots = p.timeSlots as ProfessorTimeSlot[] | undefined
        return slots && slots.length > 0
      })

    if (professors.length === 0) {
      return successResponse({ slots: [] })
    }

    // Month date range
    const monthStart = new Date(year, month - 1, 1)
    const monthEnd = new Date(year, month, 0)
    const startStr = monthStart.toISOString().split('T')[0]
    const endStr = monthEnd.toISOString().split('T')[0]

    // Batch-query all bookings for this month
    const bookingsSnap = await db.collection('officeHoursBookings')
      .where('status', '==', 'confirmed')
      .where('date', '>=', startStr)
      .where('date', '<=', endStr)
      .get()

    const bookedSet = new Set<string>()
    bookingsSnap.docs.forEach(doc => {
      const b = doc.data()
      bookedSet.add(`${b.professorId}_${b.date}_${b.startTime}`)
    })

    // Generate available slots for each professor for each day in the month
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const slots: { date: string; startTime: string; endTime: string; professorId: string; professorName: string }[] = []

    for (const prof of professors) {
      const profData = prof as Record<string, unknown>
      const timeSlots = profData.timeSlots as ProfessorTimeSlot[]
      const profId = profData.id as string
      const profName = profData.displayName as string

      for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
        // Skip past dates
        if (d < today) continue

        const dayOfWeek = d.getDay()
        const dateStr = d.toISOString().split('T')[0]

        for (const template of timeSlots) {
          if (DAY_INDEX[template.day] !== dayOfWeek) continue

          const startMin = timeToMinutes(template.startTime)
          const endMin = timeToMinutes(template.endTime)
          const duration = template.slotDurationMinutes

          for (let slotStart = startMin; slotStart + duration <= endMin; slotStart += duration) {
            const slotStartStr = minutesToTime(slotStart)
            const slotEndStr = minutesToTime(slotStart + duration)
            const key = `${profId}_${dateStr}_${slotStartStr}`

            if (!bookedSet.has(key)) {
              slots.push({
                date: dateStr,
                startTime: slotStartStr,
                endTime: slotEndStr,
                professorId: profId,
                professorName: profName,
              })
            }
          }
        }
      }
    }

    return successResponse({ slots })
  } catch (error) {
    return serverError(error, 'Failed to load available slots')
  }
}
