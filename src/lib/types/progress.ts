/**
 * Progress Tracking Type Definitions
 */

import { Timestamp } from 'firebase-admin/firestore'
import { MathProblemType } from './math'
import { ReadingExerciseType } from './reading'

// ============================================================================
// Attempt Tracking Types
// ============================================================================

export interface Attempt {
  problemId: string
  difficulty: number
  type: string
  correct: boolean
  timeSpent: number // seconds
  timestamp: Timestamp
  xpEarned: number
}

export interface MathAttempt extends Attempt {
  type: MathProblemType
}

export interface ReadingAttempt extends Attempt {
  type: ReadingExerciseType
}

// ============================================================================
// Subject Progress Types
// ============================================================================

export interface SubjectProgress {
  currentDifficulty: number // 1.0 to 12.0
  totalCompleted: number
  totalCorrect: number
  accuracyRate: number // 0.0 to 1.0
  currentStreak: number
  longestStreak: number
  totalXP: number
  recentAttempts: Attempt[] // Last 10
  lastActivity: Timestamp
  problemsSeen?: string[] // To avoid repeats
  exercisesSeen?: string[] // To avoid repeats
}

export interface UserBasicsProgress {
  userId: string

  math: SubjectProgress & {
    recentAttempts: MathAttempt[]
    problemsSeen: string[]
  }

  reading: SubjectProgress & {
    recentAttempts: ReadingAttempt[]
    exercisesSeen: string[]
  }

  dailyStreak: number
  lastActiveDate: string // YYYY-MM-DD format
  totalXP: number // Combined math + reading

  // Daily XP tracking
  dailyXP: number // XP earned today
  dailyGoal: number // Daily XP goal (default: 50)
  
  // XP history for time-range calculations (date -> XP earned that day)
  // Format: { "2024-01-15": 150, "2024-01-16": 200, ... }
  xpHistory?: Record<string, number>

  // Per-subject daily XP history for bonus calculations (e.g., logic/writing 3x weekly multiplier)
  // Format: { "logic": { "2026-02-24": 150 }, "writing": { "2026-02-24": 80 } }
  xpHistoryBySubject?: Record<string, Record<string, number>>

  // Writing XP (accumulated from writing competition submissions)
  writingXP?: number

  createdAt: Timestamp
  updatedAt: Timestamp
}

// ============================================================================
// Frontend Display Types
// ============================================================================

export interface SubjectProgressDisplay {
  currentDifficulty: number
  currentLevel: string // "Grade 5"
  totalCompleted: number
  totalCorrect?: number
  accuracyRate: number
  currentStreak: number
  longestStreak: number
  totalXP: number
  progressToNextLevel: number // 0-100
}

// ============================================================================
// Achievement Types
// ============================================================================

export interface Achievement {
  id: string
  name: string
  description: string
  icon?: string
  earnedAt: Timestamp
}

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationResult {
  correct: boolean
  feedback: string
  explanation: string
}

export interface ReadingValidationResult extends ValidationResult {
  questionResults?: {
    questionId: string
    correct: boolean
    feedback: string
  }[]
}



