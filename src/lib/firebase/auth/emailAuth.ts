/**
 * Email and password authentication functions
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  updatePassword,
  linkWithCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  type AuthError,
} from 'firebase/auth'
import { auth } from '../config'
import type { UserCredential, User } from './types'
import { hasProviderLinked } from './sessionManager'

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName })
  }

  // Send verification email (non-blocking)
  try {
    await sendEmailVerification(userCredential.user)
  } catch {
    // Don't block signup if verification email fails
  }

  return userCredential
}

// Sign in with email and password
export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    const authError = error as AuthError

    if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
      throw new Error('Invalid email or password. If you signed up with Google or GitHub, try those options instead.')
    }

    throw error
  }
}

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email)
}

// Add password to account (for OAuth-only users)
export const addPasswordToAccount = async (password: string): Promise<void> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')
  if (!user.email) throw new Error('No email associated with account')

  // Check if already has password
  if (hasProviderLinked(user, 'password')) {
    throw new Error('Password is already set for this account.')
  }

  // Create email credential and link it
  const credential = EmailAuthProvider.credential(user.email, password)
  await linkWithCredential(user, credential)
}

// Change password (requires re-authentication for OAuth users adding password)
export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')
  if (!user.email) throw new Error('No email associated with account')

  // Re-authenticate with current password
  const credential = EmailAuthProvider.credential(user.email, currentPassword)
  await reauthenticateWithCredential(user, credential)

  // Update password
  await updatePassword(user, newPassword)
}
