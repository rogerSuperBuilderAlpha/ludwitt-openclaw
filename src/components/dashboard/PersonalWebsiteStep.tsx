'use client'

import { InfoCard } from '@/components/ui/InfoCard'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { PersonalWebsiteGuide } from '@/components/projects/PersonalWebsiteGuide'

interface PersonalWebsiteStepProps {
  userId: string
  onProgressChange?: (current: number, total: number) => void
}

export function PersonalWebsiteStep({
  userId,
  onProgressChange,
}: PersonalWebsiteStepProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8">
      <InfoCard
        title="Build Your First Project"
        description="Now that you're set up with Cursor, let's build a personal portfolio website using AI!"
      />
      <ErrorBoundary componentName="Personal Website Guide">
        <PersonalWebsiteGuide
          userId={userId}
          onProgressChange={onProgressChange}
        />
      </ErrorBoundary>
    </div>
  )
}
