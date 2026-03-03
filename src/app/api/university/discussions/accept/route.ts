import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

/**
 * POST /api/university/discussions/accept
 * Mark a discussion reply as accepted (or unmark). Only professors may use this endpoint.
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = (await request.json()) as {
      replyId: string
      isAccepted: boolean
    }

    if (!body.replyId || typeof body.isAccepted !== 'boolean') {
      return badRequestError('replyId and isAccepted (boolean) are required')
    }

    // Verify caller is a professor
    const professorDoc = await db.collection('professorProfiles').doc(userId).get()
    if (!professorDoc.exists) {
      return forbiddenError('Only professors can accept replies')
    }

    // Verify reply exists
    const replyRef = db.collection('discussionReplies').doc(body.replyId)
    const replyDoc = await replyRef.get()
    if (!replyDoc.exists) {
      return notFoundError('Reply not found')
    }

    await replyRef.update({ isAccepted: body.isAccepted })

    return successResponse({ isAccepted: body.isAccepted })
  } catch (error) {
    return serverError(error, 'Failed to update accept status')
  }
}
