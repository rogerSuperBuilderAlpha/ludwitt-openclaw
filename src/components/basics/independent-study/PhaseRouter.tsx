'use client'

/**
 * PhaseRouter Component
 *
 * Renders the appropriate UI for the currently selected Independent Study
 * based on its phase: discovery, curriculum_preview, learning, building,
 * ai_review, professional_review, or completed.
 */

import { ArrowLeft, Trophy, CheckCircle } from '@phosphor-icons/react'
import { DiscoveryChat } from './DiscoveryChat'
import { CurriculumPreview } from './CurriculumPreview'
import { StudySession } from './StudySession'
import { ProjectTracker } from './ProjectTracker'
import { AIReviewPanel } from './AIReviewPanel'
import { ProfessionalReviewPanel } from './ProfessionalReviewPanel'
import type {
  IndependentStudyDisplay,
  CoursePrompt,
  ProjectDefinition,
  AIReview,
  ProfessionalReview,
} from '@/lib/types/independent-study'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface PhaseRouterProps {
  study: IndependentStudyDisplay
  allStudies: IndependentStudyDisplay[]
  error: string | null

  // Loading flags
  isGeneratingCurriculum: boolean

  // Handlers
  onClose: () => void
  onGenerateCurriculum: () => Promise<void>
  onConfirmCurriculum: () => Promise<void>
  onSwitchStudy: (study: IndependentStudyDisplay) => void
  onCreateNew: () => void
  onAllUnitsComplete: () => Promise<void>
  onProjectUpdate: (project: ProjectDefinition) => void
  onSubmitForAIReview: () => Promise<void>
  onProceedToProfessional: () => void
  onRetryProject: () => void
  onProfessionalUpdate: (review: ProfessionalReview) => void
  onStudyComplete: () => void
}

// ---------------------------------------------------------------------------
// Shared sub-layout for phases that use the "header + panel" pattern
// ---------------------------------------------------------------------------

function PhaseLayout({
  study,
  subtitle,
  bgGradient,
  onClose,
  error,
  children,
}: {
  study: IndependentStudyDisplay
  subtitle: string
  bgGradient: string
  onClose: () => void
  error: string | null
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen ${bgGradient} py-8`}>
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="font-bold text-gray-800">{study.title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PhaseRouter
// ---------------------------------------------------------------------------

export function PhaseRouter({
  study,
  allStudies,
  error,
  isGeneratingCurriculum,
  onClose,
  onGenerateCurriculum,
  onConfirmCurriculum,
  onSwitchStudy,
  onCreateNew,
  onAllUnitsComplete,
  onProjectUpdate,
  onSubmitForAIReview,
  onProceedToProfessional,
  onRetryProject,
  onProfessionalUpdate,
  onStudyComplete,
}: PhaseRouterProps) {
  const { phase } = study

  // ---- Discovery -----------------------------------------------------------
  if (phase === 'discovery') {
    return (
      <DiscoveryChat
        study={study}
        onClose={onClose}
        onReadyToGenerate={onGenerateCurriculum}
        onBack={onClose}
      />
    )
  }

  // ---- Curriculum Preview --------------------------------------------------
  if (phase === 'curriculum_preview' && study.coursePrompt) {
    return (
      <CurriculumPreview
        study={study}
        coursePrompt={study.coursePrompt as CoursePrompt}
        onConfirm={onConfirmCurriculum}
        onRegenerate={onGenerateCurriculum}
        onClose={onClose}
        isConfirming={isGeneratingCurriculum}
      />
    )
  }

  // ---- Learning ------------------------------------------------------------
  if (phase === 'learning') {
    return (
      <StudySession
        study={study}
        allStudies={allStudies}
        onClose={onClose}
        onBack={onClose}
        onSwitchStudy={onSwitchStudy}
        onCreateNew={onCreateNew}
        onAllUnitsComplete={onAllUnitsComplete}
      />
    )
  }

  // ---- Building ------------------------------------------------------------
  if (phase === 'building' && study.project) {
    return (
      <PhaseLayout
        study={study}
        subtitle="Building Phase"
        bgGradient="bg-gradient-to-br from-violet-50 to-purple-50"
        onClose={onClose}
        error={error}
      >
        <ProjectTracker
          study={study}
          project={study.project}
          onUpdate={onProjectUpdate}
          onSubmitForReview={onSubmitForAIReview}
        />
      </PhaseLayout>
    )
  }

  // ---- AI Review (also covers building/professional_review with aiReview) --
  if (
    (phase === 'ai_review' ||
      phase === 'professional_review' ||
      phase === 'building') &&
    study.aiReview
  ) {
    return (
      <PhaseLayout
        study={study}
        subtitle="AI Review"
        bgGradient="bg-gradient-to-br from-indigo-50 to-violet-50"
        onClose={onClose}
        error={error}
      >
        <AIReviewPanel
          study={study}
          review={study.aiReview as AIReview}
          onProceedToProfessional={onProceedToProfessional}
          onRetryProject={onRetryProject}
        />
      </PhaseLayout>
    )
  }

  // ---- Professional Review -------------------------------------------------
  if (phase === 'professional_review') {
    return (
      <PhaseLayout
        study={study}
        subtitle="Professional Review"
        bgGradient="bg-gradient-to-br from-indigo-50 to-violet-50"
        onClose={onClose}
        error={error}
      >
        <ProfessionalReviewPanel
          study={study}
          review={study.professionalReview as ProfessionalReview | null}
          onUpdate={onProfessionalUpdate}
          onComplete={onStudyComplete}
        />
      </PhaseLayout>
    )
  }

  // ---- Completed -----------------------------------------------------------
  if (phase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <Trophy size={48} weight="fill" className="text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Independent Study Complete!
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Congratulations on completing your Independent Study on{' '}
            {study.title}! You&apos;ve demonstrated mastery and received
            professional validation.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="px-6 py-3 bg-emerald-100 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">
                {study.totalXP}
              </div>
              <div className="text-xs text-emerald-500">Total XP</div>
            </div>
            <div className="px-6 py-3 bg-emerald-100 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">
                <CheckCircle size={24} weight="fill" className="inline" />
              </div>
              <div className="text-xs text-emerald-500">Certified</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Back to Studies
          </button>
        </div>
      </div>
    )
  }

  // Fallback: unknown or transitional phase -- close out
  return null
}
