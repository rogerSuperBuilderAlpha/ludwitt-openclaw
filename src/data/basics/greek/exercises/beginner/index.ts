/**
 * Beginner Level Exercises (Grades 3-4)
 * 
 * Focus:
 * - All five cases (nominative, genitive, dative, accusative, vocative)
 * - 3rd declension nouns
 * - Adjective agreement
 * - Contract verbs (-εω, -αω, -οω)
 * - Comparative and superlative adjectives
 * - Prepositions with various cases
 */

import { TranslationExercise } from '@/lib/types/basics'
import { GREEK_GRADE_3_EXERCISES } from './grade3'
import { GREEK_GRADE_4_EXERCISES } from './grade4'

export const BEGINNER_EXERCISES: TranslationExercise[] = [
  ...GREEK_GRADE_3_EXERCISES,
  ...GREEK_GRADE_4_EXERCISES,
]

export { GREEK_GRADE_3_EXERCISES } from './grade3'
export { GREEK_GRADE_4_EXERCISES } from './grade4'

