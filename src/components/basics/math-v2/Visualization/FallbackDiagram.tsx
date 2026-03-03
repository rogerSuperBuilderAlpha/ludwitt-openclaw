'use client'

/**
 * FallbackDiagram Component
 *
 * Placeholder rendered when a DiagramV2 type is not yet implemented.
 * Shows a styled container with a "coming soon" message.
 */

import { DiagramV2 } from '@/lib/types/math-v2'

// ============================================================================
// Types
// ============================================================================

interface FallbackDiagramProps {
  diagram: DiagramV2
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function FallbackDiagram({ diagram, className = '' }: FallbackDiagramProps) {
  return (
    <div
      className={`fallback-diagram ${className}`}
      role="img"
      aria-label={diagram.description}
    >
      <div
        className="flex items-center justify-center p-8 rounded-lg"
        style={{
          background: 'var(--b-bg-card, #fffcf5)',
          border: '1px solid var(--b-border-default, rgba(11, 29, 57, 0.10))',
          minHeight: diagram.height || 200,
        }}
      >
        <span className="text-gray-500 text-sm">
          Diagram type &quot;{diagram.type}&quot; visualization coming soon
        </span>
      </div>
    </div>
  )
}
