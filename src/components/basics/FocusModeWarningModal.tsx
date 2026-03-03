'use client'

import { useEffect } from 'react'
import { Warning, Lightning, Timer, Trophy, X } from '@phosphor-icons/react'
import { FocusModeSubject } from '@/lib/hooks/useFocusMode'

interface FocusModeWarningModalProps {
  isOpen: boolean
  subject: FocusModeSubject | null
  onConfirm: () => void
  onCancel: () => void
}

export function FocusModeWarningModal({
  isOpen,
  subject,
  onConfirm,
  onCancel,
}: FocusModeWarningModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !subject) return null

  const subjectName = subject === 'math' ? 'Math' : 'Reading'
  const headerBg =
    subject === 'math'
      ? 'linear-gradient(135deg, var(--b-math) 0%, var(--b-math-dark) 100%)'
      : 'linear-gradient(135deg, var(--b-reading) 0%, var(--b-reading-dark) 100%)'
  const accentColor =
    subject === 'math' ? 'var(--b-math-dark)' : 'var(--b-reading-dark)'
  const lightBg =
    subject === 'math' ? 'var(--b-math-light)' : 'var(--b-reading-light)'
  const borderColor =
    subject === 'math' ? 'var(--b-math-border)' : 'var(--b-reading-border)'
  const btnClass = subject === 'math' ? 'b-btn-math' : 'b-btn-reading'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onCancel}
        role="button"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onCancel()
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Focus mode warning"
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Header */}
        <div className="p-6" style={{ background: headerBg, color: 'white' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Lightning size={28} weight="fill" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Focus Mode</h2>
                <p className="text-sm opacity-80">{subjectName} Intensive</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          className="p-6 space-y-5"
          style={{ color: 'var(--b-text-primary)' }}
        >
          {/* Warning Banner */}
          <div
            className="flex gap-3 p-4 rounded-xl"
            style={{
              backgroundColor: 'var(--b-warning-light)',
              border: '1px solid var(--b-warning-border)',
              color: 'var(--b-warning-dark)',
            }}
          >
            <Warning size={24} weight="fill" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Are you ready?</p>
              <p className="text-sm mt-1 opacity-90">
                Once you start, you <strong>cannot exit</strong> for 10 minutes.
                No hints, AI tutor, or study materials allowed.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3
              className="font-semibold"
              style={{ color: 'var(--b-text-primary)' }}
            >
              What you&apos;ll get:
            </h3>

            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{
                backgroundColor: lightBg,
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: accentColor }}
              >
                <Trophy size={22} weight="fill" style={{ color: 'white' }} />
              </div>
              <div>
                <p
                  className="font-medium"
                  style={{ color: 'var(--b-text-primary)' }}
                >
                  3× XP Multiplier
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--b-text-secondary)' }}
                >
                  All XP earned is tripled!
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{
                backgroundColor: lightBg,
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: accentColor }}
              >
                <Timer size={22} weight="fill" style={{ color: 'white' }} />
              </div>
              <div>
                <p
                  className="font-medium"
                  style={{ color: 'var(--b-text-primary)' }}
                >
                  10 Minutes of Focus
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--b-text-secondary)' }}
                >
                  Uninterrupted problem-solving
                </p>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div
            className="p-4 rounded-xl space-y-1.5 text-sm"
            style={{
              backgroundColor: 'var(--b-bg-muted)',
              border: '1px solid var(--b-border-default)',
              color: 'var(--b-text-secondary)',
            }}
          >
            <p>• You can only use Focus Mode once per subject per day</p>
            <p>• Resets at midnight EST</p>
            <p>• Solve problems completely on your own</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--b-bg-muted)',
              color: 'var(--b-text-primary)',
              border: '1px solid var(--b-border-default)',
            }}
          >
            Not Now
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 ${btnClass}`}
            style={{ color: 'white' }}
          >
            <Lightning size={20} weight="fill" />
            Start Focus Mode
          </button>
        </div>
      </div>
    </div>
  )
}
