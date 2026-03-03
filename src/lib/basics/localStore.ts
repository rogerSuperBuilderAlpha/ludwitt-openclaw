/**
 * Local Problem Store
 *
 * V2 Math problems are loaded from the new math-v2 store.
 * Reading and classical language exercises remain unchanged.
 * 
 * DEPRECATED: V1 math functions are no longer used - use getRandomMathProblemV2 instead.
 */

import { MathProblem, ReadingExercise, TranslationExercise, ClassicalLanguage } from '../types/basics'
import { MathProblemV2 } from '../types/math-v2'
import { getRandomMathProblemV2, getAllMathProblemsV2 } from '../../data/basics/math-v2'

// Reading categories
import { COMPREHENSION_G1_3 } from '../../data/basics/reading/comprehension_g1_3'
import { COMPREHENSION_G4_6 } from '../../data/basics/reading/comprehension_g4_6'
import { COMPREHENSION_G7_9 } from '../../data/basics/reading/comprehension_g7_9'
import { COMPREHENSION_G10_12 } from '../../data/basics/reading/comprehension_g10_12'
import { STEM_READING } from '../../data/basics/reading/stemReading'
import { VOCABULARY_EXERCISES } from '../../data/basics/reading/vocabulary'
import { GRAMMAR_EXERCISES } from '../../data/basics/reading/grammar'

// AI-generated reading exercises
import { GENERATED_READING_2026_01_21 } from '../../data/basics/reading/generated/batch-2026-01-21'

// Classical language categories
import { LATIN_EXERCISES } from '../../data/basics/latin'
import { GREEK_EXERCISES } from '../../data/basics/greek'
import { logger } from '@/lib/logger'

const ALL_READING_EXERCISES: ReadingExercise[] = [
  ...COMPREHENSION_G1_3,
  ...COMPREHENSION_G4_6,
  ...COMPREHENSION_G7_9,
  ...COMPREHENSION_G10_12,
  ...STEM_READING,
  ...VOCABULARY_EXERCISES,
  ...GRAMMAR_EXERCISES,
  ...GENERATED_READING_2026_01_21,
]

// Classical language exercises
const ALL_LATIN_EXERCISES: TranslationExercise[] = LATIN_EXERCISES
const ALL_GREEK_EXERCISES: TranslationExercise[] = GREEK_EXERCISES

// In-memory usage counters (non-persistent)
const usageCounts: Record<string, number> = Object.create(null)

function withinDifficulty(target: number, itemDifficulty: number): boolean {
  return itemDifficulty >= target - 0.5 && itemDifficulty <= target + 0.5
}

/**
 * @deprecated Use getRandomMathProblemV2 from '@/data/basics/math-v2' instead
 */
export function selectMathProblem(difficulty: number, excludeIds: string[] = []): MathProblem | null {
  // Return a stub that indicates V1 is deprecated
  logger.warn('Deprecated', 'selectMathProblem is deprecated. Use getRandomMathProblemV2 instead.')
  return null
}

/**
 * Get a V2 math problem (new primary method)
 */
export function selectMathProblemV2(difficulty: number, excludeIds: string[] = []): MathProblemV2 | null {
  return getRandomMathProblemV2({
    difficulty,
    excludeIds,
  })
}

export function selectReadingExercise(difficulty: number, excludeIds: string[] = []): ReadingExercise | null {
  const candidates = ALL_READING_EXERCISES
    .filter(e => withinDifficulty(difficulty, e.difficulty))
    .filter(e => !excludeIds.includes(e.id))
    .sort((a, b) => (usageCounts[a.id] || 0) - (usageCounts[b.id] || 0))

  return candidates[0] || null
}

/**
 * Select a translation exercise for Latin or Greek
 */
export function selectTranslationExercise(
  language: ClassicalLanguage,
  difficulty: number,
  excludeIds: string[] = []
): TranslationExercise | null {
  const exercises = language === 'latin' ? ALL_LATIN_EXERCISES : ALL_GREEK_EXERCISES
  
  const candidates = exercises
    .filter(e => withinDifficulty(difficulty, e.difficulty))
    .filter(e => !excludeIds.includes(e.id))
    .sort((a, b) => (usageCounts[a.id] || 0) - (usageCounts[b.id] || 0))

  // If no exact matches, try a wider range
  if (candidates.length === 0) {
    const widerCandidates = exercises
      .filter(e => e.difficulty >= difficulty - 1.5 && e.difficulty <= difficulty + 1.5)
      .filter(e => !excludeIds.includes(e.id))
      .sort((a, b) => (usageCounts[a.id] || 0) - (usageCounts[b.id] || 0))
    
    return widerCandidates[0] || null
  }

  return candidates[0] || null
}

export function incrementLocalUsage(id: string): void {
  usageCounts[id] = (usageCounts[id] || 0) + 1
}

export function getProblemById(
  subject: 'math' | 'reading' | 'latin' | 'greek',
  id: string
): MathProblem | ReadingExercise | TranslationExercise | undefined {
  if (subject === 'math') {
    // For math, return V2 problem
    const allV2 = getAllMathProblemsV2()
    const v2Problem = allV2.find((p: MathProblemV2) => p.id === id)
    if (v2Problem) {
      // Return a minimal V1 shape for compatibility
      const correctAnswer = Array.isArray(v2Problem.answer.correct)
        ? v2Problem.answer.correct[0]
        : String(v2Problem.answer.correct)
      return {
        id: v2Problem.id,
        type: v2Problem.type,
        topic: v2Problem.pedagogy.topic,
        question: v2Problem.question.text,
        correctAnswer,
        difficulty: v2Problem.difficulty,
        timeEstimate: v2Problem.pedagogy.timeEstimate || 60,
      } as MathProblem
    }
    return undefined
  }
  if (subject === 'reading') return ALL_READING_EXERCISES.find(e => e.id === id)
  if (subject === 'latin') return ALL_LATIN_EXERCISES.find(e => e.id === id)
  if (subject === 'greek') return ALL_GREEK_EXERCISES.find(e => e.id === id)
  return undefined
}

export function getTranslationExerciseById(id: string): TranslationExercise | undefined {
  return ALL_LATIN_EXERCISES.find(e => e.id === id) || ALL_GREEK_EXERCISES.find(e => e.id === id)
}

export const LOCAL_PROBLEM_COUNTS = {
  math: getAllMathProblemsV2().length,
  reading: ALL_READING_EXERCISES.length,
  latin: ALL_LATIN_EXERCISES.length,
  greek: ALL_GREEK_EXERCISES.length
}

export function getAllLocalProblems(): { 
  math: MathProblem[]
  reading: ReadingExercise[]
  latin: TranslationExercise[]
  greek: TranslationExercise[]
} {
  // Return V2 problems as V1 shape for backwards compatibility
  const allV2 = getAllMathProblemsV2()
  const mathV1Compat: MathProblem[] = allV2.map((v2: MathProblemV2) => {
    const correctAnswer = Array.isArray(v2.answer.correct)
      ? v2.answer.correct[0]
      : String(v2.answer.correct)
    return {
      id: v2.id,
      type: v2.type,
      topic: v2.pedagogy.topic,
      question: v2.question.text,
      correctAnswer,
      difficulty: v2.difficulty,
      timeEstimate: v2.pedagogy.timeEstimate || 60,
    } as MathProblem
  })
  
  return { 
    math: mathV1Compat, 
    reading: ALL_READING_EXERCISES,
    latin: ALL_LATIN_EXERCISES,
    greek: ALL_GREEK_EXERCISES
  }
}

// V2 exports for direct access
export { getRandomMathProblemV2, getAllMathProblemsV2 }
