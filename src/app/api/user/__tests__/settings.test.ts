/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server'

// Mock setup
jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/firebase/admin', () => {
  const mockDoc = {
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
  const mockCollection = {
    doc: jest.fn().mockReturnValue(mockDoc),
    add: jest.fn(),
    get: jest.fn(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  }
  return {
    db: { collection: jest.fn().mockReturnValue(mockCollection) },
    auth: { getUser: jest.fn() },
    __mockDoc: mockDoc,
    __mockCollection: mockCollection,
  }
})

jest.mock('@/lib/rate-limit/upstash', () => ({
  checkRateLimit: jest.fn().mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: Date.now() + 60000 }),
  rateLimitedResponse: jest.fn().mockImplementation(() =>
    NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  ),
}))

jest.mock('@/lib/logger', () => ({
  apiLogger: { apiError: jest.fn(), apiWarn: jest.fn(), apiInfo: jest.fn() },
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}))

jest.mock('@/lib/api/error-responses', () => ({
  serverError: jest.fn().mockImplementation((_err: unknown, msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 500 })
  ),
  badRequestError: jest.fn().mockImplementation((msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 400 })
  ),
}))

jest.mock('@/lib/api/response-helpers', () => ({
  successResponse: jest.fn().mockImplementation((data: any) =>
    NextResponse.json({ success: true, data })
  ),
}))

// Import handlers AFTER mocks
import { GET, PUT } from '../../user/settings/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>

describe('GET /api/user/settings', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/user/settings', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'test-user', decodedToken: { uid: 'test-user', email: 'test@test.com' } as any })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/user/settings', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(429)
  })

  it('returns user settings when user document exists', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        settings: {
          notifications: { email: true },
          privacy: { profilePublic: false },
        },
      }),
    })

    const req = new NextRequest('http://localhost:3000/api/user/settings', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.settings.notifications.email).toBe(true)
    expect(body.data.settings.privacy.profilePublic).toBe(false)
  })

  it('returns empty settings when user document does not exist', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockResolvedValueOnce({ exists: false, data: () => null })

    const req = new NextRequest('http://localhost:3000/api/user/settings', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.settings).toEqual({})
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockRejectedValue(new Error('Firestore error'))

    const req = new NextRequest('http://localhost:3000/api/user/settings', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(500)
  })
})

describe('PUT /api/user/settings', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify({ section: 'notifications', data: {} }),
    })
    const res = await PUT(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'test-user', decodedToken: { uid: 'test-user', email: 'test@test.com' } as any })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify({ section: 'notifications', data: {} }),
    })
    const res = await PUT(req)
    expect(res.status).toBe(429)
  })

  it('returns 400 when section is missing', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify({ data: { email: true } }),
    })
    const res = await PUT(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when data is missing', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify({ section: 'notifications' }),
    })
    const res = await PUT(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid section name', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify({ section: 'invalid-section', data: { key: 'value' } }),
    })
    const res = await PUT(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('Invalid section')
  })

  it('saves settings successfully with valid section and data', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.set.mockResolvedValueOnce(undefined)

    const req = new NextRequest('http://localhost:3000/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify({ section: 'notifications', data: { email: true, push: false } }),
    })
    const res = await PUT(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.section).toBe('notifications')
    expect(body.data.saved).toBe(true)

    // Verify Firestore set was called with merge
    expect(__mockDoc.set).toHaveBeenCalledWith(
      expect.objectContaining({
        settings: { notifications: { email: true, push: false } },
      }),
      { merge: true }
    )
  })

  it('accepts all valid section names', async () => {
    const validSections = ['notifications', 'privacy', 'preferences', 'accessibility', 'sound', 'learning']

    for (const section of validSections) {
      jest.clearAllMocks()
      mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

      const { __mockDoc } = require('@/lib/firebase/admin')
      __mockDoc.set.mockResolvedValueOnce(undefined)

      const req = new NextRequest('http://localhost:3000/api/user/settings', {
        method: 'PUT',
        body: JSON.stringify({ section, data: { key: 'value' } }),
      })
      const res = await PUT(req)
      expect(res.status).toBe(200)
    }
  })

  it('returns 500 when Firestore write fails', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.set.mockRejectedValueOnce(new Error('Firestore write error'))

    const req = new NextRequest('http://localhost:3000/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify({ section: 'notifications', data: { email: true } }),
    })
    const res = await PUT(req)
    expect(res.status).toBe(500)
  })
})
