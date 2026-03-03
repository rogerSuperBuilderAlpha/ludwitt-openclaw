/**
 * Alert Component
 * 
 * Standardized alert/notification UI component
 */

import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface AlertProps {
  type: 'error' | 'success' | 'warning' | 'info'
  children: React.ReactNode
  className?: string
  icon?: boolean
}

export function Alert({ type, children, className = '', icon = true }: AlertProps) {
  const styles = {
    error: {
      container: 'bg-red-50 border border-red-200 text-red-800',
      icon: AlertCircle
    },
    success: {
      container: 'bg-green-50 border border-green-200 text-green-800',
      icon: CheckCircle
    },
    warning: {
      container: 'bg-yellow-50 border-2 border-yellow-200 text-yellow-900',
      icon: AlertTriangle
    },
    info: {
      container: 'bg-blue-50 border border-blue-200 text-blue-900',
      icon: Info
    }
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`rounded-lg p-3 text-sm ${style.container} ${className}`}>
      <div className="flex items-start gap-2">
        {icon && <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

