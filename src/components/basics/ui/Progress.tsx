'use client'

import { forwardRef, HTMLAttributes } from 'react'

type ProgressSubject =
  | 'math'
  | 'reading'
  | 'logic'
  | 'writing'
  | 'latin'
  | 'greek'
  | 'gradient'
type ProgressSize = 'sm' | 'md' | 'lg'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  max?: number
  subject?: ProgressSubject
  size?: ProgressSize
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    { value, max = 100, subject, size = 'md', className = '', ...props },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    const sizeClass = size !== 'md' ? `b-progress-${size}` : ''
    const subjectClass = subject ? `b-progress-${subject}` : ''

    const classes = ['b-progress', sizeClass, subjectClass, className]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        <div
          className="b-progress-bar"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    )
  }
)

Progress.displayName = 'Progress'
