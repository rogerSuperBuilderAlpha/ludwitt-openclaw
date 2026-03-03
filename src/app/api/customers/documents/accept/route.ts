import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { recordDocumentChange, compareDocumentStates, determineChangeType } from '@/lib/utils/documentHistory.server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const customerId = authResult.userId

    const { documentId } = await request.json()

    if (!documentId) {
      return badRequestError('Document ID required')
    }

    // Get document
    const docRef = db.collection('customerDocuments').doc(documentId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return notFoundError('Document not found')
    }

    const doc = docSnap.data()!

    // Verify ownership
    if (doc.customerId !== customerId) {
      return forbiddenError()
    }

    // Check if document is completed
    if (doc.status !== 'completed') {
      return badRequestError('Only completed documents can be accepted')
    }

    // Capture old state for history tracking
    const oldState = { ...doc }

    // Update document status to accepted
    await docRef.update({
      status: 'accepted',
      acceptedAt: FieldValue.serverTimestamp(),
      acceptedBy: customerId,
    })

    // Record document history
    try {
      const newState = { ...doc, status: 'accepted' }
      const changes = compareDocumentStates(oldState, newState)
      const changeType = determineChangeType(changes)

      await recordDocumentChange(
        db,
        documentId,
        customerId,
        changeType,
        customerId,
        'customer',
        changes,
        { note: 'Work accepted by customer - iteration complete' }
      )
    } catch (historyError) {
      apiLogger.apiError('customers/documents/accept', 'Failed to record document history', historyError)
      // Continue even if history fails
    }

    return NextResponse.json({
      success: true,
      message: 'Work accepted successfully'
    })
  } catch (error) {
    apiLogger.apiError('customers/documents/accept', 'Failed to accept completed work', error)
    return serverError(error, 'Failed to accept completed work')
  }
}
