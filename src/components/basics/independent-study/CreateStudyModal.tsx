/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

/**
 * CreateStudyModal Component
 * Multi-step modal for creating a new Independent Study topic
 * Asks clarifying questions to help refine the topic
 */

import { useState, useEffect, useRef } from 'react'
import {
  X,
  Sparkle,
  Lightning,
  Spinner,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Target,
  Clock,
  GraduationCap,
} from '@phosphor-icons/react'

interface CreateStudyModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateStudy: (topic: string) => Promise<void>
  isCreating: boolean
  isFreeCreation?: boolean // True if user completed prereqs (creation is free)
}

type Step = 'topic' | 'depth' | 'goal' | 'confirm'

const DEPTH_OPTIONS = [
  {
    id: 'intro',
    label: 'Introduction',
    description: "I'm new to this - start from basics",
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'I know the basics, go deeper',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'I want expert-level exploration',
  },
]

const GOAL_OPTIONS = [
  {
    id: 'understand',
    label: 'Conceptual Understanding',
    description: 'Understand the theory and ideas',
  },
  {
    id: 'apply',
    label: 'Practical Application',
    description: 'Learn to apply it to real problems',
  },
  {
    id: 'create',
    label: 'Creative Projects',
    description: 'Build or create something with it',
  },
  {
    id: 'debate',
    label: 'Critical Analysis',
    description: 'Analyze, critique, and debate ideas',
  },
]

const EXAMPLE_TOPICS = [
  'Quantum computing',
  'Philosophy of consciousness',
  'Game theory in economics',
  'Constitutional law',
  'Music theory and composition',
  'Machine learning algorithms',
]

export function CreateStudyModal({
  isOpen,
  onClose,
  onCreateStudy,
  isCreating,
  isFreeCreation = false,
}: CreateStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [step, setStep] = useState<Step>('topic')
  const [topic, setTopic] = useState('')
  const [depth, setDepth] = useState<string | null>(null)
  const [goal, setGoal] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const resetAndClose = () => {
    setStep('topic')
    setTopic('')
    setDepth(null)
    setGoal(null)
    setError(null)
    onClose()
  }

  const handleNext = () => {
    if (step === 'topic') {
      if (!topic.trim()) {
        setError('Please enter a topic')
        return
      }
      setError(null)
      setStep('depth')
    } else if (step === 'depth') {
      if (!depth) {
        setError('Please select a depth level')
        return
      }
      setError(null)
      setStep('goal')
    } else if (step === 'goal') {
      if (!goal) {
        setError('Please select a learning goal')
        return
      }
      setError(null)
      setStep('confirm')
    }
  }

  const handleBack = () => {
    setError(null)
    if (step === 'depth') setStep('topic')
    else if (step === 'goal') setStep('depth')
    else if (step === 'confirm') setStep('goal')
  }

  const handleSubmit = async () => {
    // Compose the full topic description
    const depthLabel = DEPTH_OPTIONS.find((d) => d.id === depth)?.label || ''
    const goalLabel = GOAL_OPTIONS.find((g) => g.id === goal)?.label || ''

    const fullDescription = `Topic: ${topic.trim()}
Depth: ${depthLabel} - ${DEPTH_OPTIONS.find((d) => d.id === depth)?.description || ''}
Goal: ${goalLabel} - ${GOAL_OPTIONS.find((g) => g.id === goal)?.description || ''}`

    setError(null)
    try {
      await onCreateStudy(fullDescription)
      resetAndClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create study')
    }
  }

  const handleExampleClick = (example: string) => {
    setTopic(example)
    setError(null)
  }

  const progressPercent =
    step === 'topic' ? 25 : step === 'depth' ? 50 : step === 'goal' ? 75 : 100

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement
    const focusModal = () => modalRef.current?.focus()
    const timeoutId = window.setTimeout(focusModal, 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-study-modal-title"
        tabIndex={-1}
        className="w-full max-w-xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex justify-between items-center"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          }}
        >
          <h2
            id="create-study-modal-title"
            className="text-lg font-bold text-white flex items-center gap-2"
          >
            <Sparkle size={20} weight="fill" />
            {step === 'topic' && 'What interests you?'}
            {step === 'depth' && 'How deep should we go?'}
            {step === 'goal' && "What's your goal?"}
            {step === 'confirm' && 'Ready to start!'}
          </h2>
          <button
            onClick={resetAndClose}
            disabled={isCreating}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Step 1: Topic */}
          {step === 'topic' && (
            <>
              <p className="text-gray-600">
                What subject or topic would you like to explore? Your AI tutor
                will customize the learning experience based on your answer.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter a topic, subject, or question
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value)
                    setError(null)
                  }}
                  placeholder="e.g., Quantum computing, Philosophy of mind, Game theory..."
                  disabled={isCreating}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 text-sm focus:border-amber-400 focus:outline-none transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              </div>

              {/* Quick Examples */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={16} className="text-amber-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Quick picks
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_TOPICS.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      disabled={isCreating}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 rounded-full text-xs text-gray-600 transition-colors cursor-pointer"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Depth */}
          {step === 'depth' && (
            <>
              <p className="text-gray-600">
                How much do you already know about{' '}
                <span className="font-semibold text-amber-600">{topic}</span>?
              </p>

              <div className="space-y-3">
                {DEPTH_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setDepth(option.id)
                      setError(null)
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-4 ${
                      depth === option.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        depth === option.id ? 'bg-amber-500' : 'bg-gray-100'
                      }`}
                    >
                      <GraduationCap
                        size={20}
                        className={
                          depth === option.id ? 'text-white' : 'text-gray-500'
                        }
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Goal */}
          {step === 'goal' && (
            <>
              <p className="text-gray-600">
                What do you want to achieve with this study?
              </p>

              <div className="space-y-3">
                {GOAL_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setGoal(option.id)
                      setError(null)
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-4 ${
                      goal === option.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        goal === option.id ? 'bg-amber-500' : 'bg-gray-100'
                      }`}
                    >
                      <Target
                        size={20}
                        className={
                          goal === option.id ? 'text-white' : 'text-gray-500'
                        }
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 4: Confirm */}
          {step === 'confirm' && (
            <>
              <p className="text-gray-600">
                Here&apos;s what your AI tutor will prepare for you:
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-4">
                <div>
                  <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
                    Topic
                  </div>
                  <div className="font-semibold text-gray-800">{topic}</div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
                      Depth
                    </div>
                    <div className="font-medium text-gray-700">
                      {DEPTH_OPTIONS.find((d) => d.id === depth)?.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
                      Goal
                    </div>
                    <div className="font-medium text-gray-700">
                      {GOAL_OPTIONS.find((g) => g.id === goal)?.label}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                <span>Your tutor will adapt to your pace as you learn</span>
              </div>

              {/* Free creation badge for those who completed prereqs */}
              {isFreeCreation && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <Sparkle size={16} weight="fill" />
                  <span>
                    Study creation is <strong>free</strong> because you
                    completed the curriculum!
                  </span>
                </div>
              )}

              {!isFreeCreation && (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <Lightning size={16} />
                  <span>
                    AI usage during study sessions is charged per message
                  </span>
                </div>
              )}
            </>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            {step !== 'topic' && (
              <button
                onClick={handleBack}
                disabled={isCreating}
                className="px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}

            {step === 'topic' && (
              <button
                onClick={resetAndClose}
                disabled={isCreating}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step !== 'confirm' ? (
              <button
                onClick={handleNext}
                disabled={isCreating}
                className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer bg-amber-500 text-white hover:bg-amber-600"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isCreating}
                className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isCreating
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isCreating ? (
                  <>
                    <Spinner size={18} className="animate-spin" />
                    Creating your study...
                  </>
                ) : (
                  <>
                    <Lightning size={18} weight="fill" />
                    Start Learning
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
