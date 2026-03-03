/**
 * API Key Utilities
 * 
 * Functions for generating, hashing, and validating API keys
 */

import { createHash, randomBytes } from 'crypto'
import { ApiKeyType, DEFAULT_RATE_LIMITS } from '@/lib/types/api-keys'

/**
 * Generate a cryptographically secure API key
 * Format: pk_[type]_[32 random alphanumeric chars]
 */
export function generateApiKey(type: ApiKeyType): string {
  const prefix = type === 'live' ? 'pk_live_' : 'pk_test_'
  
  // Generate 24 random bytes = 32 base64 chars, then make URL-safe
  const randomPart = randomBytes(24)
    .toString('base64')
    .replace(/\+/g, 'x')
    .replace(/\//g, 'y')
    .replace(/=/g, '')
    .slice(0, 32)
  
  return prefix + randomPart
}

/**
 * Hash an API key using SHA-256
 * We never store the plaintext key
 */
export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex')
}

/**
 * Get the prefix from a key
 */
export function getKeyPrefix(key: string): string {
  if (key.startsWith('pk_live_')) return 'pk_live_'
  if (key.startsWith('pk_test_')) return 'pk_test_'
  return ''
}

/**
 * Get the key type from a key
 */
export function getKeyType(key: string): ApiKeyType | null {
  if (key.startsWith('pk_live_')) return 'live'
  if (key.startsWith('pk_test_')) return 'test'
  return null
}

/**
 * Get last 4 characters of a key (for identification)
 */
export function getLastFourChars(key: string): string {
  return key.slice(-4)
}

/**
 * Validate key format
 */
export function isValidKeyFormat(key: string): boolean {
  // Must start with pk_live_ or pk_test_
  if (!key.startsWith('pk_live_') && !key.startsWith('pk_test_')) {
    return false
  }
  
  // Must be exactly 40 characters (8 char prefix + 32 char key)
  if (key.length !== 40) {
    return false
  }
  
  // The random part should only contain alphanumeric + x + y
  const randomPart = key.slice(8)
  if (!/^[A-Za-z0-9xy]+$/.test(randomPart)) {
    return false
  }
  
  return true
}

/**
 * Get default rate limit for key type
 */
export function getDefaultRateLimit(type: ApiKeyType): number {
  return DEFAULT_RATE_LIMITS[type]
}

/**
 * Mask a key for display (show prefix and last 4 chars only)
 */
export function maskKey(prefix: string, lastFour: string): string {
  return `${prefix}${'•'.repeat(28)}${lastFour}`
}

/**
 * Check if key is expired
 */
export function isKeyExpired(expiresAt: Date | null): boolean {
  if (!expiresAt) return false
  return new Date() > expiresAt
}

/**
 * Calculate expiration date from days
 */
export function calculateExpirationDate(daysFromNow: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date
}
