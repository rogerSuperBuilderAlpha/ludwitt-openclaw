import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { recordDocumentChange, compareDocumentStates, determineChangeType } from '@/lib/utils/documentHistory.server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'
import { DEVELOPER_NOTIFICATION_EMAILS } from '@/config/developers'

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

    // Check if already approved
    if (doc.status === 'approved') {
      return badRequestError('Document already approved')
    }

    // Capture old state for history tracking
    const oldState = { ...doc }

    // Update document status
    await docRef.update({
      status: 'approved',
      approvedAt: FieldValue.serverTimestamp(),
      approvedBy: customerId,
    })

    // Record document history
    try {
      const newState = { ...doc, status: 'approved' }
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
        { note: 'Document approved and developer notified' }
      )
    } catch (historyError) {
      apiLogger.apiError('customers/documents/approve', 'Failed to record document history', historyError)
      // Don't fail the approval if history recording fails
    }

    // Get customer info
    const customerDoc = await db.collection('customers').doc(customerId).get()
    const customer = customerDoc.data()!

    // Send email notification to all developers
    const developerEmails = Array.from(DEVELOPER_NOTIFICATION_EMAILS)
    try {
      const emailPromises = developerEmails.map(async (to) => {
        // Create notification record per recipient
        const notification = {
          customerId,
          documentId,
          type: 'document_approved',
          recipient: to,
          status: 'pending',
          retryCount: 0,
        }

        const notificationRef = await db
          .collection('customerNotifications')
          .add(notification)

        try {
          const emailSent = await sendCustomEmail({
            to,
            subject: `New Project Document Approved - ${customer.displayName}`,
            html: `
              <h2>New Project Document Approved</h2>
              <p>A customer has approved a new project document for development review.</p>
              <ul>
                <li><strong>Customer:</strong> ${customer.displayName} (${customer.email})</li>
                <li><strong>Document:</strong> ${doc.googleDocTitle}</li>
                <li><strong>Created:</strong> ${doc.createdAt?.toDate ? doc.createdAt.toDate().toLocaleString() : 'Unknown'}</li>
                <li><strong>Approved:</strong> ${new Date().toLocaleString()}</li>
              </ul>
              <p><a href="${doc.googleDocUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">View Document in Google Drive</a></p>
              <hr>
              <p><small>This is an automated notification from Ludwitt Customer Portal.</small></p>
            `,
            text: `
New Project Document Approved

Customer: ${customer.displayName} (${customer.email})
Document: ${doc.googleDocTitle}
Created: ${doc.createdAt?.toDate ? doc.createdAt.toDate().toLocaleString() : 'Unknown'}
Approved: ${new Date().toLocaleString()}

View Document: ${doc.googleDocUrl}

---
This is an automated notification from Ludwitt Customer Portal.
            `,
          })

          if (emailSent?.success) {
            await notificationRef.update({
              status: 'sent',
              sentAt: FieldValue.serverTimestamp(),
            })
          } else {
            await notificationRef.update({
              status: 'failed',
              error: emailSent?.error || 'Email sending failed',
            })
          }
        } catch (emailError) {
          apiLogger.apiError('customers/documents/approve', `Failed to send notification email to ${to}`, emailError)
          await notificationRef.update({
            status: 'failed',
            error: emailError instanceof Error ? emailError.message : 'Unknown error',
          })
        }
      })

      await Promise.all(emailPromises)

      // Mark document as notified
      await docRef.update({
        notificationSent: true,
        notificationSentAt: FieldValue.serverTimestamp(),
      })
    } catch (emailError) {
      apiLogger.apiError('customers/documents/approve', 'Failed to send notification emails', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Document approved successfully',
    })
  } catch (error) {
    apiLogger.apiError('customers/documents/approve', 'Failed to approve document', error)
    return serverError(error, 'Failed to approve document')
  }
}
