/**
 * Type definitions for Weekly Writing Competition
 * 
 * Students submit 100-word essays responding to prompts.
 * Competition runs Friday 5pm EST → Next Friday 5pm EST (7 days).
 * Winners at each grade level (1-12) receive $50 in credits.
 */

// ============================================================================
// Competition Types
// ============================================================================

export type CompetitionStatus = 'upcoming' | 'active' | 'judging' | 'completed'

export type PromptCategory = 
  | 'opinion'        // "Should students...? Explain your position."
  | 'narrative'      // "Write about a time when..."
  | 'informational'  // "Explain how [concept] works."
  | 'reflection'     // "What did you learn from...?"
  | 'creative'       // "Imagine [scenario]. Describe what happens."

/**
 * A weekly writing competition instance
 * Collection: writingCompetitions
 */
export interface WritingCompetition {
  id: string                    // Format: "2026-W01" (year-week)
  weekNumber: number            // ISO week number (1-52)
  year: number
  prompt: string                // The writing prompt
  promptCategory: PromptCategory
  startDate: string             // ISO timestamp (Friday 5:00pm EST)
  endDate: string               // ISO timestamp (Next Friday 5:00pm EST, 7 days later)
  status: CompetitionStatus
  winnersAnnounced: boolean
  totalSubmissions: number      // Count for stats
  createdAt: string
  updatedAt: string
}

/**
 * A student's essay submission
 * Collection: writingSubmissions
 */
export interface WritingSubmission {
  id: string
  competitionId: string         // Reference to competition
  userId: string
  userDisplayName: string
  gradeLevel: number            // 1-12, derived from reading currentDifficulty
  essay: string                 // The 100-word essay
  wordCount: number
  submittedAt: string           // ISO timestamp
  
  // Judging fields
  isWinner: boolean
  aiScore?: number              // 0-100 score from AI evaluation
  aiScoreBreakdown?: {
    relevance: number           // 0-25: Addresses the prompt
    clarity: number             // 0-25: Clear and organized writing
    reasoning: number           // 0-25: Quality of arguments/ideas
    mechanics: number           // 0-25: Grammar, spelling, punctuation
  }
  aiFeedback?: string           // Constructive feedback for student
  
  // Prize tracking
  prizeAwarded: boolean
  prizeAwardedAt?: string
  prizeAmountCents?: number     // 5000 = $50
}

/**
 * A student's work-in-progress draft
 * Collection: users/{userId}/writingDrafts/{competitionId}
 */
export interface WritingDraft {
  competitionId: string
  essay: string
  wordCount: number
  lastSavedAt: string
  totalTypingTime: number       // Seconds spent typing (engagement metric)
  startedAt: string             // When they first started
}

/**
 * Winner record for leaderboard display
 */
export interface CompetitionWinner {
  competitionId: string
  weekNumber: number
  year: number
  userId: string
  displayName: string
  gradeLevel: number
  essayExcerpt: string          // First 50 chars of winning essay
  promptExcerpt: string         // First 50 chars of prompt
  awardedAt: string
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface GetCurrentCompetitionResponse {
  success: boolean
  data?: {
    competition: WritingCompetition
    userDraft: WritingDraft | null
    userSubmission: WritingSubmission | null
    hasSubmitted: boolean
    timeRemaining: number       // Seconds until deadline
    userGradeLevel: number
  }
  error?: string
}

export interface SaveDraftRequest {
  competitionId: string
  essay: string
  typingTimeIncrement?: number  // Additional typing time in seconds
}

export interface SaveDraftResponse {
  success: boolean
  data?: {
    wordCount: number
    savedAt: string
  }
  error?: string
}

export interface SubmitEssayRequest {
  competitionId: string
  essay: string
}

export interface SubmitEssayResponse {
  success: boolean
  data?: {
    submission: WritingSubmission
    aiFeedback?: string         // Optional immediate feedback
  }
  error?: string
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  displayName: string
  gradeLevel: number
  submittedAt: string
  isWinner: boolean
  avatarEmoji?: string      // Character avatar emoji (for character avatars)
  characterId?: string      // Character ID for avatar lookup
  photoURL?: string         // Photo URL (for photo avatars)
}

export interface GetLeaderboardResponse {
  success: boolean
  data?: {
    currentStandings: LeaderboardEntry[]  // Current competition
    pastWinners: CompetitionWinner[]       // Previous weeks
    totalParticipants: number
    currentUserSubmission?: LeaderboardEntry | null  // Current user's submission info
  }
  error?: string
}

// ============================================================================
// Constants
// ============================================================================

export const WRITING_COMPETITION_CONSTANTS = {
  MIN_WORD_COUNT: 90,
  MAX_WORD_COUNT: 110,
  TARGET_WORD_COUNT: 100,
  PRIZE_AMOUNT_CENTS: 5000,     // $50
  START_DAY: 5,                 // Friday (0 = Sunday) - when new competition starts
  START_HOUR_UTC: 22,           // 5pm EST = 22:00 UTC (standard time)
  COMPETITION_DURATION_DAYS: 7, // Friday to Friday
  DEADLINE_TZ: 'America/New_York',
  AUTO_SAVE_INTERVAL_MS: 30000, // 30 seconds
} as const

// ============================================================================
// Helper Types
// ============================================================================

/**
 * Word count validation result
 */
export interface WordCountValidation {
  count: number
  isValid: boolean
  message: string
  status: 'too-short' | 'valid' | 'too-long'
}

/**
 * Submission eligibility check result
 */
export interface SubmissionEligibility {
  canSubmit: boolean
  reason?: string
  hasValidWordCount: boolean
  isBeforeDeadline: boolean
  hasNotAlreadySubmitted: boolean
}
