/**
 * Novice Level Exercises (Grades 1-2)
 * 
 * Focus:
 * - Basic vocabulary (50-100 words)
 * - Present tense verbs
 * - Simple SVO/SOV sentences
 * - 1st and 2nd conjugation verbs
 * - Nominative and accusative cases
 */

import { TranslationExercise } from '@/lib/types/basics'
import { LATIN_GRADE_1_EXERCISES } from './grade1'
import { LATIN_GRADE_2_EXERCISES } from './grade2'

export const NOVICE_EXERCISES: TranslationExercise[] = [
  ...LATIN_GRADE_1_EXERCISES,
  ...LATIN_GRADE_2_EXERCISES,
]

export { LATIN_GRADE_1_EXERCISES } from './grade1'
export { LATIN_GRADE_2_EXERCISES } from './grade2'

