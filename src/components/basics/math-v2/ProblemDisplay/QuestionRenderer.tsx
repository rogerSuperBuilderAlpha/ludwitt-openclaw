'use client'

/**
 * QuestionRenderer Component
 *
 * Renders math questions with beautiful typography and LaTeX support.
 * Features:
 * - Mixed text and LaTeX inline content
 * - Block LaTeX equations
 * - Multi-part question support
 * - Responsive sizing
 *
 * Uses KaTeX for LaTeX rendering (via MathLatex component)
 */

import { QuestionSchema, QuestionPart } from '@/lib/types/math-v2'
import { MathLatex, MixedLatexText } from '@/components/basics/MathLatex'

interface QuestionRendererProps {
  /** The question schema to render */
  question: QuestionSchema
  /** Optional custom class name */
  className?: string
  /** Font size variant */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Render LaTeX content using KaTeX
 */
function LaTeXContent({
  latex,
  inline = false,
  className = '',
}: {
  latex: string
  inline?: boolean
  className?: string
}) {
  // Clean up any \[ \] or \( \) delimiters since MathLatex handles raw LaTeX
  const cleanLatex = latex
    .replace(/^\\\[/, '')
    .replace(/\\\]$/, '')
    .replace(/^\\\(/, '')
    .replace(/\\\)$/, '')
    .trim()

  return (
    <MathLatex latex={cleanLatex} displayMode={!inline} className={className} />
  )
}

/**
 * Parse and render mixed text/LaTeX content
 * Handles inline LaTeX delimiters: $...$ and $$...$$
 */
function MixedContent({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  return <MixedLatexText text={text} className={className} />
}

/**
 * Render a single question part
 */
function QuestionPartRenderer({
  part,
  index,
  className = '',
}: {
  part: QuestionPart
  index: number
  className?: string
}) {
  return (
    <div className={`question-part ${className}`}>
      <div className="flex items-start gap-3">
        {/* Part Label */}
        <span
          className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold mt-0.5"
          style={{
            background: 'var(--b-math-light)',
            color: 'var(--b-math-dark)',
          }}
        >
          {part.id || String.fromCharCode(97 + index)}
        </span>

        {/* Part Content */}
        <div className="flex-1">
          {part.latex ? (
            <div className="space-y-2">
              <MixedContent
                text={part.text}
                className="text-base b-text-primary leading-relaxed"
              />
              <div
                className="p-3 rounded-lg"
                style={{ background: 'var(--b-bg-muted)' }}
              >
                <LaTeXContent latex={part.latex} inline={false} />
              </div>
            </div>
          ) : (
            <MixedContent
              text={part.text}
              className="text-base b-text-primary leading-relaxed"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function QuestionRenderer({
  question,
  className = '',
  size = 'md',
}: QuestionRendererProps) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }

  const hasLatex = question.latex && question.latex.trim().length > 0
  const hasParts = question.parts && question.parts.length > 0

  return (
    <div
      className={`question-renderer ${className}`}
      role="region"
      aria-label="Math Problem"
    >
      {/* Main Question Text */}
      <div
        className={`
          question-text 
          ${sizeClasses[size]} 
          font-medium 
          b-text-primary 
          leading-relaxed
          ${hasParts ? 'mb-4' : ''}
        `}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <MixedContent text={question.text} />
      </div>

      {/* LaTeX Display (if separate from text) */}
      {hasLatex && (
        <div
          className="question-latex my-4 p-4 rounded-lg text-center"
          style={{
            background: 'var(--b-bg-muted)',
            border: '1px solid var(--b-border-default)',
          }}
        >
          <LaTeXContent
            latex={question.latex!}
            inline={false}
            className={sizeClasses[size]}
          />
        </div>
      )}

      {/* Multi-Part Questions */}
      {hasParts && (
        <div
          className="question-parts space-y-4 mt-4 pt-4"
          style={{ borderTop: '1px solid var(--b-border-default)' }}
        >
          {question.parts!.map((part, index) => (
            <QuestionPartRenderer
              key={part.id || index}
              part={part}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
