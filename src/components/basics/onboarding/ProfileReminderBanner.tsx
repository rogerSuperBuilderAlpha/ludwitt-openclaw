'use client'

import { useState } from 'react'
import { User, Trophy, X, ArrowRight } from '@phosphor-icons/react'

interface ProfileReminderBannerProps {
  onSetupProfile: () => void
  onDismiss: () => void
}

export function ProfileReminderBanner({
  onSetupProfile,
  onDismiss,
}: ProfileReminderBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss()
  }

  return (
    <div className="b-mb-lg b-rounded-xl b-p-md b-bg-writing-light b-border b-border-writing">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 b-rounded-full b-bg-writing flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-white" weight="fill" />
          </div>
          <div className="min-w-0">
            <p className="b-font-semibold b-text-writing-dark">
              Complete your profile
            </p>
            <p className="b-text-sm b-text-writing-text">
              Appear on the leaderboard and track your progress!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onSetupProfile}
            className="b-btn b-btn-sm b-btn-writing"
          >
            <Trophy size={16} weight="fill" />
            Set Up
            <ArrowRight size={14} weight="bold" />
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 hover:b-bg-writing b-rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X size={18} className="b-text-writing-dark" weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}
