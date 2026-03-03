import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/university/study-rooms/sessions?learningPathId=xxx
 * List upcoming study sessions for a learning path
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const learningPathId = request.nextUrl.searchParams.get('learningPathId')
    if (!learningPathId) {
      return badRequestError('Missing learningPathId query parameter')
    }

    const now = new Date().toISOString()

    const snapshot = await db.collection('studySessions')
      .where('learningPathId', '==', learningPathId)
      .where('scheduledAt', '>=', now)
      .orderBy('scheduledAt', 'asc')
      .limit(50)
      .get()

    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return successResponse({ sessions })
  } catch (error) {
    return serverError(error, 'Failed to load study sessions')
  }
}

/**
 * POST /api/university/study-rooms/sessions
 * Create a scheduled study session
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { studyRoomId, learningPathId, title, description, scheduledAt, durationMinutes } = body

    if (!studyRoomId || !learningPathId || !title || !scheduledAt || !durationMinutes) {
      return badRequestError('Missing required fields: studyRoomId, learningPathId, title, scheduledAt, durationMinutes')
    }

    // Look up host display name
    const userDoc = await db.collection('users').doc(userId).get()
    const hostName = userDoc.exists
      ? (userDoc.data()?.displayName || userDoc.data()?.email || 'Anonymous')
      : 'Anonymous'

    const now = new Date().toISOString()

    const sessionData = {
      studyRoomId,
      learningPathId,
      title,
      description: description || '',
      scheduledAt,
      durationMinutes,
      hostId: userId,
      hostName,
      attendees: [userId],
      createdAt: now,
    }

    const docRef = await db.collection('studySessions').add(sessionData)

    return successResponse({ session: { id: docRef.id, ...sessionData } })
  } catch (error) {
    return serverError(error, 'Failed to create study session')
  }
}
