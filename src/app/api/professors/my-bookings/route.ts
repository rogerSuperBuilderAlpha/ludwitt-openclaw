import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Only professors can view their bookings')
    }

    const today = new Date().toISOString().split('T')[0]

    const snapshot = await db.collection('officeHoursBookings')
      .where('professorId', '==', userId)
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
