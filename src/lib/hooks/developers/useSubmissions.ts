'use client'

import { useEffect, useState, useRef } from 'react'
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { Submission } from '@/lib/types/submission'
import { normalizeFirestoreData } from '@/lib/utils/timestamp'
import { logger } from '@/lib/logger'

interface UseSubmissionsOptions {
  userId?: string | null
  isAdmin: boolean
}

// Timeout wrapper for slow network requests
const FETCH_TIMEOUT_MS = 15000 // 15 seconds max for data fetching

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), ms)
    ),
  ])
}

export function useSubmissions({ userId, isAdmin }: UseSubmissionsOptions) {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [pendingDrafts, setPendingDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortedRef = useRef(false)

  // CRITICAL: Clear state when userId changes to prevent rendering old Timestamp data
  useEffect(() => {
    setSubmissions([])
    setPendingDrafts([])
    setLoading(true)
    setError(null)
  }, [userId])

  useEffect(() => {
    abortedRef.current = false

    if (!db) {
      logger.error('UseSubmissions', 'Firestore db not available')
      setError('Database connection failed')
      setLoading(false)
      return
    }
    if (!userId) {
      setSubmissions([])
      setPendingDrafts([])
      setLoading(false)
      return
    }

    const isAdminValue = isAdmin

    // Clear existing data immediately to prevent rendering old Timestamps during transition
    setSubmissions([])
    setPendingDrafts([])
    setLoading(true)

    // For non-admins: split into two queries filtered by assignedTo (avoids composite index on status IN + assignedTo)
    // For admins: keep the original unfiltered query
    const documentsQueries = isAdminValue
      ? [
          query(
            collection(db, 'customerDocuments'),
            where('status', 'in', ['approved', 'in-progress']),
            orderBy('approvedAt', 'desc')
          ),
        ]
      : [
          query(
            collection(db, 'customerDocuments'),
            where('status', '==', 'approved'),
            where('assignedTo', '==', userId),
            orderBy('approvedAt', 'desc')
          ),
          query(
            collection(db, 'customerDocuments'),
            where('status', '==', 'in-progress'),
            where('assignedTo', '==', userId),
            orderBy('approvedAt', 'desc')
          ),
        ]

    // Track snapshots from all queries and merge
    const snapshotDocs: Map<string, any> = new Map()
    const unsubscribeList: (() => void)[] = []
    let pendingSnapshots = documentsQueries.length

    const processAllSnapshots = async () => {
      if (abortedRef.current) return

      try {
        setError(null)
        setLoading(true)
        const allDocs = Array.from(snapshotDocs.values())
        const documentsWithDetails = await withTimeout(
          Promise.all(
            allDocs.map(async ({ docSnap, rawData }) => {
              const data: any = normalizeFirestoreData(rawData)
              const id = docSnap.id

              try {
                const customersSnapshot = await getDocs(
                  query(
                    collection(db, 'customers'),
                    where('__name__', '==', data.customerId)
                  )
                )
                const customer = customersSnapshot.docs[0]?.data() || {
                  email: 'Unknown',
                  displayName: 'Unknown Customer',
                }

                let creditBalance: number | undefined = undefined
                if (data.customerId) {
                  const userSnapshot = await getDocs(
                    query(
                      collection(db, 'users'),
                      where('__name__', '==', data.customerId)
                    )
                  )
                  const userData = userSnapshot.docs[0]?.data()
                  creditBalance = userData?.credits?.balance
                }

                let project: any = null
                if (data.projectId) {
                  const projectsSnapshot = await getDocs(
                    query(
                      collection(db, 'projects'),
                      where('__name__', '==', data.projectId)
                    )
                  )
                  project = projectsSnapshot.docs[0]?.data() || null
                }

                let assignedToName: string | undefined = undefined
                if (data.assignedTo) {
                  const developersSnapshot = await getDocs(
                    query(
                      collection(db, 'developerProfiles'),
                      where('__name__', '==', data.assignedTo)
                    )
                  )
                  const developer = developersSnapshot.docs[0]?.data()
                  assignedToName =
                    developer?.displayName || developer?.email || undefined
                }

                const requirementsQuery = query(
                  collection(db, 'clientRequirements'),
                  where('documentId', '==', id)
                )
                const requirementsSnapshot = await getDocs(requirementsQuery)
                const requirements = requirementsSnapshot.docs.map((reqDoc) => {
                  const reqData = normalizeFirestoreData<Record<string, any>>(
                    reqDoc.data()
                  )
                  return {
                    id: reqDoc.id,
                    requirement: reqData.requirement,
                    status: reqData.status,
                    addedBy: reqData.addedBy,
                    documentId: reqData.documentId,
                    customerId: reqData.customerId,
                    notes: reqData.notes,
                    addedAt: reqData.addedAt,
                    updatedAt: reqData.updatedAt,
                  }
                })

                const sessionsQuery = query(
                  collection(db, 'developmentSessions'),
                  where('documentId', '==', id)
                )
                const sessionsSnapshot = await getDocs(sessionsQuery)
                const sessions = sessionsSnapshot.docs.map((sessionDoc) => {
                  const sessionData = normalizeFirestoreData<
                    Record<string, any>
                  >(sessionDoc.data())
                  return {
                    id: sessionDoc.id,
                    accomplishments: sessionData.accomplishments,
                    nextSteps: sessionData.nextSteps,
                    addedBy: sessionData.addedBy,
                    documentId: sessionData.documentId,
                    customerId: sessionData.customerId,
                    sessionDate: sessionData.sessionDate,
                    createdAt: sessionData.createdAt,
                    timeSpentMinutes: sessionData.timeSpentMinutes,
                    requirementIds: sessionData.requirementIds,
                  }
                })

                const convertedDoc = {
                  id,
                  googleDocTitle: data.googleDocTitle,
                  googleDocUrl: data.googleDocUrl,
                  status: data.status,
                  category: data.category,
                  customerId: data.customerId,
                  projectId:
                    typeof data.projectId === 'string'
                      ? data.projectId
                      : undefined,
                  assignedTo: data.assignedTo,
                  notes: data.notes,
                  approvedAt: data.approvedAt,
                  addedAt: data.addedAt,
                  completedAt: data.completedAt,
                  lastNudgedAt: data.lastNudgedAt,
                  assignedAt: data.assignedAt,
                  updatedAt: data.updatedAt,
                  notificationSentAt: data.notificationSentAt,
                  lastNotificationSentAt: data.lastNotificationSentAt,
                  progressUpdatedAt: data.progressUpdatedAt,
                  progressPercentage: data.progressPercentage,
                  progressNote: data.progressNote,
                  priority: data.priority,
                  assignmentHistory: data.assignmentHistory,
                  submittedVia: data.submittedVia,
                  submittedViaDeveloperId: data.submittedViaDeveloperId,
                  submittedViaDeveloperName: data.submittedViaDeveloperName,
                  isVisibleToDeveloper: data.isVisibleToDeveloper,
                  customer: {
                    id: data.customerId,
                    email: customer.email || 'Unknown',
                    displayName:
                      customer.displayName ||
                      customer.email ||
                      'Unknown Customer',
                    assignedSubmissionsCount: 0,
                    creditBalance,
                  },
                  project: project
                    ? {
                        id: data.projectId,
                        title: project.title,
                      }
                    : null,
                  assignedToName,
                  requirements,
                  sessions,
                }
                convertedDoc.requirements.forEach((r) => {
                  if (typeof r.addedAt === 'object' && r.addedAt !== null) {
                    logger.error(
                      'UseSubmissions',
                      'Found unconverted timestamp in requirement',
                      { data: { id: r.id, addedAt: r.addedAt } }
                    )
                  }
                })

                return convertedDoc
              } catch (err) {
                logger.error(
                  'UseSubmissions',
                  `Error fetching details for doc ${id}`,
                  { error: err }
                )

                const fallbackData =
                  normalizeFirestoreData<Record<string, any>>(rawData)

                return {
                  id,
                  googleDocTitle: fallbackData.googleDocTitle,
                  googleDocUrl: fallbackData.googleDocUrl,
                  status: fallbackData.status,
                  category: fallbackData.category,
                  customerId: fallbackData.customerId,
                  projectId:
                    typeof fallbackData.projectId === 'string'
                      ? fallbackData.projectId
                      : undefined,
                  assignedTo: fallbackData.assignedTo,
                  notes: fallbackData.notes,
                  approvedAt: fallbackData.approvedAt,
                  addedAt: fallbackData.addedAt,
                  completedAt: fallbackData.completedAt,
                  lastNudgedAt: fallbackData.lastNudgedAt,
                  assignedAt: fallbackData.assignedAt,
                  updatedAt: fallbackData.updatedAt,
                  notificationSentAt: fallbackData.notificationSentAt,
                  customer: {
                    id: fallbackData.customerId,
                    email: 'Unknown',
                    displayName: 'Unknown Customer',
                    assignedSubmissionsCount: 0,
                  },
                  project: null,
                  assignedToName: undefined,
                  requirements: [],
                  sessions: [],
                  assignmentHistory: fallbackData.assignmentHistory,
                  submittedVia: fallbackData.submittedVia,
                  submittedViaDeveloperId: fallbackData.submittedViaDeveloperId,
                  submittedViaDeveloperName:
                    fallbackData.submittedViaDeveloperName,
                  isVisibleToDeveloper: fallbackData.isVisibleToDeveloper,
                }
              }
            })
          ),
          FETCH_TIMEOUT_MS
        )

        if (abortedRef.current) return

        // Sort merged results by approvedAt descending
        documentsWithDetails.sort((a, b) => {
          const aTime = a.approvedAt ? new Date(a.approvedAt).getTime() : 0
          const bTime = b.approvedAt ? new Date(b.approvedAt).getTime() : 0
          return bTime - aTime
        })

        setSubmissions(documentsWithDetails)
        setLoading(false)
      } catch (err) {
        if (abortedRef.current) return
        logger.error('UseSubmissions', 'Error processing documents', {
          error: err,
        })
        setError(
          err instanceof Error && err.message === 'Request timeout'
            ? 'Loading timed out. Please refresh.'
            : 'Failed to load documents'
        )
        setLoading(false)
      }
    }

    for (const q of documentsQueries) {
      const unsub = onSnapshot(
        q,
        async (snapshot) => {
          if (abortedRef.current) return
          // Merge this snapshot's docs into the shared map
          snapshot.docs.forEach((docSnap) => {
            snapshotDocs.set(docSnap.id, { docSnap, rawData: docSnap.data() })
          })
          // Only process once all initial snapshots have fired
          if (pendingSnapshots > 0) {
            pendingSnapshots--
            if (pendingSnapshots > 0) return
          }
          await processAllSnapshots()
        },
        (error) => {
          logger.error('UseSubmissions', 'Error listening to documents', {
            error,
          })
          setError('Failed to load documents')
          setLoading(false)
        }
      )
      unsubscribeList.push(unsub)
    }

    // Pending documents (added by customer but not yet approved) - admin only
    let unsubscribePending: (() => void) | null = null
    if (isAdminValue) {
      const pendingQuery = query(
        collection(db, 'customerDocuments'),
        where('status', '==', 'pending'),
        orderBy('addedAt', 'desc')
      )
      unsubscribePending = onSnapshot(pendingQuery, async (snapshot) => {
        if (abortedRef.current) return
        try {
          const drafts = await withTimeout(
            Promise.all(
              snapshot.docs.map(async (docSnap) => {
                const rawData: any = docSnap.data()
                const data: any = normalizeFirestoreData(rawData)
                const id = docSnap.id
                const customersSnapshot = await getDocs(
                  query(
                    collection(db, 'customers'),
                    where('__name__', '==', data.customerId)
                  )
                )
                const customer = customersSnapshot.docs[0]?.data() || {
                  email: 'Unknown',
                  displayName: 'Unknown Customer',
                }
                let projectTitle: string | null = null
                if (data.projectId) {
                  const projectsSnapshot = await getDocs(
                    query(
                      collection(db, 'projects'),
                      where('__name__', '==', data.projectId)
                    )
                  )
                  const project = projectsSnapshot.docs[0]?.data()
                  projectTitle = project?.title || null
                }
                return {
                  id,
                  customerId: data.customerId,
                  projectId: data.projectId || undefined,
                  projectTitle,
                  googleDocTitle: data.googleDocTitle,
                  googleDocUrl: data.googleDocUrl,
                  addedAt: data.addedAt,
                  notes: data.notes,
                  lastNudgedAt: data.lastNudgedAt,
                  nudgeCount: data.nudgeCount || 0,
                  customer: {
                    email: customer.email || 'Unknown',
                    displayName:
                      customer.displayName ||
                      customer.email ||
                      'Unknown Customer',
                  },
                }
              })
            ),
            FETCH_TIMEOUT_MS
          )
          if (abortedRef.current) return
          setPendingDrafts(drafts)
        } catch {
          // Ignore errors for pending drafts - non-critical
        }
      })
    }

    return () => {
      abortedRef.current = true
      unsubscribeList.forEach((unsub) => unsub())
      if (unsubscribePending) unsubscribePending()
    }
  }, [userId, isAdmin])

  return { submissions, pendingDrafts, loading, error }
}
