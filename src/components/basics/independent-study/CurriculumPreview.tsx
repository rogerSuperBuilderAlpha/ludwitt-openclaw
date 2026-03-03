'use client'

/**
 * CurriculumPreview Component
 *
 * Shows the generated curriculum for user approval before starting learning.
 * Displays units, lessons, and project requirements.
 */

import { useState } from 'react'
import {
  BookOpen,
  Clock,
  CheckCircle,
  Rocket,
  X,
  Sparkle,
  CaretDown,
  CaretRight,
  GraduationCap,
  Target,
  Code,
} from '@phosphor-icons/react'
import type {
  CoursePrompt,
  IndependentStudyDisplay,
} from '@/lib/types/independent-study'

interface CurriculumPreviewProps {
  study: IndependentStudyDisplay
  coursePrompt: CoursePrompt
  onConfirm: () => void
  onRegenerate?: () => void
  onClose: () => void
  isConfirming?: boolean
}

export function CurriculumPreview({
  study,
  coursePrompt,
  onConfirm,
  onRegenerate,
  onClose,
  isConfirming = false,
}: CurriculumPreviewProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(
    new Set(['unit_1'])
  )

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev)
      if (next.has(unitId)) {
        next.delete(unitId)
      } else {
        next.add(unitId)
      }
      return next
    })
  }

  const totalLessons = coursePrompt.curriculum.units.reduce(
    (sum, unit) => sum + unit.lessons.length,
    0
  )

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <div
        className="w-[95vw] max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: '#fafaf9',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 px-6 py-4 flex justify-between items-center"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkle size={24} weight="fill" color="white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">
                Your Curriculum is Ready!
              </h1>
              <p className="text-white/80 text-sm">
                Review your personalized learning path
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
            aria-label="Close curriculum preview"
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Course Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {coursePrompt.curriculum.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {coursePrompt.curriculum.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BookOpen size={18} className="text-emerald-500" />
                <span>{coursePrompt.curriculum.units.length} Units</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <GraduationCap size={18} className="text-emerald-500" />
                <span>{totalLessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={18} className="text-emerald-500" />
                <span>
                  ~{coursePrompt.curriculum.estimatedTotalHours} hours
                </span>
              </div>
            </div>
          </div>

          {/* Mastery Definition */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} className="text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                What You&apos;ll Master
              </h3>
            </div>
            <p className="text-emerald-700 text-sm">
              {coursePrompt.masteryDefinition}
            </p>
          </div>

          {/* Units */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <BookOpen size={18} />
              Curriculum Units
            </h3>

            {coursePrompt.curriculum.units.map((unit, unitIndex) => (
              <div
                key={unit.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Unit Header */}
                <button
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                      {unitIndex + 1}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">
                        {unit.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {unit.lessons.length} lessons · ~{unit.estimatedHours}{' '}
                        hours
                      </div>
                    </div>
                  </div>
                  {expandedUnits.has(unit.id) ? (
                    <CaretDown size={20} className="text-gray-400" />
                  ) : (
                    <CaretRight size={20} className="text-gray-400" />
                  )}
                </button>

                {/* Unit Lessons */}
                {expandedUnits.has(unit.id) && (
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 space-y-2">
                    <p className="text-sm text-gray-600 mb-3">
                      {unit.description}
                    </p>
                    {unit.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-start gap-3 py-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs text-gray-500">
                          {lessonIndex + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-700 text-sm">
                            {lesson.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {lesson.estimatedMinutes} min
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Project Requirement */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Code size={20} className="text-violet-600" />
              <h3 className="font-semibold text-violet-800">Final Project</h3>
            </div>
            <h4 className="font-medium text-gray-800 mb-2">
              {coursePrompt.curriculum.projectRequirement.title}
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              {coursePrompt.curriculum.projectRequirement.description}
            </p>

            {coursePrompt.curriculum.projectRequirement.deliverables.length >
              0 && (
              <div className="mb-3">
                <div className="text-xs font-medium text-violet-600 uppercase mb-2">
                  Deliverables
                </div>
                <ul className="space-y-1">
                  {coursePrompt.curriculum.projectRequirement.deliverables.map(
                    (d, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle size={14} className="text-violet-500" />
                        {d}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Ready to start your learning journey?
          </div>
          <div className="flex items-center gap-3">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                disabled={isConfirming}
                className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Regenerate
              </button>
            )}
            <button
              onClick={onConfirm}
              disabled={isConfirming}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-colors cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)' }}
            >
              {isConfirming ? (
                <>Processing...</>
              ) : (
                <>
                  <Rocket size={20} weight="fill" />
                  Start Learning
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
