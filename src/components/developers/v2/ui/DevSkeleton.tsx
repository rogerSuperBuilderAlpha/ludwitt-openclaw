'use client'

interface DevSkeletonProps {
  width?: number | string
  height?: number | string
  circle?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * DevSkeleton - Loading skeleton placeholder
 */
export function DevSkeleton({ 
  width, 
  height = 16, 
  circle = false,
  className = '',
  style = {},
}: DevSkeletonProps) {
  return (
    <div 
      className={`dev-skeleton ${className}`}
      style={{
        width: circle ? height : (width ?? '100%'),
        height,
        borderRadius: circle ? '50%' : undefined,
        ...style,
      }}
    />
  )
}

/**
 * DevSkeletonCard - Pre-configured skeleton for card loading states
 */
export function DevSkeletonCard() {
  return (
    <div className="dev-card" style={{ padding: 'var(--dev-space-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--dev-space-3)', marginBottom: 'var(--dev-space-3)' }}>
        <DevSkeleton width={32} height={32} circle />
        <div style={{ flex: 1 }}>
          <DevSkeleton width="60%" height={14} />
          <div style={{ height: 'var(--dev-space-2)' }} />
          <DevSkeleton width="40%" height={12} />
        </div>
      </div>
      <DevSkeleton height={12} />
      <div style={{ height: 'var(--dev-space-2)' }} />
      <DevSkeleton width="80%" height={12} />
    </div>
  )
}
