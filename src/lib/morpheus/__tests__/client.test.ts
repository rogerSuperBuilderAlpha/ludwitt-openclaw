/**
 * @jest-environment node
 */

/**
 * Unit tests for Morpheus Builders API client
 *
 * Tests weiToMor, getCurrentMonthKey, getWalletStakingInfo,
 * and getMultiWalletStakingInfo with mocked fetch.
 */

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}))

import {
  weiToMor,
  getCurrentMonthKey,
  getWalletStakingInfo,
  getMultiWalletStakingInfo,
} from '../client'
import { MORPHEUS_CONFIG } from '../types'

// Mock global fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

/**
 * Helper to create a stakers API response
 */
function createStakersResponse(
  stakers: Array<{
    address: string
    staked: string
    stakedFormatted: number
    lastStake: string
    lastStakeDate: string | null
  }>,
  hasMore = false,
  offset = 0,
  total = stakers.length
) {
  return {
    success: true,
    network: 'base',
    timestamp: new Date().toISOString(),
    subnetId: MORPHEUS_CONFIG.SUBNET_ID,
    pagination: {
      limit: 100,
      offset,
      total,
      hasMore,
    },
    data: {
      stakers,
      totals: {
        totalStakers: total,
        totalStaked: '0',
        totalStakedFormatted: 0,
      },
    },
  }
}

// ---------------------------------------------------------------------------
// weiToMor
// ---------------------------------------------------------------------------

describe('weiToMor', () => {
  it('converts a standard wei amount to MOR', () => {
    // 1 MOR = 1e18 wei
    const result = weiToMor('1000000000000000000')
    expect(result).toBe(1)
  })

  it('converts zero wei to 0 MOR', () => {
    expect(weiToMor('0')).toBe(0)
  })

  it('converts a large wei amount correctly', () => {
    // 100 MOR
    const result = weiToMor('100000000000000000000')
    expect(result).toBe(100)
  })

  it('handles fractional MOR amounts', () => {
    // 0.5 MOR = 5e17 wei
    const result = weiToMor('500000000000000000')
    expect(result).toBe(0.5)
  })

  it('converts 10 MOR correctly', () => {
    const result = weiToMor('10000000000000000000')
    expect(result).toBe(10)
  })
})

// ---------------------------------------------------------------------------
// getCurrentMonthKey
// ---------------------------------------------------------------------------

describe('getCurrentMonthKey', () => {
  it('returns a string in YYYY-MM format', () => {
    const key = getCurrentMonthKey()
    expect(key).toMatch(/^\d{4}-\d{2}$/)
  })

  it('matches the current year and month', () => {
    const now = new Date()
    const expectedYear = now.getFullYear()
    const expectedMonth = String(now.getMonth() + 1).padStart(2, '0')
    expect(getCurrentMonthKey()).toBe(`${expectedYear}-${expectedMonth}`)
  })

  it('zero-pads single-digit months', () => {
    // We can only verify the format since we can not control Date.now() without
    // jest.useFakeTimers here. The regex ensures padding.
    const key = getCurrentMonthKey()
    const month = key.split('-')[1]
    expect(month.length).toBe(2)
  })
})

// ---------------------------------------------------------------------------
// getWalletStakingInfo
// ---------------------------------------------------------------------------

describe('getWalletStakingInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns staking info when wallet is found on first page', async () => {
    const staker = {
      address: '0xABC123',
      staked: '10000000000000000000',
      stakedFormatted: 10,
      lastStake: '1700000000',
      lastStakeDate: '2025-11-14T22:13:20.000Z',
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createStakersResponse([staker], false),
    })

    const result = await getWalletStakingInfo('0xABC123')

    expect(result.isStaking).toBe(true)
    expect(result.walletAddress).toBe('0xabc123')
    expect(result.stakedMor).toBe(10)
    expect(result.monthlyAllowanceCents).toBe(
      10 * MORPHEUS_CONFIG.CENTS_PER_MOR_PER_MONTH
    )
    expect(result.lastStakeDate).toBe('2025-11-14T22:13:20.000Z')
  })

  it('returns isStaking false when wallet is not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createStakersResponse([], false),
    })

    const result = await getWalletStakingInfo('0xNOTFOUND')

    expect(result.isStaking).toBe(false)
    expect(result.walletAddress).toBe('0xnotfound')
    expect(result.stakedMor).toBe(0)
    expect(result.monthlyAllowanceCents).toBe(0)
    expect(result.lastStakeDate).toBeNull()
  })

  it('handles pagination to find a wallet on a later page', async () => {
    // Page 1: different staker, hasMore = true
    const otherStaker = {
      address: '0xOTHER',
      staked: '5000000000000000000',
      stakedFormatted: 5,
      lastStake: '1700000000',
      lastStakeDate: null,
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createStakersResponse([otherStaker], true, 0, 200),
    })

    // Page 2: target staker, hasMore = false
    const targetStaker = {
      address: '0xTARGET',
      staked: '20000000000000000000',
      stakedFormatted: 20,
      lastStake: '1700000000',
      lastStakeDate: '2025-12-01T00:00:00.000Z',
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createStakersResponse([targetStaker], false, 100, 200),
    })

    const result = await getWalletStakingInfo('0xTARGET')

    expect(result.isStaking).toBe(true)
    expect(result.stakedMor).toBe(20)
    expect(result.monthlyAllowanceCents).toBe(2000)
    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  it('throws on API HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })

    await expect(getWalletStakingInfo('0xABC123')).rejects.toThrow(
      'Morpheus API error: 500 Internal Server Error'
    )
  })

  it('throws when API returns unsuccessful response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: false,
        network: 'base',
        timestamp: new Date().toISOString(),
        error: 'Subnet not found',
        data: null,
      }),
    })

    await expect(getWalletStakingInfo('0xABC123')).rejects.toThrow(
      'Morpheus API returned unsuccessful response'
    )
  })

  it('performs case-insensitive address matching', async () => {
    const staker = {
      address: '0xAbCdEf1234567890',
      staked: '5000000000000000000',
      stakedFormatted: 5,
      lastStake: '1700000000',
      lastStakeDate: null,
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createStakersResponse([staker], false),
    })

    // Query with all-uppercase version
    const result = await getWalletStakingInfo('0xABCDEF1234567890')

    expect(result.isStaking).toBe(true)
    expect(result.walletAddress).toBe('0xabcdef1234567890')
  })

  it('calculates monthlyAllowanceCents using floor', async () => {
    const staker = {
      address: '0xwallet',
      staked: '1500000000000000000', // 1.5 MOR
      stakedFormatted: 1.5,
      lastStake: '1700000000',
      lastStakeDate: null,
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createStakersResponse([staker], false),
    })

    const result = await getWalletStakingInfo('0xWALLET')

    // 1.5 * 100 = 150, Math.floor(150) = 150
    expect(result.monthlyAllowanceCents).toBe(150)
  })
})

// ---------------------------------------------------------------------------
// getMultiWalletStakingInfo
// ---------------------------------------------------------------------------

describe('getMultiWalletStakingInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('aggregates staking info across multiple wallets', async () => {
    // Wallet 1: staking 10 MOR
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        createStakersResponse([
          {
            address: '0xwallet1',
            staked: '10000000000000000000',
            stakedFormatted: 10,
            lastStake: '1700000000',
            lastStakeDate: null,
          },
        ]),
    })

    // Wallet 2: staking 20 MOR
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        createStakersResponse([
          {
            address: '0xwallet2',
            staked: '20000000000000000000',
            stakedFormatted: 20,
            lastStake: '1700000000',
            lastStakeDate: null,
          },
        ]),
    })

    const result = await getMultiWalletStakingInfo(['0xWALLET1', '0xWALLET2'])

    expect(result.wallets).toHaveLength(2)
    expect(result.totalStakedMor).toBe(30)
    expect(result.totalMonthlyAllowanceCents).toBe(3000)
  })

  it('handles mixed staking and non-staking wallets', async () => {
    // Wallet 1: staking
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        createStakersResponse([
          {
            address: '0xstaker',
            staked: '5000000000000000000',
            stakedFormatted: 5,
            lastStake: '1700000000',
            lastStakeDate: null,
          },
        ]),
    })

    // Wallet 2: not staking
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createStakersResponse([], false),
    })

    const result = await getMultiWalletStakingInfo(['0xSTAKER', '0xNONSTAKER'])

    expect(result.wallets).toHaveLength(2)
    expect(result.wallets[0].isStaking).toBe(true)
    expect(result.wallets[1].isStaking).toBe(false)
    expect(result.totalStakedMor).toBe(5)
    expect(result.totalMonthlyAllowanceCents).toBe(500)
  })

  it('returns zero totals for empty wallet array', async () => {
    const result = await getMultiWalletStakingInfo([])

    expect(result.wallets).toHaveLength(0)
    expect(result.totalStakedMor).toBe(0)
    expect(result.totalMonthlyAllowanceCents).toBe(0)
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
