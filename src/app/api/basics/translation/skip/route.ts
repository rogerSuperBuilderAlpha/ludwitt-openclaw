import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { selectTranslationWithFallback, formatTranslationExerciseForClient } from '@/lib/basics/problem-selection-utils'
import { ClassicalLanguage } from '@/lib/types/basics'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { incrementLocalUsage } from '@/lib/basics/localStore'

const SKIP_COST = 5 // XP cost to skip

/**
 * POST /api/basics/translation/skip
 * Skip a translation exercise (costs 5 XP)
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const body = await request.json()
    const { language, exerciseId, difficulty, excludeIds = [] } = body

    if (!language || !exerciseId) {
      return badRequestError('Missing required fields: language, exerciseId')
    }

    if (!['latin', 'greek'].includes(language)) {
      return badRequestError('Invalid language. Must be "latin" or "greek".')
    }

    // Mark current exercise as seen
    const updatedExcludeIds = [...excludeIds, exerciseId].slice(-50)

    // Get next exercise
    const nextExercise = await selectTranslationWithFallback({
      language: language as ClassicalLanguage,
      targetDifficulty: difficulty || 1.0,
      excludeIds: updatedExcludeIds,
      allowGeneration: isAIGenerationAvailable()
    })

    if (nextExercise) {
      incrementLocalUsage(nextExercise.id)
    }

    // Format for client
    const clientExercise = formatTranslationExerciseForClient(nextExercise)

    return successResponse({
      nextExercise: clientExercise,
      xpDeducted: SKIP_COST,
      exercisesSeen: updatedExcludeIds
    })
  } catch (error) {
    apiLogger.apiError('translation/skip', 'Error skipping exercise', error)
    return serverError(error, 'Failed to skip exercise')
  }
}
