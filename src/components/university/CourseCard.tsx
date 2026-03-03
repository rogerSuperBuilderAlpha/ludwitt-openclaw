'use client'

import { Lock, CheckCircle, Circle, CaretRight } from '@phosphor-icons/react'
import type { UniversityCourseDisplay, CourseStats } from '@/lib/types/university'

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  'locked': { label: 'Locked', className: 'bg-gray-100 text-gray-500' },
  'available': { label: 'Available', className: 'bg-blue-50 text-blue-700' },
  'in-progress': { label: 'In Progress', className: 'bg-amber-50 text-amber-700' },
  'completed': { label: 'Completed', className: 'bg-green-50 text-green-700' },
}

interface CourseCardProps {
  course: UniversityCourseDisplay
  stats?: CourseStats
  onClick: () => void
}

export function CourseCard({ course, stats, onClick }: CourseCardProps) {
  const badge = STATUS_BADGE[course.status] || STATUS_BADGE['locked']
  const isLocked = course.status === 'locked'

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full text-left bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-colors ${
        isLocked
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:border-gray-300 cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <Lock size={16} className="text-gray-400 shrink-0" />
          ) : course.status === 'completed' ? (
            <CheckCircle size={16} weight="fill" className="text-green-600 shrink-0" />
          ) : (
            <Circle size={16} className="text-gray-400 shrink-0" />
          )}
          <h3 className={`text-sm font-semibold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
            {course.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
          {!isLocked && <CaretRight size={14} className="text-gray-400" />}
        </div>
      </div>

      <p className={`text-xs leading-relaxed mb-3 ${isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
        {course.description}
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all"
            style={{ width: `${course.progressPercent}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-400 font-medium shrink-0">
          {course.approvedCount}/{course.totalDeliverables}
        </span>
      </div>

      {stats && (stats.activeCount > 0 || stats.completedCount > 0) && (
        <p className="text-[10px] text-gray-400 mt-1.5">
          {stats.activeCount} active &middot; {stats.completedCount} completed
        </p>
      )}
    </button>
  )
}
