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
  apiLogger: { apiError: jest.fn(), apiWarn: jest.fn(), apiInfo: jest.fn(), success: jest.fn() },
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

jest.mock('@/lib/api/validators', () => ({
  validateRequiredFields: jest.fn().mockReturnValue(null),
}))

jest.mock('@/lib/utils/user-helpers', () => ({
  getUserData: jest.fn(),
  updateUserFields: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('@/lib/utils/validation-helpers', () => ({
  validateEncryptedKey: jest.fn().mockReturnValue({ isValid: true }),
}))

jest.mock('@/lib/utils/firestore-helpers', () => ({
  createISOTimestamp: jest.fn().mockReturnValue('2026-03-02T00:00:00.000Z'),
}))

jest.mock('@/lib/basics/collections', () => ({
  Collections: { USERS: 'users' },
}))

// Import handlers AFTER mocks
import { GET, POST, DELETE } from '../../user/api-keys/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getUserData, updateUserFields } from '@/lib/utils/user-helpers'
import { validateEncryptedKey } from '@/lib/utils/validation-helpers'

const mockAuth = authenticateRequest as jest.MockedFunction<typeof authenticateRequest>
const mockGetUserData = getUserData as jest.MockedFunction<typeof getUserData>
const mockUpdateUserFields = updateUserFields as jest.MockedFunction<typeof updateUserFields>
const mockValidateEncryptedKey = validateEncryptedKey as jest.MockedFunction<typeof validateEncryptedKey>

describe('GET /api/user/api-keys', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/user/api-keys', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'test-user', decodedToken: { uid: 'test-user', email: 'test@test.com' } as any })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/user/api-keys', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(429)
  })

  it('returns hasKeys false when no user data', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })
    mockGetUserData.mockResolvedValueOnce(null)

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.hasKeys).toBe(false)
    expect(body.data.keys).toEqual({})
  })

  it('returns key metadata when keys exist', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })
    mockGetUserData.mockResolvedValueOnce({
      apiKeys: {
        anthropic: {
          encrypted: 'enc-key-data',
          lastUpdated: '2026-01-01T00:00:00.000Z',
          keyHash: 'abc123',
        },
      },
    })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.hasKeys).toBe(true)
    expect(body.data.keys.anthropic.hasKey).toBe(true)
    expect(body.data.keys.anthropic.lastUpdated).toBe('2026-01-01T00:00:00.000Z')
    expect(body.data.keys.anthropic.keyHash).toBe('abc123')
    // Encrypted key should NOT be returned
    expect(body.data.keys.anthropic.encrypted).toBeUndefined()
  })

  it('returns 500 when an error occurs', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })
    mockGetUserData.mockRejectedValueOnce(new Error('DB error'))

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', { method: 'GET' })
    const res = await GET(req)
    expect(res.status).toBe(500)
  })
})

describe('POST /api/user/api-keys', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockValidateEncryptedKey.mockReturnValue({ isValid: true })
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'POST',
      body: JSON.stringify({ anthropicKey: 'enc-key' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'test-user', decodedToken: { uid: 'test-user', email: 'test@test.com' } as any })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'POST',
      body: JSON.stringify({ anthropicKey: 'enc-key' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(429)
  })

  it('returns 400 when no keys are provided', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('At least one API key must be provided')
  })

  it('returns 400 when anthropicKey is not a string', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'POST',
      body: JSON.stringify({ anthropicKey: 12345 }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('Anthropic API key must be a string')
  })

  it('returns 400 when encrypted key validation fails', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })
    mockValidateEncryptedKey.mockReturnValueOnce({ isValid: false, error: 'Invalid encrypted Anthropic API key format' })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'POST',
      body: JSON.stringify({ anthropicKey: 'short' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('saves API keys successfully', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    // Generate a valid base64-like string that's long enough (>50 chars)
    const validEncryptedKey = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZw=='

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'POST',
      body: JSON.stringify({ anthropicKey: validEncryptedKey, anthropicKeyHash: 'hash123' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.message).toBe('API keys saved successfully')

    expect(mockUpdateUserFields).toHaveBeenCalledWith(
      'user-123',
      expect.objectContaining({
        'apiKeys.anthropic': expect.objectContaining({
          encrypted: validEncryptedKey,
          keyHash: 'hash123',
        }),
      })
    )
  })

  it('returns 500 when save fails', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })
    mockUpdateUserFields.mockRejectedValueOnce(new Error('DB error'))

    const validEncryptedKey = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZw=='

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'POST',
      body: JSON.stringify({ anthropicKey: validEncryptedKey }),
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})

describe('DELETE /api/user/api-keys', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    )
    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'DELETE',
      body: JSON.stringify({ keyType: 'anthropic' }),
    })
    const res = await DELETE(req)
    expect(res.status).toBe(401)
  })

  it('returns 429 when rate limited', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'test-user', decodedToken: { uid: 'test-user', email: 'test@test.com' } as any })
    const { checkRateLimit } = require('@/lib/rate-limit/upstash')
    checkRateLimit.mockResolvedValueOnce({ success: false, limit: 5, remaining: 0, reset: Date.now() })
    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'DELETE',
      body: JSON.stringify({ keyType: 'anthropic' }),
    })
    const res = await DELETE(req)
    expect(res.status).toBe(429)
  })

  it('returns 400 when keyType is missing', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'DELETE',
      body: JSON.stringify({}),
    })
    const res = await DELETE(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toContain('Invalid keyType')
  })

  it('returns 400 when keyType is invalid', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'DELETE',
      body: JSON.stringify({ keyType: 'openai' }),
    })
    const res = await DELETE(req)
    expect(res.status).toBe(400)
  })

  it('deletes a single key type successfully', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'DELETE',
      body: JSON.stringify({ keyType: 'anthropic' }),
    })
    const res = await DELETE(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.message).toBe('API keys deleted successfully')

    expect(mockUpdateUserFields).toHaveBeenCalledWith('user-123', { 'apiKeys.anthropic': null })
  })

  it('deletes all keys when keyType is "all"', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'DELETE',
      body: JSON.stringify({ keyType: 'all' }),
    })
    const res = await DELETE(req)
    expect(res.status).toBe(200)

    expect(mockUpdateUserFields).toHaveBeenCalledWith('user-123', { apiKeys: {} })
  })

  it('returns 500 when deletion fails', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'user-123', decodedToken: { uid: 'user-123', email: 'test@test.com' } as any })
    mockUpdateUserFields.mockRejectedValueOnce(new Error('DB error'))

    const req = new NextRequest('http://localhost:3000/api/user/api-keys', {
      method: 'DELETE',
      body: JSON.stringify({ keyType: 'did' }),
    })
    const res = await DELETE(req)
    expect(res.status).toBe(500)
  })
})
