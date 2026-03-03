/**
 * Integrations Service
 * 
 * Firestore operations for OAuth integrations
 */

import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { 
  IntegrationType,
  IntegrationConnectionDoc,
  IntegrationConnectionPublic,
} from '@/lib/types/integrations'

const COLLECTION = 'userIntegrations'

/**
 * Get all integrations for a user
 */
export async function getUserIntegrations(userId: string): Promise<IntegrationConnectionPublic[]> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .get()
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as IntegrationConnectionDoc
    return {
      id: doc.id,
      type: data.type,
      connected: data.connected,
      connectedAt: data.connectedAt?.toDate?.()?.toISOString() || null,
      providerEmail: data.providerEmail,
      providerUsername: data.providerUsername,
      providerAvatarUrl: data.providerAvatarUrl,
      scopes: data.scopes || [],
      workspaceId: data.workspaceId,
      workspaceName: data.workspaceName,
      lastUsedAt: data.lastUsedAt?.toDate?.()?.toISOString() || null,
    }
  })
}

/**
 * Get a specific integration for a user
 */
export async function getIntegration(
  userId: string, 
  type: IntegrationType
): Promise<IntegrationConnectionPublic | null> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .where('type', '==', type)
    .limit(1)
    .get()
  
  if (snapshot.empty) return null
  
  const doc = snapshot.docs[0]
  const data = doc.data() as IntegrationConnectionDoc
  
  return {
    id: doc.id,
    type: data.type,
    connected: data.connected,
    connectedAt: data.connectedAt?.toDate?.()?.toISOString() || null,
    providerEmail: data.providerEmail,
    providerUsername: data.providerUsername,
    providerAvatarUrl: data.providerAvatarUrl,
    scopes: data.scopes || [],
    workspaceId: data.workspaceId,
    workspaceName: data.workspaceName,
    lastUsedAt: data.lastUsedAt?.toDate?.()?.toISOString() || null,
  }
}

/**
 * Get integration with tokens (for backend use only)
 */
export async function getIntegrationWithTokens(
  userId: string,
  type: IntegrationType
): Promise<IntegrationConnectionDoc & { id: string } | null> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .where('type', '==', type)
    .limit(1)
    .get()
  
  if (snapshot.empty) return null
  
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() as IntegrationConnectionDoc }
}

/**
 * Create or update an integration connection
 */
export async function upsertIntegration(
  userId: string,
  type: IntegrationType,
  data: {
    accessToken: string
    refreshToken?: string
    tokenExpiresAt?: Date | null
    providerUserId?: string
    providerEmail?: string
    providerUsername?: string
    providerAvatarUrl?: string
    scopes?: string[]
    workspaceId?: string
    workspaceName?: string
  }
): Promise<string> {
  // Check if integration already exists
  const existing = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .where('type', '==', type)
    .limit(1)
    .get()
  
  const docData = {
    userId,
    type,
    connected: true,
    connectedAt: FieldValue.serverTimestamp(),
    accessToken: data.accessToken,
    refreshToken: data.refreshToken || null,
    tokenExpiresAt: data.tokenExpiresAt || null,
    providerUserId: data.providerUserId || null,
    providerEmail: data.providerEmail || null,
    providerUsername: data.providerUsername || null,
    providerAvatarUrl: data.providerAvatarUrl || null,
    scopes: data.scopes || [],
    workspaceId: data.workspaceId || null,
    workspaceName: data.workspaceName || null,
    lastUsedAt: null,
    errorMessage: null,
  }
  
  if (!existing.empty) {
    const docRef = existing.docs[0].ref
    await docRef.update(docData)
    return docRef.id
  } else {
    const docRef = await db.collection(COLLECTION).add(docData)
    return docRef.id
  }
}

/**
 * Disconnect an integration
 */
export async function disconnectIntegration(
  userId: string,
  type: IntegrationType
): Promise<boolean> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .where('type', '==', type)
    .limit(1)
    .get()
  
  if (snapshot.empty) return false
  
  await snapshot.docs[0].ref.update({
    connected: false,
    accessToken: FieldValue.delete(),
    refreshToken: FieldValue.delete(),
    tokenExpiresAt: null,
  })
  
  return true
}

/**
 * Delete an integration completely
 */
export async function deleteIntegration(
  userId: string,
  type: IntegrationType
): Promise<boolean> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .where('type', '==', type)
    .limit(1)
    .get()
  
  if (snapshot.empty) return false
  
  await snapshot.docs[0].ref.delete()
  return true
}

/**
 * Update last used timestamp
 */
export async function updateLastUsed(integrationId: string): Promise<void> {
  await db.collection(COLLECTION).doc(integrationId).update({
    lastUsedAt: FieldValue.serverTimestamp(),
  })
}

/**
 * Set error message on integration
 */
export async function setIntegrationError(
  userId: string,
  type: IntegrationType,
  errorMessage: string
): Promise<void> {
  const snapshot = await db.collection(COLLECTION)
    .where('userId', '==', userId)
    .where('type', '==', type)
    .limit(1)
    .get()
  
  if (!snapshot.empty) {
    await snapshot.docs[0].ref.update({ errorMessage })
  }
}
