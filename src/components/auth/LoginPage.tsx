/** @deprecated This login page is only used by the deprecated campaign page. Use the main /login route instead. */
'use client'

import { useState, useEffect } from 'react'
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { GitHubSetupGuide } from './GitHubSetupGuide'
import { githubSetupSteps } from '@/data/steps/githubSetupSteps'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

interface LoginPageProps {
  onLoginSuccess?: () => void
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)
  const [pendingCredential, setPendingCredential] = useState<any>(null)
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)

  // Check if all GitHub setup steps are completed
  useEffect(() => {
    const checkSetupProgress = () => {
      const savedProgress = localStorage.getItem('github-setup-progress')
      if (savedProgress) {
        try {
          const checkedSteps = JSON.parse(savedProgress)
          const allStepsComplete = githubSetupSteps.every(
            (step) => checkedSteps[step.id]
          )
          setSetupComplete(allStepsComplete)
        } catch {
          setSetupComplete(false)
        }
      } else {
        setSetupComplete(false)
      }
    }

    // Check on mount
    checkSetupProgress()

    // Listen for progress changes via custom event (more efficient than polling)
    window.addEventListener('github-setup-progress-changed', checkSetupProgress)
    return () =>
      window.removeEventListener(
        'github-setup-progress-changed',
        checkSetupProgress
      )
  }, [])

  const handleGitHubLogin = async () => {
    setError(null)
    setIsLoggingIn(true)

    try {
      const provider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // Check if this is a brand new user by checking if their Firestore document exists
      // This is more reliable than comparing timestamps
      const userDoc = await getDoc(doc(db, 'users', result.user.uid))
      const isNewUser = !userDoc.exists()

      // If it's a new user, check if they've completed setup steps
      if (isNewUser && !setupComplete) {
        // Sign them out
        await auth.signOut()
        setError(
          'Please complete all GitHub setup steps below before signing in.'
        )
        setIsLoggingIn(false)
        return
      }

      // Clear setup progress on successful login
      localStorage.removeItem('github-setup-progress')
      onLoginSuccess?.()
    } catch (error: unknown) {
      const errCode =
        error instanceof Error && 'code' in error
          ? (error as { code: string }).code
          : undefined
      const errMessage = error instanceof Error ? error.message : String(error)
      if (errCode === 'auth/account-exists-with-different-credential') {
        try {
          // Get the pending GitHub credential
          const pendingCred = GithubAuthProvider.credentialFromError(
            error as Parameters<
              typeof GithubAuthProvider.credentialFromError
            >[0]
          )

          if (pendingCred) {
            // Save the pending credential to state (not localStorage for popup flow)
            setPendingCredential(pendingCred)
            const customData =
              error instanceof Error && 'customData' in error
                ? (error as { customData?: { email?: string } }).customData
                : undefined
            setPendingEmail(customData?.email || null)
            setError(null) // Clear error, show the link button instead
          } else {
            setError('Failed to extract account information. Please try again.')
          }
        } catch {
          setError('Failed to process account linking. Please try again.')
        }
      } else if (errCode === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.')
      } else if (errCode === 'auth/popup-blocked') {
        setError(
          'Pop-up was blocked by your browser. Please allow pop-ups for this site.'
        )
      } else {
        setError(
          errMessage || 'Failed to sign in with GitHub. Please try again.'
        )
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLinkAccounts = async () => {
    if (!pendingCredential) {
      setError('No pending credential found. Please try signing in again.')
      return
    }

    setIsLoggingIn(true)
    setError(null)

    try {
      // Sign in with Google (this popup is from a user click, so won't be blocked)
      const googleProvider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, googleProvider)

      // Now link the GitHub credential to this Google account
      await linkWithCredential(result.user, pendingCredential)

      // Clear pending credential
      setPendingCredential(null)
      setPendingEmail(null)
      localStorage.removeItem('github-setup-progress')

      onLoginSuccess?.()
    } catch (linkError: unknown) {
      const errCode =
        linkError instanceof Error && 'code' in linkError
          ? (linkError as { code: string }).code
          : undefined
      const errMessage =
        linkError instanceof Error ? linkError.message : String(linkError)
      if (errCode === 'auth/credential-already-in-use') {
        setError('This GitHub account is already linked to another account.')
      } else if (errCode === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.')
      } else if (errCode === 'auth/popup-blocked') {
        setError(
          'Pop-up was blocked by your browser. Please allow pop-ups for this site.'
        )
      } else {
        setError(errMessage || 'Failed to link accounts. Please try again.')
      }

      // Keep the pending credential so user can try again
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <main
      className="relative flex min-h-screen max-h-screen flex-col items-center px-6 py-12 overflow-hidden transition-all duration-700 ease-in-out"
      style={{ justifyContent: 'center' }}
    >
      {/* Main Content */}
      <div className="w-full max-w-md text-center space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">Ludwitt</h1>
          <p className="text-gray-600">Elevate your game</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 fade-in-scale">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Account Linking Prompt */}
        {pendingCredential && !error && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 fade-in-scale">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-blue-900 font-bold text-lg">
                    Account Already Exists
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-3 border border-blue-100">
                  <p className="text-blue-900 text-sm font-medium">
                    We found an existing account for{' '}
                    <span className="font-semibold">
                      {pendingEmail || 'this email'}
                    </span>
                  </p>
                  <p className="text-blue-800 text-sm mt-2">
                    You previously signed up with <strong>Google</strong>. To
                    use <strong>GitHub</strong> sign-in, we need to link both
                    accounts together.
                  </p>
                </div>
                <details className="text-left">
                  <summary className="text-xs text-blue-700 cursor-pointer hover:text-blue-900 font-medium">
                    Why do I need to link accounts?
                  </summary>
                  <div className="mt-2 text-xs text-blue-800 bg-white/40 rounded p-2 border border-blue-100">
                    <p className="mb-1">
                      • <strong>One Account, Multiple Sign-in Methods:</strong>{' '}
                      You can use either Google or GitHub to log in
                    </p>
                    <p className="mb-1">
                      • <strong>Security:</strong> Prevents duplicate accounts
                      and keeps your data secure
                    </p>
                    <p>
                      • <strong>Convenience:</strong> Access your work from
                      either provider
                    </p>
                  </div>
                </details>
              </div>
              <button
                onClick={handleLinkAccounts}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>
                  {isLoggingIn
                    ? 'Linking accounts...'
                    : 'Continue with Google to Link Accounts'}
                </span>
              </button>
              <button
                onClick={() => {
                  setPendingCredential(null)
                  setPendingEmail(null)
                }}
                disabled={isLoggingIn}
                className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sign-in Options */}
        <div className="space-y-4">
          {/* Setup Completion Status */}
          {!setupComplete && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-amber-800 text-sm font-medium mb-1">
                New users: Complete setup steps below
              </p>
              <p className="text-amber-700 text-xs">
                If you already have an account, you can sign in directly
              </p>
            </div>
          )}

          {/* GitHub Login Button */}
          <button
            onClick={handleGitHubLogin}
            disabled={isLoggingIn}
            className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg transition-all ${
              !isLoggingIn
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              {isLoggingIn ? 'Signing in...' : 'Continue with GitHub'}
            </span>
          </button>
        </div>

        {/* Setup Guide */}
        <GitHubSetupGuide />

        {/* COPPA Notice */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-left">
              <p className="font-medium text-amber-800 mb-1">
                Age Requirement (COPPA)
              </p>
              <p className="text-amber-700">
                Children under 13 years old are{' '}
                <strong>not permitted to register</strong> without parental
                consent. If you are under 13, a parent or guardian must create
                and manage your account on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Notice & Policies */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <Link
              href="/legal/terms-of-service"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/legal/privacy-policy"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Privacy Policy
            </Link>
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <Link
              href="/legal/student-privacy"
              className="hover:text-gray-700 underline"
            >
              Student Privacy
            </Link>
            <span>•</span>
            <Link
              href="/legal/data-policy"
              className="hover:text-gray-700 underline"
            >
              Data Policy
            </Link>
            <span>•</span>
            <Link
              href="/legal/cookie-policy"
              className="hover:text-gray-700 underline"
            >
              Cookie Policy
            </Link>
            <span>•</span>
            <Link
              href="/legal/acceptable-use"
              className="hover:text-gray-700 underline"
            >
              Acceptable Use
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
