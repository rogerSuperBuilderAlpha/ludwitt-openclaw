'use client'

/**
 * DiagramRenderer Component
 *
 * Thin orchestrator that selects the correct visualization renderer
 * based on the DiagramV2 config type.  Each diagram category is
 * implemented in its own file; this module only does dispatch.
 *
 * Supports:
 * - Geometry diagrams (triangles, circles, rectangles, polygons, angles)
 * - Statistics charts (bar, pie, box plot, histogram)
 * - Fraction visualizations (bars, pies, comparisons)
 * - Number lines, tables, Venn diagrams
 * - Custom SVG diagrams
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { categorizeDiagramType } from './diagramConstants'

// Category renderers
import { GeometryDiagram, GeometryTemplates } from './GeometryDiagram'
import { StatisticsChart, StatisticsTemplates } from './StatisticsChart'
import { FractionVisual, FractionTemplates } from './FractionVisual'

// Special-type renderers
import { NumberLineDiagram } from './NumberLineDiagram'
import { TableDiagram } from './TableDiagram'
import { VennDiagram } from './VennDiagram'
import { CustomSVGDiagram } from './CustomSVGDiagram'
import { FallbackDiagram } from './FallbackDiagram'

// Templates (re-exported for consumers)
import { DiagramTemplates } from './diagramTemplates'

// ============================================================================
// Types
// ============================================================================

interface DiagramRendererProps {
  /** The diagram configuration from MathProblemV2 */
  diagram: DiagramV2
  /** Optional className for the container */
  className?: string
  /** Whether to show grid lines (for geometry/graph types) */
  showGrid?: boolean
  /** Interactive mode - enables hover states and click handlers */
  interactive?: boolean
  /** Callback when an element is clicked (interactive mode only) */
  onElementClick?: (elementId: string) => void
}

// ============================================================================
// Main Component
// ============================================================================

export function DiagramRenderer({
  diagram,
  className = '',
  showGrid = false,
  interactive = false,
  onElementClick,
}: DiagramRendererProps) {
  if (!diagram) {
    return null
  }

  const category = categorizeDiagramType(diagram.type)

  switch (category) {
    case 'geometry':
      return (
        <GeometryDiagram
          diagram={diagram}
          className={className}
          showGrid={showGrid}
        />
      )

    case 'statistics':
      return <StatisticsChart diagram={diagram} className={className} />

    case 'fraction':
      return <FractionVisual diagram={diagram} className={className} />

    case 'special':
      return renderSpecialType(diagram, className)

    default:
      return <FallbackDiagram diagram={diagram} className={className} />
  }
}

// ============================================================================
// Special-type dispatcher
// ============================================================================

function renderSpecialType(diagram: DiagramV2, className: string) {
  switch (diagram.type) {
    case 'number-line':
      return <NumberLineDiagram diagram={diagram} className={className} />

    case 'table':
      return <TableDiagram diagram={diagram} className={className} />

    case 'venn':
      return <VennDiagram diagram={diagram} className={className} />

    case 'custom-svg':
      return <CustomSVGDiagram diagram={diagram} className={className} />

    case 'graph':
      // Graph type is handled by GeometryDiagram with grid enabled
      return (
        <GeometryDiagram
          diagram={diagram}
          className={className}
          showGrid={true}
        />
      )

    case 'tree':
    case 'probability-tree':
    case 'pictograph':
    case 'scatter-plot':
      return <FallbackDiagram diagram={diagram} className={className} />

    default:
      return <FallbackDiagram diagram={diagram} className={className} />
  }
}

// ============================================================================
// Re-exports (preserve public API)
// ============================================================================

export {
  GeometryDiagram,
  GeometryTemplates,
  StatisticsChart,
  StatisticsTemplates,
  FractionVisual,
  FractionTemplates,
  DiagramTemplates,
}
