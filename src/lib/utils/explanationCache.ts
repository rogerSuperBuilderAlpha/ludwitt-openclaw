/**
 * Explanation Cache Utilities
 *
 * Manages localStorage-based caching for AI explanations.
 * Handles persistence, retrieval, expiry (24h), and cleanup
 * to prevent storage bloat.
 */

import { logger } from '@/lib/logger'

const STORAGE_KEY_PREFIX = 'ai_explanation_'
const MAX_STORED_EXPLANATIONS = 50

export interface UsageInfo {
  inputTokens: number
  outputTokens: number
  totalTokens: number
}

export interface StoredExplanation {
  explanation: string
  costCharged: number
  newBalance: number
  usage: UsageInfo
  progressReport: string
  whatTried: string
  understandingLevel: string
  timestamp: number
}

function getStorageKey(userId: string, problemId: string): string {
  return `${STORAGE_KEY_PREFIX}${userId}_${problemId}`
}

export function loadStoredExplanation(
  userId: string,
  problemId: string
): StoredExplanation | null {
  try {
    const key = getStorageKey(userId, problemId)
    const stored = localStorage.getItem(key)
    if (stored) {
      const data = JSON.parse(stored) as StoredExplanation
      // Only use if less than 24 hours old
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        return data
      }
    }
  } catch (e) {
    logger.error('AIExplanation', 'Failed to load stored explanation', {
      error: e,
    })
  }
  return null
}

function cleanupOldExplanations(userId: string): void {
  try {
    const prefix = `${STORAGE_KEY_PREFIX}${userId}_`
    const keys: { key: string; timestamp: number }[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(prefix)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}')
          keys.push({ key, timestamp: data.timestamp || 0 })
        } catch {
          // Invalid data, mark for removal
          keys.push({ key, timestamp: 0 })
        }
      }
    }

    // Sort by timestamp (oldest first) and remove excess
    if (keys.length > MAX_STORED_EXPLANATIONS) {
      keys.sort((a, b) => a.timestamp - b.timestamp)
      const toRemove = keys.slice(0, keys.length - MAX_STORED_EXPLANATIONS)
      toRemove.forEach(({ key }) => localStorage.removeItem(key))
    }
  } catch (e) {
    logger.error('AIExplanation', 'Failed to cleanup old explanations', {
      error: e,
    })
  }
}

export function saveExplanation(
  userId: string,
  problemId: string,
  data: StoredExplanation
): void {
  try {
    const key = getStorageKey(userId, problemId)
    localStorage.setItem(key, JSON.stringify(data))

    // Clean up old explanations to prevent storage bloat
    cleanupOldExplanations(userId)
  } catch (e) {
    logger.error('AIExplanation', 'Failed to save explanation', { error: e })
  }
}

export function formatCentsAsDollars(cents: number): string {
  const dollars = cents / 100
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
