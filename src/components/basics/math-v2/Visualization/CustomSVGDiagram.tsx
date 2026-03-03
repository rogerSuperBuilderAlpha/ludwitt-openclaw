'use client'

/**
 * CustomSVGDiagram Component
 *
 * Renders a raw SVG string provided in the DiagramV2 config.
 * Falls back to a placeholder message when no SVG content is supplied.
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { sanitizeSvg } from '@/lib/utils/sanitize'

// ============================================================================
// Types
// ============================================================================

interface CustomSVGDiagramProps {
  diagram: DiagramV2
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function CustomSVGDiagram({
  diagram,
  className = '',
}: CustomSVGDiagramProps) {
  if (!diagram.svg) {
    return (
      <div
        className={`custom-svg ${className}`}
        role="img"
        aria-label={diagram.description}
      >
        <div className="flex items-center justify-center p-8 text-gray-500">
          No SVG content provided
        </div>
      </div>
    )
  }

  return (
    <div
      className={`custom-svg ${className}`}
      role="img"
      aria-label={diagram.description}
    >
      <div
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(diagram.svg) }}
        className="flex justify-center"
        style={{
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      />
    </div>
  )
}
