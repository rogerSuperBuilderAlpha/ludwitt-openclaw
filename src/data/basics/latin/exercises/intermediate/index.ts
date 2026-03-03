/**
 * Intermediate Level Exercises (Grades 5-6)
 * 
 * Focus:
 * - Imperfect and future tenses
 * - Perfect, pluperfect, and future perfect
 * - Passive voice (present and perfect systems)
 * - Ablative of agent
 * - Present, perfect, and future participles
 * - Ablative absolute constructions
 * - Relative clauses (qui, quae, quod)
 * - Nested/complex clauses
 */

import { TranslationExercise } from '@/lib/types/basics'
import { LATIN_GRADE_5_EXERCISES } from './grade5'
import { LATIN_GRADE_6_EXERCISES } from './grade6'

export const INTERMEDIATE_EXERCISES: TranslationExercise[] = [
  ...LATIN_GRADE_5_EXERCISES,
  ...LATIN_GRADE_6_EXERCISES,
]

export { LATIN_GRADE_5_EXERCISES } from './grade5'
export { LATIN_GRADE_6_EXERCISES } from './grade6'

