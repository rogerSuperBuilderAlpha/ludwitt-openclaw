'use client'

import { ReactNode } from 'react'
import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react'

interface DevStatCardProps {
  title: string
  value: string | number
  trend?: {
    value: number
    label?: string
  }
  icon?: ReactNode
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const colorMap = {
  default: 'var(--dev-text-primary)',
  success: 'var(--dev-accent-success)',
  warning: 'var(--dev-accent-warning)',
  danger: 'var(--dev-accent-danger)',
  info: 'var(--dev-accent-info)',
}

/**
 * DevStatCard - Metric card with optional trend indicator
 */
export function DevStatCard({
  title,
  value,
  trend,
  icon,
  color = 'default',
  size = 'md',
}: DevStatCardProps) {
  const getTrendColor = () => {
    if (!trend) return 'var(--dev-text-muted)'
    if (trend.value > 0) return 'var(--dev-accent-success)'
    if (trend.value < 0) return 'var(--dev-accent-danger)'
    return 'var(--dev-text-muted)'
  }

  const TrendIcon = trend 
    ? trend.value > 0 
      ? TrendUp 
      : trend.value < 0 
        ? TrendDown 
        : Minus
    : null

  const sizeStyles = {
    sm: {
      padding: 'var(--dev-space-3)',
      titleSize: 'var(--dev-text-xs)',
      valueSize: 'var(--dev-text-xl)',
      trendSize: 'var(--dev-text-2xs)',
    },
    md: {
      padding: 'var(--dev-space-4)',
      titleSize: 'var(--dev-text-sm)',
      valueSize: 'var(--dev-text-2xl)',
      trendSize: 'var(--dev-text-xs)',
    },
    lg: {
      padding: 'var(--dev-space-5)',
      titleSize: 'var(--dev-text-sm)',
      valueSize: 'var(--dev-text-3xl)',
      trendSize: 'var(--dev-text-sm)',
    },
  }

  const styles = sizeStyles[size]

  return (
    <div 
      style={{
        background: 'var(--dev-bg-elevated)',
        border: '1px solid var(--dev-border-subtle)',
        borderRadius: 'var(--dev-radius-lg)',
        padding: styles.padding,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--dev-space-2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span 
          style={{
            fontSize: styles.titleSize,
            color: 'var(--dev-text-muted)',
            fontWeight: 'var(--dev-font-medium)',
          }}
        >
          {title}
        </span>
        {icon && (
          <span style={{ color: colorMap[color], opacity: 0.8 }}>
            {icon}
          </span>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--dev-space-2)' }}>
        <span 
          style={{
            fontSize: styles.valueSize,
            fontWeight: 'var(--dev-font-bold)',
            color: colorMap[color],
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        
        {trend && TrendIcon && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              fontSize: styles.trendSize,
              color: getTrendColor(),
            }}
          >
            <TrendIcon size={12} weight="bold" />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      {trend?.label && (
        <span 
          style={{
            fontSize: 'var(--dev-text-2xs)',
            color: 'var(--dev-text-muted)',
          }}
        >
          {trend.label}
        </span>
      )}
    </div>
  )
}
