'use client'

import { SubjectProgressDisplay } from '@/lib/types/basics'
import { UnifiedModal } from '@/components/basics/UnifiedModal'
import { VirtualPetSystem } from '@/components/basics/virtual-pet'
import { SpacedRepetitionSystem } from '@/components/basics/SpacedRepetitionSystem'
import { SkillMasteryTrees } from '@/components/basics/SkillMasteryTrees'
import { Heart, Brain, Trophy } from '@phosphor-icons/react'

// Using design system colors for icons

interface BasicsFeatureModalsProps {
  userId?: string
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  dailyXP: number
  recentProblems: Array<{
    id: string
    question: string
    topic: string
    difficulty: number
    correct: boolean
    userAnswer: string
    correctAnswer: string
  }>

  // Modal visibility
  showPetsModal: boolean
  showReviewsModal: boolean
  showSkillsModal: boolean

  // Modal handlers
  onClosePetsModal: () => void
  onCloseReviewsModal: () => void
  onCloseSkillsModal: () => void

  // Callbacks
  onReviewComplete: (item: unknown, correct: boolean) => void
  onSkillSelect: (skill: {
    name: string
    difficulty: number
    category: string
  }) => void
  onCreditsUsed: (cost: number, newBalance: number) => void
}

export function BasicsFeatureModals({
  userId,
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  dailyXP,
  recentProblems,
  showPetsModal,
  showReviewsModal,
  showSkillsModal,
  onClosePetsModal,
  onCloseReviewsModal,
  onCloseSkillsModal,
  onReviewComplete,
  onSkillSelect,
  onCreditsUsed,
}: BasicsFeatureModalsProps) {
  return (
    <>
      {/* Virtual Pets Modal */}
      <UnifiedModal
        isOpen={showPetsModal}
        onClose={onClosePetsModal}
        title="Learning Companions"
        subtitle="Adopt and raise virtual pets that grow with you"
        icon={<Heart size={22} weight="fill" className="text-b-latin" />}
        size="lg"
        position="center"
      >
        <VirtualPetSystem
          mathProgress={mathProgress}
          readingProgress={readingProgress}
          latinXP={latinXP}
          greekXP={greekXP}
          logicXP={logicXP}
          dailyXP={dailyXP}
          userId={userId}
        />
      </UnifiedModal>

      {/* Spaced Repetition Modal */}
      <UnifiedModal
        isOpen={showReviewsModal}
        onClose={onCloseReviewsModal}
        title="Spaced Repetition"
        subtitle="Review concepts at optimal intervals"
        icon={<Brain size={22} weight="bold" className="text-b-logic" />}
        size="lg"
        position="center"
      >
        <SpacedRepetitionSystem
          mathProgress={mathProgress}
          readingProgress={readingProgress}
          latinXP={latinXP}
          greekXP={greekXP}
          logicXP={logicXP}
          onReviewComplete={onReviewComplete}
          onCreditsUsed={onCreditsUsed}
          recentProblems={recentProblems}
          userId={userId}
          showTriggerButton={false}
        />
      </UnifiedModal>

      {/* Skill Mastery Trees Modal */}
      <UnifiedModal
        isOpen={showSkillsModal}
        onClose={onCloseSkillsModal}
        title="Skill Mastery Trees"
        subtitle="Track your learning progression"
        icon={<Trophy size={22} weight="fill" className="text-b-writing" />}
        size="xl"
        position="center"
      >
        <SkillMasteryTrees
          mathProgress={mathProgress}
          readingProgress={readingProgress}
          latinXP={latinXP}
          greekXP={greekXP}
          logicXP={logicXP}
          onSkillSelect={onSkillSelect}
          userId={userId}
        />
      </UnifiedModal>
    </>
  )
}
