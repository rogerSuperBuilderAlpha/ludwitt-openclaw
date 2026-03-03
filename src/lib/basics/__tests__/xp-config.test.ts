/**
 * @jest-environment node
 */

/**
 * Unit tests for XP Configuration and Calculation Functions
 *
 * Tests all pure calculation functions exported from xp-config.ts,
 * verifying rewards, costs, and time-range aggregation logic.
 */

jest.mock('@/lib/utils/date-helpers', () => ({
  getTodayDate: jest.fn(() => '2024-06-15'),
  getStartOfDay: jest.fn(() => new Date('2024-06-15')),
  getStartOfWeek: jest.fn(() => new Date('2024-06-10')),
  getStartOfMonth: jest.fn(() => new Date('2024-06-01')),
  getStartOfYear: jest.fn(() => new Date('2024-01-01')),
  getMondayOfCurrentWeek: jest.fn(() => new Date('2024-06-10')),
  getFirstOfCurrentMonth: jest.fn(() => new Date('2024-06-01')),
}))

import {
  XP_REWARDS,
  XP_COSTS,
  AI_GRADE_THRESHOLDS,
  TRANSLATION_THRESHOLDS,
  WEEKLY_XP_REQUIRED,
  BONUS_SUBJECTS,
  BONUS_MULTIPLIER,
  FREE_LOOKUPS_PER_EXERCISE,
  FREE_HISTORICAL_CONTEXT_PER_SESSION,
  calculateProblemXP,
  calculateAIGradedXP,
  calculateLogicXP,
  calculateTranslationXP,
  calculateWorkBonus,
  applyFocusModeMultiplier,
  calculateNetXP,
  calculateXPByTimeRange,
} from '../xp-config'

// ---------------------------------------------------------------------------
// Constants sanity checks
// ---------------------------------------------------------------------------

describe('XP Constants', () => {
  describe('XP_REWARDS', () => {
    it('has positive base reward for correct answers', () => {
      expect(XP_REWARDS.CORRECT_ANSWER_BASE).toBeGreaterThan(0)
    })

    it('has positive participation credit for wrong answers', () => {
      expect(XP_REWARDS.WRONG_ANSWER_BASE).toBeGreaterThan(0)
    })

    it('has positive speed bonus', () => {
      expect(XP_REWARDS.SPEED_BONUS).toBeGreaterThan(0)
    })

    it('has streak bonus per correct and max cap', () => {
      expect(XP_REWARDS.STREAK_BONUS_PER).toBeGreaterThan(0)
      expect(XP_REWARDS.STREAK_BONUS_MAX).toBeGreaterThan(0)
      expect(XP_REWARDS.STREAK_BONUS_MAX).toBeGreaterThanOrEqual(
        XP_REWARDS.STREAK_BONUS_PER
      )
    })

    it('has positive logic base per difficulty', () => {
      expect(XP_REWARDS.LOGIC_BASE_PER_DIFFICULTY).toBeGreaterThan(0)
    })

    it('has translation tiers in descending order', () => {
      expect(XP_REWARDS.TRANSLATION_PERFECT).toBeGreaterThan(
        XP_REWARDS.TRANSLATION_EXCELLENT
      )
      expect(XP_REWARDS.TRANSLATION_EXCELLENT).toBeGreaterThan(
        XP_REWARDS.TRANSLATION_GOOD
      )
      expect(XP_REWARDS.TRANSLATION_GOOD).toBeGreaterThan(
        XP_REWARDS.TRANSLATION_ACCEPTABLE
      )
      expect(XP_REWARDS.TRANSLATION_ACCEPTABLE).toBeGreaterThan(
        XP_REWARDS.TRANSLATION_ATTEMPTED
      )
    })

    it('has positive focus mode multiplier', () => {
      expect(XP_REWARDS.FOCUS_MODE_MULTIPLIER).toBeGreaterThan(1)
    })
  })

  describe('XP_COSTS', () => {
    it('all costs are non-negative', () => {
      for (const [key, value] of Object.entries(XP_COSTS)) {
        expect(value).toBeGreaterThanOrEqual(0)
      }
    })

    it('skip cost is positive', () => {
      expect(XP_COSTS.SKIP_PROBLEM).toBeGreaterThan(0)
    })

    it('hint cost is greater than skip cost', () => {
      expect(XP_COSTS.HINT_PURCHASE).toBeGreaterThan(XP_COSTS.SKIP_PROBLEM)
    })
  })

  describe('Thresholds', () => {
    it('AI grade thresholds are in ascending order', () => {
      expect(AI_GRADE_THRESHOLDS.PARTIAL_CREDIT_MIN).toBeLessThan(
        AI_GRADE_THRESHOLDS.PARTIAL_CREDIT_MAX
      )
      expect(AI_GRADE_THRESHOLDS.PARTIAL_CREDIT_MAX).toBeLessThan(
        AI_GRADE_THRESHOLDS.FULL_CREDIT_MIN
      )
    })

    it('translation thresholds are in ascending order', () => {
      expect(TRANSLATION_THRESHOLDS.ATTEMPTED_MIN).toBeLessThan(
        TRANSLATION_THRESHOLDS.PARTIAL_MIN
      )
      expect(TRANSLATION_THRESHOLDS.PARTIAL_MIN).toBeLessThan(
        TRANSLATION_THRESHOLDS.GOOD_MIN
      )
      expect(TRANSLATION_THRESHOLDS.GOOD_MIN).toBeLessThan(
        TRANSLATION_THRESHOLDS.EXCELLENT_MIN
      )
      expect(TRANSLATION_THRESHOLDS.EXCELLENT_MIN).toBeLessThan(
        TRANSLATION_THRESHOLDS.PERFECT_MIN
      )
    })
  })

  describe('Other constants', () => {
    it('WEEKLY_XP_REQUIRED is positive', () => {
      expect(WEEKLY_XP_REQUIRED).toBeGreaterThan(0)
    })

    it('BONUS_SUBJECTS is a non-empty array', () => {
      expect(BONUS_SUBJECTS.length).toBeGreaterThan(0)
    })

    it('BONUS_MULTIPLIER is greater than 1', () => {
      expect(BONUS_MULTIPLIER).toBeGreaterThan(1)
    })

    it('FREE_LOOKUPS_PER_EXERCISE is a positive number', () => {
      expect(FREE_LOOKUPS_PER_EXERCISE).toBeGreaterThan(0)
    })

    it('FREE_HISTORICAL_CONTEXT_PER_SESSION is a positive number', () => {
      expect(FREE_HISTORICAL_CONTEXT_PER_SESSION).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// calculateProblemXP
// ---------------------------------------------------------------------------

describe('calculateProblemXP', () => {
  it('returns base XP for a correct answer with no bonuses', () => {
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 60,
      timeEstimate: 60,
      currentStreak: 0,
    })
    expect(xp).toBe(XP_REWARDS.CORRECT_ANSWER_BASE)
  })

  it('adds speed bonus when answer is under half the estimated time', () => {
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 10,
      timeEstimate: 60,
      currentStreak: 0,
    })
    expect(xp).toBe(XP_REWARDS.CORRECT_ANSWER_BASE + XP_REWARDS.SPEED_BONUS)
  })

  it('does not add speed bonus when answer is at exactly half estimated time', () => {
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 30,
      timeEstimate: 60,
      currentStreak: 0,
    })
    expect(xp).toBe(XP_REWARDS.CORRECT_ANSWER_BASE)
  })

  it('adds streak bonus capped at max', () => {
    // With a huge streak the bonus should cap
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 60,
      timeEstimate: 60,
      currentStreak: 100,
    })
    expect(xp).toBe(
      XP_REWARDS.CORRECT_ANSWER_BASE + XP_REWARDS.STREAK_BONUS_MAX
    )
  })

  it('adds proportional streak bonus below cap', () => {
    const streak = 2
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 60,
      timeEstimate: 60,
      currentStreak: streak,
    })
    expect(xp).toBe(
      XP_REWARDS.CORRECT_ANSWER_BASE + streak * XP_REWARDS.STREAK_BONUS_PER
    )
  })

  it('returns participation credit for wrong answer', () => {
    const xp = calculateProblemXP({
      correct: false,
      timeSpent: 5,
      timeEstimate: 60,
      currentStreak: 0,
    })
    expect(xp).toBe(XP_REWARDS.WRONG_ANSWER_BASE)
  })

  it('adds effort bonus for wrong answer when sufficient time spent', () => {
    const xp = calculateProblemXP({
      correct: false,
      timeSpent: 30,
      timeEstimate: 60,
      currentStreak: 0,
    })
    expect(xp).toBe(XP_REWARDS.WRONG_ANSWER_BASE + XP_REWARDS.EFFORT_BONUS)
  })

  it('deducts costs from earnings, minimum 0', () => {
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 60,
      timeEstimate: 60,
      currentStreak: 0,
      costsIncurred: 5,
    })
    expect(xp).toBe(XP_REWARDS.CORRECT_ANSWER_BASE - 5)
  })

  it('never returns negative XP even with huge costs', () => {
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 60,
      timeEstimate: 60,
      currentStreak: 0,
      costsIncurred: 9999,
    })
    expect(xp).toBe(0)
  })

  it('defaults costsIncurred to 0 when omitted', () => {
    const xp = calculateProblemXP({
      correct: true,
      timeSpent: 60,
      timeEstimate: 60,
      currentStreak: 0,
    })
    expect(xp).toBe(XP_REWARDS.CORRECT_ANSWER_BASE)
  })
})

// ---------------------------------------------------------------------------
// calculateAIGradedXP
// ---------------------------------------------------------------------------

describe('calculateAIGradedXP', () => {
  it('returns 0 for score below minimum threshold', () => {
    const xp = calculateAIGradedXP({ score: 30, difficulty: 5 })
    expect(xp).toBe(0)
  })

  it('returns 0 for score of 0', () => {
    expect(calculateAIGradedXP({ score: 0, difficulty: 1 })).toBe(0)
  })

  it('returns partial credit for score in partial range', () => {
    const xp = calculateAIGradedXP({ score: 50, difficulty: 1 })
    expect(xp).toBeGreaterThan(0)
    expect(xp).toBeLessThanOrEqual(6)
  })

  it('returns at least 1 XP for the minimum partial score', () => {
    const xp = calculateAIGradedXP({ score: 40, difficulty: 1 })
    expect(xp).toBeGreaterThanOrEqual(1)
  })

  it('returns full credit for score at 70', () => {
    const xp = calculateAIGradedXP({ score: 70, difficulty: 1 })
    expect(xp).toBeGreaterThan(0)
  })

  it('scales XP with difficulty for full credit scores', () => {
    const lowDiff = calculateAIGradedXP({ score: 90, difficulty: 1 })
    const highDiff = calculateAIGradedXP({ score: 90, difficulty: 10 })
    expect(highDiff).toBeGreaterThan(lowDiff)
  })

  it('caps difficulty multiplier at 12', () => {
    const at12 = calculateAIGradedXP({ score: 90, difficulty: 12 })
    const at15 = calculateAIGradedXP({ score: 90, difficulty: 15 })
    expect(at15).toBe(at12)
  })

  it('adds streak bonus for full credit scores', () => {
    const noStreak = calculateAIGradedXP({
      score: 80,
      difficulty: 5,
      currentStreak: 0,
    })
    const withStreak = calculateAIGradedXP({
      score: 80,
      difficulty: 5,
      currentStreak: 3,
    })
    expect(withStreak).toBeGreaterThan(noStreak)
  })

  it('deducts costs from result', () => {
    const noCost = calculateAIGradedXP({
      score: 80,
      difficulty: 5,
      costsIncurred: 0,
    })
    const withCost = calculateAIGradedXP({
      score: 80,
      difficulty: 5,
      costsIncurred: 3,
    })
    expect(withCost).toBe(noCost - 3)
  })

  it('never returns negative XP after cost deduction', () => {
    const xp = calculateAIGradedXP({
      score: 41,
      difficulty: 1,
      costsIncurred: 100,
    })
    expect(xp).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// calculateLogicXP
// ---------------------------------------------------------------------------

describe('calculateLogicXP', () => {
  it('calculates base XP as difficulty * base rate', () => {
    const xp = calculateLogicXP({ difficulty: 3, usedHint: false })
    expect(xp).toBe(3 * XP_REWARDS.LOGIC_BASE_PER_DIFFICULTY)
  })

  it('applies 70% penalty when hint is used', () => {
    const xp = calculateLogicXP({ difficulty: 5, usedHint: true })
    const expected = Math.floor(5 * XP_REWARDS.LOGIC_BASE_PER_DIFFICULTY * 0.7)
    expect(xp).toBe(expected)
  })

  it('deducts costs', () => {
    const xp = calculateLogicXP({
      difficulty: 2,
      usedHint: false,
      costsIncurred: 5,
    })
    expect(xp).toBe(2 * XP_REWARDS.LOGIC_BASE_PER_DIFFICULTY - 5)
  })

  it('never goes below 0', () => {
    const xp = calculateLogicXP({
      difficulty: 1,
      usedHint: true,
      costsIncurred: 9999,
    })
    expect(xp).toBe(0)
  })

  it('difficulty 1 without hint returns base rate', () => {
    expect(calculateLogicXP({ difficulty: 1, usedHint: false })).toBe(
      XP_REWARDS.LOGIC_BASE_PER_DIFFICULTY
    )
  })
})

// ---------------------------------------------------------------------------
// calculateTranslationXP
// ---------------------------------------------------------------------------

describe('calculateTranslationXP', () => {
  it('returns correct reward for each quality tier', () => {
    expect(calculateTranslationXP({ qualityTier: 'perfect' })).toBe(
      XP_REWARDS.TRANSLATION_PERFECT
    )
    expect(calculateTranslationXP({ qualityTier: 'excellent' })).toBe(
      XP_REWARDS.TRANSLATION_EXCELLENT
    )
    expect(calculateTranslationXP({ qualityTier: 'good' })).toBe(
      XP_REWARDS.TRANSLATION_GOOD
    )
    expect(calculateTranslationXP({ qualityTier: 'acceptable' })).toBe(
      XP_REWARDS.TRANSLATION_ACCEPTABLE
    )
    expect(calculateTranslationXP({ qualityTier: 'attempted' })).toBe(
      XP_REWARDS.TRANSLATION_ATTEMPTED
    )
  })

  it('adds parsing bonus to base XP', () => {
    const xp = calculateTranslationXP({ qualityTier: 'good', parsingBonus: 4 })
    expect(xp).toBe(XP_REWARDS.TRANSLATION_GOOD + 4)
  })

  it('deducts costs from total', () => {
    const xp = calculateTranslationXP({
      qualityTier: 'perfect',
      costsIncurred: 3,
    })
    expect(xp).toBe(XP_REWARDS.TRANSLATION_PERFECT - 3)
  })

  it('never goes below 0 with large costs', () => {
    const xp = calculateTranslationXP({
      qualityTier: 'attempted',
      costsIncurred: 500,
    })
    expect(xp).toBe(0)
  })

  it('defaults costsIncurred and parsingBonus to 0', () => {
    const xp = calculateTranslationXP({ qualityTier: 'good' })
    expect(xp).toBe(XP_REWARDS.TRANSLATION_GOOD)
  })
})

// ---------------------------------------------------------------------------
// calculateWorkBonus
// ---------------------------------------------------------------------------

describe('calculateWorkBonus', () => {
  it('returns 0 for 0 lines of work when correct', () => {
    expect(calculateWorkBonus(0, true)).toBe(0)
  })

  it('returns capped bonus for many lines when correct', () => {
    // score = min(lineCount*2, 10), so at 5+ lines score = 10
    // multiplier = 1 + (10/10) = 2.0
    // bonus = (2.0 - 1) * CORRECT_ANSWER_BASE = CORRECT_ANSWER_BASE
    const xp = calculateWorkBonus(10, true)
    expect(xp).toBe(Math.round(1.0 * XP_REWARDS.CORRECT_ANSWER_BASE))
  })

  it('gives partial credit for incorrect answers with work shown', () => {
    // score = min(4*2, 10) = 8
    // For incorrect: min(floor(8/2), 5) = min(4, 5) = 4
    const xp = calculateWorkBonus(4, false)
    expect(xp).toBe(4)
  })

  it('caps incorrect bonus at 5', () => {
    // score = 10, floor(10/2) = 5, min(5,5) = 5
    const xp = calculateWorkBonus(10, false)
    expect(xp).toBe(5)
  })

  it('gives proportional bonus for correct with few lines', () => {
    // lineCount=1: score = min(2, 10) = 2
    // multiplier = 1 + 2/10 = 1.2
    // bonus = round(0.2 * 10) = 2
    const xp = calculateWorkBonus(1, true)
    expect(xp).toBe(Math.round(0.2 * XP_REWARDS.CORRECT_ANSWER_BASE))
  })
})

// ---------------------------------------------------------------------------
// applyFocusModeMultiplier
// ---------------------------------------------------------------------------

describe('applyFocusModeMultiplier', () => {
  it('returns original XP when not in focus mode', () => {
    expect(applyFocusModeMultiplier(10, false)).toBe(10)
  })

  it('multiplies XP when in focus mode', () => {
    expect(applyFocusModeMultiplier(10, true)).toBe(
      10 * XP_REWARDS.FOCUS_MODE_MULTIPLIER
    )
  })

  it('handles 0 XP in focus mode', () => {
    expect(applyFocusModeMultiplier(0, true)).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// calculateNetXP
// ---------------------------------------------------------------------------

describe('calculateNetXP', () => {
  it('returns baseXP with no costs or bonuses', () => {
    expect(calculateNetXP(10, [], [])).toBe(10)
  })

  it('adds bonuses to baseXP', () => {
    expect(calculateNetXP(10, [], [5, 3])).toBe(18)
  })

  it('subtracts costs from total', () => {
    expect(calculateNetXP(10, [4, 2], [])).toBe(4)
  })

  it('never returns negative before focus mode', () => {
    expect(calculateNetXP(5, [20], [])).toBe(0)
  })

  it('applies focus mode multiplier when active', () => {
    const result = calculateNetXP(10, [], [5], true)
    expect(result).toBe(15 * XP_REWARDS.FOCUS_MODE_MULTIPLIER)
  })

  it('does not apply focus mode when inactive', () => {
    const result = calculateNetXP(10, [], [5], false)
    expect(result).toBe(15)
  })

  it('clamps to 0 before applying focus mode', () => {
    // netXP = 5 + 0 - 100 = -95 -> clamped to 0 -> 0 * multiplier = 0
    const result = calculateNetXP(5, [100], [], true)
    expect(result).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// calculateXPByTimeRange
// ---------------------------------------------------------------------------

describe('calculateXPByTimeRange', () => {
  it('returns todayXP for wtd and mtd when no history exists', () => {
    const result = calculateXPByTimeRange(undefined, 50, 200)
    expect(result).toEqual({ wtdXP: 50, mtdXP: 50, ytdXP: 200 })
  })

  it('returns todayXP for wtd and mtd when history is empty', () => {
    const result = calculateXPByTimeRange({}, 50, 200)
    expect(result).toEqual({ wtdXP: 50, mtdXP: 50, ytdXP: 200 })
  })

  it('sums XP within week range from history', () => {
    // getMondayOfCurrentWeek returns 2024-06-10
    const history: Record<string, number> = {
      '2024-06-10': 100,
      '2024-06-11': 50,
      '2024-06-09': 200, // before week start, should not be in wtdXP
    }
    const result = calculateXPByTimeRange(history, 0, 500)
    expect(result.wtdXP).toBe(150) // 100 + 50
  })

  it('sums XP within month range from history', () => {
    // getFirstOfCurrentMonth returns 2024-06-01
    const history: Record<string, number> = {
      '2024-06-01': 10,
      '2024-06-10': 20,
      '2024-05-31': 100, // before month start
    }
    const result = calculateXPByTimeRange(history, 0, 500)
    expect(result.mtdXP).toBe(30)
  })

  it('sums XP within year range from history', () => {
    // yearStart is computed from real new Date().getFullYear(), so use current year
    const currentYear = new Date().getFullYear()
    const history: Record<string, number> = {
      [`${currentYear}-01-15`]: 10,
      [`${currentYear}-06-10`]: 20,
    }
    const result = calculateXPByTimeRange(history, 0, 500)
    expect(result.ytdXP).toBe(30)
  })

  it('adds today delta when todayXP exceeds history today value', () => {
    // getTodayDate returns '2024-06-15'
    const history: Record<string, number> = {
      '2024-06-15': 20, // already recorded
      '2024-06-10': 50,
    }
    // todayXP is 30 (10 more than in history)
    const result = calculateXPByTimeRange(history, 30, 200)
    // wtd: (20 + 50) + 10 = 80
    expect(result.wtdXP).toBe(80)
    // mtd same (both dates >= month start)
    expect(result.mtdXP).toBe(80)
  })

  it('does not double-count if todayXP equals history value', () => {
    const history: Record<string, number> = {
      '2024-06-15': 20,
    }
    const result = calculateXPByTimeRange(history, 20, 100)
    expect(result.wtdXP).toBe(20)
  })

  it('does not add negative delta when todayXP is less than history', () => {
    const history: Record<string, number> = {
      '2024-06-15': 50,
    }
    // todayXP is 30, less than history's 50 -- no diff added
    const result = calculateXPByTimeRange(history, 30, 100)
    expect(result.wtdXP).toBe(50)
  })
})
