/**
 * @jest-environment node
 */

/**
 * Unit tests for authentication middleware
 */

import { NextRequest } from 'next/server'

// Mock Firebase Admin before importing the module under test
jest.mock('@/lib/firebase/admin', () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
  db: {},
}))

// Get reference to the mock after module is loaded
import { auth } from '@/lib/firebase/admin'
const mockVerifyIdToken = auth.verifyIdToken as jest.Mock

import { authenticateRequest, verifyUserMatch, isAdmin, hasRole } from '../auth-middleware'

function createMockRequest(headers: Record<string, string> = {}): NextRequest {
  return new NextRequest('http://localhost:3000/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}

describe('authenticateRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 401 when no Authorization header is present', async () => {
    const request = createMockRequest()
    const result = await authenticateRequest(request)

    // Should return a NextResponse (error)
    expect(result).toHaveProperty('status', 401)
    const body = await (result as Response).json()
    expect(body).toEqual({ success: false, error: 'Unauthorized' })
  })

  it('returns 401 when Authorization header has wrong format (no Bearer prefix)', async () => {
    const request = createMockRequest({ Authorization: 'Basic some-token' })
    const result = await authenticateRequest(request)

    expect(result).toHaveProperty('status', 401)
    const body = await (result as Response).json()
    expect(body.success).toBe(false)
  })

  it('returns 401 when Authorization header is just "Bearer" with no token', async () => {
    // Note: Headers API trims trailing whitespace, so 'Bearer ' becomes 'Bearer'
    // which does not match 'Bearer ' prefix, falling through to Unauthorized
    const request = createMockRequest({ Authorization: 'Bearer' })
    const result = await authenticateRequest(request)

    expect(result).toHaveProperty('status', 401)
    const body = await (result as Response).json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Unauthorized')
  })

  it('returns userId and decodedToken on valid token', async () => {
    const mockDecodedToken = {
      uid: 'user-123',
      email: 'test@example.com',
      aud: 'test-project',
      auth_time: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
      iat: Date.now() / 1000,
      iss: 'https://securetoken.google.com/test-project',
      sub: 'user-123',
      firebase: {
        identities: {},
        sign_in_provider: 'password',
      },
    }
    mockVerifyIdToken.mockResolvedValue(mockDecodedToken)

    const request = createMockRequest({ Authorization: 'Bearer valid-token-123' })
    const result = await authenticateRequest(request)

    expect(result).not.toHaveProperty('status')
    expect(result).toEqual({
      userId: 'user-123',
      decodedToken: mockDecodedToken,
    })
    expect(mockVerifyIdToken).toHaveBeenCalledWith('valid-token-123')
  })

  it('handles Firebase auth.verifyIdToken errors', async () => {
    mockVerifyIdToken.mockRejectedValue(new Error('Firebase: Token has been revoked'))
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const request = createMockRequest({ Authorization: 'Bearer revoked-token' })
    const result = await authenticateRequest(request)

    expect(result).toHaveProperty('status', 401)
    const body = await (result as Response).json()
    expect(body).toEqual({ success: false, error: 'Invalid or expired token' })
    consoleSpy.mockRestore()
  })

  it('handles expired tokens', async () => {
    mockVerifyIdToken.mockRejectedValue(
      new Error('Firebase ID token has expired. Get a fresh ID token and try again.')
    )
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const request = createMockRequest({ Authorization: 'Bearer expired-token' })
    const result = await authenticateRequest(request)

    expect(result).toHaveProperty('status', 401)
    const body = await (result as Response).json()
    expect(body.error).toBe('Invalid or expired token')
    consoleSpy.mockRestore()
  })

  it('works with Bearer token format and extracts token correctly', async () => {
    const mockDecodedToken = {
      uid: 'user-456',
      email: 'user@test.com',
      aud: 'test',
      auth_time: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
      iat: Date.now() / 1000,
      iss: 'https://securetoken.google.com/test',
      sub: 'user-456',
      firebase: { identities: {}, sign_in_provider: 'google.com' },
    }
    mockVerifyIdToken.mockResolvedValue(mockDecodedToken)

    const request = createMockRequest({ Authorization: 'Bearer my.jwt.token' })
    const result = await authenticateRequest(request)

    expect(mockVerifyIdToken).toHaveBeenCalledWith('my.jwt.token')
    expect(result).toEqual({
      userId: 'user-456',
      decodedToken: mockDecodedToken,
    })
  })

  it('handles malformed JWT tokens by returning 401', async () => {
    mockVerifyIdToken.mockRejectedValue(
      new Error('Decoding Firebase ID token failed. Make sure you passed the entire string JWT.')
    )
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const request = createMockRequest({ Authorization: 'Bearer not-a-real-jwt' })
    const result = await authenticateRequest(request)

    expect(result).toHaveProperty('status', 401)
    const body = await (result as Response).json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Invalid or expired token')
    consoleSpy.mockRestore()
  })

  it('accepts custom error message via options', async () => {
    const request = createMockRequest()
    const result = await authenticateRequest(request, {
      errorMessage: 'Please log in first',
    })

    expect(result).toHaveProperty('status', 401)
    const body = await (result as Response).json()
    expect(body.error).toBe('Please log in first')
  })
})

describe('verifyUserMatch', () => {
  it('returns null when user IDs match', () => {
    const result = verifyUserMatch('user-123', 'user-123')
    expect(result).toBeNull()
  })

  it('returns 403 when user IDs do not match', async () => {
    const result = verifyUserMatch('user-123', 'user-456')
    expect(result).not.toBeNull()
    expect(result!.status).toBe(403)
    const body = await result!.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('Forbidden')
  })
})

describe('isAdmin', () => {
  it('returns true for admin role', () => {
    expect(isAdmin({ role: 'admin' })).toBe(true)
  })

  it('returns false for non-admin roles', () => {
    expect(isAdmin({ role: 'developer' })).toBe(false)
    expect(isAdmin({ role: 'customer' })).toBe(false)
  })

  it('returns false for undefined userData', () => {
    expect(isAdmin(undefined)).toBe(false)
  })
})

describe('hasRole', () => {
  it('returns true when user has one of the specified roles', () => {
    expect(hasRole({ role: 'developer' }, ['developer', 'admin'])).toBe(true)
  })

  it('returns false when user role is not in allowed list', () => {
    expect(hasRole({ role: 'student' }, ['developer', 'admin'])).toBe(false)
  })

  it('returns false for undefined userData', () => {
    expect(hasRole(undefined, ['admin'])).toBe(false)
  })
})
