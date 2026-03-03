'use client'

import { AVATAR_CATEGORIES } from '@/data/avatars'
import { AvatarCharacter } from '@/lib/types/avatar'

interface AvatarPickStepProps {
  selectedAvatar: AvatarCharacter | null
  onSelectAvatar: (avatar: AvatarCharacter) => void
  selectedCategory: string
  onSelectCategory: (category: string) => void
  filteredAvatars: AvatarCharacter[]
}

export function AvatarPickStep({
  selectedAvatar,
  onSelectAvatar,
  selectedCategory,
  onSelectCategory,
  filteredAvatars,
}: AvatarPickStepProps) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pick your avatar</h3>
        <p className="text-gray-500 text-sm">Choose a character that represents you</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {AVATAR_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-2">
        {filteredAvatars.map(avatar => (
          <button
            key={avatar.id}
            onClick={() => onSelectAvatar(avatar)}
            className={`aspect-square p-3 rounded-xl border-2 transition-all hover:scale-110 active:scale-95 ${
              selectedAvatar?.id === avatar.id
                ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-4 ring-indigo-500/20'
                : 'border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50'
            }`}
            title={avatar.description}
          >
            <div className="text-4xl sm:text-5xl flex items-center justify-center h-full">
              {avatar.emoji}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Avatar Preview */}
      {selectedAvatar && (
        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
          <span className="text-lg font-semibold text-gray-900">{selectedAvatar.name}</span>
          <span className="mx-2 text-gray-400">{'\u2022'}</span>
          <span className="text-gray-600">{selectedAvatar.description}</span>
        </div>
      )}
    </div>
  )
}
