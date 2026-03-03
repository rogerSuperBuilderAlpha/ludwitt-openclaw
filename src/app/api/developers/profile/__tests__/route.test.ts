/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Mocks — factories run before variable declarations, so define inside factory
// ---------------------------------------------------------------------------

jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/api/developers/profile', () => ({
  getDeveloperProfile: jest.fn(),
  updateDeveloperProfile: jest.fn(),
}))

jest.mock('@/lib/utils/error-helpers', () => ({
  getErrorMessage: (_e: unknown, fallback: string) => fallback,
}))

jest.mock('@/lib/logger', () => ({
  apiLogger: { apiError: jest.fn(), success: jest.fn() },
}))

import { GET, PATCH } from '../route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import {
  getDeveloperProfile,
  updateDeveloperProfile,
} from '@/lib/api/developers/profile'

const mockAuth = authenticateRequest as jest.MockedFunction<
  typeof authenticateRequest
>
const mockGetProfile = getDeveloperProfile as jest.MockedFunction<
  typeof getDeveloperProfile
>
const mockUpdateProfile = updateDeveloperProfile as jest.MockedFunction<
  typeof updateDeveloperProfile
>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createGetRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/developers/profile', {
    method: 'GET',
    headers: { Authorization: 'Bearer mock-token' },
  })
}

function createPatchRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/developers/profile', {
    method: 'PATCH',
    headers: { Authorization: 'Bearer mock-token' },
    body: JSON.stringify(body),
  })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GET /api/developers/profile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockAuth.mockResolvedValue({
      userId: 'dev-1',
      decodedToken: { uid: 'dev-1' },
    } as any)
  })

  it('returns 401 when auth fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    )
    const res = await GET(createGetRequest())
    expect(res.status).toBe(401)
  })

  it('returns profile when it exists', async () => {
    const profile = { displayName: 'Dev One', email: 'dev@test.com' } as any
    mockGetProfile.mockResolvedValue(profile)

    const res = await GET(createGetRequest())
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.exists).toBe(true)
    expect(json.profile).toEqual(profile)
  })

  it('returns exists=false when profile is null', async () => {
    mockGetProfile.mockResolvedValue(null)

    const res = await GET(createGetRequest())
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.exists).toBe(false)
  })

  it('returns 500 on unexpected error', async () => {
    mockGetProfile.mockRejectedValue(new Error('Firestore error'))

    const res = await GET(createGetRequest())
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.success).toBe(false)
  })
})

describe('PATCH /api/developers/profile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockAuth.mockResolvedValue({
      userId: 'dev-1',
      decodedToken: { uid: 'dev-1' },
    } as any)
  })

  it('returns 401 when auth fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    )
    const res = await PATCH(createPatchRequest({ displayName: 'New' }))
    expect(res.status).toBe(401)
  })

  it('returns 403 when trying to update another user', async () => {
    const res = await PATCH(
      createPatchRequest({ userId: 'other-user', displayName: 'Hacker' })
    )
    expect(res.status).toBe(403)
    const json = await res.json()
    expect(json.error).toMatch(/another user/i)
  })

  it('updates profile successfully', async () => {
    const updated = { displayName: 'Updated Dev', email: 'dev@test.com' } as any
    mockUpdateProfile.mockResolvedValue(updated)

    const res = await PATCH(createPatchRequest({ displayName: 'Updated Dev' }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.profile).toEqual(updated)
    expect(mockUpdateProfile).toHaveBeenCalledWith('dev-1', {
      displayName: 'Updated Dev',
    })
  })

  it('returns 500 on unexpected error', async () => {
    mockUpdateProfile.mockRejectedValue(new Error('DB error'))

    const res = await PATCH(createPatchRequest({ displayName: 'Fail' }))
    expect(res.status).toBe(500)
  })
})
