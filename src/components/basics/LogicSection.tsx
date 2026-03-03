/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
'use client'

/**
 * Logic Section Component
 * Main orchestrator for the logic practice module
 *
 * Refactored: Jan 2, 2026
 * CSS Updated: Jan 4, 2026
 * Accessibility: Jan 17, 2026 - Added focus trap and escape key handling
 */

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import FocusTrap from 'focus-trap-react'
import {
  Brain,
  X,
  Fire,
  Trophy,
  Check,
  Sparkle,
  CaretRight,
} from '@phosphor-icons/react'

// Extracted components
import {
  LogicUnitNav,
  LogicProblemDisplay,
  LogicAnswerInput,
  LogicFeedback,
} from './logic'

// Extracted hook
import { useLogicProgress } from '@/lib/hooks/useLogicProgress'

interface LogicSectionProps {
  userId?: string
  onXPEarned?: (xp: number) => void
  onClose?: () => void
}

export function LogicSectionInner({
  userId,
  onXPEarned,
  onClose,
}: LogicSectionProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle Escape key to close modal
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
      }
    },
    [onClose]
  )

  const logic = useLogicProgress({ userId, onXPEarned })

  if (logic.isLoading || !logic.currentProblem) {
    return null
  }

  const modalContent = (
    <FocusTrap
      active={true}
      focusTrapOptions={{
        escapeDeactivates: true,
        onDeactivate: onClose,
        allowOutsideClick: true,
      }}
    >
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logic-modal-title"
      >
        {/* Modal Container */}
        <div
          className="w-[90vw] h-[90vh] b-bg-card b-rounded-2xl overflow-hidden flex flex-col"
          style={{
            backgroundColor: 'var(--b-bg-card)',
            boxShadow:
              'var(--b-shadow-modal, 0 25px 50px -12px rgba(0, 0, 0, 0.5))',
          }}
        >
          {/* Header */}
          <div
            className="flex-shrink-0 b-p-md flex justify-between items-center"
            style={{
              background:
                'linear-gradient(135deg, var(--b-logic) 0%, var(--b-logic-dark) 100%)',
            }}
          >
            <div className="flex items-center gap-5">
              <h1
                id="logic-modal-title"
                className="b-text-inverse b-text-lg b-font-bold flex items-center gap-2"
              >
                <Brain size={22} weight="fill" />
                Logic Module
              </h1>
              <div className="flex gap-4">
                <span className="b-text-writing-light b-text-sm flex items-center gap-1">
                  <Fire size={16} weight="fill" /> {logic.streak}
                </span>
                <span className="b-text-writing-light b-text-sm flex items-center gap-1">
                  <Trophy size={16} weight="fill" /> {logic.totalXP} XP
                </span>
                <span
                  className="b-text-sm flex items-center gap-1"
                  style={{ color: 'var(--b-success-light)' }}
                >
                  <Check size={16} weight="bold" /> {logic.totalCompleted}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="b-btn b-btn-sm flex items-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
              }}
            >
              <X size={14} weight="bold" />
              Close
            </button>
          </div>

          {/* Unit Navigation */}
          <LogicUnitNav
            availableUnits={logic.availableUnits}
            selectedUnit={logic.selectedUnit}
            onUnitChange={logic.setSelectedUnit}
            getUnitCompletion={logic.getUnitCompletion}
          />

          {/* Mastery Banner - Points to Independent Study when Logic is mastered */}
          {logic.isLogicMastered && (
            <div
              className="b-p-md b-border-b flex-shrink-0"
              style={{ backgroundColor: 'var(--b-bg-card)' }}
            >
              <button
                onClick={() => {
                  onClose?.()
                  router.push('/basics/independent-study')
                }}
                className="w-full p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01]"
                style={{
                  background:
                    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Trophy size={24} weight="fill" color="white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Logic Master!</span>
                    <Sparkle size={16} weight="fill" color="white" />
                  </div>
                  <p className="text-sm text-white/90">
                    You&apos;ve unlocked Independent Study - explore any topic
                    with AI
                  </p>
                </div>
                <CaretRight size={24} weight="bold" color="white" />
              </button>
            </div>
          )}

          {/* Main Content - 2 Columns */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column - Problem */}
            <LogicProblemDisplay
              problem={logic.currentProblem}
              problemIndex={logic.getCurrentProblemIndex()}
              totalProblems={logic.getUnitProblemCount()}
              showHint={logic.showHint}
              onToggleHint={() => logic.setShowHint(!logic.showHint)}
              showAILesson={logic.showAILesson}
              aiLesson={logic.aiLesson}
              isLoadingLesson={logic.isLoadingLesson}
              lessonPurchased={logic.lessonPurchased}
              onPurchaseLesson={logic.purchaseAILesson}
            />

            {/* Right Column - Response */}
            <div
              className="flex-1 b-p-lg overflow-y-auto flex flex-col b-bg-card"
              style={{ backgroundColor: 'var(--b-bg-card)' }}
            >
              {logic.feedback === null ? (
                <LogicAnswerInput
                  problem={logic.currentProblem}
                  userAnswer={logic.userAnswer}
                  userReasoning={logic.userReasoning}
                  isGrading={logic.isGrading}
                  onAnswerChange={logic.setUserAnswer}
                  onReasoningChange={logic.setUserReasoning}
                  onSubmit={logic.handleSubmit}
                />
              ) : (
                <LogicFeedback
                  feedback={logic.feedback}
                  aiFeedback={logic.aiFeedback}
                  onNext={logic.handleNext}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  )

  if (!mounted) return null
  return createPortal(modalContent, document.body)
}
