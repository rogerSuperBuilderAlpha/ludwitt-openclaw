'use client'

/**
 * Independent Study Dashboard Page
 *
 * Orchestrates the full Independent Study pipeline:
 * 1. Discovery - AI learns what student wants to study
 * 2. Curriculum Preview - Review generated curriculum
 * 3. Learning - Work through lessons with AI tutor
 * 4. Building - Create project with milestone tracking
 * 5. AI Review - Submit for AI evaluation
 * 6. Professional Review - Get expert sign-off
 * 7. Completed - Celebration!
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Brain,
  PlusCircle,
  ArrowLeft,
  Sparkle,
  Trophy,
  FastForward,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useIndependentStudyAccess } from '@/lib/hooks/useIndependentStudyAccess'
import { useIndependentStudyApi } from '@/lib/hooks/useIndependentStudyApi'
import {
  StudyList,
  UnlockProgress,
  CreateStudyModal,
  PhaseRouter,
} from '@/components/basics/independent-study'

export default function IndependentStudyPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const accessStatus = useIndependentStudyAccess({ userId: user?.uid })

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [bypassedPrereqs, setBypassedPrereqs] = useState(false)
  const [canBypass, setCanBypass] = useState(false)

  // Check admin bypass status server-side (emails never sent to client)
  useEffect(() => {
    if (!user) return
    user.getIdToken().then(token => {
      fetch('/api/basics/independent-study/admin-check', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => { if (data.canBypass) setCanBypass(true) })
        .catch(() => {})
    })
  }, [user])

  // Hook owns all API state & handlers
  const api = useIndependentStudyApi({
    user,
    externallyUnlocked: accessStatus.isUnlocked || bypassedPrereqs,
  })

  // User is effectively unlocked if: completed prereqs OR admin bypass OR paid skip
  const effectivelyUnlocked =
    accessStatus.isUnlocked || bypassedPrereqs || api.hasPaidSkip

  // User completed prereqs naturally (not via skip)
  const completedPrereqsNaturally = accessStatus.isUnlocked

  // ---- Loading state -------------------------------------------------------
  if (authLoading || accessStatus.isLoading || api.isCheckingSkipStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-amber-200 rounded-full mb-4" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    )
  }

  // ---- Not authenticated ---------------------------------------------------
  if (!user) {
    router.push('/login?redirect=/basics/independent-study')
    return null
  }

  // ---- Phase-specific view when a study is selected ------------------------
  if (api.selectedStudy) {
    return (
      <PhaseRouter
        study={api.selectedStudy}
        allStudies={api.studies}
        error={api.error}
        isGeneratingCurriculum={api.isGeneratingCurriculum}
        onClose={() => api.setSelectedStudy(null)}
        onGenerateCurriculum={api.handleGenerateCurriculum}
        onConfirmCurriculum={api.handleConfirmCurriculum}
        onSwitchStudy={api.handleSwitchStudy}
        onCreateNew={() => {
          api.setSelectedStudy(null)
        }}
        onAllUnitsComplete={api.handleAllUnitsComplete}
        onProjectUpdate={api.handleProjectUpdate}
        onSubmitForAIReview={api.handleSubmitForAIReview}
        onProceedToProfessional={api.handleProceedToProfessional}
        onRetryProject={api.handleRetryProject}
        onProfessionalUpdate={api.handleProfessionalUpdate}
        onStudyComplete={api.handleStudyComplete}
      />
    )
  }

  // ---- Main dashboard view -------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Brain size={24} weight="bold" color="white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Independent Study</h1>
                <p className="text-xs text-gray-500">
                  Explore any topic with AI
                </p>
              </div>
            </div>
          </div>

          {effectivelyUnlocked && (
            <button
              onClick={() => setShowCreateModal(true)}
              disabled={api.isCreating}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-50"
            >
              <PlusCircle size={18} weight="bold" />
              {api.isCreating ? 'Creating...' : 'New Study'}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Error Banner */}
        {api.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {api.error}
            <button
              onClick={() => api.setError(null)}
              className="ml-4 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Unlocked State */}
        {effectivelyUnlocked ? (
          <div className="space-y-8">
            {/* Welcome Banner (show if no studies yet) */}
            {api.studies.length === 0 && !api.isLoadingStudies && (
              <div
                className="p-8 rounded-2xl text-center"
                style={{
                  background:
                    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Trophy size={40} weight="fill" color="white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {bypassedPrereqs
                    ? 'Welcome, Admin!'
                    : api.hasPaidSkip
                      ? 'Welcome to Independent Study!'
                      : 'Congratulations, Master!'}
                </h2>
                <p className="text-white/90 mb-6 max-w-lg mx-auto">
                  {bypassedPrereqs
                    ? "You've bypassed prerequisites. Explore any topic with your personal AI tutor."
                    : api.hasPaidSkip
                      ? "You've unlocked Independent Study. Explore any topic with your personal AI tutor. AI usage will be charged per message."
                      : "You've completed the entire Ludwitt curriculum. Now you can explore any topic that interests you with your personal AI tutor!"}
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  disabled={api.isCreating}
                  className="px-8 py-3 bg-white text-amber-600 rounded-xl font-bold flex items-center gap-2 mx-auto hover:bg-amber-50 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Sparkle size={20} weight="fill" />
                  {api.isCreating ? 'Creating...' : 'Start Your First Study'}
                </button>
              </div>
            )}

            {/* Study List */}
            <StudyList
              studies={api.studies}
              onSelectStudy={api.setSelectedStudy}
              onArchiveStudy={api.handleArchiveStudy}
              isLoading={api.isLoadingStudies}
            />
          </div>
        ) : (
          /* Locked State - Show Prerequisites with skip option */
          <UnlockProgress
            status={accessStatus}
            isLoading={accessStatus.isLoading}
            onSkipPrereqs={api.handleSkipPrereqs}
            isSkipping={api.isSkipping}
          />
        )}

        {/* Admin Bypass Button - Fixed to bottom right */}
        {canBypass && !effectivelyUnlocked && (
          <button
            onClick={() => setBypassedPrereqs(true)}
            className="fixed bottom-6 right-6 px-5 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2 hover:bg-purple-700 transition-all cursor-pointer z-50"
            style={{ boxShadow: '0 10px 40px rgba(147, 51, 234, 0.4)' }}
          >
            <FastForward size={20} weight="bold" />
            Advance Anyway
          </button>
        )}
      </main>

      {/* Create Study Modal */}
      <CreateStudyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateStudy={api.handleCreateStudy}
        isCreating={api.isCreating}
        isFreeCreation={completedPrereqsNaturally}
      />
    </div>
  )
}
