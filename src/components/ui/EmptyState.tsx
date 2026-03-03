'use client'

import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  emoji?: string
  title: string
  description?: string
  action?: ReactNode
  variant?: 'simple' | 'gradient' | 'card'
  className?: string
}

export function EmptyState({
  icon,
  emoji,
  title,
  description,
  action,
  variant = 'simple',
  className = '',
}: EmptyStateProps) {
  if (variant === 'gradient') {
    return (
      <div
        className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg p-12 text-center border-2 border-purple-200 ${className}`}
      >
        {emoji && <div className="text-6xl mb-4">{emoji}</div>}
        {icon && !emoji && (
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
        )}
        <h3 className="text-3xl font-bold text-gray-900 mb-3">{title}</h3>
        {description && (
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            {description}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={`bg-white rounded-lg shadow p-12 text-center ${className}`}
      >
        {emoji && <div className="text-6xl mb-4">{emoji}</div>}
        {icon && !emoji && (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
        )}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-700 mb-6">{description}</p>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    )
  }

  // Simple variant (default)
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      {emoji && <div className="text-4xl mb-4">{emoji}</div>}
      {icon && !emoji && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
