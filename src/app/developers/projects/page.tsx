'use client'

import { useState, useMemo } from 'react'
import { Plus, FunnelSimple, CaretDown, FolderOpen } from '@phosphor-icons/react'
import { DevButton, DevInput, DevBadge, DevCard, DevAvatar } from '@/components/developers/v2/ui'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useAllProjects } from '@/lib/hooks/developers/useAllProjects'
import { useAuth } from '@/components/auth/ClientProvider'
import type { Project, ProjectStatus } from '@/lib/types/project'

interface ProjectColumn {
  id: string
  title: string
  statuses: ProjectStatus[]
  color: string
}

const columns: ProjectColumn[] = [
  { id: 'intake', title: 'New Leads', statuses: ['intake', 'discovery'], color: 'var(--dev-status-available)' },
  { id: 'active', title: 'Active', statuses: ['in-progress'], color: 'var(--dev-status-in-progress)' },
  { id: 'review', title: 'Review', statuses: ['review', 'revision'], color: 'var(--dev-status-review)' },
  { id: 'completed', title: 'Completed', statuses: ['completed'], color: 'var(--dev-status-done)' },
]

/**
 * Projects Page
 * 
 * Kanban-style view of all projects with filtering and quick actions.
 */
export default function ProjectsPage() {
  const { user } = useAuth()
  const { isAdminView, openModal, selectProject } = useDevPortalStore()
  const { projects, isLoading } = useAllProjects()
  const [localSearch, setLocalSearch] = useState('')

  // Group projects by status
  const columnData = useMemo(() => {
    const grouped: Record<string, Project[]> = {
      intake: [],
      active: [],
      review: [],
      completed: [],
    }

    const filteredProjects = projects.filter(proj => {
      if (localSearch) {
        const query = localSearch.toLowerCase()
        const matchesTitle = proj.title?.toLowerCase().includes(query)
        const matchesCustomer = proj.customerName?.toLowerCase().includes(query)
        if (!matchesTitle && !matchesCustomer) return false
      }
      
      // Filter by admin view if not admin
      if (!isAdminView && proj.assignedDeveloperId !== user?.uid) {
        return false
      }
      
      return true
    })

    for (const proj of filteredProjects) {
      const status = proj.status || 'intake'
      
      // Map status to column
      if (['intake', 'discovery'].includes(status)) {
        grouped.intake.push(proj)
      } else if (status === 'in-progress') {
        grouped.active.push(proj)
      } else if (['review', 'revision'].includes(status)) {
        grouped.review.push(proj)
      } else if (status === 'completed') {
        grouped.completed.push(proj)
      }
    }

    return grouped
  }, [projects, localSearch, isAdminView, user?.uid])

  const handleCardClick = (projectId: string) => {
    selectProject(projectId)
    openModal('project-detail')
  }

  const formatCost = (cost?: number, currency?: string) => {
    if (!cost) return null
    const curr = currency || 'USD'
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: curr }).format(cost)
  }

  if (isLoading) {
    return (
      <div className="dev-kanban-board">
        {columns.map(col => (
          <div key={col.id} className="dev-kanban-column">
            <div className="dev-kanban-column-header">
              <div className="dev-kanban-column-title">
                <span className="dev-kanban-column-status-dot" style={{ background: col.color }} />
                {col.title}
              </div>
            </div>
            <div className="dev-kanban-column-body">
              {[1, 2].map(i => (
                <div key={i} className="dev-skeleton" style={{ height: 140, marginBottom: 8 }} />
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
          placeholder="Search projects..."
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
          onClick={() => openModal('add-project')}
        >
          New Project
        </DevButton>
      </div>

      {/* Projects Board */}
      <div className="dev-kanban-board" style={{ flex: 1 }}>
        {columns.map(col => (
          <div key={col.id} className="dev-kanban-column">
            <div className="dev-kanban-column-header">
              <div className="dev-kanban-column-title">
                <span className="dev-kanban-column-status-dot" style={{ background: col.color }} />
                {col.title}
                <span className="dev-kanban-column-count">
                  {columnData[col.id]?.length || 0}
                </span>
              </div>
            </div>
            <div className="dev-kanban-column-body">
              {(columnData[col.id] || []).length === 0 ? (
                <div className="dev-kanban-column-empty">
                  <FolderOpen size={24} style={{ marginBottom: 8, opacity: 0.5 }} />
                  No projects
                </div>
              ) : (
                (columnData[col.id] || []).map(proj => (
                  <DevCard 
                    key={proj.id} 
                    interactive 
                    padding="sm"
                    onClick={() => handleCardClick(proj.id)}
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
                        {proj.title || 'Untitled Project'}
                      </div>
                      <div 
                        style={{ 
                          fontSize: 'var(--dev-text-xs)', 
                          color: 'var(--dev-text-muted)' 
                        }}
                      >
                        {proj.customerName || 'Unknown Customer'}
                      </div>
                    </div>
                    
                    {proj.description && (
                      <div 
                        className="dev-line-clamp-2"
                        style={{ 
                          fontSize: 'var(--dev-text-xs)', 
                          color: 'var(--dev-text-secondary)',
                          marginBottom: 'var(--dev-space-2)',
                        }}
                      >
                        {proj.description}
                      </div>
                    )}

                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)' }}>
                        {proj.assignedDeveloperName && (
                          <DevAvatar name={proj.assignedDeveloperName} size="xs" />
                        )}
                        {formatCost(proj.totalCost, proj.currency) && (
                          <span style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                            {formatCost(proj.totalCost, proj.currency)}
                          </span>
                        )}
                      </div>
                      {proj.type && (
                        <DevBadge variant="default" size="sm">
                          {proj.type}
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
