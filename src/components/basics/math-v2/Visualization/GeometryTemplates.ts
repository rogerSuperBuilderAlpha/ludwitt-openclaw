/**
 * Geometry Templates
 *
 * Pre-built factory functions that produce common geometry diagrams
 * (right triangle, circle, rectangle, square, angle, regular polygon).
 * Pure data -- no React dependency.
 *
 * Extracted from GeometryDiagram.tsx for maintainability.
 */

import { DiagramV2, DiagramElementV2 } from '@/lib/types/math-v2'

export const GeometryTemplates = {
  /**
   * Create a right triangle with labeled sides
   */
  rightTriangle: (
    base: number,
    height: number,
    options?: {
      labels?: { a?: string; b?: string; c?: string }
      showRightAngle?: boolean
      showMeasurements?: boolean
    }
  ): DiagramV2 => {
    const padding = 50
    const scale = Math.min(200 / base, 180 / height)
    const w = base * scale
    const h = height * scale

    const elements: DiagramElementV2[] = [
      {
        type: 'triangle',
        id: 'main-triangle',
        props: {
          points: `${padding},${padding + h} ${padding + w},${padding + h} ${padding},${padding}`,
          showRightAngle: options?.showRightAngle ?? true,
          rightAngleVertex: 0,
        },
      },
    ]

    // Side labels
    if (options?.labels?.a) {
      elements.push({
        type: 'text',
        id: 'label-a',
        props: { x: padding + w / 2, y: padding + h + 20, text: options.labels.a },
      })
    }
    if (options?.labels?.b) {
      elements.push({
        type: 'text',
        id: 'label-b',
        props: { x: padding - 20, y: padding + h / 2, text: options.labels.b },
      })
    }
    if (options?.labels?.c) {
      elements.push({
        type: 'text',
        id: 'label-c',
        props: { x: padding + w / 2 + 15, y: padding + h / 2 - 15, text: options.labels.c },
      })
    }

    return {
      type: 'geometry',
      width: w + padding * 2,
      height: h + padding * 2,
      description: `Right triangle with base ${base} and height ${height}`,
      elements,
    }
  },

  /**
   * Create a circle with radius/diameter
   */
  circle: (
    radius: number,
    options?: {
      showRadius?: boolean
      showDiameter?: boolean
      label?: string
    }
  ): DiagramV2 => {
    const padding = 50
    const size = radius * 2 + padding * 2

    return {
      type: 'geometry',
      width: size,
      height: size,
      description: `Circle with radius ${radius}`,
      elements: [
        {
          type: 'circle',
          id: 'main-circle',
          props: {
            cx: size / 2,
            cy: size / 2,
            r: radius,
            showRadius: options?.showRadius ?? true,
            showDiameter: options?.showDiameter ?? false,
            radiusLabel: `r = ${radius}`,
            diameterLabel: `d = ${radius * 2}`,
          },
          label: options?.label,
        },
      ],
    }
  },

  /**
   * Create a rectangle with dimensions
   */
  rectangle: (
    width: number,
    height: number,
    options?: {
      showDimensions?: boolean
      showRightAngles?: boolean
      label?: string
    }
  ): DiagramV2 => {
    const padding = 60
    const scale = Math.min(250 / width, 200 / height)
    const w = width * scale
    const h = height * scale

    return {
      type: 'geometry',
      width: w + padding * 2,
      height: h + padding * 2,
      description: `Rectangle ${width} × ${height}`,
      elements: [
        {
          type: 'rectangle',
          id: 'main-rect',
          props: {
            x: padding,
            y: padding,
            width: w,
            height: h,
            showDimensions: options?.showDimensions ?? true,
            showRightAngles: options?.showRightAngles ?? false,
            widthLabel: String(width),
            heightLabel: String(height),
          },
          label: options?.label,
        },
      ],
    }
  },

  /**
   * Create a square with side length
   */
  square: (
    side: number,
    options?: {
      showDimensions?: boolean
      showRightAngles?: boolean
      label?: string
    }
  ): DiagramV2 => {
    return GeometryTemplates.rectangle(side, side, {
      ...options,
      label: options?.label,
    })
  },

  /**
   * Create an angle visualization
   */
  angle: (
    degrees: number,
    options?: {
      showDegrees?: boolean
      armLength?: number
    }
  ): DiagramV2 => {
    const armLength = options?.armLength ?? 100
    const padding = 40
    const rad = degrees * Math.PI / 180

    const endX = padding + armLength * Math.cos(-rad)
    const endY = padding + armLength + armLength * Math.sin(-rad)

    return {
      type: 'geometry',
      width: armLength + padding * 2,
      height: armLength + padding * 2,
      description: `Angle of ${degrees} degrees`,
      elements: [
        {
          type: 'line',
          id: 'arm-1',
          props: { x1: padding, y1: padding + armLength, x2: padding + armLength, y2: padding + armLength },
        },
        {
          type: 'line',
          id: 'arm-2',
          props: { x1: padding, y1: padding + armLength, x2: endX, y2: endY },
        },
        {
          type: 'angle',
          id: 'angle-arc',
          props: {
            cx: padding,
            cy: padding + armLength,
            r: 30,
            startAngle: 0,
            endAngle: degrees,
            isRightAngle: degrees === 90,
          },
          label: `${degrees}°`,
        },
      ],
    }
  },

  /**
   * Create a regular polygon
   */
  regularPolygon: (
    sides: number,
    radius: number,
    options?: {
      label?: string
      showCenter?: boolean
    }
  ): DiagramV2 => {
    const padding = 40
    const size = radius * 2 + padding * 2
    const cx = size / 2
    const cy = size / 2

    const points: string[] = []
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
      const x = cx + radius * Math.cos(angle)
      const y = cy + radius * Math.sin(angle)
      points.push(`${x},${y}`)
    }

    const elements: DiagramElementV2[] = [
      {
        type: 'polygon',
        id: 'main-polygon',
        props: { points: points.join(' ') },
        label: options?.label,
      },
    ]

    if (options?.showCenter) {
      elements.push({
        type: 'point',
        id: 'center',
        props: { x: cx, y: cy, r: 4 },
      })
    }

    const polygonNames: Record<number, string> = {
      3: 'Triangle',
      4: 'Square',
      5: 'Pentagon',
      6: 'Hexagon',
      7: 'Heptagon',
      8: 'Octagon',
    }

    return {
      type: 'geometry',
      width: size,
      height: size,
      description: `${polygonNames[sides] || `${sides}-sided polygon`} with radius ${radius}`,
      elements,
    }
  },
}
