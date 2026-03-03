/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * Math Skill Node Component
 *
 * Displays a single skill in the math skill tree with mastery indicator.
 */

import { CheckCircle, Lock, TrendUp, Star } from '@phosphor-icons/react'
import {
  MathSkillNode as MathSkillNodeType,
  getMathCategoryInfo,
} from '@/data/basics/math-v2/skill-tree'

interface MathSkillNodeProps {
  skill: MathSkillNodeType
  mastery: number
  unlocked: boolean
  isCurrent?: boolean
  onClick?: () => void
}

export function MathSkillNode({
  skill,
  mastery,
  unlocked,
  isCurrent = false,
  onClick,
}: MathSkillNodeProps) {
  // Determine mastery level
  const getMasteryLevel = (): {
    label: string
    color: string
    bgColor: string
  } => {
    if (mastery >= skill.masteryThreshold) {
      return {
        label: 'Mastered',
        color: 'var(--b-success, #16a34a)',
        bgColor: 'var(--b-success-light, #dcfce7)',
      }
    }
    if (mastery >= 0.7) {
      return {
        label: 'Proficient',
        color: 'var(--b-math)',
        bgColor: 'var(--b-math-light)',
      }
    }
    if (mastery >= 0.5) {
      return { label: 'Developing', color: '#f59e0b', bgColor: '#fef3c7' }
    }
    if (mastery > 0) {
      return { label: 'Emerging', color: '#6b7280', bgColor: '#f3f4f6' }
    }
    return { label: 'Not Started', color: '#9ca3af', bgColor: '#f9fafb' }
  }

  const masteryLevel = getMasteryLevel()
  const isMastered = mastery >= skill.masteryThreshold
  const categoryInfo = getMathCategoryInfo(skill.category)

  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-lg border-2 transition-all cursor-pointer
        ${isCurrent ? 'ring-2 ring-offset-2' : ''}
        ${unlocked ? 'hover:shadow-md' : 'opacity-50'}
      `}
      style={
        {
          backgroundColor: masteryLevel.bgColor,
          borderColor: isCurrent
            ? categoryInfo.color
            : isMastered
              ? masteryLevel.color
              : '#e5e7eb',
          '--tw-ring-color': isCurrent ? categoryInfo.color : undefined,
        } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Icon & Name */}
        <div className="flex items-start gap-2 flex-1">
          {/* Status Icon */}
          <div className="mt-0.5">
            {!unlocked ? (
              <Lock size={16} className="text-gray-400" />
            ) : isMastered ? (
              <CheckCircle
                size={16}
                weight="fill"
                style={{ color: masteryLevel.color }}
              />
            ) : mastery > 0 ? (
              <TrendUp size={16} style={{ color: masteryLevel.color }} />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            )}
          </div>

          {/* Name & Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium truncate ${unlocked ? 'b-text-primary' : 'b-text-muted'}`}
              >
                {skill.name}
              </span>
              {isCurrent && (
                <Star
                  size={14}
                  weight="fill"
                  className="text-yellow-500 flex-shrink-0"
                />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs b-text-muted">
                Grades {skill.gradeRange[0] === 0 ? 'K' : skill.gradeRange[0]}-
                {skill.gradeRange[1]}
              </span>
              {mastery > 0 && (
                <span
                  className="text-xs font-medium"
                  style={{ color: masteryLevel.color }}
                >
                  {Math.round(mastery * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Mastery Progress */}
        {unlocked && (
          <div className="w-12">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(mastery * 100, 100)}%`,
                  backgroundColor: masteryLevel.color,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
