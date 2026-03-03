'use client'

import { X, ArrowLeft, User } from 'lucide-react'
import type { DocumentDetailHeaderProps } from './documentDetailTypes'

export function DocumentDetailHeader({
  document,
  view,
  setView,
  closeModal,
  formatDateTime,
}: DocumentDetailHeaderProps) {
  return (
    <div
      style={{
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--dev-space-3)',
      }}
    >
      {view !== 'details' && (
        <button
          onClick={() => setView('details')}
          style={{
            padding: 'var(--dev-space-2)',
            borderRadius: 'var(--dev-radius-md)',
            background: 'var(--dev-bg-hover)',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--dev-text-secondary)',
          }}
        >
          <ArrowLeft size={16} />
        </button>
      )}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            fontSize: 'var(--dev-text-lg)',
            fontWeight: 'var(--dev-font-semibold)',
            marginBottom: 'var(--dev-space-1)',
          }}
        >
          {view === 'progress' && 'Update Progress'}
          {view === 'complete' && 'Mark Complete'}
          {view === 'details' && document.googleDocTitle}
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-3)',
            fontSize: 'var(--dev-text-sm)',
            color: 'var(--dev-text-muted)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <User size={14} />
            {document.customer?.displayName || document.customer?.email}
          </span>
          <span>&bull;</span>
          <span>{formatDateTime(document.approvedAt)}</span>
          {document.assignedToName && (
            <>
              <span>&bull;</span>
              <span>Assigned to: {document.assignedToName}</span>
            </>
          )}
        </div>
      </div>
      <button
        onClick={closeModal}
        style={{
          padding: 'var(--dev-space-2)',
          borderRadius: 'var(--dev-radius-md)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--dev-text-muted)',
        }}
      >
        <X size={20} />
      </button>
    </div>
  )
}
