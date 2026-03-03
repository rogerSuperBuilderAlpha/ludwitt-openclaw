/**
 * Struggle Predictor
 * 
 * Predicts the probability of a student struggling/failing
 * based on extracted features.
 */

import {
  StruggleFeatures,
  StrugglePrediction,
  StruggleLevel,
  StruggleSignal,
  StruggleSignalType,
  STRUGGLE_CONFIG
} from './types'
import { getSignificantSignals } from './feature-extractor'

// ============================================================================
// Main Prediction Function
// ============================================================================

/**
 * Predict struggle level from features using rule-based model
 */
export function predictStruggle(features: StruggleFeatures): StrugglePrediction {
  // Get significant signals
  const significantSignals = getSignificantSignals(features)
  
  // Convert to StruggleSignal format
  const signals: StruggleSignal[] = significantSignals.map(s => ({
    type: s.signal as StruggleSignalType,
    strength: s.strength,
    description: s.description
  }))
  
  // Calculate weighted struggle score
  let score = 0
  const weights = STRUGGLE_CONFIG.DEFAULT_WEIGHTS
  
  for (const signal of signals) {
    const weight = weights[signal.type] || 0.1
    score += signal.strength * weight
  }
  
  // Normalize to 0-1
  const probability = Math.min(1, Math.max(0, score))
  
  // Determine struggle level
  const level = determineStruggleLevel(probability)
  
  // Calculate confidence based on signal consistency
  const confidence = calculateConfidence(signals, features)
  
  // Get suggested intervention
  const suggestedIntervention = selectIntervention(level, signals, features)
  
  // Determine urgency
  const urgency = determineUrgency(level, signals)
  
  return {
    level,
    probability,
    confidence,
    signals,
    suggestedIntervention,
    interventionUrgency: urgency
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function determineStruggleLevel(probability: number): StruggleLevel {
  if (probability < 0.2) return 'none'
  if (probability < 0.4) return 'mild'
  if (probability < 0.6) return 'moderate'
  if (probability < 0.8) return 'severe'
  return 'critical'
}

function calculateConfidence(
  signals: StruggleSignal[],
  features: StruggleFeatures
): number {
  // Base confidence
  let confidence = 0.6
  
  // Higher confidence with more time elapsed
  if (features.timeElapsedMs > 60000) {
    confidence += 0.1
  }
  if (features.timeElapsedMs > 120000) {
    confidence += 0.1
  }
  
  // Higher confidence with more consistent signals
  if (signals.length >= 3) {
    confidence += 0.1
  }
  
  // Higher confidence if signals are strong and consistent
  const avgStrength = signals.length > 0
    ? signals.reduce((sum, s) => sum + s.strength, 0) / signals.length
    : 0
  
  if (avgStrength > 0.7) {
    confidence += 0.1
  }
  
  return Math.min(0.95, confidence)
}

function selectIntervention(
  level: StruggleLevel,
  signals: StruggleSignal[],
  features: StruggleFeatures
): StrugglePrediction['suggestedIntervention'] {
  // No struggle = no intervention
  if (level === 'none') {
    return 'none'
  }
  
  // Get dominant signal types
  const dominantSignals = signals.filter(s => s.strength > 0.5).map(s => s.type)
  
  // Mild struggle: encouragement
  if (level === 'mild') {
    return 'encouragement'
  }
  
  // Moderate struggle: context-dependent
  if (level === 'moderate') {
    // If they're revising a lot, scaffold
    if (dominantSignals.includes('excessive_revisions') || 
        dominantSignals.includes('high_deletion_ratio')) {
      return 'scaffolded_steps'
    }
    
    // If taking too long, gentle hint
    if (dominantSignals.includes('time_exceeded')) {
      return 'gentle_hint'
    }
    
    // If low activity, prompt engagement
    if (dominantSignals.includes('low_activity') || 
        dominantSignals.includes('no_progress')) {
      return 'gentle_hint'
    }
    
    return 'gentle_hint'
  }
  
  // Severe struggle
  if (level === 'severe') {
    // If skill gap, offer concept review
    if (dominantSignals.includes('skill_gap')) {
      return 'concept_review'
    }
    
    // If hint dependent, give specific hint
    if (dominantSignals.includes('hint_dependency')) {
      return 'specific_hint'
    }
    
    // Otherwise, scaffold
    return 'scaffolded_steps'
  }
  
  // Critical struggle
  if (level === 'critical') {
    // If they've been struggling long, offer easier problem
    if (features.timeElapsedMs > 180000) { // 3 minutes
      return 'easier_problem'
    }
    
    // If recent failures, worked example
    if (dominantSignals.includes('recent_failures')) {
      return 'worked_example'
    }
    
    // Suggest break if very long session
    if (features.timeElapsedMs > 300000) { // 5 minutes
      return 'break_suggestion'
    }
    
    return 'worked_example'
  }
  
  return 'gentle_hint'
}

function determineUrgency(
  level: StruggleLevel,
  signals: StruggleSignal[]
): 'low' | 'medium' | 'high' | 'immediate' {
  // Critical = immediate
  if (level === 'critical') {
    return 'immediate'
  }
  
  // Severe with strong signals = high
  if (level === 'severe') {
    const hasStrongSignal = signals.some(s => s.strength > 0.8)
    return hasStrongSignal ? 'high' : 'medium'
  }
  
  // Moderate = medium
  if (level === 'moderate') {
    return 'medium'
  }
  
  // Mild or none = low
  return 'low'
}

// ============================================================================
// Thresholding Functions
// ============================================================================

/**
 * Check if prediction warrants intervention
 */
export function shouldIntervene(
  prediction: StrugglePrediction,
  threshold: number = 0.7
): boolean {
  return prediction.probability >= threshold && prediction.level !== 'none'
}

/**
 * Get intervention delay based on urgency
 */
export function getInterventionDelay(urgency: StrugglePrediction['interventionUrgency']): number {
  switch (urgency) {
    case 'immediate': return 0
    case 'high': return 5000 // 5 seconds
    case 'medium': return 15000 // 15 seconds
    case 'low': return 30000 // 30 seconds
  }
}

/**
 * Format prediction for logging/display
 */
export function formatPrediction(prediction: StrugglePrediction): string {
  const signals = prediction.signals
    .filter(s => s.strength > 0.3)
    .map(s => `${s.type}(${(s.strength * 100).toFixed(0)}%)`)
    .join(', ')
  
  return [
    `Level: ${prediction.level}`,
    `Probability: ${(prediction.probability * 100).toFixed(1)}%`,
    `Confidence: ${(prediction.confidence * 100).toFixed(1)}%`,
    `Signals: ${signals || 'none'}`,
    `Suggested: ${prediction.suggestedIntervention}`,
    `Urgency: ${prediction.interventionUrgency}`
  ].join(' | ')
}
