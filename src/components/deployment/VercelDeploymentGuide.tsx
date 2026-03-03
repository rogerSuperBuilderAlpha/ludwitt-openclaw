'use client'

import { InfoBox } from '@/components/ui/InfoBox'
import { useVercelProgress } from '@/lib/hooks/useVercelProgress'
import { StepDetailModal } from '@/components/deployment/StepDetailModal'
import { StepChecklistContainer } from '@/components/deployment/StepChecklistContainer'
import { VercelURLVerificationForm } from '@/components/deployment/VercelURLVerificationForm'

interface VercelDeploymentGuideProps {
  onProgressChange?: (current: number, total: number) => void
  postVercelSurveyComplete?: boolean
  onContinue?: () => void
  onComplete?: () => void
}

export function VercelDeploymentGuide({
  onProgressChange,
  postVercelSurveyComplete = false,
  onContinue,
  onComplete,
}: VercelDeploymentGuideProps = {}) {
  const {
    user,
    expanded,
    setExpanded,
    checkedSteps,
    openPopup,
    setOpenPopup,
    vercelUrl,
    setVercelUrl,
    isVerifying,
    error,
    success,
    isCompleting,
    showCopyToast,
    allSteps,
    completedSteps,
    currentStep,
    allStepsChecked,
    toggleStep,
    copyToClipboard,
    handleVerify,
    handleManualComplete,
    clearProgress,
  } = useVercelProgress({ onProgressChange, onComplete })

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Success Message - Show at TOP when complete */}
      {expanded && success && (
        <SuccessBanner
          vercelUrl={vercelUrl}
          postVercelSurveyComplete={postVercelSurveyComplete}
          onCollapse={() => setExpanded(false)}
        />
      )}

      {/* Expanded Checklist */}
      <StepChecklistContainer
        expanded={expanded}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onToggleStep={toggleStep}
        onOpenPopup={setOpenPopup}
      />

      {/* Vercel URL Submission - Show when all steps are checked */}
      {expanded && allStepsChecked && !success && (
        <VercelURLVerificationForm
          vercelUrl={vercelUrl}
          onVercelUrlChange={setVercelUrl}
          error={error}
          isVerifying={isVerifying}
          isCompleting={isCompleting}
          onVerify={handleVerify}
          onManualComplete={handleManualComplete}
        />
      )}

      {/* Toggle Button and Reset (stays at bottom) */}
      <div className="relative flex flex-col items-center gap-4 w-full">
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full flex items-center justify-center gap-3 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-semibold tracking-tight">
              Deploy to Vercel
            </span>
          </button>
        )}

        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
          >
            &larr; Back
          </button>
        )}

        {expanded && user && Object.keys(checkedSteps).length > 0 && (
          <button
            onClick={clearProgress}
            className="absolute right-0 top-0 text-xs text-gray-500 hover:text-red-600 transition-colors"
            title="Reset progress"
          >
            Reset Progress
          </button>
        )}
      </div>

      {/* Popup Modal */}
      {openPopup && (
        <StepDetailModal
          openPopup={openPopup}
          allSteps={allSteps}
          onClose={() => setOpenPopup(null)}
          onCopyToClipboard={copyToClipboard}
          showCopyToast={showCopyToast}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  SuccessBanner — inline sub-component (only used by this file)     */
/* ------------------------------------------------------------------ */

interface SuccessBannerProps {
  vercelUrl: string
  postVercelSurveyComplete: boolean
  onCollapse: () => void
}

function SuccessBanner({
  vercelUrl,
  postVercelSurveyComplete,
  onCollapse,
}: SuccessBannerProps) {
  return (
    <InfoBox
      color="green"
      title="Deployment Verified!"
      size="lg"
      className="text-center mb-6"
    >
      <p className="text-sm mb-4">Your site is live and accessible!</p>
      {vercelUrl && (
        <a
          href={
            vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:underline text-sm font-medium mb-4"
        >
          Visit Your Site &rarr;
        </a>
      )}

      {/* Post-Vercel Survey Status */}
      <div className="mt-4 pt-4 border-t border-green-200">
        {postVercelSurveyComplete ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Survey Complete!</span>
            </div>
            <p className="text-sm text-green-800 mb-3">
              Great job! Now let&apos;s create your Loom showcase video.
            </p>
            <p className="text-xs text-gray-600 mb-3">
              The Loom guide will appear automatically. If it doesn&apos;t,
              click below.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-700 mb-2">
              Please complete the survey below to continue
            </p>
            <button
              onClick={onCollapse}
              className="w-full bg-purple-600 text-white text-sm font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Close &amp; Continue to Survey &rarr;
            </button>
          </div>
        )}
      </div>
    </InfoBox>
  )
}
