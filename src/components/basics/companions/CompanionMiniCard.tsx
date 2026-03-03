'use client'

/**
 * Compact companion card for dashboard grid
 * Shows minimal info, clicks to expand detail modal
 */

import { Cookie, Heart, Lightning } from '@phosphor-icons/react'
import {
  SubjectCompanion,
  Subject,
  SUBJECT_INFO,
  BASE_COMPANIONS,
  getMood,
  LEVEL_THRESHOLDS,
} from '@/data/companions/attributes'

interface CompanionMiniCardProps {
  subject: Subject
  companion: SubjectCompanion | null
  subjectXP: number
  onClick: () => void
  onAdopt: () => void
}

export function CompanionMiniCard({
  subject,
  companion,
  subjectXP,
  onClick,
  onAdopt,
}: CompanionMiniCardProps) {
  const info = SUBJECT_INFO[subject]
  const base = BASE_COMPANIONS[subject]

  // Not adopted - show adoption prompt
  if (!companion) {
    return (
      <button
        onClick={onAdopt}
        className="p-3 rounded-xl border-2 border-dashed hover:border-solid transition-all text-center group"
        style={{
          borderColor: `var(--b-${subject}-border)`,
          backgroundColor: `var(--b-${subject}-light)`,
        }}
      >
        <span className="text-3xl block mb-1">{base.emoji}</span>
        <div
          className="text-sm font-medium"
          style={{ color: `var(--b-${subject})` }}
        >
          {info.name}
        </div>
        <div className="text-xs b-text-muted mt-1 group-hover:font-medium">
          Adopt →
        </div>
      </button>
    )
  }

  const mood = getMood(companion)
  const needsAvg = Math.round(
    (companion.hunger + companion.happiness + companion.energy) / 3
  )
  const needsAttention = needsAvg < 40

  // Calculate XP progress to next level
  const currentThreshold = LEVEL_THRESHOLDS[companion.level] || 0
  const nextThreshold =
    LEVEL_THRESHOLDS[Math.min(companion.level + 1, 5)] || 2000
  const xpProgress = Math.min(
    100,
    ((subjectXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  )
  const canEvolve = companion.pendingEvolution

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border-2 transition-all text-left relative group hover:shadow-md ${
        needsAttention ? 'animate-pulse' : ''
      }`}
      style={{
        borderColor: canEvolve
          ? 'var(--b-writing)'
          : `var(--b-${subject}-border)`,
        backgroundColor: `var(--b-${subject}-light)`,
      }}
    >
      {/* Evolution badge */}
      {canEvolve && (
        <div
          className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white animate-bounce"
          style={{
            background:
              'linear-gradient(to right, var(--b-writing), var(--b-writing-dark))',
          }}
        >
          ✨ EVOLVE
        </div>
      )}

      {/* Companion info */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{companion.currentEmoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm b-text-primary truncate">
              {companion.name}
            </span>
            <span className="text-xs">{mood.emoji}</span>
          </div>
          <div className="text-xs b-text-muted">Lv {companion.level}/5</div>
        </div>
      </div>

      {/* Mini need bars */}
      <div className="flex gap-1 items-center">
        <Cookie size={10} style={{ color: 'var(--b-writing)' }} />
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--b-border)' }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${companion.hunger}%`,
              backgroundColor:
                companion.hunger > 40 ? 'var(--b-reading)' : 'var(--b-danger)',
            }}
          />
        </div>
        <Heart size={10} style={{ color: 'var(--b-latin)' }} />
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--b-border)' }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${companion.happiness}%`,
              backgroundColor:
                companion.happiness > 40 ? 'var(--b-latin)' : 'var(--b-danger)',
            }}
          />
        </div>
        <Lightning size={10} style={{ color: 'var(--b-math)' }} />
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--b-border)' }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${companion.energy}%`,
              backgroundColor:
                companion.energy > 40 ? 'var(--b-math)' : 'var(--b-danger)',
            }}
          />
        </div>
      </div>

      {/* XP Progress to next level */}
      {companion.level < 5 && (
        <div className="mt-2">
          <div className="flex justify-between text-xs b-text-muted mb-0.5">
            <span>XP to Lv {companion.level + 1}</span>
            <span>{Math.round(xpProgress)}%</span>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--b-border)' }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${xpProgress}%`,
                backgroundColor: `var(--b-${subject})`,
              }}
            />
          </div>
        </div>
      )}
    </button>
  )
}
