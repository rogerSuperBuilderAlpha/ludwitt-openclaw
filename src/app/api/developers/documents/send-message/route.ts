import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'
import { sanitizeMarkdown } from '@/lib/sanitize'
import { isDeveloper } from '@/config/developers'
import { createNotification } from '@/lib/utils/notifications'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import {
  badRequestError,
  forbiddenError,
  notFoundError,
  serverError,
} from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken
    const developerEmail = decodedToken.email

    if (!developerEmail) {
      return badRequestError('User email not found')
    }

    // Verify user is a developer
    if (!isDeveloper(developerEmail)) {
      return forbiddenError('Developer access required')
    }

    // Apply rate limiting (30 requests per minute)
    const rateLimitResult = applyRateLimit(
      developerEmail,
      RateLimitPresets.STANDARD
    )
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const { documentId, customerId, message } = await request.json()

    if (!documentId || !customerId || !message) {
      return badRequestError(
        'Document ID, customer ID, and message are required'
      )
    }

    // Sanitize message to prevent XSS
    const sanitizedMessage = sanitizeMarkdown(message)

    if (!sanitizedMessage.trim()) {
      return badRequestError('Message cannot be empty after sanitization')
    }

    // Verify the document exists and get customer info in parallel
    const docRef = db.collection('customerDocuments').doc(documentId)
    const [docSnap, customerDoc] = await Promise.all([
      docRef.get(),
      db.collection('customers').doc(customerId).get(),
    ])

    if (!docSnap.exists) {
      return notFoundError('Document not found')
    }

    const docData = docSnap.data()!
    const customer = customerDoc.data()

    if (!customer) {
      return notFoundError('Customer not found')
    }

    // Build participantIds for access control: customer uid + sending developer uid
    const participantIds = [customerId, decodedToken.uid]
    if (docData.assignedTo && !participantIds.includes(docData.assignedTo)) {
      participantIds.push(docData.assignedTo)
    }
    if (
      docData.assignedDeveloperId &&
      !participantIds.includes(docData.assignedDeveloperId)
    ) {
      participantIds.push(docData.assignedDeveloperId)
    }

    // Create communication record
    const communication = {
      documentId,
      customerId,
      participantIds,
      message: sanitizedMessage,
      sentBy: developerEmail,
      sentByRole: 'developer' as const,
      sentAt: FieldValue.serverTimestamp(),
      isInternal: false,
      readBy: [decodedToken.uid], // Developer has already read their own message
    }

    const commRef = await db
      .collection('documentCommunications')
      .add(communication)

    // Create in-app notification for customer
    try {
      await createNotification({
        recipientId: customerId,
        recipientRole: 'customer',
        type: 'new_message',
        documentId,
        documentTitle: docData.googleDocTitle,
        actorId: decodedToken.uid,
        actorName: developerEmail,
        actorRole: 'developer',
        priority: 'normal',
      })
    } catch (notifError) {
      apiLogger.apiError(
        'developers/documents/send-message',
        'Failed to create notification',
        notifError
      )
    }

    // Send email notification to customer
    try {
      await sendCustomEmail({
        to: customer.email,
        subject: `New message from your developer - ${docData.googleDocTitle}`,
        html: `
          <h2>New Message from Developer</h2>
          <p>Hi ${customer.displayName || customer.email},</p>
          <p>You have received a new message from your developer regarding your project document:</p>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Document:</strong> ${docData.googleDocTitle}</p>
            <p><strong>Project:</strong> ${docData.projectName || 'Not assigned'}</p>
          </div>

          <div style="background-color: #EFF6FF; padding: 15px; border-left: 4px solid #3B82F6; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          </div>

          <p><a href="${docData.googleDocUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">View Document</a></p>

          <p style="margin-top: 30px;">Log in to your customer dashboard to reply to this message.</p>

          <hr style="margin-top: 30px;">
          <p><small>This is an automated notification from Ludwitt Development System.</small></p>
        `,
        text: `
New Message from Developer

Hi ${customer.displayName || customer.email},

You have received a new message from your developer regarding your project document:

Document: ${docData.googleDocTitle}
Project: ${docData.projectName || 'Not assigned'}

Message:
${sanitizedMessage}

View Document: ${docData.googleDocUrl}

Log in to your customer dashboard to reply to this message.

---
This is an automated notification from Ludwitt Development System.
        `,
      })
    } catch (emailError) {
      apiLogger.apiError(
        'developers/documents/send-message',
        'Failed to send email notification',
        emailError
      )
      // Don't fail the request if email fails - the message was still saved
    }

    return NextResponse.json({
      success: true,
      communication: {
        id: commRef.id,
        ...communication,
        sentAt: new Date(),
      },
    })
  } catch (error) {
    apiLogger.apiError(
      'developers/documents/send-message',
      'Failed to send message',
      error
    )
    return serverError(error, 'Failed to send message')
  }
}
