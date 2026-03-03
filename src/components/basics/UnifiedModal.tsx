/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { X, CaretLeft } from '@phosphor-icons/react'
import { Portal } from './Portal'

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type ModalPosition = 'center' | 'bottom' | 'top'

interface UnifiedModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  icon?: ReactNode
  size?: ModalSize
  position?: ModalPosition
  children: ReactNode
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
  onBack?: () => void
  footer?: ReactNode
  headerRight?: ReactNode
  noPadding?: boolean
  simpleHeader?: boolean
}

const sizeClasses: Record<ModalSize, string> = {
  xs: 'b-modal-xs',
  sm: 'b-modal-sm',
  md: 'b-modal-md',
  lg: 'b-modal-lg',
  xl: 'b-modal-xl',
  '2xl': 'b-modal-2xl',
  full: 'b-modal-full',
}

const positionClasses: Record<ModalPosition, string> = {
  center: 'items-center justify-center',
  bottom: 'items-end justify-center pb-0',
  top: 'items-start justify-center pt-8',
}

export function UnifiedModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  size = 'md',
  position = 'center',
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
  onBack,
  footer,
  headerRight,
  noPadding = false,
  simpleHeader = false,
}: UnifiedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return

    // Store previous focus
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus the modal after a brief delay (for animation)
    const focusTimer = setTimeout(() => modalRef.current?.focus(), 50)

    // Trap focus inside modal and handle Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      // Return focus to previous element
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Portal>
      {/* Backdrop */}
      <div
        className="b-modal-backdrop"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className={`b-modal-container ${position === 'bottom' ? 'pb-0' : ''}`}
      >
        <div className={`flex min-h-full w-full ${positionClasses[position]}`}>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="unified-modal-title"
            aria-describedby={subtitle ? 'unified-modal-subtitle' : undefined}
            tabIndex={-1}
            className={`b-modal ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={
                simpleHeader
                  ? 'b-modal-header b-modal-header-simple'
                  : 'b-modal-header'
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="b-btn b-btn-ghost b-btn-icon b-btn-sm"
                    aria-label="Go back"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </button>
                )}
                {icon && (
                  <div className="b-icon-box b-icon-box-sm b-bg-elevated b-border b-text-primary">
                    {icon}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 id="unified-modal-title" className="b-modal-title">
                    {title}
                  </h2>
                  {subtitle && (
                    <p id="unified-modal-subtitle" className="b-modal-subtitle">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {headerRight}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="b-modal-close"
                    aria-label="Close modal"
                  >
                    <X size={20} weight="bold" />
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div
              className={
                noPadding ? 'b-modal-body b-modal-body-flush' : 'b-modal-body'
              }
            >
              {children}
            </div>

            {/* Footer (optional) */}
            {footer && <div className="b-modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </Portal>
  )
}
