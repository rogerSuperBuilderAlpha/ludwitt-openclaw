import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { SandboxFile, SandboxSubmission, SandboxTemplate } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

// GET - Fetch sandbox templates and the user's submission for a deliverable
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const deliverableId = searchParams.get('deliverableId')

    if (!courseId || !deliverableId) {
      return badRequestError('courseId and deliverableId are required')
    }

    // Fetch templates
    const templatesSnap = await db
      .collection('sandboxTemplates')
      .where('courseId', '==', courseId)
      .where('deliverableId', '==', deliverableId)
      .get()

    const templates: SandboxTemplate[] = templatesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SandboxTemplate[]

    // Fetch the user's submission (latest)
    const submissionSnap = await db
      .collection('sandboxSubmissions')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .where('deliverableId', '==', deliverableId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()

    const submission: SandboxSubmission | null = submissionSnap.empty
      ? null
      : ({ id: submissionSnap.docs[0].id, ...submissionSnap.docs[0].data() } as SandboxSubmission)

    return successResponse({ templates, submission })
  } catch (error) {
    return serverError(error, 'Failed to fetch sandbox data')
  }
}

// POST - Save a student's sandbox work
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { deliverableId, courseId, files } = body as {
      deliverableId: string
      courseId: string
      files: SandboxFile[]
    }

    if (!deliverableId || !courseId) {
      return badRequestError('deliverableId and courseId are required')
    }
    if (!files || !Array.isArray(files) || files.length === 0) {
      return badRequestError('files array is required and must not be empty')
    }

    // Validate each file
    for (const file of files) {
      if (!file.name || typeof file.content !== 'string' || !file.language) {
        return badRequestError('Each file must have name, content, and language')
      }
    }

    const now = new Date().toISOString()

    // Check if there's an existing submission to update
    const existingSnap = await db
      .collection('sandboxSubmissions')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .where('deliverableId', '==', deliverableId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()

    let submissionId: string

    if (!existingSnap.empty) {
      // Update existing submission
      submissionId = existingSnap.docs[0].id
      await db.collection('sandboxSubmissions').doc(submissionId).update({
        files,
        updatedAt: now,
      })
    } else {
      // Create new submission
      const ref = db.collection('sandboxSubmissions').doc()
      submissionId = ref.id
      const submission: SandboxSubmission = {
        id: submissionId,
        userId,
        deliverableId,
        courseId,
        files,
        createdAt: now,
      }
      await ref.set(submission)
    }

    return successResponse({ submissionId, savedAt: now })
  } catch (error) {
    return serverError(error, 'Failed to save sandbox work')
  }
}
