/**
 * Novice Level Exercises (Grades 1-2)
 * 
 * Focus:
 * - Greek alphabet recognition
 * - Breathing marks and accents
 * - Basic vocabulary (50-100 words)
 * - Present tense verbs (-ω verbs)
 * - Definite article (ὁ, ἡ, τό)
 * - Nominative and accusative cases
 */

import { TranslationExercise } from '@/lib/types/basics'
import { GREEK_GRADE_1_EXERCISES } from './grade1'
import { GREEK_GRADE_2_EXERCISES } from './grade2'

export const NOVICE_EXERCISES: TranslationExercise[] = [
  ...GREEK_GRADE_1_EXERCISES,
  ...GREEK_GRADE_2_EXERCISES,
]

export { GREEK_GRADE_1_EXERCISES } from './grade1'
export { GREEK_GRADE_2_EXERCISES } from './grade2'

