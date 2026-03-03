import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

const DEFAULT_PREFERENCES = {
  emailDeliverableReviewed: true,
  emailCourseUpdate: true,
  emailOfficeHours: true,
  emailPeerReview: true,
  emailPeerReviewEndorsed: true,
  emailProfessorComments: true,
  emailProfessorDocuments: true,
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const doc = await db.collection('notificationPreferences').doc(userId).get()

    if (!doc.exists) {
      return successResponse({ ...DEFAULT_PREFERENCES, userId })
    }

    return successResponse(doc.data())
  } catch (error) {
    return serverError(error, 'Failed to fetch notification preferences')
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()

    const prefs = {
      userId,
      emailDeliverableReviewed: body.emailDeliverableReviewed ?? true,
      emailCourseUpdate: body.emailCourseUpdate ?? true,
      emailOfficeHours: body.emailOfficeHours ?? true,
      emailPeerReview: body.emailPeerReview ?? true,
      emailPeerReviewEndorsed: body.emailPeerReviewEndorsed ?? true,
      emailProfessorComments: body.emailProfessorComments ?? true,
      emailProfessorDocuments: body.emailProfessorDocuments ?? true,
      updatedAt: new Date().toISOString(),
    }

    await db.collection('notificationPreferences').doc(userId).set(prefs, { merge: true })

    return successResponse(prefs)
  } catch (error) {
    return serverError(error, 'Failed to save notification preferences')
  }
}
