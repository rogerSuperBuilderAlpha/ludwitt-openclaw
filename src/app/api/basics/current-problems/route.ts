/**
 * API Route: GET /api/basics/current-problems
 *
 * Returns current math problem and reading exercise for the user
 * based on their current difficulty level.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, serviceUnavailableError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import {
  getQueryParamAsBoolean,
  getQueryParamAsArray,
  getQueryParamAsNumber,
} from '@/lib/api/request-helpers'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { apiLogger } from '@/lib/logger'
import { auth, db } from '@/lib/firebase/admin'
import {
  getOrCreateUserProgress,
  formatSubjectProgress,
  getProblemWithGeneration,
  incrementProblemUsage,
  getOptimalDifficulty,
} from '@/lib/basics/services'
import {
  GetCurrentProblemsResponse,
  UserBasicsProgress,
} from '@/lib/types/basics'
import { truncateString } from '@/lib/utils/string-helpers'
import { defaultToZero, defaultToArray } from '@/lib/utils/default-values'
import { getTodayDate } from '@/lib/utils/date-helpers'
import { calculateXPByTimeRange } from '@/lib/basics/xp-config'
import {
  sortByDifficultyRelevance,
  isWithinDifficultyBand,
  isBelowDifficulty,
  isAboveDifficulty,
} from '@/lib/utils/difficulty-helpers'
// Enhanced learning science imports
import {
  getOrCreateCognitiveProfile,
  getOrCreateSpacingScheduler,
  initializeSkillsFromProgress,
} from '@/lib/basics/enhanced-database-service'
import { selectEnhancedProblems } from '@/lib/basics/enhanced-problem-selection'
import { generateMetacognitivePrompts } from '@/lib/basics/metacognitive-support'
import {
  selectMathProblem,
  selectReadingExercise,
  getAllLocalProblems,
} from '@/lib/basics/localStore'
import { MathProblem } from '@/lib/types/basics'
import {
  selectProblemWithFallback,
  formatMathProblemForClient,
  formatReadingExerciseForClient,
  formatMetacognitivePromptsForClient,
} from '@/lib/basics/problem-selection-utils'

export async function GET(request: NextRequest) {
  try {
    apiLogger.routeCall('Current Problems')

    // Check if Firebase Admin is configured
    if (!auth) {
      apiLogger.apiError('Current Problems', 'Firebase Admin not configured')
      return serviceUnavailableError(
        'Firebase Admin SDK not configured. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.'
      )
    }

    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    apiLogger.authSuccess('Current Problems', userId)

    // Parse query parameters for enhanced features
    const useEnhanced = getQueryParamAsBoolean(request, 'enhanced', true) // Default to enhanced
    const sessionGoals = getQueryParamAsArray(request, 'goals')
    const timeConstraints = getQueryParamAsNumber(request, 'timeMinutes')

    // Get user progress
    const progress = await getOrCreateUserProgress(userId)
    apiLogger.debug('Current Problems', 'User progress loaded', {
      data: {
        mathDifficulty: progress.math.currentDifficulty,
        readingDifficulty: progress.reading.currentDifficulty,
        mathCompleted: progress.math.totalCompleted,
        readingCompleted: progress.reading.totalCompleted,
      },
    })

    // Check if daily XP needs to be reset (new day)
    const todayDate = getTodayDate()
    const isNewDay = progress.lastActiveDate !== todayDate
    const effectiveDailyXP = isNewDay ? 0 : defaultToZero(progress.dailyXP)

    if (isNewDay) {
      apiLogger.debug(
        'Current Problems',
        'New day detected, resetting daily XP',
        {
          data: {
            lastActiveDate: progress.lastActiveDate,
            todayDate,
            previousDailyXP: progress.dailyXP,
          },
        }
      )
    }

    // Calculate time-ranged XP values from history
    const timeRangedXP = calculateXPByTimeRange(
      progress.xpHistory,
      effectiveDailyXP,
      defaultToZero(progress.totalXP)
    )

    // Try enhanced system first, fall back to original if needed
    if (useEnhanced) {
      apiLogger.debug('Current Problems', 'Attempting enhanced system')
      try {
        return await getEnhancedProblems(
          userId,
          progress,
          sessionGoals,
          timeConstraints,
          effectiveDailyXP,
          timeRangedXP
        )
      } catch (enhancedError) {
        apiLogger.apiError(
          'Current Problems',
          'Enhanced system error, falling back to original',
          enhancedError
        )
        // Continue with original system below
      }
    } else {
      apiLogger.debug(
        'Current Problems',
        'Enhanced mode disabled, using original system'
      )
    }

    // Original system (fallback)
    apiLogger.debug(
      'Current Problems',
      'Using original problem selection system'
    )

    // Get optimal difficulty considering grade progression
    const optimalMathDifficulty = getOptimalDifficulty(
      progress.math,
      progress.math.currentDifficulty
    )
    const optimalReadingDifficulty = getOptimalDifficulty(
      progress.reading,
      progress.reading.currentDifficulty
    )

    apiLogger.debug('Current Problems', 'Optimal difficulties', {
      data: {
        math: optimalMathDifficulty,
        reading: optimalReadingDifficulty,
      },
    })

    // Get problems using the hybrid system with automatic generation
    apiLogger.debug('Current Problems', 'Getting math problem', {
      data: {
        targetDifficulty: optimalMathDifficulty,
        problemsSeen: progress.math.problemsSeen.length,
        hasAnthropicKey: isAIGenerationAvailable(),
      },
    })

    const mathProblem = await selectProblemWithFallback('math', {
      targetDifficulty: optimalMathDifficulty,
      excludeIds: progress.math.problemsSeen,
      allowGeneration: isAIGenerationAvailable(),
    })

    if (!mathProblem || !mathProblem.id) {
      throw new Error(
        'Math problem is invalid. Please try refreshing the page.'
      )
    }

    apiLogger.debug('Current Problems', 'Math problem selected', {
      data: {
        id: mathProblem.id,
        difficulty: mathProblem.difficulty,
        type: mathProblem.type,
        question: truncateString(
          (mathProblem as MathProblem).question || '',
          60
        ),
      },
    })

    // Increment usage count for math problem
    try {
      await incrementProblemUsage('math', mathProblem.id)
    } catch (usageError) {
      apiLogger.apiError(
        'Current Problems',
        'Failed to increment usage count',
        usageError
      )
      // Don't fail the request if usage tracking fails
    }

    const readingExercise = await selectProblemWithFallback('reading', {
      targetDifficulty: optimalReadingDifficulty,
      excludeIds: progress.reading.exercisesSeen,
      allowGeneration: isAIGenerationAvailable(),
    })

    if (readingExercise && readingExercise.id) {
      // Increment usage count for reading exercise
      try {
        await incrementProblemUsage('reading', readingExercise.id)
      } catch (usageError) {
        apiLogger.apiError(
          'Current Problems',
          'Failed to increment reading usage count',
          usageError
        )
        // Don't fail the request if usage tracking fails
      }
    }

    // Format for client (remove correct answers)
    const clientMathProblem = formatMathProblemForClient(
      mathProblem as MathProblem
    )
    const clientReadingExercise =
      formatReadingExerciseForClient(readingExercise)

    // Load Latin, Greek, and Logic XP from Firebase
    let latinXP = 0
    let greekXP = 0
    let logicXP = 0

    if (db) {
      try {
        const [latinDoc, greekDoc, logicDoc] = await Promise.all([
          db
            .collection('users')
            .doc(userId)
            .collection('translation_progress')
            .doc('latin')
            .get(),
          db
            .collection('users')
            .doc(userId)
            .collection('translation_progress')
            .doc('greek')
            .get(),
          db
            .collection('users')
            .doc(userId)
            .collection('logic_progress')
            .doc('progress')
            .get(),
        ])

        latinXP = latinDoc.exists ? latinDoc.data()?.totalXP || 0 : 0
        greekXP = greekDoc.exists ? greekDoc.data()?.totalXP || 0 : 0
        logicXP = logicDoc.exists ? logicDoc.data()?.totalXP || 0 : 0
      } catch (e) {
        apiLogger.apiError(
          'Current Problems',
          'Failed to load translation/logic XP',
          e
        )
      }
    }

    return successResponse({
      mathProblem: clientMathProblem,
      readingExercise: readingExercise ? clientReadingExercise : null,
      mathProgress: formatSubjectProgress(progress.math),
      readingProgress: formatSubjectProgress(progress.reading),
      // Include problemsSeen for client-side problem selection
      mathProblemsSeen: progress.math.problemsSeen || [],
      dailyXP: effectiveDailyXP,
      dailyGoal: defaultToZero(progress.dailyGoal) || 1000,
      latinXP,
      greekXP,
      logicXP,
      // Time-ranged XP values (WTD = Week to Date from Monday, MTD = Month to Date)
      wtdXP: timeRangedXP.wtdXP,
      mtdXP: timeRangedXP.mtdXP,
      ytdXP: timeRangedXP.ytdXP,
      allTimeXP: defaultToZero(progress.totalXP),
    })
  } catch (error) {
    apiLogger.apiError(
      'Current Problems',
      'Error fetching current problems',
      error
    )
    return serverError(error, 'Failed to fetch problems')
  }
}

/**
 * Enhanced problem selection using learning science systems
 */
async function getEnhancedProblems(
  userId: string,
  progress: UserBasicsProgress,
  sessionGoals: string[],
  timeConstraints?: number,
  effectiveDailyXP: number = 0,
  timeRangedXP: { wtdXP: number; mtdXP: number; ytdXP: number } = {
    wtdXP: 0,
    mtdXP: 0,
    ytdXP: 0,
  }
): Promise<NextResponse> {
  apiLogger.debug('Enhanced Problems', 'Starting enhanced problem selection', {
    data: {
      mathDifficulty: progress.math.currentDifficulty,
      readingDifficulty: progress.reading.currentDifficulty,
    },
  })

  // Get or create enhanced systems in parallel
  const [cognitiveProfile, spacingScheduler] = await Promise.all([
    getOrCreateCognitiveProfile(userId),
    getOrCreateSpacingScheduler(userId),
  ])

  apiLogger.debug('Enhanced Problems', 'Cognitive profile loaded', {
    data: { mathSkills: cognitiveProfile.mathSkills.size },
  })

  // Initialize skills if this is a new user (parallel initialization)
  const initializationPromises: Promise<void>[] = []

  if (cognitiveProfile.mathSkills.size === 0) {
    apiLogger.debug(
      'Enhanced Problems',
      'Initializing math skills from progress'
    )
    initializationPromises.push(
      initializeSkillsFromProgress(userId, 'math', progress.math)
    )
  }

  if (cognitiveProfile.readingSkills.size === 0) {
    apiLogger.debug(
      'Enhanced Problems',
      'Initializing reading skills from progress'
    )
    initializationPromises.push(
      initializeSkillsFromProgress(userId, 'reading', progress.reading)
    )
  }

  if (initializationPromises.length > 0) {
    await Promise.all(initializationPromises)
    // Refresh cognitive profile after initialization
    const refreshedProfile = await getOrCreateCognitiveProfile(userId)
    Object.assign(cognitiveProfile, refreshedProfile)
  }

  // Get available problems (using ALL local store problems, not just arithmetic)
  // Filter out problems that have already been seen by the user and prioritize by difficulty
  const problemsSeen = defaultToArray<string>(progress.math.problemsSeen)
  const problemsSeenSet = new Set(problemsSeen) // Use Set for O(1) lookups
  const allLocalProblems = getAllLocalProblems()
  const targetMathDifficulty = getOptimalDifficulty(
    progress.math,
    progress.math.currentDifficulty
  )

  const unseenProblems = allLocalProblems.math.filter(
    (problem) => !problemsSeenSet.has(problem.id)
  )

  const sortedByRelevance = sortByDifficultyRelevance(
    unseenProblems,
    targetMathDifficulty
  )

  const withinPrimaryBand = sortedByRelevance.filter((problem) =>
    isWithinDifficultyBand(problem.difficulty, targetMathDifficulty)
  )
  const remediationBand = sortedByRelevance
    .filter((problem) =>
      isBelowDifficulty(problem.difficulty, targetMathDifficulty)
    )
    .slice(0, 20)
  const challengeBand = sortedByRelevance
    .filter((problem) =>
      isAboveDifficulty(problem.difficulty, targetMathDifficulty)
    )
    .slice(0, 20)

  // Use Set for O(1) lookups instead of O(n) .some() checks
  const prioritized: typeof sortedByRelevance = []
  const seenIds = new Set<string>()

  const pushUnique = (problem: (typeof sortedByRelevance)[number]) => {
    if (!seenIds.has(problem.id)) {
      seenIds.add(problem.id)
      prioritized.push(problem)
    }
  }

  withinPrimaryBand.forEach(pushUnique)
  remediationBand.forEach(pushUnique)
  challengeBand.forEach(pushUnique)

  // Ensure we still have a sufficiently large pool by backfilling with remaining problems
  if (prioritized.length < 80) {
    sortedByRelevance.forEach(pushUnique)
  }

  const availableProblems = prioritized.slice(0, 150)

  apiLogger.debug('Enhanced Problems', 'Available problems', {
    data: {
      total: allLocalProblems.math.length,
      unseenCount: unseenProblems.length,
      candidateCount: availableProblems.length,
      targetDifficulty: targetMathDifficulty,
      difficultySample: availableProblems.slice(0, 10).map((p) => p.difficulty),
    },
  })

  // Create enhanced problem request for math
  const mathRequest = {
    userId,
    subject: 'math' as const,
    requestedCount: 1,
    currentProgress: progress,
    cognitiveProfile,
    spacingScheduler,
    sessionGoals,
    timeConstraints,
    preferredCognitiveLoad: 3,
  }

  // Get enhanced problem selection
  const mathSelection = await selectEnhancedProblems(
    mathRequest,
    availableProblems
  )
  apiLogger.debug('Enhanced Problems', 'Selection result', {
    data: {
      problemsSelected: mathSelection.problems.length,
      learningRationale: mathSelection.learningRationale,
    },
  })

  // Use the first problem from the selection
  let selectedMathProblem: MathProblem | null = mathSelection
    .problems[0] as MathProblem | null

  // Fallback if enhanced system returns no problems
  if (!selectedMathProblem) {
    apiLogger.apiError(
      'Enhanced Problems',
      'No problems selected, falling back to progressive selection',
      new Error('No problems selected')
    )
    selectedMathProblem = (await selectProblemWithFallback('math', {
      targetDifficulty: targetMathDifficulty,
      excludeIds: problemsSeen,
      allowGeneration: isAIGenerationAvailable(),
    })) as MathProblem | null
  }

  apiLogger.debug('Enhanced Problems', 'Selected problem', {
    data: {
      id: selectedMathProblem?.id,
      difficulty: selectedMathProblem?.difficulty,
      type: selectedMathProblem?.type,
      question:
        selectedMathProblem && 'question' in selectedMathProblem
          ? truncateString(String(selectedMathProblem.question) || '', 50)
          : 'NO PROBLEM',
    },
  })

  // If still no problem, throw error
  if (!selectedMathProblem) {
    throw new Error(
      'Unable to load math problem. Please try refreshing the page.'
    )
  }

  const mathScaffolding = mathSelection.scaffoldingRecommendations.get(
    selectedMathProblem?.id
  )

  // Generate metacognitive prompts for math
  const mathMetacognitivePrompts = generateMetacognitivePrompts(
    'math',
    selectedMathProblem?.type || 'arithmetic',
    selectedMathProblem?.difficulty || 5,
    cognitiveProfile.metacognitiveLevel
  )

  // For reading, use progressive fallback selection
  const readingExercise = await selectProblemWithFallback('reading', {
    targetDifficulty: progress.reading.currentDifficulty,
    excludeIds: defaultToArray<string>(progress.reading.exercisesSeen),
    allowGeneration: !!process.env.ANTHROPIC_API_KEY,
  })

  let readingMetacognitivePrompts = null
  if (readingExercise) {
    readingMetacognitivePrompts = generateMetacognitivePrompts(
      'reading',
      readingExercise.type,
      readingExercise.difficulty,
      cognitiveProfile.metacognitiveLevel
    )
  }

  // Format problems for client (remove correct answers)
  const clientMathProblem = formatMathProblemForClient(
    selectedMathProblem
  ) as Record<string, unknown> | null
  if (clientMathProblem && mathScaffolding) {
    clientMathProblem.scaffolding = {
      supportLevel: mathScaffolding.supportLevel,
      reasoning: mathScaffolding.reasoning,
      adaptations: mathScaffolding.adaptations,
    }
  }

  const clientReadingExercise = formatReadingExerciseForClient(readingExercise)

  return successResponse({
    mathProblem: clientMathProblem,
    readingExercise: clientReadingExercise,
    mathProgress: formatSubjectProgress(progress.math),
    readingProgress: formatSubjectProgress(progress.reading),
    dailyXP: effectiveDailyXP,
    dailyGoal: defaultToZero(progress.dailyGoal) || 1000,
    // Time-ranged XP values (WTD = Week to Date from Monday, MTD = Month to Date)
    wtdXP: timeRangedXP.wtdXP,
    mtdXP: timeRangedXP.mtdXP,
    ytdXP: timeRangedXP.ytdXP,
    allTimeXP: defaultToZero(progress.totalXP),
    // Enhanced features
    enhanced: true,
    learningRationale: mathSelection.learningRationale,
    expectedOutcomes: mathSelection.expectedOutcomes,
    sessionPlan: {
      estimatedTime: mathSelection.sessionPlan.estimatedTime,
      cognitiveLoadProgression:
        mathSelection.sessionPlan.cognitiveLoadProgression,
      skillFocus: mathSelection.sessionPlan.skillFocus,
    },
    metacognitivePrompts: {
      math: formatMetacognitivePromptsForClient(mathMetacognitivePrompts),
      reading: formatMetacognitivePromptsForClient(readingMetacognitivePrompts),
    },
  })
}
