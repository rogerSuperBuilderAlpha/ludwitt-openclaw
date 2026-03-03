'use client'

/**
 * FocusModeModalV2 Component
 *
 * Modal wrapper for Focus Mode V2 with:
 * - Portal rendering to document body
 * - Dark overlay backdrop
 * - Close button with confirmation if mid-session
 * - Session progress header
 * - MathFocusV2 content
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Warning, Lightning, Fire } from '@phosphor-icons/react'
import { MathProblemV2 } from '@/lib/types/math-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { MathFocusV2 } from './MathFocusV2'
import { SessionProgress } from './SessionProgress'

interface FocusModeModalV2Props {
  /** Whether the modal is open */
  isOpen: boolean
  /** Called when modal should close */
  onClose: () => void
  /** Current math problem */
  problem: MathProblemV2 | null
  /** User's current progress */
  progress: SubjectProgressDisplay | null
  /** Called when problem is completed */
  onComplete: (
    nextProblem: MathProblemV2,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  /** Called when XP is earned */
  onXPEarned: (amount: number) => void
  /** Number of problems completed this session */
  problemsCompleted: number
  /** Total XP earned this session (before multiplier) */
  xpEarnedSession: number
  /** Total problems in session */
  totalProblems?: number
  /** Time remaining in seconds (for timed sessions) */
  timeRemaining?: number
  /** XP multiplier */
  xpMultiplier?: number
}

export function FocusModeModalV2({
  isOpen,
  onClose,
  problem,
  progress,
  onComplete,
  onXPEarned,
  problemsCompleted,
  xpEarnedSession,
  totalProblems = 10,
  timeRemaining,
  xpMultiplier = 3,
}: FocusModeModalV2Props) {
  const [mounted, setMounted] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [streak, setStreak] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Mount portal on client
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Handle body scroll lock and escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      previousFocusRef.current = document.activeElement as HTMLElement

      const focusModal = () => modalRef.current?.focus()
      const timeoutId = window.setTimeout(focusModal, 0)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          // Show confirm instead of closing directly
          if (problemsCompleted > 0) {
            setShowExitConfirm(true)
          } else {
            onClose()
          }
        }

        if (e.key !== 'Tab') return
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements?.length) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.body.style.overflow = ''
        window.clearTimeout(timeoutId)
        document.removeEventListener('keydown', handleKeyDown)
        previousFocusRef.current?.focus()
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, problemsCompleted, onClose])

  // Reset streak when modal opens
  useEffect(() => {
    if (isOpen) {
      setStreak(0)
      setShowExitConfirm(false)
    }
  }, [isOpen])

  // Handle close click
  const handleCloseClick = useCallback(() => {
    if (problemsCompleted > 0) {
      setShowExitConfirm(true)
    } else {
      onClose()
    }
  }, [problemsCompleted, onClose])

  // Handle confirm exit
  const handleConfirmExit = useCallback(() => {
    setShowExitConfirm(false)
    onClose()
  }, [onClose])

  // Handle cancel exit
  const handleCancelExit = useCallback(() => {
    setShowExitConfirm(false)
  }, [])

  // Handle problem completed
  const handleProblemCompleted = useCallback(() => {
    // This is called by MathFocusV2 when a problem is completed
  }, [])

  // Handle streak update
  const handleStreakUpdate = useCallback((newStreak: number) => {
    setStreak(newStreak)
  }, [])

  // Don't render if not open or not mounted
  if (!isOpen || !mounted) return null

  // Calculate whether streak bonus is active (5+ in a row)
  const streakBonusActive = streak >= 5

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    >
      {/* Exit Confirmation Overlay */}
      {showExitConfirm && (
        <div
          className="absolute inset-0 z-[110] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <div
            className="b-modal b-modal-sm b-animate-scale-in"
            style={{
              background: 'var(--b-bg-elevated)',
              borderRadius: 'var(--b-radius-2xl)',
              boxShadow: 'var(--b-shadow-2xl)',
            }}
          >
            <div className="b-modal-body text-center b-py-2xl">
              <div className="flex items-center justify-center b-mb-lg">
                <div
                  className="w-16 h-16 flex items-center justify-center b-rounded-full"
                  style={{ background: 'var(--b-warning-light)' }}
                >
                  <Warning size={36} weight="fill" className="b-text-warning" />
                </div>
              </div>

              <h3 className="b-text-xl b-font-bold b-text-primary b-mb-md">
                Leave Focus Mode?
              </h3>

              <p className="b-text-secondary b-mb-lg">
                You&apos;ve completed <strong>{problemsCompleted}</strong>{' '}
                problems and earned{' '}
                <strong>+{xpEarnedSession * xpMultiplier} XP</strong>!
              </p>

              <p className="b-text-sm b-text-muted b-mb-xl">
                Your progress will be saved, but your {xpMultiplier}× XP bonus
                will end.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCancelExit}
                  className="b-btn b-btn-lg b-btn-primary b-btn-full"
                >
                  <Lightning size={20} weight="fill" />
                  Keep Going
                </button>
                <button
                  onClick={handleConfirmExit}
                  className="b-btn b-btn-lg b-btn-ghost b-btn-full"
                >
                  Exit Focus Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="focus-mode-v2-title"
        tabIndex={-1}
        className="b-focus-mode-container b-rounded-2xl b-shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--b-bg-elevated)',
          border: '1px solid var(--b-border-default)',
        }}
      >
        {/* Header with Progress */}
        <div
          className="b-focus-mode-header flex-col gap-3"
          style={{
            background:
              'linear-gradient(135deg, var(--b-math), var(--b-math-dark))',
            color: 'var(--b-text-inverse)',
          }}
        >
          {/* Top Row: Title & Close */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center b-rounded-lg"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Lightning size={24} weight="fill" />
              </div>
              <div>
                <h2 id="focus-mode-v2-title" className="b-text-xl b-font-bold">
                  Focus Mode
                </h2>
                <p className="b-text-xs" style={{ opacity: 0.7 }}>
                  Math • {xpMultiplier}× XP Bonus
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseClick}
              className="w-10 h-10 flex items-center justify-center b-rounded-lg transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)' }}
              aria-label="Close Focus Mode"
            >
              <X size={24} weight="bold" />
            </button>
          </div>

          {/* Session Progress */}
          <SessionProgress
            currentProblem={problemsCompleted + 1}
            totalProblems={totalProblems}
            xpEarned={xpEarnedSession}
            xpMultiplier={xpMultiplier}
            streak={streak}
            timeRemaining={timeRemaining}
            streakBonusActive={streakBonusActive}
          />
        </div>

        {/* Content Area */}
        <div
          className="b-focus-mode-body"
          style={{ background: 'var(--b-bg-page)' }}
        >
          {problem && progress ? (
            <MathFocusV2
              problem={problem}
              progress={progress}
              onComplete={onComplete}
              onXPEarned={onXPEarned}
              onProblemCompleted={handleProblemCompleted}
              onStreakUpdate={handleStreakUpdate}
              currentStreak={streak}
              xpMultiplier={xpMultiplier}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center b-p-2xl">
              <div className="text-center">
                <div className="w-12 h-12 border-3 b-border-math border-t-transparent b-rounded-full b-animate-spin mx-auto b-mb-lg" />
                <p className="b-text-secondary">Loading problem...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Bonus Message */}
        <div
          className="b-focus-mode-footer"
          style={{
            background: 'var(--b-bg-muted)',
            borderTop: '1px solid var(--b-border-light)',
          }}
        >
          <Fire size={18} weight="fill" className="b-text-warning" />
          <span className="b-text-sm b-text-primary b-font-medium">
            {streakBonusActive
              ? `🔥 ${streak} Streak! All XP multiplied by ${xpMultiplier}×`
              : `Stay focused! All XP earned is multiplied by ${xpMultiplier}×`}
          </span>
          {xpMultiplier >= 3 && (
            <span className="b-badge b-badge-warning b-badge-sm b-font-bold">
              {xpMultiplier}× BONUS
            </span>
          )}
        </div>
      </div>
    </div>
  )

  // Render via portal
  return createPortal(modalContent, document.body)
}
