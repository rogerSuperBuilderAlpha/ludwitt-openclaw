'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

interface ClientDocCount {
  clientId: string
  clientName: string
  clientEmail: string
  count: number
  creditBalance?: number // in cents
}

interface UseClientDocCountsResult {
  completedCounts: ClientDocCount[]
  archivedCounts: ClientDocCount[]
  loading: boolean
}

// Cache customer info to avoid repeated lookups
const customerInfoCache: Record<string, { name: string; email: string; creditBalance?: number }> = {}

/**
 * Fetches just client IDs and doc counts for completed/archived documents.
 * Scoped to documents assigned to the given userId — developers only see
 * clients they've done work for.
 */
export function useClientDocCounts(userId: string | null): UseClientDocCountsResult {
  const [completedCounts, setCompletedCounts] = useState<ClientDocCount[]>([])
  const [archivedCounts, setArchivedCounts] = useState<ClientDocCount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db || !userId) {
      setCompletedCounts([])
      setArchivedCounts([])
      setLoading(false)
      return
    }

    // Listen to completed documents assigned to this developer
    const completedQuery = query(
      collection(db, 'customerDocuments'),
      where('status', '==', 'completed'),
      where('assignedTo', '==', userId)
    )

    const archivedQuery = query(
      collection(db, 'customerDocuments'),
      where('status', '==', 'archived'),
      where('assignedTo', '==', userId)
    )

    const processSnapshot = async (snapshot: any): Promise<ClientDocCount[]> => {
      const clientMap: Record<string, ClientDocCount> = {}

      // First pass: count documents per client
      snapshot.docs.forEach((doc: any) => {
        const data = doc.data()
        const clientId = data.customerId || 'unknown'

        if (!clientMap[clientId]) {
          clientMap[clientId] = {
            clientId,
            clientName: data.customerName || clientId.substring(0, 8) + '...',
            clientEmail: data.customerEmail || '',
            count: 0
          }
        }
        clientMap[clientId].count++
      })

      // Second pass: fetch missing customer info from customers + users collections
      const clientIds = Object.keys(clientMap).filter(id =>
        id !== 'unknown' &&
        !customerInfoCache[id]
      )

      if (clientIds.length > 0) {
        try {
          // Fetch customer info (names)
          const customersSnapshot = await getDocs(collection(db, 'customers'))
          customersSnapshot.docs.forEach(doc => {
            const data = doc.data()
            customerInfoCache[doc.id] = {
              name: data.displayName || data.email || 'Unknown',
              email: data.email || '',
              creditBalance: undefined
            }
          })

          // Fetch credit balances from users collection
          const usersSnapshot = await getDocs(collection(db, 'users'))
          usersSnapshot.docs.forEach(doc => {
            const data = doc.data()
            if (customerInfoCache[doc.id]) {
              customerInfoCache[doc.id].creditBalance = data.credits?.balance
            } else {
              customerInfoCache[doc.id] = {
                name: data.displayName || data.email || 'Unknown',
                email: data.email || '',
                creditBalance: data.credits?.balance
              }
            }
          })
        } catch (err) {
          logger.error('UseClientDocCounts', 'Failed to fetch customer info', { error: err })
        }
      }

      // Apply cached info to client map
      Object.keys(clientMap).forEach(clientId => {
        if (customerInfoCache[clientId]) {
          clientMap[clientId].clientName = customerInfoCache[clientId].name
          clientMap[clientId].clientEmail = customerInfoCache[clientId].email
          clientMap[clientId].creditBalance = customerInfoCache[clientId].creditBalance
        }
      })

      // Sort by count descending
      return Object.values(clientMap).sort((a, b) => b.count - a.count)
    }

    const unsubCompleted = onSnapshot(completedQuery, async (snapshot) => {
      const counts = await processSnapshot(snapshot)
      setCompletedCounts(counts)
      setLoading(false)
    })

    const unsubArchived = onSnapshot(archivedQuery, async (snapshot) => {
      const counts = await processSnapshot(snapshot)
      setArchivedCounts(counts)
    })

    return () => {
      unsubCompleted()
      unsubArchived()
    }
  }, [userId])

  return { completedCounts, archivedCounts, loading }
}
