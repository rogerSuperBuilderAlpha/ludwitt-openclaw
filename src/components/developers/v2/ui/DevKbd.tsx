'use client'

interface DevKbdProps {
  children: React.ReactNode
  className?: string
}

/**
 * DevKbd - Keyboard shortcut display component
 */
export function DevKbd({ children, className = '' }: DevKbdProps) {
  return (
    <kbd className={`dev-kbd ${className}`}>
      {children}
    </kbd>
  )
}
