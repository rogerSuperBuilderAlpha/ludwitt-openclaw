/**
 * useActiveDevelopers Hook
 * Fetches all active, verified developers (for admin)
 */

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { DeveloperProfile } from '@/lib/types/developer'
import { logger } from '@/lib/logger'

export function useActiveDevelopers() {
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Query active, verified developers
    const q = query(
      collection(db, 'developerProfiles'),
      where('isActive', '==', true),
      where('isVerified', '==', true),
      orderBy('displayName', 'asc')
    )
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const devs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as DeveloperProfile[]
        
        setDevelopers(devs)
        setLoading(false)
      },
      (err) => {
        logger.error('UseActiveDevelopers', 'Error fetching active developers', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )
    
    return () => unsubscribe()
  }, [])
  
  return { 
    developers, 
    loading, 
    error,
    count: developers.length
  }
}

