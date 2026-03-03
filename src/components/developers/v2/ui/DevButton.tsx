'use client'

import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface DevButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  as?: 'button' | 'a'
}

type DevButtonProps = DevButtonBaseProps & 
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' })
  )

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'dev-btn-primary',
  secondary: 'dev-btn-secondary',
  ghost: 'dev-btn-ghost',
  danger: 'dev-btn-danger',
  success: 'dev-btn-success',
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'dev-btn-xs',
  sm: 'dev-btn-sm',
  md: '',
  lg: 'dev-btn-lg',
}

/**
 * DevButton - Base button component for the developer portal
 * Supports rendering as a button or anchor element via the `as` prop
 */
export const DevButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, DevButtonProps>(
  ({ 
    variant = 'secondary', 
    size = 'md', 
    icon = false,
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    className = '', 
    as = 'button',
    ...props 
  }, ref) => {
    const classes = [
      'dev-btn',
      variantClasses[variant],
      sizeClasses[size],
      icon ? 'dev-btn-icon' : '',
      className,
    ].filter(Boolean).join(' ')

    const content = (
      <>
        {loading ? (
          <span 
            style={{ 
              width: 14, 
              height: 14, 
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }} 
          />
        ) : leftIcon}
        {children}
        {rightIcon}
      </>
    )

    if (as === 'a') {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorProps}
        >
          {content}
        </a>
      )
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={buttonProps.disabled || loading}
        {...buttonProps}
      >
        {content}
      </button>
    )
  }
)

DevButton.displayName = 'DevButton'
