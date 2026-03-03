import { combineArrays, getUnique, filterByDateRange } from '../array-helpers'

describe('combineArrays', () => {
  it('should combine multiple arrays into one', () => {
    expect(combineArrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
  })

  it('should handle a single array', () => {
    expect(combineArrays([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should handle three or more arrays', () => {
    expect(combineArrays([1], [2], [3], [4])).toEqual([1, 2, 3, 4])
  })

  it('should skip null values', () => {
    expect(combineArrays([1, 2], null, [3, 4])).toEqual([1, 2, 3, 4])
  })

  it('should skip undefined values', () => {
    expect(combineArrays([1, 2], undefined, [3, 4])).toEqual([1, 2, 3, 4])
  })

  it('should handle all null/undefined', () => {
    expect(combineArrays(null, undefined, null)).toEqual([])
  })

  it('should return an empty array when called with no arguments', () => {
    expect(combineArrays()).toEqual([])
  })

  it('should handle empty arrays', () => {
    expect(combineArrays([], [], [])).toEqual([])
  })

  it('should handle mixed empty and non-empty arrays', () => {
    expect(combineArrays([], [1], null, [2, 3], undefined, [])).toEqual([
      1, 2, 3,
    ])
  })

  it('should work with string arrays', () => {
    expect(combineArrays(['a', 'b'], ['c'])).toEqual(['a', 'b', 'c'])
  })

  it('should work with object arrays', () => {
    const a = { id: 1 }
    const b = { id: 2 }
    expect(combineArrays([a], [b])).toEqual([a, b])
  })
})

describe('getUnique', () => {
  it('should remove duplicate numbers', () => {
    expect(getUnique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
  })

  it('should remove duplicate strings', () => {
    expect(getUnique(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c'])
  })

  it('should return an empty array for empty input', () => {
    expect(getUnique([])).toEqual([])
  })

  it('should return the same array if all elements are unique', () => {
    expect(getUnique([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should preserve insertion order', () => {
    expect(getUnique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
  })

  it('should handle a single element', () => {
    expect(getUnique([42])).toEqual([42])
  })

  it('should not deduplicate objects by value (reference equality)', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 1 }
    const result = getUnique([obj1, obj2])
    expect(result).toHaveLength(2)
  })

  it('should deduplicate same object references', () => {
    const obj = { id: 1 }
    expect(getUnique([obj, obj, obj])).toEqual([obj])
  })
})

describe('filterByDateRange', () => {
  const startDate = new Date('2024-01-01')
  const endDate = new Date('2024-12-31')

  it('should filter items with Date timestamps within range', () => {
    const items = [
      { id: 1, timestamp: new Date('2024-06-15') },
      { id: 2, timestamp: new Date('2023-06-15') },
      { id: 3, timestamp: new Date('2025-06-15') },
    ]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([items[0]])
  })

  it('should filter items with string timestamps', () => {
    const items = [
      { id: 1, timestamp: '2024-03-01' },
      { id: 2, timestamp: '2023-03-01' },
    ]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([items[0]])
  })

  it('should filter items with numeric timestamps (epoch ms)', () => {
    const withinRange = new Date('2024-06-15').getTime()
    const outsideRange = new Date('2023-06-15').getTime()
    const items = [
      { id: 1, timestamp: withinRange },
      { id: 2, timestamp: outsideRange },
    ]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([items[0]])
  })

  it('should include items exactly on the start date', () => {
    const items = [{ id: 1, timestamp: new Date('2024-01-01') }]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([items[0]])
  })

  it('should include items exactly on the end date', () => {
    const items = [{ id: 1, timestamp: new Date('2024-12-31') }]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([items[0]])
  })

  it('should exclude items with no timestamp', () => {
    const items = [{ id: 1 }, { id: 2, timestamp: undefined }]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([])
  })

  it('should exclude items with invalid date strings', () => {
    const items = [{ id: 1, timestamp: 'not-a-date' }]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([])
  })

  it('should return an empty array for empty input', () => {
    const result = filterByDateRange([], startDate, endDate)
    expect(result).toEqual([])
  })

  it('should use custom getTimestamp function when provided', () => {
    const items = [
      { id: 1, timestamp: undefined, createdAt: new Date('2024-05-01') },
      { id: 2, timestamp: undefined, createdAt: new Date('2023-05-01') },
    ]
    const result = filterByDateRange(
      items,
      startDate,
      endDate,
      (item) => item.createdAt
    )
    expect(result).toEqual([items[0]])
  })

  it('should handle getTimestamp returning undefined', () => {
    const items = [{ id: 1, timestamp: undefined }]
    const result = filterByDateRange(items, startDate, endDate, () => undefined)
    expect(result).toEqual([])
  })

  it('should handle all items within range', () => {
    const items = [
      { id: 1, timestamp: new Date('2024-02-01') },
      { id: 2, timestamp: new Date('2024-06-01') },
      { id: 3, timestamp: new Date('2024-11-01') },
    ]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual(items)
  })

  it('should handle all items outside range', () => {
    const items = [
      { id: 1, timestamp: new Date('2023-02-01') },
      { id: 2, timestamp: new Date('2025-06-01') },
    ]
    const result = filterByDateRange(items, startDate, endDate)
    expect(result).toEqual([])
  })
})
