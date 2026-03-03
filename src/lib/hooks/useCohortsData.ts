import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

export interface Cohort {
  id: string
  name: string
  creatorId: string
  creatorName: string
  description: string
  targetSize: number
  currentSize: number
  pricePerPerson: number
  totalCost: number
  startDate: string
  status: 'open' | 'full' | 'in-progress' | 'completed'
  createdAt: string
}

export function useCohortsData(userId: string | undefined, shouldLoad: boolean) {
  const [cohorts, setCohorts] = useState<Cohort[]>([])
  const [userCohort, setUserCohort] = useState<Cohort | null>(null)
  const [loading, setLoading] = useState(false)

  // Check if user is in a cohort
  useEffect(() => {
    if (!userId) return

    const checkUserCohort = async () => {
      try {
        const membershipsRef = collection(db, 'cohortMembers')
        const q = query(membershipsRef, where('userId', '==', userId))
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
          const membership = snapshot.docs[0].data()
          const cohortDoc = await getDoc(doc(db, 'cohorts', membership.cohortId))
          if (cohortDoc.exists()) {
            setUserCohort({ id: cohortDoc.id, ...cohortDoc.data() } as Cohort)
          }
        }
      } catch (error) {
        logger.error('Usecohortsdata', 'Failed to check user cohort', { error: error })
      }
    }

    checkUserCohort()
  }, [userId])

  // Load cohorts
  useEffect(() => {
    if (!shouldLoad || !userId) return

    const loadCohorts = async () => {
      setLoading(true)
      try {
        const cohortsRef = collection(db, 'cohorts')
        const q = query(cohortsRef, where('status', '==', 'open'))
        const snapshot = await getDocs(q)

        const loadedCohorts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Cohort[]

        setCohorts(loadedCohorts)
      } catch (error) {
        logger.error('Usecohortsdata', 'Failed to load cohorts', { error: error })
      } finally {
        setLoading(false)
      }
    }

    loadCohorts()
  }, [userId, shouldLoad])

  const refreshCohorts = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const cohortsRef = collection(db, 'cohorts')
      const q = query(cohortsRef, where('status', '==', 'open'))
      const snapshot = await getDocs(q)

      const loadedCohorts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Cohort[]

      setCohorts(loadedCohorts)
    } catch (error) {
      logger.error('Usecohortsdata', 'Failed to load cohorts', { error: error })
    } finally {
      setLoading(false)
    }
  }

  return { cohorts, userCohort, loading, refreshCohorts }
}
