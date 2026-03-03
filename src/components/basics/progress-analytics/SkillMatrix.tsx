/**
 * SkillMatrix Component
 *
 * Displays lists of skills/topics organized by learning status:
 * - Currently Learning
 * - Already Mastered
 * - Coming Next
 */

import { CheckCircle, Target, ArrowRight } from '@phosphor-icons/react'

interface SkillMatrixProps {
  currentFocus: string[]
  mastered: string[]
  upcoming: string[]
  currentGrade: number
  nextGrade: number
}

export function SkillMatrix({
  currentFocus,
  mastered,
  upcoming,
  currentGrade,
  nextGrade,
}: SkillMatrixProps) {
  return (
    <div className="space-y-4">
      {/* Currently Learning */}
      <div>
        <h4 className="font-semibold b-text-primary flex items-center gap-2 mb-2">
          <Target size={16} className="text-b-math" />
          Currently Learning (Grade {currentGrade})
        </h4>
        <ul className="space-y-1">
          {currentFocus.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm b-text-secondary">
              <Target size={14} className="text-b-math mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Already Mastered */}
      {mastered.length > 0 && (
        <div>
          <h4 className="font-semibold b-text-primary flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-b-reading" />
            Already Mastered
          </h4>
          <ul className="space-y-1">
            {mastered.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm b-text-muted">
                <CheckCircle size={14} className="text-b-reading-border mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Coming Next */}
      <div>
        <h4 className="font-semibold b-text-primary flex items-center gap-2 mb-2">
          <ArrowRight size={16} className="text-b-logic" />
          Coming in Grade {nextGrade}
        </h4>
        <ul className="space-y-1">
          {upcoming.slice(0, 3).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm b-text-secondary">
              <ArrowRight size={14} className="text-b-logic-border mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
