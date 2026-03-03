/**
 * Shared test utilities for API route tests.
 *
 * Provides mock factories, request builders, and assertion helpers
 * to reduce boilerplate across API route test files.
 */

import { NextRequest, NextResponse } from 'next/server'

// =============================================================================
// Request Builders
// =============================================================================

/**
 * Create a mock NextRequest for testing API routes.
 */
export function createMockRequest(
  method: string = 'GET',
  options: {
    body?: Record<string, unknown>
    headers?: Record<string, string>
    url?: string
  } = {}
): NextRequest {
  const url = options.url || 'http://localhost:3000/api/test'
  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  if (options.body && method !== 'GET') {
    init.body = JSON.stringify(options.body)
  }

  return new NextRequest(url, { ...init, signal: undefined })
}

/**
 * Create an authenticated mock request. Sets up the Authorization header
 * that authenticateRequest expects.
 */
export function createAuthenticatedRequest(
  method: string = 'GET',
  options: {
    body?: Record<string, unknown>
    headers?: Record<string, string>
    url?: string
    token?: string
  } = {}
): NextRequest {
  return createMockRequest(method, {
    ...options,
    headers: {
      Authorization: `Bearer ${options.token || 'mock-firebase-token'}`,
      ...options.headers,
    },
  })
}

// =============================================================================
// Mock Factories
// =============================================================================

/**
 * Mock authenticateRequest to return a successful auth result.
 */
export function mockAuthSuccess(
  userId: string = 'test-user-123',
  extra: {
    email?: string
    emailVerified?: boolean
  } = {}
) {
  return {
    userId,
    decodedToken: {
      uid: userId,
      email: extra.email || 'test@example.com',
      email_verified: extra.emailVerified ?? true,
    },
  }
}

/**
 * Mock authenticateRequest to return an auth failure (401).
 */
export function mockAuthFailure() {
  return NextResponse.json(
    { success: false, error: 'Unauthorized' },
    { status: 401 }
  )
}

/**
 * Create a mock Firestore document snapshot.
 */
export function mockFirestoreDoc(
  data: Record<string, unknown> | null,
  id: string = 'doc-123'
) {
  return {
    exists: data !== null,
    id,
    data: () => data,
    ref: { id, path: `collection/${id}` },
  }
}

/**
 * Create a mock Firestore query snapshot.
 */
export function mockFirestoreQuery(
  docs: Array<{ id: string; data: Record<string, unknown> }>
) {
  return {
    empty: docs.length === 0,
    size: docs.length,
    docs: docs.map((d) => ({
      id: d.id,
      data: () => d.data,
      exists: true,
      ref: { id: d.id },
    })),
  }
}

// =============================================================================
// Standard Mock Setup
// =============================================================================

/**
 * Common jest.mock declarations for API route tests.
 * Call these at the top of your test file (before any imports from the route).
 *
 * Usage:
 * ```ts
 * jest.mock('@/lib/api/auth-middleware', () => ({ authenticateRequest: jest.fn() }))
 * jest.mock('@/lib/firebase/admin', () => ({ db: mockDb }))
 * jest.mock('@/lib/rate-limit/upstash', () => ({
 *   checkRateLimit: jest.fn().mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: Date.now() + 60000 }),
 *   rateLimitedResponse: jest.fn(),
 * }))
 * ```
 */

/**
 * Create a mock Firestore `db` object for use in jest.mock.
 */
export function createMockDb() {
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
    db: {
      collection: jest.fn().mockReturnValue(mockCollection),
    },
    mockCollection,
    mockDoc,
  }
}

// =============================================================================
// Response Assertions
// =============================================================================

/**
 * Assert that a response is a successful JSON response.
 */
export async function expectSuccessResponse(
  response: NextResponse,
  statusCode: number = 200
) {
  expect(response.status).toBe(statusCode)
  const body = await response.json()
  expect(body.success).toBe(true)
  return body
}

/**
 * Assert that a response is an error JSON response.
 */
export async function expectErrorResponse(
  response: NextResponse,
  statusCode: number,
  errorMessage?: string
) {
  expect(response.status).toBe(statusCode)
  const body = await response.json()
  if (errorMessage) {
    expect(body.error).toContain(errorMessage)
  }
  return body
}
