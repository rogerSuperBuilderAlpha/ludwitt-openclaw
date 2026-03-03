import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponseWithMessage } from '@/lib/api/response-helpers'
import { validateRequiredFields } from '@/lib/api/validators'
import { Collections } from '@/lib/basics/collections'
import { createTimestamp } from '@/lib/utils/firestore-helpers'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { challengeId } = body

    // Validate required fields
    const requiredFieldsError = validateRequiredFields(body, ['challengeId'])
    if (requiredFieldsError) return requiredFieldsError

    // Use transaction to atomically check, add participant, and update count
    try {
      await db.runTransaction(async (transaction) => {
        // Check if user already joined this challenge
        const existingJoinQuery = db.collection(Collections.CHALLENGE_PARTICIPANTS)
          .where('userId', '==', userId)
          .where('challengeId', '==', challengeId)
        
        const existingJoin = await transaction.get(existingJoinQuery)
        
        if (!existingJoin.empty) {
          throw new Error('ALREADY_JOINED')
        }

        // Get challenge document
        const challengeRef = db.collection(Collections.VIRAL_CHALLENGES).doc(challengeId)
        const challengeDoc = await transaction.get(challengeRef)
        
        if (!challengeDoc.exists) {
          throw new Error('CHALLENGE_NOT_FOUND')
        }

        // Add user to challenge participants
        const participantRef = db.collection(Collections.CHALLENGE_PARTICIPANTS).doc()
        transaction.set(participantRef, {
          userId,
          challengeId,
          joinedAt: createTimestamp(),
          progress: 0,
          completed: false
        })

        // Update challenge participant count atomically
        const currentParticipants = challengeDoc.data()?.participants || 0
        transaction.update(challengeRef, {
          participants: currentParticipants + 1
        })
      })
    } catch (error) {
      const err = error as { message?: string }
      if (err?.message === 'ALREADY_JOINED') {
        return successResponseWithMessage(
          { alreadyJoined: true },
          'Already joined this challenge'
        )
      }
      if (err?.message === 'CHALLENGE_NOT_FOUND') {
        return badRequestError('Challenge not found')
      }
      throw error
    }

    return successResponseWithMessage(
      {},
      'Successfully joined challenge'
    )

  } catch (error) {
    return serverError(error, 'Failed to join challenge')
  }
}