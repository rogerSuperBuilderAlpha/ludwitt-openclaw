/**
 * Greek Vocabulary - Master Index
 * 
 * Vocabulary is organized in three ways:
 * 1. by-frequency/  - Core vocabulary by frequency (top 100, 250, 500, 1000, 1500)
 * 2. by-part-of-speech/ - Organized by grammar category (nouns, verbs, etc.)
 * 3. by-topic/ - Semantic categories (military, family, etc.)
 * 
 * Target: 1,500 unique vocabulary entries
 */

import { GreekVocabularyEntry } from '../types'

// Import frequency-based vocabulary
import { TOP_100_VOCABULARY } from './by-frequency/top-100'

// Future imports as content is added:
// import { TOP_250_VOCABULARY } from './by-frequency/top-250'
// import { TOP_500_VOCABULARY } from './by-frequency/top-500'
// import { TOP_1000_VOCABULARY } from './by-frequency/top-1000'
// import { TOP_1500_VOCABULARY } from './by-frequency/top-1500'

// Combine all vocabulary
export const ALL_GREEK_VOCABULARY: GreekVocabularyEntry[] = [
  ...TOP_100_VOCABULARY,
  // ...TOP_250_VOCABULARY,
  // ...TOP_500_VOCABULARY,
  // ...TOP_1000_VOCABULARY,
  // ...TOP_1500_VOCABULARY,
]

// Export by frequency tier
export { TOP_100_VOCABULARY } from './by-frequency/top-100'

// Export vocabulary exercises (distinct from vocabulary entries)
export { GREEK_CORE_VOCAB_EXPANDED } from './core-expanded'
export type { GreekVocabularyExercise } from './core-expanded'

// Helper functions
export function getVocabularyByGrade(maxGrade: number): GreekVocabularyEntry[] {
  return ALL_GREEK_VOCABULARY.filter(v => v.gradeLevel <= maxGrade)
}

export function getVocabularyByFrequency(maxFrequency: 1 | 2 | 3 | 4 | 5): GreekVocabularyEntry[] {
  return ALL_GREEK_VOCABULARY.filter(v => v.frequency <= maxFrequency)
}

export function getVocabularyByTopic(topic: string): GreekVocabularyEntry[] {
  return ALL_GREEK_VOCABULARY.filter(v => v.topics.includes(topic))
}

export function getVocabularyByPartOfSpeech(pos: GreekVocabularyEntry['partOfSpeech']): GreekVocabularyEntry[] {
  return ALL_GREEK_VOCABULARY.filter(v => v.partOfSpeech === pos)
}

export function lookupWord(lemma: string): GreekVocabularyEntry | undefined {
  return ALL_GREEK_VOCABULARY.find(v => v.lemma === lemma)
}

