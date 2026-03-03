/**
 * Translation Exercise API
 * 
 * GET /api/basics/translation/exercise
 * 
 * Fetches a Latin or Greek translation exercise at the appropriate difficulty.
 * Falls back to AI generation if the local database is exhausted.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { selectTranslationWithFallback, formatTranslationExerciseForClient } from '@/lib/basics/problem-selection-utils'
import { ClassicalLanguage, SubjectProgressDisplay } from '@/lib/types/basics'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { incrementLocalUsage, LOCAL_PROBLEM_COUNTS } from '@/lib/basics/localStore'
import { db } from '@/lib/firebase/admin'
import { getGradeLevelString, calculateProgressToNextLevel } from '@/lib/basics/adaptation'

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language') as ClassicalLanguage
    const difficultyParam = searchParams.get('difficulty')
    const excludeIdsParam = searchParams.get('excludeIds')

    // Validate language
    if (!language || !['latin', 'greek'].includes(language)) {
      return badRequestError('Invalid language. Must be "latin" or "greek".')
    }

    // Get user's progress for this language (stored as subcollection)
    let userDifficulty = 1.0
    let progress: SubjectProgressDisplay = {
      currentDifficulty: 1.0,
      currentLevel: 'Grade 1',
      progressToNextLevel: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      totalCompleted: 0,
      accuracyRate: 0
    }

    // Load completed exercises from Firebase to avoid repeats
    let completedExerciseIds: string[] = []
    
    if (db) {
      try {
        const progressDoc = await db.collection('users').doc(userId)
          .collection('translation_progress').doc(language).get()
        
        if (progressDoc.exists) {
          const data = progressDoc.data()
          userDifficulty = data?.currentDifficulty || 1.0
          completedExerciseIds = data?.completedExercises || []
          progress = {
            currentDifficulty: data?.currentDifficulty || 1.0,
            currentLevel: getGradeLevelString(data?.currentDifficulty || 1.0),
            progressToNextLevel: calculateProgressToNextLevel(data?.currentDifficulty || 1.0),
            currentStreak: data?.currentStreak || 0,
            longestStreak: data?.longestStreak || 0,
            totalXP: data?.totalXP || 0,
            totalCompleted: data?.totalCompleted || 0,
            accuracyRate: data?.accuracyRate || 0
          }
        }
      } catch (e) {
        apiLogger.validationError('translation/exercise', `Failed to load ${language} progress for user ${userId}`)
      }
    }

    // Use provided difficulty or user's current level
    const difficulty = difficultyParam ? parseFloat(difficultyParam) : userDifficulty
    if (isNaN(difficulty) || difficulty < 1 || difficulty > 12) {
      return badRequestError('Invalid difficulty. Must be between 1 and 12.')
    }

    // Parse exclude IDs - combine query param with completed exercises from Firebase
    const queryExcludeIds = excludeIdsParam ? excludeIdsParam.split(',').filter(Boolean) : []
    const excludeIds = [...new Set([...queryExcludeIds, ...completedExerciseIds])]
    
    // Select exercise with fallback to AI generation
    const exercise = await selectTranslationWithFallback({
      language,
      targetDifficulty: difficulty,
      excludeIds,
      allowGeneration: isAIGenerationAvailable()
    })

    if (!exercise) {
      return serverError(
        new Error('No exercises available'),
        `No ${language} exercises available at difficulty ${difficulty}. Please try a different difficulty level.`
      )
    }

    // Track usage
    incrementLocalUsage(exercise.id)

    // Format for client (hide acceptable translations and full word details)
    const clientExercise = formatTranslationExerciseForClient(exercise)

    return successResponse({
      exercise: clientExercise,
      progress,
      meta: {
        totalAvailable: LOCAL_PROBLEM_COUNTS[language],
        aiGenerationEnabled: isAIGenerationAvailable(),
        wasAIGenerated: exercise.id.includes('-gen-')
      }
    })

  } catch (error) {
    apiLogger.apiError('translation/exercise', 'Error fetching exercise', error)
    return serverError(error, 'Failed to fetch translation exercise')
  }
}
