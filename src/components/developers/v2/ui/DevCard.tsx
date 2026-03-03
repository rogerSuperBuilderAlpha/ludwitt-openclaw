/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
'use client'

import { forwardRef } from 'react'

interface DevCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingStyles: Record<string, React.CSSProperties> = {
  none: { padding: 0 },
  sm: { padding: 'var(--dev-space-3)' },
  md: { padding: 'var(--dev-space-4)' },
  lg: { padding: 'var(--dev-space-6)' },
}

/**
 * DevCard - Container card component
 */
export const DevCard = forwardRef<HTMLDivElement, DevCardProps>(
  (
    {
      interactive = false,
      padding = 'md',
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const classes = [
      'dev-card',
      interactive ? 'dev-card-interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        style={{ ...paddingStyles[padding], ...style }}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DevCard.displayName = 'DevCard'
