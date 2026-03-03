import { createEmailService } from './service'
import {
  welcomeEmail,
  achievementEmail,
  weeklyDigestEmail,
  sessionReminderEmail,
  educatorInvitationEmail,
} from './templates'
import { apiLogger } from '@/lib/logger'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<boolean> {
  try {
    const emailService = createEmailService()
    const template = welcomeEmail({
      name,
      dashboardUrl: `${APP_URL}/dashboard`,
    })

    const result = await emailService.send({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    return result.success
  } catch (error) {
    apiLogger.apiError('email/sendWelcomeEmail', 'Failed to send welcome email', error)
    return false
  }
}

/**
 * Send achievement unlocked email
 */
export async function sendAchievementEmail(data: {
  to: string
  name: string
  achievementTitle: string
  achievementDescription: string
  achievementEmoji: string
  points: number
  totalPoints: number
}): Promise<boolean> {
  try {
    const emailService = createEmailService()
    const template = achievementEmail({
      ...data,
      achievementsUrl: `${APP_URL}/achievements`,
    })

    const result = await emailService.send({
      to: data.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    return result.success
  } catch (error) {
    apiLogger.apiError('email/sendAchievementEmail', 'Failed to send achievement email', error)
    return false
  }
}

/**
 * Send weekly digest email
 */
export async function sendWeeklyDigest(data: {
  to: string
  name: string
  stats: {
    projectsCompleted: number
    achievementsUnlocked: number
    pointsEarned: number
    timeSpent: number
  }
  leaderboardRank?: number
  upcomingSessions?: Array<{
    title: string
    date: string
    url: string
  }>
}): Promise<boolean> {
  try {
    const emailService = createEmailService()
    const template = weeklyDigestEmail({
      ...data,
      upcomingSessions: data.upcomingSessions || [],
      dashboardUrl: `${APP_URL}/dashboard`,
    })

    const result = await emailService.send({
      to: data.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    return result.success
  } catch (error) {
    apiLogger.apiError('email/sendWeeklyDigest', 'Failed to send weekly digest', error)
    return false
  }
}

/**
 * Send session reminder email
 */
export async function sendSessionReminder(data: {
  to: string
  name: string
  sessionTitle: string
  sessionDate: string
  sessionUrl: string
  mentorName: string
}): Promise<boolean> {
  try {
    const emailService = createEmailService()
    const template = sessionReminderEmail(data)

    const result = await emailService.send({
      to: data.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    return result.success
  } catch (error) {
    apiLogger.apiError('email/sendSessionReminder', 'Failed to send session reminder', error)
    return false
  }
}

/**
 * Send educator invitation email
 */
export async function sendEducatorInvitation(data: {
  to: string
  educatorName: string
  educatorEmail: string
  groupName?: string
}): Promise<boolean> {
  try {
    const emailService = createEmailService()
    // Determine base URL (same pattern as timeback launch route)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : APP_URL)
    const signupUrl = `${baseUrl}/login`
    const template = educatorInvitationEmail({
      ...data,
      studentEmail: data.to,
      signupUrl,
    })

    const result = await emailService.send({
      to: data.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    return result.success
  } catch (error) {
    apiLogger.apiError('email/sendEducatorInvitation', 'Failed to send educator invitation email', error)
    return false
  }
}

/**
 * Send custom email
 */
export async function sendCustomEmail(data: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}): Promise<any> {
  try {
    const emailService = createEmailService()
    const result = await emailService.send({
      to: data.to,
      subject: data.subject,
      html: data.html,
      text: data.text,
      replyTo: data.replyTo,
    })
    if (!result.success) {
      apiLogger.apiError('email/sendCustomEmail', 'Email failed to send', new Error(result.error))
    }
    return result
  } catch (error) {
    apiLogger.apiError('email/sendCustomEmail', 'Failed to send custom email', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      exception: error,
    }
  }
}
