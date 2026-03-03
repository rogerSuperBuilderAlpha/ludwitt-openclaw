'use client'

import { Step } from '@/data/steps/vercelDeploymentSteps'

interface StepDetailModalProps {
  openPopup: string
  allSteps: Step[]
  onClose: () => void
  onCopyToClipboard: (text: string) => Promise<void>
  showCopyToast: boolean
}

export function StepDetailModal({
  openPopup,
  allSteps,
  onClose,
  onCopyToClipboard,
  showCopyToast,
}: StepDetailModalProps) {
  const currentPopupStep = allSteps.find((s) => s.id === openPopup)

  return (
    <>
      {/* Popup Modal */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClose()
        }}
        role="button"
        tabIndex={0}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-900 px-6 py-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Step Details</h3>
                  <p className="text-sm text-white/70">
                    Here&apos;s what you need to do
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="flex items-start gap-4">
              <div className="w-1 bg-gray-900 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed text-base">
                  {currentPopupStep?.details}
                </p>
              </div>
            </div>

            {/* Copy to LLM section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-xs text-blue-900">
                  <strong>Need more help?</strong> Copy this step&apos;s
                  instructions and paste them into ChatGPT, Claude, or your
                  favorite AI assistant for more detailed guidance!
                </p>
              </div>
              <button
                onClick={() => {
                  if (!currentPopupStep) return
                  const fullText = `Step: ${currentPopupStep.text}${currentPopupStep.link ? currentPopupStep.link.text : ''}\n\nDetails: ${currentPopupStep.details}`
                  onCopyToClipboard(fullText)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Instructions for AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showCopyToast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in z-50">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">Copied to clipboard!</span>
        </div>
      )}
    </>
  )
}
