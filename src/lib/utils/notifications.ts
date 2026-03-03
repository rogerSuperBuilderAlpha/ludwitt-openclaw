/**
 * Notification helper functions
 * Provides utilities for creating notifications for various events
 */

import { CreateNotificationInput, getNotificationContent } from '@/lib/types/notifications'
import { logger } from '@/lib/logger'

interface CreateNotificationParams {
  recipientId: string
  recipientRole: 'customer' | 'developer' | 'admin'
  type: CreateNotificationInput['type']
  documentId?: string
  documentTitle?: string
  projectId?: string
  projectTitle?: string
  actorId?: string
  actorName?: string
  actorRole?: 'customer' | 'developer' | 'admin'
  details?: string
  priority?: 'low' | 'normal' | 'high' | 'urgent'
}

/**
 * Creates a notification by calling the notification API
 */
export async function createNotification(params: CreateNotificationParams): Promise<boolean> {
  try {
    // Generate title and message based on type
    const { title, message } = getNotificationContent(
      params.type,
      params.actorName || 'Someone',
      params.documentTitle || 'a document',
      params.details
    )

    const notificationData: CreateNotificationInput = {
      recipientId: params.recipientId,
      recipientRole: params.recipientRole,
      type: params.type,
      title,
      message,
      documentId: params.documentId,
      documentTitle: params.documentTitle,
      projectId: params.projectId,
      projectTitle: params.projectTitle,
      actorId: params.actorId,
      actorName: params.actorName,
      actorRole: params.actorRole,
      priority: params.priority || 'normal',
    }

    // Call the notification API (without auth - internal call)
    const response = await fetch('/api/notifications/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    })

    return response.ok
  } catch (error) {
    logger.error('Notifications', 'Error creating notification', { error })
    return false
  }
}

/**
 * Creates a notification for a new message
 */
export async function notifyNewMessage(
  recipientId: string,
  recipientRole: 'customer' | 'developer',
  documentId: string,
  documentTitle: string,
  senderName: string,
  senderRole: 'customer' | 'developer'
): Promise<void> {
  await createNotification({
    recipientId,
    recipientRole,
    type: 'new_message',
    documentId,
    documentTitle,
    actorName: senderName,
    actorRole: senderRole,
    priority: 'normal',
  })
}

/**
 * Creates a notification for a status change
 */
export async function notifyStatusChange(
  recipientId: string,
  recipientRole: 'customer' | 'developer',
  documentId: string,
  documentTitle: string,
  newStatus: string,
  actorName?: string
): Promise<void> {
  await createNotification({
    recipientId,
    recipientRole,
    type: 'status_change',
    documentId,
    documentTitle,
    actorName,
    details: newStatus,
    priority: newStatus === 'completed' ? 'high' : 'normal',
  })
}

/**
 * Creates a notification for a document assignment
 */
export async function notifyAssignment(
  developerId: string,
  documentId: string,
  documentTitle: string,
  developerName: string
): Promise<void> {
  await createNotification({
    recipientId: developerId,
    recipientRole: 'developer',
    type: 'assignment',
    documentId,
    documentTitle,
    actorName: developerName,
    priority: 'high',
  })
}

/**
 * Creates a notification for a new requirement
 */
export async function notifyRequirementAdded(
  recipientId: string,
  recipientRole: 'customer' | 'developer',
  documentId: string,
  documentTitle: string,
  adderName: string
): Promise<void> {
  await createNotification({
    recipientId,
    recipientRole,
    type: 'requirement_added',
    documentId,
    documentTitle,
    actorName: adderName,
    actorRole: 'developer',
    priority: 'normal',
  })
}

/**
 * Creates a notification for a requirement status update
 */
export async function notifyRequirementUpdated(
  recipientId: string,
  recipientRole: 'customer' | 'developer',
  documentId: string,
  documentTitle: string,
  newStatus: string
): Promise<void> {
  await createNotification({
    recipientId,
    recipientRole,
    type: 'requirement_updated',
    documentId,
    documentTitle,
    details: newStatus,
    priority: newStatus === 'completed' ? 'normal' : 'low',
  })
}

/**
 * Creates a notification for a new session log
 */
export async function notifySessionLogged(
  customerId: string,
  documentId: string,
  documentTitle: string,
  developerName: string
): Promise<void> {
  await createNotification({
    recipientId: customerId,
    recipientRole: 'customer',
    type: 'session_logged',
    documentId,
    documentTitle,
    actorName: developerName,
    actorRole: 'developer',
    priority: 'normal',
  })
}

/**
 * Creates a notification for document approval
 */
export async function notifyDocumentApproved(
  customerId: string,
  documentId: string,
  documentTitle: string
): Promise<void> {
  await createNotification({
    recipientId: customerId,
    recipientRole: 'customer',
    type: 'document_approved',
    documentId,
    documentTitle,
    priority: 'high',
  })
}
