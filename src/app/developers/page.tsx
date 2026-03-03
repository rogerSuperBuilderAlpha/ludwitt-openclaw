'use client'

import { useState, useMemo } from 'react'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useClientDocCounts } from '@/lib/hooks/developers/useClientDocCounts'
import { useAuth } from '@/components/auth/ClientProvider'
import { DocumentsToolbar } from '@/components/developers/DocumentsToolbar'
import { DocumentsKanbanView } from '@/components/developers/DocumentsKanbanView'
import { DocumentsListView } from '@/components/developers/DocumentsListView'
import { DocumentsLoadingSkeleton } from '@/components/developers/DocumentsLoadingSkeleton'
import { PendingDraftsBanner } from '@/components/developers/PendingDraftsBanner'
import type { ViewMode, SortField } from '@/components/developers/DocumentsToolbar'
import type { KanbanColumn } from '@/components/developers/DocumentsKanbanView'
import type { Submission } from '@/lib/types/submission'
import { logger } from '@/lib/logger'

const columns: KanbanColumn[] = [
  { id: 'pending', title: 'Available', status: 'pending', color: 'var(--dev-status-available)', description: 'Ready to claim' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'var(--dev-status-in-progress)', description: 'Being worked on' },
  { id: 'completed', title: 'Completed', status: 'completed', color: 'var(--dev-status-done)', description: 'Completed' },
  { id: 'archived', title: 'Archived', status: 'archived', color: 'var(--dev-status-archived)', description: 'Archived' },
]

/**
 * Documents Page - Main Developer Portal View
 *
 * Shows all documents in a kanban board or list view.
 * Supports filtering, searching, and quick actions.
 */
export default function DocumentsPage() {
  const { user } = useAuth()
  const { isAdminView, openModal, selectDocument } = useDevPortalStore()

  const { submissions, pendingDrafts, loading } = useSubmissions({ userId: user?.uid || null, isAdmin: isAdminView })
  const { completedCounts, archivedCounts, loading: countsLoading } = useClientDocCounts(user?.uid || null)
  const [viewMode, setViewMode] = useState<ViewMode>('kanban')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('date')
  const [showFilters, setShowFilters] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [claimingId, setClaimingId] = useState<string | null>(null)
  const [expandedClients, setExpandedClients] = useState<Record<string, boolean>>({})
  const [loadedClientDocs, setLoadedClientDocs] = useState<Record<string, Submission[]>>({})
  const [loadingClients, setLoadingClients] = useState<Record<string, boolean>>({})

  // Fetch client docs on expand
  const fetchClientDocs = async (clientId: string, status: 'completed' | 'archived') => {
    const key = `${status}-${clientId}`
    if (loadedClientDocs[key]) return // Already loaded

    setLoadingClients(prev => ({ ...prev, [key]: true }))

    try {
      const token = await user?.getIdToken()
      const res = await fetch(`/api/developers/client-docs?clientId=${clientId}&status=${status}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()

      if (data.success) {
        setLoadedClientDocs(prev => ({ ...prev, [key]: data.data.documents }))
      }
    } catch (err) {
      logger.error('DocumentsPage', 'Failed to load client docs', { error: err })
    } finally {
      setLoadingClients(prev => ({ ...prev, [key]: false }))
    }
  }

  const toggleClient = (clientId: string, status: 'completed' | 'archived') => {
    const key = `${status}-${clientId}`
    const isExpanding = !expandedClients[key]
    setExpandedClients(prev => ({ ...prev, [key]: isExpanding }))

    if (isExpanding && !loadedClientDocs[key]) {
      fetchClientDocs(clientId, status)
    }
  }

  // Get auth token
  const getFirebaseToken = async () => {
    if (!user) throw new Error('Not authenticated')
    return user.getIdToken()
  }

  // Quick claim handler
  const handleQuickClaim = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation()
    setClaimingId(docId)
    try {
      const token = await getFirebaseToken()
      await fetch('/api/developers/submissions/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionId: docId,
          developerId: user?.uid,
        }),
      })
    } catch (err) {
      logger.error('DocumentsPage', 'Claim error', { error: err })
    } finally {
      setClaimingId(null)
    }
  }

  // Quick assign handler (opens modal)
  const handleQuickAssign = (e: React.MouseEvent, doc: Submission) => {
    e.stopPropagation()
    selectDocument(doc.id)
    openModal('assign-developer', { documentId: doc.id, documentTitle: doc.googleDocTitle })
  }

  // Quick complete handler (opens detail modal on complete view)
  const handleQuickComplete = (e: React.MouseEvent, doc: Submission) => {
    e.stopPropagation()
    selectDocument(doc.id)
    openModal('document-detail')
  }

  // Filter and sort submissions
  const filteredSubmissions = useMemo(() => {
    let filtered = [...submissions]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(sub =>
        sub.googleDocTitle?.toLowerCase().includes(query) ||
        sub.customer?.displayName?.toLowerCase().includes(query) ||
        sub.customer?.email?.toLowerCase().includes(query)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => {
        if (statusFilter === 'pending') {
          return sub.status === 'pending' || sub.status === 'approved'
        }
        return sub.status === statusFilter
      })
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(sub => sub.priority === priorityFilter)
    }

    filtered.sort((a, b) => {
      switch (sortField) {
        case 'customer':
          return (a.customer?.displayName || '').localeCompare(b.customer?.displayName || '')
        case 'priority': {
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
          return (priorityOrder[a.priority as keyof typeof priorityOrder] || 4) -
                 (priorityOrder[b.priority as keyof typeof priorityOrder] || 4)
        }
        case 'status':
          return (a.status || '').localeCompare(b.status || '')
        default:
          return 0
      }
    })

    return filtered
  }, [submissions, searchQuery, statusFilter, priorityFilter, sortField])

  // Group submissions by status for kanban
  const columnData = useMemo(() => {
    const grouped: Record<string, Submission[]> = {
      pending: [],
      'in-progress': [],
      completed: [],
      archived: [],
    }

    for (const sub of filteredSubmissions) {
      const status = sub.status || 'pending'
      const columnKey = status === 'approved' ? 'pending' : status
      if (grouped[columnKey]) {
        grouped[columnKey].push(sub)
      }
    }

    return grouped
  }, [filteredSubmissions])

  const handleCardClick = (doc: Submission) => {
    selectDocument(doc.id)
    openModal('document-detail')
  }

  // Stats
  const completedTotal = completedCounts.reduce((sum, c) => sum + c.count, 0)
  const archivedTotal = archivedCounts.reduce((sum, c) => sum + c.count, 0)

  const stats = useMemo(() => ({
    total: submissions.length + completedTotal + archivedTotal,
    available: columnData.pending.length,
    inProgress: columnData['in-progress'].length,
    completed: completedTotal,
    archived: archivedTotal,
    pendingDrafts: pendingDrafts.length,
  }), [submissions, columnData, pendingDrafts, completedTotal, archivedTotal])

  if (loading) return <DocumentsLoadingSkeleton columns={columns} />

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DocumentsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        sortField={sortField}
        onSortFieldChange={setSortField}
        showSortMenu={showSortMenu}
        onToggleSortMenu={() => setShowSortMenu(!showSortMenu)}
        onCloseSortMenu={() => setShowSortMenu(false)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddDocument={() => openModal('add-document')}
        stats={stats}
      />

      <PendingDraftsBanner pendingDrafts={pendingDrafts} />

      {/* Content */}
      {viewMode === 'kanban' ? (
        <DocumentsKanbanView
          columns={columns}
          columnData={columnData}
          completedCounts={completedCounts}
          archivedCounts={archivedCounts}
          completedTotal={completedTotal}
          archivedTotal={archivedTotal}
          countsLoading={countsLoading}
          expandedClients={expandedClients}
          loadedClientDocs={loadedClientDocs}
          loadingClients={loadingClients}
          onToggleClient={toggleClient}
          onCardClick={handleCardClick}
          onQuickClaim={handleQuickClaim}
          onQuickAssign={handleQuickAssign}
          onQuickComplete={handleQuickComplete}
          claimingId={claimingId}
          isAdminView={isAdminView}
          currentUserId={user?.uid}
        />
      ) : (
        <DocumentsListView
          submissions={filteredSubmissions}
          onCardClick={handleCardClick}
        />
      )}
    </div>
  )
}
