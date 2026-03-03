'use client'

import { useEffect, useRef } from 'react'
import { Step } from '@/data/steps/vercelDeploymentSteps'

const colorClasses = {
  blue: 'border-blue-500 text-blue-600',
  green: 'border-green-500 text-green-600',
  purple: 'border-purple-500 text-purple-600',
  orange: 'border-orange-500 text-orange-600',
}

interface StepChecklistContainerProps {
  expanded: boolean
  currentStep: Step | null
  completedSteps: Step[]
  onToggleStep: (stepId: string) => void
  onOpenPopup: (stepId: string) => void
}

export function StepChecklistContainer({
  expanded,
  currentStep,
  completedSteps,
  onToggleStep,
  onOpenPopup,
}: StepChecklistContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep the current step visible at the top
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [currentStep?.id])

  return (
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
                  onChange={() => onToggleStep(currentStep.id)}
                  className={`mt-1 w-4 h-4 cursor-pointer ${colorClasses[currentStep.color as keyof typeof colorClasses].split(' ')[1]} border-gray-300 rounded focus:ring-2 flex-shrink-0`}
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
                  onClick={() => onOpenPopup(currentStep.id)}
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

          {/* Completed Steps (most recent first, with progressive fade) */}
          {[...completedSteps].reverse().map((step, index) => {
            const opacity = Math.max(0.3, 1 - index * 0.15)
            const scale = Math.max(0.95, 1 - index * 0.02)

            return (
              <div
                key={step.id}
                className={`border-l-4 ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[0]} bg-gray-50 pl-4 py-2 rounded-r-lg transition-all duration-700 ease-out`}
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
                    onChange={() => onToggleStep(step.id)}
                    className={`mt-1 w-4 h-4 cursor-pointer ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} border-gray-300 rounded transition-all flex-shrink-0`}
                  />
                  <span className="text-gray-600 line-through flex-1 text-sm select-text">
                    {step.text}
                    {step.link && step.link.text}
                  </span>
                  <button
                    onClick={() => onOpenPopup(step.id)}
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
  )
}
