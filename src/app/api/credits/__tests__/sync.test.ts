/**
 * @jest-environment node
 */

/**
 * Unit tests for POST /api/credits/sync
 *
 * Tests:
 * - Auth rejection (401)
 * - Rate limit rejection (429)
 * - Success: recalculates balance from transaction history (200)
 * - Handles empty transaction history
 */

import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/firebase/admin', () => {
  const mockDocGet = jest.fn()
  const mockDocSet = jest.fn()
  const mockCollectionGet = jest.fn()
  const mockWhere = jest.fn()

  const chain = {
    doc: jest.fn().mockReturnValue({
      get: mockDocGet,
      set: mockDocSet,
    }),
    where: mockWhere.mockReturnThis(),
    get: mockCollectionGet,
  }

  return {
    db: {
      collection: jest.fn().mockReturnValue(chain),
    },
    __mocks: { mockDocGet, mockDocSet, mockCollectionGet, mockWhere },
  }
})

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

jest.mock('@/lib/credits/types', () => ({
  CREDIT_COLLECTIONS: {
    TRANSACTIONS: 'credit_transactions',
  },
}))

jest.mock('@/lib/credits', () => ({
  formatCentsAsDollars: jest.fn().mockImplementation((cents: number) => `$${(cents / 100).toFixed(2)}`),
}))

jest.mock('@/lib/utils/firestore-helpers', () => ({
  createISOTimestamp: jest.fn().mockReturnValue('2026-03-01T00:00:00.000Z'),
}))

// Import after mocks
import { POST } from '../../credits/sync/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'

const adminModule = require('@/lib/firebase/admin') as {
  __mocks: {
    mockDocGet: jest.Mock
    mockDocSet: jest.Mock
    mockCollectionGet: jest.Mock
    mockWhere: jest.Mock
  }
}
const { mockDocGet, mockDocSet, mockCollectionGet } = adminModule.__mocks

const mockAuth = authenticateRequest as jest.Mock
const mockCheckRateLimit = checkRateLimit as jest.Mock
const mockRateLimitedResponse = rateLimitedResponse as jest.Mock

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/credits/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer mock-token',
    },
  })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/credits/sync', () => {
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
    // Default: two deposits and one usage
    mockCollectionGet.mockResolvedValue({
      size: 3,
      docs: [
        {
          data: () => ({
            type: 'deposit',
            amount: 2000,
            createdAt: '2026-01-15T10:00:00Z',
          }),
        },
        {
          data: () => ({
            type: 'deposit',
            amount: 1000,
            createdAt: '2026-02-01T10:00:00Z',
          }),
        },
        {
          data: () => ({
            type: 'usage',
            amount: -500,
            createdAt: '2026-02-05T12:00:00Z',
          }),
        },
      ],
    })
    // Stored balance is different from calculated
    mockDocGet.mockResolvedValue({
      exists: true,
      data: () => ({
        credits: {
          balance: 2000, // wrong, should be 2500
        },
      }),
    })
    mockDocSet.mockResolvedValue(undefined)
  })

  // -----------------------------------------------------------------------
  // 1. Auth rejection
  // -----------------------------------------------------------------------

  it('returns 401 when authentication fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    )

    const request = createRequest()
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

    const request = createRequest()
    const response = await POST(request)

    expect(response.status).toBe(429)
    expect(mockRateLimitedResponse).toHaveBeenCalledWith(rateLimitResult)
  })

  // -----------------------------------------------------------------------
  // 3. Success: recalculates balance
  // -----------------------------------------------------------------------

  it('returns 200 with synced balance on success', async () => {
    const request = createRequest()
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toMatchObject({
      synced: true,
      previousBalance: 2000,
      newBalance: 2500, // 2000 + 1000 deposits - 500 usage
      totalDeposited: 3000,
      totalUsed: 500,
      transactionCount: 3,
      balanceChanged: true,
    })
  })

  it('updates user document with correct balance', async () => {
    const request = createRequest()
    await POST(request)

    expect(mockDocSet).toHaveBeenCalledWith(
      expect.objectContaining({
        credits: expect.objectContaining({
          balance: 2500,
          totalDeposited: 3000,
          totalUsed: 500,
        }),
      }),
      { merge: true }
    )
  })

  // -----------------------------------------------------------------------
  // 4. Empty transaction history
  // -----------------------------------------------------------------------

  it('handles empty transaction history', async () => {
    mockCollectionGet.mockResolvedValue({
      size: 0,
      docs: [],
    })
    mockDocGet.mockResolvedValue({
      exists: true,
      data: () => ({
        credits: { balance: 0 },
      }),
    })

    const request = createRequest()
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.data.newBalance).toBe(0)
    expect(body.data.totalDeposited).toBe(0)
    expect(body.data.totalUsed).toBe(0)
    expect(body.data.transactionCount).toBe(0)
    expect(body.data.balanceChanged).toBe(false)
  })
})
