/**
 * Score Word Pronunciation API
 * 
 * Scores student's pronunciation of a word and its definition
 * Awards bonus points based on accuracy
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields } from '@/lib/api/validators'
import { getTodayDate } from '@/lib/utils/date-helpers'
import { normalizeText, splitWords } from '@/lib/utils/text-processing'
import { calculateAverage, round } from '@/lib/utils/numbers'
import { defaultToZero } from '@/lib/utils/default-values'
import { generatePronunciationFeedback } from '@/lib/utils/feedback-helpers'
import { calculateXPUpdate } from '@/lib/basics/xp-helpers'
import { getXPUpdateFields } from '@/lib/basics/xp-helpers.server'
import { Collections } from '@/lib/basics/collections'
import { createTimestamp } from '@/lib/utils/firestore-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { WordPronunciationScoringRequest, WordPronunciationScoringResult } from '@/lib/types/scoring'
import { getFirestore } from 'firebase-admin/firestore'
import '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const body: WordPronunciationScoringRequest = await request.json()

    // Validate required fields
    const requiredFieldsError = validateRequiredFields(body, ['word', 'transcript'])
    if (requiredFieldsError) return requiredFieldsError

    // Score the pronunciation
    const scoringResult = scorePronunciation(
      body.word,
      body.definition,
      body.transcript,
      body.confidenceScores
    )

    // Store bonus points in Firestore
    const db = getFirestore()
    const progressRef = db.collection(Collections.USER_BASICS_PROGRESS).doc(userId)
    
    await db.runTransaction(async (transaction) => {
      const progressDoc = await transaction.get(progressRef)
      
      if (!progressDoc.exists) {
        throw new Error('Progress document not found')
      }

      const progressData = progressDoc.data()
      
      // Calculate XP update using helper
          const xpUpdate = calculateXPUpdate({
            subject: 'reading',
            points: scoringResult.points,
            currentSubjectXP: defaultToZero(progressData?.reading?.totalXP),
            currentTotalXP: defaultToZero(progressData?.totalXP),
            currentDailyXP: defaultToZero(progressData?.dailyXP),
            lastActiveDate: progressData?.lastActiveDate || getTodayDate()
          })

      // Update progress
      transaction.update(progressRef, getXPUpdateFields('reading', xpUpdate))

      // Log the word learning attempt
      const attemptRef = db.collection(Collections.BASICS_WORD_LEARNING_ATTEMPTS).doc()
      transaction.set(attemptRef, {
        userId,
        word: body.word,
        timestamp: createTimestamp(),
        timeSpent: body.timeSpent,
        transcript: body.transcript,
        score: scoringResult.score,
        points: scoringResult.points,
        details: scoringResult.details
      })
    })

    return successResponse(scoringResult)
  } catch (error) {
    return serverError(error, 'Failed to score pronunciation')
  }
}

/**
 * Score pronunciation based on word accuracy, definition accuracy, and clarity
 */
function scorePronunciation(
  word: string,
  definition: string,
  transcript: string,
  confidenceScores: number[]
): WordPronunciationScoringResult {
  const normalizedWord = normalizeText(word)
  const normalizedTranscript = normalizeText(transcript)
  const normalizedDefinition = normalizeText(definition)

  // 1. WORD ACCURACY (0-100)
  // Check if the word appears in the transcript
  const wordInTranscript = normalizedTranscript.includes(normalizedWord)
  const wordAccuracy = wordInTranscript ? 100 : 0

  // 2. DEFINITION ACCURACY (0-100)
  // Check how many definition words appear in transcript
  const definitionWords = splitWords(normalizedDefinition).filter(w => w.length > 3) // Skip short words
  const transcriptWords = splitWords(normalizedTranscript)
  
  // Use Set for O(1) lookups instead of nested loops
  const transcriptSet = new Set(transcriptWords)
  let definitionMatches = 0
  
  for (const defWord of definitionWords) {
    // Check if transcript contains word or substring match
    if (transcriptSet.has(defWord) || 
        Array.from(transcriptSet).some(tw => tw.includes(defWord) || defWord.includes(tw))) {
      definitionMatches++
    }
  }
  
  const definitionAccuracy = definitionWords.length > 0
    ? round((definitionMatches / definitionWords.length) * 100)
    : 50 // Default if no definition words

  // 3. CLARITY (0-100)
  // Based on speech recognition confidence
  const avgConfidence = confidenceScores.length > 0
    ? calculateAverage(confidenceScores)
    : 0.7
  
  const clarity = round(avgConfidence * 100)

  // Calculate overall score (weighted average)
  // Word accuracy is most important (50%), then definition (30%), then clarity (20%)
  const overallScore = round(
    (wordAccuracy * 0.5) + 
    (definitionAccuracy * 0.3) + 
    (clarity * 0.2)
  )

  // Determine points (1-3 points)
  const { points, feedback } = generatePronunciationFeedback(overallScore)

  return {
    score: overallScore,
    points,
    feedback,
    details: {
      wordAccuracy,
      definitionAccuracy,
      clarity,
      avgConfidence
    }
  }
}

