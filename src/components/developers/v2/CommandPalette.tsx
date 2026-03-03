/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  MagnifyingGlass,
  Files,
  FolderOpen,
  Kanban,
  Users,
  ChartBar,
  Gear,
  Plus,
  Lightning,
  Clock,
  ArrowRight,
} from '@phosphor-icons/react'
import { useDevPortalStore } from '@/lib/store/devPortalStore'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  shortcut?: string[]
  action: () => void
  group: string
}

/**
 * CommandPalette - Keyboard-driven command interface
 *
 * Features:
 * - Fuzzy search across commands and documents
 * - Keyboard navigation (up/down arrows, enter)
 * - Grouped commands by category
 * - Recent items tracking
 */
export function CommandPalette() {
  const router = useRouter()
  const {
    closeCommandPalette,
    openModal,
    setView,
    toggleAdminView,
    toggleTheme,
  } = useDevPortalStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Define commands
  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-documents',
        label: 'Go to Documents',
        description: 'View all documents',
        icon: <Files size={16} />,
        shortcut: ['G', 'D'],
        action: () => {
          router.push('/developers')
          closeCommandPalette()
        },
        group: 'Navigation',
      },
      {
        id: 'nav-kanban',
        label: 'Go to Kanban Board',
        description: 'View kanban board',
        icon: <Kanban size={16} />,
        shortcut: ['G', 'K'],
        action: () => {
          router.push('/developers/kanban')
          closeCommandPalette()
        },
        group: 'Navigation',
      },
      {
        id: 'nav-projects',
        label: 'Go to Projects',
        description: 'View all projects',
        icon: <FolderOpen size={16} />,
        shortcut: ['G', 'P'],
        action: () => {
          router.push('/developers/projects')
          closeCommandPalette()
        },
        group: 'Navigation',
      },
      {
        id: 'nav-workload',
        label: 'Go to Workload',
        description: 'View team workload',
        icon: <ChartBar size={16} />,
        action: () => {
          router.push('/developers/workload')
          closeCommandPalette()
        },
        group: 'Navigation',
      },
      {
        id: 'nav-team',
        label: 'Go to Team',
        description: 'View team members',
        icon: <Users size={16} />,
        action: () => {
          router.push('/developers/team')
          closeCommandPalette()
        },
        group: 'Navigation',
      },
      {
        id: 'nav-pending',
        label: 'Go to Pending Review',
        description: 'View pending documents',
        icon: <Clock size={16} />,
        action: () => {
          router.push('/developers/pending')
          closeCommandPalette()
        },
        group: 'Navigation',
      },
      {
        id: 'nav-settings',
        label: 'Go to Settings',
        description: 'Configure preferences',
        icon: <Gear size={16} />,
        action: () => {
          router.push('/developers/settings')
          closeCommandPalette()
        },
        group: 'Navigation',
      },

      // Actions
      {
        id: 'action-new-doc',
        label: 'Create New Document',
        description: 'Add a document for a customer',
        icon: <Plus size={16} />,
        shortcut: ['N'],
        action: () => {
          openModal('add-document')
          closeCommandPalette()
        },
        group: 'Actions',
      },
      {
        id: 'action-toggle-admin',
        label: 'Toggle Admin View',
        description: 'Switch between admin and developer view',
        icon: <Lightning size={16} />,
        shortcut: ['A'],
        action: () => {
          toggleAdminView()
          closeCommandPalette()
        },
        group: 'Actions',
      },
      {
        id: 'action-toggle-theme',
        label: 'Toggle Theme',
        description: 'Switch between dark and light mode',
        icon: <Lightning size={16} />,
        shortcut: ['T'],
        action: () => {
          toggleTheme()
          closeCommandPalette()
        },
        group: 'Actions',
      },
    ],
    [router, closeCommandPalette, openModal, toggleAdminView, toggleTheme]
  )

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query) return commands

    const lowerQuery = query.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lowerQuery) ||
        cmd.description?.toLowerCase().includes(lowerQuery) ||
        cmd.group.toLowerCase().includes(lowerQuery)
    )
  }, [commands, query])

  // Group filtered commands
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    for (const cmd of filteredCommands) {
      if (!groups[cmd.group]) groups[cmd.group] = []
      groups[cmd.group].push(cmd)
    }
    return groups
  }, [filteredCommands])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((i) => Math.max(i - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredCommands, selectedIndex])

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Scroll selected item into view
  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(
      `[data-index="${selectedIndex}"]`
    )
    selectedEl?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // Track flat index for selection
  let flatIndex = -1

  return (
    <>
      {/* Backdrop */}
      <div className="dev-command-backdrop" onClick={closeCommandPalette} />

      {/* Command Palette */}
      <div className="dev-command-container">
        <div className="dev-command">
          {/* Input */}
          <div className="dev-command-input-wrapper">
            <MagnifyingGlass size={18} className="dev-command-input-icon" />
            <input
              ref={inputRef}
              type="text"
              className="dev-command-input"
              placeholder="Search commands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Results */}
          <div className="dev-command-list" ref={listRef}>
            {Object.keys(groupedCommands).length === 0 ? (
              <div
                style={{
                  padding: 'var(--dev-space-8) var(--dev-space-4)',
                  textAlign: 'center',
                  color: 'var(--dev-text-muted)',
                  fontSize: 'var(--dev-text-sm)',
                }}
              >
                No commands found
              </div>
            ) : (
              Object.entries(groupedCommands).map(([group, items]) => (
                <div key={group} className="dev-command-group">
                  <div className="dev-command-group-title">{group}</div>
                  {items.map((item) => {
                    flatIndex++
                    const currentIndex = flatIndex
                    return (
                      <div
                        key={item.id}
                        data-index={currentIndex}
                        className={`dev-command-item ${selectedIndex === currentIndex ? 'is-selected' : ''}`}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                      >
                        <span className="dev-command-item-icon">
                          {item.icon}
                        </span>
                        <div className="dev-command-item-label">
                          <div>{item.label}</div>
                          {item.description && (
                            <div
                              style={{
                                fontSize: 'var(--dev-text-xs)',
                                color: 'var(--dev-text-muted)',
                                marginTop: 'var(--dev-space-0-5)',
                              }}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                        {item.shortcut && (
                          <div className="dev-command-item-shortcut">
                            {item.shortcut.map((key, i) => (
                              <span key={i} className="dev-kbd">
                                {key}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="dev-command-footer">
            <div className="dev-command-footer-hint">
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dev-space-1)',
                }}
              >
                <span className="dev-kbd">↑</span>
                <span className="dev-kbd">↓</span>
                to navigate
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dev-space-1)',
                }}
              >
                <span className="dev-kbd">↵</span>
                to select
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dev-space-1)',
                }}
              >
                <span className="dev-kbd">esc</span>
                to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
