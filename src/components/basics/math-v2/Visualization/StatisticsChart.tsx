'use client'

/**
 * StatisticsChart Component
 *
 * Renders statistics charts for math problems including:
 * - Bar charts with labeled axes
 * - Simple pie charts with labels
 * - Box plots (box-and-whisker)
 * - Histograms
 *
 * All rendered using SVG for consistency and accessibility.
 * Chart sub-components live in ./charts/ and are composed here.
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { sanitizeSvg } from '@/lib/utils/sanitize'
import { BarChart } from './charts/BarChart'
import { PieChart } from './charts/PieChart'
import { BoxPlot } from './charts/BoxPlot'
import { Histogram } from './charts/Histogram'
import type {
  BarChartData,
  PieChartData,
  BoxPlotData,
  HistogramData,
} from './charts/chart-utils'

// Re-export types and templates for backwards compatibility
export type { BarChartData, PieChartData, BoxPlotData, HistogramData }
export { StatisticsTemplates } from './charts/StatisticsTemplates'

// ============================================================================
// Types
// ============================================================================

interface StatisticsChartProps {
  diagram: DiagramV2
  className?: string
}

// ============================================================================
// Chart Data Parser
// ============================================================================

function parseChartData(diagram: DiagramV2): {
  type: 'bar' | 'pie' | 'box-plot' | 'histogram'
  barData?: BarChartData[]
  pieData?: PieChartData[]
  boxData?: BoxPlotData[]
  histogramData?: HistogramData
  options?: {
    title?: string
    xAxisLabel?: string
    yAxisLabel?: string
    showValues?: boolean
    showLabels?: boolean
    showPercentages?: boolean
    showLegend?: boolean
    innerRadius?: number
  }
} {
  const elements = diagram.elements || []
  const labels = diagram.labels || {}

  // Determine chart type from diagram type
  switch (diagram.type) {
    case 'bar-chart': {
      const barData: BarChartData[] = elements
        .filter((e) => e.type === 'rectangle')
        .map((e, i) => ({
          label: e.label || labels[e.id || ''] || `Item ${i + 1}`,
          value: Number(e.props.value) || Number(e.props.height) || 0,
          color: String(e.props.fill || ''),
        }))
      return { type: 'bar', barData, options: { title: labels.title } }
    }

    case 'pie-chart': {
      const pieData: PieChartData[] = elements
        .filter((e) => e.type === 'arc' || e.props.value)
        .map((e, i) => ({
          label: e.label || labels[e.id || ''] || `Item ${i + 1}`,
          value: Number(e.props.value) || 0,
          color: String(e.props.fill || ''),
        }))
      return { type: 'pie', pieData, options: { title: labels.title } }
    }

    case 'box-plot': {
      const boxData: BoxPlotData[] = elements
        .filter((e) => e.props.min !== undefined)
        .map((e) => ({
          min: Number(e.props.min) || 0,
          q1: Number(e.props.q1) || 0,
          median: Number(e.props.median) || 0,
          q3: Number(e.props.q3) || 0,
          max: Number(e.props.max) || 0,
          outliers: e.props.outliers
            ? String(e.props.outliers).split(',').map(Number)
            : [],
          label: e.label,
        }))
      return { type: 'box-plot', boxData, options: { title: labels.title } }
    }

    case 'histogram': {
      const bins = elements
        .filter((e) => e.props.start !== undefined)
        .map((e) => ({
          start: Number(e.props.start) || 0,
          end: Number(e.props.end) || 0,
          count: Number(e.props.count) || Number(e.props.value) || 0,
        }))
      return {
        type: 'histogram',
        histogramData: { bins },
        options: { title: labels.title },
      }
    }

    default:
      return { type: 'bar', barData: [] }
  }
}

// ============================================================================
// Main Component
// ============================================================================

export function StatisticsChart({
  diagram,
  className = '',
}: StatisticsChartProps) {
  const width = diagram.width || 400
  const height = diagram.height || 300

  // Handle custom SVG
  if (diagram.type === 'custom-svg' && diagram.svg) {
    return (
      <div
        className={`statistics-chart ${className}`}
        role="img"
        aria-label={diagram.description}
      >
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeSvg(diagram.svg) }}
          className="flex justify-center"
        />
      </div>
    )
  }

  const parsed = parseChartData(diagram)

  return (
    <div
      className={`statistics-chart ${className}`}
      role="img"
      aria-label={diagram.description}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
        style={{
          maxWidth: '100%',
          height: 'auto',
          background: 'var(--b-bg-card, #fffcf5)',
          borderRadius: '8px',
          border: '1px solid var(--b-border-default, rgba(11, 29, 57, 0.10))',
        }}
      >
        {parsed.type === 'bar' && parsed.barData && (
          <BarChart
            data={parsed.barData}
            width={width}
            height={height}
            title={parsed.options?.title}
            xAxisLabel={parsed.options?.xAxisLabel}
            yAxisLabel={parsed.options?.yAxisLabel}
            showValues={parsed.options?.showValues}
          />
        )}
        {parsed.type === 'pie' && parsed.pieData && (
          <PieChart
            data={parsed.pieData}
            width={width}
            height={height}
            title={parsed.options?.title}
            showLabels={parsed.options?.showLabels}
            showPercentages={parsed.options?.showPercentages}
            showLegend={parsed.options?.showLegend}
            innerRadius={parsed.options?.innerRadius}
          />
        )}
        {parsed.type === 'box-plot' && parsed.boxData && (
          <BoxPlot
            data={parsed.boxData}
            width={width}
            height={height}
            title={parsed.options?.title}
            showValues={parsed.options?.showValues}
          />
        )}
        {parsed.type === 'histogram' && parsed.histogramData && (
          <Histogram
            data={parsed.histogramData}
            width={width}
            height={height}
            title={parsed.options?.title}
            xAxisLabel={parsed.options?.xAxisLabel}
            yAxisLabel={parsed.options?.yAxisLabel}
            showValues={parsed.options?.showValues}
          />
        )}
      </svg>
    </div>
  )
}
