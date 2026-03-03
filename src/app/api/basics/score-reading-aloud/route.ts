import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getTodayDate } from '@/lib/utils/date-helpers'
import { normalizeText, splitWords } from '@/lib/utils/text-processing'
import { calculateAverage, round, clamp } from '@/lib/utils/numbers'
import { defaultToZero } from '@/lib/utils/default-values'
import { generateReadingAloudFeedback } from '@/lib/utils/feedback-helpers'
import { calculateXPUpdate } from '@/lib/basics/xp-helpers'
import { getXPUpdateFields } from '@/lib/basics/xp-helpers.server'
import { Collections } from '@/lib/basics/collections'
import { createTimestamp } from '@/lib/utils/firestore-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { ReadingAloudScoringRequest, ReadingAloudScoringResult } from '@/lib/types/scoring'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import '@/lib/firebase/admin' // Initialize admin SDK

/**
 * Score reading aloud performance
 * POST /api/basics/score-reading-aloud
 */
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

    const body: ReadingAloudScoringRequest = await request.json()

    if (!body.passage || !body.transcript) {
      return badRequestError('Missing required fields: passage and transcript')
    }

    // Score the reading
    const scoringResult = scoreReading(
      body.passage,
      body.transcript,
      body.timeSpent,
      body.confidenceScores
    )

    // Store the bonus points in Firestore
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
            points: scoringResult.totalScore,
            currentSubjectXP: defaultToZero(progressData?.reading?.totalXP),
            currentTotalXP: defaultToZero(progressData?.totalXP),
            currentDailyXP: defaultToZero(progressData?.dailyXP),
            lastActiveDate: progressData?.lastActiveDate || getTodayDate()
          })

      // Update progress with bonus XP
      transaction.update(progressRef, getXPUpdateFields('reading', xpUpdate))

      // Log the reading aloud attempt
      const attemptRef = db.collection(Collections.BASICS_READING_ALOUD_ATTEMPTS).doc()
      transaction.set(attemptRef, {
        userId,
        exerciseId: body.exerciseId,
        timestamp: createTimestamp(),
        timeSpent: body.timeSpent,
        transcript: body.transcript,
        scoringResult,
        bonusPoints: scoringResult.totalScore
      })
    })

    return successResponse(scoringResult)
  } catch (error) {
    return serverError(error, 'Failed to score reading')
  }
}

/**
 * Score reading performance based on accuracy, speed, clarity, and confidence
 */
function scoreReading(
  passage: string,
  transcript: string,
  timeSpent: number,
  confidenceScores: number[]
): ReadingAloudScoringResult {
  // Normalize texts for comparison
  const normalizedPassage = normalizeText(passage)
  const normalizedTranscript = normalizeText(transcript)

  const passageWords = splitWords(normalizedPassage)
  const transcriptWords = splitWords(normalizedTranscript)

  // 1. ACCURACY SCORE (0-100)
  // Calculate word-level accuracy using Levenshtein distance approach
  const accuracyScore = calculateAccuracyScore(passageWords, transcriptWords)

  // 2. SPEED SCORE (0-100)
  // Optimal reading speed is 150-180 WPM for comprehension
  // Calculate words per minute
  const wordsPerMinute = round((transcriptWords.length / timeSpent) * 60)
  const speedScore = calculateSpeedScore(wordsPerMinute)

  // 3. CLARITY SCORE (0-100)
  // Based on speech recognition confidence scores
  const avgConfidence = confidenceScores.length > 0
    ? calculateAverage(confidenceScores)
    : 0.7 // Default if no confidence scores available

  const clarityScore = round(avgConfidence * 100)

  // 4. CONFIDENCE SCORE (0-100)
  // Based on consistency of pacing and lack of long pauses
  const confidenceScore = calculateConfidenceScore(timeSpent, passageWords.length, transcriptWords.length)

  // Calculate total score (1-5 points)
  const averageScore = (accuracyScore + speedScore + clarityScore + confidenceScore) / 4
  const { totalScore, feedback } = generateReadingAloudFeedback(averageScore)

  // Calculate matched words for details
  const matchedWords = round((accuracyScore / 100) * passageWords.length)
  const accuracyPercentage = passageWords.length > 0
    ? round((matchedWords / passageWords.length) * 100)
    : 0

  return {
    accuracy: accuracyScore,
    speed: speedScore,
    clarity: clarityScore,
    confidence: confidenceScore,
    totalScore,
    feedback,
    details: {
      wordsPerMinute,
      accuracyPercentage,
      matchedWords,
      totalWords: passageWords.length,
      avgConfidence
    }
  }
}

/**
 * Calculate accuracy score by comparing words in passage vs transcript
 */
function calculateAccuracyScore(passageWords: string[], transcriptWords: string[]): number {
  if (passageWords.length === 0) return 0

  let matchedWords = 0
  const passageSet = new Set(passageWords)
  
  // Count how many transcript words match passage words
  for (const word of transcriptWords) {
    if (passageSet.has(word)) {
      matchedWords++
    }
  }

  // Also check sequence accuracy (order matters)
  let sequenceMatches = 0
  const minLength = Math.min(passageWords.length, transcriptWords.length)
  
  for (let i = 0; i < minLength; i++) {
    if (passageWords[i] === transcriptWords[i]) {
      sequenceMatches++
    }
  }

  // Combine word matching and sequence matching
  const wordMatchRate = matchedWords / passageWords.length
  const sequenceMatchRate = sequenceMatches / passageWords.length
  
  // Weight: 60% word matching, 40% sequence matching
  const accuracyScore = (wordMatchRate * 0.6 + sequenceMatchRate * 0.4) * 100

  return round(clamp(accuracyScore, 0, 100))
}

/**
 * Calculate speed score based on WPM
 * Optimal range: 150-180 WPM
 * Too slow (<100 WPM) or too fast (>220 WPM) reduces score
 */
function calculateSpeedScore(wpm: number): number {
  const optimalMin = 150
  const optimalMax = 180
  const tooSlow = 100
  const tooFast = 220

  if (wpm >= optimalMin && wpm <= optimalMax) {
    // Perfect speed range
    return 100
  } else if (wpm < optimalMin) {
    // Too slow
    if (wpm <= tooSlow) {
      return 50
    }
    // Linear scaling from tooSlow (50) to optimalMin (100)
    return Math.round(50 + ((wpm - tooSlow) / (optimalMin - tooSlow)) * 50)
  } else {
    // Too fast
    if (wpm >= tooFast) {
      return 50
    }
    // Linear scaling from optimalMax (100) to tooFast (50)
    return Math.round(100 - ((wpm - optimalMax) / (tooFast - optimalMax)) * 50)
  }
}

/**
 * Calculate confidence score based on pacing consistency
 * Penalize if there's a big mismatch between words read and words in passage
 */
function calculateConfidenceScore(
  timeSpent: number,
  expectedWords: number,
  actualWords: number
): number {
  // Check if the reader covered most of the passage
  const completionRate = actualWords / expectedWords
  
  // Ideal is close to 1.0 (read the full passage)
  if (completionRate >= 0.9 && completionRate <= 1.1) {
    return 100
  } else if (completionRate >= 0.7 && completionRate <= 1.3) {
    return 85
  } else if (completionRate >= 0.5 && completionRate <= 1.5) {
    return 70
  } else {
    return 50
  }
}

