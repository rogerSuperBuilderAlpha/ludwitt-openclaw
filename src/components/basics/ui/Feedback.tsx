'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'

type FeedbackVariant = 'success' | 'error' | 'warning' | 'info'

interface FeedbackProps extends HTMLAttributes<HTMLDivElement> {
  variant: FeedbackVariant
  icon?: ReactNode
  children?: ReactNode
}

export const Feedback = forwardRef<HTMLDivElement, FeedbackProps>(
  ({ variant, icon, children, className = '', ...props }, ref) => {
    const classes = ['b-feedback', `b-feedback-${variant}`, className]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        {icon}
        <div>{children}</div>
      </div>
    )
  }
)

Feedback.displayName = 'Feedback'
