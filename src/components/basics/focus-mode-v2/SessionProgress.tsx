'use client'

/**
 * SessionProgress Component
 *
 * Visual progress bar and session stats for Focus Mode V2.
 * Shows problems completed, XP earned, optional time, and streak.
 */

import { Lightning, Timer, Fire, Trophy } from '@phosphor-icons/react'

interface SessionProgressProps {
  /** Current problem number (1-indexed) */
  currentProblem: number
  /** Total problems in session */
  totalProblems: number
  /** XP earned this session */
  xpEarned: number
  /** XP multiplier (e.g., 3 for 3x bonus) */
  xpMultiplier?: number
  /** Current streak count */
  streak: number
  /** Time elapsed in seconds (optional) */
  timeElapsed?: number
  /** Time remaining in seconds (optional, for timed sessions) */
  timeRemaining?: number
  /** Whether streak bonus is active (e.g., 5+ correct in a row) */
  streakBonusActive?: boolean
}

/**
 * Formats seconds into MM:SS display
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function SessionProgress({
  currentProblem,
  totalProblems,
  xpEarned,
  xpMultiplier = 3,
  streak,
  timeElapsed,
  timeRemaining,
  streakBonusActive = false,
}: SessionProgressProps) {
  // Calculate progress percentage
  const progressPercent =
    totalProblems > 0 ? ((currentProblem - 1) / totalProblems) * 100 : 0

  // Determine which time to show
  const showTimer = timeRemaining !== undefined || timeElapsed !== undefined
  const timerValue =
    timeRemaining !== undefined ? timeRemaining : (timeElapsed ?? 0)
  const isCountdown = timeRemaining !== undefined

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Main Stats Row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Focus Mode Label + Progress */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 b-rounded-lg b-px-md b-py-sm"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <Lightning size={18} weight="fill" />
            <span className="b-font-semibold b-text-sm">Focus Mode</span>
          </div>

          {/* Problem Counter */}
          <div
            className="flex items-center gap-1 b-rounded-lg b-px-md b-py-sm"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <span className="b-font-bold b-text-lg">{currentProblem}</span>
            <span className="b-text-sm" style={{ opacity: 0.7 }}>
              /
            </span>
            <span className="b-text-sm" style={{ opacity: 0.7 }}>
              {totalProblems}
            </span>
          </div>
        </div>

        {/* Center: XP Counter */}
        <div
          className="flex items-center gap-2 b-rounded-lg b-px-lg b-py-sm"
          style={{
            background:
              'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))',
          }}
        >
          <Trophy size={18} weight="fill" style={{ color: 'var(--b-gold)' }} />
          <span className="b-font-bold b-text-lg">
            +{xpEarned * xpMultiplier}
          </span>
          <span className="b-text-xs b-font-medium" style={{ opacity: 0.8 }}>
            XP
          </span>
          {xpMultiplier > 1 && (
            <span className="b-badge b-badge-sm b-badge-warning b-font-bold">
              {xpMultiplier}×
            </span>
          )}
        </div>

        {/* Right: Timer & Streak */}
        <div className="flex items-center gap-3">
          {/* Timer */}
          {showTimer && (
            <div
              className="flex items-center gap-2 b-rounded-lg b-px-md b-py-sm"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <Timer size={18} weight="fill" style={{ opacity: 0.8 }} />
              <span
                className="b-font-bold b-text-lg"
                style={{ fontFamily: 'var(--b-font-mono)' }}
              >
                {formatTime(timerValue)}
              </span>
              {isCountdown && timerValue < 60 && (
                <span className="b-text-xs b-text-warning b-font-semibold">
                  Hurry!
                </span>
              )}
            </div>
          )}

          {/* Streak Counter */}
          <div
            className={`flex items-center gap-2 b-rounded-lg b-px-md b-py-sm transition-all duration-300 ${
              streakBonusActive ? 'b-animate-pulse' : ''
            }`}
            style={{
              background:
                streak >= 3
                  ? 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(239,68,68,0.3))'
                  : 'rgba(255,255,255,0.1)',
            }}
          >
            <Fire
              size={18}
              weight="fill"
              className={streak >= 3 ? 'b-text-warning' : ''}
              style={{ opacity: streak >= 3 ? 1 : 0.7 }}
            />
            <span className="b-font-bold">{streak}</span>
            <span
              className="b-text-xs hidden sm:inline"
              style={{ opacity: 0.8 }}
            >
              streak
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full h-1.5 b-rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.2)' }}
      >
        <div
          className="h-full b-rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progressPercent}%`,
            background:
              'linear-gradient(90deg, var(--b-success), var(--b-gold))',
          }}
        />
      </div>

      {/* Streak Bonus Message */}
      {streakBonusActive && streak >= 5 && (
        <div className="flex items-center justify-center gap-2 b-text-sm b-py-xs b-animate-bounce">
          <Fire size={16} weight="fill" className="b-text-warning" />
          <span className="b-font-semibold" style={{ color: 'var(--b-gold)' }}>
            {streak}+ Streak! Extra XP Bonus Active!
          </span>
          <Fire size={16} weight="fill" className="b-text-warning" />
        </div>
      )}
    </div>
  )
}
