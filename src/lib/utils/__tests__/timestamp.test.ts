jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}))

import {
  toDate,
  toTimestamp,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatRelativePastDate,
  formatRelativeFutureDate,
  daysBetween,
  formatDuration,
  formatLongDuration,
  normalizeFirestoreData,
} from '../timestamp'

describe('timestamp utilities', () => {
  // =========================================================================
  // toDate
  // =========================================================================
  describe('toDate', () => {
    it('returns epoch for null', () => {
      expect(toDate(null).getTime()).toBe(0)
    })

    it('returns epoch for undefined', () => {
      expect(toDate(undefined).getTime()).toBe(0)
    })

    it('returns the same Date object when given a Date', () => {
      const d = new Date('2024-06-15T12:00:00Z')
      expect(toDate(d)).toBe(d)
    })

    it('parses an ISO string', () => {
      const result = toDate('2024-01-01T00:00:00Z')
      expect(result.getTime()).toBe(new Date('2024-01-01T00:00:00Z').getTime())
    })

    it('parses a numeric timestamp (milliseconds)', () => {
      const ms = 1700000000000
      expect(toDate(ms).getTime()).toBe(ms)
    })

    it('handles {seconds, nanoseconds} Firestore Timestamp shape', () => {
      const result = toDate({ seconds: 1700000000, nanoseconds: 0 })
      expect(result.getTime()).toBe(1700000000 * 1000)
    })

    it('handles {_seconds, _nanoseconds} serialised shape', () => {
      const result = toDate({ _seconds: 1700000000, _nanoseconds: 0 })
      expect(result.getTime()).toBe(1700000000 * 1000)
    })

    it('handles {_type: "timestamp", value: "..."} serialised shape', () => {
      const iso = '2024-03-15T10:30:00.000Z'
      const result = toDate({ _type: 'timestamp', value: iso })
      expect(result.toISOString()).toBe(iso)
    })

    it('handles objects with a toDate method', () => {
      const expected = new Date('2025-01-01T00:00:00Z')
      const obj = { toDate: () => expected }
      expect(toDate(obj)).toBe(expected)
    })

    it('returns epoch for an unrecognised object', () => {
      expect(toDate({ foo: 'bar' }).getTime()).toBe(0)
    })
  })

  // =========================================================================
  // toTimestamp
  // =========================================================================
  describe('toTimestamp', () => {
    it('returns milliseconds for a Date', () => {
      const d = new Date('2024-06-15T12:00:00Z')
      expect(toTimestamp(d)).toBe(d.getTime())
    })

    it('returns 0 for null', () => {
      expect(toTimestamp(null)).toBe(0)
    })

    it('converts a seconds object to millis', () => {
      expect(toTimestamp({ seconds: 1000, nanoseconds: 0 })).toBe(1000000)
    })
  })

  // =========================================================================
  // formatDate
  // =========================================================================
  describe('formatDate', () => {
    it('returns "Unknown" for null', () => {
      expect(formatDate(null)).toBe('Unknown')
    })

    it('returns "Unknown" for undefined', () => {
      expect(formatDate(undefined)).toBe('Unknown')
    })

    it('returns a locale date string for a valid timestamp', () => {
      const d = new Date('2024-06-15T12:00:00Z')
      const result = formatDate(d)
      // Should be a non-empty string that is not "Unknown" or "Error"
      expect(result).not.toBe('Unknown')
      expect(result).not.toBe('Error')
      expect(result.length).toBeGreaterThan(0)
    })

    it('returns a locale date string for a seconds object', () => {
      const result = formatDate({ seconds: 1700000000, nanoseconds: 0 })
      expect(result).not.toBe('Unknown')
      expect(result).not.toBe('Error')
    })
  })

  // =========================================================================
  // formatDateTime
  // =========================================================================
  describe('formatDateTime', () => {
    it('returns "Unknown" for null', () => {
      expect(formatDateTime(null)).toBe('Unknown')
    })

    it('returns "Unknown" for undefined', () => {
      expect(formatDateTime(undefined)).toBe('Unknown')
    })

    it('returns a locale date-time string for a valid Date', () => {
      const d = new Date('2024-06-15T12:00:00Z')
      const result = formatDateTime(d)
      expect(result).not.toBe('Unknown')
      expect(result).not.toBe('Error')
      expect(result.length).toBeGreaterThan(0)
    })
  })

  // =========================================================================
  // formatRelativeTime
  // =========================================================================
  describe('formatRelativeTime', () => {
    it('returns "Unknown" for null', () => {
      expect(formatRelativeTime(null)).toBe('Unknown')
    })

    it('returns "Just now" for a timestamp less than a minute ago', () => {
      const now = new Date()
      expect(formatRelativeTime(now)).toBe('Just now')
    })

    it('returns "X minutes ago" for recent timestamps', () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)
      expect(formatRelativeTime(fiveMinAgo)).toBe('5 minutes ago')
    })

    it('returns singular "1 minute ago"', () => {
      const oneMinAgo = new Date(Date.now() - 1 * 60 * 1000 - 1000) // just over 1 min
      expect(formatRelativeTime(oneMinAgo)).toBe('1 minute ago')
    })

    it('returns "X hours ago" for timestamps hours ago', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000)
      expect(formatRelativeTime(threeHoursAgo)).toBe('3 hours ago')
    })

    it('returns singular "1 hour ago"', () => {
      const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000 - 1000)
      expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago')
    })

    it('returns "X days ago" for timestamps days ago (< 7)', () => {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(twoDaysAgo)).toBe('2 days ago')
    })

    it('returns singular "1 day ago"', () => {
      const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 1000)
      expect(formatRelativeTime(oneDayAgo)).toBe('1 day ago')
    })

    it('returns formatted date for timestamps older than 7 days', () => {
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      const result = formatRelativeTime(twoWeeksAgo)
      // Should fall back to formatDate which produces a locale string
      expect(result).not.toBe('Unknown')
      expect(result.length).toBeGreaterThan(0)
    })
  })

  // =========================================================================
  // formatRelativePastDate
  // =========================================================================
  describe('formatRelativePastDate', () => {
    it('returns "Never" for undefined', () => {
      expect(formatRelativePastDate(undefined)).toBe('Never')
    })

    it('returns "Never" when no argument is passed', () => {
      expect(formatRelativePastDate()).toBe('Never')
    })

    it('returns "Today" for today', () => {
      expect(formatRelativePastDate(new Date())).toBe('Today')
    })

    it('returns "Yesterday" for yesterday', () => {
      const yesterday = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      expect(formatRelativePastDate(yesterday)).toBe('Yesterday')
    })

    it('returns "X days ago" for 2-6 days ago', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      expect(formatRelativePastDate(threeDaysAgo)).toBe('3 days ago')
    })

    it('returns "X weeks ago" for 7-29 days ago', () => {
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      expect(formatRelativePastDate(twoWeeksAgo)).toBe('2 weeks ago')
    })

    it('returns "X months ago" for 30+ days ago', () => {
      const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      expect(formatRelativePastDate(twoMonthsAgo)).toBe('2 months ago')
    })
  })

  // =========================================================================
  // formatRelativeFutureDate
  // =========================================================================
  describe('formatRelativeFutureDate', () => {
    it('returns "Not scheduled" for undefined', () => {
      expect(formatRelativeFutureDate(undefined)).toBe('Not scheduled')
    })

    it('returns "Not scheduled" when no argument is passed', () => {
      expect(formatRelativeFutureDate()).toBe('Not scheduled')
    })

    it('returns "Due now" for a date in the past', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(formatRelativeFutureDate(yesterday)).toBe('Due now')
    })

    it('returns "Tomorrow" for a date 1 day in the future', () => {
      const tomorrow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      expect(formatRelativeFutureDate(tomorrow)).toBe('Tomorrow')
    })

    it('returns "In X days" for 2-6 days in the future', () => {
      const threeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      const result = formatRelativeFutureDate(threeDays)
      expect(result).toMatch(/^In \d+ days$/)
    })

    it('returns "In X weeks" for 7-29 days in the future', () => {
      const twoWeeks = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      expect(formatRelativeFutureDate(twoWeeks)).toBe('In 2 weeks')
    })

    it('returns "In X months" for 30+ days in the future', () => {
      const twoMonths = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      expect(formatRelativeFutureDate(twoMonths)).toBe('In 2 months')
    })
  })

  // =========================================================================
  // daysBetween
  // =========================================================================
  describe('daysBetween', () => {
    it('returns 0 for the same date', () => {
      const d = new Date('2024-06-15T00:00:00Z')
      expect(daysBetween(d, d)).toBe(0)
    })

    it('returns positive days when end is after start', () => {
      const start = new Date('2024-01-01T00:00:00Z')
      const end = new Date('2024-01-11T00:00:00Z')
      expect(daysBetween(start, end)).toBe(10)
    })

    it('returns negative days when end is before start', () => {
      const start = new Date('2024-01-11T00:00:00Z')
      const end = new Date('2024-01-01T00:00:00Z')
      expect(daysBetween(start, end)).toBe(-10)
    })

    it('works with seconds objects', () => {
      const start = { seconds: 1700000000, nanoseconds: 0 }
      const end = { seconds: 1700000000 + 86400 * 5, nanoseconds: 0 }
      expect(daysBetween(start, end)).toBe(5)
    })

    it('returns 0 for null start and end', () => {
      expect(daysBetween(null, null)).toBe(0)
    })
  })

  // =========================================================================
  // formatDuration
  // =========================================================================
  describe('formatDuration', () => {
    it('formats 0 seconds as "0:00"', () => {
      expect(formatDuration(0)).toBe('0:00')
    })

    it('formats seconds under a minute', () => {
      expect(formatDuration(45)).toBe('0:45')
    })

    it('formats exact minutes', () => {
      expect(formatDuration(120)).toBe('2:00')
    })

    it('formats minutes and seconds', () => {
      expect(formatDuration(90)).toBe('1:30')
    })

    it('pads seconds with leading zero', () => {
      expect(formatDuration(65)).toBe('1:05')
    })

    it('handles large values', () => {
      expect(formatDuration(3661)).toBe('61:01')
    })
  })

  // =========================================================================
  // formatLongDuration
  // =========================================================================
  describe('formatLongDuration', () => {
    it('returns seconds for values under 60', () => {
      expect(formatLongDuration(30)).toBe('30 seconds')
    })

    it('returns "0 seconds" for 0', () => {
      expect(formatLongDuration(0)).toBe('0 seconds')
    })

    it('returns singular "1 minute"', () => {
      expect(formatLongDuration(60)).toBe('1 minute')
    })

    it('returns plural "5 minutes"', () => {
      expect(formatLongDuration(300)).toBe('5 minutes')
    })

    it('returns singular "1 hour" for exactly 3600', () => {
      expect(formatLongDuration(3600)).toBe('1 hour')
    })

    it('returns plural "2 hours" for exactly 7200', () => {
      expect(formatLongDuration(7200)).toBe('2 hours')
    })

    it('returns hours and minutes combined', () => {
      expect(formatLongDuration(5400)).toBe('1 hour 30 mins')
    })

    it('returns hours and singular minute', () => {
      expect(formatLongDuration(3660)).toBe('1 hour 1 min')
    })

    it('handles multiple hours with remaining minutes', () => {
      expect(formatLongDuration(7260)).toBe('2 hours 1 min')
    })
  })

  // =========================================================================
  // normalizeFirestoreData
  // =========================================================================
  describe('normalizeFirestoreData', () => {
    it('returns null for null', () => {
      expect(normalizeFirestoreData(null)).toBeNull()
    })

    it('returns undefined for undefined', () => {
      expect(normalizeFirestoreData(undefined)).toBeUndefined()
    })

    it('passes through strings', () => {
      expect(normalizeFirestoreData('hello')).toBe('hello')
    })

    it('passes through numbers', () => {
      expect(normalizeFirestoreData(42)).toBe(42)
    })

    it('passes through booleans', () => {
      expect(normalizeFirestoreData(true)).toBe(true)
      expect(normalizeFirestoreData(false)).toBe(false)
    })

    it('converts Date objects to ISO strings', () => {
      const d = new Date('2024-06-15T12:00:00.000Z')
      expect(normalizeFirestoreData(d)).toBe('2024-06-15T12:00:00.000Z')
    })

    it('converts Firestore Timestamp-like objects with toDate', () => {
      const ts = { toDate: () => new Date('2024-06-15T12:00:00.000Z') }
      expect(normalizeFirestoreData(ts)).toBe('2024-06-15T12:00:00.000Z')
    })

    it('converts {seconds, nanoseconds} objects to ISO strings', () => {
      const ts = { seconds: 1718452800, nanoseconds: 0 }
      const result = normalizeFirestoreData(ts) as string
      expect(result).toBe(new Date(1718452800 * 1000).toISOString())
    })

    it('converts {_seconds, _nanoseconds} objects to ISO strings', () => {
      const ts = { _seconds: 1718452800, _nanoseconds: 500000000 }
      const result = normalizeFirestoreData(ts) as string
      const expected = new Date(1718452800 * 1000 + 500).toISOString()
      expect(result).toBe(expected)
    })

    it('returns value string for {_type: "timestamp", value: "..."} objects', () => {
      const iso = '2024-06-15T12:00:00.000Z'
      const ts = { _type: 'timestamp', value: iso }
      expect(normalizeFirestoreData(ts)).toBe(iso)
    })

    it('recursively normalizes arrays', () => {
      const input = [
        'hello',
        42,
        new Date('2024-01-01T00:00:00.000Z'),
        { seconds: 1000, nanoseconds: 0 },
      ]
      const result = normalizeFirestoreData(input) as unknown[]
      expect(result).toEqual([
        'hello',
        42,
        '2024-01-01T00:00:00.000Z',
        new Date(1000 * 1000).toISOString(),
      ])
    })

    it('recursively normalizes nested objects', () => {
      const input = {
        name: 'Test',
        count: 5,
        createdAt: { seconds: 1700000000, nanoseconds: 0 },
        nested: {
          updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        },
      }
      const result = normalizeFirestoreData(input) as Record<string, unknown>
      expect(result.name).toBe('Test')
      expect(result.count).toBe(5)
      expect(result.createdAt).toBe(new Date(1700000000 * 1000).toISOString())
      expect((result.nested as Record<string, unknown>).updatedAt).toBe(
        '2024-01-01T00:00:00.000Z'
      )
    })

    it('passes through functions', () => {
      const fn = () => 42
      expect(normalizeFirestoreData(fn)).toBe(fn)
    })

    it('handles deeply nested structures', () => {
      const input = {
        a: {
          b: {
            c: { toDate: () => new Date('2024-06-15T00:00:00.000Z') },
          },
        },
      }
      const result = normalizeFirestoreData(input) as any
      expect(result.a.b.c).toBe('2024-06-15T00:00:00.000Z')
    })

    it('handles empty objects', () => {
      expect(normalizeFirestoreData({})).toEqual({})
    })

    it('handles empty arrays', () => {
      expect(normalizeFirestoreData([])).toEqual([])
    })
  })
})
