'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'

type SectionSubject =
  | 'math'
  | 'reading'
  | 'logic'
  | 'writing'
  | 'latin'
  | 'greek'

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  subject?: SectionSubject
  children?: ReactNode
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ subject, children, className = '', ...props }, ref) => {
    const classes = ['b-section', subject && `b-section-${subject}`, className]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

Section.displayName = 'Section'

// Sub-components
interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`b-section-header ${className}`} {...props}>
      {children}
    </div>
  )
)
SectionHeader.displayName = 'SectionHeader'

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
}

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ children, className = '', ...props }, ref) => (
    <h3 ref={ref} className={`b-section-title ${className}`} {...props}>
      {children}
    </h3>
  )
)
SectionTitle.displayName = 'SectionTitle'

interface SectionBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const SectionBody = forwardRef<HTMLDivElement, SectionBodyProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`b-section-body ${className}`} {...props}>
      {children}
    </div>
  )
)
SectionBody.displayName = 'SectionBody'
