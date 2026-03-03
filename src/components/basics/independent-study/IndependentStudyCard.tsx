'use client'

/**
 * IndependentStudyCard Component
 *
 * Entry point card for Independent Study feature on the dashboard.
 * Shows locked/unlocked state and progress toward unlocking.
 */

import { useRouter } from 'next/navigation'
import {
  GraduationCap,
  Lock,
  CaretRight,
  Trophy,
  Sparkle,
} from '@phosphor-icons/react'
import { useIndependentStudyAccess } from '@/lib/hooks/useIndependentStudyAccess'
import type { SubjectProgressDisplay } from '@/lib/types/basics'

interface IndependentStudyCardProps {
  userId?: string
  mathProgress?: SubjectProgressDisplay | null
  readingProgress?: SubjectProgressDisplay | null
}

export function IndependentStudyCard({
  userId,
  mathProgress,
  readingProgress,
}: IndependentStudyCardProps) {
  const router = useRouter()
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
      <div className="b-card b-p-lg animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-40 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-56" />
          </div>
        </div>
      </div>
    )
  }

  // Unlocked state
  if (accessStatus.isUnlocked) {
    return (
      <button
        onClick={handleClick}
        className="b-card b-p-lg w-full text-left cursor-pointer group relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
        }}
      >
        {/* Sparkle decorations */}
        <div className="absolute top-2 right-3 opacity-30">
          <Sparkle size={16} weight="fill" className="text-amber-500" />
        </div>

        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            }}
          >
            <Trophy size={28} weight="fill" color="white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="b-text-base b-font-bold text-amber-800">
                Independent Study
              </h3>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#b45309',
                }}
              >
                Unlocked!
              </span>
            </div>
            <p className="b-text-sm text-amber-700 opacity-80">
              Explore any topic with your personal AI tutor
            </p>
          </div>

          {/* Arrow */}
          <CaretRight
            size={24}
            weight="bold"
            className="text-amber-500 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </button>
    )
  }

  // Locked state
  return (
    <button
      onClick={handleClick}
      className="b-card b-p-lg w-full text-left cursor-pointer group relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(107, 114, 128, 0.08) 0%, rgba(75, 85, 99, 0.04) 100%)',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 relative"
          style={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
        >
          <GraduationCap size={28} weight="bold" className="text-gray-500" />
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(107, 114, 128, 0.3)' }}
          >
            <Lock size={12} weight="bold" className="text-gray-600" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="b-text-base b-font-semibold b-text-primary">
            Independent Study
          </h3>
          <p className="b-text-sm b-text-muted">
            Complete Grade 12 Math, Reading & Logic to unlock
          </p>

          {/* Progress Bar */}
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-600">
                {accessStatus.overallProgress}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${accessStatus.overallProgress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Arrow */}
        <CaretRight
          size={20}
          className="b-text-muted group-hover:translate-x-1 transition-transform"
        />
      </div>
    </button>
  )
}
