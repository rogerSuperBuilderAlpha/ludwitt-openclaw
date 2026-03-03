/**
 * API Key Service
 * 
 * Firestore operations for API key management
 */

import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { 
  ApiKey, 
  ApiKeyDoc, 
  ApiKeyPublic, 
  ApiKeyCreateResponse,
  ApiKeyValidation,
  ApiKeyType,
} from '@/lib/types/api-keys'
import {
  generateApiKey,
  hashApiKey,
  getKeyPrefix,
  getKeyType,
  getLastFourChars,
  getDefaultRateLimit,
  isKeyExpired,
  calculateExpirationDate,
} from './utils'

const COLLECTION = 'developerApiKeys'

/**
 * Create a new API key
 */
export async function createApiKey(
  userId: string,
  userEmail: string,
  name: string,
  type: ApiKeyType,
  expiresInDays?: number,
  scopes: string[] = []
): Promise<ApiKeyCreateResponse> {
  // Generate the key
  const fullKey = generateApiKey(type)
  const keyHash = hashApiKey(fullKey)
  const prefix = getKeyPrefix(fullKey)
  const lastFourChars = getLastFourChars(fullKey)
  
  // Calculate expiration
  const expiresAt = expiresInDays 
    ? calculateExpirationDate(expiresInDays)
    : null
  
  // Create document
  const docData: Omit<ApiKeyDoc, 'createdAt' | 'lastUsedAt' | 'expiresAt' | 'revokedAt'> & {
    createdAt: FieldValue
    lastUsedAt: null
    expiresAt: Date | null
    revokedAt: null
  } = {
    userId,
    userEmail,
    name,
    type,
    prefix,
    keyHash,
    lastFourChars,
    createdAt: FieldValue.serverTimestamp(),
    lastUsedAt: null,
    expiresAt,
    isRevoked: false,
    revokedAt: null,
    totalRequests: 0,
    requestsToday: 0,
    lastRequestDate: null,
    rateLimit: getDefaultRateLimit(type),
    scopes,
  }
  
  const docRef = await db.collection(COLLECTION).add(docData)
  
  // Return the public key info + full key (only time it's shown)
  return {
    key: {
      id: docRef.id,
      name,
      type,
      prefix,
      lastFourChars,
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      expiresAt: expiresAt?.toISOString() || null,
      isRevoked: false,
      totalRequests: 0,
      scopes,
    },
    fullKey,
  }
}

/**
 * List all API keys for a user
 */
export async function listApiKeys(userId: string): Promise<ApiKeyPublic[]> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get()
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as ApiKeyDoc
    return {
      id: doc.id,
      name: data.name,
      type: data.type,
      prefix: data.prefix,
      lastFourChars: data.lastFourChars,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      lastUsedAt: data.lastUsedAt?.toDate?.()?.toISOString() || null,
      expiresAt: data.expiresAt?.toDate?.()?.toISOString() || null,
      isRevoked: data.isRevoked,
      totalRequests: data.totalRequests || 0,
      scopes: data.scopes || [],
    }
  })
}

/**
 * Get a single API key by ID (for owner only)
 */
export async function getApiKey(keyId: string, userId: string): Promise<ApiKeyPublic | null> {
  const doc = await db.collection(COLLECTION).doc(keyId).get()
  
  if (!doc.exists) return null
  
  const data = doc.data() as ApiKeyDoc
  
  // Verify ownership
  if (data.userId !== userId) return null
  
  return {
    id: doc.id,
    name: data.name,
    type: data.type,
    prefix: data.prefix,
    lastFourChars: data.lastFourChars,
    createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    lastUsedAt: data.lastUsedAt?.toDate?.()?.toISOString() || null,
    expiresAt: data.expiresAt?.toDate?.()?.toISOString() || null,
    isRevoked: data.isRevoked,
    totalRequests: data.totalRequests || 0,
    scopes: data.scopes || [],
  }
}

/**
 * Revoke an API key
 */
export async function revokeApiKey(
  keyId: string, 
  userId: string, 
  reason?: string
): Promise<boolean> {
  const docRef = db.collection(COLLECTION).doc(keyId)
  const doc = await docRef.get()
  
  if (!doc.exists) return false
  
  const data = doc.data() as ApiKeyDoc
  
  // Verify ownership
  if (data.userId !== userId) return false
  
  // Already revoked
  if (data.isRevoked) return true
  
  await docRef.update({
    isRevoked: true,
    revokedAt: FieldValue.serverTimestamp(),
    revokedReason: reason || 'User revoked',
  })
  
  return true
}

/**
 * Delete an API key permanently
 */
export async function deleteApiKey(keyId: string, userId: string): Promise<boolean> {
  const docRef = db.collection(COLLECTION).doc(keyId)
  const doc = await docRef.get()
  
  if (!doc.exists) return false
  
  const data = doc.data() as ApiKeyDoc
  
  // Verify ownership
  if (data.userId !== userId) return false
  
  await docRef.delete()
  return true
}

/**
 * Validate an API key and return user info
 * This is the main function called by the auth middleware
 */
export async function validateApiKey(key: string): Promise<ApiKeyValidation> {
  // Check format
  const type = getKeyType(key)
  if (!type) {
    return { valid: false, error: 'Invalid key format' }
  }
  
  // Hash the key
  const keyHash = hashApiKey(key)
  
  // Find the key in Firestore
  const snapshot = await db.collection(COLLECTION)
    .where('keyHash', '==', keyHash)
    .limit(1)
    .get()
  
  if (snapshot.empty) {
    return { valid: false, error: 'Invalid API key' }
  }
  
  const doc = snapshot.docs[0]
  const data = doc.data() as ApiKeyDoc
  
  // Check if revoked
  if (data.isRevoked) {
    return { valid: false, error: 'API key has been revoked' }
  }
  
  // Check if expired
  const expiresAt = data.expiresAt?.toDate?.()
  if (isKeyExpired(expiresAt || null)) {
    return { valid: false, error: 'API key has expired' }
  }
  
  // Update usage stats
  const today = new Date().toISOString().split('T')[0]
  const isNewDay = data.lastRequestDate !== today
  
  await doc.ref.update({
    lastUsedAt: FieldValue.serverTimestamp(),
    totalRequests: FieldValue.increment(1),
    requestsToday: isNewDay ? 1 : FieldValue.increment(1),
    lastRequestDate: today,
  })
  
  return {
    valid: true,
    userId: data.userId,
    userEmail: data.userEmail,
    keyId: doc.id,
    type: data.type,
    scopes: data.scopes || [],
  }
}

/**
 * Check rate limit for an API key
 */
export async function checkRateLimit(keyId: string): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const doc = await db.collection(COLLECTION).doc(keyId).get()
  
  if (!doc.exists) {
    return { allowed: false, remaining: 0, resetAt: new Date() }
  }
  
  const data = doc.data() as ApiKeyDoc
  const today = new Date().toISOString().split('T')[0]
  
  // Reset if new day
  const requestsToday = data.lastRequestDate === today ? data.requestsToday : 0
  
  // Calculate reset time (end of current minute)
  const resetAt = new Date()
  resetAt.setSeconds(60, 0)
  
  // For simplicity, using daily limit / 1440 as per-minute limit
  // In production, you'd want Redis for proper per-minute tracking
  const dailyLimit = data.rateLimit * 60 * 24 // Convert per-minute to daily
  const remaining = Math.max(0, dailyLimit - requestsToday)
  
  return {
    allowed: requestsToday < dailyLimit,
    remaining,
    resetAt,
  }
}

/**
 * Get API key stats for admin dashboard
 */
export async function getApiKeyStats(userId: string): Promise<{
  totalKeys: number
  activeKeys: number
  revokedKeys: number
  totalRequests: number
}> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .get()
  
  let activeKeys = 0
  let revokedKeys = 0
  let totalRequests = 0
  
  snapshot.docs.forEach(doc => {
    const data = doc.data() as ApiKeyDoc
    if (data.isRevoked) {
      revokedKeys++
    } else {
      activeKeys++
    }
    totalRequests += data.totalRequests || 0
  })
  
  return {
    totalKeys: snapshot.size,
    activeKeys,
    revokedKeys,
    totalRequests,
  }
}
