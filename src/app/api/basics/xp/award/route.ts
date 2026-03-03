/**
 * XP Award API
 * 
 * Centralized endpoint for awarding XP.
 * All XP awards should flow through this endpoint to ensure
 * proper tracking, history recording, and consistent updates.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { awardXP, XPSource } from '@/lib/basics/xp-service'
import { apiLogger } from '@/lib/logger'

interface AwardXPRequest {
  source: XPSource
  baseXP: number
  costsIncurred?: number
  focusModeMultiplier?: number
  problemId?: string
  details?: {
    isCorrect?: boolean
    score?: number
    grade?: string
    timeSpent?: number
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Parse request body
    const body = await request.json() as AwardXPRequest
    const { source, baseXP, costsIncurred, focusModeMultiplier, problemId, details } = body

    if (!source || baseXP === undefined) {
      return badRequestError('Missing required fields: source, baseXP')
    }

    // Award XP using the centralized service
    const result = await awardXP({
      userId,
      source,
      baseXP,
      costsIncurred: costsIncurred || 0,
      focusModeMultiplier: focusModeMultiplier || 1,
      problemId,
      details
    })

    if (!result.success) {
      return serverError(new Error(result.error || 'Failed to award XP'), 'Failed to award XP')
    }

    return successResponse({
      success: true,
      xpAwarded: result.netXP,
      newDailyXP: result.newDailyXP,
      newAllTimeXP: result.newAllTimeXP,
      transactionId: result.transactionId
    })
  } catch (error) {
    apiLogger.apiError('xp/award', 'Failed to award XP', error)
    return serverError(error, 'Failed to award XP')
  }
}

