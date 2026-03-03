/**
 * User API Key Utilities
 * 
 * Server-side utilities for retrieving and using user-provided API keys
 */

import { db } from '@/lib/firebase/admin'
import { Collections } from '@/lib/basics/collections'
import { decryptApiKeyServer } from './server-api-key-decryption'
import { hasActiveSubscription } from './subscription-helpers'
import { logger } from '@/lib/logger'

/**
 * Get user's decrypted API keys from Firestore
 * Returns decrypted keys ready to use, or falls back to environment variables
 * Priority: User's own keys > Subscription (platform keys) > Environment variables
 */
export async function getUserApiKeys(userId: string): Promise<{
  anthropic?: string
  did?: string
}> {
  try {
    const userDoc = await db.collection(Collections.USERS).doc(userId).get()
    
    if (!userDoc.exists) {
      return {
        anthropic: process.env.ANTHROPIC_API_KEY,
        did: process.env.DID_API_KEY
      }
    }

    const userData = userDoc.data()
    const apiKeys = userData?.apiKeys || {}
    const hasSubscription = await hasActiveSubscription(userId)

    const result: { anthropic?: string; did?: string } = {}

    // Priority 1: User's own Anthropic key (if provided)
    if (apiKeys.anthropic?.encrypted) {
      try {
        const decrypted = await decryptApiKeyServer(apiKeys.anthropic.encrypted, userId)
        // Validate decrypted key format
        if (decrypted && decrypted.startsWith('sk-ant-')) {
          result.anthropic = decrypted
        } else {
          // Invalid format, fall back to subscription or env
          result.anthropic = hasSubscription ? process.env.ANTHROPIC_API_KEY : process.env.ANTHROPIC_API_KEY
        }
      } catch (error) {
        // Decryption failed, fall back to subscription or env
        result.anthropic = hasSubscription ? process.env.ANTHROPIC_API_KEY : process.env.ANTHROPIC_API_KEY
      }
    } else {
      // No user key, use subscription (platform) key if available, otherwise env
      result.anthropic = process.env.ANTHROPIC_API_KEY
    }

    // Priority 1: User's own D-ID key (if provided)
    if (apiKeys.did?.encrypted) {
      try {
        const decrypted = await decryptApiKeyServer(apiKeys.did.encrypted, userId)
        // Basic validation
        if (decrypted && decrypted.length > 0) {
          result.did = decrypted
        } else {
          result.did = hasSubscription ? process.env.DID_API_KEY : process.env.DID_API_KEY
        }
      } catch (error) {
        result.did = hasSubscription ? process.env.DID_API_KEY : process.env.DID_API_KEY
      }
    } else {
      // No user key, use subscription (platform) key if available, otherwise env
      result.did = process.env.DID_API_KEY
    }

    return result
  } catch (error) {
    logger.error('UserApiKeys', 'Error fetching user API keys', { error })
    // Fall back to environment variables on error
    return {
      anthropic: process.env.ANTHROPIC_API_KEY,
      did: process.env.DID_API_KEY
    }
  }
}

/**
 * Check if user has provided their own API keys
 */
export async function hasUserApiKeys(userId: string): Promise<boolean> {
  try {
    const userDoc = await db.collection(Collections.USERS).doc(userId).get()
    if (!userDoc.exists) return false
    
    const userData = userDoc.data()
    const apiKeys = userData?.apiKeys || {}
    return !!(apiKeys.anthropic?.encrypted || apiKeys.did?.encrypted)
  } catch (error) {
    return false
  }
}

