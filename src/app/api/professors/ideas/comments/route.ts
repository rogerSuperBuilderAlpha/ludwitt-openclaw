import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { IdeaComment } from '@/lib/types/university'
import { notifyIdeaComment } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const ideaId = request.nextUrl.searchParams.get('ideaId')
    const collection = request.nextUrl.searchParams.get('collection')

    if (!ideaId || !collection) {
      return badRequestError('Missing ideaId or collection query parameter')
    }

    if (collection !== 'business' && collection !== 'thesis') {
      return badRequestError('collection must be "business" or "thesis"')
    }

    const snap = await db
      .collection('ideaComments')
      .where('ideaId', '==', ideaId)
      .where('ideaCollection', '==', collection)
      .orderBy('createdAt', 'asc')
      .get()

    const comments: IdeaComment[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<IdeaComment, 'id'>),
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
    const { ideaId, ideaCollection, text } = body as {
      ideaId: string
      ideaCollection: 'business' | 'thesis'
      text: string
    }

    if (!ideaId || !ideaCollection || !text?.trim()) {
      return badRequestError('Missing required fields: ideaId, ideaCollection, text')
    }

    if (ideaCollection !== 'business' && ideaCollection !== 'thesis') {
      return badRequestError('ideaCollection must be "business" or "thesis"')
    }

    if (text.trim().length > 2000) {
      return badRequestError('Comment text must be 2000 characters or less')
    }

    // Verify the idea exists
    const collectionName = ideaCollection === 'business' ? 'universityBusinessIdeas' : 'universityThesisIdeas'
    const ideaDoc = await db.collection(collectionName).doc(ideaId).get()
    if (!ideaDoc.exists) {
      return badRequestError('Idea not found')
    }

    // Get professor info
    const userRecord = await auth.getUser(userId)
    const authorName = userRecord.displayName || userRecord.email?.split('@')[0] || 'Professor'
    const authorEmail = userRecord.email || ''

    const commentRef = db.collection('ideaComments').doc()
    const comment: Omit<IdeaComment, 'id'> = {
      ideaId,
      ideaCollection,
      authorId: userId,
      authorName,
      authorEmail,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }

    await commentRef.set(comment)

    // Notify idea owner of new comment (fire-and-forget)
    const ideaData = ideaDoc.data()!
    const studentId = ideaData.userId as string
    const ideaTitle = (ideaData.title as string) || 'Idea'
    notifyIdeaComment(studentId, authorName, ideaTitle)

    return successResponse({
      comment: { id: commentRef.id, ...comment },
    })
  } catch (error) {
    return serverError(error, 'Failed to add comment')
  }
}
