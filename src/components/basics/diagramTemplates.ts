/**
 * Pre-built diagram template data/configuration for common math problem types.
 * These are pure data factories -- no React components.
 */
import {
  MathDiagram as MathDiagramType,
  DiagramElement,
} from '@/lib/types/basics'

export const DiagramTemplates = {
  /** Create a right triangle diagram */
  rightTriangle: (
    base: number,
    height: number,
    labels?: { a?: string; b?: string; c?: string }
  ): MathDiagramType => ({
    type: 'geometry',
    width: 300,
    height: 250,
    description: `Right triangle with base ${base} and height ${height}`,
    elements: [
      {
        type: 'polygon',
        props: { points: '50,200 250,200 50,50' },
        label: 'triangle',
      },
      {
        type: 'text',
        props: { x: 150, y: 220, text: labels?.a || String(base) },
      },
      {
        type: 'text',
        props: { x: 30, y: 125, text: labels?.b || String(height) },
      },
      { type: 'text', props: { x: 160, y: 115, text: labels?.c || '?' } },
      // Right angle marker
      {
        type: 'line',
        props: {
          x1: 50,
          y1: 180,
          x2: 70,
          y2: 180,
          stroke: '#1f2937',
          strokeWidth: 1,
        },
      },
      {
        type: 'line',
        props: {
          x1: 70,
          y1: 180,
          x2: 70,
          y2: 200,
          stroke: '#1f2937',
          strokeWidth: 1,
        },
      },
    ],
  }),

  /** Create a number line */
  numberLine: (
    min: number,
    max: number,
    marks?: number[],
    highlight?: number
  ): MathDiagramType => {
    const elements: DiagramElement[] = [
      { type: 'arrow', props: { x1: 30, y1: 100, x2: 370, y2: 100 } },
    ]

    const range = max - min
    const scale = 300 / range

    // Add tick marks
    for (let i = min; i <= max; i++) {
      const x = 50 + (i - min) * scale
      elements.push(
        {
          type: 'line',
          props: {
            x1: x,
            y1: 95,
            x2: x,
            y2: 105,
            stroke: '#374151',
            strokeWidth: 1,
          },
        },
        { type: 'text', props: { x, y: 125, text: String(i), fontSize: 12 } }
      )
    }

    // Highlight a specific point
    if (highlight !== undefined) {
      const hx = 50 + (highlight - min) * scale
      elements.push({
        type: 'point',
        props: { x: hx, y: 100, r: 6, fill: '#dc2626' },
      })
    }

    return {
      type: 'number-line',
      width: 400,
      height: 150,
      description: `Number line from ${min} to ${max}`,
      elements,
    }
  },

  /** Create a coordinate plane with points */
  coordinatePlane: (
    points: Array<{ x: number; y: number; label?: string }>
  ): MathDiagramType => {
    const elements: DiagramElement[] = []
    const scale = 20 // pixels per unit
    const centerX = 200
    const centerY = 150

    points.forEach((point) => {
      elements.push({
        type: 'point',
        props: {
          x: centerX + point.x * scale,
          y: centerY - point.y * scale,
          r: 5,
          fill: '#2563eb',
        },
        label: point.label || `(${point.x}, ${point.y})`,
      })
    })

    return {
      type: 'graph',
      width: 400,
      height: 300,
      description: `Coordinate plane with ${points.length} points`,
      elements,
    }
  },

  /** Create a circle with radius/diameter */
  circle: (
    radius: number,
    showRadius?: boolean,
    showDiameter?: boolean
  ): MathDiagramType => {
    const elements: DiagramElement[] = [
      { type: 'circle', props: { cx: 150, cy: 150, r: 100 } },
      { type: 'point', props: { x: 150, y: 150, r: 3, fill: '#374151' } },
    ]

    if (showRadius) {
      elements.push(
        {
          type: 'line',
          props: {
            x1: 150,
            y1: 150,
            x2: 250,
            y2: 150,
            stroke: '#dc2626',
            strokeWidth: 2,
          },
        },
        {
          type: 'text',
          props: { x: 200, y: 140, text: `r = ${radius}`, fill: '#dc2626' },
        }
      )
    }

    if (showDiameter) {
      elements.push(
        {
          type: 'line',
          props: {
            x1: 50,
            y1: 150,
            x2: 250,
            y2: 150,
            stroke: '#16a34a',
            strokeWidth: 2,
          },
        },
        {
          type: 'text',
          props: { x: 150, y: 175, text: `d = ${radius * 2}`, fill: '#16a34a' },
        }
      )
    }

    return {
      type: 'geometry',
      width: 300,
      height: 300,
      description: `Circle with radius ${radius}`,
      elements,
    }
  },

  /** Create a bar chart */
  barChart: (
    data: Array<{ label: string; value: number }>,
    title?: string
  ): MathDiagramType => {
    const elements: DiagramElement[] = []
    const barWidth = 40
    const maxValue = Math.max(...data.map((d) => d.value))
    const scale = 200 / maxValue

    data.forEach((item, index) => {
      const x = 60 + index * (barWidth + 20)
      const barHeight = item.value * scale

      elements.push(
        {
          type: 'rectangle',
          props: {
            x,
            y: 250 - barHeight,
            width: barWidth,
            height: barHeight,
            fill: '#3b82f6',
            stroke: '#2563eb',
          },
        },
        {
          type: 'text',
          props: {
            x: x + barWidth / 2,
            y: 270,
            text: item.label,
            fontSize: 12,
          },
        },
        {
          type: 'text',
          props: {
            x: x + barWidth / 2,
            y: 245 - barHeight,
            text: String(item.value),
            fontSize: 11,
          },
        }
      )
    })

    // Axes
    elements.push(
      {
        type: 'line',
        props: {
          x1: 50,
          y1: 250,
          x2: 350,
          y2: 250,
          stroke: '#374151',
          strokeWidth: 2,
        },
      },
      {
        type: 'line',
        props: {
          x1: 50,
          y1: 30,
          x2: 50,
          y2: 250,
          stroke: '#374151',
          strokeWidth: 2,
        },
      }
    )

    if (title) {
      elements.push({
        type: 'text',
        props: { x: 200, y: 20, text: title, fontSize: 16, fontWeight: 'bold' },
      })
    }

    return {
      type: 'bar-chart',
      width: 400,
      height: 300,
      description: title || 'Bar chart',
      elements,
    }
  },
}
