import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/university/study-rooms?learningPathId=xxx
 * List study rooms for a learning path
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const learningPathId = request.nextUrl.searchParams.get('learningPathId')
    if (!learningPathId) {
      return badRequestError('Missing learningPathId query parameter')
    }

    const snapshot = await db.collection('studyRooms')
      .where('learningPathId', '==', learningPathId)
      .orderBy('lastActiveAt', 'desc')
      .get()

    const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return successResponse({ rooms })
  } catch (error) {
    return serverError(error, 'Failed to load study rooms')
  }
}

/**
 * POST /api/university/study-rooms
 * Create a new study room
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { learningPathId, name } = body

    if (!learningPathId || !name) {
      return badRequestError('Missing required fields: learningPathId, name')
    }

    const now = new Date().toISOString()
    const roomName = `university-${learningPathId.slice(0, 8)}-${Date.now()}`

    const roomData = {
      learningPathId,
      name,
      roomUrl: `https://${process.env.DAILY_DOMAIN || 'your-org.daily.co'}/${roomName}`,
      participants: [],
      isActive: true,
      createdBy: userId,
      createdAt: now,
      lastActiveAt: now,
    }

    const docRef = await db.collection('studyRooms').add(roomData)

    return successResponse({ room: { id: docRef.id, ...roomData } })
  } catch (error) {
    return serverError(error, 'Failed to create study room')
  }
}
