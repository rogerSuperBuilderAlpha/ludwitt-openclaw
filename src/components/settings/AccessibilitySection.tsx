'use client'

interface AccessibilitySectionProps {
  reduceMotion: boolean
  highContrast: boolean
  largerText: boolean
  onToggle: (key: 'reduceMotion' | 'highContrast' | 'largerText') => void
}

export function AccessibilitySection({ reduceMotion, highContrast, largerText, onToggle }: AccessibilitySectionProps) {
  const toggles = [
    { key: 'reduceMotion' as const, label: 'Reduce Motion', description: 'Minimize animations throughout the app', value: reduceMotion },
    { key: 'highContrast' as const, label: 'High Contrast', description: 'Increase color contrast for better visibility', value: highContrast },
    { key: 'largerText' as const, label: 'Larger Text', description: 'Increase text size throughout the app', value: largerText },
  ]

  return (
    <div className="space-y-4">
      {toggles.map(({ key, label, description, value }) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <p className="b-font-medium b-text-primary">{label}</p>
            <p className="b-text-xs b-text-muted">{description}</p>
          </div>
          <button
            onClick={() => onToggle(key)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer b-rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${value ? 'b-bg-logic' : 'b-bg-muted'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform b-rounded-full b-bg-elevated b-shadow-sm ring-0 transition duration-200 ease-in-out ${value ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      ))}
    </div>
  )
}
