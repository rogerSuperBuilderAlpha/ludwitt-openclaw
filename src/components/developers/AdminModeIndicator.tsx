'use client'

interface AdminModeIndicatorProps {
  userIsAdmin: boolean
  adminViewMode: 'developer' | 'admin'
}

export function AdminModeIndicator({
  userIsAdmin,
  adminViewMode,
}: AdminModeIndicatorProps) {
  if (!userIsAdmin) return null
  return (
    <div
      className={`max-w-7xl mx-auto px-6 py-2 border-t ${
        adminViewMode === 'admin'
          ? 'bg-purple-50 border-purple-200'
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <p className="text-xs font-medium text-center">
        {adminViewMode === 'admin'
          ? '⚡ Admin Mode: Viewing ALL documents & can assign to any developer'
          : '👤 Developer Mode: Viewing only YOUR assigned work (simulating regular developer experience)'}
      </p>
    </div>
  )
}
