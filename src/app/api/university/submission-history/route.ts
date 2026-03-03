import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { SubmissionHistoryEvent } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const courseId = request.nextUrl.searchParams.get('courseId')
    const deliverableId = request.nextUrl.searchParams.get('deliverableId')

    if (!courseId || !deliverableId) {
      return badRequestError('courseId and deliverableId query parameters are required')
    }

    const snap = await db
      .collection('submissionHistory')
      .where('courseId', '==', courseId)
      .where('deliverableId', '==', deliverableId)
      .orderBy('createdAt', 'asc')
      .get()

    const events: SubmissionHistoryEvent[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<SubmissionHistoryEvent, 'id'>),
    }))

    return successResponse({ events })
  } catch (error) {
    return serverError(error, 'Failed to fetch submission history')
  }
}
