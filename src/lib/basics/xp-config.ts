/**
 * Centralized XP Configuration
 * 
 * All XP rewards, costs, and calculations in one place.
 * This is the single source of truth for the XP economy.
 * 
 * DESIGN PRINCIPLE: Costs reduce earnings, not subtract from totals.
 * If you use a hint (-10 XP) and solve a problem (+15 XP), you earn 5 XP net.
 * 
 * ⚠️ CLIENT-SAFE: This file contains no server-only imports.
 */

import { getTodayDate, getMondayOfCurrentWeek, getFirstOfCurrentMonth } from '@/lib/utils/date-helpers'

// =============================================================================
// PROGRESSION — Weekly Maintenance & Bonus Multipliers
// =============================================================================

/** Subjects that earn a bonus multiplier toward the weekly XP target */
export const BONUS_SUBJECTS = ['logic', 'writing'] as const

/** Logic and Writing XP count this many times toward the weekly 5000 target */
export const BONUS_MULTIPLIER = 3

/** Weekly XP required to maintain ALC/Developer access */
export const WEEKLY_XP_REQUIRED = 5000

// =============================================================================
// XP REWARDS - What you earn
// =============================================================================

export const XP_REWARDS = {
  // Math & Reading (base rewards)
  CORRECT_ANSWER_BASE: 10,
  WRONG_ANSWER_BASE: 2,        // Participation credit
  SPEED_BONUS: 3,              // Complete in < 50% estimated time
  STREAK_BONUS_PER: 2,         // Per consecutive correct
  STREAK_BONUS_MAX: 10,        // Cap on streak bonus
  EFFORT_BONUS: 1,             // Spent ≥30% time on wrong answer
  
  // Work Shown Bonus (math)
  WORK_SHOWN_MAX_BONUS: 10,    // Max bonus for showing work
  
  // Logic Problems (multiplied by difficulty 1-5)
  LOGIC_BASE_PER_DIFFICULTY: 10,  // difficulty * 10 = base XP
  
  // Translation Quality Tiers
  TRANSLATION_PERFECT: 15,
  TRANSLATION_EXCELLENT: 12,
  TRANSLATION_GOOD: 8,
  TRANSLATION_ACCEPTABLE: 4,
  TRANSLATION_ATTEMPTED: 2,
  
  // Reviews & Challenges
  SPACED_REPETITION_CORRECT: 5,
  
  // Focus Mode
  FOCUS_MODE_MULTIPLIER: 3,
} as const

// =============================================================================
// XP COSTS - What reduces your earnings
// =============================================================================

export const XP_COSTS = {
  // Problem Solving Aids
  SKIP_PROBLEM: 5,
  HINT_PURCHASE: 10,
  AI_TUTOR: 15,
  
  // Translation Aids  
  WORD_LOOKUP: 1,          // Reduced from 2 (first FREE_LOOKUPS_PER_EXERCISE are free)
  GRAMMAR_TIP: 5,
  AI_HINT: 8,
  
  // Other
  ALTERNATE_EXPLANATION: 0,  // Free after 2 wrong attempts
} as const

// Free lookups per exercise before XP cost applies
export const FREE_LOOKUPS_PER_EXERCISE = 2

// Free historical context per session for classical languages
// Pedagogy: Historical context is essential for language learning, not a premium feature
export const FREE_HISTORICAL_CONTEXT_PER_SESSION = 1

// =============================================================================
// AI GRADING THRESHOLDS
// =============================================================================

export const AI_GRADE_THRESHOLDS = {
  // Minimum score to earn any XP for AI-graded (math/reading free-response)
  MIN_SCORE_FOR_XP: 40,
  
  // Score ranges for partial credit
  PARTIAL_CREDIT_MIN: 40,
  PARTIAL_CREDIT_MAX: 69,
  
  // Full credit threshold
  FULL_CREDIT_MIN: 70,
} as const

// Translation-specific thresholds (stricter to prevent rewarding nonsense)
export const TRANSLATION_THRESHOLDS = {
  // Minimum score to earn ANY XP - translations below this get 0 XP
  // This prevents "The beach goes away" for "Rex urbem regit" from earning XP
  MIN_SCORE_FOR_XP: 20,
  
  // Quality tier thresholds
  PERFECT_MIN: 95,
  EXCELLENT_MIN: 85,
  GOOD_MIN: 70,
  PARTIAL_MIN: 40,
  ATTEMPTED_MIN: 20,  // Below this = no XP
} as const

// =============================================================================
// XP CALCULATION FUNCTIONS
// =============================================================================

export interface ProblemXPContext {
  correct: boolean
  timeSpent: number
  timeEstimate: number
  currentStreak: number
  costsIncurred?: number  // Hints, lookups, etc. used during this problem
}

/**
 * Calculate XP for a math or reading problem
 * Costs are deducted from earnings (not from total XP)
 */
export function calculateProblemXP(context: ProblemXPContext): number {
  const { correct, timeSpent, timeEstimate, currentStreak, costsIncurred = 0 } = context
  
  let xp = 0

  if (correct) {
    xp = XP_REWARDS.CORRECT_ANSWER_BASE

    // Speed bonus: +3 if completed in < 50% of estimated time
    if (timeSpent < timeEstimate * 0.5) {
      xp += XP_REWARDS.SPEED_BONUS
    }

    // Streak bonus: +2 per consecutive correct (capped)
    const streakBonus = Math.min(XP_REWARDS.STREAK_BONUS_MAX, currentStreak * XP_REWARDS.STREAK_BONUS_PER)
    xp += streakBonus
  } else {
    // Participation credit for wrong answers
    xp = XP_REWARDS.WRONG_ANSWER_BASE
    
    // Small bonus for spending reasonable time thinking
    if (timeSpent >= timeEstimate * 0.3) {
      xp += XP_REWARDS.EFFORT_BONUS
    }
  }

  // Deduct costs incurred during this problem (hints, etc.)
  // Minimum 0 - can't go negative
  return Math.max(0, xp - costsIncurred)
}

export interface AIGradeXPContext {
  score: number           // 0-100
  difficulty: number      // 1-12+
  currentStreak?: number
  costsIncurred?: number
}

/**
 * Calculate XP for AI-graded responses
 */
export function calculateAIGradedXP(context: AIGradeXPContext): number {
  const { score, difficulty = 1, currentStreak = 0, costsIncurred = 0 } = context
  
  // No XP for scores below threshold
  if (score < AI_GRADE_THRESHOLDS.MIN_SCORE_FOR_XP) {
    return 0
  }
  
  let xp = 0
  
  // Partial credit range (40-69%)
  if (score < AI_GRADE_THRESHOLDS.FULL_CREDIT_MIN) {
    // 1-6 XP for 40-69% (encourages partial attempts)
    xp = Math.ceil((score - AI_GRADE_THRESHOLDS.PARTIAL_CREDIT_MIN) / 5)
    xp = Math.max(1, xp)
  } else {
    // Full credit (70%+)
    // Base 5 XP + score bonus
    xp = 5 + Math.floor((score - 70) / 10) * 2
    
    // Difficulty multiplier: 1.0 + (difficulty * 0.1)
    const difficultyMultiplier = 1.0 + (Math.min(difficulty, 12) * 0.1)
    xp = Math.round(xp * difficultyMultiplier)
    
    // Streak bonus
    if (currentStreak > 0) {
      const streakBonus = Math.min(XP_REWARDS.STREAK_BONUS_MAX, currentStreak * XP_REWARDS.STREAK_BONUS_PER)
      xp += streakBonus
    }
  }

  // Deduct costs incurred
  return Math.max(0, xp - costsIncurred)
}

export interface LogicXPContext {
  difficulty: number      // 1-5
  usedHint: boolean
  costsIncurred?: number
}

/**
 * Calculate XP for logic problems
 */
export function calculateLogicXP(context: LogicXPContext): number {
  const { difficulty, usedHint, costsIncurred = 0 } = context
  
  let xp = difficulty * XP_REWARDS.LOGIC_BASE_PER_DIFFICULTY
  
  // Hint penalty: 70% of XP
  if (usedHint) {
    xp = Math.floor(xp * 0.7)
  }
  
  // Deduct costs incurred
  return Math.max(0, xp - costsIncurred)
}

export type TranslationQualityTier = 'perfect' | 'excellent' | 'good' | 'acceptable' | 'attempted'

export interface TranslationXPContext {
  qualityTier: TranslationQualityTier
  parsingBonus?: number
  costsIncurred?: number  // Word lookups, hints, etc.
}

/**
 * Calculate XP for translation exercises
 */
export function calculateTranslationXP(context: TranslationXPContext): number {
  const { qualityTier, parsingBonus = 0, costsIncurred = 0 } = context
  
  const tierRewards: Record<TranslationQualityTier, number> = {
    perfect: XP_REWARDS.TRANSLATION_PERFECT,
    excellent: XP_REWARDS.TRANSLATION_EXCELLENT,
    good: XP_REWARDS.TRANSLATION_GOOD,
    acceptable: XP_REWARDS.TRANSLATION_ACCEPTABLE,
    attempted: XP_REWARDS.TRANSLATION_ATTEMPTED,
  }
  
  const baseXP = tierRewards[qualityTier] || 0
  const totalEarned = baseXP + parsingBonus
  
  // Deduct costs (word lookups, hints used)
  return Math.max(0, totalEarned - costsIncurred)
}

/**
 * Calculate work shown bonus
 */
export function calculateWorkBonus(
  lineCount: number,
  isCorrect: boolean
): number {
  // Score based on lines of work (max 10 points)
  const score = Math.min(lineCount * 2, 10)
  const multiplier = 1.0 + (score / 10)
  
  if (isCorrect) {
    // Bonus is (multiplier - 1) * BASE_XP
    return Math.round((multiplier - 1) * XP_REWARDS.CORRECT_ANSWER_BASE)
  } else {
    // For incorrect: partial credit for good work (max 5 XP)
    return Math.min(Math.floor(score / 2), 5)
  }
}

/**
 * Apply focus mode multiplier
 */
export function applyFocusModeMultiplier(xp: number, inFocusMode: boolean): number {
  if (!inFocusMode) return xp
  return xp * XP_REWARDS.FOCUS_MODE_MULTIPLIER
}

// =============================================================================
// HELPER TYPES
// =============================================================================

export interface XPTransaction {
  amount: number
  source: 'math' | 'reading' | 'logic' | 'latin' | 'greek' | 'review' | 'challenge' | 'bonus'
  costsApplied: number
  focusModeMultiplied: boolean
  timestamp: number
}

/**
 * Calculate net XP after all costs and bonuses
 */
export function calculateNetXP(
  baseXP: number,
  costs: number[],
  bonuses: number[],
  focusModeActive: boolean = false
): number {
  const totalCosts = costs.reduce((sum, cost) => sum + cost, 0)
  const totalBonuses = bonuses.reduce((sum, bonus) => sum + bonus, 0)
  
  let netXP = baseXP + totalBonuses - totalCosts
  netXP = Math.max(0, netXP)
  
  if (focusModeActive) {
    netXP = applyFocusModeMultiplier(netXP, true)
  }
  
  return netXP
}

// =============================================================================
// TIME RANGE CALCULATIONS (Client-safe)
// =============================================================================

/**
 * Calculate XP totals by time range from history
 * - WTD: Week to Date (Monday of current week to today)
 * - MTD: Month to Date (1st of current month to today)
 * - YTD: Year to Date (Jan 1 to today)
 */
export function calculateXPByTimeRange(
  xpHistory: Record<string, number> | undefined,
  todayXP: number,
  totalXP: number
): {
  wtdXP: number   // Week to Date (Mon-Sun)
  mtdXP: number   // Month to Date
  ytdXP: number   // Year to Date
} {
  if (!xpHistory || Object.keys(xpHistory).length === 0) {
    return {
      wtdXP: todayXP,
      mtdXP: todayXP,
      ytdXP: totalXP
    }
  }
  
  const today = new Date()
  const todayStr = getTodayDate()
  
  const weekStart = getMondayOfCurrentWeek()
  const monthStart = getFirstOfCurrentMonth()
  const yearStart = new Date(today.getFullYear(), 0, 1)
  
  let wtdXP = 0
  let mtdXP = 0
  let ytdXP = 0
  
  for (const [dateStr, xp] of Object.entries(xpHistory)) {
    const date = new Date(dateStr + 'T00:00:00')
    
    if (date >= weekStart) wtdXP += xp
    if (date >= monthStart) mtdXP += xp
    if (date >= yearStart) ytdXP += xp
  }
  
  // Include today's XP if not yet in history
  const historyTodayXP = xpHistory[todayStr] || 0
  if (todayXP > historyTodayXP) {
    const diff = todayXP - historyTodayXP
    wtdXP += diff
    mtdXP += diff
    ytdXP += diff
  }
  
  return { wtdXP, mtdXP, ytdXP }
}

