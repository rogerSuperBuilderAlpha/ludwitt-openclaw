'use client'

interface VercelURLVerificationFormProps {
  vercelUrl: string
  onVercelUrlChange: (url: string) => void
  error: string
  isVerifying: boolean
  isCompleting: boolean
  onVerify: () => void
  onManualComplete: () => void
}

export function VercelURLVerificationForm({
  vercelUrl,
  onVercelUrlChange,
  error,
  isVerifying,
  isCompleting,
  onVerify,
  onManualComplete,
}: VercelURLVerificationFormProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 mb-6">
      <h3 className="font-semibold text-gray-900 text-center">
        Verify Your Vercel Deployment
      </h3>
      <p className="text-sm text-gray-700 text-center">
        Paste your Vercel deployment URL below to complete this step!
      </p>
      <div className="space-y-3">
        <input
          type="url"
          value={vercelUrl}
          onChange={(e) => onVercelUrlChange(e.target.value)}
          placeholder="https://your-project.vercel.app"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
          onKeyPress={(e) => e.key === 'Enter' && onVerify()}
        />
        {error && <p className="text-red-600 text-xs">{error}</p>}
        <button
          onClick={onVerify}
          disabled={!vercelUrl.trim() || isVerifying}
          className="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Verifying...
            </span>
          ) : (
            'Verify Deployment'
          )}
        </button>
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2 text-center">
            Having trouble verifying or the unlock isn&apos;t appearing?
          </p>
          <button
            onClick={onManualComplete}
            disabled={isCompleting}
            className="w-full font-semibold py-2.5 px-4 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isCompleting ? 'Completing...' : 'Mark Vercel as Complete'}
          </button>
          <p className="text-[11px] text-gray-500 mt-2 text-center">
            This will mark Vercel as complete and unlock your dashboard.
          </p>
        </div>
      </div>
      <div className="bg-blue-50 border border-gray-200 rounded p-3 text-xs text-blue-900">
        <p className="font-semibold mb-1">Pro Tip:</p>
        <p>
          After deploying on Vercel, copy the deployment URL from your
          dashboard. It should end with .vercel.app
        </p>
      </div>
    </div>
  )
}
