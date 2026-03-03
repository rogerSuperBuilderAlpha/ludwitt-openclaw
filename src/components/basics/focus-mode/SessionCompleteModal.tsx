'use client'

import { Trophy, CheckCircle, Fire } from '@phosphor-icons/react'
import FocusTrap from 'focus-trap-react'
import { FocusModeState } from '@/lib/hooks/useFocusMode'

interface SessionCompleteModalProps {
  isOpen: boolean
  results: FocusModeState | null
  onClose: () => void
}

export function SessionCompleteModal({
  isOpen,
  results,
  onClose,
}: SessionCompleteModalProps) {
  if (!isOpen || !results) return null

  const totalXP = results.xpEarned * 3 // 3x multiplier
  const baseXP = results.xpEarned
  const bonusXP = totalXP - baseXP

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
        aria-hidden="true"
      />

      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="session-complete-modal-title"
          className="b-modal b-modal-sm b-animate-scale-in"
          style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}
        >
          {/* Celebration Header */}
          <div
            className="b-p-2xl text-center text-white"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%)',
            }}
          >
            <div
              className="inline-flex items-center justify-center b-p-lg b-bg-warning b-rounded-full b-mb-lg"
              style={{ background: 'var(--b-warning)' }}
            >
              <Trophy size={48} weight="fill" />
            </div>
            <h2
              id="session-complete-modal-title"
              className="b-text-2xl b-font-bold b-mb-xs"
            >
              Focus Mode Complete!
            </h2>
            <p style={{ opacity: 0.8 }}>Amazing concentration!</p>
          </div>

          {/* Results */}
          <div
            className="b-modal-body"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--b-space-lg)',
              backgroundColor: '#ffffff',
              color: 'var(--b-text-primary)',
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="b-card b-card-math b-p-lg text-center">
                <CheckCircle
                  size={28}
                  weight="fill"
                  className="b-text-math mx-auto b-mb-sm"
                />
                <p className="b-text-2xl b-font-bold b-text-math-dark">
                  {results.problemsCompleted}
                </p>
                <p className="b-text-sm b-text-math">Problems Solved</p>
              </div>

              <div className="b-card b-card-reading b-p-lg text-center">
                <Fire
                  size={28}
                  weight="fill"
                  className="b-text-reading mx-auto b-mb-sm"
                />
                <p className="b-text-2xl b-font-bold b-text-reading-dark">
                  {totalXP}
                </p>
                <p className="b-text-sm b-text-reading">Total XP Earned</p>
              </div>
            </div>

            {/* XP Breakdown */}
            <div
              className="b-card b-card-flat b-p-lg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--b-space-sm)',
              }}
            >
              <div className="flex justify-between b-text-sm">
                <span className="b-text-secondary">Base XP</span>
                <span className="b-font-medium b-text-primary">{baseXP}</span>
              </div>
              <div className="flex justify-between b-text-sm">
                <span className="b-text-reading-dark b-font-medium">
                  3× Focus Bonus
                </span>
                <span className="b-font-medium b-text-reading-dark">
                  +{bonusXP}
                </span>
              </div>
              <div className="b-border-t b-pt-sm flex justify-between">
                <span className="b-font-semibold b-text-primary">
                  Total Earned
                </span>
                <span className="b-font-bold b-text-lg b-text-primary">
                  {totalXP} XP
                </span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div
            className="b-modal-footer"
            style={{ backgroundColor: '#ffffff' }}
          >
            <button
              onClick={onClose}
              className="b-btn b-btn-lg b-btn-primary b-btn-full cursor-pointer"
            >
              Awesome!
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  )
}
