/**
 * Reading Exercise Type Definitions
 */

import { Timestamp } from 'firebase-admin/firestore'

// ============================================================================
// Reading Exercise Types
// ============================================================================

export type ReadingExerciseType =
  | 'comprehension'
  | 'vocabulary'
  | 'grammar'
  | 'critical-analysis'

export type ReadingQuestionType =
  | 'multiple-choice'
  | 'short-answer'
  | 'true-false'

export interface ReadingQuestion {
  id: string
  question: string
  type: ReadingQuestionType
  options?: string[] // For multiple choice
  correctAnswer?: string | string[] // Not sent to client
  explanation?: string // Not sent to client
  skill: string // e.g., "main-idea", "inference", "vocabulary"
}

export interface ReadingExercise {
  id: string
  type: ReadingExerciseType
  difficulty: number // 1.0 to 12.0 (grade level)
  passage?: string
  lexileScore?: number
  questions: ReadingQuestion[]
  timeEstimate: number // seconds

  // Optional enhancement properties for advanced features
  skillIds?: string[]              // Maps to skill tree nodes
  tags?: string[]                  // Thematic/genre tags
  genre?: 'fiction' | 'non-fiction' | 'informational' | 'poetry' | 'literature'
  contentArea?: 'science' | 'history' | 'literature' | 'general'
  thematicElements?: string[]      // Themes covered in passage
  vocabularyLevel?: 'basic' | 'intermediate' | 'advanced'
  comprehensionSkills?: string[]   // Skills tested (main-idea, inference, etc.)
}

export interface ReadingExerciseCache extends ReadingExercise {
  // Analytics fields
  usageCount: number
  totalAttempts: number
  correctAttempts: number
  averageTimeSpent: number

  generatedBy: 'ai' | 'manual'
  createdAt: Timestamp
  lastUsed: Timestamp
}

// ============================================================================
// Reading Generation Types
// ============================================================================

export interface GeneratedReadingExercise {
  passage: string
  lexileScore?: number
  questions: {
    question: string
    type: ReadingQuestionType
    options?: string[]
    correctAnswer: string | string[]
    explanation: string
    skill: string
  }[]
}

// ============================================================================
// Reading Aloud Bonus Types
// ============================================================================

export interface ReadingAloudScoringResult {
  accuracy: number // 0-100
  speed: number // 0-100 (based on optimal reading speed)
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

export interface ReadingAloudAttempt {
  userId: string
  exerciseId: string
  timestamp: Timestamp
  timeSpent: number
  transcript: string
  scoringResult: ReadingAloudScoringResult
  bonusPoints: number
}




