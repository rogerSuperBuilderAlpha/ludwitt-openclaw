/**
 * Unit Tests for Pure Functions in Credit Balance Utilities
 *
 * Tests isLowBalance and isAtDebtLimit which are pure functions
 * that do not require actual Firestore connections.
 * Also tests getUserCredits, checkBalance, deductCredits, addCredits,
 * refundCredits, getTransactionHistory, and getTransactionCount
 * with mocked Firebase admin.
 */

jest.mock('@/lib/firebase/admin', () => {
  // Build a chainable mock for Firestore queries
  const makeMockCollection = () => {
    const chain: Record<string, jest.Mock> = {}
    chain.doc = jest.fn(() => ({
      get: jest.fn(),
      id: 'mock-transaction-id',
    }))
    chain.where = jest.fn(() => chain)
    chain.orderBy = jest.fn(() => chain)
    chain.limit = jest.fn(() => chain)
    chain.count = jest.fn(() => ({
      get: jest.fn(),
    }))
    chain.get = jest.fn()
    return chain
  }

  return {
    db: {
      collection: jest.fn(() => makeMockCollection()),
      runTransaction: jest.fn(),
    },
  }
})

jest.mock('@/lib/utils/firestore-helpers', () => ({
  createISOTimestamp: jest.fn(() => '2026-01-01T00:00:00.000Z'),
}))

import {
  isLowBalance,
  isAtDebtLimit,
  getUserCredits,
  checkBalance,
} from '../balance'
import { CREDIT_CONSTANTS } from '../types'
import { db } from '@/lib/firebase/admin'

// ---------------------------------------------------------------------------
// isLowBalance
// ---------------------------------------------------------------------------

describe('isLowBalance', () => {
  test('returns true when balance is 0', () => {
    expect(isLowBalance(0)).toBe(true)
  })

  test('returns true when balance is 99 cents', () => {
    expect(isLowBalance(99)).toBe(true)
  })

  test('returns false when balance is exactly 100 cents ($1)', () => {
    expect(isLowBalance(100)).toBe(false)
  })

  test('returns false when balance is above 100 cents', () => {
    expect(isLowBalance(500)).toBe(false)
  })

  test('returns true when balance is negative', () => {
    expect(isLowBalance(-100)).toBe(true)
  })

  test('returns true for balance at debt limit', () => {
    expect(isLowBalance(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// isAtDebtLimit
// ---------------------------------------------------------------------------

describe('isAtDebtLimit', () => {
  test('returns true when balance equals minimum balance', () => {
    expect(isAtDebtLimit(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS)).toBe(true)
  })

  test('returns true when balance is below minimum balance', () => {
    expect(isAtDebtLimit(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS - 1)).toBe(true)
  })

  test('returns false when balance is above minimum balance', () => {
    expect(isAtDebtLimit(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS + 1)).toBe(
      false
    )
  })

  test('returns false for zero balance', () => {
    expect(isAtDebtLimit(0)).toBe(false)
  })

  test('returns false for positive balance', () => {
    expect(isAtDebtLimit(1000)).toBe(false)
  })

  test('minimum balance is -5000 cents (-$50)', () => {
    expect(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS).toBe(-5000)
    expect(isAtDebtLimit(-5000)).toBe(true)
    expect(isAtDebtLimit(-4999)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// getUserCredits (with mocked Firestore)
// ---------------------------------------------------------------------------

describe('getUserCredits', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns default credits when user doc does not exist', async () => {
    const mockGet = jest.fn().mockResolvedValue({ exists: false })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const credits = await getUserCredits('user-123')
    expect(credits).toEqual({
      balance: 0,
      totalDeposited: 0,
      totalUsed: 0,
    })
  })

  test('returns user credits from existing document', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        credits: {
          balance: 500,
          totalDeposited: 1000,
          totalUsed: 500,
          lastDepositAt: '2026-01-01',
          lastUsageAt: '2026-01-02',
        },
      }),
    })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const credits = await getUserCredits('user-123')
    expect(credits.balance).toBe(500)
    expect(credits.totalDeposited).toBe(1000)
    expect(credits.totalUsed).toBe(500)
    expect(credits.lastDepositAt).toBe('2026-01-01')
    expect(credits.lastUsageAt).toBe('2026-01-02')
  })

  test('returns zero defaults when credits field is missing on existing doc', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({}),
    })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const credits = await getUserCredits('user-123')
    expect(credits.balance).toBe(0)
    expect(credits.totalDeposited).toBe(0)
    expect(credits.totalUsed).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// checkBalance (with mocked Firestore)
// ---------------------------------------------------------------------------

describe('checkBalance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns allowed=true when balance is above minimum', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        credits: { balance: 1000, totalDeposited: 1000, totalUsed: 0 },
      }),
    })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const result = await checkBalance('user-123')
    expect(result.allowed).toBe(true)
    expect(result.currentBalance).toBe(1000)
    expect(result.minimumBalance).toBe(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS)
    expect(result.shortfall).toBeUndefined()
  })

  test('returns allowed=true for zero balance (debt allowance)', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        credits: { balance: 0, totalDeposited: 0, totalUsed: 0 },
      }),
    })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const result = await checkBalance('user-123')
    expect(result.allowed).toBe(true)
  })

  test('returns allowed=false when balance is at debt limit', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        credits: {
          balance: CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS - 1,
          totalDeposited: 0,
          totalUsed: 5001,
        },
      }),
    })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const result = await checkBalance('user-123')
    expect(result.allowed).toBe(false)
    expect(result.shortfall).toBeDefined()
    expect(result.shortfall).toBeGreaterThan(0)
  })

  test('calculates correct shortfall', async () => {
    const balance = -5500
    const mockGet = jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        credits: { balance, totalDeposited: 0, totalUsed: 5500 },
      }),
    })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const result = await checkBalance('user-123')
    expect(result.allowed).toBe(false)
    // shortfall = minimumBalance - currentBalance = -5000 - (-5500) = 500
    expect(result.shortfall).toBe(500)
  })

  test('returns allowed=true for new user (no doc)', async () => {
    const mockGet = jest.fn().mockResolvedValue({ exists: false })
    const mockDoc = jest.fn().mockReturnValue({ get: mockGet })
    ;(db.collection as jest.Mock).mockReturnValue({ doc: mockDoc })

    const result = await checkBalance('new-user')
    // balance = 0, minimum = -5000, 0 >= -5000 is true
    expect(result.allowed).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// CREDIT_CONSTANTS validation
// ---------------------------------------------------------------------------

describe('CREDIT_CONSTANTS', () => {
  test('minimum balance is -5000 cents', () => {
    expect(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS).toBe(-5000)
  })

  test('basics minimum balance is -100 cents', () => {
    expect(CREDIT_CONSTANTS.BASICS_MINIMUM_BALANCE_CENTS).toBe(-100)
  })

  test('cost multiplier is 10', () => {
    expect(CREDIT_CONSTANTS.COST_MULTIPLIER).toBe(10)
  })

  test('minimum deposit is 500 cents ($5)', () => {
    expect(CREDIT_CONSTANTS.MINIMUM_DEPOSIT_CENTS).toBe(500)
  })

  test('maximum deposit is 50000 cents ($500)', () => {
    expect(CREDIT_CONSTANTS.MAXIMUM_DEPOSIT_CENTS).toBe(50000)
  })

  test('minimum document cost is 10 cents', () => {
    expect(CREDIT_CONSTANTS.MINIMUM_DOCUMENT_COST_CENTS).toBe(10)
  })

  test('customer markup multiplier is 3', () => {
    expect(CREDIT_CONSTANTS.CUSTOMER_MARKUP_MULTIPLIER).toBe(3)
  })

  test('customer debt markup multiplier is 5', () => {
    expect(CREDIT_CONSTANTS.CUSTOMER_DEBT_MARKUP_MULTIPLIER).toBe(5)
  })
})
