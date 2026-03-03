/**
 * @jest-environment node
 */

/**
 * Unit tests for misconception fingerprinter
 *
 * Tests:
 * - updateMisconceptionProfile: add new, update existing, status transitions
 * - checkRemediationProgress: tracks correct/incorrect, resolves on threshold
 * - startRemediation: transitions to remediating status
 * - getPrioritizedMisconceptions: sorts by severity, confidence, occurrence, recency
 * - getBlockingMisconceptions: returns fundamental or major (3+ occurrences)
 * - Stale resolution: suspected not observed for 30 days -> resolved
 * - getMisconceptionSummary: overview with breakdowns
 * - hasMisconception: boolean check with status filter
 * - getMisconceptionsByCategory: query by category
 * - Fingerprint consistency
 */

// Mock the taxonomy/math module so we can control the misconception lookup
jest.mock('../taxonomy/math', () => {
  const mockMisconceptions = [
    {
      id: 'arith-001',
      name: 'Addition/Subtraction Sign Confusion',
      category: 'arithmetic',
      severity: 'moderate',
      subject: 'math',
    },
    {
      id: 'frac-001',
      name: 'Adding Numerators and Denominators',
      category: 'fractions',
      severity: 'major',
      subject: 'math',
    },
    {
      id: 'alg-002',
      name: 'Variable as Label, Not Quantity',
      category: 'algebra',
      severity: 'fundamental',
      subject: 'math',
    },
    {
      id: 'alg-003',
      name: 'Combining Unlike Terms',
      category: 'algebra',
      severity: 'major',
      subject: 'math',
    },
    {
      id: 'oop-002',
      name: 'PEMDAS as Strict Sequence',
      category: 'arithmetic',
      severity: 'moderate',
      subject: 'math',
    },
  ]

  return {
    MATH_MISCONCEPTIONS_BY_ID: new Map(
      mockMisconceptions.map((m) => [m.id, m])
    ),
    ALL_MATH_MISCONCEPTIONS: mockMisconceptions,
  }
})

import {
  updateMisconceptionProfile,
  checkRemediationProgress,
  startRemediation,
  getPrioritizedMisconceptions,
  getBlockingMisconceptions,
  getMisconceptionSummary,
  hasMisconception,
  getMisconceptionsByCategory,
  FingerprintUpdate,
} from '../fingerprinter'
import {
  UserMisconceptionProfile,
  MisconceptionFingerprint,
  DetectedMisconception,
  MisconceptionEvidence,
  Misconception,
  MISCONCEPTION_CONFIG,
} from '../types'

// ============================================================================
// Helpers
// ============================================================================

function makeEvidence(
  overrides: Partial<MisconceptionEvidence> = {}
): MisconceptionEvidence {
  return {
    problemId: 'prob-001',
    timestamp: new Date(),
    studentAnswer: '10',
    correctAnswer: '12',
    matchedPatterns: ['numeric:sign_flip'],
    matchScore: 0.85,
    ...overrides,
  }
}

function makeMisconception(
  overrides: Partial<Misconception> = {}
): Misconception {
  return {
    id: 'arith-001',
    name: 'Addition/Subtraction Sign Confusion',
    description: 'Test misconception',
    subject: 'math',
    category: 'arithmetic',
    severity: 'moderate',
    prevalence: 0.15,
    gradeRangeStart: 1,
    gradeRangeEnd: 3,
    detectionRules: {
      errorPatterns: [],
      problemTypes: ['arithmetic'],
      difficultyRange: [1, 4] as [number, number],
      requiredSkills: ['addition-basic'],
      minOccurrences: 2,
      minConfidence: 0.6,
    },
    remediation: {
      strategy: 'conceptual_change',
      briefExplanation: 'Brief explanation',
      detailedExplanation: 'Detailed explanation',
      warmupProblems: ['warmup-1'],
      practiceProblems: ['practice-1'],
      challengeProblems: ['challenge-1'],
      estimatedProblems: 8,
      estimatedTimeMinutes: 15,
    },
    source: 'expert',
    confidence: 0.95,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0,
    ...overrides,
  } as Misconception
}

function makeDetectedMisconception(
  overrides: Partial<DetectedMisconception> = {}
): DetectedMisconception {
  return {
    misconception: makeMisconception(),
    confidence: 0.85,
    matchedPatterns: ['numeric:sign_flip'],
    evidence: makeEvidence(),
    ...overrides,
  }
}

function makeFingerprint(
  overrides: Partial<MisconceptionFingerprint> = {}
): MisconceptionFingerprint {
  return {
    misconceptionId: 'arith-001',
    misconceptionName: 'Addition/Subtraction Sign Confusion',
    status: 'suspected',
    severity: 'moderate',
    firstDetected: new Date(),
    lastObserved: new Date(),
    occurrenceCount: 1,
    confidence: 0.6,
    evidence: [makeEvidence()],
    remediationProblemsAttempted: 0,
    remediationProblemsCorrect: 0,
    ...overrides,
  }
}

function makeProfile(
  overrides: Partial<UserMisconceptionProfile> = {}
): UserMisconceptionProfile {
  return {
    userId: 'test-user-1',
    lastUpdated: new Date(),
    activeMisconceptions: [],
    resolvedMisconceptions: [],
    stats: {
      totalMisconceptionsDetected: 0,
      totalMisconceptionsResolved: 0,
      avgRemediationTime: 0,
      mostCommonCategory: 'arithmetic',
    },
    ...overrides,
  }
}

function makeUpdate(
  overrides: Partial<FingerprintUpdate> = {}
): FingerprintUpdate {
  return {
    userId: 'test-user-1',
    detections: [makeDetectedMisconception()],
    problemId: 'prob-001',
    subject: 'math',
    ...overrides,
  }
}

// ============================================================================
// updateMisconceptionProfile
// ============================================================================

describe('updateMisconceptionProfile', () => {
  describe('adding new misconceptions', () => {
    it('creates a new profile from null and adds the misconception', () => {
      const update = makeUpdate()

      const profile = updateMisconceptionProfile(null, update)

      expect(profile.userId).toBe('test-user-1')
      expect(profile.activeMisconceptions).toHaveLength(1)
      expect(profile.activeMisconceptions[0].misconceptionId).toBe('arith-001')
      expect(profile.activeMisconceptions[0].misconceptionName).toBe(
        'Addition/Subtraction Sign Confusion'
      )
      expect(profile.activeMisconceptions[0].occurrenceCount).toBe(1)
      expect(profile.activeMisconceptions[0].evidence).toHaveLength(1)
      expect(profile.stats.totalMisconceptionsDetected).toBe(1)
    })

    it('adds a new misconception to an existing profile', () => {
      const existingProfile = makeProfile({
        activeMisconceptions: [makeFingerprint()],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const fracDetection = makeDetectedMisconception({
        misconception: makeMisconception({
          id: 'frac-001',
          name: 'Adding Numerators and Denominators',
          category: 'fractions',
          severity: 'major',
        }),
        confidence: 0.75,
      })

      const update = makeUpdate({ detections: [fracDetection] })

      const profile = updateMisconceptionProfile(existingProfile, update)

      expect(profile.activeMisconceptions).toHaveLength(2)
      const fracFingerprint = profile.activeMisconceptions.find(
        (m) => m.misconceptionId === 'frac-001'
      )
      expect(fracFingerprint).toBeDefined()
      expect(fracFingerprint!.severity).toBe('major')
      expect(profile.stats.totalMisconceptionsDetected).toBe(2)
    })

    it('sets initial status to suspected when confidence is below confirmed threshold', () => {
      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            confidence: MISCONCEPTION_CONFIG.MIN_CONFIDENCE_FOR_CONFIRMED - 0.1,
          }),
        ],
      })

      const profile = updateMisconceptionProfile(null, update)

      expect(profile.activeMisconceptions[0].status).toBe('suspected')
    })

    it('sets initial status to confirmed when confidence meets threshold', () => {
      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            confidence: MISCONCEPTION_CONFIG.MIN_CONFIDENCE_FOR_CONFIRMED,
          }),
        ],
      })

      const profile = updateMisconceptionProfile(null, update)

      expect(profile.activeMisconceptions[0].status).toBe('confirmed')
    })
  })

  describe('updating existing misconceptions', () => {
    it('increments occurrence count for existing misconception', () => {
      const existingProfile = makeProfile({
        activeMisconceptions: [makeFingerprint({ occurrenceCount: 1 })],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const update = makeUpdate()

      const profile = updateMisconceptionProfile(existingProfile, update)

      expect(profile.activeMisconceptions[0].occurrenceCount).toBe(2)
    })

    it('updates lastObserved timestamp', () => {
      const oldDate = new Date('2025-01-01')
      const existingProfile = makeProfile({
        activeMisconceptions: [makeFingerprint({ lastObserved: oldDate })],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const update = makeUpdate()

      const profile = updateMisconceptionProfile(existingProfile, update)

      expect(
        profile.activeMisconceptions[0].lastObserved.getTime()
      ).toBeGreaterThan(oldDate.getTime())
    })

    it('keeps the maximum confidence value', () => {
      const existingProfile = makeProfile({
        activeMisconceptions: [makeFingerprint({ confidence: 0.9 })],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({ confidence: 0.7 }), // Lower than existing 0.9
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      // Should keep the higher value (0.9) via Math.max
      expect(profile.activeMisconceptions[0].confidence).toBe(0.9)
    })

    it('updates confidence when new detection has higher value', () => {
      const existingProfile = makeProfile({
        activeMisconceptions: [makeFingerprint({ confidence: 0.5 })],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({ confidence: 0.9 }), // Higher than existing 0.5
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      expect(profile.activeMisconceptions[0].confidence).toBe(0.9)
    })

    it('appends evidence up to max limit', () => {
      const maxEvidence = MISCONCEPTION_CONFIG.MAX_EVIDENCE_PER_MISCONCEPTION
      const existingEvidence = Array.from({ length: maxEvidence }, (_, i) =>
        makeEvidence({ problemId: `existing-${i}` })
      )

      const existingProfile = makeProfile({
        activeMisconceptions: [makeFingerprint({ evidence: existingEvidence })],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            evidence: makeEvidence({ problemId: 'new-evidence' }),
          }),
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      // Should keep only the last MAX_EVIDENCE_PER_MISCONCEPTION items
      expect(
        profile.activeMisconceptions[0].evidence.length
      ).toBeLessThanOrEqual(maxEvidence)
      // The newest evidence should be the last one
      const lastEvidence =
        profile.activeMisconceptions[0].evidence[
          profile.activeMisconceptions[0].evidence.length - 1
        ]
      expect(lastEvidence.problemId).toBe('new-evidence')
    })
  })

  describe('status transitions', () => {
    it('transitions from suspected to confirmed after min occurrences and high confidence', () => {
      const minOccurrences = MISCONCEPTION_CONFIG.MIN_OCCURRENCES_FOR_CONFIRMED
      const minConfidence = MISCONCEPTION_CONFIG.MIN_CONFIDENCE_FOR_CONFIRMED

      // Start with a profile just below the threshold
      const existingProfile = makeProfile({
        activeMisconceptions: [
          makeFingerprint({
            status: 'suspected',
            occurrenceCount: minOccurrences - 1,
            confidence: minConfidence,
          }),
        ],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      // Add one more occurrence with high confidence
      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            confidence: minConfidence + 0.1,
          }),
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      // After this update, occurrenceCount = minOccurrences and confidence >= threshold
      expect(profile.activeMisconceptions[0].status).toBe('confirmed')
      expect(profile.activeMisconceptions[0].occurrenceCount).toBe(
        minOccurrences
      )
    })

    it('stays suspected if occurrences are met but confidence is too low', () => {
      const minOccurrences = MISCONCEPTION_CONFIG.MIN_OCCURRENCES_FOR_CONFIRMED

      const existingProfile = makeProfile({
        activeMisconceptions: [
          makeFingerprint({
            status: 'suspected',
            occurrenceCount: minOccurrences - 1,
            confidence: 0.3, // Low confidence
          }),
        ],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            confidence: 0.3, // Still low
          }),
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      expect(profile.activeMisconceptions[0].status).toBe('suspected')
    })
  })

  describe('stale resolution', () => {
    it('resolves suspected misconception not observed for 30+ days', () => {
      const thirtyOneDaysAgo = new Date()
      thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31)

      const existingProfile = makeProfile({
        activeMisconceptions: [
          makeFingerprint({
            status: 'suspected',
            lastObserved: thirtyOneDaysAgo,
          }),
        ],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      // Update with a different misconception (so the stale one is not re-observed)
      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            misconception: makeMisconception({
              id: 'frac-001',
              name: 'Adding Numerators and Denominators',
              category: 'fractions',
              severity: 'major',
            }),
          }),
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      // The stale arith-001 should have been moved to resolved
      const activeArith = profile.activeMisconceptions.find(
        (m) => m.misconceptionId === 'arith-001'
      )
      expect(activeArith).toBeUndefined()

      const resolvedArith = profile.resolvedMisconceptions.find(
        (m) => m.misconceptionId === 'arith-001'
      )
      expect(resolvedArith).toBeDefined()
      expect(resolvedArith!.status).toBe('resolved')
      expect(resolvedArith!.resolvedAt).toBeDefined()
      expect(profile.stats.totalMisconceptionsResolved).toBe(1)
    })

    it('does not resolve confirmed misconception after only 30 days', () => {
      const thirtyOneDaysAgo = new Date()
      thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31)

      const existingProfile = makeProfile({
        activeMisconceptions: [
          makeFingerprint({
            status: 'confirmed',
            lastObserved: thirtyOneDaysAgo,
          }),
        ],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      // Update with unrelated misconception
      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            misconception: makeMisconception({
              id: 'frac-001',
              name: 'Adding Numerators and Denominators',
              category: 'fractions',
              severity: 'major',
            }),
          }),
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      // Confirmed needs 60 days (staleThreshold * 2) to auto-resolve
      const activeArith = profile.activeMisconceptions.find(
        (m) => m.misconceptionId === 'arith-001'
      )
      expect(activeArith).toBeDefined()
      expect(activeArith!.status).toBe('confirmed')
    })

    it('resolves confirmed misconception after 60+ days without observation', () => {
      const sixtyOneDaysAgo = new Date()
      sixtyOneDaysAgo.setDate(sixtyOneDaysAgo.getDate() - 61)

      const existingProfile = makeProfile({
        activeMisconceptions: [
          makeFingerprint({
            status: 'confirmed',
            lastObserved: sixtyOneDaysAgo,
          }),
        ],
        stats: {
          totalMisconceptionsDetected: 1,
          totalMisconceptionsResolved: 0,
          avgRemediationTime: 0,
          mostCommonCategory: 'arithmetic',
        },
      })

      const update = makeUpdate({
        detections: [
          makeDetectedMisconception({
            misconception: makeMisconception({
              id: 'frac-001',
              name: 'Adding Numerators and Denominators',
              category: 'fractions',
              severity: 'major',
            }),
          }),
        ],
      })

      const profile = updateMisconceptionProfile(existingProfile, update)

      const activeArith = profile.activeMisconceptions.find(
        (m) => m.misconceptionId === 'arith-001'
      )
      expect(activeArith).toBeUndefined()

      const resolvedArith = profile.resolvedMisconceptions.find(
        (m) => m.misconceptionId === 'arith-001'
      )
      expect(resolvedArith).toBeDefined()
      expect(resolvedArith!.status).toBe('resolved')
    })
  })
})

// ============================================================================
// checkRemediationProgress
// ============================================================================

describe('checkRemediationProgress', () => {
  it('increments attempted and correct counts on correct answer', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          status: 'remediating',
          remediationProblemsAttempted: 1,
          remediationProblemsCorrect: 1,
        }),
      ],
    })

    const updated = checkRemediationProgress(profile, 'arith-001', true)

    const fp = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(fp).toBeDefined()
    expect(fp!.remediationProblemsAttempted).toBe(2)
    expect(fp!.remediationProblemsCorrect).toBe(2)
  })

  it('increments only attempted count on incorrect answer', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          status: 'remediating',
          remediationProblemsAttempted: 1,
          remediationProblemsCorrect: 1,
        }),
      ],
    })

    const updated = checkRemediationProgress(profile, 'arith-001', false)

    const fp = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(fp!.remediationProblemsAttempted).toBe(2)
    expect(fp!.remediationProblemsCorrect).toBe(1) // Not incremented
  })

  it('does nothing for non-remediating misconception', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          status: 'confirmed',
          remediationProblemsAttempted: 0,
          remediationProblemsCorrect: 0,
        }),
      ],
    })

    const updated = checkRemediationProgress(profile, 'arith-001', true)

    const fp = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(fp!.remediationProblemsAttempted).toBe(0)
    expect(fp!.remediationProblemsCorrect).toBe(0)
  })

  it('resolves misconception when success rate meets threshold after min problems', () => {
    const minProblems = MISCONCEPTION_CONFIG.REMEDIATION_MIN_PROBLEMS
    const threshold = MISCONCEPTION_CONFIG.REMEDIATION_SUCCESS_THRESHOLD

    // Need to reach minProblems (5) with >= 80% correct
    // So 4 correct + 1 more correct = 5 attempted, 5 correct (100%)
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          status: 'remediating',
          remediationProblemsAttempted: minProblems - 1,
          remediationProblemsCorrect: minProblems - 1, // 100% so far
        }),
      ],
    })

    const updated = checkRemediationProgress(profile, 'arith-001', true)

    // After this: attempted = minProblems, correct = minProblems, rate = 1.0 >= 0.8
    const activeMatch = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(activeMatch).toBeUndefined() // Moved out of active

    const resolvedMatch = updated.resolvedMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(resolvedMatch).toBeDefined()
    expect(resolvedMatch!.status).toBe('resolved')
    expect(resolvedMatch!.resolvedAt).toBeInstanceOf(Date)
  })

  it('does not resolve when success rate is below threshold', () => {
    const minProblems = MISCONCEPTION_CONFIG.REMEDIATION_MIN_PROBLEMS

    // 2 correct out of 4, then 1 more incorrect = 2/5 = 40% < 80%
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          status: 'remediating',
          remediationProblemsAttempted: minProblems - 1,
          remediationProblemsCorrect: 2,
        }),
      ],
    })

    const updated = checkRemediationProgress(profile, 'arith-001', false)

    // 2/5 = 40% which is below 80% threshold
    const activeMatch = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(activeMatch).toBeDefined()
    expect(activeMatch!.status).toBe('remediating') // Still remediating
  })

  it('does not resolve when below minimum problems even with 100% success', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          status: 'remediating',
          remediationProblemsAttempted: 1,
          remediationProblemsCorrect: 1,
        }),
      ],
    })

    const updated = checkRemediationProgress(profile, 'arith-001', true)

    // 2/2 = 100% but only 2 problems attempted (< 5 min)
    const activeMatch = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(activeMatch).toBeDefined()
    expect(activeMatch!.status).toBe('remediating')
  })

  it('handles non-existent misconception ID gracefully', () => {
    const profile = makeProfile({
      activeMisconceptions: [makeFingerprint()],
    })

    const updated = checkRemediationProgress(profile, 'nonexistent-id', true)

    // Should not crash, profile unchanged
    expect(updated.activeMisconceptions).toHaveLength(1)
  })
})

// ============================================================================
// startRemediation
// ============================================================================

describe('startRemediation', () => {
  it('transitions suspected misconception to remediating', () => {
    const profile = makeProfile({
      activeMisconceptions: [makeFingerprint({ status: 'suspected' })],
    })

    const updated = startRemediation(profile, 'arith-001')

    const fp = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(fp!.status).toBe('remediating')
    expect(fp!.remediationStarted).toBeInstanceOf(Date)
    expect(fp!.remediationProblemsAttempted).toBe(0)
    expect(fp!.remediationProblemsCorrect).toBe(0)
  })

  it('transitions confirmed misconception to remediating', () => {
    const profile = makeProfile({
      activeMisconceptions: [makeFingerprint({ status: 'confirmed' })],
    })

    const updated = startRemediation(profile, 'arith-001')

    const fp = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(fp!.status).toBe('remediating')
  })

  it('does not transition already remediating misconception', () => {
    const startedDate = new Date('2026-01-01')
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          status: 'remediating',
          remediationStarted: startedDate,
          remediationProblemsAttempted: 3,
          remediationProblemsCorrect: 2,
        }),
      ],
    })

    const updated = startRemediation(profile, 'arith-001')

    const fp = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    // Already remediating, should not reset counters
    expect(fp!.status).toBe('remediating')
    expect(fp!.remediationProblemsAttempted).toBe(3)
    expect(fp!.remediationProblemsCorrect).toBe(2)
  })

  it('does not transition resolved misconception', () => {
    // Resolved misconceptions would be in resolvedMisconceptions, not active
    // But if somehow in active with resolved status, startRemediation should not change it
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ status: 'resolved' as 'suspected' }),
      ],
    })

    const updated = startRemediation(profile, 'arith-001')

    const fp = updated.activeMisconceptions.find(
      (m) => m.misconceptionId === 'arith-001'
    )
    // 'resolved' is not 'suspected' or 'confirmed', so startRemediation won't modify
    expect(fp!.status).toBe('resolved')
  })

  it('handles non-existent misconception gracefully', () => {
    const profile = makeProfile({
      activeMisconceptions: [makeFingerprint()],
    })

    const updated = startRemediation(profile, 'nonexistent-id')

    expect(updated.activeMisconceptions).toHaveLength(1)
    expect(updated.activeMisconceptions[0].status).toBe('suspected')
  })

  it('updates lastUpdated timestamp', () => {
    const oldDate = new Date('2025-01-01')
    const profile = makeProfile({
      lastUpdated: oldDate,
      activeMisconceptions: [makeFingerprint({ status: 'confirmed' })],
    })

    const updated = startRemediation(profile, 'arith-001')

    expect(updated.lastUpdated.getTime()).toBeGreaterThan(oldDate.getTime())
  })
})

// ============================================================================
// getPrioritizedMisconceptions
// ============================================================================

describe('getPrioritizedMisconceptions', () => {
  it('sorts by severity first (fundamental > major > moderate > minor)', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'minor-one',
          severity: 'minor',
          confidence: 0.9,
          occurrenceCount: 10,
        }),
        makeFingerprint({
          misconceptionId: 'fundamental-one',
          severity: 'fundamental',
          confidence: 0.5,
          occurrenceCount: 1,
        }),
        makeFingerprint({
          misconceptionId: 'major-one',
          severity: 'major',
          confidence: 0.8,
          occurrenceCount: 5,
        }),
      ],
    })

    const prioritized = getPrioritizedMisconceptions(profile)

    expect(prioritized[0].misconceptionId).toBe('fundamental-one')
    expect(prioritized[1].misconceptionId).toBe('major-one')
    expect(prioritized[2].misconceptionId).toBe('minor-one')
  })

  it('sorts by confidence when severity is equal (higher confidence first)', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'low-conf',
          severity: 'major',
          confidence: 0.5,
          occurrenceCount: 5,
        }),
        makeFingerprint({
          misconceptionId: 'high-conf',
          severity: 'major',
          confidence: 0.95,
          occurrenceCount: 5,
        }),
      ],
    })

    const prioritized = getPrioritizedMisconceptions(profile)

    expect(prioritized[0].misconceptionId).toBe('high-conf')
    expect(prioritized[1].misconceptionId).toBe('low-conf')
  })

  it('sorts by occurrence count when severity and confidence are similar', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'few-occurrences',
          severity: 'major',
          confidence: 0.8,
          occurrenceCount: 2,
        }),
        makeFingerprint({
          misconceptionId: 'many-occurrences',
          severity: 'major',
          confidence: 0.8,
          occurrenceCount: 10,
        }),
      ],
    })

    const prioritized = getPrioritizedMisconceptions(profile)

    expect(prioritized[0].misconceptionId).toBe('many-occurrences')
    expect(prioritized[1].misconceptionId).toBe('few-occurrences')
  })

  it('sorts by recency when all other factors are equal', () => {
    const older = new Date('2026-01-01')
    const newer = new Date('2026-03-01')

    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'old-one',
          severity: 'major',
          confidence: 0.8,
          occurrenceCount: 5,
          lastObserved: older,
        }),
        makeFingerprint({
          misconceptionId: 'new-one',
          severity: 'major',
          confidence: 0.8,
          occurrenceCount: 5,
          lastObserved: newer,
        }),
      ],
    })

    const prioritized = getPrioritizedMisconceptions(profile)

    expect(prioritized[0].misconceptionId).toBe('new-one')
    expect(prioritized[1].misconceptionId).toBe('old-one')
  })

  it('returns empty array for profile with no active misconceptions', () => {
    const profile = makeProfile()

    const prioritized = getPrioritizedMisconceptions(profile)

    expect(prioritized).toHaveLength(0)
  })

  it('does not mutate the original profile', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'b', severity: 'minor' }),
        makeFingerprint({ misconceptionId: 'a', severity: 'major' }),
      ],
    })

    const originalOrder = profile.activeMisconceptions.map(
      (m) => m.misconceptionId
    )

    getPrioritizedMisconceptions(profile)

    const afterOrder = profile.activeMisconceptions.map(
      (m) => m.misconceptionId
    )
    expect(afterOrder).toEqual(originalOrder)
  })
})

// ============================================================================
// getBlockingMisconceptions
// ============================================================================

describe('getBlockingMisconceptions', () => {
  it('returns all fundamental severity misconceptions', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'fundamental-one',
          severity: 'fundamental',
          occurrenceCount: 1,
        }),
      ],
    })

    const blocking = getBlockingMisconceptions(profile)

    expect(blocking).toHaveLength(1)
    expect(blocking[0].misconceptionId).toBe('fundamental-one')
  })

  it('returns major severity misconceptions with 3+ occurrences', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'major-many',
          severity: 'major',
          occurrenceCount: 3,
        }),
      ],
    })

    const blocking = getBlockingMisconceptions(profile)

    expect(blocking).toHaveLength(1)
    expect(blocking[0].misconceptionId).toBe('major-many')
  })

  it('does not include major severity misconceptions with fewer than 3 occurrences', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'major-few',
          severity: 'major',
          occurrenceCount: 2,
        }),
      ],
    })

    const blocking = getBlockingMisconceptions(profile)

    expect(blocking).toHaveLength(0)
  })

  it('does not include moderate or minor severity misconceptions', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'moderate-one',
          severity: 'moderate',
          occurrenceCount: 10,
        }),
        makeFingerprint({
          misconceptionId: 'minor-one',
          severity: 'minor',
          occurrenceCount: 20,
        }),
      ],
    })

    const blocking = getBlockingMisconceptions(profile)

    expect(blocking).toHaveLength(0)
  })

  it('returns empty array when no active misconceptions', () => {
    const profile = makeProfile()

    const blocking = getBlockingMisconceptions(profile)

    expect(blocking).toHaveLength(0)
  })

  it('returns mixed fundamental and major (3+) misconceptions', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'fund-1',
          severity: 'fundamental',
          occurrenceCount: 1,
        }),
        makeFingerprint({
          misconceptionId: 'major-3',
          severity: 'major',
          occurrenceCount: 5,
        }),
        makeFingerprint({
          misconceptionId: 'major-1',
          severity: 'major',
          occurrenceCount: 1,
        }),
        makeFingerprint({
          misconceptionId: 'mod-many',
          severity: 'moderate',
          occurrenceCount: 100,
        }),
      ],
    })

    const blocking = getBlockingMisconceptions(profile)

    expect(blocking).toHaveLength(2)
    const ids = blocking.map((m) => m.misconceptionId)
    expect(ids).toContain('fund-1')
    expect(ids).toContain('major-3')
  })
})

// ============================================================================
// getMisconceptionSummary
// ============================================================================

describe('getMisconceptionSummary', () => {
  it('returns correct totalActive and totalResolved counts', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001' }),
        makeFingerprint({ misconceptionId: 'frac-001', severity: 'major' }),
      ],
      resolvedMisconceptions: [
        makeFingerprint({
          misconceptionId: 'alg-002',
          status: 'resolved' as 'suspected',
        }),
      ],
    })

    const summary = getMisconceptionSummary(profile)

    expect(summary.totalActive).toBe(2)
    expect(summary.totalResolved).toBe(1)
  })

  it('returns category breakdown from active misconceptions', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001' }), // arithmetic
        makeFingerprint({ misconceptionId: 'frac-001' }), // fractions
        makeFingerprint({ misconceptionId: 'oop-002' }), // arithmetic
      ],
    })

    const summary = getMisconceptionSummary(profile)

    expect(summary.byCategory['arithmetic']).toBe(2)
    expect(summary.byCategory['fractions']).toBe(1)
  })

  it('returns severity breakdown from active misconceptions', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001', severity: 'moderate' }),
        makeFingerprint({ misconceptionId: 'frac-001', severity: 'major' }),
        makeFingerprint({
          misconceptionId: 'alg-002',
          severity: 'fundamental',
        }),
      ],
    })

    const summary = getMisconceptionSummary(profile)

    expect(summary.bySeverity['moderate']).toBe(1)
    expect(summary.bySeverity['major']).toBe(1)
    expect(summary.bySeverity['fundamental']).toBe(1)
  })

  it('returns the top priority misconception', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({
          misconceptionId: 'minor-thing',
          severity: 'minor',
          confidence: 0.9,
        }),
        makeFingerprint({
          misconceptionId: 'fundamental-thing',
          severity: 'fundamental',
          confidence: 0.5,
        }),
      ],
    })

    const summary = getMisconceptionSummary(profile)

    expect(summary.topPriority).toBeDefined()
    expect(summary.topPriority!.misconceptionId).toBe('fundamental-thing')
  })

  it('returns null topPriority when no active misconceptions', () => {
    const profile = makeProfile()

    const summary = getMisconceptionSummary(profile)

    expect(summary.topPriority).toBeNull()
    expect(summary.totalActive).toBe(0)
    expect(summary.blocking).toBe(0)
  })

  it('counts blocking misconceptions correctly', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ severity: 'fundamental', occurrenceCount: 1 }),
        makeFingerprint({
          misconceptionId: 'frac-001',
          severity: 'major',
          occurrenceCount: 5,
        }),
        makeFingerprint({
          misconceptionId: 'oop-002',
          severity: 'moderate',
          occurrenceCount: 10,
        }),
      ],
    })

    const summary = getMisconceptionSummary(profile)

    expect(summary.blocking).toBe(2) // fundamental + major with 5 occurrences
  })
})

// ============================================================================
// hasMisconception
// ============================================================================

describe('hasMisconception', () => {
  it('returns true when misconception exists in active list', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001', status: 'suspected' }),
      ],
    })

    expect(hasMisconception(profile, 'arith-001')).toBe(true)
  })

  it('returns false when misconception does not exist', () => {
    const profile = makeProfile({
      activeMisconceptions: [makeFingerprint({ misconceptionId: 'arith-001' })],
    })

    expect(hasMisconception(profile, 'nonexistent')).toBe(false)
  })

  it('returns false for resolved misconceptions (not in active list)', () => {
    const profile = makeProfile({
      resolvedMisconceptions: [
        makeFingerprint({
          misconceptionId: 'arith-001',
          status: 'resolved' as 'suspected',
        }),
      ],
    })

    expect(hasMisconception(profile, 'arith-001')).toBe(false)
  })

  it('filters by confirmed status when onlyConfirmed is true', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001', status: 'suspected' }),
      ],
    })

    expect(hasMisconception(profile, 'arith-001', false)).toBe(true)
    expect(hasMisconception(profile, 'arith-001', true)).toBe(false)
  })

  it('returns true for confirmed misconception with onlyConfirmed flag', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001', status: 'confirmed' }),
      ],
    })

    expect(hasMisconception(profile, 'arith-001', true)).toBe(true)
  })

  it('returns false for empty profile', () => {
    const profile = makeProfile()

    expect(hasMisconception(profile, 'arith-001')).toBe(false)
  })
})

// ============================================================================
// getMisconceptionsByCategory
// ============================================================================

describe('getMisconceptionsByCategory', () => {
  it('returns misconceptions matching the requested category', () => {
    const profile = makeProfile({
      activeMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001' }), // arithmetic category
        makeFingerprint({ misconceptionId: 'frac-001' }), // fractions category
        makeFingerprint({ misconceptionId: 'oop-002' }), // arithmetic category
      ],
    })

    const arithmeticMisconceptions = getMisconceptionsByCategory(
      profile,
      'arithmetic'
    )

    expect(arithmeticMisconceptions).toHaveLength(2)
    const ids = arithmeticMisconceptions.map((m) => m.misconceptionId)
    expect(ids).toContain('arith-001')
    expect(ids).toContain('oop-002')
  })

  it('returns empty array when no misconceptions match the category', () => {
    const profile = makeProfile({
      activeMisconceptions: [makeFingerprint({ misconceptionId: 'arith-001' })],
    })

    const result = getMisconceptionsByCategory(profile, 'geometry')

    expect(result).toHaveLength(0)
  })

  it('returns empty array for empty profile', () => {
    const profile = makeProfile()

    const result = getMisconceptionsByCategory(profile, 'arithmetic')

    expect(result).toHaveLength(0)
  })

  it('only searches active misconceptions, not resolved', () => {
    const profile = makeProfile({
      activeMisconceptions: [],
      resolvedMisconceptions: [
        makeFingerprint({ misconceptionId: 'arith-001' }),
      ],
    })

    const result = getMisconceptionsByCategory(profile, 'arithmetic')

    expect(result).toHaveLength(0)
  })
})

// ============================================================================
// Fingerprint consistency
// ============================================================================

describe('fingerprint consistency', () => {
  it('same misconception detected twice produces consistent fingerprint IDs', () => {
    const detection1 = makeDetectedMisconception({
      misconception: makeMisconception({ id: 'arith-001' }),
      evidence: makeEvidence({
        problemId: 'prob-A',
        studentAnswer: '-5',
        correctAnswer: '5',
      }),
    })

    const detection2 = makeDetectedMisconception({
      misconception: makeMisconception({ id: 'arith-001' }),
      evidence: makeEvidence({
        problemId: 'prob-B',
        studentAnswer: '-3',
        correctAnswer: '3',
      }),
    })

    const update1 = makeUpdate({ detections: [detection1] })
    const profile1 = updateMisconceptionProfile(null, update1)

    const update2 = makeUpdate({ detections: [detection2] })
    const profile2 = updateMisconceptionProfile(profile1, update2)

    // Should result in a single fingerprint with incremented count
    const arithFingerprints = profile2.activeMisconceptions.filter(
      (m) => m.misconceptionId === 'arith-001'
    )
    expect(arithFingerprints).toHaveLength(1)
    expect(arithFingerprints[0].occurrenceCount).toBe(2)
    expect(arithFingerprints[0].evidence).toHaveLength(2)
  })

  it('different misconceptions produce distinct fingerprints', () => {
    const arithDetection = makeDetectedMisconception({
      misconception: makeMisconception({ id: 'arith-001' }),
    })

    const fracDetection = makeDetectedMisconception({
      misconception: makeMisconception({
        id: 'frac-001',
        name: 'Adding Numerators and Denominators',
        category: 'fractions',
        severity: 'major',
      }),
    })

    const update = makeUpdate({
      detections: [arithDetection, fracDetection],
    })

    const profile = updateMisconceptionProfile(null, update)

    expect(profile.activeMisconceptions).toHaveLength(2)
    const ids = profile.activeMisconceptions.map((m) => m.misconceptionId)
    expect(ids).toContain('arith-001')
    expect(ids).toContain('frac-001')
  })
})
