/**
 * @jest-environment node
 */

/**
 * Extended edge-case tests for credit tracking middleware
 *
 * Covers scenarios not handled in the base middleware.test.ts:
 * - AI call succeeds but deduction fails
 * - Insufficient credits detected mid-flow (during deduction)
 * - checkCreditsBeforeCall at exact debt limit
 * - trackCreditsAfterCall with very large token counts
 * - getBalanceStatus integration
 */

import { NextResponse } from 'next/server'

// Mock dependencies
jest.mock('../balance', () => ({
  checkBalance: jest.fn(),
  deductCredits: jest.fn(),
}))

jest.mock('../pricing', () => ({
  calculateCosts: jest.fn(),
  formatCentsAsDollars: jest.fn((cents: number) => {
    const dollars = cents / 100
    return dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }),
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

import {
  withCreditTracking,
  checkCreditsBeforeCall,
  trackCreditsAfterCall,
  getBalanceStatus,
} from '../middleware'
import { checkBalance, deductCredits } from '../balance'
import { calculateCosts } from '../pricing'

const mockCheckBalance = checkBalance as jest.Mock
const mockDeductCredits = deductCredits as jest.Mock
const mockCalculateCosts = calculateCosts as jest.Mock

// ---------------------------------------------------------------------------
// withCreditTracking — edge cases
// ---------------------------------------------------------------------------

describe('withCreditTracking edge cases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 402 when AI call succeeds but deduction fails with INSUFFICIENT_CREDITS', async () => {
    // Balance check passes initially
    mockCheckBalance
      .mockResolvedValueOnce({
        allowed: true,
        currentBalance: 10,
        minimumBalance: -5000,
      })
      // Second call (after deduction failure) returns depleted balance
      .mockResolvedValueOnce({
        allowed: false,
        currentBalance: -5100,
        minimumBalance: -5000,
      })

    mockCalculateCosts.mockReturnValue({
      rawCostCents: 100,
      chargedCostCents: 1000,
    })

    // Deduction fails because another concurrent request already depleted balance
    mockDeductCredits.mockRejectedValue(new Error('INSUFFICIENT_CREDITS'))

    const result = await withCreditTracking(
      'user-1',
      'test-endpoint',
      async () => ({
        response: 'AI response that succeeded',
        usage: { input_tokens: 5000, output_tokens: 2000 },
        model: 'claude-sonnet-4-5-20250929',
      })
    )

    // Should return a 402 error response, not the AI result
    expect(result).toBeInstanceOf(NextResponse)
    const body = await (result as NextResponse).json()
    expect(body.error).toBe('Insufficient credits')
    expect((result as NextResponse).status).toBe(402)
  })

  it('re-throws non-INSUFFICIENT_CREDITS errors from deduction', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 1000,
      minimumBalance: -5000,
    })

    mockCalculateCosts.mockReturnValue({
      rawCostCents: 5,
      chargedCostCents: 50,
    })

    // Firestore transaction fails for some other reason
    mockDeductCredits.mockRejectedValue(
      new Error('Firestore transaction timeout')
    )

    await expect(
      withCreditTracking('user-1', 'test-endpoint', async () => ({
        response: 'AI response',
        usage: { input_tokens: 100, output_tokens: 50 },
        model: 'claude-sonnet-4-5-20250929',
      }))
    ).rejects.toThrow('Firestore transaction timeout')
  })

  it('handles zero-token usage gracefully', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 500,
      minimumBalance: -5000,
    })

    mockCalculateCosts.mockReturnValue({
      rawCostCents: 0,
      chargedCostCents: 1, // Minimum charge is 1 cent
    })

    mockDeductCredits.mockResolvedValue({
      newBalance: 499,
      transaction: { id: 'tx-zero' },
    })

    const result = await withCreditTracking(
      'user-1',
      'test-endpoint',
      async () => ({
        response: { text: '' },
        usage: { input_tokens: 0, output_tokens: 0 },
        model: 'claude-sonnet-4-5-20250929',
      })
    )

    expect(result).not.toBeInstanceOf(NextResponse)
    expect(mockCalculateCosts).toHaveBeenCalledWith(
      'claude-sonnet-4-5-20250929',
      0,
      0
    )
  })
})

// ---------------------------------------------------------------------------
// checkCreditsBeforeCall — edge cases
// ---------------------------------------------------------------------------

describe('checkCreditsBeforeCall edge cases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 402 when user is exactly at debt limit', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: false,
      currentBalance: -5000,
      minimumBalance: -5000,
    })

    const result = await checkCreditsBeforeCall(
      'user-at-limit',
      'streaming-endpoint'
    )

    // The balance module returns allowed=false at exactly -5000
    // (checkBalance: credits.balance >= minimumBalance, -5000 >= -5000 is true)
    // But we're mocking allowed: false to simulate that scenario
    expect(result).not.toBeNull()
    expect(result).toBeInstanceOf(NextResponse)
    expect(result!.status).toBe(402)
  })

  it('returns null when user has exactly 0 balance', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 0,
      minimumBalance: -5000,
    })

    const result = await checkCreditsBeforeCall(
      'user-zero',
      'streaming-endpoint'
    )

    expect(result).toBeNull()
  })

  it('returns null when user has negative but allowed balance', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: -4999,
      minimumBalance: -5000,
    })

    const result = await checkCreditsBeforeCall(
      'user-in-debt',
      'streaming-endpoint'
    )

    expect(result).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// trackCreditsAfterCall — edge cases
// ---------------------------------------------------------------------------

describe('trackCreditsAfterCall edge cases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles very large token counts', async () => {
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 5000,
      chargedCostCents: 50000,
    })

    mockDeductCredits.mockResolvedValue({
      newBalance: -45000,
      transaction: { id: 'tx-large' },
    })

    const result = await trackCreditsAfterCall(
      'user-1',
      'long-document-analysis',
      'claude-sonnet-4-5-20250929',
      { input_tokens: 200000, output_tokens: 100000 }
    )

    expect(mockCalculateCosts).toHaveBeenCalledWith(
      'claude-sonnet-4-5-20250929',
      200000,
      100000
    )
    expect(result.costCharged).toBe(50000)
    expect(result.newBalance).toBe(-45000)
  })

  it('re-throws INSUFFICIENT_CREDITS for streaming deduction failure', async () => {
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 50,
      chargedCostCents: 500,
    })

    mockDeductCredits.mockRejectedValue(new Error('INSUFFICIENT_CREDITS'))

    await expect(
      trackCreditsAfterCall(
        'user-1',
        'streaming-chat',
        'claude-sonnet-4-5-20250929',
        { input_tokens: 1000, output_tokens: 500 }
      )
    ).rejects.toThrow('INSUFFICIENT_CREDITS')
  })

  it('re-throws non-credit errors from deduction', async () => {
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 5,
      chargedCostCents: 50,
    })

    mockDeductCredits.mockRejectedValue(new Error('Network timeout'))

    await expect(
      trackCreditsAfterCall(
        'user-1',
        'streaming-chat',
        'claude-sonnet-4-5-20250929',
        { input_tokens: 100, output_tokens: 50 }
      )
    ).rejects.toThrow('Network timeout')
  })

  it('returns correct cost even for minimal token usage', async () => {
    mockCalculateCosts.mockReturnValue({
      rawCostCents: 1,
      chargedCostCents: 1, // Minimum charge
    })

    mockDeductCredits.mockResolvedValue({
      newBalance: 999,
      transaction: { id: 'tx-min' },
    })

    const result = await trackCreditsAfterCall(
      'user-1',
      'quick-check',
      'claude-3-haiku-20240307',
      { input_tokens: 10, output_tokens: 5 }
    )

    expect(result.costCharged).toBe(1)
    expect(result.newBalance).toBe(999)
  })
})

// ---------------------------------------------------------------------------
// getBalanceStatus
// ---------------------------------------------------------------------------

describe('getBalanceStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns canUseAI true for allowed users', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 5000,
      minimumBalance: -5000,
    })

    const status = await getBalanceStatus('user-1')

    expect(status.canUseAI).toBe(true)
    expect(status.balance).toBe(5000)
    expect(status.isLowBalance).toBe(false)
    expect(status.debtLimit).toBe(-5000)
  })

  it('flags low balance when under $1 (100 cents)', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: true,
      currentBalance: 50,
      minimumBalance: -5000,
    })

    const status = await getBalanceStatus('user-1')

    expect(status.isLowBalance).toBe(true)
    expect(status.canUseAI).toBe(true)
  })

  it('returns canUseAI false when not allowed', async () => {
    mockCheckBalance.mockResolvedValue({
      allowed: false,
      currentBalance: -5100,
      minimumBalance: -5000,
    })

    const status = await getBalanceStatus('user-1')

    expect(status.canUseAI).toBe(false)
    expect(status.isLowBalance).toBe(true)
  })
})
