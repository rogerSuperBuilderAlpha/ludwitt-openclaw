'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLoginAuth } from '@/lib/hooks/useLoginAuth'
import { LeftPanel } from '@/components/auth/LoginLeftPanel'
import { MFAVerification } from '@/components/auth/MFAVerification'
import {
  GoogleIcon, GithubIcon, MailIcon, LockIcon, UserIcon,
  EyeIcon, EyeSlashIcon, CheckCircleIcon, AlertIcon,
} from '@/components/auth/LoginIcons'

const INPUT_BASE = 'w-full pl-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent'
const INPUT_CLASS = INPUT_BASE + ' pr-4'
const INPUT_CLASS_PW = INPUT_BASE + ' pr-12'
const SUBMIT_CLASS = 'w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25'

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  )
}

function LoginForm() {
  const {
    mode, email, password, displayName, showPassword,
    error, success, loading, signInMethods, showResetConfirmation,
    mfaRequired, mfaCode, mfaPhoneHint, authLoading, isAuthenticated,
    setEmail, setPassword, setDisplayName, setShowPassword, setMfaCode,
    switchMode, handleEmailAuth, handleGoogleAuth, handleGithubAuth,
    handleForgotPassword, handleConfirmResetPassword,
    handleMFAVerify, resetMFAState, clearResetConfirmation,
  } = useLoginAuth()

  if (authLoading) return <LoadingSpinner />
  if (isAuthenticated) return null

  const headerText = { signin: 'Welcome back', signup: 'Create your account', forgot: 'Reset password' }
  const subtitleText = { signin: 'Sign in to continue learning', signup: 'Start your learning journey', forgot: "We'll send you a reset link" }
  const submitLabel = { signin: 'Sign In', signup: 'Create Account', forgot: 'Send Reset Link' }
  const loadingLabel = { signin: 'Signing in...', signup: 'Creating account...', forgot: 'Sending...' }

  return (
    <div className="min-h-screen flex">
      <LeftPanel />
      <div className="w-full lg:w-[45%] min-h-screen bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 p-1.5 ring-1 ring-gray-200">
              <Image src="/logos/logo.png" alt="Ludwitt" width={48} height={48} className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-900">Ludwitt</span>
          </div>

          {/* reCAPTCHA container - MUST stay in page DOM */}
          <div id="recaptcha-container-login" />

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{headerText[mode]}</h2>
            <p className="text-gray-500">{subtitleText[mode]}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm flex-1">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-700 text-sm">{success}</p>
                <button onClick={() => switchMode('signin')} className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium">
                  Return to Sign In
                </button>
              </div>
            </div>
          )}

          {mfaRequired ? (
            <MFAVerification mfaCode={mfaCode} onMfaCodeChange={setMfaCode} onVerify={handleMFAVerify}
              onCancel={resetMFAState} isLoading={loading} phoneHint={mfaPhoneHint} />
          ) : (
            <>
              {mode !== 'forgot' && (
                <>
                  <div className="space-y-3 mb-6">
                    <button onClick={handleGoogleAuth} disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 shadow-sm">
                      <GoogleIcon className="w-5 h-5" />Continue with Google
                    </button>
                    <button onClick={handleGithubAuth} disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50">
                      <GithubIcon className="w-5 h-5" />Continue with GitHub
                    </button>
                  </div>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-gray-400 text-sm">or continue with email</span>
                    </div>
                  </div>
                </>
              )}

              {mode === 'forgot' && showResetConfirmation ? (
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Send reset link to <span className="text-amber-600 font-medium">{email}</span>?
                  </p>
                  {signInMethods.length > 0 && signInMethods.some(m => m === 'google.com' || m === 'github.com') && (
                    <p className="text-sm text-amber-600 mb-4">
                      You can also sign in with {signInMethods.filter(m => m !== 'password').map(m => m === 'google.com' ? 'Google' : 'GitHub').join(' or ')}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => switchMode('signin')} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all">Cancel</button>
                    <button onClick={handleConfirmResetPassword} disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl disabled:opacity-50">
                      {loading ? 'Sending...' : 'Send Link'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={mode === 'forgot' ? handleForgotPassword : handleEmailAuth} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                        className={INPUT_CLASS} placeholder="Your name" required />
                    </div>
                  )}
                  <div className="relative">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (showResetConfirmation) clearResetConfirmation() }}
                      className={INPUT_CLASS} placeholder="Email address" required />
                  </div>
                  {mode !== 'forgot' && (
                    <div>
                      <div className="relative">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                          className={INPUT_CLASS_PW} placeholder="Password" required minLength={6} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                      </div>
                      {mode === 'signin' && (
                        <div className="mt-2 text-right">
                          <button type="button" onClick={() => switchMode('forgot')} className="text-sm text-amber-600 hover:text-amber-700">Forgot password?</button>
                        </div>
                      )}
                    </div>
                  )}
                  <button type="submit" disabled={loading} className={SUBMIT_CLASS}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {loadingLabel[mode]}
                      </span>
                    ) : submitLabel[mode]}
                  </button>
                </form>
              )}

              {mode === 'signup' && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-700">
                    <strong className="text-amber-800">Age Requirement:</strong> Children under 13 require parental consent to register per COPPA regulations.
                  </p>
                </div>
              )}

              <div className="mt-8 text-center">
                {mode === 'forgot' ? (
                  <button onClick={() => switchMode('signin')} className="text-sm text-gray-500 hover:text-gray-700">Back to sign in</button>
                ) : (
                  <p className="text-gray-500">
                    {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')} className="text-amber-600 hover:text-amber-700 font-medium">
                      {mode === 'signin' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                )}
              </div>
            </>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              By continuing, you agree to our{' '}
              <Link href="/legal/terms-of-service" className="text-gray-500 hover:text-gray-700 underline">Terms</Link>{' '}and{' '}
              <Link href="/legal/privacy-policy" className="text-gray-500 hover:text-gray-700 underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginForm />
    </Suspense>
  )
}
