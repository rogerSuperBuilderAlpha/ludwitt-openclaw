import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const today = new Date().toISOString().split('T')[0]

    const snapshot = await db.collection('officeHoursBookings')
      .where('studentId', '==', userId)
      .where('status', '==', 'confirmed')
      .where('date', '>=', today)
      .orderBy('date', 'asc')
      .limit(50)
      .get()

    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return successResponse({ bookings })
  } catch (error) {
    return serverError(error, 'Failed to load bookings')
  }
}
