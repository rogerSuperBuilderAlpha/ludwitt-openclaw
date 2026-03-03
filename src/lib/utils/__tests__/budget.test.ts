import {
  calculateActualHours,
  calculateBudgetMetrics,
  calculateBurnRate,
  getBudgetStatusColor,
  formatCurrency,
  formatHours,
} from '../budget'
import type { CustomerDocument, DevelopmentSession } from '@/lib/types/customer'

// Helper to create minimal session objects
function makeSession(timeSpentMinutes: number): DevelopmentSession {
  return { timeSpentMinutes } as DevelopmentSession
}

// Helper to create minimal document objects
function makeDocument(
  overrides: Partial<CustomerDocument> = {}
): CustomerDocument {
  return {
    id: 'doc-1',
    customerId: 'cust-1',
    googleDocId: 'gdoc-1',
    googleDocTitle: 'Test',
    googleDocUrl: 'https://example.com',
    addedAt: {} as any,
    approvedBy: 'admin',
    status: 'approved',
    notificationSent: false,
    ...overrides,
  } as CustomerDocument
}

describe('budget utilities', () => {
  // =========================================================================
  // calculateActualHours
  // =========================================================================
  describe('calculateActualHours', () => {
    it('returns 0 for an empty session array', () => {
      expect(calculateActualHours([])).toBe(0)
    })

    it('sums timeSpentMinutes and converts to hours', () => {
      const sessions = [makeSession(60), makeSession(90), makeSession(30)]
      expect(calculateActualHours(sessions)).toBe(3) // 180 min = 3 h
    })

    it('handles sessions with 0 minutes', () => {
      const sessions = [makeSession(0), makeSession(0)]
      expect(calculateActualHours(sessions)).toBe(0)
    })

    it('handles sessions with undefined timeSpentMinutes', () => {
      const sessions = [{ id: 's1' } as DevelopmentSession]
      expect(calculateActualHours(sessions)).toBe(0)
    })

    it('handles a mix of defined and undefined timeSpentMinutes', () => {
      const sessions = [
        makeSession(120),
        { id: 's2' } as DevelopmentSession,
        makeSession(60),
      ]
      expect(calculateActualHours(sessions)).toBe(3) // 180 min = 3 h
    })

    it('returns fractional hours', () => {
      const sessions = [makeSession(45)] // 45 min = 0.75 h
      expect(calculateActualHours(sessions)).toBe(0.75)
    })
  })

  // =========================================================================
  // calculateBudgetMetrics
  // =========================================================================
  describe('calculateBudgetMetrics', () => {
    it('returns "none" budget type when document has no budget settings', () => {
      const doc = makeDocument()
      const metrics = calculateBudgetMetrics(doc, [])
      expect(metrics.budgetType).toBe('none')
      expect(metrics.budgetHours).toBe(0)
      expect(metrics.budgetAmount).toBe(0)
    })

    it('calculates hours-based budget correctly', () => {
      const doc = makeDocument({
        budgetType: 'hours',
        budgetHours: 10,
        hourlyRate: 100,
      })
      const sessions = [makeSession(120), makeSession(180)] // 5 hours
      const metrics = calculateBudgetMetrics(doc, sessions)

      expect(metrics.budgetType).toBe('hours')
      expect(metrics.budgetHours).toBe(10)
      expect(metrics.actualHours).toBe(5)
      expect(metrics.remainingHours).toBe(5)
      expect(metrics.hoursUsedPercentage).toBe(50)
      expect(metrics.budgetAmount).toBe(1000) // 10 * 100
      expect(metrics.actualAmount).toBe(500) // 5 * 100
      expect(metrics.remainingAmount).toBe(500)
      expect(metrics.isOverBudget).toBe(false)
    })

    it('calculates fixed-price budget correctly', () => {
      const doc = makeDocument({
        budgetType: 'fixed',
        budgetAmount: 5000,
        hourlyRate: 100,
      })
      const sessions = [makeSession(600)] // 10 hours
      const metrics = calculateBudgetMetrics(doc, sessions)

      expect(metrics.budgetType).toBe('fixed')
      expect(metrics.budgetAmount).toBe(5000)
      expect(metrics.budgetHours).toBe(50) // 5000 / 100
      expect(metrics.actualHours).toBe(10)
      expect(metrics.actualAmount).toBe(1000) // 10 * 100
    })

    it('detects over-budget condition', () => {
      const doc = makeDocument({
        budgetType: 'hours',
        budgetHours: 5,
        hourlyRate: 100,
      })
      const sessions = [makeSession(600)] // 10 hours > 5 budget
      const metrics = calculateBudgetMetrics(doc, sessions)

      expect(metrics.isOverBudget).toBe(true)
      expect(metrics.hoursUsedPercentage).toBe(200)
    })

    it('detects nearing-budget condition', () => {
      const doc = makeDocument({
        budgetType: 'hours',
        budgetHours: 10,
        hourlyRate: 100,
        budgetWarningThreshold: 80,
      })
      const sessions = [makeSession(540)] // 9 hours = 90%
      const metrics = calculateBudgetMetrics(doc, sessions)

      expect(metrics.isNearingBudget).toBe(true)
      expect(metrics.isOverBudget).toBe(false)
    })

    it('uses default warning threshold of 80', () => {
      const doc = makeDocument({
        budgetType: 'hours',
        budgetHours: 10,
        hourlyRate: 100,
      })
      const sessions = [makeSession(480)] // 8 hours = 80%
      const metrics = calculateBudgetMetrics(doc, sessions)

      expect(metrics.warningThreshold).toBe(80)
      expect(metrics.isNearingBudget).toBe(true)
    })

    it('is not nearing budget when under threshold', () => {
      const doc = makeDocument({
        budgetType: 'hours',
        budgetHours: 10,
        hourlyRate: 100,
        budgetWarningThreshold: 80,
      })
      const sessions = [makeSession(300)] // 5 hours = 50%
      const metrics = calculateBudgetMetrics(doc, sessions)

      expect(metrics.isNearingBudget).toBe(false)
      expect(metrics.isOverBudget).toBe(false)
    })

    it('clamps remainingHours and remainingAmount to 0 when over budget', () => {
      const doc = makeDocument({
        budgetType: 'hours',
        budgetHours: 2,
        hourlyRate: 100,
      })
      const sessions = [makeSession(300)] // 5 hours
      const metrics = calculateBudgetMetrics(doc, sessions)

      expect(metrics.remainingHours).toBe(0)
      expect(metrics.remainingAmount).toBe(0)
    })

    it('returns Infinity for estimatedDaysRemaining when no burn rate', () => {
      const doc = makeDocument({
        budgetType: 'hours',
        budgetHours: 10,
        hourlyRate: 100,
      })
      // No approvedAt means burn rate = 0
      const metrics = calculateBudgetMetrics(doc, [])
      expect(metrics.estimatedDaysRemaining).toBe(Infinity)
    })

    it('handles fixed budget with zero hourly rate', () => {
      const doc = makeDocument({
        budgetType: 'fixed',
        budgetAmount: 5000,
        hourlyRate: 0,
      })
      const metrics = calculateBudgetMetrics(doc, [])
      expect(metrics.budgetHours).toBe(0)
    })
  })

  // =========================================================================
  // calculateBurnRate
  // =========================================================================
  describe('calculateBurnRate', () => {
    it('returns 0 for empty sessions', () => {
      const doc = makeDocument()
      expect(calculateBurnRate(doc, [])).toBe(0)
    })

    it('returns 0 when document has no approvedAt', () => {
      const doc = makeDocument()
      const sessions = [makeSession(120)]
      expect(calculateBurnRate(doc, sessions)).toBe(0)
    })

    it('calculates burn rate with toDate-style approvedAt', () => {
      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      const doc = makeDocument({
        approvedAt: { toDate: () => tenDaysAgo } as any,
      })
      // 600 min = 10 hours over 10 days = 1 hour/day
      const sessions = [makeSession(600)]
      const rate = calculateBurnRate(doc, sessions)
      expect(rate).toBeCloseTo(1, 0)
    })

    it('calculates burn rate with seconds-style approvedAt', () => {
      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      const doc = makeDocument({
        approvedAt: { seconds: Math.floor(tenDaysAgo.getTime() / 1000) } as any,
      })
      const sessions = [makeSession(600)] // 10 hours
      const rate = calculateBurnRate(doc, sessions)
      expect(rate).toBeCloseTo(1, 0)
    })
  })

  // =========================================================================
  // getBudgetStatusColor
  // =========================================================================
  describe('getBudgetStatusColor', () => {
    it('returns red colors when percentage >= 100', () => {
      const result = getBudgetStatusColor(100)
      expect(result.bg).toBe('bg-red-100')
      expect(result.text).toBe('text-red-800')
      expect(result.border).toBe('border-red-200')
    })

    it('returns red for percentages above 100', () => {
      const result = getBudgetStatusColor(150)
      expect(result.bg).toBe('bg-red-100')
    })

    it('returns yellow when percentage >= threshold and < 100', () => {
      const result = getBudgetStatusColor(85) // default threshold 80
      expect(result.bg).toBe('bg-yellow-100')
      expect(result.text).toBe('text-yellow-800')
      expect(result.border).toBe('border-yellow-200')
    })

    it('returns yellow at exactly the threshold', () => {
      const result = getBudgetStatusColor(80, 80)
      expect(result.bg).toBe('bg-yellow-100')
    })

    it('returns blue when percentage >= 50 and < threshold', () => {
      const result = getBudgetStatusColor(60, 80)
      expect(result.bg).toBe('bg-blue-100')
      expect(result.text).toBe('text-blue-800')
      expect(result.border).toBe('border-blue-200')
    })

    it('returns green when percentage < 50', () => {
      const result = getBudgetStatusColor(25)
      expect(result.bg).toBe('bg-green-100')
      expect(result.text).toBe('text-green-800')
      expect(result.border).toBe('border-green-200')
    })

    it('returns green for 0 percentage', () => {
      const result = getBudgetStatusColor(0)
      expect(result.bg).toBe('bg-green-100')
    })

    it('respects custom threshold', () => {
      // 70 is above custom threshold 60, so yellow
      const result = getBudgetStatusColor(70, 60)
      expect(result.bg).toBe('bg-yellow-100')
    })
  })

  // =========================================================================
  // formatCurrency
  // =========================================================================
  describe('formatCurrency', () => {
    it('formats a whole number', () => {
      expect(formatCurrency(1000)).toBe('$1,000')
    })

    it('formats zero', () => {
      expect(formatCurrency(0)).toBe('$0')
    })

    it('rounds decimal values to whole numbers', () => {
      // maximumFractionDigits: 0
      const result = formatCurrency(1234.56)
      expect(result).toBe('$1,235')
    })

    it('formats large numbers with commas', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000')
    })

    it('formats negative numbers', () => {
      const result = formatCurrency(-500)
      expect(result).toContain('500')
      // Different locales may format negatives differently, just check value is present
    })
  })

  // =========================================================================
  // formatHours
  // =========================================================================
  describe('formatHours', () => {
    it('formats fractional hours as minutes', () => {
      expect(formatHours(0.5)).toBe('30m')
    })

    it('formats very small fractions', () => {
      expect(formatHours(0.25)).toBe('15m')
    })

    it('formats exact whole hours', () => {
      expect(formatHours(1)).toBe('1h')
      expect(formatHours(5)).toBe('5h')
    })

    it('formats hours and minutes', () => {
      expect(formatHours(1.5)).toBe('1h 30m')
    })

    it('formats 2 hours 15 minutes', () => {
      expect(formatHours(2.25)).toBe('2h 15m')
    })

    it('formats 0 as minutes', () => {
      expect(formatHours(0)).toBe('0m')
    })

    it('rounds minutes to nearest whole number', () => {
      // 1.33 hours = 1h and 0.33 * 60 = 19.8 -> rounds to 20m
      expect(formatHours(1.33)).toBe('1h 20m')
    })
  })
})
