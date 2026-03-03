'use client'

/**
 * MathSectionV2 Component
 *
 * Orchestrates the enhanced math problem-solving experience using V2 components.
 * Features:
 * - ProblemDisplayV2 with visualization
 * - MathInputV2 with formula editor
 * - FeedbackDisplayV2 with step-by-step solutions
 * - Progressive hint system
 *
 * Uses the same props interface as MathSection for drop-in compatibility.
 */

import { useState, useCallback } from 'react'
import { Fire, TreeStructure } from '@phosphor-icons/react'
import { MathProblemV2, HintLevel } from '@/lib/types/math-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { EngagementState } from '@/lib/hooks/useEngagementTracking'
import { useMathProblemSessionV2 } from '@/lib/hooks/math-session-v2'
import {
  getReferenceUnits,
  getSectionFromProblemType,
} from '@/data/basics/references'

// UI Components
import { SingleProgressChip } from './SingleProgressChip'
import { GradeProgressBar } from './GradeProgressBar'
import { StudyPanel } from './StudyPanel'

// V2 Components
import { ProblemDisplayV2 } from './math-v2/ProblemDisplay'
import { MathInputV2 } from './math-v2/MathInput'
import { FeedbackDisplayV2 } from './math-v2/Feedback'
import { SocraticTutor } from './math-v2/SocraticTutor'
import { MathSkillTreeModal } from './math-v2/skill-tree'
import { StruggleIntervention } from './StruggleIntervention'
import { TransferChallenge } from './transfer/TransferChallenge'
import { MisconceptionHint } from './MisconceptionHint'
import { SectionErrorBoundary } from '@/components/ui/ErrorBoundary'

// ============================================================================
// Types
// ============================================================================

interface MathSectionV2Props {
  /** Current math problem (V2 format) */
  problem: MathProblemV2 | null
  /** Current progress display */
  progress: SubjectProgressDisplay | null
  /** Skill mastery levels for skill tree */
  skillMastery?: Record<string, number>
  /** Called when problem is completed */
  onProblemComplete: (
    nextProblem: MathProblemV2,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number
  ) => void
  /** Called when problem is skipped */
  onSkip: () => void
  /** Current engagement state */
  engagement: EngagementState
  /** Called when XP is spent */
  onXpSpent?: (amount: number) => void
  /** Called when credits are used */
  onCreditsUsed?: () => void
  /** Daily XP earned */
  dailyXP?: number
  /** Daily XP goal */
  dailyGoal?: number
  /** Focus mode click handler */
  onFocusModeClick?: () => void
  /** Whether focus mode is available */
  focusModeAvailable?: boolean
  /** Next time focus mode is available */
  focusModeNextAvailable?: Date | null
}

// ============================================================================
// Component
// ============================================================================

export function MathSectionV2({
  problem,
  progress,
  skillMastery = {},
  onProblemComplete,
  onSkip,
  engagement,
  onXpSpent,
  onCreditsUsed,
  dailyXP = 0,
  dailyGoal = 1000,
  onFocusModeClick,
  focusModeAvailable = true,
  focusModeNextAvailable,
}: MathSectionV2Props) {
  const dailyXPMet = dailyXP >= dailyGoal
  const [showSkillTree, setShowSkillTree] = useState(false)

  // Use consolidated V2 hook for all state management
  const session = useMathProblemSessionV2({
    problem,
    progress,
    engagement,
    onProblemComplete,
    onSkip,
    onXpSpent,
  })

  // Handle hint usage for XP tracking
  const handleHintUsed = useCallback(
    (level: HintLevel, _index: number) => {
      session.handleHintReveal(level)
    },
    [session]
  )

  // ============================================================================
  // Loading State
  // ============================================================================

  if (!problem || !progress) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold b-text-primary oxford-heading">
            Math
          </h2>
          <div className="animate-pulse bg-b-border h-8 w-40 rounded-lg"></div>
        </div>
        <div className="bg-b-bg-page border b-border rounded-lg p-6">
          <div className="text-center b-text-secondary">
            Loading math problem...
          </div>
        </div>
      </div>
    )
  }

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold b-text-primary oxford-heading">
            Math
          </h2>

          {/* Skill Tree Button */}
          <button
            onClick={() => setShowSkillTree(true)}
            className="p-2 rounded-lg transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--b-math-light)',
              color: 'var(--b-math-dark)',
            }}
            title="View Math Skill Tree"
            aria-label="View Math Skill Tree"
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
                  ? { backgroundColor: 'var(--b-math-dark)', color: 'white' }
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
                  ></span>
                  <span
                    className="relative inline-flex rounded-full h-3 w-3"
                    style={{ backgroundColor: 'var(--b-writing)' }}
                  ></span>
                </span>
              )}
              {/* Tooltip */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--b-math-dark)',
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
          subject="Math"
          progress={progress}
          size="md"
          dailyXPMet={dailyXPMet}
        />
      </div>

      {/* Grade Progress Bar */}
      <div className="b-bg-card rounded-lg border b-border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium b-text-secondary">
            Progress to {progress.currentLevel.replace('Grade ', 'Grade ')} →
            Grade {Math.floor(progress.currentDifficulty) + 1}
          </span>
          <span className="text-xs b-text-muted">
            {progress.totalCompleted} problems completed
          </span>
        </div>
        <GradeProgressBar
          progress={progress.progressToNextLevel}
          isLocked={!dailyXPMet}
          subject="blue"
          size="lg"
          showLabel={true}
          showStatus={true}
        />
      </div>

      {/* Problem Card */}
      <div className="bg-b-bg-card border b-border rounded-lg p-6">
        <SectionErrorBoundary componentName="Math Exercise">
          <div className="space-y-6">
            {/* Problem Display V2 */}
            <ProblemDisplayV2
              problem={problem}
              hintsDisabled={!!session.feedback}
              onHintUsed={handleHintUsed}
              onAITutorRequest={() => session.setShowAIExplanation(true)}
              showHints={!session.feedback}
              showBadge={true}
              size="md"
              isAnswered={!!session.feedback}
              onCreditsUsed={onCreditsUsed}
            />

            {/* Misconception Hint - Show when misconception detected on wrong answer */}
            {session.feedback &&
              !session.feedback.correct &&
              session.misconceptionDetection.primaryMisconception && (
                <MisconceptionHint
                  misconception={
                    session.misconceptionDetection.primaryMisconception
                  }
                  remediation={session.misconceptionDetection.remediation}
                  onDismiss={() => session.misconceptionDetection.clear()}
                  onRemediationViewed={() =>
                    session.misconceptionDetection.markRemediationViewed()
                  }
                  subject="math"
                />
              )}

            {/* Feedback Display V2 */}
            {session.feedback && (
              <FeedbackDisplayV2
                isCorrect={session.feedback.correct}
                message={session.feedback.message}
                xpEarned={session.feedback.xpEarned}
                workBonus={session.workBonus}
                userAnswer={session.answer}
                correctAnswer={
                  typeof problem.answer.correct === 'string'
                    ? problem.answer.correct
                    : String(problem.answer.correct)
                }
                correctAnswerLatex={
                  typeof problem.answer.correct === 'string'
                    ? problem.answer.correct
                    : undefined
                }
                solutionSteps={problem.solution.steps}
                solutionMethod={problem.solution.method}
                alternativeMethods={problem.solution.alternativeMethods}
                commonMistake={problem.pedagogy.commonMistakes?.[0]}
                remediationSuggestions={problem.pedagogy.commonMistakes}
                conceptsToReview={problem.pedagogy.concepts}
                incorrectAttempts={session.incorrectAttempts}
                hasNextProblem={!!session.nextProblemData}
                onContinue={session.handleContinue}
                onTrySimilar={session.handleTrySimilar}
                onReviewLast={() => session.setShowLastProblem(true)}
                onExplainAnother={session.handleExplainAnother}
                loadingAlternate={session.loadingAlternate}
                alternateExplanation={session.alternateExplanation}
                reviewScheduleMessage={
                  session.feedback.reviewScheduleMessage
                    ? {
                        conceptId:
                          session.feedback.reviewScheduleMessage.conceptId,
                        conceptName:
                          session.feedback.reviewScheduleMessage.conceptName,
                        subject: session.feedback.reviewScheduleMessage
                          .subject as
                          | 'math'
                          | 'reading'
                          | 'latin'
                          | 'greek'
                          | 'logic',
                        nextReviewDate: new Date(
                          session.feedback.reviewScheduleMessage.nextReviewDate
                        ),
                        daysUntilReview:
                          session.feedback.reviewScheduleMessage
                            .daysUntilReview,
                        message: session.feedback.reviewScheduleMessage.message,
                        isFirstReview:
                          session.feedback.reviewScheduleMessage.isFirstReview,
                      }
                    : undefined
                }
              />
            )}

            {/* Struggle Intervention - Proactive help when struggle detected */}
            {session.struggleDetection.shouldIntervene &&
              session.struggleDetection.intervention && (
                <StruggleIntervention
                  intervention={session.struggleDetection.intervention}
                  onDismiss={(accepted) =>
                    session.struggleDetection.dismissIntervention(accepted)
                  }
                  subject="math"
                />
              )}

            {/* Math Input V2 - Redesigned (only show when no feedback) */}
            {!session.feedback && (
              <MathInputV2
                answer={session.answer}
                onAnswerChange={session.setAnswer}
                workShown={session.workShown}
                onWorkChange={session.setWorkShown}
                isSubmitting={session.isSubmitting}
                onSubmit={session.handleSubmit}
                onSkip={session.handleSkipConfirm}
                skipXpCost={5}
                placeholder="Enter your answer..."
                workBonusText="Up to 2x XP"
                // Telemetry integration for Technical Moat
                onTelemetryKeyDown={(keyType) =>
                  session.telemetry.trackKeystroke(keyType)
                }
                onTelemetryFocus={() =>
                  session.telemetry.trackFocusChange(true)
                }
                onTelemetryBlur={() =>
                  session.telemetry.trackFocusChange(false)
                }
                onTelemetryAnswerChange={(length, delta) =>
                  session.telemetry.trackAnswerChange(length, delta)
                }
              />
            )}
          </div>
        </SectionErrorBoundary>
      </div>

      {/* Socratic Tutor - Expands inline when AI help is requested */}
      {session.showAIExplanation && (
        <SocraticTutor
          problem={problem}
          currentAnswer={session.answer}
          onClose={() => session.setShowAIExplanation(false)}
          onCreditsUsed={onCreditsUsed}
        />
      )}

      {/* Study Panel */}
      <StudyPanel
        isOpen={false}
        onClose={() => {}}
        currentTopic={problem.pedagogy.topic}
        sectionId={getSectionFromProblemType(problem.type)}
        units={getReferenceUnits(getSectionFromProblemType(problem.type))}
        unlockedUnitIds={[]}
        userXp={0}
        onUnlockUnit={async () => false}
      />

      {/* Math Skill Tree Modal */}
      {showSkillTree && (
        <MathSkillTreeModal
          isOpen={showSkillTree}
          onClose={() => setShowSkillTree(false)}
          skillMastery={skillMastery}
          currentSkill={problem.pedagogy.topic}
        />
      )}

      {/* Transfer Challenge Modal */}
      {session.transferChallenge.state.currentChallenge && (
        <TransferChallenge
          challenge={session.transferChallenge.state.currentChallenge}
          isOpen={session.transferChallenge.state.showChallenge}
          onClose={() => session.transferChallenge.hideTransferChallenge()}
          onComplete={session.transferChallenge.handleChallengeComplete}
        />
      )}
    </div>
  )
}
