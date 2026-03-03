'use client'

/**
 * Companion Card Component
 * Displays a single companion with its stats and action buttons
 */

import {
  Heart,
  Lightning,
  Cookie,
  GameController,
  Lightbulb,
  Brain,
  Shield,
  MagicWand,
  Camera,
} from '@phosphor-icons/react'
import {
  SubjectCompanion,
  Subject,
  SUBJECT_INFO,
  BASE_COMPANIONS,
  getMood,
  FEED_COST,
  AVATAR_COST_CENTS,
} from '@/data/companions/attributes'

interface CompanionCardProps {
  subject: Subject
  companion: SubjectCompanion | null
  dailyXP: number
  userCredits: number
  onAdopt: () => void
  onFeed: () => void
  onPlay: () => void
  onGenerateAvatar: () => void
  onStartEvolution: () => void
}

export function CompanionCard({
  subject,
  companion,
  dailyXP,
  userCredits,
  onAdopt,
  onFeed,
  onPlay,
  onGenerateAvatar,
  onStartEvolution,
}: CompanionCardProps) {
  const info = SUBJECT_INFO[subject]
  const base = BASE_COMPANIONS[subject]

  // Not adopted yet - show adoption card
  if (!companion) {
    return (
      <button
        onClick={onAdopt}
        className={`p-4 rounded-xl border-2 border-dashed ${info.borderColor} ${info.bgColor} hover:border-solid transition-all`}
      >
        <div className="text-center">
          <span className="text-4xl block mb-2">{base.emoji}</span>
          <div className={`font-bold ${info.color}`}>{info.name} Companion</div>
          <div className="text-sm b-text-secondary mt-1">
            Click to adopt {base.name}!
          </div>
          <div className="mt-3 px-4 py-2 b-bg-card rounded-lg text-sm font-medium text-b-logic inline-block">
            Adopt Now →
          </div>
        </div>
      </button>
    )
  }

  const mood = getMood(companion)

  return (
    <div
      className={`p-4 rounded-xl border-2 ${info.borderColor} ${info.bgColor} relative overflow-hidden`}
    >
      {/* Evolution notification */}
      {companion.pendingEvolution && (
        <button
          onClick={onStartEvolution}
          className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold animate-pulse"
          style={{
            background:
              'linear-gradient(to right, var(--b-writing, #f59e0b), var(--b-writing-dark, #d97706))',
            color: '#ffffff',
          }}
        >
          ✨ EVOLVE!
        </button>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="text-4xl">{companion.currentEmoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold b-text-primary">{companion.name}</span>
            <span className="text-sm">{mood.emoji}</span>
          </div>
          <div className="text-xs b-text-secondary">
            {info.name} • Level {companion.level}/5
          </div>
        </div>
      </div>

      {/* Catchphrase */}
      {companion.level > 0 && (
        <div className="text-xs italic b-text-muted mb-2 truncate">
          {companion.catchphrase}
        </div>
      )}

      {/* Need Bars */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-2 text-xs">
          <Cookie size={12} style={{ color: 'var(--b-writing, #f59e0b)' }} />
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--b-border-default, #e5e7eb)' }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${companion.hunger}%`,
                backgroundColor:
                  companion.hunger > 50
                    ? 'var(--b-reading, #22c55e)'
                    : companion.hunger > 25
                      ? 'var(--b-warning, #f59e0b)'
                      : 'var(--b-danger, #ef4444)',
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Heart size={12} style={{ color: 'var(--b-latin, #8b5cf6)' }} />
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--b-border-default, #e5e7eb)' }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${companion.happiness}%`,
                backgroundColor:
                  companion.happiness > 50
                    ? 'var(--b-latin, #8b5cf6)'
                    : companion.happiness > 25
                      ? 'var(--b-warning, #f59e0b)'
                      : 'var(--b-danger, #ef4444)',
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Lightning size={12} style={{ color: 'var(--b-warning, #f59e0b)' }} />
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--b-border-default, #e5e7eb)' }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: `${companion.energy}%`,
                backgroundColor:
                  companion.energy > 50
                    ? 'var(--b-math, #3b82f6)'
                    : companion.energy > 25
                      ? 'var(--b-warning, #f59e0b)'
                      : 'var(--b-danger, #ef4444)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Rewards Display */}
      {companion.level > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {companion.freeHints > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                backgroundColor: 'var(--b-writing-light, #fef3c7)',
                color: 'var(--b-text-primary, #0b1d39)',
              }}
            >
              <Lightbulb size={10} weight="fill" />
              {companion.freeHints === 999 ? '∞' : companion.freeHints} hints
            </span>
          )}
          {companion.freeExplanations > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                backgroundColor: 'var(--b-math-light, #dbeafe)',
                color: 'var(--b-text-primary, #0b1d39)',
              }}
            >
              <Brain size={10} weight="fill" />
              {companion.freeExplanations} AI
            </span>
          )}
          {companion.hasStreakShield && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                backgroundColor: 'var(--b-reading-light, #dcfce7)',
                color: 'var(--b-text-primary, #0b1d39)',
              }}
            >
              <Shield size={10} weight="fill" />
            </span>
          )}
          {companion.hasSkipProtection && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                backgroundColor: 'var(--b-logic-light, #fce7f3)',
                color: 'var(--b-text-primary, #0b1d39)',
              }}
            >
              <MagicWand size={10} weight="fill" />
            </span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onFeed}
          disabled={dailyXP < FEED_COST}
          className="flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all"
          style={
            dailyXP >= FEED_COST
              ? {
                  backgroundColor: 'var(--b-reading, #22c55e)',
                  color: '#ffffff',
                }
              : {
                  backgroundColor: 'var(--b-border-default, #e5e7eb)',
                  color: 'var(--b-text-muted, #9ca3af)',
                  cursor: 'not-allowed',
                }
          }
        >
          <Cookie size={14} weight="fill" />
          Feed
        </button>
        <button
          onClick={onPlay}
          disabled={companion.energy < 15}
          className="flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all"
          style={
            companion.energy >= 15
              ? { backgroundColor: 'var(--b-logic, #ec4899)', color: '#ffffff' }
              : {
                  backgroundColor: 'var(--b-border-default, #e5e7eb)',
                  color: 'var(--b-text-muted, #9ca3af)',
                  cursor: 'not-allowed',
                }
          }
        >
          <GameController size={14} weight="fill" />
          Play
        </button>
        {companion.level >= 1 && (
          <button
            onClick={onGenerateAvatar}
            disabled={userCredits < AVATAR_COST_CENTS}
            className="py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all"
            style={
              userCredits >= AVATAR_COST_CENTS
                ? {
                    background:
                      'linear-gradient(to right, var(--b-logic, #ec4899), var(--b-latin, #8b5cf6))',
                    color: '#ffffff',
                  }
                : {
                    backgroundColor: 'var(--b-border-default, #e5e7eb)',
                    color: 'var(--b-text-muted, #9ca3af)',
                    cursor: 'not-allowed',
                  }
            }
            title="Generate AI Avatar"
          >
            <Camera size={14} weight="fill" />
          </button>
        )}
      </div>

      {/* Show existing avatar if generated */}
      {companion.avatarUrl && (
        <div className="mt-2 flex items-center gap-2 p-2 b-bg-card rounded-lg border b-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={companion.avatarUrl}
            alt={companion.name}
            className="w-8 h-8 rounded-full border-2 b-border-logic"
          />
          <span className="text-xs b-text-secondary">
            Avatar ready for leaderboard!
          </span>
        </div>
      )}
    </div>
  )
}
