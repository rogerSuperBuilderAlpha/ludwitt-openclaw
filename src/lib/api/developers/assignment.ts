/**
 * Assignment Business Logic
 * Handles assigning/reassigning work to developers
 */

import { db } from '@/lib/firebase/admin'
import { Timestamp, FieldValue } from 'firebase-admin/firestore'
import { getDeveloperProfile } from './profile'
import {
  AssignmentRequest,
  AssignmentResponse,
  GetAssignedWorkParams,
  AssignedWorkStats,
} from '@/lib/types/assignment'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { logger } from '@/lib/logger'

/**
 * Assign or reassign work to a developer
 */
export async function assignWork(params: {
  itemType: 'project' | 'document'
  itemId: string
  developerId: string | null
  assignedBy: string
  reason?: string
}): Promise<AssignmentResponse['assignment']> {
  const { itemType, itemId, developerId, assignedBy, reason } = params

  // Determine collection
  const collection = itemType === 'project' ? 'projects' : 'customerDocuments'
  const docRef = db.collection(collection).doc(itemId)

  // Get current item
  const doc = await docRef.get()
  if (!doc.exists) {
    throw new Error(`${itemType} not found`)
  }

  const currentData = doc.data()
  const previousDeveloperId = currentData?.assignedDeveloperId

  // If assigning to a developer, validate they exist and are active
  let developerProfile = null
  if (developerId) {
    developerProfile = await getDeveloperProfile(developerId)
    if (!developerProfile || !developerProfile.isActive) {
      throw new Error('Developer not found or inactive')
    }
  }

  // Prepare update data
  const updateData: Record<string, unknown> = {
    assignedDeveloperId: developerId || null,
    assignedDeveloperEmail: developerProfile?.email || null,
    assignedDeveloperName: developerProfile?.displayName || null,
    assignedBy: developerId ? 'admin' : null,
    assignedAt: developerId ? Timestamp.now() : null,
    assignedByUserId: assignedBy,
    isVisibleToDeveloper: !!developerId,
    updatedAt: Timestamp.now(),
  }

  // Add to assignment history
  const historyEntry = {
    fromDeveloperId: previousDeveloperId || null,
    toDeveloperId: developerId || null,
    changedBy: assignedBy,
    changedAt: Timestamp.now(),
    reason: reason || null,
  }

  updateData.assignmentHistory = FieldValue.arrayUnion(historyEntry)

  // Update document
  await docRef.update(updateData)

  // Create notifications
  if (developerId) {
    await createDeveloperNotification({
      developerId,
      type: previousDeveloperId ? 'reassignment' : 'new_assignment',
      title: `New ${itemType} assigned`,
      message: `You have been assigned a ${itemType}`,
      relatedItemType: itemType,
      relatedItemId: itemId,
      actionUrl:
        itemType === 'project'
          ? `/dashboard?tab=developer&project=${itemId}`
          : `/dashboard?tab=developer&doc=${itemId}`,
    })
  }

  // If reassignment, notify previous developer
  if (previousDeveloperId && previousDeveloperId !== developerId) {
    await createDeveloperNotification({
      developerId: previousDeveloperId,
      type: 'reassignment',
      title: `${itemType} reassigned`,
      message: `A ${itemType} has been reassigned to another developer`,
      relatedItemType: itemType,
      relatedItemId: itemId,
    })
  }

  // 📧 Send email notification to customer when work begins
  if (developerId && !previousDeveloperId && itemType === 'document') {
    try {
      const customerId = currentData?.customerId
      if (customerId) {
        const customerDoc = await db.collection('users').doc(customerId).get()
        const customer = customerDoc.data()

        if (customer && customer.email) {
          await sendCustomEmail({
            to: customer.email,
            subject: `🚀 Work has begun on your ${itemType}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">Great news! We've started working on your project.</h2>
                
                <p>Hi ${customer.displayName || customer.email},</p>
                
                <p>We're excited to let you know that <strong>${developerProfile?.displayName || 'a developer'}</strong> has been assigned to your document and has begun working on it.</p>
                
                <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <p style="margin: 0;"><strong>📄 Document:</strong> ${currentData?.googleDocTitle || 'Your Project'}</p>
                  <p style="margin: 10px 0 0 0;"><strong>👨‍💻 Developer:</strong> ${developerProfile?.displayName || 'Assigned'}</p>
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
                  <a href="${currentData?.googleDocUrl || ''}" 
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

We're excited to let you know that ${developerProfile?.displayName || 'a developer'} has been assigned to your document and has begun working on it.

📄 Document: ${currentData?.googleDocTitle || 'Your Project'}
👨‍💻 Developer: ${developerProfile?.displayName || 'Assigned'}
⏰ Started: ${new Date().toLocaleString()}

What happens next?
- Your developer will review the requirements in detail
- They'll reach out if they need any clarifications
- You'll receive progress updates as work continues
- You can check status anytime in your customer dashboard

View Your Document: ${currentData?.googleDocUrl || ''}

Have questions? Just reply to this email and we'll get back to you right away.

---
This is an automated notification from Ludwitt.
            `,
          })
        }
      }
    } catch {
      // Don't fail the assignment if email fails
    }
  }

  return {
    itemType,
    itemId,
    previousDeveloperId,
    newDeveloperId: developerId || undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FieldValue.serverTimestamp() resolved on write, not compatible with client Timestamp type
    assignedAt: FieldValue.serverTimestamp() as any,
  }
}

/**
 * Get all work assigned to a developer
 */
export async function getAssignedWork(params: GetAssignedWorkParams) {
  const { developerId, status, limit = 50, offset = 0 } = params

  // Query documents
  let docsQuery = db
    .collection('customerDocuments')
    .where('assignedDeveloperId', '==', developerId)
    .orderBy('assignedAt', 'desc')
    .limit(limit)
    .offset(offset)

  if (status) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore query builder type narrowing limitation
    docsQuery = docsQuery.where('status', '==', status) as any
  }

  const docsSnapshot = await docsQuery.get()
  const documents = docsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  // Query projects
  let projectsQuery = db
    .collection('projects')
    .where('assignedDeveloperId', '==', developerId)
    .orderBy('assignedAt', 'desc')
    .limit(limit)
    .offset(offset)

  if (status) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore query builder type narrowing limitation
    projectsQuery = projectsQuery.where('status', '==', status) as any
  }

  const projectsSnapshot = await projectsQuery.get()
  const projects = projectsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  // Calculate stats
  const stats: AssignedWorkStats = {
    totalDocuments: documents.length,
    totalProjects: projects.length,
    activeDocuments: documents.filter((d: Record<string, unknown>) =>
      ['approved', 'in-progress'].includes(d.status as string)
    ).length,
    activeProjects: projects.filter((p: Record<string, unknown>) =>
      ['intake', 'discovery', 'in-progress'].includes(p.status as string)
    ).length,
    completedDocuments: documents.filter(
      (d: Record<string, unknown>) => d.status === 'completed'
    ).length,
    completedProjects: projects.filter(
      (p: Record<string, unknown>) => p.status === 'completed'
    ).length,
  }

  return { documents, projects, stats }
}

/**
 * Create a developer notification
 */
export async function createDeveloperNotification(data: {
  developerId: string
  type:
    | 'new_assignment'
    | 'reassignment'
    | 'customer_message'
    | 'project_update'
  title: string
  message: string
  relatedItemType: 'project' | 'document'
  relatedItemId: string
  actionUrl?: string
  metadata?: Record<string, unknown>
}) {
  try {
    await db.collection('developerNotifications').add({
      developerId: data.developerId,
      type: data.type,
      title: data.title,
      message: data.message,
      relatedItemType: data.relatedItemType,
      relatedItemId: data.relatedItemId,
      isRead: false,
      createdAt: Timestamp.now(),
      actionUrl: data.actionUrl || null,
      metadata: data.metadata || null,
    })
  } catch (error) {
    logger.error(
      'DeveloperAssignment',
      'Error creating developer notification',
      { error }
    )
    // Don't throw - notification failure shouldn't block assignment
  }
}
