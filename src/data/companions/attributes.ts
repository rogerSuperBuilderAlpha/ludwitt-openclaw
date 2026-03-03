/**
 * Companion Attribute Options
 * Used for evolution customization in the Virtual Pet System
 */

// Subject types
export type Subject = 'math' | 'reading' | 'latin' | 'greek' | 'logic'

// Evolution attributes the user can choose
export interface EvolutionAttributes {
  personality: string
  element: string
  style: string
  specialty: string
}

// AI-generated companion
export interface GeneratedCompanion {
  name: string
  emoji: string
  description: string
  personality: string
  specialAbility: string
  catchphrase: string
}

// Companion definition
export interface SubjectCompanion {
  subject: Subject
  name: string
  currentEmoji: string
  description: string
  personality: string
  specialAbility: string
  catchphrase: string
  evolutionHistory: GeneratedCompanion[]
  level: number
  xp: number
  xpToNextLevel: number
  hunger: number
  happiness: number
  energy: number
  totalFed: number
  totalPlayed: number
  lastCaredAt: number
  adoptedAt: number
  freeHints: number
  freeExplanations: number
  hasStreakShield: boolean
  hasSkipProtection: boolean
  pendingEvolution: boolean
  avatarUrl?: string
  selectedElement?: string
  selectedStyle?: string
}

// Credit cost estimates (actual costs are token-based and may vary)
// These are used for client-side pre-checks and UI display
export const EVOLUTION_COST_CENTS = 3 // Estimated: LLM generates new companion attributes
export const AVATAR_COST_CENTS = 5 // Estimated: LLM prompt (~1-2¢) + image generation (~3¢)
export const FEED_COST = 5 // Fixed interaction cost

// Personality options
export const PERSONALITY_OPTIONS = [
  { id: 'wise', label: 'Wise', emoji: '🦉', description: 'Patient and knowledgeable' },
  { id: 'fierce', label: 'Fierce', emoji: '🔥', description: 'Bold and determined' },
  { id: 'playful', label: 'Playful', emoji: '🎮', description: 'Fun and energetic' },
  { id: 'calm', label: 'Calm', emoji: '🧘', description: 'Peaceful and focused' },
  { id: 'curious', label: 'Curious', emoji: '🔍', description: 'Always exploring' },
  { id: 'brave', label: 'Brave', emoji: '⚔️', description: 'Courageous and strong' }
] as const

// Element options
export const ELEMENT_OPTIONS = [
  { id: 'fire', label: 'Fire', emoji: '🔥', color: 'from-orange-500 to-red-500' },
  { id: 'water', label: 'Water', emoji: '💧', color: 'from-blue-400 to-cyan-500' },
  { id: 'earth', label: 'Earth', emoji: '🌿', color: 'from-green-500 to-emerald-600' },
  { id: 'air', label: 'Air', emoji: '💨', color: 'from-sky-400 to-blue-400' },
  { id: 'light', label: 'Light', emoji: '✨', color: 'from-yellow-400 to-amber-500' },
  { id: 'shadow', label: 'Shadow', emoji: '🌙', color: 'from-purple-600 to-indigo-700' }
] as const

// Style options
export const STYLE_OPTIONS = [
  { id: 'mythical', label: 'Mythical', emoji: '🐉', description: 'Legendary creature' },
  { id: 'cute', label: 'Cute', emoji: '🐾', description: 'Adorable friend' },
  { id: 'majestic', label: 'Majestic', emoji: '👑', description: 'Royal presence' },
  { id: 'mysterious', label: 'Mysterious', emoji: '🔮', description: 'Enigmatic aura' },
  { id: 'ancient', label: 'Ancient', emoji: '🏛️', description: 'Timeless wisdom' },
  { id: 'cosmic', label: 'Cosmic', emoji: '🌟', description: 'Celestial being' }
] as const

// Subject-specific specialties
export const SPECIALTY_OPTIONS: Record<Subject, { id: string; label: string; emoji: string }[]> = {
  math: [
    { id: 'algebra', label: 'Algebra Master', emoji: '📐' },
    { id: 'geometry', label: 'Geometry Guide', emoji: '📏' },
    { id: 'arithmetic', label: 'Arithmetic Ace', emoji: '🔢' },
    { id: 'problem-solving', label: 'Problem Solver', emoji: '🧩' }
  ],
  reading: [
    { id: 'vocabulary', label: 'Vocabulary Virtuoso', emoji: '📚' },
    { id: 'comprehension', label: 'Comprehension Champion', emoji: '🎯' },
    { id: 'speed-reading', label: 'Speed Reader', emoji: '⚡' },
    { id: 'literary-analysis', label: 'Literary Analyst', emoji: '🔍' }
  ],
  latin: [
    { id: 'declension', label: 'Declension Expert', emoji: '📜' },
    { id: 'conjugation', label: 'Conjugation Master', emoji: '🎭' },
    { id: 'vocabulary', label: 'Vocabulary Guide', emoji: '📖' },
    { id: 'translation', label: 'Translation Wizard', emoji: '🌐' }
  ],
  greek: [
    { id: 'alphabet', label: 'Alphabet Master', emoji: 'Α' },
    { id: 'grammar', label: 'Grammar Guardian', emoji: '📝' },
    { id: 'mythology', label: 'Mythology Expert', emoji: '⚡' },
    { id: 'philosophy', label: 'Philosophy Friend', emoji: '🏛️' }
  ],
  logic: [
    { id: 'deduction', label: 'Deduction Detective', emoji: '🔍' },
    { id: 'patterns', label: 'Pattern Finder', emoji: '🧩' },
    { id: 'proofs', label: 'Proof Master', emoji: '✓' },
    { id: 'puzzles', label: 'Puzzle Solver', emoji: '🎲' }
  ]
}

// Base companions for each subject
export const BASE_COMPANIONS: Record<Subject, { emoji: string; name: string; description: string }> = {
  math: { emoji: '🔢', name: 'Numby', description: 'A friendly number companion' },
  reading: { emoji: '📚', name: 'Readsy', description: 'A bookworm friend' },
  latin: { emoji: '🏛️', name: 'Latinus', description: 'A Roman companion' },
  greek: { emoji: '🏺', name: 'Helios', description: 'A Greek friend' },
  logic: { emoji: '🧩', name: 'Logix', description: 'A puzzle-loving pal' }
}

// Subject display info - using basics design system colors
export const SUBJECT_INFO: Record<Subject, { name: string; color: string; bgColor: string; borderColor: string }> = {
  math: { name: 'Math', color: 'text-basics-math-text', bgColor: 'bg-basics-math-light', borderColor: 'border-basics-math-border' },
  reading: { name: 'Reading', color: 'text-basics-reading-text', bgColor: 'bg-basics-reading-light', borderColor: 'border-basics-reading-border' },
  latin: { name: 'Latin', color: 'text-basics-latin-text', bgColor: 'bg-basics-latin-light', borderColor: 'border-basics-latin-border' },
  greek: { name: 'Greek', color: 'text-basics-greek-text', bgColor: 'bg-basics-greek-light', borderColor: 'border-basics-greek-border' },
  logic: { name: 'Logic', color: 'text-basics-logic-text', bgColor: 'bg-basics-logic-light', borderColor: 'border-basics-logic-border' }
}

// Get mood based on needs
export function getMood(companion: SubjectCompanion): { emoji: string; label: string } {
  const avg = (companion.hunger + companion.happiness + companion.energy) / 3
  if (avg >= 80) return { emoji: '🤩', label: 'Ecstatic' }
  if (avg >= 60) return { emoji: '😊', label: 'Happy' }
  if (avg >= 40) return { emoji: '😐', label: 'Okay' }
  if (avg >= 20) return { emoji: '😢', label: 'Sad' }
  return { emoji: '🤒', label: 'Needs care!' }
}

// Level thresholds for evolution
export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 2000]

// Helper to get companion rewards (for use in other components)
export function getCompanionRewards(
  userId: string,
  subject: Subject
): {
  freeHints: number
  freeExplanations: number
  hasStreakShield: boolean
  hasSkipProtection: boolean
} | null {
  try {
    const saved = localStorage.getItem(`subject_companions_v2_${userId}`)
    if (!saved) return null
    const companions = JSON.parse(saved)
    const companion = companions[subject]
    if (!companion) return null
    return {
      freeHints: companion.freeHints || 0,
      freeExplanations: companion.freeExplanations || 0,
      hasStreakShield: companion.hasStreakShield || false,
      hasSkipProtection: companion.hasSkipProtection || false
    }
  } catch {
    return null
  }
}

// Helper to get user's companion avatar for leaderboard
export function getCompanionAvatar(
  userId: string
): {
  url: string
  name: string
  subject: string
} | null {
  try {
    const selectedAvatar = localStorage.getItem(`user_avatar_${userId}`)
    if (selectedAvatar) {
      const saved = localStorage.getItem(`subject_companions_v2_${userId}`)
      if (saved) {
        const companions = JSON.parse(saved)
        for (const subject of ['math', 'reading', 'latin', 'greek', 'logic']) {
          const companion = companions[subject]
          if (companion?.avatarUrl === selectedAvatar) {
            return {
              url: selectedAvatar,
              name: companion.name,
              subject
            }
          }
        }
      }
      return { url: selectedAvatar, name: 'Companion', subject: 'unknown' }
    }

    const saved = localStorage.getItem(`subject_companions_v2_${userId}`)
    if (!saved) return null

    const companions = JSON.parse(saved)
    let bestCompanion: { url: string; name: string; subject: string; level: number } | null = null

    for (const subject of ['math', 'reading', 'latin', 'greek', 'logic']) {
      const companion = companions[subject]
      if (companion?.avatarUrl) {
        if (!bestCompanion || companion.level > bestCompanion.level) {
          bestCompanion = {
            url: companion.avatarUrl,
            name: companion.name,
            subject,
            level: companion.level
          }
        }
      }
    }

    if (bestCompanion) {
      return {
        url: bestCompanion.url,
        name: bestCompanion.name,
        subject: bestCompanion.subject
      }
    }

    return null
  } catch {
    return null
  }
}


