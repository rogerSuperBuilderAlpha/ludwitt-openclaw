/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Plugs,
  GoogleLogo,
  GithubLogo,
  SlackLogo,
  Link as LinkIcon,
  Check,
  Warning,
  ArrowSquareOut,
  Key,
  Trash,
  X,
  Copy,
  Eye,
  EyeSlash,
  Spinner,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevBadge,
  DevSkeleton,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { IntegrationConnectionPublic } from '@/lib/types/integrations'
import { logger } from '@/lib/logger'

interface ApiKeyPublic {
  id: string
  name: string
  type: 'live' | 'test'
  prefix: string
  lastFourChars: string
  createdAt: string
  lastUsedAt: string | null
  expiresAt: string | null
  isRevoked: boolean
  totalRequests: number
  scopes: string[]
}

const integrationDefs = [
  {
    id: 'google-drive' as const,
    name: 'Google Drive',
    description: 'Access and store documents in Google Drive',
    icon: <GoogleLogo size={32} weight="fill" />,
    features: ['Document storage', 'File sync', 'Shared folders'],
    authorizeEndpoint: '/api/integrations/google-drive/authorize',
    disconnectEndpoint: '/api/integrations/google-drive/disconnect',
  },
  {
    id: 'github' as const,
    name: 'GitHub',
    description: 'Connect repositories for code documentation',
    icon: <GithubLogo size={32} weight="fill" />,
    features: ['Code snippets', 'README sync', 'Issue tracking'],
    authorizeEndpoint: '/api/integrations/github/authorize',
    disconnectEndpoint: '/api/integrations/github/disconnect',
  },
  {
    id: 'slack' as const,
    name: 'Slack',
    description: 'Get notifications in your Slack workspace',
    icon: <SlackLogo size={32} weight="fill" />,
    features: ['Notifications', 'Team updates', 'Document sharing'],
    authorizeEndpoint: '/api/integrations/slack/authorize',
    disconnectEndpoint: '/api/integrations/slack/disconnect',
  },
  {
    id: 'webhooks' as const,
    name: 'Webhooks',
    description: 'Send events to external services',
    icon: <LinkIcon size={32} weight="fill" />,
    features: ['Custom events', 'Real-time updates', 'API integration'],
    authorizeEndpoint: null, // Webhooks use different UI
    disconnectEndpoint: null,
  },
]

/**
 * Integrations Page - Connect external services and manage API keys
 */
export default function IntegrationsPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  // Toast message from OAuth callback
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  // Integration states (from real API)
  const [integrations, setIntegrations] = useState<
    IntegrationConnectionPublic[]
  >([])
  const [integrationsLoading, setIntegrationsLoading] = useState(true)
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null)

  // API Keys (from real API)
  const [apiKeys, setApiKeys] = useState<ApiKeyPublic[]>([])
  const [keysLoading, setKeysLoading] = useState(true)

  // Modal state
  const [showCreateKey, setShowCreateKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyType, setNewKeyType] = useState<'live' | 'test'>('test')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Handle OAuth callback params
  useEffect(() => {
    const success = searchParams.get('success')
    const error = searchParams.get('error')
    const provider = searchParams.get('provider')
    const username = searchParams.get('username')
    const email = searchParams.get('email')
    const workspace = searchParams.get('workspace')

    if (success === 'true' && provider) {
      const displayName = username || email || workspace || 'Connected'
      setToast({
        type: 'success',
        message: `Successfully connected ${provider}: ${displayName}`,
      })

      // Clean up URL
      window.history.replaceState({}, '', '/developers/integrations')
    } else if (error && provider) {
      setToast({
        type: 'error',
        message: `Failed to connect ${provider}: ${error}`,
      })
      window.history.replaceState({}, '', '/developers/integrations')
    }

    // Auto-dismiss toast
    if (success || error) {
      const timer = setTimeout(() => setToast(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  // Fetch integrations from real API
  useEffect(() => {
    const fetchIntegrations = async () => {
      if (!user) return
      setIntegrationsLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/integrations', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const json = await res.json()

        if (json.success && json.data?.integrations) {
          setIntegrations(json.data.integrations)
        }
      } catch (err) {
        logger.error('IntegrationsPage', 'Failed to fetch integrations', {
          error: err,
        })
      } finally {
        setIntegrationsLoading(false)
      }
    }

    fetchIntegrations()
  }, [user])

  // Fetch API keys from real API
  useEffect(() => {
    const fetchKeys = async () => {
      if (!user) return
      setKeysLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developer-keys', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const json = await res.json()

        if (json.success && json.data?.keys) {
          setApiKeys(json.data.keys)
        }
      } catch (err) {
        logger.error('IntegrationsPage', 'Failed to fetch API keys', {
          error: err,
        })
      } finally {
        setKeysLoading(false)
      }
    }

    fetchKeys()
  }, [user])

  const handleConnect = async (integrationId: string) => {
    const def = integrationDefs.find((d) => d.id === integrationId)
    if (!def?.authorizeEndpoint || !user) return

    // Webhooks are managed differently
    if (integrationId === 'webhooks') {
      window.location.href = '/developers/webhooks'
      return
    }

    setConnectingId(integrationId)

    try {
      const token = await user.getIdToken()
      const res = await fetch(def.authorizeEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()

      if (json.success && json.data?.authUrl) {
        // Redirect to OAuth provider
        window.location.href = json.data.authUrl
      } else {
        setToast({
          type: 'error',
          message: json.error || 'Failed to start OAuth flow',
        })
      }
    } catch (err) {
      logger.error('IntegrationsPage', 'Failed to connect', { error: err })
      setToast({ type: 'error', message: 'Failed to start OAuth flow' })
    } finally {
      setConnectingId(null)
    }
  }

  const handleDisconnect = async (integrationId: string) => {
    const def = integrationDefs.find((d) => d.id === integrationId)
    if (!def?.disconnectEndpoint || !user) return

    setDisconnectingId(integrationId)

    try {
      const token = await user.getIdToken()
      const res = await fetch(def.disconnectEndpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()

      if (json.success) {
        setIntegrations((prev) => prev.filter((i) => i.type !== integrationId))
        setToast({ type: 'success', message: `Disconnected ${def.name}` })
      } else {
        setToast({
          type: 'error',
          message: json.error || 'Failed to disconnect',
        })
      }
    } catch (err) {
      logger.error('IntegrationsPage', 'Failed to disconnect', { error: err })
      setToast({ type: 'error', message: 'Failed to disconnect' })
    } finally {
      setDisconnectingId(null)
    }
  }

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim() || !user) return

    setCreating(true)

    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/developer-keys', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newKeyName.trim(),
          type: newKeyType,
        }),
      })

      const json = await res.json()

      if (json.success && json.data) {
        setCreatedKey(json.data.fullKey)
        setApiKeys((prev) => [json.data.key, ...prev])
        setNewKeyName('')
      } else {
        setToast({
          type: 'error',
          message: json.error || 'Failed to create API key',
        })
      }
    } catch (err) {
      logger.error('IntegrationsPage', 'Failed to create API key', {
        error: err,
      })
      setToast({ type: 'error', message: 'Failed to create API key' })
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteApiKey = async (keyId: string) => {
    if (!user) return

    setDeleting(keyId)

    try {
      const token = await user.getIdToken()
      const res = await fetch(`/api/developer-keys/${keyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await res.json()

      if (json.success) {
        setApiKeys((prev) => prev.filter((k) => k.id !== keyId))
        setToast({ type: 'success', message: 'API key deleted' })
      } else {
        setToast({
          type: 'error',
          message: json.error || 'Failed to delete API key',
        })
      }
    } catch (err) {
      logger.error('IntegrationsPage', 'Failed to delete API key', {
        error: err,
      })
      setToast({ type: 'error', message: 'Failed to delete API key' })
    } finally {
      setDeleting(null)
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setToast({ type: 'success', message: 'Copied to clipboard' })
  }

  const closeCreateModal = () => {
    setShowCreateKey(false)
    setCreatedKey(null)
    setNewKeyName('')
    setShowKey(false)
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never'
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return 'Never'
      return date.toLocaleDateString()
    } catch {
      return 'Never'
    }
  }

  const getIntegrationState = (id: string) => {
    return integrations.find((i) => i.type === id)
  }

  const connectedCount = integrations.filter((i) => i.connected).length
  const activeKeysCount = apiKeys.filter((k) => !k.isRevoked).length

  return (
    <div className="h-full flex flex-col">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 right-5 py-[var(--dev-space-3)] px-[var(--dev-space-4)] text-white rounded-[var(--dev-radius-md)] z-[1001] shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-[var(--dev-space-2)]"
          style={{
            background:
              toast.type === 'success'
                ? 'var(--dev-accent-success)'
                : 'var(--dev-accent-danger)',
          }}
        >
          {toast.type === 'success' ? (
            <Check size={16} />
          ) : (
            <Warning size={16} />
          )}
          {toast.message}
          <button
            onClick={() => setToast(null)}
            className="bg-transparent border-none cursor-pointer text-white ml-2"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
        <h1 className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-1)]">
          Integrations & API Keys
        </h1>
        <p className="text-[var(--dev-text-muted)] text-[length:var(--dev-text-sm)]">
          Connect services and manage API access • {connectedCount} connected •{' '}
          {activeKeysCount} active keys
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-[var(--dev-space-5)]">
        {/* Integrations Grid */}
        <h2 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-4)] flex items-center gap-[var(--dev-space-2)]">
          <Plugs size={20} />
          Connected Services
        </h2>

        {integrationsLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[var(--dev-space-4)] mb-[var(--dev-space-6)]">
            {[1, 2, 3, 4].map((i) => (
              <DevSkeleton key={i} height={180} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[var(--dev-space-4)] mb-[var(--dev-space-6)]">
            {integrationDefs.map((def) => {
              const state = getIntegrationState(def.id)
              const isConnected = state?.connected || false
              const isConnecting = connectingId === def.id
              const isDisconnecting = disconnectingId === def.id

              return (
                <DevCard
                  key={def.id}
                  padding="md"
                  style={{
                    border: isConnected
                      ? '2px solid var(--dev-accent-success)'
                      : '1px solid var(--dev-border-default)',
                  }}
                >
                  <div className="flex items-start gap-[var(--dev-space-3)]">
                    <div className="w-14 h-14 rounded-[var(--dev-radius-lg)] bg-[var(--dev-bg-muted)] flex items-center justify-center text-[var(--dev-text-primary)] shrink-0">
                      {def.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-[var(--dev-space-2)] mb-1">
                        <span className="font-[var(--dev-font-semibold)]">
                          {def.name}
                        </span>
                        {isConnected && (
                          <DevBadge variant="success" size="sm">
                            <Check size={10} className="mr-0.5" weight="bold" />
                            Connected
                          </DevBadge>
                        )}
                      </div>
                      <p className="text-[length:var(--dev-text-sm)] text-[var(--dev-text-muted)] mb-[var(--dev-space-2)]">
                        {def.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-[var(--dev-space-3)]">
                        {def.features.map((f) => (
                          <span
                            key={f}
                            className="text-[length:var(--dev-text-2xs)] py-0.5 px-1.5 bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-sm)] text-[var(--dev-text-secondary)]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      {isConnected && state?.providerEmail && (
                        <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)] mb-[var(--dev-space-2)]">
                          {state.providerUsername || state.providerEmail}
                          {state.workspaceName && ` • ${state.workspaceName}`}
                          {state.connectedAt &&
                            ` • ${formatDate(state.connectedAt)}`}
                        </div>
                      )}

                      <div className="flex gap-[var(--dev-space-2)]">
                        {isConnected ? (
                          <>
                            <DevButton variant="ghost" size="sm">
                              <ArrowSquareOut size={12} className="mr-1" />
                              Manage
                            </DevButton>
                            <DevButton
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDisconnect(def.id)}
                              disabled={isDisconnecting}
                              className="text-[var(--dev-accent-danger)]"
                            >
                              {isDisconnecting ? (
                                <Spinner size={12} />
                              ) : (
                                'Disconnect'
                              )}
                            </DevButton>
                          </>
                        ) : (
                          <DevButton
                            variant="primary"
                            size="sm"
                            onClick={() => handleConnect(def.id)}
                            disabled={isConnecting}
                          >
                            {isConnecting ? <Spinner size={14} /> : 'Connect'}
                          </DevButton>
                        )}
                      </div>
                    </div>
                  </div>
                </DevCard>
              )
            })}
          </div>
        )}

        {/* API Keys Section */}
        <h2 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-4)] flex items-center gap-[var(--dev-space-2)]">
          <Key size={20} />
          API Keys
        </h2>

        <DevCard padding="md">
          <div className="flex items-center justify-between mb-[var(--dev-space-4)]">
            <p className="text-[length:var(--dev-text-sm)] text-[var(--dev-text-muted)]">
              Use API keys to authenticate requests from your applications
            </p>
            <DevButton
              variant="primary"
              size="sm"
              onClick={() => setShowCreateKey(true)}
            >
              Create New Key
            </DevButton>
          </div>

          {keysLoading ? (
            <div className="flex flex-col gap-[var(--dev-space-2)]">
              <DevSkeleton height={40} />
              <DevSkeleton height={40} />
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="text-center p-[var(--dev-space-6)] text-[var(--dev-text-muted)]">
              <Key size={32} className="mb-2 opacity-50" />
              <p>No API keys created yet</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--dev-border-subtle)]">
                  <th className="p-[var(--dev-space-2)] text-left text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                    Name
                  </th>
                  <th className="p-[var(--dev-space-2)] text-left text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                    Key
                  </th>
                  <th className="p-[var(--dev-space-2)] text-left text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                    Created
                  </th>
                  <th className="p-[var(--dev-space-2)] text-left text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                    Last Used
                  </th>
                  <th className="p-[var(--dev-space-2)] text-left text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                    Requests
                  </th>
                  <th className="p-[var(--dev-space-2)] text-right"></th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr
                    key={key.id}
                    className="border-b border-[var(--dev-border-subtle)]"
                    style={{ opacity: key.isRevoked ? 0.5 : 1 }}
                  >
                    <td className="p-[var(--dev-space-2)] text-[length:var(--dev-text-sm)]">
                      <div className="flex items-center gap-[var(--dev-space-2)]">
                        {key.name}
                        {key.isRevoked && (
                          <DevBadge variant="danger" size="sm">
                            Revoked
                          </DevBadge>
                        )}
                        {key.type === 'test' && (
                          <DevBadge variant="default" size="sm">
                            Test
                          </DevBadge>
                        )}
                      </div>
                    </td>
                    <td className="p-[var(--dev-space-2)] text-[length:var(--dev-text-sm)] font-mono">
                      {key.prefix}
                      {'•'.repeat(20)}
                      {key.lastFourChars}
                    </td>
                    <td className="p-[var(--dev-space-2)] text-[length:var(--dev-text-sm)] text-[var(--dev-text-muted)]">
                      {formatDate(key.createdAt)}
                    </td>
                    <td className="p-[var(--dev-space-2)] text-[length:var(--dev-text-sm)] text-[var(--dev-text-muted)]">
                      {formatDate(key.lastUsedAt)}
                    </td>
                    <td className="p-[var(--dev-space-2)] text-[length:var(--dev-text-sm)] text-[var(--dev-text-muted)]">
                      {key.totalRequests.toLocaleString()}
                    </td>
                    <td className="p-[var(--dev-space-2)] text-right">
                      <DevButton
                        variant="ghost"
                        size="xs"
                        onClick={() => handleDeleteApiKey(key.id)}
                        disabled={deleting === key.id}
                        className="text-[var(--dev-accent-danger)]"
                      >
                        {deleting === key.id ? (
                          <Spinner size={14} />
                        ) : (
                          <Trash size={14} />
                        )}
                      </DevButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </DevCard>

        {/* Warning */}
        <div className="mt-[var(--dev-space-4)] p-[var(--dev-space-3)] bg-[rgba(245,158,11,0.1)] rounded-[var(--dev-radius-lg)] text-[var(--dev-status-available)] text-[length:var(--dev-text-sm)] flex items-center gap-[var(--dev-space-2)]">
          <Warning size={16} />
          Never share your API keys. Keys have full access to your account.
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateKey && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
          onClick={closeCreateModal}
        >
          <DevCard
            padding="lg"
            className="w-[450px] bg-[var(--dev-bg-elevated,#1a1a1b)] border border-[var(--dev-border-default)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-[var(--dev-space-4)]">
              <h3 className="text-[length:var(--dev-text-lg)] font-[var(--dev-font-semibold)]">
                {createdKey ? 'API Key Created' : 'Create API Key'}
              </h3>
              <button
                onClick={closeCreateModal}
                className="bg-transparent border-none cursor-pointer text-[var(--dev-text-muted)]"
              >
                <X size={20} />
              </button>
            </div>

            {createdKey ? (
              <div>
                <div className="p-[var(--dev-space-3)] bg-[rgba(34,197,94,0.1)] rounded-[var(--dev-radius-md)] mb-[var(--dev-space-3)]">
                  <p className="text-[length:var(--dev-text-sm)] text-[var(--dev-accent-success)] mb-[var(--dev-space-2)]">
                    ✓ Your API key has been created
                  </p>
                  <p className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                    Copy your key now. You won&apos;t be able to see it again!
                  </p>
                </div>

                <div className="flex items-center gap-[var(--dev-space-2)] p-[var(--dev-space-3)] bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-md)] font-mono text-[length:var(--dev-text-sm)] mb-[var(--dev-space-3)]">
                  <span className="flex-1 overflow-hidden text-ellipsis">
                    {showKey
                      ? createdKey
                      : createdKey.slice(0, 12) + '••••••••••••••••••••••••'}
                  </span>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="bg-transparent border-none cursor-pointer text-[var(--dev-text-muted)]"
                  >
                    {showKey ? <EyeSlash size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleCopyKey(createdKey)}
                    className="bg-transparent border-none cursor-pointer text-[var(--dev-text-muted)]"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <DevButton
                  variant="primary"
                  onClick={closeCreateModal}
                  className="w-full"
                >
                  Done
                </DevButton>
              </div>
            ) : (
              <div className="flex flex-col gap-[var(--dev-space-3)]">
                <div>
                  <label className="block text-[length:var(--dev-text-sm)] mb-1 text-[var(--dev-text-secondary)]">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production API Key"
                    className="w-full py-[var(--dev-space-2)] px-[var(--dev-space-3)] bg-[var(--dev-bg-muted)] border border-[var(--dev-border-default)] rounded-[var(--dev-radius-md)] text-[var(--dev-text-primary)] text-[length:var(--dev-text-sm)]"
                  />
                </div>

                <div>
                  <label className="block text-[length:var(--dev-text-sm)] mb-1 text-[var(--dev-text-secondary)]">
                    Key Type
                  </label>
                  <div className="flex gap-[var(--dev-space-2)]">
                    <button
                      onClick={() => setNewKeyType('test')}
                      className="flex-1 p-[var(--dev-space-2)] border border-[var(--dev-border-default)] rounded-[var(--dev-radius-md)] text-[length:var(--dev-text-sm)] cursor-pointer"
                      style={{
                        background:
                          newKeyType === 'test'
                            ? 'var(--dev-accent-primary)'
                            : 'var(--dev-bg-muted)',
                        color:
                          newKeyType === 'test'
                            ? 'white'
                            : 'var(--dev-text-secondary)',
                      }}
                    >
                      Test (pk_test_)
                    </button>
                    <button
                      onClick={() => setNewKeyType('live')}
                      className="flex-1 p-[var(--dev-space-2)] border border-[var(--dev-border-default)] rounded-[var(--dev-radius-md)] text-[length:var(--dev-text-sm)] cursor-pointer"
                      style={{
                        background:
                          newKeyType === 'live'
                            ? 'var(--dev-accent-primary)'
                            : 'var(--dev-bg-muted)',
                        color:
                          newKeyType === 'live'
                            ? 'white'
                            : 'var(--dev-text-secondary)',
                      }}
                    >
                      Live (pk_live_)
                    </button>
                  </div>
                </div>

                <div className="flex gap-[var(--dev-space-2)] mt-[var(--dev-space-2)]">
                  <DevButton
                    variant="ghost"
                    onClick={closeCreateModal}
                    className="flex-1"
                  >
                    Cancel
                  </DevButton>
                  <DevButton
                    variant="primary"
                    onClick={handleCreateApiKey}
                    disabled={creating || !newKeyName.trim()}
                    className="flex-1"
                  >
                    {creating ? <Spinner size={16} /> : 'Create Key'}
                  </DevButton>
                </div>
              </div>
            )}
          </DevCard>
        </div>
      )}
    </div>
  )
}
