/**
 * @jest-environment node
 */

/**
 * Unit tests for Basics platform credit enforcement
 */

import { NextResponse } from 'next/server'

// Mock dependencies
jest.mock('../balance', () => ({
  getUserCredits: jest.fn(),
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
  checkBasicsBalance,
  isAtBasicsDebtLimit,
  insufficientBasicsCreditsError,
  withBasicsCreditTracking,
  checkBasicsCreditsBeforeCall,
  getBasicsBalanceStatus,
} from '../basics-enforcement'
import { getUserCredits, deductCredits } from '../balance'
import { calculateCosts, formatCentsAsDollars } from '../pricing'

// Typed mock references
const mockGetUserCredits = getUserCredits as jest.Mock
const mockDeductCredits = deductCredits as jest.Mock
const mockCalculateCosts = calculateCosts as jest.Mock
const mockFormatCentsAsDollars = formatCentsAsDollars as jest.Mock

describe('checkBasicsBalance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns allowed=true when balance is above minimum', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 500,
      totalDeposited: 1000,
      totalUsed: 500,
    })

    const result = await checkBasicsBalance('user-1')

    expect(result.allowed).toBe(true)
    expect(result.currentBalance).toBe(500)
    expect(result.minimumBalance).toBe(-100)
    expect(result.shortfall).toBeUndefined()
  })

  it('returns allowed=true when balance is exactly at minimum', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -100,
      totalDeposited: 0,
      totalUsed: 100,
    })

    const result = await checkBasicsBalance('user-1')

    expect(result.allowed).toBe(true)
    expect(result.currentBalance).toBe(-100)
    expect(result.shortfall).toBeUndefined()
  })

  it('returns allowed=true when balance is zero', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 0,
      totalDeposited: 0,
      totalUsed: 0,
    })

    const result = await checkBasicsBalance('user-1')

    expect(result.allowed).toBe(true)
    expect(result.currentBalance).toBe(0)
    expect(result.shortfall).toBeUndefined()
  })

  it('returns allowed=false when balance is below minimum', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -150,
      totalDeposited: 0,
      totalUsed: 150,
    })

    const result = await checkBasicsBalance('user-1')

    expect(result.allowed).toBe(false)
    expect(result.currentBalance).toBe(-150)
    expect(result.minimumBalance).toBe(-100)
    expect(result.shortfall).toBe(-100 - -150) // 50
  })

  it('calculates correct shortfall', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -300,
      totalDeposited: 0,
      totalUsed: 300,
    })

    const result = await checkBasicsBalance('user-1')

    expect(result.allowed).toBe(false)
    // shortfall = minimumBalance - currentBalance = -100 - (-300) = 200
    expect(result.shortfall).toBe(200)
  })

  it('calls getUserCredits with correct userId', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 100,
      totalDeposited: 100,
      totalUsed: 0,
    })

    await checkBasicsBalance('test-user-abc')

    expect(mockGetUserCredits).toHaveBeenCalledWith('test-user-abc')
  })
})

describe('isAtBasicsDebtLimit', () => {
  it('returns true when balance is at the limit exactly', () => {
    // BASICS_MINIMUM_BALANCE_CENTS = -100
    expect(isAtBasicsDebtLimit(-100)).toBe(true)
  })

  it('returns true when balance is below the limit', () => {
    expect(isAtBasicsDebtLimit(-200)).toBe(true)
  })

  it('returns false when balance is above the limit', () => {
    expect(isAtBasicsDebtLimit(-99)).toBe(false)
  })

  it('returns false when balance is zero', () => {
    expect(isAtBasicsDebtLimit(0)).toBe(false)
  })

  it('returns false when balance is positive', () => {
    expect(isAtBasicsDebtLimit(500)).toBe(false)
  })

  it('returns true at extreme negative values', () => {
    expect(isAtBasicsDebtLimit(-100000)).toBe(true)
  })
})

describe('insufficientBasicsCreditsError', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 402 status code', () => {
    mockFormatCentsAsDollars.mockImplementation((cents: number) => {
      const dollars = cents / 100
      return `$${Math.abs(dollars).toFixed(2)}`
    })

    const response = insufficientBasicsCreditsError(-150, -100)

    expect(response.status).toBe(402)
  })

  it('returns correct error body structure', async () => {
    mockFormatCentsAsDollars.mockImplementation((cents: number) => {
      const dollars = cents / 100
      return `$${Math.abs(dollars).toFixed(2)}`
    })

    const response = insufficientBasicsCreditsError(-150, -100)
    const body = await response.json()

    expect(body.success).toBe(false)
    expect(body.error).toBe('Insufficient credits')
    expect(body.code).toBe('INSUFFICIENT_CREDITS')
    expect(body.details).toHaveProperty('currentBalance', -150)
    expect(body.details).toHaveProperty('debtLimit', -100)
    expect(body.details).toHaveProperty('platform', 'basics')
    expect(body.details).toHaveProperty('upgradeUrl', '/account/credits')
  })

  it('includes formatted balance in message', async () => {
    mockFormatCentsAsDollars
      .mockReturnValueOnce('-$1.50')
      .mockReturnValueOnce('$1.00')

    const response = insufficientBasicsCreditsError(-150, -100)
    const body = await response.json()

    expect(body.details.currentBalanceFormatted).toBe('-$1.50')
    expect(body.details.message).toContain('-$1.50')
  })
})

describe('withBasicsCreditTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 402 when balance is insufficient', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -150,
      totalDeposited: 0,
      totalUsed: 150,
    })
    mockFormatCentsAsDollars.mockReturnValue('-$1.50')

    const result = await withBasicsCreditTracking(
      'user-1',
      'basics-check-answer',
      async () => ({
        response: 'correct',
        usage: { input_tokens: 100, output_tokens: 50 },
        model: 'claude-sonnet-4-5-20250929',
      })
    )

    expect(result).toBeInstanceOf(NextResponse)
    const body = await (result as NextResponse).json()
    expect(body.error).toBe('Insufficient credits')
    expect((result as NextResponse).status).toBe(402)
  })

  it('does not execute AI call when balance is insufficient', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -150,
      totalDeposited: 0,
      totalUsed: 150,
    })
    mockFormatCentsAsDollars.mockReturnValue('-$1.50')

    const aiCall = jest.fn().mockResolvedValue({
      response: 'should not be called',
      usage: { input_tokens: 100, output_tokens: 50 },
      model: 'claude-sonnet-4-5-20250929',
    })

    await withBasicsCreditTracking('user-1', 'test-endpoint', aiCall)

    expect(aiCall).not.toHaveBeenCalled()
  })

  it('executes AI call and deducts credits on success', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 500,
      totalDeposited: 1000,
      totalUsed: 500,
    })
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 2,
      chargedCostCents: 20,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: 480,
      transaction: { id: 'tx-1' },
    })

    const result = await withBasicsCreditTracking(
      'user-1',
      'basics-check-answer',
      async () => ({
        response: { correct: true, explanation: 'Great job!' },
        usage: { input_tokens: 300, output_tokens: 200 },
        model: 'claude-sonnet-4-5-20250929',
      })
    )

    // Should not be a NextResponse
    expect(result).not.toBeInstanceOf(NextResponse)
    expect(result).toEqual({
      result: { correct: true, explanation: 'Great job!' },
      costCharged: 20,
      newBalance: 480,
    })
  })

  it('calls calculateCosts with correct model and token counts', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 500,
      totalDeposited: 1000,
      totalUsed: 500,
    })
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 5,
      chargedCostCents: 50,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: 450,
      transaction: { id: 'tx-2' },
    })

    await withBasicsCreditTracking(
      'user-1',
      'basics-generate-problem',
      async () => ({
        response: 'problem text',
        usage: { input_tokens: 800, output_tokens: 500 },
        model: 'claude-haiku-3-5-20241022',
      })
    )

    expect(mockCalculateCosts).toHaveBeenCalledWith(
      'claude-haiku-3-5-20241022',
      800,
      500
    )
  })

  it('calls deductCredits with correct parameters', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 1000,
      totalDeposited: 2000,
      totalUsed: 1000,
    })
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 3,
      chargedCostCents: 30,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: 970,
      transaction: { id: 'tx-3' },
    })

    await withBasicsCreditTracking('user-abc', 'basics-explain', async () => ({
      response: 'explanation',
      usage: { input_tokens: 400, output_tokens: 600 },
      model: 'claude-sonnet-4-5-20250929',
    }))

    expect(mockDeductCredits).toHaveBeenCalledWith(
      'user-abc',
      30,
      expect.objectContaining({
        endpoint: 'basics-explain',
        model: 'claude-sonnet-4-5-20250929',
        inputTokens: 400,
        outputTokens: 600,
        rawCostCents: 3,
        chargedCostCents: 30,
      })
    )
  })

  it('propagates errors from the AI call', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 500,
      totalDeposited: 1000,
      totalUsed: 500,
    })

    await expect(
      withBasicsCreditTracking('user-1', 'basics-test', async () => {
        throw new Error('API timeout')
      })
    ).rejects.toThrow('API timeout')
  })

  it('does not deduct credits when AI call fails', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 500,
      totalDeposited: 1000,
      totalUsed: 500,
    })

    try {
      await withBasicsCreditTracking('user-1', 'basics-test', async () => {
        throw new Error('API error')
      })
    } catch {
      // Expected
    }

    expect(mockDeductCredits).not.toHaveBeenCalled()
    expect(mockCalculateCosts).not.toHaveBeenCalled()
  })

  it('works at the exact boundary (balance == minimum)', async () => {
    // balance -100 == BASICS_MINIMUM_BALANCE_CENTS -100, so allowed
    mockGetUserCredits.mockResolvedValue({
      balance: -100,
      totalDeposited: 0,
      totalUsed: 100,
    })
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 1,
      chargedCostCents: 10,
    })
    mockDeductCredits.mockResolvedValue({
      newBalance: -110,
      transaction: { id: 'tx-boundary' },
    })

    const result = await withBasicsCreditTracking(
      'user-1',
      'basics-boundary',
      async () => ({
        response: 'ok',
        usage: { input_tokens: 50, output_tokens: 30 },
        model: 'claude-sonnet-4-5-20250929',
      })
    )

    expect(result).not.toBeInstanceOf(NextResponse)
    expect(result).toEqual({
      result: 'ok',
      costCharged: 10,
      newBalance: -110,
    })
  })
})

describe('checkBasicsCreditsBeforeCall', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns null when balance is sufficient', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 200,
      totalDeposited: 500,
      totalUsed: 300,
    })

    const result = await checkBasicsCreditsBeforeCall(
      'user-1',
      'streaming-basics'
    )

    expect(result).toBeNull()
  })

  it('returns null at exact boundary balance', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -100,
      totalDeposited: 0,
      totalUsed: 100,
    })

    const result = await checkBasicsCreditsBeforeCall(
      'user-1',
      'streaming-basics'
    )

    expect(result).toBeNull()
  })

  it('returns 402 error when balance is below limit', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -101,
      totalDeposited: 0,
      totalUsed: 101,
    })
    mockFormatCentsAsDollars.mockReturnValue('-$1.01')

    const result = await checkBasicsCreditsBeforeCall(
      'user-1',
      'streaming-basics'
    )

    expect(result).not.toBeNull()
    expect(result).toBeInstanceOf(NextResponse)
    expect(result!.status).toBe(402)
  })

  it('returns 402 with correct error body', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -500,
      totalDeposited: 0,
      totalUsed: 500,
    })
    mockFormatCentsAsDollars.mockImplementation((cents: number) => {
      const dollars = cents / 100
      return `$${Math.abs(dollars).toFixed(2)}`
    })

    const result = await checkBasicsCreditsBeforeCall(
      'user-1',
      'streaming-basics'
    )
    const body = await result!.json()

    expect(body.success).toBe(false)
    expect(body.error).toBe('Insufficient credits')
    expect(body.code).toBe('INSUFFICIENT_CREDITS')
    expect(body.details.platform).toBe('basics')
  })

  it('returns null for zero balance (above minimum)', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 0,
      totalDeposited: 0,
      totalUsed: 0,
    })

    const result = await checkBasicsCreditsBeforeCall(
      'user-1',
      'streaming-basics'
    )

    expect(result).toBeNull()
  })
})

describe('getBasicsBalanceStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns correct status for healthy balance', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 500,
      totalDeposited: 1000,
      totalUsed: 500,
    })
    mockFormatCentsAsDollars.mockReturnValue('$5.00')

    const status = await getBasicsBalanceStatus('user-1')

    expect(status.balance).toBe(500)
    expect(status.balanceFormatted).toBe('$5.00')
    expect(status.canUseAI).toBe(true)
    expect(status.isLowBalance).toBe(false)
    expect(status.isAtLimit).toBe(false)
    expect(status.debtLimit).toBe(-100)
  })

  it('returns isLowBalance=true when balance is under $1 (100 cents)', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 50,
      totalDeposited: 100,
      totalUsed: 50,
    })
    mockFormatCentsAsDollars.mockReturnValue('$0.50')

    const status = await getBasicsBalanceStatus('user-1')

    expect(status.balance).toBe(50)
    expect(status.isLowBalance).toBe(true)
    expect(status.canUseAI).toBe(true)
    expect(status.isAtLimit).toBe(false)
  })

  it('returns isLowBalance=false when balance is exactly $1 (100 cents)', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 100,
      totalDeposited: 100,
      totalUsed: 0,
    })
    mockFormatCentsAsDollars.mockReturnValue('$1.00')

    const status = await getBasicsBalanceStatus('user-1')

    expect(status.isLowBalance).toBe(false)
  })

  it('returns isAtLimit=true and canUseAI=false when below debt limit', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -150,
      totalDeposited: 0,
      totalUsed: 150,
    })
    mockFormatCentsAsDollars.mockReturnValue('-$1.50')

    const status = await getBasicsBalanceStatus('user-1')

    expect(status.balance).toBe(-150)
    expect(status.balanceFormatted).toBe('-$1.50')
    expect(status.canUseAI).toBe(false)
    expect(status.isAtLimit).toBe(true)
    expect(status.isLowBalance).toBe(true) // -150 < 100
    expect(status.debtLimit).toBe(-100)
  })

  it('returns correct status at exact boundary', async () => {
    // balance == -100 == BASICS_MINIMUM_BALANCE_CENTS, so allowed (>=)
    mockGetUserCredits.mockResolvedValue({
      balance: -100,
      totalDeposited: 0,
      totalUsed: 100,
    })
    mockFormatCentsAsDollars.mockReturnValue('-$1.00')

    const status = await getBasicsBalanceStatus('user-1')

    expect(status.balance).toBe(-100)
    expect(status.canUseAI).toBe(true) // -100 >= -100
    expect(status.isAtLimit).toBe(false) // canUseAI is true, so not at limit
    expect(status.isLowBalance).toBe(true) // -100 < 100
  })

  it('returns canUseAI=true for zero balance', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 0,
      totalDeposited: 0,
      totalUsed: 0,
    })
    mockFormatCentsAsDollars.mockReturnValue('$0.00')

    const status = await getBasicsBalanceStatus('user-1')

    expect(status.balance).toBe(0)
    expect(status.canUseAI).toBe(true)
    expect(status.isAtLimit).toBe(false)
    expect(status.isLowBalance).toBe(true) // 0 < 100
  })

  it('returns correct debtLimit constant', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 1000,
      totalDeposited: 1000,
      totalUsed: 0,
    })
    mockFormatCentsAsDollars.mockReturnValue('$10.00')

    const status = await getBasicsBalanceStatus('user-1')

    expect(status.debtLimit).toBe(-100) // BASICS_MINIMUM_BALANCE_CENTS
  })

  it('calls formatCentsAsDollars with the balance', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: 250,
      totalDeposited: 500,
      totalUsed: 250,
    })
    mockFormatCentsAsDollars.mockReturnValue('$2.50')

    await getBasicsBalanceStatus('user-1')

    expect(mockFormatCentsAsDollars).toHaveBeenCalledWith(250)
  })
})
