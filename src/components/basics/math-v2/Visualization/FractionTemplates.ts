/**
 * Fraction Visual Templates
 *
 * Factory helpers that produce DiagramV2 configs for common fraction
 * visualizations (bar, pie, comparison, equivalent fractions).
 */

import { DiagramV2 } from '@/lib/types/math-v2'

export const FractionTemplates = {
  /**
   * Create a fraction bar visualization
   */
  bar: (
    numerator: number,
    denominator: number,
    options?: {
      label?: string
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'bar-model',
    width: options?.width || 400,
    height: options?.height || 120,
    description: `Fraction bar showing ${numerator}/${denominator}`,
    elements: [
      {
        type: 'rectangle' as const,
        id: 'fraction',
        props: {
          numerator,
          denominator,
          showLabel: true,
        },
        label: options?.label,
      },
    ],
  }),

  /**
   * Create a fraction pie visualization
   */
  pie: (
    numerator: number,
    denominator: number,
    options?: {
      label?: string
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'pie-chart',
    width: options?.width || 300,
    height: options?.height || 250,
    description: `Fraction pie showing ${numerator}/${denominator}`,
    elements: [
      {
        type: 'arc' as const,
        id: 'fraction',
        props: {
          numerator,
          denominator,
          showLabel: true,
        },
        label: options?.label,
      },
    ],
  }),

  /**
   * Create a fraction comparison visualization (bar style)
   */
  compareBar: (
    fraction1: { numerator: number; denominator: number },
    fraction2: { numerator: number; denominator: number },
    options?: {
      width?: number
      height?: number
      showComparison?: boolean
    }
  ): DiagramV2 => ({
    type: 'bar-model',
    width: options?.width || 500,
    height: options?.height || 150,
    description: `Comparing ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator}`,
    elements: [
      {
        type: 'rectangle' as const,
        id: 'fraction1',
        props: {
          numerator: fraction1.numerator,
          denominator: fraction1.denominator,
        },
      },
      {
        type: 'rectangle' as const,
        id: 'fraction2',
        props: {
          numerator: fraction2.numerator,
          denominator: fraction2.denominator,
        },
      },
    ],
    labels: {
      showComparison: String(options?.showComparison ?? true),
    },
  }),

  /**
   * Create a fraction comparison visualization (pie style)
   */
  comparePie: (
    fraction1: { numerator: number; denominator: number },
    fraction2: { numerator: number; denominator: number },
    options?: {
      width?: number
      height?: number
      showComparison?: boolean
    }
  ): DiagramV2 => ({
    type: 'pie-chart',
    width: options?.width || 500,
    height: options?.height || 250,
    description: `Comparing ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator}`,
    elements: [
      {
        type: 'arc' as const,
        id: 'fraction1',
        props: {
          numerator: fraction1.numerator,
          denominator: fraction1.denominator,
        },
      },
      {
        type: 'arc' as const,
        id: 'fraction2',
        props: {
          numerator: fraction2.numerator,
          denominator: fraction2.denominator,
        },
      },
    ],
    labels: {
      showComparison: String(options?.showComparison ?? true),
    },
  }),

  /**
   * Create an equivalent fractions visualization
   */
  equivalent: (
    fractions: Array<{ numerator: number; denominator: number }>,
    options?: {
      type?: 'bar' | 'pie'
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: options?.type === 'pie' ? 'pie-chart' : 'bar-model',
    width: options?.width || 400,
    height: options?.height || 80 * fractions.length + 60,
    description: `Equivalent fractions: ${fractions.map(f => `${f.numerator}/${f.denominator}`).join(' = ')}`,
    elements: fractions.map((f, i) => ({
      type: (options?.type === 'pie' ? 'arc' : 'rectangle') as 'arc' | 'rectangle',
      id: `fraction-${i}`,
      props: {
        numerator: f.numerator,
        denominator: f.denominator,
      },
    })),
  }),
}
