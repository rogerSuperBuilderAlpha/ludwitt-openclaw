'use client'

/**
 * Geometry Element Renderers
 *
 * Individual render functions for each geometry element type
 * (triangle, circle, rectangle, etc.) and the GeometryElement
 * dispatcher component that selects the right renderer.
 *
 * Extracted from GeometryDiagram.tsx for maintainability.
 */

import React from 'react'
import { DiagramElementV2 } from '@/lib/types/math-v2'
import { polarToCartesian, midpoint, angleBetween, GEOMETRY_COLORS as COLORS } from './geometry-utils'
import { RightAngleMarker, AngleArc, MeasurementAnnotation } from './geometry-primitives'

// ============================================================================
// Element Renderers
// ============================================================================

function renderTriangle(element: DiagramElementV2) {
  const { props, label } = element
  const points = String(props.points || '')
  const fill = String(props.fill || COLORS.fill)
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2
  const showRightAngle = Boolean(props.showRightAngle)
  const rightAngleVertex = Number(props.rightAngleVertex) || 0

  // Parse points
  const pointsArray = points.split(' ').map(p => {
    const [x, y] = p.split(',').map(Number)
    return { x, y }
  })

  return (
    <g className="triangle">
      <polygon
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {showRightAngle && pointsArray.length >= 3 && (
        <RightAngleMarker
          x={pointsArray[rightAngleVertex].x}
          y={pointsArray[rightAngleVertex].y}
          angle={angleBetween(
            pointsArray[rightAngleVertex],
            pointsArray[(rightAngleVertex + 1) % 3]
          )}
        />
      )}
      {label && (
        <text
          x={pointsArray.reduce((sum, p) => sum + p.x, 0) / pointsArray.length}
          y={pointsArray.reduce((sum, p) => sum + p.y, 0) / pointsArray.length}
          fill={COLORS.text}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderCircle(element: DiagramElementV2) {
  const { props, label } = element
  const cx = Number(props.cx) || 0
  const cy = Number(props.cy) || 0
  const r = Number(props.r) || 50
  const fill = String(props.fill || COLORS.fill)
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2
  const showRadius = Boolean(props.showRadius)
  const showDiameter = Boolean(props.showDiameter)
  const radiusLabel = String(props.radiusLabel || `r = ${r}`)
  const diameterLabel = String(props.diameterLabel || `d = ${r * 2}`)

  return (
    <g className="circle-element">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Center point */}
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill={stroke}
      />
      {showRadius && (
        <>
          <line
            x1={cx}
            y1={cy}
            x2={cx + r}
            y2={cy}
            stroke={COLORS.error}
            strokeWidth={2}
          />
          <text
            x={cx + r / 2}
            y={cy - 8}
            fill={COLORS.error}
            fontSize={12}
            fontWeight="500"
            textAnchor="middle"
          >
            {radiusLabel}
          </text>
        </>
      )}
      {showDiameter && (
        <>
          <line
            x1={cx - r}
            y1={cy}
            x2={cx + r}
            y2={cy}
            stroke={COLORS.secondary}
            strokeWidth={2}
          />
          <text
            x={cx}
            y={cy + r / 3}
            fill={COLORS.secondary}
            fontSize={12}
            fontWeight="500"
            textAnchor="middle"
          >
            {diameterLabel}
          </text>
        </>
      )}
      {label && (
        <text
          x={cx}
          y={cy - r - 10}
          fill={COLORS.text}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderRectangle(element: DiagramElementV2) {
  const { props, label } = element
  const x = Number(props.x) || 0
  const y = Number(props.y) || 0
  const width = Number(props.width) || 100
  const height = Number(props.height) || 50
  const fill = String(props.fill || COLORS.fill)
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2
  const showDimensions = Boolean(props.showDimensions)
  const widthLabel = String(props.widthLabel || String(width))
  const heightLabel = String(props.heightLabel || String(height))
  const showRightAngles = Boolean(props.showRightAngles)

  return (
    <g className="rectangle-element">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {showRightAngles && (
        <>
          <RightAngleMarker x={x} y={y} angle={0} size={10} />
          <RightAngleMarker x={x + width} y={y} angle={90} size={10} />
          <RightAngleMarker x={x + width} y={y + height} angle={180} size={10} />
          <RightAngleMarker x={x} y={y + height} angle={270} size={10} />
        </>
      )}
      {showDimensions && (
        <>
          <MeasurementAnnotation
            x1={x}
            y1={y + height}
            x2={x + width}
            y2={y + height}
            label={widthLabel}
            offset={20}
          />
          <MeasurementAnnotation
            x1={x + width}
            y1={y}
            x2={x + width}
            y2={y + height}
            label={heightLabel}
            offset={20}
          />
        </>
      )}
      {label && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          fill={COLORS.text}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderPolygon(element: DiagramElementV2) {
  const { props, label } = element
  const points = String(props.points || '')
  const fill = String(props.fill || COLORS.fill)
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2

  const pointsArray = points.split(' ').map(p => {
    const [x, y] = p.split(',').map(Number)
    return { x, y }
  })

  const centroid = {
    x: pointsArray.reduce((sum, p) => sum + p.x, 0) / pointsArray.length,
    y: pointsArray.reduce((sum, p) => sum + p.y, 0) / pointsArray.length,
  }

  return (
    <g className="polygon-element">
      <polygon
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {label && (
        <text
          x={centroid.x}
          y={centroid.y}
          fill={COLORS.text}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderAngle(element: DiagramElementV2) {
  const { props, label } = element
  const cx = Number(props.cx) || Number(props.x) || 0
  const cy = Number(props.cy) || Number(props.y) || 0
  const radius = Number(props.r) || Number(props.radius) || 25
  const startAngle = Number(props.startAngle) || Number(props.angle1) || 0
  const endAngle = Number(props.endAngle) || Number(props.angle2) || 90
  const stroke = String(props.stroke || COLORS.error)
  const isRightAngle = Boolean(props.isRightAngle) || Math.abs(endAngle - startAngle) === 90

  if (isRightAngle) {
    return (
      <g className="right-angle">
        <RightAngleMarker
          x={cx}
          y={cy}
          size={12}
          angle={startAngle}
          stroke={stroke}
        />
      </g>
    )
  }

  return (
    <AngleArc
      cx={cx}
      cy={cy}
      radius={radius}
      startAngle={startAngle}
      endAngle={endAngle}
      label={label}
      stroke={stroke}
    />
  )
}

function renderLine(element: DiagramElementV2) {
  const { props, label } = element
  const x1 = Number(props.x1) || 0
  const y1 = Number(props.y1) || 0
  const x2 = Number(props.x2) || 100
  const y2 = Number(props.y2) || 100
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2
  const strokeDasharray = String(props.strokeDasharray || '')

  const mid = midpoint({ x: x1, y: y1 }, { x: x2, y: y2 })

  return (
    <g className="line-element">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {label && (
        <text
          x={mid.x}
          y={mid.y - 8}
          fill={COLORS.text}
          fontSize={12}
          fontWeight="500"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderPoint(element: DiagramElementV2) {
  const { props, label } = element
  const x = Number(props.x) || 0
  const y = Number(props.y) || 0
  const r = Number(props.r) || 4
  const fill = String(props.fill || COLORS.primary)

  return (
    <g className="point-element">
      <circle cx={x} cy={y} r={r} fill={fill} />
      {label && (
        <text
          x={x + 10}
          y={y - 10}
          fill={COLORS.text}
          fontSize={12}
          fontWeight="bold"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderText(element: DiagramElementV2) {
  const { props } = element
  const x = Number(props.x) || 0
  const y = Number(props.y) || 0
  const text = String(props.text || '')
  const fill = String(props.fill || COLORS.text)
  const fontSize = Number(props.fontSize) || 14
  const fontWeight = String(props.fontWeight || 'normal')
  const textAnchor = (props.textAnchor as 'start' | 'middle' | 'end') || 'middle'

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAnchor={textAnchor}
      dominantBaseline="middle"
    >
      {text}
    </text>
  )
}

function renderArc(element: DiagramElementV2) {
  const { props, label } = element
  const cx = Number(props.cx) || 0
  const cy = Number(props.cy) || 0
  const r = Number(props.r) || 50
  const startAngle = Number(props.startAngle) || 0
  const endAngle = Number(props.endAngle) || 90
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2
  const fill = String(props.fill || 'none')

  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
  const sweep = endAngle > startAngle ? 0 : 1

  const d = `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`

  return (
    <g className="arc-element">
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
      />
      {label && (
        <text
          x={cx}
          y={cy - r - 10}
          fill={COLORS.text}
          fontSize={12}
          fontWeight="500"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderEllipse(element: DiagramElementV2) {
  const { props, label } = element
  const cx = Number(props.cx) || 0
  const cy = Number(props.cy) || 0
  const rx = Number(props.rx) || 60
  const ry = Number(props.ry) || 40
  const fill = String(props.fill || COLORS.fill)
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2

  return (
    <g className="ellipse-element">
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && (
        <text
          x={cx}
          y={cy}
          fill={COLORS.text}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </g>
  )
}

function renderArrow(element: DiagramElementV2) {
  const { props } = element
  const x1 = Number(props.x1) || 0
  const y1 = Number(props.y1) || 0
  const x2 = Number(props.x2) || 100
  const y2 = Number(props.y2) || 0
  const stroke = String(props.stroke || COLORS.primary)
  const strokeWidth = Number(props.strokeWidth) || 2

  const angle = Math.atan2(y2 - y1, x2 - x1)
  const arrowLen = 10
  const arrowAngle = Math.PI / 6

  const arrow1x = x2 - arrowLen * Math.cos(angle - arrowAngle)
  const arrow1y = y2 - arrowLen * Math.sin(angle - arrowAngle)
  const arrow2x = x2 - arrowLen * Math.cos(angle + arrowAngle)
  const arrow2y = y2 - arrowLen * Math.sin(angle + arrowAngle)

  return (
    <g className="arrow-element">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <polygon
        points={`${x2},${y2} ${arrow1x},${arrow1y} ${arrow2x},${arrow2y}`}
        fill={stroke}
      />
    </g>
  )
}

// ============================================================================
// Element Dispatcher
// ============================================================================

export function GeometryElement({ element }: { element: DiagramElementV2 }) {
  switch (element.type) {
    case 'triangle':
      return renderTriangle(element)
    case 'circle':
      return renderCircle(element)
    case 'rectangle':
      return renderRectangle(element)
    case 'polygon':
      return renderPolygon(element)
    case 'angle':
      return renderAngle(element)
    case 'line':
      return renderLine(element)
    case 'point':
      return renderPoint(element)
    case 'text':
      return renderText(element)
    case 'arc':
      return renderArc(element)
    case 'ellipse':
      return renderEllipse(element)
    case 'arrow':
      return renderArrow(element)
    default:
      return null
  }
}
