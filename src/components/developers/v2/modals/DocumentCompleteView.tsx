'use client'

import { DevButton } from '../ui'
import type { DocumentCompleteViewProps } from './documentDetailTypes'

export function DocumentCompleteView({
  state,
  actions,
}: DocumentCompleteViewProps) {
  const {
    completionCategory,
    setCompletionCategory,
    completionCostCents,
    setCompletionCostCents,
    completionNotes,
    setCompletionNotes,
    completing,
    setView,
  } = state
  const { handleComplete } = actions

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--dev-space-4)',
      }}
    >
      <div>
        <label
          htmlFor="v2-doc-complete-category"
          style={{
            display: 'block',
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
            marginBottom: 'var(--dev-space-2)',
          }}
        >
          Category *
        </label>
        <input
          id="v2-doc-complete-category"
          type="text"
          value={completionCategory}
          onChange={(e) => setCompletionCategory(e.target.value)}
          placeholder="e.g., Website, App, Design"
          className="dev-input"
          style={{ width: '100%' }}
        />
      </div>

      <div
        style={{
          padding: 'var(--dev-space-4)',
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: 'var(--dev-radius-lg)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        }}
      >
        <label
          htmlFor="v2-doc-complete-cost"
          style={{
            display: 'block',
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
            marginBottom: 'var(--dev-space-2)',
            color: 'var(--dev-accent-success)',
          }}
        >
          Compute Cost (cents)
        </label>
        <p
          style={{
            fontSize: 'var(--dev-text-xs)',
            color: 'var(--dev-text-muted)',
            marginBottom: 'var(--dev-space-2)',
          }}
        >
          Enter raw AI cost. Customer pays 3x this amount.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-3)',
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <span
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--dev-text-muted)',
              }}
            >
              &cent;
            </span>
            <input
              id="v2-doc-complete-cost"
              type="number"
              min="0"
              step="1"
              value={completionCostCents || ''}
              onChange={(e) =>
                setCompletionCostCents(parseInt(e.target.value) || 0)
              }
              placeholder="0"
              className="dev-input"
              style={{ width: '100%', paddingLeft: 28 }}
            />
          </div>
          <div style={{ fontSize: 'var(--dev-text-sm)' }}>
            Customer pays:{' '}
            <strong style={{ color: 'var(--dev-accent-success)' }}>
              ${((completionCostCents * 3) / 100).toFixed(2)}
            </strong>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="v2-doc-complete-notes"
          style={{
            display: 'block',
            fontSize: 'var(--dev-text-sm)',
            fontWeight: 'var(--dev-font-medium)',
            marginBottom: 'var(--dev-space-2)',
          }}
        >
          Developer Notes (Optional)
        </label>
        <textarea
          id="v2-doc-complete-notes"
          value={completionNotes}
          onChange={(e) => setCompletionNotes(e.target.value)}
          placeholder="Notes about the completed work..."
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
          variant="success"
          onClick={handleComplete}
          disabled={completing || !completionCategory.trim()}
        >
          {completing
            ? 'Completing...'
            : completionCostCents > 0
              ? `Complete & Bill $${((completionCostCents * 3) / 100).toFixed(2)}`
              : 'Mark Complete'}
        </DevButton>
      </div>
    </div>
  )
}
