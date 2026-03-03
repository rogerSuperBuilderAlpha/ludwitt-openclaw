/**
 * API Route: GET /api/tutor/sessions/[id]
 * 
 * Get session details
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { notFoundError, serverError, forbiddenError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { TutorSession, TUTOR_COLLECTIONS } from '@/lib/types/tutor'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const { id: sessionId } = await params

    // Get session
    const sessionDoc = await db.collection(TUTOR_COLLECTIONS.SESSIONS).doc(sessionId).get()
    if (!sessionDoc.exists) {
      return notFoundError('Session not found')
    }

    const session = { id: sessionDoc.id, ...sessionDoc.data() } as TutorSession

    // Only participants can view
    if (session.studentId !== userId && session.tutorId !== userId) {
      return forbiddenError('Access denied')
    }

    // Check if session has ended
    const now = new Date()
    const endsAt = new Date(session.endsAt)
    const remainingSeconds = Math.max(0, Math.floor((endsAt.getTime() - now.getTime()) / 1000))
    const hasEnded = remainingSeconds === 0

    // If session has naturally ended, update status
    if (hasEnded && session.status === 'active') {
      await sessionDoc.ref.update({ status: 'ended' })
      session.status = 'ended'
    }

    return successResponse({
      session,
      remainingSeconds,
      hasEnded,
      isStudent: session.studentId === userId,
      isTutor: session.tutorId === userId
    })

  } catch (error) {
    apiLogger.apiError('tutor/sessions/[id]', 'Failed to get session', error)
    return serverError(error, 'Failed to get session')
  }
}

