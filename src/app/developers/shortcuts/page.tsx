'use client'

import { Keyboard } from '@phosphor-icons/react'
import { DevCard } from '@/components/developers/v2/ui'
import { allShortcuts } from '@/lib/hooks/developers/useKeyboardShortcuts'

/**
 * Keyboard Shortcuts Page
 */
export default function ShortcutsPage() {
  const navigationShortcuts = allShortcuts.filter(s => s.category === 'navigation')
  const actionShortcuts = allShortcuts.filter(s => s.category === 'actions')
  const globalShortcuts = allShortcuts.filter(s => s.category === 'global')

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
      }}>
        <h1 style={{ fontSize: 'var(--dev-text-xl)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-1)' }}>
          Keyboard Shortcuts
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Quick reference for all available shortcuts
        </p>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-5)' }}>
          {/* Global Shortcuts */}
          <div>
            <h2 style={{ 
              fontSize: 'var(--dev-text-sm)', 
              fontWeight: 'var(--dev-font-semibold)',
              color: 'var(--dev-text-muted)',
              marginBottom: 'var(--dev-space-3)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dev-space-2)',
            }}>
              <Keyboard size={16} />
              Global
            </h2>
            <DevCard padding="md">
              <div style={{ display: 'grid', gap: 'var(--dev-space-2)' }}>
                {globalShortcuts.map((shortcut, i) => (
                  <ShortcutRow key={i} shortcut={shortcut.key} label={shortcut.description} />
                ))}
              </div>
            </DevCard>
          </div>

          {/* Navigation Shortcuts */}
          <div>
            <h2 style={{ 
              fontSize: 'var(--dev-text-sm)', 
              fontWeight: 'var(--dev-font-semibold)',
              color: 'var(--dev-text-muted)',
              marginBottom: 'var(--dev-space-3)',
            }}>
              Navigation
            </h2>
            <DevCard padding="md">
              <div style={{ display: 'grid', gap: 'var(--dev-space-2)' }}>
                {navigationShortcuts.map((shortcut, i) => (
                  <ShortcutRow key={i} shortcut={shortcut.key} label={shortcut.description} />
                ))}
              </div>
            </DevCard>
          </div>

          {/* Action Shortcuts */}
          <div>
            <h2 style={{ 
              fontSize: 'var(--dev-text-sm)', 
              fontWeight: 'var(--dev-font-semibold)',
              color: 'var(--dev-text-muted)',
              marginBottom: 'var(--dev-space-3)',
            }}>
              Actions
            </h2>
            <DevCard padding="md">
              <div style={{ display: 'grid', gap: 'var(--dev-space-2)' }}>
                {actionShortcuts.map((shortcut, i) => (
                  <ShortcutRow key={i} shortcut={shortcut.key} label={shortcut.description} />
                ))}
              </div>
            </DevCard>
          </div>

          {/* Tip */}
          <div style={{ 
            padding: 'var(--dev-space-3)',
            background: 'var(--dev-bg-muted)',
            borderRadius: 'var(--dev-radius-lg)',
            fontSize: 'var(--dev-text-sm)',
            color: 'var(--dev-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-2)',
          }}>
            <Keyboard size={16} />
            Tip: Press <kbd style={{
              padding: '2px 6px',
              background: 'var(--dev-bg-elevated)',
              border: '1px solid var(--dev-border-default)',
              borderRadius: 4,
              fontSize: '0.85em',
            }}>?</kbd> anywhere to view this page
          </div>
        </div>
      </div>
    </div>
  )
}

interface ShortcutRowProps {
  shortcut: string
  label: string
}

function ShortcutRow({ shortcut, label }: ShortcutRowProps) {
  // Parse shortcut into individual keys
  const keys = shortcut.split(' ')
  
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--dev-space-2) 0',
      }}
    >
      <span style={{ color: 'var(--dev-text-secondary)', fontSize: 'var(--dev-text-sm)' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {keys.map((key, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && <span style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-xs)' }}>then</span>}
            <kbd style={{
              padding: 'var(--dev-space-1) var(--dev-space-2)',
              background: 'var(--dev-bg-muted)',
              borderRadius: 'var(--dev-radius-md)',
              fontSize: 'var(--dev-text-xs)',
              fontFamily: 'var(--dev-font-mono)',
              border: '1px solid var(--dev-border-default)',
              minWidth: 24,
              textAlign: 'center',
            }}>
              {key}
            </kbd>
          </span>
        ))}
      </div>
    </div>
  )
}
