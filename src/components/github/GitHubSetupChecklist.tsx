'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { githubSetupSteps } from '@/data/steps/githubSetupSteps'
import { User } from 'firebase/auth'
import { Github } from 'lucide-react'
import { logger } from '@/lib/logger'
import { useDualStorageProgress } from '@/lib/hooks/useDualStorageProgress'
import { GithubLinkingButton } from '@/components/github/GithubLinkingButton'
import { StepChecklistSection } from '@/components/github/StepChecklistSection'

const allSteps = githubSetupSteps

interface GitHubSetupChecklistProps {
  userId?: string
  user?: User | null
  onProgressChange?: (current: number, total: number) => void
  onGithubLinked?: () => void
}

export function GitHubSetupChecklist({
  userId,
  user,
  onProgressChange,
  onGithubLinked,
}: GitHubSetupChecklistProps) {
  const [expanded, setExpanded] = useState(true)
  const [openPopup, setOpenPopup] = useState<string | null>(null)
  const [showCopyToast, setShowCopyToast] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    checkedSteps,
    githubUsername,
    githubEmail,
    loading,
    setCheckedSteps,
    setGithubUsername,
    setGithubEmail,
    clearProgress,
  } = useDualStorageProgress(userId)

  // Report progress whenever checkedSteps changes
  useEffect(() => {
    if (onProgressChange) {
      const completedCount = Object.values(checkedSteps).filter(Boolean).length
      onProgressChange(completedCount, allSteps.length)
    }
  }, [checkedSteps, onProgressChange])

  // Derived state
  const completedSteps = allSteps.filter((step) => checkedSteps[step.id])
  const currentStepIndex = allSteps.findIndex((step) => !checkedSteps[step.id])
  const currentStep =
    currentStepIndex !== -1 ? allSteps[currentStepIndex] : null
  const allComplete = currentStepIndex === -1

  // Keep the current step visible at the top
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [currentStep?.id])

  const toggleStep = useCallback(
    (stepId: string) => {
      setCheckedSteps((prev) => ({
        ...prev,
        [stepId]: !prev[stepId],
      }))
    },
    [setCheckedSteps]
  )

  const handleShowCopyToast = useCallback(() => {
    setShowCopyToast(true)
    setTimeout(() => setShowCopyToast(false), 3000)
  }, [])

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        handleShowCopyToast()
      } catch (err) {
        logger.error('GitHubSetupChecklist', 'Failed to copy', { error: err })
      }
    },
    [handleShowCopyToast]
  )

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your progress...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Github className="w-8 h-8" />
          <h2 className="text-2xl font-bold">GitHub Setup</h2>
        </div>
        <p className="text-gray-300 text-sm">
          Let&apos;s set up your GitHub account - the platform where developers
          store and share code.
        </p>
        <div className="mt-4 bg-white/10 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">
              {completedSteps.length} / {allSteps.length}
            </span>
          </div>
          <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-500"
              style={{
                width: `${(completedSteps.length / allSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div
        ref={containerRef}
        className={`pb-6 overflow-hidden scrollbar-hide relative transition-all duration-700 ease-in-out ${
          expanded
            ? 'max-h-[500px] mb-8 opacity-100 overflow-y-auto'
            : 'max-h-0 mb-0 opacity-0'
        }`}
      >
        {expanded && (
          <div className="space-y-3 text-left">
            {allComplete && (
              <GithubLinkingButton
                user={user}
                onGithubLinked={onGithubLinked}
              />
            )}

            <StepChecklistSection
              currentStep={currentStep}
              completedSteps={completedSteps}
              checkedSteps={checkedSteps}
              githubUsername={githubUsername}
              githubEmail={githubEmail}
              onToggleStep={toggleStep}
              onSetCheckedSteps={setCheckedSteps}
              onSetGithubUsername={setGithubUsername}
              onSetGithubEmail={setGithubEmail}
              onOpenPopup={setOpenPopup}
              onShowCopyToast={handleShowCopyToast}
            />
          </div>
        )}
      </div>

      {/* Toggle Button and Reset */}
      <div className="relative flex items-center justify-center gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
        >
          {expanded ? '\u2190 Hide Steps' : 'Show Steps'}
        </button>
        {Object.keys(checkedSteps).length > 0 && (
          <button
            onClick={clearProgress}
            className="absolute right-0 text-xs text-gray-500 hover:text-red-600 transition-colors"
            title="Reset progress"
          >
            Reset Progress
          </button>
        )}
      </div>

      {/* Popup Modal */}
      {openPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setOpenPopup(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpenPopup(null)
          }}
          role="button"
          tabIndex={0}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Step Details
              </h3>
              <button
                onClick={() => setOpenPopup(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
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

            <p className="text-gray-700 leading-relaxed mb-4">
              {allSteps.find((s) => s.id === openPopup)?.details}
            </p>

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
                  const step = allSteps.find((s) => s.id === openPopup)
                  const fullText = `Step: ${step?.text}${step?.link ? step.link.text : ''}\n\nDetails: ${step?.details}`
                  copyToClipboard(fullText)
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
      )}

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
    </div>
  )
}

// Preserve default export for backward compatibility
