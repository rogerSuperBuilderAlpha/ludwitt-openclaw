/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import {
  FunnelSimple,
  CaretDown,
  MagnifyingGlass,
  ListBullets,
  SquaresFour,
  ArrowsDownUp,
  Clock,
  Tag,
  Plus,
} from '@phosphor-icons/react'
import { DevButton, DevInput } from '@/components/developers/v2/ui'

export type ViewMode = 'kanban' | 'list'
export type SortField = 'date' | 'customer' | 'priority' | 'status'

export interface DocumentsToolbarStats {
  total: number
  available: number
  inProgress: number
  completed: number
  archived: number
  pendingDrafts: number
}

export interface DocumentsToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  showFilters: boolean
  onToggleFilters: () => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  priorityFilter: string
  onPriorityFilterChange: (value: string) => void
  sortField: SortField
  onSortFieldChange: (value: SortField) => void
  showSortMenu: boolean
  onToggleSortMenu: () => void
  onCloseSortMenu: () => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onAddDocument: () => void
  stats: DocumentsToolbarStats
}

export function DocumentsToolbar({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortField,
  onSortFieldChange,
  showSortMenu,
  onToggleSortMenu,
  onCloseSortMenu,
  viewMode,
  onViewModeChange,
  onAddDocument,
  stats,
}: DocumentsToolbarProps) {
  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) + (priorityFilter !== 'all' ? 1 : 0)

  return (
    <div
      style={{
        padding: 'var(--dev-space-4)',
        borderBottom: '1px solid var(--dev-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--dev-space-3)',
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--dev-space-3)',
        }}
      >
        {/* Search */}
        <DevInput
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          inputSize="sm"
          leftIcon={<MagnifyingGlass size={16} />}
          style={{ width: 300 }}
        />

        {/* Filter Toggle */}
        <DevButton
          variant={showFilters ? 'primary' : 'ghost'}
          size="sm"
          leftIcon={<FunnelSimple size={16} />}
          onClick={onToggleFilters}
        >
          Filters
          {activeFilterCount > 0 && (
            <span
              style={{
                marginLeft: 4,
                padding: '0 6px',
                background: 'var(--dev-accent-primary)',
                borderRadius: 'var(--dev-radius-full)',
                fontSize: 'var(--dev-text-2xs)',
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </DevButton>

        {/* Sort */}
        <div style={{ position: 'relative' }}>
          <DevButton
            variant="ghost"
            size="sm"
            leftIcon={<ArrowsDownUp size={16} />}
            onClick={onToggleSortMenu}
          >
            Sort: {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
            <CaretDown size={12} />
          </DevButton>
          {showSortMenu && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                onClick={onCloseSortMenu}
              />
              <div
                className="dev-animate-fade-in"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: 4,
                  minWidth: 150,
                  background: 'var(--dev-bg-elevated)',
                  border: '1px solid var(--dev-border-default)',
                  borderRadius: 'var(--dev-radius-lg)',
                  boxShadow: 'var(--dev-shadow-lg)',
                  zIndex: 50,
                  overflow: 'hidden',
                }}
              >
                {[
                  { value: 'date', label: 'Date' },
                  { value: 'customer', label: 'Customer' },
                  { value: 'priority', label: 'Priority' },
                  { value: 'status', label: 'Status' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortFieldChange(option.value as SortField)
                      onCloseSortMenu()
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: 'var(--dev-space-2) var(--dev-space-3)',
                      textAlign: 'left',
                      background:
                        sortField === option.value
                          ? 'var(--dev-bg-hover)'
                          : 'transparent',
                      border: 'none',
                      color:
                        sortField === option.value
                          ? 'var(--dev-text-primary)'
                          : 'var(--dev-text-secondary)',
                      fontSize: 'var(--dev-text-sm)',
                      cursor: 'pointer',
                      transition: 'background var(--dev-duration-fast)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--dev-bg-hover)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        sortField === option.value
                          ? 'var(--dev-bg-hover)'
                          : 'transparent')
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ flex: 1 }} />

        {/* View Toggle */}
        <div
          style={{
            display: 'flex',
            background: 'var(--dev-bg-muted)',
            borderRadius: 'var(--dev-radius-md)',
            padding: 2,
          }}
        >
          <DevButton
            variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
            size="xs"
            icon
            onClick={() => onViewModeChange('kanban')}
            title="Kanban view"
          >
            <SquaresFour size={16} />
          </DevButton>
          <DevButton
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="xs"
            icon
            onClick={() => onViewModeChange('list')}
            title="List view"
          >
            <ListBullets size={16} />
          </DevButton>
        </div>

        {/* Add Document */}
        <DevButton
          variant="primary"
          size="sm"
          leftIcon={<Plus size={14} weight="bold" />}
          onClick={onAddDocument}
        >
          New Document
        </DevButton>
      </div>

      {/* Filter Row (Collapsible) */}
      {showFilters && (
        <div
          className="dev-animate-slide-up"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-3)',
            paddingTop: 'var(--dev-space-2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dev-space-2)',
            }}
          >
            <Tag size={14} style={{ color: 'var(--dev-text-muted)' }} />
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="dev-input dev-input-sm"
              style={{ width: 140 }}
            >
              <option value="all">All Status</option>
              <option value="pending">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dev-space-2)',
            }}
          >
            <Clock size={14} style={{ color: 'var(--dev-text-muted)' }} />
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
              className="dev-input dev-input-sm"
              style={{ width: 140 }}
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {(statusFilter !== 'all' || priorityFilter !== 'all') && (
            <DevButton
              variant="ghost"
              size="xs"
              onClick={() => {
                onStatusFilterChange('all')
                onPriorityFilterChange('all')
              }}
            >
              Clear filters
            </DevButton>
          )}
        </div>
      )}

      {/* Stats Row */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--dev-space-4)',
          fontSize: 'var(--dev-text-xs)',
          color: 'var(--dev-text-muted)',
        }}
      >
        <span>
          <strong style={{ color: 'var(--dev-text-primary)' }}>
            {stats.total}
          </strong>{' '}
          total
        </span>
        <span>
          <strong style={{ color: 'var(--dev-status-available)' }}>
            {stats.available}
          </strong>{' '}
          available
        </span>
        <span>
          <strong style={{ color: 'var(--dev-status-in-progress)' }}>
            {stats.inProgress}
          </strong>{' '}
          in progress
        </span>
        <span>
          <strong style={{ color: 'var(--dev-status-done)' }}>
            {stats.completed}
          </strong>{' '}
          completed
        </span>
        {stats.pendingDrafts > 0 && (
          <span>
            <strong style={{ color: 'var(--dev-accent-warning)' }}>
              {stats.pendingDrafts}
            </strong>{' '}
            waiting for approval
          </span>
        )}
      </div>
    </div>
  )
}
