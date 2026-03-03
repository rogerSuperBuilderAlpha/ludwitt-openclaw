/**
 * useBusinessIdeas Hook
 * Real-time listener on all business ideas for a user
 */

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import type { UniversityBusinessIdea, UniversityBusinessIdeaDisplay } from '@/lib/types/university'
import { logger } from '@/lib/logger'

function toDisplay(idea: UniversityBusinessIdea): UniversityBusinessIdeaDisplay {
  const toISO = (ts: unknown): string => {
    if (!ts) return new Date().toISOString()
    if (typeof ts === 'string') return ts
    if (typeof ts === 'object' && ts !== null && 'toDate' in ts) {
      return (ts as { toDate: () => Date }).toDate().toISOString()
    }
    return new Date().toISOString()
  }

  return {
    ...idea,
    createdAt: toISO(idea.createdAt),
    updatedAt: toISO(idea.updatedAt),
  }
}

export function useBusinessIdeas(userId?: string) {
  const [ideas, setIdeas] = useState<UniversityBusinessIdeaDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setIdeas([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'universityBusinessIdeas'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => {
          const data = { id: doc.id, ...doc.data() } as UniversityBusinessIdea
          return toDisplay(data)
        })
        setIdeas(results)
        setLoading(false)
      },
      (err) => {
        logger.error('Usebusinessideas', 'Error fetching business ideas', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { ideas, loading, error }
}
