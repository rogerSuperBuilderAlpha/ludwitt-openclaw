'use client'

import { useDocumentDetail } from './useDocumentDetail'
import { DocumentDetailHeader } from './DocumentDetailHeader'
import { DocumentDetailsView } from './DocumentDetailsView'
import { DocumentProgressView } from './DocumentProgressView'
import { DocumentCompleteView } from './DocumentCompleteView'

/**
 * DocumentDetailModal - Full document details with actions
 *
 * Uses zustand store for state and renders based on selectedDocumentId.
 * This component orchestrates sub-components; all state management
 * lives in useDocumentDetail and rendering is delegated to view components.
 */
export function DocumentDetailModal() {
  const { document, state, actions, permissions, closeModal, formatDateTime } =
    useDocumentDetail()

  if (!document) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      role="button"
      tabIndex={-1}
      onClick={closeModal}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') closeModal()
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className="dev-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Document details"
        style={{
          maxWidth: 800,
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--dev-bg-elevated, #1a1a1b)',
          borderRadius: 'var(--dev-radius-xl, 12px)',
          border: '1px solid var(--dev-border-default, #2a2a2b)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <DocumentDetailHeader
          document={document}
          view={state.view}
          setView={state.setView}
          closeModal={closeModal}
          formatDateTime={formatDateTime}
        />

        {/* Content */}
        <div
          style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}
        >
          {state.view === 'details' && (
            <DocumentDetailsView
              document={document}
              permissions={permissions}
              actions={actions}
              state={state}
              formatDateTime={formatDateTime}
            />
          )}

          {state.view === 'progress' && (
            <DocumentProgressView state={state} actions={actions} />
          )}

          {state.view === 'complete' && (
            <DocumentCompleteView state={state} actions={actions} />
          )}
        </div>
      </div>
    </div>
  )
}
