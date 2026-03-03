'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowDown, Globe, ShareNetwork, ArrowSquareOut, File } from '@phosphor-icons/react'
import { CourseCard } from './CourseCard'
import { AnnouncementsList } from './AnnouncementsList'
import type { UniversityLearningPathDisplay, UniversityCourseDisplay, PathActivityStats, ProfessorDocument } from '@/lib/types/university'

interface PathDetailViewProps {
  learningPath: UniversityLearningPathDisplay
  courses: UniversityCourseDisplay[]
  loading: boolean
  stats?: PathActivityStats | null
  professorDocuments?: ProfessorDocument[]
  onSelectCourse: (courseId: string) => void
  onBack: () => void
  onPublish?: (pathId: string, anonymous: boolean) => void
  isPublishing?: boolean
}

export function PathDetailView({
  learningPath,
  courses,
  loading,
  stats,
  professorDocuments,
  onSelectCourse,
  onBack,
  onPublish,
  isPublishing,
}: PathDetailViewProps) {
  const [showName, setShowName] = useState(true)
  const canPublish = learningPath.status === 'active' && !learningPath.isPublished && onPublish
  const isPublished = learningPath.isPublished
  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        All Learning Paths
      </button>

      {/* Path header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
            Learning Path
          </p>
          {isPublished && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              <Globe size={10} weight="bold" />
              Published
            </span>
          )}
          {canPublish && (
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showName}
                  onChange={e => setShowName(e.target.checked)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                Show my name
              </label>
              <button
                onClick={() => onPublish(learningPath.id, !showName)}
                disabled={isPublishing}
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <ShareNetwork size={12} weight="bold" />
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          )}
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">{learningPath.targetTopic}</h2>
        {learningPath.targetDescription && (
          <p className="text-xs text-gray-500 mb-2">{learningPath.targetDescription}</p>
        )}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all"
              style={{ width: `${learningPath.progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-medium shrink-0">
            {learningPath.completedCourseCount}/{learningPath.totalCourseCount} courses
          </span>
        </div>
        {stats && stats.totalStudents > 1 && (
          <p className="text-xs text-gray-400 mt-2">
            {stats.totalStudents} students
          </p>
        )}
      </div>

      {/* Professor documents */}
      {professorDocuments && professorDocuments.length > 0 && (
        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <File size={14} weight="bold" className="text-gray-500" />
            <h3 className="text-sm font-medium text-gray-900">
              Professor Materials ({professorDocuments.length})
            </h3>
          </div>
          <div className="space-y-2">
            {professorDocuments.map(doc => (
              <div key={doc.id} className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                  >
                    {doc.title} <ArrowSquareOut size={10} />
                  </a>
                  {doc.description && (
                    <p className="text-[11px] text-gray-400 mt-0.5">{doc.description}</p>
                  )}
                  <p className="text-[10px] text-gray-300 mt-0.5">
                    by {doc.professorName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements */}
      <AnnouncementsList sourcePathId={learningPath.sourcePathId} />

      {/* Course list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-0">
          {courses.map((course, index) => (
            <div key={course.id}>
              <CourseCard
                course={course}
                stats={stats?.courses.find(s => s.order === course.order)}
                onClick={() => onSelectCourse(course.id)}
              />
              {index < courses.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown size={14} className="text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
