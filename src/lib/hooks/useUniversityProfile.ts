/**
 * useUniversityProfile Hook
 * Real-time listener on universityStudentProfiles/{userId}
 */

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import type { UniversityStudentProfile } from '@/lib/types/university'
import { logger } from '@/lib/logger'

export function useUniversityProfile(userId?: string) {
  const [profile, setProfile] = useState<UniversityStudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const docRef = doc(db, 'universityStudentProfiles', userId)

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as UniversityStudentProfile)
        } else {
          setProfile(null)
        }
        setLoading(false)
      },
      (err) => {
        logger.error('Useuniversityprofile', 'Error fetching university profile', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { profile, loading, error }
}
