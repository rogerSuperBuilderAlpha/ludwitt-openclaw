'use client'

import { forwardRef, HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  light?: boolean
  vertical?: boolean
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ light = false, vertical = false, className = '', ...props }, ref) => {
    const classes = [
      'b-divider',
      light && 'b-divider-light',
      vertical && 'b-divider-vertical',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return <hr ref={ref} className={classes} {...props} />
  }
)

Divider.displayName = 'Divider'
