'use client'

/**
 * Reading Section V2
 *
 * Main orchestrator for the evidence-based reading module.
 * Routes to appropriate exercise components based on exercise type.
 *
 * Based on Science of Reading principles:
 * - Scarborough's Reading Rope
 * - Simple View of Reading
 * - Active View of Reading
 */

import { useState } from 'react'
import { Fire, TreeStructure, Target, Clock } from '@phosphor-icons/react'
import {
  ReadingExerciseV2,
  ReadingExerciseTypeV2,
} from '@/lib/types/reading-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { EngagementState } from '@/lib/hooks/useEngagementTracking'
import { useReadingExerciseV2 } from '@/lib/hooks/useReadingExerciseV2'

// Exercise components
import { ComprehensionExercise } from './exercises/ComprehensionExercise'
import { VocabularyExercise } from './exercises/VocabularyExercise'
import { MorphologyExercise } from './exercises/MorphologyExercise'
import { FluencyExercise } from './exercises/FluencyExercise'
import { TextStructureExercise } from './exercises/TextStructureExercise'
import { ReciprocalTeachingExercise } from './exercises/ReciprocalTeachingExercise'

// Shared components
import { ReadingSkillTreeModal } from './skill-tree/ReadingSkillTreeModal'

// Existing components we'll reuse
import { SingleProgressChip } from '../SingleProgressChip'
import { GradeProgressBar } from '../GradeProgressBar'
import { StruggleIntervention } from '../StruggleIntervention'
import { TransferChallenge } from '../transfer/TransferChallenge'
import { SectionErrorBoundary } from '@/components/ui/ErrorBoundary'

interface ReadingSectionV2Props {
  exercise: ReadingExerciseV2 | null
  progress: SubjectProgressDisplay | null
  skillMastery?: Record<string, number>
  onExerciseComplete: (
    nextExercise: ReadingExerciseV2,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number
  ) => void
  onSkip: () => void
  engagement: EngagementState
  onBonusEarned?: (points: number) => void
  dailyXP?: number
  dailyGoal?: number
  // Focus Mode
  onFocusModeClick?: () => void
  focusModeAvailable?: boolean
  focusModeNextAvailable?: Date | null
}

export function ReadingSectionV2({
  exercise,
  progress,
  skillMastery = {},
  onExerciseComplete,
  onSkip,
  engagement,
  onBonusEarned,
  dailyXP = 0,
  dailyGoal = 1000,
  onFocusModeClick,
  focusModeAvailable = true,
  focusModeNextAvailable,
}: ReadingSectionV2Props) {
  const dailyXPMet = dailyXP >= dailyGoal
  const [showSkillTree, setShowSkillTree] = useState(false)

  // Use the V2 hook for exercise management
  const reading = useReadingExerciseV2({
    exercise,
    progress,
    engagement,
    onExerciseComplete,
    onSkip,
    onBonusEarned,
  })

  // Get skill category for compact display
  const getSkillCategory = (type: ReadingExerciseTypeV2): string => {
    if (
      [
        'phonological-awareness',
        'phonics-decoding',
        'fluency-practice',
        'word-study',
      ].includes(type)
    ) {
      return 'Word Recognition'
    }
    if (
      [
        'vocabulary-context',
        'vocabulary-direct',
        'morphology',
        'word-relationships',
      ].includes(type)
    ) {
      return 'Vocabulary'
    }
    return 'Comprehension'
  }

  // Render the appropriate exercise component based on type
  const renderExercise = () => {
    if (!exercise) return null

    const commonProps = {
      exercise,
      answers: reading.answers,
      isSubmitting: reading.isSubmitting,
      feedback: reading.feedback,
      aiFeedback: reading.aiFeedback,
      isAiGrading: reading.isAiGrading,
      onAnswerChange: reading.handleAnswerChange,
      onSubmit: reading.handleSubmit,
      onSkip: reading.handleSkip,
      onContinue: reading.handleContinue,
      onBonusEarned: reading.handleBonusEarned,
      hasNextExercise: !!reading.nextExerciseData,
    }

    switch (exercise.type) {
      case 'fluency-practice':
        return <FluencyExercise {...commonProps} />

      case 'vocabulary-context':
      case 'vocabulary-direct':
        return <VocabularyExercise {...commonProps} />

      case 'morphology':
        return <MorphologyExercise {...commonProps} />

      case 'text-structure':
        return <TextStructureExercise {...commonProps} />

      case 'reciprocal-teaching':
        return <ReciprocalTeachingExercise {...commonProps} />

      case 'comprehension-literal':
      case 'comprehension-inferential':
      case 'comprehension-critical':
      case 'close-reading':
      case 'disciplinary-literacy':
      default:
        return <ComprehensionExercise {...commonProps} />
    }
  }

  // Loading state - matches MathSectionV2 pattern
  if (!exercise || !progress) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold b-text-primary oxford-heading">
            Reading
          </h2>
          <div className="animate-pulse bg-b-border h-8 w-40 rounded-lg" />
        </div>
        <div className="bg-b-bg-card border b-border rounded-lg p-6">
          <div className="text-center b-text-secondary">
            Loading reading exercise...
          </div>
        </div>
      </div>
    )
  }

  // Get mastery level for primary skill
  const primaryMastery = skillMastery[exercise.primarySkill] ?? 0
  const masteryDots = Math.ceil(primaryMastery * 5) // 0-5 dots based on mastery

  return (
    <div className="space-y-6">
      {/* Header - matches MathSectionV2 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold b-text-primary oxford-heading">
            Reading
          </h2>

          {/* Skill Tree Button */}
          <button
            onClick={() => setShowSkillTree(true)}
            className="p-2 rounded-lg transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--b-reading-light)',
              color: 'var(--b-reading-dark)',
            }}
            title="View Reading Skill Tree"
            aria-label="View Reading Skill Tree"
          >
            <TreeStructure size={20} weight="duotone" />
          </button>

          {/* Focus Mode Button */}
          {onFocusModeClick && (
            <button
              onClick={onFocusModeClick}
              disabled={!focusModeAvailable}
              className={`group relative p-2 rounded-lg transition-all cursor-pointer ${
                focusModeAvailable
                  ? 'shadow-md hover:shadow-lg hover:scale-105'
                  : 'b-bg-muted b-text-muted cursor-not-allowed'
              }`}
              style={
                focusModeAvailable
                  ? { backgroundColor: 'var(--b-reading-dark)', color: 'white' }
                  : {}
              }
              title={
                focusModeAvailable
                  ? 'Start Focus Mode (3× XP)'
                  : `Available at ${focusModeNextAvailable?.toLocaleTimeString() || 'midnight EST'}`
              }
            >
              <Fire
                size={20}
                weight="fill"
                className={focusModeAvailable ? 'animate-pulse' : ''}
              />
              {focusModeAvailable && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: 'var(--b-writing)' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-3 w-3"
                    style={{ backgroundColor: 'var(--b-writing)' }}
                  />
                </span>
              )}
              {/* Tooltip */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--b-reading-dark)',
                  color: 'white',
                }}
              >
                {focusModeAvailable
                  ? '⚡ Focus Mode (3× XP)'
                  : `Next: ${focusModeNextAvailable?.toLocaleTimeString() || 'midnight'}`}
              </div>
            </button>
          )}
        </div>
        <SingleProgressChip
          subject="Reading"
          progress={progress}
          size="md"
          dailyXPMet={dailyXPMet}
        />
      </div>

      {/* Grade Progress Bar - matches MathSectionV2 */}
      <div className="b-bg-card rounded-lg border b-border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium b-text-secondary">
            Progress to {progress.currentLevel} → Grade{' '}
            {Math.floor(progress.currentDifficulty) + 1}
          </span>
          <span className="text-xs b-text-muted">
            {progress.totalCompleted} exercises completed
          </span>
        </div>
        <GradeProgressBar
          progress={progress.progressToNextLevel}
          isLocked={!dailyXPMet}
          subject="green"
          size="lg"
          showLabel={true}
          showStatus={true}
        />
      </div>

      {/* Exercise Card */}
      <div className="bg-b-bg-card border b-border rounded-lg p-6">
        <SectionErrorBoundary componentName="Reading Exercise">
          {/* Compact Info Row */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">
                {getSkillCategory(exercise.type)}
              </span>
              <span className="text-gray-400">•</span>
              <span className="capitalize">
                {exercise.primarySkill?.replace(/-/g, ' ') || 'General'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {/* Mastery dots */}
              <div
                className="flex items-center gap-0.5"
                title={`Skill mastery: ${Math.round(primaryMastery * 100)}%`}
              >
                {[...Array(5)].map((_, i) => (
                  <Target
                    key={i}
                    size={10}
                    weight="fill"
                    className={
                      i < masteryDots ? 'text-green-500' : 'text-gray-200'
                    }
                  />
                ))}
              </div>
              {exercise.lexileScore && (
                <span className="text-gray-400">{exercise.lexileScore}L</span>
              )}
              {exercise.readingTimeEstimate && (
                <span className="flex items-center gap-0.5">
                  <Clock size={12} />
                  {Math.ceil((exercise.readingTimeEstimate || 60) / 60)}m
                </span>
              )}
            </div>
          </div>

          {/* Struggle Intervention - Proactive help when struggle detected */}
          {reading.struggleDetection.shouldIntervene &&
            reading.struggleDetection.intervention && (
              <StruggleIntervention
                intervention={reading.struggleDetection.intervention}
                onDismiss={(accepted) =>
                  reading.struggleDetection.dismissIntervention(accepted)
                }
                subject="reading"
              />
            )}

          {/* Exercise Content */}
          {renderExercise()}
        </SectionErrorBoundary>
      </div>

      {/* Skill Tree Modal */}
      {showSkillTree && (
        <ReadingSkillTreeModal
          isOpen={showSkillTree}
          onClose={() => setShowSkillTree(false)}
          skillMastery={skillMastery}
          currentSkill={exercise.primarySkill}
        />
      )}

      {/* Transfer Challenge Modal */}
      {reading.transferChallenge.state.currentChallenge && (
        <TransferChallenge
          challenge={reading.transferChallenge.state.currentChallenge}
          isOpen={reading.transferChallenge.state.showChallenge}
          onClose={() => reading.transferChallenge.hideTransferChallenge()}
          onComplete={reading.transferChallenge.handleChallengeComplete}
        />
      )}
    </div>
  )
}
