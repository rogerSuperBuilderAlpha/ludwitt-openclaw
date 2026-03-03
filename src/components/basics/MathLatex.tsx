'use client'

/**
 * MathLatex Component
 *
 * Renders mathematical notation using KaTeX for beautiful math display.
 * Supports both inline and display (block) modes.
 */

import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { logger } from '@/lib/logger'

interface MathLatexProps {
  /** LaTeX string to render */
  latex: string
  /** Display mode: true for block/centered, false for inline */
  displayMode?: boolean
  /** Additional CSS classes */
  className?: string
  /** Error fallback - what to show if LaTeX fails to parse */
  errorFallback?: string
}

/**
 * Renders LaTeX math notation using KaTeX
 *
 * @example
 * // Inline math
 * <MathLatex latex="x^2 + y^2 = z^2" />
 *
 * @example
 * // Display (block) math
 * <MathLatex latex="\int_0^1 x^2 \, dx" displayMode />
 *
 * @example
 * // Quadratic formula
 * <MathLatex latex="\frac{-b \pm \sqrt{b^2-4ac}}{2a}" displayMode />
 */
export function MathLatex({
  latex,
  displayMode = false,
  className = '',
  errorFallback,
}: MathLatexProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode,
        strict: false,
        trust: false,
        // Enable additional macros for convenience
        macros: {
          '\\R': '\\mathbb{R}',
          '\\N': '\\mathbb{N}',
          '\\Z': '\\mathbb{Z}',
          '\\Q': '\\mathbb{Q}',
          '\\C': '\\mathbb{C}',
        },
      })
    } catch (error) {
      logger.error('MathLatex', 'KaTeX render error', { error })
      return null
    }
  }, [latex, displayMode])

  if (!html) {
    // Fallback to plain text if rendering fails
    return (
      <span className={`math-fallback b-text-secondary font-mono ${className}`}>
        {errorFallback || latex}
      </span>
    )
  }

  if (displayMode) {
    return (
      <div
        className={`math-display my-4 overflow-x-auto ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
        role="math"
        aria-label={`Mathematical expression: ${latex}`}
      />
    )
  }

  return (
    <span
      className={`math-inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      role="math"
      aria-label={`Mathematical expression: ${latex}`}
    />
  )
}

/**
 * Helper function to safely render LaTeX in strings with mixed content
 * Looks for text between $ delimiters and renders them
 *
 * @example
 * renderMixedLatex("The formula $x^2$ is used here")
 * // Returns array of React elements with text and LaTeX mixed
 */
export function parseMixedLatex(
  text: string
): Array<{ type: 'text' | 'latex'; content: string; displayMode?: boolean }> {
  const parts: Array<{
    type: 'text' | 'latex'
    content: string
    displayMode?: boolean
  }> = []

  // Match both $...$ (inline) and $$...$$ (display) patterns
  const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      })
    }

    // Add the LaTeX
    const isDisplay = match[0].startsWith('$$')
    const latex = isDisplay ? match[0].slice(2, -2) : match[0].slice(1, -1)

    parts.push({
      type: 'latex',
      content: latex,
      displayMode: isDisplay,
    })

    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
    })
  }

  return parts
}

/**
 * Component that renders text with embedded LaTeX
 * Use $ for inline math and $$ for display math
 */
interface MixedLatexTextProps {
  text: string
  className?: string
}

export function MixedLatexText({ text, className = '' }: MixedLatexTextProps) {
  const parts = useMemo(() => parseMixedLatex(text), [text])

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index}>{part.content}</span>
        }
        return (
          <MathLatex
            key={index}
            latex={part.content}
            displayMode={part.displayMode}
          />
        )
      })}
    </span>
  )
}

/**
 * Common LaTeX templates for quick use
 */
export const LatexTemplates = {
  /** Fraction: a/b */
  fraction: (numerator: string, denominator: string) =>
    `\\frac{${numerator}}{${denominator}}`,

  /** Square root */
  sqrt: (content: string) => `\\sqrt{${content}}`,

  /** Nth root */
  nthRoot: (n: string, content: string) => `\\sqrt[${n}]{${content}}`,

  /** Exponent */
  power: (base: string, exponent: string) => `${base}^{${exponent}}`,

  /** Subscript */
  subscript: (base: string, sub: string) => `${base}_{${sub}}`,

  /** Quadratic formula */
  quadraticFormula: () => '\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',

  /** Definite integral */
  integral: (
    lower: string,
    upper: string,
    integrand: string,
    variable: string = 'x'
  ) => `\\int_{${lower}}^{${upper}} ${integrand} \\, d${variable}`,

  /** Summation */
  sum: (lower: string, upper: string, term: string) =>
    `\\sum_{${lower}}^{${upper}} ${term}`,

  /** Limit */
  limit: (variable: string, approaches: string, expression: string) =>
    `\\lim_{${variable} \\to ${approaches}} ${expression}`,

  /** Derivative */
  derivative: (func: string, variable: string = 'x') =>
    `\\frac{d}{d${variable}}\\left(${func}\\right)`,

  /** 2x2 Matrix */
  matrix2x2: (a: string, b: string, c: string, d: string) =>
    `\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}`,

  /** 3x3 Matrix */
  matrix3x3: (values: string[][]) => {
    const rows = values.map((row) => row.join(' & ')).join(' \\\\ ')
    return `\\begin{pmatrix} ${rows} \\end{pmatrix}`
  },

  /** Absolute value */
  abs: (content: string) => `\\left|${content}\\right|`,

  /** Parentheses (auto-sized) */
  parens: (content: string) => `\\left(${content}\\right)`,

  /** Trigonometric functions */
  sin: (angle: string) => `\\sin\\left(${angle}\\right)`,
  cos: (angle: string) => `\\cos\\left(${angle}\\right)`,
  tan: (angle: string) => `\\tan\\left(${angle}\\right)`,

  /** Greek letters */
  pi: '\\pi',
  theta: '\\theta',
  alpha: '\\alpha',
  beta: '\\beta',
  gamma: '\\gamma',
  delta: '\\delta',
  epsilon: '\\epsilon',
  sigma: '\\sigma',
  omega: '\\omega',
  infinity: '\\infty',
}
