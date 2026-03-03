import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

interface FirestoreTimestamp {
  _seconds: number
  _nanoseconds: number
}

interface RequirementDoc {
  id: string
  customerId?: string
  documentId?: string
  addedAt?: FirestoreTimestamp
  [key: string]: unknown
}

interface SessionDoc {
  id: string
  customerId?: string
  documentId?: string
  sessionDate?: FirestoreTimestamp
  [key: string]: unknown
}

interface CommunicationDoc {
  id: string
  documentId?: string
  sentAt?: FirestoreTimestamp
  [key: string]: unknown
}

interface DocumentWithDetails {
  id: string
  addedAt?: FirestoreTimestamp
  requirements: RequirementDoc[]
  sessions: SessionDoc[]
  communications: CommunicationDoc[]
  [key: string]: unknown
}

/**
 * Query a collection filtered by documentId using chunked 'in' queries.
 * Firestore limits 'in' queries to 30 values, so we chunk larger sets.
 */
async function queryByDocumentIds(
  collectionName: string,
  docIds: string[]
): Promise<FirebaseFirestore.QueryDocumentSnapshot[]> {
  if (docIds.length === 0) return []

  const chunkSize = 30
  const results: FirebaseFirestore.QueryDocumentSnapshot[] = []

  for (let i = 0; i < docIds.length; i += chunkSize) {
    const chunk = docIds.slice(i, i + chunkSize)
    const snapshot = await db
      .collection(collectionName)
      .where('documentId', 'in', chunk)
      .get()
    results.push(...snapshot.docs)
  }

  return results
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const customerId = authResult.userId

    // Get all documents for this customer
    const documentsSnapshot = await db
      .collection('customerDocuments')
      .where('customerId', '==', customerId)
      .get()

    const docIds = documentsSnapshot.docs.map(doc => doc.id)

    // Batch-fetch all related data in 3 queries instead of 3 * N
    const [requirementDocs, sessionDocs, communicationDocs] = await Promise.all([
      queryByDocumentIds('clientRequirements', docIds),
      queryByDocumentIds('developmentSessions', docIds),
      queryByDocumentIds('documentCommunications', docIds),
    ])

    // Group results by documentId
    const requirementsByDocId = new Map<string, RequirementDoc[]>()
    for (const req of requirementDocs) {
      const data = req.data()
      const docId = data.documentId as string
      // Filter by customerId in memory to avoid composite index
      if (data.customerId !== customerId) continue
      if (!requirementsByDocId.has(docId)) requirementsByDocId.set(docId, [])
      requirementsByDocId.get(docId)!.push({ id: req.id, ...data } as RequirementDoc)
    }

    const sessionsByDocId = new Map<string, SessionDoc[]>()
    for (const session of sessionDocs) {
      const data = session.data()
      const docId = data.documentId as string
      if (data.customerId !== customerId) continue
      if (!sessionsByDocId.has(docId)) sessionsByDocId.set(docId, [])
      sessionsByDocId.get(docId)!.push({ id: session.id, ...data } as SessionDoc)
    }

    const communicationsByDocId = new Map<string, CommunicationDoc[]>()
    for (const comm of communicationDocs) {
      const data = comm.data()
      const docId = data.documentId as string
      if (!communicationsByDocId.has(docId)) communicationsByDocId.set(docId, [])
      communicationsByDocId.get(docId)!.push({ id: comm.id, ...data } as CommunicationDoc)
    }

    // Assemble documents with their details
    const documentsWithDetails: DocumentWithDetails[] = documentsSnapshot.docs.map((doc) => {
      const docData = doc.data()
      const docId = doc.id

      const requirements = (requirementsByDocId.get(docId) || []).sort((a, b) => {
        const dateA = a.addedAt?._seconds || 0
        const dateB = b.addedAt?._seconds || 0
        return dateB - dateA
      })

      const sessions = (sessionsByDocId.get(docId) || []).sort((a, b) => {
        const dateA = a.sessionDate?._seconds || 0
        const dateB = b.sessionDate?._seconds || 0
        return dateB - dateA
      })

      const communications = (communicationsByDocId.get(docId) || []).sort((a, b) => {
        const dateA = a.sentAt?._seconds || 0
        const dateB = b.sentAt?._seconds || 0
        return dateA - dateB
      })

      return {
        id: docId,
        ...docData,
        requirements,
        sessions,
        communications,
      }
    })

    // Sort by addedAt descending (newest first)
    const documents = documentsWithDetails.sort((a, b) => {
      const dateA = a.addedAt?._seconds || 0
      const dateB = b.addedAt?._seconds || 0
      return dateB - dateA
    })

    return NextResponse.json({ documents })
  } catch (error) {
    apiLogger.apiError('customers/documents/list', 'Failed to list documents', error)
    return serverError(error, 'Failed to list documents')
  }
}
