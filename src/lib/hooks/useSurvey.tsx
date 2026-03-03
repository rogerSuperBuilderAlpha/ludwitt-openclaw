'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

interface SurveyProgress {
  [surveyId: string]: {
    completed: boolean
    completedAt: string
  }
}

export function useSurveyProgress(userId: string | undefined) {
  const [surveyProgress, setSurveyProgress] = useState<SurveyProgress>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSurveyProgress = async () => {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const progressDoc = await getDoc(doc(db, 'surveyProgress', userId))
        if (progressDoc.exists()) {
          setSurveyProgress(progressDoc.data() as SurveyProgress)
        }
      } catch (error) {
        logger.error('UseSurvey', 'Failed to fetch survey progress', { error })
      } finally {
        setLoading(false)
      }
    }

    fetchSurveyProgress()
  }, [userId])

  const isSurveyCompleted = (surveyId: string): boolean => {
    return surveyProgress[surveyId]?.completed || false
  }

  const refreshProgress = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const progressDoc = await getDoc(doc(db, 'surveyProgress', userId))
      if (progressDoc.exists()) {
        setSurveyProgress(progressDoc.data() as SurveyProgress)
      }
    } catch (error) {
      logger.error('UseSurvey', 'Failed to refresh survey progress', { error })
    } finally {
      setLoading(false)
    }
  }

  return { surveyProgress, loading, isSurveyCompleted, refreshProgress }
}

export async function submitSurvey(
  surveyId: string,
  responses: { [questionId: string]: string | number }
): Promise<void> {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User not authenticated')
  }

  const token = await user.getIdToken()

  const response = await fetch('/api/submit-survey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      surveyId,
      responses,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to submit survey')
  }

  return response.json()
}
