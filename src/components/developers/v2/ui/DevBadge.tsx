'use client'

type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info'
  | 'available'
  | 'in-progress'
  | 'review'
  | 'done'
  | 'archived'
  | 'urgent'
  | 'high'
  | 'medium'
  | 'low'

type BadgeSize = 'sm' | 'md'

interface DevBadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'dev-badge-default',
  primary: 'dev-badge-primary',
  success: 'dev-badge-success',
  warning: 'dev-badge-warning',
  danger: 'dev-badge-danger',
  info: 'dev-badge-info',
  available: 'dev-badge-available',
  'in-progress': 'dev-badge-in-progress',
  review: 'dev-badge-review',
  done: 'dev-badge-done',
  archived: 'dev-badge-archived',
  urgent: 'dev-badge-urgent',
  high: 'dev-badge-high',
  medium: 'dev-badge-medium',
  low: 'dev-badge-low',
}

/**
 * DevBadge - Status/label badge component
 */
export function DevBadge({ 
  variant = 'default', 
  size = 'md',
  icon,
  children, 
  className = '' 
}: DevBadgeProps) {
  const classes = [
    'dev-badge',
    variantClasses[variant],
    size === 'sm' ? 'dev-badge-sm' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      {icon}
      {children}
    </span>
  )
}
