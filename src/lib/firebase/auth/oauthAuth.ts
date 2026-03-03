/**
 * OAuth provider authentication (Google, GitHub, etc.)
 */

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  linkWithCredential,
  linkWithPopup,
  unlink,
  reauthenticateWithPopup,
  type AuthError,
} from 'firebase/auth'
import { auth } from '../config'
import type { UserCredential, User } from './types'
import { PasswordRequiredError } from './authErrors'

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    return result
  } catch (error) {
    const authError = error as AuthError

    // Handle account exists with different credential
    if (authError.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = GoogleAuthProvider.credentialFromError(authError)
      const email = authError.customData?.email as string

      if (email && pendingCred) {
        // Store pending credential and prompt user to sign in with their existing method
        throw new PasswordRequiredError(email, pendingCred)
      }
    }
    throw error
  }
}

// Sign in with GitHub
export const signInWithGithub = async (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    return result
  } catch (error) {
    const authError = error as AuthError

    // Handle account exists with different credential
    if (authError.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = GithubAuthProvider.credentialFromError(authError)
      const email = authError.customData?.email as string

      if (email && pendingCred) {
        // Store pending credential and prompt user to sign in with their existing method
        throw new PasswordRequiredError(email, pendingCred)
      }
    }
    throw error
  }
}

// Link pending credential after password sign-in
export const linkPendingCredential = async (
  email: string,
  password: string,
  pendingCredential: any
): Promise<UserCredential> => {
  // First, sign in with password
  const result = await signInWithEmailAndPassword(auth, email, password)

  // Then link the pending credential
  await linkWithCredential(result.user, pendingCredential)

  return result
}

// Link GitHub to existing account (for learning path requirement)
export const linkGithubToAccount = async (user: User): Promise<UserCredential> => {
  const provider = new GithubAuthProvider()
  try {
    return await linkWithPopup(user, provider)
  } catch (error) {
    const authError = error as AuthError
    if (authError.code === 'auth/credential-already-in-use') {
      throw new Error('This GitHub account is already linked to another user.')
    }
    if (authError.code === 'auth/provider-already-linked') {
      throw new Error('GitHub is already linked to your account.')
    }
    throw error
  }
}

// Link Google account to existing user
export const linkGoogleToAccount = async (): Promise<UserCredential> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')

  const provider = new GoogleAuthProvider()
  try {
    return await linkWithPopup(user, provider)
  } catch (error) {
    const authError = error as AuthError
    if (authError.code === 'auth/credential-already-in-use') {
      throw new Error('This Google account is already linked to another user.')
    }
    if (authError.code === 'auth/provider-already-linked') {
      throw new Error('Google is already linked to your account.')
    }
    throw error
  }
}

// Unlink a provider from the account
export const unlinkProvider = async (providerId: string): Promise<User> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')

  // Prevent unlinking if it's the only auth method
  if (user.providerData.length <= 1) {
    throw new Error('Cannot remove your only sign-in method. Add another method first.')
  }

  try {
    return await unlink(user, providerId)
  } catch (error) {
    const authError = error as AuthError
    if (authError.code === 'auth/no-such-provider') {
      throw new Error('This provider is not linked to your account.')
    }
    throw error
  }
}

// Re-authenticate with OAuth provider (for security-sensitive operations)
export const reauthenticateWithGoogle = async (): Promise<UserCredential> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')

  const provider = new GoogleAuthProvider()
  return await reauthenticateWithPopup(user, provider)
}

export const reauthenticateWithGithub = async (): Promise<UserCredential> => {
  const user = auth.currentUser
  if (!user) throw new Error('No user signed in')

  const provider = new GithubAuthProvider()
  return await reauthenticateWithPopup(user, provider)
}
