/**
 * Latin Translation Exercises - Master Index
 * 
 * Grade Level System:
 * Each grade represents increasing mastery of Latin grammar and vocabulary.
 * Students progress through grades by maintaining high accuracy and completing exercises.
 * 
 * Grade 1-2:  Novice        - Basic vocabulary, present tense, simple SVO sentences
 * Grade 3-4:  Beginner      - All noun cases, adjective agreement, compound sentences
 * Grade 5-6:  Intermediate  - All tenses, passive voice, participles, relative clauses
 * Grade 7-8:  Advanced      - Subjunctive mood, indirect discourse, complex syntax
 * Grade 9-10: Proficient    - Literary prose (Caesar, Cicero, Livy)
 * Grade 11-12: Expert       - Poetry (Virgil, Ovid, Horace, Catullus)
 */

import { TranslationExercise } from '@/lib/types/basics'

// Import exercises from new organized structure
import {
  ALL_LATIN_EXERCISES,
  LATIN_GRADE_1_EXERCISES,
  LATIN_GRADE_2_EXERCISES,
  LATIN_GRADE_3_EXERCISES,
  LATIN_GRADE_4_EXERCISES,
  LATIN_GRADE_5_EXERCISES,
  LATIN_GRADE_6_EXERCISES,
  LATIN_GRADE_7_EXERCISES,
  LATIN_GRADE_8_EXERCISES,
  LATIN_GRADE_9_EXERCISES,
  LATIN_GRADE_10_EXERCISES,
  LATIN_GRADE_11_EXERCISES,
  LATIN_GRADE_12_EXERCISES,
} from './exercises'

// Re-export types
export * from './types'

// Re-export vocabulary
export * from './vocabulary'

// Re-export grammar exercises (conjugations, declensions)
export * from './grammar'

// Re-export extended translation exercises
export * from './translation'

// Grade level metadata
export interface GradeLevel {
  grade: number
  name: string
  title: string
  description: string
  skills: string[]
  vocabulary: number // Approximate words to know
  grammarTopics: string[]
  exampleAuthors?: string[]
  unlockRequirements: {
    previousGradeAccuracy: number // % accuracy needed in previous grade
    exercisesCompleted: number // Exercises to complete in previous grade
  }
}

export const LATIN_GRADE_LEVELS: GradeLevel[] = [
  {
    grade: 1,
    name: 'Novice I',
    title: 'Prima Lingua',
    description: 'Your first steps into Latin! Learn basic vocabulary and simple present tense sentences.',
    skills: [
      'Recognize Latin word order (SOV)',
      'Identify subjects and verbs',
      'Translate simple present tense sentences',
      'Learn 1st conjugation verbs (-are)'
    ],
    vocabulary: 50,
    grammarTopics: ['Present Tense', '1st Conjugation', 'Nominative Case'],
    unlockRequirements: { previousGradeAccuracy: 0, exercisesCompleted: 0 }
  },
  {
    grade: 2,
    name: 'Novice II',
    title: 'Discipulus',
    description: 'Build your vocabulary and learn about direct objects with the accusative case.',
    skills: [
      'Use accusative case for direct objects',
      'Translate transitive verbs',
      'Learn 2nd conjugation verbs (-ēre)',
      'Understand noun gender'
    ],
    vocabulary: 100,
    grammarTopics: ['Accusative Case', '2nd Conjugation', '1st & 2nd Declension Nouns'],
    unlockRequirements: { previousGradeAccuracy: 70, exercisesCompleted: 10 }
  },
  {
    grade: 3,
    name: 'Beginner I',
    title: 'Studiosus',
    description: 'Master all five noun cases and learn to express complex relationships.',
    skills: [
      'Use genitive for possession',
      'Use dative for indirect objects',
      'Use ablative with prepositions',
      'Learn 3rd conjugation verbs'
    ],
    vocabulary: 175,
    grammarTopics: ['All Five Cases', '3rd Declension', 'Prepositions'],
    unlockRequirements: { previousGradeAccuracy: 75, exercisesCompleted: 15 }
  },
  {
    grade: 4,
    name: 'Beginner II',
    title: 'Grammaticus',
    description: 'Learn adjective agreement, comparison, and compound sentences.',
    skills: [
      'Match adjectives with nouns in case/number/gender',
      'Form comparative and superlative adjectives',
      'Connect clauses with conjunctions',
      'Learn 4th conjugation verbs'
    ],
    vocabulary: 250,
    grammarTopics: ['Adjective Agreement', 'Comparatives', 'Conjunctions', '4th Conjugation'],
    unlockRequirements: { previousGradeAccuracy: 75, exercisesCompleted: 20 }
  },
  {
    grade: 5,
    name: 'Intermediate I',
    title: 'Peritus',
    description: 'Master all tenses and learn the passive voice.',
    skills: [
      'Translate imperfect and future tenses',
      'Translate perfect, pluperfect, and future perfect',
      'Recognize and translate passive voice',
      'Use ablative of agent'
    ],
    vocabulary: 350,
    grammarTopics: ['All Tenses', 'Passive Voice', 'Ablative of Agent', 'Time Expressions'],
    unlockRequirements: { previousGradeAccuracy: 80, exercisesCompleted: 25 }
  },
  {
    grade: 6,
    name: 'Intermediate II',
    title: 'Doctus',
    description: 'Learn participles and relative clauses for complex sentences.',
    skills: [
      'Translate present, perfect, and future participles',
      'Use ablative absolute constructions',
      'Translate relative clauses with qui, quae, quod',
      'Handle nested clauses'
    ],
    vocabulary: 450,
    grammarTopics: ['Participles', 'Ablative Absolute', 'Relative Clauses'],
    unlockRequirements: { previousGradeAccuracy: 80, exercisesCompleted: 30 }
  },
  {
    grade: 7,
    name: 'Advanced I',
    title: 'Eruditus',
    description: 'Master the subjunctive mood and its many uses.',
    skills: [
      'Recognize subjunctive verb forms',
      'Translate purpose clauses (ut/ne)',
      'Translate result clauses',
      'Translate indirect questions'
    ],
    vocabulary: 550,
    grammarTopics: ['Subjunctive Mood', 'Purpose Clauses', 'Result Clauses', 'Indirect Questions'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 35 }
  },
  {
    grade: 8,
    name: 'Advanced II',
    title: 'Sapiens',
    description: 'Handle indirect discourse and complex conditional sentences.',
    skills: [
      'Translate indirect statements (accusative + infinitive)',
      'Handle all types of conditional sentences',
      'Translate fear clauses',
      'Understand sequence of tenses'
    ],
    vocabulary: 650,
    grammarTopics: ['Indirect Discourse', 'Conditionals', 'Fear Clauses', 'Sequence of Tenses'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 40 }
  },
  {
    grade: 9,
    name: 'Proficient I',
    title: 'Litteratus',
    description: 'Read authentic prose from Caesar and other historians.',
    skills: [
      'Translate extended prose passages',
      'Handle military and political vocabulary',
      'Understand rhetorical devices',
      'Parse complex periodic sentences'
    ],
    vocabulary: 800,
    grammarTopics: ['Extended Prose', 'Historical Present', 'Rhetorical Devices'],
    exampleAuthors: ['Caesar', 'Nepos', 'Eutropius'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 45 }
  },
  {
    grade: 10,
    name: 'Proficient II',
    title: 'Orator',
    description: 'Master Ciceronian prose and philosophical texts.',
    skills: [
      'Translate Ciceronian periods',
      'Handle philosophical vocabulary',
      'Understand forensic rhetoric',
      'Parse highly embedded clauses'
    ],
    vocabulary: 1000,
    grammarTopics: ['Periodic Style', 'Philosophical Vocabulary', 'Oratorical Prose'],
    exampleAuthors: ['Cicero', 'Seneca', 'Livy'],
    unlockRequirements: { previousGradeAccuracy: 85, exercisesCompleted: 50 }
  },
  {
    grade: 11,
    name: 'Expert I',
    title: 'Poeta',
    description: 'Begin reading Latin poetry with Ovid and elegiac verse.',
    skills: [
      'Scan dactylic hexameter and elegiac couplets',
      'Handle poetic word order',
      'Understand mythological references',
      'Recognize poetic vocabulary'
    ],
    vocabulary: 1200,
    grammarTopics: ['Meter', 'Poetic Syntax', 'Mythology'],
    exampleAuthors: ['Ovid', 'Catullus', 'Tibullus'],
    unlockRequirements: { previousGradeAccuracy: 90, exercisesCompleted: 55 }
  },
  {
    grade: 12,
    name: 'Expert II',
    title: 'Magister',
    description: 'Master Virgil\'s Aeneid and the heights of Latin literature.',
    skills: [
      'Translate Virgilian hexameter',
      'Understand epic conventions',
      'Recognize intertextual references',
      'Appreciate literary artistry'
    ],
    vocabulary: 1500,
    grammarTopics: ['Epic Poetry', 'Advanced Meter', 'Literary Analysis'],
    exampleAuthors: ['Virgil', 'Horace', 'Lucretius'],
    unlockRequirements: { previousGradeAccuracy: 90, exercisesCompleted: 60 }
  }
]

// Combine all exercises (using new organized structure)
export const LATIN_EXERCISES: TranslationExercise[] = ALL_LATIN_EXERCISES

// Re-export individual grades for backward compatibility
export {
  LATIN_GRADE_1_EXERCISES,
  LATIN_GRADE_2_EXERCISES,
  LATIN_GRADE_3_EXERCISES,
  LATIN_GRADE_4_EXERCISES,
  LATIN_GRADE_5_EXERCISES,
  LATIN_GRADE_6_EXERCISES,
  LATIN_GRADE_7_EXERCISES,
  LATIN_GRADE_8_EXERCISES,
  LATIN_GRADE_9_EXERCISES,
  LATIN_GRADE_10_EXERCISES,
  LATIN_GRADE_11_EXERCISES,
  LATIN_GRADE_12_EXERCISES,
}

// Helper functions
export function getLatinExercisesByGrade(grade: number): TranslationExercise[] {
  const minDiff = grade - 0.5
  const maxDiff = grade + 0.5
  return LATIN_EXERCISES.filter(ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff)
}

export function getRandomLatinExercise(difficulty: number, excludeIds: string[] = []): TranslationExercise | null {
  const range = 0.5
  const candidates = LATIN_EXERCISES.filter(
    ex => Math.abs(ex.difficulty - difficulty) <= range && !excludeIds.includes(ex.id)
  )
  if (candidates.length === 0) {
    // Try wider range
    const widerCandidates = LATIN_EXERCISES.filter(
      ex => Math.abs(ex.difficulty - difficulty) <= 1.5 && !excludeIds.includes(ex.id)
    )
    if (widerCandidates.length === 0) return null
    return widerCandidates[Math.floor(Math.random() * widerCandidates.length)]
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}

export function getGradeLevelInfo(grade: number): GradeLevel | undefined {
  return LATIN_GRADE_LEVELS.find(g => g.grade === grade)
}

export function canUnlockGrade(grade: number, previousGradeStats: { accuracy: number; completed: number }): boolean {
  const gradeInfo = getGradeLevelInfo(grade)
  if (!gradeInfo) return false
  
  return (
    previousGradeStats.accuracy >= gradeInfo.unlockRequirements.previousGradeAccuracy &&
    previousGradeStats.completed >= gradeInfo.unlockRequirements.exercisesCompleted
  )
}

