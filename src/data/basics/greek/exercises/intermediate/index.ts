/**
 * Intermediate Level Exercises (Grades 5-6)
 * 
 * Focus:
 * - Aorist tense (simple past)
 * - Imperfect tense (continuous past)
 * - Perfect and pluperfect tenses
 * - Middle and passive voice
 * - Present, aorist, and perfect participles
 * - Genitive absolute constructions
 * - Relative clauses
 */

import { TranslationExercise } from '@/lib/types/basics'
import { GREEK_GRADE_5_EXERCISES } from './grade5'
import { GREEK_GRADE_6_EXERCISES } from './grade6'

export const INTERMEDIATE_EXERCISES: TranslationExercise[] = [
  ...GREEK_GRADE_5_EXERCISES,
  ...GREEK_GRADE_6_EXERCISES,
]

export { GREEK_GRADE_5_EXERCISES } from './grade5'
export { GREEK_GRADE_6_EXERCISES } from './grade6'

