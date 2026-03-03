/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server'

// Mock setup
jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/firebase/admin', () => {
  const mockBatch = {
    delete: jest.fn(),
    commit: jest.fn().mockResolvedValue(undefined),
  }

  const mockDocRef = {
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    ref: 'mock-ref',
  }

  const mockCollection = {
    doc: jest.fn().mockReturnValue(mockDocRef),
    add: jest.fn(),
    get: jest.fn(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  }

  return {
    db: {
      collection: jest.fn().mockReturnValue(mockCollection),
      batch: jest.fn().mockReturnValue(mockBatch),
    },
    auth: { getUser: jest.fn(), deleteUser: jest.fn().mockResolvedValue(undefined) },
    __mockDoc: mockDocRef,
    __mockCollection: mockCollection,
    __mockBatch: mockBatch,
  }
})

jest.mock('@/lib/rate-limit/upstash', () => ({
  checkRateLimit: jest.fn().mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: Date.now() + 60000 }),
  rateLimitedResponse: jest.fn().mockImplementation(() =>
    NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  ),
}))

jest.mock('@/lib/logger', () => ({
  apiLogger: { apiError: jest.fn(), apiWarn: jest.fn(), apiInfo: jest.fn(), success: jest.fn() },
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
import { DELETE } from '../../user/delete-account/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { db, auth } from '@/lib/firebase/admin'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>

describe('DELETE /api/user/delete-account', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Default: doc exists
    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockResolvedValue({ exists: true, data: () => ({}) })

    // Default: query returns empty
    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockResolvedValue({ empty: true, docs: [] })
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/user/delete-account', { method: 'DELETE' })
    const res = await DELETE(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'test-user', decodedToken: { uid: 'test-user', email: 'test@test.com' } as any })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/user/delete-account', { method: 'DELETE' })
    const res = await DELETE(req)
    expect(res.status).toBe(429)
  })

  it('deletes user data from all collections and auth account', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc, __mockCollection, __mockBatch } = require('@/lib/firebase/admin')
    __mockDoc.get.mockResolvedValue({ exists: true, data: () => ({}) })
    __mockCollection.get.mockResolvedValue({ empty: true, docs: [] })

    const req = new NextRequest('http://localhost:3000/api/user/delete-account', { method: 'DELETE' })
    const res = await DELETE(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.deleted).toBe(true)

    // Verify batch commit was called (direct doc deletions)
    expect(__mockBatch.commit).toHaveBeenCalled()

    // Verify Firebase Auth user was deleted
    expect(auth.deleteUser).toHaveBeenCalledWith('user-123')
  })

  it('handles query-based deletions when documents exist', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc, __mockBatch } = require('@/lib/firebase/admin')
    __mockDoc.get.mockResolvedValue({ exists: true, data: () => ({}) })

    // Simulate query returning docs for query-based deletions
    const mockQueryDoc = { ref: 'mock-query-ref' }
    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get
      .mockResolvedValueOnce({ empty: false, docs: [mockQueryDoc] })
      .mockResolvedValueOnce({ empty: true, docs: [] })
      .mockResolvedValueOnce({ empty: true, docs: [] })

    const req = new NextRequest('http://localhost:3000/api/user/delete-account', { method: 'DELETE' })
    const res = await DELETE(req)
    expect(res.status).toBe(200)
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockRejectedValue(new Error('Firestore error'))

    const req = new NextRequest('http://localhost:3000/api/user/delete-account', { method: 'DELETE' })
    const res = await DELETE(req)
    expect(res.status).toBe(500)
  })
})
