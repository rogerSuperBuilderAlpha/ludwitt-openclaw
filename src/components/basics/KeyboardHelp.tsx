/**
 * Keyboard Help Popover
 * Shows available keyboard shortcuts in a modal overlay
 */

'use client'

import { useEffect, useRef } from 'react'
import { Portal } from './Portal'

interface KeyboardHelpProps {
  isOpen: boolean
  onClose: () => void
}

interface Shortcut {
  key: string
  description: string
  category: string
}

const shortcuts: Shortcut[] = [
  { key: 'Enter', description: 'Submit your answer', category: 'Actions' },
  { key: 'S', description: 'Skip current problem', category: 'Actions' },
  { key: 'H', description: 'Show hint (if available)', category: 'Actions' },
  { key: 'F', description: 'Toggle focus mode', category: 'View' },
  { key: '?', description: 'Show this help', category: 'Help' },
  { key: 'Escape', description: 'Close modals/help', category: 'Help' },
]

export function KeyboardHelp({ isOpen, onClose }: KeyboardHelpProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement
    const focusModal = () => modalRef.current?.focus()
    const timeoutId = window.setTimeout(focusModal, 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const categories = [...new Set(shortcuts.map((s) => s.category))]

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 z-50" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-help-title"
          tabIndex={-1}
          className="bg-b-bg-page border b-border rounded-xl shadow-b-modal max-w-md w-full max-h-[80vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b b-border">
            <h2
              id="keyboard-help-title"
              className="text-lg font-semibold b-text-primary flex items-center gap-2 oxford-heading"
            >
              Keyboard Shortcuts
            </h2>
            <button
              onClick={onClose}
              className="p-2 b-text-muted hover:b-text-secondary rounded-lg hover:b-bg-muted transition-colors"
              aria-label="Close keyboard shortcuts"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold b-text-primary mb-2 oxford-heading">
                  {category}
                </h3>
                <div className="space-y-2">
                  {shortcuts
                    .filter((shortcut) => shortcut.category === category)
                    .map((shortcut) => (
                      <div
                        key={shortcut.key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm b-text-secondary">
                          {shortcut.description}
                        </span>
                        <kbd className="px-2 py-1 text-xs font-mono b-bg-card border b-border rounded">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            {/* Footer tip */}
            <div className="mt-6 p-3 b-bg-math-light border b-border-math rounded-lg">
              <p className="text-sm b-text-primary">
                Tip: Shortcuts work when not typing in input fields. Press{' '}
                <kbd className="px-1 py-0.5 b-bg-card border b-border rounded text-xs">
                  ?
                </kbd>{' '}
                anytime to see this help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
