import {
  formatCountdown,
  getStartOfDay,
  getStartOfWeek,
  getStartOfMonth,
  getStartOfYear,
  formatDateISO,
  getDateRangeForPeriod,
  formatDateShort,
} from '../date-helpers'

describe('formatCountdown', () => {
  it('formats hours, minutes, seconds', () => {
    // 1 hour, 30 minutes, 45 seconds
    const ms = (1 * 3600 + 30 * 60 + 45) * 1000
    expect(formatCountdown(ms)).toBe('01:30:45')
  })

  it('pads single digits', () => {
    const ms = (2 * 3600 + 5 * 60 + 9) * 1000
    expect(formatCountdown(ms)).toBe('02:05:09')
  })

  it('handles zero', () => {
    expect(formatCountdown(0)).toBe('00:00:00')
  })

  it('handles large values', () => {
    const ms = 24 * 3600 * 1000 // 24 hours
    expect(formatCountdown(ms)).toBe('24:00:00')
  })

  it('truncates sub-second values', () => {
    expect(formatCountdown(999)).toBe('00:00:00')
    expect(formatCountdown(1500)).toBe('00:00:01')
  })
})

describe('getStartOfDay', () => {
  it('returns midnight of given date', () => {
    const date = new Date(2026, 2, 15, 14, 30, 45)
    const result = getStartOfDay(date)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
    expect(result.getDate()).toBe(15)
  })

  it('does not mutate the input date', () => {
    const date = new Date(2026, 2, 15, 14, 30)
    getStartOfDay(date)
    expect(date.getHours()).toBe(14)
  })
})

describe('getStartOfWeek', () => {
  it('returns Sunday of the current week', () => {
    // Wednesday March 11, 2026
    const wed = new Date(2026, 2, 11, 10, 0)
    const result = getStartOfWeek(wed)
    expect(result.getDay()).toBe(0) // Sunday
    expect(result.getDate()).toBe(8) // March 8
    expect(result.getHours()).toBe(0)
  })

  it('returns same day when input is Sunday', () => {
    const sun = new Date(2026, 2, 8, 12, 0)
    const result = getStartOfWeek(sun)
    expect(result.getDay()).toBe(0)
    expect(result.getDate()).toBe(8)
  })
})

describe('getStartOfMonth', () => {
  it('returns first day of month', () => {
    const date = new Date(2026, 2, 15)
    const result = getStartOfMonth(date)
    expect(result.getDate()).toBe(1)
    expect(result.getMonth()).toBe(2) // March
    expect(result.getFullYear()).toBe(2026)
  })
})

describe('getStartOfYear', () => {
  it('returns January 1st', () => {
    const date = new Date(2026, 5, 15)
    const result = getStartOfYear(date)
    expect(result.getMonth()).toBe(0) // January
    expect(result.getDate()).toBe(1)
    expect(result.getFullYear()).toBe(2026)
  })
})

describe('formatDateISO', () => {
  it('formats date as YYYY-MM-DD', () => {
    const date = new Date('2026-03-15T00:00:00Z')
    expect(formatDateISO(date)).toBe('2026-03-15')
  })
})

describe('getDateRangeForPeriod', () => {
  it('returns start of day for "day" period', () => {
    const { start, end } = getDateRangeForPeriod('day')
    expect(start.getHours()).toBe(0)
    expect(start.getMinutes()).toBe(0)
    expect(end.getTime()).toBeGreaterThanOrEqual(start.getTime())
  })

  it('returns epoch for "all-time" period', () => {
    const { start } = getDateRangeForPeriod('all-time')
    expect(start.getTime()).toBe(0)
  })

  it('returns start of current month for "month"', () => {
    const { start } = getDateRangeForPeriod('month')
    expect(start.getDate()).toBe(1)
  })

  it('returns Jan 1 for "year"', () => {
    const { start } = getDateRangeForPeriod('year')
    expect(start.getMonth()).toBe(0)
    expect(start.getDate()).toBe(1)
  })
})

describe('formatDateShort', () => {
  it('formats without year by default', () => {
    const date = new Date(2026, 0, 5) // Jan 5, 2026
    const result = formatDateShort(date)
    expect(result).toContain('Jan')
    expect(result).toContain('5')
    expect(result).not.toContain('2026')
  })

  it('includes year when requested', () => {
    const date = new Date(2026, 0, 5)
    const result = formatDateShort(date, true)
    expect(result).toContain('Jan')
    expect(result).toContain('5')
    expect(result).toContain('2026')
  })
})
