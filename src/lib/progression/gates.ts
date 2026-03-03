/**
 * Progression Gates — Pure Evaluation Functions
 *
 * Single source of truth for all progression thresholds and gate logic.
 * All functions are pure (no side effects, no Firestore calls).
 */

import { isAdmin, isDeveloper } from '@/config/developers'
import type {
  ProgressionData,
  ProgressionStage,
  GateStatus,
  WeeklyXPStatus,
  ProgressionGatesStatus,
} from './types'

// =============================================================================
// Thresholds
// =============================================================================

export const THRESHOLDS = {
  ALC_MATH_GRADE: 12,
  ALC_READING_GRADE: 12,
  DEVELOPER_PROJECTS: 5,
  WEEKLY_XP_REQUIRED: 5000,
  BONUS_MULTIPLIER: 3,
} as const

// =============================================================================
// Individual Gate Evaluators
// =============================================================================

export function evaluateMathGate(currentDifficulty: number): GateStatus {
  const required = THRESHOLDS.ALC_MATH_GRADE
  return {
    isMet: currentDifficulty >= required,
    label: 'Math Grade 12',
    current: currentDifficulty,
    required,
    progressPercent: Math.min(100, (currentDifficulty / required) * 100),
  }
}

export function evaluateReadingGate(currentDifficulty: number): GateStatus {
  const required = THRESHOLDS.ALC_READING_GRADE
  return {
    isMet: currentDifficulty >= required,
    label: 'Reading Grade 12',
    current: currentDifficulty,
    required,
    progressPercent: Math.min(100, (currentDifficulty / required) * 100),
  }
}

export function evaluateProjectsGate(projectsCompleted: number): GateStatus {
  const required = THRESHOLDS.DEVELOPER_PROJECTS
  return {
    isMet: projectsCompleted >= required,
    label: `${required} ALC Projects`,
    current: projectsCompleted,
    required,
    progressPercent: Math.min(100, (projectsCompleted / required) * 100),
  }
}

export function evaluateDeploymentGate(verified: boolean): GateStatus {
  return {
    isMet: verified,
    label: 'Deployment Verified',
    current: verified ? 1 : 0,
    required: 1,
    progressPercent: verified ? 100 : 0,
  }
}

// =============================================================================
// Weekly XP with Bonus Multiplier
// =============================================================================

/**
 * Logic and Writing XP count 3x toward the weekly target.
 * Formula: effectiveXP = rawXP + (logicXP + writingXP) * (multiplier - 1)
 *
 * This means logic/writing XP is counted once in rawXP (as normal),
 * then gets an additional (multiplier - 1) boost.
 */
export function calculateEffectiveWeeklyXP(
  rawXP: number,
  logicXP: number,
  writingXP: number
): { effectiveXP: number; bonusXP: number } {
  const bonusXP = (logicXP + writingXP) * (THRESHOLDS.BONUS_MULTIPLIER - 1)
  return {
    effectiveXP: rawXP + bonusXP,
    bonusXP,
  }
}

/**
 * Evaluate weekly maintenance requirement.
 *
 * Grace period logic:
 * - If last week >= required: maintenance met, no grace period
 * - If last week < required AND current week effective >= required: met via grace
 * - If last week < required AND current week effective < required: grace period active (warning)
 *
 * New users (both weeks are 0) are exempt — they haven't unlocked ALC yet so
 * maintenance doesn't apply.
 */
export function evaluateWeeklyMaintenance(
  currentWeekRawXP: number,
  lastWeekRawXP: number,
  currentWeekLogicXP: number,
  currentWeekWritingXP: number,
  lastWeekLogicXP: number,
  lastWeekWritingXP: number,
): WeeklyXPStatus {
  const required = THRESHOLDS.WEEKLY_XP_REQUIRED

  const { effectiveXP: lastWeekEffective } = calculateEffectiveWeeklyXP(
    lastWeekRawXP, lastWeekLogicXP, lastWeekWritingXP
  )
  const { effectiveXP, bonusXP } = calculateEffectiveWeeklyXP(
    currentWeekRawXP, currentWeekLogicXP, currentWeekWritingXP
  )

  const lastWeekMet = lastWeekEffective >= required
  const currentWeekMet = effectiveXP >= required

  // Grace period is active when last week wasn't met and this week isn't met yet
  const gracePeriodActive = !lastWeekMet && !currentWeekMet

  // Maintenance is considered met if last week was met OR current week is met
  const isMet = lastWeekMet || currentWeekMet

  return {
    rawXP: currentWeekRawXP,
    effectiveXP,
    required,
    isMet,
    gracePeriodActive,
    logicXP: currentWeekLogicXP,
    writingXP: currentWeekWritingXP,
    bonusXP,
  }
}

// =============================================================================
// Stage Evaluation
// =============================================================================

/**
 * Determine the user's current progression stage and full gate status.
 */
export function evaluateProgression(data: ProgressionData): ProgressionGatesStatus {
  const adminOverride = isAdmin(data.email) || isDeveloper(data.email)

  const mathGate = evaluateMathGate(data.mathDifficulty)
  const readingGate = evaluateReadingGate(data.readingDifficulty)
  const projectsGate = evaluateProjectsGate(data.projectsCompleted)
  const deploymentGate = evaluateDeploymentGate(data.deploymentVerified)

  // We don't have last week's per-subject breakdown readily available in all contexts,
  // so for last week we pass 0 for subject XP (conservative — no bonus applied to last week).
  // This means last week evaluation uses raw XP only.
  const weeklyXP = evaluateWeeklyMaintenance(
    data.currentWeekXP,
    data.lastWeekXP,
    data.logicXP,
    data.writingXP,
    0, // lastWeekLogicXP — not tracked retroactively
    0, // lastWeekWritingXP — not tracked retroactively
  )

  // ALC: bypass skips structural gates but NOT weekly maintenance
  const alcBasicsMet = mathGate.isMet && readingGate.isMet
  const canAccessALC = adminOverride || data.alcBypassPurchased || (alcBasicsMet && weeklyXP.isMet)

  // Developer: bypass skips structural gates but still needs ALC access + weekly maintenance
  const developerGatesMet = projectsGate.isMet && deploymentGate.isMet
  const canAccessDeveloper = adminOverride || (canAccessALC && (data.developerBypassPurchased || developerGatesMet))

  let currentStage: ProgressionStage = 'basics'
  if (canAccessDeveloper) currentStage = 'developer'
  else if (canAccessALC) currentStage = 'alc'

  return {
    currentStage,
    isAdmin: adminOverride,
    canAccessBasics: true,
    canAccessALC,
    canAccessDeveloper,
    mathGate,
    readingGate,
    projectsGate,
    deploymentGate,
    weeklyXP,
    alcBypassPurchased: data.alcBypassPurchased,
    developerBypassPurchased: data.developerBypassPurchased,
    isLoading: false,
  }
}
