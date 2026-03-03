/**
 * AvatarGenerator - Handles AI avatar generation
 * Generates and manages companion avatars using AI
 */

'use client'

import { useState } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { AvatarModal } from '@/components/basics/companions'
import { AVATAR_COST_CENTS } from '@/data/companions/attributes'
import { AvatarGeneratorProps } from './types'
import { logger } from '@/lib/logger'

export function AvatarGenerator({
  selectedSubject,
  companion,
  userCredits,
  companions,
  saveCompanions,
  showNotif,
  refreshCredits,
  onGenerateComplete,
}: AvatarGeneratorProps) {
  const fetchApi = useApiFetch()
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false)
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState<string | null>(
    null
  )

  // Generate avatar
  const generateAvatar = async () => {
    if (!selectedSubject || !companion || companion.level < 1) {
      showNotif('❌ Evolve your companion first!')
      return
    }

    if (userCredits < AVATAR_COST_CENTS) {
      showNotif('❌ Not enough credits for avatar!')
      return
    }

    setIsGeneratingAvatar(true)
    setShowAvatarModal(true)
    setGeneratedAvatarUrl(null)

    try {
      const result = await fetchApi<{
        avatarUrl: string
        creditsUsed: number
        message: string
      }>('/api/basics/companion/generate-avatar', {
        method: 'POST',
        body: JSON.stringify({
          subject: selectedSubject,
          companionName: companion.name,
          companionEmoji: companion.currentEmoji,
          companionDescription: companion.description,
          companionPersonality: companion.personality,
          element: companion.selectedElement || 'Light',
          style: companion.selectedStyle || 'Mythical',
        }),
      })

      refreshCredits()
      setGeneratedAvatarUrl(result.avatarUrl)

      await saveCompanions({
        ...companions,
        [selectedSubject]: {
          ...companion,
          avatarUrl: result.avatarUrl,
        },
      })

      onGenerateComplete(selectedSubject, result.avatarUrl)
      showNotif(`📸 Avatar created for ${companion.name}!`)
    } catch (error: unknown) {
      logger.error('AvatarGenerator', 'Avatar generation failed', { error })
      const errMessage = error instanceof Error ? error.message : String(error)
      if (errMessage?.includes('Insufficient credits')) {
        showNotif('❌ Not enough credits for avatar!')
      } else {
        showNotif('❌ Avatar generation failed. Try again!')
      }
      setShowAvatarModal(false)
    } finally {
      setIsGeneratingAvatar(false)
    }
  }

  // Use avatar as profile picture
  const useAsProfileAvatar = async (userId?: string) => {
    if (!generatedAvatarUrl || !selectedSubject) return

    if (userId) {
      localStorage.setItem(`user_avatar_${userId}`, generatedAvatarUrl)
      showNotif('✅ Avatar set as your profile picture!')
    }
    setShowAvatarModal(false)
  }

  // Trigger generation when component receives a subject
  if (selectedSubject && !showAvatarModal && !isGeneratingAvatar) {
    generateAvatar()
  }

  return (
    <AvatarModal
      isOpen={showAvatarModal}
      onClose={() => setShowAvatarModal(false)}
      isGenerating={isGeneratingAvatar}
      avatarUrl={generatedAvatarUrl}
      companionName={companion?.name || ''}
      onUseAsProfile={useAsProfileAvatar}
    />
  )
}
