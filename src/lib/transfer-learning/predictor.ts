/**
 * Transfer Learning Predictor
 *
 * Predicts transfer potential and generates recommendations
 * for leveraging existing knowledge.
 */

import {
  TransferPrediction,
  TransferRecommendation,
  UserTransferProfile,
  ConceptMastery,
  TransferEvent,
  TransferConfig,
  DEFAULT_TRANSFER_CONFIG,
} from './types'
import {
  buildTransferGraph,
  LEARNING_CONCEPTS,
  TRANSFER_RELATIONS,
  BRIDGING_ACTIVITIES,
  getRelatedConcepts,
  getDirectTransfers,
  getBridgingActivity,
} from './transfer-graph'

// ============================================================================
// Transfer Prediction
// ============================================================================

/**
 * Predict transfer potential from source to target concept
 */
export function predictTransfer(
  sourceConceptId: string,
  targetConceptId: string,
  userProfile?: UserTransferProfile,
  config: TransferConfig = DEFAULT_TRANSFER_CONFIG
): TransferPrediction | null {
  // Find direct or indirect relation
  const directRelation = TRANSFER_RELATIONS.find(
    (r) =>
      (r.sourceConceptId === sourceConceptId &&
        r.targetConceptId === targetConceptId) ||
      (r.direction === 'bidirectional' &&
        r.targetConceptId === sourceConceptId &&
        r.sourceConceptId === targetConceptId)
  )

  if (!directRelation) {
    // Check for indirect path
    const graph = buildTransferGraph()
    const path = graph.shortestPaths.get(sourceConceptId)?.get(targetConceptId)

    if (!path || path.length > 3) {
      return null // No reasonable transfer path
    }

    // Calculate cumulative transfer through path
    return predictIndirectTransfer(path, userProfile, config)
  }

  // Direct transfer prediction
  let baseStrength = directRelation.transferStrength
  const reasoning: string[] = []

  // Adjust for transfer type
  if (directRelation.transferType.includes('near')) {
    baseStrength += config.nearTransferBonus
    reasoning.push('Near transfer (same domain) increases likelihood')
  } else if (directRelation.transferType.includes('far')) {
    baseStrength -= config.farTransferPenalty * 0.5 // Partial penalty
    reasoning.push('Far transfer requires more explicit bridging')
  }

  // Adjust for user profile
  let userAdjustment = 0
  if (userProfile) {
    const sourceMastery = userProfile.conceptMastery.get(sourceConceptId)

    if (sourceMastery) {
      // Higher mastery = more transferable
      if (sourceMastery.masteryLevel >= config.minMasteryForTransfer) {
        userAdjustment += 0.1
        reasoning.push(
          `Strong mastery (${Math.round(sourceMastery.masteryLevel * 100)}%) of source concept`
        )
      } else {
        userAdjustment -= 0.2
        reasoning.push(
          'Insufficient mastery of source concept may limit transfer'
        )
      }

      // Consider transfer readiness
      if (sourceMastery.transferReadiness > 0.7) {
        userAdjustment += 0.05
        reasoning.push('High transfer readiness from varied practice')
      }
    }

    // Consider user's general transfer abilities
    if (directRelation.transferType.includes('far')) {
      userAdjustment += userProfile.transferTendencies.farTransferAbility * 0.1
      reasoning.push(
        `User's far transfer ability: ${Math.round(userProfile.transferTendencies.farTransferAbility * 100)}%`
      )
    } else {
      userAdjustment +=
        userProfile.transferTendencies.nearTransferAbility * 0.05
    }

    if (directRelation.transferType === 'analogical') {
      userAdjustment += userProfile.transferTendencies.analogicalThinking * 0.1
      reasoning.push('Analogical thinking ability affects transfer')
    }

    // Check historical transfer success
    const historyMatch = userProfile.strongTransferPaths.find(
      (p) => p.from === sourceConceptId && p.to === targetConceptId
    )
    if (historyMatch) {
      userAdjustment += 0.15
      reasoning.push('Previous successful transfer on this path')
    }

    const weakPath = userProfile.weakTransferPaths.find(
      (p) => p.from === sourceConceptId && p.to === targetConceptId
    )
    if (weakPath) {
      userAdjustment -= 0.1
      reasoning.push(`Known difficulty: ${weakPath.blockers.join(', ')}`)
    }
  }

  // Calculate final probability
  const transferProbability = Math.max(
    0,
    Math.min(1, baseStrength + userAdjustment)
  )

  // Get bridging activities
  const bridgingActivity = getBridgingActivity(sourceConceptId, targetConceptId)

  // Calculate confidence
  const confidence = calculateConfidence(directRelation, userProfile)

  return {
    sourceConceptId,
    targetConceptId,
    transferProbability,
    transferStrength: directRelation.transferStrength,
    transferType: directRelation.transferType,
    confidence,
    reasoning,
    suggestedBridgingActivities: bridgingActivity ? [bridgingActivity] : [],
  }
}

/**
 * Predict transfer through an indirect path
 */
function predictIndirectTransfer(
  path: string[],
  userProfile?: UserTransferProfile,
  config: TransferConfig = DEFAULT_TRANSFER_CONFIG
): TransferPrediction {
  let cumulativeStrength = 1.0
  const reasoning: string[] = []

  // Multiply transfer strengths along path
  for (let i = 0; i < path.length - 1; i++) {
    const fromId = path[i]
    const toId = path[i + 1]

    const relation = TRANSFER_RELATIONS.find(
      (r) =>
        (r.sourceConceptId === fromId && r.targetConceptId === toId) ||
        (r.direction === 'bidirectional' &&
          r.targetConceptId === fromId &&
          r.sourceConceptId === toId)
    )

    if (relation) {
      cumulativeStrength *= relation.transferStrength
    } else {
      // Implied weak connection through prerequisites
      cumulativeStrength *= 0.5
    }
  }

  reasoning.push(`Transfer path: ${path.join(' → ')}`)
  reasoning.push(`Path length: ${path.length - 1} hops`)
  reasoning.push('Indirect transfer is typically weaker than direct')

  // Decay for path length
  const pathDecay = Math.pow(1 - config.transferDecayRate, path.length - 2)
  const finalStrength = cumulativeStrength * pathDecay

  return {
    sourceConceptId: path[0],
    targetConceptId: path[path.length - 1],
    transferProbability: finalStrength,
    transferStrength: finalStrength,
    transferType: 'far_positive', // Indirect is typically far transfer
    confidence: 0.5, // Lower confidence for indirect paths
    reasoning,
    suggestedBridgingActivities: [],
  }
}

function calculateConfidence(
  relation: (typeof TRANSFER_RELATIONS)[0],
  userProfile?: UserTransferProfile
): number {
  let confidence = relation.evidence.empiricalSupport

  if (userProfile) {
    // More observations = higher confidence
    const relevantHistory = userProfile.transferHistory.filter(
      (e) =>
        e.sourceConceptId === relation.sourceConceptId &&
        e.targetConceptId === relation.targetConceptId
    )

    if (relevantHistory.length > 0) {
      confidence += 0.1 * Math.min(1, relevantHistory.length / 5)
    }
  }

  return Math.min(0.95, confidence)
}

// ============================================================================
// Transfer Recommendations
// ============================================================================

/**
 * Get transfer-based learning recommendations
 */
export function getTransferRecommendations(
  userProfile: UserTransferProfile,
  config: TransferConfig = DEFAULT_TRANSFER_CONFIG
): TransferRecommendation[] {
  const recommendations: TransferRecommendation[] = []
  const graph = buildTransferGraph()

  // 1. Find opportunities to leverage mastered concepts
  for (const [conceptId, mastery] of userProfile.conceptMastery) {
    if (mastery.masteryLevel >= config.minMasteryForTransfer) {
      const concept = graph.concepts.get(conceptId)
      if (!concept) continue

      const transfers = getDirectTransfers(graph, conceptId)

      for (const transfer of transfers) {
        const targetId =
          transfer.sourceConceptId === conceptId
            ? transfer.targetConceptId
            : transfer.sourceConceptId

        const targetMastery = userProfile.conceptMastery.get(targetId)
        const targetConcept = graph.concepts.get(targetId)

        if (!targetConcept) continue

        // Recommend if target is not yet mastered
        if (!targetMastery || targetMastery.masteryLevel < 0.6) {
          const bridging = getBridgingActivity(conceptId, targetId)

          recommendations.push({
            type: 'leverage_mastery',
            priority: transfer.transferStrength > 0.7 ? 'high' : 'medium',
            title: `Use ${concept.name} to learn ${targetConcept.name}`,
            description: `Your strong ${concept.name} skills can help you learn ${targetConcept.name} (${Math.round(transfer.transferStrength * 100)}% transfer)`,
            sourceConcept: concept,
            targetConcept,
            expectedImpact: transfer.transferStrength,
            suggestedActivities: bridging ? [bridging] : [],
          })
        }
      }
    }
  }

  // 2. Identify potential interference
  for (const relation of TRANSFER_RELATIONS) {
    if (
      relation.transferType === 'near_negative' ||
      relation.transferType === 'far_negative'
    ) {
      const sourceMastery = userProfile.conceptMastery.get(
        relation.sourceConceptId
      )
      const targetMastery = userProfile.conceptMastery.get(
        relation.targetConceptId
      )

      if (sourceMastery && targetMastery) {
        // Both concepts being learned - warn about interference
        const sourceConcept = graph.concepts.get(relation.sourceConceptId)
        const targetConcept = graph.concepts.get(relation.targetConceptId)

        if (sourceConcept && targetConcept) {
          recommendations.push({
            type: 'avoid_interference',
            priority: 'medium',
            title: `Watch for confusion between ${sourceConcept.name} and ${targetConcept.name}`,
            description:
              'These concepts may interfere with each other during learning',
            sourceConcept,
            targetConcept,
            expectedImpact: -relation.transferStrength,
            suggestedActivities: [],
          })
        }
      }
    }
  }

  // 3. Identify foundation gaps
  for (const concept of LEARNING_CONCEPTS) {
    const mastery = userProfile.conceptMastery.get(concept.id)

    // If struggling with a concept, check prerequisites
    if (mastery && mastery.masteryLevel < 0.4 && mastery.totalAttempts > 5) {
      for (const prereqId of concept.prerequisites) {
        const prereqMastery = userProfile.conceptMastery.get(prereqId)
        const prereqConcept = graph.concepts.get(prereqId)

        if (
          prereqConcept &&
          (!prereqMastery || prereqMastery.masteryLevel < 0.7)
        ) {
          recommendations.push({
            type: 'strengthen_foundation',
            priority: 'high',
            title: `Strengthen ${prereqConcept.name} to improve ${concept.name}`,
            description: `${concept.name} builds on ${prereqConcept.name} - strengthening the foundation may help`,
            sourceConcept: prereqConcept,
            targetConcept: concept,
            expectedImpact: 0.3,
            suggestedActivities: [],
          })
        }
      }
    }
  }

  // Sort by priority and expected impact
  recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff
    return Math.abs(b.expectedImpact) - Math.abs(a.expectedImpact)
  })

  return recommendations.slice(0, 10) // Top 10 recommendations
}

// ============================================================================
// Profile Updates
// ============================================================================

/**
 * Record a transfer event in the user's profile
 */
export function recordTransferEvent(
  profile: UserTransferProfile,
  event: TransferEvent
): UserTransferProfile {
  const updated = { ...profile }

  // Add to history
  updated.transferHistory = [...profile.transferHistory, event]

  // Update transfer paths based on event
  if (event.successful) {
    // Add to or update strong paths
    const existingStrong = updated.strongTransferPaths.find(
      (p) => p.from === event.sourceConceptId && p.to === event.targetConceptId
    )

    if (existingStrong) {
      existingStrong.observedStrength =
        (existingStrong.observedStrength + 1) / 2 // Running average
    } else {
      updated.strongTransferPaths = [
        ...updated.strongTransferPaths,
        {
          from: event.sourceConceptId,
          to: event.targetConceptId,
          observedStrength: 1,
        },
      ]
    }

    // Update transfer tendencies
    const relation = TRANSFER_RELATIONS.find(
      (r) =>
        r.sourceConceptId === event.sourceConceptId &&
        r.targetConceptId === event.targetConceptId
    )

    if (relation) {
      if (relation.transferType.includes('far')) {
        updated.transferTendencies.farTransferAbility = Math.min(
          1,
          updated.transferTendencies.farTransferAbility + 0.02
        )
      } else {
        updated.transferTendencies.nearTransferAbility = Math.min(
          1,
          updated.transferTendencies.nearTransferAbility + 0.01
        )
      }

      if (relation.transferType === 'analogical') {
        updated.transferTendencies.analogicalThinking = Math.min(
          1,
          updated.transferTendencies.analogicalThinking + 0.02
        )
      }
    }
  } else {
    // Add to weak paths
    const existingWeak = updated.weakTransferPaths.find(
      (p) => p.from === event.sourceConceptId && p.to === event.targetConceptId
    )

    if (existingWeak) {
      existingWeak.observedStrength = Math.max(
        0,
        existingWeak.observedStrength - 0.1
      )
      if (event.notes) {
        existingWeak.blockers = [
          ...new Set([...existingWeak.blockers, event.notes]),
        ]
      }
    } else {
      updated.weakTransferPaths = [
        ...updated.weakTransferPaths,
        {
          from: event.sourceConceptId,
          to: event.targetConceptId,
          observedStrength: 0.3,
          blockers: event.notes ? [event.notes] : [],
        },
      ]
    }
  }

  updated.lastUpdated = new Date()

  return updated
}

/**
 * Update concept mastery in profile
 */
export function updateConceptMastery(
  profile: UserTransferProfile,
  conceptId: string,
  correct: boolean,
  isTransferApplication: boolean
): UserTransferProfile {
  const updated = { ...profile }

  let mastery = updated.conceptMastery.get(conceptId)

  if (!mastery) {
    mastery = {
      conceptId,
      masteryLevel: 0.5,
      lastPracticed: new Date(),
      totalAttempts: 0,
      recentAccuracy: 0.5,
      transferReadiness: 0.3,
    }
  }

  mastery.totalAttempts += 1
  mastery.lastPracticed = new Date()

  // Update mastery level
  const learningRate = 0.1
  if (correct) {
    mastery.masteryLevel = Math.min(
      1,
      mastery.masteryLevel + learningRate * (1 - mastery.masteryLevel)
    )
    mastery.recentAccuracy = Math.min(1, mastery.recentAccuracy + 0.1)
  } else {
    mastery.masteryLevel = Math.max(
      0,
      mastery.masteryLevel - learningRate * 0.5
    )
    mastery.recentAccuracy = Math.max(0, mastery.recentAccuracy - 0.1)
  }

  // Transfer applications boost transfer readiness
  if (isTransferApplication && correct) {
    mastery.transferReadiness = Math.min(1, mastery.transferReadiness + 0.1)
  }

  updated.conceptMastery.set(conceptId, mastery)
  updated.lastUpdated = new Date()

  return updated
}

/**
 * Create a new transfer profile for a user
 */
export function createTransferProfile(userId: string): UserTransferProfile {
  return {
    userId,
    lastUpdated: new Date(),
    conceptMastery: new Map(),
    transferHistory: [],
    transferTendencies: {
      nearTransferAbility: 0.5,
      farTransferAbility: 0.3,
      analogicalThinking: 0.4,
      abstractionCapacity: 0.4,
    },
    strongTransferPaths: [],
    weakTransferPaths: [],
  }
}
