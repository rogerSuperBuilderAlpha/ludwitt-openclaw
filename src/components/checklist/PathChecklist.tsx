/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { Step } from '@/data/steps/cursorSetupSteps'
import { logger } from '@/lib/logger'

const colorClasses: Record<string, string> = {
  blue: 'border-blue-500 text-blue-600',
  green: 'border-green-500 text-green-600',
  purple: 'border-purple-500 text-purple-600',
  orange: 'border-orange-500 text-orange-600',
}

interface PathChecklistProps {
  userId: string
  steps: Step[]
  firestoreCollection: string
  onProgressChange?: (current: number, total: number) => void
  /** Optional content rendered above the checklist (e.g. verification code) */
  headerContent?: ReactNode
  /** Title shown when all steps are complete */
  completionTitle?: string
  /** Custom completion content */
  completionMessage?: ReactNode
  /** Label for the expand button (collapsed state) */
  expandLabel?: string
  /** Analytics lessonId for tracking */
  analyticsLessonId?: string
}

export function PathChecklist({
  userId,
  steps,
  firestoreCollection,
  onProgressChange,
  headerContent,
  completionTitle = 'All steps completed!',
  completionMessage,
  expandLabel = 'View Steps',
  analyticsLessonId,
}: PathChecklistProps) {
  const [expanded, setExpanded] = useState(false)
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({})
  const [openPopup, setOpenPopup] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCopyToast, setShowCopyToast] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Report progress
  useEffect(() => {
    if (onProgressChange) {
      const completedCount = Object.values(checkedSteps).filter(Boolean).length
      onProgressChange(completedCount, steps.length)
    }
  }, [checkedSteps, onProgressChange, steps.length])

  // Load progress from Firestore
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progressDoc = await getDoc(doc(db, firestoreCollection, userId))
        if (progressDoc.exists()) {
          const data = progressDoc.data()
          const loadedSteps = data.checkedSteps || {}
          setCheckedSteps(loadedSteps)
          if (Object.keys(loadedSteps).length > 0) {
            setExpanded(true)
          }
        }
      } catch (error) {
        logger.error(
          'PathChecklist',
          `Failed to load ${firestoreCollection} progress`,
          { error }
        )
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [userId, firestoreCollection])

  // Save progress to Firestore
  useEffect(() => {
    const saveProgress = async () => {
      if (loading || Object.keys(checkedSteps).length === 0) return

      try {
        await setDoc(
          doc(db, firestoreCollection, userId),
          {
            checkedSteps,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        )
      } catch (error) {
        logger.error(
          'PathChecklist',
          `Failed to save ${firestoreCollection} progress`,
          { error }
        )
      }
    }

    saveProgress()
  }, [checkedSteps, userId, loading, firestoreCollection, steps])

  const toggleStep = (stepId: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 3000)
    } catch (err) {
      logger.error('PathChecklist', 'Failed to copy', { error: err })
    }
  }

  const clearProgress = async () => {
    try {
      await setDoc(
        doc(db, firestoreCollection, userId),
        { checkedSteps: {}, updatedAt: new Date().toISOString() },
        { merge: true }
      )
      setCheckedSteps({})
    } catch (error) {
      logger.error(
        'PathChecklist',
        `Failed to clear ${firestoreCollection} progress`,
        { error }
      )
    }
  }

  const completedSteps = steps.filter((step) => checkedSteps[step.id])
  const currentStepIndex = steps.findIndex((step) => !checkedSteps[step.id])
  const currentStep = currentStepIndex !== -1 ? steps[currentStepIndex] : null
  const allComplete = currentStepIndex === -1

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [currentStep?.id])

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Loading your progress...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Optional header content (e.g. verification code) */}
      {headerContent}

      {/* Expanded Checklist */}
      <div
        ref={containerRef}
        className={`pb-6 overflow-hidden scrollbar-hide relative transition-all duration-700 ease-in-out ${
          expanded
            ? 'max-h-[400px] mb-8 opacity-100 overflow-y-auto'
            : 'max-h-0 mb-0 opacity-0'
        }`}
      >
        {expanded && (
          <div className="space-y-3 text-left">
            {/* Success Message */}
            {allComplete && (
              <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 fade-in-scale">
                <p className="font-medium text-blue-900">{completionTitle}</p>
                {completionMessage || (
                  <p className="text-blue-800 mt-2 text-sm">
                    Great work! Your progress has been saved. Continue to the
                    next step.
                  </p>
                )}
              </div>
            )}

            {/* Current Step */}
            {currentStep && (
              <div
                key={currentStep.id}
                className={`border-l-4 ${(colorClasses[currentStep.color] || colorClasses.blue).split(' ')[0]} bg-white pl-4 py-3 rounded-r-lg shadow-sm fade-in-scale`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => toggleStep(currentStep.id)}
                    className={`mt-1 w-4 h-4 cursor-pointer ${(colorClasses[currentStep.color] || colorClasses.blue).split(' ')[1]} border-gray-300 rounded focus:ring-2 flex-shrink-0`}
                  />
                  <span className="text-gray-700 flex-1 select-text">
                    {currentStep.text}
                    {currentStep.link && (
                      <a
                        href={currentStep.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {currentStep.link.text}
                      </a>
                    )}
                  </span>
                  <button
                    onClick={() => setOpenPopup(currentStep.id)}
                    className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white transition-colors mt-1 mr-1"
                    title="More info"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Completed Steps (most recent first, progressive fade) */}
            {[...completedSteps].reverse().map((step, index) => {
              const opacity = Math.max(0.3, 1 - index * 0.15)
              const scale = Math.max(0.95, 1 - index * 0.02)

              return (
                <div
                  key={step.id}
                  className={`border-l-4 ${(colorClasses[step.color] || colorClasses.blue).split(' ')[0]} bg-gray-50 pl-4 py-2 rounded-r-lg transition-all duration-700 ease-out`}
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => toggleStep(step.id)}
                      className={`mt-1 w-4 h-4 cursor-pointer ${(colorClasses[step.color] || colorClasses.blue).split(' ')[1]} border-gray-300 rounded transition-all flex-shrink-0`}
                    />
                    <span className="text-gray-600 line-through flex-1 text-sm select-text">
                      {step.text}
                      {step.link && step.link.text}
                    </span>
                    <button
                      onClick={() => setOpenPopup(step.id)}
                      className="flex-shrink-0 w-6 h-6 rounded-lg bg-gray-400 hover:bg-gray-500 flex items-center justify-center text-white transition-colors mt-1"
                      title="More info"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Toggle Button and Reset */}
      <div className="relative flex flex-col items-center gap-4 w-full">
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full flex items-center justify-center gap-3 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span className="font-semibold tracking-tight">{expandLabel}</span>
          </button>
        )}

        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
          >
            &larr; Back
          </button>
        )}

        {expanded && Object.keys(checkedSteps).length > 0 && (
          <button
            onClick={clearProgress}
            className="absolute right-0 top-0 text-xs text-gray-500 hover:text-red-600 transition-colors"
            title="Reset progress"
          >
            Reset Progress
          </button>
        )}
      </div>

      {/* Popup Modal */}
      {openPopup && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setOpenPopup(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg max-w-xl w-full overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-900 px-6 py-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Step Details
                    </h3>
                    <p className="text-sm text-white/70">
                      Here&apos;s what you need to do
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenPopup(null)}
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="flex items-start gap-4">
                <div className="w-1 bg-gray-900 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {steps.find((s) => s.id === openPopup)?.details}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-blue-900">
                    <strong>Need more help?</strong> Copy this step&apos;s
                    instructions and paste them into ChatGPT, Claude, or your
                    favorite AI assistant for more detailed guidance!
                  </p>
                </div>
                <button
                  onClick={() => {
                    const step = steps.find((s) => s.id === openPopup)
                    if (step) {
                      const fullText = `Step: ${step.text}${step.link ? step.link.text : ''}\n\nDetails: ${step.details}`
                      copyToClipboard(fullText)
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Instructions for AI Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showCopyToast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in z-50">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">Copied to clipboard!</span>
        </div>
      )}
    </div>
  )
}
