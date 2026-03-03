/**
 * @jest-environment node
 */

/**
 * Unit tests for POST /api/credits/deposit
 *
 * Tests:
 * - Auth rejection (401)
 * - Rate limit rejection (429)
 * - Missing required fields (400)
 * - Amount validation: below minimum (400)
 * - Amount validation: above maximum (400)
 * - Success: creates Stripe checkout session (200)
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

  return {
    db: {
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          get: mockDocGet,
          set: mockDocSet,
        }),
      }),
    },
    __mocks: { mockDocGet, mockDocSet },
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
  apiLogger: {
    apiError: jest.fn(),
    apiWarn: jest.fn(),
    success: jest.fn(),
  },
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}))

jest.mock('@/lib/stripe/server', () => ({
  stripe: {
    customers: {
      list: jest.fn().mockResolvedValue({ data: [] }),
      create: jest.fn().mockResolvedValue({ id: 'cus_new_123' }),
    },
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({
          id: 'cs_test_session_123',
          url: 'https://checkout.stripe.com/session/cs_test_session_123',
        }),
      },
    },
  },
}))

jest.mock('@/lib/credits/types', () => ({
  CREDIT_CONSTANTS: {
    MINIMUM_DEPOSIT_CENTS: 500,
    MAXIMUM_DEPOSIT_CENTS: 50000,
  },
}))

// Import after mocks
import { POST } from '../../credits/deposit/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { stripe } from '@/lib/stripe/server'

const adminModule = require('@/lib/firebase/admin') as { __mocks: { mockDocGet: jest.Mock; mockDocSet: jest.Mock } }
const { mockDocGet, mockDocSet } = adminModule.__mocks

const mockAuth = authenticateRequest as jest.Mock
const mockCheckRateLimit = checkRateLimit as jest.Mock
const mockRateLimitedResponse = rateLimitedResponse as jest.Mock

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createRequest(body?: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/credits/deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer mock-token',
      Origin: 'http://localhost:3000',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/credits/deposit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuth.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {
        uid: 'user-1',
        email: 'user@example.com',
        name: 'Test User',
      },
    })
    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 60000,
    })
    mockDocGet.mockResolvedValue({
      exists: true,
      data: () => ({ stripeCustomerId: 'cus_existing_123' }),
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

    const request = createRequest({ amountCents: 1000 })
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

    const request = createRequest({ amountCents: 1000 })
    const response = await POST(request)

    expect(response.status).toBe(429)
    expect(mockRateLimitedResponse).toHaveBeenCalledWith(rateLimitResult)
  })

  // -----------------------------------------------------------------------
  // 3. Missing required fields
  // -----------------------------------------------------------------------

  it('returns 400 when amountCents is missing', async () => {
    const request = createRequest({})
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('Amount')
  })

  it('returns 400 when amountCents is not a number', async () => {
    const request = createRequest({ amountCents: 'not-a-number' })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('Amount')
  })

  // -----------------------------------------------------------------------
  // 4. Amount validation
  // -----------------------------------------------------------------------

  it('returns 400 when amountCents is below minimum', async () => {
    const request = createRequest({ amountCents: 100 })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('Minimum deposit')
  })

  it('returns 400 when amountCents is above maximum', async () => {
    const request = createRequest({ amountCents: 100000 })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('Maximum deposit')
  })

  // -----------------------------------------------------------------------
  // 5. Success
  // -----------------------------------------------------------------------

  it('returns 200 with sessionId and url on success', async () => {
    const request = createRequest({ amountCents: 1000 })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toMatchObject({
      sessionId: 'cs_test_session_123',
      url: expect.stringContaining('checkout.stripe.com'),
    })
  })

  it('creates checkout session with correct amount', async () => {
    const request = createRequest({ amountCents: 2000 })
    await POST(request)

    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({
              unit_amount: 2000,
            }),
          }),
        ]),
        mode: 'payment',
        metadata: expect.objectContaining({
          userId: 'user-1',
          type: 'credit_deposit',
        }),
      })
    )
  })

  it('uses existing Stripe customer ID if found', async () => {
    mockDocGet.mockResolvedValue({
      exists: true,
      data: () => ({ stripeCustomerId: 'cus_existing_123' }),
    })

    const request = createRequest({ amountCents: 1000 })
    await POST(request)

    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        customer: 'cus_existing_123',
      })
    )
  })
})
