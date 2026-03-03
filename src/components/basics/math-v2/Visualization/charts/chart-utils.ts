/**
 * Chart Utilities
 *
 * Shared types, constants, and helper functions used across
 * all statistics chart sub-components (BarChart, PieChart, BoxPlot, Histogram).
 */

// ============================================================================
// Types
// ============================================================================

export interface BarChartData {
  label: string
  value: number
  color?: string
}

export interface PieChartData {
  label: string
  value: number
  color?: string
}

export interface BoxPlotData {
  min: number
  q1: number
  median: number
  q3: number
  max: number
  outliers?: number[]
  label?: string
}

export interface HistogramData {
  bins: { start: number; end: number; count: number }[]
  binWidth?: number
}

// ============================================================================
// Color Constants
// ============================================================================

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  error: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  text: '#0b1d39',
  textMuted: '#4a5568',
  textLight: '#718096',
  axis: '#374151',
  grid: '#e5e7eb',
  background: '#fffcf5',
}

export const CHART_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
]

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

export function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
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

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  if (Number.isInteger(n)) return String(n)
  return n.toFixed(1)
}
