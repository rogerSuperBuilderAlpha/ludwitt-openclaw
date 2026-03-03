'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'

type CardSubject = 'math' | 'reading' | 'logic' | 'writing' | 'latin' | 'greek'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  subject?: CardSubject
  interactive?: boolean
  flat?: boolean
  elevated?: boolean
  children?: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      subject,
      interactive = false,
      flat = false,
      elevated = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'b-card',
      subject && `b-card-${subject}`,
      interactive && 'b-card-interactive',
      flat && 'b-card-flat',
      elevated && 'b-card-elevated',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Sub-components
interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  compact?: boolean
}

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`b-card-header ${className}`} {...props}>
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

export const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, compact = false, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`${compact ? 'b-card-body-compact' : 'b-card-body'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)
CardBody.displayName = 'CardBody'

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`b-card-footer ${className}`} {...props}>
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'
