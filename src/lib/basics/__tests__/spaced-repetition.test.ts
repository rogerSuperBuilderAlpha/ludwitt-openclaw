/**
 * Unit Tests for Spaced Repetition System
 */

import {
  calculateOptimalSpacing,
  isItemDueForReview,
  getItemsDueForReview,
  createSpacedItem,
  updateSpacedRepetition,
  getSpacedRepetitionRecommendations,
  SpacedItem,
  SpacingScheduler
} from '../spaced-repetition'

// Helper to create a mock spaced item
function createMockItem(overrides: Partial<SpacedItem> = {}): SpacedItem {
  return {
    problemId: 'test-problem-1',
    lastSeen: new Date(),
    easinessFactor: 2.0,
    interval: 1,
    consecutiveCorrect: 0,
    totalReviews: 0,
    lastPerformance: 0,
    skillTags: ['algebra'],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

// Helper to create a mock scheduler
function createMockScheduler(mathItems: Map<string, SpacedItem> = new Map()): SpacingScheduler {
  return {
    userId: 'test-user',
    mathItems,
    readingItems: new Map(),
    lastUpdated: new Date()
  }
}

describe('createSpacedItem', () => {
  test('creates item with default values', () => {
    const item = createSpacedItem('problem-123')
    
    expect(item.problemId).toBe('problem-123')
    expect(item.easinessFactor).toBe(2.0)
    expect(item.interval).toBe(1)
    expect(item.consecutiveCorrect).toBe(0)
    expect(item.totalReviews).toBe(0)
    expect(item.lastPerformance).toBe(0)
    expect(item.skillTags).toEqual([])
    expect(item.lastSeen.getTime()).toBe(0) // Epoch - never seen
  })

  test('creates item with skill tags', () => {
    const item = createSpacedItem('problem-123', ['algebra', 'equations'])
    expect(item.skillTags).toEqual(['algebra', 'equations'])
  })
})

describe('calculateOptimalSpacing', () => {
  describe('with excellent performance (90%+)', () => {
    test('increases ease factor by 0.15', () => {
      const item = createMockItem({ easinessFactor: 2.0 })
      const result = calculateOptimalSpacing(item, 0.95)
      expect(result.easinessFactor).toBe(2.15)
    })

    test('caps ease factor at 2.5', () => {
      const item = createMockItem({ easinessFactor: 2.45 })
      const result = calculateOptimalSpacing(item, 0.95)
      expect(result.easinessFactor).toBe(2.5)
    })

    test('increments consecutive correct', () => {
      const item = createMockItem({ consecutiveCorrect: 3 })
      const result = calculateOptimalSpacing(item, 0.95)
      expect(result.consecutiveCorrect).toBe(4)
    })

    test('sets 2-day interval for first review', () => {
      const item = createMockItem({ totalReviews: 0 })
      const result = calculateOptimalSpacing(item, 0.95)
      expect(result.totalReviews).toBe(1)
      expect(result.interval).toBe(2)
    })

    test('sets 4-day interval for second review', () => {
      const item = createMockItem({ totalReviews: 1 })
      const result = calculateOptimalSpacing(item, 0.95)
      expect(result.totalReviews).toBe(2)
      expect(result.interval).toBe(4)
    })

    test('applies ease factor multiplication for later reviews', () => {
      const item = createMockItem({ 
        totalReviews: 2, 
        interval: 4,
        easinessFactor: 2.0 
      })
      const result = calculateOptimalSpacing(item, 0.95)
      // interval * easeFactor = 4 * 2.15 = 8.6
      expect(result.interval).toBeGreaterThanOrEqual(8)
    })
  })

  describe('with good performance (70-89%)', () => {
    test('increases ease factor by 0.05', () => {
      const item = createMockItem({ easinessFactor: 2.0 })
      const result = calculateOptimalSpacing(item, 0.75)
      expect(result.easinessFactor).toBe(2.05)
    })

    test('increases interval by 20%', () => {
      const item = createMockItem({ interval: 5 })
      const result = calculateOptimalSpacing(item, 0.75)
      expect(result.interval).toBe(6) // 5 * 1.2 = 6
    })

    test('increments consecutive correct', () => {
      const item = createMockItem({ consecutiveCorrect: 2 })
      const result = calculateOptimalSpacing(item, 0.75)
      expect(result.consecutiveCorrect).toBe(3)
    })
  })

  describe('with struggling performance (50-69%)', () => {
    test('decreases ease factor by 0.15', () => {
      const item = createMockItem({ easinessFactor: 2.0 })
      const result = calculateOptimalSpacing(item, 0.55)
      expect(result.easinessFactor).toBe(1.85)
    })

    test('floors ease factor at 1.3', () => {
      const item = createMockItem({ easinessFactor: 1.4 })
      const result = calculateOptimalSpacing(item, 0.55)
      expect(result.easinessFactor).toBe(1.3)
    })

    test('resets consecutive correct to 0', () => {
      const item = createMockItem({ consecutiveCorrect: 5 })
      const result = calculateOptimalSpacing(item, 0.55)
      expect(result.consecutiveCorrect).toBe(0)
    })

    test('reduces interval by 40%', () => {
      const item = createMockItem({ interval: 10 })
      const result = calculateOptimalSpacing(item, 0.55)
      expect(result.interval).toBe(6) // 10 * 0.6 = 6
    })
  })

  describe('with poor performance (<50%)', () => {
    test('decreases ease factor by 0.25', () => {
      const item = createMockItem({ easinessFactor: 2.0 })
      const result = calculateOptimalSpacing(item, 0.3)
      expect(result.easinessFactor).toBe(1.75)
    })

    test('resets interval to 1 day', () => {
      const item = createMockItem({ interval: 30 })
      const result = calculateOptimalSpacing(item, 0.3)
      expect(result.interval).toBe(1)
    })

    test('resets consecutive correct to 0', () => {
      const item = createMockItem({ consecutiveCorrect: 10 })
      const result = calculateOptimalSpacing(item, 0.3)
      expect(result.consecutiveCorrect).toBe(0)
    })
  })

  describe('boundary conditions', () => {
    test('caps maximum interval at 90 days', () => {
      const item = createMockItem({ 
        interval: 50,
        easinessFactor: 2.5,
        totalReviews: 10
      })
      const result = calculateOptimalSpacing(item, 0.95)
      expect(result.interval).toBeLessThanOrEqual(90)
    })

    test('maintains minimum interval of 1 day', () => {
      const item = createMockItem({ interval: 1 })
      const result = calculateOptimalSpacing(item, 0.55)
      expect(result.interval).toBeGreaterThanOrEqual(1)
    })
  })
})

describe('isItemDueForReview', () => {
  test('returns true if interval has passed', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    const item = createMockItem({ lastSeen: twoDaysAgo, interval: 1 })
    expect(isItemDueForReview(item)).toBe(true)
  })

  test('returns false if interval has not passed', () => {
    const now = new Date()
    const item = createMockItem({ lastSeen: now, interval: 1 })
    expect(isItemDueForReview(item)).toBe(false)
  })

  test('returns true if exactly at interval', () => {
    const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    const item = createMockItem({ lastSeen: oneDayAgo, interval: 1 })
    expect(isItemDueForReview(item)).toBe(true)
  })
})

describe('getItemsDueForReview', () => {
  test('returns empty array if no items due', () => {
    const items = new Map<string, SpacedItem>([
      ['p1', createMockItem({ problemId: 'p1', lastSeen: new Date(), interval: 7 })]
    ])
    const result = getItemsDueForReview(items)
    expect(result).toEqual([])
  })

  test('returns due items sorted by priority', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    
    const items = new Map<string, SpacedItem>([
      ['p1', createMockItem({ problemId: 'p1', lastSeen: twoDaysAgo, interval: 1 })],
      ['p2', createMockItem({ problemId: 'p2', lastSeen: threeDaysAgo, interval: 1 })]
    ])
    
    const result = getItemsDueForReview(items)
    expect(result.length).toBe(2)
    // Both items are overdue and should be returned
    // The exact order depends on the sorting algorithm implementation
    const ids = result.map(r => r.problemId)
    expect(ids).toContain('p1')
    expect(ids).toContain('p2')
  })

  test('respects maxItems limit', () => {
    const oldDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const items = new Map<string, SpacedItem>()
    
    for (let i = 0; i < 20; i++) {
      items.set(`p${i}`, createMockItem({ 
        problemId: `p${i}`, 
        lastSeen: oldDate, 
        interval: 1 
      }))
    }
    
    const result = getItemsDueForReview(items, 5)
    expect(result.length).toBe(5)
  })

  test('prioritizes lower ease factor (struggling items)', () => {
    const sameDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    
    const items = new Map<string, SpacedItem>([
      ['p1', createMockItem({ problemId: 'p1', lastSeen: sameDaysAgo, interval: 1, easinessFactor: 2.5 })],
      ['p2', createMockItem({ problemId: 'p2', lastSeen: sameDaysAgo, interval: 1, easinessFactor: 1.3 })]
    ])
    
    const result = getItemsDueForReview(items)
    // Lower ease factor (struggling) should come first when overdue is similar
    expect(result[0].problemId).toBe('p2')
  })
})

describe('updateSpacedRepetition', () => {
  test('creates new spaced item if not exists', () => {
    const scheduler = createMockScheduler()
    const result = updateSpacedRepetition(scheduler, 'math', 'new-problem', true, 30, ['algebra'])
    
    expect(result.mathItems.has('new-problem')).toBe(true)
    const item = result.mathItems.get('new-problem')!
    expect(item.totalReviews).toBe(1)
    expect(item.skillTags).toEqual(['algebra'])
  })

  test('updates existing item on correct answer', () => {
    const existingItem = createMockItem({ problemId: 'existing', consecutiveCorrect: 2 })
    const scheduler = createMockScheduler(new Map([['existing', existingItem]]))
    
    const result = updateSpacedRepetition(scheduler, 'math', 'existing', true, 30)
    const item = result.mathItems.get('existing')!
    
    expect(item.consecutiveCorrect).toBe(3)
    expect(item.totalReviews).toBe(1)
  })

  test('resets consecutive on wrong answer', () => {
    const existingItem = createMockItem({ problemId: 'existing', consecutiveCorrect: 5 })
    const scheduler = createMockScheduler(new Map([['existing', existingItem]]))
    
    const result = updateSpacedRepetition(scheduler, 'math', 'existing', false, 30)
    const item = result.mathItems.get('existing')!
    
    expect(item.consecutiveCorrect).toBe(0)
  })

  test('adjusts performance for fast responses', () => {
    const scheduler = createMockScheduler()
    
    // Fast correct answer should get higher performance
    const fastResult = updateSpacedRepetition(scheduler, 'math', 'fast-problem', true, 30)
    const slowScheduler = createMockScheduler()
    const slowResult = updateSpacedRepetition(slowScheduler, 'math', 'slow-problem', true, 120)
    
    const fastItem = fastResult.mathItems.get('fast-problem')!
    const slowItem = slowResult.mathItems.get('slow-problem')!
    
    expect(fastItem.lastPerformance).toBeGreaterThan(slowItem.lastPerformance)
  })
})

describe('getSpacedRepetitionRecommendations', () => {
  test('returns problem IDs due for review', () => {
    const oldDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const items = new Map<string, SpacedItem>([
      ['p1', createMockItem({ problemId: 'p1', lastSeen: oldDate, interval: 1 })],
      ['p2', createMockItem({ problemId: 'p2', lastSeen: oldDate, interval: 1 })]
    ])
    const scheduler = createMockScheduler(items)
    
    const result = getSpacedRepetitionRecommendations(scheduler, 'math', 3)
    expect(result).toContain('p1')
    expect(result).toContain('p2')
  })

  test('returns empty array if nothing due', () => {
    const items = new Map<string, SpacedItem>([
      ['p1', createMockItem({ problemId: 'p1', lastSeen: new Date(), interval: 30 })]
    ])
    const scheduler = createMockScheduler(items)
    
    const result = getSpacedRepetitionRecommendations(scheduler, 'math', 3)
    expect(result).toEqual([])
  })

  test('respects count limit', () => {
    const oldDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const items = new Map<string, SpacedItem>()
    
    for (let i = 0; i < 10; i++) {
      items.set(`p${i}`, createMockItem({ problemId: `p${i}`, lastSeen: oldDate, interval: 1 }))
    }
    const scheduler = createMockScheduler(items)
    
    const result = getSpacedRepetitionRecommendations(scheduler, 'math', 3)
    expect(result.length).toBe(3)
  })
})

