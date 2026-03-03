/**
 * Geometry Utility Functions
 * 
 * Shared mathematical utilities for geometry diagram rendering.
 * Extracted from GeometryDiagram.tsx for reusability and maintainability.
 */

export interface Point {
  x: number
  y: number
}

/**
 * Convert polar coordinates to cartesian
 */
export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): Point {
  const angleRad = (angleDeg - 90) * Math.PI / 180
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad)
  }
}

/**
 * Calculate distance between two points
 */
export function distance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

/**
 * Calculate midpoint between two points
 */
export function midpoint(p1: Point, p2: Point): Point {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  }
}

/**
 * Calculate angle between two points in degrees
 */
export function angleBetween(p1: Point, p2: Point): number {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
}

/**
 * Rotate a point around an origin by a given angle (in degrees)
 */
export function rotatePoint(point: Point, origin: Point, angleDeg: number): Point {
  const rad = angleDeg * Math.PI / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const dx = point.x - origin.x
  const dy = point.y - origin.y
  return {
    x: origin.x + dx * cos - dy * sin,
    y: origin.y + dx * sin + dy * cos
  }
}

/**
 * Calculate the centroid of a polygon
 */
export function centroid(points: Point[]): Point {
  const n = points.length
  if (n === 0) return { x: 0, y: 0 }
  
  const sum = points.reduce((acc, p) => ({
    x: acc.x + p.x,
    y: acc.y + p.y
  }), { x: 0, y: 0 })
  
  return {
    x: sum.x / n,
    y: sum.y / n
  }
}

/**
 * Calculate perpendicular offset from a line
 */
export function perpendicularOffset(p1: Point, p2: Point, offset: number): { start: Point; end: Point } {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const length = Math.sqrt(dx * dx + dy * dy)
  const nx = -dy / length * offset
  const ny = dx / length * offset
  
  return {
    start: { x: p1.x + nx, y: p1.y + ny },
    end: { x: p2.x + nx, y: p2.y + ny }
  }
}

// Color constants for consistent styling
export const GEOMETRY_COLORS = {
  primary: '#3b82f6',      // Blue - main shapes
  secondary: '#10b981',    // Green - secondary elements
  accent: '#f59e0b',       // Amber - highlights
  error: '#ef4444',        // Red - angles
  text: '#0b1d39',         // Navy - text
  textMuted: '#4a5568',    // Gray - secondary text
  grid: '#e5e7eb',         // Light gray - grid
  gridStrong: '#d1d5db',   // Stronger grid lines
  fill: 'rgba(59, 130, 246, 0.1)',
  fillSecondary: 'rgba(16, 185, 129, 0.1)',
}
