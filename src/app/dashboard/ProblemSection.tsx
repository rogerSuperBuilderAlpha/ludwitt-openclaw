'use client'

import { CoreTopicsSection } from '@/components/basics/CoreTopicsSection'
import {
  useDashboardCore,
  useDashboardXP,
  useDashboardUI,
} from './DashboardContext'
import { DashboardHandlers } from './types'
import { useEngagementTracking } from '@/lib/hooks/useEngagementTracking'
import { useCredits } from '@/lib/hooks/useCredits'

interface ProblemSectionProps {
  handlers: DashboardHandlers
}

export default function ProblemSection({ handlers }: ProblemSectionProps) {
  const {
    isLoading,
    readingExercise,
    mathProgress,
    readingProgress,
    mathProblemsSeen,
    setMathProblemV2,
  } = useDashboardCore()

  const { dailyXP, dailyGoal } = useDashboardXP()
  const { intensiveFocusRef } = useDashboardUI()

  const intensiveFocus = intensiveFocusRef.current

  const {
    handleMathCompleteV2,
    handleReadingComplete,
    handleXpSpent,
    loadProblems,
    addXP,
  } = handlers
  const engagement = useEngagementTracking()
  const { refresh: refreshCredits } = useCredits()

  return (
    <CoreTopicsSection
      isLoading={isLoading}
      readingExercise={readingExercise}
      mathProgress={mathProgress}
      readingProgress={readingProgress}
      mathProblemsSeen={mathProblemsSeen}
      onMathProblemV2Change={setMathProblemV2}
      dailyXP={dailyXP}
      dailyGoal={dailyGoal}
      onMathComplete={handleMathCompleteV2}
      onReadingComplete={handleReadingComplete}
      onSkip={loadProblems}
      onMathXpSpent={(amount) => handleXpSpent('math', amount)}
      onBonusEarned={(points) => addXP(points, 'bonus')}
      onCreditsUsed={refreshCredits}
      engagement={engagement}
      onMathFocusMode={
        intensiveFocus
          ? () => intensiveFocus.requestFocusMode('math')
          : undefined
      }
      onReadingFocusMode={
        intensiveFocus
          ? () => intensiveFocus.requestFocusMode('reading')
          : undefined
      }
      mathFocusModeAvailable={intensiveFocus?.canUseFocusMode('math') ?? false}
      readingFocusModeAvailable={
        intensiveFocus?.canUseFocusMode('reading') ?? false
      }
      mathFocusModeNextAvailable={
        intensiveFocus?.getNextAvailableTime('math') ?? null
      }
      readingFocusModeNextAvailable={
        intensiveFocus?.getNextAvailableTime('reading') ?? null
      }
    />
  )
}
