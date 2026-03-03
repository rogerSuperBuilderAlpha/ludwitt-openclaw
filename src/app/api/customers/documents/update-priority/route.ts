import { NextRequest, NextResponse } from 'next/server'
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

    // Get request body
    const { documentId, priority } = await request.json()

    if (!documentId) {
      return badRequestError('Document ID is required')
    }

    // Validate priority if provided
    if (priority && !['low', 'medium', 'high', 'urgent'].includes(priority)) {
      return badRequestError('Invalid priority value')
    }

    // Verify the document belongs to this customer
    const docRef = db.collection('customerDocuments').doc(documentId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return notFoundError('Document not found')
    }

    const docData = docSnap.data()
    if (docData?.customerId !== customerId) {
      return forbiddenError()
    }

    // Capture old state for history tracking
    const oldState = { ...docData }

    // Update the document with the priority
    await docRef.update({
      priority: priority || null,
      updatedAt: new Date().toISOString(),
    })

    // Record document history
    try {
      const newState = { ...docData, priority: priority || null }
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
        { note: `Priority changed to ${priority || 'none'}` }
      )
    } catch (historyError) {
      apiLogger.apiError('customers/documents/update-priority', 'Failed to record document history', historyError)
      // Don't fail the update if history recording fails
    }

    return NextResponse.json({
      success: true,
      message: 'Priority updated successfully',
    })
  } catch (error) {
    apiLogger.apiError('customers/documents/update-priority', 'Failed to update priority', error)
    return serverError(error, 'Failed to update priority')
  }
}
