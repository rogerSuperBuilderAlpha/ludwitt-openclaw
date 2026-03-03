import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function DELETE(request: NextRequest) {
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

    // Delete the document
    await docRef.delete()

    // Also delete related subcollections (requirements, sessions, communications)
    try {
      // Delete requirements
      const requirementsSnapshot = await db
        .collection('clientRequirements')
        .where('documentId', '==', documentId)
        .get()

      const requirementDeletes = requirementsSnapshot.docs.map(doc => doc.ref.delete())
      await Promise.all(requirementDeletes)

      // Delete development sessions
      const sessionsSnapshot = await db
        .collection('developmentSessions')
        .where('documentId', '==', documentId)
        .get()

      const sessionDeletes = sessionsSnapshot.docs.map(doc => doc.ref.delete())
      await Promise.all(sessionDeletes)

      // Delete communications
      const commsSnapshot = await db
        .collection('documentCommunications')
        .where('documentId', '==', documentId)
        .get()

      const commsDeletes = commsSnapshot.docs.map(doc => doc.ref.delete())
      await Promise.all(commsDeletes)

      // Delete document history
      const historySnapshot = await db
        .collection('documentHistory')
        .where('documentId', '==', documentId)
        .get()

      const historyDeletes = historySnapshot.docs.map(doc => doc.ref.delete())
      await Promise.all(historyDeletes)
    } catch (subCollectionError) {
      apiLogger.apiError('customers/documents/delete', 'Failed to delete subcollections', subCollectionError)
      // Continue even if subcollection deletion fails
    }

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully'
    })
  } catch (error) {
    apiLogger.apiError('customers/documents/delete', 'Failed to delete document', error)
    return serverError(error, 'Failed to delete document')
  }
}
