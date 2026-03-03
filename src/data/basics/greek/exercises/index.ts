/**
 * Greek Exercises - Master Index
 * 
 * Exercises are organized by proficiency level:
 * - novice/     (Grades 1-2): Alphabet, basic vocabulary, present tense, articles
 * - beginner/   (Grades 3-4): All cases, contract verbs, adjectives
 * - intermediate/ (Grades 5-6): All tenses, middle/passive voice, participles
 * - advanced/   (Grades 7-8): Subjunctive/optative, indirect discourse
 * - proficient/ (Grades 9-10): Attic prose - Plato, Xenophon, Lysias
 * - expert/     (Grades 11-12): Poetry - Homer, tragedy, lyric + NT Koine
 * 
 * Additional specialized modules:
 * - grammar/verb-system.ts: Advanced verb forms (aorist, middle, perfect, etc.)
 * - translation/attic-prose.ts: Literary prose from Xenophon, Plato, Lysias, NT
 */

import { TranslationExercise } from '@/lib/types/basics'

// Import by proficiency level
import { NOVICE_EXERCISES } from './novice'
import { BEGINNER_EXERCISES } from './beginner'
import { INTERMEDIATE_EXERCISES } from './intermediate'
import { GREEK_GRADE_7_EXERCISES, GREEK_GRADE_8_EXERCISES } from './advanced'
import { GREEK_GRADE_9_EXERCISES, GREEK_GRADE_10_EXERCISES } from './proficient'
import { GREEK_GRADE_11_EXERCISES, GREEK_GRADE_12_EXERCISES } from './expert'

// Import new specialized content
import { ATTIC_PROSE_GREEK } from '../translation/attic-prose'

// AI-generated exercises
import { GENERATED_GREEK_2026_01_21 } from './generated/batch-2026-01-21'

// Advanced level aggregate
const ADVANCED_EXERCISES: TranslationExercise[] = [
  ...GREEK_GRADE_7_EXERCISES,
  ...GREEK_GRADE_8_EXERCISES,
]

// Proficient level aggregate
const PROFICIENT_EXERCISES: TranslationExercise[] = [
  ...GREEK_GRADE_9_EXERCISES,
  ...GREEK_GRADE_10_EXERCISES,
]

// Expert level aggregate
const EXPERT_EXERCISES: TranslationExercise[] = [
  ...GREEK_GRADE_11_EXERCISES,
  ...GREEK_GRADE_12_EXERCISES,
]

// Combine all exercises (including new Attic prose content)
export const ALL_GREEK_EXERCISES: TranslationExercise[] = [
  ...NOVICE_EXERCISES,
  ...BEGINNER_EXERCISES,
  ...INTERMEDIATE_EXERCISES,
  ...ADVANCED_EXERCISES,
  ...PROFICIENT_EXERCISES,
  ...EXPERT_EXERCISES,
  ...ATTIC_PROSE_GREEK,
  ...GENERATED_GREEK_2026_01_21,
]

// Re-export by level for targeted access
export { NOVICE_EXERCISES } from './novice'
export { BEGINNER_EXERCISES } from './beginner'
export { INTERMEDIATE_EXERCISES } from './intermediate'
export { ADVANCED_EXERCISES }
export { PROFICIENT_EXERCISES }
export { EXPERT_EXERCISES }

// Export by grade for backward compatibility
export { GREEK_GRADE_1_EXERCISES } from './novice/grade1'
export { GREEK_GRADE_2_EXERCISES } from './novice/grade2'
export { GREEK_GRADE_3_EXERCISES } from './beginner/grade3'
export { GREEK_GRADE_4_EXERCISES } from './beginner/grade4'
export { GREEK_GRADE_5_EXERCISES } from './intermediate/grade5'
export { GREEK_GRADE_6_EXERCISES } from './intermediate/grade6'
export { GREEK_GRADE_7_EXERCISES } from './advanced/grade7'
export { GREEK_GRADE_8_EXERCISES } from './advanced/grade8'
export { GREEK_GRADE_9_EXERCISES } from './proficient/grade9'
export { GREEK_GRADE_10_EXERCISES } from './proficient/grade10'
export { GREEK_GRADE_11_EXERCISES } from './expert/grade11'
export { GREEK_GRADE_12_EXERCISES } from './expert/grade12'

// Export new specialized content modules
export { ATTIC_PROSE_GREEK } from '../translation/attic-prose'
export { VERB_SYSTEM_GREEK } from '../grammar/verb-system'