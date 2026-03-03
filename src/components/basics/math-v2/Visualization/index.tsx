/**
 * Math V2 Visualization Components
 *
 * Interactive graphing components using Mafs for Ludwitt's
 * enhanced math learning experience.
 *
 * @module Visualization
 */

// Existing components
export { GraphRenderer } from './GraphRenderer'

export { CoordinatePlane } from './CoordinatePlane'
export type { PlotPoint, CoordinatePlaneProps } from './CoordinatePlane'

export { NumberLine } from './NumberLine'
export type {
  NumberLinePoint,
  InequalityRegion,
  RangeHighlight,
  NumberLineProps,
} from './NumberLine'

// New enhanced diagram components
export { DiagramRenderer, DiagramTemplates } from './DiagramRenderer'

export { GeometryDiagram, GeometryTemplates } from './GeometryDiagram'

export { StatisticsChart, StatisticsTemplates } from './StatisticsChart'

export {
  FractionVisual,
  FractionTemplates,
  FractionBar,
  FractionPie,
  FractionComparison,
  EquivalentFractions,
} from './FractionVisual'

// Re-export types for convenience
export type {
  BarChartData,
  PieChartData,
  BoxPlotData,
  HistogramData,
} from './StatisticsChart'
export type { FractionData, FractionComparisonData } from './FractionVisual'
