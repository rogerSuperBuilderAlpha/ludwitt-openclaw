import { combineArrays, getUnique, filterByDateRange } from '../array-helpers'

describe('combineArrays', () => {
  it('combines multiple arrays', () => {
    expect(combineArrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
  })

  it('handles null and undefined arrays', () => {
    expect(combineArrays([1], null, [2], undefined, [3])).toEqual([1, 2, 3])
  })

  it('returns empty array when all inputs are null', () => {
    expect(combineArrays(null, undefined)).toEqual([])
  })

  it('returns empty array with no arguments', () => {
    expect(combineArrays()).toEqual([])
  })

  it('handles single array', () => {
    expect(combineArrays([1, 2, 3])).toEqual([1, 2, 3])
  })
})

describe('getUnique', () => {
  it('removes duplicate values', () => {
    expect(getUnique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
  })

  it('preserves order of first occurrence', () => {
    expect(getUnique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
  })

  it('handles empty array', () => {
    expect(getUnique([])).toEqual([])
  })

  it('works with strings', () => {
    expect(getUnique(['a', 'b', 'a'])).toEqual(['a', 'b'])
  })
})

describe('filterByDateRange', () => {
  const items = [
    { timestamp: new Date('2026-01-01'), value: 'a' },
    { timestamp: new Date('2026-02-15'), value: 'b' },
    { timestamp: new Date('2026-03-01'), value: 'c' },
    { timestamp: new Date('2026-04-01'), value: 'd' },
  ]

  it('filters items within date range', () => {
    const result = filterByDateRange(
      items,
      new Date('2026-02-01'),
      new Date('2026-03-15')
    )
    expect(result).toHaveLength(2)
    expect(result[0].value).toBe('b')
    expect(result[1].value).toBe('c')
  })

  it('includes boundary dates', () => {
    const result = filterByDateRange(
      items,
      new Date('2026-01-01'),
      new Date('2026-01-01')
    )
    expect(result).toHaveLength(1)
    expect(result[0].value).toBe('a')
  })

  it('returns empty array when no items match', () => {
    const result = filterByDateRange(
      items,
      new Date('2025-01-01'),
      new Date('2025-12-31')
    )
    expect(result).toEqual([])
  })

  it('uses custom timestamp extractor', () => {
    const customItems = [
      { created: '2026-02-15', name: 'x' },
      { created: '2026-05-01', name: 'y' },
    ]
    const result = filterByDateRange(
      customItems,
      new Date('2026-01-01'),
      new Date('2026-03-01'),
      (item) => item.created
    )
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('x')
  })

  it('excludes items with missing timestamps', () => {
    const itemsWithMissing = [
      { value: 'no-timestamp' },
      { timestamp: new Date('2026-02-15'), value: 'has-timestamp' },
    ]
    const result = filterByDateRange(
      itemsWithMissing,
      new Date('2026-01-01'),
      new Date('2026-12-31')
    )
    expect(result).toHaveLength(1)
    expect(result[0].value).toBe('has-timestamp')
  })
})
