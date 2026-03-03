import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { StudyRoomParticipant } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

/**
 * POST /api/university/study-rooms/leave
 * Leave a study room
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

    const roomData = roomDoc.data()!
    const participants = (roomData.participants || []) as StudyRoomParticipant[]

    // Remove the user from participants
    const updatedParticipants = participants.filter(p => p.userId !== userId)
    const isActive = updatedParticipants.length > 0

    await roomRef.update({
      participants: updatedParticipants,
      isActive,
      lastActiveAt: new Date().toISOString(),
    })

    return successResponse({ isActive, participantCount: updatedParticipants.length })
  } catch (error) {
    return serverError(error, 'Failed to leave study room')
  }
}
