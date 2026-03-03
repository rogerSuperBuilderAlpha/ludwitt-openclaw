'use client'

/**
 * UnlockProgress Component
 * Shows progress toward unlocking Independent Study
 * Includes option to skip prerequisites for 100 credits ($1)
 */

import { useState } from 'react'
import {
  Lock,
  CheckCircle,
  Calculator,
  BookOpen,
  Brain,
  Trophy,
  Sparkle,
  Lightning,
  Spinner,
  CurrencyDollar,
} from '@phosphor-icons/react'
import type { IndependentStudyUnlockStatus } from '@/lib/types/independent-study'

interface UnlockProgressProps {
  status: IndependentStudyUnlockStatus
  isLoading?: boolean
  onSkipPrereqs?: () => Promise<void>
  isSkipping?: boolean
}

const SKIP_COST_CREDITS = 10000 // $100.00

export function UnlockProgress({
  status,
  isLoading,
  onSkipPrereqs,
  isSkipping = false,
}: UnlockProgressProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50 rounded-2xl animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-full mb-6" />
        <div className="space-y-4">
          <div className="h-16 bg-gray-200 rounded-xl" />
          <div className="h-16 bg-gray-200 rounded-xl" />
          <div className="h-16 bg-gray-200 rounded-xl" />
        </div>
      </div>
    )
  }

  const prereqs = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: Calculator,
      current: status.mathGrade,
      required: status.mathRequired,
      isMet: status.mathMet,
      color: '#3b82f6',
      description: `Grade ${status.mathGrade} / Grade ${status.mathRequired}`,
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: BookOpen,
      current: status.readingGrade,
      required: status.readingRequired,
      isMet: status.readingMet,
      color: '#10b981',
      description: `Grade ${status.readingGrade} / Grade ${status.readingRequired}`,
    },
    {
      id: 'logic',
      name: 'Logic',
      icon: Brain,
      current: status.logicMasteryPercent,
      required: status.logicRequired,
      isMet: status.logicMet,
      color: '#8b5cf6',
      description: `${status.logicMasteredUnits} / ${status.logicTotalUnits} units mastered`,
    },
  ]

  const handleSkipClick = async () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    if (onSkipPrereqs) {
      await onSkipPrereqs()
    }
    setShowConfirm(false)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: status.isUnlocked
              ? 'linear-gradient(135deg, #f59e0b, #d97706)'
              : 'linear-gradient(135deg, #9ca3af, #6b7280)',
          }}
        >
          {status.isUnlocked ? (
            <Trophy size={28} weight="fill" color="white" />
          ) : (
            <Lock size={28} weight="bold" color="white" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {status.isUnlocked
              ? 'Independent Study Unlocked!'
              : 'Unlock Independent Study'}
          </h2>
          <p className="text-sm text-gray-500">
            {status.isUnlocked
              ? 'Explore any topic with your AI tutor'
              : 'Complete the prerequisites below to unlock'}
          </p>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Overall Progress
          </span>
          <span className="text-sm font-bold text-gray-800">
            {status.overallProgress}%
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${status.overallProgress}%`,
              background: status.isUnlocked
                ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            }}
          />
        </div>
      </div>

      {/* Prerequisites */}
      <div className="space-y-3">
        {prereqs.map((prereq) => {
          const Icon = prereq.icon
          const progress =
            prereq.id === 'logic'
              ? status.logicMasteryPercent
              : (prereq.current / prereq.required) * 100

          return (
            <div
              key={prereq.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                prereq.isMet
                  ? 'bg-white border-green-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${prereq.color}20` }}
                >
                  <Icon
                    size={24}
                    weight="bold"
                    style={{ color: prereq.color }}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800">
                      {prereq.name}
                    </span>
                    {prereq.isMet ? (
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-green-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        {prereq.description}
                      </span>
                    )}
                  </div>

                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, progress)}%`,
                        backgroundColor: prereq.isMet
                          ? '#22c55e'
                          : prereq.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Skip Prerequisites Option */}
      {!status.isUnlocked && onSkipPrereqs && (
        <div className="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightning size={24} weight="fill" className="text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">
                Skip Prerequisites
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Can&apos;t wait? Skip the prerequisites and start exploring any
                topic immediately. AI usage during study sessions will still be
                charged per message.
              </p>

              {showConfirm ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSkipClick}
                    disabled={isSkipping}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSkipping ? (
                      <>
                        <Spinner size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CurrencyDollar size={16} weight="bold" />
                        Confirm - Pay {SKIP_COST_CREDITS.toLocaleString()}{' '}
                        credits ($100)
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isSkipping}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSkipClick}
                  className="px-4 py-2 bg-white border-2 border-indigo-300 text-indigo-700 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-50 hover:border-indigo-400 transition-colors cursor-pointer"
                >
                  <Lightning size={16} weight="bold" />
                  Skip for {SKIP_COST_CREDITS.toLocaleString()} credits ($100)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Celebration for unlocked */}
      {status.isUnlocked && (
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkle size={20} weight="fill" className="text-amber-500" />
            <span className="font-bold text-amber-700">Congratulations!</span>
            <Sparkle size={20} weight="fill" className="text-amber-500" />
          </div>
          <p className="text-sm text-amber-600">
            You&apos;ve mastered the core curriculum. Start an Independent Study
            on any topic!
          </p>
        </div>
      )}
    </div>
  )
}
