/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/ClientProvider'
import {
  createApiKey,
  getUserApiKeys,
  revokeApiKey,
  updateApiKey,
  getApiKeyUsage,
} from '@/lib/api/apiKeyManager'
import type { ApiKey, ApiPermission, ApiKeyUsage } from '@/lib/api/types'
import { useToast } from '@/components/ui/Toast'

const AVAILABLE_PERMISSIONS: {
  value: ApiPermission
  label: string
  description: string
}[] = [
  {
    value: 'read:user',
    label: 'Read User',
    description: 'Read user profile information',
  },
  {
    value: 'write:user',
    label: 'Write User',
    description: 'Update user profile',
  },
  {
    value: 'read:projects',
    label: 'Read Projects',
    description: 'Read user projects',
  },
  {
    value: 'write:projects',
    label: 'Write Projects',
    description: 'Create and update projects',
  },
  {
    value: 'read:achievements',
    label: 'Read Achievements',
    description: 'Read achievements and stats',
  },
  {
    value: 'read:portfolio',
    label: 'Read Portfolio',
    description: 'Read portfolio items',
  },
  {
    value: 'write:portfolio',
    label: 'Write Portfolio',
    description: 'Create and update portfolio items',
  },
  {
    value: 'read:cohorts',
    label: 'Read Cohorts',
    description: 'Read cohort information',
  },
  {
    value: 'write:cohorts',
    label: 'Write Cohorts',
    description: 'Join and leave cohorts',
  },
  {
    value: 'read:stats',
    label: 'Read Stats',
    description: 'Read statistics and analytics',
  },
]

export default function ApiKeysPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newKeyCreated, setNewKeyCreated] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<
    ApiPermission[]
  >([])
  const [expiresInDays, setExpiresInDays] = useState<number | undefined>(
    undefined
  )

  const loadApiKeys = useCallback(async () => {
    if (!user) return

    try {
      const keys = await getUserApiKeys(user.uid)
      setApiKeys(keys)
    } catch (error) {
      showToast('Failed to load API keys', 'error')
    } finally {
      setLoading(false)
    }
  }, [user, showToast])

  useEffect(() => {
    if (user) {
      loadApiKeys()
    }
  }, [user, loadApiKeys])

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const newKey = await createApiKey(
        user.uid,
        name,
        selectedPermissions,
        expiresInDays
      )
      setNewKeyCreated(newKey.key)
      setShowCreateForm(false)
      setName('')
      setSelectedPermissions([])
      setExpiresInDays(undefined)
      loadApiKeys()
    } catch (error) {
      showToast('Failed to create API key', 'error')
    }
  }

  const handleRevokeKey = async (keyId: string) => {
    if (
      !confirm(
        'Are you sure you want to revoke this API key? This action cannot be undone.'
      )
    ) {
      return
    }

    try {
      await revokeApiKey(keyId)
      showToast('API key revoked', 'success')
      loadApiKeys()
    } catch (error) {
      showToast('Failed to revoke API key', 'error')
    }
  }

  const togglePermission = (permission: ApiPermission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen b-bg-page py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="b-animate-pulse">
            <div className="h-8 b-bg-muted b-rounded-md w-1/4 b-mb-md" />
            <div className="h-4 b-bg-muted b-rounded-md w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen b-bg-page py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="b-mb-xl">
          <h1 className="b-text-3xl b-font-bold b-text-primary b-mb-sm">
            API Keys
          </h1>
          <p className="b-text-secondary">
            Create and manage API keys for accessing Ludwitt programmatically
          </p>
        </div>

        {/* API Documentation Link */}
        <div className="b-mb-lg b-p-lg b-bg-info-light b-border b-border-info b-rounded-lg">
          <h3 className="b-font-semibold b-text-info-dark b-mb-sm">
            API Documentation
          </h3>
          <p className="b-text-sm b-text-info-dark b-mb-sm">
            View our REST API documentation to learn how to integrate with
            Ludwitt.
          </p>
          <Link
            href="/developers/api"
            className="b-text-sm b-text-link b-font-medium"
          >
            View API Docs →
          </Link>
        </div>

        {/* New key created modal */}
        {newKeyCreated && (
          <div className="b-mb-lg b-p-xl b-bg-success-light border-2 border-[var(--b-success)] b-rounded-lg">
            <h3 className="b-font-bold b-text-success-dark b-mb-sm flex items-center gap-2">
              <span className="b-text-2xl">✓</span>
              API Key Created Successfully
            </h3>
            <p className="b-text-sm b-text-success-dark b-mb-md">
              This is the only time you&apos;ll see this key. Copy it now and
              store it securely.
            </p>
            <div className="b-bg-elevated b-p-md b-rounded-md b-border border-[var(--b-success-border)] font-mono b-text-sm break-all b-mb-md">
              {newKeyCreated}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(newKeyCreated)
                showToast('Copied to clipboard', 'success')
              }}
              className="b-btn b-btn-success b-btn-md mr-2"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => setNewKeyCreated(null)}
              className="b-btn b-btn-secondary b-btn-md"
            >
              Close
            </button>
          </div>
        )}

        {/* Create button */}
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="b-btn b-btn-logic b-btn-md b-mb-lg"
          >
            + Create API Key
          </button>
        )}

        {/* Create form */}
        {showCreateForm && (
          <div className="b-card b-card-elevated b-p-xl b-mb-lg">
            <h2 className="b-text-xl b-font-bold b-mb-md">
              Create New API Key
            </h2>
            <form onSubmit={handleCreateKey}>
              <div className="b-mb-md">
                <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
                  Key Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Production API, Development, Mobile App"
                  className="b-input"
                  required
                />
              </div>

              <div className="b-mb-md">
                <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
                  Expiration (Optional)
                </label>
                <select
                  value={expiresInDays || ''}
                  onChange={(e) =>
                    setExpiresInDays(
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="b-input"
                >
                  <option value="">Never expires</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>

              <div className="b-mb-lg">
                <label className="block b-text-sm b-font-medium b-text-primary b-mb-md">
                  Permissions
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {AVAILABLE_PERMISSIONS.map((permission) => (
                    <label
                      key={permission.value}
                      className="flex items-start b-p-md b-border b-rounded-lg hover:b-bg-muted cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.value)}
                        onChange={() => togglePermission(permission.value)}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="b-font-medium b-text-primary">
                          {permission.label}
                        </div>
                        <div className="b-text-sm b-text-muted">
                          {permission.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!name || selectedPermissions.length === 0}
                  className="b-btn b-btn-logic b-btn-md"
                >
                  Create API Key
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false)
                    setName('')
                    setSelectedPermissions([])
                    setExpiresInDays(undefined)
                  }}
                  className="b-btn b-btn-secondary b-btn-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* API Keys list */}
        {apiKeys.length === 0 ? (
          <div className="b-card b-card-elevated b-p-2xl text-center">
            <div className="b-text-4xl b-mb-md">🔑</div>
            <h3 className="b-text-xl b-font-bold b-text-primary b-mb-sm">
              No API Keys Yet
            </h3>
            <p className="b-text-secondary b-mb-lg">
              Create your first API key to start building integrations
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((apiKey) => {
              const isExpired =
                apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()

              return (
                <div key={apiKey.id} className="b-card b-card-elevated b-p-xl">
                  <div className="flex items-start justify-between b-mb-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 b-mb-sm">
                        <h3 className="b-font-bold b-text-lg b-text-primary">
                          {apiKey.name}
                        </h3>
                        <span
                          className={`b-badge ${
                            isExpired
                              ? 'b-badge-danger'
                              : apiKey.enabled
                                ? 'b-badge-success'
                                : 'b-badge-default'
                          }`}
                        >
                          {isExpired
                            ? 'Expired'
                            : apiKey.enabled
                              ? 'Active'
                              : 'Disabled'}
                        </span>
                      </div>
                      <div className="font-mono b-text-sm b-text-secondary b-mb-md">
                        {apiKey.keyPrefix}...
                      </div>
                      <div className="flex flex-wrap gap-2 b-mb-md">
                        {apiKey.permissions.map((permission) => (
                          <span
                            key={permission}
                            className="b-badge b-badge-logic"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                      <div className="b-text-sm b-text-secondary">
                        <span>
                          Created{' '}
                          {new Date(apiKey.createdAt).toLocaleDateString()}
                        </span>
                        {apiKey.lastUsed && (
                          <span className="ml-4">
                            Last used{' '}
                            {new Date(apiKey.lastUsed).toLocaleDateString()}
                          </span>
                        )}
                        {apiKey.expiresAt && (
                          <span className="ml-4">
                            Expires{' '}
                            {new Date(apiKey.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRevokeKey(apiKey.id)}
                      className="b-btn b-btn-danger-outline b-btn-sm"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* API Usage Example */}
        <div className="b-mt-xl b-card b-card-elevated b-p-xl">
          <h2 className="b-text-xl b-font-bold b-mb-md">Example Usage</h2>
          <pre className="b-bg-code b-text-code-text b-p-lg b-rounded-lg overflow-x-auto b-text-sm">
            {`# Get your user profile
curl -X GET https://your-domain.com/api/v1/user \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Create a new project
curl -X POST https://your-domain.com/api/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My Awesome Project",
    "description": "A cool project I built",
    "status": "completed",
    "githubRepo": "https://github.com/username/repo",
    "techStack": ["React", "Node.js", "TypeScript"]
  }'`}
          </pre>
        </div>
      </div>
    </div>
  )
}
