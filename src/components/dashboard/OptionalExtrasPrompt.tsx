'use client'

interface OptionalExtrasPromptProps {
  onStartClaudeCode: () => void
  onStartOpenClaw: () => void
  onSkip: () => void
}

export function OptionalExtrasPrompt({
  onStartClaudeCode,
  onStartOpenClaw,
  onSkip,
}: OptionalExtrasPromptProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Want to explore more AI tools?
        </h2>
        <p className="text-gray-600">
          You&apos;ve set up Cursor. Before building your website, you can
          optionally try these other tools. You can always come back to them
          later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
          <div className="text-3xl">&#129302;</div>
          <h3 className="text-lg font-semibold text-gray-900">Claude Code</h3>
          <p className="text-sm text-gray-600">
            A CLI AI agent that lives in your terminal. Build an automated tweet
            function and deploy it to Firebase.
          </p>
          <button
            onClick={onStartClaudeCode}
            className="w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Start Claude Code
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
          <div className="text-3xl">&#129408;</div>
          <h3 className="text-lg font-semibold text-gray-900">OpenClaw</h3>
          <p className="text-sm text-gray-600">
            An open-source AI agent platform. Command it to build a website and
            set up its own email inbox.
          </p>
          <button
            onClick={onStartOpenClaw}
            className="w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Start OpenClaw
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
        >
          Skip for now &mdash; Continue to Personal Website
        </button>
      </div>
    </div>
  )
}
