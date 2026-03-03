/**
 * Notification Types for Ludwitt
 *
 * This defines the schema for the notifications collection in Firestore.
 * Notifications are used to alert users about important events in the system.
 */

import { FirestoreTimestamp } from './timestamp'

export type NotificationType =
  | 'new_message'           // New message received in document communication
  | 'status_change'         // Document status changed (pending -> in-progress -> completed)
  | 'assignment'            // Document assigned to developer
  | 'requirement_added'     // New requirement added to document
  | 'requirement_updated'   // Requirement status changed
  | 'session_logged'        // New development session logged
  | 'document_approved'     // Document approved by admin
  | 'document_archived'     // Document archived

export type UniversityNotificationType =
  | 'deliverable_submitted'       // Student submitted a deliverable
  | 'deliverable_reviewed'        // Professor reviewed/graded a deliverable
  | 'deliverable_comment'         // Professor commented on a deliverable
  | 'booking_created'             // Office hours booking created
  | 'booking_cancelled'           // Office hours booking cancelled
  | 'peer_review_assigned'        // Peer review assigned to reviewer
  | 'peer_review_submitted'       // Peer review submitted (notify submitter)
  | 'peer_review_endorsed'        // Professor endorsed a peer review
  | 'badge_earned'                // Peer review badge earned
  | 'idea_comment'                // Professor commented on an idea
  | 'professor_document'          // Professor uploaded a document
  | 'student_joined_path'         // Student joined a learning path
  | 'booking_reminder'            // Upcoming booking reminder (future)
  | 'course_announcement'         // Professor posted a course announcement
  | 'contribution_badge_earned'   // Contributor badge earned for open source PRs
  | 'ai_review_complete'          // AI pre-review completed for a deliverable
  | 'discussion_reply'            // Someone replied to your discussion thread
  | 'discussion_mention'          // Someone mentioned you in a discussion

export type NotificationRecipientRole = 'customer' | 'developer' | 'admin' | 'student' | 'professor'

export interface Notification {
  id: string

  // Recipient information
  recipientId: string              // User ID of the recipient
  recipientRole: NotificationRecipientRole

  // Notification metadata
  type: NotificationType | UniversityNotificationType
  title: string                     // Short title for the notification
  message: string                   // Detailed message

  // Related entities
  documentId?: string               // Related document (if applicable)
  documentTitle?: string            // Title of related document
  projectId?: string                // Related project (if applicable)
  projectTitle?: string             // Title of related project

  // University-specific entities
  courseId?: string                  // Related university course
  deliverableId?: string            // Related deliverable

  // Actor information (who triggered the notification)
  actorId?: string                  // User ID of actor
  actorName?: string                // Name of actor
  actorRole?: NotificationRecipientRole

  // Status
  read: boolean                     // Has the notification been read?
  readAt?: FirestoreTimestamp        // Firestore Timestamp when read

  // Links
  actionUrl?: string                // URL to navigate to when clicked

  // Timestamps
  createdAt: FirestoreTimestamp      // Firestore Timestamp

  // Priority (optional - for future use)
  priority?: 'low' | 'normal' | 'high' | 'urgent'
}

export interface CreateNotificationInput {
  recipientId: string
  recipientRole: NotificationRecipientRole
  type: NotificationType
  title: string
  message: string
  documentId?: string
  documentTitle?: string
  projectId?: string
  projectTitle?: string
  actorId?: string
  actorName?: string
  actorRole?: NotificationRecipientRole
  actionUrl?: string
  priority?: 'low' | 'normal' | 'high' | 'urgent'
}

export interface NotificationPreferences {
  userId: string

  // Email preferences
  emailOnNewMessage: boolean
  emailOnStatusChange: boolean
  emailOnAssignment: boolean
  emailOnRequirement: boolean
  emailOnSession: boolean

  // In-app preferences
  inAppNotifications: boolean

  // Digest settings
  digestFrequency: 'immediate' | 'daily' | 'weekly' | 'never'

  updatedAt: FirestoreTimestamp  // Firestore Timestamp
}

/**
 * Helper function to create notification titles and messages based on type
 */
export const getNotificationContent = (
  type: NotificationType,
  actorName: string,
  documentTitle: string,
  details?: string
): { title: string; message: string } => {
  switch (type) {
    case 'new_message':
      return {
        title: 'New Message',
        message: `${actorName} sent you a message about "${documentTitle}"`
      }

    case 'status_change':
      return {
        title: 'Status Updated',
        message: `"${documentTitle}" status changed to ${details || 'updated'}`
      }

    case 'assignment':
      return {
        title: 'New Assignment',
        message: `"${documentTitle}" has been assigned to ${actorName}`
      }

    case 'requirement_added':
      return {
        title: 'New Requirement',
        message: `${actorName} added a requirement to "${documentTitle}"`
      }

    case 'requirement_updated':
      return {
        title: 'Requirement Updated',
        message: `Requirement status updated to ${details || 'updated'} for "${documentTitle}"`
      }

    case 'session_logged':
      return {
        title: 'Session Logged',
        message: `${actorName} logged a development session for "${documentTitle}"`
      }

    case 'document_approved':
      return {
        title: 'Document Approved',
        message: `Your document "${documentTitle}" has been approved and is ready for development`
      }

    case 'document_archived':
      return {
        title: 'Document Archived',
        message: `"${documentTitle}" has been archived`
      }

    default:
      return {
        title: 'Notification',
        message: `Update for "${documentTitle}"`
      }
  }
}

export interface UniversityNotificationPreferences {
  userId: string
  emailDeliverableReviewed: boolean
  emailCourseUpdate: boolean
  emailOfficeHours: boolean
  emailPeerReview: boolean
  emailPeerReviewEndorsed: boolean
  emailProfessorComments: boolean
  emailProfessorDocuments: boolean
  updatedAt: FirestoreTimestamp  // Firestore Timestamp or ISO string
}

