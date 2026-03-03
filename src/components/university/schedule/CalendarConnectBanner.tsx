'use client'

import { GoogleLogo } from '@phosphor-icons/react'

interface CalendarConnectBannerProps {
  connected: boolean
  email?: string
  loading: boolean
  onConnect: () => void
}

export function CalendarConnectBanner({ connected, email, loading, onConnect }: CalendarConnectBannerProps) {
  if (loading) return null

  if (connected) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Google Calendar connected{email ? ` (${email})` : ''}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
      <div>
        <p className="text-xs font-medium text-gray-700">Connect Google Calendar</p>
        <p className="text-[11px] text-gray-500 mt-0.5">Overlay your personal schedule on the calendar</p>
      </div>
      <button
        onClick={onConnect}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
      >
        <GoogleLogo size={14} weight="bold" />
        Connect
      </button>
    </div>
  )
}
