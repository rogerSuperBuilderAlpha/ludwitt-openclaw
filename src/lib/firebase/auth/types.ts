/**
 * Shared types and interfaces for Firebase authentication
 */

// Re-export commonly used Firebase types
export type {
  User,
  UserCredential,
  AuthError,
  ConfirmationResult,
  MultiFactorResolver,
  MultiFactorError,
} from 'firebase/auth'

// Linked provider information
export interface LinkedProvider {
  providerId: string
  displayName: string
  email?: string | null
}
