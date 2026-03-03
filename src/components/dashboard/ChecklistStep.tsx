'use client'

import { InfoCard } from '@/components/ui/InfoCard'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { PathChecklist } from '@/components/checklist/PathChecklist'
import type { StepBaseProps } from '@/components/dashboard/types'

interface ChecklistStepProps extends StepBaseProps {
  /** InfoCard heading */
  title: string
  /** InfoCard body text */
  description: string
  /** Steps data to pass to PathChecklist */
  steps: Parameters<typeof PathChecklist>[0]['steps']
  /** Firestore collection for progress persistence */
  firestoreCollection: string
  /** Label on the expand/collapse toggle */
  expandLabel: string
  /** Title shown when all steps are complete */
  completionTitle: string
  /** Analytics lesson identifier */
  analyticsLessonId: string
  /** ErrorBoundary display name */
  boundaryName: string
}

/**
 * Reusable step that renders an InfoCard + PathChecklist inside an ErrorBoundary.
 * Used by the Claude Code, OpenClaw, and post-deploy step groups.
 */
export function ChecklistStep({
  userId,
  onSubStepProgressChange,
  title,
  description,
  steps,
  firestoreCollection,
  expandLabel,
  completionTitle,
  analyticsLessonId,
  boundaryName,
}: ChecklistStepProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8">
      <InfoCard title={title} description={description} />
      <ErrorBoundary componentName={boundaryName}>
        <PathChecklist
          userId={userId}
          steps={steps}
          firestoreCollection={firestoreCollection}
          onProgressChange={onSubStepProgressChange}
          expandLabel={expandLabel}
          completionTitle={completionTitle}
          analyticsLessonId={analyticsLessonId}
        />
      </ErrorBoundary>
    </div>
  )
}
