/**
 * Transfer Graph
 * 
 * Defines the relationships between concepts and how learning
 * transfers between them.
 */

import {
  LearningConcept,
  TransferRelation,
  TransferGraph,
  TransferType,
  ConceptCluster,
  BridgingActivity
} from './types'

// ============================================================================
// Core Concept Definitions
// ============================================================================

export const LEARNING_CONCEPTS: LearningConcept[] = [
  // ===== MATH CONCEPTS =====
  // Arithmetic
  {
    id: 'math_addition',
    name: 'Addition',
    subject: 'math',
    category: 'arithmetic',
    difficulty: 1,
    prerequisites: [],
    abstractionLevel: 'concrete',
    cognitiveType: 'procedural'
  },
  {
    id: 'math_subtraction',
    name: 'Subtraction',
    subject: 'math',
    category: 'arithmetic',
    difficulty: 1,
    prerequisites: ['math_addition'],
    abstractionLevel: 'concrete',
    cognitiveType: 'procedural'
  },
  {
    id: 'math_multiplication',
    name: 'Multiplication',
    subject: 'math',
    category: 'arithmetic',
    difficulty: 2,
    prerequisites: ['math_addition'],
    abstractionLevel: 'procedural',
    cognitiveType: 'procedural'
  },
  {
    id: 'math_division',
    name: 'Division',
    subject: 'math',
    category: 'arithmetic',
    difficulty: 2,
    prerequisites: ['math_subtraction', 'math_multiplication'],
    abstractionLevel: 'procedural',
    cognitiveType: 'procedural'
  },
  {
    id: 'math_fractions',
    name: 'Fractions',
    subject: 'math',
    category: 'arithmetic',
    difficulty: 3,
    prerequisites: ['math_division'],
    abstractionLevel: 'abstract',
    cognitiveType: 'declarative'
  },
  {
    id: 'math_percentages',
    name: 'Percentages',
    subject: 'math',
    category: 'arithmetic',
    difficulty: 3,
    prerequisites: ['math_fractions', 'math_multiplication'],
    abstractionLevel: 'abstract',
    cognitiveType: 'procedural'
  },
  
  // Algebra
  {
    id: 'math_variables',
    name: 'Variables & Expressions',
    subject: 'math',
    category: 'algebra',
    difficulty: 4,
    prerequisites: ['math_addition', 'math_subtraction', 'math_multiplication'],
    abstractionLevel: 'abstract',
    cognitiveType: 'declarative'
  },
  {
    id: 'math_equations',
    name: 'Solving Equations',
    subject: 'math',
    category: 'algebra',
    difficulty: 5,
    prerequisites: ['math_variables'],
    abstractionLevel: 'abstract',
    cognitiveType: 'procedural'
  },
  {
    id: 'math_patterns',
    name: 'Pattern Recognition',
    subject: 'math',
    category: 'algebra',
    difficulty: 4,
    prerequisites: ['math_multiplication'],
    abstractionLevel: 'abstract',
    cognitiveType: 'conditional'
  },
  
  // ===== READING CONCEPTS =====
  {
    id: 'reading_decoding',
    name: 'Word Decoding',
    subject: 'reading',
    category: 'foundational',
    difficulty: 1,
    prerequisites: [],
    abstractionLevel: 'procedural',
    cognitiveType: 'procedural'
  },
  {
    id: 'reading_vocabulary',
    name: 'Vocabulary',
    subject: 'reading',
    category: 'foundational',
    difficulty: 2,
    prerequisites: ['reading_decoding'],
    abstractionLevel: 'concrete',
    cognitiveType: 'declarative'
  },
  {
    id: 'reading_main_idea',
    name: 'Main Idea Identification',
    subject: 'reading',
    category: 'comprehension',
    difficulty: 3,
    prerequisites: ['reading_vocabulary'],
    abstractionLevel: 'abstract',
    cognitiveType: 'conditional'
  },
  {
    id: 'reading_inference',
    name: 'Making Inferences',
    subject: 'reading',
    category: 'comprehension',
    difficulty: 4,
    prerequisites: ['reading_main_idea'],
    abstractionLevel: 'abstract',
    cognitiveType: 'conditional'
  },
  {
    id: 'reading_analysis',
    name: 'Critical Analysis',
    subject: 'reading',
    category: 'analysis',
    difficulty: 5,
    prerequisites: ['reading_inference'],
    abstractionLevel: 'abstract',
    cognitiveType: 'conditional'
  },
  
  // ===== LATIN CONCEPTS =====
  {
    id: 'latin_alphabet',
    name: 'Latin Alphabet & Pronunciation',
    subject: 'latin',
    category: 'foundational',
    difficulty: 1,
    prerequisites: [],
    abstractionLevel: 'concrete',
    cognitiveType: 'declarative'
  },
  {
    id: 'latin_noun_declensions',
    name: 'Noun Declensions',
    subject: 'latin',
    category: 'morphology',
    difficulty: 3,
    prerequisites: ['latin_alphabet'],
    abstractionLevel: 'procedural',
    cognitiveType: 'declarative'
  },
  {
    id: 'latin_verb_conjugations',
    name: 'Verb Conjugations',
    subject: 'latin',
    category: 'morphology',
    difficulty: 3,
    prerequisites: ['latin_alphabet'],
    abstractionLevel: 'procedural',
    cognitiveType: 'procedural'
  },
  {
    id: 'latin_sentence_structure',
    name: 'Sentence Structure',
    subject: 'latin',
    category: 'syntax',
    difficulty: 4,
    prerequisites: ['latin_noun_declensions', 'latin_verb_conjugations'],
    abstractionLevel: 'abstract',
    cognitiveType: 'conditional'
  },
  
  // ===== GREEK CONCEPTS =====
  {
    id: 'greek_alphabet',
    name: 'Greek Alphabet',
    subject: 'greek',
    category: 'foundational',
    difficulty: 2,
    prerequisites: [],
    abstractionLevel: 'concrete',
    cognitiveType: 'declarative'
  },
  {
    id: 'greek_noun_declensions',
    name: 'Greek Noun Declensions',
    subject: 'greek',
    category: 'morphology',
    difficulty: 4,
    prerequisites: ['greek_alphabet'],
    abstractionLevel: 'procedural',
    cognitiveType: 'declarative'
  },
  {
    id: 'greek_verb_system',
    name: 'Greek Verb System',
    subject: 'greek',
    category: 'morphology',
    difficulty: 5,
    prerequisites: ['greek_alphabet'],
    abstractionLevel: 'procedural',
    cognitiveType: 'procedural'
  },
  
  // ===== LOGIC CONCEPTS =====
  {
    id: 'logic_propositions',
    name: 'Propositions & Truth Values',
    subject: 'logic',
    category: 'foundational',
    difficulty: 3,
    prerequisites: [],
    abstractionLevel: 'abstract',
    cognitiveType: 'declarative'
  },
  {
    id: 'logic_connectives',
    name: 'Logical Connectives',
    subject: 'logic',
    category: 'foundational',
    difficulty: 3,
    prerequisites: ['logic_propositions'],
    abstractionLevel: 'abstract',
    cognitiveType: 'declarative'
  },
  {
    id: 'logic_deduction',
    name: 'Deductive Reasoning',
    subject: 'logic',
    category: 'reasoning',
    difficulty: 4,
    prerequisites: ['logic_connectives'],
    abstractionLevel: 'abstract',
    cognitiveType: 'procedural'
  },
  {
    id: 'logic_fallacies',
    name: 'Logical Fallacies',
    subject: 'logic',
    category: 'analysis',
    difficulty: 5,
    prerequisites: ['logic_deduction'],
    abstractionLevel: 'abstract',
    cognitiveType: 'conditional'
  }
]

// ============================================================================
// Transfer Relations
// ============================================================================

export const TRANSFER_RELATIONS: TransferRelation[] = [
  // ===== WITHIN MATH =====
  {
    sourceConceptId: 'math_addition',
    targetConceptId: 'math_subtraction',
    transferType: 'near_positive',
    transferStrength: 0.8,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Inverse operations with shared mental models',
      empiricalSupport: 0.9
    }
  },
  {
    sourceConceptId: 'math_multiplication',
    targetConceptId: 'math_division',
    transferType: 'near_positive',
    transferStrength: 0.75,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Inverse operations, requires understanding of groups',
      empiricalSupport: 0.85
    }
  },
  {
    sourceConceptId: 'math_fractions',
    targetConceptId: 'math_percentages',
    transferType: 'near_positive',
    transferStrength: 0.7,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Both represent parts of a whole',
      empiricalSupport: 0.8
    }
  },
  {
    sourceConceptId: 'math_variables',
    targetConceptId: 'math_equations',
    transferType: 'vertical',
    transferStrength: 0.85,
    direction: 'unidirectional',
    evidence: {
      theoretical: 'Variables are prerequisite for equation solving',
      empiricalSupport: 0.9
    }
  },
  
  // ===== CROSS-DOMAIN: MATH → LOGIC =====
  {
    sourceConceptId: 'math_patterns',
    targetConceptId: 'logic_deduction',
    transferType: 'far_positive',
    transferStrength: 0.5,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Both require systematic rule application',
      empiricalSupport: 0.6
    }
  },
  {
    sourceConceptId: 'math_equations',
    targetConceptId: 'logic_connectives',
    transferType: 'analogical',
    transferStrength: 0.4,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Algebraic manipulation ↔ logical operations',
      empiricalSupport: 0.5
    }
  },
  
  // ===== CROSS-DOMAIN: LATIN → GREEK =====
  {
    sourceConceptId: 'latin_noun_declensions',
    targetConceptId: 'greek_noun_declensions',
    transferType: 'far_positive',
    transferStrength: 0.6,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Similar case systems, shared Indo-European heritage',
      empiricalSupport: 0.7
    }
  },
  {
    sourceConceptId: 'latin_verb_conjugations',
    targetConceptId: 'greek_verb_system',
    transferType: 'far_positive',
    transferStrength: 0.5,
    direction: 'unidirectional',
    evidence: {
      theoretical: 'Latin conjugation patterns help with Greek complexity',
      empiricalSupport: 0.6
    }
  },
  
  // ===== CROSS-DOMAIN: READING → LOGIC =====
  {
    sourceConceptId: 'reading_inference',
    targetConceptId: 'logic_deduction',
    transferType: 'far_positive',
    transferStrength: 0.55,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Both require drawing conclusions from premises',
      empiricalSupport: 0.65
    }
  },
  {
    sourceConceptId: 'reading_analysis',
    targetConceptId: 'logic_fallacies',
    transferType: 'far_positive',
    transferStrength: 0.6,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Critical analysis in text applies to argument analysis',
      empiricalSupport: 0.7
    }
  },
  
  // ===== CROSS-DOMAIN: READING → LATIN/GREEK =====
  {
    sourceConceptId: 'reading_vocabulary',
    targetConceptId: 'latin_alphabet',
    transferType: 'lateral',
    transferStrength: 0.3,
    direction: 'unidirectional',
    evidence: {
      theoretical: 'English vocabulary has Latin roots',
      empiricalSupport: 0.5
    }
  },
  {
    sourceConceptId: 'reading_main_idea',
    targetConceptId: 'latin_sentence_structure',
    transferType: 'far_positive',
    transferStrength: 0.35,
    direction: 'bidirectional',
    evidence: {
      theoretical: 'Comprehension strategies transfer to translation',
      empiricalSupport: 0.4
    }
  }
]

// ============================================================================
// Bridging Activities
// ============================================================================

export const BRIDGING_ACTIVITIES: BridgingActivity[] = [
  {
    id: 'bridge_frac_percent',
    name: 'Fractions and Percentages Connection',
    description: 'Practice converting between fractions and percentages to see they represent the same concepts',
    type: 'comparison',
    estimatedMinutes: 10,
    bridgesConcepts: ['math_fractions', 'math_percentages'],
    prompts: [
      'How would you write 50% as a fraction?',
      'What percentage is 3/4?',
      'Why do you think percentages are useful if fractions already exist?'
    ]
  },
  {
    id: 'bridge_pattern_logic',
    name: 'From Patterns to Proofs',
    description: 'Use pattern recognition skills to understand logical deduction',
    type: 'analogy',
    estimatedMinutes: 15,
    bridgesConcepts: ['math_patterns', 'logic_deduction'],
    prompts: [
      'When you find a pattern in numbers, how do you know it will continue?',
      'How is proving a pattern continues like proving an argument is valid?',
      'What makes a pattern "certain" vs "probable"?'
    ]
  },
  {
    id: 'bridge_latin_greek_nouns',
    name: 'Case Systems Comparison',
    description: 'Compare Latin and Greek noun cases to leverage existing knowledge',
    type: 'comparison',
    estimatedMinutes: 20,
    bridgesConcepts: ['latin_noun_declensions', 'greek_noun_declensions'],
    prompts: [
      'What cases exist in Latin? Which of these appear in Greek?',
      'How are the nominative endings similar or different?',
      'What patterns from Latin help you predict Greek forms?'
    ]
  },
  {
    id: 'bridge_inference_deduction',
    name: 'Reading Between Lines to Logical Reasoning',
    description: 'Connect reading comprehension inferences to logical deduction',
    type: 'abstraction',
    estimatedMinutes: 15,
    bridgesConcepts: ['reading_inference', 'logic_deduction'],
    prompts: [
      'When you infer something from a story, what clues do you use?',
      'How is a detective solving a mystery like proving a logical argument?',
      'What makes an inference "strong" vs "weak"?'
    ]
  },
  {
    id: 'bridge_analysis_fallacies',
    name: 'Critical Reading to Argument Analysis',
    description: 'Apply critical reading skills to identify logical fallacies',
    type: 'practice',
    estimatedMinutes: 20,
    bridgesConcepts: ['reading_analysis', 'logic_fallacies'],
    prompts: [
      'When you read an opinion piece, how do you evaluate the arguments?',
      'What makes an argument in a text "convincing" vs "misleading"?',
      'How do authors sometimes use weak reasoning to persuade readers?'
    ]
  }
]

// ============================================================================
// Graph Construction
// ============================================================================

/**
 * Build the complete transfer graph
 */
export function buildTransferGraph(): TransferGraph {
  const concepts = new Map<string, LearningConcept>()
  
  for (const concept of LEARNING_CONCEPTS) {
    concepts.set(concept.id, concept)
  }
  
  // Compute shortest paths between all concepts
  const shortestPaths = computeShortestPaths(concepts, TRANSFER_RELATIONS)
  
  // Identify concept clusters
  const clusters = identifyClusters(concepts, TRANSFER_RELATIONS)
  
  return {
    concepts,
    relations: TRANSFER_RELATIONS,
    shortestPaths,
    transferClusters: clusters
  }
}

/**
 * Compute shortest paths using Floyd-Warshall algorithm
 */
function computeShortestPaths(
  concepts: Map<string, LearningConcept>,
  relations: TransferRelation[]
): Map<string, Map<string, string[]>> {
  const paths = new Map<string, Map<string, string[]>>()
  const conceptIds = Array.from(concepts.keys())
  
  // Initialize with direct relations
  for (const from of conceptIds) {
    paths.set(from, new Map())
    for (const to of conceptIds) {
      if (from === to) {
        paths.get(from)!.set(to, [from])
      }
    }
  }
  
  // Add direct edges
  for (const relation of relations) {
    if (!paths.get(relation.sourceConceptId)!.has(relation.targetConceptId)) {
      paths.get(relation.sourceConceptId)!.set(
        relation.targetConceptId, 
        [relation.sourceConceptId, relation.targetConceptId]
      )
    }
    if (relation.direction === 'bidirectional') {
      if (!paths.get(relation.targetConceptId)!.has(relation.sourceConceptId)) {
        paths.get(relation.targetConceptId)!.set(
          relation.sourceConceptId,
          [relation.targetConceptId, relation.sourceConceptId]
        )
      }
    }
  }
  
  // Floyd-Warshall
  for (const k of conceptIds) {
    for (const i of conceptIds) {
      for (const j of conceptIds) {
        const pathIK = paths.get(i)?.get(k)
        const pathKJ = paths.get(k)?.get(j)
        
        if (pathIK && pathKJ) {
          const currentPath = paths.get(i)?.get(j)
          const newPath = [...pathIK.slice(0, -1), ...pathKJ]
          
          if (!currentPath || newPath.length < currentPath.length) {
            paths.get(i)!.set(j, newPath)
          }
        }
      }
    }
  }
  
  return paths
}

/**
 * Identify clusters of related concepts
 */
function identifyClusters(
  concepts: Map<string, LearningConcept>,
  relations: TransferRelation[]
): ConceptCluster[] {
  // Group by subject as a simple clustering
  const subjectGroups = new Map<string, string[]>()
  
  for (const [id, concept] of concepts) {
    const subject = concept.subject
    if (!subjectGroups.has(subject)) {
      subjectGroups.set(subject, [])
    }
    subjectGroups.get(subject)!.push(id)
  }
  
  const clusters: ConceptCluster[] = []
  
  for (const [subject, conceptIds] of subjectGroups) {
    // Find concepts that have cross-subject relations
    const bridgeConcepts = conceptIds.filter(id => {
      return relations.some(r => {
        const sourceSubject = concepts.get(r.sourceConceptId)?.subject
        const targetSubject = concepts.get(r.targetConceptId)?.subject
        return (r.sourceConceptId === id && sourceSubject !== targetSubject) ||
               (r.targetConceptId === id && sourceSubject !== targetSubject)
      })
    })
    
    // Calculate intra-cluster transfer
    const intraRelations = relations.filter(r => 
      conceptIds.includes(r.sourceConceptId) && conceptIds.includes(r.targetConceptId)
    )
    const avgTransfer = intraRelations.length > 0
      ? intraRelations.reduce((sum, r) => sum + r.transferStrength, 0) / intraRelations.length
      : 0
    
    clusters.push({
      id: `cluster_${subject}`,
      name: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Concepts`,
      concepts: conceptIds,
      intraClusterTransfer: avgTransfer,
      bridgeConcepts
    })
  }
  
  return clusters
}

// ============================================================================
// Graph Queries
// ============================================================================

/**
 * Get related concepts within transfer distance
 */
export function getRelatedConcepts(
  graph: TransferGraph,
  conceptId: string,
  maxDistance: number = 2
): LearningConcept[] {
  const paths = graph.shortestPaths.get(conceptId)
  if (!paths) return []
  
  const related: LearningConcept[] = []
  
  for (const [targetId, path] of paths) {
    if (path.length <= maxDistance + 1 && targetId !== conceptId) {
      const concept = graph.concepts.get(targetId)
      if (concept) related.push(concept)
    }
  }
  
  return related
}

/**
 * Find direct transfer relations for a concept
 */
export function getDirectTransfers(
  graph: TransferGraph,
  conceptId: string
): TransferRelation[] {
  return graph.relations.filter(r => 
    r.sourceConceptId === conceptId || 
    (r.targetConceptId === conceptId && r.direction === 'bidirectional')
  )
}

/**
 * Get bridging activity between two concepts
 */
export function getBridgingActivity(
  sourceId: string,
  targetId: string
): BridgingActivity | null {
  return BRIDGING_ACTIVITIES.find(a => 
    (a.bridgesConcepts[0] === sourceId && a.bridgesConcepts[1] === targetId) ||
    (a.bridgesConcepts[0] === targetId && a.bridgesConcepts[1] === sourceId)
  ) || null
}
