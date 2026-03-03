/**
 * Keyboard Shortcuts Hook for Developer Dashboard
 * 
 * Provides global keyboard navigation throughout the developer portal.
 */

import { useEffect, useCallback, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export interface ShortcutConfig {
  key: string
  modifiers?: ('ctrl' | 'alt' | 'shift' | 'meta')[]
  action: () => void
  description: string
  category: 'navigation' | 'actions' | 'global'
}

interface UseKeyboardShortcutsOptions {
  enabled?: boolean
  onShortcutTriggered?: (key: string, description: string) => void
}

/**
 * Hook to handle keyboard shortcuts in the developer dashboard
 */
export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const { enabled = true, onShortcutTriggered } = options
  const router = useRouter()
  const pathname = usePathname()
  
  // Track if we're waiting for a second key (for "g then x" shortcuts)
  const [pendingPrefix, setPendingPrefix] = useState<string | null>(null)
  
  // Clear pending prefix after timeout
  useEffect(() => {
    if (pendingPrefix) {
      const timeout = setTimeout(() => setPendingPrefix(null), 1500)
      return () => clearTimeout(timeout)
    }
  }, [pendingPrefix])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return
    }

    const key = event.key.toLowerCase()
    const hasModifier = event.ctrlKey || event.altKey || event.metaKey

    // Handle "g then x" navigation shortcuts
    if (pendingPrefix === 'g' && !hasModifier) {
      event.preventDefault()
      setPendingPrefix(null)
      
      const navigationMap: Record<string, string> = {
        'd': '/developers/dashboard',
        'o': '/developers',
        'q': '/developers/queue',
        's': '/developers/starred',
        'c': '/developers/customers',
        'm': '/developers/messages',
        'n': '/developers/notifications',
        'r': '/developers/revenue',
        'p': '/developers/performance',
        't': '/developers/team',
        'f': '/developers/focus',
        'a': '/developers/activity',
      }
      
      if (navigationMap[key]) {
        router.push(navigationMap[key])
        onShortcutTriggered?.(`g ${key}`, `Navigate to ${navigationMap[key]}`)
      }
      return
    }

    // Start "g" prefix sequence
    if (key === 'g' && !hasModifier) {
      setPendingPrefix('g')
      return
    }

    // Single key shortcuts
    switch (key) {
      case '?':
        // Show shortcuts help
        event.preventDefault()
        router.push('/developers/shortcuts')
        onShortcutTriggered?.('?', 'Show shortcuts')
        break
        
      case 'escape':
        // Close modals/menus - handled by individual components
        break
        
      case '/':
        // Focus search (would need search component integration)
        event.preventDefault()
        onShortcutTriggered?.('/', 'Focus search')
        // Could dispatch custom event for search component to listen
        window.dispatchEvent(new CustomEvent('dev:focus-search'))
        break
        
      case 'n':
        if (event.shiftKey) {
          // New document
          event.preventDefault()
          onShortcutTriggered?.('N', 'New document')
          window.dispatchEvent(new CustomEvent('dev:open-add-modal'))
        }
        break
    }

    // Modifier shortcuts
    if (event.metaKey || event.ctrlKey) {
      switch (key) {
        case 'k':
          // Command palette (future feature)
          event.preventDefault()
          onShortcutTriggered?.('⌘K', 'Command palette')
          break
          
        case '\\':
          // Toggle sidebar
          event.preventDefault()
          onShortcutTriggered?.('⌘\\', 'Toggle sidebar')
          window.dispatchEvent(new CustomEvent('dev:toggle-sidebar'))
          break
          
        case '.':
          // Open settings
          event.preventDefault()
          router.push('/developers/settings')
          onShortcutTriggered?.('⌘.', 'Open settings')
          break
      }
    }
  }, [router, pendingPrefix, onShortcutTriggered])

  useEffect(() => {
    if (!enabled) return
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enabled, handleKeyDown])

  return {
    pendingPrefix,
    isWaitingForSecondKey: pendingPrefix !== null,
  }
}

/**
 * All available shortcuts for documentation
 */
export const allShortcuts: ShortcutConfig[] = [
  // Navigation
  { key: 'g d', action: () => {}, description: 'Go to Dashboard', category: 'navigation' },
  { key: 'g o', action: () => {}, description: 'Go to Documents', category: 'navigation' },
  { key: 'g q', action: () => {}, description: 'Go to My Queue', category: 'navigation' },
  { key: 'g s', action: () => {}, description: 'Go to Starred', category: 'navigation' },
  { key: 'g c', action: () => {}, description: 'Go to Customers', category: 'navigation' },
  { key: 'g m', action: () => {}, description: 'Go to Messages', category: 'navigation' },
  { key: 'g n', action: () => {}, description: 'Go to Notifications', category: 'navigation' },
  { key: 'g r', action: () => {}, description: 'Go to Revenue', category: 'navigation' },
  { key: 'g p', action: () => {}, description: 'Go to Performance', category: 'navigation' },
  { key: 'g t', action: () => {}, description: 'Go to Team', category: 'navigation' },
  { key: 'g f', action: () => {}, description: 'Go to Focus Mode', category: 'navigation' },
  { key: 'g a', action: () => {}, description: 'Go to Activity', category: 'navigation' },
  
  // Actions
  { key: 'N', action: () => {}, description: 'New document', category: 'actions', modifiers: ['shift'] },
  { key: '/', action: () => {}, description: 'Focus search', category: 'actions' },
  { key: '?', action: () => {}, description: 'Show shortcuts', category: 'actions' },
  { key: 'Escape', action: () => {}, description: 'Close modal/menu', category: 'actions' },
  
  // Global
  { key: '⌘ K', action: () => {}, description: 'Command palette', category: 'global', modifiers: ['meta'] },
  { key: '⌘ \\', action: () => {}, description: 'Toggle sidebar', category: 'global', modifiers: ['meta'] },
  { key: '⌘ .', action: () => {}, description: 'Open settings', category: 'global', modifiers: ['meta'] },
]
