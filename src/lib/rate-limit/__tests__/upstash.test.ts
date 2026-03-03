/**
 * @jest-environment node
 */

/**
 * Unit tests for Upstash rate limiting utility
 */

import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Mocks – declared before any imports from the module under test
// ---------------------------------------------------------------------------

const mockLimit = jest.fn()
const mockSlidingWindow = jest.fn().mockReturnValue('sliding-window-config')

jest.mock('@upstash/ratelimit', () => {
  const MockRatelimit = jest.fn().mockImplementation(() => ({
    limit: mockLimit,
  })) as jest.Mock & { slidingWindow: jest.Mock }
  MockRatelimit.slidingWindow = mockSlidingWindow
  return { Ratelimit: MockRatelimit }
})

jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({ __mock: true })),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}))

// ---------------------------------------------------------------------------
// Helpers for resetting module-level state between tests
// ---------------------------------------------------------------------------

// The module under test keeps module-level singletons (redis, rateLimiters,
// redisErrorCount). We need to re-import the module to reset those.  We use
// `jest.isolateModules` for that purpose in the tests that need fresh state.

function importModule() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('../upstash') as typeof import('../upstash')
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('RATE_LIMITS configuration', () => {
  const { RATE_LIMITS } = importModule()

  it('contains exactly 5 rate limit types', () => {
    const keys = Object.keys(RATE_LIMITS)
    expect(keys).toHaveLength(5)
    expect(keys).toEqual(
      expect.arrayContaining(['ai', 'auth', 'api', 'upload', 'strict'])
    )
  })

  it('ai: 20 requests per 1m', () => {
    expect(RATE_LIMITS.ai).toEqual({ requests: 20, window: '1m' })
  })

  it('auth: 10 requests per 1m', () => {
    expect(RATE_LIMITS.auth).toEqual({ requests: 10, window: '1m' })
  })

  it('api: 100 requests per 1m', () => {
    expect(RATE_LIMITS.api).toEqual({ requests: 100, window: '1m' })
  })

  it('upload: 10 requests per 1m', () => {
    expect(RATE_LIMITS.upload).toEqual({ requests: 10, window: '1m' })
  })

  it('strict: 5 requests per 1m', () => {
    expect(RATE_LIMITS.strict).toEqual({ requests: 5, window: '1m' })
  })
})

// ---------------------------------------------------------------------------
// checkRateLimit
// ---------------------------------------------------------------------------

describe('checkRateLimit', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset modules so module-level state (redis, rateLimiters, errorCount) is fresh
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  // ---- Development mode (fail open) ----

  it('returns success in development mode when Upstash is not configured', async () => {
    process.env = { ...process.env, NODE_ENV: 'development' }
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { checkRateLimit, RATE_LIMITS } = importModule()
    const result = await checkRateLimit('ai', 'user-123')

    expect(result.success).toBe(true)
    // In-memory fallback uses STRICT preset (limit: 10), not the Upstash config
    expect(result.limit).toBeGreaterThan(0)
    expect(result.remaining).toBeGreaterThan(0)
    expect(typeof result.reset).toBe('number')
  })

  it('does not call Upstash in development mode', async () => {
    process.env = { ...process.env, NODE_ENV: 'development' }
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { checkRateLimit } = importModule()
    await checkRateLimit('api', 'user-456')

    expect(mockLimit).not.toHaveBeenCalled()
  })

  // ---- Production mode without config (fail closed) ----

  it('returns failure in production mode when Upstash is not configured', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { checkRateLimit, RATE_LIMITS } = importModule()
    const result = await checkRateLimit('auth', 'user-789')

    expect(result.success).toBe(false)
    expect(result.limit).toBe(RATE_LIMITS.auth.requests)
    expect(result.remaining).toBe(0)
  })

  // ---- Production mode with config (calls Upstash) ----

  it('returns Upstash result when rate limit succeeds', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 20,
      remaining: 19,
      reset: 1700000000000,
    })

    const { checkRateLimit } = importModule()
    const result = await checkRateLimit('ai', 'user-abc')

    expect(mockLimit).toHaveBeenCalledWith('user-abc')
    expect(result).toEqual({
      success: true,
      limit: 20,
      remaining: 19,
      reset: 1700000000000,
    })
  })

  it('returns failure when rate limit is exceeded', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: false,
      limit: 20,
      remaining: 0,
      reset: 1700000060000,
    })

    const { checkRateLimit } = importModule()
    const result = await checkRateLimit('ai', 'user-abc')

    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
    expect(result.reset).toBe(1700000060000)
  })

  // ---- Redis error handling ----

  it('fails open on Redis error below threshold', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockRejectedValue(new Error('Redis connection timeout'))

    const { checkRateLimit, RATE_LIMITS } = importModule()
    const result = await checkRateLimit('api', 'user-err')

    expect(result.success).toBe(true)
    expect(result.limit).toBe(RATE_LIMITS.api.requests)
    expect(result.remaining).toBe(RATE_LIMITS.api.requests)
  })

  it('fails closed after consecutive Redis errors exceed threshold (5+) in production', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockRejectedValue(new Error('Redis unavailable'))

    const { checkRateLimit } = importModule()

    // First 5 errors: still fails open (errorCount goes 1..5, threshold is >5)
    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit('api', 'user-err')
      expect(result.success).toBe(true)
    }

    // 6th error: errorCount = 6 > 5 threshold, should fail closed
    const closedResult = await checkRateLimit('api', 'user-err')
    expect(closedResult.success).toBe(false)
    expect(closedResult.remaining).toBe(0)
  })

  it('resets error count on a successful Redis call', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    const { checkRateLimit } = importModule()

    // Generate 4 errors
    mockLimit.mockRejectedValue(new Error('Redis error'))
    for (let i = 0; i < 4; i++) {
      await checkRateLimit('api', 'user-x')
    }

    // Successful call resets the counter
    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })
    const successResult = await checkRateLimit('api', 'user-x')
    expect(successResult.success).toBe(true)

    // Now 4 more errors should still fail open (counter was reset)
    mockLimit.mockRejectedValue(new Error('Redis error again'))
    for (let i = 0; i < 4; i++) {
      const result = await checkRateLimit('api', 'user-x')
      expect(result.success).toBe(true)
    }
  })

  it('fails open on Redis error in development regardless of count', async () => {
    process.env = { ...process.env, NODE_ENV: 'development' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockRejectedValue(new Error('Redis error'))

    const { checkRateLimit } = importModule()

    // Even after many errors, dev mode fails open
    for (let i = 0; i < 10; i++) {
      const result = await checkRateLimit('api', 'user-dev')
      expect(result.success).toBe(true)
    }
  })
})

// ---------------------------------------------------------------------------
// rateLimitedResponse
// ---------------------------------------------------------------------------

describe('rateLimitedResponse', () => {
  const { rateLimitedResponse } = importModule()

  it('returns a 429 response', () => {
    const result: RateLimitResult = {
      success: false,
      limit: 20,
      remaining: 0,
      reset: Date.now() + 30000,
    }

    const response = rateLimitedResponse(result)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(429)
  })

  it('includes Retry-After header in seconds', () => {
    const resetMs = Date.now() + 45000 // 45 seconds from now
    const result: RateLimitResult = {
      success: false,
      limit: 10,
      remaining: 0,
      reset: resetMs,
    }

    const response = rateLimitedResponse(result)
    const retryAfter = response.headers.get('Retry-After')

    expect(retryAfter).toBeDefined()
    // Retry-After should be roughly 45 (allow 1 second tolerance)
    const retryAfterNum = parseInt(retryAfter!, 10)
    expect(retryAfterNum).toBeGreaterThanOrEqual(44)
    expect(retryAfterNum).toBeLessThanOrEqual(46)
  })

  it('includes X-RateLimit-* headers', () => {
    const result: RateLimitResult = {
      success: false,
      limit: 20,
      remaining: 0,
      reset: 1700000000000,
    }

    const response = rateLimitedResponse(result)

    expect(response.headers.get('X-RateLimit-Limit')).toBe('20')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
    expect(response.headers.get('X-RateLimit-Reset')).toBe('1700000000000')
  })

  it('returns JSON body with error message and retryAfter', async () => {
    const result: RateLimitResult = {
      success: false,
      limit: 5,
      remaining: 0,
      reset: Date.now() + 10000,
    }

    const response = rateLimitedResponse(result)
    const body = await response.json()

    expect(body.error).toBe('Too many requests')
    expect(body.message).toContain('slow down')
    expect(typeof body.retryAfter).toBe('number')
    expect(body.retryAfter).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// getRateLimitHeaders
// ---------------------------------------------------------------------------

describe('getRateLimitHeaders', () => {
  const { getRateLimitHeaders } = importModule()

  it('returns correct X-RateLimit-* header keys and string values', () => {
    const result: RateLimitResult = {
      success: true,
      limit: 100,
      remaining: 87,
      reset: 1700000060000,
    }

    const headers = getRateLimitHeaders(result)

    expect(headers['X-RateLimit-Limit']).toBe('100')
    expect(headers['X-RateLimit-Remaining']).toBe('87')
    expect(headers['X-RateLimit-Reset']).toBe('1700000060000')
  })

  it('returns string values even for zero remaining', () => {
    const result: RateLimitResult = {
      success: false,
      limit: 5,
      remaining: 0,
      reset: 1700000030000,
    }

    const headers = getRateLimitHeaders(result)

    expect(headers['X-RateLimit-Remaining']).toBe('0')
  })
})

// ---------------------------------------------------------------------------
// getAnonymousIdentifier (tested via rateLimit middleware)
// ---------------------------------------------------------------------------

describe('getAnonymousIdentifier (via rateLimit middleware)', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
    process.env = { ...originalEnv }
    // Set up dev mode so we don't need Upstash configured
    process.env = { ...process.env, NODE_ENV: 'development' }
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('produces consistent hashes for the same IP', async () => {
    // We cannot test getAnonymousIdentifier directly (not exported),
    // but we can verify it through the rateLimit middleware.
    // In dev mode with no Upstash, checkRateLimit always succeeds,
    // so we test the hashing logic by using a production setup.
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()

    const request1 = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': '192.168.1.100' },
    })
    const request2 = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': '192.168.1.100' },
    })

    await rateLimit(request1, 'api')
    await rateLimit(request2, 'api')

    // Both calls should use the same identifier
    const firstCallId = mockLimit.mock.calls[0][0]
    const secondCallId = mockLimit.mock.calls[1][0]

    expect(firstCallId).toBe(secondCallId)
    expect(firstCallId).toMatch(/^anon_[a-f0-9]{16}$/)
  })

  it('does not store raw IP in the identifier', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()
    const ip = '203.0.113.42'
    const request = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': ip },
    })

    await rateLimit(request, 'api')

    const callId = mockLimit.mock.calls[0][0]
    expect(callId).not.toContain(ip)
    expect(callId).toMatch(/^anon_/)
  })

  it('produces different hashes for different IPs', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()

    const request1 = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': '10.0.0.1' },
    })
    const request2 = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': '10.0.0.2' },
    })

    await rateLimit(request1, 'api')
    await rateLimit(request2, 'api')

    const id1 = mockLimit.mock.calls[0][0]
    const id2 = mockLimit.mock.calls[1][0]

    expect(id1).not.toBe(id2)
  })

  it('returns anon_unknown when no IP headers are present', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()
    const request = new Request('https://example.com/api/test')

    await rateLimit(request, 'api')

    expect(mockLimit).toHaveBeenCalledWith('anon_unknown')
  })

  it('uses x-real-ip when x-forwarded-for is not present', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()
    const request = new Request('https://example.com/api/test', {
      headers: { 'x-real-ip': '172.16.0.1' },
    })

    await rateLimit(request, 'api')

    const callId = mockLimit.mock.calls[0][0]
    expect(callId).toMatch(/^anon_[a-f0-9]{16}$/)
    expect(callId).not.toContain('172.16.0.1')
  })

  it('uses first IP from x-forwarded-for when multiple are present', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit: rl } = importModule()

    // Request with multiple IPs in x-forwarded-for
    const request = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': '10.0.0.1, 10.0.0.2, 10.0.0.3' },
    })
    await rl(request, 'api')

    // Make another request with just the first IP
    jest.resetModules()
    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit: rl2 } = importModule()
    const request2 = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': '10.0.0.1' },
    })
    await rl2(request2, 'api')

    // Both should produce the same identifier (based on first IP only)
    const id1 = mockLimit.mock.calls[0][0]
    const id2 = mockLimit.mock.calls[1][0]
    expect(id1).toBe(id2)
  })
})

// ---------------------------------------------------------------------------
// rateLimit middleware helper
// ---------------------------------------------------------------------------

describe('rateLimit middleware', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('returns null when rate limit is not exceeded', async () => {
    process.env = { ...process.env, NODE_ENV: 'development' }
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { rateLimit } = importModule()
    const request = new Request('https://example.com/api/test')

    const result = await rateLimit(request, 'api')

    expect(result).toBeNull()
  })

  it('returns 429 NextResponse when rate limit is exceeded', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: false,
      limit: 20,
      remaining: 0,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()
    const request = new Request('https://example.com/api/test', {
      headers: { 'x-user-id': 'user-limited' },
    })

    const result = await rateLimit(request, 'ai')

    expect(result).not.toBeNull()
    expect(result!.status).toBe(429)
    const body = await result!.json()
    expect(body.error).toBe('Too many requests')
  })

  it('uses explicit identifier when provided', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()
    const request = new Request('https://example.com/api/test', {
      headers: { 'x-user-id': 'should-be-ignored' },
    })

    await rateLimit(request, 'api', 'explicit-user-id')

    expect(mockLimit).toHaveBeenCalledWith('explicit-user-id')
  })

  it('falls back to x-user-id header when no explicit identifier', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()
    const request = new Request('https://example.com/api/test', {
      headers: { 'x-user-id': 'header-user-id' },
    })

    await rateLimit(request, 'api')

    expect(mockLimit).toHaveBeenCalledWith('header-user-id')
  })

  it('falls back to anonymous identifier when no user ID or explicit identifier', async () => {
    process.env = { ...process.env, NODE_ENV: 'production' }
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    })

    const { rateLimit } = importModule()
    const request = new Request('https://example.com/api/test', {
      headers: { 'x-forwarded-for': '192.168.1.1' },
    })

    await rateLimit(request, 'api')

    const callId = mockLimit.mock.calls[0][0]
    expect(callId).toMatch(/^anon_[a-f0-9]{16}$/)
  })
})

// ---------------------------------------------------------------------------
// Type alias for readability in this file
// ---------------------------------------------------------------------------
type RateLimitResult = {
  success: boolean
  limit: number
  remaining: number
  reset: number
}
