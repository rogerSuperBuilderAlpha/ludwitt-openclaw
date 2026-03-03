/**
 * Shared constants and utilities for DiagramRenderer sub-components.
 *
 * Contains color tokens, diagram-type categorization, and shared types
 * used across all special-type diagram renderers (NumberLine, Table,
 * Venn, CustomSVG, Fallback).
 */

import { DiagramTypeV2 } from '@/lib/types/math-v2'

// ============================================================================
// Color Constants
// ============================================================================

export const DIAGRAM_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  error: '#ef4444',
  text: '#0b1d39',
  textMuted: '#4a5568',
  axis: '#374151',
  grid: '#e5e7eb',
} as const

// ============================================================================
// SVG Container Styles
// ============================================================================

/** Common inline styles applied to the outer SVG element of each diagram. */
export const SVG_CONTAINER_STYLE: React.CSSProperties = {
  maxWidth: '100%',
  height: 'auto',
  background: 'var(--b-bg-card, #fffcf5)',
  borderRadius: '8px',
  border: '1px solid var(--b-border-default, rgba(11, 29, 57, 0.10))',
}

// ============================================================================
// Type Categorization
// ============================================================================

const GEOMETRY_TYPES: DiagramTypeV2[] = [
  'geometry',
  'coordinate-plane',
  'unit-circle',
  'grid',
]

const STATISTICS_TYPES: DiagramTypeV2[] = [
  'bar-chart',
  'pie-chart',
  'box-plot',
  'histogram',
  'scatter-plot',
]

const FRACTION_TYPES: DiagramTypeV2[] = [
  'bar-model',
]

export function categorizeDiagramType(
  type: DiagramTypeV2
): 'geometry' | 'statistics' | 'fraction' | 'special' {
  if (GEOMETRY_TYPES.includes(type)) return 'geometry'
  if (STATISTICS_TYPES.includes(type)) return 'statistics'
  if (FRACTION_TYPES.includes(type)) return 'fraction'
  return 'special'
}
