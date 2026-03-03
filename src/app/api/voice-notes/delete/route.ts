import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { getStorage } from 'firebase-admin/storage'
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

    const { recordingId } = await request.json()

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
      return forbiddenError('Not authorized to delete this recording')
    }

    // Delete audio file from storage using Admin SDK
    try {
      const audioPath = `voice-notes/${userId}/${recordingId}.webm`
      const bucket = getStorage().bucket()
      const file = bucket.file(audioPath)
      await file.delete()
      apiLogger.success('voice-notes/delete', `Audio file deleted: ${audioPath}`)
    } catch (error) {
      apiLogger.apiError('voice-notes/delete', 'Failed to delete audio file', error)
      // Continue even if file deletion fails
    }

    // Delete from Firestore
    await db.collection('voiceNotes').doc(recordingId).delete()

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    apiLogger.apiError('voice-notes/delete', 'Failed to delete recording', error)
    return serverError(error, 'Failed to delete recording')
  }
}


