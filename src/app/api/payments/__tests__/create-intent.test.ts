/**
 * @jest-environment node
 */

/**
 * Unit tests for POST /api/payments/create-intent
 *
 * Tests:
 * - Auth rejection (401)
 * - Rate limit rejection (429)
 * - Missing required fields (400)
 * - Project not found (404)
 * - Forbidden: user is not the project customer (403)
 * - Success: creates Stripe payment intent (200)
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
  const mockDocUpdate = jest.fn()

  return {
    db: {
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          get: mockDocGet,
          update: mockDocUpdate,
        }),
      }),
    },
    __mocks: { mockDocGet, mockDocUpdate },
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
  createPaymentIntent: jest.fn().mockResolvedValue({
    id: 'pi_test_123',
    client_secret: 'pi_test_123_secret_abc',
  }),
  getOrCreateStripeCustomer: jest.fn().mockResolvedValue({
    id: 'cus_test_456',
  }),
}))

// Import after mocks
import { POST } from '../../payments/create-intent/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { createPaymentIntent, getOrCreateStripeCustomer } from '@/lib/stripe/server'

const adminModule = require('@/lib/firebase/admin') as {
  __mocks: { mockDocGet: jest.Mock; mockDocUpdate: jest.Mock }
}
const { mockDocGet, mockDocUpdate } = adminModule.__mocks

const mockAuth = authenticateRequest as jest.Mock
const mockCheckRateLimit = checkRateLimit as jest.Mock
const mockRateLimitedResponse = rateLimitedResponse as jest.Mock
const mockCreatePaymentIntent = createPaymentIntent as jest.Mock
const mockGetOrCreateStripeCustomer = getOrCreateStripeCustomer as jest.Mock

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createRequest(body?: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/payments/create-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer mock-token',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

const sampleProject = {
  customerId: 'user-1',
  customerEmail: 'user@example.com',
  customerName: 'Test User',
  title: 'My Project',
  currency: 'usd',
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/payments/create-intent', () => {
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
      data: () => sampleProject,
    })
    mockDocUpdate.mockResolvedValue(undefined)
  })

  // -----------------------------------------------------------------------
  // 1. Auth rejection
  // -----------------------------------------------------------------------

  it('returns 401 when authentication fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    )

    const request = createRequest({ projectId: 'proj-1', amount: 5000 })
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

    const request = createRequest({ projectId: 'proj-1', amount: 5000 })
    const response = await POST(request)

    expect(response.status).toBe(429)
    expect(mockRateLimitedResponse).toHaveBeenCalledWith(rateLimitResult)
  })

  // -----------------------------------------------------------------------
  // 3. Missing required fields
  // -----------------------------------------------------------------------

  it('returns 400 when projectId is missing', async () => {
    const request = createRequest({ amount: 5000 })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('projectId')
  })

  it('returns 400 when amount is missing', async () => {
    const request = createRequest({ projectId: 'proj-1' })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('amount')
  })

  it('returns 400 when body is empty', async () => {
    const request = createRequest({})
    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  // -----------------------------------------------------------------------
  // 4. Project not found
  // -----------------------------------------------------------------------

  it('returns 404 when project does not exist', async () => {
    mockDocGet.mockResolvedValue({
      exists: false,
      data: () => null,
    })

    const request = createRequest({ projectId: 'nonexistent', amount: 5000 })
    const response = await POST(request)

    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body.error).toContain('not found')
  })

  // -----------------------------------------------------------------------
  // 5. Forbidden: not the project customer
  // -----------------------------------------------------------------------

  it('returns 403 when user is not the project customer', async () => {
    mockDocGet.mockResolvedValue({
      exists: true,
      data: () => ({
        ...sampleProject,
        customerId: 'other-user',
      }),
    })

    const request = createRequest({ projectId: 'proj-1', amount: 5000 })
    const response = await POST(request)

    expect(response.status).toBe(403)
    const body = await response.json()
    expect(body.error).toContain('own projects')
  })

  // -----------------------------------------------------------------------
  // 6. Success
  // -----------------------------------------------------------------------

  it('returns 200 with clientSecret and paymentIntentId on success', async () => {
    const request = createRequest({
      projectId: 'proj-1',
      amount: 5000,
      description: 'Payment for project',
    })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.clientSecret).toBe('pi_test_123_secret_abc')
    expect(body.paymentIntentId).toBe('pi_test_123')
    expect(body.stripeCustomerId).toBe('cus_test_456')
  })

  it('calls getOrCreateStripeCustomer with project customer info', async () => {
    const request = createRequest({ projectId: 'proj-1', amount: 5000 })
    await POST(request)

    expect(mockGetOrCreateStripeCustomer).toHaveBeenCalledWith({
      email: 'user@example.com',
      name: 'Test User',
      metadata: { customerId: 'user-1' },
    })
  })

  it('calls createPaymentIntent with correct amount and metadata', async () => {
    const request = createRequest({
      projectId: 'proj-1',
      amount: 7500,
      description: 'Custom payment',
    })
    await POST(request)

    expect(mockCreatePaymentIntent).toHaveBeenCalledWith({
      amount: 7500,
      currency: 'usd',
      metadata: expect.objectContaining({
        projectId: 'proj-1',
        customerId: 'user-1',
        customerEmail: 'user@example.com',
        description: 'Custom payment',
      }),
    })
  })

  it('updates project with payment intent ID', async () => {
    const request = createRequest({ projectId: 'proj-1', amount: 5000 })
    await POST(request)

    expect(mockDocUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        stripePaymentIntentId: 'pi_test_123',
        paymentStatus: 'pending',
      })
    )
  })
})
