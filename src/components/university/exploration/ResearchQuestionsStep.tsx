'use client'

import type { ExplorationResearchQuestion } from '@/lib/types/university'

interface ResearchQuestionsStepProps {
  questions: ExplorationResearchQuestion[]
  onProceed: () => void
}

export function ResearchQuestionsStep({ questions, onProceed }: ResearchQuestionsStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Research Questions</h3>
        <p className="text-xs text-gray-500">
          AI generated {questions.length} research questions. Proceed to explore each one in depth.
        </p>
      </div>

      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold text-gray-400 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-gray-900">{q.question}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onProceed}
        className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Start Deep Dives
      </button>
    </div>
  )
}
