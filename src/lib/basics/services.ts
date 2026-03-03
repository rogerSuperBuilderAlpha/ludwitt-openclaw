/**
 * Utility Services for Basics Dashboard
 *
 * Problem caching, retrieval, and generation services.
 * User progress services are in userProgressService.ts
 */

import { db } from '@/lib/firebase/admin'
import { selectMathProblem, selectReadingExercise, incrementLocalUsage, getProblemById } from './localStore'
import { debugLog } from './config'
import { Timestamp } from 'firebase-admin/firestore'
import type { MathProblem } from '@/lib/types/math'
import type { ReadingExercise } from '@/lib/types/reading'
import type { TranslationExercise } from '@/lib/types/translation'

/** Union type for any problem or exercise */
type BasicsContent = MathProblem | ReadingExercise | TranslationExercise | (Record<string, unknown> & { id: string })

/** Cached problem with analytics metadata */
interface CachedProblem {
  id: string
  difficulty?: number
  usageCount?: number
  [key: string]: unknown
}

// Re-export user progress functions for backwards compatibility
export {
  getOrCreateUserProgress,
  updateUserProgress,
  formatSubjectProgress,
  shouldAdvanceGradeLevel,
  getOptimalDifficulty
} from './userProgressService'
import { logger } from '@/lib/logger'

/**
 * Get problem/exercise from cache or generate new one
 */
export async function getProblem(problemId: string, subject: 'math' | 'reading'): Promise<BasicsContent> {
  if (process.env.BASICS_USE_LOCAL_STORE === 'true') {
    const local = getProblemById(subject, problemId)
    if (local) {
      return local
    }
    // Problem not found in local store - this can happen if it was AI-generated previously
    // Try to get a similar problem from local store as fallback
    logger.warn('Getproblem', `Problem ${problemId} not found in local store, attempting fallback`)
    const fallback = subject === 'math'
      ? selectMathProblem(5.0, []) // Use default difficulty
      : selectReadingExercise(5.0, [])
    
    if (fallback) {
      return fallback
    }
    
    // Last resort: try to generate a new problem if generation is available
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        debugLog(`[getProblem] Generating new ${subject} problem as fallback`)
        const { generateMathProblem, generateReadingExercise } = await import('./generation')
        const newProblem = subject === 'math'
          ? await generateMathProblem(5.0, [])
          : await generateReadingExercise(5.0, [])
        return newProblem
      } catch (genError) {
        logger.error('Getproblem', 'Failed to generate fallback problem', { error: genError })
      }
    }
    
    throw new Error(`${subject} problem not found: ${problemId}. Please refresh the page to get a new problem.`)
  }
  const collection = subject === 'math' ? 'mathProblemsCache' : 'readingExercisesCache'
  const doc = await db.collection(collection).doc(problemId).get()
  if (!doc.exists) {
    // Try fallback: get any problem from cache at similar difficulty
    logger.warn('Getproblem', `Problem ${problemId} not found in cache, attempting fallback`)
    const snapshot = await db.collection(collection)
      .limit(1)
      .get()
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data()
      return { id: snapshot.docs[0].id, ...data } as BasicsContent
    }
    throw new Error(`${subject} problem not found: ${problemId}. Please refresh the page to get a new problem.`)
  }
  const data = doc.data()
  return { id: doc.id, ...data } as BasicsContent
}

/**
 * Remove undefined values from object (Firestore doesn't allow them)
 */
function cleanUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefined) as T
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = cleanUndefined(value)
      }
      return acc
    }, {} as Record<string, unknown>) as T
  }
  return obj
}

/**
 * Cache a math problem for future use
 */
export async function cacheMathProblem(problem: MathProblem): Promise<void> {
  const docRef = db.collection('mathProblemsCache').doc(problem.id)
  const cleanedProblem = cleanUndefined({
    ...problem,
    usageCount: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    averageTimeSpent: 0,
    generatedBy: 'ai',
    createdAt: Timestamp.now(),
    lastUsed: Timestamp.now()
  })
  await docRef.set(cleanedProblem)
}

/**
 * Cache a reading exercise for future use
 */
export async function cacheReadingExercise(exercise: ReadingExercise): Promise<void> {
  const docRef = db.collection('readingExercisesCache').doc(exercise.id)
  const cleanedExercise = cleanUndefined({
    ...exercise,
    usageCount: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    averageTimeSpent: 0,
    generatedBy: 'ai',
    createdAt: Timestamp.now(),
    lastUsed: Timestamp.now()
  })
  await docRef.set(cleanedExercise)
}

/**
 * Get cached problem at difficulty level with intelligent hybrid approach
 */
export async function getCachedProblem(
  subject: 'math' | 'reading',
  difficulty: number,
  excludeIds: string[] = []
): Promise<BasicsContent | null> {
  // First try local store (repo files) - these are always preferred when available
  const localProblem = subject === 'math'
    ? selectMathProblem(difficulty, excludeIds)
    : selectReadingExercise(difficulty, excludeIds)
  
  if (localProblem) {
    return localProblem
  }

  // If no local problems available, try Firebase cache
  if (process.env.BASICS_USE_LOCAL_STORE === 'true') {
    // In local-only mode, return null if no local problems
    return null
  }

  const collection = subject === 'math' ? 'mathProblemsCache' : 'readingExercisesCache'
  const snapshot = await db.collection(collection)
    .where('difficulty', '>=', difficulty - 0.5)
    .where('difficulty', '<=', difficulty + 0.5)
    .limit(10)
    .get()
  
  if (snapshot.empty) return null
  
  const problems = snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as CachedProblem))
    .filter((p) => !excludeIds.includes(p.id))
    .sort((a, b) => (a.usageCount || 0) - (b.usageCount || 0))
  
  if (problems.length === 0) return null
  return problems[0] as BasicsContent
}

/**
 * Result from problem generation with usage tracking
 */
export interface ProblemWithUsageResult {
  problem: BasicsContent
  wasGenerated: boolean
  usage?: {
    input_tokens: number
    output_tokens: number
    model: string
  }
}

/**
 * Get problem with automatic generation fallback and usage tracking
 * Returns usage info when AI generation was used for credit tracking
 */
export async function getProblemWithGenerationAndUsage(
  subject: 'math' | 'reading',
  difficulty: number,
  excludeIds: string[] = [],
  generateIfNeeded: boolean = true
): Promise<ProblemWithUsageResult> {
  // Try to get cached problem first
  const cachedProblem = await getCachedProblem(subject, difficulty, excludeIds)
  
  if (cachedProblem) {
    return { problem: cachedProblem, wasGenerated: false }
  }

  // If no cached problem and generation is disabled, return more helpful error
  if (!generateIfNeeded) {
    throw new Error(`No ${subject} problems available at difficulty ${difficulty}. AI generation is disabled - check ANTHROPIC_API_KEY configuration.`)
  }

  // Generate new problem with usage tracking
  debugLog(`Generating new ${subject} problem at difficulty ${difficulty}`)
  const { generateMathProblemWithUsage, generateReadingExerciseWithUsage } = await import('./generation')
  
  const generationResult = subject === 'math' 
    ? await generateMathProblemWithUsage(difficulty, excludeIds)
    : await generateReadingExerciseWithUsage(difficulty, excludeIds)

  const newProblem = generationResult.result

  // Cache the generated problem for future use (unless in local-only mode)
  if (process.env.BASICS_USE_LOCAL_STORE !== 'true') {
    try {
      if (subject === 'math') {
        await cacheMathProblem(newProblem as MathProblem)
      } else {
        await cacheReadingExercise(newProblem as ReadingExercise)
      }
      debugLog(`Cached new ${subject} problem: ${newProblem.id}`)
    } catch (error) {
      logger.warn('Services', `Failed to cache ${subject} problem`, { error: error })
      // Continue anyway - the problem is still valid
    }
  }

  return {
    problem: newProblem,
    wasGenerated: true,
    usage: generationResult.usage
  }
}

/**
 * Get problem with automatic generation fallback
 * This is the main function the API should use
 * @deprecated Use getProblemWithGenerationAndUsage for credit tracking
 */
export async function getProblemWithGeneration(
  subject: 'math' | 'reading',
  difficulty: number,
  excludeIds: string[] = [],
  generateIfNeeded: boolean = true
): Promise<BasicsContent> {
  const result = await getProblemWithGenerationAndUsage(subject, difficulty, excludeIds, generateIfNeeded)
  return result.problem
}

/**
 * Result from translation generation with usage tracking
 */
export interface TranslationWithUsageResult {
  exercise: TranslationExercise
  wasGenerated: boolean
  usage?: {
    input_tokens: number
    output_tokens: number
    model: string
  }
}

/**
 * Get translation exercise with automatic generation fallback and usage tracking
 * Returns usage info when AI generation was used for credit tracking
 */
export async function getTranslationWithGenerationAndUsage(
  language: 'latin' | 'greek',
  difficulty: number,
  excludeIds: string[] = [],
  generateIfNeeded: boolean = true
): Promise<TranslationWithUsageResult> {
  // Try to get from local store first
  const { selectTranslationExercise } = await import('./localStore')
  const localExercise = selectTranslationExercise(language, difficulty, excludeIds)
  
  if (localExercise) {
    return { exercise: localExercise, wasGenerated: false }
  }

  // If no local exercise and generation is disabled, throw error
  if (!generateIfNeeded) {
    throw new Error(`No ${language} exercises available at difficulty ${difficulty}. AI generation is disabled.`)
  }

  // Generate new exercise with usage tracking
  debugLog(`Generating new ${language} translation exercise at difficulty ${difficulty}`)
  const { generateTranslationExerciseWithUsage } = await import('./generation')
  
  const generationResult = await generateTranslationExerciseWithUsage(language, difficulty, excludeIds)
  
  debugLog(`Generated new ${language} exercise: ${generationResult.result.id}`)
  
  // Note: AI-generated translation exercises are not cached to Firestore
  // as the local exercise bank is the primary source
  
  return {
    exercise: generationResult.result,
    wasGenerated: true,
    usage: generationResult.usage
  }
}

/**
 * Get translation exercise with automatic generation fallback
 * This is the main function for translation exercises
 * @deprecated Use getTranslationWithGenerationAndUsage for credit tracking
 */
export async function getTranslationWithGeneration(
  language: 'latin' | 'greek',
  difficulty: number,
  excludeIds: string[] = [],
  generateIfNeeded: boolean = true
): Promise<TranslationExercise> {
  const result = await getTranslationWithGenerationAndUsage(language, difficulty, excludeIds, generateIfNeeded)
  return result.exercise
}

/**
 * Increment usage count for a cached problem
 */
export async function incrementProblemUsage(
  subject: 'math' | 'reading',
  problemId: string
): Promise<void> {
  if (process.env.BASICS_USE_LOCAL_STORE === 'true') {
    incrementLocalUsage(problemId)
    return
  }
  
  const collection = subject === 'math' ? 'mathProblemsCache' : 'readingExercisesCache'
  const docRef = db.collection(collection).doc(problemId)
  
  try {
    const doc = await docRef.get()
    if (doc.exists) {
      // Document exists in cache, update it
      const current = doc.data()?.usageCount || 0
      await docRef.update({
        usageCount: current + 1,
        lastUsed: Timestamp.now()
      })
    } else {
      // Document doesn't exist (likely a local store problem), just track locally
      incrementLocalUsage(problemId)
      debugLog(`Problem ${problemId} not found in cache, tracking locally only`)
    }
  } catch (error) {
    // Log error but don't throw to prevent breaking the API
    logger.warn('Services', `Failed to increment usage for problem ${problemId}`, { error: error })
    // Fall back to local tracking
    incrementLocalUsage(problemId)
  }
}
