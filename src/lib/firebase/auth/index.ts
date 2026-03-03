/**
 * Firebase Authentication - Main Entry Point
 *
 * This module re-exports all authentication functions for backward compatibility.
 * Existing imports like `import { signIn } from '@/lib/firebase/auth'` will continue to work.
 */

// ============================================
// Types
// ============================================
export type {
  User,
  UserCredential,
  AuthError,
  ConfirmationResult,
  MultiFactorResolver,
  MultiFactorError,
  LinkedProvider,
} from './types'

// ============================================
// Error Classes and Type Guards
// ============================================
export {
  PasswordRequiredError,
  isPasswordRequiredError,
  MFARequiredError,
  isMFARequiredError,
  isFirebaseMFAError,
} from './authErrors'

// ============================================
// Email/Password Authentication
// ============================================
export {
  signUp,
  signIn,
  resetPassword,
  addPasswordToAccount,
  changePassword,
} from './emailAuth'

// ============================================
// OAuth Authentication
// ============================================
export {
  signInWithGoogle,
  signInWithGithub,
  linkPendingCredential,
  linkGithubToAccount,
  linkGoogleToAccount,
  unlinkProvider,
  reauthenticateWithGoogle,
  reauthenticateWithGithub,
} from './oauthAuth'

// ============================================
// Session Management
// ============================================
export {
  getCurrentUser,
  logout,
  getSignInMethodsForEmail,
  getLinkedProviders,
  hasProviderLinked,
} from './sessionManager'

// ============================================
// Multi-Factor Authentication (MFA/2FA)
// ============================================
export {
  // reCAPTCHA Management
  initRecaptchaVerifier,
  getRecaptchaVerifier,
  clearRecaptchaVerifier,
  // 2FA Status and Management
  has2FAEnabled,
  getEnrolled2FAFactors,
  // 2FA Enrollment
  startPhone2FAEnrollment,
  completePhone2FAEnrollment,
  remove2FAFactor,
  // MFA Sign-In Flow
  handleMFASignIn,
  completeMFASignIn,
  getMFAResolver,
  clearMFAResolver,
} from './mfaAuth'
