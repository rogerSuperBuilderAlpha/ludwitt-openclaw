/**
 * Unit Tests for XP Helper Utilities
 */

jest.mock('@/lib/utils/date-helpers', () => ({
  getTodayDate: jest.fn(() => '2024-01-15'),
}))

import {
  calculateXPUpdate,
  calculateXPDeduction,
  XPUpdateData,
} from '../xp-helpers'
import { getXPUpdateFields } from '../xp-helpers.server'

describe('calculateXPUpdate', () => {
  const baseData: XPUpdateData = {
    subject: 'math',
    points: 10,
    currentSubjectXP: 100,
    currentTotalXP: 200,
    currentDailyXP: 50,
    lastActiveDate: '2024-01-15',
  }

  describe('same day activity', () => {
    test('adds points to all XP values', () => {
      const result = calculateXPUpdate({
        ...baseData,
        lastActiveDate: '2024-01-15', // Same as mocked today
      })

      expect(result.newSubjectXP).toBe(110)
      expect(result.newTotalXP).toBe(210)
    })

    test('accumulates daily XP on same day', () => {
      const result = calculateXPUpdate({
        ...baseData,
        lastActiveDate: '2024-01-15', // Same as mocked today
      })

      expect(result.isNewDay).toBe(false)
      expect(result.newDailyXP).toBe(60) // 50 + 10
    })
  })

  describe('new day activity', () => {
    test('resets daily XP on new day', () => {
      const result = calculateXPUpdate({
        ...baseData,
        lastActiveDate: '2024-01-14', // Day before mocked today
      })

      expect(result.isNewDay).toBe(true)
      expect(result.newDailyXP).toBe(10) // Just the new points
    })

    test('still adds to subject and total XP', () => {
      const result = calculateXPUpdate({
        ...baseData,
        lastActiveDate: '2024-01-14', // Day before mocked today
      })

      expect(result.newSubjectXP).toBe(110)
      expect(result.newTotalXP).toBe(210)
    })
  })

  describe('edge cases', () => {
    test('handles zero points', () => {
      const result = calculateXPUpdate({
        ...baseData,
        points: 0,
        lastActiveDate: '2024-01-15',
      })

      expect(result.newSubjectXP).toBe(100)
      expect(result.newTotalXP).toBe(200)
    })

    test('handles negative current values gracefully', () => {
      const result = calculateXPUpdate({
        ...baseData,
        currentSubjectXP: -10,
        currentTotalXP: -20,
        lastActiveDate: '2024-01-15',
      })

      expect(result.newSubjectXP).toBe(0) // -10 + 10
      expect(result.newTotalXP).toBe(-10) // -20 + 10
    })

    test('handles large point values', () => {
      const result = calculateXPUpdate({
        ...baseData,
        points: 1000000,
        lastActiveDate: '2024-01-15',
      })

      expect(result.newSubjectXP).toBe(1000100)
      expect(result.newTotalXP).toBe(1000200)
    })
  })
})

describe('getXPUpdateFields', () => {
  test('returns correct field updates for math', () => {
    const result = {
      newSubjectXP: 150,
      newTotalXP: 300,
      newDailyXP: 75,
      isNewDay: false,
      todayDate: '2024-01-15',
    }

    const fields = getXPUpdateFields('math', result)

    expect(fields['math.totalXP']).toBe(150)
    expect(fields['totalXP']).toBe(300)
    expect(fields['dailyXP']).toBe(75)
    expect(fields['lastActiveDate']).toBe('2024-01-15')
    expect(fields['math.lastActivity']).toBeDefined()
    expect(fields['updatedAt']).toBeDefined()
  })

  test('returns correct field updates for reading', () => {
    const result = {
      newSubjectXP: 100,
      newTotalXP: 250,
      newDailyXP: 50,
      isNewDay: true,
      todayDate: '2024-01-16',
    }

    const fields = getXPUpdateFields('reading', result)

    expect(fields['reading.totalXP']).toBe(100)
    expect(fields['totalXP']).toBe(250)
    expect(fields['dailyXP']).toBe(50)
    expect(fields['lastActiveDate']).toBe('2024-01-16')
    expect(fields['reading.lastActivity']).toBeDefined()
  })
})

describe('calculateXPDeduction', () => {
  test('deducts cost from current XP', () => {
    expect(calculateXPDeduction(100, 25)).toBe(75)
  })

  test('floors at 0 for insufficient XP', () => {
    expect(calculateXPDeduction(10, 25)).toBe(0)
  })

  test('handles exact balance', () => {
    expect(calculateXPDeduction(25, 25)).toBe(0)
  })

  test('handles zero cost', () => {
    expect(calculateXPDeduction(100, 0)).toBe(100)
  })

  test('handles zero balance', () => {
    expect(calculateXPDeduction(0, 25)).toBe(0)
  })
})
