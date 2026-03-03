'use client'

import {
  Brain,
  X,
  PlusCircle,
  BookOpen,
  CaretRight,
  GraduationCap,
} from '@phosphor-icons/react'
import { CurriculumView } from './CurriculumView'
import type {
  IndependentStudyDisplay,
  CoursePrompt,
} from '@/lib/types/independent-study'

interface StudySessionSidebarProps {
  study: IndependentStudyDisplay
  otherStudies: IndependentStudyDisplay[]
  sidebarMode: 'studies' | 'curriculum'
  setSidebarMode: (mode: 'studies' | 'curriculum') => void
  onClose: () => void
  onSwitchStudy?: (study: IndependentStudyDisplay) => void
  onCreateNew?: () => void
  hasCurriculum: boolean
  coursePrompt?: CoursePrompt
  currentUnitIndex: number
  currentLessonIndex: number
  onSelectLesson: (unitIndex: number, lessonIndex: number) => void
}

export function StudySessionSidebar({
  study,
  otherStudies,
  sidebarMode,
  setSidebarMode,
  onClose,
  onSwitchStudy,
  onCreateNew,
  hasCurriculum,
  coursePrompt,
  currentUnitIndex,
  currentLessonIndex,
  onSelectLesson,
}: StudySessionSidebarProps) {
  return (
    <div
      className="w-80 h-[90vh] my-auto ml-4 rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Sidebar Header */}
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setSidebarMode('curriculum')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              sidebarMode === 'curriculum'
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            <GraduationCap size={16} weight="bold" className="inline mr-1" />
            Curriculum
          </button>
          <button
            onClick={() => setSidebarMode('studies')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              sidebarMode === 'studies'
                ? 'bg-amber-100 text-amber-700'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            <BookOpen size={16} weight="bold" className="inline mr-1" />
            Studies
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {sidebarMode === 'curriculum' && hasCurriculum && coursePrompt && (
          <CurriculumView
            coursePrompt={coursePrompt}
            currentUnitIndex={currentUnitIndex}
            currentLessonIndex={currentLessonIndex}
            onSelectLesson={onSelectLesson}
          />
        )}

        {sidebarMode === 'studies' && (
          <div className="p-3 space-y-2">
            {/* Current Study */}
            <div className="p-3 bg-amber-50 border-2 border-amber-400 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Brain size={16} weight="bold" className="text-amber-600" />
                <span className="text-xs font-medium text-amber-600 uppercase">
                  Current
                </span>
              </div>
              <div className="font-semibold text-gray-800 text-sm">
                {study.title}
              </div>
              <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                {study.description}
              </div>
            </div>

            {/* Other Studies */}
            {otherStudies.length > 0 && (
              <>
                <div className="text-xs font-medium text-gray-400 uppercase px-1 pt-2">
                  Switch to
                </div>
                {otherStudies.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSwitchStudy?.(s)
                      onClose()
                    }}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-left hover:border-amber-300 hover:bg-amber-50/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-800 text-sm">
                        {s.title}
                      </div>
                      <CaretRight
                        size={14}
                        className="text-gray-400 group-hover:text-amber-500"
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {s.description}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{s.totalMessages} messages</span>
                      <span>{s.totalXP} XP</span>
                    </div>
                  </button>
                ))}
              </>
            )}

            {otherStudies.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm">
                No other active studies
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create New Button */}
      {sidebarMode === 'studies' && onCreateNew && (
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => {
              onClose()
              onCreateNew()
            }}
            className="w-full py-2.5 bg-amber-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors cursor-pointer"
          >
            <PlusCircle size={18} weight="bold" />
            New Study
          </button>
        </div>
      )}
    </div>
  )
}
