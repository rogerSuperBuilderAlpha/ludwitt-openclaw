'use client'

import { ReactNode } from 'react'
import { DevButton } from './DevButton'

interface DevEmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'ghost'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  compact?: boolean
}

/**
 * DevEmptyState - Empty state display for pages with no content
 * 
 * Features:
 * - Icon, title, description
 * - Optional primary and secondary actions
 * - Compact mode for smaller containers
 */
export function DevEmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
}: DevEmptyStateProps) {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: compact ? 'var(--dev-space-6)' : 'var(--dev-space-12)',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      {icon && (
        <div 
          style={{
            width: compact ? 48 : 64,
            height: compact ? 48 : 64,
            borderRadius: 'var(--dev-radius-xl)',
            background: 'var(--dev-bg-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: compact ? 'var(--dev-space-3)' : 'var(--dev-space-4)',
            color: 'var(--dev-text-muted)',
          }}
        >
          {icon}
        </div>
      )}
      
      <h3 
        style={{
          fontSize: compact ? 'var(--dev-text-base)' : 'var(--dev-text-lg)',
          fontWeight: 'var(--dev-font-semibold)',
          color: 'var(--dev-text-primary)',
          marginBottom: 'var(--dev-space-2)',
        }}
      >
        {title}
      </h3>
      
      {description && (
        <p 
          style={{
            fontSize: 'var(--dev-text-sm)',
            color: 'var(--dev-text-muted)',
            lineHeight: 'var(--dev-leading-relaxed)',
            marginBottom: action ? 'var(--dev-space-4)' : 0,
          }}
        >
          {description}
        </p>
      )}
      
      {(action || secondaryAction) && (
        <div style={{ display: 'flex', gap: 'var(--dev-space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {action && (
            <DevButton 
              variant={action.variant || 'primary'} 
              size={compact ? 'sm' : 'md'}
              onClick={action.onClick}
            >
              {action.label}
            </DevButton>
          )}
          {secondaryAction && (
            <DevButton 
              variant="ghost" 
              size={compact ? 'sm' : 'md'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </DevButton>
          )}
        </div>
      )}
    </div>
  )
}
