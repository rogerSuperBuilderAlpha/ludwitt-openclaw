'use client'

import { Sparkles, X } from 'lucide-react'
import { Alert } from '@/components/ui/Alert'
import { useStreamingExplanation } from '@/lib/hooks/useStreamingExplanation'
import { ProgressReportForm } from '@/components/basics/ai-explanation/ProgressReportForm'
import { CostInfoDisplay } from '@/components/basics/ai-explanation/CostInfoDisplay'

interface AIExplanationProps {
  problemText: string
  problemId: string
  subject: string
  difficulty: number
  currentAnswer?: string
  onClose: () => void
  onXpSpent?: (amount: number) => void
  onCreditsUsed?: () => void
}

export function AIExplanation({
  problemText,
  problemId,
  subject,
  difficulty,
  currentAnswer,
  onClose,
  onXpSpent,
  onCreditsUsed,
}: AIExplanationProps) {
  const {
    explanation,
    isLoading,
    error,
    hasRequested,
    actualCostCharged,
    newBalance,
    usageInfo,
    loadedFromStorage,
    progressReport,
    whatTried,
    understandingLevel,
    showProgressForm,
    setProgressReport,
    setWhatTried,
    setUnderstandingLevel,
    setShowProgressForm,
    setError,
    handleRequestExplanation,
  } = useStreamingExplanation({
    problemId,
    problemText,
    subject,
    difficulty,
    currentAnswer,
    onXpSpent,
    onCreditsUsed,
  })

  return (
    <div className="b-bg-muted border b-border rounded-lg p-6 space-y-4 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--b-logic)' }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold b-text-primary">AI Tutor</h3>
            <p className="text-xs b-text-secondary">
              Get a personalized explanation
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="b-text-muted hover:b-text-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      {!hasRequested ? (
        <div className="space-y-4">
          {!showProgressForm ? (
            <>
              <div className="b-bg-card rounded-lg p-4 border b-border-logic">
                <p className="text-sm b-text-secondary">
                  Get a personalized, step-by-step explanation from our AI
                  tutor. The AI will break down the problem and help you
                  understand the concept.
                </p>
                <Alert type="warning" className="mt-3">
                  <span className="font-bold">Cost:</span> 1-10 XP (based on
                  your effort shown)
                </Alert>
              </div>
              <button
                onClick={() => setShowProgressForm(true)}
                className="w-full b-btn b-btn-logic py-2.5 px-5 font-medium flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Request AI Help
              </button>
            </>
          ) : (
            <ProgressReportForm
              understandingLevel={understandingLevel}
              whatTried={whatTried}
              progressReport={progressReport}
              isLoading={isLoading}
              error={error}
              onUnderstandingLevelChange={setUnderstandingLevel}
              onWhatTriedChange={setWhatTried}
              onProgressReportChange={setProgressReport}
              onBack={() => {
                setShowProgressForm(false)
                setError(null)
              }}
              onSubmit={handleRequestExplanation}
            />
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {error ? (
            <Alert type="error">{error}</Alert>
          ) : (
            <>
              <div className="b-bg-card rounded-lg p-4 border b-border-logic min-h-[120px]">
                {explanation ? (
                  <p className="text-sm b-text-primary leading-relaxed whitespace-pre-wrap">
                    {explanation}
                  </p>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-b-logic"></div>
                    <p className="text-sm b-text-secondary">
                      Generating explanation...
                    </p>
                  </div>
                )}
              </div>

              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-xs text-b-logic">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 b-bg-logic rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 b-bg-logic rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 b-bg-logic rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                  </div>
                  <span>AI is thinking...</span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Footer: cost and usage info */}
      {!error && hasRequested && (
        <CostInfoDisplay
          actualCostCharged={actualCostCharged}
          newBalance={newBalance}
          usageInfo={usageInfo}
          loadedFromStorage={loadedFromStorage}
        />
      )}
    </div>
  )
}

// Preserve backward compatibility for existing default imports
