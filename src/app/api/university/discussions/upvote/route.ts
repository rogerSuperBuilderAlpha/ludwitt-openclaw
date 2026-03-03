import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

/**
 * POST /api/university/discussions/upvote
 * Toggle upvote on a thread or reply.
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = (await request.json()) as {
      targetId: string
      targetType: 'thread' | 'reply'
    }

    if (!body.targetId || !body.targetType) {
      return badRequestError('targetId and targetType are required')
    }

    if (body.targetType !== 'thread' && body.targetType !== 'reply') {
      return badRequestError('targetType must be "thread" or "reply"')
    }

    const collectionName =
      body.targetType === 'thread' ? 'discussionThreads' : 'discussionReplies'

    const docRef = db.collection(collectionName).doc(body.targetId)
    const doc = await docRef.get()

    if (!doc.exists) {
      return notFoundError(`${body.targetType === 'thread' ? 'Thread' : 'Reply'} not found`)
    }

    const currentUpvotes = (doc.data()?.upvotes as string[]) || []
    const hasUpvoted = currentUpvotes.includes(userId)

    // Toggle: remove if already upvoted, add if not
    await docRef.update({
      upvotes: hasUpvoted
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    })

    return successResponse({ upvoted: !hasUpvoted })
  } catch (error) {
    return serverError(error, 'Failed to toggle upvote')
  }
}
