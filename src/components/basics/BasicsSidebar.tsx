'use client'

import { SubjectProgressDisplay } from '@/lib/types/basics'
import { ChartLine } from '@phosphor-icons/react'
import { ProgressAnalytics } from './progress-analytics'
import { UnifiedModal } from './UnifiedModal'

interface ProgressModalProps {
  isOpen: boolean
  onClose: () => void
  isLoading: boolean
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  focusMode: boolean
  dailyXP?: number
  dailyGoal?: number
}

/**
 * ProgressModal - Displays comprehensive progress tracking for all 5 subjects
 */
export function ProgressModal({
  isOpen,
  onClose,
  isLoading,
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  focusMode,
  dailyXP = 0,
  dailyGoal = 50,
}: ProgressModalProps) {
  if (focusMode) return null

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Your Progress"
      subtitle="Track your learning journey across all 5 subjects"
      icon={<ChartLine size={20} weight="bold" />}
      size="xl"
    >
      {isLoading ? (
        <div className="animate-pulse b-bg-muted h-64 rounded-lg" />
      ) : (
        <ProgressAnalytics
          mathProgress={mathProgress}
          readingProgress={readingProgress}
          latinXP={latinXP}
          greekXP={greekXP}
          logicXP={logicXP}
          dailyXP={dailyXP}
          dailyGoal={dailyGoal}
        />
      )}
    </UnifiedModal>
  )
}
