/**
 * Telemetry Aggregator
 * 
 * Server-side aggregation of telemetry data for analysis and storage.
 * Computes rolling averages and patterns from session data.
 */

import {
  SessionTelemetry,
  SessionSignals,
  TelemetryProfile,
  RevisionPattern,
  TELEMETRY_CONFIG
} from './types'

// ============================================================================
// Profile Aggregation
// ============================================================================

/**
 * Update a user's telemetry profile with data from a new session
 */
export function updateTelemetryProfile(
  existingProfile: TelemetryProfile | null,
  newSession: SessionTelemetry
): TelemetryProfile {
  const now = new Date()
  
  // Initialize profile if it doesn't exist
  if (!existingProfile) {
    return createInitialProfile(newSession)
  }
  
  const profile = { ...existingProfile }
  profile.lastUpdated = now
  profile.totalSessions += 1
  
  // Update session counts by subject
  const subjectKey = newSession.subject
  profile.sessionsBySubject[subjectKey] = (profile.sessionsBySubject[subjectKey] || 0) + 1
  
  // Update rolling stats (exponential moving average)
  const alpha = 2 / (TELEMETRY_CONFIG.ROLLING_WINDOW_SIZE + 1) // EMA smoothing factor
  
  profile.rollingStats = {
    avgTimePerProblem: ema(
      profile.rollingStats.avgTimePerProblem,
      newSession.signals.totalTimeMs,
      alpha
    ),
    avgActiveRatio: ema(
      profile.rollingStats.avgActiveRatio,
      newSession.signals.activeTimeMs / Math.max(1, newSession.signals.totalTimeMs),
      alpha
    ),
    avgRevisionRate: ema(
      profile.rollingStats.avgRevisionRate,
      newSession.signals.revisionCount / Math.max(1, newSession.signals.totalTimeMs / 60000),
      alpha
    ),
    avgPauseLength: ema(
      profile.rollingStats.avgPauseLength,
      newSession.signals.avgPauseLengthMs,
      alpha
    ),
    avgKeystrokeRate: ema(
      profile.rollingStats.avgKeystrokeRate,
      newSession.signals.keystrokeRate,
      alpha
    )
  }
  
  // Update patterns after enough sessions
  if (profile.totalSessions >= TELEMETRY_CONFIG.MIN_SESSIONS_FOR_PATTERNS) {
    profile.patterns = updatePatterns(profile.patterns, newSession)
  }
  
  // Update metrics
  profile.metrics = updateMetrics(profile.metrics, newSession)
  
  return profile
}

/**
 * Create initial profile from first session
 */
function createInitialProfile(session: SessionTelemetry): TelemetryProfile {
  const signals = session.signals
  
  return {
    userId: session.userId,
    lastUpdated: new Date(),
    totalSessions: 1,
    sessionsBySubject: {
      [session.subject]: 1
    },
    rollingStats: {
      avgTimePerProblem: signals.totalTimeMs,
      avgActiveRatio: signals.activeTimeMs / Math.max(1, signals.totalTimeMs),
      avgRevisionRate: signals.revisionCount / Math.max(1, signals.totalTimeMs / 60000),
      avgPauseLength: signals.avgPauseLengthMs,
      avgKeystrokeRate: signals.keystrokeRate
    },
    patterns: {
      typicalPauseLengths: signals.pausePattern,
      typicalFirstKeystrokeTime: signals.firstKeystrokeMs,
      revisionPatterns: []
    },
    metrics: {
      quickCorrectRate: session.outcome?.correct && signals.totalTimeMs < 30000 ? 1 : 0,
      slowIncorrectRate: !session.outcome?.correct && signals.totalTimeMs > 120000 ? 1 : 0,
      revisionLeadsToCorrect: session.outcome?.correct && signals.revisionCount > 0 ? 1 : 0,
      hintEffectiveness: session.outcome?.correct && signals.hintViews > 0 ? 1 : 0
    }
  }
}

/**
 * Update pattern detection
 */
function updatePatterns(
  existingPatterns: TelemetryProfile['patterns'],
  session: SessionTelemetry
): TelemetryProfile['patterns'] {
  const signals = session.signals
  
  // Update typical pause lengths (keep last 50)
  const pauseLengths = [
    ...existingPatterns.typicalPauseLengths,
    ...signals.pausePattern
  ].slice(-50)
  
  // Update typical first keystroke time (EMA)
  const typicalFirstKeystroke = ema(
    existingPatterns.typicalFirstKeystrokeTime,
    signals.firstKeystrokeMs,
    0.1
  )
  
  // Detect revision patterns
  const revisionPatterns = detectRevisionPatterns(
    existingPatterns.revisionPatterns,
    session
  )
  
  return {
    typicalPauseLengths: pauseLengths,
    typicalFirstKeystrokeTime: typicalFirstKeystroke,
    revisionPatterns
  }
}

/**
 * Detect common revision patterns
 */
function detectRevisionPatterns(
  existingPatterns: RevisionPattern[],
  session: SessionTelemetry
): RevisionPattern[] {
  const patterns = [...existingPatterns]
  const signals = session.signals
  const isCorrect = session.outcome?.correct ?? false
  
  // Pattern: High deletion ratio
  if (signals.deletionRatio > 0.3) {
    updateOrAddPattern(patterns, 'high_deletion', isCorrect)
  }
  
  // Pattern: Many major revisions
  if (signals.majorRevisions > 3) {
    updateOrAddPattern(patterns, 'many_major_revisions', isCorrect)
  }
  
  // Pattern: Revision after long pause
  if (signals.maxPauseLengthMs > 10000 && signals.revisionCount > 0) {
    updateOrAddPattern(patterns, 'revision_after_pause', isCorrect)
  }
  
  // Pattern: Progressive refinement (multiple small revisions)
  if (signals.revisionCount > 5 && signals.majorRevisions < 2) {
    updateOrAddPattern(patterns, 'progressive_refinement', isCorrect)
  }
  
  return patterns.slice(-10) // Keep top 10 patterns
}

function updateOrAddPattern(
  patterns: RevisionPattern[],
  description: string,
  correct: boolean
): void {
  const existing = patterns.find(p => p.description === description)
  
  if (existing) {
    existing.frequency += 1
    // Update associatedWithCorrect using running average
    existing.associatedWithCorrect = (
      (existing.associatedWithCorrect && existing.frequency > 1) || correct
    )
  } else {
    patterns.push({
      description,
      frequency: 1,
      associatedWithCorrect: correct
    })
  }
}

/**
 * Update computed metrics
 */
function updateMetrics(
  existingMetrics: TelemetryProfile['metrics'],
  session: SessionTelemetry
): TelemetryProfile['metrics'] {
  const signals = session.signals
  const isCorrect = session.outcome?.correct ?? false
  const alpha = 0.1 // Smoothing factor for metrics
  
  // Quick correct: correct answer in under 30 seconds
  const isQuickCorrect = isCorrect && signals.totalTimeMs < 30000
  
  // Slow incorrect: incorrect answer after over 2 minutes
  const isSlowIncorrect = !isCorrect && signals.totalTimeMs > 120000
  
  // Revision leads to correct
  const revisionHelped = isCorrect && signals.revisionCount > 0
  
  // Hint effectiveness
  const hintHelped = isCorrect && signals.hintViews > 0
  
  return {
    quickCorrectRate: ema(
      existingMetrics.quickCorrectRate,
      isQuickCorrect ? 1 : 0,
      alpha
    ),
    slowIncorrectRate: ema(
      existingMetrics.slowIncorrectRate,
      isSlowIncorrect ? 1 : 0,
      alpha
    ),
    revisionLeadsToCorrect: ema(
      existingMetrics.revisionLeadsToCorrect,
      revisionHelped ? 1 : 0,
      alpha
    ),
    hintEffectiveness: ema(
      existingMetrics.hintEffectiveness,
      hintHelped ? 1 : 0,
      alpha
    )
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Exponential Moving Average
 */
function ema(previous: number, current: number, alpha: number): number {
  return alpha * current + (1 - alpha) * previous
}

// ============================================================================
// Signal Analysis
// ============================================================================

/**
 * Compare a session's signals to the user's typical patterns
 * Returns deviation scores (positive = higher than typical)
 */
export function analyzeSignalDeviations(
  session: SessionTelemetry,
  profile: TelemetryProfile
): Record<string, number> {
  const signals = session.signals
  const typical = profile.rollingStats
  
  return {
    timeDeviation: (signals.totalTimeMs - typical.avgTimePerProblem) / typical.avgTimePerProblem,
    activeRatioDeviation: (signals.activeTimeMs / signals.totalTimeMs) - typical.avgActiveRatio,
    revisionRateDeviation: (signals.revisionCount / (signals.totalTimeMs / 60000)) - typical.avgRevisionRate,
    pauseLengthDeviation: (signals.avgPauseLengthMs - typical.avgPauseLength) / Math.max(1, typical.avgPauseLength),
    keystrokeRateDeviation: (signals.keystrokeRate - typical.avgKeystrokeRate) / Math.max(1, typical.avgKeystrokeRate)
  }
}

/**
 * Detect anomalies in session behavior
 */
export function detectBehavioralAnomalies(
  session: SessionTelemetry,
  profile: TelemetryProfile
): string[] {
  const deviations = analyzeSignalDeviations(session, profile)
  const anomalies: string[] = []
  
  // More than 2x typical time
  if (deviations.timeDeviation > 1) {
    anomalies.push('unusually_long_session')
  }
  
  // Much less active than typical
  if (deviations.activeRatioDeviation < -0.2) {
    anomalies.push('low_activity')
  }
  
  // High revision rate
  if (deviations.revisionRateDeviation > 0.5) {
    anomalies.push('high_revision_rate')
  }
  
  // Long pauses
  if (deviations.pauseLengthDeviation > 1) {
    anomalies.push('long_pauses')
  }
  
  // Low keystroke rate
  if (deviations.keystrokeRateDeviation < -0.5) {
    anomalies.push('slow_typing')
  }
  
  return anomalies
}
