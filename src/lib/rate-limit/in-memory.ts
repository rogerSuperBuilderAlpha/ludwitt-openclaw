/**
 * Rate Limiting Utility — In-Memory (Server-Side)
 *
 * Simple in-memory rate limiter for API routes.
 * Best for: development, single-instance deployments, or non-critical endpoints.
 * Limitation: state is lost on restart and not shared across instances.
 *
 * For production distributed rate limiting, use `@/lib/rate-limit/upstash`.
 * For client-side (React hook) rate limiting, use `@/lib/rate-limit/client`.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 60000)
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetAt) {
        this.requests.delete(key)
      }
    }
  }

  /**
   * Check if request should be rate limited
   * @param identifier - Unique identifier (user ID, email, or IP)
   * @param limit - Maximum number of requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Object with allowed status and remaining requests
   */
  check(
    identifier: string,
    limit: number,
    windowMs: number
  ): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    // No existing entry or entry expired
    if (!entry || now > entry.resetAt) {
      const resetAt = now + windowMs
      this.requests.set(identifier, { count: 1, resetAt })
      return { allowed: true, remaining: limit - 1, resetAt }
    }

    // Entry exists and not expired
    if (entry.count >= limit) {
      return { allowed: false, remaining: 0, resetAt: entry.resetAt }
    }

    // Increment count
    entry.count++
    this.requests.set(identifier, entry)
    return {
      allowed: true,
      remaining: limit - entry.count,
      resetAt: entry.resetAt,
    }
  }

  /**
   * Reset rate limit for a specific identifier
   */
  reset(identifier: string) {
    this.requests.delete(identifier)
  }

  /**
   * Clear all rate limit entries
   */
  clear() {
    this.requests.clear()
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.clear()
  }
}

// Singleton instance
const rateLimiter = new RateLimiter()

/**
 * Rate limit presets for common use cases
 */
export const RateLimitPresets = {
  // Strict: 10 requests per minute (for sensitive operations like email sending)
  STRICT: { limit: 10, windowMs: 60 * 1000 },

  // Standard: 30 requests per minute (for normal mutations)
  STANDARD: { limit: 30, windowMs: 60 * 1000 },

  // Relaxed: 60 requests per minute (for read operations)
  RELAXED: { limit: 60, windowMs: 60 * 1000 },

  // Very Relaxed: 100 requests per minute (for high-frequency reads)
  VERY_RELAXED: { limit: 100, windowMs: 60 * 1000 },
}

/**
 * Apply rate limiting to an API route
 * Usage in API route:
 *
 * const rateLimitResult = applyRateLimit(userEmail, RateLimitPresets.STANDARD)
 * if (!rateLimitResult.allowed) {
 *   return NextResponse.json(
 *     { error: 'Rate limit exceeded. Please try again later.' },
 *     { status: 429, headers: rateLimitResult.headers }
 *   )
 * }
 */
export function applyRateLimit(
  identifier: string,
  preset: { limit: number; windowMs: number } = RateLimitPresets.STANDARD
): {
  allowed: boolean
  remaining: number
  resetAt: number
  headers: Record<string, string>
} {
  const result = rateLimiter.check(identifier, preset.limit, preset.windowMs)

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': preset.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetAt.toString(),
  }

  if (!result.allowed) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000)
    headers['Retry-After'] = retryAfter.toString()
  }

  return {
    ...result,
    headers,
  }
}

// Export for testing and manual control
export { rateLimiter }
