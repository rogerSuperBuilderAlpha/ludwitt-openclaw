'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { TranslationExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { TranslationSection } from './TranslationSection'
import { IntroVideoGate } from './IntroVideoGate'
import { logger } from '@/lib/logger'

interface GreekSectionProps {
  onXpEarned?: (xp: number) => void
  userXp: number
  onXpChange: (delta: number) => void
  dailyXP?: number
  dailyGoal?: number
  onProgressChange?: (progress: SubjectProgressDisplay) => void
}

export function GreekSection({
  onXpEarned,
  userXp,
  onXpChange,
  dailyXP = 0,
  dailyGoal = 1000,
  onProgressChange,
}: GreekSectionProps) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()

  const [exercise, setExercise] = useState<TranslationExercise | null>(null)
  const [progress, setProgress] = useState<SubjectProgressDisplay | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Intro video gate state
  const [hasWatchedIntro, setHasWatchedIntro] = useState<boolean | null>(null)
  const [isCheckingIntro, setIsCheckingIntro] = useState(true)

  // Check if user has watched the intro video
  useEffect(() => {
    if (!user) return

    const checkIntroStatus = async () => {
      try {
        const data = await fetchApi<{ watched: boolean }>(
          '/api/basics/intro-video/complete?language=greek'
        )
        setHasWatchedIntro(data.watched)
      } catch (err) {
        // If check fails, assume not watched to be safe
        logger.error('GreekSection', 'Failed to check intro video status', {
          error: err,
        })
        setHasWatchedIntro(false)
      } finally {
        setIsCheckingIntro(false)
      }
    }

    checkIntroStatus()
  }, [user, fetchApi])

  // Report progress changes to parent
  useEffect(() => {
    if (progress && onProgressChange) {
      onProgressChange(progress)
    }
  }, [progress, onProgressChange])

  // Load initial exercise - only after intro video is watched
  const loadExercise = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchApi<{
        exercise: TranslationExercise
        progress: SubjectProgressDisplay
      }>('/api/basics/translation/exercise?language=greek')
      setExercise(data.exercise)
      setProgress(data.progress)
    } catch (err) {
      setError('Failed to load Greek exercise')
      logger.error('GreekSection', 'Failed to load Greek exercise', {
        error: err,
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, fetchApi])

  useEffect(() => {
    if (hasWatchedIntro === true) {
      loadExercise()
    }
  }, [hasWatchedIntro, loadExercise])

  // Handle intro video completion
  const handleIntroComplete = () => {
    setHasWatchedIntro(true)
  }

  const handleExerciseComplete = (
    nextExercise: TranslationExercise,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number
  ) => {
    setExercise(nextExercise)
    setProgress(updatedProgress)
    if (xpEarned && onXpEarned) {
      onXpEarned(xpEarned)
    }
  }

  const handleSkip = async () => {
    if (!user) return

    try {
      // useApiFetch returns data directly (not wrapped in { success, data })
      const data = await fetchApi<{
        nextExercise: TranslationExercise
        progressUpdate: SubjectProgressDisplay
      }>('/api/basics/translation/skip', {
        method: 'POST',
        body: JSON.stringify({
          language: 'greek',
          exerciseId: exercise?.id,
        }),
      })

      setExercise(data.nextExercise)
      setProgress(data.progressUpdate)
      onXpChange(-5) // Skip costs 5 XP
    } catch (err) {
      logger.error('GreekSection', 'Failed to skip', { error: err })
    }
  }

  // Show loading state while checking intro video status
  if (isCheckingIntro) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 b-bg-math-light rounded" />
          <div className="h-6 bg-b-border rounded w-20" />
        </div>
        <div className="h-64 b-bg-math-light rounded-lg" />
      </div>
    )
  }

  // Show intro video gate if user hasn't watched it yet
  if (hasWatchedIntro === false) {
    return <IntroVideoGate language="greek" onComplete={handleIntroComplete} />
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 b-bg-math-light rounded" />
          <div className="h-6 bg-b-border rounded w-20" />
        </div>
        <div className="h-64 b-bg-math-light rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="b-bg-latin-light border b-border-latin rounded-lg p-4 text-center">
        <p className="b-text-latin">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 b-bg-latin-light b-text-latin rounded hover:opacity-90"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <TranslationSection
      language="greek"
      exercise={exercise}
      progress={progress}
      onExerciseComplete={handleExerciseComplete}
      onSkip={handleSkip}
      userXp={userXp}
      onXpChange={onXpChange}
      dailyXP={dailyXP}
      dailyGoal={dailyGoal}
    />
  )
}
