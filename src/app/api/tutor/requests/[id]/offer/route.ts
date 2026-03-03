/**
 * API Route: POST /api/tutor/requests/[id]/offer
 * 
 * Tutor offers to help with a request
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { TutorRequest, TutorOffer, TUTOR_COLLECTIONS, TUTOR_CONSTANTS } from '@/lib/types/tutor'

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
    const { message = '' } = body

    // Get the request
    const requestDoc = await db.collection(TUTOR_COLLECTIONS.REQUESTS).doc(requestId).get()
    if (!requestDoc.exists) {
      return notFoundError('Request not found')
    }

    const requestData = requestDoc.data() as TutorRequest

    // Validate request is still open
    if (requestData.status !== 'open') {
      return badRequestError('This request is no longer available')
    }

    // Check if expired
    if (new Date(requestData.expiresAt) < new Date()) {
      await requestDoc.ref.update({ status: 'expired' })
      return badRequestError('This request has expired')
    }

    // Can't tutor yourself
    if (requestData.studentId === userId) {
      return badRequestError('You cannot tutor yourself')
    }

    // Check if already offered
    if (requestData.potentialTutors.some(t => t.tutorId === userId)) {
      return badRequestError('You have already offered to help')
    }

    // Get tutor's profile and grade
    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()

    const tutorMathProgress = await db.collection('users').doc(userId)
      .collection('basics_progress').doc('math').get()
    const tutorGrade = Math.floor(tutorMathProgress.data()?.currentDifficulty || 5)

    // Validate grade difference (tutor must be 1-3 grades ahead)
    const gradeDiff = tutorGrade - requestData.studentGrade
    if (gradeDiff < 1 || gradeDiff > TUTOR_CONSTANTS.MAX_GRADE_DIFFERENCE) {
      return badRequestError('You are not eligible to tutor this student')
    }

    // Add tutor offer
    const offer: TutorOffer = {
      tutorId: userId,
      tutorDisplayName: userData?.displayName || userData?.name || 'Tutor',
      tutorGrade,
      tutorAvatarUrl: userData?.photoURL,
      message: message.slice(0, 200), // Limit message length
      offeredAt: createISOTimestamp()
    }

    await requestDoc.ref.update({
      potentialTutors: [...requestData.potentialTutors, offer]
    })

    return successResponse({
      success: true,
      message: 'Offer submitted! Waiting for student to accept.'
    })

  } catch (error) {
    apiLogger.apiError('tutor/requests/[id]/offer', 'Failed to submit tutor offer', error)
    return serverError(error, 'Failed to submit offer')
  }
}

