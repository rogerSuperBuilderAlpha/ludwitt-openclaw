'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  CheckSquare,
  Plus,
  Check,
  Trash,
  Target,
  TrendUp,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevStatCard,
  DevEmptyState,
  DevProgress,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { toDate } from '@/lib/utils/timestamp'

interface Goal {
  id: string
  text: string
  completed: boolean
  createdAt: string // ISO string for localStorage
}

const GOALS_STORAGE_KEY = 'dev-goals'

/**
 * Daily Goals Page - Set and track daily objectives
 */
export default function GoalsPage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  // Goals state (persisted to localStorage)
  const [goals, setGoals] = useState<Goal[]>([])
  const [goalsLoaded, setGoalsLoaded] = useState(false)
  const [newGoalText, setNewGoalText] = useState('')
  const [showAddGoal, setShowAddGoal] = useState(false)

  // Load goals from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(GOALS_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setGoals(parsed)
      } catch {
        // Invalid JSON, start fresh
        setGoals([])
      }
    }
    setGoalsLoaded(true)
  }, [])

  // Save goals to localStorage whenever they change
  const saveGoals = useCallback((newGoals: Goal[]) => {
    setGoals(newGoals)
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(newGoals))
  }, [])

  // Today's stats
  const todayStats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const completedToday = submissions.filter((s) => {
      if (s.status !== 'completed') return false
      const completedAt = s.approvedAt ? toDate(s.approvedAt) : null
      return completedAt && completedAt >= today
    }).length

    const inProgress = submissions.filter(
      (s) =>
        s.status === 'in-progress' &&
        (isAdminView || s.assignedTo === user?.uid)
    ).length

    return { completedToday, inProgress }
  }, [submissions, user?.uid, isAdminView])

  const addGoal = () => {
    if (!newGoalText.trim()) return

    const goal: Goal = {
      id: `goal-${Date.now()}`,
      text: newGoalText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    saveGoals([...goals, goal])
    setNewGoalText('')
    setShowAddGoal(false)
  }

  const toggleGoal = (id: string) => {
    saveGoals(
      goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    )
  }

  const deleteGoal = (id: string) => {
    saveGoals(goals.filter((g) => g.id !== id))
  }

  const completedGoals = goals.filter((g) => g.completed).length
  const totalGoals = goals.length
  const progressPercent =
    totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

  if (loading || !goalsLoaded) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: 'var(--dev-space-4) var(--dev-space-5)',
            borderBottom: '1px solid var(--dev-border-subtle)',
          }}
        >
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          <DevSkeleton height={200} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          padding: 'var(--dev-space-4) var(--dev-space-5)',
          borderBottom: '1px solid var(--dev-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--dev-text-xl)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-1)',
            }}
          >
            Daily Goals
          </h1>
          <p
            style={{
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <DevButton
          variant="primary"
          size="sm"
          onClick={() => setShowAddGoal(true)}
        >
          <Plus size={16} style={{ marginRight: 4 }} />
          Add Goal
        </DevButton>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Progress Overview */}
        <DevCard padding="lg" style={{ marginBottom: 'var(--dev-space-5)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dev-space-5)',
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `conic-gradient(
                var(--dev-accent-success) ${progressPercent}%,
                var(--dev-bg-muted) ${progressPercent}%
              )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'var(--dev-bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--dev-text-xl)',
                  fontWeight: 'var(--dev-font-bold)',
                }}
              >
                {completedGoals}/{totalGoals}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 'var(--dev-text-lg)',
                  fontWeight: 'var(--dev-font-semibold)',
                  marginBottom: 'var(--dev-space-2)',
                }}
              >
                {progressPercent === 100
                  ? '🎉 All goals complete!'
                  : progressPercent >= 50
                    ? '💪 Keep going!'
                    : 'Ready to crush your goals?'}
              </div>
              <DevProgress value={progressPercent} size="lg" color="success" />
            </div>
          </div>
        </DevCard>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--dev-space-4)',
            marginBottom: 'var(--dev-space-5)',
          }}
        >
          <DevStatCard
            title="Completed Today"
            value={todayStats.completedToday}
            icon={<Check size={20} />}
            color="success"
          />
          <DevStatCard
            title="In Progress"
            value={todayStats.inProgress}
            icon={<TrendUp size={20} />}
            color="info"
          />
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <DevCard padding="md" style={{ marginBottom: 'var(--dev-space-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
              <input
                type="text"
                placeholder="What do you want to accomplish today?"
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                className="dev-input"
                style={{ flex: 1 }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
              <DevButton
                variant="primary"
                onClick={addGoal}
                disabled={!newGoalText.trim()}
              >
                Add
              </DevButton>
              <DevButton variant="ghost" onClick={() => setShowAddGoal(false)}>
                Cancel
              </DevButton>
            </div>
          </DevCard>
        )}

        {/* Goals List */}
        <DevCard padding="md">
          <h2
            style={{
              fontSize: 'var(--dev-text-base)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            Today&apos;s Goals
          </h2>

          {goals.length === 0 ? (
            <DevEmptyState
              icon={<Target size={24} />}
              title="No goals yet"
              description="Add a goal to start tracking your progress"
              action={{
                label: 'Add Goal',
                onClick: () => setShowAddGoal(true),
                variant: 'primary',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--dev-space-2)',
              }}
            >
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  style={{
                    padding: 'var(--dev-space-3)',
                    background: goal.completed
                      ? 'rgba(34, 197, 94, 0.1)'
                      : 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--dev-space-3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 'var(--dev-radius-sm)',
                      border: `2px solid ${goal.completed ? 'var(--dev-accent-success)' : 'var(--dev-border-default)'}`,
                      background: goal.completed
                        ? 'var(--dev-accent-success)'
                        : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    {goal.completed && (
                      <Check size={14} color="white" weight="bold" />
                    )}
                  </button>

                  <span
                    style={{
                      flex: 1,
                      textDecoration: goal.completed ? 'line-through' : 'none',
                      color: goal.completed
                        ? 'var(--dev-text-muted)'
                        : 'var(--dev-text-primary)',
                    }}
                  >
                    {goal.text}
                  </span>

                  <button
                    onClick={() => deleteGoal(goal.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--dev-text-muted)',
                      cursor: 'pointer',
                      padding: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.5,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = '0.5')
                    }
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </DevCard>
      </div>
    </div>
  )
}
