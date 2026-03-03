export type SubscriptionTier = 'free' | 'pro' | 'premium'

export interface TierFeature {
  name: string
  included: boolean
  limit?: string
}

export interface SubscriptionTierData {
  id: SubscriptionTier
  name: string
  price: number
  priceId?: string // Stripe Price ID
  interval: 'month'
  popular?: boolean
  description: string
  features: TierFeature[]
}

export const subscriptionTiers: SubscriptionTierData[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'Get started with the essentials',
    features: [
      { name: 'Full Learning Path (Steps 1-15)', included: true },
      { name: 'AI-Generated Projects', included: true, limit: '3 projects max' },
      { name: 'Portfolio Items', included: true, limit: '3 items max' },
      { name: 'Community Support', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Ludwitt Branding', included: true },
      { name: 'Unlimited AI Projects', included: false },
      { name: 'Unlimited Portfolio', included: false },
      { name: 'Custom Portfolio Domain', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Remove Branding', included: false },
      { name: 'Advanced Analytics', included: false },
      { name: 'Mentor Hours', included: false },
      { name: 'Code Review Credits', included: false },
      { name: 'Resume Review', included: false },
      { name: 'Interview Prep', included: false },
      { name: 'Job Placement Assistance', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    interval: 'month',
    popular: true,
    description: 'For serious builders and job seekers',
    features: [
      { name: 'Full Learning Path (Steps 1-15)', included: true },
      { name: 'AI-Generated Projects', included: true, limit: 'Unlimited' },
      { name: 'Portfolio Items', included: true, limit: 'Unlimited' },
      { name: 'Community Support', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Ludwitt Branding', included: false },
      { name: 'Unlimited AI Projects', included: true },
      { name: 'Unlimited Portfolio', included: true },
      { name: 'Custom Portfolio Domain', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Remove Branding', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Mentor Hours', included: false },
      { name: 'Code Review Credits', included: false },
      { name: 'Resume Review', included: false },
      { name: 'Interview Prep', included: false },
      { name: 'Job Placement Assistance', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
    interval: 'month',
    description: 'Full career transformation package',
    features: [
      { name: 'Full Learning Path (Steps 1-15)', included: true },
      { name: 'AI-Generated Projects', included: true, limit: 'Unlimited' },
      { name: 'Portfolio Items', included: true, limit: 'Unlimited' },
      { name: 'Community Support', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Ludwitt Branding', included: false },
      { name: 'Unlimited AI Projects', included: true },
      { name: 'Unlimited Portfolio', included: true },
      { name: 'Custom Portfolio Domain', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Remove Branding', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Mentor Hours', included: true, limit: '2 hours/month' },
      { name: 'Code Review Credits', included: true, limit: '2 reviews/month' },
      { name: 'Resume Review', included: true },
      { name: 'Interview Prep', included: true },
      { name: 'Job Placement Assistance', included: true },
    ],
  },
]

export const tierLimits = {
  free: {
    maxProjects: 3,
    maxPortfolioItems: 3,
    aiHelpMessages: 20,
    customDomain: false,
    removeBranding: false,
    advancedAnalytics: false,
    mentorHours: 0,
    codeReviewCredits: 0,
  },
  pro: {
    maxProjects: Infinity,
    maxPortfolioItems: Infinity,
    aiHelpMessages: 100,
    customDomain: true,
    removeBranding: true,
    advancedAnalytics: true,
    mentorHours: 0,
    codeReviewCredits: 0,
  },
  premium: {
    maxProjects: Infinity,
    maxPortfolioItems: Infinity,
    aiHelpMessages: Infinity,
    customDomain: true,
    removeBranding: true,
    advancedAnalytics: true,
    mentorHours: 2,
    codeReviewCredits: 2,
  },
}

export function getTierLimits(tier: SubscriptionTier) {
  return tierLimits[tier]
}

export function canCreateProject(tier: SubscriptionTier, currentProjectCount: number): boolean {
  const limits = getTierLimits(tier)
  return currentProjectCount < limits.maxProjects
}

export function canAddPortfolioItem(tier: SubscriptionTier, currentItemCount: number): boolean {
  const limits = getTierLimits(tier)
  return currentItemCount < limits.maxPortfolioItems
}

export function getRemainingAIMessages(tier: SubscriptionTier, usedMessages: number): number {
  const limits = getTierLimits(tier)
  if (limits.aiHelpMessages === Infinity) return Infinity
  return Math.max(0, limits.aiHelpMessages - usedMessages)
}
