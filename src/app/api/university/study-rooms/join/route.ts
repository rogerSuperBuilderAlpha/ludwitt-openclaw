import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

/**
 * POST /api/university/study-rooms/join
 * Join a study room
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { roomId } = body

    if (!roomId) {
      return badRequestError('Missing required field: roomId')
    }

    const roomRef = db.collection('studyRooms').doc(roomId)
    const roomDoc = await roomRef.get()

    if (!roomDoc.exists) {
      return notFoundError('Study room not found')
    }

    // Look up user display name
    const userDoc = await db.collection('users').doc(userId).get()
    const displayName = userDoc.exists
      ? (userDoc.data()?.displayName || userDoc.data()?.email || 'Anonymous')
      : 'Anonymous'

    // Determine role (check if user is a professor)
    const professorDoc = await db.collection('professorProfiles').doc(userId).get()
    const role = professorDoc.exists ? 'professor' : 'student'

    const participant = {
      userId,
      displayName,
      joinedAt: new Date().toISOString(),
      role,
    }

    await roomRef.update({
      participants: FieldValue.arrayUnion(participant),
      isActive: true,
      lastActiveAt: new Date().toISOString(),
    })

    return successResponse({ participant })
  } catch (error) {
    return serverError(error, 'Failed to join study room')
  }
}
