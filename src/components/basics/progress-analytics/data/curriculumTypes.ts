/**
 * Curriculum Type Definitions
 *
 * Types for curriculum data structure used across all subjects
 */

export interface CurriculumGrade {
  focus: string[]
  mastered: string[]
  upcoming: string[]
}

export type CurriculumData = Record<number, CurriculumGrade>
