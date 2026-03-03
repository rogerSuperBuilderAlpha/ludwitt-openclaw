/**
 * @jest-environment node
 */

/**
 * Unit tests for GET /api/credits/history
 *
 * Tests:
 * - Auth rejection (401)
 * - Rate limit rejection (429)
 * - Success response with transaction history (200)
 * - Pagination via limit query param
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
  getTransactionHistory: jest.fn(),
  getTransactionCount: jest.fn(),
}))

jest.mock('@/lib/credits/pricing', () => ({
  formatCentsAsDollars: jest.fn().mockImplementation((cents: number) => `$${(Math.abs(cents) / 100).toFixed(2)}`),
}))

// Import after mocks
import { GET } from '../../credits/history/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { getTransactionHistory, getTransactionCount } from '@/lib/credits/balance'

const mockAuth = authenticateRequest as jest.Mock
const mockCheckRateLimit = checkRateLimit as jest.Mock
const mockRateLimitedResponse = rateLimitedResponse as jest.Mock
const mockGetTransactionHistory = getTransactionHistory as jest.Mock
const mockGetTransactionCount = getTransactionCount as jest.Mock

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createRequest(queryParams?: string): NextRequest {
  const url = queryParams
    ? `http://localhost:3000/api/credits/history?${queryParams}`
    : 'http://localhost:3000/api/credits/history'
  return new NextRequest(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer mock-token',
    },
  })
}

const sampleTransactions = [
  {
    id: 'tx-1',
    type: 'deposit',
    amount: 1000,
    balanceAfter: 1000,
    createdAt: '2026-02-01T10:00:00Z',
    description: 'Credit deposit',
  },
  {
    id: 'tx-2',
    type: 'usage',
    amount: -50,
    balanceAfter: 950,
    createdAt: '2026-02-02T14:00:00Z',
    description: 'AI grading',
  },
]

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GET /api/credits/history', () => {
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
    mockGetTransactionHistory.mockResolvedValue(sampleTransactions)
    mockGetTransactionCount.mockResolvedValue(25)
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

  it('returns 200 with transaction history on success', async () => {
    const request = createRequest()
    const response = await GET(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data.transactions).toHaveLength(2)
    expect(body.data.count).toBe(2)
    expect(body.data.totalCount).toBe(25)
  })

  it('formats transactions with display fields', async () => {
    const request = createRequest()
    const response = await GET(request)

    const body = await response.json()
    const tx = body.data.transactions[1]
    expect(tx.isDebit).toBe(true)
    expect(tx.amountFormatted).toBeDefined()
    expect(tx.balanceAfterFormatted).toBeDefined()
  })

  // -----------------------------------------------------------------------
  // 4. Pagination
  // -----------------------------------------------------------------------

  it('passes limit query param to getTransactionHistory', async () => {
    const request = createRequest('limit=10')
    await GET(request)

    expect(mockGetTransactionHistory).toHaveBeenCalledWith('user-1', 10)
  })

  it('caps limit at 100', async () => {
    const request = createRequest('limit=500')
    await GET(request)

    expect(mockGetTransactionHistory).toHaveBeenCalledWith('user-1', 100)
  })

  it('defaults limit to 50 when not provided', async () => {
    const request = createRequest()
    await GET(request)

    expect(mockGetTransactionHistory).toHaveBeenCalledWith('user-1', 50)
  })
})
