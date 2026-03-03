/**
 * Unit tests for credit pricing calculations
 */

import {
  calculateRawCostCents,
  calculateChargedCostCents,
  calculateCosts,
  formatCentsAsDollars,
  estimateCostFromPromptLength,
  getModelPricing,
  MODEL_PRICING,
} from '../pricing'
import { CREDIT_CONSTANTS } from '../types'

describe('Credit Pricing', () => {
  describe('getModelPricing', () => {
    it('returns correct pricing for known models', () => {
      const sonnetPricing = getModelPricing('claude-3-5-sonnet-20241022')
      expect(sonnetPricing.inputPerMillion).toBe(3.0)
      expect(sonnetPricing.outputPerMillion).toBe(15.0)
    })

    it('returns default pricing for unknown models', () => {
      const unknownPricing = getModelPricing('unknown-model')
      expect(unknownPricing.inputPerMillion).toBe(3.0)
      expect(unknownPricing.outputPerMillion).toBe(15.0)
    })

    it('has pricing for all documented models', () => {
      expect(MODEL_PRICING['claude-3-5-sonnet-20241022']).toBeDefined()
      expect(MODEL_PRICING['claude-3-5-sonnet-20241022']).toBeDefined()
      expect(MODEL_PRICING['claude-3-haiku-20240307']).toBeDefined()
      expect(MODEL_PRICING['claude-3-opus-20240229']).toBeDefined()
    })
  })

  describe('calculateRawCostCents', () => {
    it('calculates correct cost for Sonnet model', () => {
      // 1000 input tokens at $3/1M = $0.003
      // 500 output tokens at $15/1M = $0.0075
      // Total = $0.0105 = 1.05 cents, rounded up = 2 cents
      const cost = calculateRawCostCents('claude-3-5-sonnet-20241022', 1000, 500)
      expect(cost).toBe(2) // Rounded up
    })

    it('calculates correct cost for larger token counts', () => {
      // 100,000 input tokens at $3/1M = $0.30
      // 10,000 output tokens at $15/1M = $0.15
      // Total = $0.45 = 45 cents (may round up to 46)
      const cost = calculateRawCostCents('claude-3-5-sonnet-20241022', 100000, 10000)
      expect(cost).toBeGreaterThanOrEqual(45)
      expect(cost).toBeLessThanOrEqual(46)
    })

    it('calculates correct cost for Haiku model (cheaper)', () => {
      // 1000 input tokens at $0.25/1M = $0.00025
      // 500 output tokens at $1.25/1M = $0.000625
      // Total = $0.000875 = 0.0875 cents, rounded up = 1 cent
      const cost = calculateRawCostCents('claude-3-haiku-20240307', 1000, 500)
      expect(cost).toBe(1)
    })

    it('rounds up to nearest cent', () => {
      // Even tiny usage should round up to at least 1 cent
      const cost = calculateRawCostCents('claude-3-haiku-20240307', 1, 1)
      expect(cost).toBeGreaterThanOrEqual(1)
    })
  })

  describe('calculateChargedCostCents', () => {
    it('applies 10x markup', () => {
      // Markup is applied to USD before rounding, so chargedCents may differ
      // slightly from rawCents * 10 due to rounding at different stages.
      // 100k input @ $3/M = $0.30, 10k output @ $15/M = $0.15 → $0.45 raw
      // Charged: $0.45 * 10 = $4.50 ≈ 450-451 cents (floating-point ceil)
      const chargedCost = calculateChargedCostCents('claude-3-5-sonnet-20241022', 100000, 10000)
      expect(chargedCost).toBeGreaterThanOrEqual(450)
      expect(chargedCost).toBeLessThanOrEqual(451)
    })

    it('ensures minimum charge of 1 cent', () => {
      const cost = calculateChargedCostCents('claude-3-haiku-20240307', 1, 1)
      expect(cost).toBeGreaterThanOrEqual(1)
    })

    it('calculates expected cost for typical AI explanation', () => {
      // Typical explanation: ~500 input tokens, ~300 output tokens
      // Raw: (500 * 3 + 300 * 15) / 1M = $0.0060
      // Charged: $0.0060 * 10 = $0.06 = 6 cents
      const cost = calculateChargedCostCents('claude-3-5-sonnet-20241022', 500, 300)
      expect(cost).toBe(6)
    })
  })

  describe('calculateCosts', () => {
    it('returns both raw and charged costs', () => {
      // 10k input @ $3/M = $0.03, 5k output @ $15/M = $0.075 → $0.105 raw
      // rawCostCents = ceil(0.105 * 100) = 11
      // chargedCostCents = ceil(0.105 * 10 * 100) = ceil(105) = 105
      const { rawCostCents, chargedCostCents } = calculateCosts(
        'claude-3-5-sonnet-20241022',
        10000,
        5000
      )
      expect(rawCostCents).toBe(11)
      expect(chargedCostCents).toBe(105)
    })
  })

  describe('formatCentsAsDollars', () => {
    it('formats positive amounts correctly', () => {
      expect(formatCentsAsDollars(100)).toBe('$1.00')
      expect(formatCentsAsDollars(1050)).toBe('$10.50')
      expect(formatCentsAsDollars(10000)).toBe('$100.00')
    })

    it('formats zero correctly', () => {
      expect(formatCentsAsDollars(0)).toBe('$0.00')
    })

    it('formats negative amounts correctly', () => {
      expect(formatCentsAsDollars(-500)).toBe('-$5.00')
    })

    it('formats single cents correctly', () => {
      expect(formatCentsAsDollars(1)).toBe('$0.01')
      expect(formatCentsAsDollars(5)).toBe('$0.05')
    })
  })

  describe('estimateCostFromPromptLength', () => {
    it('estimates cost based on character count', () => {
      // 400 characters ≈ 100 tokens
      const { estimatedCents, estimatedDollars } = estimateCostFromPromptLength(
        'claude-3-5-sonnet-20241022',
        400,
        500
      )
      expect(estimatedCents).toBeGreaterThan(0)
      expect(estimatedDollars).toMatch(/^\$\d+\.\d{2}$/)
    })

    it('uses default output tokens if not specified', () => {
      const result = estimateCostFromPromptLength('claude-3-5-sonnet-20241022', 1000)
      expect(result.estimatedCents).toBeGreaterThan(0)
    })
  })
})

describe('CREDIT_CONSTANTS', () => {
  it('has correct minimum balance (debt limit)', () => {
    expect(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS).toBe(-5000) // -$50.00
  })

  it('has correct cost multiplier', () => {
    expect(CREDIT_CONSTANTS.COST_MULTIPLIER).toBe(10)
  })

  it('has reasonable deposit limits', () => {
    expect(CREDIT_CONSTANTS.MINIMUM_DEPOSIT_CENTS).toBe(500) // $5.00
    expect(CREDIT_CONSTANTS.MAXIMUM_DEPOSIT_CENTS).toBe(50000) // $500.00
  })
})





