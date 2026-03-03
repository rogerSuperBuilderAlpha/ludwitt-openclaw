'use client'

import { CircleNotch } from '@phosphor-icons/react'

interface SynthesisStepProps {
  synthesis?: string
  recommendedNextSteps?: string[]
  references?: string[]
  isSynthesizing: boolean
  onSynthesize: () => void
  onExport: () => void
}

export function SynthesisStep({
  synthesis,
  recommendedNextSteps,
  references,
  isSynthesizing,
  onSynthesize,
  onExport,
}: SynthesisStepProps) {
  if (!synthesis && !isSynthesizing) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Ready to synthesize your findings into a narrative.</p>
        <button
          onClick={onSynthesize}
          disabled={isSynthesizing}
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isSynthesizing && <CircleNotch size={14} className="animate-spin" />}
          Generate Synthesis
        </button>
      </div>
    )
  }

  if (isSynthesizing) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <CircleNotch size={24} className="text-gray-400 animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Synthesizing findings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Synthesis</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{synthesis}</p>
        </div>
      </div>

      {recommendedNextSteps && recommendedNextSteps.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommended Next Steps</h4>
          <ul className="space-y-1">
            {recommendedNextSteps.map((step, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-gray-400 font-bold shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {references && references.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">References</h4>
          <ul className="space-y-0.5">
            {references.map((ref, i) => (
              <li key={i} className="text-xs text-gray-500">&bull; {ref}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onExport}
        className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Proceed to Export
      </button>
    </div>
  )
}
