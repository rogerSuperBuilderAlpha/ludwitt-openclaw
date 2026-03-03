import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { db } from '@/lib/firebase/admin'
import { generateBookingICS } from '@/lib/university/ics-generator'
import type { OfficeHoursBooking } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const bookingId = request.nextUrl.searchParams.get('bookingId')
    if (!bookingId) {
      return badRequestError('bookingId query parameter is required')
    }

    const bookingDoc = await db.collection('officeHoursBookings').doc(bookingId).get()
    if (!bookingDoc.exists) {
      return notFoundError('Booking not found')
    }

    const booking = { id: bookingDoc.id, ...bookingDoc.data() } as OfficeHoursBooking

    // Verify user is student or professor on this booking
    const isStudent = booking.studentId === userId
    const isProfessorOnBooking = booking.professorId === userId
    if (!isStudent && !isProfessorOnBooking) {
      return notFoundError('Booking not found')
    }

    if (booking.status !== 'confirmed') {
      return badRequestError('Can only download calendar for confirmed bookings')
    }

    const role = isStudent ? 'student' : 'professor'
    const icsContent = generateBookingICS(booking, role as 'student' | 'professor')

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="office-hours-${booking.date}.ics"`,
      },
    })
  } catch (error) {
    return serverError(error, 'Failed to generate calendar file')
  }
}
