/**
 * Multi-factor authentication (MFA/2FA) with phone verification
 */

import {
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  multiFactor,
  getMultiFactorResolver,
  RecaptchaVerifier,
  type MultiFactorError,
} from 'firebase/auth'
import { auth } from '../config'
import type { User, UserCredential, MultiFactorResolver } from './types'

// Store reCAPTCHA verifier instance
let recaptchaVerifier: RecaptchaVerifier | null = null

// Store MFA resolver for completing sign-in
let mfaResolver: MultiFactorResolver | null = null

// Store verification ID for completing enrollment
let enrollmentVerificationId: string | null = null

// ============================================
// reCAPTCHA Management
// ============================================

// Initialize reCAPTCHA verifier for phone auth
export const initRecaptchaVerifier = (
  containerId: string
): RecaptchaVerifier => {
  // Clear any existing verifier
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
  }

  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
    'expired-callback': () => {
      // reCAPTCHA expired
    },
  })

  return recaptchaVerifier
}

// Get or create reCAPTCHA verifier
export const getRecaptchaVerifier = (
  containerId: string
): RecaptchaVerifier => {
  if (!recaptchaVerifier) {
    return initRecaptchaVerifier(containerId)
  }
  return recaptchaVerifier
}

// Clear reCAPTCHA verifier
export const clearRecaptchaVerifier = () => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
}

// ============================================
// 2FA Status and Management
// ============================================

// Check if user has 2FA enabled
export const has2FAEnabled = (user: User): boolean => {
  const mf = multiFactor(user)
  return mf.enrolledFactors.length > 0
}

// Get enrolled 2FA factors
export const getEnrolled2FAFactors = (user: User) => {
  const mf = multiFactor(user)
  return mf.enrolledFactors.map((factor) => ({
    uid: factor.uid,
    displayName: factor.displayName || 'Phone',
    factorId: factor.factorId,
    enrollmentTime: factor.enrollmentTime,
  }))
}

// ============================================
// 2FA Enrollment
// ============================================

// Step 1: Start phone enrollment for 2FA (sends SMS)
export const startPhone2FAEnrollment = async (
  phoneNumber: string,
  recaptchaContainerId: string
): Promise<string> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')

  // Get multi-factor session
  const mf = multiFactor(user)
  const session = await mf.getSession()

  // Initialize reCAPTCHA
  const verifier = getRecaptchaVerifier(recaptchaContainerId)

  // Create phone auth provider
  const phoneAuthProvider = new PhoneAuthProvider(auth)

  // Send verification code
  const verificationId = await phoneAuthProvider.verifyPhoneNumber(
    { phoneNumber, session },
    verifier
  )

  // Store for verification step
  enrollmentVerificationId = verificationId

  return verificationId
}

// Step 2: Complete phone 2FA enrollment (verify code)
export const completePhone2FAEnrollment = async (
  verificationCode: string,
  displayName?: string
): Promise<void> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')

  if (!enrollmentVerificationId) {
    throw new Error('No verification in progress. Please request a new code.')
  }

  // Create phone credential
  const phoneCredential = PhoneAuthProvider.credential(
    enrollmentVerificationId,
    verificationCode
  )

  // Create multi-factor assertion
  const multiFactorAssertion =
    PhoneMultiFactorGenerator.assertion(phoneCredential)

  // Enroll the phone as 2FA
  const mf = multiFactor(user)
  await mf.enroll(multiFactorAssertion, displayName || 'Phone')

  // Clear stored verification ID
  enrollmentVerificationId = null
  clearRecaptchaVerifier()
}

// Remove a 2FA factor
export const remove2FAFactor = async (factorUid: string): Promise<void> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')

  const mf = multiFactor(user)
  const factor = mf.enrolledFactors.find((f) => f.uid === factorUid)

  if (!factor) {
    throw new Error('2FA factor not found')
  }

  await mf.unenroll(factor)
}

// ============================================
// MFA Sign-In Flow
// ============================================

// Handle MFA during sign-in - Step 1: Get resolver and send code
export const handleMFASignIn = async (
  error: MultiFactorError,
  recaptchaContainerId: string
): Promise<{ verificationId: string; phoneHint: string }> => {
  // Get the resolver from the error
  const resolver = getMultiFactorResolver(auth, error)
  mfaResolver = resolver

  // Get the phone factor hint (usually the first enrolled factor)
  const phoneFactorHint = resolver.hints.find(
    (hint) => hint.factorId === PhoneMultiFactorGenerator.FACTOR_ID
  )

  if (!phoneFactorHint) {
    throw new Error('No phone 2FA factor found for this account')
  }

  // Initialize reCAPTCHA
  const verifier = getRecaptchaVerifier(recaptchaContainerId)

  // Send verification code
  const phoneAuthProvider = new PhoneAuthProvider(auth)
  const verificationId = await phoneAuthProvider.verifyPhoneNumber(
    { multiFactorHint: phoneFactorHint, session: resolver.session },
    verifier
  )

  // Get masked phone number for display
  // phoneFactorHint is guaranteed to be a PhoneMultiFactorInfo here (filtered by FACTOR_ID above)
  const phoneHint =
    (phoneFactorHint as unknown as { phoneNumber?: string }).phoneNumber ||
    'your phone'

  return { verificationId, phoneHint }
}

// Handle MFA during sign-in - Step 2: Verify code and complete sign-in
export const completeMFASignIn = async (
  verificationId: string,
  verificationCode: string
): Promise<UserCredential> => {
  if (!mfaResolver) {
    throw new Error('No MFA sign-in in progress')
  }

  // Create phone credential
  const phoneCredential = PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  )

  // Create multi-factor assertion
  const multiFactorAssertion =
    PhoneMultiFactorGenerator.assertion(phoneCredential)

  // Complete sign-in
  const result = await mfaResolver.resolveSignIn(multiFactorAssertion)

  // Clear resolver
  mfaResolver = null
  clearRecaptchaVerifier()

  return result
}

// Get stored MFA resolver
export const getMFAResolver = (): MultiFactorResolver | null => {
  return mfaResolver
}

// Clear MFA resolver
export const clearMFAResolver = () => {
  mfaResolver = null
}
