import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

/**
 * POST /api/university/discussions/pin
 * Pin or unpin a discussion thread. Only professors may use this endpoint.
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = (await request.json()) as {
      threadId: string
      isPinned: boolean
    }

    if (!body.threadId || typeof body.isPinned !== 'boolean') {
      return badRequestError('threadId and isPinned (boolean) are required')
    }

    // Verify caller is a professor
    const professorDoc = await db.collection('professorProfiles').doc(userId).get()
    if (!professorDoc.exists) {
      return forbiddenError('Only professors can pin or unpin threads')
    }

    // Verify thread exists
    const threadRef = db.collection('discussionThreads').doc(body.threadId)
    const threadDoc = await threadRef.get()
    if (!threadDoc.exists) {
      return notFoundError('Thread not found')
    }

    await threadRef.update({ isPinned: body.isPinned })

    return successResponse({ isPinned: body.isPinned })
  } catch (error) {
    return serverError(error, 'Failed to update pin status')
  }
}
