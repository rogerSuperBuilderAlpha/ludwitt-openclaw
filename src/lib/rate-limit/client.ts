/**
 * Rate Limiting Utility — Client-Side / React Hooks
 *
 * In-memory rate limiter intended for use in React components and hooks.
 * Best for: debouncing user actions, preventing rapid-fire API calls from the UI.
 *
 * For server-side in-memory rate limiting, use `@/lib/rate-limit/in-memory`.
 * For production distributed rate limiting, use `@/lib/rate-limit/upstash`.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map()

  /**
   * Check if action is rate limited
   * @param key Unique identifier (e.g., userId + action)
   * @param maxRequests Maximum requests allowed in time window
   * @param windowMs Time window in milliseconds
   * @returns { allowed: boolean, remaining: number, resetIn: number }
   */
  check(
    key: string,
    maxRequests: number,
    windowMs: number
  ): {
    allowed: boolean
    remaining: number
    resetIn: number
  } {
    const now = Date.now()
    const entry = this.limits.get(key)

    // No previous entry or window expired
    if (!entry || now > entry.resetAt) {
      this.limits.set(key, {
        count: 1,
        resetAt: now + windowMs,
      })

      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetIn: windowMs,
      }
    }

    // Within window
    if (entry.count < maxRequests) {
      entry.count++
      this.limits.set(key, entry)

      return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetIn: entry.resetAt - now,
      }
    }

    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetAt - now,
    }
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    this.limits.delete(key)
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetAt) {
        this.limits.delete(key)
      }
    }
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter()

// Run cleanup every minute
if (typeof window !== 'undefined') {
  setInterval(() => rateLimiter.cleanup(), 60000)
}

// Predefined rate limits for common actions
export const RATE_LIMITS = {
  // Authentication
  LOGIN: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  SIGNUP: { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 signups per hour
  PASSWORD_RESET: { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 resets per hour

  // Social actions
  FOLLOW: { maxRequests: 30, windowMs: 60 * 1000 }, // 30 follows per minute
  REACTION: { maxRequests: 60, windowMs: 60 * 1000 }, // 60 reactions per minute
  KUDOS: { maxRequests: 10, windowMs: 60 * 1000 }, // 10 kudos per minute
  MESSAGE: { maxRequests: 30, windowMs: 60 * 1000 }, // 30 messages per minute

  // Content creation
  PROJECT_CREATE: { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10 projects per hour
  PORTFOLIO_CREATE: { maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20 items per hour
  SERVICE_CREATE: { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 services per hour

  // API calls
  API_GENERAL: { maxRequests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
  API_HEAVY: { maxRequests: 10, windowMs: 60 * 1000 }, // 10 heavy requests per minute
}

/**
 * Rate limit a specific action for a user
 */
export function checkRateLimit(
  userId: string,
  action: keyof typeof RATE_LIMITS
): { allowed: boolean; remaining: number; resetIn: number } {
  const limit = RATE_LIMITS[action]
  const key = `${userId}:${action}`
  return rateLimiter.check(key, limit.maxRequests, limit.windowMs)
}

/**
 * Custom rate limit check
 */
export function checkCustomRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  return rateLimiter.check(key, maxRequests, windowMs)
}

/**
 * Higher-order function to wrap async functions with rate limiting
 */
export function withRateLimit<
  T extends (...args: Parameters<T>) => Promise<ReturnType<T>>,
>(fn: T, userId: string, action: keyof typeof RATE_LIMITS): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const result = checkRateLimit(userId, action)

    if (!result.allowed) {
      const resetInSeconds = Math.ceil(result.resetIn / 1000)
      throw new Error(
        `Rate limit exceeded. Please try again in ${resetInSeconds} seconds.`
      )
    }

    return fn(...args)
  }) as T
}

/**
 * Debounce function to limit rapid calls
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, waitMs)
  }
}

/**
 * Throttle function to limit call frequency
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  func: T,
  limitMs: number
): (...args: Parameters<T>) => void {
  let lastRun = 0

  return function (...args: Parameters<T>) {
    const now = Date.now()

    if (now - lastRun >= limitMs) {
      func(...args)
      lastRun = now
    }
  }
}

// Hook for client-side rate limiting
export function useRateLimit(
  userId: string | undefined,
  action: keyof typeof RATE_LIMITS
) {
  return {
    check: () => {
      if (!userId) {
        return { allowed: false, remaining: 0, resetIn: 0 }
      }
      return checkRateLimit(userId, action)
    },
    execute: async <T>(fn: () => Promise<T>): Promise<T> => {
      if (!userId) {
        throw new Error('User must be authenticated')
      }

      const result = checkRateLimit(userId, action)

      if (!result.allowed) {
        const resetInSeconds = Math.ceil(result.resetIn / 1000)
        throw new Error(
          `Rate limit exceeded. Please try again in ${resetInSeconds} seconds.`
        )
      }

      return fn()
    },
  }
}
