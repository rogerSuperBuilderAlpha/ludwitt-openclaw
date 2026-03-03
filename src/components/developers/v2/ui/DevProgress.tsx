'use client'

type ProgressSize = 'sm' | 'md' | 'lg'
type ProgressColor = 'primary' | 'success' | 'warning' | 'danger'

interface DevProgressProps {
  value: number
  max?: number
  size?: ProgressSize
  color?: ProgressColor
  showLabel?: boolean
  className?: string
}

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'dev-progress-sm',
  md: '',
  lg: 'dev-progress-lg',
}

const colorStyles: Record<ProgressColor, string> = {
  primary: 'var(--dev-accent-primary)',
  success: 'var(--dev-accent-success)',
  warning: 'var(--dev-accent-warning)',
  danger: 'var(--dev-accent-danger)',
}

/**
 * DevProgress - Progress bar component
 */
export function DevProgress({ 
  value, 
  max = 100, 
  size = 'md',
  color = 'primary',
  showLabel = false,
  className = '' 
}: DevProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)' }}>
      <div className={`dev-progress ${sizeClasses[size]} ${className}`} style={{ flex: 1 }}>
        <div 
          className="dev-progress-bar" 
          style={{ 
            width: `${percentage}%`,
            background: colorStyles[color],
          }} 
        />
      </div>
      {showLabel && (
        <span 
          style={{ 
            fontSize: 'var(--dev-text-xs)', 
            color: 'var(--dev-text-muted)',
            minWidth: 32,
            textAlign: 'right',
          }}
        >
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}
