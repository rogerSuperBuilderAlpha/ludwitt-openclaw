/**
 * University Email & In-App Notifications
 *
 * Provides fire-and-forget notification functions for all university interaction points.
 * Each convenience function builds the notification content and calls the core sender.
 * Errors are logged but never thrown — notifications must never break primary actions.
 */

import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { apiLogger } from '@/lib/logger'
import type { UniversityNotificationType } from '@/lib/types/notifications'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-domain.com')

// Maps notification types to the preference key that controls email delivery
const TYPE_TO_PREF_KEY: Record<UniversityNotificationType, string> = {
  deliverable_submitted: 'emailCourseUpdate',
  deliverable_reviewed: 'emailDeliverableReviewed',
  deliverable_comment: 'emailProfessorComments',
  booking_created: 'emailOfficeHours',
  booking_cancelled: 'emailOfficeHours',
  peer_review_assigned: 'emailPeerReview',
  peer_review_submitted: 'emailPeerReview',
  peer_review_endorsed: 'emailPeerReviewEndorsed',
  badge_earned: 'emailPeerReviewEndorsed',
  idea_comment: 'emailProfessorComments',
  professor_document: 'emailProfessorDocuments',
  student_joined_path: 'emailCourseUpdate',
  booking_reminder: 'emailOfficeHours',
  course_announcement: 'emailCourseUpdate',
  contribution_badge_earned: 'emailPeerReviewEndorsed',
  discussion_reply: 'emailCourseUpdate',
  discussion_mention: 'emailCourseUpdate',
  ai_review_complete: 'emailDeliverableReviewed',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function getUserEmailAndPrefs(userId: string): Promise<{
  email: string | null
  name: string
  emailEnabled: boolean
} | null> {
  try {
    const userDoc = await db.collection('users').doc(userId).get()
    if (!userDoc.exists) return null
    const userData = userDoc.data()!
    const email = (userData.email as string) || null
    const name = (userData.displayName as string) || (email?.split('@')[0]) || 'User'
    return { email, name, emailEnabled: true } // emailEnabled is refined per-type in sender
  } catch {
    return null
  }
}

async function isEmailEnabledForType(userId: string, type: UniversityNotificationType): Promise<boolean> {
  try {
    const prefKey = TYPE_TO_PREF_KEY[type]
    if (!prefKey) return true // default to enabled if no mapping
    const prefDoc = await db.collection('notificationPreferences').doc(userId).get()
    if (!prefDoc.exists) return true // default all enabled
    const prefs = prefDoc.data()!
    return prefs[prefKey] !== false // default to true if key missing
  } catch {
    return true // on error, default to enabled
  }
}

function buildEmailHtml(title: string, message: string, actionUrl?: string): string {
  const ctaBlock = actionUrl
    ? `<a href="${actionUrl}" style="display: inline-block; background: #111827; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 16px;">View Details</a>`
    : ''

  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #111827;">${title}</h2>
  <p style="color: #4b5563; line-height: 1.6;">${message}</p>
  ${ctaBlock}
  <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
    You can manage your notification preferences in your <a href="${BASE_URL}/account" style="color: #6b7280;">account settings</a>.
  </p>
</div>`
}

// ---------------------------------------------------------------------------
// Core sender
// ---------------------------------------------------------------------------

export async function sendUniversityNotification(params: {
  recipientId: string
  type: UniversityNotificationType
  title: string
  message: string
  emailSubject: string
  emailBody: string
  actionUrl?: string
  actorId?: string
  actorName?: string
  courseId?: string
  deliverableId?: string
}): Promise<void> {
  try {
    // 1. Create in-app notification (direct Firestore write)
    await db.collection('notifications').add({
      recipientId: params.recipientId,
      recipientRole: 'student', // overridden contextually below
      type: params.type,
      title: params.title,
      message: params.message,
      actorId: params.actorId || null,
      actorName: params.actorName || null,
      actionUrl: params.actionUrl || null,
      courseId: params.courseId || null,
      deliverableId: params.deliverableId || null,
      read: false,
      readAt: null,
      priority: 'normal',
      createdAt: FieldValue.serverTimestamp(),
    })

    // 2. Check email preference and send email
    const emailEnabled = await isEmailEnabledForType(params.recipientId, params.type)
    if (!emailEnabled) return

    const user = await getUserEmailAndPrefs(params.recipientId)
    if (!user?.email) return

    await sendCustomEmail({
      to: user.email,
      subject: params.emailSubject,
      html: params.emailBody,
    })
  } catch (error) {
    apiLogger.apiError('university/notifications', `Failed to send ${params.type} notification`, error)
  }
}

// ---------------------------------------------------------------------------
// Convenience functions (fire-and-forget — callers should NOT await these)
// ---------------------------------------------------------------------------

/** #1 — Student submitted a deliverable → notify professor(s) */
export function notifyDeliverableSubmitted(
  professorId: string,
  studentName: string,
  deliverableTitle: string,
  courseTitle: string,
  courseId?: string,
  deliverableId?: string
): void {
  const title = 'New Deliverable Submission'
  const message = `${studentName} submitted "${deliverableTitle}" in ${courseTitle}.`
  sendUniversityNotification({
    recipientId: professorId,
    type: 'deliverable_submitted',
    title,
    message,
    emailSubject: `New submission: ${deliverableTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: studentName,
    courseId,
    deliverableId,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #2 — Office hours booked → notify professor */
export function notifyBookingCreated(
  professorId: string,
  studentName: string,
  date: string,
  time: string
): void {
  const title = 'Office Hours Booked'
  const message = `${studentName} booked office hours on ${date} at ${time}.`
  sendUniversityNotification({
    recipientId: professorId,
    type: 'booking_created',
    title,
    message,
    emailSubject: `Office hours booking: ${date} at ${time}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: studentName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #3/#8 — Booking cancelled → notify other party */
export function notifyBookingCancelled(
  recipientId: string,
  cancellerName: string,
  date: string,
  time: string
): void {
  const title = 'Booking Cancelled'
  const message = `${cancellerName} cancelled the office hours on ${date} at ${time}.`
  sendUniversityNotification({
    recipientId,
    type: 'booking_cancelled',
    title,
    message,
    emailSubject: `Office hours cancelled: ${date} at ${time}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: cancellerName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #4 — Student joined learning path → notify path creator */
export function notifyStudentJoinedPath(
  creatorId: string,
  studentName: string,
  pathTitle: string
): void {
  const title = 'Student Joined Your Path'
  const message = `${studentName} joined your learning path "${pathTitle}".`
  sendUniversityNotification({
    recipientId: creatorId,
    type: 'student_joined_path',
    title,
    message,
    emailSubject: `${studentName} joined "${pathTitle}"`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: studentName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #5 — Deliverable reviewed/graded → notify student */
export function notifyDeliverableReviewed(
  studentId: string,
  professorName: string,
  deliverableTitle: string,
  verdict: string,
  courseId?: string,
  deliverableId?: string
): void {
  const title = 'Deliverable Reviewed'
  const statusLabel = verdict === 'approved' ? 'approved' : verdict === 'revision-needed' ? 'needs revision' : verdict
  const message = `${professorName} reviewed "${deliverableTitle}" — ${statusLabel}.`
  sendUniversityNotification({
    recipientId: studentId,
    type: 'deliverable_reviewed',
    title,
    message,
    emailSubject: `Your deliverable was reviewed: ${deliverableTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: professorName,
    courseId,
    deliverableId,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #6 — Deliverable comment added → notify student */
export function notifyDeliverableComment(
  studentId: string,
  professorName: string,
  deliverableTitle: string,
  courseId?: string,
  deliverableId?: string
): void {
  const title = 'New Comment on Your Deliverable'
  const message = `${professorName} commented on "${deliverableTitle}".`
  sendUniversityNotification({
    recipientId: studentId,
    type: 'deliverable_comment',
    title,
    message,
    emailSubject: `New comment on ${deliverableTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: professorName,
    courseId,
    deliverableId,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #7 — Idea comment added → notify student */
export function notifyIdeaComment(
  studentId: string,
  professorName: string,
  ideaTitle: string
): void {
  const title = 'New Comment on Your Idea'
  const message = `${professorName} commented on your idea "${ideaTitle}".`
  sendUniversityNotification({
    recipientId: studentId,
    type: 'idea_comment',
    title,
    message,
    emailSubject: `New comment on your idea: ${ideaTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: professorName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #9 — Professor uploaded document → notify students */
export function notifyProfessorDocument(
  studentIds: string[],
  professorName: string,
  docTitle: string,
  courseTitle: string
): void {
  for (const studentId of studentIds) {
    const title = 'New Document Available'
    const message = `${professorName} shared "${docTitle}" for ${courseTitle}.`
    sendUniversityNotification({
      recipientId: studentId,
      type: 'professor_document',
      title,
      message,
      emailSubject: `New document: ${docTitle}`,
      emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
      actorName: professorName,
    }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
  }
}

/** #10 — Peer review assigned → notify reviewer */
export function notifyPeerReviewAssigned(
  reviewerId: string,
  submitterName: string,
  deliverableTitle: string
): void {
  const title = 'Peer Review Assigned'
  const message = `You've been assigned to review "${deliverableTitle}" by ${submitterName}.`
  sendUniversityNotification({
    recipientId: reviewerId,
    type: 'peer_review_assigned',
    title,
    message,
    emailSubject: `Peer review assigned: ${deliverableTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: submitterName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #11 — Peer review submitted → notify submitter */
export function notifyPeerReviewSubmitted(
  submitterId: string,
  reviewerName: string,
  deliverableTitle: string
): void {
  const title = 'Peer Review Received'
  const message = `${reviewerName} submitted a peer review for "${deliverableTitle}".`
  sendUniversityNotification({
    recipientId: submitterId,
    type: 'peer_review_submitted',
    title,
    message,
    emailSubject: `Peer review received for ${deliverableTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: reviewerName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #12 — Peer review endorsed → notify reviewer */
export function notifyPeerReviewEndorsed(
  reviewerId: string,
  professorName: string,
  deliverableTitle: string
): void {
  const title = 'Peer Review Endorsed'
  const message = `${professorName} endorsed your peer review of "${deliverableTitle}".`
  sendUniversityNotification({
    recipientId: reviewerId,
    type: 'peer_review_endorsed',
    title,
    message,
    emailSubject: `Your peer review was endorsed!`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
    actorName: professorName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #13 — Badge earned → notify badge earner */
export function notifyBadgeEarned(
  userId: string,
  badgeType: string
): void {
  const badgeLabel = badgeType.replace('peer-reviewer-', '').replace(/^\w/, c => c.toUpperCase())
  const title = 'Badge Earned!'
  const message = `Congratulations! You've earned the ${badgeLabel} Peer Reviewer badge.`
  sendUniversityNotification({
    recipientId: userId,
    type: 'badge_earned',
    title,
    message,
    emailSubject: `You earned the ${badgeLabel} Peer Reviewer badge!`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #14 — Course announcement → notify enrolled students */
export function notifyCourseAnnouncement(
  studentIds: string[],
  professorName: string,
  announcementTitle: string,
  pathTopic: string
): void {
  for (const studentId of studentIds) {
    const title = 'New Course Announcement'
    const message = `${professorName} posted "${announcementTitle}" in ${pathTopic}.`
    sendUniversityNotification({
      recipientId: studentId,
      type: 'course_announcement',
      title,
      message,
      emailSubject: `New announcement: ${announcementTitle}`,
      emailBody: buildEmailHtml(title, message, `${BASE_URL}/dashboard`),
      actorName: professorName,
    }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
  }
}

/** #15 — Contribution badge earned → notify contributor */
export function notifyContributionBadge(userId: string, badgeType: string): void {
  const badgeLabel = badgeType.replace('contributor-', '').replace(/^\w/, c => c.toUpperCase())
  const title = 'Contributor Badge Earned!'
  const message = `Congratulations! You've earned the ${badgeLabel} Contributor badge for your open source contributions.`
  sendUniversityNotification({
    recipientId: userId,
    type: 'contribution_badge_earned',
    title,
    message,
    emailSubject: `You earned the ${badgeLabel} Contributor badge!`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/university`),
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #16 — Discussion reply -> notify thread author */
export function notifyDiscussionReply(
  threadAuthorId: string,
  replierName: string,
  threadTitle: string
): void {
  const title = 'New Reply to Your Discussion'
  const message = `${replierName} replied to your thread "${threadTitle}".`
  sendUniversityNotification({
    recipientId: threadAuthorId,
    type: 'discussion_reply',
    title,
    message,
    emailSubject: `New reply: ${threadTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/university`),
    actorName: replierName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #17 — Discussion mention -> notify mentioned user */
export function notifyDiscussionMention(
  mentionedUserId: string,
  mentionerName: string,
  threadTitle: string
): void {
  const title = 'You Were Mentioned in a Discussion'
  const message = `${mentionerName} mentioned you in "${threadTitle}".`
  sendUniversityNotification({
    recipientId: mentionedUserId,
    type: 'discussion_mention',
    title,
    message,
    emailSubject: `You were mentioned in: ${threadTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/university`),
    actorName: mentionerName,
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

/** #18 — AI review complete -> notify student */
export function notifyAIReviewComplete(
  studentId: string,
  deliverableTitle: string,
  meetsRequirements: boolean
): void {
  const status = meetsRequirements ? 'looks ready for review' : 'may need improvements'
  const title = 'AI Pre-Review Complete'
  const message = `Your submission for "${deliverableTitle}" has been analyzed — ${status}.`
  sendUniversityNotification({
    recipientId: studentId,
    type: 'ai_review_complete',
    title,
    message,
    emailSubject: `AI review: ${deliverableTitle}`,
    emailBody: buildEmailHtml(title, message, `${BASE_URL}/university`),
  }).catch((err) => apiLogger.apiError('university/notifications', 'notification send failed', err))
}

// Booking reminder (24h before) requires a cron job or Cloud Function — planned feature.
