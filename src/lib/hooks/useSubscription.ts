import { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { SubscriptionTier, getTierLimits } from '@/data/subscriptionTiers'
import { logger } from '@/lib/logger'

export interface UserSubscription {
  tier: SubscriptionTier
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd?: boolean
}

export function useSubscription(userId: string | undefined) {
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'free',
    status: 'active',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    // Real-time subscription updates
    const unsubscribe = onSnapshot(
      doc(db, 'userSubscriptions', userId),
      (doc) => {
        if (doc.exists()) {
          setSubscription(doc.data() as UserSubscription)
        } else {
          // No subscription doc means free tier
          setSubscription({
            tier: 'free',
            status: 'active',
          })
        }
        setLoading(false)
      },
      (error) => {
        logger.error('Usesubscription', 'Failed to load subscription', { error: error })
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userId])

  const limits = getTierLimits(subscription.tier)

  return {
    subscription,
    tier: subscription.tier,
    limits,
    loading,
    isPro: subscription.tier === 'pro' || subscription.tier === 'premium',
    isPremium: subscription.tier === 'premium',
    isFree: subscription.tier === 'free',
    isActive: subscription.status === 'active' || subscription.status === 'trialing',
  }
}
