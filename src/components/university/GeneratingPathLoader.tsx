'use client'

import { useState, useEffect, useRef } from 'react'
import { CircleNotch } from '@phosphor-icons/react'

const STEPS = [
  { label: 'Analyzing your topic', duration: 4 },
  { label: 'Identifying prerequisite subjects', duration: 5 },
  { label: 'Designing course sequence', duration: 6 },
  { label: 'Generating course 1 deliverables', duration: 8 },
  { label: 'Generating course 2 deliverables', duration: 8 },
  { label: 'Generating course 3 deliverables', duration: 8 },
  { label: 'Generating course 4 deliverables', duration: 8 },
  { label: 'Generating course 5 deliverables', duration: 8 },
  { label: 'Generating remaining deliverables', duration: 10 },
  { label: 'Saving your learning path', duration: 15 },
]

const TIPS = [
  'Each course includes 5 hands-on deliverables you\'ll build.',
  'Courses are ordered so each one builds on the last.',
  'Your first course will be unlocked immediately.',
  'Deliverables are reviewed by professional experts.',
  'The more specific your topic, the more focused your path.',
]

export function GeneratingPathLoader() {
  const [currentStep, setCurrentStep] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [tipIndex, setTipIndex] = useState(0)
  const stepTimerRef = useRef(0)

  // Elapsed time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Step progression based on per-step durations
  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return

    const currentDuration = STEPS[currentStep].duration * 1000
    const timeout = setTimeout(() => {
      setCurrentStep(prev => prev + 1)
      stepTimerRef.current = 0
    }, currentDuration)

    return () => clearTimeout(timeout)
  }, [currentStep])

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % TIPS.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  const timeStr = minutes > 0
    ? `${minutes}:${seconds.toString().padStart(2, '0')}`
    : `${seconds}s`

  const completedSteps = currentStep
  const progress = Math.min(
    Math.round((completedSteps / STEPS.length) * 100),
    95
  )

  return (
    <div className="max-w-md mx-auto text-center py-12">
      {/* Progress ring */}
      <div className="relative w-16 h-16 mx-auto mb-6">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="32" cy="32" r="28" fill="none" stroke="#111827" strokeWidth="4"
            strokeDasharray={`${progress * 1.76} 176`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
          {progress}%
        </span>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Generating Your Learning Path
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        {timeStr} elapsed
      </p>

      {/* Current activity */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 mb-6">
        <div className="flex items-center gap-3">
          <CircleNotch size={18} className="text-gray-900 animate-spin shrink-0" />
          <span className="text-sm font-medium text-gray-900">
            {STEPS[currentStep].label}...
          </span>
        </div>
      </div>

      {/* Step list */}
      <div className="space-y-2 text-left mb-8">
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${
              i < currentStep ? 'opacity-100' : i === currentStep ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
            }`}
          >
            {i < currentStep ? (
              <span className="w-4 h-4 rounded-full bg-gray-900 text-white flex items-center justify-center text-[9px] shrink-0">
                ✓
              </span>
            ) : (
              <CircleNotch size={16} className="text-gray-500 animate-spin shrink-0" />
            )}
            <span className={i < currentStep ? 'text-gray-500' : 'text-gray-700'}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Rotating tip */}
      <p className="text-xs text-gray-400 transition-opacity duration-500" key={tipIndex}>
        {TIPS[tipIndex]}
      </p>
    </div>
  )
}
