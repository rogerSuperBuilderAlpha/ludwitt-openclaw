/**
 * @jest-environment node
 */

/**
 * Unit tests for GET /api/credits/balance
 *
 * Tests:
 * - Auth rejection (401)
 * - Rate limit rejection (429)
 * - Success response with balance data (200)
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
  apiLogger: { apiError: jest.fn(), apiWarn: jest.fn() },
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}))

jest.mock('@/lib/credits/balance', () => ({
  getUserCredits: jest.fn(),
  isLowBalance: jest.fn(),
  isAtDebtLimit: jest.fn(),
}))

jest.mock('@/lib/credits', () => ({
  formatCentsAsDollars: jest.fn().mockImplementation((cents: number) => `$${(cents / 100).toFixed(2)}`),
  CREDIT_CONSTANTS: {
    MINIMUM_BALANCE_CENTS: -5000,
  },
}))

// Import after mocks
import { GET } from '../../credits/balance/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { getUserCredits, isLowBalance, isAtDebtLimit } from '@/lib/credits/balance'

const mockAuth = authenticateRequest as jest.Mock
const mockCheckRateLimit = checkRateLimit as jest.Mock
const mockRateLimitedResponse = rateLimitedResponse as jest.Mock
const mockGetUserCredits = getUserCredits as jest.Mock
const mockIsLowBalance = isLowBalance as jest.Mock
const mockIsAtDebtLimit = isAtDebtLimit as jest.Mock

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/credits/balance', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer mock-token',
    },
  })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GET /api/credits/balance', () => {
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
    mockGetUserCredits.mockResolvedValue({
      balance: 1500,
      totalDeposited: 5000,
      totalUsed: 3500,
      lastDepositAt: '2026-01-15T10:00:00Z',
      lastUsageAt: '2026-02-20T14:30:00Z',
    })
    mockIsLowBalance.mockReturnValue(false)
    mockIsAtDebtLimit.mockReturnValue(false)
  })

  // -----------------------------------------------------------------------
  // 1. Auth rejection
  // -----------------------------------------------------------------------

  it('returns 401 when authentication fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    )

    const request = createRequest()
    const response = await GET(request)

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

    const request = createRequest()
    const response = await GET(request)

    expect(response.status).toBe(429)
    expect(mockRateLimitedResponse).toHaveBeenCalledWith(rateLimitResult)
  })

  // -----------------------------------------------------------------------
  // 3. Success response
  // -----------------------------------------------------------------------

  it('returns 200 with balance data on success', async () => {
    const request = createRequest()
    const response = await GET(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toMatchObject({
      balance: 1500,
      totalDeposited: 5000,
      totalUsed: 3500,
      canUseAI: true,
      isLowBalance: false,
      isAtDebtLimit: false,
      lastDepositAt: '2026-01-15T10:00:00Z',
      lastUsageAt: '2026-02-20T14:30:00Z',
    })
    expect(body.data.balanceFormatted).toBeDefined()
    expect(body.data.totalDepositedFormatted).toBeDefined()
    expect(body.data.totalUsedFormatted).toBeDefined()
  })

  it('calls authenticateRequest with the request', async () => {
    const request = createRequest()
    await GET(request)

    expect(mockAuth).toHaveBeenCalledWith(request)
  })

  it('calls checkRateLimit with api tier and userId', async () => {
    const request = createRequest()
    await GET(request)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('api', 'user-1')
  })
})
