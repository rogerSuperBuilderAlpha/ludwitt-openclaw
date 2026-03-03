import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const { recordingId, updates } = await request.json()

    if (!recordingId) {
      return badRequestError('Recording ID required')
    }

    // Verify ownership
    const recordingDoc = await db.collection('voiceNotes').doc(recordingId).get()
    
    if (!recordingDoc.exists) {
      return notFoundError('Recording not found')
    }

    const recordingData = recordingDoc.data()
    if (recordingData?.userId !== userId) {
      return forbiddenError('Not authorized to update this recording')
    }

    // Update recording
    await db.collection('voiceNotes').doc(recordingId).update({
      ...updates,
      updatedAt: Timestamp.now()
    })

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    apiLogger.apiError('voice-notes/update', 'Failed to update recording', error)
    return serverError(error, 'Failed to update recording')
  }
}


