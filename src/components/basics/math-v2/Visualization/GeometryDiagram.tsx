'use client'

/**
 * GeometryDiagram Component
 *
 * Renders geometry diagrams for math problems including:
 * - Right triangles with labeled sides
 * - Circles with radius/diameter labels
 * - Angle visualization with arc and degree markers
 * - Rectangles, squares, and polygons
 * - Right angle markers
 * - Measurement annotations
 */

import React from 'react'
import { DiagramV2 } from '@/lib/types/math-v2'
import { sanitizeSvg } from '@/lib/utils/sanitize'
import { GridBackground } from './geometry-primitives'
import { GeometryElement } from './GeometryElements'

// Re-export GeometryTemplates for backwards compatibility
export { GeometryTemplates } from './GeometryTemplates'

// ============================================================================
// Types
// ============================================================================

interface GeometryDiagramProps {
  diagram: DiagramV2
  className?: string
  showGrid?: boolean
}

// ============================================================================
// Main Component
// ============================================================================

export function GeometryDiagram({
  diagram,
  className = '',
  showGrid = false,
}: GeometryDiagramProps) {
  const width = diagram.width || 400
  const height = diagram.height || 300

  // Handle SVG content - render it directly if present (regardless of type)
  // This covers both explicit 'custom-svg' type AND geometry diagrams that have pre-made SVG
  if (diagram.svg) {
    // Strip answer/solution text from SVG to avoid giving away the answer
    // This removes text elements containing "=", "V =", "A =", "P =", answer patterns
    let cleanedSvg = diagram.svg

    // Remove text elements that contain answers (patterns like "V = 60", "= 60 cm³", etc.)
    // This regex finds <text> elements containing equals signs with numbers/units
    cleanedSvg = cleanedSvg.replace(
      /<text[^>]*>[^<]*(?:=\s*\d+|V\s*=|A\s*=|P\s*=|Area\s*=|Volume\s*=|Perimeter\s*=)[^<]*<\/text>/gi,
      ''
    )

    // Also remove standalone answer text like "60 cm³" at the end
    cleanedSvg = cleanedSvg.replace(
      /<text[^>]*font-weight="bold"[^>]*>[^<]*\d+\s*(?:cm|m|in|ft|units?)[²³]?\s*<\/text>/gi,
      ''
    )

    return (
      <div
        className={`geometry-diagram ${className}`}
        role="img"
        aria-label={diagram.description}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: height,
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeSvg(cleanedSvg) }}
          style={{
            maxWidth: '100%',
            width: width,
            height: height,
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={`geometry-diagram ${className}`}
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
        {showGrid && <GridBackground width={width} height={height} />}

        {diagram.elements?.map((element, index) => (
          <GeometryElement key={element.id || index} element={element} />
        ))}
      </svg>
    </div>
  )
}
