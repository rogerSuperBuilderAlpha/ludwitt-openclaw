/**
 * Shared types for scoring APIs
 */

// Reading aloud specific request
export interface ReadingAloudScoringRequest {
  userId: string
  exerciseId: string
  passage: string
  transcript: string
  timeSpent: number
  confidenceScores: number[]
}

// Word pronunciation specific request
export interface WordPronunciationScoringRequest {
  word: string
  phonetic: string
  definition: string
  transcript: string
  timeSpent: number
  confidenceScores: number[]
}

// Reading aloud specific result
export interface ReadingAloudScoringResult {
  accuracy: number // 0-100
  speed: number // 0-100
  clarity: number // 0-100
  confidence: number // 0-100
  totalScore: number // 1-5 points
  feedback: string
  details: {
    wordsPerMinute: number
    accuracyPercentage: number
    matchedWords: number
    totalWords: number
    avgConfidence: number
  }
}

// Word pronunciation specific result
export interface WordPronunciationScoringResult {
  score: number // 0-100
  points: number // 1-3 bonus points
  feedback: string
  details: {
    wordAccuracy: number
    definitionAccuracy: number
    clarity: number
    avgConfidence: number
  }
}

