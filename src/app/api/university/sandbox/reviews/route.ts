import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { CodeReviewComment } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

// GET - Fetch code review comments for a sandbox submission
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const { searchParams } = new URL(request.url)
    const submissionId = searchParams.get('submissionId')

    if (!submissionId) {
      return badRequestError('submissionId is required')
    }

    const snap = await db
      .collection('codeReviewComments')
      .where('sandboxSubmissionId', '==', submissionId)
      .orderBy('createdAt', 'asc')
      .get()

    const comments: CodeReviewComment[] = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CodeReviewComment[]

    return successResponse({ comments })
  } catch (error) {
    return serverError(error, 'Failed to fetch code review comments')
  }
}

// POST - Add a code review comment
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { sandboxSubmissionId, fileName, lineNumber, body: commentBody } = body as {
      sandboxSubmissionId: string
      fileName: string
      lineNumber: number
      body: string
    }

    if (!sandboxSubmissionId) {
      return badRequestError('sandboxSubmissionId is required')
    }
    if (!fileName) {
      return badRequestError('fileName is required')
    }
    if (typeof lineNumber !== 'number' || lineNumber < 1) {
      return badRequestError('lineNumber must be a positive number')
    }
    if (!commentBody || typeof commentBody !== 'string') {
      return badRequestError('body is required')
    }
    if (commentBody.length < 1 || commentBody.length > 2000) {
      return badRequestError('body must be between 1 and 2000 characters')
    }

    // Verify the submission exists
    const submissionDoc = await db.collection('sandboxSubmissions').doc(sandboxSubmissionId).get()
    if (!submissionDoc.exists) {
      return badRequestError('Submission not found')
    }

    // Get author name
    const userDoc = await db.collection('users').doc(userId).get()
    const authorName = userDoc.exists ? (userDoc.data()?.displayName as string) || 'User' : 'User'

    const ref = db.collection('codeReviewComments').doc()
    const comment: CodeReviewComment = {
      id: ref.id,
      sandboxSubmissionId,
      authorId: userId,
      authorName,
      fileName,
      lineNumber,
      body: commentBody,
      createdAt: new Date().toISOString(),
    }

    await ref.set(comment)

    return successResponse({ comment })
  } catch (error) {
    return serverError(error, 'Failed to add code review comment')
  }
}
