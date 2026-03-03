import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'
import { sanitizeMarkdown } from '@/lib/sanitize'
import { createNotification } from '@/lib/utils/notifications'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import {
  badRequestError,
  forbiddenError,
  notFoundError,
  serverError,
} from '@/lib/api/error-responses'
import {
  validateBody,
  documentIdSchema,
  messageSchema,
} from '@/lib/api/validation'
import { apiLogger } from '@/lib/logger'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const customerId = authResult.userId
    const customerEmail = authResult.decodedToken.email

    if (!customerEmail) {
      return badRequestError('User email not found')
    }

    // Apply rate limiting (30 requests per minute)
    const rateLimitResult = applyRateLimit(
      customerEmail,
      RateLimitPresets.STANDARD
    )
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const SendMessageSchema = z.object({
      documentId: documentIdSchema,
      message: messageSchema,
    })

    const result = validateBody(SendMessageSchema, await request.json())
    if (!result.success) return result.error
    const { documentId, message } = result.data

    // Sanitize message to prevent XSS
    const sanitizedMessage = sanitizeMarkdown(message)

    if (!sanitizedMessage.trim()) {
      return badRequestError('Message cannot be empty after sanitization')
    }

    // Verify the document belongs to this customer and get customer info in parallel
    const docRef = db.collection('customerDocuments').doc(documentId)
    const [docSnap, customerDoc] = await Promise.all([
      docRef.get(),
      db.collection('customers').doc(customerId).get(),
    ])

    if (!docSnap.exists) {
      return notFoundError('Document not found')
    }

    const docData = docSnap.data()!
    if (docData.customerId !== customerId) {
      return forbiddenError()
    }

    const customer = customerDoc.data()

    // Build participantIds for access control: customer uid + assigned developer uid
    const participantIds = [customerId]
    if (docData.assignedTo) participantIds.push(docData.assignedTo)
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
      sentBy: customerEmail,
      sentByRole: 'customer' as const,
      sentAt: FieldValue.serverTimestamp(),
      isInternal: false,
      readBy: [customerId], // Customer has already read their own message
    }

    const commRef = await db
      .collection('documentCommunications')
      .add(communication)

    // Get assigned developer emails (from developers config)
    // For now, we'll send to all developers. In the future, this could be more targeted.
    const { DEVELOPER_NOTIFICATION_EMAILS } = await import(
      '@/config/developers'
    )
    const developerEmails = Array.from(DEVELOPER_NOTIFICATION_EMAILS)

    // Create in-app notifications for developers
    if (docData.assignedTo) {
      // If document is assigned, notify only the assigned developer
      try {
        await createNotification({
          recipientId: docData.assignedTo,
          recipientRole: 'developer',
          type: 'new_message',
          documentId,
          documentTitle: docData.googleDocTitle,
          actorId: customerId,
          actorName: customer?.displayName || customerEmail,
          actorRole: 'customer',
          priority: 'normal',
        })
      } catch (notifError) {
        apiLogger.apiError(
          'customers/documents/send-message',
          'Failed to create notification',
          notifError
        )
      }
    }

    // Send email notification to developers
    if (developerEmails.length > 0) {
      try {
        const emailPromises = developerEmails.map((devEmail: string) =>
          sendCustomEmail({
            to: devEmail,
            subject: `New message from ${customer?.displayName || customerEmail} - ${docData.googleDocTitle}`,
            html: `
              <h2>New Message from Customer</h2>
              <p>Hi,</p>
              <p>You have received a new message regarding the project document:</p>

              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Document:</strong> ${docData.googleDocTitle}</p>
                <p><strong>Customer:</strong> ${customer?.displayName || customerEmail}</p>
                <p><strong>Project:</strong> ${docData.projectName || 'Not assigned'}</p>
              </div>

              <div style="background-color: #EFF6FF; padding: 15px; border-left: 4px solid #3B82F6; margin: 20px 0;">
                <p><strong>Message:</strong></p>
                <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
              </div>

              <p><a href="${docData.googleDocUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">View Document</a></p>

              <p style="margin-top: 30px;">Log in to your developer dashboard to reply to this message.</p>

              <hr style="margin-top: 30px;">
              <p><small>This is an automated notification from Ludwitt Development System.</small></p>
            `,
            text: `
New Message from Customer

Hi,

You have received a new message regarding the project document:

Document: ${docData.googleDocTitle}
Customer: ${customer?.displayName || customerEmail}
Project: ${docData.projectName || 'Not assigned'}

Message:
${sanitizedMessage}

View Document: ${docData.googleDocUrl}

Log in to your developer dashboard to reply to this message.

---
This is an automated notification from Ludwitt Development System.
            `,
          })
        )

        await Promise.all(emailPromises)
      } catch (emailError) {
        apiLogger.apiError(
          'customers/documents/send-message',
          'Failed to send email notifications',
          emailError
        )
        // Don't fail the request if email fails - the message was still saved
      }
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
      'customers/documents/send-message',
      'Failed to send message',
      error
    )
    return serverError(error, 'Failed to send message')
  }
}
