'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { initializeUserData } from '@/lib/firebase/userUtils'
import { EmailVerificationBanner } from './EmailVerificationBanner'
import { logger } from '@/lib/logger'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          if (user) {
            // Force token refresh to fix CORS issues
            const token = await user.getIdToken(true)
            await initializeUserData(user)
            // Set session cookie for server-side route protection
            fetch('/api/auth/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken: token }),
            }).catch((err) =>
              logger.error('ClientProvider', 'Session cookie set failed', {
                error: err,
              })
            )
          } else {
            // Clear session cookie on logout
            fetch('/api/auth/session', { method: 'DELETE' }).catch((err) =>
              logger.error('ClientProvider', 'Session cookie clear failed', {
                error: err,
              })
            )
          }
          setUser(user)
        } catch {
          setUser(user) // Still set user even if initialization fails
        } finally {
          setLoading(false)
        }
      },
      () => {
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {user && <EmailVerificationBanner user={user} />}
      {children}
    </AuthContext.Provider>
  )
}

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
