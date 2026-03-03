/**
 * OAuth Utilities
 * 
 * Common OAuth helpers for state management and token handling
 */

import crypto from 'crypto'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { OAuthState } from '@/lib/types/integrations'

const OAUTH_STATES_COLLECTION = 'oauthStates'
const STATE_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes

/**
 * Generate a secure random state token
 */
export function generateNonce(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Create and store an OAuth state for CSRF protection
 */
export async function createOAuthState(
  userId: string,
  redirectUrl: string,
  returnTo?: string
): Promise<string> {
  const nonce = generateNonce()
  const state: OAuthState = {
    userId,
    redirectUrl,
    expiresAt: Date.now() + STATE_EXPIRY_MS,
    nonce,
    ...(returnTo ? { returnTo } : {}),
  }
  
  // Store the state in Firestore
  await db.collection(OAUTH_STATES_COLLECTION).doc(nonce).set({
    ...state,
    createdAt: FieldValue.serverTimestamp(),
  })
  
  return nonce
}

/**
 * Verify and consume an OAuth state
 * Returns null if invalid or expired
 */
export async function verifyOAuthState(state: string): Promise<OAuthState | null> {
  const doc = await db.collection(OAUTH_STATES_COLLECTION).doc(state).get()
  
  if (!doc.exists) return null
  
  const data = doc.data() as OAuthState
  
  // Delete the state (one-time use)
  await doc.ref.delete()
  
  // Check expiry
  if (Date.now() > data.expiresAt) {
    return null
  }
  
  return data
}

/**
 * Clean up expired OAuth states (run periodically)
 */
export async function cleanupExpiredStates(): Promise<number> {
  const expiredStates = await db.collection(OAUTH_STATES_COLLECTION)
    .where('expiresAt', '<', Date.now())
    .limit(100)
    .get()
  
  const batch = db.batch()
  expiredStates.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()
  
  return expiredStates.size
}

/**
 * Get the base URL for OAuth callbacks
 */
export function getOAuthBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

/**
 * Build OAuth authorization URL
 */
export function buildAuthUrl(
  baseUrl: string,
  params: Record<string, string>
): string {
  const url = new URL(baseUrl)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  return url.toString()
}
