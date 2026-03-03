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
}))

// Import handler AFTER mocks
import { GET } from '../../admin/stats/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { isAdmin } from '@/config/developers'
import { db } from '@/lib/firebase/admin'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>
const mockIsAdmin = isAdmin as jest.MockedFunction<typeof isAdmin>

describe('GET /api/admin/stats', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/admin/stats', { method: 'GET' })
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
    const req = new NextRequest('http://localhost:3000/api/admin/stats', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(429)
  })

  it('returns 403 when user is not admin', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'regular-user',
      decodedToken: { uid: 'regular-user', email: 'user@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(false)

    const req = new NextRequest('http://localhost:3000/api/admin/stats', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(403)
  })

  it('returns platform statistics on success', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')

    // The route calls db.collection() for: users, projects, cohorts, mentorProfiles (via Promise.all)
    // Then getRecentActivity calls db.collection() for projects and users again
    // We need to mock db.collection to return different results based on the collection name

    const now = new Date().toISOString()
    const recentDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago

    // Mock the collection-level get calls for Promise.all
    __mockCollection.get
      // users collection
      .mockResolvedValueOnce({
        docs: [
          { data: () => ({ role: 'customer', createdAt: recentDate, lastLogin: now }) },
          { data: () => ({ role: 'developer', createdAt: '2025-01-01', lastLogin: '2025-12-01' }) },
          { data: () => ({ role: 'admin', createdAt: '2025-06-01', lastLogin: now }) },
        ],
      })
      // projects collection
      .mockResolvedValueOnce({
        docs: [
          { data: () => ({ status: 'in-progress', paidAmount: 5000, totalCost: 10000, createdAt: recentDate }) },
          { data: () => ({ status: 'completed', paidAmount: 3000, totalCost: 3000, createdAt: '2025-01-01' }) },
        ],
      })
      // cohorts collection
      .mockResolvedValueOnce({
        docs: [
          { data: () => ({ status: 'active' }) },
          { data: () => ({ status: 'completed' }) },
        ],
      })
      // mentorProfiles (where status == active)
      .mockResolvedValueOnce({
        size: 3,
        docs: [],
      })
      // getRecentActivity: recent projects
      .mockResolvedValueOnce({
        docs: [
          { id: 'proj-1', data: () => ({ title: 'Project 1', createdAt: now, customerEmail: 'c@t.com' }) },
        ],
      })
      // getRecentActivity: recent users
      .mockResolvedValueOnce({
        docs: [
          { id: 'user-1', data: () => ({ email: 'new@user.com', createdAt: now }) },
        ],
      })

    const req = new NextRequest('http://localhost:3000/api/admin/stats', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.totalUsers).toBe(3)
    expect(body.usersByRole.customer).toBe(1)
    expect(body.usersByRole.developer).toBe(1)
    expect(body.usersByRole.admin).toBe(1)
    expect(body.totalProjects).toBe(2)
    expect(body.activeProjects).toBe(1)
    expect(body.completedProjects).toBe(1)
    expect(body.totalRevenue).toBe(8000) // 5000 + 3000
    expect(body.activeCohorts).toBe(1)
    expect(body.totalMentors).toBe(3)
    expect(body.growth).toBeDefined()
    expect(body.systemHealth).toBeDefined()
    expect(body.systemHealth.status).toBe('healthy')
    expect(body.recentActivity).toBeDefined()
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockRejectedValueOnce(new Error('Firestore error'))

    const req = new NextRequest('http://localhost:3000/api/admin/stats', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(500)
  })
})
