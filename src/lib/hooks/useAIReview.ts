'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'

export function useAIReview() {
  const { user } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)

  async function triggerAIReview(courseId: string, deliverableId: string) {
    if (!user) return null
    setIsGenerating(true)
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/university/ai-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId, deliverableId }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to generate AI review')
      return data.data.review
    } catch (err) {
      logger.error('Useaireview', '[useAIReview]', { error: err })
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  return { triggerAIReview, isGenerating }
}
