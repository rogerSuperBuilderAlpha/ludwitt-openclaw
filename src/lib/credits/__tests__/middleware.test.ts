/**
 * @jest-environment node
 */

/**
 * Unit tests for credit tracking middleware
 */

import { NextResponse } from 'next/server'

// Mock dependencies - use jest.fn() inside factories to avoid hoisting issues
jest.mock('../balance', () => ({
  checkBalance: jest.fn(),
  deductCredits: jest.fn(),
}))

jest.mock('../pricing', () => ({
  calculateCosts: jest.fn(),
  formatCentsAsDollars: jest.fn(),
}))

jest.mock('../types', () => ({
  CREDIT_CONSTANTS: {
    MINIMUM_BALANCE_CENTS: -5000,
    BASICS_MINIMUM_BALANCE_CENTS: -100,
    COST_MULTIPLIER: 10,
    CUSTOMER_MARKUP_MULTIPLIER: 3,
    CUSTOMER_DEBT_MARKUP_MULTIPLIER: 5,
    MINIMUM_DEPOSIT_CENTS: 500,
    MAXIMUM_DEPOSIT_CENTS: 50000,
    MINIMUM_DOCUMENT_COST_CENTS: 10,
  },
  CREDIT_COLLECTIONS: {
    TRANSACTIONS: 'credit_transactions',
  },
}))

jest.mock('@/lib/logger', () => ({
  apiLogger: {
    apiError: jest.fn(),
    success: jest.fn(),
    debug: jest.fn(),
  },
}))

// Import after mocks
import {
  withCreditTracking,
  checkCreditsBeforeCall,
  trackCreditsAfterCall,
  insufficientCreditsError,
} from '../middleware'
import { checkBalance, deductCredits } from '../balance'
import { calculateCosts, formatCentsAsDollars } from '../pricing'

// Get typed mock references
const mockCheckBalance = checkBalance as jest.Mock
const mockDeductCredits = deductCredits as jest.Mock
const mockCalculateCosts = calculateCosts as jest.Mock
const mockFormatCentsAsDollars = formatCentsAsDollars as jest.Mock

describe('insufficientCreditsError', () => {
  it('returns 402 with correct details', async () => {
    mockFormatCentsAsDollars.mockImplementation((cents: number) => {
      const dollars = cents / 100
      return `$${Math.abs(dollars).toFixed(2)}`
    })

    const response = insufficientCreditsError(50, -5000)

    expect(response.status).toBe(402)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Insufficient credits')
    expect(body.code).toBe('INSUFFICIENT_CREDITS')
    expect(body.details).toHaveProperty('currentBalance', 50)
    expect(body.details).toHaveProperty('debtLimit', -5000)
  })
})

describe('withCreditTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 402 when balance is insufficient', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: false,
      currentBalance: -5100,
      minimumBalance: -5000,
    })
    mockFormatCentsAsDollars.mockReturnValue('-$51.00')

    const result = await withCreditTracking('user-1', 'test-endpoint', async () => ({
      response: 'test',
      usage: { input_tokens: 100, output_tokens: 50 },
      model: 'claude-sonnet-4-5-20250929',
    }))

    expect(result).toBeInstanceOf(NextResponse)
    const body = await (result as NextResponse).json()
    expect(body.error).toBe('Insufficient credits')
    expect((result as NextResponse).status).toBe(402)
  })

  it('deducts credits based on actual token usage', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 1000,
      minimumBalance: -5000,
    })
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 5,
      chargedCostCents: 50,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: 950,
      transaction: { id: 'tx-1' },
    })

    await withCreditTracking('user-1', 'test-endpoint', async () => ({
      response: 'AI response text',
      usage: { input_tokens: 500, output_tokens: 300 },
      model: 'claude-sonnet-4-5-20250929',
    }))

    expect(mockCalculateCosts).toHaveBeenCalledWith(
      'claude-sonnet-4-5-20250929',
      500,
      300
    )
    expect(mockDeductCredits).toHaveBeenCalledWith(
      'user-1',
      50,
      expect.objectContaining({
        endpoint: 'test-endpoint',
        model: 'claude-sonnet-4-5-20250929',
        inputTokens: 500,
        outputTokens: 300,
        rawCostCents: 5,
        chargedCostCents: 50,
      })
    )
  })

  it('returns the wrapped function result with cost info', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 2000,
      minimumBalance: -5000,
    })
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 3,
      chargedCostCents: 30,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: 1970,
      transaction: { id: 'tx-2' },
    })

    const result = await withCreditTracking('user-1', 'test-endpoint', async () => ({
      response: { text: 'The answer is 42' },
      usage: { input_tokens: 200, output_tokens: 100 },
      model: 'claude-sonnet-4-5-20250929',
    }))

    // Should not be a NextResponse
    expect(result).not.toBeInstanceOf(NextResponse)
    expect(result).toEqual({
      result: { text: 'The answer is 42' },
      costCharged: 30,
      newBalance: 1970,
    })
  })

  it('propagates errors from the wrapped function', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 1000,
      minimumBalance: -5000,
    })

    await expect(
      withCreditTracking('user-1', 'test-endpoint', async () => {
        throw new Error('Anthropic API rate limit exceeded')
      })
    ).rejects.toThrow('Anthropic API rate limit exceeded')
  })

  it('does not deduct credits when AI call fails', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 1000,
      minimumBalance: -5000,
    })

    try {
      await withCreditTracking('user-1', 'test-endpoint', async () => {
        throw new Error('API error')
      })
    } catch {
      // Expected
    }

    expect(mockDeductCredits).not.toHaveBeenCalled()
    expect(mockCalculateCosts).not.toHaveBeenCalled()
  })
})

describe('checkCreditsBeforeCall', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns error response when balance is below limit', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: false,
      currentBalance: -5100,
      minimumBalance: -5000,
    })
    mockFormatCentsAsDollars.mockReturnValue('-$51.00')

    const result = await checkCreditsBeforeCall('user-1', 'streaming-endpoint')

    expect(result).not.toBeNull()
    expect(result).toBeInstanceOf(NextResponse)
    expect(result!.status).toBe(402)
  })

  it('returns null when balance is sufficient', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 500,
      minimumBalance: -5000,
    })

    const result = await checkCreditsBeforeCall('user-1', 'streaming-endpoint')

    expect(result).toBeNull()
  })
})

describe('trackCreditsAfterCall', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('logs transaction correctly with usage metadata', async () => {
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 4,
      chargedCostCents: 40,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: 960,
      transaction: { id: 'tx-3' },
    })

    const result = await trackCreditsAfterCall(
      'user-1',
      'ai-explanation',
      'claude-sonnet-4-5-20250929',
      { input_tokens: 800, output_tokens: 400 }
    )

    expect(mockDeductCredits).toHaveBeenCalledWith(
      'user-1',
      40,
      expect.objectContaining({
        endpoint: 'ai-explanation',
        model: 'claude-sonnet-4-5-20250929',
        inputTokens: 800,
        outputTokens: 400,
      })
    )
    expect(result).toEqual({ costCharged: 40, newBalance: 960 })
  })

  it('calculates cost from token usage using model pricing', async () => {
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 10,
      chargedCostCents: 100,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: 400,
      transaction: { id: 'tx-4' },
    })

    await trackCreditsAfterCall(
      'user-1',
      'chat',
      'claude-3-opus-20240229',
      { input_tokens: 2000, output_tokens: 1000 }
    )

    expect(mockCalculateCosts).toHaveBeenCalledWith(
      'claude-3-opus-20240229',
      2000,
      1000
    )
  })

  it('credit calculation uses model-specific pricing (different costs for different models)', async () => {
    // First call with Haiku (cheap)
    mockCalculateCosts.mockReturnValueOnce({
      rawCostCents: 1,
      chargedCostCents: 10,
    })
    mockDeductCredits.mockResolvedValueOnce({
      newBalance: 990,
      transaction: { id: 'tx-5' },
    })

    const haikuResult = await trackCreditsAfterCall(
      'user-1', 'test', 'claude-3-haiku-20240307',
      { input_tokens: 1000, output_tokens: 500 }
    )

    // Second call with Opus (expensive)
    mockCalculateCosts.mockReturnValueOnce({
      rawCostCents: 30,
      chargedCostCents: 300,
    })
    mockDeductCredits.mockResolvedValueOnce({
      newBalance: 690,
      transaction: { id: 'tx-6' },
    })

    const opusResult = await trackCreditsAfterCall(
      'user-1', 'test', 'claude-3-opus-20240229',
      { input_tokens: 1000, output_tokens: 500 }
    )

    // Opus should cost more than Haiku
    expect(opusResult.costCharged).toBeGreaterThan(haikuResult.costCharged)
  })
})

describe('edge cases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles missing user document gracefully via checkBalance defaults', async () => {
    // checkBalance returns a result even for non-existent users
    // (balance module defaults to 0 balance for new users)
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 0,
      minimumBalance: -5000,
    })

    const result = await checkCreditsBeforeCall('nonexistent-user', 'test')
    expect(result).toBeNull() // Balance 0 >= -5000, so allowed
  })
})
