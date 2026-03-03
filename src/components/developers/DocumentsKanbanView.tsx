'use client'

import {
  CaretDown,
  CaretRight,
  CurrencyCircleDollar,
  UserCirclePlus,
  CheckCircle,
  Users,
  Folder,
} from '@phosphor-icons/react'
import { DevButton, DevBadge, DevCard, DevAvatar, DevProgress } from '@/components/developers/v2/ui'
import { formatDate, formatCredits, getCreditColor } from '@/lib/utils/developers'
import type { Submission } from '@/lib/types/submission'

export interface KanbanColumn {
  id: string
  title: string
  status: string
  color: string
  description: string
}

export interface ClientDocCount {
  clientId: string
  clientName: string
  clientEmail: string
  count: number
  creditBalance?: number
}

export interface DocumentsKanbanViewProps {
  columns: KanbanColumn[]
  columnData: Record<string, Submission[]>
  completedCounts: ClientDocCount[]
  archivedCounts: ClientDocCount[]
  completedTotal: number
  archivedTotal: number
  countsLoading: boolean
  expandedClients: Record<string, boolean>
  loadedClientDocs: Record<string, Submission[]>
  loadingClients: Record<string, boolean>
  onToggleClient: (clientId: string, status: 'completed' | 'archived') => void
  onCardClick: (doc: Submission) => void
  onQuickClaim: (e: React.MouseEvent, docId: string) => void
  onQuickAssign: (e: React.MouseEvent, doc: Submission) => void
  onQuickComplete: (e: React.MouseEvent, doc: Submission) => void
  claimingId: string | null
  isAdminView: boolean
  currentUserId: string | undefined
}

export function DocumentsKanbanView({
  columns,
  columnData,
  completedCounts,
  archivedCounts,
  completedTotal,
  archivedTotal,
  countsLoading,
  expandedClients,
  loadedClientDocs,
  loadingClients,
  onToggleClient,
  onCardClick,
  onQuickClaim,
  onQuickAssign,
  onQuickComplete,
  claimingId,
  isAdminView,
  currentUserId,
}: DocumentsKanbanViewProps) {
  return (
    <div className="dev-kanban-board" style={{ flex: 1 }}>
      {columns.map((col) => (
        <div key={col.id} className="dev-kanban-column">
          <div className="dev-kanban-column-header">
            <div className="dev-kanban-column-title">
              <span
                className="dev-kanban-column-status-dot"
                style={{ background: col.color }}
              />
              {col.title}
              <span className="dev-kanban-column-count">
                {col.status === 'completed'
                  ? completedTotal
                  : col.status === 'archived'
                    ? archivedTotal
                    : columnData[col.status]?.length || 0}
              </span>
            </div>
          </div>
          <div className="dev-kanban-column-body">
            {/* Empty state */}
            {(col.status === 'completed'
              ? completedTotal === 0
              : col.status === 'archived'
                ? archivedTotal === 0
                : (columnData[col.status] || []).length === 0) ? (
              <div className="dev-kanban-column-empty">
                {countsLoading &&
                (col.status === 'completed' || col.status === 'archived')
                  ? 'Loading...'
                  : col.description}
              </div>
            ) : col.status === 'completed' || col.status === 'archived' ? (
              /* Lazy-loaded by client for completed/archived */
              <ClientGroupList
                clients={col.status === 'completed' ? completedCounts : archivedCounts}
                status={col.status as 'completed' | 'archived'}
                countsLoading={countsLoading}
                expandedClients={expandedClients}
                loadedClientDocs={loadedClientDocs}
                loadingClients={loadingClients}
                onToggleClient={onToggleClient}
                onCardClick={onCardClick}
              />
            ) : (
              /* Flat list for available/in-progress */
              (columnData[col.status] || []).map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  onCardClick={onCardClick}
                  onQuickClaim={onQuickClaim}
                  onQuickAssign={onQuickAssign}
                  onQuickComplete={onQuickComplete}
                  claimingId={claimingId}
                  isAdminView={isAdminView}
                  currentUserId={currentUserId}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Sub-components (internal) ─── */

interface ClientGroupListProps {
  clients: ClientDocCount[]
  status: 'completed' | 'archived'
  countsLoading: boolean
  expandedClients: Record<string, boolean>
  loadedClientDocs: Record<string, Submission[]>
  loadingClients: Record<string, boolean>
  onToggleClient: (clientId: string, status: 'completed' | 'archived') => void
  onCardClick: (doc: Submission) => void
}

function ClientGroupList({
  clients,
  status,
  countsLoading,
  expandedClients,
  loadedClientDocs,
  loadingClients,
  onToggleClient,
  onCardClick,
}: ClientGroupListProps) {
  if (clients.length === 0) {
    return (
      <div className="dev-kanban-column-empty">
        {countsLoading ? 'Loading...' : 'No documents'}
      </div>
    )
  }

  return (
    <>
      {clients.map((client) => {
        const key = `${status}-${client.clientId}`
        const isExpanded = expandedClients[key]
        const isLoading = loadingClients[key]
        const docs = loadedClientDocs[key] || []

        return (
          <div key={client.clientId} style={{ marginBottom: 'var(--dev-space-2)' }}>
            {/* Client Group Header */}
            <button
              onClick={() => onToggleClient(client.clientId, status)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--dev-space-2)',
                padding: 'var(--dev-space-2) var(--dev-space-3)',
                background: 'var(--dev-bg-secondary)',
                border: '1px solid var(--dev-border-subtle)',
                borderRadius: 'var(--dev-radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--dev-text-xs)',
                fontWeight: 'var(--dev-font-medium)',
                color: 'var(--dev-text-primary)',
                textAlign: 'left',
              }}
            >
              {isExpanded ? (
                <CaretDown size={12} weight="bold" />
              ) : (
                <CaretRight size={12} weight="bold" />
              )}
              <Folder size={14} style={{ color: 'var(--dev-text-muted)' }} />
              <span className="dev-truncate" style={{ flex: 1 }}>
                {client.clientName}
              </span>
              {/* Credit Balance */}
              <span
                style={{
                  fontSize: 'var(--dev-text-2xs)',
                  fontWeight: 'var(--dev-font-medium)',
                  color: getCreditColor(client.creditBalance),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CurrencyCircleDollar size={12} weight="fill" />
                {formatCredits(client.creditBalance)}
              </span>
              {/* Doc Count */}
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: 'var(--dev-radius-full)',
                  background: 'var(--dev-bg-tertiary)',
                  color: 'var(--dev-text-muted)',
                  fontSize: 'var(--dev-text-2xs)',
                }}
              >
                {client.count}
              </span>
            </button>

            {/* Expanded Client Docs - Lazy Loaded */}
            {isExpanded && (
              <div
                style={{
                  marginTop: 'var(--dev-space-1)',
                  paddingLeft: 'var(--dev-space-2)',
                  borderLeft: '2px solid var(--dev-border-subtle)',
                  marginLeft: 'var(--dev-space-2)',
                }}
              >
                {isLoading ? (
                  <div
                    style={{
                      padding: 'var(--dev-space-3)',
                      textAlign: 'center',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                    }}
                  >
                    Loading documents...
                  </div>
                ) : docs.length === 0 ? (
                  <div
                    style={{
                      padding: 'var(--dev-space-3)',
                      textAlign: 'center',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                    }}
                  >
                    No documents found
                  </div>
                ) : (
                  docs.map((doc: any) => (
                    <DevCard
                      key={doc.id}
                      interactive
                      padding="sm"
                      onClick={() => onCardClick(doc)}
                      style={{ marginBottom: 'var(--dev-space-1)' }}
                    >
                      <div
                        className="dev-truncate"
                        style={{
                          fontWeight: 'var(--dev-font-medium)',
                          fontSize: 'var(--dev-text-xs)',
                          marginBottom: 'var(--dev-space-1)',
                        }}
                      >
                        {doc.googleDocTitle || 'Untitled'}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 'var(--dev-space-2)',
                          fontSize: 'var(--dev-text-2xs)',
                          color: 'var(--dev-text-muted)',
                        }}
                      >
                        {doc.costCents > 0 && (
                          <span
                            style={{
                              color: 'var(--dev-text-primary)',
                              fontWeight: 'var(--dev-font-medium)',
                            }}
                          >
                            {formatCredits(doc.costCents)}
                          </span>
                        )}
                        <span>{formatDate(doc.completedAt || doc.approvedAt)}</span>
                      </div>
                    </DevCard>
                  ))
                )}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

interface DocumentCardProps {
  doc: Submission
  onCardClick: (doc: Submission) => void
  onQuickClaim: (e: React.MouseEvent, docId: string) => void
  onQuickAssign: (e: React.MouseEvent, doc: Submission) => void
  onQuickComplete: (e: React.MouseEvent, doc: Submission) => void
  claimingId: string | null
  isAdminView: boolean
  currentUserId: string | undefined
}

function DocumentCard({
  doc,
  onCardClick,
  onQuickClaim,
  onQuickAssign,
  onQuickComplete,
  claimingId,
  isAdminView,
  currentUserId,
}: DocumentCardProps) {
  return (
    <DevCard
      interactive
      padding="sm"
      onClick={() => onCardClick(doc)}
      style={{ marginBottom: 'var(--dev-space-2)' }}
    >
      {/* Priority indicator */}
      {doc.priority && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            borderRadius: 'var(--dev-radius-lg) 0 0 var(--dev-radius-lg)',
            background:
              doc.priority === 'urgent'
                ? 'var(--dev-priority-urgent)'
                : doc.priority === 'high'
                  ? 'var(--dev-priority-high)'
                  : doc.priority === 'medium'
                    ? 'var(--dev-priority-medium)'
                    : 'var(--dev-priority-low)',
          }}
        />
      )}

      <div style={{ marginBottom: 'var(--dev-space-2)' }}>
        <div
          className="dev-truncate"
          style={{
            fontWeight: 'var(--dev-font-medium)',
            fontSize: 'var(--dev-text-sm)',
            marginBottom: 'var(--dev-space-1)',
          }}
        >
          {doc.googleDocTitle || 'Untitled'}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--dev-space-2)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--dev-text-xs)',
              color: 'var(--dev-text-muted)',
            }}
          >
            {doc.customer?.displayName || 'Unknown Customer'}
          </span>
          <span
            style={{
              fontSize: 'var(--dev-text-xs)',
              fontWeight: 'var(--dev-font-medium)',
              color: getCreditColor(doc.customer?.creditBalance),
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
            title="Customer credit balance"
          >
            <CurrencyCircleDollar size={12} weight="fill" />
            {formatCredits(doc.customer?.creditBalance)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      {doc.progressPercentage !== undefined && doc.progressPercentage > 0 && (
        <div style={{ marginBottom: 'var(--dev-space-2)' }}>
          <DevProgress
            value={doc.progressPercentage}
            size="sm"
            color={doc.progressPercentage === 100 ? 'success' : 'primary'}
          />
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom:
            !doc.assignedTo ||
            (doc.assignedTo === currentUserId && doc.status === 'in-progress')
              ? 'var(--dev-space-2)'
              : 0,
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)' }}
        >
          {doc.assignedTo && (
            <DevAvatar name={doc.assignedToName || doc.assignedTo} size="xs" />
          )}
          {doc.category && (
            <DevBadge variant="default" size="sm">
              {doc.category}
            </DevBadge>
          )}
        </div>
        {doc.approvedAt && (
          <span
            style={{ fontSize: 'var(--dev-text-2xs)', color: 'var(--dev-text-muted)' }}
          >
            {formatDate(doc.approvedAt)}
          </span>
        )}
      </div>

      {/* Quick Actions */}
      {!doc.assignedTo && (
        <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
          <DevButton
            variant="primary"
            size="xs"
            leftIcon={<UserCirclePlus size={12} weight="bold" />}
            onClick={(e) => onQuickClaim(e, doc.id)}
            disabled={claimingId === doc.id}
            style={{ flex: 1 }}
          >
            {claimingId === doc.id ? 'Claiming...' : 'Claim'}
          </DevButton>
          {isAdminView && (
            <DevButton
              variant="ghost"
              size="xs"
              icon
              onClick={(e) => onQuickAssign(e, doc)}
              title="Assign to developer"
            >
              <Users size={14} />
            </DevButton>
          )}
        </div>
      )}

      {doc.assignedTo === currentUserId && doc.status === 'in-progress' && (
        <DevButton
          variant="success"
          size="xs"
          leftIcon={<CheckCircle size={12} weight="bold" />}
          onClick={(e) => onQuickComplete(e, doc)}
          style={{ width: '100%' }}
        >
          Complete
        </DevButton>
      )}
    </DevCard>
  )
}
