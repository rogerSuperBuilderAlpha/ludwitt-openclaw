import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    interface VoiceNote {
      id: string
      userId?: string
      title?: string
      date: string
      createdAt: string
      updatedAt: string
      [key: string]: unknown
    }

    // Get user's recordings from Firestore
    let recordings: VoiceNote[] = []
    
    try {
      const snapshot = await db
        .collection('voiceNotes')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get()

      recordings = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          date: data.date?.toDate?.()?.toISOString() || new Date().toISOString(),
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        }
      })
    } catch (queryError) {
      // If orderBy fails (likely missing index), try simple query
      apiLogger.validationError('voice-notes/list', `OrderBy failed, trying simple query: ${getErrorMessage(queryError)}`)
      
      try {
        const simpleSnapshot = await db
          .collection('voiceNotes')
          .where('userId', '==', userId)
          .limit(100)
          .get()

        recordings = simpleSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate?.()?.toISOString() || new Date().toISOString(),
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
          }
        })
        
        // Sort client-side
        recordings.sort((a: VoiceNote, b: VoiceNote) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return dateB - dateA // Descending
        })
      } catch (simpleError) {
        apiLogger.apiError('voice-notes/list', 'Simple query also failed', simpleError)
        // Return empty array if both queries fail
      }
    }

    apiLogger.success('voice-notes/list', `Returning ${recordings.length} recordings for user ${userId}`)

    return NextResponse.json({
      success: true,
      recordings
    })
  } catch (error) {
    apiLogger.apiError('voice-notes/list', 'Failed to load recordings', error)
    return serverError(error, 'Failed to load recordings')
  }
}


