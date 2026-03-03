'use client'

/**
 * Reading Section Component
 *
 * Routes to ReadingSectionV2 (Science of Reading-based system).
 * Handles V1→V2 exercise conversion for callers still passing V1 types.
 */

import { useMemo } from 'react'
import { ReadingExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
import { EngagementState } from '@/lib/hooks/useEngagementTracking'

import { ReadingSectionV2 } from './reading-v2/ReadingSectionV2'

function mapExerciseType(v1Type: string): ReadingExerciseV2['type'] {
  const typeMap: Record<string, ReadingExerciseV2['type']> = {
    comprehension: 'comprehension-inferential',
    vocabulary: 'vocabulary-context',
    grammar: 'text-structure',
    'critical-analysis': 'comprehension-critical',
  }
  return typeMap[v1Type] || 'comprehension-literal'
}

function getDepthOfKnowledge(skill?: string): number {
  if (!skill) return 2
  if (skill.includes('literal') || skill.includes('main-idea')) return 1
  if (skill.includes('inference') || skill.includes('vocabulary')) return 2
  if (skill.includes('analysis') || skill.includes('theme')) return 3
  if (skill.includes('critical') || skill.includes('evaluation')) return 4
  return 2
}

interface ReadingSectionProps {
  exercise: ReadingExercise | null
  progress: SubjectProgressDisplay | null
  onExerciseComplete: (
    nextExercise: ReadingExercise,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number
  ) => void
  onSkip: () => void
  engagement: EngagementState
  onBonusEarned?: (points: number) => void
  dailyXP?: number
  dailyGoal?: number
  onFocusModeClick?: () => void
  focusModeAvailable?: boolean
  focusModeNextAvailable?: Date | null
  skillMastery?: Record<string, number>
}

export function ReadingSection({
  exercise,
  progress,
  onExerciseComplete,
  onSkip,
  engagement,
  onBonusEarned,
  dailyXP = 0,
  dailyGoal = 1000,
  onFocusModeClick,
  focusModeAvailable = true,
  focusModeNextAvailable,
  skillMastery = {},
}: ReadingSectionProps) {
  const exerciseV2 = useMemo<ReadingExerciseV2 | null>(() => {
    if (!exercise) return null
    return {
      ...exercise,
      type: mapExerciseType(exercise.type),
      primarySkill: exercise.skillIds?.[0] || 'literal-comprehension',
      secondarySkills: exercise.skillIds?.slice(1),
      readingTimeEstimate: exercise.timeEstimate,
      questions: exercise.questions.map((q) => ({
        ...q,
        depthOfKnowledge: getDepthOfKnowledge(q.skill) as 1 | 2 | 3 | 4,
      })),
    }
  }, [exercise])

  return (
    <ReadingSectionV2
      exercise={exerciseV2}
      progress={progress}
      skillMastery={skillMastery}
      onExerciseComplete={
        onExerciseComplete as unknown as (
          nextExercise: ReadingExerciseV2,
          updatedProgress: SubjectProgressDisplay,
          xpEarned?: number
        ) => void
      }
      onSkip={onSkip}
      engagement={engagement}
      onBonusEarned={onBonusEarned}
      dailyXP={dailyXP}
      dailyGoal={dailyGoal}
      onFocusModeClick={onFocusModeClick}
      focusModeAvailable={focusModeAvailable}
      focusModeNextAvailable={focusModeNextAvailable}
    />
  )
}
