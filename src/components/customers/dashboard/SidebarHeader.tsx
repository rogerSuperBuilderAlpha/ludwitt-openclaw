'use client'

import { NotificationBell } from '@/components/shared/NotificationBell'
import { CreditsBadge } from './CreditsBadge'
type SidebarHeaderProps = {
  title: string
  subtitle?: string
}

export function SidebarHeader({ title, subtitle }: SidebarHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <NotificationBell />
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          <span className="text-xs px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-full font-medium">
            Customers
          </span>
        </div>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>

      {/* Credits Balance */}
      <CreditsBadge />
    </div>
  )
}
