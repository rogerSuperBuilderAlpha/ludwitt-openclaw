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

jest.mock('@/config/developers', () => ({
  isAdmin: jest.fn(),
}))

jest.mock('@/lib/api/error-responses', () => ({
  serverError: jest.fn().mockImplementation((_err: unknown, msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 500 })
  ),
  forbiddenError: jest.fn().mockImplementation((msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 403 })
  ),
  badRequestError: jest.fn().mockImplementation((msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 400 })
  ),
}))

// Import handler AFTER mocks
import { GET } from '../../admin/applications/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { isAdmin } from '@/config/developers'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>
const mockIsAdmin = isAdmin as jest.MockedFunction<typeof isAdmin>

describe('GET /api/admin/applications', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/admin/applications', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/admin/applications', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(429)
  })

  it('returns 403 when user is not admin', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'regular-user',
      decodedToken: { uid: 'regular-user', email: 'user@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(false)

    const req = new NextRequest('http://localhost:3000/api/admin/applications', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(403)
  })

  it('returns 400 for invalid status filter', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const req = new NextRequest('http://localhost:3000/api/admin/applications?status=invalid', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('Invalid status filter')
  })

  it('returns pending applications by default', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockResolvedValueOnce({
      docs: [
        {
          id: 'app-1',
          data: () => ({
            name: 'Jane Doe',
            email: 'jane@test.com',
            status: 'pending',
            appliedAt: '2026-03-01T00:00:00.000Z',
          }),
        },
        {
          id: 'app-2',
          data: () => ({
            name: 'John Smith',
            email: 'john@test.com',
            status: 'pending',
            appliedAt: '2026-02-28T00:00:00.000Z',
          }),
        },
      ],
    })

    const req = new NextRequest('http://localhost:3000/api/admin/applications', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.applications).toHaveLength(2)
    expect(body.applications[0].id).toBe('app-1')
    expect(body.applications[0].name).toBe('Jane Doe')
  })

  it('filters by approved status when specified', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockResolvedValueOnce({
      docs: [
        {
          id: 'app-3',
          data: () => ({
            name: 'Approved User',
            status: 'approved',
            appliedAt: '2026-01-01T00:00:00.000Z',
          }),
        },
      ],
    })

    const req = new NextRequest('http://localhost:3000/api/admin/applications?status=approved', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.applications).toHaveLength(1)
    expect(body.applications[0].name).toBe('Approved User')
  })

  it('returns empty array when no applications match', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockResolvedValueOnce({ docs: [] })

    const req = new NextRequest('http://localhost:3000/api/admin/applications?status=rejected', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.applications).toEqual([])
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockRejectedValueOnce(new Error('Firestore error'))

    const req = new NextRequest('http://localhost:3000/api/admin/applications', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(500)
  })
})
