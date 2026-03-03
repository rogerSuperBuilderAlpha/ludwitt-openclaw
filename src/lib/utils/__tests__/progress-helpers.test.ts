import {
  calculateTotalXP,
  calculateTotalCompleted,
  calculateTotalCorrect,
  getMaxStreak,
  calculateAverageAccuracy,
} from '../progress-helpers'

describe('calculateTotalXP', () => {
  it('sums XP from both subjects', () => {
    expect(calculateTotalXP({ totalXP: 100 }, { totalXP: 200 })).toBe(300)
  })

  it('handles zero XP', () => {
    expect(calculateTotalXP({ totalXP: 0 }, { totalXP: 0 })).toBe(0)
  })

  it('handles missing totalXP with fallback to 0', () => {
    expect(calculateTotalXP({}, { totalXP: 50 })).toBe(50)
    expect(calculateTotalXP({ totalXP: 50 }, {})).toBe(50)
    expect(calculateTotalXP({}, {})).toBe(0)
  })

  it('handles undefined totalXP', () => {
    expect(
      calculateTotalXP({ totalXP: undefined }, { totalXP: undefined })
    ).toBe(0)
    expect(calculateTotalXP({ totalXP: undefined }, { totalXP: 100 })).toBe(100)
  })

  it('handles large XP values', () => {
    expect(calculateTotalXP({ totalXP: 99999 }, { totalXP: 1 })).toBe(100000)
  })
})

describe('calculateTotalCompleted', () => {
  it('sums completed problems from both subjects', () => {
    expect(
      calculateTotalCompleted({ totalCompleted: 50 }, { totalCompleted: 30 })
    ).toBe(80)
  })

  it('handles missing totalCompleted', () => {
    expect(calculateTotalCompleted({}, { totalCompleted: 30 })).toBe(30)
    expect(calculateTotalCompleted({ totalCompleted: 50 }, {})).toBe(50)
    expect(calculateTotalCompleted({}, {})).toBe(0)
  })

  it('handles zero completed', () => {
    expect(
      calculateTotalCompleted({ totalCompleted: 0 }, { totalCompleted: 0 })
    ).toBe(0)
  })

  it('handles undefined totalCompleted', () => {
    expect(
      calculateTotalCompleted(
        { totalCompleted: undefined },
        { totalCompleted: undefined }
      )
    ).toBe(0)
  })
})

describe('calculateTotalCorrect', () => {
  it('sums correct answers from both subjects', () => {
    expect(
      calculateTotalCorrect({ totalCorrect: 40 }, { totalCorrect: 25 })
    ).toBe(65)
  })

  it('handles missing totalCorrect', () => {
    expect(calculateTotalCorrect({}, { totalCorrect: 25 })).toBe(25)
    expect(calculateTotalCorrect({ totalCorrect: 40 }, {})).toBe(40)
    expect(calculateTotalCorrect({}, {})).toBe(0)
  })

  it('handles zero correct', () => {
    expect(
      calculateTotalCorrect({ totalCorrect: 0 }, { totalCorrect: 0 })
    ).toBe(0)
  })

  it('handles undefined totalCorrect', () => {
    expect(
      calculateTotalCorrect(
        { totalCorrect: undefined },
        { totalCorrect: undefined }
      )
    ).toBe(0)
  })
})

describe('getMaxStreak', () => {
  it('returns the higher streak', () => {
    expect(getMaxStreak({ currentStreak: 5 }, { currentStreak: 10 })).toBe(10)
    expect(getMaxStreak({ currentStreak: 10 }, { currentStreak: 5 })).toBe(10)
  })

  it('returns the streak when both are equal', () => {
    expect(getMaxStreak({ currentStreak: 7 }, { currentStreak: 7 })).toBe(7)
  })

  it('handles missing currentStreak', () => {
    expect(getMaxStreak({}, { currentStreak: 5 })).toBe(5)
    expect(getMaxStreak({ currentStreak: 5 }, {})).toBe(5)
    expect(getMaxStreak({}, {})).toBe(0)
  })

  it('handles zero streak', () => {
    expect(getMaxStreak({ currentStreak: 0 }, { currentStreak: 0 })).toBe(0)
  })

  it('handles undefined currentStreak', () => {
    expect(
      getMaxStreak({ currentStreak: undefined }, { currentStreak: undefined })
    ).toBe(0)
  })
})

describe('calculateAverageAccuracy', () => {
  it('calculates the average of both accuracy rates', () => {
    expect(
      calculateAverageAccuracy({ accuracyRate: 80 }, { accuracyRate: 60 })
    ).toBe(70)
    expect(
      calculateAverageAccuracy({ accuracyRate: 100 }, { accuracyRate: 100 })
    ).toBe(100)
  })

  it('handles missing accuracyRate with fallback to 0', () => {
    expect(calculateAverageAccuracy({}, { accuracyRate: 80 })).toBe(40)
    expect(calculateAverageAccuracy({ accuracyRate: 80 }, {})).toBe(40)
    expect(calculateAverageAccuracy({}, {})).toBe(0)
  })

  it('handles zero accuracy', () => {
    expect(
      calculateAverageAccuracy({ accuracyRate: 0 }, { accuracyRate: 0 })
    ).toBe(0)
  })

  it('handles undefined accuracyRate', () => {
    expect(
      calculateAverageAccuracy(
        { accuracyRate: undefined },
        { accuracyRate: undefined }
      )
    ).toBe(0)
  })

  it('handles decimal accuracy rates', () => {
    expect(
      calculateAverageAccuracy({ accuracyRate: 0.75 }, { accuracyRate: 0.85 })
    ).toBe(0.8)
  })

  it('always divides by 2 regardless of zeroes', () => {
    // Even when one subject has 0 accuracy, it still averages over 2
    expect(
      calculateAverageAccuracy({ accuracyRate: 100 }, { accuracyRate: 0 })
    ).toBe(50)
  })
})
