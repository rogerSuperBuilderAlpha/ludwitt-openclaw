/**
 * Cognitive Load Optimizer
 * 
 * Generates presentation adjustments to optimize cognitive load.
 */

import {
  CognitiveLoadEstimate,
  PresentationConfig,
  PresentationAdjustment,
  CognitiveProfile,
  ProblemComplexity,
  LoadRecommendation,
  CognitiveLoadConfig,
  DEFAULT_COGNITIVE_LOAD_CONFIG
} from './types'

// ============================================================================
// Default Presentation Configuration
// ============================================================================

export const DEFAULT_PRESENTATION_CONFIG: PresentationConfig = {
  maxElementsPerView: 5,
  chunkingStrategy: 'sequential',
  primaryModality: 'mixed',
  useRedundancy: false,
  scaffoldingLevel: 'none',
  showWorkedSteps: false,
  hideOptionalInfo: false,
  selfPaced: true,
  highlightKeyInfo: true,
  useWhitespace: true,
  simplifyNotation: false
}

// ============================================================================
// Main Optimization Function
// ============================================================================

/**
 * Generate presentation adjustments based on cognitive load estimate
 */
export function optimizePresentation(
  loadEstimate: CognitiveLoadEstimate,
  currentConfig: PresentationConfig,
  complexity?: ProblemComplexity,
  profile?: CognitiveProfile
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  // Select adjustments based on recommendation
  switch (loadEstimate.recommendation) {
    case 'reduce_complexity':
      adjustments.push(...getComplexityReductionAdjustments(currentConfig, complexity))
      break
    
    case 'add_scaffolding':
      adjustments.push(...getScaffoldingAdjustments(currentConfig, loadEstimate))
      break
    
    case 'split_problem':
      adjustments.push(...getProblemSplitAdjustments(currentConfig, complexity))
      break
    
    case 'provide_worked_example':
      adjustments.push(...getWorkedExampleAdjustments(currentConfig))
      break
    
    case 'reduce_distractions':
      adjustments.push(...getDistractionReductionAdjustments(currentConfig))
      break
    
    case 'increase_challenge':
      adjustments.push(...getChallengeIncreaseAdjustments(currentConfig))
      break
    
    case 'take_break':
      adjustments.push({
        type: 'pacing',
        change: 'Suggest taking a short break',
        rationale: 'Extended struggle indicates cognitive fatigue',
        expectedLoadReduction: 0.2
      })
      break
    
    case 'maintain_current':
      // No adjustments needed
      break
  }
  
  // Add profile-specific adjustments
  if (profile) {
    adjustments.push(...getProfileBasedAdjustments(currentConfig, profile, loadEstimate))
  }
  
  // Sort by expected impact
  adjustments.sort((a, b) => b.expectedLoadReduction - a.expectedLoadReduction)
  
  // Return top adjustments
  return adjustments.slice(0, 3)
}

// ============================================================================
// Adjustment Generators
// ============================================================================

function getComplexityReductionAdjustments(
  config: PresentationConfig,
  complexity?: ProblemComplexity
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  // Simplify notation
  if (!config.simplifyNotation) {
    adjustments.push({
      type: 'formatting',
      change: 'Simplify mathematical notation',
      rationale: 'Simpler notation reduces extraneous load',
      expectedLoadReduction: 0.1
    })
  }
  
  // Reduce elements per view
  if (config.maxElementsPerView > 3) {
    adjustments.push({
      type: 'chunking',
      change: 'Show fewer elements at once',
      rationale: 'Smaller chunks fit better in working memory',
      expectedLoadReduction: 0.15
    })
  }
  
  // Hide optional information
  if (!config.hideOptionalInfo) {
    adjustments.push({
      type: 'formatting',
      change: 'Hide non-essential information',
      rationale: 'Remove distracting details',
      expectedLoadReduction: 0.1
    })
  }
  
  return adjustments
}

function getScaffoldingAdjustments(
  config: PresentationConfig,
  loadEstimate: CognitiveLoadEstimate
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  // Increase scaffolding level
  if (config.scaffoldingLevel === 'none') {
    adjustments.push({
      type: 'scaffolding',
      change: 'Add light scaffolding (guiding questions)',
      rationale: 'Structure helps manage cognitive load',
      expectedLoadReduction: 0.15
    })
  } else if (config.scaffoldingLevel === 'light') {
    adjustments.push({
      type: 'scaffolding',
      change: 'Add moderate scaffolding (step-by-step guidance)',
      rationale: 'More structured support for struggling learners',
      expectedLoadReduction: 0.2
    })
  } else if (config.scaffoldingLevel === 'moderate') {
    adjustments.push({
      type: 'scaffolding',
      change: 'Add heavy scaffolding (detailed worked steps)',
      rationale: 'Maximum support for high difficulty',
      expectedLoadReduction: 0.25
    })
  }
  
  // Highlight key information
  if (!config.highlightKeyInfo) {
    adjustments.push({
      type: 'formatting',
      change: 'Highlight key information',
      rationale: 'Visual cues direct attention to important elements',
      expectedLoadReduction: 0.1
    })
  }
  
  return adjustments
}

function getProblemSplitAdjustments(
  config: PresentationConfig,
  complexity?: ProblemComplexity
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  const steps = complexity?.steps ?? 3
  
  if (steps > 2) {
    adjustments.push({
      type: 'chunking',
      change: 'Split into sub-problems',
      rationale: 'Breaking down complex problems reduces working memory demands',
      expectedLoadReduction: 0.25
    })
  }
  
  adjustments.push({
    type: 'chunking',
    change: 'Use sequential presentation of steps',
    rationale: 'One step at a time prevents overload',
    expectedLoadReduction: 0.2
  })
  
  return adjustments
}

function getWorkedExampleAdjustments(
  config: PresentationConfig
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  if (!config.showWorkedSteps) {
    adjustments.push({
      type: 'scaffolding',
      change: 'Show worked example of similar problem',
      rationale: 'Worked examples reduce cognitive load for novices',
      expectedLoadReduction: 0.3
    })
  }
  
  adjustments.push({
    type: 'scaffolding',
    change: 'Provide completion problem (partial solution)',
    rationale: 'Completion problems bridge examples and practice',
    expectedLoadReduction: 0.2
  })
  
  return adjustments
}

function getDistractionReductionAdjustments(
  config: PresentationConfig
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  if (!config.useWhitespace) {
    adjustments.push({
      type: 'formatting',
      change: 'Add whitespace around problem',
      rationale: 'Visual breathing room reduces extraneous load',
      expectedLoadReduction: 0.1
    })
  }
  
  if (!config.hideOptionalInfo) {
    adjustments.push({
      type: 'formatting',
      change: 'Hide decorative elements',
      rationale: 'Remove visual distractions',
      expectedLoadReduction: 0.1
    })
  }
  
  if (config.useRedundancy) {
    adjustments.push({
      type: 'modality',
      change: 'Remove redundant information',
      rationale: 'Redundancy effect - same info in multiple forms increases load',
      expectedLoadReduction: 0.15
    })
  }
  
  return adjustments
}

function getChallengeIncreaseAdjustments(
  config: PresentationConfig
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  // Reduce scaffolding
  if (config.scaffoldingLevel !== 'none') {
    adjustments.push({
      type: 'scaffolding',
      change: 'Reduce scaffolding level (fading)',
      rationale: 'Learner is ready for less support',
      expectedLoadReduction: -0.1  // Actually increases challenge
    })
  }
  
  // Show more at once
  if (config.maxElementsPerView < 7) {
    adjustments.push({
      type: 'chunking',
      change: 'Show more elements simultaneously',
      rationale: 'Learner can handle more information',
      expectedLoadReduction: -0.1
    })
  }
  
  // Remove highlights
  if (config.highlightKeyInfo) {
    adjustments.push({
      type: 'formatting',
      change: 'Remove highlighting',
      rationale: 'Learner should identify key info independently',
      expectedLoadReduction: -0.05
    })
  }
  
  return adjustments
}

function getProfileBasedAdjustments(
  config: PresentationConfig,
  profile: CognitiveProfile,
  loadEstimate: CognitiveLoadEstimate
): PresentationAdjustment[] {
  const adjustments: PresentationAdjustment[] = []
  
  // Adjust for working memory capacity
  if (profile.workingMemoryCapacity === 'low' && config.maxElementsPerView > 4) {
    adjustments.push({
      type: 'chunking',
      change: 'Reduce elements per view for lower WM capacity',
      rationale: 'User has lower working memory capacity',
      expectedLoadReduction: 0.15
    })
  }
  
  // Adjust for preferred modality
  if (profile.preferredModality === 'visual' && config.primaryModality !== 'visual') {
    adjustments.push({
      type: 'modality',
      change: 'Emphasize visual presentation',
      rationale: 'User prefers visual learning',
      expectedLoadReduction: 0.1
    })
  } else if (profile.preferredModality === 'verbal' && config.primaryModality !== 'verbal') {
    adjustments.push({
      type: 'modality',
      change: 'Emphasize verbal explanations',
      rationale: 'User prefers verbal learning',
      expectedLoadReduction: 0.1
    })
  }
  
  // Adjust for attention span
  if (profile.sustainedAttentionSpan < 5 && !config.selfPaced) {
    adjustments.push({
      type: 'pacing',
      change: 'Allow self-pacing',
      rationale: 'User benefits from controlling pace',
      expectedLoadReduction: 0.1
    })
  }
  
  return adjustments
}

// ============================================================================
// Apply Adjustments
// ============================================================================

/**
 * Apply adjustments to create new presentation configuration
 */
export function applyAdjustments(
  currentConfig: PresentationConfig,
  adjustments: PresentationAdjustment[]
): PresentationConfig {
  const newConfig = { ...currentConfig }
  
  for (const adjustment of adjustments) {
    switch (adjustment.type) {
      case 'scaffolding':
        if (adjustment.change.includes('light')) {
          newConfig.scaffoldingLevel = 'light'
        } else if (adjustment.change.includes('moderate')) {
          newConfig.scaffoldingLevel = 'moderate'
        } else if (adjustment.change.includes('heavy')) {
          newConfig.scaffoldingLevel = 'heavy'
        } else if (adjustment.change.includes('Reduce')) {
          // Fade scaffolding
          if (newConfig.scaffoldingLevel === 'heavy') {
            newConfig.scaffoldingLevel = 'moderate'
          } else if (newConfig.scaffoldingLevel === 'moderate') {
            newConfig.scaffoldingLevel = 'light'
          } else if (newConfig.scaffoldingLevel === 'light') {
            newConfig.scaffoldingLevel = 'none'
          }
        }
        if (adjustment.change.includes('worked example')) {
          newConfig.showWorkedSteps = true
        }
        break
      
      case 'chunking':
        if (adjustment.change.includes('fewer')) {
          newConfig.maxElementsPerView = Math.max(2, newConfig.maxElementsPerView - 2)
        } else if (adjustment.change.includes('more')) {
          newConfig.maxElementsPerView = Math.min(10, newConfig.maxElementsPerView + 2)
        }
        if (adjustment.change.includes('sequential')) {
          newConfig.chunkingStrategy = 'sequential'
        }
        break
      
      case 'modality':
        if (adjustment.change.includes('visual')) {
          newConfig.primaryModality = 'visual'
        } else if (adjustment.change.includes('verbal')) {
          newConfig.primaryModality = 'verbal'
        }
        if (adjustment.change.includes('redundant')) {
          newConfig.useRedundancy = false
        }
        break
      
      case 'formatting':
        if (adjustment.change.includes('Simplify')) {
          newConfig.simplifyNotation = true
        }
        if (adjustment.change.includes('Hide')) {
          newConfig.hideOptionalInfo = true
        }
        if (adjustment.change.includes('Highlight') || adjustment.change.includes('highlight')) {
          newConfig.highlightKeyInfo = !adjustment.change.includes('Remove')
        }
        if (adjustment.change.includes('whitespace')) {
          newConfig.useWhitespace = true
        }
        break
      
      case 'pacing':
        if (adjustment.change.includes('self-pacing')) {
          newConfig.selfPaced = true
        }
        break
    }
  }
  
  return newConfig
}

// ============================================================================
// Profile Updates
// ============================================================================

/**
 * Create a new cognitive profile
 */
export function createCognitiveProfile(userId: string): CognitiveProfile {
  return {
    userId,
    lastUpdated: new Date(),
    workingMemoryCapacity: 'average',
    estimatedElementLimit: 7,
    processingSpeed: 0.5,
    sustainedAttentionSpan: 10,
    preferredModality: 'visual',
    optimalLoadMin: 0.4,
    optimalLoadMax: 0.7,
    avgTimePerElement: 5000,
    avgErrorsAtHighLoad: 0.3,
    recoveryTimeAfterOverload: 30,
    calibrationAccuracy: 0.5,
    observationCount: 0
  }
}

/**
 * Update cognitive profile based on observations
 */
export function updateCognitiveProfile(
  profile: CognitiveProfile,
  observation: {
    loadEstimate: CognitiveLoadEstimate
    responseTimeMs: number
    correct: boolean
    complexity?: ProblemComplexity
  }
): CognitiveProfile {
  const updated = { ...profile }
  updated.lastUpdated = new Date()
  updated.observationCount += 1
  
  const learningRate = 0.1
  
  // Update processing speed estimate
  if (observation.complexity) {
    const expectedTime = observation.complexity.elementCount * profile.avgTimePerElement
    const actualRatio = observation.responseTimeMs / expectedTime
    
    // If faster than expected, increase processing speed estimate
    updated.processingSpeed = profile.processingSpeed * (1 - learningRate) + 
                              (1 / actualRatio) * learningRate
    updated.processingSpeed = Math.max(0.2, Math.min(1, updated.processingSpeed))
  }
  
  // Update error rate at high load
  if (observation.loadEstimate.totalLoad > 0.7) {
    const errorRate = observation.correct ? 0 : 1
    updated.avgErrorsAtHighLoad = profile.avgErrorsAtHighLoad * (1 - learningRate) +
                                   errorRate * learningRate
  }
  
  // Update optimal load zone based on performance
  if (observation.correct && observation.loadEstimate.totalLoad > profile.optimalLoadMax) {
    // They succeeded at higher load - expand zone
    updated.optimalLoadMax = Math.min(0.85, profile.optimalLoadMax + 0.02)
  } else if (!observation.correct && observation.loadEstimate.totalLoad < profile.optimalLoadMax) {
    // They failed at load within zone - contract zone
    updated.optimalLoadMax = Math.max(0.5, profile.optimalLoadMax - 0.01)
  }
  
  // Update working memory capacity estimate
  if (observation.complexity && observation.correct) {
    const elements = observation.complexity.interactingElementCount
    if (elements > profile.estimatedElementLimit) {
      // They handled more than estimated
      updated.estimatedElementLimit = Math.ceil(
        profile.estimatedElementLimit * 0.9 + elements * 0.1
      )
      if (updated.estimatedElementLimit > 9) {
        updated.workingMemoryCapacity = 'high'
      }
    }
  }
  
  // Update calibration accuracy
  const predicted = observation.loadEstimate.totalLoad > profile.optimalLoadMax
  const actual = !observation.correct
  const calibrationCorrect = predicted === actual ? 1 : 0
  
  updated.calibrationAccuracy = profile.calibrationAccuracy * (1 - learningRate) +
                                 calibrationCorrect * learningRate
  
  return updated
}
