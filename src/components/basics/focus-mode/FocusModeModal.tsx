'use client'

import { useEffect, useRef } from 'react'
import { Lightning, Timer, Fire } from '@phosphor-icons/react'
import { MathProblem, SubjectProgressDisplay } from '@/lib/types/basics'
import { ReadingExerciseV2 } from '@/lib/types/reading-v2'
import { FocusModeState } from '@/lib/hooks/useFocusMode'

// Extracted components
import { WordLookup } from '../WordLookup'
import { MathFocus } from './MathFocus'
import { ReadingFocusV2 } from './ReadingFocusV2'
import { SectionErrorBoundary } from '@/components/ui/ErrorBoundary'

interface FocusModeModalProps {
  isOpen: boolean
  state: FocusModeState
  formatTimeRemaining: () => string

  // Math props
  mathProblem: MathProblem | null
  mathProgress: SubjectProgressDisplay | null
  onMathComplete: (
    nextProblem: MathProblem,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void

  // Reading props (V2)
  readingExercise: ReadingExerciseV2 | null
  readingProgress: SubjectProgressDisplay | null
  onReadingComplete: (
    nextExercise: ReadingExerciseV2 | null,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void

  // XP tracking for focus mode
  onXPEarned: (amount: number) => void
  onProblemCompleted: () => void
}

export function FocusModeModal({
  isOpen,
  state,
  formatTimeRemaining,
  mathProblem,
  mathProgress,
  onMathComplete,
  readingExercise,
  readingProgress,
  onReadingComplete,
  onXPEarned,
  onProblemCompleted,
}: FocusModeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Prevent body scroll and escape key when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      previousFocusRef.current = document.activeElement as HTMLElement

      const focusModal = () => modalRef.current?.focus()
      const timeoutId = window.setTimeout(focusModal, 0)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
        }

        if (e.key !== 'Tab') return
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements?.length) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.body.style.overflow = ''
        window.clearTimeout(timeoutId)
        document.removeEventListener('keydown', handleKeyDown)
        previousFocusRef.current?.focus()
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !state.isActive) return null

  const subject = state.subject
  const subjectName = subject === 'math' ? 'Math' : 'Reading'
  const headerClass =
    subject === 'math'
      ? 'b-focus-mode-header-math'
      : 'b-focus-mode-header-reading'

  // Calculate progress percentage for timer
  const TOTAL_DURATION = 10 * 60
  const progressPercent =
    ((TOTAL_DURATION - state.timeRemaining) / TOTAL_DURATION) * 100

  // Get exercise type display for reading
  const getReadingExerciseType = () => {
    if (!readingExercise) return ''
    const typeNames: Record<string, string> = {
      'comprehension-literal': 'Comprehension',
      'comprehension-inferential': 'Inference',
      'comprehension-critical': 'Critical Analysis',
      'vocabulary-context': 'Vocabulary',
      'vocabulary-direct': 'Vocabulary',
      morphology: 'Word Structure',
      'fluency-practice': 'Fluency',
      'text-structure': 'Text Structure',
      'reciprocal-teaching': 'Strategic Reading',
      'close-reading': 'Close Reading',
    }
    return typeNames[readingExercise.type] || 'Reading'
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
    >
      {/* Modal Container - 90% viewport */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="focus-mode-title"
        tabIndex={-1}
        className="b-focus-mode-container b-bg-elevated b-rounded-2xl b-shadow-modal"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Header */}
        <div className={`b-focus-mode-header ${headerClass}`}>
          <div className="flex items-center gap-4">
            <div
              className="b-p-sm b-rounded-lg"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Lightning size={24} weight="fill" />
            </div>
            <div>
              <h2 id="focus-mode-title" className="b-text-xl b-font-bold">
                Focus Mode - {subjectName}
                {subject === 'reading' && readingExercise && (
                  <span className="text-sm font-normal ml-2 opacity-80">
                    ({getReadingExerciseType()})
                  </span>
                )}
              </h2>
              <p className="b-text-sm" style={{ opacity: 0.8 }}>
                No hints • No AI tutor • No study materials
              </p>
            </div>
          </div>

          {/* Timer & Stats */}
          <div className="flex items-center gap-6">
            {/* Problems Completed */}
            <div className="text-center">
              <p className="b-text-2xl b-font-bold">
                {state.problemsCompleted}
              </p>
              <p className="b-text-xs" style={{ opacity: 0.7 }}>
                Solved
              </p>
            </div>

            {/* XP Earned */}
            <div className="text-center">
              <p className="b-text-2xl b-font-bold">{state.xpEarned * 3}</p>
              <p className="b-text-xs" style={{ opacity: 0.7 }}>
                XP (3×)
              </p>
            </div>

            {/* Timer */}
            <div
              className="flex items-center gap-2 b-rounded-xl b-px-lg b-py-sm"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Timer size={24} weight="fill" />
              <span
                className="b-text-2xl b-font-bold"
                style={{ fontFamily: 'var(--b-font-mono)' }}
              >
                {formatTimeRemaining()}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="h-1 flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.3)' }}
        >
          <div
            className="h-full b-bg-elevated"
            style={{
              width: `${progressPercent}%`,
              transition: 'width 1s linear',
            }}
          />
        </div>

        {/* Content Area - 2 Column Layout */}
        <div className="b-focus-mode-body">
          <SectionErrorBoundary componentName="Focus Mode Exercise">
            {/* Left Column - Question/Passage */}
            <div className="b-focus-mode-col b-border-r b-bg-page">
              <div className="b-focus-mode-col-header">
                {subject === 'reading' ? 'Passage' : 'Question'}
              </div>
              <div className="b-focus-mode-col-body">
                {subject === 'math' && mathProblem && mathProgress ? (
                  <div className="b-text-lg b-font-medium b-text-primary">
                    {mathProblem.question}
                  </div>
                ) : subject === 'reading' && readingExercise?.passage ? (
                  <div className="space-y-4">
                    {/* Title if available */}
                    {readingExercise.title && (
                      <h3 className="b-text-lg b-font-semibold b-text-primary">
                        {readingExercise.title}
                      </h3>
                    )}

                    {/* Background Knowledge for context */}
                    {readingExercise.backgroundKnowledge && (
                      <div
                        className="p-3 rounded-lg text-sm"
                        style={{
                          backgroundColor: 'var(--b-reading-light)',
                          borderLeft: '3px solid var(--b-reading)',
                        }}
                      >
                        <span
                          className="font-medium"
                          style={{ color: 'var(--b-reading-dark)' }}
                        >
                          Context:
                        </span>
                        <span className="b-text-secondary ml-1">
                          {readingExercise.backgroundKnowledge}
                        </span>
                      </div>
                    )}

                    {/* Passage with word lookup */}
                    <div className="b-bg-muted b-rounded-lg b-p-lg">
                      <WordLookup
                        passage={readingExercise.passage}
                        onWordLearned={() => {}}
                      />
                    </div>

                    {/* Target Vocabulary */}
                    {readingExercise.targetVocabulary &&
                      readingExercise.targetVocabulary.length > 0 && (
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="text-xs font-medium text-purple-700">
                            📚 Key Words:{' '}
                            {readingExercise.targetVocabulary
                              .map((v) => v.word)
                              .join(', ')}
                          </span>
                        </div>
                      )}

                    {/* Morphology Focus */}
                    {readingExercise.morphologyFocus &&
                      readingExercise.morphologyFocus.length > 0 && (
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <span className="text-xs font-medium text-amber-700">
                            🔤 Word Parts:{' '}
                            {readingExercise.morphologyFocus
                              .map((m) => `${m.element} (${m.meaning})`)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-center b-text-muted">
                    Loading problem...
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Answer */}
            <div className="b-focus-mode-col b-bg-elevated">
              <div className="b-focus-mode-col-header">Your Answer</div>
              <div className="b-focus-mode-col-body" style={{ padding: 0 }}>
                {subject === 'math' && mathProblem && mathProgress ? (
                  <MathFocus
                    problem={mathProblem}
                    progress={mathProgress}
                    onComplete={onMathComplete}
                    onXPEarned={onXPEarned}
                    onProblemCompleted={onProblemCompleted}
                  />
                ) : subject === 'reading' &&
                  readingExercise &&
                  readingProgress ? (
                  <ReadingFocusV2
                    exercise={readingExercise}
                    progress={readingProgress}
                    onComplete={onReadingComplete}
                    onXPEarned={onXPEarned}
                    onProblemCompleted={onProblemCompleted}
                  />
                ) : (
                  <div className="b-p-xl text-center b-text-muted">
                    Loading...
                  </div>
                )}
              </div>
            </div>
          </SectionErrorBoundary>
        </div>

        {/* Footer with Focus Message */}
        <div className="b-focus-mode-footer">
          <Fire size={18} weight="fill" className="b-text-warning" />
          <span className="b-text-sm b-text-primary b-font-medium">
            Stay focused! All XP earned is multiplied by 3×
          </span>
        </div>
      </div>
    </div>
  )
}
