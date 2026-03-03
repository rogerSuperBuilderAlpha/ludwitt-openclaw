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
    const { documentId, projectId } = await request.json()

    if (!documentId) {
      return badRequestError('Document ID is required')
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

    // If projectId is provided, verify it belongs to the customer
    if (projectId) {
      const projectRef = db.collection('projects').doc(projectId)
      const projectSnap = await projectRef.get()

      if (!projectSnap.exists) {
        return notFoundError('Project not found')
      }

      const projectData = projectSnap.data()
      if (projectData?.customerId !== customerId) {
        return forbiddenError('Unauthorized access to project')
      }
    }

    // Capture old state for history tracking
    const oldState = { ...docData }

    // Update the document with the project assignment
    await docRef.update({
      projectId: projectId || null,
      updatedAt: new Date().toISOString(),
    })

    // Record document history
    try {
      const newState = { ...docData, projectId: projectId || null }
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
        { note: projectId ? 'Project assigned' : 'Project removed' }
      )
    } catch (historyError) {
      apiLogger.apiError('customers/documents/update-project', 'Failed to record document history', historyError)
      // Don't fail the update if history recording fails
    }

    return NextResponse.json({
      success: true,
      message: 'Project assignment updated successfully',
    })
  } catch (error) {
    apiLogger.apiError('customers/documents/update-project', 'Failed to update project assignment', error)
    return serverError(error, 'Failed to update project assignment')
  }
}
