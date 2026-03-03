/**
 * Latin-specific type definitions
 */

export interface VocabularyEntry {
  id: string
  lemma: string                    // Dictionary form
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' |
                'conjunction' | 'pronoun' | 'interjection' | 'particle'

  // Forms
  forms: {
    nominative?: string            // For nouns/adjectives
    genitive?: string              // For nouns (shows declension)
    gender?: 'masculine' | 'feminine' | 'neuter' | 'common'
    principalParts?: string[]      // For verbs: [1st sg pres, inf, perf, supine]
  }

  // Meanings
  meanings: {
    primary: string                // Most common meaning
    secondary?: string[]           // Other meanings
    inContext?: {                  // Meanings in specific contexts
      context: string
      meaning: string
    }[]
  }

  // Classification
  frequency: 1 | 2 | 3 | 4 | 5     // 1 = most common, 5 = rare
  gradeLevel: number               // Minimum grade level where introduced
  declension?: 1 | 2 | 3 | 4 | 5   // For nouns
  conjugation?: 1 | 2 | 3 | 4 | 'irregular' | 'deponent'  // For verbs

  // Etymology & Derivatives
  etymology?: string               // Word origin
  derivatives: string[]            // English derivatives
  cognates?: string[]              // Related words in other languages

  // Usage
  examples: {
    latin: string
    english: string
    source?: string                // Author/work if from literature
  }[]

  // Semantic fields
  topics: string[]                 // ['military', 'family', etc.]

  // Related words
  synonyms?: string[]              // Other Latin words with similar meaning
  antonyms?: string[]              // Opposite meanings
  relatedWords?: string[]          // Same root, different forms

  // Notes
  notes?: string                   // Special usage notes, irregularities
}

// Proficiency levels for organizing exercises
export type ProficiencyLevel = 'novice' | 'beginner' | 'intermediate' | 'advanced' | 'proficient' | 'expert'

export const PROFICIENCY_LEVEL_GRADES: Record<ProficiencyLevel, number[]> = {
  novice: [1, 2],
  beginner: [3, 4],
  intermediate: [5, 6],
  advanced: [7, 8],
  proficient: [9, 10],
  expert: [11, 12]
}

export const GRADE_TO_PROFICIENCY: Record<number, ProficiencyLevel> = {
  1: 'novice',
  2: 'novice',
  3: 'beginner',
  4: 'beginner',
  5: 'intermediate',
  6: 'intermediate',
  7: 'advanced',
  8: 'advanced',
  9: 'proficient',
  10: 'proficient',
  11: 'expert',
  12: 'expert'
}

