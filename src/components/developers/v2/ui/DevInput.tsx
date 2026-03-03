'use client'

import { forwardRef } from 'react'

type InputSize = 'sm' | 'md' | 'lg'

interface DevInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'dev-input-sm',
  md: '',
  lg: 'dev-input-lg',
}

/**
 * DevInput - Base input component for the developer portal
 */
export const DevInput = forwardRef<HTMLInputElement, DevInputProps>(
  ({ 
    inputSize = 'md', 
    leftIcon,
    rightIcon,
    error = false,
    className = '', 
    style,
    ...props 
  }, ref) => {
    const hasIcon = leftIcon || rightIcon
    
    if (!hasIcon) {
      return (
        <input
          ref={ref}
          className={`dev-input ${sizeClasses[inputSize]} ${className}`}
          style={style}
          {...props}
        />
      )
    }

    return (
      <div 
        style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center',
          ...style,
        }}
      >
        {leftIcon && (
          <span 
            style={{ 
              position: 'absolute', 
              left: 'var(--dev-space-3)',
              color: 'var(--dev-text-muted)',
              pointerEvents: 'none',
            }}
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={`dev-input ${sizeClasses[inputSize]} ${className}`}
          style={{
            paddingLeft: leftIcon ? 'var(--dev-space-10)' : undefined,
            paddingRight: rightIcon ? 'var(--dev-space-10)' : undefined,
            width: '100%',
          }}
          {...props}
        />
        {rightIcon && (
          <span 
            style={{ 
              position: 'absolute', 
              right: 'var(--dev-space-3)',
              color: 'var(--dev-text-muted)',
              pointerEvents: 'none',
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
    )
  }
)

DevInput.displayName = 'DevInput'
