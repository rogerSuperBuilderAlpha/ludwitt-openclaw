'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'

type IconBoxSubject =
  | 'math'
  | 'reading'
  | 'logic'
  | 'writing'
  | 'latin'
  | 'greek'
type IconBoxSize = 'sm' | 'md' | 'lg' | 'xl'

interface IconBoxProps extends HTMLAttributes<HTMLDivElement> {
  subject?: IconBoxSubject
  size?: IconBoxSize
  soft?: boolean
  children?: ReactNode
}

export const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
  (
    {
      subject = 'math',
      size = 'md',
      soft = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const subjectClass = soft
      ? `b-icon-box-${subject}-soft`
      : `b-icon-box-${subject}`

    const classes = [
      'b-icon-box',
      `b-icon-box-${size}`,
      subjectClass,
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

IconBox.displayName = 'IconBox'
