'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

interface SubmitDeliverableParams {
  courseId: string
  deliverableId: string
  deployedUrl: string
  githubUrl: string
  loomUrl: string
  submissionNotes?: string
}

export function useSubmitDeliverable() {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitDeliverable = useCallback(
    async (params: SubmitDeliverableParams): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsSubmitting(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/submit-deliverable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || `Request failed with status ${response.status}`
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit deliverable'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsSubmitting(false)
      }
    },
    [user]
  )

  return { submitDeliverable, isSubmitting, error }
}
