import { AvatarCharacter } from '@/lib/types/avatar'

/**
 * Pre-made avatar characters for students under 18
 * Safe, fun, and diverse options
 */

export const AVATAR_CHARACTERS: AvatarCharacter[] = [
  // Animals
  {
    id: 'lion-brave',
    name: 'Brave Lion',
    emoji: '🦁',
    description: 'Bold and fearless',
    category: 'animal',
    colorScheme: '#F59E0B'
  },
  {
    id: 'owl-wise',
    name: 'Wise Owl',
    emoji: '🦉',
    description: 'Smart and thoughtful',
    category: 'animal',
    colorScheme: '#8B5CF6'
  },
  {
    id: 'dolphin-friendly',
    name: 'Friendly Dolphin',
    emoji: '🐬',
    description: 'Playful and kind',
    category: 'animal',
    colorScheme: '#3B82F6'
  },
  {
    id: 'panda-calm',
    name: 'Calm Panda',
    emoji: '🐼',
    description: 'Peaceful and balanced',
    category: 'animal',
    colorScheme: '#64748B'
  },
  {
    id: 'eagle-focused',
    name: 'Focused Eagle',
    emoji: '🦅',
    description: 'Sharp and determined',
    category: 'animal',
    colorScheme: '#DC2626'
  },
  {
    id: 'fox-clever',
    name: 'Clever Fox',
    emoji: '🦊',
    description: 'Quick and smart',
    category: 'animal',
    colorScheme: '#F97316'
  },
  {
    id: 'penguin-cool',
    name: 'Cool Penguin',
    emoji: '🐧',
    description: 'Chill and steady',
    category: 'animal',
    colorScheme: '#0EA5E9'
  },
  {
    id: 'tiger-strong',
    name: 'Strong Tiger',
    emoji: '🐯',
    description: 'Powerful and confident',
    category: 'animal',
    colorScheme: '#EA580C'
  },

  // Space
  {
    id: 'rocket-explorer',
    name: 'Rocket Explorer',
    emoji: '🚀',
    description: 'Reaching for the stars',
    category: 'space',
    colorScheme: '#7C3AED'
  },
  {
    id: 'star-bright',
    name: 'Bright Star',
    emoji: '⭐',
    description: 'Shining brilliantly',
    category: 'space',
    colorScheme: '#FBBF24'
  },
  {
    id: 'moon-dreamer',
    name: 'Moon Dreamer',
    emoji: '🌙',
    description: 'Creative and imaginative',
    category: 'space',
    colorScheme: '#A78BFA'
  },
  {
    id: 'comet-fast',
    name: 'Fast Comet',
    emoji: '☄️',
    description: 'Quick learner',
    category: 'space',
    colorScheme: '#F59E0B'
  },

  // Nature
  {
    id: 'tree-growing',
    name: 'Growing Tree',
    emoji: '🌳',
    description: 'Always learning',
    category: 'nature',
    colorScheme: '#10B981'
  },
  {
    id: 'flower-blooming',
    name: 'Blooming Flower',
    emoji: '🌸',
    description: 'Beautiful progress',
    category: 'nature',
    colorScheme: '#EC4899'
  },
  {
    id: 'mountain-steady',
    name: 'Steady Mountain',
    emoji: '⛰️',
    description: 'Strong and reliable',
    category: 'nature',
    colorScheme: '#6B7280'
  },
  {
    id: 'sun-bright',
    name: 'Bright Sun',
    emoji: '☀️',
    description: 'Positive energy',
    category: 'nature',
    colorScheme: '#FCD34D'
  },

  // Tech
  {
    id: 'robot-smart',
    name: 'Smart Robot',
    emoji: '🤖',
    description: 'Tech-savvy',
    category: 'tech',
    colorScheme: '#6366F1'
  },
  {
    id: 'lightning-quick',
    name: 'Quick Lightning',
    emoji: '⚡',
    description: 'Fast thinker',
    category: 'tech',
    colorScheme: '#FBBF24'
  },
  {
    id: 'brain-genius',
    name: 'Genius Brain',
    emoji: '🧠',
    description: 'Super smart',
    category: 'tech',
    colorScheme: '#EC4899'
  },
  {
    id: 'gem-precious',
    name: 'Precious Gem',
    emoji: '💎',
    description: 'Rare talent',
    category: 'tech',
    colorScheme: '#3B82F6'
  },

  // Sports
  {
    id: 'trophy-winner',
    name: 'Trophy Winner',
    emoji: '🏆',
    description: 'Champion mindset',
    category: 'sports',
    colorScheme: '#F59E0B'
  },
  {
    id: 'soccer-player',
    name: 'Soccer Star',
    emoji: '⚽',
    description: 'Team player',
    category: 'sports',
    colorScheme: '#10B981'
  },
  {
    id: 'basketball-pro',
    name: 'Basketball Pro',
    emoji: '🏀',
    description: 'Aiming high',
    category: 'sports',
    colorScheme: '#F97316'
  },
  {
    id: 'medal-achiever',
    name: 'Medal Achiever',
    emoji: '🥇',
    description: 'First place',
    category: 'sports',
    colorScheme: '#EAB308'
  },

  // Creative
  {
    id: 'artist-creative',
    name: 'Creative Artist',
    emoji: '🎨',
    description: 'Artistic mind',
    category: 'creative',
    colorScheme: '#EC4899'
  },
  {
    id: 'music-maestro',
    name: 'Music Maestro',
    emoji: '🎵',
    description: 'Rhythm learner',
    category: 'creative',
    colorScheme: '#8B5CF6'
  },
  {
    id: 'book-scholar',
    name: 'Book Scholar',
    emoji: '📚',
    description: 'Love to read',
    category: 'creative',
    colorScheme: '#0EA5E9'
  },
  {
    id: 'magic-wonder',
    name: 'Wonder Magic',
    emoji: '✨',
    description: 'Full of wonder',
    category: 'creative',
    colorScheme: '#A78BFA'
  },
  {
    id: 'fire-passionate',
    name: 'Passionate Fire',
    emoji: '🔥',
    description: 'Burning passion',
    category: 'creative',
    colorScheme: '#DC2626'
  },
  {
    id: 'rainbow-colorful',
    name: 'Colorful Rainbow',
    emoji: '🌈',
    description: 'Diverse talents',
    category: 'creative',
    colorScheme: '#EC4899'
  }
]

// Helper functions
export function getAvatarById(id: string): AvatarCharacter | undefined {
  return AVATAR_CHARACTERS.find(avatar => avatar.id === id)
}

export function getAvatarsByCategory(category: AvatarCharacter['category']): AvatarCharacter[] {
  return AVATAR_CHARACTERS.filter(avatar => avatar.category === category)
}

export const AVATAR_CATEGORIES = [
  { id: 'animal', name: 'Animals', emoji: '🦁' },
  { id: 'space', name: 'Space', emoji: '🚀' },
  { id: 'nature', name: 'Nature', emoji: '🌳' },
  { id: 'tech', name: 'Tech', emoji: '🤖' },
  { id: 'sports', name: 'Sports', emoji: '🏆' },
  { id: 'creative', name: 'Creative', emoji: '🎨' }
] as const

