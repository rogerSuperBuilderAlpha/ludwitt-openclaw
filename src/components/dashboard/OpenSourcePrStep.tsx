'use client'

import { InfoCard } from '@/components/ui/InfoCard'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { PathChecklist } from '@/components/checklist/PathChecklist'
import { opensourcePrSteps } from '@/data/steps/opensourcePrSteps'

interface OpenSourcePrStepProps {
  userId: string
  onProgressChange?: (current: number, total: number) => void
}

export function OpenSourcePrStep({
  userId,
  onProgressChange,
}: OpenSourcePrStepProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8">
      <InfoCard
        title="Make Your First Open Source PR"
        description="Contribute to a real open-source project! Follow the steps below to fork, clone, make changes, and submit a pull request."
      />
      <ErrorBoundary componentName="Open Source PR Checklist">
        <PathChecklist
          userId={userId}
          steps={opensourcePrSteps}
          firestoreCollection="opensourcePrProgress"
          onProgressChange={onProgressChange}
          expandLabel="View Open Source PR Steps"
          completionTitle="PR submitted!"
          analyticsLessonId="opensource-pr"
        />
      </ErrorBoundary>
    </div>
  )
}
