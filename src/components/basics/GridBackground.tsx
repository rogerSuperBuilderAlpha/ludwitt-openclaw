'use client'

/**
 * GridBackground Component
 *
 * Renders an SVG grid background with axes for coordinate planes and geometry diagrams.
 */

export interface GridBackgroundProps {
  width: number
  height: number
  gridSpacing?: number
}

export function GridBackground({
  width,
  height,
  gridSpacing = 20,
}: GridBackgroundProps) {
  const lines = []

  // Vertical lines
  for (let x = 0; x <= width; x += gridSpacing) {
    lines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="#e5e7eb"
        strokeWidth={x === width / 2 ? 1.5 : 0.5}
      />
    )
  }

  // Horizontal lines
  for (let y = 0; y <= height; y += gridSpacing) {
    lines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke="#e5e7eb"
        strokeWidth={y === height / 2 ? 1.5 : 0.5}
      />
    )
  }

  // Axes
  lines.push(
    <line
      key="x-axis"
      x1={0}
      y1={height / 2}
      x2={width}
      y2={height / 2}
      stroke="#374151"
      strokeWidth={2}
    />,
    <line
      key="y-axis"
      x1={width / 2}
      y1={0}
      x2={width / 2}
      y2={height}
      stroke="#374151"
      strokeWidth={2}
    />
  )

  return <g className="grid-background">{lines}</g>
}
