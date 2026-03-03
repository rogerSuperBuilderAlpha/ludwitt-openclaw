import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getAuth, Auth } from 'firebase-admin/auth'
import { logger } from '@/lib/logger'

let adminApp: App | undefined
let adminDb: Firestore | undefined
let adminAuth: Auth | undefined

// Only initialize if credentials are available
// Support both individual env vars and NEW_FB_SER_KEY (full JSON)
let projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID
let clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL
let privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n')

// Development-only logging for credential debugging
const isDev = process.env.NODE_ENV === 'development'

// Try NEW_FB_SER_KEY if individual vars not available
if ((!projectId || !clientEmail || !privateKey) && process.env.NEW_FB_SER_KEY) {
  try {
    const serviceAccount = JSON.parse(process.env.NEW_FB_SER_KEY)
    projectId = serviceAccount.project_id
    clientEmail = serviceAccount.client_email
    privateKey = serviceAccount.private_key
  } catch {
    // Silent fail in production, credentials should be configured correctly
    if (isDev) {
      logger.error('FirebaseAdmin', 'Failed to parse NEW_FB_SER_KEY')
    }
  }
}

if (projectId && clientEmail && privateKey) {
  try {
    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || ''
      })
    } else {
      adminApp = getApps()[0]
    }

    if (adminApp) {
      adminDb = getFirestore(adminApp)
      adminAuth = getAuth(adminApp)
    }
  } catch (error) {
    // Don't crash during build - credentials may not be available
    if (isDev) {
      logger.error('FirebaseAdmin', 'Initialization failed', { error: error instanceof Error ? error.message : 'Unknown error' })
    }
  }
}

// Export with type assertions for backwards compatibility
export { adminDb, adminAuth }
export const db = adminDb as Firestore
export const auth = adminAuth as Auth

// Helper function for token verification
export const verifyIdToken = async (token: string) => {
  if (!adminAuth) {
    throw new Error('Firebase Admin Auth not configured')
  }
  return adminAuth.verifyIdToken(token)
}

export default adminApp
