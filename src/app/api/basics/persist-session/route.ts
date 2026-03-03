import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponseWithMessage } from '@/lib/api/response-helpers'
import { validateRequiredFields, validatePositiveNumber } from '@/lib/api/validators'
import { generateDocumentIdWithValue } from '@/lib/utils/id-helpers'
import { defaultToZero } from '@/lib/utils/default-values'
import { Collections } from '@/lib/basics/collections'
import { createTimestamp } from '@/lib/utils/firestore-helpers'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'

/**
 * Persist engagement session data to prevent loss on page unload/refresh
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { sessionStart, sessionEnd, totalPoints, pendingPoints, confirmedPoints } = body

    // Validate required fields
    const requiredFieldsError = validateRequiredFields(body, ['sessionStart', 'sessionEnd'])
    if (requiredFieldsError) return requiredFieldsError

    // Validate session timestamps
    if (typeof sessionStart !== 'number' || typeof sessionEnd !== 'number') {
      return badRequestError('sessionStart and sessionEnd must be numbers')
    }
    if (sessionEnd < sessionStart) {
      return badRequestError('sessionEnd must be after sessionStart')
    }
    const MAX_SESSION_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours
    if (sessionEnd - sessionStart > MAX_SESSION_DURATION_MS) {
      return badRequestError('Session duration cannot exceed 24 hours')
    }

    // Validate numeric fields - allow 0 values for heartbeat sessions
    if (typeof totalPoints !== 'number' || totalPoints < 0) {
      return badRequestError('totalPoints must be a non-negative number')
    }
    
    if (pendingPoints !== undefined && (typeof pendingPoints !== 'number' || pendingPoints < 0)) {
      return badRequestError('pendingPoints must be a non-negative number')
    }
    
    if (confirmedPoints !== undefined && (typeof confirmedPoints !== 'number' || confirmedPoints < 0)) {
      return badRequestError('confirmedPoints must be a non-negative number')
    }

    // Create session record
    const sessionData = {
      userId,
      sessionStart: Timestamp.fromMillis(sessionStart),
      sessionEnd: Timestamp.fromMillis(sessionEnd),
      duration: sessionEnd - sessionStart,
      totalPoints,
      pendingPoints: defaultToZero(pendingPoints),
      confirmedPoints: defaultToZero(confirmedPoints),
      createdAt: createTimestamp()
    }

    // Store in Firestore (use session start time as doc ID for deduplication)
    const sessionId = generateDocumentIdWithValue(userId, sessionStart)
    await db.collection(Collections.ENGAGEMENT_SESSIONS).doc(sessionId).set(sessionData, { merge: true })

    return successResponseWithMessage(
      { sessionId },
      'Session persisted successfully'
    )

  } catch (error) {
    return serverError(error, 'Failed to persist session')
  }
}
