/**
 * @jest-environment node
 */

/**
 * Unit tests for customer document API route patterns.
 *
 * Tests common patterns across:
 * - /api/customers/documents/add
 * - /api/customers/documents/list
 * - /api/customers/documents/approve
 * - /api/customers/documents/accept
 */

import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Firebase mock
// ---------------------------------------------------------------------------

jest.mock('@/lib/firebase/admin', () => {
  const mockGet = jest.fn()
  const mockSet = jest.fn()
  const mockUpdate = jest.fn()
  const mockAdd = jest.fn()
  const mockWhere = jest.fn()

  const chain = {
    doc: jest.fn().mockReturnThis(),
    get: mockGet,
    set: mockSet,
    update: mockUpdate,
    add: mockAdd,
    where: mockWhere.mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    count: jest.fn().mockReturnThis(),
  }

  return {
    db: {
      collection: jest.fn().mockReturnValue(chain),
      runTransaction: jest.fn(),
    },
    auth: {
      verifyIdToken: jest.fn(),
    },
    // Expose inner mocks for test access
    __mocks: { mockGet, mockSet, mockUpdate, mockAdd, mockWhere },
  }
})

jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/api/error-responses', () => ({
  serverError: jest
    .fn()
    .mockImplementation((_err: unknown, msg: string) =>
      NextResponse.json({ success: false, error: msg }, { status: 500 })
    ),
  badRequestError: jest
    .fn()
    .mockImplementation((msg: string) =>
      NextResponse.json({ success: false, error: msg }, { status: 400 })
    ),
  notFoundError: jest
    .fn()
    .mockImplementation((msg: string) =>
      NextResponse.json({ success: false, error: msg }, { status: 404 })
    ),
  forbiddenError: jest
    .fn()
    .mockImplementation((msg?: string) =>
      NextResponse.json(
        { success: false, error: msg || 'Forbidden' },
        { status: 403 }
      )
    ),
}))

jest.mock('@/lib/logger', () => ({
  apiLogger: {
    routeCall: jest.fn(),
    debug: jest.fn(),
    apiError: jest.fn(),
    success: jest.fn(),
    authSuccess: jest.fn(),
    authFailure: jest.fn(),
    validationError: jest.fn(),
  },
}))

jest.mock('@/lib/utils/documentHistory.server', () => ({
  recordDocumentChange: jest.fn().mockResolvedValue(undefined),
  compareDocumentStates: jest.fn().mockReturnValue([]),
  determineChangeType: jest.fn().mockReturnValue('status_change'),
}))

jest.mock('@/lib/integrations/email/sender', () => ({
  sendCustomEmail: jest.fn().mockResolvedValue({ success: true }),
}))

jest.mock('@/lib/credits/reservation', () => ({
  createReservation: jest.fn().mockResolvedValue({
    success: true,
    reservationId: 'res-123',
  }),
}))

jest.mock('@/lib/credits/types', () => ({
  CREDIT_CONSTANTS: {
    CUSTOMER_MARKUP_MULTIPLIER: 3,
    MINIMUM_BALANCE_CENTS: -5000,
  },
}))

jest.mock('@/config/developers', () => ({
  DEVELOPER_NOTIFICATION_EMAILS: new Set(['dev@example.com']),
}))

jest.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    serverTimestamp: jest.fn().mockReturnValue('SERVER_TIMESTAMP'),
  },
}))

// Import after mocks
import { authenticateRequest } from '@/lib/api/auth-middleware'
const adminModule = require('@/lib/firebase/admin') as Record<
  string,
  unknown
> & { __mocks: Record<string, jest.Mock> }
const { mockGet } = adminModule.__mocks

const mockAuth = authenticateRequest as jest.Mock

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createMockRequest(
  body?: unknown,
  method: string = 'POST',
  url: string = 'http://localhost:3000/api/customers/documents/add'
): NextRequest {
  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer valid-token',
    },
  }
  if (body !== undefined && method !== 'GET') {
    init.body = JSON.stringify(body)
  }
  return new NextRequest(url, { ...init, signal: undefined })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Customer document API route patterns', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuth.mockResolvedValue({
      userId: 'customer-1',
      decodedToken: {
        uid: 'customer-1',
        email: 'customer@example.com',
        name: 'Test Customer',
      },
    })
  })

  // -----------------------------------------------------------------------
  // 1. Auth required on all endpoints
  // -----------------------------------------------------------------------

  describe('authentication', () => {
    it('returns 401 when auth fails on document add', async () => {
      mockAuth.mockResolvedValue(
        NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        )
      )

      const { POST } = require('../../customers/documents/add/route')
      const request = createMockRequest({
        shareUrl: 'https://docs.google.com/document/d/abc123/edit',
      })
      const response = await POST(request)

      expect(response.status).toBe(401)
    })

    it('returns 401 when auth fails on document list', async () => {
      mockAuth.mockResolvedValue(
        NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        )
      )

      const { GET } = require('../../customers/documents/list/route')
      const request = createMockRequest(
        undefined,
        'GET',
        'http://localhost:3000/api/customers/documents/list'
      )
      const response = await GET(request)

      expect(response.status).toBe(401)
    })
  })

  // -----------------------------------------------------------------------
  // 2. Document creation validates required fields
  // -----------------------------------------------------------------------

  describe('document creation validation', () => {
    it('validates that shareUrl is required', async () => {
      const { POST } = require('../../customers/documents/add/route')
      const request = createMockRequest({ title: 'My Doc' })
      const response = await POST(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toContain('Share URL is required')
    })

    it('validates Google Docs URL format', async () => {
      const { POST } = require('../../customers/documents/add/route')
      const request = createMockRequest({
        shareUrl: 'https://example.com/not-a-google-doc',
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toContain('Google Docs')
    })
  })

  // -----------------------------------------------------------------------
  // 3. Document retrieval checks ownership
  // -----------------------------------------------------------------------

  describe('ownership checks', () => {
    it('returns 403 when customer tries to approve a document they do not own', async () => {
      mockGet.mockResolvedValue({
        exists: true,
        data: () => ({
          customerId: 'other-customer',
          status: 'pending',
          googleDocTitle: 'Test Doc',
        }),
      })

      const { POST } = require('../../customers/documents/approve/route')
      const request = createMockRequest({ documentId: 'doc-123' })
      const response = await POST(request)

      expect(response.status).toBe(403)
    })
  })

  // -----------------------------------------------------------------------
  // 4. Status updates validate allowed transitions
  // -----------------------------------------------------------------------

  describe('status transition validation', () => {
    it('rejects accepting a document that is not in completed status', async () => {
      mockGet.mockResolvedValue({
        exists: true,
        data: () => ({
          customerId: 'customer-1',
          status: 'pending',
          googleDocTitle: 'Test Doc',
        }),
      })

      const { POST } = require('../../customers/documents/accept/route')
      const request = createMockRequest({ documentId: 'doc-123' })
      const response = await POST(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toContain('Only completed documents')
    })

    it('rejects approving a document that is already approved', async () => {
      mockGet.mockResolvedValue({
        exists: true,
        data: () => ({
          customerId: 'customer-1',
          status: 'approved',
          googleDocTitle: 'Test Doc',
        }),
      })

      const { POST } = require('../../customers/documents/approve/route')
      const request = createMockRequest({ documentId: 'doc-123' })
      const response = await POST(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toContain('already approved')
    })
  })

  // -----------------------------------------------------------------------
  // 5. Returns 404 for non-existent documents
  // -----------------------------------------------------------------------

  describe('non-existent documents', () => {
    it('returns 404 when document does not exist in approve', async () => {
      mockGet.mockResolvedValue({ exists: false })

      const { POST } = require('../../customers/documents/approve/route')
      const request = createMockRequest({ documentId: 'nonexistent-doc' })
      const response = await POST(request)

      expect(response.status).toBe(404)
      const body = await response.json()
      expect(body.error).toContain('not found')
    })

    it('returns 404 when document does not exist in accept', async () => {
      mockGet.mockResolvedValue({ exists: false })

      const { POST } = require('../../customers/documents/accept/route')
      const request = createMockRequest({ documentId: 'nonexistent-doc' })
      const response = await POST(request)

      expect(response.status).toBe(404)
      const body = await response.json()
      expect(body.error).toContain('not found')
    })
  })

  // -----------------------------------------------------------------------
  // 6. Validates document ID is required
  // -----------------------------------------------------------------------

  describe('document ID validation', () => {
    it('returns 400 when documentId is missing in approve', async () => {
      const { POST } = require('../../customers/documents/approve/route')
      const request = createMockRequest({})
      const response = await POST(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toContain('Document ID')
    })

    it('returns 400 when documentId is missing in accept', async () => {
      const { POST } = require('../../customers/documents/accept/route')
      const request = createMockRequest({})
      const response = await POST(request)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toContain('Document ID')
    })
  })
})
