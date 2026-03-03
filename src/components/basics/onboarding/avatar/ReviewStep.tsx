'use client'

import { PartyPopper } from 'lucide-react'
import { AvatarCharacter } from '@/lib/types/avatar'
import { Alert } from '@/components/ui/Alert'
import { REGIONS } from './constants'

interface ReviewStepProps {
  avatarType: 'photo' | 'character' | null
  selectedAvatar: AvatarCharacter | null
  nickname: string
  selectedRegion: string
  isOver18: boolean | null
  displayName: string | null | undefined
  error: string | null
  saveAttempts: number
  isSubmitting: boolean
  isRetrying: boolean
  onRetry: () => void
  onSkip?: () => void
}

export function ReviewStep({
  avatarType,
  selectedAvatar,
  nickname,
  selectedRegion,
  isOver18,
  displayName,
  error,
  saveAttempts,
  isSubmitting,
  isRetrying,
  onRetry,
  onSkip,
}: ReviewStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 mb-2">
        <PartyPopper className="w-10 h-10 text-emerald-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Looking great!</h3>
        <p className="text-gray-500 text-sm">Here&apos;s how you&apos;ll appear on the leaderboard</p>
      </div>

      {/* Preview Card */}
      <div className="max-w-sm mx-auto p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center text-5xl shadow-sm">
            {avatarType === 'photo' ? '\uD83D\uDCF8' : selectedAvatar?.emoji || '\uD83D\uDC64'}
          </div>
          <div className="text-left flex-1">
            <p className="text-xl font-bold text-gray-900">
              {avatarType === 'photo'
                ? (displayName || 'Your Name')
                : (nickname.trim() || selectedAvatar?.name || 'Your Name')}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{REGIONS.find(r => r.id === selectedRegion)?.flag}</span>
              <span className="text-sm text-gray-500">{selectedRegion}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {isOver18 ? 'Adult' : 'Student'} {'\u2022'} Ready to compete!
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="space-y-3">
          <Alert type="error">{error}</Alert>
          {saveAttempts >= 2 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={onRetry}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Try Again
              </button>
              {onSkip && (
                <button
                  onClick={onSkip}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Skip for Now
                </button>
              )}
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      )}

      {isRetrying && (
        <div className="flex items-center justify-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
          <div className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
          Retrying...
        </div>
      )}
    </div>
  )
}
