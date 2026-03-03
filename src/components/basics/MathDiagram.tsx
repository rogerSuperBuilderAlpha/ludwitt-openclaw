'use client'

/**
 * MathDiagram Component
 *
 * Renders mathematical diagrams and figures for visual math problems.
 * Supports geometry shapes, graphs, number lines, charts, and custom SVG.
 *
 * Sub-components:
 * - GridBackground: SVG grid background with axes (./GridBackground.tsx)
 * - SVGShapeRenderer: Individual SVG shape rendering (./SVGShapeRenderer.tsx)
 * - DiagramTemplates: Pre-built diagram data factories (./diagramTemplates.ts)
 */

import { MathDiagram as MathDiagramType } from '@/lib/types/basics'
import { sanitizeSvg } from '@/lib/utils/sanitize'
import { GridBackground } from '@/components/basics/GridBackground'
import { SVGShapeRenderer } from '@/components/basics/SVGShapeRenderer'

// Re-export sub-modules for consumers that imported from this file
export { DiagramTemplates } from '@/components/basics/diagramTemplates'
export { GridBackground } from '@/components/basics/GridBackground'
export { SVGShapeRenderer } from '@/components/basics/SVGShapeRenderer'

interface MathDiagramProps {
  diagram: MathDiagramType
  className?: string
}

export function MathDiagram({ diagram, className = '' }: MathDiagramProps) {
  const width = diagram.width || 400
  const height = diagram.height || 300

  // If it's a custom SVG, render it with DOMPurify sanitization
  if (diagram.type === 'custom-svg' && diagram.svg) {
    return (
      <div
        className={`math-diagram ${className}`}
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

  // Render structured diagram based on type
  return (
    <div
      className={`math-diagram ${className}`}
      role="img"
      aria-label={diagram.description}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto b-bg-card border b-border rounded-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        {/* Grid background for graphs */}
        {(diagram.type === 'graph' || diagram.type === 'geometry') && (
          <GridBackground width={width} height={height} />
        )}

        {/* Render elements */}
        {diagram.elements?.map((element, index) => (
          <SVGShapeRenderer key={index} element={element} />
        ))}

        {/* Render labels */}
        {diagram.labels &&
          Object.entries(diagram.labels).map(([key, value], index) => {
            // Labels are positioned based on element props or default positions
            const element = diagram.elements?.find((e) => e.label === key)
            if (!element) return null

            const x = Number(element.props.x) || Number(element.props.cx) || 0
            const y = Number(element.props.y) || Number(element.props.cy) || 0

            return (
              <text
                key={`label-${index}`}
                x={x + 10}
                y={y - 10}
                className="fill-b-text-secondary text-sm font-medium"
                style={{ fontSize: '14px' }}
              >
                {value}
              </text>
            )
          })}
      </svg>
    </div>
  )
}
