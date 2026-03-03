/**
 * Word Lookup API
 * 
 * POST /api/basics/translation/word-lookup
 * 
 * Returns full details for a word in a translation exercise.
 * Costs 2 XP per lookup (waived if already looked up in same session).
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { getTranslationExerciseById } from '@/lib/basics/localStore'
import { TranslationWord } from '@/lib/types/basics'

const XP_COST_PER_LOOKUP = 2

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const body = await request.json()
    const { exerciseId, wordIndex, alreadyLookedUp = [] } = body

    if (!exerciseId) {
      return badRequestError('exerciseId is required')
    }

    if (typeof wordIndex !== 'number') {
      return badRequestError('wordIndex is required and must be a number')
    }

    // Get the exercise
    const exercise = getTranslationExerciseById(exerciseId)
    
    if (!exercise) {
      // For AI-generated exercises, the full word data should be in client state
      // This endpoint is primarily for local exercises
      return badRequestError('Exercise not found. For AI-generated exercises, word data should be available client-side.')
    }

    // Get the word
    const word = exercise.words[wordIndex]
    if (!word) {
      return badRequestError(`Invalid word index: ${wordIndex}`)
    }

    // Check if already looked up (no XP cost)
    const alreadyViewed = alreadyLookedUp.includes(word.word)
    const xpCost = alreadyViewed ? 0 : XP_COST_PER_LOOKUP

    // Build response with full word details
    const wordDetails: TranslationWord & { xpCost: number; isCached: boolean } = {
      word: word.word,
      romanization: word.romanization,
      lemma: word.lemma,
      partOfSpeech: word.partOfSpeech,
      meaning: word.meaning,
      grammaticalInfo: word.grammaticalInfo,
      functionInSentence: word.functionInSentence,
      principalParts: word.principalParts,
      derivatives: word.derivatives || [],
      xpCost,
      isCached: alreadyViewed
    }

    return successResponse({
      word: wordDetails,
      message: alreadyViewed 
        ? 'Word details retrieved (already viewed - no XP cost)'
        : `Word details retrieved (${xpCost} XP)`
    })

  } catch (error) {
    apiLogger.apiError('translation/word-lookup', 'Error looking up word', error)
    return serverError(error, 'Failed to lookup word')
  }
}

