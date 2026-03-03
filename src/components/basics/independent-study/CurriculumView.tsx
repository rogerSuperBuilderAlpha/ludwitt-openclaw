'use client'

/**
 * CurriculumView Component
 *
 * Shows curriculum progress during the learning phase.
 * Displays completed and upcoming lessons, tracks progress.
 */

import {
  BookOpen,
  CheckCircle,
  Circle,
  Lock,
  Play,
  Clock,
  Star,
  CaretDown,
  CaretRight,
} from '@phosphor-icons/react'
import { useState } from 'react'
import type {
  CoursePrompt,
  CurriculumUnit,
  CurriculumLesson,
} from '@/lib/types/independent-study'

interface CurriculumViewProps {
  coursePrompt: CoursePrompt
  currentUnitIndex: number
  currentLessonIndex: number
  onSelectLesson: (unitIndex: number, lessonIndex: number) => void
  isCompact?: boolean
}

export function CurriculumView({
  coursePrompt,
  currentUnitIndex,
  currentLessonIndex,
  onSelectLesson,
  isCompact = false,
}: CurriculumViewProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(
    new Set([currentUnitIndex])
  )

  const toggleUnit = (index: number) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const isLessonComplete = (
    unit: CurriculumUnit,
    lesson: CurriculumLesson
  ): boolean => {
    return !!lesson.completedAt
  }

  const isLessonAvailable = (
    unitIndex: number,
    lessonIndex: number
  ): boolean => {
    // First lesson of first unit is always available
    if (unitIndex === 0 && lessonIndex === 0) return true

    const units = coursePrompt.curriculum.units

    // Check if previous lesson in same unit is complete
    if (lessonIndex > 0) {
      const prevLesson = units[unitIndex].lessons[lessonIndex - 1]
      return !!prevLesson.completedAt
    }

    // First lesson of new unit - check if previous unit is complete
    if (unitIndex > 0) {
      const prevUnit = units[unitIndex - 1]
      const allPrevComplete = prevUnit.lessons.every((l) => l.completedAt)
      return allPrevComplete
    }

    return false
  }

  const isCurrentLesson = (unitIndex: number, lessonIndex: number): boolean => {
    return unitIndex === currentUnitIndex && lessonIndex === currentLessonIndex
  }

  const getUnitProgress = (unit: CurriculumUnit): number => {
    const completed = unit.lessons.filter((l) => l.completedAt).length
    return unit.lessons.length > 0
      ? Math.round((completed / unit.lessons.length) * 100)
      : 0
  }

  const getTotalProgress = (): number => {
    const totalLessons = coursePrompt.curriculum.units.reduce(
      (sum, u) => sum + u.lessons.length,
      0
    )
    const completedLessons = coursePrompt.curriculum.units.reduce(
      (sum, u) => sum + u.lessons.filter((l) => l.completedAt).length,
      0
    )
    return totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0
  }

  const totalXP = coursePrompt.curriculum.units.reduce(
    (sum, u) =>
      sum + u.lessons.reduce((lsum, l) => lsum + (l.xpEarned || 0), 0),
    0
  )

  if (isCompact) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-500" />
            <span className="font-semibold text-gray-800">Progress</span>
          </div>
          <span className="text-sm font-medium text-emerald-600">
            {getTotalProgress()}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${getTotalProgress()}%` }}
          />
        </div>

        {/* Current Location */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">
            Unit {currentUnitIndex + 1}:{' '}
            {coursePrompt.curriculum.units[currentUnitIndex]?.title}
          </span>
          <br />
          <span className="text-gray-400">
            Lesson {currentLessonIndex + 1}:{' '}
            {
              coursePrompt.curriculum.units[currentUnitIndex]?.lessons[
                currentLessonIndex
              ]?.title
            }
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <BookOpen size={20} className="text-emerald-500" />
            {coursePrompt.curriculum.title}
          </h3>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-emerald-600">
              <Star size={14} weight="fill" />
              {totalXP} XP
            </span>
            <span className="text-gray-500">
              {getTotalProgress()}% complete
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${getTotalProgress()}%` }}
          />
        </div>
      </div>

      {/* Units */}
      <div className="divide-y divide-gray-100">
        {coursePrompt.curriculum.units.map((unit, unitIndex) => {
          const isExpanded = expandedUnits.has(unitIndex)
          const unitProgress = getUnitProgress(unit)
          const isUnitComplete = unitProgress === 100

          return (
            <div key={unit.id}>
              {/* Unit Header */}
              <button
                onClick={() => toggleUnit(unitIndex)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      isUnitComplete
                        ? 'bg-emerald-100 text-emerald-600'
                        : unitIndex <= currentUnitIndex
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isUnitComplete ? (
                      <CheckCircle size={18} weight="fill" />
                    ) : (
                      unitIndex + 1
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">
                      {unit.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {unit.lessons.filter((l) => l.completedAt).length}/
                      {unit.lessons.length} lessons
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${unitProgress}%` }}
                    />
                  </div>
                  {isExpanded ? (
                    <CaretDown size={18} className="text-gray-400" />
                  ) : (
                    <CaretRight size={18} className="text-gray-400" />
                  )}
                </div>
              </button>

              {/* Unit Lessons */}
              {isExpanded && (
                <div className="bg-gray-50 px-5 py-3 space-y-1">
                  {unit.lessons.map((lesson, lessonIndex) => {
                    const isComplete = isLessonComplete(unit, lesson)
                    const isAvailable = isLessonAvailable(
                      unitIndex,
                      lessonIndex
                    )
                    const isCurrent = isCurrentLesson(unitIndex, lessonIndex)

                    return (
                      <button
                        key={lesson.id}
                        onClick={() =>
                          isAvailable && onSelectLesson(unitIndex, lessonIndex)
                        }
                        disabled={!isAvailable}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                          isCurrent
                            ? 'bg-amber-100 border border-amber-300'
                            : isComplete
                              ? 'bg-emerald-50 hover:bg-emerald-100'
                              : isAvailable
                                ? 'bg-white hover:bg-gray-100 cursor-pointer'
                                : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {/* Status Icon */}
                        <div className="flex-shrink-0">
                          {isComplete ? (
                            <CheckCircle
                              size={20}
                              weight="fill"
                              className="text-emerald-500"
                            />
                          ) : isCurrent ? (
                            <Play
                              size={20}
                              weight="fill"
                              className="text-amber-500"
                            />
                          ) : isAvailable ? (
                            <Circle size={20} className="text-gray-300" />
                          ) : (
                            <Lock size={20} className="text-gray-300" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1 text-left">
                          <div
                            className={`text-sm font-medium ${
                              isCurrent
                                ? 'text-amber-700'
                                : isComplete
                                  ? 'text-emerald-700'
                                  : 'text-gray-700'
                            }`}
                          >
                            {lesson.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {lesson.estimatedMinutes} min
                            </span>
                            {lesson.xpEarned && (
                              <span className="flex items-center gap-1 text-emerald-600">
                                <Star size={12} weight="fill" />
                                {lesson.xpEarned} XP
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Current Indicator */}
                        {isCurrent && (
                          <span className="px-2 py-1 bg-amber-200 text-amber-700 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
