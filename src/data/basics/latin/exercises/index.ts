/**
 * Latin Exercises - Master Index
 * 
 * Exercises are organized by proficiency level:
 * - novice/     (Grades 1-2): Basic vocabulary, present tense, simple sentences
 * - beginner/   (Grades 3-4): All cases, adjectives, compound sentences
 * - intermediate/ (Grades 5-6): All tenses, passive voice, participles
 * - advanced/   (Grades 7-8): Subjunctive, indirect discourse (TODO)
 * - proficient/ (Grades 9-10): Literary prose - Caesar, Cicero (TODO)
 * - expert/     (Grades 11-12): Poetry - Virgil, Ovid, Horace (TODO)
 */

import { TranslationExercise } from '@/lib/types/basics'

// Import by proficiency level
import { NOVICE_EXERCISES } from './novice'
import { BEGINNER_EXERCISES } from './beginner'
import { INTERMEDIATE_EXERCISES } from './intermediate'
import { LATIN_GRADE_7_EXERCISES, LATIN_GRADE_8_EXERCISES } from './advanced'
import { LATIN_GRADE_9_EXERCISES, LATIN_GRADE_10_EXERCISES } from './proficient'
import { LATIN_GRADE_11_EXERCISES, LATIN_GRADE_12_EXERCISES } from './expert'

// AI-generated exercises
import { GENERATED_LATIN_2026_01_21 } from './generated/batch-2026-01-21'

// Advanced level aggregate
const ADVANCED_EXERCISES: TranslationExercise[] = [
  ...LATIN_GRADE_7_EXERCISES,
  ...LATIN_GRADE_8_EXERCISES,
]

// Proficient level aggregate
const PROFICIENT_EXERCISES: TranslationExercise[] = [
  ...LATIN_GRADE_9_EXERCISES,
  ...LATIN_GRADE_10_EXERCISES,
]

// Expert level aggregate
const EXPERT_EXERCISES: TranslationExercise[] = [
  ...LATIN_GRADE_11_EXERCISES,
  ...LATIN_GRADE_12_EXERCISES,
]

// Combine all exercises
export const ALL_LATIN_EXERCISES: TranslationExercise[] = [
  ...NOVICE_EXERCISES,
  ...BEGINNER_EXERCISES,
  ...INTERMEDIATE_EXERCISES,
  ...ADVANCED_EXERCISES,
  ...PROFICIENT_EXERCISES,
  ...EXPERT_EXERCISES,
  ...GENERATED_LATIN_2026_01_21,
]

// Re-export by level for targeted access
export { NOVICE_EXERCISES } from './novice'
export { BEGINNER_EXERCISES } from './beginner'
export { INTERMEDIATE_EXERCISES } from './intermediate'
export { ADVANCED_EXERCISES }
export { PROFICIENT_EXERCISES }
export { EXPERT_EXERCISES }

// Export by grade for backward compatibility
export { LATIN_GRADE_1_EXERCISES } from './novice/grade1'
export { LATIN_GRADE_2_EXERCISES } from './novice/grade2'
export { LATIN_GRADE_3_EXERCISES } from './beginner/grade3'
export { LATIN_GRADE_4_EXERCISES } from './beginner/grade4'
export { LATIN_GRADE_5_EXERCISES } from './intermediate/grade5'
export { LATIN_GRADE_6_EXERCISES } from './intermediate/grade6'
export { LATIN_GRADE_7_EXERCISES } from './advanced/grade7'
export { LATIN_GRADE_8_EXERCISES } from './advanced/grade8'
export { LATIN_GRADE_9_EXERCISES } from './proficient/grade9'
export { LATIN_GRADE_10_EXERCISES } from './proficient/grade10'
export { LATIN_GRADE_11_EXERCISES } from './expert/grade11'
export { LATIN_GRADE_12_EXERCISES } from './expert/grade12'

