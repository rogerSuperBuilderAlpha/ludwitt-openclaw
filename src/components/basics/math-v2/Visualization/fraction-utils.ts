/**
 * Fraction Utility Functions & Types
 *
 * Shared types and pure helper functions used by FractionVisual
 * and its sub-components (FractionBar, FractionPie, etc.).
 */

// ============================================================================
// Types
// ============================================================================

export interface FractionData {
  numerator: number
  denominator: number
  label?: string
  color?: string
  showLabel?: boolean
}

export interface FractionComparisonData {
  fraction1: FractionData
  fraction2: FractionData
  showComparison?: boolean
}

export type FractionVisualizationType = 'bar' | 'pie' | 'comparison'

// ============================================================================
// Color Constants
// ============================================================================

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  filled: 'rgba(59, 130, 246, 0.7)',
  filledSecondary: 'rgba(16, 185, 129, 0.7)',
  empty: 'rgba(59, 130, 246, 0.15)',
  emptySecondary: 'rgba(16, 185, 129, 0.15)',
  border: '#3b82f6',
  borderSecondary: '#10b981',
  text: '#0b1d39',
  textMuted: '#4a5568',
  divider: 'rgba(0, 0, 0, 0.2)',
}

// ============================================================================
// Utility Functions
// ============================================================================

export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg - 90) * Math.PI / 180
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}

export function describeSlice(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

  return [
    'M', cx, cy,
    'L', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
    'Z',
  ].join(' ')
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export function simplifyFraction(num: number, den: number): { numerator: number; denominator: number } {
  const divisor = gcd(Math.abs(num), Math.abs(den))
  return {
    numerator: num / divisor,
    denominator: den / divisor,
  }
}

export function fractionToDecimal(num: number, den: number): number {
  return den === 0 ? 0 : num / den
}

export function compareFractions(f1: FractionData, f2: FractionData): '<' | '>' | '=' {
  const v1 = fractionToDecimal(f1.numerator, f1.denominator)
  const v2 = fractionToDecimal(f2.numerator, f2.denominator)
  if (Math.abs(v1 - v2) < 0.0001) return '='
  return v1 < v2 ? '<' : '>'
}
