import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { Collections } from '@/lib/basics/collections'
import { db } from '@/lib/firebase/admin'

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get user's joined challenges
    const joinedChallenges = await db.collection(Collections.CHALLENGE_PARTICIPANTS)
      .where('userId', '==', userId)
      .get()

    const challengeIds = joinedChallenges.docs.map(doc => doc.data().challengeId)

    return successResponse({ challengeIds })

  } catch (error) {
    return serverError(error, 'Failed to get user challenges')
  }
}
