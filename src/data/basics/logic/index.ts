/**
 * Logic Module - Problem Database
 * 
 * Complete symbolic logic curriculum from introductory to graduate level
 * Unlocked by completing Grade 12 in both Math and Reading
 */

import { LogicProblem, LOGIC_UNITS, LOGIC_SYMBOLS } from './types'
import { UNIT1_PROBLEMS } from './unit1-introduction'
import { UNIT2_PROBLEMS } from './unit2-propositional'
import { UNIT3_PROBLEMS } from './unit3-truth-tables'
import { UNIT4_PROBLEMS } from './unit4-proofs'
import { UNIT5_PROBLEMS } from './unit5-predicate'
import { UNIT6_PROBLEMS } from './unit6-fol-proofs'
import { UNIT7_PROBLEMS } from './unit7-set-theory'
import { UNIT8_PROBLEMS } from './unit8-modal'
import { UNIT9_PROBLEMS } from './unit9-temporal'
import { UNIT10_PROBLEMS } from './unit10-epistemic'
import { UNIT11_PROBLEMS } from './unit11-deontic'
import { UNIT12_PROBLEMS } from './unit12-manyvalued'
import { UNIT13_PROBLEMS } from './unit13-intuitionistic'
import { UNIT14_PROBLEMS } from './unit14-paraconsistent'
import { UNIT15_PROBLEMS } from './unit15-higherorder'
import { UNIT16_PROBLEMS } from './unit16-metalogic'
import { UNIT17_PROBLEMS } from './unit17-computability'
import { UNIT18_PROBLEMS } from './unit18-applications'

// Combine all problems
export const ALL_LOGIC_PROBLEMS: LogicProblem[] = [
  ...UNIT1_PROBLEMS,
  ...UNIT2_PROBLEMS,
  ...UNIT3_PROBLEMS,
  ...UNIT4_PROBLEMS,
  ...UNIT5_PROBLEMS,
  ...UNIT6_PROBLEMS,
  ...UNIT7_PROBLEMS,
  ...UNIT8_PROBLEMS,
  ...UNIT9_PROBLEMS,
  ...UNIT10_PROBLEMS,
  ...UNIT11_PROBLEMS,
  ...UNIT12_PROBLEMS,
  ...UNIT13_PROBLEMS,
  ...UNIT14_PROBLEMS,
  ...UNIT15_PROBLEMS,
  ...UNIT16_PROBLEMS,
  ...UNIT17_PROBLEMS,
  ...UNIT18_PROBLEMS,
]

// Export by unit for selective loading
export const LOGIC_PROBLEMS_BY_UNIT: Record<number, LogicProblem[]> = {
  1: UNIT1_PROBLEMS,
  2: UNIT2_PROBLEMS,
  3: UNIT3_PROBLEMS,
  4: UNIT4_PROBLEMS,
  5: UNIT5_PROBLEMS,
  6: UNIT6_PROBLEMS,
  7: UNIT7_PROBLEMS,
  8: UNIT8_PROBLEMS,
  9: UNIT9_PROBLEMS,
  10: UNIT10_PROBLEMS,
  11: UNIT11_PROBLEMS,
  12: UNIT12_PROBLEMS,
  13: UNIT13_PROBLEMS,
  14: UNIT14_PROBLEMS,
  15: UNIT15_PROBLEMS,
  16: UNIT16_PROBLEMS,
  17: UNIT17_PROBLEMS,
  18: UNIT18_PROBLEMS,
}

// Get problems for a specific unit
export function getProblemsForUnit(unitId: number): LogicProblem[] {
  return LOGIC_PROBLEMS_BY_UNIT[unitId] || []
}

// Get problems by difficulty range
export function getProblemsByDifficulty(minDifficulty: number, maxDifficulty: number): LogicProblem[] {
  return ALL_LOGIC_PROBLEMS.filter(
    p => p.difficulty >= minDifficulty && p.difficulty <= maxDifficulty
  )
}

// Get problems by topic
export function getProblemsByTopic(topic: string): LogicProblem[] {
  return ALL_LOGIC_PROBLEMS.filter(
    p => p.topic.toLowerCase().includes(topic.toLowerCase())
  )
}

// Get a random problem from a unit
export function getRandomProblemFromUnit(unitId: number): LogicProblem | null {
  const unitProblems = getProblemsForUnit(unitId)
  if (unitProblems.length === 0) return null
  return unitProblems[Math.floor(Math.random() * unitProblems.length)]
}

// Get next problem for user (based on difficulty progression)
export function getNextProblem(
  currentUnitId: number,
  currentDifficulty: number,
  completedProblemIds: Set<string>
): LogicProblem | null {
  // First try current unit
  const currentUnitProblems = getProblemsForUnit(currentUnitId)
    .filter(p => !completedProblemIds.has(p.id) && p.difficulty <= currentDifficulty + 0.5)
  
  if (currentUnitProblems.length > 0) {
    // Sort by difficulty (ascending) and pick first incomplete
    currentUnitProblems.sort((a, b) => a.difficulty - b.difficulty)
    return currentUnitProblems[0]
  }
  
  // Try next unit if current is exhausted
  const nextUnit = LOGIC_UNITS.find(u => u.id === currentUnitId + 1)
  if (nextUnit) {
    const nextUnitProblems = getProblemsForUnit(nextUnit.id)
      .filter(p => !completedProblemIds.has(p.id))
    if (nextUnitProblems.length > 0) {
      nextUnitProblems.sort((a, b) => a.difficulty - b.difficulty)
      return nextUnitProblems[0]
    }
  }
  
  // Fallback: any incomplete problem
  const anyProblem = ALL_LOGIC_PROBLEMS.find(p => !completedProblemIds.has(p.id))
  return anyProblem || null
}

// Check if answer is correct
export function checkAnswer(problem: LogicProblem, userAnswer: string): boolean {
  const normalized = userAnswer.trim().toLowerCase()
  
  // Check exact match
  if (normalized === problem.correctAnswer.toLowerCase()) {
    return true
  }
  
  // Check acceptable answers
  if (problem.acceptableAnswers) {
    return problem.acceptableAnswers.some(
      ans => ans.toLowerCase() === normalized
    )
  }
  
  return false
}

// Calculate XP for a problem
export function calculateXP(problem: LogicProblem, isCorrect: boolean, usedHint: boolean): number {
  if (!isCorrect) return 0
  
  let baseXP = Math.floor(10 * problem.difficulty)
  
  // Bonus for harder problems
  if (problem.difficulty >= 4) baseXP += 5
  if (problem.difficulty >= 5) baseXP += 10
  
  // Penalty for using hint
  if (usedHint) baseXP = Math.floor(baseXP * 0.7)
  
  return baseXP
}

// Get unit info
export function getUnitInfo(unitId: number) {
  return LOGIC_UNITS.find(u => u.id === unitId)
}

// Get all available units (those with problems)
export function getAvailableUnits() {
  return LOGIC_UNITS.filter(unit => 
    LOGIC_PROBLEMS_BY_UNIT[unit.id] && LOGIC_PROBLEMS_BY_UNIT[unit.id].length > 0
  )
}

// Stats
export function getLogicStats() {
  const totalProblems = ALL_LOGIC_PROBLEMS.length
  const problemsByUnit = LOGIC_UNITS.map(unit => ({
    unit: unit.id,
    name: unit.name,
    count: (LOGIC_PROBLEMS_BY_UNIT[unit.id] || []).length
  }))
  
  const difficultyDistribution = {
    beginner: ALL_LOGIC_PROBLEMS.filter(p => p.difficulty <= 2).length,
    intermediate: ALL_LOGIC_PROBLEMS.filter(p => p.difficulty > 2 && p.difficulty <= 3).length,
    advanced: ALL_LOGIC_PROBLEMS.filter(p => p.difficulty > 3 && p.difficulty <= 4).length,
    expert: ALL_LOGIC_PROBLEMS.filter(p => p.difficulty > 4).length,
  }
  
  return {
    totalProblems,
    problemsByUnit,
    difficultyDistribution,
    totalUnits: LOGIC_UNITS.length,
    unitsWithProblems: problemsByUnit.filter(u => u.count > 0).length
  }
}

// Re-export types and constants
export { LOGIC_UNITS, LOGIC_SYMBOLS } from './types'
export type { LogicProblem, LogicUnit, LogicOption, LogicProblemType } from './types'
