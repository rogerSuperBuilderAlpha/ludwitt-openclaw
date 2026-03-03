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

    const snapshot = await db.collection('peerReviewBadges')
      .where('userId', '==', userId)
      .get()

    const badges = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return successResponse({ badges })
  } catch (error) {
    return serverError(error, 'Failed to load badges')
  }
}
