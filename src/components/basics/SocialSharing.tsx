/**
 * Social Sharing Component
 * Handles sharing achievements and milestones to social media
 */

'use client'

import { useState } from 'react'
import { Portal } from './Portal'
import { logger } from '@/lib/logger'

export interface ShareableAchievement {
  type:
    | 'grade_completion'
    | 'streak_milestone'
    | 'accuracy_milestone'
    | 'xp_milestone'
  title: string
  description: string
  stats: {
    grade?: string
    streak?: number
    accuracy?: number
    xp?: number
    subject?: string
  }
  emoji: string
}

interface SocialSharingProps {
  achievement: ShareableAchievement
  studentName: string
  onClose: () => void
}

export function SocialSharing({
  achievement,
  studentName,
  onClose,
}: SocialSharingProps) {
  const [copied, setCopied] = useState(false)

  const generateShareText = () => {
    const { type, title, stats, emoji } = achievement

    let shareText = `${emoji} ${title}!\n\n`

    switch (type) {
      case 'grade_completion':
        shareText += `I just mastered ${stats.subject} ${stats.grade} with ${stats.accuracy}% accuracy! 🎯\n`
        break
      case 'streak_milestone':
        shareText += `${stats.streak} days in a row of learning! My streak is on fire! 🔥\n`
        break
      case 'accuracy_milestone':
        shareText += `${stats.accuracy}% accuracy in ${stats.subject}! I'm getting really good at this! 🎯\n`
        break
      case 'xp_milestone':
        shareText += `Just hit ${stats.xp?.toLocaleString()} XP! Level up! ⬆️\n`
        break
    }

    shareText += `\n#Learning #Achievement #PitchRise #Education #Progress`
    return shareText
  }

  const shareText = generateShareText()

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      logger.error('SocialSharing', 'Failed to copy to clipboard', { error })
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: `${studentName}'s Achievement`,
          text: shareText,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error occurred
      }
    } else {
      handleCopyToClipboard()
    }
  }

  const handleSocialShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(window.location.href)

    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`
        break
      case 'reddit':
        shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-b-bg-card border b-border rounded-xl shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b b-border">
            <h2 className="text-lg font-semibold b-text-primary oxford-heading">
              Share Your Achievement
            </h2>
            <button
              onClick={onClose}
              className="p-2 b-text-muted hover:b-text-secondary rounded-lg hover:b-bg-muted transition-colors"
            >
              <svg
                className="w-5 h-5"
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

          {/* Preview */}
          <div className="p-4">
            <div className="b-bg-muted border b-border rounded-lg p-4 mb-4">
              <h3 className="font-semibold b-text-primary mb-2 oxford-heading">
                Preview
              </h3>
              <div className="text-sm b-text-primary whitespace-pre-line font-serif">
                {shareText}
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              {/* Native Share (Mobile) */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 b-btn b-btn-logic py-3 px-4 font-medium"
                >
                  Share
                </button>
              )}

              {/* Social Media Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center justify-center gap-2 b-bg-math text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                >
                  <span>🐦</span>
                  Twitter
                </button>
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center justify-center gap-2 b-bg-math text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                >
                  <span>📘</span>
                  Facebook
                </button>
                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="flex items-center justify-center gap-2 b-bg-greek text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                >
                  <span>💼</span>
                  LinkedIn
                </button>
                <button
                  onClick={() => handleSocialShare('reddit')}
                  className="flex items-center justify-center gap-2 b-bg-latin text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                >
                  <span>🤖</span>
                  Reddit
                </button>
              </div>

              {/* Copy to Clipboard */}
              <button
                onClick={handleCopyToClipboard}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors font-medium border ${
                  copied
                    ? 'b-bg-reading-light b-border-reading b-text-reading'
                    : 'b-bg-card b-border b-text-primary hover:bg-b-bg-card-hover'
                }`}
              >
                <span>{copied ? '✅' : '📋'}</span>
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

// Helper function to create shareable achievements
export function createShareableAchievement(
  type:
    | 'grade_completion'
    | 'streak_milestone'
    | 'accuracy_milestone'
    | 'xp_milestone',
  data: any
): ShareableAchievement {
  switch (type) {
    case 'grade_completion':
      return {
        type,
        title: `${data.subject} ${data.grade} Completed`,
        description: `Mastered ${data.subject} at ${data.grade} level`,
        stats: {
          grade: data.grade,
          accuracy: data.accuracy,
          subject: data.subject,
        },
        emoji: data.subject === 'Math' ? '📊' : '📚',
      }

    case 'streak_milestone':
      return {
        type,
        title: `${data.streak} Day Learning Streak`,
        description: `${data.streak} consecutive days of learning`,
        stats: { streak: data.streak },
        emoji: '🔥',
      }

    case 'accuracy_milestone':
      return {
        type,
        title: `${data.accuracy}% Accuracy Achieved`,
        description: `Achieved ${data.accuracy}% accuracy in ${data.subject}`,
        stats: { accuracy: data.accuracy, subject: data.subject },
        emoji: '🎯',
      }

    case 'xp_milestone':
      return {
        type,
        title: `${data.xp.toLocaleString()} XP Milestone`,
        description: `Reached ${data.xp.toLocaleString()} experience points`,
        stats: { xp: data.xp },
        emoji: '⚡',
      }

    default:
      return {
        type: 'xp_milestone',
        title: 'Learning Achievement',
        description: 'Made progress in learning',
        stats: {},
        emoji: '🎉',
      }
  }
}
