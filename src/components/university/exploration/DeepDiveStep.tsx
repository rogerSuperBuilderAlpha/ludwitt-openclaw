'use client'

import { CircleNotch, MagnifyingGlass, Check } from '@phosphor-icons/react'
import type { ExplorationResearchQuestion } from '@/lib/types/university'

interface DeepDiveStepProps {
  questions: ExplorationResearchQuestion[]
  onExplore: (questionIndex: number) => void
  isExploring: boolean
  onSynthesize: () => void
}

export function DeepDiveStep({ questions, onExplore, isExploring, onSynthesize }: DeepDiveStepProps) {
  const exploredCount = questions.filter(q => q.deepDive).length
  const allExplored = exploredCount === questions.length

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Deep Dive</h3>
        <p className="text-xs text-gray-500">
          Explore each question in depth. {exploredCount}/{questions.length} explored.
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => {
          const explored = !!q.deepDive

          return (
            <div key={i} className={`border rounded-lg p-4 ${explored ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-gray-400 mt-0.5">{i + 1}.</span>
                  <p className="text-sm font-medium text-gray-900">{q.question}</p>
                </div>
                {explored ? (
                  <Check size={16} weight="bold" className="text-green-600 shrink-0" />
                ) : (
                  <button
                    onClick={() => onExplore(i)}
                    disabled={isExploring}
                    className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-lg hover:border-gray-400 disabled:opacity-50 shrink-0 transition-colors"
                  >
                    {isExploring ? <CircleNotch size={10} className="animate-spin" /> : <MagnifyingGlass size={10} />}
                    Explore
                  </button>
                )}
              </div>

              {explored && (
                <>
                  {q.keyFindings && q.keyFindings.length > 0 && (
                    <div className="mt-2">
                      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Key Findings</p>
                      <ul className="space-y-0.5">
                        {q.keyFindings.map((f, fi) => (
                          <li key={fi} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="text-gray-300 mt-0.5 shrink-0">&bull;</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {q.deepDive && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-4">
                      {q.deepDive}
                    </p>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {exploredCount > 0 && (
        <button
          onClick={onSynthesize}
          disabled={isExploring}
          className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {allExplored ? 'Synthesize Findings' : 'Synthesize (skip remaining)'}
        </button>
      )}
    </div>
  )
}
