import { formatDate, formatCredits, getCreditColor } from '../developers'

describe('formatDate', () => {
  it('formats a Date object to short locale string', () => {
    // Jan 15 in en-US short format
    const date = new Date(2024, 0, 15)
    const result = formatDate(date)
    expect(result).toBe('Jan 15')
  })

  it('formats an ISO date string', () => {
    const result = formatDate('2024-06-20T12:00:00Z')
    expect(result).toContain('Jun')
    expect(result).toContain('20')
  })

  it('formats a Firestore-style timestamp object with seconds', () => {
    // Jan 1, 2024 00:00:00 UTC = 1704067200 seconds
    const firestoreTimestamp = { seconds: 1704067200 }
    const result = formatDate(firestoreTimestamp)
    expect(result).toBeTruthy()
    // The exact date depends on timezone but it should produce a valid string
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns empty string for null', () => {
    expect(formatDate(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('')
  })

  it('handles various months correctly', () => {
    expect(formatDate(new Date(2024, 2, 5))).toBe('Mar 5')
    expect(formatDate(new Date(2024, 11, 25))).toBe('Dec 25')
  })
})

describe('formatCredits', () => {
  it('formats cent-based balance as USD string', () => {
    expect(formatCredits(1000)).toBe('$10.00')
    expect(formatCredits(500)).toBe('$5.00')
    expect(formatCredits(1)).toBe('$0.01')
    expect(formatCredits(0)).toBe('$0.00')
  })

  it('formats large amounts correctly', () => {
    expect(formatCredits(100000)).toBe('$1,000.00')
  })

  it('returns dash for undefined', () => {
    expect(formatCredits(undefined)).toBe('-')
  })

  it('handles negative amounts', () => {
    const result = formatCredits(-500)
    expect(result).toContain('5.00')
    // Negative formatting may vary but should include the amount
  })

  it('handles fractional cents', () => {
    // 1050 cents = $10.50
    expect(formatCredits(1050)).toBe('$10.50')
  })

  it('formats single digit cents with two decimal places', () => {
    expect(formatCredits(99)).toBe('$0.99')
    expect(formatCredits(1)).toBe('$0.01')
  })
})

describe('getCreditColor', () => {
  it('returns muted color for undefined balance', () => {
    expect(getCreditColor(undefined)).toBe('var(--dev-text-muted)')
  })

  it('returns error color for zero balance', () => {
    expect(getCreditColor(0)).toBe('var(--dev-status-error, #ef4444)')
  })

  it('returns error color for negative balance', () => {
    expect(getCreditColor(-100)).toBe('var(--dev-status-error, #ef4444)')
  })

  it('returns warning color for balance under $5 (< 500 cents)', () => {
    expect(getCreditColor(1)).toBe('var(--dev-accent-warning, #f59e0b)')
    expect(getCreditColor(499)).toBe('var(--dev-accent-warning, #f59e0b)')
    expect(getCreditColor(100)).toBe('var(--dev-accent-warning, #f59e0b)')
  })

  it('returns done/green color for balance >= $5 (>= 500 cents)', () => {
    expect(getCreditColor(500)).toBe('var(--dev-status-done, #22c55e)')
    expect(getCreditColor(1000)).toBe('var(--dev-status-done, #22c55e)')
    expect(getCreditColor(50000)).toBe('var(--dev-status-done, #22c55e)')
  })

  it('returns correct color at exact boundary of 500 cents', () => {
    expect(getCreditColor(499)).toBe('var(--dev-accent-warning, #f59e0b)')
    expect(getCreditColor(500)).toBe('var(--dev-status-done, #22c55e)')
  })
})
