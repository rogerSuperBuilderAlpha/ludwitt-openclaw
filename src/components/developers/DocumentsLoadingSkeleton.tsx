'use client'

import type { KanbanColumn } from '@/components/developers/DocumentsKanbanView'

export interface DocumentsLoadingSkeletonProps {
  columns: KanbanColumn[]
}

export function DocumentsLoadingSkeleton({ columns }: DocumentsLoadingSkeletonProps) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--dev-space-4)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
        <div className="dev-skeleton" style={{ width: 300, height: 36 }} />
      </div>
      <div className="dev-kanban-board" style={{ flex: 1 }}>
        {columns.map(col => (
          <div key={col.id} className="dev-kanban-column">
            <div className="dev-kanban-column-header">
              <div className="dev-skeleton" style={{ width: 100, height: 20 }} />
            </div>
            <div className="dev-kanban-column-body">
              {[1, 2, 3].map(i => (
                <div key={i} className="dev-skeleton" style={{ height: 120, marginBottom: 8 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
