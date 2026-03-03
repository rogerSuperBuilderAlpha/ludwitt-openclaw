import type { KeyboardEvent } from 'react'
import { ViewMode } from '@/app/customers/dashboard/types'

type ViewModeToggleProps = {
  value: ViewMode
  onChange: (v: ViewMode) => void
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    nextValue: ViewMode
  ) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        onChange('flat')
        break
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        onChange('projects')
        break
      case 'Home':
        event.preventDefault()
        onChange('flat')
        break
      case 'End':
        event.preventDefault()
        onChange('projects')
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        onChange(nextValue)
        break
      default:
        break
    }
  }

  return (
    <div
      className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg"
      role="radiogroup"
      aria-label="View mode"
    >
      <button
        onClick={() => onChange('flat')}
        onKeyDown={(event) => handleKeyDown(event, 'flat')}
        role="radio"
        aria-checked={value === 'flat'}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          value === 'flat'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
      >
        All Documents
      </button>
      <button
        onClick={() => onChange('projects')}
        onKeyDown={(event) => handleKeyDown(event, 'projects')}
        role="radio"
        aria-checked={value === 'projects'}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          value === 'projects'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
      >
        By Project
      </button>
    </div>
  )
}
