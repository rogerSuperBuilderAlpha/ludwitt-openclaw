/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect } from 'react'
import {
  Lock,
  LockOpen,
  Brain,
  CaretRight,
  Info,
  X,
  Play,
  Sparkle,
} from '@phosphor-icons/react'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { Portal } from './Portal'

interface LogicUnlockBarProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  isExpanded: boolean
  onToggleExpand: () => void
  userId?: string
  onPreview?: () => void // Callback for Logic Preview mode
}

const SECRET_CODE = '42'
const REQUIRED_GRADE = 12
const PREVIEW_GRADE = 5 // Minimum grade to access Logic Preview

export function LogicUnlockBar({
  mathProgress,
  readingProgress,
  isExpanded,
  onToggleExpand,
  userId,
  onPreview,
}: LogicUnlockBarProps) {
  const [secretInput, setSecretInput] = useState('')
  const [showSecretInput, setShowSecretInput] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const mathGrade = Math.floor(mathProgress?.currentDifficulty || 1)
  const readingGrade = Math.floor(readingProgress?.currentDifficulty || 1)
  const isNaturallyUnlocked =
    mathGrade >= REQUIRED_GRADE && readingGrade >= REQUIRED_GRADE

  // Preview available at Grade 5+ in either Math or Reading
  const canPreview =
    (mathGrade >= PREVIEW_GRADE || readingGrade >= PREVIEW_GRADE) &&
    !isNaturallyUnlocked &&
    !secretUnlocked

  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`logic_secret_unlocked_${userId}`)
      if (saved === 'true') {
        setSecretUnlocked(true)
      }
    }
  }, [userId])

  const isUnlocked = isNaturallyUnlocked || secretUnlocked

  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (secretInput === SECRET_CODE) {
      setSecretUnlocked(true)
      if (userId) {
        localStorage.setItem(`logic_secret_unlocked_${userId}`, 'true')
      }
      setShowSecretInput(false)
      setSecretInput('')
    } else {
      setSecretInput('')
    }
  }

  const handleLockClick = () => {
    if (!isUnlocked) {
      setClickCount((prev) => {
        const newCount = prev + 1
        if (newCount >= 5) {
          setShowSecretInput(true)
          return 0
        }
        return newCount
      })
    }
  }

  // Calculate progress percentage
  const progressPercent = Math.round(
    ((mathGrade + readingGrade) / (REQUIRED_GRADE * 2)) * 100
  )

  return (
    <div className="w-full">
      {showSecretInput && !isUnlocked ? (
        <form
          onSubmit={handleSecretSubmit}
          className="flex items-center gap-2 b-p-md b-bg-muted b-rounded-xl b-border-medium b-shadow-md"
        >
          <input
            type="text"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            placeholder="Enter code..."
            className="b-input b-input-sm flex-1"
            autoFocus
          />
          <button type="submit" className="b-btn b-btn-sm b-btn-reading">
            Unlock
          </button>
          <button
            type="button"
            onClick={() => setShowSecretInput(false)}
            className="b-text-muted hover:b-text-secondary px-2"
          >
            ✕
          </button>
        </form>
      ) : (
        <button
          onClick={isUnlocked ? onToggleExpand : handleLockClick}
          className={`
            w-full flex items-center justify-between gap-2 px-2 py-1.5 b-rounded-lg transition-all
            ${isUnlocked ? 'hover:opacity-90' : 'hover:b-bg-card-hover'}
          `}
        >
          <div className="flex items-center gap-2">
            {/* Icon */}
            <div
              className={`p-1 b-rounded ${isUnlocked ? 'b-bg-reading b-text-inverse' : 'b-bg-logic b-text-inverse'}`}
            >
              {isUnlocked ? (
                <LockOpen size={14} weight="bold" />
              ) : (
                <Lock size={14} weight="bold" />
              )}
            </div>

            {/* Title & Status */}
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <Brain
                  size={14}
                  weight="bold"
                  className={isUnlocked ? 'b-text-reading' : 'b-text-muted'}
                />
                <span
                  className={`b-font-medium b-text-xs ${isUnlocked ? 'b-text-reading-dark' : 'b-text-secondary'}`}
                >
                  Logic
                </span>
                {isUnlocked ? (
                  <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">
                    Locked
                  </span>
                )}
              </div>
              <span className="b-text-xs b-text-muted">
                {isUnlocked
                  ? 'Propositional → modal logic'
                  : `Locked until Grade ${REQUIRED_GRADE} in Math & Reading`}
              </span>
            </div>
          </div>

          {/* Progress or Arrow */}
          <div className="flex items-center gap-2">
            {!isUnlocked && (
              <div className="hidden sm:flex items-center gap-2">
                {/* Preview button for eligible users */}
                {canPreview && onPreview && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onPreview()
                    }}
                    className="b-btn b-btn-xs b-btn-logic flex items-center gap-1"
                    title="Try beginner logic puzzles"
                  >
                    <Play size={12} weight="fill" />
                    Preview
                  </button>
                )}
                <div className="flex items-center gap-1">
                  <div className="b-progress b-progress-sm w-12">
                    <div
                      className="b-progress-bar"
                      style={{
                        width: `${(mathGrade / REQUIRED_GRADE) * 100}%`,
                        background: 'var(--b-math)',
                      }}
                    />
                  </div>
                  <div className="b-progress b-progress-sm w-12">
                    <div
                      className="b-progress-bar"
                      style={{
                        width: `${(readingGrade / REQUIRED_GRADE) * 100}%`,
                        background: 'var(--b-reading)',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                setShowInfoModal(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  setShowInfoModal(true)
                }
              }}
              className="p-1 b-rounded-full hover:b-bg-muted transition-colors cursor-pointer"
              title="About Logic Module"
            >
              <Info size={16} className="b-text-muted" />
            </span>
            <CaretRight size={16} className="b-text-muted" />
          </div>
        </button>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <Portal>
          <div className="b-modal-container">
            <div
              className="b-modal-backdrop"
              onClick={() => setShowInfoModal(false)}
            />
            <div className="b-modal b-modal-sm b-p-xl">
              <button
                onClick={() => setShowInfoModal(false)}
                className="b-modal-close absolute top-4 right-4"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 b-mb-lg">
                <div className="b-icon-box b-icon-box-md b-icon-box-reading-soft b-rounded-lg">
                  <Brain size={24} weight="fill" className="b-text-reading" />
                </div>
                <h2 className="b-text-xl b-font-bold b-text-primary">
                  Logic Module
                </h2>
              </div>

              <div className="space-y-4 b-text-secondary">
                <p>
                  The <strong>Logic Module</strong> introduces students to
                  formal reasoning and symbolic logic, from basic propositional
                  logic through modal logic.
                </p>

                <div className="b-bg-muted b-rounded-lg b-p-lg">
                  <h3 className="b-font-semibold b-text-primary b-mb-sm">
                    How to Unlock
                  </h3>
                  <p className="b-text-sm">
                    Reach <strong>Grade {REQUIRED_GRADE}</strong> in both Math
                    and Reading to unlock the Logic Module. This ensures you
                    have the foundational skills needed for formal logic.
                  </p>
                </div>

                <div className="b-bg-reading-light b-rounded-lg b-p-lg">
                  <h3 className="b-font-semibold b-text-reading-dark b-mb-sm">
                    What You&apos;ll Learn
                  </h3>
                  <ul className="b-text-sm space-y-1 b-text-reading-dark">
                    <li>• Propositional logic (AND, OR, NOT, IF-THEN)</li>
                    <li>• Truth tables and logical equivalence</li>
                    <li>• Predicate logic with quantifiers</li>
                    <li>• Modal logic (possibility & necessity)</li>
                    <li>• Formal proofs and deduction</li>
                  </ul>
                </div>

                {/* Logic Preview Option */}
                {canPreview && onPreview && (
                  <div className="b-bg-logic-light b-rounded-lg b-p-lg">
                    <div className="flex items-center gap-2 b-mb-sm">
                      <Sparkle
                        size={18}
                        weight="fill"
                        className="b-text-logic"
                      />
                      <h3 className="b-font-semibold b-text-logic-dark">
                        Try Logic Preview!
                      </h3>
                    </div>
                    <p className="b-text-sm b-text-logic-dark b-mb-md">
                      Get a taste of logic with 5 beginner-friendly puzzles.
                      Build your reasoning skills while working toward the full
                      Logic Module.
                    </p>
                    <button
                      onClick={() => {
                        setShowInfoModal(false)
                        onPreview()
                      }}
                      className="b-btn b-btn-logic b-btn-sm w-full flex items-center justify-center gap-2"
                    >
                      <Play size={16} weight="fill" />
                      Try Logic Preview
                    </button>
                  </div>
                )}

                <p className="b-text-sm b-text-muted">
                  Your current progress: Math Grade {mathGrade}, Reading Grade{' '}
                  {readingGrade}
                </p>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
