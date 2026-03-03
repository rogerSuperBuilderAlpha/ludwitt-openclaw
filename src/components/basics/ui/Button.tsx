'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'success'
  | 'warning'
  | 'math'
  | 'reading'
  | 'logic'
  | 'writing'
  | 'latin'
  | 'greek'
  | 'math-soft'
  | 'reading-soft'
  | 'logic-soft'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: boolean
  circle?: boolean
  full?: boolean
  children?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon = false,
      circle = false,
      full = false,
      children,
      leftIcon,
      rightIcon,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'b-btn',
      `b-btn-${size}`,
      `b-btn-${variant}`,
      icon && 'b-btn-icon',
      circle && 'b-btn-circle',
      full && 'b-btn-full',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classes} {...props}>
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
