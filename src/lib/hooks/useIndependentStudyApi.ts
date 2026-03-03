/**
 * useIndependentStudyApi Hook
 *
 * Owns all Independent Study API interactions and associated state:
 * - studies list, loading/error states, selected study
 * - fetch, create, generate curriculum, confirm, archive, skip prereqs, etc.
 *
 * CRITICAL: Every fetch call uses user.getIdToken() and sends
 * Authorization: Bearer <token> to preserve authentication.
 */

import { useState, useEffect, useCallback } from 'react'
import type { User } from 'firebase/auth'
import type {
  IndependentStudyDisplay,
  ProjectDefinition,
  ProfessionalReview,
  StudyPhase,
} from '@/lib/types/independent-study'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseIndependentStudyApiOptions {
  user: User | null
  /**
   * Whether the user is unlocked via external means (completed prereqs or
   * admin bypass). The hook combines this with its own `hasPaidSkip` state
   * to derive the final effective unlock status used for fetching studies.
   */
  externallyUnlocked: boolean
}

export interface UseIndependentStudyApiReturn {
  // State
  studies: IndependentStudyDisplay[]
  isLoadingStudies: boolean
  selectedStudy: IndependentStudyDisplay | null
  isCreating: boolean
  isGeneratingCurriculum: boolean
  error: string | null
  hasPaidSkip: boolean
  isSkipping: boolean
  isCheckingSkipStatus: boolean

  // Setters exposed for UI wiring
  setSelectedStudy: (study: IndependentStudyDisplay | null) => void
  setError: (error: string | null) => void

  // Actions
  fetchStudies: () => Promise<void>
  handleCreateStudy: (initialTopic: string) => Promise<void>
  handleGenerateCurriculum: () => Promise<void>
  handleConfirmCurriculum: () => Promise<void>
  handleAllUnitsComplete: () => Promise<void>
  handleProjectUpdate: (project: ProjectDefinition) => void
  handleSubmitForAIReview: () => Promise<void>
  handleProceedToProfessional: () => void
  handleRetryProject: () => void
  handleProfessionalUpdate: (review: ProfessionalReview) => void
  handleStudyComplete: () => void
  handleArchiveStudy: (studyId: string) => Promise<void>
  handleSwitchStudy: (study: IndependentStudyDisplay) => void
  handleSkipPrereqs: () => Promise<void>
}

// ---------------------------------------------------------------------------
// Helper – authorised fetch
// ---------------------------------------------------------------------------

async function authFetch(
  user: User,
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const token = await user.getIdToken()
  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  })
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useIndependentStudyApi({
  user,
  externallyUnlocked,
}: UseIndependentStudyApiOptions): UseIndependentStudyApiReturn {
  // ---- state ---------------------------------------------------------------
  const [studies, setStudies] = useState<IndependentStudyDisplay[]>([])
  const [isLoadingStudies, setIsLoadingStudies] = useState(true)
  const [selectedStudy, setSelectedStudy] =
    useState<IndependentStudyDisplay | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isGeneratingCurriculum, setIsGeneratingCurriculum] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Skip-prereqs state
  const [hasPaidSkip, setHasPaidSkip] = useState(false)
  const [isSkipping, setIsSkipping] = useState(false)
  const [isCheckingSkipStatus, setIsCheckingSkipStatus] = useState(true)

  // Derived: user is effectively unlocked from external prereqs OR paid skip
  const effectivelyUnlocked = externallyUnlocked || hasPaidSkip

  // ---- check skip status on mount ------------------------------------------
  useEffect(() => {
    const checkSkipStatus = async () => {
      if (!user) {
        setIsCheckingSkipStatus(false)
        return
      }

      try {
        const response = await authFetch(user, '/api/basics/independent-study/skip-prereqs')
        if (response.ok) {
          const data = await response.json()
          setHasPaidSkip(data.hasSkipped === true)
        }
      } catch {
        // Silent fail – assume not skipped
      } finally {
        setIsCheckingSkipStatus(false)
      }
    }

    checkSkipStatus()
  }, [user])

  // ---- fetch studies -------------------------------------------------------
  const fetchStudies = useCallback(async () => {
    if (!user) return

    setIsLoadingStudies(true)
    try {
      const response = await authFetch(user, '/api/basics/independent-study')
      if (response.ok) {
        const data = await response.json()
        setStudies(data.studies || [])
      }
    } catch {
      setError('Failed to load studies')
    } finally {
      setIsLoadingStudies(false)
    }
  }, [user])

  useEffect(() => {
    if (user && effectivelyUnlocked && !isCheckingSkipStatus) {
      fetchStudies()
    } else if (!isCheckingSkipStatus) {
      setIsLoadingStudies(false)
    }
  }, [user, effectivelyUnlocked, fetchStudies, isCheckingSkipStatus])

  // ---- skip prerequisites --------------------------------------------------
  const handleSkipPrereqs = async () => {
    if (!user) return

    setIsSkipping(true)
    setError(null)

    try {
      const response = await authFetch(user, '/api/basics/independent-study/skip-prereqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to process payment')
      }

      setHasPaidSkip(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to skip prerequisites')
    } finally {
      setIsSkipping(false)
    }
  }

  // ---- create study --------------------------------------------------------
  const handleCreateStudy = async (initialTopic: string) => {
    if (!user) return

    setIsCreating(true)
    setError(null)

    try {
      const response = await authFetch(user, '/api/basics/independent-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initialTopic }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create study')
      }

      setStudies((prev) => [data.study, ...prev])
      setSelectedStudy(data.study)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create study')
    } finally {
      setIsCreating(false)
    }
  }

  // ---- generate curriculum -------------------------------------------------
  const handleGenerateCurriculum = async () => {
    if (!user || !selectedStudy) return

    setIsGeneratingCurriculum(true)
    setError(null)

    try {
      const response = await authFetch(
        user,
        '/api/basics/independent-study/generate-curriculum',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studyId: selectedStudy.id }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate curriculum')
      }

      const updatedStudy: IndependentStudyDisplay = {
        ...selectedStudy,
        coursePrompt: data.coursePrompt,
        phase: 'curriculum_preview',
      }
      setSelectedStudy(updatedStudy)
      setStudies((prev) =>
        prev.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)),
      )
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate curriculum',
      )
    } finally {
      setIsGeneratingCurriculum(false)
    }
  }

  // ---- confirm curriculum --------------------------------------------------
  const handleConfirmCurriculum = async () => {
    if (!user || !selectedStudy) return

    try {
      await authFetch(user, '/api/basics/independent-study', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studyId: selectedStudy.id, phase: 'learning' }),
      })

      const updatedStudy = {
        ...selectedStudy,
        phase: 'learning' as StudyPhase,
      }
      setSelectedStudy(updatedStudy)
      setStudies((prev) =>
        prev.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)),
      )
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to start learning',
      )
    }
  }

  // ---- all units complete (learning -> building) ---------------------------
  const handleAllUnitsComplete = async () => {
    if (!user || !selectedStudy) return

    try {
      const token = await user.getIdToken()

      // Initialize project
      await fetch('/api/basics/independent-study/project', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studyId: selectedStudy.id }),
      })

      // Refetch study to get updated data
      const response = await fetch(
        `/api/basics/independent-study?studyId=${selectedStudy.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.ok) {
        const data = await response.json()
        const updated = data.studies.find(
          (s: IndependentStudyDisplay) => s.id === selectedStudy.id,
        )
        if (updated) {
          setSelectedStudy(updated)
          setStudies((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s)),
          )
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to start project phase',
      )
    }
  }

  // ---- project update (local) ----------------------------------------------
  const handleProjectUpdate = (project: ProjectDefinition) => {
    if (!selectedStudy) return
    const updatedStudy = { ...selectedStudy, project }
    setSelectedStudy(updatedStudy)
    setStudies((prev) =>
      prev.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)),
    )
  }

  // ---- submit for AI review ------------------------------------------------
  const handleSubmitForAIReview = async () => {
    if (!user || !selectedStudy) return

    try {
      const response = await authFetch(
        user,
        '/api/basics/independent-study/ai-review',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studyId: selectedStudy.id }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit for review')
      }

      const updatedStudy = {
        ...selectedStudy,
        aiReview: data.review,
        phase: data.nextPhase as StudyPhase,
      }
      setSelectedStudy(updatedStudy)
      setStudies((prev) =>
        prev.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)),
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to submit for AI review',
      )
    }
  }

  // ---- phase transitions (local) ------------------------------------------
  const handleProceedToProfessional = () => {
    if (!selectedStudy) return
    const updatedStudy = {
      ...selectedStudy,
      phase: 'professional_review' as StudyPhase,
    }
    setSelectedStudy(updatedStudy)
  }

  const handleRetryProject = () => {
    if (!selectedStudy) return
    const updatedStudy = {
      ...selectedStudy,
      phase: 'building' as StudyPhase,
    }
    setSelectedStudy(updatedStudy)
  }

  const handleProfessionalUpdate = (review: ProfessionalReview) => {
    if (!selectedStudy) return
    const updatedStudy = { ...selectedStudy, professionalReview: review }
    setSelectedStudy(updatedStudy)
    setStudies((prev) =>
      prev.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)),
    )
  }

  const handleStudyComplete = () => {
    if (!selectedStudy) return
    const updatedStudy = {
      ...selectedStudy,
      phase: 'completed' as StudyPhase,
      status: 'completed' as const,
    }
    setSelectedStudy(updatedStudy)
    setStudies((prev) =>
      prev.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)),
    )
  }

  // ---- archive study -------------------------------------------------------
  const handleArchiveStudy = async (studyId: string) => {
    if (!user) return

    try {
      const response = await authFetch(user, '/api/basics/independent-study', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studyId, status: 'archived' }),
      })

      if (response.ok) {
        setStudies((prev) =>
          prev.map((s) =>
            s.id === studyId ? { ...s, status: 'archived' as const } : s,
          ),
        )
      }
    } catch {
      setError('Failed to archive study')
    }
  }

  // ---- switch study --------------------------------------------------------
  const handleSwitchStudy = (study: IndependentStudyDisplay) => {
    setSelectedStudy(study)
  }

  // ---- return --------------------------------------------------------------
  return {
    studies,
    isLoadingStudies,
    selectedStudy,
    isCreating,
    isGeneratingCurriculum,
    error,
    hasPaidSkip,
    isSkipping,
    isCheckingSkipStatus,

    setSelectedStudy,
    setError,

    fetchStudies,
    handleCreateStudy,
    handleGenerateCurriculum,
    handleConfirmCurriculum,
    handleAllUnitsComplete,
    handleProjectUpdate,
    handleSubmitForAIReview,
    handleProceedToProfessional,
    handleRetryProject,
    handleProfessionalUpdate,
    handleStudyComplete,
    handleArchiveStudy,
    handleSwitchStudy,
    handleSkipPrereqs,
  }
}
