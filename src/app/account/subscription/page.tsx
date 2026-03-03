'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubscription } from '@/lib/hooks/useSubscription'
import { subscriptionTiers } from '@/data/subscriptionTiers'
import Image from 'next/image'
import Link from 'next/link'
import { logger } from '@/lib/logger'

export default function SubscriptionSettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { subscription, tier, limits, loading: subLoading, isActive } = useSubscription(user?.uid)

  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [canceling, setCanceling] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  const handleManageBilling = async () => {
    if (!user || !subscription.stripeCustomerId) return

    try {
      const token = await user.getIdToken()
      
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId: subscription.stripeCustomerId,
        }),
      })

      const data = await response.json()

      if (data.success && data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to open billing portal')
      }
    } catch (error) {
      logger.error('SubscriptionPage', 'Billing portal error', { error })
      alert('Failed to open billing portal')
    }
  }

  const handleCancelSubscription = async () => {
    if (!user || !subscription.stripeSubscriptionId) return

    setCanceling(true)

    try {
      const token = await user.getIdToken()
      
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripeSubscriptionId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert('Subscription canceled. You will retain access until the end of your billing period.')
        setShowCancelConfirm(false)
      } else {
        alert(data.error || 'Failed to cancel subscription')
      }
    } catch (error) {
      logger.error('SubscriptionPage', 'Cancel subscription error', { error })
      alert('Failed to cancel subscription')
    } finally {
      setCanceling(false)
    }
  }

  if (authLoading || subLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center b-bg-page">
        <div className="b-text-secondary">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  const currentTierData = subscriptionTiers.find((t) => t.id === tier)

  return (
    <main className="min-h-screen b-bg-page">
      {/* Header */}
      <header className="b-bg-elevated b-border-b b-shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="b-text-secondary hover:b-text-primary transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="b-text-2xl b-font-bold b-text-primary">Subscription</h1>
          </div>
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt={user.displayName || 'User'}
                width={32}
                height={32}
                className="w-8 h-8 b-rounded-full"
              />
            )}
            <span className="b-text-sm b-text-secondary">{user.displayName || user.email}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Current Plan */}
        <div className="b-card b-card-elevated b-p-xl b-mb-xl">
          <h2 className="b-text-2xl b-font-bold b-text-primary b-mb-lg">Current Plan</h2>

          <div className="flex items-start justify-between b-mb-lg">
            <div>
              <div className="flex items-center gap-3 b-mb-sm">
                <h3 className="b-text-3xl b-font-bold b-text-logic capitalize">{tier}</h3>
                {isActive && (
                  <span className="b-badge b-badge-success">
                    Active
                  </span>
                )}
                {subscription.status === 'past_due' && (
                  <span className="b-badge b-badge-danger">
                    Payment Failed
                  </span>
                )}
                {subscription.cancelAtPeriodEnd && (
                  <span className="b-badge b-badge-warning">
                    Canceling
                  </span>
                )}
              </div>

              {currentTierData && <p className="b-text-secondary b-mb-md">{currentTierData.description}</p>}

              {subscription.currentPeriodEnd && (
                <p className="b-text-sm b-text-secondary">
                  {subscription.cancelAtPeriodEnd ? 'Access ends' : 'Renews'} on{' '}
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>

            {currentTierData && (
              <div className="text-right">
                <div className="b-text-4xl b-font-bold b-text-primary">${currentTierData.price}</div>
                <div className="b-text-secondary">per month</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {tier === 'free' ? (
              <Link
                href="/account/credits"
                className="b-btn b-btn-primary b-btn-lg b-shadow-lg"
              >
                Add Credits
              </Link>
            ) : (
              <>
                <button
                  onClick={handleManageBilling}
                  className="b-btn b-btn-logic b-btn-lg"
                >
                  Manage Billing
                </button>
                {!subscription.cancelAtPeriodEnd && (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="b-btn b-btn-danger-ghost b-btn-lg"
                  >
                    Cancel Subscription
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Usage & Limits */}
        <div className="b-card b-card-elevated b-p-xl b-mb-xl">
          <h2 className="b-text-2xl b-font-bold b-text-primary b-mb-lg">Usage & Limits</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between b-mb-sm">
                <span className="b-text-secondary b-font-medium">AI-Generated Projects</span>
                <span className="b-text-primary b-font-bold">
                  {limits.maxProjects === Infinity ? 'Unlimited' : `Up to ${limits.maxProjects}`}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between b-mb-sm">
                <span className="b-text-secondary b-font-medium">Portfolio Items</span>
                <span className="b-text-primary b-font-bold">
                  {limits.maxPortfolioItems === Infinity
                    ? 'Unlimited'
                    : `Up to ${limits.maxPortfolioItems}`}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between b-mb-sm">
                <span className="b-text-secondary b-font-medium">AI Help Messages (per day)</span>
                <span className="b-text-primary b-font-bold">
                  {limits.aiHelpMessages === Infinity ? 'Unlimited' : limits.aiHelpMessages}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between b-mb-sm">
                <span className="b-text-secondary b-font-medium">Custom Portfolio Domain</span>
                <span className={`b-font-bold ${limits.customDomain ? 'b-text-success' : 'b-text-muted'}`}>
                  {limits.customDomain ? '✓ Included' : '× Not Available'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between b-mb-sm">
                <span className="b-text-secondary b-font-medium">Remove Branding</span>
                <span className={`b-font-bold ${limits.removeBranding ? 'b-text-success' : 'b-text-muted'}`}>
                  {limits.removeBranding ? '✓ Included' : '× Not Available'}
                </span>
              </div>
            </div>

            {tier === 'premium' && (
              <>
                <div>
                  <div className="flex items-center justify-between b-mb-sm">
                    <span className="b-text-secondary b-font-medium">Mentor Hours (per month)</span>
                    <span className="b-text-primary b-font-bold">{limits.mentorHours} hours</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between b-mb-sm">
                    <span className="b-text-secondary b-font-medium">Code Review Credits (per month)</span>
                    <span className="b-text-primary b-font-bold">{limits.codeReviewCredits} reviews</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Compare Plans */}
        {tier !== 'premium' && (
          <div className="b-bg-muted b-border b-rounded-xl b-p-xl">
            <h3 className="b-text-xl b-font-bold b-text-primary b-mb-md">
              {tier === 'free' ? 'Unlock More with Pro' : 'Go Premium for Maximum Value'}
            </h3>
            <p className="b-text-secondary b-mb-md">
              {tier === 'free'
                ? 'Get unlimited projects, portfolio items, and remove branding for just $29/month.'
                : 'Add mentor hours, code reviews, and job placement assistance for $99/month.'}
            </p>
            <Link
              href="/account/credits"
              className="b-btn b-btn-primary b-btn-lg b-shadow-lg"
            >
              View Credits
            </Link>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="b-modal-overlay">
          <div className="b-modal b-modal-md">
            <h2 className="b-text-2xl b-font-bold b-text-primary b-mb-md">Cancel Subscription?</h2>
            <p className="b-text-secondary b-mb-lg">
              Are you sure you want to cancel? You&apos;ll retain access until{' '}
              {subscription.currentPeriodEnd &&
                new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}{', '}
              then your plan will downgrade to Free.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCancelSubscription}
                disabled={canceling}
                className="b-btn b-btn-danger b-btn-lg flex-1"
              >
                {canceling ? 'Canceling...' : 'Yes, Cancel'}
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="b-btn b-btn-secondary b-btn-lg flex-1"
              >
                Keep Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
