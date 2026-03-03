'use client'

import { useState } from 'react'
import { User } from 'firebase/auth'
import { changePassword, hasProviderLinked } from '@/lib/firebase/auth'
import { Lock, Eye, EyeOff, Check, Loader2, AlertTriangle } from 'lucide-react'

interface PasswordChangeSectionProps {
  user: User
}

export function PasswordChangeSection({ user }: PasswordChangeSectionProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const hasPassword = hasProviderLinked(user, 'password')

  if (!hasPassword) {
    return (
      <div className="b-p-lg b-bg-muted b-border b-rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 b-text-muted mt-0.5" />
          <div>
            <p className="b-text-sm b-text-secondary">
              You signed up with a social account and don&apos;t have a password
              set.
            </p>
            <p className="b-text-sm b-text-muted mt-1">
              You can add a password in the <strong>Login Connections</strong>{' '}
              section above.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword === currentPassword) {
      setError('New password must be different from current password')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await changePassword(currentPassword, newPassword)
      setSuccess('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccess(null), 5000)
    } catch (err: unknown) {
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      if (errCode === 'auth/wrong-password') {
        setError('Current password is incorrect')
      } else if (errCode === 'auth/weak-password') {
        setError('New password is too weak. Please choose a stronger password.')
      } else if (errCode === 'auth/requires-recent-login') {
        setError(
          'For security, please sign out and sign back in before changing your password.'
        )
      } else {
        setError(errMessage || 'Failed to change password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleChangePassword} className="space-y-4">
      {/* Error/Success Messages */}
      {error && (
        <div className="b-feedback b-feedback-error b-text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {success && (
        <div className="b-feedback b-feedback-success b-text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Current Password */}
      <div>
        <label
          htmlFor="current-password"
          className="block b-text-sm b-font-medium b-text-secondary b-mb-sm"
        >
          Current Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 b-text-muted" />
          <input
            id="current-password"
            type={showPasswords ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="b-input pl-10 pr-10"
            placeholder="Enter current password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="absolute right-3 top-1/2 -translate-y-1/2 b-text-muted hover:b-text-secondary"
          >
            {showPasswords ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label
          htmlFor="new-password"
          className="block b-text-sm b-font-medium b-text-secondary b-mb-sm"
        >
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 b-text-muted" />
          <input
            id="new-password"
            type={showPasswords ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="b-input pl-10 pr-4"
            placeholder="Enter new password (min 6 characters)"
            minLength={6}
            required
          />
        </div>
      </div>

      {/* Confirm New Password */}
      <div>
        <label
          htmlFor="confirm-password"
          className="block b-text-sm b-font-medium b-text-secondary b-mb-sm"
        >
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 b-text-muted" />
          <input
            id="confirm-password"
            type={showPasswords ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="b-input pl-10 pr-4"
            placeholder="Confirm new password"
            minLength={6}
            required
          />
        </div>
        {newPassword && confirmPassword && newPassword !== confirmPassword && (
          <p className="b-text-xs b-text-danger mt-1">Passwords do not match</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          loading || !currentPassword || !newPassword || !confirmPassword
        }
        className="b-btn b-btn-logic b-btn-full b-btn-md flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Changing Password...
          </>
        ) : (
          'Change Password'
        )}
      </button>

      <p className="b-text-xs b-text-muted text-center">
        Make sure to use a strong, unique password that you don&apos;t use
        elsewhere.
      </p>
    </form>
  )
}
