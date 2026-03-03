'use client'

import { useState } from 'react'
import { CustomerDocument } from '@/lib/types/customer'

type DocumentKanbanProgressProps = {
  status: CustomerDocument['status']
  size?: 'sm' | 'md'
  showTooltips?: boolean
}

const stages = [
  {
    key: 'pending',
    label: 'Pending',
    color: 'bg-amber-500',
    tooltip: 'Waiting for your approval',
    yourAction: 'Approve to start development',
  },
  {
    key: 'approved',
    label: 'Approved',
    color: 'bg-blue-500',
    tooltip: 'Developer has been notified',
    yourAction: 'Sit back - developer is reviewing',
  },
  {
    key: 'in-progress',
    label: 'In Progress',
    color: 'bg-purple-500',
    tooltip: 'Developer is actively working',
    yourAction: 'Check back for updates',
  },
  {
    key: 'completed',
    label: 'Review',
    color: 'bg-orange-500',
    tooltip: 'Work is complete',
    yourAction: 'Review and accept the work',
  },
  {
    key: 'accepted',
    label: 'Done',
    color: 'bg-green-500',
    tooltip: 'Iteration complete!',
    yourAction: 'Start your next iteration',
  },
] as const

function getActiveStageIndex(status: CustomerDocument['status']): number {
  const index = stages.findIndex((s) => s.key === status)
  return index === -1 ? 0 : index
}

export function DocumentKanbanProgress({
  status,
  size = 'md',
  showTooltips = true,
}: DocumentKanbanProgressProps) {
  const activeIndex = getActiveStageIndex(status)
  const isSmall = size === 'sm'
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const currentStage = stages[activeIndex]

  return (
    <div className="w-full">
      {/* Progress Bar with Notches */}
      <div className="relative">
        {/* Background bar */}
        <div
          className={`w-full bg-gray-200 rounded-full ${isSmall ? 'h-1.5' : 'h-2'}`}
        >
          {/* Filled progress */}
          <div
            className={`${stages[activeIndex].color} ${isSmall ? 'h-1.5' : 'h-2'} rounded-full transition-all duration-500`}
            style={{ width: `${((activeIndex + 1) / stages.length) * 100}%` }}
          />
        </div>

        {/* Notches */}
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {stages.map((stage, index) => {
            const isActive = index <= activeIndex
            const isCurrent = index === activeIndex
            const isHovered = hoveredIndex === index

            return (
              <div
                key={stage.key}
                className="relative flex flex-col items-center group"
                onMouseEnter={() => showTooltips && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {showTooltips && isHovered && !isSmall && (
                  <div className="absolute bottom-full mb-2 z-10 animate-in fade-in slide-in-from-bottom-1 duration-150">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                      <p className="font-medium">{stage.tooltip}</p>
                      <p className="text-gray-300 mt-0.5">{stage.yourAction}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                )}

                {/* Notch circle */}
                <div
                  className={`
                    ${isSmall ? 'w-3 h-3' : 'w-4 h-4'}
                    rounded-full border-2 transition-all duration-300 cursor-pointer
                    ${
                      isActive
                        ? `${stage.color} border-white shadow-sm`
                        : 'bg-white border-gray-300'
                    }
                    ${isCurrent ? 'ring-2 ring-offset-1 ring-opacity-50' : ''}
                    ${isCurrent && stage.color.replace('bg-', 'ring-')}
                    ${!isSmall && 'hover:scale-110'}
                  `}
                />

                {/* Label below (only show for md size) */}
                {!isSmall && (
                  <div
                    className={`
                    absolute top-5 text-xs whitespace-nowrap transition-colors
                    ${isActive ? 'text-gray-700 font-medium' : 'text-gray-400'}
                    ${isCurrent ? 'font-bold' : ''}
                  `}
                  >
                    {stage.label}
                    {isCurrent && (
                      <span className="ml-1 text-[10px] opacity-75">
                        ← You&apos;re here
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Add spacing for labels on md size */}
      {!isSmall && <div className="h-6" />}

      {/* Current stage action hint (for md size only) */}
      {!isSmall && (
        <div className="mt-2 flex items-center justify-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${
              currentStage.key === 'pending' || currentStage.key === 'completed'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            {(currentStage.key === 'pending' ||
              currentStage.key === 'completed') && (
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            )}
            {currentStage.yourAction}
          </span>
        </div>
      )}
    </div>
  )
}
