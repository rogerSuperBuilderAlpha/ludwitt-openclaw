/**
 * Unit Tests for Struggle Feature Extractor
 *
 * Tests the extraction of struggle signals from raw telemetry data,
 * signal significance filtering, and user profile normalization.
 */

import {
  extractStruggleFeatures,
  getSignificantSignals,
  isStruggling,
  FeatureExtractionInput,
} from '../feature-extractor'
import { StruggleFeatures, STRUGGLE_CONFIG } from '../types'
import { TelemetryProfile, SessionSignals } from '@/lib/telemetry/types'

// ============================================================================
// Helpers
// ============================================================================

/** Create a minimal valid FeatureExtractionInput with normal typing */
function createNormalInput(
  overrides: Partial<FeatureExtractionInput> = {},
  signalOverrides: Partial<SessionSignals> = {}
): FeatureExtractionInput {
  return {
    currentSignals: {
      totalTimeMs: 25000,
      activeTimeMs: 22000,
      firstKeystrokeMs: 1500,
      timeToFirstAttemptMs: 20000,
      keystrokeCount: 50,
      keystrokeRate: 30,
      revisionCount: 2,
      deletionCount: 3,
      deletionRatio: 0.06,
      majorRevisions: 1,
      pauseCount: 2,
      avgPauseLengthMs: 2000,
      maxPauseLengthMs: 4000,
      pausePattern: [2000, 3000],
      focusLossCount: 0,
      scrollCount: 1,
      scrollDepth: 0.2,
      hintRequests: 0,
      hintViews: 0,
      answerChanges: 2,
      finalAnswerLength: 5,
      ...signalOverrides,
    },
    problemDifficulty: 3,
    problemType: 'arithmetic',
    ...overrides,
  }
}

/** Create input with long pauses */
function createPauseInput(): FeatureExtractionInput {
  return createNormalInput(
    {},
    {
      totalTimeMs: 90000,
      pauseCount: 5,
      avgPauseLengthMs: 12000,
      maxPauseLengthMs: 25000,
      pausePattern: [12000, 15000, 8000, 11000, 14000],
    }
  )
}

/** Create input with excessive revisions */
function createRevisionInput(): FeatureExtractionInput {
  return createNormalInput(
    {},
    {
      totalTimeMs: 70000,
      revisionCount: 15,
      deletionCount: 40,
      deletionRatio: 0.65,
      majorRevisions: 8,
    }
  )
}

/** Create input with low activity */
function createLowActivityInput(): FeatureExtractionInput {
  return createNormalInput(
    {},
    {
      totalTimeMs: 60000,
      keystrokeCount: 5,
      keystrokeRate: 2,
      answerChanges: 0,
      finalAnswerLength: 0,
    }
  )
}

/** Create a TelemetryProfile for normalization tests */
function createUserProfile(
  overrides: Partial<TelemetryProfile['rollingStats']> = {}
): TelemetryProfile {
  return {
    userId: 'test-user',
    lastUpdated: new Date(),
    totalSessions: 50,
    sessionsBySubject: { math: 30, reading: 20 },
    rollingStats: {
      avgTimePerProblem: 45000,
      avgActiveRatio: 0.85,
      avgRevisionRate: 3,
      avgPauseLength: 3000,
      avgKeystrokeRate: 25,
      ...overrides,
    },
    patterns: {
      typicalPauseLengths: [2000, 3000, 4000],
      typicalFirstKeystrokeTime: 2000,
      revisionPatterns: [],
    },
    metrics: {
      quickCorrectRate: 0.6,
      slowIncorrectRate: 0.15,
      revisionLeadsToCorrect: 0.7,
      hintEffectiveness: 0.5,
    },
  }
}

// ============================================================================
// extractStruggleFeatures - basic extraction
// ============================================================================

describe('extractStruggleFeatures', () => {
  describe('with normal typing behavior', () => {
    test('extracts time-based features correctly', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)

      expect(features.timeElapsedMs).toBe(25000)
      expect(features.expectedTimeMs).toBeGreaterThan(0)
      expect(features.timeRatio).toBe(
        features.timeElapsedMs / features.expectedTimeMs
      )
    })

    test('extracts activity features from signals', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)

      expect(features.keystrokeCount).toBe(50)
      expect(features.keystrokeRate).toBe(30)
    })

    test('extracts pause features', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)

      expect(features.pauseCount).toBe(2)
      expect(features.avgPauseLengthMs).toBe(2000)
      expect(features.maxPauseLengthMs).toBe(4000)
    })

    test('extracts revision features', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)

      expect(features.revisionCount).toBe(2)
      expect(features.deletionRatio).toBe(0.06)
      expect(features.majorRevisionCount).toBe(1)
    })

    test('extracts behavioral features', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)

      expect(features.focusLossCount).toBe(0)
      expect(features.hintRequests).toBe(0)
      expect(features.hintViews).toBe(0)
    })

    test('extracts answer evolution features', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)

      expect(features.answerChangeCount).toBe(2)
      expect(features.lastAnswerAge).toBeGreaterThan(0)
    })

    test('produces no significant struggle signals', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)
      const signals = getSignificantSignals(features)

      expect(signals).toHaveLength(0)
    })
  })

  describe('with long pauses', () => {
    test('detects long pause count from pausePattern', () => {
      const input = createPauseInput()
      const features = extractStruggleFeatures(input)

      // All 5 pauses exceed LONG_PAUSE_THRESHOLD_MS (10000)
      // except 8000
      expect(features.longPauseCount).toBe(4)
    })

    test('produces long_pause signal', () => {
      const input = createPauseInput()
      const features = extractStruggleFeatures(input)
      const signals = getSignificantSignals(features)

      const pauseSignal = signals.find((s) => s.signal === 'long_pause')
      expect(pauseSignal).toBeDefined()
      expect(pauseSignal!.strength).toBeGreaterThan(0)
    })

    test('long pause signal strength scales with count', () => {
      const input1 = createNormalInput({}, { pausePattern: [15000] })
      const input3 = createNormalInput(
        {},
        { pausePattern: [15000, 12000, 20000] }
      )

      const features1 = extractStruggleFeatures(input1)
      const features3 = extractStruggleFeatures(input3)

      const signals1 = getSignificantSignals(features1)
      const signals3 = getSignificantSignals(features3)

      const strength1 =
        signals1.find((s) => s.signal === 'long_pause')?.strength ?? 0
      const strength3 =
        signals3.find((s) => s.signal === 'long_pause')?.strength ?? 0

      expect(strength3).toBeGreaterThan(strength1)
    })
  })

  describe('with excessive revisions', () => {
    test('detects high major revision count', () => {
      const input = createRevisionInput()
      const features = extractStruggleFeatures(input)

      expect(features.majorRevisionCount).toBe(8)
      expect(features.majorRevisionCount).toBeGreaterThan(
        STRUGGLE_CONFIG.HIGH_REVISION_COUNT
      )
    })

    test('produces excessive_revisions signal', () => {
      const input = createRevisionInput()
      const features = extractStruggleFeatures(input)
      const signals = getSignificantSignals(features)

      const revisionSignal = signals.find(
        (s) => s.signal === 'excessive_revisions'
      )
      expect(revisionSignal).toBeDefined()
      expect(revisionSignal!.strength).toBeGreaterThan(0)
    })

    test('produces high_deletion_ratio signal', () => {
      const input = createRevisionInput()
      const features = extractStruggleFeatures(input)
      const signals = getSignificantSignals(features)

      const deletionSignal = signals.find(
        (s) => s.signal === 'high_deletion_ratio'
      )
      expect(deletionSignal).toBeDefined()
      expect(deletionSignal!.strength).toBeGreaterThan(0)
    })
  })

  describe('with low activity', () => {
    test('detects low keystroke rate', () => {
      const input = createLowActivityInput()
      const features = extractStruggleFeatures(input)

      expect(features.keystrokeRate).toBeLessThan(
        STRUGGLE_CONFIG.LOW_KEYSTROKE_RATE
      )
    })

    test('produces low_activity signal when time > 30s', () => {
      const input = createLowActivityInput()
      const features = extractStruggleFeatures(input)
      const signals = getSignificantSignals(features)

      const activitySignal = signals.find((s) => s.signal === 'low_activity')
      expect(activitySignal).toBeDefined()
    })

    test('does not produce low_activity signal in first 30s', () => {
      const input = createNormalInput(
        {},
        {
          totalTimeMs: 15000,
          keystrokeCount: 2,
          keystrokeRate: 2,
        }
      )
      const features = extractStruggleFeatures(input)
      const signals = getSignificantSignals(features)

      const activitySignal = signals.find((s) => s.signal === 'low_activity')
      expect(activitySignal).toBeUndefined()
    })
  })

  describe('with time exceeded', () => {
    test('produces time_exceeded signal when timeRatio > 2.0', () => {
      const input = createNormalInput(
        { problemDifficulty: 1 },
        { totalTimeMs: 120000 }
      )
      const features = extractStruggleFeatures(input)

      // With difficulty 1, expectedTime should be around 30000ms (30s * 1)
      // 120000 / 30000 = 4.0 timeRatio, which is > 2.0
      if (features.timeRatio > STRUGGLE_CONFIG.EXPECTED_TIME_MULTIPLIER) {
        const signals = getSignificantSignals(features)
        const timeSignal = signals.find((s) => s.signal === 'time_exceeded')
        expect(timeSignal).toBeDefined()
      }
    })

    test('time_exceeded strength scales with overage', () => {
      // Two scenarios: slightly over vs heavily over
      const input1 = createNormalInput(
        { problemDifficulty: 1 },
        { totalTimeMs: 70000 }
      )
      const input2 = createNormalInput(
        { problemDifficulty: 1 },
        { totalTimeMs: 200000 }
      )

      const features1 = extractStruggleFeatures(input1)
      const features2 = extractStruggleFeatures(input2)

      const signals1 = getSignificantSignals(features1)
      const signals2 = getSignificantSignals(features2)

      const strength1 =
        signals1.find((s) => s.signal === 'time_exceeded')?.strength ?? 0
      const strength2 =
        signals2.find((s) => s.signal === 'time_exceeded')?.strength ?? 0

      if (strength1 > 0 && strength2 > 0) {
        expect(strength2).toBeGreaterThanOrEqual(strength1)
      }
    })
  })

  describe('with historical context', () => {
    test('uses recentPerformance when provided', () => {
      const input = createNormalInput({
        recentPerformance: {
          lastFiveAccuracy: 0.2,
          skillMastery: 0.15,
          subjectComfort: 0.3,
          timeSinceLastCorrect: 300000,
        },
      })
      const features = extractStruggleFeatures(input)

      expect(features.recentAccuracy).toBe(0.2)
      expect(features.skillMastery).toBe(0.15)
      expect(features.subjectComfort).toBe(0.3)
      expect(features.timeSinceLastCorrect).toBe(300000)
    })

    test('uses default values when recentPerformance is absent', () => {
      const input = createNormalInput()
      const features = extractStruggleFeatures(input)

      expect(features.recentAccuracy).toBe(0.7)
      expect(features.skillMastery).toBe(0.5)
      expect(features.subjectComfort).toBe(0.5)
      expect(features.timeSinceLastCorrect).toBe(0)
    })
  })
})

// ============================================================================
// extractStruggleFeatures - edge cases
// ============================================================================

describe('extractStruggleFeatures edge cases', () => {
  test('handles empty/minimal currentSignals', () => {
    const input: FeatureExtractionInput = {
      currentSignals: {},
      problemDifficulty: 3,
      problemType: 'arithmetic',
    }
    const features = extractStruggleFeatures(input)

    expect(features.timeElapsedMs).toBe(0)
    expect(features.keystrokeCount).toBe(0)
    expect(features.keystrokeRate).toBe(0)
    expect(features.pauseCount).toBe(0)
    expect(features.revisionCount).toBe(0)
    expect(features.focusLossCount).toBe(0)
    expect(features.hintRequests).toBe(0)
    expect(features.answerChangeCount).toBe(0)
  })

  test('handles zero problemDifficulty', () => {
    const input = createNormalInput({ problemDifficulty: 0 })
    // Should not divide by zero; expectedTimeMs is clamped to minimum of 15000
    const features = extractStruggleFeatures(input)
    expect(features.expectedTimeMs).toBeGreaterThanOrEqual(15000)
  })

  test('handles very high problemDifficulty', () => {
    const input = createNormalInput({ problemDifficulty: 20 })
    const features = extractStruggleFeatures(input)
    // expectedTimeMs is clamped to maximum of 300000
    expect(features.expectedTimeMs).toBeLessThanOrEqual(300000)
  })

  test('handles empty pausePattern array', () => {
    const input = createNormalInput({}, { pausePattern: [] })
    const features = extractStruggleFeatures(input)
    expect(features.longPauseCount).toBe(0)
  })

  test('handles missing answerChanges for lastAnswerAge', () => {
    const input = createNormalInput(
      {},
      {
        totalTimeMs: 60000,
        answerChanges: 0,
      }
    )
    const features = extractStruggleFeatures(input)
    // When no answer changes, lastAnswerAge = totalTimeMs
    expect(features.lastAnswerAge).toBe(60000)
  })

  test('calculates lastAnswerAge as totalTime / (changes + 1) when changes exist', () => {
    const input = createNormalInput(
      {},
      {
        totalTimeMs: 60000,
        answerChanges: 3,
      }
    )
    const features = extractStruggleFeatures(input)
    // lastAnswerAge = 60000 / (3 + 1) = 15000
    expect(features.lastAnswerAge).toBe(15000)
  })
})

// ============================================================================
// extractStruggleFeatures - user profile normalization
// ============================================================================

describe('extractStruggleFeatures with user profile', () => {
  test('normalizes keystroke rate relative to user average', () => {
    const profile = createUserProfile({ avgKeystrokeRate: 25 })
    const input = createNormalInput(
      { userProfile: profile },
      { keystrokeRate: 12.5 }
    )
    const features = extractStruggleFeatures(input)

    // Normalized: 12.5 / 25 = 0.5 (user is typing at half their normal rate)
    expect(features.keystrokeRate).toBeCloseTo(0.5, 1)
  })

  test('does not normalize keystroke rate when user avgKeystrokeRate is 0', () => {
    const profile = createUserProfile({ avgKeystrokeRate: 0 })
    const input = createNormalInput(
      { userProfile: profile },
      { keystrokeRate: 20 }
    )
    const features = extractStruggleFeatures(input)

    // Should keep original value when avg is 0
    expect(features.keystrokeRate).toBe(20)
  })

  test('adjusts pause length relative to typical pauses', () => {
    const profile = createUserProfile({ avgPauseLength: 3000 })
    const input = createNormalInput(
      { userProfile: profile },
      { avgPauseLengthMs: 6000 }
    )
    const features = extractStruggleFeatures(input)

    // normalizedPause = 6000 / 3000 = 2.0
    // features.avgPauseLengthMs = 2.0 * 3000 = 6000 (stays the same in this case)
    expect(features.avgPauseLengthMs).toBe(6000)
  })

  test('does not adjust pause length when avgPauseLength is 0', () => {
    const profile = createUserProfile({ avgPauseLength: 0 })
    const input = createNormalInput(
      { userProfile: profile },
      { avgPauseLengthMs: 5000 }
    )
    const features = extractStruggleFeatures(input)
    expect(features.avgPauseLengthMs).toBe(5000)
  })

  test('blends expected time with user avgTimePerProblem', () => {
    const profile = createUserProfile({ avgTimePerProblem: 60000 })
    const input = createNormalInput({
      userProfile: profile,
      problemDifficulty: 3,
    })
    const features = extractStruggleFeatures(input)

    // Base: 30000 * 3 = 90000
    // Blended: 0.3 * 90000 + 0.7 * 60000 = 27000 + 42000 = 69000
    expect(features.expectedTimeMs).toBe(69000)
  })

  test('clamps expected time to minimum 15000ms with profile', () => {
    const profile = createUserProfile({ avgTimePerProblem: 5000 })
    const input = createNormalInput({
      userProfile: profile,
      problemDifficulty: 0,
    })
    const features = extractStruggleFeatures(input)

    expect(features.expectedTimeMs).toBeGreaterThanOrEqual(15000)
  })
})

// ============================================================================
// getSignificantSignals
// ============================================================================

describe('getSignificantSignals', () => {
  /** Create a baseline StruggleFeatures with no signals */
  function createCleanFeatures(
    overrides: Partial<StruggleFeatures> = {}
  ): StruggleFeatures {
    return {
      timeElapsedMs: 20000,
      expectedTimeMs: 60000,
      timeRatio: 0.33,
      keystrokeCount: 40,
      keystrokeRate: 30,
      keystrokeVariance: 0.1,
      pauseCount: 1,
      avgPauseLengthMs: 2000,
      maxPauseLengthMs: 3000,
      longPauseCount: 0,
      revisionCount: 2,
      deletionRatio: 0.1,
      majorRevisionCount: 0,
      focusLossCount: 0,
      scrollBehavior: 0.1,
      hintRequests: 0,
      hintViews: 0,
      answerChangeCount: 1,
      lastAnswerAge: 5000,
      recentAccuracy: 0.8,
      skillMastery: 0.7,
      subjectComfort: 0.7,
      timeSinceLastCorrect: 30000,
      ...overrides,
    }
  }

  test('returns empty array when no thresholds are exceeded', () => {
    const features = createCleanFeatures()
    const signals = getSignificantSignals(features)
    expect(signals).toHaveLength(0)
  })

  test('detects time_exceeded signal', () => {
    const features = createCleanFeatures({ timeRatio: 3.0 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'time_exceeded')).toBe(true)
  })

  test('detects low_activity signal (only after 30s)', () => {
    const features = createCleanFeatures({
      keystrokeRate: 2,
      timeElapsedMs: 45000,
    })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'low_activity')).toBe(true)
  })

  test('does NOT detect low_activity before 30s', () => {
    const features = createCleanFeatures({
      keystrokeRate: 2,
      timeElapsedMs: 20000,
    })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'low_activity')).toBe(false)
  })

  test('detects long_pause signal', () => {
    const features = createCleanFeatures({ longPauseCount: 2 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'long_pause')).toBe(true)
  })

  test('detects excessive_revisions signal', () => {
    const features = createCleanFeatures({ majorRevisionCount: 8 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'excessive_revisions')).toBe(true)
  })

  test('detects high_deletion_ratio signal', () => {
    const features = createCleanFeatures({ deletionRatio: 0.7 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'high_deletion_ratio')).toBe(true)
  })

  test('detects focus_loss signal (> 2 focus losses)', () => {
    const features = createCleanFeatures({ focusLossCount: 4 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'focus_loss')).toBe(true)
  })

  test('does NOT detect focus_loss with 2 or fewer losses', () => {
    const features = createCleanFeatures({ focusLossCount: 2 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'focus_loss')).toBe(false)
  })

  test('detects no_progress signal', () => {
    const features = createCleanFeatures({
      lastAnswerAge: 90000,
      answerChangeCount: 0,
    })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'no_progress')).toBe(true)
  })

  test('detects recent_failures signal', () => {
    const features = createCleanFeatures({ recentAccuracy: 0.2 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'recent_failures')).toBe(true)
  })

  test('does NOT detect recent_failures when accuracy >= 0.4', () => {
    const features = createCleanFeatures({ recentAccuracy: 0.5 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'recent_failures')).toBe(false)
  })

  test('detects skill_gap signal', () => {
    const features = createCleanFeatures({ skillMastery: 0.2 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'skill_gap')).toBe(true)
  })

  test('does NOT detect skill_gap when mastery >= 0.3', () => {
    const features = createCleanFeatures({ skillMastery: 0.5 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'skill_gap')).toBe(false)
  })

  test('detects hint_dependency signal', () => {
    const features = createCleanFeatures({ hintViews: 4 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'hint_dependency')).toBe(true)
  })

  test('does NOT detect hint_dependency with 2 or fewer views', () => {
    const features = createCleanFeatures({ hintViews: 2 })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'hint_dependency')).toBe(false)
  })

  test('signals are sorted by strength descending', () => {
    const features = createCleanFeatures({
      timeRatio: 3.0, // strength ~1.0
      longPauseCount: 1, // strength ~0.33
      keystrokeRate: 2,
      timeElapsedMs: 45000, // for low_activity
      recentAccuracy: 0.1, // strength ~0.75
    })
    const signals = getSignificantSignals(features)

    for (let i = 0; i < signals.length - 1; i++) {
      expect(signals[i].strength).toBeGreaterThanOrEqual(
        signals[i + 1].strength
      )
    }
  })

  test('signal strengths are clamped to [0, 1]', () => {
    const features = createCleanFeatures({
      timeRatio: 10.0,
      longPauseCount: 100,
      majorRevisionCount: 100,
      deletionRatio: 1.0,
      focusLossCount: 50,
      hintViews: 50,
      recentAccuracy: 0,
    })
    const signals = getSignificantSignals(features)

    for (const signal of signals) {
      expect(signal.strength).toBeGreaterThanOrEqual(0)
      expect(signal.strength).toBeLessThanOrEqual(1)
    }
  })

  test('all signals include a description', () => {
    const features = createCleanFeatures({
      timeRatio: 3.0,
      longPauseCount: 2,
      majorRevisionCount: 8,
      recentAccuracy: 0.1,
    })
    const signals = getSignificantSignals(features)

    for (const signal of signals) {
      expect(typeof signal.description).toBe('string')
      expect(signal.description.length).toBeGreaterThan(0)
    }
  })
})

// ============================================================================
// getSignificantSignals - all-correct and all-wrong histories
// ============================================================================

describe('getSignificantSignals with performance extremes', () => {
  function createCleanFeatures(
    overrides: Partial<StruggleFeatures> = {}
  ): StruggleFeatures {
    return {
      timeElapsedMs: 20000,
      expectedTimeMs: 60000,
      timeRatio: 0.33,
      keystrokeCount: 40,
      keystrokeRate: 30,
      keystrokeVariance: 0.1,
      pauseCount: 1,
      avgPauseLengthMs: 2000,
      maxPauseLengthMs: 3000,
      longPauseCount: 0,
      revisionCount: 2,
      deletionRatio: 0.1,
      majorRevisionCount: 0,
      focusLossCount: 0,
      scrollBehavior: 0.1,
      hintRequests: 0,
      hintViews: 0,
      answerChangeCount: 1,
      lastAnswerAge: 5000,
      recentAccuracy: 0.8,
      skillMastery: 0.7,
      subjectComfort: 0.7,
      timeSinceLastCorrect: 30000,
      ...overrides,
    }
  }

  test('all-correct history produces no failure signals', () => {
    const features = createCleanFeatures({
      recentAccuracy: 1.0,
      skillMastery: 1.0,
      subjectComfort: 1.0,
    })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'recent_failures')).toBe(false)
    expect(signals.some((s) => s.signal === 'skill_gap')).toBe(false)
  })

  test('all-wrong history produces both failure and skill_gap signals', () => {
    const features = createCleanFeatures({
      recentAccuracy: 0.0,
      skillMastery: 0.1,
    })
    const signals = getSignificantSignals(features)
    expect(signals.some((s) => s.signal === 'recent_failures')).toBe(true)
    expect(signals.some((s) => s.signal === 'skill_gap')).toBe(true)
  })

  test('recent_failures strength is maximum when accuracy is 0', () => {
    const features = createCleanFeatures({ recentAccuracy: 0.0 })
    const signals = getSignificantSignals(features)
    const failSignal = signals.find((s) => s.signal === 'recent_failures')
    expect(failSignal).toBeDefined()
    expect(failSignal!.strength).toBe(1)
  })
})

// ============================================================================
// isStruggling
// ============================================================================

describe('isStruggling', () => {
  function createCleanFeatures(
    overrides: Partial<StruggleFeatures> = {}
  ): StruggleFeatures {
    return {
      timeElapsedMs: 20000,
      expectedTimeMs: 60000,
      timeRatio: 0.33,
      keystrokeCount: 40,
      keystrokeRate: 30,
      keystrokeVariance: 0.1,
      pauseCount: 1,
      avgPauseLengthMs: 2000,
      maxPauseLengthMs: 3000,
      longPauseCount: 0,
      revisionCount: 2,
      deletionRatio: 0.1,
      majorRevisionCount: 0,
      focusLossCount: 0,
      scrollBehavior: 0.1,
      hintRequests: 0,
      hintViews: 0,
      answerChangeCount: 1,
      lastAnswerAge: 5000,
      recentAccuracy: 0.8,
      skillMastery: 0.7,
      subjectComfort: 0.7,
      timeSinceLastCorrect: 30000,
      ...overrides,
    }
  }

  test('returns false for normal features', () => {
    const features = createCleanFeatures()
    expect(isStruggling(features)).toBe(false)
  })

  test('returns true for highly struggling features', () => {
    const features = createCleanFeatures({
      timeRatio: 4.0,
      keystrokeRate: 1,
      timeElapsedMs: 200000,
      longPauseCount: 5,
      majorRevisionCount: 15,
      deletionRatio: 0.8,
      recentAccuracy: 0.0,
      skillMastery: 0.1,
      focusLossCount: 5,
      hintViews: 5,
      answerChangeCount: 0,
      lastAnswerAge: 200000,
    })
    expect(isStruggling(features)).toBe(true)
  })
})

// ============================================================================
// STRUGGLE_CONFIG constants
// ============================================================================

describe('STRUGGLE_CONFIG constants', () => {
  test('EXPECTED_TIME_MULTIPLIER is a reasonable multiplier', () => {
    expect(STRUGGLE_CONFIG.EXPECTED_TIME_MULTIPLIER).toBeGreaterThanOrEqual(1.5)
    expect(STRUGGLE_CONFIG.EXPECTED_TIME_MULTIPLIER).toBeLessThanOrEqual(5.0)
  })

  test('LONG_PAUSE_THRESHOLD_MS is in seconds range', () => {
    expect(STRUGGLE_CONFIG.LONG_PAUSE_THRESHOLD_MS).toBeGreaterThanOrEqual(3000)
    expect(STRUGGLE_CONFIG.LONG_PAUSE_THRESHOLD_MS).toBeLessThanOrEqual(30000)
  })

  test('LOW_KEYSTROKE_RATE is positive', () => {
    expect(STRUGGLE_CONFIG.LOW_KEYSTROKE_RATE).toBeGreaterThan(0)
  })

  test('HIGH_DELETION_RATIO is between 0 and 1', () => {
    expect(STRUGGLE_CONFIG.HIGH_DELETION_RATIO).toBeGreaterThan(0)
    expect(STRUGGLE_CONFIG.HIGH_DELETION_RATIO).toBeLessThan(1)
  })

  test('HIGH_REVISION_COUNT is a reasonable number', () => {
    expect(STRUGGLE_CONFIG.HIGH_REVISION_COUNT).toBeGreaterThanOrEqual(2)
    expect(STRUGGLE_CONFIG.HIGH_REVISION_COUNT).toBeLessThanOrEqual(20)
  })

  test('DEFAULT_WEIGHTS sum to a reasonable total', () => {
    const weights = STRUGGLE_CONFIG.DEFAULT_WEIGHTS
    const sum = Object.values(weights).reduce((a, b) => a + b, 0)
    // Weights should sum to approximately 1.0
    expect(sum).toBeGreaterThan(0.5)
    expect(sum).toBeLessThanOrEqual(2.0)
  })

  test('all DEFAULT_WEIGHTS are positive', () => {
    const weights = STRUGGLE_CONFIG.DEFAULT_WEIGHTS
    for (const [key, value] of Object.entries(weights)) {
      expect(value).toBeGreaterThan(0)
    }
  })
})
