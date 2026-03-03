'use client'

import { useState, useEffect, useCallback } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

const LOCAL_STORAGE_KEY = 'alc-github-setup-progress'

interface DualStorageProgressState {
  checkedSteps: Record<string, boolean>
  githubUsername: string
  githubEmail: string
  loading: boolean
}

interface UseDualStorageProgressReturn extends DualStorageProgressState {
  setCheckedSteps: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  setGithubUsername: React.Dispatch<React.SetStateAction<string>>
  setGithubEmail: React.Dispatch<React.SetStateAction<string>>
  clearProgress: () => Promise<void>
}

export function useDualStorageProgress(
  userId?: string
): UseDualStorageProgressReturn {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({})
  const [githubUsername, setGithubUsername] = useState('')
  const [githubEmail, setGithubEmail] = useState('')
  const [loading, setLoading] = useState(true)

  // Load progress from Firestore (authenticated) or localStorage (anonymous)
  useEffect(() => {
    const loadProgress = async () => {
      try {
        if (userId) {
          // Authenticated: load from Firestore
          const progressDoc = await getDoc(
            doc(db, 'githubSetupProgress', userId)
          )
          if (progressDoc.exists()) {
            const data = progressDoc.data()
            const loadedSteps = data.checkedSteps || {}
            setCheckedSteps(loadedSteps)
            if (data.githubUsername) setGithubUsername(data.githubUsername)
            if (data.githubEmail) setGithubEmail(data.githubEmail)
          }
        } else {
          // Anonymous: load from localStorage
          try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
            if (stored) {
              const data = JSON.parse(stored)
              setCheckedSteps(data.checkedSteps || {})
              if (data.githubUsername) setGithubUsername(data.githubUsername)
              if (data.githubEmail) setGithubEmail(data.githubEmail)
            }
          } catch {
            // Ignore localStorage errors
          }
        }
      } catch (error) {
        logger.error(
          'useDualStorageProgress',
          'Failed to load GitHub setup progress',
          { error }
        )
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [userId])

  // Save progress to Firestore (authenticated) or localStorage (anonymous)
  useEffect(() => {
    const saveProgress = async () => {
      if (loading || Object.keys(checkedSteps).length === 0) return

      if (userId) {
        // Authenticated: save to Firestore
        try {
          await setDoc(
            doc(db, 'githubSetupProgress', userId),
            {
              checkedSteps,
              githubUsername,
              githubEmail,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          )
        } catch (error) {
          logger.error(
            'useDualStorageProgress',
            'Failed to save GitHub setup progress',
            { error }
          )
        }
      } else {
        // Anonymous: save to localStorage
        try {
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
              checkedSteps,
              githubUsername,
              githubEmail,
            })
          )
        } catch {
          // Ignore localStorage errors
        }
      }
    }

    saveProgress()
  }, [checkedSteps, githubUsername, githubEmail, userId, loading])

  // Clear progress
  const clearProgress = useCallback(async () => {
    try {
      if (userId) {
        await setDoc(
          doc(db, 'githubSetupProgress', userId),
          {
            checkedSteps: {},
            githubUsername: '',
            githubEmail: '',
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        )
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
      }
      setCheckedSteps({})
      setGithubUsername('')
      setGithubEmail('')
    } catch (error) {
      logger.error(
        'useDualStorageProgress',
        'Failed to clear GitHub setup progress',
        { error }
      )
    }
  }, [userId])

  return {
    checkedSteps,
    githubUsername,
    githubEmail,
    loading,
    setCheckedSteps,
    setGithubUsername,
    setGithubEmail,
    clearProgress,
  }
}
