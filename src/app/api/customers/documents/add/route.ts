import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { recordDocumentChange } from '@/lib/utils/documentHistory.server'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'
import { createReservation } from '@/lib/credits/reservation'
import { CREDIT_CONSTANTS } from '@/lib/credits/types'
import { DEVELOPER_NOTIFICATION_EMAILS } from '@/config/developers'

/**
 * Extract Google Doc ID from various URL formats
 */
function extractDocId(url: string): string | null {
  try {
    // Handle different Google Docs URL formats:
    // https://docs.google.com/document/d/DOC_ID/edit
    // https://docs.google.com/document/d/DOC_ID/edit?usp=sharing
    // https://drive.google.com/file/d/DOC_ID/view

    const patterns = [
      /\/document\/d\/([a-zA-Z0-9_-]+)/,
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  } catch (error) {
    return null
  }
}

/**
 * Extract document title from URL or use default
 */
function extractDocTitle(url: string): string {
  try {
    const urlObj = new URL(url)
    // Try to get title from URL path or use date
    const pathParts = urlObj.pathname.split('/')
    const editIndex = pathParts.indexOf('edit')

    if (editIndex > 0 && pathParts[editIndex - 1]) {
      return decodeURIComponent(pathParts[editIndex - 1])
    }

    // Default to date-based title
    return `Document - ${new Date().toLocaleDateString()}`
  } catch (error) {
    return `Document - ${new Date().toLocaleDateString()}`
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const customerId = authResult.userId
    const decodedToken = authResult.decodedToken

    const { shareUrl, title, notes, projectId, developerId, estimatedCostCents, estimateMarkup } = await request.json()

    if (!shareUrl) {
      return badRequestError('Share URL is required')
    }

    // Handle credit reservation if cost estimate is provided
    let reservationId: string | null = null
    let reservedAmount: number | null = null
    
    if (estimatedCostCents && estimatedCostCents > 0) {
      // Calculate raw cost using the markup that was applied (3x or 5x)
      // Default to 3x if not provided
      const appliedMarkup = estimateMarkup || CREDIT_CONSTANTS.CUSTOMER_MARKUP_MULTIPLIER
      const rawCost = Math.ceil(estimatedCostCents / appliedMarkup)
      
      const reservationResult = await createReservation(
        customerId,
        'pending', // Will update with actual doc ID after creation
        estimatedCostCents,
        rawCost
      )
      
      if (!reservationResult.success) {
        if (reservationResult.insufficientCredits) {
          return NextResponse.json({
            error: reservationResult.error || 'Credit limit reached',
            code: 'CREDIT_LIMIT_EXCEEDED',
            currentBalance: reservationResult.currentBalance,
            requiredAmount: reservationResult.requiredAmount,
          }, { status: 402 })
        }
        return badRequestError(reservationResult.error || 'Failed to reserve credits')
      }
      
      reservationId = reservationResult.reservationId || null
      reservedAmount = estimatedCostCents
    }

    // Verify project ownership if projectId is provided
    if (projectId) {
      const projectDoc = await db.collection('projects').doc(projectId).get()
      if (!projectDoc.exists) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }
      const project = projectDoc.data()
      if (project?.customerId !== customerId) {
        return NextResponse.json(
          { error: 'You do not have permission to add documents to this project' },
          { status: 403 }
        )
      }
    }

    // MULTI-DEVELOPER: Validate developer if provided
    let developerProfile = null
    if (developerId) {
      const devDoc = await db.collection('developerProfiles').doc(developerId).get()
      if (!devDoc.exists) {
        return notFoundError('Developer not found')
      }
      developerProfile = devDoc.data()
      if (!developerProfile?.isActive) {
        return badRequestError('Developer is not active')
      }
    }

    // Validate URL is a Google Docs link
    if (!shareUrl.includes('docs.google.com') && !shareUrl.includes('drive.google.com')) {
      return badRequestError('Please provide a valid Google Docs share link')
    }

    // Extract document ID
    const docId = extractDocId(shareUrl)
    if (!docId) {
      return badRequestError('Could not extract document ID from URL. Please check the link.')
    }

    // Check if document already exists for this customer
    const existingDocs = await db
      .collection('customerDocuments')
      .where('customerId', '==', customerId)
      .where('googleDocId', '==', docId)
      .get()

    if (!existingDocs.empty) {
      return badRequestError('This document has already been added')
    }

    // Create clean URL for viewing
    const cleanUrl = `https://docs.google.com/document/d/${docId}/edit`

    // Create document record
    const docTitle = title || extractDocTitle(shareUrl)

    const newDoc: Record<string, unknown> = {
      customerId,
      projectId: projectId || null, // Link to project (can be null)
      googleDocId: docId,
      googleDocTitle: docTitle,
      googleDocUrl: cleanUrl,
      addedAt: FieldValue.serverTimestamp(),
      status: 'pending',
      notificationSent: false,
      approvedBy: '',
      notes: notes || '',
      // MULTI-DEVELOPER: Assignment fields
      assignedDeveloperId: developerId || null,
      assignedDeveloperEmail: developerProfile?.email || null,
      assignedDeveloperName: developerProfile?.displayName || null,
      assignedBy: developerId ? 'auto' : null,
      assignedAt: developerId ? FieldValue.serverTimestamp() : null,
      assignedByUserId: null,
      assignedByUserEmail: null,
      submittedVia: developerId ? 'developer-specific' : 'general',
      submittedViaDeveloperId: developerId || null,
      submittedViaDeveloperName: developerProfile?.displayName || null,
      isVisibleToDeveloper: !!developerId,
      assignmentHistory: [],
      // Credits/Billing fields
      estimatedCostCents: reservedAmount,
      actualCostCents: null,
      customerCharge: null,
      creditStatus: reservationId ? 'reserved' : 'none',
      creditReservationId: reservationId,
      creditTransactionId: null,
    }

    const docRef = await db.collection('customerDocuments').add(newDoc)

    // Update reservation with actual document ID if we have one
    if (reservationId) {
      try {
        await db.collection('credit_reservations').doc(reservationId).update({
          documentId: docRef.id,
        })
      } catch (resUpdateError) {
        apiLogger.apiError('customers/documents/add', 'Failed to update reservation with document ID', resUpdateError)
        // Don't fail - reservation still exists
      }
    }

    // Record document history for creation
    try {
      await recordDocumentChange(
        db,
        docRef.id,
        customerId,
        'created',
        customerId,
        'customer',
        [],
        { note: `Document created: ${docTitle}` }
      )
    } catch (historyError) {
      apiLogger.apiError('customers/documents/add', 'Failed to record document history', historyError)
      // Don't fail the creation if history recording fails
    }

    // MULTI-DEVELOPER: Create notification if auto-assigned
    if (developerId && developerProfile) {
      try {
        await db.collection('developerNotifications').add({
          developerId,
          type: 'new_assignment',
          title: 'New document assigned',
          message: `A new document has been submitted directly to you: ${docTitle}`,
          relatedItemType: 'document',
          relatedItemId: docRef.id,
          isRead: false,
          createdAt: FieldValue.serverTimestamp(),
          actionUrl: `/dashboard?tab=developer&doc=${docRef.id}`,
          metadata: {
            customerName: decodedToken.name || decodedToken.email,
            submittedVia: 'developer-specific'
          }
        })
      } catch (notifError) {
        apiLogger.apiError('customers/documents/add', 'Failed to create developer notification', notifError)
        // Don't fail the creation if notification fails
      }
    }

    // Email developers when a client uploads a new document
    const developerEmails = Array.from(DEVELOPER_NOTIFICATION_EMAILS)
    if (developerEmails.length > 0) {
      try {
        const customerName = decodedToken.name || decodedToken.email || 'A customer'
        const dashboardUrl =
          process.env.NEXT_PUBLIC_APP_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-domain.com')
        const docUrl = `${dashboardUrl}/developers?doc=${docRef.id}`
        const emailPromises = developerEmails.map((to) =>
          sendCustomEmail({
            to,
            subject: `New document uploaded: ${docTitle}`,
            html: `
              <h2>New Document Uploaded</h2>
              <p><strong>${customerName}</strong> has added a new document for review.</p>
              <ul>
                <li><strong>Document:</strong> ${docTitle}</li>
                <li><strong>Added:</strong> ${new Date().toLocaleString()}</li>
              </ul>
              <p><a href="${docUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">View in dashboard</a></p>
              <p><a href="${cleanUrl}">Open Google Doc</a></p>
              <hr>
              <p><small>Ludwitt Customer Portal</small></p>
            `,
            text: `
New Document Uploaded

${customerName} has added a new document for review.

Document: ${docTitle}
Added: ${new Date().toLocaleString()}

View in dashboard: ${docUrl}
Open Google Doc: ${cleanUrl}

---
Ludwitt Customer Portal
            `,
          })
        )
        await Promise.all(emailPromises)
      } catch (emailError) {
        apiLogger.apiError('customers/documents/add', 'Failed to send new-document email to developers', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      document: {
        id: docRef.id,
        ...newDoc,
        addedAt: new Date(),
      },
      message: developerId 
        ? 'Document added and assigned to developer successfully' 
        : 'Document added successfully'
    })
  } catch (error) {
    apiLogger.apiError('customers/documents/add', 'Failed to add document', error)
    return serverError(error, 'Failed to add document'
    )
  }
}
