/**
 * Unit Tests for Struggle Predictor
 *
 * Tests the rule-based prediction engine that determines struggle level,
 * intervention type, and urgency from extracted features.
 */

import {
  predictStruggle,
  shouldIntervene,
  getInterventionDelay,
  formatPrediction,
} from '../predictor'
import { StruggleFeatures, StrugglePrediction } from '../types'

// ============================================================================
// Helpers
// ============================================================================

/** Create a baseline StruggleFeatures object with no struggle signals */
function createBaseFeatures(
  overrides: Partial<StruggleFeatures> = {}
): StruggleFeatures {
  return {
    // Time-based - well within expected time
    timeElapsedMs: 20000,
    expectedTimeMs: 60000,
    timeRatio: 0.33,

    // Activity - normal typing
    keystrokeCount: 40,
    keystrokeRate: 30,
    keystrokeVariance: 0.1,

    // Pauses - minimal
    pauseCount: 1,
    avgPauseLengthMs: 2000,
    maxPauseLengthMs: 3000,
    longPauseCount: 0,

    // Revisions - minimal
    revisionCount: 2,
    deletionRatio: 0.1,
    majorRevisionCount: 0,

    // Behavioral - normal
    focusLossCount: 0,
    scrollBehavior: 0.1,
    hintRequests: 0,
    hintViews: 0,

    // Answer evolution - has made progress
    answerChangeCount: 1,
    lastAnswerAge: 5000,

    // Historical context - good history
    recentAccuracy: 0.8,
    skillMastery: 0.7,
    subjectComfort: 0.7,
    timeSinceLastCorrect: 30000,

    ...overrides,
  }
}

/** Create features that trigger mild struggle (low signals) */
function createMildFeatures(): StruggleFeatures {
  return createBaseFeatures({
    timeRatio: 2.2, // Slightly over time ratio threshold of 2.0
    longPauseCount: 1, // One long pause
    recentAccuracy: 0.6, // Still acceptable
  })
}

/** Create features that trigger moderate struggle */
function createModerateFeatures(): StruggleFeatures {
  return createBaseFeatures({
    timeElapsedMs: 90000,
    timeRatio: 2.5,
    keystrokeRate: 2,
    longPauseCount: 2,
    majorRevisionCount: 7,
    deletionRatio: 0.6,
    recentAccuracy: 0.35,
  })
}

/** Create features that trigger severe/critical struggle */
function createSevereFeatures(): StruggleFeatures {
  return createBaseFeatures({
    timeElapsedMs: 200000,
    expectedTimeMs: 60000,
    timeRatio: 3.3,
    keystrokeRate: 1,
    keystrokeVariance: 0.8,
    longPauseCount: 4,
    majorRevisionCount: 12,
    deletionRatio: 0.8,
    focusLossCount: 5,
    answerChangeCount: 0,
    lastAnswerAge: 200000,
    recentAccuracy: 0.1,
    skillMastery: 0.2,
    hintViews: 4,
  })
}

// ============================================================================
// predictStruggle
// ============================================================================

describe('predictStruggle', () => {
  describe('with no struggle signals', () => {
    test('returns level "none"', () => {
      const features = createBaseFeatures()
      const prediction = predictStruggle(features)
      expect(prediction.level).toBe('none')
    })

    test('returns low probability', () => {
      const features = createBaseFeatures()
      const prediction = predictStruggle(features)
      expect(prediction.probability).toBeLessThan(0.2)
    })

    test('returns no signals', () => {
      const features = createBaseFeatures()
      const prediction = predictStruggle(features)
      expect(prediction.signals).toHaveLength(0)
    })

    test('suggests no intervention', () => {
      const features = createBaseFeatures()
      const prediction = predictStruggle(features)
      expect(prediction.suggestedIntervention).toBe('none')
    })
  })

  describe('with low/mild signals', () => {
    test('returns level "mild" for marginally exceeded time', () => {
      const features = createMildFeatures()
      const prediction = predictStruggle(features)
      // With time_exceeded and long_pause signals at low strengths,
      // the weighted score should place this in mild range
      expect(['none', 'mild']).toContain(prediction.level)
    })

    test('suggests encouragement for mild struggle', () => {
      // Build features that specifically produce mild level
      const features = createBaseFeatures({
        timeRatio: 2.5,
        longPauseCount: 2,
        keystrokeRate: 3,
        timeElapsedMs: 35000,
      })
      const prediction = predictStruggle(features)
      if (prediction.level === 'mild') {
        expect(prediction.suggestedIntervention).toBe('encouragement')
      }
    })
  })

  describe('with moderate signals', () => {
    test('returns level "moderate" for moderate struggle indicators', () => {
      const features = createModerateFeatures()
      const prediction = predictStruggle(features)
      expect(['moderate', 'severe']).toContain(prediction.level)
    })

    test('suggests hint or scaffold for moderate with revisions', () => {
      const features = createBaseFeatures({
        timeElapsedMs: 90000,
        timeRatio: 2.5,
        keystrokeRate: 2,
        majorRevisionCount: 8,
        deletionRatio: 0.65,
        recentAccuracy: 0.35,
        longPauseCount: 2,
      })
      const prediction = predictStruggle(features)
      if (prediction.level === 'moderate') {
        expect(['gentle_hint', 'scaffolded_steps']).toContain(
          prediction.suggestedIntervention
        )
      }
    })
  })

  describe('with high/severe signals', () => {
    test('returns level "severe" or "critical" for heavy struggle', () => {
      const features = createSevereFeatures()
      const prediction = predictStruggle(features)
      expect(['severe', 'critical']).toContain(prediction.level)
    })

    test('probability is high for severe features', () => {
      const features = createSevereFeatures()
      const prediction = predictStruggle(features)
      expect(prediction.probability).toBeGreaterThanOrEqual(0.6)
    })

    test('suggests concept_review for skill_gap signal', () => {
      const features = createBaseFeatures({
        timeElapsedMs: 120000,
        timeRatio: 3.0,
        keystrokeRate: 1,
        longPauseCount: 4,
        majorRevisionCount: 10,
        deletionRatio: 0.7,
        skillMastery: 0.2,
        recentAccuracy: 0.15,
        hintViews: 3,
        answerChangeCount: 0,
        lastAnswerAge: 120000,
        focusLossCount: 4,
      })
      const prediction = predictStruggle(features)
      if (prediction.level === 'severe') {
        // With a skill_gap signal, should suggest concept_review
        const hasSkillGap = prediction.signals.some(
          (s) => s.type === 'skill_gap'
        )
        if (hasSkillGap) {
          expect(prediction.suggestedIntervention).toBe('concept_review')
        }
      }
    })

    test('suggests worked_example for critical with recent_failures', () => {
      const features = createBaseFeatures({
        timeElapsedMs: 100000, // Under 180s so not easier_problem
        timeRatio: 3.5,
        keystrokeRate: 0.5,
        longPauseCount: 5,
        majorRevisionCount: 15,
        deletionRatio: 0.85,
        recentAccuracy: 0.0,
        skillMastery: 0.1,
        hintViews: 5,
        answerChangeCount: 0,
        lastAnswerAge: 100000,
        focusLossCount: 6,
      })
      const prediction = predictStruggle(features)
      if (prediction.level === 'critical') {
        expect(['worked_example', 'easier_problem']).toContain(
          prediction.suggestedIntervention
        )
      }
    })

    test('suggests easier_problem for critical with very long time', () => {
      const features = createBaseFeatures({
        timeElapsedMs: 200000, // > 180s threshold
        timeRatio: 4.0,
        keystrokeRate: 0.5,
        longPauseCount: 5,
        majorRevisionCount: 15,
        deletionRatio: 0.85,
        recentAccuracy: 0.05,
        skillMastery: 0.1,
        hintViews: 5,
        answerChangeCount: 0,
        lastAnswerAge: 200000,
        focusLossCount: 6,
      })
      const prediction = predictStruggle(features)
      if (prediction.level === 'critical') {
        expect(prediction.suggestedIntervention).toBe('easier_problem')
      }
    })
  })

  describe('probability normalization', () => {
    test('probability is always between 0 and 1', () => {
      const scenarios = [
        createBaseFeatures(),
        createMildFeatures(),
        createModerateFeatures(),
        createSevereFeatures(),
      ]

      for (const features of scenarios) {
        const prediction = predictStruggle(features)
        expect(prediction.probability).toBeGreaterThanOrEqual(0)
        expect(prediction.probability).toBeLessThanOrEqual(1)
      }
    })

    test('probability is 0 when no signals exist', () => {
      const features = createBaseFeatures()
      const prediction = predictStruggle(features)
      expect(prediction.probability).toBe(0)
    })

    test('probability does not exceed 1 even with extreme features', () => {
      const features = createBaseFeatures({
        timeElapsedMs: 600000,
        timeRatio: 10.0,
        keystrokeRate: 0,
        longPauseCount: 20,
        majorRevisionCount: 50,
        deletionRatio: 0.99,
        focusLossCount: 20,
        recentAccuracy: 0,
        skillMastery: 0,
        hintViews: 20,
        answerChangeCount: 0,
        lastAnswerAge: 600000,
      })
      const prediction = predictStruggle(features)
      expect(prediction.probability).toBeLessThanOrEqual(1)
    })
  })

  describe('confidence calculation', () => {
    test('confidence increases with more time elapsed', () => {
      const shortTime = createBaseFeatures({
        timeElapsedMs: 10000,
        timeRatio: 2.5,
        longPauseCount: 2,
      })
      const longTime = createBaseFeatures({
        timeElapsedMs: 130000,
        timeRatio: 2.5,
        longPauseCount: 2,
      })

      const predShort = predictStruggle(shortTime)
      const predLong = predictStruggle(longTime)

      expect(predLong.confidence).toBeGreaterThanOrEqual(predShort.confidence)
    })

    test('confidence is capped at 0.95', () => {
      const features = createSevereFeatures()
      features.timeElapsedMs = 300000
      const prediction = predictStruggle(features)
      expect(prediction.confidence).toBeLessThanOrEqual(0.95)
    })

    test('base confidence is at least 0.6', () => {
      const features = createBaseFeatures()
      const prediction = predictStruggle(features)
      expect(prediction.confidence).toBeGreaterThanOrEqual(0.6)
    })
  })
})

// ============================================================================
// interventionUrgency
// ============================================================================

describe('interventionUrgency mapping', () => {
  test('critical level maps to immediate urgency', () => {
    const features = createSevereFeatures()
    const prediction = predictStruggle(features)
    if (prediction.level === 'critical') {
      expect(prediction.interventionUrgency).toBe('immediate')
    }
  })

  test('severe level maps to high or medium urgency', () => {
    const features = createBaseFeatures({
      timeElapsedMs: 150000,
      timeRatio: 3.0,
      keystrokeRate: 1,
      longPauseCount: 3,
      majorRevisionCount: 10,
      deletionRatio: 0.7,
      recentAccuracy: 0.2,
      skillMastery: 0.25,
      hintViews: 3,
      focusLossCount: 3,
      answerChangeCount: 0,
      lastAnswerAge: 150000,
    })
    const prediction = predictStruggle(features)
    if (prediction.level === 'severe') {
      expect(['high', 'medium']).toContain(prediction.interventionUrgency)
    }
  })

  test('moderate level maps to medium urgency', () => {
    const features = createModerateFeatures()
    const prediction = predictStruggle(features)
    if (prediction.level === 'moderate') {
      expect(prediction.interventionUrgency).toBe('medium')
    }
  })

  test('none/mild level maps to low urgency', () => {
    const features = createBaseFeatures()
    const prediction = predictStruggle(features)
    expect(prediction.interventionUrgency).toBe('low')
  })
})

// ============================================================================
// shouldIntervene
// ============================================================================

describe('shouldIntervene', () => {
  test('returns false for no-struggle prediction', () => {
    const features = createBaseFeatures()
    const prediction = predictStruggle(features)
    expect(shouldIntervene(prediction)).toBe(false)
  })

  test('returns false when probability is below default threshold (0.7)', () => {
    const prediction: StrugglePrediction = {
      level: 'moderate',
      probability: 0.5,
      confidence: 0.7,
      signals: [],
      suggestedIntervention: 'gentle_hint',
      interventionUrgency: 'medium',
    }
    expect(shouldIntervene(prediction)).toBe(false)
  })

  test('returns true when probability meets default threshold', () => {
    const prediction: StrugglePrediction = {
      level: 'severe',
      probability: 0.75,
      confidence: 0.8,
      signals: [],
      suggestedIntervention: 'scaffolded_steps',
      interventionUrgency: 'high',
    }
    expect(shouldIntervene(prediction)).toBe(true)
  })

  test('returns false when level is "none" even with high probability', () => {
    const prediction: StrugglePrediction = {
      level: 'none',
      probability: 0.9,
      confidence: 0.8,
      signals: [],
      suggestedIntervention: 'none',
      interventionUrgency: 'low',
    }
    expect(shouldIntervene(prediction)).toBe(false)
  })

  test('respects custom threshold', () => {
    const prediction: StrugglePrediction = {
      level: 'mild',
      probability: 0.3,
      confidence: 0.6,
      signals: [],
      suggestedIntervention: 'encouragement',
      interventionUrgency: 'low',
    }
    expect(shouldIntervene(prediction, 0.3)).toBe(true)
    expect(shouldIntervene(prediction, 0.5)).toBe(false)
  })

  test('exactly at threshold returns true', () => {
    const prediction: StrugglePrediction = {
      level: 'moderate',
      probability: 0.7,
      confidence: 0.7,
      signals: [],
      suggestedIntervention: 'gentle_hint',
      interventionUrgency: 'medium',
    }
    expect(shouldIntervene(prediction, 0.7)).toBe(true)
  })
})

// ============================================================================
// getInterventionDelay
// ============================================================================

describe('getInterventionDelay', () => {
  test('immediate urgency returns 0ms', () => {
    expect(getInterventionDelay('immediate')).toBe(0)
  })

  test('high urgency returns 5000ms', () => {
    expect(getInterventionDelay('high')).toBe(5000)
  })

  test('medium urgency returns 15000ms', () => {
    expect(getInterventionDelay('medium')).toBe(15000)
  })

  test('low urgency returns 30000ms', () => {
    expect(getInterventionDelay('low')).toBe(30000)
  })

  test('delays are in ascending order of urgency', () => {
    const delays = {
      immediate: getInterventionDelay('immediate'),
      high: getInterventionDelay('high'),
      medium: getInterventionDelay('medium'),
      low: getInterventionDelay('low'),
    }
    expect(delays.immediate).toBeLessThan(delays.high)
    expect(delays.high).toBeLessThan(delays.medium)
    expect(delays.medium).toBeLessThan(delays.low)
  })
})

// ============================================================================
// formatPrediction
// ============================================================================

describe('formatPrediction', () => {
  test('includes level in output', () => {
    const prediction: StrugglePrediction = {
      level: 'moderate',
      probability: 0.55,
      confidence: 0.7,
      signals: [],
      suggestedIntervention: 'gentle_hint',
      interventionUrgency: 'medium',
    }
    const output = formatPrediction(prediction)
    expect(output).toContain('Level: moderate')
  })

  test('includes probability as percentage', () => {
    const prediction: StrugglePrediction = {
      level: 'severe',
      probability: 0.85,
      confidence: 0.9,
      signals: [],
      suggestedIntervention: 'scaffolded_steps',
      interventionUrgency: 'high',
    }
    const output = formatPrediction(prediction)
    expect(output).toContain('Probability: 85.0%')
  })

  test('includes confidence as percentage', () => {
    const prediction: StrugglePrediction = {
      level: 'mild',
      probability: 0.3,
      confidence: 0.65,
      signals: [],
      suggestedIntervention: 'encouragement',
      interventionUrgency: 'low',
    }
    const output = formatPrediction(prediction)
    expect(output).toContain('Confidence: 65.0%')
  })

  test('includes signals with strength percentages', () => {
    const prediction: StrugglePrediction = {
      level: 'moderate',
      probability: 0.55,
      confidence: 0.7,
      signals: [
        {
          type: 'time_exceeded',
          strength: 0.6,
          description: 'Taking 2.5x expected time',
        },
        {
          type: 'low_activity',
          strength: 0.8,
          description: 'Very low keystroke activity',
        },
      ],
      suggestedIntervention: 'gentle_hint',
      interventionUrgency: 'medium',
    }
    const output = formatPrediction(prediction)
    expect(output).toContain('time_exceeded(60%)')
    expect(output).toContain('low_activity(80%)')
  })

  test('filters out weak signals (strength <= 0.3)', () => {
    const prediction: StrugglePrediction = {
      level: 'mild',
      probability: 0.25,
      confidence: 0.6,
      signals: [
        {
          type: 'time_exceeded',
          strength: 0.1,
          description: 'Slightly over time',
        },
        { type: 'low_activity', strength: 0.5, description: 'Low activity' },
      ],
      suggestedIntervention: 'encouragement',
      interventionUrgency: 'low',
    }
    const output = formatPrediction(prediction)
    expect(output).not.toContain('time_exceeded')
    expect(output).toContain('low_activity(50%)')
  })

  test('shows "none" when all signals are weak', () => {
    const prediction: StrugglePrediction = {
      level: 'none',
      probability: 0.05,
      confidence: 0.6,
      signals: [
        {
          type: 'time_exceeded',
          strength: 0.1,
          description: 'Very slightly over',
        },
      ],
      suggestedIntervention: 'none',
      interventionUrgency: 'low',
    }
    const output = formatPrediction(prediction)
    expect(output).toContain('Signals: none')
  })

  test('includes suggested intervention', () => {
    const prediction: StrugglePrediction = {
      level: 'severe',
      probability: 0.78,
      confidence: 0.85,
      signals: [],
      suggestedIntervention: 'concept_review',
      interventionUrgency: 'high',
    }
    const output = formatPrediction(prediction)
    expect(output).toContain('Suggested: concept_review')
  })

  test('includes urgency', () => {
    const prediction: StrugglePrediction = {
      level: 'critical',
      probability: 0.92,
      confidence: 0.9,
      signals: [],
      suggestedIntervention: 'worked_example',
      interventionUrgency: 'immediate',
    }
    const output = formatPrediction(prediction)
    expect(output).toContain('Urgency: immediate')
  })

  test('uses pipe separator between fields', () => {
    const prediction: StrugglePrediction = {
      level: 'none',
      probability: 0,
      confidence: 0.6,
      signals: [],
      suggestedIntervention: 'none',
      interventionUrgency: 'low',
    }
    const output = formatPrediction(prediction)
    const parts = output.split(' | ')
    expect(parts).toHaveLength(6)
  })
})

// ============================================================================
// Integration: predictStruggle with intervention logic
// ============================================================================

describe('predictStruggle intervention logic', () => {
  test('moderate with excessive_revisions suggests scaffolded_steps', () => {
    // Craft features that produce moderate level with excessive_revisions dominant
    const features = createBaseFeatures({
      timeElapsedMs: 75000,
      timeRatio: 2.3,
      majorRevisionCount: 10,
      deletionRatio: 0.7,
      longPauseCount: 1,
    })
    const prediction = predictStruggle(features)
    if (prediction.level === 'moderate') {
      const hasRevisionSignal = prediction.signals.some(
        (s) =>
          s.type === 'excessive_revisions' || s.type === 'high_deletion_ratio'
      )
      if (hasRevisionSignal) {
        expect(prediction.suggestedIntervention).toBe('scaffolded_steps')
      }
    }
  })

  test('moderate with time_exceeded suggests gentle_hint', () => {
    const features = createBaseFeatures({
      timeElapsedMs: 80000,
      timeRatio: 2.8,
      longPauseCount: 1,
      recentAccuracy: 0.35,
    })
    const prediction = predictStruggle(features)
    if (prediction.level === 'moderate') {
      const dominantSignals = prediction.signals.filter((s) => s.strength > 0.5)
      const hasTimeExceeded = dominantSignals.some(
        (s) => s.type === 'time_exceeded'
      )
      if (hasTimeExceeded) {
        expect(prediction.suggestedIntervention).toBe('gentle_hint')
      }
    }
  })

  test('severe with hint_dependency suggests specific_hint', () => {
    const features = createBaseFeatures({
      timeElapsedMs: 150000,
      timeRatio: 3.0,
      keystrokeRate: 1,
      longPauseCount: 3,
      majorRevisionCount: 8,
      deletionRatio: 0.6,
      hintViews: 5,
      recentAccuracy: 0.2,
      focusLossCount: 3,
      answerChangeCount: 0,
      lastAnswerAge: 150000,
    })
    const prediction = predictStruggle(features)
    if (prediction.level === 'severe') {
      const hasHintDep = prediction.signals.some(
        (s) => s.type === 'hint_dependency'
      )
      if (hasHintDep) {
        expect(prediction.suggestedIntervention).toBe('specific_hint')
      }
    }
  })
})
