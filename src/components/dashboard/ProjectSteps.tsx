'use client'

import { User } from 'firebase/auth'
import { InfoCard } from '@/components/ui/InfoCard'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { DynamicProjectGuide } from '@/components/projects/DynamicProjectGuide'
import { PortfolioItemForm } from '@/components/portfolio/PortfolioItemForm'
import { ALCProject } from '@/lib/alc/types'
import { MAX_PROJECTS } from '@/components/dashboard/types'

// -------------------------------------------------------------------
// Portfolio prompt
// -------------------------------------------------------------------

interface PortfolioPromptStepProps {
  user: User
  project: ALCProject
  onComplete: () => void
}

export function PortfolioPromptStep({
  user,
  project,
  onComplete,
}: PortfolioPromptStepProps) {
  return (
    <PortfolioItemForm
      user={user}
      projectId={project.id}
      projectTitle={project.title}
      onComplete={onComplete}
    />
  )
}

// -------------------------------------------------------------------
// Completion (all projects done)
// -------------------------------------------------------------------

export function CompletionStep() {
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
        <div className="text-6xl">&#127942;</div>
        <h2 className="text-3xl font-bold text-gray-900">Journey Complete!</h2>
        <p className="text-lg text-gray-700">
          You&apos;ve completed all {MAX_PROJECTS} projects. You&apos;re now a
          builder. Keep exploring, keep creating, and keep rising.
        </p>
        <div className="pt-4 space-y-3">
          <a
            href="/developers"
            className="inline-block w-full max-w-md mx-auto bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            Explore Developer Portal
          </a>
        </div>
      </div>
    </div>
  )
}

// -------------------------------------------------------------------
// Generate project prompt
// -------------------------------------------------------------------

interface GenerateProjectStepProps {
  projectsCompletedCount: number
  projectError: string
  onGenerateProject: () => Promise<void>
}

export function GenerateProjectStep({
  projectsCompletedCount,
  projectError,
  onGenerateProject,
}: GenerateProjectStepProps) {
  const isFirstProject = projectsCompletedCount === 0
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-gray-50 rounded-lg shadow-xl p-8 space-y-6">
        <div className="text-6xl">&#10024;</div>
        <h2 className="text-3xl font-bold text-gray-900">
          {isFirstProject
            ? 'Ready to Build Your First Custom Project?'
            : `Project ${projectsCompletedCount + 1} of ${MAX_PROJECTS}`}
        </h2>
        <p className="text-lg text-gray-700">
          {isFirstProject
            ? "Based on your 5-year vision and skills, we'll generate a personalized project that moves you toward your goals."
            : "Let's generate your next project to keep you moving toward your 5-year vision!"}
        </p>
        {projectError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
            {projectError}
          </div>
        )}
        <button
          onClick={onGenerateProject}
          className="w-full max-w-md mx-auto bg-gray-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl text-lg"
        >
          {isFirstProject
            ? 'Generate My Custom Project'
            : 'Generate Next Project'}
        </button>
      </div>
    </div>
  )
}

// -------------------------------------------------------------------
// Generating project (loading spinner)
// -------------------------------------------------------------------

export function GeneratingProjectStep() {
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-gray-50 rounded-lg shadow-xl p-12 space-y-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Generating Your Custom Project...
        </h2>
        <p className="text-gray-700">
          Our AI is analyzing your vision and creating a personalized learning
          path. This may take 10-30 seconds.
        </p>
      </div>
    </div>
  )
}

// -------------------------------------------------------------------
// Working on a custom project
// -------------------------------------------------------------------

interface WorkOnProjectStepProps {
  project: ALCProject
  onComplete: () => Promise<void>
}

export function WorkOnProjectStep({
  project,
  onComplete,
}: WorkOnProjectStepProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8">
      <InfoCard
        title={`Custom Project #${project.projectNumber}`}
        description="Continue building toward your 5-year vision with this AI-generated project designed just for you."
      />
      <ErrorBoundary componentName="Dynamic Project Guide">
        <DynamicProjectGuide project={project} onComplete={onComplete} />
      </ErrorBoundary>
    </div>
  )
}

// -------------------------------------------------------------------
// Fallback (unexpected state)
// -------------------------------------------------------------------

export function FallbackStep() {
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-gray-50 rounded-lg shadow-lg p-8 space-y-4">
        <div className="text-6xl">&#129300;</div>
        <h2 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h2>
        <p className="text-gray-700">
          Please refresh the page or contact support if the issue persists.
        </p>
      </div>
    </div>
  )
}
