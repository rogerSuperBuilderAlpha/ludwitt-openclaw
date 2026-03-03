/**
 * Subscription Helper Utilities
 * 
 * Common operations for subscription status and management
 */

import { getUserData } from './user-helpers'

export interface SubscriptionStatus {
  isActive: boolean
  plan?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean
  stripeCustomerId?: string | null
  stripeSubscriptionId?: string | null
}

/**
 * Get subscription status for a user
 */
export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  const userData = await getUserData(userId)
  const subscription = userData?.subscription || {}

  return {
    isActive: subscription.status === 'active' || subscription.status === 'trialing',
    plan: subscription.plan || null,
    currentPeriodEnd: subscription.currentPeriodEnd || null,
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
    stripeCustomerId: subscription.stripeCustomerId || null,
    stripeSubscriptionId: subscription.stripeSubscriptionId || null
  }
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const status = await getSubscriptionStatus(userId)
  return status.isActive
}

