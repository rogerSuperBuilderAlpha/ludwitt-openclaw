/**
 * Rate Limiting Utility — Production Distributed (Upstash Redis)
 *
 * Redis-backed rate limiter for production multi-instance deployments.
 * Best for: AI endpoints, authentication endpoints, and any route that
 * needs consistent rate limiting across serverless/edge functions.
 *
 * For development/single-instance, use `@/lib/rate-limit/in-memory`.
 * For client-side React hook throttling, use `@/lib/rate-limit/client`.
 *
 * Setup:
 * 1. Create account at https://console.upstash.com
 * 2. Create a Redis database
 * 3. Add to .env.local:
 *    - UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
 *    - UPSTASH_REDIS_REST_TOKEN=AXxxxx
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { createHash } from 'crypto'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'

// =============================================================================
// Configuration
// =============================================================================

// Different rate limits for different endpoint types
export const RATE_LIMITS = {
  // AI endpoints - expensive, limit heavily
  ai: { requests: 20, window: '1m' as const }, // 20 requests per minute
  // Auth endpoints - prevent brute force
  auth: { requests: 10, window: '1m' as const }, // 10 attempts per minute
  // General API - reasonable limits
  api: { requests: 100, window: '1m' as const }, // 100 requests per minute
  // Document uploads
  upload: { requests: 10, window: '1m' as const }, // 10 uploads per minute
  // Strict limit for sensitive operations
  strict: { requests: 5, window: '1m' as const }, // 5 requests per minute
} as const

export type RateLimitType = keyof typeof RATE_LIMITS

// Mapping from Upstash rate limit types to in-memory presets for fallback
const IN_MEMORY_PRESET_MAP: Record<
  RateLimitType,
  { limit: number; windowMs: number }
> = {
  ai: RateLimitPresets.STRICT, // AI endpoints — expensive, limit heavily
  auth: RateLimitPresets.STRICT, // Auth endpoints — prevent brute force
  api: RateLimitPresets.VERY_RELAXED, // General API — reasonable limits
  upload: RateLimitPresets.STRICT, // Document uploads — limited
  strict: RateLimitPresets.STRICT, // Sensitive operations — most restrictive
}

// =============================================================================
// Redis Client (Lazy Initialization)
// =============================================================================

let redis: Redis | null = null
const rateLimiters: Map<RateLimitType, Ratelimit> = new Map()

function getRedis(): Redis | null {
  if (redis) return redis

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return null
  }

  redis = new Redis({ url, token })
  return redis
}

function getRateLimiter(type: RateLimitType): Ratelimit | null {
  // Check cache first
  const cached = rateLimiters.get(type)
  if (cached) return cached

  const redisClient = getRedis()
  if (!redisClient) return null

  const config = RATE_LIMITS[type]
  const limiter = new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(config.requests, config.window),
    analytics: true,
    prefix: `ratelimit:${type}`,
  })

  rateLimiters.set(type, limiter)
  return limiter
}

// =============================================================================
// Rate Limit Check
// =============================================================================

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// Track consecutive Redis errors to fail closed after threshold
const REDIS_ERROR_THRESHOLD = 5
let redisErrorCount = 0

/**
 * Check rate limit for an identifier (usually user ID or IP)
 *
 * @example
 * const result = await checkRateLimit('ai', userId)
 * if (!result.success) {
 *   return rateLimitedResponse(result)
 * }
 */
export async function checkRateLimit(
  type: RateLimitType,
  identifier: string
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[type]
  const limiter = getRateLimiter(type)

  // If Upstash not configured: fail closed in production, fall back to in-memory in dev
  if (!limiter) {
    if (process.env.NODE_ENV === 'production') {
      logger.error(
        'RateLimit',
        `Upstash not configured in production, blocking ${type} for ${identifier}`
      )
      return {
        success: false,
        limit: config.requests,
        remaining: 0,
        reset: Date.now() + 60000,
      }
    }
    logger.warn(
      'RateLimit',
      `Upstash not configured, falling back to in-memory rate limiter for ${type}`
    )
    const preset = IN_MEMORY_PRESET_MAP[type]
    const result = applyRateLimit(identifier, preset)
    return {
      success: result.allowed,
      limit: preset.limit,
      remaining: result.remaining,
      reset: result.resetAt,
    }
  }

  try {
    const result = await limiter.limit(identifier)
    redisErrorCount = 0 // Reset on success
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    }
  } catch (error) {
    logger.error('RateLimit', 'Redis error', { error })
    // Track errors: fail closed in production after repeated failures
    redisErrorCount++
    if (
      redisErrorCount > REDIS_ERROR_THRESHOLD &&
      process.env.NODE_ENV === 'production'
    ) {
      logger.error(
        'RateLimit',
        `Redis error threshold exceeded (${redisErrorCount}), failing closed`
      )
      return {
        success: false,
        limit: config.requests,
        remaining: 0,
        reset: Date.now() + 60000,
      }
    }
    // Below threshold or in dev, fail open
    return {
      success: true,
      limit: config.requests,
      remaining: config.requests,
      reset: Date.now() + 60000,
    }
  }
}

// =============================================================================
// Response Helpers
// =============================================================================

/**
 * Get rate limit headers for response
 */
export function getRateLimitHeaders(
  result: RateLimitResult
): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  }
}

/**
 * Create a rate-limited response (429 Too Many Requests)
 */
export function rateLimitedResponse(result: RateLimitResult): NextResponse {
  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)

  return NextResponse.json(
    {
      error: 'Too many requests',
      message: 'Please slow down and try again later.',
      retryAfter,
    },
    {
      status: 429,
      headers: {
        ...getRateLimitHeaders(result),
        'Retry-After': retryAfter.toString(),
      },
    }
  )
}

// =============================================================================
// Anonymous Identifier Helper
// =============================================================================

/**
 * Derive a per-IP bucket key for unauthenticated requests.
 * Hashes the IP so we never store raw addresses in Redis.
 */
function getAnonymousIdentifier(request: Request): string {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')
  if (!ip) return 'anon_unknown'
  const hash = createHash('sha256').update(ip).digest('hex').slice(0, 16)
  return `anon_${hash}`
}

// =============================================================================
// Middleware Helper
// =============================================================================

/**
 * Rate limit middleware for API routes
 *
 * @example
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await rateLimit(request, 'ai')
 *   if (rateLimitResult) return rateLimitResult // Returns 429 if limited
 *
 *   // Continue with request...
 * }
 */
export async function rateLimit(
  request: Request,
  type: RateLimitType,
  identifier?: string
): Promise<NextResponse | null> {
  // Get identifier from auth header, or fall back to per-IP hash
  const id =
    identifier ||
    request.headers.get('x-user-id') ||
    getAnonymousIdentifier(request)

  const result = await checkRateLimit(type, id)

  if (!result.success) {
    return rateLimitedResponse(result)
  }

  return null // No rate limit hit, continue
}
