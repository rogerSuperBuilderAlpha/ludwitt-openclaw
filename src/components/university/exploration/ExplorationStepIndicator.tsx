'use client'

import { Check } from '@phosphor-icons/react'
import type { ExplorationStep } from '@/lib/types/university'

interface ExplorationStepIndicatorProps {
  currentStep: ExplorationStep
}

const STEPS: { key: ExplorationStep; label: string }[] = [
  { key: 'define-topic', label: 'Topic' },
  { key: 'research-questions', label: 'Questions' },
  { key: 'deep-dive', label: 'Deep Dive' },
  { key: 'synthesize', label: 'Synthesis' },
  { key: 'export', label: 'Export' },
]

const STEP_ORDER: Record<ExplorationStep, number> = {
  'define-topic': 0,
  'research-questions': 1,
  'deep-dive': 2,
  'synthesize': 3,
  'export': 4,
}

export function ExplorationStepIndicator({ currentStep }: ExplorationStepIndicatorProps) {
  const currentIdx = STEP_ORDER[currentStep]

  return (
    <div className="flex items-center gap-1 mb-6">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentIdx
        const isCurrent = idx === currentIdx

        return (
          <div key={step.key} className="flex items-center gap-1 flex-1">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold shrink-0 ${
              isCompleted ? 'bg-gray-900 text-white' :
              isCurrent ? 'bg-gray-900 text-white' :
              'bg-gray-100 text-gray-400'
            }`}>
              {isCompleted ? <Check size={12} weight="bold" /> : idx + 1}
            </div>
            <span className={`text-[10px] font-medium truncate ${
              isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-px ml-1 ${isCompleted ? 'bg-gray-900' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
