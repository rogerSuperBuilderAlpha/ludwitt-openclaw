/**
 * Enhanced Problem Selection Service
 * 
 * Integrates spaced repetition, cognitive diagnostics, scaffolding, and interleaving
 * to provide evidence-based problem selection for optimal learning outcomes.
 */

import { MathProblem, ReadingExercise, UserBasicsProgress, SubjectProgress, Attempt } from '@/lib/types/basics'
import { InterleavedProblemSet } from './interleaving-algorithm'
import { SpacedItem, SpacingScheduler, getSpacedRepetitionRecommendations } from './spaced-repetition'
import { 
  StudentCognitiveProfile, 
  diagnoseSkillBottlenecks, 
  mapProblemToSkills 
} from './cognitive-diagnostics'
import { 
  SupportLevel, 
  determineSupportLevel, 
  ScaffoldingRecommendation 
} from './scaffolding-system'
import { 
  selectInterleavedProblems, 
  ProblemSelectionContext, 
  DEFAULT_INTERLEAVING_PARAMS 
} from './interleaving-algorithm'

export interface EnhancedProblemRequest {
  userId: string
  subject: 'math' | 'reading'
  requestedCount: number
  currentProgress: UserBasicsProgress
  cognitiveProfile?: StudentCognitiveProfile
  spacingScheduler?: SpacingScheduler
  sessionGoals?: string[]           // e.g., ["review-struggling-skills", "advance-difficulty"]
  timeConstraints?: number          // minutes available
  preferredCognitiveLoad?: number   // 1-5 scale
}

export interface EnhancedProblemSelection {
  problems: (MathProblem | ReadingExercise)[]
  scaffoldingRecommendations: Map<string, ScaffoldingRecommendation>
  learningRationale: string
  expectedOutcomes: string[]
  sessionPlan: {
    estimatedTime: number
    cognitiveLoadProgression: number[]
    scaffoldingProgression: SupportLevel[]
    skillFocus: string[]
  }
  adaptiveParameters: {
    nextSessionAdjustments: string[]
    performanceThresholds: {
      advanceDifficulty: number
      maintainLevel: number
      providMoreScaffolding: number
    }
  }
}

/**
 * Main function to select problems using all evidence-based systems
 */
export async function selectEnhancedProblems(
  request: EnhancedProblemRequest,
  availableProblems: (MathProblem | ReadingExercise)[]
): Promise<EnhancedProblemSelection> {
  const {
    userId,
    subject,
    requestedCount,
    currentProgress,
    cognitiveProfile,
    spacingScheduler,
    sessionGoals = [],
    timeConstraints,
    preferredCognitiveLoad = 3
  } = request

  // 1. Analyze current learning state
  const subjectProgress = currentProgress[subject]
  const learningState = analyzeLearningState(subjectProgress, subject, cognitiveProfile)
  
  // 2. Determine session priorities based on learning state and goals
  const sessionPriorities = determineSessionPriorities(learningState, sessionGoals)
  
  // 3. Get spaced repetition recommendations
  const spacedRecommendations = spacingScheduler 
    ? getSpacedRepetitionRecommendations(spacingScheduler, subject, Math.ceil(requestedCount * 0.3))
    : []
  
  // 4. Build problem selection context
  const selectionContext: ProblemSelectionContext = {
    targetDifficulty: subjectProgress.currentDifficulty,
    masteredSkills: learningState.masteredSkills,
    strugglingSkills: learningState.strugglingSkills,
    recentProblemTypes: getRecentProblemTypes(subjectProgress),
    spacedRepetitionDue: spacedRecommendations,
    cognitiveLoad: preferredCognitiveLoad
  }
  
  // 5. Select interleaved problems
  const interleavingParams = adjustInterleavingParams(learningState, sessionPriorities)
  const interleavedSet = selectInterleavedProblems(
    availableProblems,
    selectionContext,
    interleavingParams,
    requestedCount
  )
  
  // 6. Generate scaffolding recommendations for each problem
  const scaffoldingRecommendations = new Map<string, ScaffoldingRecommendation>()
  
  for (const problem of interleavedSet.problems) {
    const problemSkills = mapProblemToSkills(problem.id, getProblemType(problem), problem.difficulty)
    const avgSkillMastery = calculateAverageSkillMastery(problemSkills, subject, cognitiveProfile)
    const recentPerformance = getRecentPerformanceForSkills(problemSkills, subjectProgress)
    
    const scaffolding = determineSupportLevel(
      avgSkillMastery,
      recentPerformance.consecutiveCorrect,
      recentPerformance.totalAttempts,
      recentPerformance.recentErrors,
      estimateProblemCognitiveLoad(problem)
    )
    
    scaffoldingRecommendations.set(problem.id, scaffolding)
  }
  
  // 7. Create session plan
  const sessionPlan = createSessionPlan(
    interleavedSet.problems,
    scaffoldingRecommendations,
    timeConstraints
  )
  
  // 8. Generate learning rationale and expected outcomes
  const learningRationale = generateLearningRationale(
    learningState,
    sessionPriorities,
    interleavedSet,
    scaffoldingRecommendations
  )
  
  const expectedOutcomes = generateExpectedOutcomes(
    learningState,
    sessionPlan,
    interleavedSet.expectedBenefits
  )
  
  // 9. Set adaptive parameters for next session
  const adaptiveParameters = generateAdaptiveParameters(
    learningState,
    sessionPlan,
    subjectProgress.currentDifficulty
  )
  
  return {
    problems: interleavedSet.problems,
    scaffoldingRecommendations,
    learningRationale,
    expectedOutcomes,
    sessionPlan,
    adaptiveParameters
  }
}

interface LearningState {
  overallMastery: number
  masteredSkills: string[]
  strugglingSkills: string[]
  readyForAdvancement: string[]
  recentPerformanceTrend: 'improving' | 'stable' | 'declining'
  engagementLevel: 'high' | 'medium' | 'low'
  metacognitiveLevel: number
}

/**
 * Analyze current learning state from progress and cognitive profile
 */
function analyzeLearningState(
  subjectProgress: SubjectProgress,
  subject: 'math' | 'reading',
  cognitiveProfile?: StudentCognitiveProfile
): LearningState {
  let masteredSkills: string[] = []
  let strugglingSkills: string[] = []
  let readyForAdvancement: string[] = []
  let overallMastery = 0
  let metacognitiveLevel = 0.5
  
  if (cognitiveProfile) {
    const diagnosis = diagnoseSkillBottlenecks(cognitiveProfile, subject)
    masteredSkills = diagnosis.masteredSkills
    strugglingSkills = diagnosis.strugglingSkills
    readyForAdvancement = diagnosis.readyForAdvancement
    
    const skills = subject === 'math' ? cognitiveProfile.mathSkills : cognitiveProfile.readingSkills
    const skillArray = Array.from(skills.values())
    overallMastery = skillArray.length > 0 
      ? skillArray.reduce((sum, skill) => sum + skill.masteryProbability, 0) / skillArray.length
      : 0
    
    metacognitiveLevel = cognitiveProfile.metacognitiveLevel
  }
  
  // Analyze performance trend from recent attempts
  const recentAttempts: Attempt[] = subjectProgress.recentAttempts || []
  let recentPerformanceTrend: 'improving' | 'stable' | 'declining' = 'stable'
  
  if (recentAttempts.length >= 6) {
    const firstHalf = recentAttempts.slice(-6, -3).filter((a) => a.correct).length
    const secondHalf = recentAttempts.slice(-3).filter((a) => a.correct).length
    
    if (secondHalf > firstHalf) {
      recentPerformanceTrend = 'improving'
    } else if (secondHalf < firstHalf) {
      recentPerformanceTrend = 'declining'
    }
  }
  
  // Estimate engagement level from streak and recent activity
  let engagementLevel: 'high' | 'medium' | 'low' = 'medium'
  if (subjectProgress.currentStreak >= 5 && subjectProgress.accuracyRate >= 0.8) {
    engagementLevel = 'high'
  } else if (subjectProgress.currentStreak <= 1 || subjectProgress.accuracyRate <= 0.5) {
    engagementLevel = 'low'
  }
  
  return {
    overallMastery,
    masteredSkills,
    strugglingSkills,
    readyForAdvancement,
    recentPerformanceTrend,
    engagementLevel,
    metacognitiveLevel
  }
}

/**
 * Determine session priorities based on learning state and goals
 */
function determineSessionPriorities(
  learningState: LearningState,
  sessionGoals: string[]
): string[] {
  const priorities: string[] = []
  
  // High priority: address struggling skills
  if (learningState.strugglingSkills.length > 0) {
    priorities.push('remediate-struggling-skills')
  }
  
  // Medium priority: spaced repetition for mastered skills
  if (learningState.masteredSkills.length >= 3) {
    priorities.push('maintain-mastered-skills')
  }
  
  // Variable priority based on performance trend
  if (learningState.recentPerformanceTrend === 'improving' && learningState.readyForAdvancement.length > 0) {
    priorities.push('advance-difficulty')
  } else if (learningState.recentPerformanceTrend === 'declining') {
    priorities.push('provide-scaffolding')
  }
  
  // Engagement-based priorities
  if (learningState.engagementLevel === 'low') {
    priorities.push('increase-engagement')
    priorities.push('reduce-cognitive-load')
  } else if (learningState.engagementLevel === 'high') {
    priorities.push('challenge-with-complex-problems')
  }
  
  // Metacognitive development
  if (learningState.metacognitiveLevel < 0.6) {
    priorities.push('develop-metacognition')
  }
  
  // Incorporate explicit session goals
  priorities.push(...sessionGoals)
  
  return priorities
}

/**
 * Get recent problem types to avoid excessive repetition
 */
function getRecentProblemTypes(subjectProgress: SubjectProgress): string[] {
  const recentAttempts: Attempt[] = subjectProgress.recentAttempts || []
  return recentAttempts
    .slice(0, 5) // Last 5 problems
    .map((attempt) => attempt.type || 'unknown')
}

/**
 * Calculate average skill mastery for a set of skills
 */
function calculateAverageSkillMastery(
  skillIds: string[],
  subject: 'math' | 'reading',
  cognitiveProfile?: StudentCognitiveProfile
): number {
  if (!cognitiveProfile || skillIds.length === 0) return 0.5 // Default moderate mastery
  
  const skills = subject === 'math' ? cognitiveProfile.mathSkills : cognitiveProfile.readingSkills
  const masteryValues = skillIds
    .map(skillId => skills.get(skillId)?.masteryProbability || 0.1)
    .filter(mastery => mastery > 0)
  
  return masteryValues.length > 0 
    ? masteryValues.reduce((sum, mastery) => sum + mastery, 0) / masteryValues.length
    : 0.1
}

/**
 * Get recent performance statistics for specific skills
 */
function getRecentPerformanceForSkills(
  skillIds: string[],
  subjectProgress: SubjectProgress
): { consecutiveCorrect: number; totalAttempts: number; recentErrors: number } {
  const recentAttempts: Attempt[] = subjectProgress.recentAttempts || []
  
  // This is simplified - in practice, you'd need to map attempts to skills
  let consecutiveCorrect = 0
  let recentErrors = 0
  
  for (let i = 0; i < recentAttempts.length && i < 5; i++) {
    const attempt = recentAttempts[i]
    if (attempt.correct) {
      if (i === 0) consecutiveCorrect++
      else break
    } else {
      recentErrors++
      break
    }
  }
  
  return {
    consecutiveCorrect,
    totalAttempts: recentAttempts.length,
    recentErrors
  }
}

/**
 * Estimate cognitive load of individual problem
 */
function estimateProblemCognitiveLoad(problem: MathProblem | ReadingExercise): number {
  // Base load from difficulty
  let load = problem.difficulty / 12 * 5 // Scale to 1-5
  
  // Adjust for problem type complexity
  const type = getProblemType(problem)
  if (type === 'word-problem') load += 0.5
  if (type === 'algebra' || type === 'calculus') load += 1
  
  // Adjust for estimated time
  if ('timeEstimate' in problem && problem.timeEstimate) {
    if (problem.timeEstimate > 120) load += 0.5 // Long problems
  }
  
  return Math.max(1, Math.min(5, load))
}

/**
 * Create detailed session plan
 */
function createSessionPlan(
  problems: (MathProblem | ReadingExercise)[],
  scaffoldingRecommendations: Map<string, ScaffoldingRecommendation>,
  timeConstraints?: number
): EnhancedProblemSelection['sessionPlan'] {
  const estimatedTimes = problems.map(problem => 
    'timeEstimate' in problem ? problem.timeEstimate || 60 : 60
  )
  const totalTime = estimatedTimes.reduce((sum, time) => sum + time, 0)
  
  const cognitiveLoadProgression = problems.map(problem => 
    estimateProblemCognitiveLoad(problem)
  )
  
  const scaffoldingProgression = problems.map(problem => 
    scaffoldingRecommendations.get(problem.id)?.supportLevel || SupportLevel.GUIDED_PROBLEM
  )
  
  // Extract skill focus from problems
  const allSkills = problems.flatMap(problem => 
    mapProblemToSkills(problem.id, getProblemType(problem), problem.difficulty)
  )
  const skillCounts = allSkills.reduce((counts, skill) => {
    counts[skill] = (counts[skill] || 0) + 1
    return counts
  }, {} as Record<string, number>)
  
  const skillFocus = Object.entries(skillCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([skill]) => skill)
  
  return {
    estimatedTime: totalTime,
    cognitiveLoadProgression,
    scaffoldingProgression,
    skillFocus
  }
}

/**
 * Generate learning rationale explaining the problem selection
 */
function generateLearningRationale(
  learningState: LearningState,
  sessionPriorities: string[],
  interleavedSet: InterleavedProblemSet,
  scaffoldingRecommendations: Map<string, ScaffoldingRecommendation>
): string {
  const rationales: string[] = []
  
  // Overall strategy
  if (learningState.overallMastery < 0.4) {
    rationales.push("Focusing on foundational skills with extensive scaffolding")
  } else if (learningState.overallMastery > 0.8) {
    rationales.push("Emphasizing advanced problems and spaced repetition")
  } else {
    rationales.push("Balancing skill development with challenge progression")
  }
  
  // Specific interventions
  if (sessionPriorities.includes('remediate-struggling-skills')) {
    rationales.push("Targeting identified skill gaps with worked examples")
  }
  
  if (sessionPriorities.includes('maintain-mastered-skills')) {
    rationales.push("Including spaced repetition to prevent forgetting")
  }
  
  // Interleaving rationale
  rationales.push(interleavedSet.rationale)
  
  return rationales.join('. ') + '.'
}

/**
 * Generate expected learning outcomes
 */
function generateExpectedOutcomes(
  learningState: LearningState,
  sessionPlan: EnhancedProblemSelection['sessionPlan'],
  interleavingBenefits: string[]
): string[] {
  const outcomes: string[] = []
  
  // Skill-specific outcomes
  if (sessionPlan.skillFocus.length > 0) {
    outcomes.push(`Improved mastery in: ${sessionPlan.skillFocus.join(', ')}`)
  }
  
  // Performance outcomes
  if (learningState.recentPerformanceTrend === 'declining') {
    outcomes.push("Stabilized performance through targeted support")
  } else if (learningState.recentPerformanceTrend === 'improving') {
    outcomes.push("Continued progress with appropriate challenge level")
  }
  
  // Add interleaving benefits
  outcomes.push(...interleavingBenefits)
  
  // Metacognitive outcomes
  const scaffoldingLevels = sessionPlan.scaffoldingProgression
  const independentProblems = scaffoldingLevels.filter(level => level === SupportLevel.INDEPENDENT).length
  
  if (independentProblems > 0) {
    outcomes.push("Increased independence and self-regulation")
  }
  
  return outcomes
}

/**
 * Generate adaptive parameters for next session
 */
function generateAdaptiveParameters(
  learningState: LearningState,
  sessionPlan: EnhancedProblemSelection['sessionPlan'],
  currentDifficulty: number
): EnhancedProblemSelection['adaptiveParameters'] {
  const nextSessionAdjustments: string[] = []
  
  // Difficulty adjustments
  if (learningState.recentPerformanceTrend === 'improving' && learningState.engagementLevel === 'high') {
    nextSessionAdjustments.push("Consider increasing difficulty by 0.5 levels")
  } else if (learningState.recentPerformanceTrend === 'declining') {
    nextSessionAdjustments.push("Maintain current difficulty with more scaffolding")
  }
  
  // Scaffolding adjustments
  const avgCognitiveLoad = sessionPlan.cognitiveLoadProgression.reduce((sum, load) => sum + load, 0) / sessionPlan.cognitiveLoadProgression.length
  if (avgCognitiveLoad > 4) {
    nextSessionAdjustments.push("Reduce cognitive load in next session")
  }
  
  // Engagement adjustments
  if (learningState.engagementLevel === 'low') {
    nextSessionAdjustments.push("Incorporate more engaging problem types")
  }
  
  return {
    nextSessionAdjustments,
    performanceThresholds: {
      advanceDifficulty: 0.8,      // 80% accuracy to advance
      maintainLevel: 0.6,          // 60-80% to maintain
      providMoreScaffolding: 0.5   // Below 50% needs more support
    }
  }
}

/**
 * Adjust interleaving parameters based on learning state
 */
function adjustInterleavingParams(learningState: LearningState, priorities: string[]) {
  const params = { ...DEFAULT_INTERLEAVING_PARAMS }
  
  // Adjust ratios based on priorities
  if (priorities.includes('remediate-struggling-skills')) {
    params.strugglingSkillsRatio = 0.5  // Increase focus on struggling skills
    params.newMaterialRatio = 0.2       // Reduce new material
  }
  
  if (priorities.includes('maintain-mastered-skills')) {
    params.spacedReviewRatio = 0.4      // Increase spaced repetition
    params.newMaterialRatio = 0.3       // Reduce new material
  }
  
  // Adjust interleaving based on cognitive capacity
  if (learningState.engagementLevel === 'low' || learningState.overallMastery < 0.3) {
    params.discriminationFocus = false   // Reduce interleaving for struggling learners
    params.maxConsecutiveSameType = 3    // Allow more blocking
  }
  
  return params
}

/**
 * Helper function to get problem type
 */
function getProblemType(problem: MathProblem | ReadingExercise): string {
  if ('type' in problem && problem.type) {
    return problem.type
  }
  return 'unknown'
}
