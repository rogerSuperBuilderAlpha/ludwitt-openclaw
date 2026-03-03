/**
 * Classical Language Translation Type Definitions (Latin & Greek)
 */

import { Timestamp } from 'firebase-admin/firestore'
import { Attempt, SubjectProgress } from './progress'

// ============================================================================
// Classical Language Types
// ============================================================================

export type ClassicalLanguage = 'latin' | 'greek'

/**
 * A single word in a translation exercise
 * Each word is clickable (costs 2 XP to look up)
 */
export interface TranslationWord {
  word: string                    // The word as it appears in the sentence
  romanization?: string           // For Greek: transliteration
  lemma?: string                  // Dictionary form (e.g., "puella" not "puellam")
  partOfSpeech: string            // noun, verb, adjective, etc.
  meaning: string                 // English meaning
  grammaticalInfo?: string        // e.g., "acc. sg. fem." or "3rd sg. pres. act. ind."
  functionInSentence?: string     // subject, direct object, verb, etc.
  principalParts?: string         // For verbs: amo, amare, amavi, amatum
  derivatives?: string[]          // English derivatives (e.g., ["amorous", "amateur"])
  relatedWords?: { word: string; meaning: string }[]
  pronunciation?: string          // IPA or audio URL
}

/**
 * Parsing element for bonus XP
 * User identifies grammatical function of each word
 */
export interface ParsingElement {
  word: string
  expectedParsing: {
    partOfSpeech: string          // noun, verb, adjective, etc.
    grammaticalFunction: string   // subject, direct object, etc.
    morphology: string            // full parsing (case, number, gender, tense, mood, voice)
  }
  options: string[]               // Dropdown options for user to select
}

/**
 * A translation exercise (Latin or Greek sentence)
 */
export interface TranslationExercise {
  id: string
  language: ClassicalLanguage
  difficulty: number              // 1.0 to 12.0
  sourceText: string              // The Latin/Greek sentence
  romanization?: string           // For Greek: full transliteration
  words: TranslationWord[]        // Each word with lookup data
  grammarTopic: string            // e.g., "Noun Cases", "Present Tense"
  grammarSubtopic?: string        // e.g., "Nominative & Accusative"
  acceptableTranslations: string[] // Valid English translations (not sent to client)
  parsingElements: ParsingElement[] // For parsing bonus
  timeEstimate: number            // seconds

  // Optional enrichment
  sourceAuthor?: string           // e.g., "Caesar", "Plato"
  sourceWork?: string             // e.g., "De Bello Gallico", "Republic"
  historicalContext?: string      // Brief context for AI to expand on
}

/**
 * Result of AI translation scoring
 */
export interface TranslationFeedback {
  overallScore: number            // 0-100
  qualityTier: 'perfect' | 'excellent' | 'good' | 'partial' | 'attempted'
  xpEarned: number                // Base XP from translation quality
  xpSpentOnLookups: number        // Total XP spent looking up words
  netXp: number                   // xpEarned - xpSpentOnLookups
  categoryScores: {
    meaning: number               // 0-25: Core meaning preserved?
    grammar: number               // 0-25: Grammar correctly interpreted?
    vocabulary: number            // 0-25: Word choices appropriate?
    english: number               // 0-25: Natural English phrasing?
  }
  acceptableTranslations: string[]
  feedback: string
  improvements: string[]
  parsingBonus?: {
    eligible: boolean
    score: number                 // 0-100
    multiplier: number            // 1.0-1.5
    bonusXp: number
    feedback: string
  }
  historicalContextBonus?: {
    used: boolean
    xpEarned: number
    creditUsed: number
  }
}

/**
 * Track word lookups per exercise
 * Stored locally and sent with translation check
 */
export interface WordLookupSession {
  exerciseId: string
  wordsLookedUp: string[]         // Words the user looked up
  xpSpent: number                 // 2 XP per word
}

/**
 * Historical context response from AI
 * Costs 1 credit, earns 5-15 XP
 */
export interface HistoricalContextResponse {
  exerciseId: string
  language: ClassicalLanguage
  sourceText: string
  sections: {
    emoji: string                 // e.g., "🌹", "🏛️", "📚"
    title: string                 // e.g., "THE ROSE IN ROMAN CULTURE"
    content: string               // Educational content
  }[]
  creditUsed: number              // Always 1
  xpEarned: number                // 5-15 based on content depth
  depthLevel: 'basic' | 'good' | 'rich'
  generatedAt?: Timestamp
  /** Debug info for troubleshooting AI issues (only in dev/fallback responses) */
  _debug?: {
    reason: string
    error?: string
    hasAnthropicClient: boolean
    hasUserId?: boolean
    hasApiKey: boolean
    apiKeyPrefix?: string
  }
}

/**
 * Progress tracking for classical languages
 */
export interface ClassicalLanguageProgress extends SubjectProgress {
  language: ClassicalLanguage
  vocabularyMastered: number      // Words saved to vocabulary list
  wordsLookedUp: number           // Total words looked up
  xpSpentOnLookups: number        // Total XP spent on word lookups
  grammarTopicsUnlocked: string[] // Grammar reference topics unlocked
  averageTranslationScore: number // Average score (0-100)
  sentencesTranslated: number     // Total sentences completed
  currentLevel: number            // 1-12
  historicalContextsExplored: number // Times AI context was used
  xpEarnedFromHistoricalContext: number
}

/**
 * Translation attempt for history tracking
 */
export interface TranslationAttempt extends Attempt {
  language: ClassicalLanguage
  translationScore: number        // 0-100
  wordsLookedUp: number
  xpSpentOnLookups: number
  usedHistoricalContext: boolean
  parsingBonusEarned: number
}

/**
 * Saved vocabulary word
 */
export interface SavedVocabularyWord {
  word: string
  romanization?: string
  language: ClassicalLanguage
  lemma: string
  meaning: string
  partOfSpeech: string
  derivatives?: string[]
  contextSentence: string         // The sentence where it was learned
  savedAt: Timestamp
  reviewCount: number             // For spaced repetition
  lastReviewed?: Timestamp
}

/**
 * Grammar reference for classical languages
 */
export interface ClassicalGrammarReference {
  id: string
  language: ClassicalLanguage
  topic: string                   // e.g., "Noun Cases", "Verb Conjugations"
  subtopic?: string               // e.g., "Nominative Case"
  xpCost: number                  // Cost to unlock (default: 5)
  content: string                 // Markdown content
  examples: {
    source: string                // Latin/Greek example
    translation: string           // English translation
    explanation: string           // Grammar explanation
  }[]
  relatedTopics?: string[]
}




