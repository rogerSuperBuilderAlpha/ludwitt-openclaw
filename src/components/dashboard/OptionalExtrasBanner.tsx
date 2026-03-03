'use client'

interface OptionalExtrasBannerProps {
  claudeCodeDone: boolean
  openclawDone: boolean
  onStartClaudeCode: () => void
  onStartOpenClaw: () => void
  onDismiss: () => void
}

export function OptionalExtrasBanner({
  claudeCodeDone,
  openclawDone,
  onStartClaudeCode,
  onStartOpenClaw,
  onDismiss,
}: OptionalExtrasBannerProps) {
  if (claudeCodeDone && openclawDone) return null

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-gray-400 text-sm shrink-0">Optional:</span>
        <div className="flex items-center gap-2 text-sm">
          {!claudeCodeDone && (
            <button
              onClick={onStartClaudeCode}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap"
            >
              Try Claude Code
            </button>
          )}
          {!claudeCodeDone && !openclawDone && (
            <span className="text-gray-300">|</span>
          )}
          {!openclawDone && (
            <button
              onClick={onStartOpenClaw}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap"
            >
              Try OpenClaw
            </button>
          )}
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        aria-label="Dismiss"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
