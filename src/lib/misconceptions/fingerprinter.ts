/**
 * Misconception Fingerprinter
 *
 * Maintains and updates student misconception profiles based on
 * detected misconceptions over time.
 */

import {
  MisconceptionFingerprint,
  UserMisconceptionProfile,
  DetectedMisconception,
  MisconceptionEvidence,
  MISCONCEPTION_CONFIG,
} from './types'
import { MATH_MISCONCEPTIONS_BY_ID } from './taxonomy/math'

// ============================================================================
// Types
// ============================================================================

export interface FingerprintUpdate {
  userId: string
  detections: DetectedMisconception[]
  problemId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Update a user's misconception profile with new detections
 */
export function updateMisconceptionProfile(
  existingProfile: UserMisconceptionProfile | null,
  update: FingerprintUpdate
): UserMisconceptionProfile {
  // Initialize profile if it doesn't exist
  if (!existingProfile) {
    existingProfile = createEmptyProfile(update.userId)
  }

  const profile = { ...existingProfile }
  profile.lastUpdated = new Date()

  // Process each detection
  for (const detection of update.detections) {
    updateFingerprint(profile, detection)
  }

  // Check for resolved misconceptions
  checkForResolution(profile)

  // Update aggregate stats
  updateStats(profile)

  return profile
}

/**
 * Check if a misconception has been resolved through successful practice
 */
export function checkRemediationProgress(
  profile: UserMisconceptionProfile,
  misconceptionId: string,
  correct: boolean
): UserMisconceptionProfile {
  const updatedProfile = { ...profile }

  const fingerprint = updatedProfile.activeMisconceptions.find(
    (m) => m.misconceptionId === misconceptionId
  )

  if (fingerprint && fingerprint.status === 'remediating') {
    fingerprint.remediationProblemsAttempted += 1
    if (correct) {
      fingerprint.remediationProblemsCorrect += 1
    }

    // Check if remediation is complete
    const successRate =
      fingerprint.remediationProblemsCorrect /
      fingerprint.remediationProblemsAttempted

    if (
      fingerprint.remediationProblemsAttempted >=
        MISCONCEPTION_CONFIG.REMEDIATION_MIN_PROBLEMS &&
      successRate >= MISCONCEPTION_CONFIG.REMEDIATION_SUCCESS_THRESHOLD
    ) {
      // Mark as resolved
      fingerprint.status = 'resolved'
      fingerprint.resolvedAt = new Date()

      // Move to resolved list
      const index = updatedProfile.activeMisconceptions.indexOf(fingerprint)
      if (index > -1) {
        updatedProfile.activeMisconceptions.splice(index, 1)
        updatedProfile.resolvedMisconceptions.push(fingerprint)
      }
    }
  }

  updatedProfile.lastUpdated = new Date()
  updateStats(updatedProfile)

  return updatedProfile
}

/**
 * Start remediation for a misconception
 */
export function startRemediation(
  profile: UserMisconceptionProfile,
  misconceptionId: string
): UserMisconceptionProfile {
  const updatedProfile = { ...profile }

  const fingerprint = updatedProfile.activeMisconceptions.find(
    (m) => m.misconceptionId === misconceptionId
  )

  if (
    fingerprint &&
    (fingerprint.status === 'suspected' || fingerprint.status === 'confirmed')
  ) {
    fingerprint.status = 'remediating'
    fingerprint.remediationStarted = new Date()
    fingerprint.remediationProblemsAttempted = 0
    fingerprint.remediationProblemsCorrect = 0
  }

  updatedProfile.lastUpdated = new Date()

  return updatedProfile
}

/**
 * Get active misconceptions sorted by priority
 */
export function getPrioritizedMisconceptions(
  profile: UserMisconceptionProfile
): MisconceptionFingerprint[] {
  return [...profile.activeMisconceptions].sort((a, b) => {
    // Priority factors:
    // 1. Severity (fundamental > major > moderate > minor)
    const severityOrder = { fundamental: 4, major: 3, moderate: 2, minor: 1 }
    const severityDiff =
      (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0)
    if (severityDiff !== 0) return severityDiff

    // 2. Confidence (higher = more urgent)
    const confidenceDiff = b.confidence - a.confidence
    if (Math.abs(confidenceDiff) > 0.1) return confidenceDiff

    // 3. Occurrence count (more = more urgent)
    const occurrenceDiff = b.occurrenceCount - a.occurrenceCount
    if (occurrenceDiff !== 0) return occurrenceDiff

    // 4. Recency (more recent = more urgent)
    return b.lastObserved.getTime() - a.lastObserved.getTime()
  })
}

/**
 * Get misconceptions that are blocking progress
 */
export function getBlockingMisconceptions(
  profile: UserMisconceptionProfile
): MisconceptionFingerprint[] {
  return profile.activeMisconceptions.filter(
    (m) =>
      m.severity === 'fundamental' ||
      (m.severity === 'major' && m.occurrenceCount >= 3)
  )
}

// ============================================================================
// Helper Functions
// ============================================================================

function createEmptyProfile(userId: string): UserMisconceptionProfile {
  return {
    userId,
    lastUpdated: new Date(),
    activeMisconceptions: [],
    resolvedMisconceptions: [],
    stats: {
      totalMisconceptionsDetected: 0,
      totalMisconceptionsResolved: 0,
      avgRemediationTime: 0,
      mostCommonCategory: 'arithmetic',
    },
  }
}

function updateFingerprint(
  profile: UserMisconceptionProfile,
  detection: DetectedMisconception
): void {
  const { misconception, confidence, evidence } = detection

  // Check if this misconception is already tracked
  const fingerprint = profile.activeMisconceptions.find(
    (m) => m.misconceptionId === misconception.id
  )

  if (fingerprint) {
    // Update existing fingerprint
    fingerprint.lastObserved = new Date()
    fingerprint.occurrenceCount += 1
    fingerprint.confidence = Math.max(fingerprint.confidence, confidence)

    // Add to evidence (keep last N)
    fingerprint.evidence.push(evidence)
    if (
      fingerprint.evidence.length >
      MISCONCEPTION_CONFIG.MAX_EVIDENCE_PER_MISCONCEPTION
    ) {
      fingerprint.evidence = fingerprint.evidence.slice(
        -MISCONCEPTION_CONFIG.MAX_EVIDENCE_PER_MISCONCEPTION
      )
    }

    // Update status based on occurrences and confidence
    if (fingerprint.status === 'suspected') {
      if (
        fingerprint.occurrenceCount >=
          MISCONCEPTION_CONFIG.MIN_OCCURRENCES_FOR_CONFIRMED &&
        fingerprint.confidence >=
          MISCONCEPTION_CONFIG.MIN_CONFIDENCE_FOR_CONFIRMED
      ) {
        fingerprint.status = 'confirmed'
      }
    }

    // Update severity based on misconception definition
    fingerprint.severity = misconception.severity
  } else {
    // Create new fingerprint
    const newFingerprint: MisconceptionFingerprint = {
      misconceptionId: misconception.id,
      misconceptionName: misconception.name,
      status:
        confidence >= MISCONCEPTION_CONFIG.MIN_CONFIDENCE_FOR_CONFIRMED
          ? 'confirmed'
          : 'suspected',
      severity: misconception.severity,
      firstDetected: new Date(),
      lastObserved: new Date(),
      occurrenceCount: 1,
      confidence,
      evidence: [evidence],
      remediationProblemsAttempted: 0,
      remediationProblemsCorrect: 0,
    }

    profile.activeMisconceptions.push(newFingerprint)
    profile.stats.totalMisconceptionsDetected += 1
  }
}

function checkForResolution(profile: UserMisconceptionProfile): void {
  const now = new Date()
  const staleThreshold = 30 * 24 * 60 * 60 * 1000 // 30 days

  // Check for misconceptions that haven't been observed recently
  const toResolve: MisconceptionFingerprint[] = []

  for (const fingerprint of profile.activeMisconceptions) {
    const timeSinceLastObserved =
      now.getTime() - fingerprint.lastObserved.getTime()

    // If not observed in 30 days and was only suspected, consider resolved
    if (
      timeSinceLastObserved > staleThreshold &&
      fingerprint.status === 'suspected'
    ) {
      fingerprint.status = 'resolved'
      fingerprint.resolvedAt = now
      toResolve.push(fingerprint)
    }

    // If confirmed but not observed in 60 days, consider resolved
    if (
      timeSinceLastObserved > staleThreshold * 2 &&
      fingerprint.status === 'confirmed'
    ) {
      fingerprint.status = 'resolved'
      fingerprint.resolvedAt = now
      toResolve.push(fingerprint)
    }
  }

  // Move resolved misconceptions
  for (const fingerprint of toResolve) {
    const index = profile.activeMisconceptions.indexOf(fingerprint)
    if (index > -1) {
      profile.activeMisconceptions.splice(index, 1)
      profile.resolvedMisconceptions.push(fingerprint)
      profile.stats.totalMisconceptionsResolved += 1
    }
  }
}

function updateStats(profile: UserMisconceptionProfile): void {
  // Update most common category
  const categoryCounts = new Map<string, number>()

  for (const fingerprint of [
    ...profile.activeMisconceptions,
    ...profile.resolvedMisconceptions,
  ]) {
    const misconception = MATH_MISCONCEPTIONS_BY_ID.get(
      fingerprint.misconceptionId
    )
    if (misconception) {
      const count = categoryCounts.get(misconception.category) || 0
      categoryCounts.set(misconception.category, count + 1)
    }
  }

  let maxCount = 0
  let mostCommon = 'arithmetic'
  for (const [category, count] of categoryCounts) {
    if (count > maxCount) {
      maxCount = count
      mostCommon = category
    }
  }

  profile.stats.mostCommonCategory =
    mostCommon as UserMisconceptionProfile['stats']['mostCommonCategory']

  // Update average remediation time
  const resolvedWithTime = profile.resolvedMisconceptions.filter(
    (m) => m.resolvedAt && m.remediationStarted
  )

  if (resolvedWithTime.length > 0) {
    const totalTime = resolvedWithTime.reduce((sum, m) => {
      const time =
        (m.resolvedAt!.getTime() - m.remediationStarted!.getTime()) /
        (1000 * 60 * 60 * 24) // Days
      return sum + time
    }, 0)
    profile.stats.avgRemediationTime = totalTime / resolvedWithTime.length
  }
}

// ============================================================================
// Analysis Functions
// ============================================================================

/**
 * Get a summary of misconception patterns for a user
 */
export function getMisconceptionSummary(profile: UserMisconceptionProfile): {
  totalActive: number
  totalResolved: number
  blocking: number
  byCategory: Record<string, number>
  bySeverity: Record<string, number>
  topPriority: MisconceptionFingerprint | null
} {
  const byCategory: Record<string, number> = {}
  const bySeverity: Record<string, number> = {}

  for (const fingerprint of profile.activeMisconceptions) {
    const misconception = MATH_MISCONCEPTIONS_BY_ID.get(
      fingerprint.misconceptionId
    )
    if (misconception) {
      byCategory[misconception.category] =
        (byCategory[misconception.category] || 0) + 1
    }
    bySeverity[fingerprint.severity] =
      (bySeverity[fingerprint.severity] || 0) + 1
  }

  const prioritized = getPrioritizedMisconceptions(profile)
  const blocking = getBlockingMisconceptions(profile)

  return {
    totalActive: profile.activeMisconceptions.length,
    totalResolved: profile.resolvedMisconceptions.length,
    blocking: blocking.length,
    byCategory,
    bySeverity,
    topPriority: prioritized[0] || null,
  }
}

/**
 * Check if user has a specific misconception
 */
export function hasMisconception(
  profile: UserMisconceptionProfile,
  misconceptionId: string,
  onlyConfirmed: boolean = false
): boolean {
  return profile.activeMisconceptions.some((m) => {
    if (m.misconceptionId !== misconceptionId) return false
    if (onlyConfirmed && m.status !== 'confirmed') return false
    return true
  })
}

/**
 * Get all misconceptions for a specific category
 */
export function getMisconceptionsByCategory(
  profile: UserMisconceptionProfile,
  category: string
): MisconceptionFingerprint[] {
  return profile.activeMisconceptions.filter((fingerprint) => {
    const misconception = MATH_MISCONCEPTIONS_BY_ID.get(
      fingerprint.misconceptionId
    )
    return misconception?.category === category
  })
}
