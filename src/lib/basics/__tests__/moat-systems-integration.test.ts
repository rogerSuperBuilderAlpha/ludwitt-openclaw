/**
 * Tests for Moat Systems Integration
 * 
 * Verifies the moat systems integration works correctly and doesn't crash.
 */

import {
  updateMoatSystems,
  triggerMoatUpdates,
  MoatUpdateContext
} from '../moat-systems-integration'

// Mock all the external modules to prevent actual Firebase/API calls
jest.mock('@/lib/logger', () => ({
  apiLogger: {
    debug: jest.fn(),
    apiError: jest.fn()
  }
}))

jest.mock('@/lib/firebase/admin', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ exists: false, data: () => null })),
        set: jest.fn(() => Promise.resolve())
      }))
    }))
  }
}))

jest.mock('@/lib/misconceptions/detector', () => ({
  detectMisconceptions: jest.fn(() => ({
    detected: false,
    misconceptions: []
  }))
}))

jest.mock('@/lib/misconceptions/storage', () => ({
  getMisconceptionProfile: jest.fn(() => Promise.resolve(null)),
  storeMisconceptionProfile: jest.fn(() => Promise.resolve()),
  storeErrorRecord: jest.fn(() => Promise.resolve())
}))

jest.mock('@/lib/misconceptions/fingerprinter', () => ({
  updateMisconceptionProfile: jest.fn(() => ({}))
}))

jest.mock('@/lib/personalized-memory/storage', () => ({
  getMemoryModel: jest.fn(() => Promise.resolve(null)),
  updateConceptModel: jest.fn(() => Promise.resolve()),
  storeObservation: jest.fn(() => Promise.resolve())
}))

jest.mock('@/lib/personalized-memory/half-life-regression', () => ({
  createHalfLifeModel: jest.fn(() => ({
    conceptId: 'test',
    conceptName: 'Test',
    subject: 'math',
    lastReview: new Date(0),
    totalReviews: 0
  })),
  updateHalfLife: jest.fn((model) => model)
}))

jest.mock('@/lib/transfer-learning/predictor', () => ({
  createTransferProfile: jest.fn(() => ({
    userId: 'test',
    conceptMastery: new Map(),
    lastUpdated: new Date()
  })),
  updateConceptMastery: jest.fn((profile) => profile)
}))

jest.mock('@/lib/transfer-learning/types', () => ({
  TRANSFER_COLLECTIONS: { PROFILES: 'transferProfiles' }
}))

jest.mock('@/lib/cognitive-load/load-estimator', () => ({
  analyzeProblemComplexity: jest.fn(() => ({
    intrinsicLoadEstimate: 0.5
  }))
}))

jest.mock('@/lib/cognitive-load/optimizer', () => ({
  createCognitiveProfile: jest.fn(() => ({
    userId: 'test'
  })),
  updateCognitiveProfile: jest.fn((profile) => profile)
}))

jest.mock('@/lib/cognitive-load/types', () => ({
  COGNITIVE_LOAD_COLLECTIONS: { PROFILES: 'cognitiveLoadProfiles' }
}))

describe('Moat Systems Integration', () => {
  const baseContext: MoatUpdateContext = {
    userId: 'test-user-123',
    problemId: 'prob-123',
    subject: 'math',
    problemType: 'addition',
    problemText: 'What is 2 + 2?',
    difficulty: 3,
    userAnswer: '4',
    correctAnswer: '4',
    isCorrect: true,
    timeSpentMs: 5000,
    skills: ['basic_addition'],
    explanation: 'Add the numbers'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('updateMoatSystems', () => {
    it('should complete without throwing for correct answers', async () => {
      await expect(updateMoatSystems(baseContext)).resolves.not.toThrow()
    })

    it('should complete without throwing for incorrect answers', async () => {
      const incorrectContext: MoatUpdateContext = {
        ...baseContext,
        userAnswer: '5',
        isCorrect: false
      }
      await expect(updateMoatSystems(incorrectContext)).resolves.not.toThrow()
    })

    it('should handle all supported subjects', async () => {
      const subjects: MoatUpdateContext['subject'][] = ['math', 'reading', 'latin', 'greek', 'logic']
      
      for (const subject of subjects) {
        const ctx: MoatUpdateContext = { ...baseContext, subject }
        await expect(updateMoatSystems(ctx)).resolves.not.toThrow()
      }
    })

    it('should handle missing optional fields', async () => {
      const minimalContext: MoatUpdateContext = {
        userId: 'test-user',
        problemId: 'prob-1',
        subject: 'math',
        problemType: 'unknown',
        problemText: 'Test',
        difficulty: 1,
        userAnswer: 'answer',
        correctAnswer: 'answer',
        isCorrect: true,
        timeSpentMs: 1000
      }
      await expect(updateMoatSystems(minimalContext)).resolves.not.toThrow()
    })
  })

  describe('triggerMoatUpdates', () => {
    it('should be fire-and-forget (not throw synchronously)', () => {
      expect(() => triggerMoatUpdates(baseContext)).not.toThrow()
    })

    it('should handle rapid successive calls', () => {
      for (let i = 0; i < 10; i++) {
        expect(() => triggerMoatUpdates({
          ...baseContext,
          problemId: `prob-${i}`
        })).not.toThrow()
      }
    })
  })

  describe('error handling', () => {
    it('should not throw when individual systems fail', async () => {
      // Even if one system throws, others should continue
      const { detectMisconceptions } = require('@/lib/misconceptions/detector')
      detectMisconceptions.mockImplementation(() => {
        throw new Error('Simulated failure')
      })

      // Should still complete without throwing
      await expect(updateMoatSystems({
        ...baseContext,
        isCorrect: false
      })).resolves.not.toThrow()
    })
  })
})
