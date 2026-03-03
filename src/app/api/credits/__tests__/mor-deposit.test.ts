/**
 * @jest-environment node
 */

/**
 * Unit tests for /api/credits/mor-deposit
 *
 * POST handler tests:
 * - Auth rejection (401)
 * - Rate limit rejection (429)
 * - Missing required fields (400)
 * - Success: verification-only request (200)
 * - Success: claim credits (200)
 *
 * GET handler tests:
 * - Auth rejection (401)
 * - Rate limit rejection (429)
 * - Success with no linked wallets (200)
 * - Success with linked wallets (200)
 */

import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/firebase/admin', () => ({
  db: {
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnThis(),
      get: jest.fn(),
      set: jest.fn(),
    }),
  },
}))

jest.mock('@/lib/rate-limit/upstash', () => ({
  checkRateLimit: jest.fn().mockResolvedValue({
    success: true,
    limit: 5,
    remaining: 4,
    reset: Date.now() + 60000,
  }),
  rateLimitedResponse: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  apiLogger: {
    apiError: jest.fn(),
    apiWarn: jest.fn(),
    success: jest.fn(),
  },
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}))

jest.mock('@/lib/web3/signature', () => ({
  verifyWalletSignature: jest.fn(),
}))

jest.mock('@/lib/morpheus/client', () => ({
  getWalletStakingInfo: jest.fn(),
  getMultiWalletStakingInfo: jest.fn(),
}))

jest.mock('@/lib/credits/mor-balance', () => ({
  claimMorCredits: jest.fn(),
  getAvailableCredits: jest.fn(),
  linkWallet: jest.fn(),
  getUserWallets: jest.fn(),
}))

jest.mock('@/lib/web3/notifications', () => ({
  notifyMorClaim: jest.fn().mockResolvedValue(undefined),
}))

// Import after mocks
import { POST, GET } from '../../credits/mor-deposit/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { verifyWalletSignature } from '@/lib/web3/signature'
import { getWalletStakingInfo, getMultiWalletStakingInfo } from '@/lib/morpheus/client'
import {
  claimMorCredits,
  getAvailableCredits,
  linkWallet,
  getUserWallets,
} from '@/lib/credits/mor-balance'

const mockAuth = authenticateRequest as jest.Mock
const mockCheckRateLimit = checkRateLimit as jest.Mock
const mockRateLimitedResponse = rateLimitedResponse as jest.Mock
const mockVerifySignature = verifyWalletSignature as jest.Mock
const mockGetStakingInfo = getWalletStakingInfo as jest.Mock
const mockGetMultiStakingInfo = getMultiWalletStakingInfo as jest.Mock
const mockClaimCredits = claimMorCredits as jest.Mock
const mockGetAvailable = getAvailableCredits as jest.Mock
const mockLinkWallet = linkWallet as jest.Mock
const mockGetUserWallets = getUserWallets as jest.Mock

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createPostRequest(body?: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/credits/mor-deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer mock-token',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

function createGetRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/credits/mor-deposit', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer mock-token',
    },
  })
}

// ---------------------------------------------------------------------------
// POST Tests
// ---------------------------------------------------------------------------

describe('POST /api/credits/mor-deposit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuth.mockResolvedValue({
      userId: 'user-1',
      decodedToken: { uid: 'user-1', email: 'user@example.com' },
    })
    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 60000,
    })
    mockVerifySignature.mockResolvedValue({
      valid: true,
      walletAddress: '0xABCDEF1234567890abcdef1234567890ABCDEF12',
    })
    mockGetStakingInfo.mockResolvedValue({
      isStaking: true,
      stakedMor: 100,
      monthlyAllowanceCents: 5000,
    })
    mockGetAvailable.mockResolvedValue({
      claimedThisMonth: 1000,
      availableToClaim: 4000,
    })
    mockLinkWallet.mockResolvedValue(undefined)
    mockClaimCredits.mockResolvedValue({
      claim: {
        id: 'claim-123',
        claimedCents: 2000,
        monthKey: '2026-03',
      },
      newBalance: 3000,
    })
  })

  // -----------------------------------------------------------------------
  // 1. Auth rejection
  // -----------------------------------------------------------------------

  it('returns 401 when authentication fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    )

    const request = createPostRequest({
      walletAddress: '0xABC',
      signature: '0x123',
      timestamp: Date.now(),
      amountCents: 1000,
    })
    const response = await POST(request)

    expect(response.status).toBe(401)
    const body = await response.json()
    expect(body.error).toBe('Unauthorized')
  })

  // -----------------------------------------------------------------------
  // 2. Rate limit rejection
  // -----------------------------------------------------------------------

  it('returns 429 when rate limit is exceeded', async () => {
    const rateLimitResult = {
      success: false,
      limit: 5,
      remaining: 0,
      reset: Date.now() + 60000,
    }
    mockCheckRateLimit.mockResolvedValue(rateLimitResult)
    mockRateLimitedResponse.mockReturnValue(
      NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 })
    )

    const request = createPostRequest({
      walletAddress: '0xABC',
      signature: '0x123',
      timestamp: Date.now(),
      amountCents: 1000,
    })
    const response = await POST(request)

    expect(response.status).toBe(429)
    expect(mockRateLimitedResponse).toHaveBeenCalledWith(rateLimitResult)
  })

  // -----------------------------------------------------------------------
  // 3. Missing required fields
  // -----------------------------------------------------------------------

  it('returns 400 when required fields are missing', async () => {
    const request = createPostRequest({})
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('Missing required fields')
  })

  it('returns 400 when walletAddress is missing', async () => {
    const request = createPostRequest({
      signature: '0x123',
      timestamp: Date.now(),
      amountCents: 1000,
    })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toContain('Missing required fields')
  })

  // -----------------------------------------------------------------------
  // 4. Verification-only request (amountCents = 0)
  // -----------------------------------------------------------------------

  it('returns 200 with staking info for verification-only (amountCents = 0)', async () => {
    const request = createPostRequest({
      walletAddress: '0xABCDEF1234567890abcdef1234567890ABCDEF12',
      signature: '0xsig',
      timestamp: Date.now(),
      amountCents: 0,
    })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data.verified).toBe(true)
    expect(body.data.stakingInfo).toMatchObject({
      isStaking: true,
      stakedMor: 100,
      monthlyAllowanceCents: 5000,
    })
    // Should not have claimed credits
    expect(mockClaimCredits).not.toHaveBeenCalled()
  })

  // -----------------------------------------------------------------------
  // 5. Claim credits success
  // -----------------------------------------------------------------------

  it('returns 200 with claim data on successful credit claim', async () => {
    const request = createPostRequest({
      walletAddress: '0xABCDEF1234567890abcdef1234567890ABCDEF12',
      signature: '0xsig',
      timestamp: Date.now(),
      amountCents: 2000,
    })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data.success).toBe(true)
    expect(body.data.claim).toMatchObject({
      id: 'claim-123',
      claimedCents: 2000,
      monthKey: '2026-03',
    })
    expect(body.data.newBalance).toBe(3000)
  })

  it('returns success false when wallet is not staking', async () => {
    mockGetStakingInfo.mockResolvedValue({
      isStaking: false,
      stakedMor: 0,
      monthlyAllowanceCents: 0,
    })

    const request = createPostRequest({
      walletAddress: '0xABCDEF1234567890abcdef1234567890ABCDEF12',
      signature: '0xsig',
      timestamp: Date.now(),
      amountCents: 1000,
    })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.data.success).toBe(false)
    expect(body.data.error).toContain('not staking')
  })

  it('returns 400 when signature is invalid', async () => {
    mockVerifySignature.mockResolvedValue({
      valid: false,
      error: 'Invalid signature',
    })

    const request = createPostRequest({
      walletAddress: '0xABCDEF1234567890abcdef1234567890ABCDEF12',
      signature: '0xbadsig',
      timestamp: Date.now(),
      amountCents: 1000,
    })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toContain('Invalid signature')
  })
})

// ---------------------------------------------------------------------------
// GET Tests
// ---------------------------------------------------------------------------

describe('GET /api/credits/mor-deposit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuth.mockResolvedValue({
      userId: 'user-1',
      decodedToken: { uid: 'user-1', email: 'user@example.com' },
    })
    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 60000,
    })
  })

  // -----------------------------------------------------------------------
  // 1. Auth rejection
  // -----------------------------------------------------------------------

  it('returns 401 when authentication fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    )

    const request = createGetRequest()
    const response = await GET(request)

    expect(response.status).toBe(401)
  })

  // -----------------------------------------------------------------------
  // 2. Rate limit rejection
  // -----------------------------------------------------------------------

  it('returns 429 when rate limit is exceeded', async () => {
    const rateLimitResult = {
      success: false,
      limit: 5,
      remaining: 0,
      reset: Date.now() + 60000,
    }
    mockCheckRateLimit.mockResolvedValue(rateLimitResult)
    mockRateLimitedResponse.mockReturnValue(
      NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 })
    )

    const request = createGetRequest()
    const response = await GET(request)

    expect(response.status).toBe(429)
  })

  // -----------------------------------------------------------------------
  // 3. No linked wallets
  // -----------------------------------------------------------------------

  it('returns 200 with empty data when no wallets are linked', async () => {
    mockGetUserWallets.mockResolvedValue([])

    const request = createGetRequest()
    const response = await GET(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data.hasLinkedWallets).toBe(false)
    expect(body.data.wallets).toHaveLength(0)
    expect(body.data.totalStakedMor).toBe(0)
  })

  // -----------------------------------------------------------------------
  // 4. With linked wallets
  // -----------------------------------------------------------------------

  it('returns 200 with wallet staking info when wallets are linked', async () => {
    mockGetUserWallets.mockResolvedValue([
      '0xWallet1',
      '0xWallet2',
    ])
    mockGetMultiStakingInfo.mockResolvedValue({
      totalStakedMor: 200,
      totalMonthlyAllowanceCents: 10000,
      wallets: [
        {
          walletAddress: '0xWallet1',
          isStaking: true,
          stakedMor: 150,
          monthlyAllowanceCents: 7500,
        },
        {
          walletAddress: '0xWallet2',
          isStaking: true,
          stakedMor: 50,
          monthlyAllowanceCents: 2500,
        },
      ],
    })
    mockGetAvailable.mockResolvedValueOnce({
      claimedThisMonth: 2000,
      availableToClaim: 5500,
    }).mockResolvedValueOnce({
      claimedThisMonth: 500,
      availableToClaim: 2000,
    })

    const request = createGetRequest()
    const response = await GET(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data.hasLinkedWallets).toBe(true)
    expect(body.data.wallets).toHaveLength(2)
    expect(body.data.totalStakedMor).toBe(200)
    expect(body.data.totalMonthlyAllowanceCents).toBe(10000)
    expect(body.data.totalClaimedThisMonth).toBe(2500)
    expect(body.data.totalAvailableToClaim).toBe(7500)
  })
})
