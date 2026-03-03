'use client'

import { useState, useMemo } from 'react'
import { Plus, FunnelSimple, CaretDown } from '@phosphor-icons/react'
import { DevButton, DevInput, DevBadge, DevCard, DevAvatar, DevProgress } from '@/components/developers/v2/ui'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useAuth } from '@/components/auth/ClientProvider'

interface KanbanColumn {
  id: string
  title: string
  status: string
  color: string
}

const columns: KanbanColumn[] = [
  { id: 'pending', title: 'Available', status: 'pending', color: 'var(--dev-status-available)' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'var(--dev-status-in-progress)' },
  { id: 'completed', title: 'Completed', status: 'completed', color: 'var(--dev-status-done)' },
  { id: 'archived', title: 'Archived', status: 'archived', color: 'var(--dev-status-archived)' },
]

/**
 * Kanban Board Page
 * 
 * Visual kanban board for managing documents across workflow stages.
 * Supports drag-and-drop, filtering, and quick actions.
 */
export default function KanbanPage() {
  const { user } = useAuth()
  const { isAdminView, openModal, selectDocument } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({ userId: user?.uid || null, isAdmin: isAdminView })
  const [localSearch, setLocalSearch] = useState('')

  // Group submissions by status
  const columnData = useMemo(() => {
    const grouped: Record<string, typeof submissions> = {
      pending: [],
      'in-progress': [],
      completed: [],
      archived: [],
    }

    const filteredSubs = submissions.filter(sub => {
      // Search filter
      if (localSearch) {
        const query = localSearch.toLowerCase()
        const matchesTitle = sub.googleDocTitle?.toLowerCase().includes(query)
        const matchesCustomer = sub.customer?.displayName?.toLowerCase().includes(query)
        if (!matchesTitle && !matchesCustomer) return false
      }
      return true
    })

    for (const sub of filteredSubs) {
      const status = sub.status || 'pending'
      // Map 'approved' status to 'pending' (Available) column
      // Documents are 'approved' by customer, then claimed by developer
      const columnKey = status === 'approved' ? 'pending' : status
      if (grouped[columnKey]) {
        grouped[columnKey].push(sub)
      }
    }

    return grouped
  }, [submissions, localSearch])

  const handleCardClick = (docId: string) => {
    selectDocument(docId)
    openModal('document-detail')
  }

  if (loading) {
    return (
      <div className="dev-kanban-board">
        {columns.map(col => (
          <div key={col.id} className="dev-kanban-column">
            <div className="dev-kanban-column-header">
              <div className="dev-kanban-column-title">
                <span 
                  className={`dev-kanban-column-status-dot ${col.id}`} 
                  style={{ background: col.color }}
                />
                {col.title}
              </div>
            </div>
            <div className="dev-kanban-column-body">
              {[1, 2, 3].map(i => (
                <div key={i} className="dev-skeleton" style={{ height: 120, marginBottom: 8 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div 
        style={{ 
          padding: 'var(--dev-space-4)', 
          borderBottom: '1px solid var(--dev-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--dev-space-3)',
        }}
      >
        <DevInput
          placeholder="Search documents..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          inputSize="sm"
          style={{ width: 280 }}
        />
        <DevButton variant="ghost" size="sm" leftIcon={<FunnelSimple size={16} />}>
          Filter
          <CaretDown size={12} />
        </DevButton>
        <div style={{ flex: 1 }} />
        <DevButton 
          variant="primary" 
          size="sm" 
          leftIcon={<Plus size={14} weight="bold" />}
          onClick={() => openModal('add-document')}
        >
          New Document
        </DevButton>
      </div>

      {/* Kanban Board */}
      <div className="dev-kanban-board" style={{ flex: 1 }}>
        {columns.map(col => (
          <div key={col.id} className="dev-kanban-column">
            <div className="dev-kanban-column-header">
              <div className="dev-kanban-column-title">
                <span 
                  className="dev-kanban-column-status-dot" 
                  style={{ background: col.color }}
                />
                {col.title}
                <span className="dev-kanban-column-count">
                  {columnData[col.status]?.length || 0}
                </span>
              </div>
            </div>
            <div className="dev-kanban-column-body">
              {(columnData[col.status] || []).length === 0 ? (
                <div className="dev-kanban-column-empty">
                  No documents
                </div>
              ) : (
                (columnData[col.status] || []).map(doc => (
                  <DevCard 
                    key={doc.id} 
                    interactive 
                    padding="sm"
                    onClick={() => handleCardClick(doc.id)}
                    style={{ marginBottom: 'var(--dev-space-2)' }}
                  >
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
                          fontSize: 'var(--dev-text-xs)', 
                          color: 'var(--dev-text-muted)' 
                        }}
                      >
                        {doc.customer?.displayName || 'Unknown Customer'}
                      </div>
                    </div>
                    {doc.progressPercentage !== undefined && doc.progressPercentage > 0 && (
                      <DevProgress 
                        value={doc.progressPercentage} 
                        size="sm" 
                        color={doc.progressPercentage === 100 ? 'success' : 'primary'}
                      />
                    )}
                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        marginTop: 'var(--dev-space-2)',
                      }}
                    >
                      {doc.assignedTo && (
                        <DevAvatar 
                          name={doc.assignedToName || doc.assignedTo} 
                          size="xs" 
                        />
                      )}
                      {doc.priority && (
                        <DevBadge variant={doc.priority as 'urgent' | 'high' | 'medium' | 'low'} size="sm">
                          {doc.priority}
                        </DevBadge>
                      )}
                    </div>
                  </DevCard>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
