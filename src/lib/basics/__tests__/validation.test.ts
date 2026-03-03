import { normalizeMathAnswer, areNumbersEqual, parseMathValue, validateMathAnswer } from '../validation'

describe('math validation helpers', () => {
  test('normalizeMathAnswer removes spaces, commas, leading plus', () => {
    expect(normalizeMathAnswer(' +1,234 ')).toBe('1234')
  })

  test('areNumbersEqual within tolerance', () => {
    // Default tolerance is 0.0001
    expect(areNumbersEqual(1.0, 1.00005)).toBe(true)
    expect(areNumbersEqual(1.0, 1.005)).toBe(false)
  })

  test('parseMathValue supports integers, decimals', () => {
    expect(parseMathValue('42')).toBe(42)
    expect(parseMathValue('3.14')).toBeCloseTo(3.14)
  })

  test('parseMathValue supports fractions', () => {
    expect(parseMathValue('3/4')).toBeCloseTo(0.75)
    expect(parseMathValue('-2/5')).toBeCloseTo(-0.4)
  })

  test('parseMathValue supports mixed numbers', () => {
    expect(parseMathValue('1 1/2')).toBeCloseTo(1.5)
    expect(parseMathValue('-3 2/3')).toBeCloseTo(-3.6666667)
  })

  test('parseMathValue supports percentages', () => {
    expect(parseMathValue('50%')).toBe(0.5)
    expect(parseMathValue('-25%')).toBe(-0.25)
  })

  test('validateMathAnswer exact match', async () => {
    const res = await validateMathAnswer('12', '12')
    expect(res.correct).toBe(true)
  })

  test('validateMathAnswer numeric tolerance match', async () => {
    const res = await validateMathAnswer('1', '1.00005')
    expect(res.correct).toBe(true)
  })

  test('validateMathAnswer fraction equivalence', async () => {
    const res = await validateMathAnswer('0.5', '1/2')
    expect(res.correct).toBe(true)
  })

  test('validateMathAnswer mixed number equivalence', async () => {
    const res = await validateMathAnswer('1.5', '1 1/2')
    expect(res.correct).toBe(true)
  })

  test('validateMathAnswer percentage equivalence', async () => {
    const res = await validateMathAnswer('0.25', '25%')
    expect(res.correct).toBe(true)
  })
})


