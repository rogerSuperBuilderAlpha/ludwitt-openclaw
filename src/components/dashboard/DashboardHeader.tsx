'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardHeaderProps {
  user: {
    uid: string
    displayName?: string | null
    email?: string | null
    photoURL?: string | null
  }
  onLogout?: () => void
}

export function DashboardHeader({}: DashboardHeaderProps) {
  const pathname = usePathname()

  return (
    <header
      className="bg-white border-b border-gray-200 flex-shrink-0 sticky z-[100]"
      style={{ top: 'var(--strip-height, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-6">
        {/* Current Section Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg">
          <span className="text-xs font-medium text-purple-600">ALC</span>
          <span className="text-xs text-purple-400">Developer Training</span>
        </div>

        {/* Quick Navigation */}
        <nav className="hidden md:flex gap-4 relative z-10">
          <Link
            href="/alc"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/alc' || pathname?.startsWith('/alc/')
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            ALC
          </Link>
          <Link
            href="/basics/cohorts"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/basics/cohorts'
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Cohorts
          </Link>
        </nav>
      </div>
    </header>
  )
}
