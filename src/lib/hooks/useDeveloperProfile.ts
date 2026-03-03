/**
 * useDeveloperProfile Hook
 * Fetches and listens to developer profile in real-time
 */

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { DeveloperProfile } from '@/lib/types/developer'
import { logger } from '@/lib/logger'

export function useDeveloperProfile(userId?: string) {
  const [profile, setProfile] = useState<DeveloperProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    
    const docRef = doc(db, 'developerProfiles', userId)
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setProfile({ 
            id: snapshot.id, 
            ...snapshot.data() 
          } as DeveloperProfile)
        } else {
          setProfile(null)
        }
        setLoading(false)
      },
      (err) => {
        logger.error('Usedeveloperprofile', 'Error fetching developer profile', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )
    
    return () => unsubscribe()
  }, [userId])
  
  const isDeveloper = profile?.isActive && profile?.isVerified
  
  return { 
    profile, 
    loading, 
    error,
    isDeveloper,
    exists: !!profile
  }
}

