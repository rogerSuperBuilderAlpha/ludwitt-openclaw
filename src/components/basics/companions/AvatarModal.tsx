'use client'

/**
 * Avatar Modal Component
 * Shows generated avatar and allows setting as profile picture
 */

import { CircleNotch, Check, Image as ImageIcon } from '@phosphor-icons/react'
import { UnifiedModal } from '../UnifiedModal'

interface AvatarModalProps {
  isOpen: boolean
  onClose: () => void
  isGenerating: boolean
  avatarUrl: string | null
  companionName: string
  onUseAsProfile: () => void
}

export function AvatarModal({
  isOpen,
  onClose,
  isGenerating,
  avatarUrl,
  companionName,
  onUseAsProfile,
}: AvatarModalProps) {
  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={() => !isGenerating && onClose()}
      title="📸 Companion Avatar"
      subtitle="Use this as your leaderboard profile picture!"
      size="sm"
    >
      <div className="space-y-4">
        {isGenerating ? (
          <div className="text-center py-8">
            <CircleNotch
              size={48}
              className="text-b-logic animate-spin mx-auto mb-4"
            />
            <h3 className="font-bold b-text-primary">
              Generating Your Avatar...
            </h3>
            <p className="text-sm b-text-muted mt-2">
              Creating a unique image for {companionName}
            </p>
          </div>
        ) : avatarUrl ? (
          <>
            <div className="text-center">
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt="Generated Avatar"
                  className="w-40 h-40 rounded-full mx-auto border-4 b-border-logic shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 b-bg-reading text-white p-2 rounded-full">
                  <Check size={16} weight="bold" />
                </div>
              </div>
              <h3 className="font-bold b-text-primary mt-4">
                {companionName}&apos;s Avatar
              </h3>
              <p className="text-sm b-text-muted">
                Your unique AI-generated companion avatar!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onUseAsProfile}
                className="flex-1 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                style={{
                  background:
                    'linear-gradient(to right, var(--b-logic), var(--b-latin))',
                  color: '#ffffff',
                }}
              >
                <ImageIcon size={18} weight="fill" />
                Use as Profile Avatar
              </button>
              <button
                onClick={onClose}
                className="px-4 py-3 border-2 rounded-xl font-medium transition-colors"
                style={{
                  borderColor: 'var(--b-border)',
                  color: 'var(--b-text-secondary)',
                }}
              >
                Close
              </button>
            </div>

            <p className="text-xs text-center b-text-muted">
              This avatar will appear next to your name on the leaderboard!
            </p>
          </>
        ) : null}
      </div>
    </UnifiedModal>
  )
}
