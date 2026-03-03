'use client'

import { Sparkles } from 'lucide-react'
import { Alert } from '@/components/ui/Alert'
import type { UnderstandingLevel } from '@/lib/hooks/useStreamingExplanation'

interface ProgressReportFormProps {
  understandingLevel: UnderstandingLevel
  whatTried: string
  progressReport: string
  isLoading: boolean
  error: string | null
  onUnderstandingLevelChange: (value: UnderstandingLevel) => void
  onWhatTriedChange: (value: string) => void
  onProgressReportChange: (value: string) => void
  onBack: () => void
  onSubmit: () => void
}

export function ProgressReportForm({
  understandingLevel,
  whatTried,
  progressReport,
  isLoading,
  error,
  onUnderstandingLevelChange,
  onWhatTriedChange,
  onProgressReportChange,
  onBack,
  onSubmit,
}: ProgressReportFormProps) {
  return (
    <div className="space-y-4">
      <Alert type="info">
        <h4 className="font-semibold text-sm mb-2">
          Before getting help, tell us about your progress:
        </h4>
        <p className="text-xs">
          The more effort you show, the fewer points it will cost (1-10 XP).
        </p>
      </Alert>

      {/* Understanding Level */}
      <div>
        <label
          htmlFor="understanding-confused"
          className="block text-sm font-medium b-text-secondary mb-2"
        >
          Where are you stuck?
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 p-3 b-bg-card rounded-lg border b-border cursor-pointer hover:b-border-logic transition-colors">
            <input
              id="understanding-confused"
              type="radio"
              name="understanding"
              value="confused"
              checked={understandingLevel === 'confused'}
              onChange={(e) =>
                onUnderstandingLevelChange(e.target.value as UnderstandingLevel)
              }
              className="text-b-logic"
            />
            <span className="text-sm b-text-secondary">
              I don&apos;t understand the problem at all
            </span>
          </label>
          <label className="flex items-center gap-2 p-3 b-bg-card rounded-lg border b-border cursor-pointer hover:b-border-logic transition-colors">
            <input
              type="radio"
              name="understanding"
              value="partial"
              checked={understandingLevel === 'partial'}
              onChange={(e) =>
                onUnderstandingLevelChange(e.target.value as UnderstandingLevel)
              }
              className="text-b-logic"
            />
            <span className="text-sm b-text-secondary">
              I understand part of it but need help with a step
            </span>
          </label>
          <label className="flex items-center gap-2 p-3 b-bg-card rounded-lg border b-border cursor-pointer hover:b-border-logic transition-colors">
            <input
              type="radio"
              name="understanding"
              value="stuck"
              checked={understandingLevel === 'stuck'}
              onChange={(e) =>
                onUnderstandingLevelChange(e.target.value as UnderstandingLevel)
              }
              className="text-b-logic"
            />
            <span className="text-sm b-text-secondary">
              I tried solving it but got stuck
            </span>
          </label>
        </div>
      </div>

      {/* What they tried */}
      <div>
        <label
          htmlFor="what-tried"
          className="block text-sm font-medium b-text-secondary mb-2"
        >
          What have you tried so far? *
        </label>
        <textarea
          id="what-tried"
          value={whatTried}
          onChange={(e) => onWhatTriedChange(e.target.value)}
          placeholder="Example: I tried multiplying the numbers but got confused about the order..."
          className="w-full px-3 py-2 border b-border rounded-lg focus:ring-2 focus:ring-b-logic focus:border-transparent resize-none text-sm b-bg-card"
          rows={3}
          required
        />
      </div>

      {/* Progress report */}
      <div>
        <label
          htmlFor="progress-report"
          className="block text-sm font-medium b-text-secondary mb-2"
        >
          Explain your current understanding: *
        </label>
        <textarea
          id="progress-report"
          value={progressReport}
          onChange={(e) => onProgressReportChange(e.target.value)}
          placeholder="Example: I know I need to find the area, and I think it involves multiplying, but I'm not sure which numbers to use..."
          className="w-full px-3 py-2 border b-border rounded-lg focus:ring-2 focus:ring-b-logic focus:border-transparent resize-none text-sm b-bg-card"
          rows={3}
          required
        />
      </div>

      {error && <Alert type="error">{error}</Alert>}

      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 b-bg-muted b-text-secondary py-3 px-6 rounded-lg hover:bg-b-border transition-all font-medium"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading || !progressReport.trim() || !whatTried.trim()}
          className="flex-1 b-btn b-btn-logic py-2.5 px-5 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Get Help
        </button>
      </div>
    </div>
  )
}
