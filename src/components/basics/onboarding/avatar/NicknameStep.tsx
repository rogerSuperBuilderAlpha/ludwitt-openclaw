'use client'

import { Shield } from 'lucide-react'
import { AvatarCharacter } from '@/lib/types/avatar'
import { MAX_NICKNAME_LENGTH } from './constants'

interface NicknameStepProps {
  nickname: string
  onNicknameChange: (value: string) => void
  isOver18: boolean | null
  selectedAvatar: AvatarCharacter | null
}

export function NicknameStep({ nickname, onNicknameChange, isOver18, selectedAvatar }: NicknameStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 mb-2">
        <span className="text-4xl">{selectedAvatar?.emoji || '\u2728'}</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isOver18 ? 'Want a nickname?' : 'What should we call you?'}
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          {isOver18
            ? 'Add an optional nickname, or skip to use your account name'
            : 'This name will appear on the leaderboard instead of your real name'
          }
        </p>
      </div>

      <div className="max-w-sm mx-auto space-y-3">
        <input
          type="text"
          value={nickname}
          onChange={(e) => onNicknameChange(e.target.value.slice(0, MAX_NICKNAME_LENGTH))}
          placeholder="e.g., MathWizard, StarLearner"
          className="w-full px-5 py-4 text-lg text-center border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          maxLength={MAX_NICKNAME_LENGTH}
        />
        <p className="text-xs text-gray-400">{nickname.length}/{MAX_NICKNAME_LENGTH} characters</p>
      </div>

      {!isOver18 && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm">
          <Shield className="w-4 h-4" />
          For your safety, we use a nickname instead of your real name
        </div>
      )}
    </div>
  )
}
