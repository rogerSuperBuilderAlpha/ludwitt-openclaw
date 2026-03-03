'use client'

import { InfoCard } from '@/components/ui/InfoCard'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { VercelDeploymentGuide } from '@/components/deployment/VercelDeploymentGuide'

interface VercelDeploymentStepProps {
  onProgressChange?: (current: number, total: number) => void
  postVercelSurveyComplete: boolean
  onComplete: () => void
}

export function VercelDeploymentStep({
  onProgressChange,
  postVercelSurveyComplete,
  onComplete,
}: VercelDeploymentStepProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8">
      <InfoCard
        title="Deploy Your Website"
        description="Your portfolio is ready! Now let's deploy it to Vercel so the world can see your work."
      />
      <ErrorBoundary componentName="Vercel Deployment Guide">
        <VercelDeploymentGuide
          onProgressChange={onProgressChange}
          postVercelSurveyComplete={postVercelSurveyComplete}
          onComplete={onComplete}
          onContinue={onComplete}
        />
      </ErrorBoundary>
    </div>
  )
}
