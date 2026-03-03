import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

/**
 * Hook to check if a user can create cohorts
 * Requirements:
 * - User must have completed Vercel deployment (learning path)
 * - OR user must be signed up through /customers portal
 */
export function useCanCreateCohort(
  userId: string | undefined,
  vercelDeploymentComplete: boolean
) {
  const [canCreate, setCanCreate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reason, setReason] = useState<'vercel' | 'customer' | null>(null)

  useEffect(() => {
    const checkAccess = async () => {
      if (!userId) {
        setCanCreate(false)
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        // Check 1: Has user completed Vercel deployment?
        if (vercelDeploymentComplete) {
          setCanCreate(true)
          setReason('vercel')
          setLoading(false)
          return
        }

        // Check 2: Is user in customers collection?
        const customerDoc = await getDoc(doc(db, 'customers', userId))
        if (customerDoc.exists()) {
          setCanCreate(true)
          setReason('customer')
          setLoading(false)
          return
        }

        // No access
        setCanCreate(false)
        setReason(null)
      } catch (error) {
        logger.error('Usecancreatecohort', 'Failed to check cohort creation access', { error: error })
        setCanCreate(false)
        setReason(null)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [userId, vercelDeploymentComplete])

  return { canCreate, loading, reason }
}
