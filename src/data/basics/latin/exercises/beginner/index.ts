/**
 * Beginner Level Exercises (Grades 3-4)
 * 
 * Focus:
 * - All five cases (nominative, genitive, dative, accusative, ablative)
 * - 3rd declension nouns
 * - Adjective agreement
 * - Comparative and superlative adjectives
 * - Prepositions with ablative
 * - 4th conjugation verbs
 * - Conjunctions and compound sentences
 */

import { TranslationExercise } from '@/lib/types/basics'
import { LATIN_GRADE_3_EXERCISES } from './grade3'
import { LATIN_GRADE_4_EXERCISES } from './grade4'

export const BEGINNER_EXERCISES: TranslationExercise[] = [
  ...LATIN_GRADE_3_EXERCISES,
  ...LATIN_GRADE_4_EXERCISES,
]

export { LATIN_GRADE_3_EXERCISES } from './grade3'
export { LATIN_GRADE_4_EXERCISES } from './grade4'

