'use client'

import { PathChecklist } from '@/components/checklist/PathChecklist'
import { cursorSetupSteps } from '@/data/steps/cursorSetupSteps'

interface CursorSetupChecklistProps {
  userId: string
  verificationCode: string
  onProgressChange?: (current: number, total: number) => void
}

export function CursorSetupChecklist({
  userId,
  verificationCode,
  onProgressChange,
}: CursorSetupChecklistProps) {
  return (
    <PathChecklist
      userId={userId}
      steps={cursorSetupSteps}
      firestoreCollection="cursorSetupProgress"
      onProgressChange={onProgressChange}
      analyticsLessonId="cursor-setup"
      expandLabel="View Cursor Setup Steps"
      completionTitle="All steps completed!"
      completionMessage={
        <p className="text-blue-800 mt-2 text-sm">
          Your pull request will be automatically verified. This usually takes
          5-30 seconds. Refresh to check your verification status.
        </p>
      }
      headerContent={
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Your Verification Code
          </h3>
          <div className="bg-white border-2 border-purple-300 rounded-lg p-3 text-center">
            <code className="text-xl font-mono font-bold text-purple-600">
              {verificationCode}
            </code>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            You&apos;ll need this code in step 23-24. Copy and paste it into
            your verification file.
          </p>
        </div>
      }
    />
  )
}
