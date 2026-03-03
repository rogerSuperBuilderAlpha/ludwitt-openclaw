import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { DayOfWeek, ProfessorTimeSlot } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

const VALID_DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const VALID_DURATIONS = [15, 30, 45, 60]
const MAX_SLOTS = 20

function isValidTime(time: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time)
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function slotsOverlap(a: { day: string; startTime: string; endTime: string }, b: { day: string; startTime: string; endTime: string }): boolean {
  if (a.day !== b.day) return false
  const aStart = timeToMinutes(a.startTime)
  const aEnd = timeToMinutes(a.endTime)
  const bStart = timeToMinutes(b.startTime)
  const bEnd = timeToMinutes(b.endTime)
  return aStart < bEnd && bStart < aEnd
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Only professors can manage time slots')
    }

    const body = await request.json()
    const { timeSlots } = body

    if (!Array.isArray(timeSlots)) {
      return badRequestError('timeSlots must be an array')
    }

    if (timeSlots.length > MAX_SLOTS) {
      return badRequestError(`Maximum ${MAX_SLOTS} time slots allowed`)
    }

    // Validate each slot
    for (const slot of timeSlots) {
      if (!VALID_DAYS.includes(slot.day)) {
        return badRequestError(`Invalid day: ${slot.day}`)
      }
      if (!isValidTime(slot.startTime) || !isValidTime(slot.endTime)) {
        return badRequestError('Times must be in HH:mm format')
      }
      if (timeToMinutes(slot.startTime) >= timeToMinutes(slot.endTime)) {
        return badRequestError('startTime must be before endTime')
      }
      if (!VALID_DURATIONS.includes(slot.slotDurationMinutes)) {
        return badRequestError('slotDurationMinutes must be 15, 30, 45, or 60')
      }
    }

    // Check for overlapping slots
    for (let i = 0; i < timeSlots.length; i++) {
      for (let j = i + 1; j < timeSlots.length; j++) {
        if (slotsOverlap(timeSlots[i], timeSlots[j])) {
          return badRequestError(`Time slots overlap: ${timeSlots[i].day} ${timeSlots[i].startTime}-${timeSlots[i].endTime} and ${timeSlots[j].day} ${timeSlots[j].startTime}-${timeSlots[j].endTime}`)
        }
      }
    }

    // Assign IDs and save to professor profile
    const slotsWithIds: ProfessorTimeSlot[] = timeSlots.map((slot: Omit<ProfessorTimeSlot, 'id'>, idx: number) => ({
      id: `ts_${idx}`,
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      slotDurationMinutes: slot.slotDurationMinutes,
    }))

    await db.collection('professorProfiles').doc(userId).set({
      timeSlots: slotsWithIds,
      updatedAt: new Date().toISOString(),
    }, { merge: true })

    return successResponse({ timeSlots: slotsWithIds })
  } catch (error) {
    return serverError(error, 'Failed to save time slots')
  }
}
