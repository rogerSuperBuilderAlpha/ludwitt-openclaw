/**
 * Authentication Configuration
 * Simple admin email check approach
 */

// Admin email - set via ADMIN_EMAIL env var
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ''

/**
 * Check if email is the admin email
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}

/**
 * Get user role based on email and developer status
 */
export function getUserRole(
  email: string | null | undefined,
  isDeveloper: boolean
): 'admin' | 'developer' | 'customer' {
  if (isAdminEmail(email)) return 'admin'
  if (isDeveloper) return 'developer'
  return 'customer'
}

