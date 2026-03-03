'use client'

/**
 * Logic, Writing & Independent Study Row
 *
 * A row layout for Logic, Writing, and Independent Study features using the Basics design system.
 */

import { SubjectProgressDisplay } from '@/lib/types/basics'
import { LogicUnlockBar } from './LogicUnlockBar'
import { WritingCompetitionBar } from './WritingCompetitionBar'
import { IndependentStudyBar } from './IndependentStudyBar'

interface LogicWritingRowProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  logicExpanded: boolean
  onToggleExpand: () => void
  userId?: string
}

export function LogicWritingRow({
  mathProgress,
  readingProgress,
  logicExpanded,
  onToggleExpand,
  userId,
}: LogicWritingRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      {/* Logic Card */}
      <div className="b-bg-logic-light b-border b-border-logic b-rounded-lg b-shadow-sm px-3 py-2">
        <LogicUnlockBar
          mathProgress={mathProgress}
          readingProgress={readingProgress}
          isExpanded={logicExpanded}
          onToggleExpand={onToggleExpand}
          userId={userId}
        />
      </div>

      {/* Writing Card */}
      <div className="b-bg-warning-light b-border b-border-writing b-rounded-lg b-shadow-sm px-3 py-2">
        <WritingCompetitionBar />
      </div>

      {/* Independent Study Card */}
      <div
        className="b-border b-rounded-lg b-shadow-sm px-3 py-2"
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
        }}
      >
        <IndependentStudyBar
          mathProgress={mathProgress}
          readingProgress={readingProgress}
          userId={userId}
        />
      </div>
    </div>
  )
}
