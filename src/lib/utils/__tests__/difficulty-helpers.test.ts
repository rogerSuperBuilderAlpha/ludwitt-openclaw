import {
  getDifficultyLevel,
  isWithinDifficultyBand,
  isBelowDifficulty,
  isAboveDifficulty,
  getDifficultyDistance,
  sortByDifficultyRelevance,
} from '../difficulty-helpers'

describe('getDifficultyLevel', () => {
  it('returns the floored integer of a difficulty value', () => {
    expect(getDifficultyLevel(3.7)).toBe(3)
    expect(getDifficultyLevel(5.0)).toBe(5)
    expect(getDifficultyLevel(0.9)).toBe(0)
    expect(getDifficultyLevel(1.0)).toBe(1)
  })

  it('handles integer inputs', () => {
    expect(getDifficultyLevel(4)).toBe(4)
    expect(getDifficultyLevel(0)).toBe(0)
  })

  it('handles negative values', () => {
    expect(getDifficultyLevel(-1.5)).toBe(-2)
  })
})

describe('isWithinDifficultyBand', () => {
  it('returns true when difficulty is within the default band (1.5)', () => {
    expect(isWithinDifficultyBand(5.0, 5.0)).toBe(true)
    expect(isWithinDifficultyBand(4.0, 5.0)).toBe(true)
    expect(isWithinDifficultyBand(6.0, 5.0)).toBe(true)
    expect(isWithinDifficultyBand(3.5, 5.0)).toBe(true) // exactly 1.5 away
    expect(isWithinDifficultyBand(6.5, 5.0)).toBe(true) // exactly 1.5 away
  })

  it('returns false when difficulty is outside the default band', () => {
    expect(isWithinDifficultyBand(3.4, 5.0)).toBe(false) // 1.6 away
    expect(isWithinDifficultyBand(6.6, 5.0)).toBe(false) // 1.6 away
    expect(isWithinDifficultyBand(0, 5.0)).toBe(false)
    expect(isWithinDifficultyBand(10, 5.0)).toBe(false)
  })

  it('supports custom bandwidth', () => {
    expect(isWithinDifficultyBand(3.0, 5.0, 2.0)).toBe(true) // exactly 2.0 away
    expect(isWithinDifficultyBand(2.9, 5.0, 2.0)).toBe(false) // 2.1 away
    expect(isWithinDifficultyBand(5.0, 5.0, 0.0)).toBe(true) // exact match, band 0
    expect(isWithinDifficultyBand(5.1, 5.0, 0.0)).toBe(false) // tiny difference, band 0
  })
})

describe('isBelowDifficulty', () => {
  it('returns true when difficulty is below target minus threshold (default 1.5)', () => {
    expect(isBelowDifficulty(3.0, 5.0)).toBe(true) // 3.0 < 5.0 - 1.5 = 3.5
    expect(isBelowDifficulty(1.0, 5.0)).toBe(true)
  })

  it('returns false when difficulty is not sufficiently below target', () => {
    expect(isBelowDifficulty(3.5, 5.0)).toBe(false) // 3.5 is not < 3.5
    expect(isBelowDifficulty(4.0, 5.0)).toBe(false)
    expect(isBelowDifficulty(5.0, 5.0)).toBe(false)
    expect(isBelowDifficulty(6.0, 5.0)).toBe(false)
  })

  it('supports custom threshold', () => {
    expect(isBelowDifficulty(2.9, 5.0, 2.0)).toBe(true) // 2.9 < 5.0 - 2.0 = 3.0
    expect(isBelowDifficulty(3.0, 5.0, 2.0)).toBe(false) // 3.0 is not < 3.0
  })
})

describe('isAboveDifficulty', () => {
  it('returns true when difficulty is above target plus threshold (default 1.5)', () => {
    expect(isAboveDifficulty(7.0, 5.0)).toBe(true) // 7.0 > 5.0 + 1.5 = 6.5
    expect(isAboveDifficulty(10.0, 5.0)).toBe(true)
  })

  it('returns false when difficulty is not sufficiently above target', () => {
    expect(isAboveDifficulty(6.5, 5.0)).toBe(false) // 6.5 is not > 6.5
    expect(isAboveDifficulty(6.0, 5.0)).toBe(false)
    expect(isAboveDifficulty(5.0, 5.0)).toBe(false)
    expect(isAboveDifficulty(3.0, 5.0)).toBe(false)
  })

  it('supports custom threshold', () => {
    expect(isAboveDifficulty(7.1, 5.0, 2.0)).toBe(true) // 7.1 > 5.0 + 2.0 = 7.0
    expect(isAboveDifficulty(7.0, 5.0, 2.0)).toBe(false) // 7.0 is not > 7.0
  })
})

describe('getDifficultyDistance', () => {
  it('returns absolute distance between difficulty and target', () => {
    expect(getDifficultyDistance(5.0, 5.0)).toBe(0)
    expect(getDifficultyDistance(3.0, 5.0)).toBe(2)
    expect(getDifficultyDistance(7.0, 5.0)).toBe(2)
    expect(getDifficultyDistance(0, 10)).toBe(10)
  })

  it('always returns non-negative value', () => {
    expect(getDifficultyDistance(1, 5)).toBeGreaterThanOrEqual(0)
    expect(getDifficultyDistance(5, 1)).toBeGreaterThanOrEqual(0)
  })
})

describe('sortByDifficultyRelevance', () => {
  it('sorts problems by proximity to target difficulty', () => {
    const problems = [
      { difficulty: 1.0, id: 'far-below' },
      { difficulty: 5.0, id: 'exact' },
      { difficulty: 4.0, id: 'close-below' },
      { difficulty: 9.0, id: 'far-above' },
      { difficulty: 6.0, id: 'close-above' },
    ]
    const sorted = sortByDifficultyRelevance(problems, 5.0)
    expect(sorted[0].id).toBe('exact')
    // distance 1.0 items next: close-above (6.0) and close-below (4.0)
    // On ties, prefers higher difficulty, so close-above before close-below
    expect(sorted[1].id).toBe('close-above')
    expect(sorted[2].id).toBe('close-below')
    // distance 4.0: far-above before far-below (higher difficulty preferred on tie)
    expect(sorted[3].id).toBe('far-above')
    expect(sorted[4].id).toBe('far-below')
  })

  it('does not mutate the original array', () => {
    const problems = [
      { difficulty: 3.0 },
      { difficulty: 1.0 },
      { difficulty: 5.0 },
    ]
    const original = [...problems]
    sortByDifficultyRelevance(problems, 3.0)
    expect(problems).toEqual(original)
  })

  it('returns empty array for empty input', () => {
    expect(sortByDifficultyRelevance([], 5.0)).toEqual([])
  })

  it('handles single item', () => {
    const problems = [{ difficulty: 3.0 }]
    const sorted = sortByDifficultyRelevance(problems, 5.0)
    expect(sorted).toHaveLength(1)
    expect(sorted[0].difficulty).toBe(3.0)
  })

  it('prefers higher difficulty on ties (encourages growth)', () => {
    const problems = [
      { difficulty: 3.0, id: 'lower' },
      { difficulty: 7.0, id: 'higher' },
    ]
    // Both are distance 2.0 from target 5.0
    const sorted = sortByDifficultyRelevance(problems, 5.0)
    expect(sorted[0].id).toBe('higher')
    expect(sorted[1].id).toBe('lower')
  })
})
