'use client'

import { useEffect, useRef } from 'react'
import { User } from 'firebase/auth'
import { KeyboardHelp } from './KeyboardHelp'
import { QuickActionsBar, type QuickAction } from './QuickActionsBar'
import { DigitalCertificate, type CertificateData } from './DigitalCertificate'
import { SocialSharing, type ShareableAchievement } from './SocialSharing'
import { ViralChallenge } from './ViralChallenges'
import { X } from '@phosphor-icons/react'
import { Portal } from './Portal'

interface BasicsModalsProps {
  // Keyboard Help
  showKeyboardHelp: boolean
  onCloseKeyboardHelp: () => void

  // Quick Actions
  showQuickActions: boolean
  onCloseQuickActions: () => void
  quickActions: QuickAction[]

  // Certificate
  showCertificate: CertificateData | null
  onCloseCertificate: () => void

  // Social Sharing
  showSocialSharing: ShareableAchievement | null
  onCloseSocialSharing: () => void
  user: User | null

  // Viral Challenge
  openViralChallenge: ViralChallenge | null
  onCloseViralChallenge: () => void
  onJoinChallenge: (challenge: ViralChallenge) => Promise<void>
  joinedChallenges: string[]
}

export function BasicsModals({
  showKeyboardHelp,
  onCloseKeyboardHelp,
  showQuickActions,
  onCloseQuickActions,
  quickActions,
  showCertificate,
  onCloseCertificate,
  showSocialSharing,
  onCloseSocialSharing,
  user,
  openViralChallenge,
  onCloseViralChallenge,
  onJoinChallenge,
  joinedChallenges,
}: BasicsModalsProps) {
  const quickActionsRef = useRef<HTMLDivElement>(null)
  const viralChallengeRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const previousViralFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!showQuickActions) return

    previousFocusRef.current = document.activeElement as HTMLElement
    const focusModal = () => quickActionsRef.current?.focus()
    const timeoutId = window.setTimeout(focusModal, 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseQuickActions()
        return
      }
      if (event.key !== 'Tab') return

      const focusableElements = quickActionsRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [showQuickActions, onCloseQuickActions])

  useEffect(() => {
    if (!openViralChallenge) return

    previousViralFocusRef.current = document.activeElement as HTMLElement
    const focusModal = () => viralChallengeRef.current?.focus()
    const timeoutId = window.setTimeout(focusModal, 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseViralChallenge()
        return
      }
      if (event.key !== 'Tab') return

      const focusableElements = viralChallengeRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('keydown', handleKeyDown)
      previousViralFocusRef.current?.focus()
    }
  }, [openViralChallenge, onCloseViralChallenge])

  return (
    <>
      {/* Keyboard Help Modal */}
      <KeyboardHelp isOpen={showKeyboardHelp} onClose={onCloseKeyboardHelp} />

      {/* Quick Actions Modal */}
      {showQuickActions && (
        <Portal>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onCloseQuickActions}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              ref={quickActionsRef}
              className="b-bg-card rounded-xl shadow-b-modal w-full max-w-xl p-5"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-actions-title"
              tabIndex={-1}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  id="quick-actions-title"
                  className="text-lg font-semibold b-text-primary"
                >
                  Quick Actions
                </h3>
                <button
                  onClick={onCloseQuickActions}
                  aria-label="Close quick actions"
                  className="p-1 b-text-muted hover:b-text-secondary hover:b-bg-muted rounded-lg transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>
              <p className="text-sm b-text-muted mb-4">
                Use these to move faster. You can also use keyboard shortcuts:
                Enter submit, S skip, H hint, F focus.
              </p>
              <div className="overflow-x-auto">
                <QuickActionsBar actions={quickActions} />
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Digital Certificate Modal */}
      {showCertificate && (
        <DigitalCertificate
          data={showCertificate}
          onClose={onCloseCertificate}
          onShare={() => {}}
          onDownload={() => {}}
        />
      )}

      {/* Social Sharing Modal */}
      {showSocialSharing && user && (
        <SocialSharing
          achievement={showSocialSharing}
          studentName={
            user.displayName || user.email?.split('@')[0] || 'Student'
          }
          onClose={onCloseSocialSharing}
        />
      )}

      {/* Viral Challenge Modal */}
      {openViralChallenge && (
        <Portal>
          <div className="fixed inset-0 bg-black/50 z-50" aria-hidden="true" />
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
            <div
              ref={viralChallengeRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="viral-challenge-title"
              tabIndex={-1}
              className="b-bg-card rounded-xl shadow-b-modal max-w-2xl w-full mb-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b b-border">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{openViralChallenge.icon}</div>
                  <div>
                    <h2
                      id="viral-challenge-title"
                      className="text-lg font-semibold b-text-primary"
                    >
                      {openViralChallenge.title}
                    </h2>
                    <p className="text-sm b-text-muted">
                      {openViralChallenge.hashtag}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onCloseViralChallenge}
                  className="p-2 b-text-muted hover:b-text-secondary hover:b-bg-muted rounded-lg transition-colors"
                  aria-label="Close viral challenge"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Description */}
                <p className="b-text-secondary">
                  {openViralChallenge.description}
                </p>

                {/* Challenge Overview */}
                <div className="b-bg-muted rounded-lg p-4">
                  <h3 className="font-medium b-text-primary mb-3">
                    Challenge Overview
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="b-text-muted">Duration:</span>
                      <span className="font-medium b-text-primary">
                        {openViralChallenge.duration} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="b-text-muted">Goal:</span>
                      <span className="font-medium b-text-primary">
                        {openViralChallenge.goal.target}{' '}
                        {openViralChallenge.goal.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="b-text-muted">Subject:</span>
                      <span className="font-medium b-text-primary">
                        {openViralChallenge.goal.subject || 'Both'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="b-text-muted">Participants:</span>
                      <span className="font-medium b-text-primary">
                        {openViralChallenge.participants.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                <div className="b-bg-math-light rounded-lg p-4">
                  <h3 className="font-medium b-text-primary mb-3">Rewards</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="b-text-secondary">Completion:</span>
                      <span className="font-medium b-text-math">
                        {openViralChallenge.rewards.completion}
                      </span>
                    </div>
                    <div className="pt-2 border-t b-border-math">
                      <div className="b-text-secondary mb-1">Leaderboard:</div>
                      <div className="space-y-1">
                        {openViralChallenge.rewards.leaderboard.map(
                          (prize: string, idx: number) => (
                            <div
                              key={idx}
                              className="flex justify-between text-xs"
                            >
                              <span className="b-text-muted">#{idx + 1}</span>
                              <span className="b-text-math">{prize}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {!joinedChallenges.includes(openViralChallenge.id) ? (
                    <button
                      onClick={async () => {
                        await onJoinChallenge(openViralChallenge)
                      }}
                      className="flex-1 b-btn b-btn-logic py-2.5 px-5 font-medium"
                    >
                      🚀 Join Challenge
                    </button>
                  ) : (
                    <div className="flex-1 b-bg-reading-light border b-border-reading b-text-reading py-2.5 px-5 rounded-lg font-medium text-center">
                      ✅ Challenge Joined!
                    </div>
                  )}
                  <button
                    onClick={onCloseViralChallenge}
                    className="px-5 py-2.5 border b-border rounded-lg hover:b-bg-muted transition-colors b-text-secondary font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
