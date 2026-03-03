'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  signIn,
  signUp,
  signInWithGoogle,
  signInWithGithub,
  logout,
  resetPassword,
  getSignInMethodsForEmail,
  isFirebaseMFAError,
  handleMFASignIn,
  completeMFASignIn,
  clearRecaptchaVerifier,
} from '@/lib/firebase/auth'
import { useAuth } from '@/components/auth/ClientProvider'

export type LoginMode = 'signin' | 'signup' | 'forgot'

export interface LoginAuthState {
  mode: LoginMode
  email: string
  password: string
  displayName: string
  showPassword: boolean
  error: string | null
  success: string | null
  loading: boolean
  signInMethods: string[]
  showResetConfirmation: boolean
  mfaRequired: boolean
  mfaCode: string
  mfaPhoneHint: string
  authLoading: boolean
  isAuthenticated: boolean
}

export interface LoginAuthActions {
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setDisplayName: (name: string) => void
  setShowPassword: (show: boolean) => void
  setMfaCode: (code: string) => void
  switchMode: (mode: LoginMode) => void
  handleEmailAuth: (e: React.FormEvent) => Promise<void>
  handleGoogleAuth: () => Promise<void>
  handleGithubAuth: () => Promise<void>
  handleForgotPassword: (e: React.FormEvent) => Promise<void>
  handleConfirmResetPassword: () => Promise<void>
  handleMFAVerify: () => Promise<void>
  resetMFAState: () => void
  clearResetConfirmation: () => void
}

export function useLoginAuth(): LoginAuthState & LoginAuthActions {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()

  const [mode, setMode] = useState<LoginMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [signInMethods, setSignInMethods] = useState<string[]>([])
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)

  // MFA state
  const [mfaRequired, setMfaRequired] = useState(false)
  const [mfaVerificationId, setMfaVerificationId] = useState<string | null>(
    null
  )
  const [mfaCode, setMfaCode] = useState('')
  const [mfaPhoneHint, setMfaPhoneHint] = useState('')

  const redirectPath = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (!authLoading && user) {
      router.push(redirectPath)
    }
  }, [user, authLoading, redirectPath, router])

  // --------------------------------------------------------------------------
  // MFA Handlers
  // --------------------------------------------------------------------------

  const handleMFAChallenge = async (err: any) => {
    try {
      const { verificationId, phoneHint } = await handleMFASignIn(
        err,
        'recaptcha-container-login'
      )
      setMfaVerificationId(verificationId)
      setMfaPhoneHint(phoneHint)
      setMfaRequired(true)
      setLoading(false)
    } catch (mfaErr: unknown) {
      const message = mfaErr instanceof Error ? mfaErr.message : String(mfaErr)
      setError(message || 'Failed to send verification code')
      setLoading(false)
    }
  }

  const handleMFAVerify = async () => {
    if (!mfaVerificationId || mfaCode.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await completeMFASignIn(mfaVerificationId, mfaCode)
    } catch (err: unknown) {
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      if (errCode === 'auth/invalid-verification-code') {
        setError('Invalid code. Please try again.')
      } else if (errCode === 'auth/code-expired') {
        setError('Code expired. Please sign in again.')
        resetMFAState()
      } else {
        setError(errMessage || 'Failed to verify code')
      }
      setLoading(false)
    }
  }

  const resetMFAState = () => {
    setMfaRequired(false)
    setMfaVerificationId(null)
    setMfaCode('')
    setMfaPhoneHint('')
    clearRecaptchaVerifier()
  }

  // --------------------------------------------------------------------------
  // Email/Password Auth
  // --------------------------------------------------------------------------

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'signup') {
        await signUp(email, password, displayName)
      } else {
        await signIn(email, password)
      }
    } catch (err: unknown) {
      if (isFirebaseMFAError(err)) {
        await handleMFAChallenge(err)
        return
      }

      const errorCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : ''
      const errorMessage = err instanceof Error ? err.message : String(err)
      let message: string

      switch (errorCode) {
        case 'auth/user-not-found':
          message = 'No account found with this email.'
          break
        case 'auth/wrong-password':
          message = 'Incorrect password.'
          break
        case 'auth/invalid-credential':
          if (errorMessage.includes('Google')) {
            message = 'This email uses Google sign-in.'
          } else if (errorMessage.includes('GitHub')) {
            message = 'This email uses GitHub sign-in.'
          } else {
            message = 'Invalid email or password.'
          }
          break
        case 'auth/email-already-in-use':
          message = 'An account with this email already exists.'
          break
        case 'auth/weak-password':
          message = 'Password must be at least 6 characters.'
          break
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.'
          break
        case 'auth/too-many-requests':
          message = 'Too many attempts. Please wait and try again.'
          break
        default:
          message = errorMessage.includes('You created your account with')
            ? errorMessage
            : `Unable to ${mode === 'signup' ? 'create account' : 'sign in'}.`
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // --------------------------------------------------------------------------
  // OAuth Auth
  // --------------------------------------------------------------------------

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError(null)

    try {
      await signInWithGoogle()
    } catch (err: unknown) {
      if (isFirebaseMFAError(err)) {
        await handleMFAChallenge(err)
        return
      }
      try {
        await logout()
      } catch {}
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to sign in with Google')
      setLoading(false)
    }
  }

  const handleGithubAuth = async () => {
    setLoading(true)
    setError(null)

    try {
      await signInWithGithub()
    } catch (err: unknown) {
      if (isFirebaseMFAError(err)) {
        await handleMFAChallenge(err)
        return
      }
      try {
        await logout()
      } catch {}
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to sign in with GitHub')
      setLoading(false)
    }
  }

  // --------------------------------------------------------------------------
  // Password Reset
  // --------------------------------------------------------------------------

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const methods = await getSignInMethodsForEmail(email)
      setSignInMethods(methods)
      setShowResetConfirmation(true)
    } catch (err: unknown) {
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      setError(
        errCode === 'auth/invalid-email'
          ? 'Please enter a valid email'
          : errMessage
      )
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmResetPassword = async () => {
    setLoading(true)
    setError(null)

    try {
      await resetPassword(email)
      setSuccess('Password reset email sent! Check your inbox.')
      setShowResetConfirmation(false)
      setSignInMethods([])
    } catch (err: unknown) {
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      setError(
        errCode === 'auth/user-not-found' ? 'No account found' : errMessage
      )
    } finally {
      setLoading(false)
    }
  }

  // --------------------------------------------------------------------------
  // Mode Switching
  // --------------------------------------------------------------------------

  const switchMode = (newMode: LoginMode) => {
    setMode(newMode)
    setError(null)
    setSuccess(null)
    setShowResetConfirmation(false)
    setSignInMethods([])
  }

  const clearResetConfirmation = () => {
    setShowResetConfirmation(false)
    setSignInMethods([])
  }

  return {
    // State
    mode,
    email,
    password,
    displayName,
    showPassword,
    error,
    success,
    loading,
    signInMethods,
    showResetConfirmation,
    mfaRequired,
    mfaCode,
    mfaPhoneHint,
    authLoading,
    isAuthenticated: !!user,

    // Actions
    setEmail,
    setPassword,
    setDisplayName,
    setShowPassword,
    setMfaCode,
    switchMode,
    handleEmailAuth,
    handleGoogleAuth,
    handleGithubAuth,
    handleForgotPassword,
    handleConfirmResetPassword,
    handleMFAVerify,
    resetMFAState,
    clearResetConfirmation,
  }
}
