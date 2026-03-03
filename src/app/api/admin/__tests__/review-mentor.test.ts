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
  notFoundError: jest.fn().mockImplementation((msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 404 })
  ),
}))

// Import handler AFTER mocks
import { POST } from '../../admin/review-mentor/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { isAdmin } from '@/config/developers'
import { db } from '@/lib/firebase/admin'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>
const mockIsAdmin = isAdmin as jest.MockedFunction<typeof isAdmin>

describe('POST /api/admin/review-mentor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1', action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1', action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(429)
  })

  it('returns 403 when user is not admin', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'regular-user',
      decodedToken: { uid: 'regular-user', email: 'user@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(false)

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1', action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(403)
  })

  it('returns 400 when applicationId is missing', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('Missing required fields')
  })

  it('returns 400 when action is missing', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1' }),
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

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1', action: 'suspend' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('Invalid action')
  })

  it('returns 404 when application does not exist', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockResolvedValueOnce({ exists: false, data: () => null })

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'nonexistent', action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(404)

    const body = await res.json()
    expect(body.error).toContain('Application not found')
  })

  it('returns 400 when application is already reviewed', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({ status: 'approved', name: 'Already Approved' }),
    })

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1', action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('Application already reviewed')
  })

  it('approves an application and creates mentor profile', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')

    // Application exists and is pending
    __mockDoc.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        status: 'pending',
        userId: 'mentor-user',
        email: 'mentor@test.com',
        name: 'Jane Mentor',
        skills: ['math', 'science'],
        experience: '5 years',
        availability: 'weekends',
        whyMentor: 'I love teaching',
      }),
    })

    __mockDoc.update.mockResolvedValueOnce(undefined)
    __mockDoc.set.mockResolvedValueOnce(undefined)

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1', action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toContain('approved')

    // Verify application was updated
    expect(__mockDoc.update).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'approved',
        reviewedBy: 'admin@test.com',
      })
    )

    // Verify mentor profile was created
    expect(__mockDoc.set).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'mentor-user',
        email: 'mentor@test.com',
        name: 'Jane Mentor',
        skills: ['math', 'science'],
        approved: true,
        approvedBy: 'admin@test.com',
        totalEarnings: 0,
        active: true,
      })
    )

    // Verify db.collection was called for 'mentors'
    expect(db.collection).toHaveBeenCalledWith('mentors')
  })

  it('rejects an application without creating mentor profile', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')

    __mockDoc.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        status: 'pending',
        userId: 'applicant-user',
        email: 'applicant@test.com',
        name: 'Bob Applicant',
      }),
    })

    __mockDoc.update.mockResolvedValueOnce(undefined)

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-2', action: 'reject' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toContain('rejected')

    // Verify application was updated with rejected status
    expect(__mockDoc.update).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'rejected',
        reviewedBy: 'admin@test.com',
      })
    )

    // Verify mentor profile was NOT created (set should not be called)
    expect(__mockDoc.set).not.toHaveBeenCalled()
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({
      userId: 'admin-user',
      decodedToken: { uid: 'admin-user', email: 'admin@test.com' } as any,
    })
    mockIsAdmin.mockReturnValueOnce(true)

    const { __mockDoc } = require('@/lib/firebase/admin')
    __mockDoc.get.mockRejectedValueOnce(new Error('Firestore error'))

    const req = new NextRequest('http://localhost:3000/api/admin/review-mentor', {
      method: 'POST',
      body: JSON.stringify({ applicationId: 'app-1', action: 'approve' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
