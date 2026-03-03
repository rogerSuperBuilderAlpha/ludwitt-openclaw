/**
 * StatusBadge Component
 * Shows the status of a document or project
 */

import {
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  PlayCircle,
} from 'lucide-react'

interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StatusBadge({
  status,
  size = 'md',
  className = '',
}: StatusBadgeProps) {
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
  }

  // Status configurations
  const statusConfig: Record<
    string,
    {
      label: string
      color: string
      icon: any
    }
  > = {
    pending: {
      label: 'Pending',
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock,
    },
    approved: {
      label: 'Approved',
      color: 'bg-blue-100 text-blue-800',
      icon: CheckCircle,
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-indigo-100 text-indigo-800',
      icon: PlayCircle,
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
    },
    intake: {
      label: 'Intake',
      color: 'bg-gray-100 text-gray-800',
      icon: AlertCircle,
    },
    discovery: {
      label: 'Discovery',
      color: 'bg-purple-100 text-purple-800',
      icon: AlertCircle,
    },
    review: {
      label: 'Review',
      color: 'bg-orange-100 text-orange-800',
      icon: AlertCircle,
    },
    'on-hold': {
      label: 'On Hold',
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
    },
  }

  const config = statusConfig[status] || {
    label: status,
    color: 'bg-gray-100 text-gray-800',
    icon: AlertCircle,
  }

  const Icon = config.icon

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${sizeStyles[size]} ${config.color} rounded font-medium ${className}`}
    >
      <Icon className={iconSizes[size]} />
      <span>{config.label}</span>
    </div>
  )
}
