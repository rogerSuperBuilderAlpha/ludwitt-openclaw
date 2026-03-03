/**
 * Submission Status Service
 *
 * Business logic for updating developer submission statuses, including
 * status transitions, billing, document history, notifications, and
 * completion emails.
 */

import { db } from '@/lib/firebase/admin'
import { sanitizeCategory } from '@/lib/sanitize'
import { createNotification } from '@/lib/utils/notifications'
import {
  recordDocumentChange,
  compareDocumentStates,
  determineChangeType,
} from '@/lib/utils/documentHistory.server'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { deductCredits } from '@/lib/credits/balance'
import { CREDIT_CONSTANTS } from '@/lib/credits/types'
import { convertReservationByDocument } from '@/lib/credits/reservation'
import { logger } from '@/lib/logger'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export const VALID_STATUSES = [
  'pending',
  'approved',
  'in-progress',
  'completed',
  'archived',
] as const

export type SubmissionStatus = (typeof VALID_STATUSES)[number]

export interface UpdateStatusInput {
  submissionId: string
  status: SubmissionStatus
  category?: string
  actualCostCents?: number
}

export interface ActorInfo {
  uid: string
  email?: string
  name?: string
}

export interface BillingInfo {
  actualCostCents: number
  customerCharge: number
  newBalance: number
  transactionId: string
}

export interface EmailDiagnostics {
  attempted: boolean
  success: boolean
  reason: string | null
  customerEmail: string | null
  error: string | null
  messageId?: string
  customerId?: string
  customerData?: Record<string, unknown>
  hasSubmissionData?: boolean
  hasCustomerId?: boolean
}

export interface UpdateStatusResult {
  billing: BillingInfo | null
  emailDiagnostics: EmailDiagnostics
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type LogFn = (message: string, data?: unknown) => void

function buildUpdateData(
  input: UpdateStatusInput,
  actor: ActorInfo,
  log: LogFn
): Record<string, unknown> {
  const { status, category, actualCostCents } = input
  const updateData: Record<string, unknown> = {
    status,
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: actor.uid,
  }

  if (category) {
    const sanitizedCategory = sanitizeCategory(category)
    if (sanitizedCategory) {
      updateData.category = sanitizedCategory
      log('Category sanitized', { category: sanitizedCategory })
    }
  }

  if (status === 'approved') {
    updateData.approvedAt = new Date().toISOString()
    updateData.approvedBy = actor.uid
    log('Adding approval metadata')
  }

  if (status === 'completed') {
    updateData.completedAt = new Date().toISOString()
    updateData.completedBy = actor.uid
    log('Adding completion metadata')

    if (actualCostCents && actualCostCents > 0) {
      const customerCharge =
        actualCostCents * CREDIT_CONSTANTS.CUSTOMER_MARKUP_MULTIPLIER
      updateData.actualCostCents = actualCostCents
      updateData.customerCharge = customerCharge
      updateData.creditStatus = 'pending'
      log('Billing info stored', { actualCostCents, customerCharge })
    }
  }

  return updateData
}

// ---------------------------------------------------------------------------
// Document history
// ---------------------------------------------------------------------------

async function recordHistory(
  submissionId: string,
  oldState: Record<string, unknown>,
  updateData: Record<string, unknown>,
  actor: ActorInfo,
  status: string,
  category: string | undefined,
  log: LogFn
): Promise<void> {
  try {
    log('Recording document history...')
    const newState = { ...oldState, ...updateData }
    const changes = compareDocumentStates(
      oldState as Record<string, any>,
      newState as Record<string, any>
    )
    const changeType = determineChangeType(changes)

    await recordDocumentChange(
      db,
      submissionId,
      (oldState as Record<string, unknown>).customerId as string,
      changeType,
      actor.email || actor.uid,
      'developer',
      changes,
      {
        note: `Status updated to ${status}${category ? ` (category: ${category})` : ''}`,
      }
    )
    log('Document history recorded')
  } catch (historyError: unknown) {
    const errorMessage =
      historyError instanceof Error
        ? historyError.message
        : String(historyError)
    log('Error recording document history (non-fatal)', {
      error: errorMessage,
    })
    logger.error(
      'submission-status-service',
      'Failed to record document history',
      { error: historyError }
    )
  }
}

// ---------------------------------------------------------------------------
// Billing
// ---------------------------------------------------------------------------

async function processBilling(
  submissionId: string,
  customerId: string,
  actualCostCents: number,
  documentTitle: string,
  submissionRef: FirebaseFirestore.DocumentReference,
  log: LogFn
): Promise<BillingInfo | null> {
  try {
    log('Processing customer billing...')
    const customerCharge =
      actualCostCents * CREDIT_CONSTANTS.CUSTOMER_MARKUP_MULTIPLIER

    const { newBalance, transaction } = await deductCredits(
      customerId,
      customerCharge,
      {
        endpoint: 'document-completion',
        model: 'developer-work',
        inputTokens: 0,
        outputTokens: 0,
        rawCostCents: actualCostCents,
        chargedCostCents: customerCharge,
        source: 'customer_document',
        documentId: submissionId,
        documentTitle: documentTitle || 'Document',
      }
    )

    await submissionRef.update({
      creditStatus: 'deducted',
      creditTransactionId: transaction.id,
    })

    const billingInfo: BillingInfo = {
      actualCostCents,
      customerCharge,
      newBalance,
      transactionId: transaction.id || '',
    }

    // Convert any existing reservation to completed
    try {
      const conversionResult = await convertReservationByDocument(
        submissionId,
        transaction.id || ''
      )
      if (conversionResult.reservationId) {
        log('Reservation converted', {
          reservationId: conversionResult.reservationId,
        })
      }
    } catch (conversionError) {
      log('Reservation conversion failed (non-fatal)', {
        error: conversionError,
      })
    }

    log('Customer billed successfully', { customerCharge, newBalance })
    return billingInfo
  } catch (billingError: unknown) {
    const errorMessage =
      billingError instanceof Error
        ? billingError.message
        : String(billingError)
    log('Billing error (non-fatal)', { error: errorMessage })
    logger.error('submission-status-service', 'Failed to bill customer', {
      error: billingError,
    })
    return null
  }
}

// ---------------------------------------------------------------------------
// Notifications & email
// ---------------------------------------------------------------------------

async function notifyCustomer(
  submissionId: string,
  submissionData: Record<string, unknown>,
  status: string,
  actor: ActorInfo,
  log: LogFn
): Promise<void> {
  try {
    log('Creating notification for customer...')
    await createNotification({
      recipientId: submissionData.customerId as string,
      recipientRole: 'customer',
      type: 'status_change',
      documentId: submissionId,
      documentTitle: (submissionData.googleDocTitle as string) || 'Document',
      actorId: actor.uid,
      actorName: actor.email || 'Developer',
      actorRole: 'developer',
      details: status,
      priority: status === 'completed' ? 'high' : 'normal',
    })
    log('Notification created successfully')
  } catch (notifError: unknown) {
    const errorMessage =
      notifError instanceof Error ? notifError.message : String(notifError)
    log('Error creating notification (non-fatal)', { error: errorMessage })
    logger.error('submission-status-service', 'Failed to create notification', {
      error: notifError,
    })
  }
}

function buildCompletionEmailHtml(
  customerName: string,
  documentTitle: string,
  developerName: string,
  documentUrl: string
): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const documentButton = documentUrl
    ? `
      <div style="text-align: center; margin: 40px 0;">
        <a href="${documentUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Your Completed Document</a>
      </div>
    `
    : ''

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #10B981; margin-bottom: 20px;">🎉 Your project document is complete!</h2>

      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi ${customerName},</p>

      <p style="font-size: 16px; line-height: 1.6; color: #374151;">
        Great news! We've finished working on your project document and it's ready for your review.
      </p>

      <div style="background-color: #F3F4F6; border-left: 4px solid #10B981; padding: 20px; margin: 30px 0; border-radius: 4px;">
        <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;"><strong>📄 Document:</strong> ${documentTitle}</p>
        <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;"><strong>👨‍💻 Completed by:</strong> ${developerName}</p>
        <p style="margin: 0; color: #6B7280; font-size: 14px;"><strong>⏰ Completed:</strong> ${dateStr}</p>
      </div>

      <h3 style="color: #1F2937; font-size: 18px; margin-top: 30px; margin-bottom: 15px;">What's next?</h3>

      <ul style="color: #374151; line-height: 1.8; font-size: 15px;">
        <li>Review your completed document carefully</li>
        <li>Check that all requirements have been met</li>
        <li>Reply to this email if you have any questions or feedback</li>
        <li>Request revisions if needed</li>
      </ul>

      ${documentButton}

      <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-top: 30px;">
        Thank you for choosing Ludwitt! We hope you're satisfied with the results.
      </p>

      <p style="font-size: 16px; line-height: 1.6; color: #374151;">
        Have questions or need changes? Just reply to this email and we'll help you right away.
      </p>

      <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 40px 0;">

      <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6;">
        This is an automated notification from Ludwitt Development Team.<br>
        You're receiving this because you have an active project with us.
      </p>
    </div>
  `
}

function buildCompletionEmailText(
  customerName: string,
  documentTitle: string,
  developerName: string,
  documentUrl: string
): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `
🎉 Your project document is complete!

Hi ${customerName},

Great news! We've finished working on your project document and it's ready for your review.

📄 Document: ${documentTitle}
👨‍💻 Completed by: ${developerName}
⏰ Completed: ${dateStr}

What's next?
- Review your completed document carefully
- Check that all requirements have been met
- Reply to this email if you have any questions or feedback
- Request revisions if needed

${documentUrl ? `View your document: ${documentUrl}\n\n` : ''}Thank you for choosing Ludwitt! We hope you're satisfied with the results.

Have questions or need changes? Just reply to this email and we'll help you right away.

---
This is an automated notification from Ludwitt Development Team.
You're receiving this because you have an active project with us.
  `
}

async function sendCompletionEmail(
  submissionId: string,
  submissionData: Record<string, unknown>,
  actor: ActorInfo,
  diagnostics: EmailDiagnostics,
  log: LogFn
): Promise<void> {
  diagnostics.attempted = true
  log('Document marked as completed. Attempting to send completion email...')

  try {
    const customerDoc = await db
      .collection('users')
      .doc(submissionData.customerId as string)
      .get()

    if (!customerDoc.exists) {
      diagnostics.reason =
        'Customer document not found in Firestore users collection'
      diagnostics.customerId = submissionData.customerId as string
      log('Customer document not found', {
        customerId: submissionData.customerId,
      })
      return
    }

    const customerData = customerDoc.data()

    if (!customerData?.email) {
      diagnostics.reason = 'Customer has no email address in their profile'
      diagnostics.customerData = {
        hasEmail: !!customerData?.email,
        hasDisplayName: !!customerData?.displayName,
      }
      log('Cannot send email - missing customer email')
      return
    }

    diagnostics.customerEmail = customerData.email

    const emailApiKey = process.env.EMAIL_API_KEY
    if (!emailApiKey) {
      diagnostics.success = false
      diagnostics.reason =
        'EMAIL_API_KEY not configured in environment variables'
      diagnostics.error = 'Missing EMAIL_API_KEY'
      log('EMAIL_API_KEY not set - cannot send emails')
      return
    }

    const developerName = actor.name || actor.email || 'Your developer'
    const documentTitle =
      (submissionData.googleDocTitle as string) || 'Your document'
    const documentUrl = (submissionData.googleDocUrl as string) || ''
    const customerName = customerData.displayName || customerData.email

    log('Sending completion email', {
      to: customerData.email,
      documentTitle,
    })

    const emailResult = await sendCustomEmail({
      to: customerData.email,
      subject: `✅ Your project document is complete - ${documentTitle}`,
      html: buildCompletionEmailHtml(
        customerName,
        documentTitle,
        developerName,
        documentUrl
      ),
      text: buildCompletionEmailText(
        customerName,
        documentTitle,
        developerName,
        documentUrl
      ),
    })

    log('Email result', emailResult)

    if (emailResult.success) {
      diagnostics.success = true
      diagnostics.reason = 'Email sent successfully'
      diagnostics.messageId = emailResult.messageId
      log('Completion email sent successfully', {
        to: customerData.email,
        messageId: emailResult.messageId,
      })
    } else {
      diagnostics.success = false
      diagnostics.reason = emailResult.error || 'Email sending failed'
      diagnostics.error = emailResult.error
      log('Email sending failed', {
        error: emailResult.error,
        to: customerData.email,
      })
    }
  } catch (emailError: unknown) {
    const errorMessage =
      emailError instanceof Error ? emailError.message : String(emailError)
    diagnostics.error = errorMessage
    diagnostics.reason = 'Error while sending email'
    log('Error sending completion email', { error: errorMessage })
    logger.error(
      'submission-status-service',
      'Failed to send completion email',
      { error: emailError }
    )
  }
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

export function isValidStatus(status: string): status is SubmissionStatus {
  return (VALID_STATUSES as readonly string[]).includes(status)
}

/**
 * Verify the developer profile exists for non-admin users.
 * Returns true if the request can proceed.
 */
export async function verifyDeveloperAccess(
  uid: string,
  isAdmin: boolean
): Promise<boolean> {
  const developerDoc = await db.collection('developerProfiles').doc(uid).get()
  return isAdmin || developerDoc.exists
}

// ---------------------------------------------------------------------------
// Main service function
// ---------------------------------------------------------------------------

/**
 * Execute the full submission status update workflow:
 * 1. Fetch and validate the submission document
 * 2. Apply the status update to Firestore
 * 3. Record document history
 * 4. Process billing (if completing with a cost)
 * 5. Send notifications and completion emails
 *
 * @returns The result containing billing info and email diagnostics,
 *          or throws a `ServiceError` for caller to handle.
 */
export class ServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message)
    this.name = 'ServiceError'
  }
}

export async function updateSubmissionStatus(
  input: UpdateStatusInput,
  actor: ActorInfo,
  log: LogFn
): Promise<UpdateStatusResult> {
  const { submissionId, status, category, actualCostCents } = input

  // Fetch submission
  log('Fetching submission document...')
  const submissionRef = db.collection('customerDocuments').doc(submissionId)
  const submissionDoc = await submissionRef.get()

  if (!submissionDoc.exists) {
    throw new ServiceError('Submission not found', 404)
  }
  log('Submission found')

  const submissionData = submissionDoc.data()!
  log('Submission data', {
    customerId: submissionData.customerId,
    currentStatus: submissionData.status,
    googleDocTitle: submissionData.googleDocTitle,
  })

  // Capture old state for history tracking
  const oldState = { ...submissionData }

  // Build and apply update
  const updateData = buildUpdateData(input, actor, log)
  log('Updating submission in Firestore...')
  await submissionRef.update(updateData)
  log('Submission updated successfully')

  // Record document history (non-fatal)
  await recordHistory(
    submissionId,
    oldState,
    updateData,
    actor,
    status,
    category,
    log
  )

  // Process billing
  let billingInfo: BillingInfo | null = null
  if (
    status === 'completed' &&
    actualCostCents &&
    actualCostCents > 0 &&
    submissionData.customerId
  ) {
    billingInfo = await processBilling(
      submissionId,
      submissionData.customerId,
      actualCostCents,
      submissionData.googleDocTitle || 'Document',
      submissionRef,
      log
    )
  }

  // Email diagnostics tracking
  const emailDiagnostics: EmailDiagnostics = {
    attempted: false,
    success: false,
    reason: null,
    customerEmail: null,
    error: null,
  }

  // Notifications & completion email
  if (submissionData.customerId) {
    await notifyCustomer(submissionId, submissionData, status, actor, log)

    if (status === 'completed') {
      await sendCompletionEmail(
        submissionId,
        submissionData,
        actor,
        emailDiagnostics,
        log
      )
    } else {
      emailDiagnostics.reason = `Status changed to "${status}" (not "completed")`
      log(
        `Status changed to "${status}" (not "completed"), skipping completion email`
      )
    }
  } else {
    emailDiagnostics.reason = 'Missing submission data or customer ID'
    emailDiagnostics.hasSubmissionData = !!submissionData
    emailDiagnostics.hasCustomerId = !!submissionData?.customerId
    log('Missing submission data or customer ID, skipping notifications', {
      hasSubmissionData: !!submissionData,
      hasCustomerId: !!submissionData?.customerId,
    })
  }

  log('Status update completed successfully')
  return { billing: billingInfo, emailDiagnostics }
}
