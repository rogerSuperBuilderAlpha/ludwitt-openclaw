/**
 * Custom error classes and type guards for authentication errors
 */

import type { MultiFactorResolver } from './types'

// Custom error for password prompt when account exists with different credential
export class PasswordRequiredError extends Error {
  email: string
  pendingCredential: any
  isPasswordRequired: boolean = true // Special marker for reliable detection

  constructor(email: string, pendingCredential: any) {
    super('PASSWORD_REQUIRED')
    this.name = 'PasswordRequiredError'
    this.email = email
    this.pendingCredential = pendingCredential
    Object.setPrototypeOf(this, PasswordRequiredError.prototype) // Fix prototype chain
  }
}

// Type guard for PasswordRequiredError
export function isPasswordRequiredError(error: any): error is PasswordRequiredError {
  return error &&
         typeof error === 'object' &&
         (error.isPasswordRequired === true ||
          error.name === 'PasswordRequiredError' ||
          error.message === 'PASSWORD_REQUIRED')
}

// Custom error for MFA required
export class MFARequiredError extends Error {
  resolver: MultiFactorResolver

  constructor(resolver: MultiFactorResolver) {
    super('MFA_REQUIRED')
    this.name = 'MFARequiredError'
    this.resolver = resolver
    Object.setPrototypeOf(this, MFARequiredError.prototype)
  }
}

// Type guard for MFA required error
export function isMFARequiredError(error: any): error is MFARequiredError {
  return error &&
         typeof error === 'object' &&
         (error.name === 'MFARequiredError' || error.code === 'auth/multi-factor-auth-required')
}

// Check if error is MFA required from Firebase
export function isFirebaseMFAError(error: any): boolean {
  return error?.code === 'auth/multi-factor-auth-required'
}
