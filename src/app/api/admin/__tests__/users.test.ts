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
    auth: {
      getUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue(undefined),
      deleteUser: jest.fn().mockResolvedValue(undefined),
    },
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

// Import handlers AFTER mocks
import { GET, POST } from '../../admin/users/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { isAdmin } from '@/config/developers'
import { auth } from '@/lib/firebase/admin'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>
const mockIsAdmin = isAdmin as jest.MockedFunction<typeof isAdmin>

describe('GET /api/admin/users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/admin/users', { method: 'GET' })
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
    const req = new NextRequest('http://localhost:3000/api/admin/users', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(429)
  })

  it('returns 403 when user is not admin', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'regular-user',
      decodedToken: { uid: 'regular-user', email: 'user@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(false)

    const req = new NextRequest('http://localhost:3000/api/admin/users', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(403)
  })

  it('returns users list on success', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockResolvedValueOnce({
      docs: [
        {
          id: 'user-1',
          data: () => ({
            email: 'alice@test.com',
            displayName: 'Alice',
            role: 'customer',
            createdAt: '2026-01-01',
            lastLogin: '2026-03-01',
            emailVerified: true,
            photoURL: null,
            disabled: false,
          }),
        },
        {
          id: 'user-2',
          data: () => ({
            email: 'bob@test.com',
            displayName: 'Bob',
            role: 'developer',
            createdAt: '2026-02-01',
            lastLogin: '2026-03-01',
            emailVerified: true,
            photoURL: null,
            disabled: false,
          }),
        },
      ],
    })

    const req = new NextRequest('http://localhost:3000/api/admin/users', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.users).toHaveLength(2)
    expect(body.total).toBe(2)
    expect(body.counts.customer).toBe(1)
    expect(body.counts.developer).toBe(1)
    expect(body.counts.mentor).toBe(0)
    expect(body.counts.admin).toBe(0)
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockCollection } = require('@/lib/firebase/admin')
    __mockCollection.get.mockRejectedValueOnce(new Error('Firestore error'))

    const req = new NextRequest('http://localhost:3000/api/admin/users', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(500)
  })
})

describe('POST /api/admin/users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'disable' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 403 when user is not admin', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'regular-user',
      decodedToken: { uid: 'regular-user', email: 'user@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(false)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'disable' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(403)
  })

  it('returns 400 when userId is missing', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ action: 'disable' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when action is missing', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid action', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'invalid' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('disables a user successfully', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.update.mockResolvedValueOnce(undefined)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'disable' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toContain('disable')

    expect(auth.updateUser).toHaveBeenCalledWith('user-1', { disabled: true })
    expect(__mockDoc.update).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: true, disabledBy: 'admin-user' })
    )
  })

  it('enables a user successfully', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.update.mockResolvedValueOnce(undefined)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'enable' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)

    expect(auth.updateUser).toHaveBeenCalledWith('user-1', { disabled: false })
  })

  it('changes user role successfully', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.update.mockResolvedValueOnce(undefined)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'changeRole', role: 'mentor' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)

    expect(__mockDoc.update).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'mentor', roleChangedBy: 'admin-user' })
    )
  })

  it('returns 400 for changeRole without role', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'changeRole' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('role is required')
  })

  it('deletes a user successfully', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.delete.mockResolvedValueOnce(undefined)

    const req = new NextRequest('http://localhost:3000/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user-1', action: 'delete' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)

    expect(auth.deleteUser).toHaveBeenCalledWith('user-1')
    expect(__mockDoc.delete).toHaveBeenCalled()
  })
})
