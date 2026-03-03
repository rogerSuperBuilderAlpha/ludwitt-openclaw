'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'
import type { Submission } from '@/lib/types/submission'
import type {
  ModalView,
  DocumentDetailActions,
  DocumentDetailState,
  DocumentPermissions,
} from './documentDetailTypes'

interface UseDocumentDetailReturn {
  document: Submission | null
  state: DocumentDetailState
  actions: DocumentDetailActions
  permissions: DocumentPermissions
  closeModal: () => void
  formatDateTime: (dateValue: unknown) => string
}

export function useDocumentDetail(): UseDocumentDetailReturn {
  const { user } = useAuth()
  const { selectedDocumentId, closeModal, openModal, isAdminView } = useDevPortalStore()
  const { submissions } = useSubmissions({ userId: user?.uid || null, isAdmin: isAdminView })

  const [view, setView] = useState<ModalView>('details')
  const [claiming, setClaiming] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [updating, setUpdating] = useState(false)

  // Progress form state
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [progressNote, setProgressNote] = useState('')

  // Completion form state
  const [completionCategory, setCompletionCategory] = useState('')
  const [completionCostCents, setCompletionCostCents] = useState(0)
  const [completionNotes, setCompletionNotes] = useState('')

  // Message state
  const [messageText, setMessageText] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  // Find the document
  const document = useMemo(() => {
    if (!selectedDocumentId) return null
    return submissions.find(s => s.id === selectedDocumentId) || null
  }, [selectedDocumentId, submissions])

  // Reset form when document changes
  useEffect(() => {
    if (document) {
      setProgressPercentage(document.progressPercentage || 0)
      setProgressNote(document.progressNote || '')
      setCompletionCategory(document.category || '')
    }
    setView('details')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document?.id])

  const getFirebaseToken = useCallback(async () => {
    if (!user) throw new Error('Not authenticated')
    return user.getIdToken()
  }, [user])

  const handleClaim = useCallback(async () => {
    if (!document) return
    setClaiming(true)
    try {
      const token = await getFirebaseToken()
      const res = await fetch('/api/developers/submissions/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionId: document.id,
          developerId: user?.uid,
        }),
      })
      if (!res.ok) throw new Error('Failed to claim')
    } catch (err) {
      logger.error('DocumentDetailModal', 'Claim error', { error: err })
    } finally {
      setClaiming(false)
    }
  }, [document, getFirebaseToken, user?.uid])

  const handleAssign = useCallback(() => {
    if (!document) return
    openModal('assign-developer', { documentId: document.id, documentTitle: document.googleDocTitle })
  }, [document, openModal])

  const handleStartWork = useCallback(async () => {
    if (!document) return
    setUpdating(true)
    try {
      const token = await getFirebaseToken()
      await fetch('/api/developers/submissions/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionId: document.id,
          status: 'in-progress',
        }),
      })
    } catch (err) {
      logger.error('DocumentDetailModal', 'Start work error', { error: err })
    } finally {
      setUpdating(false)
    }
  }, [document, getFirebaseToken])

  const handleUpdateProgress = useCallback(async () => {
    if (!document) return
    setUpdating(true)
    try {
      const token = await getFirebaseToken()
      await fetch('/api/developers/submissions/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionId: document.id,
          progressPercentage,
          progressNote,
        }),
      })
      setView('details')
    } catch (err) {
      logger.error('DocumentDetailModal', 'Update progress error', { error: err })
    } finally {
      setUpdating(false)
    }
  }, [document, getFirebaseToken, progressPercentage, progressNote])

  const handleComplete = useCallback(async () => {
    if (!document || !completionCategory.trim()) return
    setCompleting(true)
    try {
      const token = await getFirebaseToken()
      await fetch('/api/developers/submissions/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionId: document.id,
          status: 'completed',
          category: completionCategory,
          actualCostCents: completionCostCents,
          completionNotes,
        }),
      })
      closeModal()
    } catch (err) {
      logger.error('DocumentDetailModal', 'Complete error', { error: err })
    } finally {
      setCompleting(false)
    }
  }, [document, getFirebaseToken, completionCategory, completionCostCents, completionNotes, closeModal])

  const handleArchive = useCallback(async () => {
    if (!document) return
    setUpdating(true)
    try {
      const token = await getFirebaseToken()
      await fetch('/api/developers/submissions/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionId: document.id,
          status: 'archived',
        }),
      })
    } catch (err) {
      logger.error('DocumentDetailModal', 'Archive error', { error: err })
    } finally {
      setUpdating(false)
    }
  }, [document, getFirebaseToken])

  const handleSendMessage = useCallback(async () => {
    if (!document || !messageText.trim()) return
    setSendingMessage(true)
    try {
      const token = await getFirebaseToken()
      await fetch('/api/developers/documents/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          documentId: document.id,
          message: messageText,
        }),
      })
      setMessageText('')
    } catch (err) {
      logger.error('DocumentDetailModal', 'Send message error', { error: err })
    } finally {
      setSendingMessage(false)
    }
  }, [document, getFirebaseToken, messageText])

  const formatDateTime = useCallback((dateValue: unknown): string => {
    if (!dateValue) return ''
    let date: Date
    const val = dateValue as Record<string, unknown>
    if (val instanceof Date) {
      date = val
    } else if (typeof val === 'string') {
      date = new Date(val)
    } else if (val.seconds) {
      date = new Date((val.seconds as number) * 1000)
    } else if (val._seconds) {
      date = new Date((val._seconds as number) * 1000)
    } else {
      return ''
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }, [])

  const isAssignedToMe = document?.assignedTo === user?.uid
  const isUnassigned = !document?.assignedTo
  const canClaim = isUnassigned || isAdminView
  const canComplete = isAssignedToMe && document?.status === 'in-progress'
  const canStart = isAssignedToMe && (document?.status === 'approved' || document?.status === 'pending' || !document?.status)

  const permissions: DocumentPermissions = {
    isAssignedToMe,
    isUnassigned,
    canClaim,
    canComplete,
    canStart,
    isAdminView,
  }

  const state: DocumentDetailState = {
    view,
    setView,
    claiming,
    completing,
    updating,
    progressPercentage,
    setProgressPercentage,
    progressNote,
    setProgressNote,
    completionCategory,
    setCompletionCategory,
    completionCostCents,
    setCompletionCostCents,
    completionNotes,
    setCompletionNotes,
    messageText,
    setMessageText,
    sendingMessage,
  }

  const actions: DocumentDetailActions = {
    handleClaim,
    handleAssign,
    handleStartWork,
    handleUpdateProgress,
    handleComplete,
    handleArchive,
    handleSendMessage,
  }

  return {
    document,
    state,
    actions,
    permissions,
    closeModal,
    formatDateTime,
  }
}
