'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ReadingExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { MathProblemV2 } from '@/lib/types/math-v2'
import { MathSectionV2 } from './MathSectionV2'
import { ReadingSection } from './ReadingSection'
import { CollapsibleSectionBanner } from './CollapsibleSectionBanner'
import { colors, shadows, radius } from '@/lib/design/tokens'
import {
  getRandomMathProblemV2,
  getSimilarMathProblemV2,
} from '@/data/basics/math-v2'

interface CoreTopicsSectionProps {
  isLoading: boolean
  readingExercise: ReadingExercise | null
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  dailyXP: number
  dailyGoal: number
  /** Problems the user has already seen (from Firebase) */
  mathProblemsSeen?: string[]
  /** Callback when V2 math problem changes (for focus mode sync) */
  onMathProblemV2Change?: (problem: MathProblemV2 | null) => void
  onMathComplete: (
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  onReadingComplete: (
    nextExercise: ReadingExercise | null,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  onSkip: () => void
  onMathXpSpent: (amount: number) => void
  onBonusEarned: (points: number) => void
  onCreditsUsed: () => void
  engagement: any
  // Focus Mode
  onMathFocusMode?: () => void
  onReadingFocusMode?: () => void
  mathFocusModeAvailable?: boolean
  readingFocusModeAvailable?: boolean
  mathFocusModeNextAvailable?: Date | null
  readingFocusModeNextAvailable?: Date | null
}

export function CoreTopicsSection({
  isLoading,
  readingExercise,
  mathProgress,
  readingProgress,
  dailyXP,
  dailyGoal,
  mathProblemsSeen = [],
  onMathProblemV2Change,
  onMathComplete,
  onReadingComplete,
  onSkip,
  onMathXpSpent,
  onBonusEarned,
  onCreditsUsed,
  engagement,
  onMathFocusMode,
  onReadingFocusMode,
  mathFocusModeAvailable = true,
  readingFocusModeAvailable = true,
  mathFocusModeNextAvailable,
  readingFocusModeNextAvailable,
}: CoreTopicsSectionProps) {
  // V2-only math state
  const [mathProblem, setMathProblemInternal] = useState<MathProblemV2 | null>(
    null
  )

  // Wrapper to update both internal state and notify parent
  const setMathProblem = useCallback(
    (problem: MathProblemV2 | null) => {
      setMathProblemInternal(problem)
      onMathProblemV2Change?.(problem)
    },
    [onMathProblemV2Change]
  )
  // Track problems completed in THIS session (added to Firebase's problemsSeen)
  const [sessionCompletedIds, setSessionCompletedIds] = useState<string[]>([])

  // Combine Firebase's seen problems with session-completed ones
  const allSeenProblemIds = useMemo(
    () => [...mathProblemsSeen, ...sessionCompletedIds],
    [mathProblemsSeen, sessionCompletedIds]
  )

  // Load initial V2 problem based on user's difficulty
  useEffect(() => {
    if (!mathProgress || mathProblem) return

    const userGrade = Math.floor(mathProgress.currentDifficulty)
    const userDifficulty = mathProgress.currentDifficulty

    // Get a random V2 problem matching the user's level, excluding already-seen problems
    let problem = getRandomMathProblemV2({
      gradeLevel: userGrade,
      difficulty: userDifficulty,
      excludeIds: allSeenProblemIds,
    })

    // Fallback: any problem at difficulty level
    if (!problem) {
      problem = getRandomMathProblemV2({
        difficulty: userDifficulty,
        excludeIds: allSeenProblemIds,
      })
    }

    // Final fallback: any problem
    if (!problem) {
      problem = getRandomMathProblemV2({
        excludeIds: allSeenProblemIds,
      })
    }

    if (problem) {
      setMathProblem(problem)
    }
  }, [mathProgress, mathProblem, allSeenProblemIds, setMathProblem])

  // Load next V2 problem
  const loadNextProblem = useCallback(() => {
    if (!mathProgress) return

    const userDifficulty = mathProgress.currentDifficulty

    // Try to get a similar problem first
    let nextProblem: MathProblemV2 | null = null
    if (mathProblem) {
      nextProblem = getSimilarMathProblemV2(mathProblem, allSeenProblemIds)
    }

    // Fallback to random by difficulty
    if (!nextProblem) {
      nextProblem = getRandomMathProblemV2({
        difficulty: userDifficulty,
        excludeIds: allSeenProblemIds,
      })
    }

    // Final fallback: any problem
    if (!nextProblem) {
      nextProblem = getRandomMathProblemV2({
        excludeIds: allSeenProblemIds,
      })
    }

    if (nextProblem) {
      setMathProblem(nextProblem)
      // Add to session-completed IDs (will be persisted to Firebase when problem is answered)
      setSessionCompletedIds((prev) => [...prev, nextProblem!.id])
    }
  }, [mathProgress, mathProblem, allSeenProblemIds, setMathProblem])

  const scrollToSection = useCallback((section: 'math' | 'reading') => {
    const sectionElement = document.querySelector(`[data-section="${section}"]`)
    if (!sectionElement) return
    window.requestAnimationFrame(() => {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  // Handler for V2 problem completion
  const handleMathComplete = useCallback(
    (
      _nextProblem: MathProblemV2,
      updatedProgress: SubjectProgressDisplay,
      xpEarned?: number
    ) => {
      // Mark current problem as completed in session
      if (mathProblem) {
        setSessionCompletedIds((prev) => [...prev, mathProblem.id])
      }

      // Load next problem
      loadNextProblem()

      // Notify parent of completion (this triggers the API call that persists to Firebase)
      onMathComplete(updatedProgress, xpEarned)
      scrollToSection('math')
    },
    [mathProblem, loadNextProblem, onMathComplete, scrollToSection]
  )

  const handleReadingComplete = useCallback(
    (
      nextExercise: ReadingExercise | null,
      updatedProgress: SubjectProgressDisplay,
      xpEarned?: number,
      userAnswer?: string
    ) => {
      onReadingComplete(nextExercise, updatedProgress, xpEarned, userAnswer)
      scrollToSection('reading')
    },
    [onReadingComplete, scrollToSection]
  )

  // Skip handler
  const handleSkip = useCallback(() => {
    loadNextProblem()
    onSkip()
  }, [loadNextProblem, onSkip])

  const combinedProgress =
    mathProgress && readingProgress
      ? (mathProgress.progressToNextLevel +
          readingProgress.progressToNextLevel) /
        2
      : mathProgress?.progressToNextLevel ||
        readingProgress?.progressToNextLevel ||
        0

  const subjects = [
    {
      name: 'Math',
      progress: mathProgress?.progressToNextLevel || 0,
      color: 'b-bg-math',
      grade: Math.floor(mathProgress?.currentDifficulty || 1),
      totalCompleted: mathProgress?.totalCompleted,
      currentStreak: mathProgress?.currentStreak,
      accuracy: mathProgress ? mathProgress.accuracyRate * 100 : undefined,
    },
    {
      name: 'Reading',
      progress: readingProgress?.progressToNextLevel || 0,
      color: 'b-bg-reading',
      grade: Math.floor(readingProgress?.currentDifficulty || 1),
      totalCompleted: readingProgress?.totalCompleted,
      currentStreak: readingProgress?.currentStreak,
      accuracy: readingProgress
        ? readingProgress.accuracyRate * 100
        : undefined,
    },
  ]

  return (
    <CollapsibleSectionBanner
      title="Core Topics"
      icon="📚"
      progress={combinedProgress}
      subjects={subjects}
      accentColor="math"
      defaultExpanded={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Math Section - V2 Only */}
        <div
          data-section="math"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.subject.math.border}`,
            borderRadius: radius.lg,
            boxShadow: shadows.card,
            padding: '16px',
          }}
        >
          {isLoading || !mathProblem ? (
            <div
              className="animate-pulse"
              role="status"
              aria-label="Loading math problem"
            >
              <span className="sr-only">Loading math problem...</span>
              <div
                className="h-6 w-1/3 b-bg-muted rounded mb-3"
                aria-hidden="true"
              />
              <div
                className="h-40 w-full b-bg-muted rounded"
                aria-hidden="true"
              />
            </div>
          ) : (
            <MathSectionV2
              problem={mathProblem}
              progress={mathProgress}
              onProblemComplete={handleMathComplete}
              onSkip={handleSkip}
              engagement={engagement}
              onXpSpent={onMathXpSpent}
              onCreditsUsed={onCreditsUsed}
              dailyXP={dailyXP}
              dailyGoal={dailyGoal}
              onFocusModeClick={onMathFocusMode}
              focusModeAvailable={mathFocusModeAvailable}
              focusModeNextAvailable={mathFocusModeNextAvailable}
            />
          )}
        </div>

        {/* Reading Section */}
        <div
          data-section="reading"
          style={{
            background: colors.background.card,
            border: `1px solid ${colors.subject.reading.border}`,
            borderRadius: radius.lg,
            boxShadow: shadows.card,
            padding: '16px',
          }}
        >
          {isLoading ? (
            <div
              className="animate-pulse"
              role="status"
              aria-label="Loading reading exercise"
            >
              <span className="sr-only">Loading reading exercise...</span>
              <div
                className="h-6 w-1/3 b-bg-muted rounded mb-3"
                aria-hidden="true"
              />
              <div
                className="h-40 w-full b-bg-muted rounded"
                aria-hidden="true"
              />
            </div>
          ) : (
            <ReadingSection
              exercise={readingExercise}
              progress={readingProgress}
              onExerciseComplete={handleReadingComplete}
              onSkip={onSkip}
              engagement={engagement}
              onBonusEarned={onBonusEarned}
              dailyXP={dailyXP}
              dailyGoal={dailyGoal}
              onFocusModeClick={onReadingFocusMode}
              focusModeAvailable={readingFocusModeAvailable}
              focusModeNextAvailable={readingFocusModeNextAvailable}
            />
          )}
        </div>
      </div>
    </CollapsibleSectionBanner>
  )
}
