'use client'

/**
 * StudySession Component
 * Main chat interface for Independent Study learning sessions
 * Curriculum-aware with unit/lesson context
 */

import { useState } from 'react'
import {
  Brain,
  X,
  PaperPlaneTilt,
  Spinner,
  Clock,
  Star,
  ArrowLeft,
  List,
  GraduationCap,
  CheckCircle,
} from '@phosphor-icons/react'
import { ChatMessage } from './ChatMessage'
import { StudySessionSidebar } from './StudySessionSidebar'
import { useStudySession } from './hooks/useStudySession'
import type { IndependentStudyDisplay } from '@/lib/types/independent-study'

interface StudySessionProps {
  study: IndependentStudyDisplay
  allStudies?: IndependentStudyDisplay[]
  onClose: () => void
  onBack?: () => void
  onSwitchStudy?: (study: IndependentStudyDisplay) => void
  onCreateNew?: () => void
  onLessonComplete?: (unitIndex: number, lessonIndex: number) => void
  onAllUnitsComplete?: () => void
}

export function StudySession({
  study,
  allStudies = [],
  onClose,
  onBack,
  onSwitchStudy,
  onCreateNew,
  onLessonComplete,
  onAllUnitsComplete,
}: StudySessionProps) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarMode, setSidebarMode] = useState<'studies' | 'curriculum'>(
    'curriculum'
  )

  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isStreaming,
    sessionXP,
    error,
    setError,
    currentUnitIndex,
    currentLessonIndex,
    hasCurriculum,
    coursePrompt,
    currentUnit,
    currentLesson,
    messagesEndRef,
    inputRef,
    handleSubmit,
    handleKeyDown,
    handleAnswerProblem,
    handleSelectLesson,
    getSessionDuration,
  } = useStudySession({ study, onLessonComplete, onAllUnitsComplete })

  const otherStudies = allStudies.filter(
    (s) => s?.id !== study.id && s?.status === 'active'
  )

  return (
    <div
      className="fixed inset-0 z-[9999] flex"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      {/* Sidebar */}
      {showSidebar && (
        <StudySessionSidebar
          study={study}
          otherStudies={otherStudies}
          sidebarMode={sidebarMode}
          setSidebarMode={setSidebarMode}
          onClose={() => setShowSidebar(false)}
          onSwitchStudy={onSwitchStudy}
          onCreateNew={onCreateNew}
          hasCurriculum={hasCurriculum}
          coursePrompt={coursePrompt}
          currentUnitIndex={currentUnitIndex}
          currentLessonIndex={currentLessonIndex}
          onSelectLesson={handleSelectLesson}
        />
      )}

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex items-center justify-center ${showSidebar ? 'ml-4' : ''}`}
      >
        <div
          className="w-[95vw] max-w-4xl h-[90vh] rounded-2xl overflow-hidden flex flex-col"
          style={{
            backgroundColor: '#fafaf9',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header */}
          <div
            className="flex-shrink-0 px-6 py-4 flex justify-between items-center"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            }}
          >
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={20} color="white" />
                </button>
              )}

              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  showSidebar ? 'bg-white/30' : 'hover:bg-white/20'
                }`}
                title="Toggle sidebar"
              >
                <List size={20} color="white" />
              </button>

              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Brain size={24} weight="fill" color="white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">{study.title}</h1>
                {hasCurriculum && currentUnit && currentLesson ? (
                  <p className="text-white/80 text-sm">
                    Unit {currentUnitIndex + 1}: {currentLesson.title}
                  </p>
                ) : (
                  <p className="text-white/80 text-sm">Independent Study</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock size={16} weight="bold" />
                  {getSessionDuration()}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={16} weight="fill" />
                  {sessionXP} XP
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                aria-label="Close study session"
              >
                <X size={20} color="white" />
              </button>
            </div>
          </div>

          {/* Lesson Context Banner */}
          {hasCurriculum && currentUnit && currentLesson && (
            <div className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-emerald-600" />
                <div>
                  <div className="text-sm font-medium text-emerald-800">
                    {currentLesson.title}
                  </div>
                  <div className="text-xs text-emerald-600">
                    {currentLesson.objectives?.[0] || currentUnit.description}
                  </div>
                </div>
              </div>
              {currentLesson.completedAt && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-sm">
                  <CheckCircle size={16} weight="fill" />
                  Completed
                </div>
              )}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!hasCurriculum && (
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 max-w-lg mx-auto">
                  {study.description}
                </p>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onAnswerProblem={handleAnswerProblem}
              />
            ))}

            {isLoading && !isStreaming && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <Brain size={20} weight="bold" color="white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Spinner size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-500 underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message or answer..."
                disabled={isLoading}
                rows={1}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 resize-none focus:outline-none focus:border-amber-400 text-sm"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all cursor-pointer ${
                  inputValue.trim() && !isLoading
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Spinner size={20} className="animate-spin" />
                ) : (
                  <PaperPlaneTilt size={20} weight="bold" />
                )}
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
