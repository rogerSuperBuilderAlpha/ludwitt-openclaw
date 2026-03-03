'use client'

import { Step } from './constants'

interface StepIndicatorProps {
  steps: Step[]
  currentStepIndex: number
}

export function StepIndicator({ steps, currentStepIndex }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index < currentStepIndex
                ? 'bg-emerald-500'
                : index === currentStepIndex
                ? 'bg-indigo-500 ring-4 ring-indigo-500/20'
                : 'bg-gray-200'
            }`}
          />
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 transition-all duration-300 ${
                index < currentStepIndex ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
