'use client'

import { useState } from 'react'
import { sendEmailVerification, User } from 'firebase/auth'

interface EmailVerificationBannerProps {
  user: User
}

export function EmailVerificationBanner({ user }: EmailVerificationBannerProps) {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (user.emailVerified || !user.email) return null

  // Only show for email/password users
  const hasPasswordProvider = user.providerData?.some(p => p.providerId === 'password')
  if (!hasPasswordProvider) return null

  const handleResend = async () => {
    setSending(true)
    try {
      await sendEmailVerification(user)
      setSent(true)
    } catch {
      // Silently handle - rate limiting etc.
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
      <span>Please verify your email address. </span>
      {sent ? (
        <span className="font-medium">Verification email sent!</span>
      ) : (
        <button
          onClick={handleResend}
          disabled={sending}
          className="font-medium underline hover:no-underline disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Resend verification email'}
        </button>
      )}
    </div>
  )
}
