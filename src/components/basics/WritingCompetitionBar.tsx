/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  PencilSimple,
  Trophy,
  Clock,
  CheckCircle,
  CaretRight,
  Info,
  X,
} from '@phosphor-icons/react'
import { Portal } from './Portal'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { WritingCompetitionModal } from './writing-competition'
import { logger } from '@/lib/logger'

interface WritingCompetitionBarProps {
  className?: string
}

/**
 * Format countdown based on remaining seconds.
 * Shows days if > 24 hours, otherwise HH:MM:SS
 */
function formatCountdown(seconds: number): string {
  if (seconds <= 0) return 'Ended'

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (days > 0) {
    return `${days}d ${hours}h`
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function WritingCompetitionBar({
  className = '',
}: WritingCompetitionBarProps) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [userGradeLevel, setUserGradeLevel] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  // Load competition status
  const loadStatus = useCallback(async () => {
    if (!user) {
      setIsLoading(false)
      return
    }

    try {
      // useApiFetch returns data directly (already unwrapped from {success, data})
      const data = await fetchApi<{
        hasSubmitted: boolean
        userGradeLevel: number
        timeRemaining: number
      }>('/api/basics/writing-competition/current')

      if (data) {
        setHasSubmitted(data.hasSubmitted)
        setUserGradeLevel(data.userGradeLevel)
        setTimeRemaining(data.timeRemaining || 0)
      }
    } catch (e) {
      logger.error('WritingCompetitionBar', 'Failed to load status', {
        error: e,
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, fetchApi])

  // Load status on mount
  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  // Live countdown timer - decrement the timeRemaining from the API
  // Extract complex expression to variable for ESLint
  const hasTimeRemaining = timeRemaining > 0

  useEffect(() => {
    if (!hasTimeRemaining) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [hasTimeRemaining]) // Only run when there's time remaining

  // Reload status when modal closes
  const handleModalClose = () => {
    setIsModalOpen(false)
    loadStatus()
  }

  // Show skeleton while loading (keep the bar visible)
  if (isLoading) {
    return (
      <div
        className={`w-full flex items-center gap-2 px-2 py-1.5 b-rounded-lg b-animate-pulse ${className}`}
      >
        <div className="p-1 b-rounded b-bg-muted w-6 h-6" />
        <div className="flex-1">
          <div className="h-3 b-bg-muted b-rounded w-20 mb-1" />
          <div className="h-2.5 b-bg-muted b-rounded w-14" />
        </div>
      </div>
    )
  }

  // Still show the bar even when not logged in (as disabled)
  if (!user) {
    return (
      <div
        className={`w-full flex items-center gap-2 px-2 py-1.5 b-rounded-lg opacity-70 ${className}`}
      >
        <div className="p-1 b-rounded b-bg-writing">
          <PencilSimple size={14} weight="bold" className="b-text-inverse" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="b-font-medium b-text-xs b-text-primary">
              Open Essay
            </span>
            <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium flex items-center gap-0.5">
              <Trophy size={10} weight="fill" /> $50
            </span>
          </div>
          <span className="b-text-xs b-text-muted">Log in to participate</span>
        </div>
      </div>
    )
  }

  const isUrgent = timeRemaining > 0 && timeRemaining < 3600 // Less than 1 hour

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`
          w-full flex items-center justify-between gap-2 px-2 py-1.5 b-rounded-lg transition-all
          hover:opacity-90
          ${className}
        `}
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className={`p-1 b-rounded ${hasSubmitted ? 'b-bg-reading b-text-inverse' : 'b-bg-writing b-text-inverse'}`}
          >
            {hasSubmitted ? (
              <CheckCircle size={14} weight="bold" />
            ) : (
              <PencilSimple size={14} weight="bold" />
            )}
          </div>

          {/* Title & Status */}
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span
                className={`b-font-medium b-text-xs ${hasSubmitted ? 'b-text-reading-dark' : 'b-text-writing-dark'}`}
              >
                Open Essay
              </span>
              {hasSubmitted ? (
                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                  Submitted
                </span>
              ) : (
                <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium flex items-center gap-0.5">
                  <Trophy size={10} weight="fill" /> $50
                </span>
              )}
            </div>
            <span className="b-text-xs b-text-muted">
              Grade {userGradeLevel} • 100 words
            </span>
          </div>
        </div>

        {/* Countdown & Arrow */}
        <div className="flex items-center gap-1.5">
          {timeRemaining > 0 && !hasSubmitted && (
            <div
              className={`flex items-center gap-1 px-1.5 py-0.5 b-rounded text-xs font-mono font-medium ${
                isUrgent
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Clock size={10} weight="bold" />
              {formatCountdown(timeRemaining)}
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowInfoModal(true)
            }}
            className="p-0.5 b-rounded-full hover:b-bg-muted transition-colors"
            title="About Writing Competition"
          >
            <Info size={14} className="b-text-muted" />
          </button>
          <CaretRight size={14} className="b-text-muted" />
        </div>
      </button>

      <WritingCompetitionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      {/* Info Modal */}
      {showInfoModal && (
        <Portal>
          <div className="b-modal-container">
            <div
              className="b-modal-backdrop"
              onClick={() => setShowInfoModal(false)}
            />
            <div className="b-modal b-modal-sm b-p-xl">
              <button
                onClick={() => setShowInfoModal(false)}
                className="b-modal-close absolute top-4 right-4"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 b-mb-lg">
                <div
                  className="b-icon-box b-icon-box-md b-rounded-lg"
                  style={{
                    background: 'var(--b-writing-light)',
                    color: 'var(--b-writing)',
                  }}
                >
                  <PencilSimple size={24} weight="fill" />
                </div>
                <h2 className="b-text-xl b-font-bold b-text-primary">
                  Writing Competition
                </h2>
              </div>

              <div className="space-y-4 b-text-secondary">
                <p>
                  The <strong>Weekly Writing Competition</strong> challenges
                  students to write a 100-word essay on an open topic for a
                  chance to win <strong>$50</strong>!
                </p>

                <div className="b-bg-logic-light b-rounded-lg b-p-lg">
                  <h3 className="b-font-semibold b-text-logic-dark b-mb-sm">
                    How It Works
                  </h3>
                  <ul className="b-text-sm space-y-1 b-text-logic-dark">
                    <li>• Write a 100-word essay responding to the prompt</li>
                    <li>• Essays are graded by AI based on your grade level</li>
                    <li>
                      • New competition starts every Friday at 5:00 PM EST
                    </li>
                    <li>• You have 7 days to submit your essay</li>
                    <li>• Top essay in each grade wins $50!</li>
                  </ul>
                </div>

                <div className="b-bg-warning-light b-rounded-lg b-p-lg">
                  <h3 className="b-font-semibold b-text-writing-dark b-mb-sm">
                    Judging Criteria
                  </h3>
                  <ul className="b-text-sm space-y-1 b-text-writing-dark">
                    <li>• Creativity and originality</li>
                    <li>• Grammar and spelling</li>
                    <li>• Structure and organization</li>
                    <li>• Grade-appropriate vocabulary</li>
                  </ul>
                </div>

                <p className="b-text-sm b-text-muted">
                  Your grade level: Grade {userGradeLevel}
                </p>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
