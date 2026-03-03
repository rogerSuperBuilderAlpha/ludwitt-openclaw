/**
 * EvolutionFlow - Handles evolution UI and mechanics
 * Manages the evolution process from attribute selection to AI generation
 */

'use client'

import { useState } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'
import { EvolutionModal, EvolutionStep } from '@/components/basics/companions'
import {
  EvolutionAttributes,
  GeneratedCompanion,
  PERSONALITY_OPTIONS,
  ELEMENT_OPTIONS,
  STYLE_OPTIONS,
  SPECIALTY_OPTIONS,
  EVOLUTION_COST_CENTS,
} from '@/data/companions/attributes'
import { EvolutionFlowProps } from './types'

export function EvolutionFlow({
  isOpen,
  onClose,
  subject,
  companion,
  userCredits,
  companions,
  saveCompanions,
  showNotif,
  refreshCredits,
}: EvolutionFlowProps) {
  const fetchApi = useApiFetch()
  const [evolutionStep, setEvolutionStep] =
    useState<EvolutionStep>('personality')
  const [selectedAttributes, setSelectedAttributes] =
    useState<EvolutionAttributes>({
      personality: '',
      element: '',
      style: '',
      specialty: '',
    })
  const [generatedCompanion, setGeneratedCompanion] =
    useState<GeneratedCompanion | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Reset state when modal opens
  const handleOpen = () => {
    setSelectedAttributes({
      personality: '',
      element: '',
      style: '',
      specialty: '',
    })
    setEvolutionStep('personality')
    setGeneratedCompanion(null)
  }

  // Generate companion with AI
  const generateCompanion = async () => {
    if (!subject || !companion) return

    if (userCredits < EVOLUTION_COST_CENTS) {
      showNotif('❌ Not enough credits to evolve!')
      return
    }

    setIsGenerating(true)
    setEvolutionStep('generating')

    try {
      const result = await fetchApi<{
        companion: GeneratedCompanion
        aiGenerated: boolean
        creditsCharged?: number
      }>('/api/basics/companion/evolve', {
        method: 'POST',
        body: JSON.stringify({
          subject,
          currentLevel: companion.level,
          currentName: companion.name,
          selectedAttributes: {
            personality:
              PERSONALITY_OPTIONS.find(
                (p) => p.id === selectedAttributes.personality
              )?.label || selectedAttributes.personality,
            element:
              ELEMENT_OPTIONS.find((e) => e.id === selectedAttributes.element)
                ?.label || selectedAttributes.element,
            style:
              STYLE_OPTIONS.find((s) => s.id === selectedAttributes.style)
                ?.label || selectedAttributes.style,
            specialty:
              SPECIALTY_OPTIONS[subject].find(
                (s) => s.id === selectedAttributes.specialty
              )?.label || selectedAttributes.specialty,
          },
          previousEvolutions: companion.evolutionHistory.map((e) => e.name),
        }),
      })

      refreshCredits()
      setGeneratedCompanion(result.companion)
      setEvolutionStep('result')
    } catch (error: unknown) {
      logger.error('EvolutionFlow', 'Evolution failed', { error })
      const errMessage = error instanceof Error ? error.message : String(error)
      if (errMessage?.includes('Insufficient credits')) {
        showNotif('❌ Not enough credits to evolve!')
      } else {
        showNotif('❌ Evolution failed. Please try again!')
      }
      setEvolutionStep('specialty')
    } finally {
      setIsGenerating(false)
    }
  }

  // Confirm evolution
  const confirmEvolution = async () => {
    if (!subject || !generatedCompanion || !companion) return

    const newLevel = companion.level + 1

    let freeHints = companion.freeHints
    let freeExplanations = companion.freeExplanations
    let hasStreakShield = companion.hasStreakShield
    let hasSkipProtection = companion.hasSkipProtection

    if (newLevel === 1) freeHints += 2
    if (newLevel === 2) freeExplanations += 1
    if (newLevel === 3) hasStreakShield = true
    if (newLevel === 4) {
      freeHints += 3
      hasSkipProtection = true
    }
    if (newLevel === 5) freeHints = 999

    const evolved = {
      ...companion,
      name: generatedCompanion.name,
      currentEmoji: generatedCompanion.emoji,
      description: generatedCompanion.description,
      personality: generatedCompanion.personality,
      specialAbility: generatedCompanion.specialAbility,
      catchphrase: generatedCompanion.catchphrase,
      evolutionHistory: [...companion.evolutionHistory, generatedCompanion],
      level: newLevel,
      pendingEvolution: false,
      freeHints,
      freeExplanations,
      hasStreakShield,
      hasSkipProtection,
      happiness: Math.min(100, companion.happiness + 30),
      energy: Math.min(100, companion.energy + 20),
      selectedElement: ELEMENT_OPTIONS.find(
        (e) => e.id === selectedAttributes.element
      )?.label,
      selectedStyle: STYLE_OPTIONS.find(
        (s) => s.id === selectedAttributes.style
      )?.label,
    }

    await saveCompanions({ ...companions, [subject]: evolved })
    onClose()
    showNotif(`✨ ${generatedCompanion.name} has evolved!`)
  }

  return (
    <EvolutionModal
      isOpen={isOpen}
      onClose={onClose}
      subject={subject}
      companion={companion}
      evolutionStep={evolutionStep}
      selectedAttributes={selectedAttributes}
      generatedCompanion={generatedCompanion}
      isGenerating={isGenerating}
      userCredits={userCredits}
      onAttributeSelect={(key, value) =>
        setSelectedAttributes((prev) => ({ ...prev, [key]: value }))
      }
      onNextStep={setEvolutionStep}
      onGenerate={generateCompanion}
      onConfirm={confirmEvolution}
    />
  )
}
