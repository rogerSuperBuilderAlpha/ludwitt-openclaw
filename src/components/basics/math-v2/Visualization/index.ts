/**
 * Math Visualization Components
 *
 * Centralized exports for all math visualization components.
 * Use this index for clean imports across the codebase.
 */

// Main diagram components
export { GeometryDiagram } from './GeometryDiagram'
export { DiagramRenderer } from './DiagramRenderer'
export { FractionVisual } from './FractionVisual'
export { NumberLine } from './NumberLine'
export { StatisticsChart } from './StatisticsChart'
export { GraphRenderer } from './GraphRenderer'

// Primitives (for custom diagram composition)
export {
  GridBackground,
  RightAngleMarker,
  AngleArc,
  MeasurementAnnotation,
  PointLabel,
  COLORS,
} from './geometry-primitives'

// Utilities (for custom calculations)
export {
  polarToCartesian,
  distance,
  midpoint,
  angleBetween,
  rotatePoint,
  centroid,
  perpendicularOffset,
  GEOMETRY_COLORS,
} from './geometry-utils'
export type { Point } from './geometry-utils'
