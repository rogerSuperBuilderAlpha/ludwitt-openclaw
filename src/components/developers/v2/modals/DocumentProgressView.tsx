'use client'

import { DevButton, DevProgress } from '../ui'
import type { DocumentProgressViewProps } from './documentDetailTypes'

export function DocumentProgressView({
  state,
  actions,
}: DocumentProgressViewProps) {
  const {
    progressPercentage,
    setProgressPercentage,
    progressNote,
    setProgressNote,
    updating,
    setView,
  } = state
  const { handleUpdateProgress } = actions

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--dev-space-4)',
      }}
    >
      <div>
        <DevProgress value={progressPercentage} size="lg" showLabel />
      </div>
      <div>
        <label
          htmlFor="v2-doc-progress-range"
          style={{
            display: 'block',
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
            marginBottom: 'var(--dev-space-2)',
          }}
        >
          Progress: {progressPercentage}%
        </label>
        <input
          id="v2-doc-progress-range"
          type="range"
          min="0"
          max="100"
          step="5"
          value={progressPercentage}
          onChange={(e) => setProgressPercentage(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label
          htmlFor="v2-doc-progress-note"
          style={{
            display: 'block',
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
            marginBottom: 'var(--dev-space-2)',
          }}
        >
          Progress Note (Optional)
        </label>
        <textarea
          id="v2-doc-progress-note"
          value={progressNote}
          onChange={(e) => setProgressNote(e.target.value)}
          placeholder="What have you accomplished?"
          className="dev-input"
          rows={3}
          style={{ width: '100%', resize: 'none' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 'var(--dev-space-2)',
          justifyContent: 'flex-end',
        }}
      >
        <DevButton variant="ghost" onClick={() => setView('details')}>
          Cancel
        </DevButton>
        <DevButton
          variant="primary"
          onClick={handleUpdateProgress}
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Update Progress'}
        </DevButton>
      </div>
    </div>
  )
}
