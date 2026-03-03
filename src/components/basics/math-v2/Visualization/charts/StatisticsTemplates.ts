/**
 * Statistics Chart Templates
 *
 * Factory functions for creating DiagramV2 objects that StatisticsChart can render.
 * Each template produces a well-formed diagram definition for its chart type.
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { BarChartData, PieChartData, BoxPlotData, CHART_COLORS } from './chart-utils'

export const StatisticsTemplates = {
  /**
   * Create a bar chart diagram
   */
  barChart: (
    data: BarChartData[],
    options?: {
      title?: string
      xAxisLabel?: string
      yAxisLabel?: string
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'bar-chart',
    width: options?.width || 400,
    height: options?.height || 300,
    description: options?.title || 'Bar chart',
    elements: data.map((item, index) => ({
      type: 'rectangle' as const,
      id: `bar-${index}`,
      props: {
        value: item.value,
        fill: item.color || CHART_COLORS[index % CHART_COLORS.length],
      },
      label: item.label,
    })),
    labels: {
      title: options?.title || '',
      xAxis: options?.xAxisLabel || '',
      yAxis: options?.yAxisLabel || '',
    },
  }),

  /**
   * Create a pie chart diagram
   */
  pieChart: (
    data: PieChartData[],
    options?: {
      title?: string
      width?: number
      height?: number
      showLegend?: boolean
    }
  ): DiagramV2 => ({
    type: 'pie-chart',
    width: options?.width || 400,
    height: options?.height || 300,
    description: options?.title || 'Pie chart',
    elements: data.map((item, index) => ({
      type: 'arc' as const,
      id: `slice-${index}`,
      props: {
        value: item.value,
        fill: item.color || CHART_COLORS[index % CHART_COLORS.length],
      },
      label: item.label,
    })),
    labels: {
      title: options?.title || '',
    },
  }),

  /**
   * Create a box plot diagram
   */
  boxPlot: (
    data: BoxPlotData[],
    options?: {
      title?: string
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'box-plot',
    width: options?.width || 400,
    height: options?.height || 200 + data.length * 60,
    description: options?.title || 'Box plot',
    elements: data.map((item, index) => ({
      type: 'rectangle' as const,
      id: `box-${index}`,
      props: {
        min: item.min,
        q1: item.q1,
        median: item.median,
        q3: item.q3,
        max: item.max,
        outliers: item.outliers?.join(',') || '',
      },
      label: item.label,
    })),
    labels: {
      title: options?.title || '',
    },
  }),

  /**
   * Create a histogram diagram
   */
  histogram: (
    bins: { start: number; end: number; count: number }[],
    options?: {
      title?: string
      xAxisLabel?: string
      yAxisLabel?: string
      width?: number
      height?: number
    }
  ): DiagramV2 => ({
    type: 'histogram',
    width: options?.width || 400,
    height: options?.height || 300,
    description: options?.title || 'Histogram',
    elements: bins.map((bin, index) => ({
      type: 'rectangle' as const,
      id: `bin-${index}`,
      props: {
        start: bin.start,
        end: bin.end,
        count: bin.count,
      },
    })),
    labels: {
      title: options?.title || '',
      xAxis: options?.xAxisLabel || '',
      yAxis: options?.yAxisLabel || 'Frequency',
    },
  }),
}
