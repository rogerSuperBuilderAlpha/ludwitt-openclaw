'use client'

import { useState, useEffect, useRef } from 'react'
import { githubSetupSteps } from '@/data/steps/githubSetupSteps'
import { logger } from '@/lib/logger'

const allSteps = githubSetupSteps

const colorClasses = {
  blue: 'border-blue-500 text-blue-600',
  green: 'border-green-500 text-green-600',
  purple: 'border-purple-500 text-purple-600',
  orange: 'border-orange-500 text-orange-600',
}

export function GitHubSetupGuide() {
  const [expanded, setExpanded] = useState(false)
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({})
  const [openPopup, setOpenPopup] = useState<string | null>(null)
  const [githubUsername, setGithubUsername] = useState('')
  const [githubEmail, setGithubEmail] = useState('')
  const [showUsernameInput, setShowUsernameInput] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('github-setup-progress')
    const savedUsername = localStorage.getItem('github-username')
    const savedEmail = localStorage.getItem('github-email')

    if (savedProgress) {
      try {
        setCheckedSteps(JSON.parse(savedProgress))
      } catch (error) {
        logger.error(
          'GitHubSetupGuide',
          'Failed to load GitHub setup progress',
          { error }
        )
      }
    }

    if (savedUsername) setGithubUsername(savedUsername)
    if (savedEmail) setGithubEmail(savedEmail)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(checkedSteps).length > 0) {
      localStorage.setItem(
        'github-setup-progress',
        JSON.stringify(checkedSteps)
      )
      // Dispatch custom event to notify listeners of progress change
      window.dispatchEvent(new CustomEvent('github-setup-progress-changed'))
    }
  }, [checkedSteps])

  // Save username and email to localStorage
  useEffect(() => {
    if (githubUsername) {
      localStorage.setItem('github-username', githubUsername)
    }
  }, [githubUsername])

  useEffect(() => {
    if (githubEmail) {
      localStorage.setItem('github-email', githubEmail)
    }
  }, [githubEmail])

  const toggleStep = (stepId: string) => {
    const step = allSteps.find((s) => s.id === stepId)

    // If this step needs username or email, show the input
    if (step?.needsUsername && stepId === 'step11') {
      setShowUsernameInput(!showUsernameInput)
      return
    }

    if (step?.needsEmail && stepId === 'step12') {
      setShowEmailInput(!showEmailInput)
      return
    }

    setCheckedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }))
  }

  // Validate username (alphanumeric + hyphens only)
  const validateUsername = (username: string): boolean => {
    if (!username) {
      setUsernameError('Username is required')
      return false
    }
    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
      setUsernameError(
        'Username can only contain letters, numbers, and hyphens'
      )
      return false
    }
    if (username.length < 1 || username.length > 39) {
      setUsernameError('Username must be between 1 and 39 characters')
      return false
    }
    setUsernameError('')
    return true
  }

  // Validate email format
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    setEmailError('')
    return true
  }

  // Generate personalized command
  const getPersonalizedCommand = (command: string) => {
    return command
      .replace('{username}', githubUsername)
      .replace('{email}', githubEmail)
  }

  // Copy command to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 3000)
    } catch (err) {
      logger.error('GitHubSetupGuide', 'Failed to copy', { error: err })
    }
  }

  // Clear progress from localStorage (can be called when user logs in)
  const clearProgress = () => {
    localStorage.removeItem('github-setup-progress')
    localStorage.removeItem('github-username')
    localStorage.removeItem('github-email')
    setCheckedSteps({})
    setGithubUsername('')
    setGithubEmail('')
    setShowUsernameInput(false)
    setShowEmailInput(false)
  }

  // Find completed and current (next unchecked) steps
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

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Expanded Checklist */}
      <div
        ref={containerRef}
        className={`pb-6 overflow-hidden scrollbar-hide relative transition-all duration-700 ease-in-out ${
          expanded
            ? 'max-h-[400px] mb-8 opacity-100 overflow-y-auto'
            : 'max-h-0 mb-0 opacity-0'
        }`}
      >
        {expanded && (
          <div className="space-y-3 text-left">
            {/* Success Message - At top when all complete */}
            {allComplete && (
              <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 fade-in-scale">
                <p className="font-medium text-blue-900">
                  🎉 You&apos;re all set!
                </p>
                <p className="text-blue-800 mt-2">
                  Click the &quot;Continue with GitHub&quot; button below to
                  sign in.
                </p>
              </div>
            )}

            {/* Current Step (next unchecked) - Always at top */}
            {currentStep && (
              <>
                <div
                  key={currentStep.id}
                  className={`border-l-4 ${colorClasses[currentStep.color as keyof typeof colorClasses].split(' ')[0]} bg-white pl-4 py-3 rounded-r-lg shadow-sm fade-in-scale`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => toggleStep(currentStep.id)}
                      disabled={
                        (currentStep.id === 'step13' && !githubUsername) ||
                        (currentStep.id === 'step14' && !githubEmail)
                      }
                      className={`mt-1 w-4 h-4 cursor-pointer ${colorClasses[currentStep.color as keyof typeof colorClasses].split(' ')[1]} border-gray-300 rounded focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
                    />
                    <span className="text-gray-700 flex-1 select-text">
                      {currentStep.text}
                      {currentStep.link && (
                        <a
                          href={currentStep.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {currentStep.link.text}
                        </a>
                      )}
                    </span>
                    <button
                      onClick={() => setOpenPopup(currentStep.id)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors mt-1"
                      title="More info"
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Username Input for Step 11 */}
                  {currentStep.id === 'step11' && showUsernameInput && (
                    <div className="mt-3 ml-7 space-y-2">
                      <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => {
                          setGithubUsername(e.target.value)
                          // Clear error when user types
                          if (usernameError) setUsernameError('')
                        }}
                        placeholder="Enter your GitHub username"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-sm ${
                          usernameError
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-purple-500'
                        }`}
                      />
                      {usernameError && (
                        <p className="text-red-600 text-xs">{usernameError}</p>
                      )}
                      <button
                        onClick={() => {
                          if (validateUsername(githubUsername)) {
                            setCheckedSteps((prev) => ({
                              ...prev,
                              [currentStep.id]: true,
                            }))
                            setShowUsernameInput(false)
                          }
                        }}
                        disabled={!githubUsername}
                        className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        Save Username & Continue
                      </button>
                    </div>
                  )}

                  {/* Email Input for Step 12 */}
                  {currentStep.id === 'step12' && showEmailInput && (
                    <div className="mt-3 ml-7 space-y-2">
                      <input
                        type="email"
                        value={githubEmail}
                        onChange={(e) => {
                          setGithubEmail(e.target.value)
                          // Clear error when user types
                          if (emailError) setEmailError('')
                        }}
                        placeholder="Enter your GitHub email"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-sm ${
                          emailError
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-purple-500'
                        }`}
                      />
                      {emailError && (
                        <p className="text-red-600 text-xs">{emailError}</p>
                      )}
                      <button
                        onClick={() => {
                          if (validateEmail(githubEmail)) {
                            setCheckedSteps((prev) => ({
                              ...prev,
                              [currentStep.id]: true,
                            }))
                            setShowEmailInput(false)
                          }
                        }}
                        disabled={!githubEmail}
                        className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        Save Email & Continue
                      </button>
                    </div>
                  )}

                  {/* Command Display with Copy Button */}
                  {currentStep.command && (
                    <div className="mt-3 ml-7 bg-gray-900 rounded-lg p-3">
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-green-400 text-sm flex-1 font-mono break-all">
                          {(currentStep.needsUsername ||
                            currentStep.needsEmail) &&
                          currentStep.command
                            ? getPersonalizedCommand(currentStep.command)
                            : currentStep.command}
                        </code>
                        <button
                          onClick={() => {
                            if (!currentStep.command) return
                            const cmd =
                              currentStep.needsUsername ||
                              currentStep.needsEmail
                                ? getPersonalizedCommand(currentStep.command)
                                : currentStep.command
                            copyToClipboard(cmd)
                          }}
                          className="flex-shrink-0 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                          title="Copy command"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Completed Steps (most recent first, with progressive fade) */}
            {[...completedSteps].reverse().map((step, index) => {
              // Calculate opacity based on position (newer = more visible)
              const opacity = Math.max(0.3, 1 - index * 0.15)
              const scale = Math.max(0.95, 1 - index * 0.02)

              return (
                <div
                  key={step.id}
                  className={`border-l-4 ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[0]} bg-gray-50 pl-4 py-2 rounded-r-lg transition-all duration-700 ease-out`}
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => toggleStep(step.id)}
                      className={`mt-1 w-4 h-4 cursor-pointer ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} border-gray-300 rounded transition-all flex-shrink-0`}
                    />
                    <span className="text-gray-600 line-through flex-1 text-sm select-text">
                      {step.text}
                      {step.link && step.link.text}
                    </span>
                    <button
                      onClick={() => setOpenPopup(step.id)}
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors mt-1"
                      title="More info"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Toggle Button and Reset (stays at bottom) */}
      <div className="relative flex items-center justify-center gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
        >
          {expanded
            ? '← Back'
            : "Don't have GitHub? Click here for setup guide"}
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
                  <strong>💡 Need more help?</strong> Copy this step&apos;s
                  instructions and paste them into ChatGPT, Claude, or your
                  favorite AI assistant for more detailed guidance!
                </p>
              </div>
              <button
                onClick={() => {
                  const stepDetails = allSteps.find(
                    (s) => s.id === openPopup
                  )?.details
                  const stepText = allSteps.find(
                    (s) => s.id === openPopup
                  )?.text
                  const stepLink = allSteps.find(
                    (s) => s.id === openPopup
                  )?.link

                  const fullText = `Step: ${stepText}${stepLink ? stepLink.text : ''}\n\nDetails: ${stepDetails}`
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
