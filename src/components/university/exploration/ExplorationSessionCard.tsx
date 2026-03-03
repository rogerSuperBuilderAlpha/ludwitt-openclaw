'use client'

import { MagnifyingGlass, Check, Clock } from '@phosphor-icons/react'
import type { ExplorationSession } from '@/lib/types/university'

interface ExplorationSessionCardProps {
  session: ExplorationSession
  onClick: () => void
}

const STEP_LABELS: Record<string, string> = {
  'define-topic': 'Defining Topic',
  'research-questions': 'Research Questions',
  'deep-dive': 'Deep Dive',
  'synthesize': 'Synthesis',
  'export': 'Export Ready',
}

export function ExplorationSessionCard({ session, onClick }: ExplorationSessionCardProps) {
  const isCompleted = session.status === 'completed'
  const date = new Date(session.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            isCompleted ? 'bg-green-50' : 'bg-gray-100'
          }`}>
            {isCompleted
              ? <Check size={14} weight="bold" className="text-green-600" />
              : <MagnifyingGlass size={14} className="text-gray-500" />
            }
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{session.topic}</p>
            {session.scope && (
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{session.scope}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-400">{date}</span>
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                isCompleted ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {isCompleted ? <Check size={8} weight="bold" /> : <Clock size={8} />}
                {isCompleted ? 'Completed' : STEP_LABELS[session.currentStep] || session.currentStep}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
