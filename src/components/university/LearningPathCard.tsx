'use client'

import { CaretRight, CheckCircle, CircleNotch, Briefcase, ChalkboardTeacher } from '@phosphor-icons/react'
import type { UniversityLearningPathDisplay } from '@/lib/types/university'

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  'generating': { label: 'Generating', className: 'bg-amber-50 text-amber-700' },
  'active': { label: 'Active', className: 'bg-blue-50 text-blue-700' },
  'completed': { label: 'Completed', className: 'bg-green-50 text-green-700' },
}

interface LearningPathCardProps {
  path: UniversityLearningPathDisplay
  onClick: () => void
  resolvedProfessorNames?: string[]
}

export function LearningPathCard({ path, onClick, resolvedProfessorNames }: LearningPathCardProps) {
  const badge = STATUS_BADGE[path.status] || STATUS_BADGE['active']

  return (
    <button
      onClick={onClick}
      disabled={path.status === 'generating'}
      className={`w-full text-left bg-white border border-gray-200 rounded-lg p-3 sm:p-5 shadow-sm transition-colors ${
        path.status === 'generating'
          ? 'opacity-70 cursor-not-allowed'
          : 'hover:border-gray-300 cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          {path.status === 'completed' ? (
            <CheckCircle size={18} weight="fill" className="text-green-600 shrink-0" />
          ) : path.status === 'generating' ? (
            <CircleNotch size={18} className="text-amber-600 animate-spin shrink-0" />
          ) : (
            <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0" />
          )}
          <h3 className="text-sm font-semibold text-gray-900">{path.targetTopic}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
          {path.status !== 'generating' && <CaretRight size={14} className="text-gray-400" />}
        </div>
      </div>

      {path.targetDescription && (
        <p className="text-xs text-gray-500 mb-3 ml-6 sm:ml-[30px]">{path.targetDescription}</p>
      )}

      {((resolvedProfessorNames && resolvedProfessorNames.length > 0) || (path.professors && path.professors.length > 0)) && (
        <p className="text-xs text-gray-500 mb-3 ml-6 sm:ml-[30px] flex items-center gap-1">
          <ChalkboardTeacher size={12} weight="bold" className="text-gray-400 shrink-0" />
          {resolvedProfessorNames && resolvedProfessorNames.length > 0
            ? resolvedProfessorNames.join(', ')
            : path.professors!.join(', ')}
        </p>
      )}

      {(path.profession || (path.tags && path.tags.length > 0) || path.levelRange) && (
        <div className="flex items-center gap-1.5 mb-3 ml-6 sm:ml-[30px] flex-wrap">
          {path.profession && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              <Briefcase size={10} weight="bold" />
              {path.profession}
            </span>
          )}
          {path.levelRange && (
            <span className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">
              {path.levelRange.min === path.levelRange.max
                ? `Level ${path.levelRange.min}`
                : `Levels ${path.levelRange.min}–${path.levelRange.max}`}
            </span>
          )}
          {path.tags?.map(tag => (
            <span key={tag} className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 ml-6 sm:ml-[30px]">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all"
            style={{ width: `${path.progressPercent}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-400 font-medium shrink-0">
          {path.totalCourseCount} courses
        </span>
      </div>
    </button>
  )
}
