'use client'

import { useState } from 'react'
import { ArrowLeft, CircleNotch } from '@phosphor-icons/react'
import { useStartExploration } from '@/lib/hooks/useStartExploration'
import { useExplorationStep } from '@/lib/hooks/useExplorationStep'
import { useExplorationSession } from '@/lib/hooks/useExplorationSession'
import { ExplorationStepIndicator } from './ExplorationStepIndicator'
import { DefineTopicStep } from './DefineTopicStep'
import { ResearchQuestionsStep } from './ResearchQuestionsStep'
import { DeepDiveStep } from './DeepDiveStep'
import { SynthesisStep } from './SynthesisStep'
import { ExportStep } from './ExportStep'
import { ExplorationSessionsList } from './ExplorationSessionsList'
import type { ExplorationSession } from '@/lib/types/university'

interface GuidedExplorationProps {
  courseId?: string
  deliverableId?: string
  learningPathId?: string
  onBack: () => void
}

export function GuidedExploration({ courseId, deliverableId, learningPathId, onBack }: GuidedExplorationProps) {
  const { startExploration, isStarting, error: startError } = useStartExploration()
  const { advanceStep, isAdvancing, error: stepError } = useExplorationStep()

  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const { session, loading: sessionLoading, setSession } = useExplorationSession(activeSessionId || undefined)

  const [mode, setMode] = useState<'list' | 'new' | 'session'>('list')

  async function handleStartExploration(topic: string, scope?: string) {
    const result = await startExploration({ topic, scope, courseId, deliverableId, learningPathId })
    if (result.session) {
      setSession(result.session)
      setActiveSessionId(result.session.id)
      setMode('session')
    }
  }

  async function handleDeepDive(questionIndex: number) {
    if (!activeSessionId) return
    const result = await advanceStep({ sessionId: activeSessionId, step: 'deep-dive', questionIndex })
    if (result.session) setSession(result.session)
  }

  async function handleSynthesize() {
    if (!activeSessionId) return
    const result = await advanceStep({ sessionId: activeSessionId, step: 'synthesize' })
    if (result.session) setSession(result.session)
  }

  async function handleExport() {
    if (!activeSessionId) return
    const result = await advanceStep({ sessionId: activeSessionId, step: 'export' })
    if (result.session) setSession(result.session)
  }

  const error = startError || stepError

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={mode === 'session' || mode === 'new' ? () => setMode('list') : onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        {mode === 'session' || mode === 'new' ? 'Back to Explorations' : 'Back'}
      </button>

      <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-600 leading-relaxed">
          Guided explorations let you deep-dive into any topic through a structured research process. You define a question, generate research angles, investigate each one with AI assistance, then synthesize your findings into an exportable summary. Use explorations to prepare for deliverables or satisfy your curiosity.
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* List view */}
      {mode === 'list' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Topic Explorations</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                AI-guided research with exportable reports
              </p>
            </div>
            <button
              onClick={() => setMode('new')}
              className="bg-gray-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              New Exploration
            </button>
          </div>

          <ExplorationSessionsList
            courseId={courseId}
            onSelectSession={(id) => {
              setActiveSessionId(id)
              setMode('session')
            }}
          />
        </div>
      )}

      {/* New exploration */}
      {mode === 'new' && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">New Exploration</h2>
          <ExplorationStepIndicator currentStep="define-topic" />
          <DefineTopicStep onSubmit={handleStartExploration} isLoading={isStarting} />
        </div>
      )}

      {/* Active session */}
      {mode === 'session' && sessionLoading && (
        <div className="flex items-center justify-center py-12">
          <CircleNotch size={24} className="text-gray-400 animate-spin" />
        </div>
      )}

      {mode === 'session' && session && !sessionLoading && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">{session.topic}</h2>
          {session.scope && <p className="text-xs text-gray-500 mb-4">{session.scope}</p>}

          <ExplorationStepIndicator currentStep={session.currentStep} />

          {session.currentStep === 'research-questions' && (
            <ResearchQuestionsStep
              questions={session.researchQuestions}
              onProceed={() => {
                // Move to deep-dive step by updating the session's step
                setSession({ ...session, currentStep: 'deep-dive' })
              }}
            />
          )}

          {session.currentStep === 'deep-dive' && (
            <DeepDiveStep
              questions={session.researchQuestions}
              onExplore={handleDeepDive}
              isExploring={isAdvancing}
              onSynthesize={handleSynthesize}
            />
          )}

          {session.currentStep === 'synthesize' && (
            <SynthesisStep
              synthesis={session.synthesis}
              recommendedNextSteps={session.recommendedNextSteps}
              references={session.references}
              isSynthesizing={isAdvancing}
              onSynthesize={handleSynthesize}
              onExport={handleExport}
            />
          )}

          {session.currentStep === 'export' && (
            <ExportStep session={session} />
          )}
        </div>
      )}
    </div>
  )
}
