import {
  getTodayDate,
  formatCountdown,
  getStartOfDay,
  getStartOfWeek,
  getStartOfMonth,
  getStartOfYear,
  getDateDaysAgo,
  formatDateISO,
  getDateRangeForPeriod,
  getMondayOfCurrentWeek,
  getFirstOfCurrentMonth,
  formatDateShort,
  getMillisUntilMidnightEST,
} from '../date-helpers'

describe('date-helpers', () => {
  // =========================================================================
  // getTodayDate
  // =========================================================================
  describe('getTodayDate', () => {
    it('returns a string in YYYY-MM-DD format', () => {
      const result = getTodayDate()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('returns a valid date string', () => {
      const result = getTodayDate()
      const parsed = new Date(result + 'T00:00:00')
      expect(parsed.getTime()).not.toBeNaN()
    })
  })

  // =========================================================================
  // getMillisUntilMidnightEST
  // =========================================================================
  describe('getMillisUntilMidnightEST', () => {
    it('returns a positive number', () => {
      const result = getMillisUntilMidnightEST()
      expect(result).toBeGreaterThan(0)
    })

    it('returns a number less than or equal to 24 hours', () => {
      const result = getMillisUntilMidnightEST()
      expect(result).toBeLessThanOrEqual(24 * 60 * 60 * 1000)
    })
  })

  // =========================================================================
  // formatCountdown
  // =========================================================================
  describe('formatCountdown', () => {
    it('formats 0 ms as "00:00:00"', () => {
      expect(formatCountdown(0)).toBe('00:00:00')
    })

    it('formats exact hours', () => {
      expect(formatCountdown(3600000)).toBe('01:00:00')
    })

    it('formats hours, minutes, and seconds', () => {
      // 2h 30m 15s = 9015000 ms
      expect(formatCountdown(9015000)).toBe('02:30:15')
    })

    it('formats only minutes and seconds', () => {
      // 5m 30s = 330000 ms
      expect(formatCountdown(330000)).toBe('00:05:30')
    })

    it('pads all components with leading zeros', () => {
      // 1h 2m 3s = 3723000 ms
      expect(formatCountdown(3723000)).toBe('01:02:03')
    })

    it('handles large values', () => {
      // 25 hours
      expect(formatCountdown(25 * 3600 * 1000)).toBe('25:00:00')
    })
  })

  // =========================================================================
  // getStartOfDay
  // =========================================================================
  describe('getStartOfDay', () => {
    it('returns midnight of the given date', () => {
      const d = new Date(2024, 5, 15, 14, 30, 45)
      const result = getStartOfDay(d)
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
      expect(result.getMilliseconds()).toBe(0)
      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(5)
      expect(result.getDate()).toBe(15)
    })

    it('defaults to today when no argument is given', () => {
      const result = getStartOfDay()
      const now = new Date()
      expect(result.getFullYear()).toBe(now.getFullYear())
      expect(result.getMonth()).toBe(now.getMonth())
      expect(result.getDate()).toBe(now.getDate())
      expect(result.getHours()).toBe(0)
    })

    it('does not mutate the original date', () => {
      const original = new Date(2024, 5, 15, 14, 30, 45)
      const originalTime = original.getTime()
      getStartOfDay(original)
      expect(original.getTime()).toBe(originalTime)
    })
  })

  // =========================================================================
  // getStartOfWeek
  // =========================================================================
  describe('getStartOfWeek', () => {
    it('returns Sunday midnight for a mid-week date', () => {
      // Wednesday June 12, 2024
      const wed = new Date(2024, 5, 12, 10, 0, 0)
      const result = getStartOfWeek(wed)
      expect(result.getDay()).toBe(0) // Sunday
      expect(result.getDate()).toBe(9) // Sunday June 9
      expect(result.getHours()).toBe(0)
    })

    it('returns the same day for a Sunday', () => {
      // Sunday June 9, 2024
      const sun = new Date(2024, 5, 9, 15, 0, 0)
      const result = getStartOfWeek(sun)
      expect(result.getDay()).toBe(0)
      expect(result.getDate()).toBe(9)
      expect(result.getHours()).toBe(0)
    })

    it('returns the previous Sunday for a Saturday', () => {
      // Saturday June 15, 2024
      const sat = new Date(2024, 5, 15, 15, 0, 0)
      const result = getStartOfWeek(sat)
      expect(result.getDay()).toBe(0)
      expect(result.getDate()).toBe(9)
    })

    it('defaults to current week when no argument is given', () => {
      const result = getStartOfWeek()
      expect(result.getDay()).toBe(0)
      expect(result.getHours()).toBe(0)
    })
  })

  // =========================================================================
  // getStartOfMonth
  // =========================================================================
  describe('getStartOfMonth', () => {
    it('returns the first of the month', () => {
      const d = new Date(2024, 5, 15, 14, 30, 45)
      const result = getStartOfMonth(d)
      expect(result.getDate()).toBe(1)
      expect(result.getMonth()).toBe(5)
      expect(result.getFullYear()).toBe(2024)
    })

    it('defaults to current month when no argument is given', () => {
      const result = getStartOfMonth()
      const now = new Date()
      expect(result.getDate()).toBe(1)
      expect(result.getMonth()).toBe(now.getMonth())
      expect(result.getFullYear()).toBe(now.getFullYear())
    })
  })

  // =========================================================================
  // getStartOfYear
  // =========================================================================
  describe('getStartOfYear', () => {
    it('returns January 1 of the given year', () => {
      const d = new Date(2024, 5, 15)
      const result = getStartOfYear(d)
      expect(result.getMonth()).toBe(0)
      expect(result.getDate()).toBe(1)
      expect(result.getFullYear()).toBe(2024)
    })

    it('defaults to current year', () => {
      const result = getStartOfYear()
      expect(result.getFullYear()).toBe(new Date().getFullYear())
      expect(result.getMonth()).toBe(0)
      expect(result.getDate()).toBe(1)
    })
  })

  // =========================================================================
  // getDateDaysAgo
  // =========================================================================
  describe('getDateDaysAgo', () => {
    it('returns a date N days before today', () => {
      const now = new Date()
      const result = getDateDaysAgo(7)
      const diffMs = now.getTime() - result.getTime()
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
      expect(diffDays).toBe(7)
    })

    it('returns today when 0 days ago', () => {
      const result = getDateDaysAgo(0)
      const now = new Date()
      expect(result.getDate()).toBe(now.getDate())
    })

    it('returns a future date for negative values', () => {
      const result = getDateDaysAgo(-3)
      const now = new Date()
      expect(result.getTime()).toBeGreaterThan(now.getTime() - 1000)
    })
  })

  // =========================================================================
  // formatDateISO
  // =========================================================================
  describe('formatDateISO', () => {
    it('formats a date as YYYY-MM-DD', () => {
      const d = new Date('2024-06-15T12:00:00.000Z')
      expect(formatDateISO(d)).toBe('2024-06-15')
    })

    it('pads single-digit months and days', () => {
      const d = new Date('2024-01-05T00:00:00.000Z')
      expect(formatDateISO(d)).toBe('2024-01-05')
    })
  })

  // =========================================================================
  // getDateRangeForPeriod
  // =========================================================================
  describe('getDateRangeForPeriod', () => {
    it('returns start of day for "day" period', () => {
      const { start, end } = getDateRangeForPeriod('day')
      expect(start.getHours()).toBe(0)
      expect(start.getMinutes()).toBe(0)
      expect(end.getTime()).toBeLessThanOrEqual(Date.now())
    })

    it('returns start of week (Sunday) for "week" period', () => {
      const { start } = getDateRangeForPeriod('week')
      expect(start.getDay()).toBe(0)
    })

    it('returns first of month for "month" period', () => {
      const { start } = getDateRangeForPeriod('month')
      expect(start.getDate()).toBe(1)
    })

    it('returns January 1 for "year" period', () => {
      const { start } = getDateRangeForPeriod('year')
      expect(start.getMonth()).toBe(0)
      expect(start.getDate()).toBe(1)
    })

    it('returns epoch for "all-time" period', () => {
      const { start } = getDateRangeForPeriod('all-time')
      expect(start.getTime()).toBe(0)
    })

    it('end is always close to now', () => {
      const periods: Array<'day' | 'week' | 'month' | 'year' | 'all-time'> = [
        'day',
        'week',
        'month',
        'year',
        'all-time',
      ]
      for (const period of periods) {
        const { end } = getDateRangeForPeriod(period)
        expect(Math.abs(end.getTime() - Date.now())).toBeLessThan(1000)
      }
    })
  })

  // =========================================================================
  // getMondayOfCurrentWeek
  // =========================================================================
  describe('getMondayOfCurrentWeek', () => {
    it('returns a Monday', () => {
      const result = getMondayOfCurrentWeek()
      expect(result.getDay()).toBe(1)
    })

    it('returns midnight', () => {
      const result = getMondayOfCurrentWeek()
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
      expect(result.getMilliseconds()).toBe(0)
    })

    it('returned Monday is within the last 7 days', () => {
      const result = getMondayOfCurrentWeek()
      const now = new Date()
      const diffDays =
        (now.getTime() - result.getTime()) / (1000 * 60 * 60 * 24)
      expect(diffDays).toBeGreaterThanOrEqual(0)
      expect(diffDays).toBeLessThan(7)
    })
  })

  // =========================================================================
  // getFirstOfCurrentMonth
  // =========================================================================
  describe('getFirstOfCurrentMonth', () => {
    it('returns the 1st of the current month', () => {
      const result = getFirstOfCurrentMonth()
      const now = new Date()
      expect(result.getDate()).toBe(1)
      expect(result.getMonth()).toBe(now.getMonth())
      expect(result.getFullYear()).toBe(now.getFullYear())
    })

    it('returns midnight', () => {
      const result = getFirstOfCurrentMonth()
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
      expect(result.getMilliseconds()).toBe(0)
    })
  })

  // =========================================================================
  // formatDateShort
  // =========================================================================
  describe('formatDateShort', () => {
    it('formats date without year by default', () => {
      const d = new Date(2024, 0, 5) // Jan 5, 2024
      const result = formatDateShort(d)
      expect(result).toContain('Jan')
      expect(result).toContain('5')
      expect(result).not.toContain('2024')
    })

    it('formats date with year when requested', () => {
      const d = new Date(2026, 0, 5) // Jan 5, 2026
      const result = formatDateShort(d, true)
      expect(result).toContain('Jan')
      expect(result).toContain('5')
      expect(result).toContain('2026')
    })

    it('formats various months correctly', () => {
      const d = new Date(2024, 11, 25) // Dec 25
      const result = formatDateShort(d)
      expect(result).toContain('Dec')
      expect(result).toContain('25')
    })
  })
})
