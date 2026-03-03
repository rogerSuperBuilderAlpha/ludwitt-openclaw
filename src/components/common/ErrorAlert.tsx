'use client'

import { ReactNode } from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ErrorAlertProps {
  message: string
  title?: string
  icon?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  action?: ReactNode
  className?: string
}

export function ErrorAlert({
  message,
  title,
  icon,
  dismissible = false,
  onDismiss,
  action,
  className = '',
}: ErrorAlertProps) {
  if (!message) return null

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-lg p-4 mb-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon || (
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-semibold text-red-900 mb-1">{title}</h3>
          )}
          <p className="text-red-800 text-sm">{message}</p>
          {action && <div className="mt-3">{action}</div>}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors p-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
