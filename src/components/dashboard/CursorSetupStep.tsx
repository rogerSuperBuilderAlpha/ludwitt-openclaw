'use client'

import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CursorSetupChecklist } from '@/components/cursor/CursorSetupChecklist'

interface CursorSetupStepProps {
  userId: string
  verificationCode: string
  onProgressChange?: (current: number, total: number) => void
}

export function CursorSetupStep({
  userId,
  verificationCode,
  onProgressChange,
}: CursorSetupStepProps) {
  return (
    <ErrorBoundary componentName="Cursor Setup Checklist">
      <CursorSetupChecklist
        userId={userId}
        verificationCode={verificationCode}
        onProgressChange={onProgressChange}
      />
    </ErrorBoundary>
  )
}
