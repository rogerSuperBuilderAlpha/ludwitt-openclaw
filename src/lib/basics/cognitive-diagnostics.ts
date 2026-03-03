/**
 * Cognitive Diagnostic Model for Ludwitt Basics
 * 
 * Implements Bayesian Knowledge Tracing (BKT) and skill-based mastery tracking
 * to provide precision diagnostic assessment of student understanding.
 */

import { Timestamp } from 'firebase-admin/firestore'
import { MASTERY_THRESHOLDS, SKILL_ASSESSMENT_MIN_ATTEMPTS } from './constants'

export interface SkillMasteryState {
  skillId: string
  masteryProbability: number  // 0-1, Bayesian estimate of mastery
  lastAssessed: Date
  totalAttempts: number
  correctAttempts: number
  recentAttempts: Array<{
    correct: boolean
    problemId: string
    timestamp: Date
    timeSpent: number
  }>
  // BKT parameters (can be learned from data over time)
  pLearn: number    // P(T) - probability of learning on each attempt
  pSlip: number     // P(S) - slip rate (know but answer wrong)
  pGuess: number    // P(G) - guess rate (don't know but answer right)
  pInit: number     // P(L0) - initial knowledge probability
  // Metadata
  createdAt: Date
  updatedAt: Date
}

export interface EnhancedMathProblem {
  id: string
  difficulty: number
  requiredSkills: string[]  // Skills needed to solve this problem
  cognitiveLoad: {
    intrinsic: number       // Inherent complexity (1-5)
    extraneous: number      // Unnecessary complexity to minimize (1-5)
  }
  problemType: string       // For interleaving and discrimination practice
  scaffoldingLevel: 'worked-example' | 'completion' | 'guided' | 'independent'
}

export interface StudentCognitiveProfile {
  userId: string
  mathSkills: Map<string, SkillMasteryState>
  readingSkills: Map<string, SkillMasteryState>
  lastUpdated: Date
  // Global learning characteristics
  learningRate: number      // How quickly student typically learns (0-1)
  persistenceLevel: number  // How well student handles difficult problems (0-1)
  metacognitiveLevel: number // Self-awareness of learning (0-1)
}

/**
 * Core math skills taxonomy for diagnostic tracking
 */
export const MATH_SKILLS_TAXONOMY = {
  // Elementary (K-2)
  'number-recognition': 'Number Recognition',
  'counting': 'Counting',
  'place-value': 'Place Value',
  'addition-basic': 'Basic Addition',
  'subtraction-basic': 'Basic Subtraction',
  
  // Primary (3-5)
  'addition-regrouping': 'Addition with Regrouping',
  'subtraction-regrouping': 'Subtraction with Regrouping',
  'multiplication-basic': 'Basic Multiplication',
  'division-basic': 'Basic Division',
  'fractions-basic': 'Basic Fractions',
  'decimals-basic': 'Basic Decimals',
  
  // Middle School (6-8)
  'fractions-operations': 'Fraction Operations',
  'decimals-operations': 'Decimal Operations',
  'percentages': 'Percentages',
  'integers': 'Integer Operations',
  'ratios-proportions': 'Ratios and Proportions',
  'basic-geometry': 'Basic Geometry',
  'algebraic-thinking': 'Algebraic Thinking',
  
  // High School (9-12)
  'linear-equations': 'Linear Equations',
  'quadratic-equations': 'Quadratic Equations',
  'functions': 'Functions',
  'trigonometry': 'Trigonometry',
  'statistics': 'Statistics',
  'probability': 'Probability',
  'calculus-basics': 'Basic Calculus'
}

/**
 * Reading skills taxonomy based on Simple View of Reading
 */
export const READING_SKILLS_TAXONOMY = {
  // Decoding Component
  'phonological-awareness': 'Phonological Awareness',
  'phonics': 'Phonics/Decoding',
  'sight-words': 'Sight Word Recognition',
  'fluency': 'Reading Fluency',
  
  // Language Comprehension Component
  'vocabulary': 'Vocabulary Knowledge',
  'background-knowledge': 'Background Knowledge',
  'syntactic-awareness': 'Syntactic Awareness',
  'inference-skills': 'Inference Skills',
  'metacomprehension': 'Metacomprehension',
  
  // Strategy Skills
  'questioning': 'Questioning Strategy',
  'summarizing': 'Summarizing Strategy',
  'clarifying': 'Clarifying Strategy',
  'predicting': 'Predicting Strategy',
  'visualizing': 'Visualization Strategy'
}

/**
 * Update skill mastery using Bayesian Knowledge Tracing
 */
export function updateSkillMastery(
  skill: SkillMasteryState,
  correct: boolean,
  timeSpent: number,
  problemId: string
): SkillMasteryState {
  const updatedSkill = { ...skill }
  
  // Add to recent attempts (keep last 10)
  updatedSkill.recentAttempts = [
    {
      correct,
      problemId,
      timestamp: new Date(),
      timeSpent
    },
    ...skill.recentAttempts.slice(0, 9)
  ]
  
  updatedSkill.totalAttempts += 1
  if (correct) updatedSkill.correctAttempts += 1
  updatedSkill.lastAssessed = new Date()
  updatedSkill.updatedAt = new Date()

  // BKT Update: P(Ln|evidence) 
  const pKnew = skill.masteryProbability
  const { pLearn, pSlip, pGuess } = skill
  
  let pKnowGivenEvidence: number
  
  if (correct) {
    // P(Ln|correct) = P(correct|Ln) * P(Ln) / P(correct)
    // P(correct|Ln) = 1 - pSlip
    // P(correct|¬Ln) = pGuess
    // P(correct) = P(correct|Ln) * P(Ln) + P(correct|¬Ln) * P(¬Ln)
    const pCorrectGivenKnow = 1 - pSlip
    const pCorrectGivenNotKnow = pGuess
    const pCorrect = pCorrectGivenKnow * pKnew + pCorrectGivenNotKnow * (1 - pKnew)
    
    pKnowGivenEvidence = (pCorrectGivenKnow * pKnew) / pCorrect
  } else {
    // P(Ln|incorrect) = P(incorrect|Ln) * P(Ln) / P(incorrect)
    const pIncorrectGivenKnow = pSlip
    const pIncorrectGivenNotKnow = 1 - pGuess
    const pIncorrect = pIncorrectGivenKnow * pKnew + pIncorrectGivenNotKnow * (1 - pKnew)
    
    pKnowGivenEvidence = (pIncorrectGivenKnow * pKnew) / pIncorrect
  }
  
  // Apply learning increment: P(Ln+1) = P(Ln|evidence) + (1 - P(Ln|evidence)) * pLearn
  updatedSkill.masteryProbability = pKnowGivenEvidence + (1 - pKnowGivenEvidence) * pLearn
  
  // Clamp to valid probability range
  updatedSkill.masteryProbability = Math.max(0, Math.min(1, updatedSkill.masteryProbability))
  
  return updatedSkill
}

/**
 * Create a new skill mastery state with default BKT parameters
 */
export function createSkillMasteryState(
  skillId: string,
  initialMastery: number = 0.1
): SkillMasteryState {
  return {
    skillId,
    masteryProbability: initialMastery,
    lastAssessed: new Date(0),
    totalAttempts: 0,
    correctAttempts: 0,
    recentAttempts: [],
    // Default BKT parameters - these can be learned from data
    pLearn: 0.15,    // 15% chance of learning on each attempt
    pSlip: 0.1,      // 10% slip rate
    pGuess: 0.25,    // 25% guess rate (for multiple choice)
    pInit: 0.1,      // 10% initial knowledge
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

/**
 * Diagnose learning bottlenecks and provide targeted recommendations
 */
export function diagnoseSkillBottlenecks(
  profile: StudentCognitiveProfile,
  subject: 'math' | 'reading'
): {
  strugglingSkills: string[]
  masteredSkills: string[]
  readyForAdvancement: string[]
  recommendations: string[]
} {
  const skills = subject === 'math' ? profile.mathSkills : profile.readingSkills
  const skillArray = Array.from(skills.values())
  
  // Categorize skills by mastery level
  const strugglingSkills = skillArray
    .filter(skill => skill.masteryProbability < MASTERY_THRESHOLDS.STRUGGLING && skill.totalAttempts >= SKILL_ASSESSMENT_MIN_ATTEMPTS.STRUGGLING)
    .map(skill => skill.skillId)
    .sort((a, b) => skills.get(a)!.masteryProbability - skills.get(b)!.masteryProbability)
  
  const masteredSkills = skillArray
    .filter(skill => skill.masteryProbability >= MASTERY_THRESHOLDS.MASTERED && skill.totalAttempts >= SKILL_ASSESSMENT_MIN_ATTEMPTS.MASTERED)
    .map(skill => skill.skillId)
  
  const readyForAdvancement = skillArray
    .filter(skill => 
      skill.masteryProbability >= MASTERY_THRESHOLDS.PROFICIENT && 
      skill.masteryProbability < MASTERY_THRESHOLDS.MASTERED && 
      skill.totalAttempts >= SKILL_ASSESSMENT_MIN_ATTEMPTS.READY_FOR_ADVANCEMENT
    )
    .map(skill => skill.skillId)
  
  // Generate recommendations
  const recommendations: string[] = []
  
  if (strugglingSkills.length > 0) {
    recommendations.push(`Focus on ${strugglingSkills.length} struggling skill(s): ${strugglingSkills.slice(0, 3).join(', ')}`)
    recommendations.push('Consider worked examples and scaffolded practice for struggling areas')
  }
  
  if (readyForAdvancement.length > 0) {
    recommendations.push(`${readyForAdvancement.length} skill(s) ready for advancement with more practice`)
  }
  
  if (masteredSkills.length >= 3) {
    recommendations.push('Use spaced repetition to maintain mastered skills')
    recommendations.push('Consider advancing to more complex problems')
  }
  
  // Subject-specific recommendations
  if (subject === 'reading') {
    const decodingSkills = ['phonological-awareness', 'phonics', 'sight-words', 'fluency']
    const comprehensionSkills = ['vocabulary', 'background-knowledge', 'syntactic-awareness', 'inference-skills']
    
    const decodingMastery = decodingSkills
      .map(skillId => skills.get(skillId)?.masteryProbability || 0)
      .reduce((sum, mastery) => sum + mastery, 0) / decodingSkills.length
    
    const comprehensionMastery = comprehensionSkills
      .map(skillId => skills.get(skillId)?.masteryProbability || 0)
      .reduce((sum, mastery) => sum + mastery, 0) / comprehensionSkills.length
    
    if (decodingMastery < 0.7 && comprehensionMastery >= 0.7) {
      recommendations.push('Focus on decoding skills: phonics, fluency, and sight words')
    } else if (decodingMastery >= 0.7 && comprehensionMastery < 0.7) {
      recommendations.push('Focus on comprehension strategies: vocabulary and inference skills')
    }
  }
  
  return {
    strugglingSkills,
    masteredSkills,
    readyForAdvancement,
    recommendations
  }
}

/**
 * Map problems to required skills for Q-matrix construction
 */
export function mapProblemToSkills(problemId: string, problemType: string, difficulty: number): string[] {
  const skills: string[] = []
  
  // This is a simplified mapping - in practice, this would be more sophisticated
  // and potentially learned from expert annotations or data analysis
  
  if (problemType === 'arithmetic') {
    if (difficulty <= 2) {
      skills.push('counting', 'number-recognition')
      if (problemId.includes('add')) skills.push('addition-basic')
      if (problemId.includes('sub')) skills.push('subtraction-basic')
    } else if (difficulty <= 5) {
      if (problemId.includes('add')) skills.push('addition-regrouping')
      if (problemId.includes('sub')) skills.push('subtraction-regrouping')
      if (problemId.includes('mult')) skills.push('multiplication-basic')
      if (problemId.includes('div')) skills.push('division-basic')
    }
  } else if (problemType === 'word-problem') {
    skills.push('algebraic-thinking')
    if (difficulty >= 6) skills.push('ratios-proportions')
  } else if (problemType === 'algebra') {
    skills.push('linear-equations')
    if (difficulty >= 10) skills.push('quadratic-equations')
  }
  
  return skills
}

/**
 * Update cognitive profile after problem attempt
 */
export function updateCognitiveProfile(
  profile: StudentCognitiveProfile,
  subject: 'math' | 'reading',
  problemId: string,
  requiredSkills: string[],
  correct: boolean,
  timeSpent: number
): StudentCognitiveProfile {
  const updatedProfile = { ...profile }
  const skillsMap = subject === 'math' ? updatedProfile.mathSkills : updatedProfile.readingSkills
  
  // Update each required skill
  for (const skillId of requiredSkills) {
    let skill = skillsMap.get(skillId)
    if (!skill) {
      skill = createSkillMasteryState(skillId)
      skillsMap.set(skillId, skill)
    }
    
    const updatedSkill = updateSkillMastery(skill, correct, timeSpent, problemId)
    skillsMap.set(skillId, updatedSkill)
  }
  
  updatedProfile.lastUpdated = new Date()
  
  return updatedProfile
}















