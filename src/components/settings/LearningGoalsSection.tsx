/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

interface LearningGoalsSectionProps {
  dailyXpGoal: string
  focusAreas: string[]
  onUpdate: (data: { dailyXpGoal: string; focusAreas: string[] }) => void
}

const XP_OPTIONS = [
  { value: '500', label: 'Casual - 500 XP/day (10 min)' },
  { value: '1000', label: 'Regular - 1,000 XP/day (20 min)' },
  { value: '2000', label: 'Serious - 2,000 XP/day (40 min)' },
  { value: '5000', label: 'Intense - 5,000 XP/day (1+ hour)' },
]

const SUBJECTS = ['Math', 'Reading', 'Latin', 'Greek', 'Logic']

export function LearningGoalsSection({
  dailyXpGoal,
  focusAreas,
  onUpdate,
}: LearningGoalsSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
          Daily XP Goal
        </label>
        <select
          className="b-input"
          value={dailyXpGoal}
          onChange={(e) =>
            onUpdate({ dailyXpGoal: e.target.value, focusAreas })
          }
        >
          {XP_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
          Focus Areas
        </label>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((subject) => (
            <button
              key={subject}
              onClick={() => {
                const updated = focusAreas.includes(subject)
                  ? focusAreas.filter((s) => s !== subject)
                  : [...focusAreas, subject]
                onUpdate({ dailyXpGoal, focusAreas: updated })
              }}
              className={`b-btn b-btn-sm ${
                focusAreas.includes(subject)
                  ? 'b-btn-logic-soft'
                  : 'b-btn-secondary hover:b-bg-logic-light hover:border-[var(--b-logic-border)] hover:b-text-logic-dark'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        <p className="b-text-xs b-text-muted b-mt-sm">
          Click to toggle focus subjects
        </p>
      </div>
    </div>
  )
}
