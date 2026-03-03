'use client'

/**
 * Greek Alphabet Helper
 *
 * Provides hover tooltips for Greek characters with pronunciation guides.
 * Can also render as a standalone reference panel.
 */

import { useState, ReactNode } from 'react'
import { Info, X } from '@phosphor-icons/react'

// Complete Greek alphabet with pronunciation guides
export const GREEK_ALPHABET: Record<
  string,
  {
    name: string
    uppercase: string
    sound: string
    tip: string
    example?: string
  }
> = {
  α: {
    name: 'alpha',
    uppercase: 'Α',
    sound: 'ah',
    tip: 'Like "a" in "father"',
    example: 'ἄνθρωπος',
  },
  β: {
    name: 'beta',
    uppercase: 'Β',
    sound: 'b',
    tip: 'Like English "b"',
    example: 'βιβλίον',
  },
  γ: {
    name: 'gamma',
    uppercase: 'Γ',
    sound: 'g',
    tip: 'Like "g" in "go"',
    example: 'γράφω',
  },
  δ: {
    name: 'delta',
    uppercase: 'Δ',
    sound: 'd',
    tip: 'Like English "d"',
    example: 'δίκη',
  },
  ε: {
    name: 'epsilon',
    uppercase: 'Ε',
    sound: 'e',
    tip: 'Like "e" in "pet"',
    example: 'ἔργον',
  },
  ζ: {
    name: 'zeta',
    uppercase: 'Ζ',
    sound: 'zd/dz',
    tip: 'Like "dz" in "adze"',
    example: 'ζῷον',
  },
  η: {
    name: 'eta',
    uppercase: 'Η',
    sound: 'ē',
    tip: 'Like "a" in "fate" (long)',
    example: 'ἡμέρα',
  },
  θ: {
    name: 'theta',
    uppercase: 'Θ',
    sound: 'th',
    tip: 'Like "th" in "thin"',
    example: 'θεός',
  },
  ι: {
    name: 'iota',
    uppercase: 'Ι',
    sound: 'i',
    tip: 'Like "i" in "machine"',
    example: 'ἵππος',
  },
  κ: {
    name: 'kappa',
    uppercase: 'Κ',
    sound: 'k',
    tip: 'Like English "k"',
    example: 'καλός',
  },
  λ: {
    name: 'lambda',
    uppercase: 'Λ',
    sound: 'l',
    tip: 'Like English "l"',
    example: 'λόγος',
  },
  μ: {
    name: 'mu',
    uppercase: 'Μ',
    sound: 'm',
    tip: 'Like English "m"',
    example: 'μέγας',
  },
  ν: {
    name: 'nu',
    uppercase: 'Ν',
    sound: 'n',
    tip: 'Like English "n"',
    example: 'νόμος',
  },
  ξ: {
    name: 'xi',
    uppercase: 'Ξ',
    sound: 'ks',
    tip: 'Like "x" in "fox"',
    example: 'ξένος',
  },
  ο: {
    name: 'omicron',
    uppercase: 'Ο',
    sound: 'o',
    tip: 'Like "o" in "pot"',
    example: 'ὄνομα',
  },
  π: {
    name: 'pi',
    uppercase: 'Π',
    sound: 'p',
    tip: 'Like English "p"',
    example: 'πόλις',
  },
  ρ: {
    name: 'rho',
    uppercase: 'Ρ',
    sound: 'r',
    tip: 'Rolled "r" like Spanish',
    example: 'ῥήτωρ',
  },
  σ: {
    name: 'sigma',
    uppercase: 'Σ',
    sound: 's',
    tip: 'Like English "s"',
    example: 'σοφία',
  },
  ς: {
    name: 'sigma (final)',
    uppercase: 'Σ',
    sound: 's',
    tip: 'Final form of sigma',
    example: 'λόγος',
  },
  τ: {
    name: 'tau',
    uppercase: 'Τ',
    sound: 't',
    tip: 'Like English "t"',
    example: 'τέχνη',
  },
  υ: {
    name: 'upsilon',
    uppercase: 'Υ',
    sound: 'u/ü',
    tip: 'Like French "u" or German "ü"',
    example: 'ὕδωρ',
  },
  φ: {
    name: 'phi',
    uppercase: 'Φ',
    sound: 'ph',
    tip: 'Like "ph" in "phone"',
    example: 'φίλος',
  },
  χ: {
    name: 'chi',
    uppercase: 'Χ',
    sound: 'kh',
    tip: 'Like "ch" in Scottish "loch"',
    example: 'χρόνος',
  },
  ψ: {
    name: 'psi',
    uppercase: 'Ψ',
    sound: 'ps',
    tip: 'Like "ps" in "lips"',
    example: 'ψυχή',
  },
  ω: {
    name: 'omega',
    uppercase: 'Ω',
    sound: 'ō',
    tip: 'Like "o" in "note" (long)',
    example: 'ὥρα',
  },
}

// Common diacritical marks
export const GREEK_DIACRITICS: Record<
  string,
  { name: string; description: string }
> = {
  '᾿': { name: 'smooth breathing', description: 'No "h" sound' },
  '῾': { name: 'rough breathing', description: 'Add "h" sound before vowel' },
  '´': { name: 'acute accent', description: 'Rising pitch' },
  '`': { name: 'grave accent', description: 'Falling pitch' },
  '῀': { name: 'circumflex', description: 'Rise then fall' },
  ι: { name: 'iota subscript', description: 'Silent, written below' },
}

interface GreekCharTooltipProps {
  char: string
  children: ReactNode
}

export function GreekCharTooltip({ char, children }: GreekCharTooltipProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get lowercase version for lookup
  const lowerChar = char.toLowerCase()
  const info = GREEK_ALPHABET[lowerChar]

  if (!info) {
    return <>{children}</>
  }

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          style={{ minWidth: '160px' }}
        >
          <div
            className="bg-gray-900 text-white text-xs rounded-lg p-2 shadow-lg"
            style={{ backgroundColor: 'var(--b-greek, #1e40af)' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold">{char}</span>
              <span className="text-white/80">{info.uppercase}</span>
            </div>
            <div className="font-medium capitalize">{info.name}</div>
            <div className="text-white/80 mt-0.5">
              Sound: <span className="font-mono">{info.sound}</span>
            </div>
            <div className="text-white/70 text-[10px] mt-1">{info.tip}</div>
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
              style={{ borderTopColor: 'var(--b-greek, #1e40af)' }}
            />
          </div>
        </div>
      )}
    </span>
  )
}

interface GreekAlphabetPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function GreekAlphabetPanel({
  isOpen,
  onClose,
}: GreekAlphabetPanelProps) {
  if (!isOpen) return null

  const letters = Object.entries(GREEK_ALPHABET)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-16 pb-8 overflow-y-auto">
      <div
        className="rounded-xl p-6 max-w-2xl mx-4 shadow-xl w-full"
        style={{ backgroundColor: 'var(--b-bg-elevated, #ffffff)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold b-text-primary flex items-center gap-2">
            🏺 Greek Alphabet Reference
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
          {letters.map(([letter, info]) => (
            <div
              key={letter}
              className="p-2 rounded-lg text-center border"
              style={{
                backgroundColor: 'var(--b-greek-light, #dbeafe)',
                borderColor: 'var(--b-greek-border, #93c5fd)',
              }}
            >
              <div
                className="text-2xl font-bold"
                style={{ color: 'var(--b-greek, #1e40af)' }}
              >
                {letter}
              </div>
              <div className="text-[10px] text-gray-600 capitalize">
                {info.name}
              </div>
              <div className="text-xs font-mono text-gray-500">
                {info.sound}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium b-text-secondary mb-2">
            Tips for Reading Greek
          </h3>
          <ul className="text-xs b-text-muted space-y-1">
            <li>
              • Hover over any Greek letter while reading to see its
              pronunciation
            </li>
            <li>
              • ῾ (rough breathing) before a vowel adds an &ldquo;h&rdquo; sound
            </li>
            <li>• Accents indicate which syllable to stress</li>
            <li>• ς is used only at the end of words; σ elsewhere</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Button to open the alphabet panel
interface GreekAlphabetButtonProps {
  onOpen: () => void
}

export function GreekAlphabetButton({ onOpen }: GreekAlphabetButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors"
      style={{
        backgroundColor: 'var(--b-greek-light, #dbeafe)',
        color: 'var(--b-greek, #1e40af)',
      }}
      title="Greek alphabet reference"
    >
      <Info size={14} weight="fill" />
      Alphabet Guide
    </button>
  )
}
