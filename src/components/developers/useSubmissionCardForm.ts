'use client'

import { useState, useCallback } from 'react'

interface Submission {
  id: string
  customerId: string
  googleDocTitle: string
  googleDocUrl: string
  approvedAt: any
  status?: 'pending' | 'in-progress' | 'completed' | 'archived'
  category?: string
  assignedTo?: string
  assignedToName?: string
  customer: {
    email: string
    displayName: string
    assignedSubmissionsCount?: number
  }
  requirements: Array<{
    id: string
    requirement: string
    status: string
    addedBy: string
    addedAt: any
    notes?: string
  }>
  sessions: Array<{
    id: string
    accomplishments: string
    sessionDate: any
    addedBy: string
    nextSteps?: string
  }>
}

interface SubmissionCardFormActions {
  onAddRequirement: (submission: Submission, text: string, notes: string) => Promise<void>
  onAddSession: (submission: Submission, accomplishments: string, nextSteps: string) => Promise<void>
  onSubmitNotification: (submission: Submission) => Promise<void>
  onAssignToMe: (id: string) => Promise<void>
  onAssignToDeveloper: (submissionId: string, developerId: string) => Promise<void>
  onUpdateStatus: (id: string, status: string) => Promise<void>
  onMarkComplete: (id: string, title: string) => Promise<void>
  onArchive: (id: string, title: string) => Promise<void>
}

export function useSubmissionCardForm(
  submission: Submission,
  actions: SubmissionCardFormActions
) {
  // Requirement form state
  const [showRequirementForm, setShowRequirementForm] = useState(false)
  const [requirementText, setRequirementText] = useState('')
  const [requirementNotes, setRequirementNotes] = useState('')
  const [addingRequirement, setAddingRequirement] = useState(false)

  // Session form state
  const [showSessionForm, setShowSessionForm] = useState(false)
  const [sessionAccomplishments, setSessionAccomplishments] = useState('')
  const [sessionNextSteps, setSessionNextSteps] = useState('')
  const [addingSession, setAddingSession] = useState(false)

  // Assignment state
  const [showAssignDropdown, setShowAssignDropdown] = useState(false)
  const [selectedDeveloper, setSelectedDeveloper] = useState('')
  const [assigning, setAssigning] = useState(false)

  // Action states
  const [submitting, setSubmitting] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const handleAddRequirement = useCallback(async () => {
    if (!requirementText.trim()) return
    setAddingRequirement(true)
    try {
      await actions.onAddRequirement(submission, requirementText, requirementNotes)
      setRequirementText('')
      setRequirementNotes('')
      setShowRequirementForm(false)
    } finally {
      setAddingRequirement(false)
    }
  }, [submission, requirementText, requirementNotes, actions])

  const handleAddSession = useCallback(async () => {
    if (!sessionAccomplishments.trim()) return
    setAddingSession(true)
    try {
      await actions.onAddSession(submission, sessionAccomplishments, sessionNextSteps)
      setSessionAccomplishments('')
      setSessionNextSteps('')
      setShowSessionForm(false)
    } finally {
      setAddingSession(false)
    }
  }, [submission, sessionAccomplishments, sessionNextSteps, actions])

  const handleSubmitNotification = useCallback(async () => {
    setSubmitting(true)
    try {
      await actions.onSubmitNotification(submission)
    } finally {
      setSubmitting(false)
    }
  }, [submission, actions])

  const handleAssignToMe = useCallback(async () => {
    setAssigning(true)
    try {
      await actions.onAssignToMe(submission.id)
    } finally {
      setAssigning(false)
    }
  }, [submission.id, actions])

  const handleAssignToDeveloper = useCallback(async () => {
    if (!selectedDeveloper) return
    setAssigning(true)
    try {
      await actions.onAssignToDeveloper(submission.id, selectedDeveloper)
      setShowAssignDropdown(false)
      setSelectedDeveloper('')
    } finally {
      setAssigning(false)
    }
  }, [submission.id, selectedDeveloper, actions])

  const handleUpdateStatus = useCallback(async (status: string) => {
    setUpdatingStatus(true)
    try {
      await actions.onUpdateStatus(submission.id, status)
    } finally {
      setUpdatingStatus(false)
    }
  }, [submission.id, actions])

  const handleMarkComplete = useCallback(async () => {
    await actions.onMarkComplete(submission.id, submission.googleDocTitle)
  }, [submission.id, submission.googleDocTitle, actions])

  const handleArchive = useCallback(async () => {
    setUpdatingStatus(true)
    try {
      await actions.onArchive(submission.id, submission.googleDocTitle)
    } finally {
      setUpdatingStatus(false)
    }
  }, [submission.id, submission.googleDocTitle, actions])

  return {
    // Requirement form
    showRequirementForm,
    setShowRequirementForm,
    requirementText,
    setRequirementText,
    requirementNotes,
    setRequirementNotes,
    addingRequirement,
    handleAddRequirement,

    // Session form
    showSessionForm,
    setShowSessionForm,
    sessionAccomplishments,
    setSessionAccomplishments,
    sessionNextSteps,
    setSessionNextSteps,
    addingSession,
    handleAddSession,

    // Assignment
    showAssignDropdown,
    setShowAssignDropdown,
    selectedDeveloper,
    setSelectedDeveloper,
    assigning,
    handleAssignToMe,
    handleAssignToDeveloper,

    // Actions
    submitting,
    handleSubmitNotification,
    updatingStatus,
    handleUpdateStatus,
    handleMarkComplete,
    handleArchive,
  }
}
