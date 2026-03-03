/**
 * Expanded Unit Tests for Adaptive Difficulty Algorithm
 *
 * Complements the existing adaptation.test.ts with additional coverage for:
 *   - Daily XP quota gating (grade-up restrictions)
 *   - Grade boundary capping behaviour
 *   - calculateXP with costsIncurred parameter
 *   - checkDailyStreak additional edge cases
 *   - calculateAccuracyRate boundary precision
 *   - calculateProgressToNextLevel boundary values
 *   - getGradeLevelString edge values
 */

import {
  calculateNextDifficulty,
  calculateProgressToNextLevel,
  getGradeLevelString,
  calculateXP,
  calculateAccuracyRate,
  checkDailyStreak,
} from '../adaptation'
import { Attempt } from '@/lib/types/basics'
import { Timestamp } from 'firebase-admin/firestore'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createAttempts(correctPattern: boolean[], difficulty = 5): Attempt[] {
  return correctPattern.map((correct, index) => ({
    problemId: `p-${index}`,
    difficulty,
    type: 'arithmetic',
    correct,
    timeSpent: 30,
    timestamp: Timestamp.now(),
    xpEarned: correct ? 10 : 2,
  }))
}

/** All-correct 10-attempt list (performance score = 1.0) */
const ALL_CORRECT = createAttempts(Array(10).fill(true))

/** All-wrong 10-attempt list (performance score = 0.0) */
const ALL_WRONG = createAttempts(Array(10).fill(false))

/** 80% weighted performance (8 recent correct, 2 old wrong) */
const STRONG_PERF = createAttempts([
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
])

/** ~62% weighted performance */
const GOOD_PERF = createAttempts([
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
])

// ---------------------------------------------------------------------------
// calculateNextDifficulty – Quota Gating
// ---------------------------------------------------------------------------

describe('calculateNextDifficulty – quota gating', () => {
  describe('strong performance (80%+) with quota', () => {
    test('increases by 0.5 when quota is met', () => {
      const result = calculateNextDifficulty(ALL_CORRECT, 5.0, 1000, 1000)
      expect(result).toBe(5.5)
    })

    test('increases by 0.5 when dailyXP exceeds goal', () => {
      const result = calculateNextDifficulty(ALL_CORRECT, 5.0, 2000, 1000)
      expect(result).toBe(5.5)
    })
  })

  describe('strong performance (80%+) without quota', () => {
    test('caps at current grade + 0.99 when increase would cross grade boundary', () => {
      // At 5.75, +0.5 = 6.25 which crosses from grade 5 to grade 6
      const result = calculateNextDifficulty(ALL_CORRECT, 5.75, 500, 1000)
      expect(result).toBe(5.99)
    })

    test('allows increase within same grade when quota not met', () => {
      // At 5.0, +0.5 = 5.5 -- still grade 5, no grade-up
      const result = calculateNextDifficulty(ALL_CORRECT, 5.0, 500, 1000)
      expect(result).toBe(5.5)
    })

    test('caps when exactly at grade boundary minus 0.01', () => {
      // At 5.5, +0.5 = 6.0 -- crosses to grade 6
      const result = calculateNextDifficulty(ALL_CORRECT, 5.5, 0, 1000)
      expect(result).toBe(5.99)
    })

    test('allows increase when dailyXP is undefined (no quota tracking)', () => {
      // When dailyXP is undefined, quotaMet = false
      // At 5.0, +0.5 = 5.5 -- same grade, allowed
      const result = calculateNextDifficulty(ALL_CORRECT, 5.0, undefined, 1000)
      expect(result).toBe(5.5)
    })

    test('caps when dailyXP is undefined and increase would cross grade', () => {
      const result = calculateNextDifficulty(ALL_CORRECT, 5.75, undefined, 1000)
      expect(result).toBe(5.99)
    })
  })

  describe('good performance (60-79%) with quota', () => {
    test('increases by 0.25 when quota is met and no grade-up', () => {
      const result = calculateNextDifficulty(GOOD_PERF, 5.0, 1500, 1000)
      expect(result).toBe(5.25)
    })

    test('allows grade-up when quota is met', () => {
      // At 5.8, +0.25 = 6.05 -- crosses to grade 6, but quota met
      const result = calculateNextDifficulty(GOOD_PERF, 5.8, 1000, 1000)
      expect(result).toBe(6.05)
    })
  })

  describe('good performance (60-79%) without quota', () => {
    test('caps at grade + 0.99 when increase would cross grade boundary', () => {
      // At 5.8, +0.25 = 6.05 -- grade-up, but quota not met
      const result = calculateNextDifficulty(GOOD_PERF, 5.8, 500, 1000)
      expect(result).toBe(5.99)
    })

    test('allows increase within same grade', () => {
      // At 5.5, +0.25 = 5.75 -- still grade 5
      const result = calculateNextDifficulty(GOOD_PERF, 5.5, 0, 1000)
      expect(result).toBe(5.75)
    })
  })

  describe('moderate, struggling, and very poor are not affected by quota', () => {
    test('moderate performance (40-59%) stays the same regardless of quota', () => {
      // 3 recent correct, 7 wrong -> ~49% weighted
      const moderate = createAttempts([
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ])
      expect(calculateNextDifficulty(moderate, 5.0, 2000, 1000)).toBe(5.0)
      expect(calculateNextDifficulty(moderate, 5.0, 0, 1000)).toBe(5.0)
    })

    test('struggling performance decreases regardless of quota', () => {
      // 2 recent correct, 8 wrong -> ~35% weighted
      const struggling = createAttempts([
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ])
      expect(calculateNextDifficulty(struggling, 5.0, 2000, 1000)).toBe(4.75)
    })

    test('very poor performance decreases regardless of quota', () => {
      expect(calculateNextDifficulty(ALL_WRONG, 5.0, 2000, 1000)).toBe(4.5)
    })
  })

  describe('custom dailyGoal parameter', () => {
    test('uses custom dailyGoal for quota check', () => {
      // With goal=500, 500 XP should be enough
      const result = calculateNextDifficulty(ALL_CORRECT, 5.75, 500, 500)
      expect(result).toBe(6.25) // quota met, no cap
    })

    test('default dailyGoal is 1000', () => {
      // 999 XP should NOT meet default 1000 goal
      const result = calculateNextDifficulty(ALL_CORRECT, 5.75, 999, 1000)
      expect(result).toBe(5.99) // capped
    })
  })
})

// ---------------------------------------------------------------------------
// calculateNextDifficulty – Boundary clamping
// ---------------------------------------------------------------------------

describe('calculateNextDifficulty – boundary clamping', () => {
  test('never goes below 1.0 even with severe decrease', () => {
    expect(calculateNextDifficulty(ALL_WRONG, 1.0)).toBe(1.0)
    expect(calculateNextDifficulty(ALL_WRONG, 1.25)).toBe(1.0)
  })

  test('never exceeds 12.0', () => {
    expect(calculateNextDifficulty(ALL_CORRECT, 11.75, 5000, 1000)).toBe(12.0)
    expect(calculateNextDifficulty(ALL_CORRECT, 12.0, 5000, 1000)).toBe(12.0)
  })

  test('handles fractional boundary at grade 12', () => {
    // At 11.5, +0.5 = 12.0 (exactly at max, OK)
    expect(calculateNextDifficulty(ALL_CORRECT, 11.5, 5000, 1000)).toBe(12.0)
  })
})

// ---------------------------------------------------------------------------
// calculateNextDifficulty – Single attempt
// ---------------------------------------------------------------------------

describe('calculateNextDifficulty – single attempt', () => {
  test('single correct attempt (weight 10/10 = 1.0) increases by 0.5', () => {
    const single = createAttempts([true])
    expect(calculateNextDifficulty(single, 5.0)).toBe(5.5)
  })

  test('single wrong attempt (0/10 = 0.0) decreases by 0.5', () => {
    const single = createAttempts([false])
    expect(calculateNextDifficulty(single, 5.0)).toBe(4.5)
  })
})

// ---------------------------------------------------------------------------
// calculateXP – costsIncurred
// ---------------------------------------------------------------------------

describe('calculateXP – costsIncurred', () => {
  test('deducts costs from correct answer XP', () => {
    // Base 10 + 0 streak + 0 speed = 10, minus 5 cost = 5
    expect(calculateXP(true, 60, 60, 0, 5)).toBe(5)
  })

  test('deducts costs from wrong answer XP', () => {
    // Base 2, minus 1 cost = 1
    expect(calculateXP(false, 10, 60, 0, 1)).toBe(1)
  })

  test('XP never goes below 0 with high costs', () => {
    expect(calculateXP(true, 60, 60, 0, 100)).toBe(0)
    expect(calculateXP(false, 10, 60, 0, 100)).toBe(0)
  })

  test('costs default to 0 when not provided', () => {
    expect(calculateXP(true, 60, 60, 0)).toBe(10)
  })

  test('costs combined with speed and streak bonuses', () => {
    // 10 base + 3 speed + 10 streak (capped) = 23, minus 8 = 15
    expect(calculateXP(true, 25, 60, 5, 8)).toBe(15)
  })

  test('effort bonus on wrong answer still deducted by costs', () => {
    // 2 base + 1 effort = 3, minus 3 = 0
    expect(calculateXP(false, 20, 60, 0, 3)).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// calculateAccuracyRate – precision
// ---------------------------------------------------------------------------

describe('calculateAccuracyRate – precision', () => {
  test('handles repeating decimals', () => {
    const rate = calculateAccuracyRate(1, 3)
    expect(rate).toBeCloseTo(0.3333, 4)
  })

  test('handles large numbers', () => {
    expect(calculateAccuracyRate(999, 1000)).toBe(0.999)
  })

  test('handles equal zero values', () => {
    expect(calculateAccuracyRate(0, 0)).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// calculateProgressToNextLevel – additional cases
// ---------------------------------------------------------------------------

describe('calculateProgressToNextLevel – edge cases', () => {
  test('returns 0 for difficulty 1.0', () => {
    expect(calculateProgressToNextLevel(1.0)).toBe(0)
  })

  test('returns 99 for difficulty x.99', () => {
    expect(calculateProgressToNextLevel(5.99)).toBe(99)
  })

  test('returns 0 for difficulty 12.0', () => {
    expect(calculateProgressToNextLevel(12.0)).toBe(0)
  })

  test('handles very small fractional values', () => {
    expect(calculateProgressToNextLevel(5.01)).toBe(1)
  })

  test('handles x.5 at boundaries', () => {
    expect(calculateProgressToNextLevel(1.5)).toBe(50)
    expect(calculateProgressToNextLevel(11.5)).toBe(50)
  })
})

// ---------------------------------------------------------------------------
// getGradeLevelString – edge cases
// ---------------------------------------------------------------------------

describe('getGradeLevelString – additional cases', () => {
  test('handles negative values (returns Kindergarten for grade 0)', () => {
    // Math.floor(-0.5) = -1, which is not 0
    const result = getGradeLevelString(-0.5)
    expect(result).toBe('Grade -1')
  })

  test('handles boundary 0.99 as Kindergarten', () => {
    expect(getGradeLevelString(0.99)).toBe('Kindergarten')
  })

  test('grade 1.0 returns Grade 1', () => {
    expect(getGradeLevelString(1.0)).toBe('Grade 1')
  })

  test('grade 11.99 returns Grade 11', () => {
    expect(getGradeLevelString(11.99)).toBe('Grade 11')
  })
})

// ---------------------------------------------------------------------------
// checkDailyStreak – additional edge cases
// ---------------------------------------------------------------------------

describe('checkDailyStreak – expanded edge cases', () => {
  test('handles month boundary (Jan 31 -> Feb 1)', () => {
    const result = checkDailyStreak('2024-01-31', '2024-02-01', 10)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(11)
  })

  test('handles year boundary (Dec 31 -> Jan 1)', () => {
    const result = checkDailyStreak('2023-12-31', '2024-01-01', 5)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(6)
  })

  test('handles leap year Feb 28 -> Feb 29', () => {
    const result = checkDailyStreak('2024-02-28', '2024-02-29', 3)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(4)
  })

  test('handles non-leap year Feb 28 -> Mar 1', () => {
    const result = checkDailyStreak('2025-02-28', '2025-03-01', 7)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(8)
  })

  test('same day returns same streak count', () => {
    const result = checkDailyStreak('2024-06-15', '2024-06-15', 1)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(1)
  })

  test('streak of 0 on same day returns 0', () => {
    const result = checkDailyStreak('2024-06-15', '2024-06-15', 0)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(0)
  })

  test('streak of 0 on consecutive day becomes 1', () => {
    const result = checkDailyStreak('2024-06-14', '2024-06-15', 0)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(1)
  })

  test('two days gap resets streak', () => {
    const result = checkDailyStreak('2024-06-13', '2024-06-15', 20)
    expect(result.maintain).toBe(false)
    expect(result.newStreak).toBe(1)
  })

  test('very large gap resets streak', () => {
    const result = checkDailyStreak('2020-01-01', '2026-03-01', 999)
    expect(result.maintain).toBe(false)
    expect(result.newStreak).toBe(1)
  })
})
