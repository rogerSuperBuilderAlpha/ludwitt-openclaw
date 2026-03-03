'use client'

/**
 * Companion Detail Modal
 * Shows full companion info with action buttons when clicking a mini card
 */

import {
  Cookie,
  GameController,
  Camera,
  Heart,
  Lightning,
  Lightbulb,
  Brain,
  Shield,
  MagicWand,
  Star,
} from '@phosphor-icons/react'
import { UnifiedModal } from '../UnifiedModal'
import {
  SubjectCompanion,
  Subject,
  SUBJECT_INFO,
  getMood,
  FEED_COST,
  AVATAR_COST_CENTS,
  LEVEL_THRESHOLDS,
} from '@/data/companions/attributes'

interface CompanionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  subject: Subject
  companion: SubjectCompanion
  subjectXP: number
  dailyXP: number
  userCredits: number
  onFeed: () => void
  onPlay: () => void
  onGenerateAvatar: () => void
  onStartEvolution: () => void
}

export function CompanionDetailModal({
  isOpen,
  onClose,
  subject,
  companion,
  subjectXP,
  dailyXP,
  userCredits,
  onFeed,
  onPlay,
  onGenerateAvatar,
  onStartEvolution,
}: CompanionDetailModalProps) {
  const info = SUBJECT_INFO[subject]
  const mood = getMood(companion)

  // Calculate XP progress
  const currentThreshold = LEVEL_THRESHOLDS[companion.level] || 0
  const nextThreshold =
    LEVEL_THRESHOLDS[Math.min(companion.level + 1, 5)] || 2000
  const xpProgress = Math.min(
    100,
    ((subjectXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  )
  const xpToNext = nextThreshold - subjectXP

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title={companion.name}
      subtitle={`${info.name} Companion • Level ${companion.level}/5`}
      size="md"
    >
      <div className="space-y-4">
        {/* Header with emoji and mood */}
        <div className="text-center pb-4 border-b b-border">
          <div className="text-6xl mb-2">{companion.currentEmoji}</div>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span className="b-text-primary font-bold">{companion.name}</span>
            <span>{mood.emoji}</span>
            <span className="text-sm b-text-muted">{mood.label}</span>
          </div>
          {companion.catchphrase && (
            <p className="text-sm italic b-text-secondary mt-2">
              {companion.catchphrase}
            </p>
          )}
        </div>

        {/* Evolution Button - if pending */}
        {companion.pendingEvolution && (
          <button
            onClick={() => {
              onStartEvolution()
              onClose()
            }}
            className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 animate-pulse"
            style={{
              background:
                'linear-gradient(to right, var(--b-writing), var(--b-logic))',
            }}
          >
            <Star size={20} weight="fill" />
            Evolve {companion.name}!
            <Star size={20} weight="fill" />
          </button>
        )}

        {/* Need Bars */}
        <div className="space-y-3 p-4 b-bg-card rounded-xl">
          <h4 className="text-sm font-medium b-text-secondary">Needs</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Cookie size={18} style={{ color: 'var(--b-writing)' }} />
              <span className="text-sm w-16 b-text-secondary">Hunger</span>
              <div
                className="flex-1 h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--b-border)' }}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${companion.hunger}%`,
                    backgroundColor:
                      companion.hunger > 50
                        ? 'var(--b-reading)'
                        : companion.hunger > 25
                          ? 'var(--b-warning)'
                          : 'var(--b-danger)',
                  }}
                />
              </div>
              <span className="text-sm w-10 text-right b-text-muted">
                {Math.round(companion.hunger)}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Heart size={18} style={{ color: 'var(--b-latin)' }} />
              <span className="text-sm w-16 b-text-secondary">Happy</span>
              <div
                className="flex-1 h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--b-border)' }}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${companion.happiness}%`,
                    backgroundColor:
                      companion.happiness > 50
                        ? 'var(--b-latin)'
                        : companion.happiness > 25
                          ? 'var(--b-warning)'
                          : 'var(--b-danger)',
                  }}
                />
              </div>
              <span className="text-sm w-10 text-right b-text-muted">
                {Math.round(companion.happiness)}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Lightning size={18} style={{ color: 'var(--b-math)' }} />
              <span className="text-sm w-16 b-text-secondary">Energy</span>
              <div
                className="flex-1 h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--b-border)' }}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${companion.energy}%`,
                    backgroundColor:
                      companion.energy > 50
                        ? 'var(--b-math)'
                        : companion.energy > 25
                          ? 'var(--b-warning)'
                          : 'var(--b-danger)',
                  }}
                />
              </div>
              <span className="text-sm w-10 text-right b-text-muted">
                {Math.round(companion.energy)}%
              </span>
            </div>
          </div>
        </div>

        {/* XP Progress */}
        {companion.level < 5 && (
          <div className="p-4 b-bg-card rounded-xl">
            <div className="flex justify-between text-sm mb-2">
              <span className="b-text-secondary">
                XP Progress to Level {companion.level + 1}
              </span>
              <span
                className="font-medium"
                style={{ color: `var(--b-${subject})` }}
              >
                {subjectXP.toLocaleString()} / {nextThreshold.toLocaleString()}
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
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
            <p className="text-xs b-text-muted mt-2">
              Earn {xpToNext.toLocaleString()} more {info.name} XP to unlock
              evolution
            </p>
          </div>
        )}

        {/* Rewards */}
        {companion.level > 0 && (
          <div className="p-4 b-bg-card rounded-xl">
            <h4 className="text-sm font-medium b-text-secondary mb-2">
              Evolution Rewards
            </h4>
            <div className="flex flex-wrap gap-2">
              {companion.freeHints > 0 && (
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--b-writing-light)',
                    color: 'var(--b-writing-dark)',
                  }}
                >
                  <Lightbulb size={14} weight="fill" />
                  {companion.freeHints === 999 ? '∞' : companion.freeHints}{' '}
                  Hints/day
                </span>
              )}
              {companion.freeExplanations > 0 && (
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--b-math-light)',
                    color: 'var(--b-math)',
                  }}
                >
                  <Brain size={14} weight="fill" />
                  {companion.freeExplanations} AI/day
                </span>
              )}
              {companion.hasStreakShield && (
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--b-reading-light)',
                    color: 'var(--b-reading)',
                  }}
                >
                  <Shield size={14} weight="fill" />
                  Streak Shield
                </span>
              )}
              {companion.hasSkipProtection && (
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--b-logic-light)',
                    color: 'var(--b-logic)',
                  }}
                >
                  <MagicWand size={14} weight="fill" />
                  Skip Protection
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              onFeed()
              onClose()
            }}
            disabled={dailyXP < FEED_COST}
            className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
            style={
              dailyXP >= FEED_COST
                ? { backgroundColor: 'var(--b-reading)', color: '#ffffff' }
                : {
                    backgroundColor: 'var(--b-border)',
                    color: 'var(--b-text-muted)',
                    cursor: 'not-allowed',
                  }
            }
          >
            <Cookie size={18} weight="fill" />
            Feed ({FEED_COST} XP)
          </button>

          <button
            onClick={() => {
              onPlay()
              onClose()
            }}
            disabled={companion.energy < 15}
            className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
            style={
              companion.energy >= 15
                ? { backgroundColor: 'var(--b-logic)', color: '#ffffff' }
                : {
                    backgroundColor: 'var(--b-border)',
                    color: 'var(--b-text-muted)',
                    cursor: 'not-allowed',
                  }
            }
          >
            <GameController size={18} weight="fill" />
            Play
          </button>

          {companion.level >= 1 && (
            <button
              onClick={() => {
                onGenerateAvatar()
                onClose()
              }}
              disabled={userCredits < AVATAR_COST_CENTS}
              className="py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
              style={
                userCredits >= AVATAR_COST_CENTS
                  ? {
                      background:
                        'linear-gradient(to right, var(--b-logic), var(--b-latin))',
                      color: '#ffffff',
                    }
                  : {
                      backgroundColor: 'var(--b-border)',
                      color: 'var(--b-text-muted)',
                      cursor: 'not-allowed',
                    }
              }
              title="Generate AI Avatar"
            >
              <Camera size={18} weight="fill" />
            </button>
          )}
        </div>

        {/* Avatar preview */}
        {companion.avatarUrl && (
          <div className="flex items-center gap-3 p-3 b-bg-card rounded-xl border b-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={companion.avatarUrl}
              alt={companion.name}
              className="w-12 h-12 rounded-full border-2"
              style={{ borderColor: `var(--b-${subject})` }}
            />
            <span className="text-sm b-text-secondary">
              Avatar ready for leaderboard!
            </span>
          </div>
        )}
      </div>
    </UnifiedModal>
  )
}
