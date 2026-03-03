/**
 * API Route: POST /api/tutor/requests/[id]/accept
 * 
 * Student accepts a tutor's offer and starts the session
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError, forbiddenError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { 
  TutorRequest, 
  TutorSession, 
  TUTOR_COLLECTIONS, 
  TUTOR_CONSTANTS 
} from '@/lib/types/tutor'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const { id: requestId } = await params

    const body = await request.json()
    const { tutorId } = body

    if (!tutorId) {
      return badRequestError('Tutor ID is required')
    }

    // Get the request
    const requestDoc = await db.collection(TUTOR_COLLECTIONS.REQUESTS).doc(requestId).get()
    if (!requestDoc.exists) {
      return notFoundError('Request not found')
    }

    const requestData = { id: requestDoc.id, ...requestDoc.data() } as TutorRequest

    // Only the student who created the request can accept
    if (requestData.studentId !== userId) {
      return forbiddenError('Only the request owner can accept offers')
    }

    // Validate request status
    if (requestData.status !== 'open') {
      return badRequestError('This request is no longer available')
    }

    // Validate tutor is in the potential tutors list
    const selectedTutor = requestData.potentialTutors.find(t => t.tutorId === tutorId)
    if (!selectedTutor) {
      return badRequestError('Selected tutor has not offered to help')
    }

    // Create the tutoring session
    const now = new Date()
    const endsAt = new Date(now.getTime() + TUTOR_CONSTANTS.SESSION_DURATION_MINUTES * 60 * 1000)

    const session: Omit<TutorSession, 'id'> = {
      requestId,
      studentId: userId,
      studentDisplayName: requestData.studentDisplayName,
      tutorId,
      tutorDisplayName: selectedTutor.tutorDisplayName,
      creditsAmount: requestData.creditsOffered,
      subject: requestData.subject,
      startedAt: now.toISOString(),
      endsAt: endsAt.toISOString(),
      status: 'active'
    }

    // Create session document
    const sessionRef = await db.collection(TUTOR_COLLECTIONS.SESSIONS).add(session)

    // Update request status
    await requestDoc.ref.update({
      status: 'active',
      selectedTutorId: tutorId,
      sessionId: sessionRef.id
    })

    return successResponse({
      session: {
        id: sessionRef.id,
        ...session
      },
      message: 'Session started! You have 10 minutes.'
    })

  } catch (error) {
    apiLogger.apiError('tutor/requests/[id]/accept', 'Failed to accept tutor', error)
    return serverError(error, 'Failed to start session')
  }
}

