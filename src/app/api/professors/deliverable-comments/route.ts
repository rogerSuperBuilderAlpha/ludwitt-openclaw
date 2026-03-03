import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { DeliverableComment } from '@/lib/types/university'
import { notifyDeliverableComment } from '@/lib/university/notifications'
import { recordHistoryEvent } from '@/lib/university/submission-history'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const courseId = request.nextUrl.searchParams.get('courseId')
    const deliverableId = request.nextUrl.searchParams.get('deliverableId')

    if (!courseId || !deliverableId) {
      return badRequestError('Missing courseId or deliverableId query parameter')
    }

    const snap = await db
      .collection('deliverableComments')
      .where('courseId', '==', courseId)
      .where('deliverableId', '==', deliverableId)
      .orderBy('createdAt', 'asc')
      .get()

    const comments: DeliverableComment[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<DeliverableComment, 'id'>),
    }))

    return successResponse({ comments })
  } catch (error) {
    return serverError(error, 'Failed to fetch comments')
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const body = await request.json()
    const { courseId, deliverableId, text } = body as {
      courseId: string
      deliverableId: string
      text: string
    }

    if (!courseId || !deliverableId || !text?.trim()) {
      return badRequestError('Missing required fields: courseId, deliverableId, text')
    }

    if (text.trim().length > 2000) {
      return badRequestError('Comment text must be 2000 characters or less')
    }

    const userRecord = await auth.getUser(userId)
    const authorName = userRecord.displayName || userRecord.email?.split('@')[0] || 'Professor'
    const authorEmail = userRecord.email || ''

    const commentRef = db.collection('deliverableComments').doc()
    const comment: Omit<DeliverableComment, 'id'> = {
      courseId,
      deliverableId,
      authorId: userId,
      authorName,
      authorEmail,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }

    await commentRef.set(comment)

    // Notify student of new comment (fire-and-forget)
    const courseDoc = await db.collection('universityCourses').doc(courseId).get()
    if (courseDoc.exists) {
      const studentId = courseDoc.data()!.userId as string
      const deliverables = (courseDoc.data()!.deliverables as Array<Record<string, unknown>>) || []
      const del = deliverables.find(d => d.id === deliverableId)
      notifyDeliverableComment(studentId, authorName, (del?.title as string) || 'Deliverable', courseId, deliverableId)
    }

    recordHistoryEvent({
      courseId,
      deliverableId,
      eventType: 'comment_added',
      actorId: userId,
      actorName: authorName,
      actorRole: 'professor',
      description: `${authorName} added a comment.`,
    })

    return successResponse({
      comment: { id: commentRef.id, ...comment },
    })
  } catch (error) {
    return serverError(error, 'Failed to add comment')
  }
}
