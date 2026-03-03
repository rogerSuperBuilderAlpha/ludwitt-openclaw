/**
 * Unit Tests for Adaptive Difficulty Algorithm
 */

import { 
  calculateNextDifficulty,
  calculateProgressToNextLevel,
  getGradeLevelString,
  calculateXP,
  calculateAccuracyRate,
  checkDailyStreak
} from '../adaptation'
import { Attempt } from '@/lib/types/basics'
import { Timestamp } from 'firebase-admin/firestore'

// Helper to create mock attempts
function createMockAttempts(correctPattern: boolean[], startDifficulty = 5): Attempt[] {
  return correctPattern.map((correct, index) => ({
    problemId: `problem-${index}`,
    difficulty: startDifficulty,
    type: 'arithmetic',
    correct,
    timeSpent: 30,
    timestamp: Timestamp.now(),
    xpEarned: correct ? 10 : 2
  }))
}

describe('calculateNextDifficulty', () => {
  describe('with empty attempts', () => {
    test('returns current difficulty unchanged', () => {
      expect(calculateNextDifficulty([], 5.0)).toBe(5.0)
    })
  })

  describe('with strong performance (80%+)', () => {
    test('increases difficulty by 0.5', () => {
      const attempts = createMockAttempts([true, true, true, true, true, true, true, true, false, false])
      // 8/10 = 80%
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(5.5)
    })

    test('increases by 0.5 for 90% correct with recency weighting', () => {
      // Most recent are correct (higher weight), older ones wrong
      const attempts = createMockAttempts([true, true, true, true, true, true, true, true, true, false])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(5.5)
    })

    test('all correct increases difficulty by 0.5', () => {
      const attempts = createMockAttempts([true, true, true, true, true, true, true, true, true, true])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(5.5)
    })
  })

  describe('with good performance (60-79%)', () => {
    test('increases difficulty by 0.25', () => {
      // Need weighted score between 0.6 and 0.8
      // With weights [10,9,8,7,6,5,4,3,2,1], total = 55
      // 4 correct (weights 10+9+8+7=34), 6 wrong = 34/55 ≈ 0.62
      const attempts = createMockAttempts([true, true, true, true, false, false, false, false, false, false])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(5.25)
    })
  })

  describe('with moderate performance (40-59%)', () => {
    test('maintains current difficulty', () => {
      // Need weighted score between 0.4 and 0.6
      // With weights [10,9,8,7,6,5,4,3,2,1], total = 55
      // 3 correct (10+9+8=27), 7 wrong = 27/55 ≈ 0.49
      const attempts = createMockAttempts([true, true, true, false, false, false, false, false, false, false])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(5.0)
    })
  })

  describe('with struggling performance (25-39%)', () => {
    test('decreases difficulty by 0.25', () => {
      // Need weighted score between 0.25 and 0.4
      // With weights [10,9,8,7,6,5,4,3,2,1], total = 55
      // 2 correct (positions 0,1 = 10+9=19), 8 wrong = 19/55 ≈ 0.345
      const attempts = createMockAttempts([true, true, false, false, false, false, false, false, false, false])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(4.75)
    })
  })

  describe('with very poor performance (<25%)', () => {
    test('decreases difficulty by 0.5', () => {
      // 1 correct, 9 wrong = 10%
      const attempts = createMockAttempts([true, false, false, false, false, false, false, false, false, false])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(4.5)
    })

    test('all wrong decreases difficulty by 0.5', () => {
      const attempts = createMockAttempts([false, false, false, false, false, false, false, false, false, false])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(4.5)
    })
  })

  describe('boundary conditions', () => {
    test('caps at maximum difficulty 12.0', () => {
      const attempts = createMockAttempts([true, true, true, true, true, true, true, true, true, true])
      const result = calculateNextDifficulty(attempts, 12.0)
      expect(result).toBe(12.0)
    })

    test('caps at minimum difficulty 1.0', () => {
      const attempts = createMockAttempts([false, false, false, false, false, false, false, false, false, false])
      const result = calculateNextDifficulty(attempts, 1.0)
      expect(result).toBe(1.0)
    })

    test('handles fewer than 10 attempts', () => {
      const attempts = createMockAttempts([true, true, true])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(5.5) // 100% correct = increase by 0.5
    })
  })

  describe('recency weighting', () => {
    test('recent correct answers weigh more than older wrong answers', () => {
      // First 5 (most recent) are correct, last 5 are wrong
      // With weights [10,9,8,7,6,5,4,3,2,1]:
      // Score = (10+9+8+7+6)/(10+9+8+7+6+5+4+3+2+1) = 40/55 = 0.727 (good performance)
      const attempts = createMockAttempts([true, true, true, true, true, false, false, false, false, false])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(5.25) // Good performance = +0.25
    })

    test('recent wrong answers weigh more than older correct answers', () => {
      // First 5 (most recent) are wrong, last 5 are correct
      // Score = (5+4+3+2+1)/(10+9+8+7+6+5+4+3+2+1) = 15/55 = 0.273 (struggling)
      const attempts = createMockAttempts([false, false, false, false, false, true, true, true, true, true])
      const result = calculateNextDifficulty(attempts, 5.0)
      expect(result).toBe(4.75) // Struggling = -0.25
    })
  })
})

describe('calculateProgressToNextLevel', () => {
  test('returns 0 for whole number difficulty', () => {
    expect(calculateProgressToNextLevel(5.0)).toBe(0)
  })

  test('returns 25 for x.25 difficulty', () => {
    expect(calculateProgressToNextLevel(5.25)).toBe(25)
  })

  test('returns 50 for x.5 difficulty', () => {
    expect(calculateProgressToNextLevel(5.5)).toBe(50)
  })

  test('returns 75 for x.75 difficulty', () => {
    expect(calculateProgressToNextLevel(5.75)).toBe(75)
  })

  test('rounds to nearest integer', () => {
    expect(calculateProgressToNextLevel(5.333)).toBe(33)
  })
})

describe('getGradeLevelString', () => {
  test('returns "Kindergarten" for grade 0', () => {
    expect(getGradeLevelString(0)).toBe('Kindergarten')
    expect(getGradeLevelString(0.5)).toBe('Kindergarten')
  })

  test('returns "Grade X" for grades 1-12', () => {
    expect(getGradeLevelString(1)).toBe('Grade 1')
    expect(getGradeLevelString(5)).toBe('Grade 5')
    expect(getGradeLevelString(12)).toBe('Grade 12')
  })

  test('handles fractional grades', () => {
    expect(getGradeLevelString(5.25)).toBe('Grade 5')
    expect(getGradeLevelString(5.99)).toBe('Grade 5')
  })
})

describe('calculateXP', () => {
  describe('correct answers', () => {
    test('awards base 10 XP', () => {
      expect(calculateXP(true, 60, 60, 0)).toBe(10)
    })

    test('awards +3 speed bonus for fast answers', () => {
      // Less than 50% of estimated time
      expect(calculateXP(true, 25, 60, 0)).toBe(13)
    })

    test('awards streak bonus capped at +10', () => {
      expect(calculateXP(true, 60, 60, 1)).toBe(12) // +2 for 1 streak
      expect(calculateXP(true, 60, 60, 3)).toBe(16) // +6 for 3 streak
      expect(calculateXP(true, 60, 60, 5)).toBe(20) // +10 for 5 streak (max)
      expect(calculateXP(true, 60, 60, 10)).toBe(20) // Still +10 (capped)
    })

    test('combines speed and streak bonuses', () => {
      expect(calculateXP(true, 25, 60, 5)).toBe(23) // 10 + 3 + 10
    })
  })

  describe('incorrect answers', () => {
    test('awards base 2 XP for attempting', () => {
      expect(calculateXP(false, 10, 60, 0)).toBe(2)
    })

    test('awards +1 for spending reasonable time', () => {
      // At least 30% of estimated time
      expect(calculateXP(false, 20, 60, 0)).toBe(3) // 2 + 1
    })

    test('no time bonus for quick wrong answers', () => {
      expect(calculateXP(false, 5, 60, 0)).toBe(2)
    })
  })
})

describe('calculateAccuracyRate', () => {
  test('returns 0 for no attempts', () => {
    expect(calculateAccuracyRate(0, 0)).toBe(0)
  })

  test('returns 1 for 100% accuracy', () => {
    expect(calculateAccuracyRate(10, 10)).toBe(1)
  })

  test('returns 0 for 0% accuracy', () => {
    expect(calculateAccuracyRate(0, 10)).toBe(0)
  })

  test('calculates correct ratio', () => {
    expect(calculateAccuracyRate(7, 10)).toBe(0.7)
    expect(calculateAccuracyRate(1, 4)).toBe(0.25)
  })
})

describe('checkDailyStreak', () => {
  test('returns newStreak 1 for no previous activity', () => {
    const result = checkDailyStreak('', '2024-01-15', 0)
    expect(result.maintain).toBe(false)
    expect(result.newStreak).toBe(1)
  })

  test('maintains streak for same day', () => {
    const result = checkDailyStreak('2024-01-15', '2024-01-15', 5)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(5)
  })

  test('increments streak for consecutive day', () => {
    const result = checkDailyStreak('2024-01-14', '2024-01-15', 5)
    expect(result.maintain).toBe(true)
    expect(result.newStreak).toBe(6)
  })

  test('resets streak after missing a day', () => {
    const result = checkDailyStreak('2024-01-13', '2024-01-15', 5)
    expect(result.maintain).toBe(false)
    expect(result.newStreak).toBe(1)
  })

  test('resets streak after missing multiple days', () => {
    const result = checkDailyStreak('2024-01-01', '2024-01-15', 10)
    expect(result.maintain).toBe(false)
    expect(result.newStreak).toBe(1)
  })
})

