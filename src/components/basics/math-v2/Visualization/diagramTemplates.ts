/**
 * DiagramTemplates
 *
 * Factory helpers that produce DiagramV2 configs for special diagram
 * types (number line, table, Venn).  Also re-exports the template
 * helpers from Geometry, Statistics, and Fraction sub-systems.
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { GeometryTemplates } from './GeometryDiagram'
import { StatisticsTemplates } from './StatisticsChart'
import { FractionTemplates } from './FractionVisual'
import { DIAGRAM_COLORS } from './diagramConstants'

export const DiagramTemplates = {
  geometry: GeometryTemplates,
  statistics: StatisticsTemplates,
  fraction: FractionTemplates,

  /**
   * Create a number line diagram
   */
  numberLine: (
    min: number,
    max: number,
    options?: {
      step?: number
      points?: Array<{ value: number; label?: string; color?: string }>
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'number-line',
    width: options?.width || 400,
    height: options?.height || 100,
    description: `Number line from ${min} to ${max}`,
    elements: (options?.points || []).map((p, i) => ({
      type: 'point' as const,
      id: `point-${i}`,
      props: {
        value: p.value,
        fill: p.color || DIAGRAM_COLORS.error,
      },
      label: p.label || String(p.value),
    })),
    labels: {
      min: String(min),
      max: String(max),
      step: String(options?.step || 1),
    },
  }),

  /**
   * Create a table diagram
   */
  table: (
    headers: string[],
    rows: string[][],
    options?: {
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'table',
    width: options?.width || 400,
    height: options?.height || 40 + rows.length * 30,
    description: `Table with ${headers.length} columns and ${rows.length} rows`,
    elements: rows.map((row, i) => ({
      type: 'text' as const,
      id: `row-${i}`,
      props: {
        row: i,
        cells: row.join(','),
      },
    })),
    labels: {
      headers: headers.join(','),
    },
  }),

  /**
   * Create a Venn diagram
   */
  venn: (
    set1: { label: string; only?: string },
    set2: { label: string; only?: string },
    intersection?: string,
    options?: {
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'venn',
    width: options?.width || 400,
    height: options?.height || 300,
    description: `Venn diagram comparing ${set1.label} and ${set2.label}`,
    elements: [
      { type: 'circle' as const, id: 'set1', props: {}, label: set1.label },
      { type: 'circle' as const, id: 'set2', props: {}, label: set2.label },
    ],
    labels: {
      set1: set1.label,
      set2: set2.label,
      only1: set1.only || '',
      only2: set2.only || '',
      intersection: intersection || '',
    },
  }),
}
