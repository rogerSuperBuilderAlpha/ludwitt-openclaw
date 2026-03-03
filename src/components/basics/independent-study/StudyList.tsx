'use client'

/**
 * StudyList Component
 * Displays user's Independent Studies with phase information and actions
 */

import { useState } from 'react'
import {
  Brain,
  Play,
  Archive,
  CheckCircle,
  Clock,
  Star,
  CaretRight,
  DotsThree,
  Lightbulb,
  BookOpen,
  Code,
  Robot,
  UserCircle,
  Trophy,
} from '@phosphor-icons/react'
import type {
  IndependentStudyDisplay,
  StudyPhase,
} from '@/lib/types/independent-study'

interface StudyListProps {
  studies: IndependentStudyDisplay[]
  onSelectStudy: (study: IndependentStudyDisplay) => void
  onArchiveStudy: (studyId: string) => void
  isLoading?: boolean
}

const PHASE_CONFIG: Record<
  StudyPhase,
  {
    label: string
    icon: typeof Brain
    bgColor: string
    textColor: string
  }
> = {
  discovery: {
    label: 'Discovery',
    icon: Lightbulb,
    bgColor: 'bg-violet-100',
    textColor: 'text-violet-600',
  },
  curriculum_preview: {
    label: 'Review Curriculum',
    icon: BookOpen,
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-600',
  },
  learning: {
    label: 'Learning',
    icon: Brain,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
  building: {
    label: 'Building Project',
    icon: Code,
    bgColor: 'bg-violet-100',
    textColor: 'text-violet-600',
  },
  ai_review: {
    label: 'AI Review',
    icon: Robot,
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600',
  },
  professional_review: {
    label: 'Professional Review',
    icon: UserCircle,
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600',
  },
  completed: {
    label: 'Completed',
    icon: Trophy,
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-600',
  },
}

export function StudyList({
  studies,
  onSelectStudy,
  onArchiveStudy,
  isLoading,
}: StudyListProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl border border-gray-200 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-48 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (studies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Brain size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No studies yet
        </h3>
        <p className="text-sm text-gray-500">
          Create your first Independent Study to explore any topic with your AI
          tutor.
        </p>
      </div>
    )
  }

  const activeStudies = studies.filter((s) => s?.status === 'active')
  const completedStudies = studies.filter((s) => s?.status === 'completed')
  const archivedStudies = studies.filter((s) => s?.status === 'archived')

  const renderStudyCard = (study: IndependentStudyDisplay) => {
    const isActive = study.status === 'active'
    const isCompleted = study.status === 'completed'
    const phase = study.phase || 'discovery'
    const phaseConfig = PHASE_CONFIG[phase]
    const PhaseIcon = phaseConfig.icon

    const getButtonLabel = () => {
      switch (phase) {
        case 'discovery':
          return 'Continue Discovery'
        case 'curriculum_preview':
          return 'Review Curriculum'
        case 'learning':
          return 'Continue Learning'
        case 'building':
          return 'Continue Building'
        case 'ai_review':
          return 'View Review'
        case 'professional_review':
          return 'Complete Review'
        case 'completed':
          return 'View Certificate'
        default:
          return 'Continue'
      }
    }

    return (
      <div
        key={study.id}
        className={`group p-4 bg-white rounded-xl border-2 transition-all ${
          isActive
            ? 'border-amber-200 hover:border-amber-400'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isActive
                ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                : isCompleted
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                  : 'bg-gray-400'
            }`}
          >
            {isCompleted ? (
              <Trophy size={24} weight="fill" color="white" />
            ) : (
              <Brain size={24} weight="bold" color="white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 truncate">
                {study.title}
              </h3>
              {isActive && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${phaseConfig.bgColor} ${phaseConfig.textColor}`}
                >
                  <PhaseIcon size={12} weight="bold" className="inline mr-1" />
                  {phaseConfig.label}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">
              {study.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Star size={12} weight="fill" />
                {study.totalXP || 0} XP
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {study.totalMessages || 0} messages
              </span>
              {study.progressPercent > 0 && study.progressPercent < 100 && (
                <span className="flex items-center gap-1">
                  {study.progressPercent}% complete
                </span>
              )}
              {study.updatedAt && (
                <span>{new Date(study.updatedAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isActive && (
              <button
                onClick={() => onSelectStudy(study)}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-amber-600 transition-colors cursor-pointer"
              >
                <Play size={16} weight="fill" />
                {getButtonLabel()}
              </button>
            )}

            {isCompleted && (
              <button
                onClick={() => onSelectStudy(study)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <CheckCircle size={16} weight="fill" />
                View
              </button>
            )}

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() =>
                  setMenuOpen(menuOpen === study.id ? null : study.id)
                }
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <DotsThree size={20} weight="bold" />
              </button>

              {menuOpen === study.id && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  {study.status !== 'archived' && (
                    <button
                      onClick={() => {
                        onArchiveStudy(study.id)
                        setMenuOpen(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Archive size={16} />
                      Archive
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar (for learning phase) */}
        {isActive && phase === 'learning' && study.progressPercent > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Curriculum Progress</span>
              <span>{study.progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${study.progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Active Studies */}
      {activeStudies.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Active Studies ({activeStudies.length})
          </h3>
          <div className="space-y-3">{activeStudies.map(renderStudyCard)}</div>
        </div>
      )}

      {/* Completed Studies */}
      {completedStudies.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Completed ({completedStudies.length})
          </h3>
          <div className="space-y-3">
            {completedStudies.map(renderStudyCard)}
          </div>
        </div>
      )}

      {/* Archived Studies */}
      {archivedStudies.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Archived ({archivedStudies.length})
          </h3>
          <div className="space-y-3 opacity-60">
            {archivedStudies.map(renderStudyCard)}
          </div>
        </div>
      )}
    </div>
  )
}
