/**
 * useRequireAuth Hook
 *
 * Ensures user is authenticated before allowing operations
 * Returns early guard functions for components
 */

import type { User } from 'firebase/auth'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { logger } from '@/lib/logger'

interface UseRequireAuthReturn {
  user: User | null
  requireAuth: <T>(
    callback: () => T | Promise<T>,
    errorMessage?: string
  ) => T | Promise<T> | null
  requireAuthSync: <T>(callback: () => T, errorMessage?: string) => T | null
  redirectToLogin: () => void
}

export function useRequireAuth(): UseRequireAuthReturn {
  const { user } = useAuth()
  const router = useRouter()

  const requireAuth = useCallback(
    <T>(
      callback: () => T | Promise<T>,
      errorMessage: string = 'You must be logged in to perform this action'
    ): T | Promise<T> | null => {
      if (!user) {
        logger.warn('Userequireauth', '[useRequireAuth]', {
          data: errorMessage,
        })
        return null
      }
      return callback()
    },
    [user]
  )

  const requireAuthSync = useCallback(
    <T>(
      callback: () => T,
      errorMessage: string = 'You must be logged in to perform this action'
    ): T | null => {
      if (!user) {
        logger.warn('Userequireauth', '[useRequireAuth]', {
          data: errorMessage,
        })
        return null
      }
      return callback()
    },
    [user]
  )

  const redirectToLogin = useCallback(() => {
    router.push('/login')
  }, [router])

  return {
    user,
    requireAuth,
    requireAuthSync,
    redirectToLogin,
  }
}
