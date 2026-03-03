import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import type { DiscussionReply } from '@/lib/types/university'
import { notifyDiscussionReply } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

/**
 * GET /api/university/discussions/replies?threadId=...
 * List replies for a given discussion thread.
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const threadId = request.nextUrl.searchParams.get('threadId')
    if (!threadId) {
      return badRequestError('threadId query parameter is required')
    }

    const snap = await db
      .collection('discussionReplies')
      .where('threadId', '==', threadId)
      .orderBy('createdAt', 'asc')
      .get()

    const replies: DiscussionReply[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<DiscussionReply, 'id'>),
    }))

    return successResponse({ replies })
  } catch (error) {
    return serverError(error, 'Failed to fetch discussion replies')
  }
}

/**
 * POST /api/university/discussions/replies
 * Create a reply to a discussion thread.
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = (await request.json()) as { threadId: string; body: string }

    if (!body.threadId || !body.body?.trim()) {
      return badRequestError('threadId and body are required')
    }

    // Verify thread exists
    const threadDoc = await db.collection('discussionThreads').doc(body.threadId).get()
    if (!threadDoc.exists) {
      return notFoundError('Thread not found')
    }

    const threadData = threadDoc.data()!

    // Fetch author display name
    const userDoc = await db.collection('users').doc(userId).get()
    const authorName = (userDoc.data()?.displayName as string) || 'Anonymous'

    const now = new Date().toISOString()

    const replyData: Omit<DiscussionReply, 'id'> = {
      threadId: body.threadId,
      authorId: userId,
      authorName,
      body: body.body.trim(),
      isAccepted: false,
      upvotes: [],
      createdAt: now,
    }

    const docRef = await db.collection('discussionReplies').add(replyData)

    // Update the parent thread: increment replyCount and update lastActivityAt
    await db.collection('discussionThreads').doc(body.threadId).update({
      replyCount: FieldValue.increment(1),
      lastActivityAt: now,
    })

    // Fire-and-forget notification to thread author (if replier is not the author)
    const threadAuthorId = threadData.authorId as string
    if (threadAuthorId && threadAuthorId !== userId) {
      notifyDiscussionReply(
        threadAuthorId,
        authorName,
        threadData.title as string
      )
    }

    const reply: DiscussionReply = { id: docRef.id, ...replyData }

    return successResponse({ reply })
  } catch (error) {
    return serverError(error, 'Failed to create reply')
  }
}
