/**
 * Reference Content Type Definitions
 */

import { Timestamp } from 'firebase-admin/firestore'

// ============================================================================
// Reference Content Types
// ============================================================================

/**
 * A formula in a reference unit
 */
export interface Formula {
  name: string
  latex: string                   // LaTeX/KaTeX notation
  description: string
  variables?: Record<string, string>  // e.g., { "a": "first term", "r": "common ratio" }
}

/**
 * A worked example in a reference unit
 */
export interface WorkedExample {
  problem: string
  steps: string[]
  solution: string
  explanation: string
}

/**
 * A section within a reference unit
 */
export interface ReferenceSection {
  id: string
  title: string
  content: string                 // Markdown-formatted content
  formulas?: Formula[]
  examples?: WorkedExample[]
  tips?: string[]
  commonMistakes?: string[]
}

/**
 * A complete reference unit (lesson/textbook chapter)
 */
export interface ReferenceUnit {
  id: string
  sectionId: string               // e.g., "algebra", "calculus"
  title: string
  description: string
  xpCost: number                  // XP required to unlock (default: 5)
  prerequisites?: string[]        // Unit IDs that must be unlocked first
  sections: ReferenceSection[]

  // Metadata
  estimatedReadTime?: number      // Minutes
  difficulty?: 'basic' | 'intermediate' | 'advanced' | 'expert'
  relatedTopics?: string[]        // Problem topics this unit helps with
}

/**
 * Tracks which reference units a user has unlocked
 * Stored in Firestore: users/{userId}/unlockedContent
 */
export interface UserUnlockedContent {
  unlockedUnits: string[]         // Unit IDs
  unlockedAt: Record<string, Timestamp>  // unitId -> unlock timestamp
  totalXpSpent: number            // Total XP spent on unlocking content
}

// ============================================================================
// Help System Types
// ============================================================================

/**
 * Tracks what help a user has purchased/used for a specific problem
 * Stored in Firestore: users/{userId}/helpHistory/{problemId}
 */
export interface ProblemHelpHistory {
  problemId: string

  // Hint tracking
  hintPurchased: boolean
  hintPurchasedAt?: Timestamp
  hintText?: string
  xpSpentOnHint?: number

  // AI Tutor tracking
  aiTutorUsed: boolean
  aiTutorUsedAt?: Timestamp
  aiTutorResponse?: string        // Saved AI response for free replay
  xpSpentOnAI?: number

  // Study topic tracking (unlocked units)
  unlockedUnits?: string[]        // Unit IDs that were unlocked
}

/**
 * Work evaluation result from AI
 */
export interface WorkEvaluation {
  workScore: number               // 0-10 total score
  bonusMultiplier: number         // 1.0-2.0 XP multiplier
  bonusXp: number                 // Actual bonus XP earned
  feedback: string                // Brief feedback on work quality
  improvements?: string[]         // Suggestions for improvement
  
  // Enhanced AI feedback
  whatWentWell?: string | null    // Highlight of strongest aspect
  nextTimeAdvice?: string | null  // Practical tip for similar problems
  alternativeApproach?: string | null // Different method they could try

  // Detailed scoring breakdown
  scores?: {
    logicalProgression: number    // 0-3: Steps in correct order?
    mathematicalAccuracy: number  // 0-3: Individual steps correct?
    completeness: number          // 0-2: All key steps shown?
    clarity: number               // 0-2: Easy to follow?
  }
  
  // Credit tracking
  creditsUsed?: number
  creditLimited?: boolean
}




