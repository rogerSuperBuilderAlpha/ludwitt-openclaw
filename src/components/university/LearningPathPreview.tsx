'use client'

import { ArrowLeft, ArrowDown } from '@phosphor-icons/react'
import type { UniversityLearningPathDisplay, UniversityCourseDisplay } from '@/lib/types/university'

const LEVEL_LABELS: Record<number, string> = {
  1: 'Introductory',
  2: 'Foundational',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Graduate',
}

interface LearningPathPreviewProps {
  learningPath: UniversityLearningPathDisplay
  courses: UniversityCourseDisplay[]
  onConfirm: () => void
  onBack: () => void
}

export function LearningPathPreview({ learningPath, courses, onConfirm, onBack }: LearningPathPreviewProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-1">Your Learning Path</h2>
      <p className="text-sm text-gray-500 mb-6">
        Here&apos;s the curriculum generated for <span className="font-medium text-gray-700">{learningPath.targetTopic}</span>.
        Review the courses below, then confirm to start.
      </p>

      {/* Timeline */}
      <div className="space-y-0 mb-8">
        {courses.map((course, index) => (
          <div key={course.id}>
            {/* Course node */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-400">
                      {course.subject} &middot; {LEVEL_LABELS[course.level] || `Level ${course.level}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {course.totalDeliverables} deliverables
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed ml-10">
                {course.description}
              </p>
            </div>

            {/* Connector arrow */}
            {index < courses.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown size={16} className="text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirm button */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 text-center">
        <p className="text-sm text-gray-600 mb-4">
          {courses.length} courses with {courses.reduce((sum, c) => sum + c.totalDeliverables, 0)} total
          deliverables. The first course will be unlocked immediately.
        </p>
        <button
          onClick={onConfirm}
          className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Confirm and Start Learning
        </button>
      </div>
    </div>
  )
}
