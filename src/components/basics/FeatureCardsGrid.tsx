'use client'

/**
 * Feature Cards Grid
 *
 * A grid of learning tools using the Basics design system.
 * Each card has consistent styling, hover effects, and accessibility.
 */

import {
  Users,
  ChartBar,
  Heart,
  Lightning,
  Brain,
  Microphone,
  Trophy,
  Sparkle,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

// ============================================================================
// Types
// ============================================================================

interface Feature {
  id: string
  name: string
  description: string
  icon: Icon
  subjectClass: 'math' | 'reading' | 'logic' | 'writing' | 'latin' | 'greek'
  comingSoon?: boolean
}

interface FeatureCardsGridProps {
  onOpenTutor: () => void
  onOpenAnalytics: () => void
  onOpenPets: () => void
  onOpenPowerUps: () => void
  onOpenReviews: () => void
  onOpenVoice: () => void
  onOpenSkills: () => void
  onOpenChallenges: () => void
}

// ============================================================================
// Feature Data
// ============================================================================

const features: Feature[] = [
  {
    id: 'tutor',
    name: 'Find a Tutor',
    description: 'Get help from peer tutors',
    icon: Users,
    subjectClass: 'logic',
  },
  {
    id: 'analytics',
    name: 'Progress Analytics',
    description: 'Track your learning journey',
    icon: ChartBar,
    subjectClass: 'math',
  },
  {
    id: 'pets',
    name: 'Learning Companions',
    description: 'Virtual pets that grow with you',
    icon: Heart,
    subjectClass: 'latin',
  },
  {
    id: 'powerups',
    name: 'Power-ups',
    description: 'Boosts, hints & XP multipliers',
    icon: Lightning,
    subjectClass: 'writing',
  },
  {
    id: 'reviews',
    name: 'Spaced Repetition',
    description: 'Optimal review intervals',
    icon: Brain,
    subjectClass: 'logic',
  },
  {
    id: 'voice',
    name: 'Voice Input',
    description: 'Voice commands & accessibility',
    icon: Microphone,
    subjectClass: 'reading',
  },
  {
    id: 'skills',
    name: 'Skill Trees',
    description: 'Unlock new abilities',
    icon: Trophy,
    subjectClass: 'writing',
  },
  {
    id: 'challenges',
    name: 'Daily Challenges',
    description: 'Bonus XP opportunities',
    icon: Sparkle,
    subjectClass: 'latin',
  },
]

// ============================================================================
// Component
// ============================================================================

export function FeatureCardsGrid({
  onOpenTutor,
  onOpenAnalytics,
  onOpenPets,
  onOpenPowerUps,
  onOpenReviews,
  onOpenVoice,
  onOpenSkills,
  onOpenChallenges,
}: FeatureCardsGridProps) {
  const actionMap: Record<string, () => void> = {
    tutor: onOpenTutor,
    analytics: onOpenAnalytics,
    pets: onOpenPets,
    powerups: onOpenPowerUps,
    reviews: onOpenReviews,
    voice: onOpenVoice,
    skills: onOpenSkills,
    challenges: onOpenChallenges,
  }

  return (
    <section className="b-section b-mt-xl b-mb-lg">
      {/* Section Header */}
      <div className="b-section-header">
        <Sparkle size={20} weight="fill" className="b-text-warning" />
        <h3 className="b-text-base b-font-semibold b-text-primary">
          Learning Tools
        </h3>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 b-p-lg">
        {features.map((feature) => {
          const Icon = feature.icon
          const isComingSoon = feature.comingSoon

          return (
            <button
              key={feature.id}
              onClick={() => !isComingSoon && actionMap[feature.id]?.()}
              disabled={isComingSoon}
              className={`b-card b-card-${feature.subjectClass} b-card-interactive b-p-lg text-left group ${
                isComingSoon ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {/* Icon */}
              <div
                className={`b-icon-box b-icon-box-md b-icon-box-${feature.subjectClass} b-mb-md group-hover:scale-110 transition-transform`}
              >
                <Icon size={20} weight="fill" />
              </div>

              {/* Content */}
              <h4 className="b-text-sm b-font-semibold b-text-primary b-mb-xs">
                {feature.name}
              </h4>
              <p className="b-text-xs b-text-muted b-leading-relaxed">
                {feature.description}
              </p>

              {/* Coming Soon Badge */}
              {isComingSoon && (
                <span className="absolute top-2 right-2 b-badge b-badge-default b-badge-sm">
                  Soon
                </span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
