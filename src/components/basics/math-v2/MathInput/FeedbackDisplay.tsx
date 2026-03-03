'use client'

import {
  CheckCircle,
  XCircle,
  Sparkle,
  Pencil,
  Lightbulb,
  ArrowRight,
  Star
} from '@phosphor-icons/react'

export interface AIFeedback {
  isCorrect: boolean
  xpEarned: number
  workBonus?: {
    bonus: number
    feedback: string
    improvements?: string[]
    whatWentWell?: string | null
  }
  // Enhanced feedback fields
  summary?: string
  whatWentWell?: string | null
  improvements?: string[]
  nextTimeAdvice?: string | null
  alternativeApproach?: string | null
  scores?: {
    logicalProgression: number
    mathematicalAccuracy: number
    completeness: number
    clarity: number
  }
}

interface FeedbackDisplayProps {
  feedback: AIFeedback
  onContinue?: () => void
}

export function FeedbackDisplay({ feedback, onContinue }: FeedbackDisplayProps) {
  const isCorrect = feedback.isCorrect
  const hasWorkFeedback = feedback.workBonus || feedback.whatWentWell || feedback.improvements?.length

  return (
    <div className={`rounded-xl border-2 overflow-hidden animate-in slide-in-from-bottom-2 duration-300 ${
      isCorrect
        ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white'
        : 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'
    }`}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center gap-3 ${
        isCorrect ? 'bg-emerald-100' : 'bg-amber-100'
      }`}>
        {isCorrect ? (
          <CheckCircle size={28} weight="fill" className="text-emerald-600" />
        ) : (
          <XCircle size={28} weight="fill" className="text-amber-600" />
        )}
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${isCorrect ? 'text-emerald-800' : 'text-amber-800'}`}>
            {isCorrect ? 'Correct!' : 'Not quite right'}
          </h3>
          {feedback.xpEarned > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Star size={14} weight="fill" className="text-amber-500" />
              <span className={isCorrect ? 'text-emerald-700' : 'text-amber-700'}>
                +{feedback.xpEarned} XP earned
                {feedback.workBonus && feedback.workBonus.bonus > 0 && (
                  <span className="text-emerald-600 font-medium"> (includes +{feedback.workBonus.bonus} work bonus!)</span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Content */}
      <div className="p-4 space-y-4">
        {/* Summary feedback */}
        {feedback.summary && (
          <p className="text-gray-700">{feedback.summary}</p>
        )}

        {/* What went well */}
        {feedback.whatWentWell && (
          <div className="flex gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <Sparkle size={20} weight="fill" className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-800 mb-0.5">What you did well</p>
              <p className="text-sm text-emerald-700">{feedback.whatWentWell}</p>
            </div>
          </div>
        )}

        {/* Work feedback */}
        {feedback.workBonus?.feedback && (
          <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Pencil size={20} weight="fill" className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800 mb-0.5">Your work</p>
              <p className="text-sm text-blue-700">{feedback.workBonus.feedback}</p>
            </div>
          </div>
        )}

        {/* Improvements */}
        {feedback.improvements && feedback.improvements.length > 0 && (
          <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <Lightbulb size={20} weight="fill" className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1.5">Tips to improve</p>
              <ul className="space-y-1">
                {feedback.improvements.map((tip, i) => (
                  <li key={i} className="text-sm text-amber-700 flex gap-2">
                    <span className="text-amber-400">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Next time advice */}
        {feedback.nextTimeAdvice && (
          <div className="flex gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <ArrowRight size={20} weight="bold" className="text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-800 mb-0.5">Next time</p>
              <p className="text-sm text-purple-700">{feedback.nextTimeAdvice}</p>
            </div>
          </div>
        )}

        {/* Alternative approach */}
        {feedback.alternativeApproach && (
          <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Sparkle size={20} weight="duotone" className="text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-0.5">Alternative approach</p>
              <p className="text-sm text-gray-600">{feedback.alternativeApproach}</p>
            </div>
          </div>
        )}

        {/* Work quality scores */}
        {feedback.scores && hasWorkFeedback && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Work Quality Breakdown</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Logic', score: feedback.scores.logicalProgression, max: 3 },
                { label: 'Accuracy', score: feedback.scores.mathematicalAccuracy, max: 3 },
                { label: 'Completeness', score: feedback.scores.completeness, max: 2 },
                { label: 'Clarity', score: feedback.scores.clarity, max: 2 },
              ].map(({ label, score, max }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-20">{label}</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(score / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{score}/{max}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue button */}
        {onContinue && (
          <button
            onClick={onContinue}
            className="w-full mt-2 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <ArrowRight size={18} weight="bold" />
          </button>
        )}
      </div>
    </div>
  )
}
