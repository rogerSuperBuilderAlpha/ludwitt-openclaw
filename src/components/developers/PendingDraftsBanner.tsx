'use client'

import { Clock } from '@phosphor-icons/react'
import { formatDate } from '@/lib/utils/developers'

interface PendingDraft {
  id: string
  googleDocTitle: string
  googleDocUrl: string
  customer?: { displayName?: string; email?: string }
  addedAt?: unknown
}

export interface PendingDraftsBannerProps {
  pendingDrafts: PendingDraft[]
}

export function PendingDraftsBanner({ pendingDrafts }: PendingDraftsBannerProps) {
  if (pendingDrafts.length === 0) return null

  return (
    <div
      style={{
        margin: '0 var(--dev-space-4) var(--dev-space-4)',
        padding: 'var(--dev-space-3) var(--dev-space-4)',
        background: 'var(--dev-bg-muted)',
        border: '1px solid var(--dev-border-default)',
        borderRadius: 'var(--dev-radius-lg)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)', marginBottom: 'var(--dev-space-2)' }}>
        <Clock size={18} style={{ color: 'var(--dev-accent-warning)' }} />
        <h3 style={{ margin: 0, fontSize: 'var(--dev-text-sm)', fontWeight: 600, color: 'var(--dev-text-primary)' }}>
          Waiting for customer approval ({pendingDrafts.length})
        </h3>
      </div>
      <p style={{ margin: '0 0 var(--dev-space-3)', fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
        These documents were added by customers but are not yet approved. They will appear in Available once the customer approves and sends them to the team.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
        {pendingDrafts.map((draft) => {
          const addedDate = draft.addedAt
            ? typeof draft.addedAt === 'object' && draft.addedAt !== null && 'seconds' in draft.addedAt
              ? formatDate((draft.addedAt as { seconds: number }))
              : formatDate(draft.addedAt as Date)
            : ''
          return (
            <div
              key={draft.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--dev-space-2) var(--dev-space-3)',
                background: 'var(--dev-bg-elevated)',
                border: '1px solid var(--dev-border-subtle)',
                borderRadius: 'var(--dev-radius-md)',
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-primary)' }}>
                  {draft.googleDocTitle || 'Untitled'}
                </div>
                <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                  {draft.customer?.displayName || draft.customer?.email || 'Unknown'}
                  {addedDate && ` · Added ${addedDate}`}
                </div>
              </div>
              <a
                href={draft.googleDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 'var(--dev-text-xs)',
                  color: 'var(--dev-accent-primary)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                View doc →
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
