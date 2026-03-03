'use client'

import { useState } from 'react'
import { User } from 'firebase/auth'
import { AlertTriangle, Trash2, Loader2, X } from 'lucide-react'
import { logout } from '@/lib/firebase/auth'

interface DangerZoneSectionProps {
  user: User
}

export function DangerZoneSection({ user }: DangerZoneSectionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm')
      return
    }

    setDeleting(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/user/delete-account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete account')
      }

      // Clear local storage
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i)
        if (
          key &&
          (key.includes(user.uid) ||
            key.startsWith('preferences') ||
            key.startsWith('notifications') ||
            key.startsWith('privacy'))
        ) {
          localStorage.removeItem(key)
        }
      }

      // Sign out and redirect
      await logout()
      window.location.href = '/?accountDeleted=true'
    } catch (err: unknown) {
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      if (errCode === 'auth/requires-recent-login') {
        setError(
          'For security, please sign out and sign back in before deleting your account.'
        )
      } else {
        setError(
          errMessage || 'Failed to delete account. Please contact support.'
        )
      }
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Warning Banner */}
      <div className="b-feedback b-feedback-error">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="b-font-medium">Danger Zone</h3>
            <p className="b-text-sm mt-1">
              Actions in this section are irreversible. Please proceed with
              caution.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="b-p-lg border border-red-200 b-rounded-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="b-font-medium b-text-primary">Delete Account</h4>
            <p className="b-text-sm b-text-muted mt-1">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="b-btn b-btn-danger b-btn-md flex items-center gap-2 flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="b-modal-backdrop">
          <div className="b-modal b-modal-sm">
            {/* Modal Header */}
            <div className="flex items-center justify-between b-p-xl b-border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 b-bg-error-light b-rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 b-text-error" />
                </div>
                <h3 className="b-text-lg b-font-semibold b-text-primary">
                  Delete Account
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setConfirmText('')
                  setError(null)
                }}
                className="p-2 hover:b-bg-muted b-rounded-lg transition-colors"
              >
                <X className="w-5 h-5 b-text-muted" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="b-p-xl">
              <p className="b-text-secondary b-mb-lg">
                This will permanently delete your account including:
              </p>
              <ul className="b-text-sm b-text-secondary b-mb-xl space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 b-bg-error b-rounded-full"></span>
                  All your learning progress and history
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 b-bg-error b-rounded-full"></span>
                  Earned badges and achievements
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 b-bg-error b-rounded-full"></span>
                  Profile and settings data
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 b-bg-error b-rounded-full"></span>
                  Any remaining credits (not refundable)
                </li>
              </ul>

              <div className="b-bg-muted b-rounded-lg b-p-lg b-mb-lg">
                <p className="b-text-sm b-text-secondary b-mb-sm">
                  Account: <strong>{user.email}</strong>
                </p>
                <p className="b-text-sm b-text-secondary">
                  Type <strong>DELETE</strong> to confirm:
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                  placeholder="DELETE"
                  className="b-input w-full b-mt-sm"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="b-feedback b-feedback-error b-text-sm b-mb-lg">
                  {error}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 b-p-xl b-border-t b-bg-muted b-rounded-b-xl">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setConfirmText('')
                  setError(null)
                }}
                className="b-btn b-btn-secondary b-btn-md flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={confirmText !== 'DELETE' || deleting}
                className="b-btn b-btn-danger b-btn-md flex-1 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Forever
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Alternative */}
      <div className="b-p-lg b-bg-muted b-rounded-lg">
        <p className="b-text-sm b-text-secondary">
          <strong>Need help?</strong> If you&apos;re having issues with your
          account, consider contacting support before deleting. We may be able
          to help resolve your concerns.
        </p>
        <a
          href="mailto:support@ludwitt.com"
          className="inline-block mt-2 b-text-sm b-text-logic b-font-medium"
        >
          Contact Support →
        </a>
      </div>
    </div>
  )
}
