import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { logger } from '@/lib/logger'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: FirebaseApp | undefined
let _auth: Auth | undefined
let _db: Firestore | undefined
let _storage: FirebaseStorage | undefined

// Only initialize if we have required config
try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    if (app) {
      _auth = getAuth(app)
      _db = getFirestore(app)
      _storage = getStorage(app)
    }
  } else {
    logger.warn('Config', 'Firebase client credentials not configured. Firebase features will not be available.')
  }
} catch (error) {
  logger.warn('Config', 'Failed to initialize Firebase client', { data: error instanceof Error ? error.message : 'Unknown error' })
}

// Export with type assertions for backwards compatibility
// At runtime, these should be defined when actually used
export const auth = _auth as Auth
export const db = _db as Firestore
export const storage = _storage as FirebaseStorage
export default app

