import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deliverableId: string }> }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const { deliverableId } = await params

    if (!deliverableId) {
      return badRequestError('deliverableId is required')
    }

    // Get all reviews for this deliverable where user is submitter, reviewer, or professor
    const snapshot = await db.collection('peerReviews')
      .where('deliverableId', '==', deliverableId)
      .get()

    // Filter: only return if user is involved (submitter, reviewer) or is professor
    const reviews = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((r: any) => r.submitterId === userId || r.reviewerId === userId)

    return successResponse({ reviews })
  } catch (error) {
    return serverError(error, 'Failed to load peer reviews')
  }
}
