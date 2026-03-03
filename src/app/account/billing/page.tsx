'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRouter } from 'next/navigation'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useSubscriptionStatus } from '@/lib/hooks/useSubscriptionStatus'
import { CreditCard, Check, X, AlertCircle, Loader, Key } from 'lucide-react'
import { ApiKeyManagementModal } from '@/components/basics/ApiKeyManagementModal'
import { formatDate } from '@/lib/utils/timestamp'
import { logger } from '@/lib/logger'

export default function BillingPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const fetchApi = useApiFetch()
  const { status: subscriptionStatus, loading: subscriptionLoading } =
    useSubscriptionStatus()
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [hasApiKeys, setHasApiKeys] = useState(false)

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (authLoading) return

    if (!user) {
      router.push('/login')
      return
    }
    checkApiKeys()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router])

  const checkApiKeys = async () => {
    if (!user) return

    try {
      const result = await fetchApi<{ hasKeys: boolean }>('/api/user/api-keys')
      setHasApiKeys(result.hasKeys)
    } catch (error) {
      logger.error('BillingPage', 'Error checking API keys', { error })
    }
  }

  const handleSubscribe = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      const result = await fetchApi<{ checkoutUrl: string }>(
        '/api/user/subscription/create-checkout',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: user.uid,
            email: user.email,
          }),
        }
      )

      if (result.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = result.checkoutUrl
      }
    } catch (error) {
      logger.error('BillingPage', 'Error creating checkout', { error })
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to create checkout session. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen b-bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="b-animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--b-logic)] mx-auto b-mb-md"></div>
          <p className="b-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen b-bg-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="b-mb-xl">
          <h1 className="b-text-3xl b-font-bold b-text-primary b-mb-sm">
            Billing & Subscription
          </h1>
          <p className="b-text-secondary">
            Manage your subscription and API key access
          </p>
        </div>

        {/* Subscription Status Card */}
        <div className="b-card b-p-xl b-mb-lg">
          <div className="flex items-center justify-between b-mb-md">
            <h2 className="b-text-xl b-font-semibold b-text-primary">
              Subscription Status
            </h2>
            {subscriptionLoading || isLoading ? (
              <Loader className="w-5 h-5 b-text-muted b-animate-spin" />
            ) : subscriptionStatus?.isActive ? (
              <span className="b-badge b-badge-success">
                <Check className="w-4 h-4" />
                Active
              </span>
            ) : (
              <span className="b-badge b-badge-default">
                <X className="w-4 h-4" />
                Inactive
              </span>
            )}
          </div>

          {subscriptionStatus?.isActive ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="b-text-sm b-text-secondary">Plan</span>
                <span className="b-text-sm b-font-medium b-text-primary">
                  {subscriptionStatus.plan || 'Pro'}
                </span>
              </div>
              {subscriptionStatus?.currentPeriodEnd && (
                <div className="flex items-center justify-between py-2">
                  <span className="b-text-sm b-text-secondary">Renews on</span>
                  <span className="b-text-sm b-font-medium b-text-primary">
                    {formatDate(subscriptionStatus.currentPeriodEnd)}
                  </span>
                </div>
              )}
              {subscriptionStatus?.cancelAtPeriodEnd && (
                <div className="b-feedback b-feedback-warning">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 b-text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="b-text-sm b-font-medium b-text-warning-dark">
                        Cancellation Scheduled
                      </p>
                      <p className="b-text-xs b-text-warning-dark b-mt-sm">
                        Your subscription will end on{' '}
                        {formatDate(subscriptionStatus?.currentPeriodEnd)}.
                        You&apos;ll continue to have access until then.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="b-text-secondary">
                You don&apos;t have an active subscription. Subscribe to
                continue using our API keys without providing your own.
              </p>
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="b-btn b-btn-logic b-btn-lg"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 b-animate-spin" />
                    Creating checkout...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Subscribe Now
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* API Key Access Card */}
        <div className="b-card b-p-xl">
          <div className="flex items-center justify-between b-mb-md">
            <h2 className="b-text-xl b-font-semibold b-text-primary">
              API Key Access
            </h2>
          </div>

          <div className="space-y-4">
            <div className="b-feedback b-feedback-info">
              <div className="flex items-start gap-3">
                <Key className="w-5 h-5 b-text-info flex-shrink-0 mt-0.5" />
                <div>
                  <p className="b-text-sm b-font-medium b-text-info-dark b-mb-sm">
                    Two Ways to Access
                  </p>
                  <p className="b-text-xs b-text-info-dark">
                    You can either subscribe to use our API keys, or provide
                    your own API keys for free.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Subscription Option */}
              <div
                className={`border-2 b-rounded-lg b-p-lg ${
                  subscriptionStatus?.isActive
                    ? 'border-[var(--b-success)] b-bg-success-light'
                    : 'b-border b-bg-elevated'
                }`}
              >
                <div className="flex items-center gap-2 b-mb-sm">
                  <CreditCard className="w-5 h-5 b-text-primary" />
                  <h3 className="b-font-semibold b-text-primary">
                    Subscription
                  </h3>
                  {subscriptionStatus?.isActive && (
                    <Check className="w-4 h-4 b-text-success" />
                  )}
                </div>
                <p className="b-text-sm b-text-secondary b-mb-md">
                  Subscribe to use our API keys. No setup required!
                </p>
                {subscriptionStatus?.isActive ? (
                  <span className="b-text-sm b-text-success b-font-medium">
                    ✓ Active
                  </span>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    disabled={isLoading || subscriptionLoading}
                    className="b-text-sm b-text-link b-font-medium disabled:opacity-50"
                  >
                    Subscribe →
                  </button>
                )}
              </div>

              {/* Own Keys Option */}
              <div
                className={`border-2 b-rounded-lg b-p-lg ${
                  hasApiKeys
                    ? 'border-[var(--b-success)] b-bg-success-light'
                    : 'b-border b-bg-elevated'
                }`}
              >
                <div className="flex items-center gap-2 b-mb-sm">
                  <Key className="w-5 h-5 b-text-primary" />
                  <h3 className="b-font-semibold b-text-primary">
                    Your Own Keys
                  </h3>
                  {hasApiKeys && <Check className="w-4 h-4 b-text-success" />}
                </div>
                <p className="b-text-sm b-text-secondary b-mb-md">
                  Provide your own API keys for free access.
                </p>
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="b-text-sm b-text-link b-font-medium"
                >
                  {hasApiKeys ? 'Manage Keys →' : 'Add Keys →'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* API Key Modal */}
        {showApiKeyModal && (
          <ApiKeyManagementModal
            isOpen={showApiKeyModal}
            onClose={() => {
              setShowApiKeyModal(false)
              checkApiKeys()
            }}
            isFirstVisit={false}
          />
        )}
      </div>
    </div>
  )
}
