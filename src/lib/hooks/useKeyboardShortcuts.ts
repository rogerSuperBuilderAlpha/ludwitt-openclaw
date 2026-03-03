/**
 * Keyboard Shortcuts Hook
 * Manages global keyboard shortcuts for the Basics Dashboard
 */

import { useEffect, useCallback } from 'react'

export interface KeyboardShortcuts {
  onSubmit?: () => void
  onSkip?: () => void
  onHint?: () => void
  onFocus?: () => void
  onHelp?: () => void
  onEscape?: () => void
  onQuickActions?: () => void
  onPowerUps?: () => void
  onVoiceInput?: () => void
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts, enabled: boolean = true) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return
    
    // Don't trigger shortcuts when typing in inputs - let normal text editing work
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      // Let arrow keys, backspace, delete, home, end, etc. work normally in inputs
      // Only intercept Enter for submit (textarea handles Shift+Enter itself)
      if (event.key === 'Enter' && !event.shiftKey && shortcuts.onSubmit) {
        event.preventDefault()
        shortcuts.onSubmit()
      }
      // CRITICAL: Always return early for inputs - never intercept other keys
      return
    }

    // Handle shortcuts
    switch (event.key.toLowerCase()) {
      case 'enter':
        if (shortcuts.onSubmit) {
          event.preventDefault()
          shortcuts.onSubmit()
        }
        break
      case 's':
        if (shortcuts.onSkip) {
          event.preventDefault()
          shortcuts.onSkip()
        }
        break
      case 'h':
        if (shortcuts.onHint) {
          event.preventDefault()
          shortcuts.onHint()
        }
        break
      case 'f':
        if (shortcuts.onFocus) {
          event.preventDefault()
          shortcuts.onFocus()
        }
        break
      case 'q':
        if (shortcuts.onQuickActions) {
          event.preventDefault()
          shortcuts.onQuickActions()
        }
        break
      case 'p':
        if (shortcuts.onPowerUps) {
          event.preventDefault()
          shortcuts.onPowerUps()
        }
        break
      case 'v':
        if (shortcuts.onVoiceInput) {
          event.preventDefault()
          shortcuts.onVoiceInput()
        }
        break
      case '?':
        if (shortcuts.onHelp) {
          event.preventDefault()
          shortcuts.onHelp()
        }
        break
      case 'escape':
        if (shortcuts.onEscape) {
          event.preventDefault()
          shortcuts.onEscape()
        }
        break
    }
  }, [shortcuts, enabled])

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, enabled])
}
