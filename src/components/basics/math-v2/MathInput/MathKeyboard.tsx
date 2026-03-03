'use client'

/**
 * MathKeyboard Component (V2)
 *
 * Quick-access symbol buttons organized by category for inserting
 * LaTeX commands into the FormulaEditor. Optimized for MathLive integration.
 */

import { useState, useCallback, memo } from 'react'
import { CaretDown, CaretUp, Keyboard } from '@phosphor-icons/react'

interface SymbolItem {
  /** Display text shown on button */
  display: string
  /** LaTeX command to insert */
  latex: string
  /** Tooltip description */
  tooltip: string
}

interface SymbolGroup {
  name: string
  symbols: SymbolItem[]
}

// LaTeX commands for MathLive insertion
const SYMBOL_GROUPS: SymbolGroup[] = [
  {
    name: 'Exponents & Roots',
    symbols: [
      { display: 'x²', latex: '^2', tooltip: 'Squared' },
      { display: 'x³', latex: '^3', tooltip: 'Cubed' },
      { display: 'xⁿ', latex: '^{}', tooltip: 'Power' },
      { display: '√', latex: '\\sqrt{}', tooltip: 'Square root' },
      { display: '∛', latex: '\\sqrt[3]{}', tooltip: 'Cube root' },
      { display: 'ⁿ√', latex: '\\sqrt[]{}', tooltip: 'nth root' },
    ],
  },
  {
    name: 'Fractions',
    symbols: [
      { display: '÷', latex: '\\frac{}{}', tooltip: 'Fraction' },
      { display: '½', latex: '\\frac{1}{2}', tooltip: 'One half' },
      { display: '⅓', latex: '\\frac{1}{3}', tooltip: 'One third' },
      { display: '¼', latex: '\\frac{1}{4}', tooltip: 'One quarter' },
      { display: '⅔', latex: '\\frac{2}{3}', tooltip: 'Two thirds' },
      { display: '¾', latex: '\\frac{3}{4}', tooltip: 'Three quarters' },
    ],
  },
  {
    name: 'Operators',
    symbols: [
      { display: '×', latex: '\\times', tooltip: 'Multiply' },
      { display: '÷', latex: '\\div', tooltip: 'Divide' },
      { display: '±', latex: '\\pm', tooltip: 'Plus or minus' },
      { display: '∓', latex: '\\mp', tooltip: 'Minus or plus' },
      { display: '·', latex: '\\cdot', tooltip: 'Dot multiply' },
      { display: '∘', latex: '\\circ', tooltip: 'Composition' },
    ],
  },
  {
    name: 'Comparison',
    symbols: [
      { display: '≤', latex: '\\le', tooltip: 'Less than or equal' },
      { display: '≥', latex: '\\ge', tooltip: 'Greater than or equal' },
      { display: '≠', latex: '\\ne', tooltip: 'Not equal' },
      { display: '≈', latex: '\\approx', tooltip: 'Approximately' },
      { display: '≡', latex: '\\equiv', tooltip: 'Equivalent' },
      { display: '∝', latex: '\\propto', tooltip: 'Proportional to' },
    ],
  },
  {
    name: 'Greek Letters',
    symbols: [
      { display: 'π', latex: '\\pi', tooltip: 'Pi' },
      { display: 'θ', latex: '\\theta', tooltip: 'Theta' },
      { display: 'α', latex: '\\alpha', tooltip: 'Alpha' },
      { display: 'β', latex: '\\beta', tooltip: 'Beta' },
      { display: 'Δ', latex: '\\Delta', tooltip: 'Delta' },
      { display: 'Σ', latex: '\\Sigma', tooltip: 'Sigma (sum)' },
      { display: 'λ', latex: '\\lambda', tooltip: 'Lambda' },
      { display: 'μ', latex: '\\mu', tooltip: 'Mu' },
      { display: 'σ', latex: '\\sigma', tooltip: 'Sigma' },
      { display: 'ω', latex: '\\omega', tooltip: 'Omega' },
      { display: 'φ', latex: '\\phi', tooltip: 'Phi' },
      { display: 'ε', latex: '\\epsilon', tooltip: 'Epsilon' },
    ],
  },
  {
    name: 'Functions',
    symbols: [
      { display: 'sin', latex: '\\sin()', tooltip: 'Sine' },
      { display: 'cos', latex: '\\cos()', tooltip: 'Cosine' },
      { display: 'tan', latex: '\\tan()', tooltip: 'Tangent' },
      { display: 'log', latex: '\\log()', tooltip: 'Logarithm' },
      { display: 'ln', latex: '\\ln()', tooltip: 'Natural log' },
      { display: 'lim', latex: '\\lim_{}', tooltip: 'Limit' },
    ],
  },
  {
    name: 'Calculus',
    symbols: [
      { display: '∫', latex: '\\int', tooltip: 'Integral' },
      { display: '∮', latex: '\\oint', tooltip: 'Contour integral' },
      { display: 'd/dx', latex: '\\frac{d}{dx}', tooltip: 'Derivative' },
      { display: '∂', latex: '\\partial', tooltip: 'Partial' },
      { display: '∑', latex: '\\sum_{}^{}', tooltip: 'Summation' },
      { display: '∏', latex: '\\prod_{}^{}', tooltip: 'Product' },
      { display: '∞', latex: '\\infty', tooltip: 'Infinity' },
    ],
  },
  {
    name: 'Sets & Logic',
    symbols: [
      { display: '∈', latex: '\\in', tooltip: 'Element of' },
      { display: '∉', latex: '\\notin', tooltip: 'Not element of' },
      { display: '⊂', latex: '\\subset', tooltip: 'Subset' },
      { display: '∪', latex: '\\cup', tooltip: 'Union' },
      { display: '∩', latex: '\\cap', tooltip: 'Intersection' },
      { display: '∅', latex: '\\emptyset', tooltip: 'Empty set' },
      { display: '∀', latex: '\\forall', tooltip: 'For all' },
      { display: '∃', latex: '\\exists', tooltip: 'Exists' },
    ],
  },
  {
    name: 'Brackets',
    symbols: [
      { display: '( )', latex: '\\left(\\right)', tooltip: 'Parentheses' },
      { display: '[ ]', latex: '\\left[\\right]', tooltip: 'Brackets' },
      { display: '{ }', latex: '\\left\\{\\right\\}', tooltip: 'Braces' },
      { display: '| |', latex: '\\left|\\right|', tooltip: 'Absolute value' },
      { display: '⌊ ⌋', latex: '\\lfloor\\rfloor', tooltip: 'Floor' },
      { display: '⌈ ⌉', latex: '\\lceil\\rceil', tooltip: 'Ceiling' },
    ],
  },
  {
    name: 'Other',
    symbols: [
      { display: '°', latex: '^\\circ', tooltip: 'Degrees' },
      { display: '%', latex: '\\%', tooltip: 'Percent' },
      { display: '→', latex: '\\rightarrow', tooltip: 'Arrow' },
      { display: '⇒', latex: '\\Rightarrow', tooltip: 'Implies' },
      { display: '↔', latex: '\\leftrightarrow', tooltip: 'If and only if' },
      { display: '∴', latex: '\\therefore', tooltip: 'Therefore' },
    ],
  },
]

// Quick access symbols (always visible)
const QUICK_SYMBOLS: SymbolItem[] = [
  { display: 'x²', latex: '^2', tooltip: 'Squared' },
  { display: '√', latex: '\\sqrt{}', tooltip: 'Square root' },
  { display: '÷', latex: '\\frac{}{}', tooltip: 'Fraction' },
  { display: 'π', latex: '\\pi', tooltip: 'Pi' },
  { display: '×', latex: '\\times', tooltip: 'Multiply' },
  { display: '≤', latex: '\\le', tooltip: 'Less than or equal' },
  { display: '≥', latex: '\\ge', tooltip: 'Greater than or equal' },
  { display: '±', latex: '\\pm', tooltip: 'Plus/minus' },
  { display: '∞', latex: '\\infty', tooltip: 'Infinity' },
]

interface MathKeyboardProps {
  /** Called when a symbol should be inserted */
  onInsert: (latex: string) => void
  /** Whether the keyboard is disabled */
  disabled?: boolean
  /** Compact mode (fewer quick symbols) */
  compact?: boolean
}

export const MathKeyboardV2 = memo(function MathKeyboardV2({
  onInsert,
  disabled = false,
  compact = false,
}: MathKeyboardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInsert = useCallback(
    (latex: string) => {
      if (!disabled) {
        onInsert(latex)
      }
    },
    [onInsert, disabled]
  )

  const displaySymbols = compact ? QUICK_SYMBOLS.slice(0, 5) : QUICK_SYMBOLS

  return (
    <div className="b-mb-md">
      {/* Quick Access Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 b-text-muted b-text-xs">
          <Keyboard size={14} weight="bold" />
          <span className="hidden sm:inline">Math:</span>
        </div>

        {/* Quick Symbols */}
        <div className="flex flex-wrap gap-1">
          {displaySymbols.map((sym, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleInsert(sym.latex)}
              disabled={disabled}
              title={sym.tooltip}
              className="
                px-2 py-1 
                b-text-sm b-font-mono 
                b-bg-muted hover:b-bg-math-light 
                b-rounded-md b-border 
                transition-colors 
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {sym.display}
            </button>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            flex items-center gap-1 
            px-2 py-1 
            b-text-xs b-text-muted 
            hover:b-text-primary 
            b-rounded-md hover:b-bg-muted 
            transition-colors
          "
        >
          {isExpanded ? (
            <>
              Less <CaretUp size={12} weight="bold" />
            </>
          ) : (
            <>
              More <CaretDown size={12} weight="bold" />
            </>
          )}
        </button>
      </div>

      {/* Expanded Symbol Groups */}
      {isExpanded && (
        <div className="b-mt-md b-p-md b-bg-muted b-rounded-lg b-border b-animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SYMBOL_GROUPS.map((group) => (
              <div key={group.name}>
                <h4 className="b-text-xs b-font-semibold b-text-muted b-mb-sm uppercase tracking-wide">
                  {group.name}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {group.symbols.map((sym, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInsert(sym.latex)}
                      disabled={disabled}
                      title={sym.tooltip}
                      className="
                        px-2 py-1 
                        b-text-sm b-font-mono 
                        bg-white hover:b-bg-math-light 
                        b-rounded-md b-border 
                        transition-colors 
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      {sym.display}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="b-mt-md b-pt-md b-border-t">
            <p className="b-text-xs b-text-muted">
              <strong>Tip:</strong> You can also type LaTeX directly:{' '}
              <code className="b-bg-elevated px-1 b-rounded">x^2</code> for x²,{' '}
              <code className="b-bg-elevated px-1 b-rounded">\sqrt{'{x}'}</code>{' '}
              for √x,{' '}
              <code className="b-bg-elevated px-1 b-rounded">
                \frac{'{a}{b}'}
              </code>{' '}
              for fractions
            </p>
          </div>
        </div>
      )}
    </div>
  )
})
