import { filterAndSortCohorts } from '../cohortUtils'
import { Cohort } from '@/lib/hooks/useCohortsData'

const mockCohorts: Cohort[] = [
  {
    id: '1',
    name: 'Spring Bootcamp',
    creatorId: 'user1',
    creatorName: 'John Doe',
    description: 'Learn web development',
    targetSize: 20,
    currentSize: 15,
    pricePerPerson: 500,
    totalCost: 10000,
    startDate: '2025-03-01',
    status: 'open',
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    name: 'Advanced React',
    creatorId: 'user2',
    creatorName: 'Jane Smith',
    description: 'Master React patterns',
    targetSize: 10,
    currentSize: 5,
    pricePerPerson: 1000,
    totalCost: 10000,
    startDate: '2025-02-15',
    status: 'open',
    createdAt: '2025-01-15',
  },
  {
    id: '3',
    name: 'Solo Intensive',
    creatorId: 'user3',
    creatorName: 'Bob Johnson',
    description: 'One-on-one mentoring',
    targetSize: 1,
    currentSize: 0,
    pricePerPerson: 10000,
    totalCost: 10000,
    startDate: '2025-02-01',
    status: 'open',
    createdAt: '2025-01-20',
  },
]

describe('cohortUtils', () => {
  describe('filterAndSortCohorts', () => {
    it('returns all cohorts with no filters', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'all', 'all', 'newest')
      expect(result).toHaveLength(3)
    })

    it('filters by search query (name)', () => {
      const result = filterAndSortCohorts(mockCohorts, 'react', 'all', 'all', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Advanced React')
    })

    it('filters by search query (description)', () => {
      const result = filterAndSortCohorts(mockCohorts, 'mentoring', 'all', 'all', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Solo Intensive')
    })

    it('filters by search query (creator name)', () => {
      const result = filterAndSortCohorts(mockCohorts, 'john', 'all', 'all', 'newest')
      expect(result).toHaveLength(2) // John Doe and Bob Johnson
    })

    it('filters by price range (low)', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'low', 'all', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].pricePerPerson).toBe(500)
    })

    it('filters by price range (medium)', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'medium', 'all', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].pricePerPerson).toBe(1000)
    })

    it('filters by price range (high)', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'high', 'all', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].pricePerPerson).toBe(10000)
    })

    it('filters by size (small)', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'all', 'small', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].targetSize).toBe(1)
    })

    it('filters by size (medium)', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'all', 'medium', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].targetSize).toBe(10)
    })

    it('filters by size (large)', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'all', 'large', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].targetSize).toBe(20)
    })

    it('sorts by newest', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'all', 'all', 'newest')
      expect(result[0].id).toBe('3') // Created 2025-01-20
      expect(result[1].id).toBe('2') // Created 2025-01-15
      expect(result[2].id).toBe('1') // Created 2025-01-01
    })

    it('sorts by starting soon', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'all', 'all', 'starting-soon')
      expect(result[0].id).toBe('3') // Starts 2025-02-01
      expect(result[1].id).toBe('2') // Starts 2025-02-15
      expect(result[2].id).toBe('1') // Starts 2025-03-01
    })

    it('sorts by spots left (descending)', () => {
      const result = filterAndSortCohorts(mockCohorts, '', 'all', 'all', 'spots-left')
      // Cohort 1: 20 - 15 = 5 spots
      // Cohort 2: 10 - 5 = 5 spots
      // Cohort 3: 1 - 0 = 1 spot
      // Should sort by most spots left first
      const spotsLeft = result.map(c => c.targetSize - c.currentSize)
      expect(spotsLeft[0]).toBeGreaterThanOrEqual(spotsLeft[1])
      expect(spotsLeft[1]).toBeGreaterThanOrEqual(spotsLeft[2])
      expect(result[2].id).toBe('3') // Least spots (1)
    })

    it('combines multiple filters', () => {
      const result = filterAndSortCohorts(mockCohorts, 'react', 'medium', 'medium', 'newest')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Advanced React')
    })

    it('returns empty array when no matches', () => {
      const result = filterAndSortCohorts(mockCohorts, 'nonexistent', 'all', 'all', 'newest')
      expect(result).toHaveLength(0)
    })
  })
})
