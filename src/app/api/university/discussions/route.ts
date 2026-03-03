import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { DiscussionThread, CreateThreadRequest } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

/**
 * GET /api/university/discussions?courseId=...&deliverableId=...
 * List discussion threads for a course, optionally filtered by deliverable.
 * Returns threads sorted: pinned first, then by lastActivityAt desc.
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const courseId = request.nextUrl.searchParams.get('courseId')
    if (!courseId) {
      return badRequestError('courseId query parameter is required')
    }

    const deliverableId = request.nextUrl.searchParams.get('deliverableId')

    let q: FirebaseFirestore.Query = db
      .collection('discussionThreads')
      .where('courseId', '==', courseId)

    if (deliverableId) {
      q = q.where('deliverableId', '==', deliverableId)
    }

    // Firestore doesn't support multi-field ordering with inequality easily,
    // so we fetch all threads for the course and sort in memory.
    const snap = await q.orderBy('lastActivityAt', 'desc').get()

    const threads: DiscussionThread[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<DiscussionThread, 'id'>),
    }))

    // Sort: pinned first, then by lastActivityAt desc (already ordered by Firestore)
    threads.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
    })

    return successResponse({ threads })
  } catch (error) {
    return serverError(error, 'Failed to fetch discussion threads')
  }
}

/**
 * POST /api/university/discussions
 * Create a new discussion thread.
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = (await request.json()) as CreateThreadRequest

    if (!body.courseId || !body.learningPathId || !body.title?.trim() || !body.body?.trim()) {
      return badRequestError('courseId, learningPathId, title, and body are required')
    }

    // Fetch author display name
    const userDoc = await db.collection('users').doc(userId).get()
    const authorName = (userDoc.data()?.displayName as string) || 'Anonymous'

    const now = new Date().toISOString()

    const threadData: Omit<DiscussionThread, 'id'> = {
      courseId: body.courseId,
      ...(body.deliverableId ? { deliverableId: body.deliverableId } : {}),
      learningPathId: body.learningPathId,
      authorId: userId,
      authorName,
      title: body.title.trim(),
      body: body.body.trim(),
      isPinned: false,
      isAccepted: false,
      upvotes: [],
      replyCount: 0,
      lastActivityAt: now,
      createdAt: now,
    }

    const docRef = await db.collection('discussionThreads').add(threadData)

    const thread: DiscussionThread = { id: docRef.id, ...threadData }

    return successResponse({ thread })
  } catch (error) {
    return serverError(error, 'Failed to create discussion thread')
  }
}
