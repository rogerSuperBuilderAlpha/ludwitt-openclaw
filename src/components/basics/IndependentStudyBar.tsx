/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * IndependentStudyBar Component
 *
 * Compact bar for the Logic/Writing/IndependentStudy row.
 * Shows locked/unlocked state with progress toward unlocking.
 */

import { useRouter } from 'next/navigation'
import {
  Lock,
  LockOpen,
  GraduationCap,
  CaretRight,
  Info,
  X,
  Trophy,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useIndependentStudyAccess } from '@/lib/hooks/useIndependentStudyAccess'
import type { SubjectProgressDisplay } from '@/lib/types/basics'
import { Portal } from './Portal'

interface IndependentStudyBarProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  userId?: string
}

export function IndependentStudyBar({
  mathProgress,
  readingProgress,
  userId,
}: IndependentStudyBarProps) {
  const router = useRouter()
  const [showInfoModal, setShowInfoModal] = useState(false)

  const accessStatus = useIndependentStudyAccess({
    userId,
    mathProgress,
    readingProgress,
  })

  const handleClick = () => {
    router.push('/basics/independent-study')
  }

  // Loading state
  if (accessStatus.isLoading) {
    return (
      <div className="w-full px-2 py-1.5 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded" />
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-24 mb-1" />
            <div className="h-2 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </div>
    )
  }

  const isUnlocked = accessStatus.isUnlocked

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center justify-between gap-2 px-2 py-1.5 b-rounded-lg transition-all cursor-pointer
          ${isUnlocked ? 'hover:opacity-90' : 'hover:b-bg-card-hover'}
        `}
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className={`p-1 b-rounded ${isUnlocked ? 'bg-amber-500 b-text-inverse' : 'bg-gray-400 b-text-inverse'}`}
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
              {isUnlocked ? (
                <Trophy size={14} weight="bold" className="text-amber-500" />
              ) : (
                <GraduationCap
                  size={14}
                  weight="bold"
                  className="b-text-muted"
                />
              )}
              <span
                className={`b-font-medium b-text-xs ${isUnlocked ? 'text-amber-700' : 'b-text-secondary'}`}
              >
                Independent Study
              </span>
              {isUnlocked ? (
                <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">
                  Unlocked
                </span>
              ) : (
                <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">
                  Locked
                </span>
              )}
            </div>
            <span className="b-text-xs b-text-muted">
              {isUnlocked
                ? 'Explore any topic with AI'
                : `${accessStatus.overallProgress}% toward mastery`}
            </span>
          </div>
        </div>

        {/* Progress or Arrow */}
        <div className="flex items-center gap-2">
          {!isUnlocked && (
            <div className="hidden sm:flex items-center gap-1">
              {/* Mini progress bars for each prereq */}
              <div
                className="b-progress b-progress-sm w-8"
                title={`Math: Grade ${accessStatus.mathGrade}/12`}
              >
                <div
                  className="b-progress-bar"
                  style={{
                    width: `${(accessStatus.mathGrade / 12) * 100}%`,
                    background: 'var(--b-math)',
                  }}
                />
              </div>
              <div
                className="b-progress b-progress-sm w-8"
                title={`Reading: Grade ${accessStatus.readingGrade}/12`}
              >
                <div
                  className="b-progress-bar"
                  style={{
                    width: `${(accessStatus.readingGrade / 12) * 100}%`,
                    background: 'var(--b-reading)',
                  }}
                />
              </div>
              <div
                className="b-progress b-progress-sm w-8"
                title={`Logic: ${accessStatus.logicMasteryPercent}%`}
              >
                <div
                  className="b-progress-bar"
                  style={{
                    width: `${accessStatus.logicMasteryPercent}%`,
                    background: 'var(--b-logic)',
                  }}
                />
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
            title="About Independent Study"
          >
            <Info size={16} className="b-text-muted" />
          </span>
          <CaretRight size={16} className="b-text-muted" />
        </div>
      </button>

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
                <div
                  className="b-icon-box b-icon-box-md b-rounded-lg"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)' }}
                >
                  <Trophy size={24} weight="fill" className="text-amber-500" />
                </div>
                <h2 className="b-text-xl b-font-bold b-text-primary">
                  Independent Study
                </h2>
              </div>

              <div className="space-y-4 b-text-secondary">
                <p>
                  <strong>Independent Study</strong> is the ultimate reward for
                  mastering the Ludwitt curriculum. Explore any topic with your
                  personal AI tutor.
                </p>

                <div className="b-bg-muted b-rounded-lg b-p-lg">
                  <h3 className="b-font-semibold b-text-primary b-mb-sm">
                    How to Unlock
                  </h3>
                  <ul className="b-text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          accessStatus.mathMet
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        {accessStatus.mathMet ? '✓' : ''}
                      </span>
                      <span>
                        Math Grade 12 (currently Grade {accessStatus.mathGrade})
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          accessStatus.readingMet
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        {accessStatus.readingMet ? '✓' : ''}
                      </span>
                      <span>
                        Reading Grade 12 (currently Grade{' '}
                        {accessStatus.readingGrade})
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          accessStatus.logicMet
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        {accessStatus.logicMet ? '✓' : ''}
                      </span>
                      <span>
                        Logic 80%+ mastery ({accessStatus.logicMasteredUnits}/
                        {accessStatus.logicTotalUnits} units)
                      </span>
                    </li>
                  </ul>
                </div>

                <div
                  className="b-rounded-lg b-p-lg"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                >
                  <h3 className="b-font-semibold text-amber-700 b-mb-sm">
                    What You&apos;ll Get
                  </h3>
                  <ul className="b-text-sm space-y-1 text-amber-800">
                    <li>• AI tutor guiding you through any topic</li>
                    <li>• Personalized lessons with embedded problems</li>
                    <li>• Connect new learning to your mastered skills</li>
                    <li>• Unlimited exploration of your interests</li>
                  </ul>
                </div>

                <p className="b-text-sm b-text-muted">
                  Overall progress: {accessStatus.overallProgress}%
                </p>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
