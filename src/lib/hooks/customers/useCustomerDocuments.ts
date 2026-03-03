import { useEffect, useState, useRef } from 'react'
import { CustomerDocument } from '@/lib/types/customer'
import { db } from '@/lib/firebase/config'
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
  documentId,
} from 'firebase/firestore'
import { normalizeFirestoreData } from '@/lib/utils/timestamp'
import { logger } from '@/lib/logger'

interface RequirementItem {
  id: string
  customerId?: string
  documentId?: string
  addedAt?: string
  [key: string]: unknown
}

interface SessionItem {
  id: string
  customerId?: string
  documentId?: string
  sessionDate?: string
  [key: string]: unknown
}

interface CommunicationItem {
  id: string
  documentId?: string
  sentAt?: string
  [key: string]: unknown
}

/**
 * Query a collection filtered by documentId using chunked 'in' queries.
 * Firestore client SDK limits 'in' queries to 30 values.
 */
async function queryByDocumentIds(
  collectionName: string,
  docIds: string[]
): Promise<{ id: string; data: Record<string, unknown> }[]> {
  if (docIds.length === 0) return []

  const chunkSize = 30
  const results: { id: string; data: Record<string, unknown> }[] = []

  for (let i = 0; i < docIds.length; i += chunkSize) {
    const chunk = docIds.slice(i, i + chunkSize)
    const q = query(
      collection(db, collectionName),
      where('documentId', 'in', chunk)
    )
    const snapshot = await getDocs(q)
    for (const doc of snapshot.docs) {
      results.push({
        id: doc.id,
        data: normalizeFirestoreData<Record<string, unknown>>(doc.data()),
      })
    }
  }

  return results
}

export function useCustomerDocuments(userId?: string) {
  const [documents, setDocuments] = useState<CustomerDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!userId || !db) {
      setLoading(false)
      return
    }

    const documentsQuery = query(
      collection(db, 'customerDocuments'),
      where('customerId', '==', userId),
      orderBy('addedAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      documentsQuery,
      async (snapshot) => {
        try {
          if (!isMountedRef.current) return
          setError(null)

          const docIds = snapshot.docs.map((d) => d.id)

          // Batch-fetch all related data in 3 queries instead of 3 * N
          const [requirementDocs, sessionDocs, communicationDocs] =
            await Promise.all([
              queryByDocumentIds('clientRequirements', docIds),
              queryByDocumentIds('developmentSessions', docIds),
              queryByDocumentIds('documentCommunications', docIds),
            ])

          if (!isMountedRef.current) return

          // Group results by documentId
          const requirementsByDocId = new Map<string, RequirementItem[]>()
          for (const req of requirementDocs) {
            const docId = req.data.documentId as string
            if (req.data.customerId !== userId) continue
            if (!requirementsByDocId.has(docId))
              requirementsByDocId.set(docId, [])
            requirementsByDocId
              .get(docId)!
              .push({ ...req.data, id: req.id } as RequirementItem)
          }

          const sessionsByDocId = new Map<string, SessionItem[]>()
          for (const session of sessionDocs) {
            const docId = session.data.documentId as string
            if (session.data.customerId !== userId) continue
            if (!sessionsByDocId.has(docId)) sessionsByDocId.set(docId, [])
            sessionsByDocId
              .get(docId)!
              .push({ ...session.data, id: session.id } as SessionItem)
          }

          const communicationsByDocId = new Map<string, CommunicationItem[]>()
          for (const comm of communicationDocs) {
            const docId = comm.data.documentId as string
            if (!communicationsByDocId.has(docId))
              communicationsByDocId.set(docId, [])
            communicationsByDocId
              .get(docId)!
              .push({ ...comm.data, id: comm.id } as CommunicationItem)
          }

          // Assemble documents with sorted details
          const documentsWithDetails = snapshot.docs.map((docSnap) => {
            const docData = normalizeFirestoreData<Record<string, any>>(
              docSnap.data()
            )
            const docId = docSnap.id

            const requirements = (requirementsByDocId.get(docId) || []).sort(
              (a, b) => {
                const aTime = a.addedAt ? new Date(a.addedAt).getTime() : 0
                const bTime = b.addedAt ? new Date(b.addedAt).getTime() : 0
                return bTime - aTime
              }
            )

            const sessions = (sessionsByDocId.get(docId) || []).sort((a, b) => {
              const aTime = a.sessionDate
                ? new Date(a.sessionDate).getTime()
                : 0
              const bTime = b.sessionDate
                ? new Date(b.sessionDate).getTime()
                : 0
              return bTime - aTime
            })

            const communications = (
              communicationsByDocId.get(docId) || []
            ).sort((a, b) => {
              const aTime = a.sentAt ? new Date(a.sentAt).getTime() : 0
              const bTime = b.sentAt ? new Date(b.sentAt).getTime() : 0
              return aTime - bTime
            })

            return {
              id: docId,
              ...docData,
              requirements,
              sessions,
              communications,
            } as unknown as CustomerDocument
          })

          if (!isMountedRef.current) return
          setDocuments(documentsWithDetails)
          setLastUpdated(new Date())
          setLoading(false)
        } catch (err) {
          logger.error('Usecustomerdocuments', 'Error processing documents', {
            error: err,
          })
          if (!isMountedRef.current) return
          setError('Failed to load documents')
          setLoading(false)
        }
      },
      (err) => {
        logger.error('Usecustomerdocuments', 'Error listening to documents', {
          error: err,
        })
        if (!isMountedRef.current) return
        setError('Failed to load documents')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  return { documents, loading, error, setDocuments, setError, lastUpdated }
}
