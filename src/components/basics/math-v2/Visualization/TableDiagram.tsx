'use client'

/**
 * TableDiagram Component
 *
 * Renders a data table as an SVG with header row, data rows, and
 * cell dividers.  Used for DiagramV2 configs with type === 'table'.
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { DIAGRAM_COLORS, SVG_CONTAINER_STYLE } from './diagramConstants'

// ============================================================================
// Types
// ============================================================================

interface TableDiagramProps {
  diagram: DiagramV2
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function TableDiagram({ diagram, className = '' }: TableDiagramProps) {
  const width = diagram.width || 400
  const height = diagram.height || 200

  const elements = diagram.elements || []
  const labels = diagram.labels || {}

  // Parse table data from elements
  const headers = labels.headers?.split(',') || []
  const rows: string[][] = elements
    .filter(e => e.props.row !== undefined)
    .sort((a, b) => Number(a.props.row) - Number(b.props.row))
    .map(e => String(e.props.cells || e.label || '').split(','))

  // If no structured data, try to parse from labels
  if (rows.length === 0 && labels.data) {
    labels.data.split(';').forEach(row => {
      rows.push(row.split(','))
    })
  }

  const cols = Math.max(headers.length, ...rows.map(r => r.length))
  const cellWidth = (width - 40) / cols
  const cellHeight = 30
  const tableHeight = (rows.length + (headers.length ? 1 : 0)) * cellHeight

  return (
    <div
      className={`table-diagram ${className}`}
      role="img"
      aria-label={diagram.description}
    >
      <svg
        width={width}
        height={Math.max(height, tableHeight + 40)}
        viewBox={`0 0 ${width} ${Math.max(height, tableHeight + 40)}`}
        className="mx-auto"
        style={SVG_CONTAINER_STYLE}
      >
        <g transform="translate(20, 20)">
          {/* Header row */}
          {headers.length > 0 && (
            <g>
              <rect
                x={0}
                y={0}
                width={cellWidth * cols}
                height={cellHeight}
                fill="rgba(59, 130, 246, 0.1)"
                stroke={DIAGRAM_COLORS.primary}
                strokeWidth={1}
              />
              {headers.map((header, i) => (
                <text
                  key={`header-${i}`}
                  x={i * cellWidth + cellWidth / 2}
                  y={cellHeight / 2}
                  fill={DIAGRAM_COLORS.text}
                  fontSize={12}
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {header.trim()}
                </text>
              ))}
            </g>
          )}

          {/* Data rows */}
          {rows.map((row, rowIndex) => (
            <g key={`row-${rowIndex}`} transform={`translate(0, ${(rowIndex + (headers.length ? 1 : 0)) * cellHeight})`}>
              <rect
                x={0}
                y={0}
                width={cellWidth * cols}
                height={cellHeight}
                fill={rowIndex % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)'}
                stroke={DIAGRAM_COLORS.grid}
                strokeWidth={1}
              />
              {row.map((cell, colIndex) => (
                <text
                  key={`cell-${colIndex}`}
                  x={colIndex * cellWidth + cellWidth / 2}
                  y={cellHeight / 2}
                  fill={DIAGRAM_COLORS.text}
                  fontSize={12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {cell.trim()}
                </text>
              ))}
            </g>
          ))}

          {/* Vertical cell dividers */}
          {Array.from({ length: cols - 1 }).map((_, i) => (
            <line
              key={`divider-${i}`}
              x1={(i + 1) * cellWidth}
              y1={0}
              x2={(i + 1) * cellWidth}
              y2={tableHeight}
              stroke={DIAGRAM_COLORS.grid}
              strokeWidth={1}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
