/**
 * Progression Gates Type Definitions
 *
 * Types for the three-stage progression system:
 * Basics -> ALC -> Developer
 */

export type ProgressionStage = 'basics' | 'alc' | 'developer'

/**
 * Raw data needed to evaluate all progression gates.
 * Collected from Firestore and passed to pure evaluation functions.
 */
export interface ProgressionData {
  email: string | null
  mathDifficulty: number       // currentDifficulty from math SubjectProgress
  readingDifficulty: number    // currentDifficulty from reading SubjectProgress
  projectsCompleted: number    // ALC projects completed count
  deploymentVerified: boolean  // Vercel deployment status
  currentWeekXP: number        // Raw XP earned this calendar week
  lastWeekXP: number           // Raw XP earned last calendar week
  logicXP: number              // Logic XP earned this week (for bonus calc)
  writingXP: number            // Writing XP earned this week (for bonus calc)
  alcBypassPurchased: boolean  // Paid $10k to skip ALC structural gates
  developerBypassPurchased: boolean // Paid $10k to skip Developer structural gates
}

/**
 * Status of an individual gate requirement
 */
export interface GateStatus {
  isMet: boolean
  label: string
  current: number
  required: number
  progressPercent: number
}

/**
 * Weekly XP maintenance status with bonus tracking
 */
export interface WeeklyXPStatus {
  rawXP: number                // Actual XP earned this week
  effectiveXP: number          // XP after applying bonus multipliers
  required: number             // 5000 XP threshold
  isMet: boolean               // effectiveXP >= required
  gracePeriodActive: boolean   // Last week was missed, this week is grace period
  logicXP: number              // Logic XP contributing to bonus
  writingXP: number            // Writing XP contributing to bonus
  bonusXP: number              // Extra XP from bonus multiplier
}

/**
 * Full progression gates status returned by the hook
 */
export interface ProgressionGatesStatus {
  currentStage: ProgressionStage
  isAdmin: boolean

  // Per-stage access booleans (cumulative)
  canAccessBasics: boolean     // Always true
  canAccessALC: boolean        // Basics gates met + weekly maintenance
  canAccessDeveloper: boolean  // ALC gates met + weekly maintenance

  // Individual gate statuses
  mathGate: GateStatus
  readingGate: GateStatus
  projectsGate: GateStatus
  deploymentGate: GateStatus

  // Weekly maintenance
  weeklyXP: WeeklyXPStatus

  // Bypass purchase status
  alcBypassPurchased: boolean
  developerBypassPurchased: boolean

  // Loading state
  isLoading: boolean
}
