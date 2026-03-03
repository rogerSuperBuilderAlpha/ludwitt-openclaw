/**
 * Interleaving Algorithm for Ludwitt Basics
 * 
 * Implements controlled interleaving and discrimination practice
 * to improve flexible strategy selection and transfer.
 */

import { MathProblem, ReadingExercise } from '@/lib/types/basics'
import { SkillMasteryState } from './cognitive-diagnostics'
import { SpacedItem } from './spaced-repetition'

export interface InterleavingParameters {
  newMaterialRatio: number      // 0-1, proportion of new/target difficulty problems
  spacedReviewRatio: number     // 0-1, proportion of spaced repetition problems
  strugglingSkillsRatio: number // 0-1, proportion of remediation problems
  discriminationFocus: boolean   // Whether to emphasize problem type mixing
  maxConsecutiveSameType: number // Prevent excessive blocking
}

export interface ProblemSelectionContext {
  targetDifficulty: number
  masteredSkills: string[]
  strugglingSkills: string[]
  recentProblemTypes: string[]  // Last 5-10 problem types
  spacedRepetitionDue: string[] // Problem IDs due for review
  cognitiveLoad: number         // Current estimated cognitive load (1-5)
}

export interface InterleavedProblemSet {
  problems: (MathProblem | ReadingExercise)[]
  rationale: string
  expectedBenefits: string[]
  cognitiveLoadEstimate: number
  interleavingPattern: string   // Description of the pattern used
}

/**
 * Default interleaving parameters based on learning science research
 */
export const DEFAULT_INTERLEAVING_PARAMS: InterleavingParameters = {
  newMaterialRatio: 0.4,        // 40% new material
  spacedReviewRatio: 0.3,       // 30% spaced repetition
  strugglingSkillsRatio: 0.3,   // 30% remediation
  discriminationFocus: true,
  maxConsecutiveSameType: 2     // No more than 2 consecutive same-type problems
}

/**
 * Select interleaved problems based on current learning state
 */
export function selectInterleavedProblems(
  availableProblems: (MathProblem | ReadingExercise)[],
  context: ProblemSelectionContext,
  params: InterleavingParameters = DEFAULT_INTERLEAVING_PARAMS,
  count: number = 10
): InterleavedProblemSet {
  const selectedProblems: (MathProblem | ReadingExercise)[] = []
  const rationale: string[] = []
  const expectedBenefits: string[] = []
  
  // Calculate distribution based on parameters
  const distribution = {
    new: Math.floor(count * params.newMaterialRatio),
    spaced: Math.floor(count * params.spacedReviewRatio),
    struggling: Math.ceil(count * params.strugglingSkillsRatio)
  }
  
  // Ensure we don't exceed the requested count
  const totalAllocated = distribution.new + distribution.spaced + distribution.struggling
  if (totalAllocated > count) {
    const excess = totalAllocated - count
    distribution.struggling = Math.max(0, distribution.struggling - excess)
  }
  
  // 1. Select problems for struggling skills (highest priority)
  const strugglingProblems = selectProblemsBySkills(
    availableProblems,
    context.strugglingSkills,
    distribution.struggling
  )
  selectedProblems.push(...strugglingProblems)
  if (strugglingProblems.length > 0) {
    rationale.push(`${strugglingProblems.length} problems target struggling skills`)
    expectedBenefits.push("Address learning gaps and build foundational understanding")
  }
  
  // 2. Select spaced repetition problems
  const spacedProblems = selectSpacedRepetitionProblems(
    availableProblems,
    context.spacedRepetitionDue,
    distribution.spaced
  )
  selectedProblems.push(...spacedProblems)
  if (spacedProblems.length > 0) {
    rationale.push(`${spacedProblems.length} problems for spaced repetition`)
    expectedBenefits.push("Strengthen long-term retention and prevent forgetting")
  }
  
  // 3. Select new material at target difficulty
  const remainingProblems = availableProblems.filter(p => !selectedProblems.includes(p))
  const newProblems = selectProblemsByDifficulty(
    remainingProblems,
    context.targetDifficulty,
    distribution.new
  )
  selectedProblems.push(...newProblems)
  if (newProblems.length > 0) {
    rationale.push(`${newProblems.length} problems introduce new material`)
    expectedBenefits.push("Advance learning and challenge current understanding")
  }
  
  // 4. If we still don't have enough problems, select any remaining problems
  const stillNeeded = count - selectedProblems.length
  if (stillNeeded > 0 && remainingProblems.length > newProblems.length) {
    const additionalProblems = remainingProblems
      .filter(p => !selectedProblems.includes(p))
      .slice(0, stillNeeded)
    selectedProblems.push(...additionalProblems)
    if (additionalProblems.length > 0) {
      rationale.push(`${additionalProblems.length} additional problems for practice`)
      expectedBenefits.push("Provide sufficient practice opportunities")
    }
  }
  
  // 5. Apply interleaving pattern to reduce blocking
  const interleavedProblems = applyInterleavingPattern(
    selectedProblems,
    context.recentProblemTypes,
    params
  )
  
  // 6. Calculate cognitive load estimate
  const cognitiveLoadEstimate = estimateCognitiveLoad(interleavedProblems, context)
  
  // 7. Generate pattern description
  const interleavingPattern = describeInterleavingPattern(interleavedProblems)
  
  return {
    problems: interleavedProblems,
    rationale: rationale.join('; '),
    expectedBenefits,
    cognitiveLoadEstimate,
    interleavingPattern
  }
}

/**
 * Select problems that target specific skills
 */
function selectProblemsBySkills(
  problems: (MathProblem | ReadingExercise)[],
  targetSkills: string[],
  count: number
): (MathProblem | ReadingExercise)[] {
  if (targetSkills.length === 0 || count === 0) return []
  
  // Filter problems that involve target skills
  const relevantProblems = problems.filter(problem => {
    // This would need to be implemented based on your problem tagging system
    // For now, using a simplified approach based on problem type and topic
    const problemSkills = extractSkillsFromProblem(problem)
    return problemSkills.some(skill => targetSkills.includes(skill))
  })
  
  // Prioritize by skill coverage and difficulty appropriateness
  const prioritized = relevantProblems.sort((a, b) => {
    const aSkillCount = extractSkillsFromProblem(a).filter(s => targetSkills.includes(s)).length
    const bSkillCount = extractSkillsFromProblem(b).filter(s => targetSkills.includes(s)).length
    return bSkillCount - aSkillCount // More relevant skills first
  })
  
  return prioritized.slice(0, count)
}

/**
 * Select problems due for spaced repetition
 */
function selectSpacedRepetitionProblems(
  problems: (MathProblem | ReadingExercise)[],
  dueIds: string[],
  count: number
): (MathProblem | ReadingExercise)[] {
  if (dueIds.length === 0 || count === 0) return []
  
  const dueProblems = problems.filter(problem => dueIds.includes(problem.id))
  return dueProblems.slice(0, count)
}

/**
 * Select problems at target difficulty level
 */
function selectProblemsByDifficulty(
  problems: (MathProblem | ReadingExercise)[],
  targetDifficulty: number,
  count: number
): (MathProblem | ReadingExercise)[] {
  if (count === 0) return []
  
  // Use graduated tolerance: try tight first, then expand if needed
  let tolerance = 0.5
  let suitableProblems = problems.filter(problem => 
    Math.abs(problem.difficulty - targetDifficulty) <= tolerance
  )
  
  // If we don't have enough problems, expand the tolerance
  if (suitableProblems.length < count) {
    tolerance = 1.5
    suitableProblems = problems.filter(problem => 
      Math.abs(problem.difficulty - targetDifficulty) <= tolerance
    )
  }
  
  // If still not enough, take whatever is available sorted by relevance
  if (suitableProblems.length < count) {
    suitableProblems = [...problems]
  }
  
  // Sort by closeness to target difficulty
  const sorted = suitableProblems.sort((a, b) => 
    Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty)
  )
  
  return sorted.slice(0, count)
}

/**
 * Apply interleaving pattern to reduce blocking effects
 */
function applyInterleavingPattern(
  problems: (MathProblem | ReadingExercise)[],
  recentTypes: string[],
  params: InterleavingParameters
): (MathProblem | ReadingExercise)[] {
  if (!params.discriminationFocus || problems.length <= 1) {
    return shuffleArray([...problems])
  }
  
  const interleaved: (MathProblem | ReadingExercise)[] = []
  const problemsByType = groupProblemsByType(problems)
  const typeKeys = Array.from(problemsByType.keys())
  
  // Avoid recently used types at the beginning
  const availableTypes = typeKeys.filter(type => 
    !recentTypes.slice(-2).includes(type) // Avoid last 2 types
  )
  
  let currentTypeIndex = 0
  let consecutiveCount = 0
  let lastType: string | null = null
  
  while (interleaved.length < problems.length) {
    const typesToTry = availableTypes.length > 0 ? availableTypes : typeKeys
    
    for (let attempts = 0; attempts < typesToTry.length && interleaved.length < problems.length; attempts++) {
      const currentType = typesToTry[currentTypeIndex % typesToTry.length]
      const problemsOfType = problemsByType.get(currentType) || []
      
      if (problemsOfType.length > 0) {
        // Check if we can use this type (not exceeding consecutive limit)
        if (lastType !== currentType || consecutiveCount < params.maxConsecutiveSameType) {
          const problem = problemsOfType.shift()!
          interleaved.push(problem)
          
          // Update consecutive count
          if (lastType === currentType) {
            consecutiveCount++
          } else {
            consecutiveCount = 1
            lastType = currentType
          }
          break
        }
      }
      
      currentTypeIndex++
    }
    
    // If we couldn't place any problem, force placement to avoid infinite loop
    if (interleaved.length === 0 || 
        (interleaved.length > 0 && interleaved.length === problems.length - 1)) {
      for (const [type, problemsOfType] of problemsByType) {
        if (problemsOfType.length > 0) {
          interleaved.push(problemsOfType.shift()!)
          break
        }
      }
    }
    
    currentTypeIndex++
  }
  
  return interleaved
}

/**
 * Group problems by type for interleaving
 */
function groupProblemsByType(
  problems: (MathProblem | ReadingExercise)[]
): Map<string, (MathProblem | ReadingExercise)[]> {
  const groups = new Map<string, (MathProblem | ReadingExercise)[]>()
  
  problems.forEach(problem => {
    const type = getProblemType(problem)
    if (!groups.has(type)) {
      groups.set(type, [])
    }
    groups.get(type)!.push(problem)
  })
  
  return groups
}

/**
 * Extract problem type for interleaving
 */
function getProblemType(problem: MathProblem | ReadingExercise): string {
  if ('type' in problem && problem.type) {
    return problem.type
  }
  
  // Fallback to topic-based classification for math problems
  if ('topic' in problem) {
    const topicValue = (problem as MathProblem).topic
    if (topicValue) return topicValue
  }
  
  return 'unknown'
}

/**
 * Extract skills from a problem (simplified implementation)
 */
function extractSkillsFromProblem(problem: MathProblem | ReadingExercise): string[] {
  const skills: string[] = []
  
  // This is a simplified implementation - in practice, this would be more sophisticated
  if ('type' in problem) {
    const mathProblem = problem as MathProblem
    
    switch (mathProblem.type) {
      case 'arithmetic':
        if (mathProblem.difficulty <= 2) {
          skills.push('counting', 'number-recognition')
        }
        if (mathProblem.question.includes('+')) skills.push('addition-basic')
        if (mathProblem.question.includes('-')) skills.push('subtraction-basic')
        if (mathProblem.question.includes('×') || mathProblem.question.includes('*')) {
          skills.push('multiplication-basic')
        }
        break
        
      case 'word-problem':
        skills.push('algebraic-thinking')
        if (mathProblem.difficulty >= 6) skills.push('ratios-proportions')
        break
        
      case 'algebra':
        skills.push('linear-equations')
        if (mathProblem.difficulty >= 10) skills.push('quadratic-equations')
        break
    }
  }
  
  return skills
}

/**
 * Estimate cognitive load of problem set
 */
function estimateCognitiveLoad(
  problems: (MathProblem | ReadingExercise)[],
  context: ProblemSelectionContext
): number {
  if (problems.length === 0) return 0
  
  // Base load from problem difficulty
  const avgDifficulty = problems.reduce((sum, p) => sum + p.difficulty, 0) / problems.length
  let load = avgDifficulty / 12 * 5 // Scale to 1-5
  
  // Adjust for interleaving (increases cognitive load initially)
  const uniqueTypes = new Set(problems.map(getProblemType)).size
  if (uniqueTypes > 3) {
    load += 0.5 // Interleaving adds cognitive load
  }
  
  // Adjust for struggling skills (higher load)
  const strugglingSkillProblems = problems.filter(p => {
    const problemSkills = extractSkillsFromProblem(p)
    return problemSkills.some(skill => context.strugglingSkills.includes(skill))
  }).length
  
  if (strugglingSkillProblems > problems.length * 0.5) {
    load += 0.5 // Many struggling skills increase load
  }
  
  return Math.max(1, Math.min(5, load))
}

/**
 * Describe the interleaving pattern used
 */
function describeInterleavingPattern(problems: (MathProblem | ReadingExercise)[]): string {
  if (problems.length === 0) return "No problems selected"
  
  const types = problems.map(getProblemType)
  const uniqueTypes = new Set(types)
  
  if (uniqueTypes.size === 1) {
    return `Blocked practice: all ${types[0]} problems`
  }
  
  // Analyze switching pattern
  let switches = 0
  for (let i = 1; i < types.length; i++) {
    if (types[i] !== types[i-1]) switches++
  }
  
  const switchRate = switches / (types.length - 1)
  
  if (switchRate > 0.7) {
    return `High interleaving: frequent switching between ${uniqueTypes.size} problem types`
  } else if (switchRate > 0.3) {
    return `Moderate interleaving: balanced mixing of ${uniqueTypes.size} problem types`
  } else {
    return `Low interleaving: mostly blocked practice with ${uniqueTypes.size} problem types`
  }
}

/**
 * Utility function to shuffle array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
