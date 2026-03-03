'use client'

import { useState, useEffect } from 'react'
import { X, Lightbulb, ArrowRight } from 'lucide-react'

interface NudgeConfig {
  id: string
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  variant: 'info' | 'tip' | 'action' | 'celebration'
}

interface SmartNudgeProps {
  userId: string
  pendingCount: number
  inProgressCount: number
  completedCount: number
  acceptedCount: number
  totalDocs: number
  totalProjects: number
  onApproveAll?: () => void
  onAddDocument?: () => void
  onCreateProject?: () => void
}

export function SmartNudge({
  userId,
  pendingCount,
  inProgressCount,
  completedCount,
  acceptedCount,
  totalDocs,
  totalProjects,
  onApproveAll,
  onAddDocument,
  onCreateProject,
}: SmartNudgeProps) {
  const [dismissedNudges, setDismissedNudges] = useState<Set<string>>(new Set())
  const [isVisible, setIsVisible] = useState(true)

  // Load dismissed nudges from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`nudges-dismissed-${userId}`)
    if (stored) {
      setDismissedNudges(new Set(JSON.parse(stored)))
    }
  }, [userId])

  const dismissNudge = (nudgeId: string) => {
    const newDismissed = new Set(dismissedNudges)
    newDismissed.add(nudgeId)
    setDismissedNudges(newDismissed)
    localStorage.setItem(
      `nudges-dismissed-${userId}`,
      JSON.stringify([...newDismissed])
    )
    setIsVisible(false)
  }

  // Determine which nudge to show based on user state
  const getNudge = (): NudgeConfig | null => {
    // Priority 1: Pending documents need approval
    if (pendingCount > 0 && !dismissedNudges.has('approve-pending')) {
      return {
        id: 'approve-pending',
        title: 'Quick Tip',
        message: `You have ${pendingCount} document${pendingCount > 1 ? 's' : ''} waiting for approval. Approving lets your developer start working right away!`,
        actionLabel: 'Approve Now',
        onAction: onApproveAll,
        variant: 'action',
      }
    }

    // Priority 2: Completed work needs review
    if (completedCount > 0 && !dismissedNudges.has('review-completed')) {
      return {
        id: 'review-completed',
        title: 'Work Ready!',
        message: `${completedCount} iteration${completedCount > 1 ? 's are' : ' is'} ready for your review. Accept to mark as complete and continue building.`,
        variant: 'celebration',
      }
    }

    // Priority 3: First project created, no documents
    if (
      totalProjects > 0 &&
      totalDocs === 0 &&
      !dismissedNudges.has('add-first-doc')
    ) {
      return {
        id: 'add-first-doc',
        title: 'Next Step',
        message:
          'Great start! Now add your first requirements document to begin development.',
        actionLabel: 'Add Document',
        onAction: onAddDocument,
        variant: 'tip',
      }
    }

    // Priority 4: No projects yet
    if (totalProjects === 0 && !dismissedNudges.has('create-first-project')) {
      return {
        id: 'create-first-project',
        title: 'Welcome!',
        message: 'Create your first project to organize your development work.',
        actionLabel: 'Create Project',
        onAction: onCreateProject,
        variant: 'info',
      }
    }

    // Priority 5: All work in progress - encouragement
    if (
      inProgressCount > 0 &&
      pendingCount === 0 &&
      completedCount === 0 &&
      !dismissedNudges.has('in-progress-tip')
    ) {
      return {
        id: 'in-progress-tip',
        title: 'In Progress',
        message: `Your developer is working on ${inProgressCount} item${inProgressCount > 1 ? 's' : ''}. You'll be notified when work is ready for review.`,
        variant: 'info',
      }
    }

    // Priority 6: Milestone celebration
    if (acceptedCount === 5 && !dismissedNudges.has('milestone-5')) {
      return {
        id: 'milestone-5',
        title: '🎉 Milestone!',
        message:
          'You&apos;ve completed 5 iterations! Great progress on your project.',
        variant: 'celebration',
      }
    }

    if (acceptedCount === 10 && !dismissedNudges.has('milestone-10')) {
      return {
        id: 'milestone-10',
        title: '🏆 Amazing!',
        message: '10 iterations complete! Your project is really taking shape.',
        variant: 'celebration',
      }
    }

    return null
  }

  const nudge = getNudge()

  if (!nudge || !isVisible) return null

  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    tip: 'bg-amber-50 border-amber-200 text-amber-800',
    action: 'bg-purple-50 border-purple-200 text-purple-800',
    celebration: 'bg-green-50 border-green-200 text-green-800',
  }

  const iconColors = {
    info: 'text-blue-500',
    tip: 'text-amber-500',
    action: 'text-purple-500',
    celebration: 'text-green-500',
  }

  return (
    <div
      className={`relative p-4 rounded-xl border ${variantStyles[nudge.variant]} animate-in slide-in-from-top-2 fade-in duration-300`}
    >
      <button
        onClick={() => dismissNudge(nudge.id)}
        className="absolute top-2 right-2 p-1 hover:bg-white/50 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 opacity-60" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className={`flex-shrink-0 mt-0.5 ${iconColors[nudge.variant]}`}>
          <Lightbulb className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-1">{nudge.title}</p>
          <p className="text-sm opacity-90">{nudge.message}</p>

          {nudge.actionLabel && nudge.onAction && (
            <button
              onClick={() => {
                nudge.onAction?.()
                dismissNudge(nudge.id)
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              {nudge.actionLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Don't show again option */}
      <button
        onClick={() => dismissNudge(nudge.id)}
        className="mt-3 text-xs opacity-60 hover:opacity-100 transition-opacity"
      >
        Don&apos;t show this again
      </button>
    </div>
  )
}
