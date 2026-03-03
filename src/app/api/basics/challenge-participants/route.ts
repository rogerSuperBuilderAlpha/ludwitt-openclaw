import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields } from '@/lib/api/validators'
import { getQueryParam } from '@/lib/api/request-helpers'
import { Collections } from '@/lib/basics/collections'
import { db } from '@/lib/firebase/admin'

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const challengeId = getQueryParam(request, 'challengeId')

    // Validate required fields
    const requiredFieldsError = validateRequiredFields({ challengeId }, ['challengeId'])
    if (requiredFieldsError) return requiredFieldsError

    // Count participants for this challenge
    const participants = await db.collection(Collections.CHALLENGE_PARTICIPANTS)
      .where('challengeId', '==', challengeId)
      .get()

    return successResponse({ count: participants.size })

  } catch (error) {
    return serverError(error, 'Failed to get participant count')
  }
}

