/**
 * API Request/Response Type Definitions
 */

import { MathProblem } from './math'
import { ReadingExercise } from './reading'
import { SubjectProgressDisplay, Achievement } from './progress'

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface GetCurrentProblemsResponse {
  success: boolean
  data?: {
    mathProblem: MathProblem
    readingExercise: ReadingExercise
    mathProgress: SubjectProgressDisplay
    readingProgress: SubjectProgressDisplay
    dailyXP: number
    dailyGoal: number
  }
  error?: string
}

export interface CheckAnswerRequest {
  userId: string
  subject: 'math' | 'reading'
  problemId: string
  userAnswer: string | Record<string, string>
  timeSpent: number
}

export interface CheckAnswerResponse {
  success: boolean
  data?: {
    correct: boolean
    feedback: string
    explanation: string
    xpEarned: number
    currentStreak: number
    nextProblem: MathProblem | ReadingExercise
    progressUpdate: SubjectProgressDisplay
  }
  error?: string
}

export interface GenerateProblemRequest {
  subject: 'math' | 'reading'
  difficulty: number
  type?: string
  excludeIds?: string[]
}

export interface GenerateProblemResponse {
  success: boolean
  data?: MathProblem | ReadingExercise
  error?: string
}

export interface SkipProblemRequest {
  userId: string
  subject: 'math' | 'reading'
  problemId: string
}

export interface SkipProblemResponse {
  success: boolean
  data?: {
    nextProblem: MathProblem | ReadingExercise
    progressUpdate: SubjectProgressDisplay
  }
  error?: string
}

export interface GetProgressResponse {
  success: boolean
  data?: {
    math: SubjectProgressDisplay & {
      recentAccuracy: number
      averageTimePerProblem: number
      topicsStrength: Record<string, number>
    }
    reading: SubjectProgressDisplay & {
      recentAccuracy: number
      averageTimePerProblem: number
      skillsStrength: Record<string, number>
    }
    overall: {
      totalXP: number
      dailyStreak: number
      joinedDate: string
      daysActive: number
      totalTimeSpent: number
      achievements: Achievement[]
    }
  }
  error?: string
}

// ============================================================================
// Frontend State Types
// ============================================================================

export interface FeedbackData {
  correct: boolean
  message: string
  explanation: string
  xpEarned: number
  streakUpdate: number
  levelUp?: boolean
}

export interface BasicsState {
  // Current problems
  mathProblem: MathProblem | null
  readingExercise: ReadingExercise | null

  // User progress
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null

  // UI state
  activeSection: 'math' | 'reading' | null
  isLoadingMath: boolean
  isLoadingReading: boolean
  isCheckingAnswer: boolean
  showFeedback: boolean
  feedbackData: FeedbackData | null

  // Input state
  mathAnswer: string
  readingAnswers: Record<string, string> // questionId -> answer
  startTime: number // For time tracking
}




