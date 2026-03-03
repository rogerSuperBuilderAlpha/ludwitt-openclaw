/**
 * Custom hook for companion state management
 * Handles loading, saving, decay, level ups, and basic companion actions
 */

import { useState, useEffect, useCallback } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useCredits } from '@/lib/hooks/useCredits'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import {
  Subject,
  SubjectCompanion,
  BASE_COMPANIONS,
  SUBJECT_INFO,
  FEED_COST,
  LEVEL_THRESHOLDS,
} from '@/data/companions/attributes'
import { UseCompanionsReturn } from '../types'
import { logger } from '@/lib/logger'

interface UseCompanionsProps {
  userId?: string
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  dailyXP: number
  onXpChange?: (delta: number) => void
}

export function useCompanions({
  userId,
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  dailyXP,
  onXpChange,
}: UseCompanionsProps): UseCompanionsReturn {
  const fetchApi = useApiFetch()
  const { balance: creditsBalance, refresh: refreshCredits } = useCredits()
  const userCredits = creditsBalance?.balance || 0

  const [companions, setCompanions] = useState<
    Record<Subject, SubjectCompanion | null>
  >({
    math: null,
    reading: null,
    latin: null,
    greek: null,
    logic: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState<string | null>(null)

  // Load companions from Firestore (with localStorage fallback)
  useEffect(() => {
    if (!userId) return

    const loadCompanions = async () => {
      setIsLoading(true)
      try {
        const response = await fetchApi<{
          companions: Record<Subject, SubjectCompanion | null> | null
          source: string
        }>('/api/basics/companion', {
          method: 'GET',
        })

        if (response.companions) {
          setCompanions(response.companions)
          localStorage.setItem(
            `subject_companions_v2_${userId}`,
            JSON.stringify(response.companions)
          )
        } else {
          const saved = localStorage.getItem(`subject_companions_v2_${userId}`)
          if (saved) {
            const localCompanions = JSON.parse(saved)
            setCompanions(localCompanions)
            await fetchApi('/api/basics/companion', {
              method: 'POST',
              body: JSON.stringify({ companions: localCompanions }),
            })
          }
        }
      } catch (e) {
        logger.error('useCompanions', 'Failed to load companions from API', {
          error: e,
        })
        try {
          const saved = localStorage.getItem(`subject_companions_v2_${userId}`)
          if (saved) {
            setCompanions(JSON.parse(saved))
          }
        } catch (localError) {
          logger.error(
            'useCompanions',
            'Failed to load companions from localStorage',
            { error: localError }
          )
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadCompanions()
  }, [userId, fetchApi])

  // Save companions to both Firestore and localStorage
  const saveCompanions = useCallback(
    async (newCompanions: Record<Subject, SubjectCompanion | null>) => {
      if (!userId) return

      setCompanions(newCompanions)
      localStorage.setItem(
        `subject_companions_v2_${userId}`,
        JSON.stringify(newCompanions)
      )

      try {
        await fetchApi('/api/basics/companion', {
          method: 'POST',
          body: JSON.stringify({ companions: newCompanions }),
        })
      } catch (e) {
        logger.error(
          'useCompanions',
          'Failed to save companions to Firestore',
          { error: e }
        )
      }
    },
    [userId, fetchApi]
  )

  // Decay needs over time
  useEffect(() => {
    if (!userId || isLoading) return

    const decayNeeds = async () => {
      const now = Date.now()
      const oneHour = 60 * 60 * 1000

      let updated: Record<Subject, SubjectCompanion | null> | null = null

      setCompanions((prev) => {
        const newState = { ...prev }
        let changed = false

        for (const subject of Object.keys(newState) as Subject[]) {
          const companion = newState[subject]
          if (!companion) continue

          const hoursSinceLastCare = (now - companion.lastCaredAt) / oneHour
          if (hoursSinceLastCare < 0.1) continue

          changed = true
          newState[subject] = {
            ...companion,
            hunger: Math.max(0, companion.hunger - hoursSinceLastCare * 2),
            happiness: Math.max(
              0,
              companion.happiness - hoursSinceLastCare * 1.5
            ),
            energy: Math.max(0, companion.energy - hoursSinceLastCare * 1),
          }
        }

        if (changed) {
          updated = newState
          localStorage.setItem(
            `subject_companions_v2_${userId}`,
            JSON.stringify(newState)
          )
        }

        return changed ? newState : prev
      })

      if (updated) {
        try {
          await fetchApi('/api/basics/companion', {
            method: 'POST',
            body: JSON.stringify({ companions: updated }),
          })
        } catch (e) {
          logger.error('useCompanions', 'Failed to save decayed companions', {
            error: e,
          })
        }
      }
    }

    const interval = setInterval(decayNeeds, 60000)
    return () => clearInterval(interval)
  }, [userId, isLoading, fetchApi])

  // Check for level ups based on subject XP
  useEffect(() => {
    if (isLoading) return

    const xpBySubject: Record<Subject, number> = {
      math: mathProgress?.totalXP || 0,
      reading: readingProgress?.totalXP || 0,
      latin: latinXP,
      greek: greekXP,
      logic: logicXP,
    }

    let updated: Record<Subject, SubjectCompanion | null> | null = null

    setCompanions((prev) => {
      const newState = { ...prev }
      let changed = false

      for (const subject of Object.keys(newState) as Subject[]) {
        const companion = newState[subject]
        if (!companion) continue

        const subjectXP = xpBySubject[subject]

        let targetLevel = 1
        for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
          if (subjectXP >= LEVEL_THRESHOLDS[i]) {
            targetLevel = i + 1
          }
        }

        if (targetLevel > companion.level && !companion.pendingEvolution) {
          changed = true
          newState[subject] = {
            ...companion,
            pendingEvolution: true,
            xp: subjectXP,
            xpToNextLevel: LEVEL_THRESHOLDS[Math.min(targetLevel, 5)] || 2000,
          }
        }
      }

      if (changed && userId) {
        updated = newState
        localStorage.setItem(
          `subject_companions_v2_${userId}`,
          JSON.stringify(newState)
        )
      }

      return changed ? newState : prev
    })

    if (updated) {
      fetchApi('/api/basics/companion', {
        method: 'POST',
        body: JSON.stringify({ companions: updated }),
      }).catch((e) =>
        logger.error('useCompanions', 'Failed to save level up', { error: e })
      )
    }
  }, [
    mathProgress,
    readingProgress,
    latinXP,
    greekXP,
    logicXP,
    userId,
    isLoading,
    fetchApi,
  ])

  // Show notification
  const showNotif = useCallback((message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }, [])

  // Adopt a companion
  const adoptCompanion = useCallback(
    async (subject: Subject) => {
      if (!userId) {
        showNotif('❌ Please log in to adopt companions!')
        return
      }

      const base = BASE_COMPANIONS[subject]

      // Check if user already has XP in this subject to determine starting level
      const xpBySubject: Record<Subject, number> = {
        math: mathProgress?.totalXP || 0,
        reading: readingProgress?.totalXP || 0,
        latin: latinXP,
        greek: greekXP,
        logic: logicXP,
      }
      const subjectXP = xpBySubject[subject]

      // Calculate if they already qualify for an evolution based on existing XP
      const startingLevel = 0
      let pendingEvolution = false
      for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
        if (subjectXP >= LEVEL_THRESHOLDS[i]) {
          // They have enough XP for level i+1, but start at level 0 with pending evolution
          pendingEvolution = true
          break
        }
      }
      // Also check level 1 threshold (100 XP)
      if (subjectXP >= LEVEL_THRESHOLDS[1]) {
        pendingEvolution = true
      }

      const newCompanion: SubjectCompanion = {
        subject,
        name: base.name,
        currentEmoji: base.emoji,
        description: base.description,
        personality: 'Friendly and eager to learn',
        specialAbility: `Helps with ${SUBJECT_INFO[subject].name}`,
        catchphrase: `"Let's learn ${SUBJECT_INFO[subject].name} together!"`,
        evolutionHistory: [],
        level: startingLevel,
        xp: subjectXP,
        xpToNextLevel: LEVEL_THRESHOLDS[1],
        hunger: 100,
        happiness: 100,
        energy: 100,
        totalFed: 0,
        totalPlayed: 0,
        lastCaredAt: Date.now(),
        adoptedAt: Date.now(),
        freeHints: 0,
        freeExplanations: 0,
        hasStreakShield: false,
        hasSkipProtection: false,
        pendingEvolution, // Only true if they already have enough XP for level 1
      }

      setCompanions((prev) => {
        const updated = { ...prev, [subject]: newCompanion }
        localStorage.setItem(
          `subject_companions_v2_${userId}`,
          JSON.stringify(updated)
        )
        fetchApi('/api/basics/companion', {
          method: 'POST',
          body: JSON.stringify({ companions: updated }),
        }).catch((e) =>
          logger.error('useCompanions', 'Failed to save companion', {
            error: e,
          })
        )
        return updated
      })

      if (pendingEvolution) {
        showNotif(`🎉 Welcome ${base.name}! You have enough XP to evolve them!`)
      } else {
        showNotif(
          `🎉 Welcome ${base.name}! Earn ${LEVEL_THRESHOLDS[1]} ${SUBJECT_INFO[subject].name} XP to evolve!`
        )
      }
    },
    [
      userId,
      mathProgress,
      readingProgress,
      latinXP,
      greekXP,
      logicXP,
      fetchApi,
      showNotif,
    ]
  )

  // Feed companion
  const feedCompanion = useCallback(
    async (subject: Subject) => {
      if (dailyXP < FEED_COST) {
        showNotif(`❌ Need ${FEED_COST} XP to feed!`)
        return
      }

      const companion = companions[subject]
      if (!companion) return

      onXpChange?.(-FEED_COST)

      await saveCompanions({
        ...companions,
        [subject]: {
          ...companion,
          hunger: Math.min(100, companion.hunger + 30),
          happiness: Math.min(100, companion.happiness + 10),
          totalFed: companion.totalFed + 1,
          lastCaredAt: Date.now(),
        },
      })

      showNotif(`🍖 Fed ${companion.name}! -${FEED_COST} XP`)
    },
    [dailyXP, companions, onXpChange, saveCompanions, showNotif]
  )

  return {
    companions,
    isLoading,
    notification,
    userCredits,
    adoptCompanion,
    feedCompanion,
    saveCompanions,
    showNotif,
    refreshCredits,
  }
}
