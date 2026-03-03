'use client'

/**
 * Skill Progress Header Component
 *
 * Shows the current skill being practiced and progress toward mastery.
 * Displays primary and secondary skills with mastery levels.
 */

import { Target, TrendUp, CheckCircle } from '@phosphor-icons/react'
import { ReadingExerciseTypeV2 } from '@/lib/types/reading-v2'

interface SkillProgressHeaderProps {
  primarySkill: string
  secondarySkills?: string[]
  skillMastery: Record<string, number>
  exerciseType: ReadingExerciseTypeV2
}

export function SkillProgressHeader({
  primarySkill,
  secondarySkills = [],
  skillMastery,
  exerciseType,
}: SkillProgressHeaderProps) {
  // Get skill display name
  const getSkillName = (skillId: string): string => {
    return skillId
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Get mastery level label
  const getMasteryLabel = (mastery: number): string => {
    if (mastery >= 0.9) return 'Mastered'
    if (mastery >= 0.7) return 'Proficient'
    if (mastery >= 0.5) return 'Developing'
    if (mastery >= 0.25) return 'Emerging'
    return 'Beginning'
  }

  // Get mastery color
  const getMasteryColor = (mastery: number): string => {
    if (mastery >= 0.9) return 'var(--b-reading)'
    if (mastery >= 0.7) return 'var(--b-math)'
    if (mastery >= 0.5) return 'var(--b-writing)'
    if (mastery >= 0.25) return '#f59e0b'
    return 'var(--b-text-muted)'
  }

  // Get skill category from exercise type
  const getSkillCategory = (): { label: string; color: string } => {
    if (
      [
        'phonological-awareness',
        'phonics-decoding',
        'fluency-practice',
        'word-study',
      ].includes(exerciseType)
    ) {
      return { label: 'Word Recognition', color: 'var(--b-math)' }
    }
    if (
      [
        'vocabulary-context',
        'vocabulary-direct',
        'morphology',
        'word-relationships',
      ].includes(exerciseType)
    ) {
      return { label: 'Vocabulary', color: 'var(--b-writing)' }
    }
    return { label: 'Comprehension', color: 'var(--b-reading)' }
  }

  const category = getSkillCategory()
  const primaryMastery = skillMastery[primarySkill] ?? 0
  const primaryColor = getMasteryColor(primaryMastery)

  return (
    <div className="bg-white rounded-lg border b-border p-4">
      <div className="flex items-center justify-between">
        {/* Left: Skill Info */}
        <div className="flex items-center gap-4">
          {/* Category Badge */}
          <div
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.label}
          </div>

          {/* Primary Skill */}
          <div className="flex items-center gap-2">
            <Target size={18} style={{ color: primaryColor }} />
            <div>
              <span className="text-sm font-medium b-text-primary">
                {getSkillName(primarySkill)}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-20 h-1.5 bg-gray-200 rounded-full">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${primaryMastery * 100}%`,
                      backgroundColor: primaryColor,
                    }}
                  />
                </div>
                <span className="text-xs" style={{ color: primaryColor }}>
                  {getMasteryLabel(primaryMastery)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Secondary Skills */}
        {secondarySkills.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs b-text-muted">Also practicing:</span>
            <div className="flex gap-2">
              {secondarySkills.slice(0, 3).map((skillId) => {
                const mastery = skillMastery[skillId] ?? 0
                const color = getMasteryColor(mastery)
                return (
                  <div
                    key={skillId}
                    className="px-2 py-0.5 rounded text-xs flex items-center gap-1"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                    }}
                    title={`${getSkillName(skillId)}: ${Math.round(mastery * 100)}%`}
                  >
                    {mastery >= 0.9 ? (
                      <CheckCircle size={12} weight="fill" />
                    ) : (
                      <TrendUp size={12} />
                    )}
                    <span>{getSkillName(skillId)}</span>
                  </div>
                )
              })}
              {secondarySkills.length > 3 && (
                <span className="text-xs b-text-muted">
                  +{secondarySkills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
