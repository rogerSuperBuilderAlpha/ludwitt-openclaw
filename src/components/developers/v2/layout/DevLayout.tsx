'use client'

import { useEffect, useState } from 'react'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { DevSidebar } from './DevSidebar'
import { DevHeader } from './DevHeader'
import { CommandPalette } from '../CommandPalette'
import { DevModalsHost } from '../modals'
import { useKeyboardShortcuts } from '@/lib/hooks/developers/useKeyboardShortcuts'
import '@/styles/developers.css'

interface DevLayoutProps {
  children: React.ReactNode
}

/**
 * DevLayout - Main layout wrapper for the Developer Portal
 * 
 * Features:
 * - Dark/light theme support
 * - Collapsible sidebar
 * - Global command palette
 * - Keyboard shortcuts
 */
export function DevLayout({ children }: DevLayoutProps) {
  const { theme, sidebarCollapsed, toggleSidebar, commandPaletteOpen, toggleCommandPalette, closeCommandPalette, openModal } = useDevPortalStore()
  const [shortcutIndicator, setShortcutIndicator] = useState<string | null>(null)

  // Use keyboard shortcuts hook
  const { isWaitingForSecondKey, pendingPrefix } = useKeyboardShortcuts({
    enabled: true,
    onShortcutTriggered: (key, description) => {
      setShortcutIndicator(description)
      setTimeout(() => setShortcutIndicator(null), 1500)
    },
  })

  // Listen for custom events from keyboard shortcuts
  useEffect(() => {
    const handleToggleSidebar = () => toggleSidebar()
    const handleOpenAddModal = () => openModal('add-document')
    
    window.addEventListener('dev:toggle-sidebar', handleToggleSidebar)
    window.addEventListener('dev:open-add-modal', handleOpenAddModal)
    
    return () => {
      window.removeEventListener('dev:toggle-sidebar', handleToggleSidebar)
      window.removeEventListener('dev:open-add-modal', handleOpenAddModal)
    }
  }, [toggleSidebar, openModal])

  // Global keyboard shortcuts for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K - Toggle command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
      
      // Escape - Close command palette
      if (e.key === 'Escape' && commandPaletteOpen) {
        closeCommandPalette()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, toggleCommandPalette, closeCommandPalette])

  return (
    <div 
      className="dev-portal"
      data-dev-theme={theme}
      style={{
        display: 'flex',
        height: 'calc(100vh - var(--strip-height, 0px))',
        overflow: 'hidden'
      }}
    >
      {/* Sidebar */}
      <DevSidebar />

      {/* Main Content Area */}
      <div 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          marginLeft: sidebarCollapsed ? 'var(--dev-sidebar-collapsed)' : 'var(--dev-sidebar-width)',
          transition: 'margin-left var(--dev-duration-slow) var(--dev-ease-in-out)',
        }}
      >
        {/* Header */}
        <DevHeader />

        {/* Page Content */}
        <main 
          style={{ 
            flex: 1, 
            overflow: 'auto',
            background: 'var(--dev-bg-base)',
          }}
        >
          {children}
        </main>
      </div>

      {/* Command Palette (Global) */}
      {commandPaletteOpen && <CommandPalette />}

      {/* Modals Host (Global) */}
      <DevModalsHost />

      {/* Shortcut Indicator */}
      {(shortcutIndicator || isWaitingForSecondKey) && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: 'var(--dev-space-2) var(--dev-space-4)',
          background: 'var(--dev-bg-elevated)',
          border: '1px solid var(--dev-border-default)',
          borderRadius: 'var(--dev-radius-lg)',
          boxShadow: 'var(--dev-shadow-lg)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--dev-space-2)',
          fontSize: 'var(--dev-text-sm)',
        }}>
          {isWaitingForSecondKey && !shortcutIndicator && (
            <>
              <kbd style={{
                padding: '2px 6px',
                background: 'var(--dev-bg-muted)',
                border: '1px solid var(--dev-border-default)',
                borderRadius: 4,
                fontFamily: 'var(--dev-font-mono)',
                fontSize: 'var(--dev-text-xs)',
              }}>
                {pendingPrefix}
              </kbd>
              <span style={{ color: 'var(--dev-text-muted)' }}>waiting for next key...</span>
            </>
          )}
          {shortcutIndicator && (
            <span style={{ color: 'var(--dev-accent-success)' }}>✓ {shortcutIndicator}</span>
          )}
        </div>
      )}
    </div>
  )
}
