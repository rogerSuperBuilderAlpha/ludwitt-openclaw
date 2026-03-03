/**
 * API Route: POST /api/basics/check-answer
 *
 * Validates user's answer, updates progress, and returns next problem
 * at adjusted difficulty level.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields, validateSubject } from '@/lib/api/validators'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { apiLogger } from '@/lib/logger'
import {
  getProblem,
  updateUserProgress,
  incrementProblemUsage
} from '@/lib/basics/services'
import { calculateXP, getGradeLevelString } from '@/lib/basics/adaptation'
import { CheckAnswerRequest, CheckAnswerResponse, MathProblem, ReadingExercise } from '@/lib/types/basics'
import { updateEnhancedSystems } from '@/lib/basics/enhanced-systems-update'
import { triggerMoatUpdates } from '@/lib/basics/moat-systems-integration'
import { selectProblemWithFallbackAndUsage } from '@/lib/basics/problem-selection-utils'
import { validateAnswerBySubject, formatProblemForClient, getExcludeIds } from '@/lib/basics/subject-helpers'

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Parse request body
    const body = await request.json()
    const { subject, problemId, userAnswer, timeSpent, workShown, skipCost, costsIncurred } = body as CheckAnswerRequest & { 
      workShown?: string
      skipCost?: number 
      costsIncurred?: number  // XP costs for hints, AI tutor, etc. used during this problem
    }

    apiLogger.debug('check-answer', 'Processing request', { 
      data: { subject, problemId, userAnswer, timeSpent, costsIncurred, userId } 
    })

    // Validate required fields
    const validationError = validateRequiredFields(body, ['subject', 'problemId', 'userAnswer'])
    if (validationError) return validationError
    
    // Validate subject
    const subjectError = validateSubject(subject)
    if (subjectError) return subjectError

    // Get problem details from cache (typed based on subject param)
    const problemData = await getProblem(problemId, subject)
    if (!problemData) {
      apiLogger.apiError('check-answer', 'Problem not found', { data: { problemId } })
      return notFoundError('Problem not found')
    }
    const problem = problemData as MathProblem | ReadingExercise

    // Validate answer using subject helper
    const validationResult = await validateAnswerBySubject(problem, userAnswer, subject)

    // Calculate base XP earned (costs are deducted from earnings, not from total)
    let xpEarned = calculateXP(
      validationResult.correct,
      timeSpent,
      problem.timeEstimate,
      0, // We'll get actual streak from progress update
      costsIncurred || 0  // XP costs incurred during this problem
    )

    // Handle skip - no XP for skipped problems
    if (userAnswer === '__SKIPPED__') {
      xpEarned = 0
    }

    // Evaluate work shown for bonus XP
    let workBonus: { bonus: number; feedback: string; improvements?: string[]; whatWentWell?: string } | null = null
    if (workShown && workShown.trim() && subject === 'math') {
      try {
        // Get the authorization header to forward to internal call
        const authHeader = request.headers.get('Authorization')
        const mathProblem = problem as MathProblem
        
        // Call the evaluate-work API internally
        const workEvalResponse = await fetch(
          new URL('/api/basics/evaluate-work', request.url).toString(),
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              ...(authHeader ? { 'Authorization': authHeader } : {})
            },
            body: JSON.stringify({
              question: mathProblem.question,
              correctAnswer: mathProblem.correctAnswer,
              userAnswer,
              workShown,
              isCorrect: validationResult.correct
            })
          }
        )
        
        if (workEvalResponse.ok) {
          const workEval = await workEvalResponse.json()
          // Include work feedback even if bonusXp is 0 (for wrong answers, still show feedback on their work)
          if (workEval.feedback || workEval.bonusXp > 0) {
            xpEarned += workEval.bonusXp || 0
            workBonus = {
              bonus: workEval.bonusXp || 0,
              feedback: workEval.feedback || 'Thanks for showing your work!',
              improvements: workEval.improvements || [],
              whatWentWell: workEval.whatWentWell || null
            }
          }
        } else {
          apiLogger.apiError('check-answer', 'Work evaluation failed with status', { 
            data: { status: workEvalResponse.status } 
          })
        }
      } catch (workEvalError) {
        apiLogger.apiError('check-answer', 'Work evaluation failed, continuing without bonus', workEvalError)
      }
    }

    // Update user progress (idempotency check is inside the transaction)
    const progressUpdate = await updateUserProgress(userId, subject, {
      problemId,
      difficulty: problem.difficulty,
      type: problem.type,
      correct: validationResult.correct,
      timeSpent,
      xpEarned
    })

    // Transaction returned null → duplicate submission detected inside serialized read
    if (progressUpdate === null) {
      apiLogger.debug('check-answer', 'Duplicate submission rejected by transaction', { data: { problemId, userId } })
      return badRequestError('Duplicate submission - this answer was already processed')
    }

    // NOTE: xpHistory and xpTransactions are now written atomically inside
    // updateUserProgress's Firestore transaction — no separate awardXP call needed.
    // awardXP is still used by other flows (focus-mode, bonus XP, etc.) that don't
    // go through updateUserProgress.

    // Enhanced learning science updates (with error handling)
    let enhancedFeatures = {}
    try {
      enhancedFeatures = await updateEnhancedSystems(
        userId,
        subject,
        problem,
        validationResult.correct,
        timeSpent,
        {} // Basic version uses default options
      )
    } catch (enhancedError) {
      apiLogger.apiError('check-answer', 'Enhanced system update failed, continuing with basic response', enhancedError)
    }

    // Trigger technical moat systems (fire and forget - doesn't block response)
    // Use Record to access properties that vary between MathProblem and ReadingExercise
    const problemRecord = problem as unknown as Record<string, unknown>
    triggerMoatUpdates({
      userId,
      problemId,
      subject,
      problemType: String(problemRecord.type || 'unknown'),
      problemText: String(problemRecord.question || ''),
      difficulty: Number(problemRecord.difficulty || 1),
      userAnswer: typeof userAnswer === 'string' ? userAnswer : JSON.stringify(userAnswer),
      correctAnswer: String(problemRecord.correctAnswer || ''),
      isCorrect: validationResult.correct,
      timeSpentMs: timeSpent * 1000,
      skills: (problemRecord.skills as string[]) || [],
      explanation: problemRecord.explanation as string | undefined
    })

    // Generate next problem at new difficulty using progressive fallback with retry logic
    const excludeIds = getExcludeIds(subject, {
      math: { problemsSeen: progressUpdate.problemsSeen },
      reading: { exercisesSeen: progressUpdate.exercisesSeen }
    })
    
    let selectionResult = await selectProblemWithFallbackAndUsage(subject, {
      targetDifficulty: progressUpdate.newDifficulty,
      excludeIds,
      allowGeneration: isAIGenerationAvailable()
    })

    // Retry with easier difficulty if first attempt fails
    if (!selectionResult.problem && progressUpdate.newDifficulty > 1) {
      const easierDifficulty = Math.max(1, progressUpdate.newDifficulty - 1)
      apiLogger.debug('check-answer', `Retrying with easier difficulty: ${easierDifficulty}`)
      
      selectionResult = await selectProblemWithFallbackAndUsage(subject, {
        targetDifficulty: easierDifficulty,
        excludeIds,
        allowGeneration: isAIGenerationAvailable()
      })
    }

    // Final fallback: try without exclusions at base difficulty
    if (!selectionResult.problem) {
      apiLogger.debug('check-answer', 'Final fallback: trying base difficulty without exclusions')
      
      selectionResult = await selectProblemWithFallbackAndUsage(subject, {
        targetDifficulty: 3, // Base difficulty
        excludeIds: [],
        allowGeneration: isAIGenerationAvailable()
      })
    }

    if (!selectionResult.problem) {
      apiLogger.apiError('check-answer', 'All problem selection strategies failed', {
        data: { subject, targetDifficulty: progressUpdate.newDifficulty }
      })
      return serverError(
        new Error('No problems available'),
        'Unable to load next problem. Please try refreshing the page or contact support if the issue persists.'
      )
    }
    
    const nextProblem = selectionResult.problem

    // Track credits if AI generation was used
    if (selectionResult.wasGenerated && selectionResult.generationType === 'ai' && selectionResult.usage) {
      try {
        const { trackCreditsAfterCall } = await import('@/lib/credits')
        await trackCreditsAfterCall(
          userId,
          'basics/problem-generation',
          selectionResult.usage.model,
          {
            input_tokens: selectionResult.usage.input_tokens,
            output_tokens: selectionResult.usage.output_tokens
          }
        )
        apiLogger.debug('check-answer', 'Tracked credits for AI problem generation', {
          data: { 
            inputTokens: selectionResult.usage.input_tokens,
            outputTokens: selectionResult.usage.output_tokens 
          }
        })
      } catch (creditError) {
        apiLogger.apiError('check-answer', 'Failed to track generation credits', creditError)
        // Don't fail the request if credit tracking fails
      }
    }

    // Increment usage count
    await incrementProblemUsage(subject, nextProblem.id)

    // Format next problem for client (remove correct answers)
    const clientNextProblem = formatProblemForClient(nextProblem, subject)

    // Get explanation from problem (MathProblem has it, ReadingExercise may not)
    const problemExplanation = (problem as unknown as { explanation?: string }).explanation
    
    return successResponse({
      correct: validationResult.correct,
      feedback: validationResult.feedback,
      explanation: problemExplanation || validationResult.explanation,
      xpEarned,
      workBonus, // Bonus XP for showing work
      currentStreak: progressUpdate.currentStreak,
      nextProblem: clientNextProblem,
      progressUpdate: {
        currentDifficulty: progressUpdate.newDifficulty,
        currentLevel: getGradeLevelString(progressUpdate.newDifficulty),
        totalCompleted: progressUpdate.totalCompleted,
        totalCorrect: progressUpdate.totalCorrect,
        accuracyRate: progressUpdate.accuracyRate,
        currentStreak: progressUpdate.currentStreak,
        longestStreak: progressUpdate.longestStreak,
        totalXP: progressUpdate.totalXP,
        progressToNextLevel: progressUpdate.progressToNextLevel
      },
      // Enhanced features
      ...enhancedFeatures
    })
  } catch (error) {
    return serverError(error, 'Failed to check answer')
  }
}
