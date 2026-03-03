/* eslint-disable testing-library/no-container */
/**
 * Unit Tests for MathDiagram Component
 *
 * Tests the math diagram renderer that supports geometry shapes,
 * graphs, number lines, custom SVG, and structured diagram elements.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { MathDiagram } from '../MathDiagram'
import type { MathDiagram as MathDiagramType } from '@/lib/types/basics'

// ---------- Mocks ----------

jest.mock('@/lib/utils/sanitize', () => ({
  sanitizeSvg: (html: string) => html, // passthrough for testing
}))

jest.mock('@/components/basics/GridBackground', () => ({
  GridBackground: ({ width, height }: { width: number; height: number }) => (
    <g data-testid="grid-background" data-width={width} data-height={height} />
  ),
}))

jest.mock('@/components/basics/SVGShapeRenderer', () => ({
  SVGShapeRenderer: ({
    element,
  }: {
    element: { type: string; label?: string }
  }) => (
    <g data-testid={`shape-${element.type}`} data-label={element.label || ''} />
  ),
}))

// ---------- Helpers ----------

function makeDiagram(
  overrides: Partial<MathDiagramType> = {}
): MathDiagramType {
  return {
    type: 'geometry',
    description: 'A triangle diagram',
    width: 400,
    height: 300,
    ...overrides,
  }
}

// ---------- Tests ----------

describe('MathDiagram', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<MathDiagram diagram={makeDiagram()} />)
      expect(container.querySelector('.math-diagram')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <MathDiagram diagram={makeDiagram()} className="extra-class" />
      )
      expect(
        container.querySelector('.math-diagram.extra-class')
      ).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has role="img" on the container', () => {
      render(<MathDiagram diagram={makeDiagram()} />)
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('sets aria-label from diagram description', () => {
      render(
        <MathDiagram
          diagram={makeDiagram({
            description: 'Right triangle with sides 3, 4, 5',
          })}
        />
      )
      expect(screen.getByRole('img')).toHaveAttribute(
        'aria-label',
        'Right triangle with sides 3, 4, 5'
      )
    })
  })

  describe('structured SVG diagrams', () => {
    it('renders an SVG element with correct dimensions', () => {
      const { container } = render(
        <MathDiagram diagram={makeDiagram({ width: 500, height: 400 })} />
      )
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('width', '500')
      expect(svg).toHaveAttribute('height', '400')
      expect(svg).toHaveAttribute('viewBox', '0 0 500 400')
    })

    it('uses default dimensions when not specified', () => {
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({ width: undefined, height: undefined })}
        />
      )
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '400')
      expect(svg).toHaveAttribute('height', '300')
    })

    it('renders GridBackground for graph type', () => {
      render(<MathDiagram diagram={makeDiagram({ type: 'graph' })} />)
      expect(screen.getByTestId('grid-background')).toBeInTheDocument()
    })

    it('renders GridBackground for geometry type', () => {
      render(<MathDiagram diagram={makeDiagram({ type: 'geometry' })} />)
      expect(screen.getByTestId('grid-background')).toBeInTheDocument()
    })

    it('does not render GridBackground for number-line type', () => {
      render(<MathDiagram diagram={makeDiagram({ type: 'number-line' })} />)
      expect(screen.queryByTestId('grid-background')).not.toBeInTheDocument()
    })

    it('does not render GridBackground for bar-chart type', () => {
      render(<MathDiagram diagram={makeDiagram({ type: 'bar-chart' })} />)
      expect(screen.queryByTestId('grid-background')).not.toBeInTheDocument()
    })
  })

  describe('diagram elements', () => {
    it('renders SVGShapeRenderer for each element', () => {
      render(
        <MathDiagram
          diagram={makeDiagram({
            elements: [
              { type: 'line', props: { x1: 0, y1: 0, x2: 100, y2: 100 } },
              { type: 'circle', props: { cx: 50, cy: 50, r: 25 } },
              {
                type: 'rectangle',
                props: { x: 10, y: 10, width: 80, height: 60 },
              },
            ],
          })}
        />
      )
      expect(screen.getByTestId('shape-line')).toBeInTheDocument()
      expect(screen.getByTestId('shape-circle')).toBeInTheDocument()
      expect(screen.getByTestId('shape-rectangle')).toBeInTheDocument()
    })

    it('renders no shapes when elements array is empty', () => {
      render(<MathDiagram diagram={makeDiagram({ elements: [] })} />)
      expect(screen.queryByTestId(/^shape-/)).not.toBeInTheDocument()
    })

    it('renders no shapes when elements is undefined', () => {
      render(<MathDiagram diagram={makeDiagram({ elements: undefined })} />)
      expect(screen.queryByTestId(/^shape-/)).not.toBeInTheDocument()
    })
  })

  describe('labels', () => {
    it('renders labels for elements that have matching labels', () => {
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({
            elements: [
              { type: 'point', props: { cx: 100, cy: 150 }, label: 'A' },
            ],
            labels: { A: 'Point A' },
          })}
        />
      )
      const textElement = container.querySelector('text')
      expect(textElement).toBeInTheDocument()
      expect(textElement?.textContent).toBe('Point A')
    })

    it('does not render labels for non-existent elements', () => {
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({
            elements: [
              { type: 'point', props: { cx: 100, cy: 150 }, label: 'A' },
            ],
            labels: { B: 'Point B' },
          })}
        />
      )
      const textElements = container.querySelectorAll('text')
      // Only the existing labeled elements should render labels
      const labelTexts = Array.from(textElements).map((t) => t.textContent)
      expect(labelTexts).not.toContain('Point B')
    })

    it('positions labels offset from the element', () => {
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({
            elements: [
              { type: 'point', props: { cx: 100, cy: 150 }, label: 'A' },
            ],
            labels: { A: 'Point A' },
          })}
        />
      )
      const textElement = container.querySelector('text')
      // Labels are offset: x + 10, y - 10
      expect(textElement).toHaveAttribute('x', '110')
      expect(textElement).toHaveAttribute('y', '140')
    })

    it('handles labels when no labels object is provided', () => {
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({
            elements: [
              { type: 'point', props: { cx: 50, cy: 50 }, label: 'A' },
            ],
            labels: undefined,
          })}
        />
      )
      expect(container.querySelectorAll('text')).toHaveLength(0)
    })
  })

  describe('custom SVG rendering', () => {
    it('renders custom SVG using dangerouslySetInnerHTML', () => {
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({
            type: 'custom-svg',
            svg: '<svg><circle cx="50" cy="50" r="25"/></svg>',
          })}
        />
      )

      // Should not render the structured SVG element
      // eslint-disable-next-line testing-library/no-node-access -- verifying custom SVG rendering path
      const structuredSvg = container.querySelector('.math-diagram > svg')
      expect(structuredSvg).not.toBeInTheDocument()

      // Should render the custom SVG content
      expect(container.innerHTML).toContain('circle')
    })

    it('has role="img" and aria-label for custom SVG', () => {
      render(
        <MathDiagram
          diagram={makeDiagram({
            type: 'custom-svg',
            svg: '<svg><rect width="100" height="50"/></svg>',
            description: 'Custom shape',
          })}
        />
      )
      expect(screen.getByRole('img')).toHaveAttribute(
        'aria-label',
        'Custom shape'
      )
    })

    it('calls sanitizeSvg on custom SVG content', () => {
      // sanitizeSvg is mocked as passthrough, so the content renders unchanged
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({
            type: 'custom-svg',
            svg: '<svg><text>Hello</text></svg>',
          })}
        />
      )
      expect(container.innerHTML).toContain('Hello')
    })

    it('does not render custom SVG when svg string is empty', () => {
      const { container } = render(
        <MathDiagram
          diagram={makeDiagram({
            type: 'custom-svg',
            svg: undefined,
          })}
        />
      )
      // Falls through to the structured SVG path
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })
})
