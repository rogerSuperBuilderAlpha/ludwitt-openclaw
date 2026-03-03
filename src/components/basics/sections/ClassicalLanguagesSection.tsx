'use client'

import { useCallback, useState } from 'react'
import { LatinSection } from '@/components/basics/LatinSection'
import { GreekSection } from '@/components/basics/GreekSection'
import { CollapsibleSectionBanner } from '@/components/basics/CollapsibleSectionBanner'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { colors, shadows, radius } from '@/lib/design/tokens'

interface ClassicalLanguagesSectionProps {
  classicalXp: number
  onXpChange: (subject: 'latin' | 'greek', delta: number) => void
  dailyXP?: number
  dailyGoal?: number
}

export function ClassicalLanguagesSection({
  classicalXp,
  onXpChange,
  dailyXP = 0,
  dailyGoal = 1000,
}: ClassicalLanguagesSectionProps) {
  // Track full progress objects from child sections
  const [latinProgressData, setLatinProgressData] =
    useState<SubjectProgressDisplay | null>(null)
  const [greekProgressData, setGreekProgressData] =
    useState<SubjectProgressDisplay | null>(null)

  const handleLatinXpEarned = useCallback(
    (xp: number) => {
      onXpChange('latin', xp)
    },
    [onXpChange]
  )

  const handleGreekXpEarned = useCallback(
    (xp: number) => {
      onXpChange('greek', xp)
    },
    [onXpChange]
  )

  const handleLatinXpChange = useCallback(
    (delta: number) => {
      onXpChange('latin', delta)
    },
    [onXpChange]
  )

  const handleGreekXpChange = useCallback(
    (delta: number) => {
      onXpChange('greek', delta)
    },
    [onXpChange]
  )

  const handleLatinProgressChange = useCallback(
    (progress: SubjectProgressDisplay) => {
      setLatinProgressData(progress)
    },
    []
  )

  const handleGreekProgressChange = useCallback(
    (progress: SubjectProgressDisplay) => {
      setGreekProgressData(progress)
    },
    []
  )

  // Extract progress percentages for banner
  const latinProgress = latinProgressData?.progressToNextLevel || 0
  const greekProgress = greekProgressData?.progressToNextLevel || 0
  const combinedProgress = (latinProgress + greekProgress) / 2

  return (
    <div className="mt-3">
      <CollapsibleSectionBanner
        title="Classical Education"
        icon="🏛️"
        progress={combinedProgress}
        subjects={[
          {
            name: 'Latin',
            progress: latinProgress,
            color: 'b-bg-writing',
            grade: latinProgressData
              ? Math.floor(latinProgressData.currentDifficulty)
              : undefined,
            totalCompleted: latinProgressData?.totalCompleted,
            currentStreak: latinProgressData?.currentStreak,
            accuracy: latinProgressData
              ? latinProgressData.accuracyRate * 100
              : undefined,
          },
          {
            name: 'Greek',
            progress: greekProgress,
            color: 'b-bg-logic',
            grade: greekProgressData
              ? Math.floor(greekProgressData.currentDifficulty)
              : undefined,
            totalCompleted: greekProgressData?.totalCompleted,
            currentStreak: greekProgressData?.currentStreak,
            accuracy: greekProgressData
              ? greekProgressData.accuracyRate * 100
              : undefined,
          },
        ]}
        accentColor="writing"
        defaultExpanded={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Latin Section */}
          <div
            data-section="latin"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.subject.latin.border}`,
              borderRadius: radius.lg,
              boxShadow: shadows.card,
              padding: '16px',
            }}
          >
            <LatinSection
              onXpEarned={handleLatinXpEarned}
              userXp={classicalXp}
              onXpChange={handleLatinXpChange}
              dailyXP={dailyXP}
              dailyGoal={dailyGoal}
              onProgressChange={handleLatinProgressChange}
            />
          </div>

          {/* Greek Section */}
          <div
            data-section="greek"
            style={{
              background: colors.background.card,
              border: `1px solid ${colors.subject.greek.border}`,
              borderRadius: radius.lg,
              boxShadow: shadows.card,
              padding: '16px',
            }}
          >
            <GreekSection
              onXpEarned={handleGreekXpEarned}
              userXp={classicalXp}
              onXpChange={handleGreekXpChange}
              dailyXP={dailyXP}
              dailyGoal={dailyGoal}
              onProgressChange={handleGreekProgressChange}
            />
          </div>
        </div>
      </CollapsibleSectionBanner>
    </div>
  )
}
