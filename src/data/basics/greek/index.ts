/**
 * Ancient Greek Translation Exercises - Master Index
 * 
 * Grade Level System:
 * Each grade represents increasing mastery of Ancient Greek grammar and vocabulary.
 * Students progress through grades by maintaining high accuracy and completing exercises.
 * 
 * Grade 1-2:  Novice        - Alphabet, basic vocabulary, present tense, articles
 * Grade 3-4:  Beginner      - All noun cases, adjective agreement, contract verbs
 * Grade 5-6:  Intermediate  - All tenses, middle/passive voice, participles
 * Grade 7-8:  Advanced      - Subjunctive/optative moods, indirect discourse, infinitives
 * Grade 9-10: Proficient    - Attic prose (Plato, Xenophon, Lysias)
 * Grade 11-12: Expert       - Poetry (Homer, tragedy, lyric)
 */

import { TranslationExercise } from '@/lib/types/basics'

// Import exercises from new organized structure
import {
  ALL_GREEK_EXERCISES,
  GREEK_GRADE_1_EXERCISES,
  GREEK_GRADE_2_EXERCISES,
  GREEK_GRADE_3_EXERCISES,
  GREEK_GRADE_4_EXERCISES,
  GREEK_GRADE_5_EXERCISES,
  GREEK_GRADE_6_EXERCISES,
  GREEK_GRADE_7_EXERCISES,
  GREEK_GRADE_8_EXERCISES,
  GREEK_GRADE_9_EXERCISES,
  GREEK_GRADE_10_EXERCISES,
  GREEK_GRADE_11_EXERCISES,
  GREEK_GRADE_12_EXERCISES,
} from './exercises'

// Re-export types
export * from './types'

// Re-export vocabulary
export * from './vocabulary'

// Grade level metadata
export interface GradeLevel {
  grade: number
  name: string
  title: string // Greek title
  titleTransliteration: string
  description: string
  skills: string[]
  vocabulary: number
  grammarTopics: string[]
  exampleAuthors?: string[]
  unlockRequirements: {
    previousGradeAccuracy: number
    exercisesCompleted: number
  }
}

export const GREEK_GRADE_LEVELS: GradeLevel[] = [
  {
    grade: 1,
    name: 'Novice I',
    title: 'Μαθητής',
    titleTransliteration: 'Mathētēs',
    description: 'Begin your Greek journey! Learn the alphabet, basic vocabulary, and simple present tense sentences.',
    skills: [
      'Read the Greek alphabet',
      'Recognize breathing marks and accents',
      'Translate simple present tense sentences',
      'Use the definite article (ὁ, ἡ, τό)'
    ],
    vocabulary: 50,
    grammarTopics: ['Alphabet', 'Present Tense', 'Definite Article', 'Nominative Case'],
    unlockRequirements: { previousGradeAccuracy: 0, exercisesCompleted: 0 }
  },
  {
    grade: 2,
    name: 'Novice II',
    title: 'Φοιτητής',
    titleTransliteration: 'Phoitētēs',
    description: 'Expand your vocabulary and learn the accusative case for direct objects.',
    skills: [
      'Use accusative case for direct objects',
      'Recognize 1st and 2nd declension patterns',
      'Translate transitive sentences',
      'Understand noun gender'
    ],
    vocabulary: 100,
    grammarTopics: ['Accusative Case', '1st Declension', '2nd Declension', '-ω Verbs'],
    unlockRequirements: { previousGradeAccuracy: 70, exercisesCompleted: 10 }
  },
  {
    grade: 3,
    name: 'Beginner I',
    title: 'Σπουδαστής',
    titleTransliteration: 'Spoudastēs',
    description: 'Master all five cases and learn the complex 3rd declension.',
    skills: [
      'Use genitive for possession',
      'Use dative for indirect objects',
      'Navigate 3rd declension patterns',
      'Handle prepositions with their cases'
    ],
    vocabulary: 175,
    grammarTopics: ['All Five Cases', '3rd Declension', 'Prepositions'],
    unlockRequirements: { previousGradeAccuracy: 75, exercisesCompleted: 15 }
  },
  {
    grade: 4,
    name: 'Beginner II',
    title: 'Γραμματικός',
    titleTransliteration: 'Grammatikos',
    description: 'Learn adjective agreement, comparatives, and contract verbs.',
    skills: [
      'Match adjectives in case/number/gender',
      'Form comparative and superlative adjectives',
      'Conjugate contract verbs (-εω, -αω, -οω)',
      'Handle compound sentences'
    ],
    vocabulary: 250,
    grammarTopics: ['Adjective Agreement', 'Comparatives', 'Contract Verbs', 'Conjunctions'],
    unlockRequirements: { previousGradeAccuracy: 75, exercisesCompleted: 20 }
  },
  {
    grade: 5,
    name: 'Intermediate I',
    title: 'Ἔμπειρος',
    titleTransliteration: 'Empeiros',
    description: 'Master all tenses including aorist and perfect, plus middle/passive voice.',
    skills: [
      'Recognize aorist (simple past) forms',
      'Translate imperfect (continuous past)',
      'Use perfect tense for completed action',
      'Distinguish middle and passive voice'
    ],
    vocabulary: 350,
    grammarTopics: ['Aorist Tense', 'Imperfect Tense', 'Perfect Tense', 'Middle Voice', 'Passive Voice'],
    unlockRequirements: { previousGradeAccuracy: 80, exercisesCompleted: 25 }
  },
  {
    grade: 6,
    name: 'Intermediate II',
    title: 'Διδακτός',
    titleTransliteration: 'Didaktos',
    description: 'Learn participles and complex subordinate clauses.',
    skills: [
      'Translate present, aorist, and perfect participles',
      'Use genitive absolute constructions',
      'Handle relative clauses',
      'Parse circumstantial participles'
    ],
    vocabulary: 450,
    grammarTopics: ['Participles', 'Genitive Absolute', 'Relative Clauses', 'Circumstantial Participles'],
    unlockRequirements: { previousGradeAccuracy: 80, exercisesCompleted: 30 }
  },
  {
    grade: 7,
    name: 'Advanced I',
    title: 'Παιδευτός',
    titleTransliteration: 'Paideutos',
    description: 'Master the subjunctive and optative moods.',
    skills: [
      'Recognize subjunctive verb forms',
      'Translate purpose clauses (ἵνα, ὅπως)',
      'Handle conditional sentences',
      'Use the optative in wishes and potentials'
    ],
    vocabulary: 550,
    grammarTopics: ['Subjunctive Mood', 'Optative Mood', 'Purpose Clauses', 'Conditionals'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 35 }
  },
  {
    grade: 8,
    name: 'Advanced II',
    title: 'Σοφιστής',
    titleTransliteration: 'Sophistēs',
    description: 'Handle indirect discourse and complex infinitive constructions.',
    skills: [
      'Translate indirect statements with infinitives',
      'Handle indirect statements with ὅτι/ὡς',
      'Manage articular infinitives',
      'Understand aspect in indirect discourse'
    ],
    vocabulary: 650,
    grammarTopics: ['Indirect Discourse', 'Infinitive Constructions', 'Fear Clauses'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 40 }
  },
  {
    grade: 9,
    name: 'Proficient I',
    title: 'Πεπαιδευμένος',
    titleTransliteration: 'Pepaideumenos',
    description: 'Read authentic Attic prose from Xenophon and easier Platonic dialogues.',
    skills: [
      'Navigate extended prose passages',
      'Handle philosophical vocabulary',
      'Understand historical narrative style',
      'Parse complex periodic sentences'
    ],
    vocabulary: 800,
    grammarTopics: ['Extended Prose', 'Historical Present', 'Philosophical Vocabulary'],
    exampleAuthors: ['Xenophon', 'Lysias', 'Early Plato'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 45 }
  },
  {
    grade: 10,
    name: 'Proficient II',
    title: 'Φιλόσοφος',
    titleTransliteration: 'Philosophos',
    description: 'Master Platonic prose and Thucydidean complexity.',
    skills: [
      'Translate complex Platonic arguments',
      'Handle Thucydidean compression',
      'Understand rhetorical strategies',
      'Navigate highly embedded clauses'
    ],
    vocabulary: 1000,
    grammarTopics: ['Platonic Style', 'Historical Prose', 'Rhetorical Devices'],
    exampleAuthors: ['Plato', 'Thucydides', 'Demosthenes'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 50 }
  },
  {
    grade: 11,
    name: 'Expert I',
    title: 'Ποιητής',
    titleTransliteration: 'Poiētēs',
    description: 'Begin reading Greek tragedy and lyric poetry.',
    skills: [
      'Scan iambic trimeter',
      'Handle tragic vocabulary and diction',
      'Understand choral meters',
      'Recognize Doric dialect features'
    ],
    vocabulary: 1200,
    grammarTopics: ['Tragic Meter', 'Poetic Syntax', 'Dialect Forms'],
    exampleAuthors: ['Euripides', 'Sophocles', 'Sappho'],
    unlockRequirements: { previousGradeAccuracy: 90, exercisesCompleted: 55 }
  },
  {
    grade: 12,
    name: 'Expert II',
    title: 'Ῥαψῳδός',
    titleTransliteration: 'Rhapsōdos',
    description: 'Master Homeric Greek and epic poetry.',
    skills: [
      'Scan dactylic hexameter',
      'Handle Homeric dialect',
      'Understand epic formulas',
      'Appreciate Homeric artistry'
    ],
    vocabulary: 1500,
    grammarTopics: ['Epic Dialect', 'Homeric Meter', 'Epic Formulas', 'Literary Analysis'],
    exampleAuthors: ['Homer', 'Hesiod', 'Aeschylus'],
    unlockRequirements: { previousGradeAccuracy: 90, exercisesCompleted: 60 }
  }
]

// Combine all exercises (using new organized structure)
export const GREEK_EXERCISES: TranslationExercise[] = ALL_GREEK_EXERCISES

// Re-export individual grades for backward compatibility
export {
  GREEK_GRADE_1_EXERCISES,
  GREEK_GRADE_2_EXERCISES,
  GREEK_GRADE_3_EXERCISES,
  GREEK_GRADE_4_EXERCISES,
  GREEK_GRADE_5_EXERCISES,
  GREEK_GRADE_6_EXERCISES,
  GREEK_GRADE_7_EXERCISES,
  GREEK_GRADE_8_EXERCISES,
  GREEK_GRADE_9_EXERCISES,
  GREEK_GRADE_10_EXERCISES,
  GREEK_GRADE_11_EXERCISES,
  GREEK_GRADE_12_EXERCISES,
}

// Helper functions
export function getGreekExercisesByGrade(grade: number): TranslationExercise[] {
  const minDiff = grade - 0.5
  const maxDiff = grade + 0.5
  return GREEK_EXERCISES.filter(ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff)
}

export function getRandomGreekExercise(difficulty: number, excludeIds: string[] = []): TranslationExercise | null {
  const range = 0.5
  const candidates = GREEK_EXERCISES.filter(
    ex => Math.abs(ex.difficulty - difficulty) <= range && !excludeIds.includes(ex.id)
  )
  if (candidates.length === 0) {
    const widerCandidates = GREEK_EXERCISES.filter(
      ex => Math.abs(ex.difficulty - difficulty) <= 1.5 && !excludeIds.includes(ex.id)
    )
    if (widerCandidates.length === 0) return null
    return widerCandidates[Math.floor(Math.random() * widerCandidates.length)]
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}

export function getGradeLevelInfo(grade: number): GradeLevel | undefined {
  return GREEK_GRADE_LEVELS.find(g => g.grade === grade)
}

export function canUnlockGrade(grade: number, previousGradeStats: { accuracy: number; completed: number }): boolean {
  const gradeInfo = getGradeLevelInfo(grade)
  if (!gradeInfo) return false
  
  return (
    previousGradeStats.accuracy >= gradeInfo.unlockRequirements.previousGradeAccuracy &&
    previousGradeStats.completed >= gradeInfo.unlockRequirements.exercisesCompleted
  )
}





