'use client'

import { useState, useEffect, useCallback } from 'react'
import { User } from 'firebase/auth'
import {
  getLinkedProviders,
  hasProviderLinked,
  linkGoogleToAccount,
  linkGithubToAccount,
  unlinkProvider,
  addPasswordToAccount,
  LinkedProvider,
} from '@/lib/firebase/auth'
import {
  Link2,
  Unlink,
  Plus,
  Lock,
  Chrome,
  Github,
  Mail,
  Check,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
} from 'lucide-react'

interface LoginConnectionsSectionProps {
  user: User
  onUserUpdate?: () => void
}

export function LoginConnectionsSection({
  user,
  onUserUpdate,
}: LoginConnectionsSectionProps) {
  const [providers, setProviders] = useState<LinkedProvider[]>([])
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Add password form state
  const [showAddPassword, setShowAddPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Confirmation modal state
  const [confirmUnlink, setConfirmUnlink] = useState<string | null>(null)

  const refreshProviders = useCallback(() => {
    const linked = getLinkedProviders(user)
    setProviders(linked)
  }, [user])

  useEffect(() => {
    refreshProviders()
  }, [refreshProviders])

  const handleLinkGoogle = async () => {
    setLoading('google.com')
    setError(null)
    setSuccess(null)

    try {
      await linkGoogleToAccount()
      setSuccess('Google account linked successfully!')
      refreshProviders()
      onUserUpdate?.()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to link Google account')
    } finally {
      setLoading(null)
    }
  }

  const handleLinkGithub = async () => {
    setLoading('github.com')
    setError(null)
    setSuccess(null)

    try {
      await linkGithubToAccount(user)
      setSuccess('GitHub account linked successfully!')
      refreshProviders()
      onUserUpdate?.()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to link GitHub account')
    } finally {
      setLoading(null)
    }
  }

  const handleUnlinkProvider = async (providerId: string) => {
    setLoading(providerId)
    setError(null)
    setSuccess(null)
    setConfirmUnlink(null)

    try {
      await unlinkProvider(providerId)
      setSuccess(`${getProviderName(providerId)} disconnected successfully!`)
      refreshProviders()
      onUserUpdate?.()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to unlink provider')
    } finally {
      setLoading(null)
    }
  }

  const handleAddPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading('password')
    setError(null)
    setSuccess(null)

    try {
      await addPasswordToAccount(newPassword)
      setSuccess(
        'Password added successfully! You can now sign in with email and password.'
      )
      setShowAddPassword(false)
      setNewPassword('')
      setConfirmPassword('')
      refreshProviders()
      onUserUpdate?.()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to add password')
    } finally {
      setLoading(null)
    }
  }

  const getProviderName = (providerId: string): string => {
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

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'google.com':
        return <Chrome className="w-5 h-5 text-blue-600" />
      case 'github.com':
        return <Github className="w-5 h-5 text-gray-900" />
      case 'password':
        return <Mail className="w-5 h-5 text-purple-600" />
      default:
        return <Lock className="w-5 h-5 text-gray-600" />
    }
  }

  const hasGoogle = hasProviderLinked(user, 'google.com')
  const hasGithub = hasProviderLinked(user, 'github.com')
  const hasPassword = hasProviderLinked(user, 'password')
  const canUnlink = providers.length > 1

  return (
    <div className="space-y-4">
      {/* Error/Success Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Connected Providers */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          Connected Sign-in Methods
        </h3>

        {providers.map((provider) => (
          <div
            key={provider.providerId}
            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getProviderIcon(provider.providerId)}
              <div>
                <p className="font-medium text-gray-900">
                  {provider.displayName}
                </p>
                {provider.email && (
                  <p className="text-xs text-gray-500">{provider.email}</p>
                )}
              </div>
            </div>

            {canUnlink ? (
              confirmUnlink === provider.providerId ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Remove?</span>
                  <button
                    onClick={() => handleUnlinkProvider(provider.providerId)}
                    disabled={loading === provider.providerId}
                    className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    {loading === provider.providerId ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Yes'
                    )}
                  </button>
                  <button
                    onClick={() => setConfirmUnlink(null)}
                    className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmUnlink(provider.providerId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Unlink className="w-4 h-4" />
                  Remove
                </button>
              )
            ) : (
              <span className="text-xs text-gray-400 italic">
                Only sign-in method
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Add New Connection */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add Sign-in Method
        </h3>

        <div className="space-y-2">
          {/* Google */}
          {!hasGoogle && (
            <button
              onClick={handleLinkGoogle}
              disabled={loading === 'google.com'}
              className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Chrome className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">
                  Connect Google
                </span>
              </div>
              {loading === 'google.com' ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              ) : (
                <Plus className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )}

          {/* GitHub */}
          {!hasGithub && (
            <button
              onClick={handleLinkGithub}
              disabled={loading === 'github.com'}
              className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-gray-900" />
                <span className="font-medium text-gray-700">
                  Connect GitHub
                </span>
              </div>
              {loading === 'github.com' ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              ) : (
                <Plus className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )}

          {/* Password */}
          {!hasPassword && !showAddPassword && (
            <button
              onClick={() => setShowAddPassword(true)}
              className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-700">Add Password</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          )}

          {/* Add Password Form */}
          {!hasPassword && showAddPassword && (
            <form
              onSubmit={handleAddPassword}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-gray-800">
                  Set a Password
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-3">
                Add a password so you can also sign in with email ({user.email})
              </p>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password (min 6 characters)"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                minLength={6}
                required
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPassword(false)
                    setNewPassword('')
                    setConfirmPassword('')
                    setError(null)
                  }}
                  className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading === 'password'}
                  className="flex-1 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading === 'password' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Password'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* All connected message */}
          {hasGoogle && hasGithub && hasPassword && (
            <p className="text-sm text-gray-500 text-center py-2">
              All sign-in methods are connected
            </p>
          )}
        </div>
      </div>

      {/* Security Note */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          <strong>Tip:</strong> Adding multiple sign-in methods gives you backup
          ways to access your account. You must keep at least one sign-in method
          connected.
        </p>
      </div>
    </div>
  )
}
