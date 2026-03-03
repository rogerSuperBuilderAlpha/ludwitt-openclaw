/**
 * Developer Submission Assignment API
 * Assign submissions to developers
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, auth } from '@/lib/firebase/admin'
import { isAdmin as checkIsAdmin } from '@/config/developers'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

// POST - Assign submission to current developer
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    const isAdmin = checkIsAdmin(decodedToken.email)

    // Apply rate limiting (30 requests per minute)
    const rateLimitResult = applyRateLimit(
      decodedToken.email || decodedToken.uid,
      RateLimitPresets.STANDARD
    )
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    // Get developer profile (optional for admins)
    const developerDoc = await db
      .collection('developerProfiles')
      .doc(decodedToken.uid)
      .get()

    // For non-admin users, require a developer profile
    if (!isAdmin && !developerDoc.exists) {
      return NextResponse.json(
        { error: 'Developer profile not found' },
        { status: 404 }
      )
    }

    const developerData = developerDoc.exists ? developerDoc.data() : null

    const { submissionId, developerId } = await request.json()

    if (!submissionId) {
      return NextResponse.json(
        { error: 'submissionId is required' },
        { status: 400 }
      )
    }

    // Determine who to assign to
    // If developerId is provided and user is admin, assign to that developer
    // Otherwise, assign to current user
    let assignToId = decodedToken.uid
    let assignToName =
      developerData?.displayName || decodedToken.email || 'Unknown'

    if (developerId && isAdmin) {
      // Admin is assigning to a specific developer
      assignToId = developerId

      // Get the target developer's info
      const targetDeveloperDoc = await db
        .collection('developerProfiles')
        .doc(developerId)
        .get()
      if (targetDeveloperDoc.exists) {
        const targetData = targetDeveloperDoc.data()
        assignToName = targetData?.displayName || targetData?.email || 'Unknown'
      } else {
        // Try to get user info from auth
        try {
          const userRecord = await auth.getUser(developerId)
          assignToName = userRecord.displayName || userRecord.email || 'Unknown'
        } catch (err) {
          assignToName = 'Unknown Developer'
        }
      }
    }

    // Update submission with assignment
    const submissionRef = db.collection('customerDocuments').doc(submissionId)
    const submissionDoc = await submissionRef.get()

    if (!submissionDoc.exists) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }

    const submissionData = submissionDoc.data()

    await submissionRef.update({
      assignedTo: assignToId,
      assignedToName: assignToName,
      assignedAt: new Date().toISOString(),
      status: 'in-progress',
      updatedAt: new Date().toISOString(),
    })

    // 📧 Send email notification to customer
    try {
      // Get customer details
      const customerId = submissionData?.customerId
      if (customerId) {
        const customerDoc = await db.collection('users').doc(customerId).get()
        const customer = customerDoc.data()

        if (customer && customer.email) {
          await sendCustomEmail({
            to: customer.email,
            subject: `🚀 Work has begun on your project document`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">Great news! We've started working on your project.</h2>
                
                <p>Hi ${customer.displayName || customer.email},</p>
                
                <p>We're excited to let you know that <strong>${assignToName}</strong> has been assigned to your project document and has begun working on it.</p>
                
                <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <p style="margin: 0;"><strong>📄 Document:</strong> ${submissionData?.googleDocTitle || 'Your Project'}</p>
                  <p style="margin: 10px 0 0 0;"><strong>👨‍💻 Developer:</strong> ${assignToName}</p>
                  <p style="margin: 10px 0 0 0;"><strong>⏰ Started:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul style="line-height: 1.8;">
                  <li>Your developer will review the requirements in detail</li>
                  <li>They'll reach out if they need any clarifications</li>
                  <li>You'll receive progress updates as work continues</li>
                  <li>You can check status anytime in your customer dashboard</li>
                </ul>
                
                <div style="margin: 30px 0;">
                  <a href="${submissionData?.googleDocUrl || ''}" 
                     style="display: inline-block; padding: 12px 30px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    View Your Document
                  </a>
                </div>
                
                <p style="color: #6B7280; margin-top: 30px;">
                  Have questions? Just reply to this email and we'll get back to you right away.
                </p>
                
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
                <p style="color: #9CA3AF; font-size: 12px;">
                  This is an automated notification from Ludwitt. You're receiving this because work has started on your project.
                </p>
              </div>
            `,
            text: `
🚀 Work has begun on your project

Hi ${customer.displayName || customer.email},

We're excited to let you know that ${assignToName} has been assigned to your project document and has begun working on it.

📄 Document: ${submissionData?.googleDocTitle || 'Your Project'}
👨‍💻 Developer: ${assignToName}
⏰ Started: ${new Date().toLocaleString()}

What happens next?
- Your developer will review the requirements in detail
- They'll reach out if they need any clarifications
- You'll receive progress updates as work continues
- You can check status anytime in your customer dashboard

View Your Document: ${submissionData?.googleDocUrl || ''}

Have questions? Just reply to this email and we'll get back to you right away.

---
This is an automated notification from Ludwitt.
            `,
          })

          apiLogger.success(
            'developers/submissions/assign',
            `Customer notification sent to ${customer.email}`
          )
        }
      }
    } catch (emailError) {
      apiLogger.apiError(
        'developers/submissions/assign',
        'Failed to send customer notification email',
        emailError
      )
      // Don't fail the assignment if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Submission assigned successfully',
    })
  } catch (error) {
    apiLogger.apiError(
      'developers/submissions/assign',
      'Failed to assign submission',
      error
    )
    return NextResponse.json(
      {
        error: 'Failed to assign submission',
        details: getErrorMessage(error, 'Unknown error'),
      },
      { status: 500 }
    )
  }
}
