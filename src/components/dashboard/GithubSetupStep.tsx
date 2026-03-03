'use client'

import { User } from 'firebase/auth'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { GitHubSetupChecklist } from '@/components/github/GitHubSetupChecklist'

interface GithubSetupStepProps {
  user?: User | null
  onProgressChange?: (current: number, total: number) => void
}

export function GithubSetupStep({
  user,
  onProgressChange,
}: GithubSetupStepProps) {
  return (
    <ErrorBoundary componentName="GitHub Setup Checklist">
      <GitHubSetupChecklist
        userId={user?.uid}
        user={user}
        onProgressChange={onProgressChange}
      />
    </ErrorBoundary>
  )
}
