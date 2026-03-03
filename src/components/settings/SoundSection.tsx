'use client'

interface SoundSectionProps {
  soundEffects: boolean
  celebrationSounds: boolean
  onToggle: (key: 'soundEffects' | 'celebrationSounds') => void
}

export function SoundSection({ soundEffects, celebrationSounds, onToggle }: SoundSectionProps) {
  const toggles = [
    { key: 'soundEffects' as const, label: 'Sound Effects', description: 'Play sounds for correct/incorrect answers', value: soundEffects },
    { key: 'celebrationSounds' as const, label: 'Celebration Sounds', description: 'Play sounds when earning achievements', value: celebrationSounds },
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
