import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { notifyBookingCancelled } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { bookingId } = body

    if (!bookingId) {
      return badRequestError('bookingId is required')
    }

    const bookingRef = db.collection('officeHoursBookings').doc(bookingId)
    const bookingDoc = await bookingRef.get()

    if (!bookingDoc.exists) {
      return notFoundError('Booking not found')
    }

    const booking = bookingDoc.data()!

    // Only the student or professor involved can cancel
    if (booking.studentId !== userId && booking.professorId !== userId) {
      return forbiddenError('You are not authorized to cancel this booking')
    }

    if (booking.status !== 'confirmed') {
      return badRequestError('Only confirmed bookings can be cancelled')
    }

    await bookingRef.update({
      status: 'cancelled',
      cancelledBy: userId,
      cancelledAt: new Date().toISOString(),
    })

    // Notify the other party (fire-and-forget)
    const recipientId = booking.studentId === userId ? booking.professorId : booking.studentId
    const cancellerName = booking.studentId === userId
      ? (booking.studentName as string) || 'Student'
      : (booking.professorName as string) || 'Professor'
    notifyBookingCancelled(recipientId as string, cancellerName, booking.date as string, booking.startTime as string)

    return successResponse({ bookingId, status: 'cancelled' })
  } catch (error) {
    return serverError(error, 'Failed to cancel booking')
  }
}
