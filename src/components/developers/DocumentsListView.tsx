'use client'

import { CurrencyCircleDollar } from '@phosphor-icons/react'
import { DevCard, DevBadge, DevAvatar, DevProgress } from '@/components/developers/v2/ui'
import { formatDate, formatCredits, getCreditColor } from '@/lib/utils/developers'
import type { Submission } from '@/lib/types/submission'

export interface DocumentsListViewProps {
  submissions: Submission[]
  onCardClick: (doc: Submission) => void
}

export function DocumentsListView({ submissions, onCardClick }: DocumentsListViewProps) {
  if (submissions.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 'var(--dev-space-4)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--dev-space-12)',
            color: 'var(--dev-text-muted)',
          }}
        >
          No documents found
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-4)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
        {submissions.map((doc) => (
          <DevCard
            key={doc.id}
            interactive
            onClick={() => onCardClick(doc)}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-4)' }}
          >
            {/* Status indicator */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                flexShrink: 0,
                background:
                  doc.status === 'completed'
                    ? 'var(--dev-status-done)'
                    : doc.status === 'archived'
                      ? 'var(--dev-status-archived)'
                      : doc.status === 'in-progress'
                        ? 'var(--dev-status-in-progress)'
                        : 'var(--dev-status-available)',
              }}
            />

            {/* Title & Customer */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="dev-truncate"
                style={{ fontWeight: 'var(--dev-font-medium)', marginBottom: 2 }}
              >
                {doc.googleDocTitle || 'Untitled'}
              </div>
              <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                {doc.customer?.displayName}
              </div>
            </div>

            {/* Credit Balance */}
            <div style={{ width: 80 }}>
              <span
                style={{
                  fontSize: 'var(--dev-text-xs)',
                  fontWeight: 'var(--dev-font-medium)',
                  color: getCreditColor(doc.customer?.creditBalance),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title="Customer credit balance"
              >
                <CurrencyCircleDollar size={14} weight="fill" />
                {formatCredits(doc.customer?.creditBalance)}
              </span>
            </div>

            {/* Assignee */}
            <div style={{ width: 120 }}>
              {doc.assignedTo ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--dev-space-2)',
                  }}
                >
                  <DevAvatar name={doc.assignedToName || doc.assignedTo} size="xs" />
                  <span
                    className="dev-truncate"
                    style={{ fontSize: 'var(--dev-text-xs)' }}
                  >
                    {doc.assignedToName || doc.assignedTo.split('@')[0]}
                  </span>
                </div>
              ) : (
                <span
                  style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}
                >
                  Unassigned
                </span>
              )}
            </div>

            {/* Priority */}
            <div style={{ width: 80 }}>
              {doc.priority && (
                <DevBadge
                  variant={doc.priority as 'urgent' | 'high' | 'medium' | 'low'}
                  size="sm"
                >
                  {doc.priority}
                </DevBadge>
              )}
            </div>

            {/* Progress */}
            <div style={{ width: 100 }}>
              {doc.progressPercentage !== undefined && (
                <DevProgress value={doc.progressPercentage} size="sm" showLabel />
              )}
            </div>

            {/* Date */}
            <div
              style={{
                width: 60,
                textAlign: 'right',
                fontSize: 'var(--dev-text-xs)',
                color: 'var(--dev-text-muted)',
              }}
            >
              {formatDate(doc.approvedAt)}
            </div>
          </DevCard>
        ))}
      </div>
    </div>
  )
}
