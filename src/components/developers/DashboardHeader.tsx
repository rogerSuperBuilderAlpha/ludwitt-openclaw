'use client'

import { NotificationBell } from '@/components/shared/NotificationBell'

interface DashboardHeaderProps {
  userEmail?: string | null
  userIsAdmin: boolean
  adminViewMode: 'developer' | 'admin'
  onSwitchToDeveloper: () => void
  onSwitchToAdmin: () => void
  onLogout?: () => void
}

export function DashboardHeader({
  userIsAdmin,
  adminViewMode,
  onSwitchToDeveloper,
  onSwitchToAdmin,
}: DashboardHeaderProps) {
  return (
    <header
      className="bg-white border-b sticky z-10"
      style={{ top: 'var(--strip-height, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">
                Developer Dashboard
              </h1>
              <span className="text-xs px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full font-medium">
                Developers
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          {userIsAdmin && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg border-2 border-purple-200">
              <span className="text-xs font-medium text-gray-600">
                View as:
              </span>
              <button
                onClick={onSwitchToDeveloper}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  adminViewMode === 'developer'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Developer
              </button>
              <button
                onClick={onSwitchToAdmin}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  adminViewMode === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
