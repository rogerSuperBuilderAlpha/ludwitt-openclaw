import { useState, useEffect } from 'react'

export function useCelebrations(
  userId: string | undefined,
  cursorSetupComplete: boolean,
  personalWebsiteComplete: boolean,
  vercelDeploymentComplete: boolean
) {
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationType, setCelebrationType] = useState<'small' | 'medium' | 'large'>('small')
  const [celebrationMessage, setCelebrationMessage] = useState('')
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  // Trigger celebration for Cursor setup complete
  useEffect(() => {
    if (cursorSetupComplete && userId) {
      const key = `cursor-celebration-${userId}`
      const hasShown = localStorage.getItem(key)

      if (!hasShown) {
        setCelebrationType('small')
        setCelebrationMessage('Cursor Setup Complete!')
        setShowCelebration(true)
        localStorage.setItem(key, 'true')
      }
    }
  }, [cursorSetupComplete, userId])

  // Trigger celebration for Personal Website complete
  useEffect(() => {
    if (personalWebsiteComplete && userId) {
      const key = `website-celebration-${userId}`
      const hasShown = localStorage.getItem(key)

      if (!hasShown) {
        setCelebrationType('medium')
        setCelebrationMessage('Website Complete! Great Job!')
        setShowCelebration(true)
        localStorage.setItem(key, 'true')
      }
    }
  }, [personalWebsiteComplete, userId])

  // Trigger BIG celebration for Vercel deployment complete
  useEffect(() => {
    if (vercelDeploymentComplete && userId) {
      const key = `vercel-celebration-${userId}`
      const hasShown = localStorage.getItem(key)

      if (!hasShown) {
        setCelebrationType('large')
        setCelebrationMessage("You've RISEN above the PITCH!")
        setShowCelebration(true)
        localStorage.setItem(key, 'true')

        // Show welcome modal after celebration
        setTimeout(() => {
          const modalKey = `welcome-modal-${userId}`
          const modalShown = localStorage.getItem(modalKey)
          if (!modalShown) {
            setShowWelcomeModal(true)
            localStorage.setItem(modalKey, 'true')
          }
        }, 8500)
      }
    }
  }, [vercelDeploymentComplete, userId])

  // Show welcome modal immediately if celebration was already shown
  useEffect(() => {
    if (vercelDeploymentComplete && userId) {
      const celebrationKey = `vercel-celebration-${userId}`
      const modalKey = `welcome-modal-${userId}`
      const celebrationShown = localStorage.getItem(celebrationKey)
      const modalShown = localStorage.getItem(modalKey)

      if (celebrationShown && !modalShown) {
        setTimeout(() => setShowWelcomeModal(true), 500)
      }
    }
  }, [vercelDeploymentComplete, userId])

  return {
    showCelebration,
    celebrationType,
    celebrationMessage,
    showWelcomeModal,
    setShowCelebration,
    setShowWelcomeModal,
  }
}
