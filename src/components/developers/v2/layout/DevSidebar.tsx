/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CaretLeft,
  CaretRight,
  CaretDown,
  MagnifyingGlass,
  Plus,
} from '@phosphor-icons/react'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { sidebarSections, type SidebarSection } from './sidebarConfig'

/**
 * DevSidebar - Collapsible navigation sidebar
 *
 * Features:
 * - Collapsible with animation
 * - Section-based navigation with collapsible sections
 * - Active state indicators
 * - Badge counts for items
 * - NEW badges for new features
 */
export function DevSidebar() {
  const pathname = usePathname()
  const {
    sidebarCollapsed,
    toggleSidebar,
    unreadNotifications,
    openCommandPalette,
    openModal,
  } = useDevPortalStore()

  // Track collapsed sections
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {}
    sidebarSections.forEach((section) => {
      if (section.defaultCollapsed) {
        initial[section.id] = true
      }
    })
    return initial
  })

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const isActive = (href: string) => {
    if (href === '/developers') {
      return pathname === '/developers'
    }
    return pathname.startsWith(href)
  }

  const isSectionCollapsed = (section: SidebarSection) => {
    if (!section.collapsible) return false
    return collapsedSections[section.id] || false
  }

  return (
    <aside
      className={`dev-sidebar ${sidebarCollapsed ? 'is-collapsed' : ''}`}
      style={{ position: 'fixed', left: 0, top: 0 }}
    >
      {/* Header */}
      <div className="dev-sidebar-header">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-3)',
            flex: 1,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: 'var(--dev-accent-primary)',
              borderRadius: 'var(--dev-radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'var(--dev-font-bold)',
              fontSize: 'var(--dev-text-sm)',
              color: 'white',
              flexShrink: 0,
            }}
          >
            PR
          </div>
          {!sidebarCollapsed && (
            <span
              style={{
                fontWeight: 'var(--dev-font-semibold)',
                fontSize: 'var(--dev-text-sm)',
              }}
            >
              Ludwitt
            </span>
          )}
        </div>
        <button
          className="dev-btn dev-btn-ghost dev-btn-icon dev-btn-sm"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <CaretRight size={16} />
          ) : (
            <CaretLeft size={16} />
          )}
        </button>
      </div>

      {/* Quick Actions */}
      {!sidebarCollapsed && (
        <div
          style={{
            padding: 'var(--dev-space-2) var(--dev-space-2)',
            borderBottom: '1px solid var(--dev-border-subtle)',
          }}
        >
          <button
            className="dev-header-search-trigger"
            onClick={openCommandPalette}
            style={{ marginBottom: 'var(--dev-space-2)' }}
          >
            <MagnifyingGlass size={16} />
            <span>Search...</span>
            <div className="dev-header-search-kbd">
              <span className="dev-kbd">⌘</span>
              <span className="dev-kbd">K</span>
            </div>
          </button>
          <button
            className="dev-btn dev-btn-primary dev-btn-sm"
            onClick={() => openModal('add-document')}
            style={{ width: '100%' }}
          >
            <Plus size={14} weight="bold" />
            New Document
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="dev-sidebar-content">
        {sidebarSections.map((section) => (
          <div key={section.id} className="dev-sidebar-section">
            {!sidebarCollapsed && (
              <div
                className="dev-sidebar-section-title"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: section.collapsible ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
                onClick={() => section.collapsible && toggleSection(section.id)}
              >
                <span>{section.title}</span>
                {section.collapsible && (
                  <CaretDown
                    size={12}
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: isSectionCollapsed(section)
                        ? 'rotate(-90deg)'
                        : 'rotate(0deg)',
                      color: 'var(--dev-text-muted)',
                    }}
                  />
                )}
              </div>
            )}

            {/* Section items - hidden when collapsed */}
            <div
              style={{
                display:
                  isSectionCollapsed(section) && !sidebarCollapsed
                    ? 'none'
                    : 'flex',
                flexDirection: 'column',
                gap: 'var(--dev-space-0-5)',
              }}
            >
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`dev-sidebar-item ${isActive(item.href) ? 'is-active' : ''}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className="dev-sidebar-item-icon">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.isNew && (
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 'var(--dev-font-bold)',
                            padding: '1px 4px',
                            borderRadius: 'var(--dev-radius-sm)',
                            background: 'var(--dev-accent-primary)',
                            color: 'white',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          New
                        </span>
                      )}
                      {item.badge === 'dot' && unreadNotifications > 0 && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--dev-accent-danger)',
                          }}
                        />
                      )}
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span className="dev-sidebar-item-badge">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer - Minimal */}
      <div className="dev-sidebar-footer">
        <div
          style={{
            padding: 'var(--dev-space-2)',
            fontSize: 'var(--dev-text-2xs)',
            color: 'var(--dev-text-muted)',
            textAlign: 'center',
          }}
        >
          {!sidebarCollapsed && '⌘K to search'}
        </div>
      </div>
    </aside>
  )
}
