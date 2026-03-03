/**
 * Developer Configuration
 * Centralized whitelist of developer and admin emails
 *
 * This is the single source of truth for developer access control.
 * Configure emails via environment variables (comma-separated).
 */

/**
 * Parse a comma-separated env var into a lowercase email array
 */
function parseEmailList(envVar: string | undefined): string[] {
  if (!envVar) return []
  return envVar.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
}

/**
 * Developer email whitelist
 * Users with these emails have access to the developer dashboard
 */
export const DEVELOPER_EMAILS: string[] = parseEmailList(process.env.DEVELOPER_EMAILS)

/**
 * Developer notification email recipients
 * Only these emails receive document notification emails (new doc, approval, messages)
 */
export const DEVELOPER_NOTIFICATION_EMAILS: string[] = parseEmailList(process.env.DEVELOPER_NOTIFICATION_EMAILS)

/**
 * Admin email whitelist
 * Admins have full access and can assign to any developer
 */
export const ADMIN_EMAILS: string[] = parseEmailList(process.env.ADMIN_EMAILS)

/**
 * Professor email whitelist
 * Users with these emails have access to the professor dashboard
 */
export const PROFESSOR_EMAILS: string[] = parseEmailList(process.env.PROFESSOR_EMAILS)

/**
 * Check if an email belongs to a professor (synchronous, hardcoded list)
 * @param email - Email address to check
 * @returns true if the email is in the professor whitelist
 */
export function isProfessor(email: string | null | undefined): boolean {
  if (!email) return false
  return PROFESSOR_EMAILS.includes(email.toLowerCase())
}

/**
 * Check if an email belongs to a developer
 * @param email - Email address to check
 * @returns true if the email is in the developer whitelist
 */
export function isDeveloper(email: string | null | undefined): boolean {
  if (!email) return false
  return DEVELOPER_EMAILS.includes(email.toLowerCase())
}

/**
 * Check if an email belongs to an admin
 * @param email - Email address to check
 * @returns true if the email is in the admin whitelist
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
