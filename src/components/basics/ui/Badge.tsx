'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'math'
  | 'reading'
  | 'logic'
  | 'writing'
  | 'latin'
  | 'greek'
  | 'math-solid'
  | 'reading-solid'

type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  children?: ReactNode
  icon?: ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      children,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClass = size !== 'md' ? `b-badge-${size}` : ''

    const classes = ['b-badge', `b-badge-${variant}`, sizeClass, className]
      .filter(Boolean)
      .join(' ')

    return (
      <span ref={ref} className={classes} {...props}>
        {icon}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
