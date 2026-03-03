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
}))

jest.mock('@/lib/api/response-helpers', () => ({
  successResponse: jest.fn().mockImplementation((data: any) =>
    NextResponse.json({ success: true, data })
  ),
}))

// Import handler AFTER mocks
import { GET } from '../../user/export-data/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>

describe('GET /api/user/export-data', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/user/export-data', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'test-user', decodedToken: { uid: 'test-user', email: 'test@test.com' } as any })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/user/export-data', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(429)
  })

  it('returns exported user data on success', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc, __mockCollection } = require('@/lib/firebase/admin')

    // Mock Promise.all for the 6 parallel doc fetches
    const mockUserData = { email: 'test@test.com', displayName: 'Test User' }
    const mockProgressData = { mathLevel: 5 }

    __mockDoc.get
      .mockResolvedValueOnce({ exists: true, data: () => mockUserData })    // users
      .mockResolvedValueOnce({ exists: true, data: () => mockProgressData }) // userBasicsProgress
      .mockResolvedValueOnce({ exists: false, data: () => null })            // userAchievements
      .mockResolvedValueOnce({ exists: false, data: () => null })            // userStats
      .mockResolvedValueOnce({ exists: false, data: () => null })            // universityStudentProfiles
      .mockResolvedValueOnce({ exists: false, data: () => null })            // userSubscriptions

    // Mock credit_transactions query
    __mockCollection.get.mockResolvedValueOnce({
      docs: [
        { id: 'tx-1', data: () => ({ amount: 100, type: 'purchase' }) },
      ],
    })

    const req = new NextRequest('http://localhost:3000/api/user/export-data', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.userId).toBe('user-123')
    expect(body.data.user).toEqual(mockUserData)
    expect(body.data.basicsProgress).toEqual(mockProgressData)
    expect(body.data.achievements).toBeNull()
    expect(body.data.creditTransactions).toHaveLength(1)
    expect(body.data.exportDate).toBeDefined()
  })

  it('returns null for collections with no data', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-456', decodedToken: { uid: 'user-456', email: 'test@test.com' } as any })

    const { __mockDoc, __mockCollection } = require('@/lib/firebase/admin')

    // All docs don't exist
    __mockDoc.get.mockResolvedValue({ exists: false, data: () => null })

    // No credit transactions
    __mockCollection.get.mockResolvedValueOnce({ docs: [] })

    const req = new NextRequest('http://localhost:3000/api/user/export-data', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.user).toBeNull()
    expect(body.data.basicsProgress).toBeNull()
    expect(body.data.creditTransactions).toEqual([])
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockRejectedValue(new Error('Firestore error'))

    const req = new NextRequest('http://localhost:3000/api/user/export-data', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(500)
  })
})
