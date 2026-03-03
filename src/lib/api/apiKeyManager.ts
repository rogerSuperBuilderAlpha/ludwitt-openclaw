import { db } from '@/lib/firebase/config'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import crypto from 'crypto'
import type { ApiKey, ApiPermission, ApiKeyUsage } from './types'

/**
 * Generate a secure API key
 */
function generateApiKey(): { key: string; prefix: string } {
  const key = `pr_${crypto.randomBytes(32).toString('hex')}`
  const prefix = key.substring(0, 11) // pr_xxxxxxx
  return { key, prefix }
}

/**
 * Create new API key
 */
export async function createApiKey(
  userId: string,
  name: string,
  permissions: ApiPermission[],
  expiresInDays?: number
): Promise<ApiKey> {
  const { key, prefix } = generateApiKey()

  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
    : undefined

  const apiKeyData = {
    userId,
    name,
    key: hashApiKey(key), // Store hashed version
    keyPrefix: prefix,
    permissions,
    enabled: true,
    createdAt: new Date().toISOString(),
    expiresAt,
  }

  const docRef = await addDoc(collection(db, 'apiKeys'), apiKeyData)

  return {
    id: docRef.id,
    ...apiKeyData,
    key, // Return plain key only on creation (user must save it)
  }
}

/**
 * Hash API key for storage
 */
function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex')
}

/**
 * Validate API key and return associated data
 */
export async function validateApiKey(key: string): Promise<ApiKey | null> {
  const hashedKey = hashApiKey(key)

  // Query by hashed key
  const q = query(collection(db, 'apiKeys'), where('key', '==', hashedKey))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return null

  const doc = snapshot.docs[0]
  const apiKey = {
    id: doc.id,
    ...doc.data(),
  } as ApiKey

  // Check if key is enabled
  if (!apiKey.enabled) return null

  // Check if key is expired
  if (apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()) {
    return null
  }

  // Update last used timestamp
  await updateDoc(doc.ref, {
    lastUsed: new Date().toISOString(),
  })

  return apiKey
}

/**
 * Get user's API keys
 */
export async function getUserApiKeys(userId: string): Promise<ApiKey[]> {
  const q = query(collection(db, 'apiKeys'), where('userId', '==', userId))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ApiKey[]
}

/**
 * Revoke (delete) API key
 */
export async function revokeApiKey(apiKeyId: string): Promise<void> {
  await deleteDoc(doc(db, 'apiKeys', apiKeyId))
}

/**
 * Update API key
 */
export async function updateApiKey(
  apiKeyId: string,
  updates: Partial<Pick<ApiKey, 'name' | 'permissions' | 'enabled'>>
): Promise<void> {
  const docRef = doc(db, 'apiKeys', apiKeyId)
  await updateDoc(docRef, updates)
}

/**
 * Log API key usage
 */
export async function logApiUsage(
  apiKeyId: string,
  endpoint: string,
  method: string,
  statusCode: number,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  const usageData: Omit<ApiKeyUsage, 'id'> = {
    apiKeyId,
    endpoint,
    method,
    statusCode,
    timestamp: new Date().toISOString(),
    ipAddress,
    userAgent,
  }

  await addDoc(collection(db, 'apiKeyUsage'), usageData)
}

/**
 * Get API key usage stats
 */
export async function getApiKeyUsage(
  apiKeyId: string,
  limit: number = 100
): Promise<ApiKeyUsage[]> {
  const q = query(
    collection(db, 'apiKeyUsage'),
    where('apiKeyId', '==', apiKeyId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs
    .map((doc): any => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, limit) as ApiKeyUsage[]
}

/**
 * Check if API key has required permissions
 */
export function hasPermission(
  apiKey: ApiKey,
  requiredPermissions: ApiPermission[]
): boolean {
  return requiredPermissions.every((permission) =>
    apiKey.permissions.includes(permission)
  )
}
