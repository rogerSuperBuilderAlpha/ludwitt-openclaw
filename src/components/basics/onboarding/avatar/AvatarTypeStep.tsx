'use client'

import { User, Camera } from 'lucide-react'

interface AvatarTypeStepProps {
  avatarType: 'photo' | 'character' | null
  onSelectType: (type: 'photo' | 'character') => void
}

export function AvatarTypeStep({ avatarType, onSelectType }: AvatarTypeStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 mb-2">
        <User className="w-10 h-10 text-cyan-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">How do you want to appear?</h3>
        <p className="text-gray-500 text-sm">Choose how others will see you on the leaderboard</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          onClick={() => onSelectType('photo')}
          className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
            avatarType === 'photo'
              ? 'border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-500/10'
              : 'border-gray-100 bg-white hover:border-cyan-200'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <p className="font-bold text-gray-900">Use My Photo</p>
          <p className="text-xs text-gray-500 mt-1">Show your real name & profile picture</p>
        </button>

        <button
          onClick={() => onSelectType('character')}
          className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
            avatarType === 'character'
              ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/10'
              : 'border-gray-100 bg-white hover:border-violet-200'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mx-auto mb-4 text-4xl">
            {'\uD83C\uDFAD'}
          </div>
          <p className="font-bold text-gray-900">Choose Avatar</p>
          <p className="text-xs text-gray-500 mt-1">Pick a fun character to represent you</p>
        </button>
      </div>
    </div>
  )
}
