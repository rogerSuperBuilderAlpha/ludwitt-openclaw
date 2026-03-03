'use client'

/**
 * CompletionScreen
 *
 * Summary view shown after all spaced repetition review problems are completed.
 * Displays score, accuracy percentage, XP earned, and a streak bonus badge
 * for perfect runs.
 */

import {
  Brain,
  CheckCircle,
  Trophy,
  Lightning,
  Fire
} from '@phosphor-icons/react'

const pulseAnimation = {
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}

interface CompletionScreenProps {
  correctCount: number
  totalCount: number
  xpEarned: number
  onClose: () => void
}

export function CompletionScreen({
  correctCount,
  totalCount,
  xpEarned,
  onClose
}: CompletionScreenProps) {
  const percentage = Math.round((correctCount / totalCount) * 100)
  const isPerfect = correctCount === totalCount
  const isGood = percentage >= 80

  return (
    <div className="text-center py-6 space-y-6">
      {/* Trophy/Icon */}
      <div
        className="inline-flex items-center justify-center w-24 h-24 rounded-full mx-auto"
        style={{
          background: isPerfect
            ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
            : isGood
              ? 'linear-gradient(135deg, var(--b-reading) 0%, #16a34a 100%)'
              : 'linear-gradient(135deg, var(--b-greek) 0%, #7c3aed 100%)',
          ...pulseAnimation
        }}
      >
        {isPerfect ? (
          <Trophy size={48} weight="fill" className="text-white" />
        ) : isGood ? (
          <CheckCircle size={48} weight="fill" className="text-white" />
        ) : (
          <Brain size={48} weight="fill" className="text-white" />
        )}
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold b-text-primary mb-2">
          {isPerfect ? 'Perfect Review!' : isGood ? 'Great Job!' : 'Review Complete'}
        </h2>
        <p className="b-text-secondary">
          {isPerfect
            ? 'You remembered everything perfectly!'
            : isGood
              ? 'Your memory is strong!'
              : 'Keep practicing to strengthen your memory.'}
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: 'var(--b-reading)' }}>
            {correctCount}/{totalCount}
          </div>
          <div className="text-xs b-text-secondary uppercase tracking-wide">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: 'var(--b-greek)' }}>
            {percentage}%
          </div>
          <div className="text-xs b-text-secondary uppercase tracking-wide">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold flex items-center justify-center gap-1" style={{ color: 'var(--b-writing)' }}>
            <Lightning size={24} weight="fill" />
            {xpEarned}
          </div>
          <div className="text-xs b-text-secondary uppercase tracking-wide">XP Earned</div>
        </div>
      </div>

      {/* Streaks reminder */}
      {isPerfect && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'var(--b-writing-light)',
            border: '1px solid var(--b-writing)'
          }}
        >
          <Fire size={18} weight="fill" style={{ color: 'var(--b-writing)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--b-writing)' }}>
            Perfect streak bonus!
          </span>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={onClose}
        className="w-full py-4 text-white font-semibold rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: 'linear-gradient(135deg, var(--b-greek) 0%, #7c3aed 100%)'
        }}
      >
        Continue Learning
      </button>
    </div>
  )
}
