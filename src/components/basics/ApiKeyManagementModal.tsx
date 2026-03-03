'use client'

import { useState, useEffect, useRef } from 'react'
import {
  X,
  Key,
  Shield,
  ExternalLink,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  CreditCard,
} from 'lucide-react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useCredits } from '@/lib/hooks/useCredits'
import { useRequireAuth } from '@/lib/hooks/useRequireAuth'
import { encryptApiKey, hashApiKey } from '@/lib/utils/api-key-encryption'
import {
  validateAnthropicKey,
  validateDidKey,
} from '@/lib/utils/validation-helpers'
import { Alert } from '@/components/ui/Alert'
import { DepositModal } from '@/components/credits'
import { logger } from '@/lib/logger'

interface ApiKeyManagementModalProps {
  isOpen: boolean
  onClose: () => void
  isFirstVisit?: boolean
}

export function ApiKeyManagementModal({
  isOpen,
  onClose,
  isFirstVisit = false,
}: ApiKeyManagementModalProps) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { balance: creditBalance, refresh: refreshCredits } = useCredits()
  const { requireAuth } = useRequireAuth()
  const [anthropicKey, setAnthropicKey] = useState('')
  const [didKey, setDidKey] = useState('')
  const [showAnthropicKey, setShowAnthropicKey] = useState(false)
  const [showDidKey, setShowDidKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [hasExistingKeys, setHasExistingKeys] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const isMountedRef = useRef(true)

  const loadExistingKeys = async () => {
    if (!user) return

    try {
      const result = await fetchApi<{ hasKeys: boolean }>('/api/user/api-keys')
      if (isMountedRef.current) {
        setHasExistingKeys(result.hasKeys)
      }
    } catch (err) {
      logger.error('ApiKeyManagementModal', 'Error loading existing keys', {
        error: err,
      })
    }
  }

  useEffect(() => {
    isMountedRef.current = true

    if (isOpen && user) {
      loadExistingKeys()
    } else if (!isOpen) {
      // Reset form when modal closes
      setAnthropicKey('')
      setDidKey('')
      setError(null)
      setSuccess(false)
      setShowAnthropicKey(false)
      setShowDidKey(false)
    }

    return () => {
      isMountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user])

  const handleSave = async () => {
    const result = requireAuth(async () => {
      setError(null)
      setSuccess(false)
      setIsSaving(true)

      try {
        // Validate keys BEFORE encryption
        const anthropicKeyTrimmed = anthropicKey.trim()
        const didKeyTrimmed = didKey.trim()

        if (!anthropicKeyTrimmed && !didKeyTrimmed) {
          setError('Please provide at least one API key')
          setIsSaving(false)
          return
        }

        // Validate Anthropic key format before encryption
        if (anthropicKeyTrimmed) {
          const validation = validateAnthropicKey(anthropicKeyTrimmed)
          if (!validation.isValid) {
            setError(validation.error || 'Invalid Anthropic API key format')
            setIsSaving(false)
            return
          }
        }

        // Basic validation for D-ID key (if provided)
        if (didKeyTrimmed) {
          const validation = validateDidKey(didKeyTrimmed)
          if (!validation.isValid) {
            setError(validation.error || 'Invalid D-ID API key format')
            setIsSaving(false)
            return
          }
        }

        // Encrypt keys client-side before sending
        const encryptedData: any = {}

        if (anthropicKeyTrimmed) {
          try {
            const encrypted = await encryptApiKey(
              anthropicKeyTrimmed,
              user!.uid
            )
            const keyHash = await hashApiKey(anthropicKeyTrimmed)
            encryptedData.anthropicKey = encrypted
            encryptedData.anthropicKeyHash = keyHash
          } catch (encryptError) {
            setError('Failed to encrypt Anthropic key. Please try again.')
            setIsSaving(false)
            return
          }
        }

        if (didKeyTrimmed) {
          try {
            const encrypted = await encryptApiKey(didKeyTrimmed, user!.uid)
            const keyHash = await hashApiKey(didKeyTrimmed)
            encryptedData.didKey = encrypted
            encryptedData.didKeyHash = keyHash
          } catch (encryptError) {
            setError('Failed to encrypt D-ID key. Please try again.')
            setIsSaving(false)
            return
          }
        }

        await fetchApi('/api/user/api-keys', {
          method: 'POST',
          body: JSON.stringify(encryptedData),
        })

        setSuccess(true)
        setAnthropicKey('')
        setDidKey('')
        setHasExistingKeys(true)

        // Reload existing keys to show updated status
        await loadExistingKeys()

        // Close modal after 2 seconds if it was first visit
        if (isFirstVisit) {
          setTimeout(() => {
            onClose()
          }, 2000)
        }
      } catch (err) {
        // Don't log the actual error as it might contain sensitive info
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to save API keys'
        setError(
          errorMessage.includes('key') && !errorMessage.includes('API key')
            ? 'Failed to save API keys. Please check your keys and try again.'
            : errorMessage
        )
      } finally {
        setIsSaving(false)
      }
    }, 'You must be logged in to save API keys')

    if (!result) {
      setError('You must be logged in to save API keys')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="API key management"
        className="b-bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {isFirstVisit
                    ? 'Free Compute Ending Soon'
                    : 'Manage Your API Keys'}
                </h2>
                <p className="b-text-muted opacity-80 text-sm">
                  {isFirstVisit
                    ? 'Add your own API keys to continue using the platform'
                    : 'Update or add your API keys'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:b-bg-card-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Important Notice */}
          {isFirstVisit && (
            <div className="b-bg-writing-light border-2 b-border-writing rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 b-text-writing flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold b-text-writing mb-2">
                    Free Compute Ending
                  </h3>
                  <p className="text-sm b-text-writing mb-3">
                    We&apos;re stopping free compute in January 2025 (or
                    earlier). To continue using AI-powered features like problem
                    generation, explanations, and video tutorials, you have two
                    options:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CreditCard className="w-4 h-4 b-text-writing flex-shrink-0 mt-0.5" />
                      <p className="text-xs b-text-writing">
                        <strong>Subscribe</strong> to use our API keys (no setup
                        required)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Key className="w-4 h-4 b-text-writing flex-shrink-0 mt-0.5" />
                      <p className="text-xs b-text-writing">
                        <strong>Add your own keys</strong> for free (we&apos;ll
                        guide you)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Credit System Option */}
          <div className="b-bg-logic-light border b-border-logic rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <CreditCard className="w-5 h-5 b-text-logic flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold b-text-logic mb-1">
                    Prefer Not to Manage Keys?
                  </h3>
                  <p className="text-sm b-text-logic mb-3">
                    Add credits to use our AI features. Pay only for what you
                    use - no setup required!
                    {creditBalance && (
                      <span className="block mt-1 font-medium">
                        Current balance: {creditBalance.balanceFormatted}
                      </span>
                    )}
                  </p>
                  <button
                    onClick={() => setShowDepositModal(true)}
                    className="b-bg-logic text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                  >
                    Add Credits
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="b-bg-math-light border b-border-math rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 b-text-math flex-shrink-0 mt-1" />
              <div className="text-sm b-text-math">
                <p className="font-semibold mb-1">🔒 Your Keys Are Encrypted</p>
                <p>
                  All API keys are encrypted using your user ID before being
                  stored. We never see your actual keys, and they&apos;re only
                  decrypted when needed for API calls. You can delete them
                  anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Anthropic API Key Section */}
          <div className="space-y-3">
            <div>
              <label
                htmlFor="anthropic-api-key"
                className="block text-sm font-semibold b-text-secondary mb-2"
              >
                Anthropic API Key (Claude AI)
              </label>
              <p className="text-xs b-text-secondary mb-3">
                Required for AI problem generation, explanations, and alternate
                explanations.
              </p>
              <div className="relative">
                <input
                  id="anthropic-api-key"
                  type={showAnthropicKey ? 'text' : 'password'}
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  className="w-full px-4 py-3 pr-12 border b-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowAnthropicKey(!showAnthropicKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 b-text-muted hover:b-text-secondary"
                >
                  {showAnthropicKey ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm b-text-logic hover:b-text-logic mt-2"
              >
                Get your Anthropic API key <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* D-ID API Key Section */}
          <div className="space-y-3">
            <div>
              <label
                htmlFor="did-api-key"
                className="block text-sm font-semibold b-text-secondary mb-2"
              >
                D-ID API Key (Optional)
              </label>
              <p className="text-xs b-text-secondary mb-3">
                Required for video explanations. You can skip this if you
                don&apos;t use video features.
              </p>
              <div className="relative">
                <input
                  id="did-api-key"
                  type={showDidKey ? 'text' : 'password'}
                  value={didKey}
                  onChange={(e) => setDidKey(e.target.value)}
                  placeholder="Enter your D-ID API key"
                  className="w-full px-4 py-3 pr-12 border b-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowDidKey(!showDidKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 b-text-muted hover:b-text-secondary"
                >
                  {showDidKey ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <a
                href="https://studio.d-id.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm b-text-logic hover:b-text-logic mt-2"
              >
                Get your D-ID API key <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* How to Get Keys Guide */}
          <div className="b-bg-muted border b-border rounded-lg p-4">
            <h3 className="font-semibold b-text-primary mb-3">
              📖 How to Get Your API Keys
            </h3>
            <div className="space-y-3 text-sm b-text-secondary">
              <div>
                <p className="font-medium mb-1">1. Anthropic (Claude AI):</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>
                    Go to{' '}
                    <a
                      href="https://console.anthropic.com/settings/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="b-text-logic hover:underline"
                    >
                      console.anthropic.com/settings/keys
                    </a>
                  </li>
                  <li>Sign up or log in to your account</li>
                  <li>Click &quot;Create Key&quot;</li>
                  <li>
                    Copy the key (starts with{' '}
                    <code className="b-bg-muted px-1 rounded">sk-ant-</code>)
                  </li>
                  <li>Paste it above</li>
                </ol>
              </div>
              <div>
                <p className="font-medium mb-1">2. D-ID (Video):</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>
                    Go to{' '}
                    <a
                      href="https://studio.d-id.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="b-text-logic hover:underline"
                    >
                      studio.d-id.com
                    </a>
                  </li>
                  <li>Sign up for a free account</li>
                  <li>Go to API section</li>
                  <li>Generate an API key</li>
                  <li>Paste it above</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Security Best Practices */}
          <div className="b-bg-logic-light border b-border-logic rounded-lg p-4">
            <h3 className="font-semibold b-text-logic mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Best Practices
            </h3>
            <ul className="text-sm b-text-logic space-y-1 list-disc list-inside">
              <li>Never share your API keys with anyone</li>
              <li>Set usage limits in your API provider dashboard</li>
              <li>Monitor your usage regularly</li>
              <li>Rotate keys if you suspect they&apos;ve been compromised</li>
              <li>Delete keys here if you stop using the platform</li>
            </ul>
          </div>

          {/* Error Display */}
          {error && <Alert type="error">{error}</Alert>}

          {/* Success Display */}
          {success && (
            <Alert type="success">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                API keys saved successfully!
              </div>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isFirstVisit && (
              <button
                onClick={onClose}
                className="px-6 py-3 border b-border b-text-secondary rounded-lg hover:b-bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving || (!anthropicKey.trim() && !didKey.trim())}
              className="flex-1 b-bg-logic text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Save API Keys
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onSuccess={() => {
          refreshCredits()
          setShowDepositModal(false)
        }}
      />
    </div>
  )
}
