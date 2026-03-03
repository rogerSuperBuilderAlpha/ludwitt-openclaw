'use client'

import { useEffect, useMemo, useState } from 'react'
import { Submission } from '@/lib/types/submission'
import { Project } from '@/lib/types/project'
import { PendingDraft } from '@/lib/types/pendingDraft'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useAllProjects } from '@/lib/hooks/developers/useAllProjects'
import * as devActions from '@/lib/actions/developers'
import { toTimestamp } from '@/lib/utils/timestamp'
import { auth } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

// Helper function to get Firebase auth token
async function getFirebaseToken(): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('No authenticated user')
  }

  try {
    const token = await auth.currentUser.getIdToken()
    if (!token) {
      throw new Error('Failed to get authentication token')
    }
    return token
  } catch (error) {
    logger.error('UseDashboardState', 'Error getting Firebase token', { error })
    throw new Error('Failed to get authentication token')
  }
}

interface UseDashboardStateParams {
  user: { uid: string; email: string | null } | null
  userIsAdmin: boolean
  toast: { success: (m: string) => void; error: (m: string) => void }
}

export function useDashboardState({
  user,
  userIsAdmin,
  toast,
}: UseDashboardStateParams) {
  const [activeTab, setActiveTab] = useState<'docs' | 'projects' | 'all'>(
    'docs'
  )
  const [adminViewMode, setAdminViewMode] = useState<'developer' | 'admin'>(
    'admin'
  )

  // Data
  const {
    submissions: submissionsHook,
    pendingDrafts: pendingHook,
    loading,
    error,
  } = useSubmissions({ userId: user?.uid, isAdmin: userIsAdmin })
  const { projects: projectsHook } = useAllProjects()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [pendingDrafts, setPendingDrafts] = useState<PendingDraft[]>([])

  useEffect(() => {
    setSubmissions(submissionsHook)
  }, [submissionsHook])
  useEffect(() => {
    setProjects(projectsHook)
  }, [projectsHook])
  useEffect(() => {
    setPendingDrafts(pendingHook)
  }, [pendingHook])

  // Modals and selections
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [documentToAssign, setDocumentToAssign] = useState<Submission | null>(
    null
  )
  const [selectedDocument, setSelectedDocument] = useState<Submission | null>(
    null
  )
  const [documentModalView, setDocumentModalView] = useState<
    'details' | 'progress' | 'category'
  >('details')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAddDocModal, setShowAddDocModal] = useState(false)
  const [showChangeOwnerModal, setShowChangeOwnerModal] = useState(false)
  const [changeOwnerDocument, setChangeOwnerDocument] =
    useState<Submission | null>(null)

  // Progress/Category
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [progressNote, setProgressNote] = useState('')
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false)
  const [completionCategory, setCompletionCategory] = useState('')
  const [completionCostCents, setCompletionCostCents] = useState<number>(0)

  // Action states
  const [assigningId, setAssigningId] = useState<string | null>(null)
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null)
  const [addingRequirementId, setAddingRequirementId] = useState<string | null>(
    null
  )
  const [addingSessionId, setAddingSessionId] = useState<string | null>(null)
  const [updatingRequirementId, setUpdatingRequirementId] = useState<
    string | null
  >(null)
  const [sendingMessageId, setSendingMessageId] = useState<string | null>(null)
  const [nudgingDocId, setNudgingDocId] = useState<string | null>(null)
  const [approvingDocId, setApprovingDocId] = useState<string | null>(null)
  const [updatingProjectId, setUpdatingProjectId] = useState<string | null>(
    null
  )

  // Forms
  const [requirementText, setRequirementText] = useState('')
  const [requirementNotes, setRequirementNotes] = useState('')
  const [sessionAccomplishments, setSessionAccomplishments] = useState('')
  const [sessionNextSteps, setSessionNextSteps] = useState('')
  const [sessionTimeSpent, setSessionTimeSpent] = useState('')
  const [sessionRequirementIds, setSessionRequirementIds] = useState<string[]>(
    []
  )
  const [messageText, setMessageText] = useState<{ [key: string]: string }>({})

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [assignedFilter, setAssignedFilter] = useState<string>('all')
  const [customerFilter, setCustomerFilter] = useState<string>('all')

  // Derived lists
  const uniqueDevelopers = useMemo(() => {
    // Guard against processing data while loading or if submissions is empty
    if (!submissions || submissions.length === 0) return []

    const devMap = new Map<string, { id: string; name: string }>()
    submissions.forEach((s) => {
      if (s.assignedTo && !devMap.has(s.assignedTo)) {
        devMap.set(s.assignedTo, {
          id: s.assignedTo,
          name: s.assignedToName || 'Unknown Developer',
        })
      }
    })
    return Array.from(devMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }, [submissions])

  const uniqueCustomers = useMemo(() => {
    // Guard against processing data while loading or if submissions is empty
    if (!submissions || submissions.length === 0) return []

    const customerMap = new Map<
      string,
      { id: string; name: string; email: string }
    >()
    submissions.forEach((s) => {
      if (!customerMap.has(s.customerId)) {
        customerMap.set(s.customerId, {
          id: s.customerId,
          name: s.customer?.displayName || s.customer?.email || 'Unknown',
          email: s.customer?.email || '',
        })
      }
    })
    return Array.from(customerMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }, [submissions])

  const totalDocsCount = useMemo(() => {
    if (userIsAdmin && adminViewMode === 'developer') {
      return submissions.filter(
        (s) => !s.assignedTo || s.assignedTo === user?.uid
      ).length
    }
    return submissions.length
  }, [submissions, userIsAdmin, adminViewMode, user?.uid])

  const totalProjectsCount = useMemo(() => {
    if (userIsAdmin && adminViewMode === 'developer') {
      return projects.filter(
        (p) => !p.assignedDeveloperId || p.assignedDeveloperId === user?.uid
      ).length
    }
    return projects.length
  }, [projects, userIsAdmin, adminViewMode, user?.uid])

  // Sync selected document with latest data
  useEffect(() => {
    if (selectedDocument) {
      const updatedDocument = submissions.find(
        (sub) => sub.id === selectedDocument.id
      )
      if (updatedDocument) setSelectedDocument(updatedDocument)
    }
  }, [submissions, selectedDocument])

  // Handlers (actions)
  const handleAssignToMe = async (submissionId: string) => {
    if (!user) return
    setAssigningId(submissionId)
    try {
      const token = await getFirebaseToken()
      await devActions.assignSubmission(
        token,
        submissionId,
        user.uid,
        user.email || 'Unknown'
      )
      toast.success('Assigned to you successfully')
    } catch (e: unknown) {
      const errMsg =
        e instanceof Error
          ? e.message
          : e && typeof e === 'object' && 'error' in e
            ? String((e as { error: unknown }).error)
            : String(e)
      toast.error(errMsg || 'Failed to assign')
    } finally {
      setAssigningId(null)
    }
  }

  const handleAssignToDeveloper = async (
    developerId: string,
    developerName: string
  ) => {
    if (!user || !documentToAssign) return
    try {
      const token = await getFirebaseToken()
      await devActions.assignSubmission(
        token!,
        documentToAssign.id,
        developerId,
        developerName
      )
      toast.success(`Assigned to ${developerName} successfully`)
      setShowAssignModal(false)
      setDocumentToAssign(null)
    } catch {
      toast.error('Failed to assign document')
    }
  }

  const handleUpdateStatus = async (
    submissionId: string,
    newStatus: string,
    category?: string,
    actualCostCents?: number
  ) => {
    setUpdatingStatusId(submissionId)
    try {
      const token = await getFirebaseToken()
      const result = await devActions.updateSubmissionStatus(
        token!,
        submissionId,
        newStatus,
        category,
        actualCostCents
      )

      // Show success message
      toast.success('Status updated successfully')

      // Show billing info if document was completed with cost
      if (result?.billing && newStatus === 'completed') {
        const { customerCharge } = result.billing
        const chargeFormatted = (customerCharge / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
        toast.success(`💰 Customer charged: ${chargeFormatted}`)
      }

      // Show email diagnostics if document was marked as completed
      if (result?.emailDiagnostics && newStatus === 'completed') {
        const diag = result.emailDiagnostics

        if (diag.success) {
          toast.success(`✅ Completion email sent to: ${diag.customerEmail}`)
        } else if (diag.attempted) {
          // Show warning with reason why email failed
          toast.error(`❌ Email not sent: ${diag.reason}`)
          logger.error('UseDashboardState', 'Email diagnostics', { data: diag })
        } else {
          // Email wasn't attempted (status not 'completed')
        }
      }
    } catch (e: unknown) {
      const errMsg =
        e instanceof Error
          ? e.message
          : e && typeof e === 'object' && 'error' in e
            ? String((e as { error: unknown }).error)
            : String(e)
      toast.error(errMsg || 'Failed to update status')
    } finally {
      setUpdatingStatusId(null)
    }
  }

  const handleStartWork = (submissionId: string) =>
    handleUpdateStatus(submissionId, 'in-progress')
  const handleMarkComplete = (submissionId: string, _title: string) => {
    setCompletionCategory('')
    setCompletionCostCents(0)
    setDocumentModalView('category')
  }

  const handleSubmitProgressFromModal = async () => {
    if (!selectedDocument) return
    setIsUpdatingProgress(true)
    try {
      const token = await getFirebaseToken()
      await devActions.updateProgress(
        token!,
        selectedDocument.id,
        progressPercentage,
        progressNote || undefined
      )
      toast.success('Progress updated successfully')
      setDocumentModalView('details')
      setProgressNote('')
    } catch {
      toast.error('Failed to update progress')
    } finally {
      setIsUpdatingProgress(false)
    }
  }

  const handleSubmitCategoryFromModal = async () => {
    if (!selectedDocument || !completionCategory.trim()) return
    await handleUpdateStatus(
      selectedDocument.id,
      'completed',
      completionCategory.trim(),
      completionCostCents || undefined
    )
    setDocumentModalView('details')
    setCompletionCategory('')
    setCompletionCostCents(0)
  }

  const handleOpenProgressModal = (submission: Submission) => {
    setProgressPercentage(submission.progressPercentage || 0)
    setProgressNote('')
    setDocumentModalView('progress')
  }

  const handleAddRequirement = async (submission: Submission) => {
    if (!requirementText.trim()) return
    setAddingRequirementId(submission.id)
    try {
      const token = await getFirebaseToken()
      await devActions.addRequirement(token!, {
        documentId: submission.id,
        customerId: submission.customerId,
        requirement: requirementText,
        notes: requirementNotes,
        creatorId: auth.currentUser?.uid,
      })
      setRequirementText('')
      setRequirementNotes('')
      toast.success('Requirement added')
    } catch {
      toast.error('Failed to add requirement')
    } finally {
      setAddingRequirementId(null)
    }
  }

  const handleAddSession = async (submission: Submission) => {
    if (!sessionAccomplishments.trim()) return
    setAddingSessionId(submission.id)
    try {
      const token = await getFirebaseToken()
      const payload: any = {
        documentId: submission.id,
        customerId: submission.customerId,
        accomplishments: sessionAccomplishments,
        nextSteps: sessionNextSteps,
      }
      if (sessionTimeSpent && !isNaN(parseInt(sessionTimeSpent)))
        payload.timeSpentMinutes = parseInt(sessionTimeSpent)
      if (sessionRequirementIds.length > 0)
        payload.requirementIds = sessionRequirementIds
      await devActions.addSession(token!, payload)
      setSessionAccomplishments('')
      setSessionNextSteps('')
      setSessionTimeSpent('')
      setSessionRequirementIds([])
      toast.success('Session logged')
    } catch {
      toast.error('Failed to add session')
    } finally {
      setAddingSessionId(null)
    }
  }

  const handleUpdateRequirementStatus = async (
    requirementId: string,
    documentId: string,
    customerId: string,
    newStatus: string
  ) => {
    setUpdatingRequirementId(requirementId)
    try {
      const token = await getFirebaseToken()
      await devActions.updateRequirementStatus(token!, {
        requirementId,
        documentId,
        customerId,
        status: newStatus,
      })
      toast.success('Requirement status updated')
    } catch {
      toast.error('Failed to update requirement')
    } finally {
      setUpdatingRequirementId(null)
    }
  }

  const handleSendMessage = async (documentId: string, customerId: string) => {
    const message = messageText[documentId]?.trim()
    if (!message) return
    setSendingMessageId(documentId)
    try {
      const token = await getFirebaseToken()
      await devActions.sendMessage(token!, { documentId, customerId, message })
      setMessageText((prev) => ({ ...prev, [documentId]: '' }))
      toast.success('Message sent')
    } catch {
      toast.error('Failed to send message')
    } finally {
      setSendingMessageId(null)
    }
  }

  const handleNudgeCustomer = async (documentId: string) => {
    if (!user) return
    setNudgingDocId(documentId)
    try {
      const token = await getFirebaseToken()
      await devActions.nudgeCustomer(token!, documentId)
      toast.success('Nudge email sent successfully!')
    } catch {
      toast.error('Failed to send nudge email')
    } finally {
      setNudgingDocId(null)
    }
  }

  const handleApproveDocument = async (documentId: string) => {
    if (!user) return
    setApprovingDocId(documentId)
    try {
      const token = await getFirebaseToken()
      await devActions.approveDocument(token!, documentId)
      toast.success('Document approved successfully!')
    } catch {
      toast.error('Failed to approve document')
    } finally {
      setApprovingDocId(null)
    }
  }

  const handleUpdateProjectStatus = async (
    projectId: string,
    newStatus: string
  ) => {
    if (!user) return
    setUpdatingProjectId(projectId)
    try {
      const token = await getFirebaseToken()
      await devActions.updateProjectStatus(token!, {
        projectId,
        status: newStatus,
        ...(newStatus === 'completed' && {
          actualCompletionDate: new Date().toISOString(),
        }),
      })
      toast.success('Project status updated successfully!')
    } catch {
      toast.error('Failed to update project status')
    } finally {
      setUpdatingProjectId(null)
    }
  }

  const handleAddDocument = async (data: {
    shareUrl: string
    title: string
    notes: string
    projectId: string
    customerId: string
    status: 'pending' | 'approved'
  }) => {
    try {
      const token = await getFirebaseToken()
      const result = await devActions.addDocument(token!, data)
      if ((result as Record<string, unknown>)?.updated) {
        toast.success('Document updated and approved successfully')
      } else {
        toast.success('Document added successfully')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      toast.error(message || 'Failed to add document')
      throw err
    }
  }

  const handleChangeOwner = async (
    documentId: string,
    newCustomerId: string
  ) => {
    try {
      const token = await getFirebaseToken()
      await devActions.changeOwner(token!, { documentId, newCustomerId })
      toast.success('Document owner changed successfully')
      setSelectedDocument(null)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      toast.error(message || 'Failed to change document owner')
      throw err
    }
  }

  return {
    // tab/view
    activeTab,
    setActiveTab,
    adminViewMode,
    setAdminViewMode,

    // data
    submissions,
    projects,
    pendingDrafts,
    loading,
    error,

    // selection/modals
    showAssignModal,
    setShowAssignModal,
    documentToAssign,
    setDocumentToAssign,
    selectedDocument,
    setSelectedDocument,
    documentModalView,
    setDocumentModalView,
    selectedProject,
    setSelectedProject,
    showAddDocModal,
    setShowAddDocModal,
    showChangeOwnerModal,
    setShowChangeOwnerModal,
    changeOwnerDocument,
    setChangeOwnerDocument,

    // progress/category
    progressPercentage,
    setProgressPercentage,
    progressNote,
    setProgressNote,
    isUpdatingProgress,
    completionCategory,
    setCompletionCategory,
    completionCostCents,
    setCompletionCostCents,

    // action states
    assigningId,
    updatingStatusId,
    addingRequirementId,
    addingSessionId,
    updatingRequirementId,
    sendingMessageId,
    nudgingDocId,
    approvingDocId,
    updatingProjectId,

    // forms
    requirementText,
    setRequirementText,
    requirementNotes,
    setRequirementNotes,
    sessionAccomplishments,
    setSessionAccomplishments,
    sessionNextSteps,
    setSessionNextSteps,
    sessionTimeSpent,
    setSessionTimeSpent,
    sessionRequirementIds,
    setSessionRequirementIds,
    messageText,
    setMessageText,

    // filters
    searchQuery,
    setSearchQuery,
    assignedFilter,
    setAssignedFilter,
    customerFilter,
    setCustomerFilter,
    uniqueDevelopers,
    uniqueCustomers,
    totalDocsCount,
    totalProjectsCount,

    // handlers
    handleAssignToMe,
    handleAssignToDeveloper,
    handleUpdateStatus,
    handleStartWork,
    handleMarkComplete,
    handleSubmitProgressFromModal,
    handleSubmitCategoryFromModal,
    handleAddRequirement,
    handleAddSession,
    handleUpdateRequirementStatus,
    handleSendMessage,
    handleNudgeCustomer,
    handleApproveDocument,
    handleUpdateProjectStatus,
    handleAddDocument,
    handleChangeOwner,
    handleOpenProgressModal,
  }
}
