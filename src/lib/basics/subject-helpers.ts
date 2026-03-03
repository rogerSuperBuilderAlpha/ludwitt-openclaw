/**
 * Subject Helper Utilities
 * 
 * Common subject-based operations and mappings
 */

import { MathProblem, ReadingExercise } from '@/lib/types/basics'
import { formatMathProblemForClient, formatReadingExerciseForClient, MathProblemClient, ReadingExerciseClient } from './problem-selection-utils'
import { validateMathAnswer, validateReadingAnswer } from './validation'
import { logger } from '@/lib/logger'

/**
 * Format problem for client based on subject
 */
export function formatProblemForClient(
  problem: MathProblem | ReadingExercise | null,
  subject: 'math' | 'reading'
): MathProblemClient | ReadingExerciseClient | null {
  if (!problem) return null
  
  return subject === 'math'
    ? formatMathProblemForClient(problem as MathProblem)
    : formatReadingExerciseForClient(problem as ReadingExercise)
}

/**
 * Validate answer based on subject
 * Supports both old-style (separate params) and new-style (problem object) calls
 *
 * SECURITY: Includes type validation to prevent invalid data from being processed
 */
export async function validateAnswerBySubject(
  problem: MathProblem | ReadingExercise,
  userAnswer: string | Record<string, string>,
  subject: 'math' | 'reading'
) {
  if (subject === 'math') {
    const mathProblem = problem as MathProblem

    // Type validation: ensure userAnswer is a string for math problems
    if (typeof userAnswer !== 'string') {
      logger.error('Validateanswerbysubject', 'Expected string for math answer, got', { error: typeof userAnswer })
      return {
        correct: false,
        feedback: 'Invalid answer format',
        explanation: 'Please enter a valid answer'
      }
    }

    return await validateMathAnswer(
      mathProblem.correctAnswer,
      userAnswer,
      mathProblem.acceptableAnswers
    )
  } else {
    const readingProblem = problem as ReadingExercise

    // Type validation: ensure userAnswer is an object for reading problems
    if (typeof userAnswer !== 'object' || userAnswer === null) {
      logger.error('Validateanswerbysubject', 'Expected object for reading answer, got', { error: typeof userAnswer })
      return {
        correct: false,
        feedback: 'Invalid answer format',
        explanation: 'Please answer all questions',
        questionResults: []
      }
    }

    return await validateReadingAnswer(
      readingProblem.questions,
      userAnswer
    )
  }
}

/**
 * Get project ID for analytics based on subject
 */
export function getProjectId(subject: 'math' | 'reading', enhanced: boolean = false): string {
  if (enhanced) {
    return subject === 'math' ? 'basics-math-enhanced' : 'basics-reading-enhanced'
  }
  return subject === 'math' ? 'basics-math' : 'basics-reading'
}

/**
 * Get exclude IDs based on subject and progress
 */
export function getExcludeIds(
  subject: 'math' | 'reading',
  progress: { math: { problemsSeen: string[] }; reading: { exercisesSeen: string[] } }
): string[] {
  return subject === 'math' ? progress.math.problemsSeen : progress.reading.exercisesSeen
}

