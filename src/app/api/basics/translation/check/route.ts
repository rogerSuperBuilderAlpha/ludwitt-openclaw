/**
 * Translation Check API
 *
 * POST /api/basics/translation/check
 *
 * Scores a user's translation using AI comparison and awards XP.
 * Business logic lives in @/lib/basics/translation-grading-service.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getTranslationExerciseById } from '@/lib/basics/localStore'
import { ClassicalLanguage } from '@/lib/types/basics'
import { checkBasicsBalance } from '@/lib/credits'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'
import { gradeTranslation } from '@/lib/basics/translation-grading-service'

interface CheckTranslationRequest {
  exerciseId: string
  userTranslation: string
  wordsLookedUp: string[]
  xpSpentOnLookups: number
  parsingAnswers?: Record<string, string>
  timeSpent: number
  acceptableTranslations?: string[]
  sourceText?: string
  language?: ClassicalLanguage
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) return rateLimitedResponse(rateLimitResult)

    const body: CheckTranslationRequest = await request.json()
    const {
      exerciseId, userTranslation, wordsLookedUp = [], xpSpentOnLookups = 0,
      parsingAnswers, timeSpent,
      acceptableTranslations: providedTranslations,
      sourceText: providedSourceText,
      language: providedLanguage,
    } = body

    if (!exerciseId) return badRequestError('exerciseId is required')
    if (!userTranslation || typeof userTranslation !== 'string') {
      return badRequestError('userTranslation is required')
    }

    const exercise = getTranslationExerciseById(exerciseId)
    const acceptableTranslations = exercise?.acceptableTranslations || providedTranslations
    const sourceText = exercise?.sourceText || providedSourceText
    const language = exercise?.language || providedLanguage

    if (!acceptableTranslations || !sourceText) {
      return badRequestError('Exercise not found and no acceptable translations provided')
    }

    const balanceCheck = await checkBasicsBalance(userId)

    const result = await gradeTranslation({
      exerciseId, userTranslation, wordsLookedUp, xpSpentOnLookups,
      parsingAnswers, timeSpent, acceptableTranslations, sourceText,
      language: language || 'latin',
      parsingElements: exercise?.parsingElements,
      canUseAI: balanceCheck.allowed,
      userId,
    })

    return successResponse({
      feedback: result.feedback,
      creditsCharged: result.creditsCharged,
      updatedProgress: result.updatedProgress,
      summary: result.summary,
    })
  } catch (error) {
    apiLogger.apiError('translation/check', 'Failed to check translation', error)
    return serverError(error, 'Failed to check translation')
  }
}
