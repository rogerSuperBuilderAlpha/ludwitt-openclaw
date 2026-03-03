import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { notifyBookingCreated } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    const body = await request.json()
    const { professorId, date, startTime, endTime, notes } = body

    if (!professorId || !date || !startTime || !endTime) {
      return badRequestError('professorId, date, startTime, and endTime are required')
    }

    // Validate date is in the future
    const slotDate = new Date(date + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (slotDate < today) {
      return badRequestError('Cannot book slots in the past')
    }

    // Get professor profile
    const profDoc = await db.collection('professorProfiles').doc(professorId).get()
    if (!profDoc.exists) {
      return notFoundError('Professor not found')
    }
    const profData = profDoc.data()!

    // Use a Firestore transaction to prevent double-booking
    const bookingRef = db.collection('officeHoursBookings').doc()

    await db.runTransaction(async (txn) => {
      // Check for existing confirmed booking at this slot
      const existing = await txn.get(
        db.collection('officeHoursBookings')
          .where('professorId', '==', professorId)
          .where('date', '==', date)
          .where('startTime', '==', startTime)
          .where('status', '==', 'confirmed')
          .limit(1)
      )

      if (!existing.empty) {
        throw new Error('SLOT_TAKEN')
      }

      const studentName = decodedToken.name || decodedToken.email?.split('@')[0] || 'Student'

      txn.set(bookingRef, {
        professorId,
        professorName: profData.displayName || 'Professor',
        studentId: userId,
        studentName,
        studentEmail: decodedToken.email || '',
        date,
        startTime,
        endTime,
        status: 'confirmed',
        ...(notes && { notes }),
        createdAt: new Date().toISOString(),
      })
    })

    // Notify professor (fire-and-forget)
    const studentName = decodedToken.name || decodedToken.email?.split('@')[0] || 'Student'
    notifyBookingCreated(professorId, studentName, date, startTime)

    return successResponse({ bookingId: bookingRef.id, status: 'confirmed' })
  } catch (error) {
    if (error instanceof Error && error.message === 'SLOT_TAKEN') {
      return badRequestError('This time slot has already been booked')
    }
    return serverError(error, 'Failed to book slot')
  }
}
