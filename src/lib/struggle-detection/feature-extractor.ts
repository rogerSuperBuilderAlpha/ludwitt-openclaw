/**
 * Struggle Feature Extractor
 * 
 * Extracts features from telemetry data for struggle prediction.
 */

import { SessionSignals, TelemetryProfile } from '@/lib/telemetry/types'
import { StruggleFeatures, STRUGGLE_CONFIG } from './types'

// ============================================================================
// Types
// ============================================================================

export interface FeatureExtractionInput {
  currentSignals: Partial<SessionSignals>
  problemDifficulty: number
  problemType: string
  userProfile?: TelemetryProfile
  recentPerformance?: {
    lastFiveAccuracy: number
    skillMastery: number
    subjectComfort: number
    timeSinceLastCorrect: number
  }
}

// ============================================================================
// Main Extraction Function
// ============================================================================

/**
 * Extract struggle features from current session state
 */
export function extractStruggleFeatures(
  input: FeatureExtractionInput
): StruggleFeatures {
  const { currentSignals, problemDifficulty, userProfile, recentPerformance } = input
  
  // Calculate expected time based on difficulty
  const expectedTimeMs = calculateExpectedTime(problemDifficulty, userProfile)
  const timeElapsedMs = currentSignals.totalTimeMs || 0
  
  // Build features
  const features: StruggleFeatures = {
    // Time-based
    timeElapsedMs,
    expectedTimeMs,
    timeRatio: expectedTimeMs > 0 ? timeElapsedMs / expectedTimeMs : 1,
    
    // Activity
    keystrokeCount: currentSignals.keystrokeCount || 0,
    keystrokeRate: currentSignals.keystrokeRate || 0,
    keystrokeVariance: calculateKeystrokeVariance(currentSignals),
    
    // Pauses
    pauseCount: currentSignals.pauseCount || 0,
    avgPauseLengthMs: currentSignals.avgPauseLengthMs || 0,
    maxPauseLengthMs: currentSignals.maxPauseLengthMs || 0,
    longPauseCount: countLongPauses(currentSignals.pausePattern || []),
    
    // Revisions
    revisionCount: currentSignals.revisionCount || 0,
    deletionRatio: currentSignals.deletionRatio || 0,
    majorRevisionCount: currentSignals.majorRevisions || 0,
    
    // Behavioral
    focusLossCount: currentSignals.focusLossCount || 0,
    scrollBehavior: normalizeScrollBehavior(currentSignals.scrollCount || 0, currentSignals.scrollDepth || 0),
    hintRequests: currentSignals.hintRequests || 0,
    hintViews: currentSignals.hintViews || 0,
    
    // Answer evolution
    answerChangeCount: currentSignals.answerChanges || 0,
    lastAnswerAge: calculateLastAnswerAge(currentSignals),
    
    // Historical context
    recentAccuracy: recentPerformance?.lastFiveAccuracy ?? 0.7,
    skillMastery: recentPerformance?.skillMastery ?? 0.5,
    subjectComfort: recentPerformance?.subjectComfort ?? 0.5,
    timeSinceLastCorrect: recentPerformance?.timeSinceLastCorrect ?? 0
  }
  
  // Normalize features relative to user's typical patterns
  if (userProfile) {
    normalizeToUserProfile(features, userProfile)
  }
  
  return features
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Calculate expected time for a problem based on difficulty and user profile
 */
function calculateExpectedTime(
  difficulty: number,
  userProfile?: TelemetryProfile
): number {
  // Base expected time: 30 seconds per difficulty level
  let baseTime = 30000 * difficulty
  
  // Adjust based on user's typical time
  if (userProfile && userProfile.rollingStats.avgTimePerProblem > 0) {
    // Blend base expectation with user's average
    baseTime = 0.3 * baseTime + 0.7 * userProfile.rollingStats.avgTimePerProblem
  }
  
  // Clamp to reasonable range
  return Math.max(15000, Math.min(baseTime, 300000))
}

/**
 * Calculate keystroke variance from patterns
 */
function calculateKeystrokeVariance(signals: Partial<SessionSignals>): number {
  // Simplified: use deletion ratio as proxy for variance
  // High deletion ratio = high variance in typing pattern
  return signals.deletionRatio || 0
}

/**
 * Count pauses longer than threshold
 */
function countLongPauses(pausePattern: number[]): number {
  return pausePattern.filter(p => p > STRUGGLE_CONFIG.LONG_PAUSE_THRESHOLD_MS).length
}

/**
 * Normalize scroll behavior to 0-1 scale
 */
function normalizeScrollBehavior(scrollCount: number, scrollDepth: number): number {
  // Combine scroll frequency and depth
  const frequencyScore = Math.min(1, scrollCount / 10)
  const depthScore = scrollDepth // Already 0-1
  
  return (frequencyScore + depthScore) / 2
}

/**
 * Calculate time since last answer change
 */
function calculateLastAnswerAge(signals: Partial<SessionSignals>): number {
  // If no answer changes yet, return total time
  if (!signals.answerChanges || signals.answerChanges === 0) {
    return signals.totalTimeMs || 0
  }
  
  // Estimate based on total time / answer changes
  // This is a simplification - ideally we'd track actual timestamps
  return (signals.totalTimeMs || 0) / (signals.answerChanges + 1)
}

/**
 * Normalize features relative to user's typical patterns
 */
function normalizeToUserProfile(
  features: StruggleFeatures,
  profile: TelemetryProfile
): void {
  const typical = profile.rollingStats
  
  // Adjust keystroke rate relative to user's typical rate
  if (typical.avgKeystrokeRate > 0) {
    const normalizedRate = features.keystrokeRate / typical.avgKeystrokeRate
    // If current rate is much lower than typical, that's a struggle signal
    features.keystrokeRate = normalizedRate
  }
  
  // Adjust pause length relative to typical
  if (typical.avgPauseLength > 0) {
    const normalizedPause = features.avgPauseLengthMs / typical.avgPauseLength
    // If current pauses are much longer than typical, that's concerning
    features.avgPauseLengthMs = normalizedPause * typical.avgPauseLength
  }
}

// ============================================================================
// Feature Analysis
// ============================================================================

/**
 * Get the most significant struggle signals from features
 */
export function getSignificantSignals(
  features: StruggleFeatures
): Array<{ signal: string; strength: number; description: string }> {
  const signals: Array<{ signal: string; strength: number; description: string }> = []
  
  // Time exceeded
  if (features.timeRatio > STRUGGLE_CONFIG.EXPECTED_TIME_MULTIPLIER) {
    const strength = Math.min(1, (features.timeRatio - 1) / 2)
    signals.push({
      signal: 'time_exceeded',
      strength,
      description: `Taking ${features.timeRatio.toFixed(1)}x expected time`
    })
  }
  
  // Low activity
  if (features.keystrokeRate < STRUGGLE_CONFIG.LOW_KEYSTROKE_RATE && features.timeElapsedMs > 30000) {
    const strength = 1 - (features.keystrokeRate / STRUGGLE_CONFIG.LOW_KEYSTROKE_RATE)
    signals.push({
      signal: 'low_activity',
      strength: Math.max(0, Math.min(1, strength)),
      description: 'Very low keystroke activity'
    })
  }
  
  // Long pauses
  if (features.longPauseCount > 0) {
    const strength = Math.min(1, features.longPauseCount / 3)
    signals.push({
      signal: 'long_pause',
      strength,
      description: `${features.longPauseCount} long pause(s) detected`
    })
  }
  
  // Excessive revisions
  if (features.majorRevisionCount > STRUGGLE_CONFIG.HIGH_REVISION_COUNT) {
    const strength = Math.min(1, (features.majorRevisionCount - STRUGGLE_CONFIG.HIGH_REVISION_COUNT) / 5)
    signals.push({
      signal: 'excessive_revisions',
      strength,
      description: `${features.majorRevisionCount} major revisions`
    })
  }
  
  // High deletion ratio
  if (features.deletionRatio > STRUGGLE_CONFIG.HIGH_DELETION_RATIO) {
    const strength = (features.deletionRatio - STRUGGLE_CONFIG.HIGH_DELETION_RATIO) / 0.5
    signals.push({
      signal: 'high_deletion_ratio',
      strength: Math.min(1, strength),
      description: 'Deleting more than typing'
    })
  }
  
  // Focus loss
  if (features.focusLossCount > 2) {
    const strength = Math.min(1, features.focusLossCount / 5)
    signals.push({
      signal: 'focus_loss',
      strength,
      description: 'Frequently losing focus'
    })
  }
  
  // No progress
  if (features.lastAnswerAge > 60000 && features.answerChangeCount === 0) {
    signals.push({
      signal: 'no_progress',
      strength: 0.8,
      description: 'No answer attempted yet'
    })
  }
  
  // Recent failures
  if (features.recentAccuracy < 0.4) {
    const strength = 1 - (features.recentAccuracy / 0.4)
    signals.push({
      signal: 'recent_failures',
      strength,
      description: 'Struggling on recent problems'
    })
  }
  
  // Skill gap
  if (features.skillMastery < 0.3) {
    signals.push({
      signal: 'skill_gap',
      strength: 0.7,
      description: 'Low mastery of required skills'
    })
  }
  
  // Hint dependency
  if (features.hintViews > 2) {
    const strength = Math.min(1, features.hintViews / 5)
    signals.push({
      signal: 'hint_dependency',
      strength,
      description: 'Relying heavily on hints'
    })
  }
  
  // Sort by strength
  return signals.sort((a, b) => b.strength - a.strength)
}

/**
 * Check if current state indicates struggle
 */
export function isStruggling(features: StruggleFeatures): boolean {
  const signals = getSignificantSignals(features)
  
  // Calculate weighted struggle score
  let score = 0
  for (const signal of signals) {
    const weight = STRUGGLE_CONFIG.DEFAULT_WEIGHTS[signal.signal as keyof typeof STRUGGLE_CONFIG.DEFAULT_WEIGHTS] || 0.1
    score += signal.strength * weight
  }
  
  return score >= 0.5
}
