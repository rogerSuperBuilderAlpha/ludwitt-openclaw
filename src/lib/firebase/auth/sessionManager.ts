/**
 * Session management and user-related utilities
 */

import {
  signOut,
} from 'firebase/auth'
import { auth } from '../config'
import type { User, LinkedProvider } from './types'

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Sign out
export const logout = async (): Promise<void> => {
  await signOut(auth)
}

/**
 * @deprecated fetchSignInMethodsForEmail is deprecated by Firebase.
 * Use generic error messages on sign-in failure instead.
 */
export const getSignInMethodsForEmail = async (_email: string): Promise<string[]> => {
  return []
}

// Get linked providers for current user
export const getLinkedProviders = (user: User): LinkedProvider[] => {
  return user.providerData.map(provider => ({
    providerId: provider.providerId,
    displayName: getProviderDisplayName(provider.providerId),
    email: provider.email
  }))
}

// Get display name for provider ID
const getProviderDisplayName = (providerId: string): string => {
  switch (providerId) {
    case 'google.com':
      return 'Google'
    case 'github.com':
      return 'GitHub'
    case 'password':
      return 'Email & Password'
    default:
      return providerId
  }
}

// Check if user has a specific provider linked
export const hasProviderLinked = (user: User, providerId: string): boolean => {
  return user.providerData.some(provider => provider.providerId === providerId)
}
