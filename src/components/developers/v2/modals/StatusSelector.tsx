'use client'

import { useState } from 'react'
import { Info, CheckCircle, Clock } from '@phosphor-icons/react'

type DocumentStatus = 'pending' | 'in-progress'

interface StatusSelectorProps {
  status: DocumentStatus
  onStatusChange: (status: DocumentStatus) => void
}

/**
 * StatusSelector - Status selection UI for the Add Document modal.
 * Allows choosing between "Available" (pending) and "In Progress" statuses,
 * with an expandable info panel explaining each option.
 */
export function StatusSelector({
  status,
  onStatusChange,
}: StatusSelectorProps) {
  const [showStatusInfo, setShowStatusInfo] = useState(false)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--dev-space-1-5)',
        }}
      >
        <label
          htmlFor="v2-add-doc-status"
          style={{
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
          }}
        >
          Initial Status
        </label>
        <button
          type="button"
          onClick={() => setShowStatusInfo(!showStatusInfo)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            fontSize: 'var(--dev-text-xs)',
            color: 'var(--dev-text-muted)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 'var(--dev-radius-sm)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'var(--dev-bg-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'transparent')
          }
        >
          <Info size={14} />
          What do these mean?
        </button>
      </div>

      {/* Status Info Panel */}
      {showStatusInfo && (
        <div
          style={{
            marginBottom: 'var(--dev-space-3)',
            padding: 'var(--dev-space-3)',
            background: 'var(--dev-bg-muted)',
            borderRadius: 'var(--dev-radius-md)',
            fontSize: 'var(--dev-text-xs)',
          }}
        >
          <div style={{ marginBottom: 'var(--dev-space-2)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 4,
              }}
            >
              <CheckCircle
                size={14}
                weight="fill"
                style={{
                  color: 'var(--dev-status-available, #f59e0b)',
                }}
              />
              <strong>Available</strong>
            </div>
            <p
              style={{
                color: 'var(--dev-text-muted)',
                marginLeft: 20,
              }}
            >
              Document is ready to be claimed by any developer. Use this when
              you want to add a document but not start working on it yet.
            </p>
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 4,
              }}
            >
              <Clock
                size={14}
                weight="fill"
                style={{
                  color: 'var(--dev-status-in-progress, #3b82f6)',
                }}
              />
              <strong>In Progress</strong>
            </div>
            <p
              style={{
                color: 'var(--dev-text-muted)',
                marginLeft: 20,
              }}
            >
              Document will be assigned to you and marked as being worked on.
              Use this when you&apos;re adding a document you&apos;re already
              working on.
            </p>
          </div>
        </div>
      )}

      <input type="hidden" id="v2-add-doc-status" value={status} />
      <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
        <button
          type="button"
          onClick={() => onStatusChange('pending')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 'var(--dev-space-2-5) var(--dev-space-3)',
            borderRadius: 'var(--dev-radius-md)',
            border:
              status === 'pending'
                ? '2px solid var(--dev-status-available, #f59e0b)'
                : '1px solid var(--dev-border-default)',
            background:
              status === 'pending'
                ? 'rgba(245, 158, 11, 0.1)'
                : 'var(--dev-bg-elevated)',
            color:
              status === 'pending'
                ? 'var(--dev-status-available, #f59e0b)'
                : 'var(--dev-text-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
            transition: 'all var(--dev-duration-fast)',
          }}
        >
          <CheckCircle
            size={16}
            weight={status === 'pending' ? 'fill' : 'regular'}
          />
          Available
        </button>
        <button
          type="button"
          onClick={() => onStatusChange('in-progress')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 'var(--dev-space-2-5) var(--dev-space-3)',
            borderRadius: 'var(--dev-radius-md)',
            border:
              status === 'in-progress'
                ? '2px solid var(--dev-status-in-progress, #3b82f6)'
                : '1px solid var(--dev-border-default)',
            background:
              status === 'in-progress'
                ? 'rgba(59, 130, 246, 0.1)'
                : 'var(--dev-bg-elevated)',
            color:
              status === 'in-progress'
                ? 'var(--dev-status-in-progress, #3b82f6)'
                : 'var(--dev-text-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
            transition: 'all var(--dev-duration-fast)',
          }}
        >
          <Clock
            size={16}
            weight={status === 'in-progress' ? 'fill' : 'regular'}
          />
          In Progress
        </button>
      </div>

      {/* Status Description */}
      <p
        style={{
          marginTop: 'var(--dev-space-2)',
          fontSize: 'var(--dev-text-xs)',
          color: 'var(--dev-text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {status === 'pending' ? (
          <>
            <span
              style={{
                color: 'var(--dev-status-available, #f59e0b)',
              }}
            >
              →
            </span>
            Document will appear in the Available column for any developer to
            claim.
          </>
        ) : (
          <>
            <span
              style={{
                color: 'var(--dev-status-in-progress, #3b82f6)',
              }}
            >
              →
            </span>
            Document will be assigned to you and appear in your In Progress
            column.
          </>
        )}
      </p>
    </div>
  )
}
