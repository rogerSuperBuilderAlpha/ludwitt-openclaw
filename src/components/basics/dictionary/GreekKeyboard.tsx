'use client'

/**
 * GreekKeyboard Component
 *
 * Virtual keyboard for typing Greek letters with support for:
 * - Lowercase, uppercase, and accented characters
 * - Backspace and clear functionality
 */

import { GREEK_LETTERS, GreekKeyboardCase } from '@/lib/hooks/useDictionary'

interface GreekKeyboardProps {
  keyboardCase: GreekKeyboardCase
  onCaseChange: (caseType: GreekKeyboardCase) => void
  onLetterClick: (letter: string) => void
  onBackspace: () => void
  onClear: () => void
}

export function GreekKeyboard({
  keyboardCase,
  onCaseChange,
  onLetterClick,
  onBackspace,
  onClear,
}: GreekKeyboardProps) {
  return (
    <div className="mt-3 p-3 b-bg-logic-light border b-border-logic rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium b-text-logic">
          Click letters to add to search
        </span>
        <div className="flex b-bg-card rounded-lg p-0.5 gap-0.5 shadow-sm">
          {(['lowercase', 'uppercase', 'accented'] as const).map((caseType) => (
            <button
              key={caseType}
              onClick={() => onCaseChange(caseType)}
              className={`px-2 py-1 text-[10px] font-medium rounded transition-all ${
                keyboardCase === caseType
                  ? 'b-bg-logic text-white'
                  : 'text-b-logic hover:b-bg-logic-light'
              }`}
            >
              {caseType === 'lowercase'
                ? 'abc'
                : caseType === 'uppercase'
                  ? 'ABC'
                  : 'άέή'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {GREEK_LETTERS[keyboardCase].map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((letter, letterIndex) =>
              letter ? (
                <button
                  key={letterIndex}
                  onClick={() => onLetterClick(letter)}
                  className="w-8 h-8 b-bg-card border b-border-logic rounded-lg text-lg font-medium b-text-primary hover:b-bg-logic-light hover:border-b-logic transition-all active:scale-95 shadow-sm"
                >
                  {letter}
                </button>
              ) : (
                <div key={letterIndex} className="w-8 h-8" />
              )
            )}
          </div>
        ))}
      </div>

      {/* Backspace and Clear */}
      <div className="flex justify-center mt-2 gap-2">
        <button
          onClick={onBackspace}
          className="px-4 py-1.5 bg-b-border b-text-secondary rounded-lg text-xs font-medium hover:bg-b-border-medium transition-all"
        >
          ← Backspace
        </button>
        <button
          onClick={onClear}
          className="px-4 py-1.5 b-bg-latin-light b-text-latin rounded-lg text-xs font-medium hover:bg-b-latin-border transition-all"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
