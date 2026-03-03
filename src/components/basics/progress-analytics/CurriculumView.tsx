/**
 * CurriculumView Component
 *
 * Displays detailed curriculum information with expand/collapse functionality
 */

'use client'

import { useState } from 'react'
import { CaretDown, CaretUp, BookOpen } from '@phosphor-icons/react'
import { CurriculumData } from './data/curriculumTypes'
import { SkillMatrix } from './SkillMatrix'

interface CurriculumViewProps {
  grade: number
  curriculum: CurriculumData
  lightColor: string
}

export function CurriculumView({ grade, curriculum, lightColor }: CurriculumViewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const currentCurriculum = curriculum[grade] || curriculum[1]
  const nextCurriculum = curriculum[Math.min(grade + 1, 12)] || curriculum[12]
  const nextGrade = Math.min(grade + 1, 12)

  return (
    <>
      {/* Curriculum Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-2 ${lightColor} flex items-center justify-between hover:opacity-80 transition-opacity`}
      >
        <span className="text-sm font-medium b-text-secondary flex items-center gap-2">
          <BookOpen size={16} />
          View Grade {grade} Curriculum
        </span>
        {isExpanded ? <CaretUp size={16} /> : <CaretDown size={16} />}
      </button>

      {/* Expanded Curriculum */}
      {isExpanded && (
        <div className="p-4 b-bg-card border-t border-b-border-light">
          <SkillMatrix
            currentFocus={currentCurriculum.focus}
            mastered={currentCurriculum.mastered}
            upcoming={nextCurriculum.focus}
            currentGrade={grade}
            nextGrade={nextGrade}
          />
        </div>
      )}
    </>
  )
}
