'use client'

/**
 * SVGShapeRenderer Component
 *
 * Renders individual SVG diagram elements (shapes, text, points, arrows, etc.)
 * for use within math diagram SVGs.
 */

import { DiagramElement } from '@/lib/types/basics'

export interface SVGShapeRendererProps {
  element: DiagramElement
}

/**
 * Helper: Convert polar coordinates to cartesian
 */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}

const BASE_STROKE = '#2563eb'
const BASE_FILL = 'none'

export function SVGShapeRenderer({ element }: SVGShapeRendererProps) {
  const { type, props, label } = element

  switch (type) {
    case 'line':
      return (
        <line
          x1={Number(props.x1) || 0}
          y1={Number(props.y1) || 0}
          x2={Number(props.x2) || 0}
          y2={Number(props.y2) || 0}
          stroke={String(props.stroke || BASE_STROKE)}
          strokeWidth={Number(props.strokeWidth) || 2}
        />
      )

    case 'circle':
      return (
        <circle
          cx={Number(props.cx) || 0}
          cy={Number(props.cy) || 0}
          r={Number(props.r) || 20}
          stroke={String(props.stroke || BASE_STROKE)}
          strokeWidth={Number(props.strokeWidth) || 2}
          fill={String(props.fill || BASE_FILL)}
        />
      )

    case 'rectangle':
      return (
        <rect
          x={Number(props.x) || 0}
          y={Number(props.y) || 0}
          width={Number(props.width) || 50}
          height={Number(props.height) || 50}
          stroke={String(props.stroke || BASE_STROKE)}
          strokeWidth={Number(props.strokeWidth) || 2}
          fill={String(props.fill || BASE_FILL)}
        />
      )

    case 'polygon':
      return (
        <polygon
          points={String(props.points) || ''}
          stroke={String(props.stroke || BASE_STROKE)}
          strokeWidth={Number(props.strokeWidth) || 2}
          fill={String(props.fill || BASE_FILL)}
        />
      )

    case 'arc': {
      const cx = Number(props.cx) || 0
      const cy = Number(props.cy) || 0
      const r = Number(props.r) || 30
      const startAngle = Number(props.startAngle) || 0
      const endAngle = Number(props.endAngle) || 90

      const start = polarToCartesian(cx, cy, r, endAngle)
      const end = polarToCartesian(cx, cy, r, startAngle)
      const largeArc = endAngle - startAngle <= 180 ? 0 : 1

      const d = [
        'M',
        start.x,
        start.y,
        'A',
        r,
        r,
        0,
        largeArc,
        0,
        end.x,
        end.y,
      ].join(' ')

      return (
        <path
          d={d}
          stroke={String(props.stroke || BASE_STROKE)}
          strokeWidth={Number(props.strokeWidth) || 2}
          fill={String(props.fill || BASE_FILL)}
        />
      )
    }

    case 'text':
      return (
        <text
          x={Number(props.x) || 0}
          y={Number(props.y) || 0}
          fill={String(props.fill || '#1f2937')}
          fontSize={Number(props.fontSize) || 16}
          fontWeight={String(props.fontWeight) || 'normal'}
          textAnchor={
            (props.textAnchor as 'start' | 'middle' | 'end') || 'middle'
          }
        >
          {String(props.text || label || '')}
        </text>
      )

    case 'point':
      return (
        <>
          <circle
            cx={Number(props.x) || 0}
            cy={Number(props.y) || 0}
            r={Number(props.r) || 5}
            fill={String(props.fill || BASE_STROKE)}
          />
          {label && (
            <text
              x={(Number(props.x) || 0) + 10}
              y={(Number(props.y) || 0) - 10}
              fill="#1f2937"
              fontSize={14}
              fontWeight="bold"
            >
              {label}
            </text>
          )}
        </>
      )

    case 'angle': {
      const angleX = Number(props.x) || 0
      const angleY = Number(props.y) || 0
      const angleR = Number(props.r) || 25
      const angle1 = Number(props.angle1) || 0
      const angle2 = Number(props.angle2) || 90

      const p1 = polarToCartesian(angleX, angleY, angleR, angle2)
      const p2 = polarToCartesian(angleX, angleY, angleR, angle1)
      const angleLarge = angle2 - angle1 <= 180 ? 0 : 1

      const anglePath = [
        'M',
        p1.x,
        p1.y,
        'A',
        angleR,
        angleR,
        0,
        angleLarge,
        0,
        p2.x,
        p2.y,
      ].join(' ')

      return (
        <>
          <path
            d={anglePath}
            stroke={String(props.stroke || '#dc2626')}
            strokeWidth={2}
            fill="none"
          />
          {label && (
            <text
              x={
                angleX +
                angleR *
                  0.7 *
                  Math.cos((((angle1 + angle2) / 2) * Math.PI) / 180)
              }
              y={
                angleY -
                angleR *
                  0.7 *
                  Math.sin((((angle1 + angle2) / 2) * Math.PI) / 180)
              }
              fill="#dc2626"
              fontSize={14}
              fontWeight="bold"
              textAnchor="middle"
            >
              {label}
            </text>
          )}
        </>
      )
    }

    case 'arrow': {
      const ax1 = Number(props.x1) || 0
      const ay1 = Number(props.y1) || 0
      const ax2 = Number(props.x2) || 0
      const ay2 = Number(props.y2) || 0

      const angle = Math.atan2(ay2 - ay1, ax2 - ax1)
      const arrowLen = 10
      const arrowAngle = Math.PI / 6

      const arrow1x = ax2 - arrowLen * Math.cos(angle - arrowAngle)
      const arrow1y = ay2 - arrowLen * Math.sin(angle - arrowAngle)
      const arrow2x = ax2 - arrowLen * Math.cos(angle + arrowAngle)
      const arrow2y = ay2 - arrowLen * Math.sin(angle + arrowAngle)

      return (
        <g>
          <line
            x1={ax1}
            y1={ay1}
            x2={ax2}
            y2={ay2}
            stroke={String(props.stroke || BASE_STROKE)}
            strokeWidth={Number(props.strokeWidth) || 2}
          />
          <polygon
            points={`${ax2},${ay2} ${arrow1x},${arrow1y} ${arrow2x},${arrow2y}`}
            fill={String(props.stroke || BASE_STROKE)}
          />
        </g>
      )
    }

    default:
      return null
  }
}
