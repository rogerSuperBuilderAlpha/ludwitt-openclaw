/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { InfoBox } from '@/components/ui/InfoBox'
import { logger } from '@/lib/logger'

interface Step {
  id: string
  text: string
  link?: { url: string; text: string }
  color: string
  details: string
}

interface Project {
  id: string
  title: string
  description: string
  skills: string[]
  difficulty: number
  estimatedHours: number
  steps: Step[]
}

interface DynamicProjectGuideProps {
  project: Project
  onComplete?: () => void
}

const colorClasses = {
  blue: 'border-blue-500 text-blue-600',
  green: 'border-green-500 text-green-600',
  purple: 'border-purple-500 text-purple-600',
  orange: 'border-orange-500 text-orange-600',
}

export function DynamicProjectGuide({
  project,
  onComplete,
}: DynamicProjectGuideProps) {
  const [expanded, setExpanded] = useState(false)
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({})
  const [openPopup, setOpenPopup] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  // Load progress from Firebase when user is authenticated
  useEffect(() => {
    const loadProgress = async () => {
      if (!user || !project.id) return

      try {
        const progressDoc = await getDoc(
          doc(db, 'userProjectProgress', project.id)
        )
        if (progressDoc.exists()) {
          const data = progressDoc.data()
          const loadedSteps = data.checkedSteps || {}
          setCheckedSteps(loadedSteps)
          // Auto-expand if user has already started
          if (Object.keys(loadedSteps).length > 0) {
            setExpanded(true)
          }
        }
      } catch (error) {
        logger.error(
          'DynamicProjectGuide',
          'Failed to load project progress from Firebase',
          { error }
        )
      }
    }

    loadProgress()
  }, [user, project.id])

  // Save progress to Firebase whenever it changes (for authenticated users)
  useEffect(() => {
    const saveProgress = async () => {
      if (!user || !project.id || Object.keys(checkedSteps).length === 0) return

      try {
        // Check if all steps are complete
        const totalSteps = project.steps.length
        const completedCount = Object.values(checkedSteps).filter(
          (v) => v === true
        ).length
        const isComplete = completedCount === totalSteps

        await setDoc(
          doc(db, 'userProjectProgress', project.id),
          {
            checkedSteps,
            completed: isComplete,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        )

        // If just completed, update the project document and call onComplete
        if (isComplete && onComplete) {
          await setDoc(
            doc(db, 'userProjects', project.id),
            {
              completed: true,
              completedAt: new Date().toISOString(),
            },
            { merge: true }
          )

          onComplete()
        }
      } catch (error) {
        logger.error(
          'DynamicProjectGuide',
          'Failed to save project progress to Firebase',
          { error }
        )
      }
    }

    saveProgress()
  }, [checkedSteps, user, project.id, project.steps.length, onComplete])

  const toggleStep = (stepId: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }))
  }

  // Clear progress from Firebase (can be called when needed)
  const clearProgress = async () => {
    if (!user || !project.id) return

    try {
      await setDoc(doc(db, 'userProjectProgress', project.id), {
        checkedSteps: {},
        completed: false,
        updatedAt: new Date().toISOString(),
      })
      setCheckedSteps({})
    } catch (error) {
      logger.error('DynamicProjectGuide', 'Failed to clear project progress', {
        error,
      })
    }
  }

  // Find completed and current (next unchecked) steps
  const completedSteps = project.steps.filter((step) => checkedSteps[step.id])
  const currentStepIndex = project.steps.findIndex(
    (step) => !checkedSteps[step.id]
  )
  const currentStep =
    currentStepIndex !== -1 ? project.steps[currentStepIndex] : null
  const allComplete = currentStepIndex === -1

  // Keep the current step visible at the top
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [currentStep?.id])

  const progressPercentage = Math.round(
    (completedSteps.length / project.steps.length) * 100
  )

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Project Info Header */}
      {!expanded && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Difficulty: {project.difficulty}/10</span>
            <span>~{project.estimatedHours} hours</span>
          </div>
        </div>
      )}

      {/* Expanded Checklist */}
      <div
        ref={containerRef}
        className={`pb-6 overflow-hidden scrollbar-hide relative transition-colors duration-700 ease-in-out ${
          expanded
            ? 'max-h-[400px] mb-8 opacity-100 overflow-y-auto'
            : 'max-h-0 mb-0 opacity-0'
        }`}
      >
        {expanded && (
          <div className="space-y-3 text-left">
            {/* Success Message - At top when all complete */}
            {allComplete && (
              <InfoBox
                color="green"
                title="🎉 Project Complete!"
                className="fade-in-scale"
              >
                <p className="mt-2">
                  Amazing work! You&apos;ve completed &quot;{project.title}
                  &quot; and learned {project.skills.join(', ')}. Ready for your
                  next challenge?
                </p>
              </InfoBox>
            )}

            {/* Current Step (next unchecked) - Always at top */}
            {currentStep && (
              <div
                key={currentStep.id}
                className={`border-l-4 ${colorClasses[currentStep.color as keyof typeof colorClasses].split(' ')[0]} bg-white pl-4 py-3 rounded-r-lg shadow-sm fade-in-scale`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => toggleStep(currentStep.id)}
                    className={`mt-1 w-4 h-4 cursor-pointer ${colorClasses[currentStep.color as keyof typeof colorClasses].split(' ')[1]} border-gray-300 rounded focus:ring-2 flex-shrink-0`}
                  />
                  <span className="text-gray-700 flex-1 select-text">
                    {currentStep.text}
                    {currentStep.link && (
                      <a
                        href={currentStep.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        {currentStep.link.text}
                      </a>
                    )}
                  </span>
                  <button
                    onClick={() => setOpenPopup(currentStep.id)}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors mt-1"
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

            {/* Completed Steps (most recent first, with progressive fade) */}
            {[...completedSteps].reverse().map((step, index) => {
              // Calculate opacity based on position (newer = more visible)
              const opacity = Math.max(0.3, 1 - index * 0.15)
              const scale = Math.max(0.95, 1 - index * 0.02)

              return (
                <div
                  key={step.id}
                  className={`border-l-4 ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[0]} bg-gray-50 pl-4 py-2 rounded-r-lg transition-colors duration-700 ease-out`}
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
                      className={`mt-1 w-4 h-4 cursor-pointer ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} border-gray-300 rounded transition-colors flex-shrink-0`}
                    />
                    <span className="text-gray-600 line-through flex-1 text-sm select-text">
                      {step.text}
                      {step.link && step.link.text}
                    </span>
                    <button
                      onClick={() => setOpenPopup(step.id)}
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors mt-1"
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

      {/* Toggle Button and Reset (stays at bottom) */}
      <div className="relative flex flex-col items-center gap-4 w-full">
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full flex items-center justify-center gap-3 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="font-semibold tracking-tight">Start Project</span>
            {completedSteps.length > 0 && (
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {progressPercentage}%
              </span>
            )}
          </button>
        )}

        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
          >
            ← Back
          </button>
        )}

        {expanded && user && Object.keys(checkedSteps).length > 0 && (
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setOpenPopup(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Step Details
              </h3>
              <button
                onClick={() => setOpenPopup(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
            <p className="text-gray-700 leading-relaxed">
              {project.steps.find((s) => s.id === openPopup)?.details}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
