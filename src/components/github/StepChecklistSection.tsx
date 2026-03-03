'use client'

import { useState } from 'react'
import { Step } from '@/data/steps/githubSetupSteps'
import { logger } from '@/lib/logger'

const colorClasses: Record<string, string> = {
  blue: 'border-blue-500 text-blue-600',
  green: 'border-green-500 text-green-600',
  purple: 'border-purple-500 text-purple-600',
  orange: 'border-orange-500 text-orange-600',
}

function getBorderClass(color: string) {
  return colorClasses[color]?.split(' ')[0] || ''
}

function getTextClass(color: string) {
  return colorClasses[color]?.split(' ')[1] || ''
}

const INFO_ICON_PATH =
  'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'

interface StepChecklistSectionProps {
  currentStep: Step | null
  completedSteps: Step[]
  checkedSteps: Record<string, boolean>
  githubUsername: string
  githubEmail: string
  onToggleStep: (stepId: string) => void
  onSetCheckedSteps: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
  onSetGithubUsername: React.Dispatch<React.SetStateAction<string>>
  onSetGithubEmail: React.Dispatch<React.SetStateAction<string>>
  onOpenPopup: (stepId: string) => void
  onShowCopyToast: () => void
}

export function StepChecklistSection({
  currentStep,
  completedSteps,
  checkedSteps,
  githubUsername,
  githubEmail,
  onToggleStep,
  onSetCheckedSteps,
  onSetGithubUsername,
  onSetGithubEmail,
  onOpenPopup,
  onShowCopyToast,
}: StepChecklistSectionProps) {
  const [showUsernameInput, setShowUsernameInput] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')

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

  const getPersonalizedCommand = (command: string) =>
    command
      .replace('{username}', githubUsername)
      .replace('{email}', githubEmail)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      onShowCopyToast()
    } catch (err) {
      logger.error('StepChecklistSection', 'Failed to copy', { error: err })
    }
  }

  const handleToggleStep = (stepId: string) => {
    const match = [currentStep, ...completedSteps].find((s) => s?.id === stepId)
    if (match?.needsUsername && stepId === 'step11') {
      setShowUsernameInput(!showUsernameInput)
      return
    }
    if (match?.needsEmail && stepId === 'step12') {
      setShowEmailInput(!showEmailInput)
      return
    }
    onToggleStep(stepId)
  }

  return (
    <>
      {/* Current Step */}
      {currentStep && (
        <div
          key={currentStep.id}
          className={`border-l-4 ${getBorderClass(currentStep.color)} bg-white pl-4 py-3 rounded-r-lg shadow-sm fade-in-scale`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={false}
              onChange={() => handleToggleStep(currentStep.id)}
              disabled={
                (currentStep.id === 'step13' && !githubUsername) ||
                (currentStep.id === 'step14' && !githubEmail)
              }
              className={`mt-1 w-4 h-4 cursor-pointer ${getTextClass(currentStep.color)} border-gray-300 rounded focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
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
              onClick={() => onOpenPopup(currentStep.id)}
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
                  d={INFO_ICON_PATH}
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
                  onSetGithubUsername(e.target.value)
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
                    onSetCheckedSteps((prev) => ({
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
                  onSetGithubEmail(e.target.value)
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
                    onSetCheckedSteps((prev) => ({
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
                  {(currentStep.needsUsername || currentStep.needsEmail) &&
                  currentStep.command
                    ? getPersonalizedCommand(currentStep.command)
                    : currentStep.command}
                </code>
                <button
                  onClick={() => {
                    if (!currentStep.command) return
                    const cmd =
                      currentStep.needsUsername || currentStep.needsEmail
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
      )}

      {/* Completed Steps */}
      {[...completedSteps].reverse().map((step, index) => (
        <div
          key={step.id}
          className={`border-l-4 ${getBorderClass(step.color)} bg-gray-50 pl-4 py-2 rounded-r-lg transition-all duration-700 ease-out`}
          style={{
            opacity: Math.max(0.3, 1 - index * 0.15),
            transform: `scale(${Math.max(0.95, 1 - index * 0.02)})`,
            transformOrigin: 'top center',
          }}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={true}
              onChange={() => handleToggleStep(step.id)}
              className={`mt-1 w-4 h-4 cursor-pointer ${getTextClass(step.color)} border-gray-300 rounded transition-all flex-shrink-0`}
            />
            <span className="text-gray-600 line-through flex-1 text-sm select-text">
              {step.text}
              {step.link && step.link.text}
            </span>
            <button
              onClick={() => onOpenPopup(step.id)}
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
                  d={INFO_ICON_PATH}
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
