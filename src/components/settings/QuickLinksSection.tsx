'use client'

import Link from 'next/link'
import { CreditCard, Wallet, Trophy, Lock, Webhook, HelpCircle } from 'lucide-react'

const QUICK_LINKS = [
  { href: '/account/credits', icon: CreditCard, label: 'Credits & Billing', description: 'Manage your credits and payment' },
  { href: '/account/wallets', icon: Wallet, label: 'MOR Staking Wallets', description: 'Link wallets for staking credits' },
  { href: '/account/subscription', icon: Trophy, label: 'Subscription', description: 'View and manage your plan' },
  { href: '/account/api-keys', icon: Lock, label: 'API Keys', description: 'Manage your API credentials' },
  { href: '/account/webhooks', icon: Webhook, label: 'Webhooks', description: 'Manage webhook endpoints' },
] as const

export function QuickLinksSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {QUICK_LINKS.map(({ href, icon: Icon, label, description }) => (
        <Link key={href} href={href} className="flex items-center gap-3 b-p-md b-border b-rounded-lg hover:b-bg-muted transition-colors">
          <Icon className="w-5 h-5 b-text-secondary" />
          <div>
            <p className="b-font-medium b-text-primary">{label}</p>
            <p className="b-text-xs b-text-muted">{description}</p>
          </div>
        </Link>
      ))}
      <a href="mailto:support@ludwitt.com" className="flex items-center gap-3 b-p-md b-border b-rounded-lg hover:b-bg-muted transition-colors">
        <HelpCircle className="w-5 h-5 b-text-secondary" />
        <div>
          <p className="b-font-medium b-text-primary">Help & Support</p>
          <p className="b-text-xs b-text-muted">Contact us for assistance</p>
        </div>
      </a>
    </div>
  )
}
