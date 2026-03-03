'use client'

import { useMemo } from 'react'
import {
  FolderOpen,
  ChevronRight,
  CheckCircle,
  Clock,
  Loader2,
} from 'lucide-react'
import { CustomerDocument } from '@/lib/types/customer'
import { Project } from '@/lib/types/project'

interface ProjectProgressCardsProps {
  projects: Project[]
  documents: CustomerDocument[]
  onSelectProject?: (projectId: string) => void
  className?: string
}

interface ProjectProgress {
  project: Project
  totalDocs: number
  pendingDocs: number
  inProgressDocs: number
  completedDocs: number
  acceptedDocs: number
  progressPercent: number
  lastActivity: Date | null
}

export function ProjectProgressCards({
  projects,
  documents,
  onSelectProject,
  className = '',
}: ProjectProgressCardsProps) {
  const projectProgress = useMemo((): ProjectProgress[] => {
    const mapped: ProjectProgress[] = projects.map((project) => {
      const projectDocs = documents.filter((d) => d.projectId === project.id)
      const pending = projectDocs.filter((d) => d.status === 'pending').length
      const inProgress = projectDocs.filter(
        (d) => d.status === 'approved' || d.status === 'in-progress'
      ).length
      const completed = projectDocs.filter(
        (d) => d.status === 'completed'
      ).length
      const accepted = projectDocs.filter((d) => d.status === 'accepted').length

      // Calculate progress: accepted docs / total docs (or 0 if no docs)
      const total = projectDocs.length
      const progressPercent =
        total > 0 ? Math.round((accepted / Math.max(total, 1)) * 100) : 0

      // Find last activity
      let lastActivityDate: Date | null = null
      projectDocs.forEach((doc) => {
        const rawDate = doc.addedAt
        let addedDate: Date | null = null
        if (rawDate) {
          // Handle Firestore Timestamp or string/number
          if (typeof rawDate === 'object' && 'toDate' in rawDate) {
            addedDate = (rawDate as { toDate: () => Date }).toDate()
          } else {
            addedDate = new Date(rawDate as unknown as string | number)
          }
        }
        if (addedDate && (!lastActivityDate || addedDate > lastActivityDate)) {
          lastActivityDate = addedDate
        }
      })

      return {
        project,
        totalDocs: total,
        pendingDocs: pending,
        inProgressDocs: inProgress,
        completedDocs: completed,
        acceptedDocs: accepted,
        progressPercent,
        lastActivity: lastActivityDate,
      }
    })

    // Sort by last activity, most recent first
    return mapped.sort((a, b) => {
      const aTime = a.lastActivity?.getTime() ?? 0
      const bTime = b.lastActivity?.getTime() ?? 0
      return bTime - aTime
    })
  }, [projects, documents])

  const getRelativeTime = (date: Date | null) => {
    if (!date) return 'No activity'

    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    )

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Your Projects</h3>
        <span className="text-xs text-gray-500">{projects.length} total</span>
      </div>

      {projectProgress.map(
        ({
          project,
          totalDocs,
          pendingDocs,
          inProgressDocs,
          completedDocs,
          acceptedDocs,
          progressPercent,
          lastActivity,
        }) => (
          <button
            key={project.id}
            onClick={() => onSelectProject?.(project.id)}
            className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900 truncate max-w-[180px]">
                  {project.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-700 font-medium">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(progressPercent, 2)}%` }}
                />
              </div>
            </div>

            {/* Status Counts */}
            <div className="flex items-center gap-3 text-xs">
              {pendingDocs > 0 && (
                <div className="flex items-center gap-1 text-amber-600">
                  <Clock className="w-3 h-3" />
                  <span>{pendingDocs} pending</span>
                </div>
              )}
              {inProgressDocs > 0 && (
                <div className="flex items-center gap-1 text-purple-600">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>{inProgressDocs} active</span>
                </div>
              )}
              {completedDocs > 0 && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>{completedDocs} review</span>
                </div>
              )}
              {acceptedDocs > 0 && (
                <div className="flex items-center gap-1 text-blue-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>{acceptedDocs} done</span>
                </div>
              )}
              {totalDocs === 0 && (
                <span className="text-gray-400">No documents yet</span>
              )}
            </div>

            {/* Last Activity */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400">
                Last activity: {getRelativeTime(lastActivity)}
              </span>
            </div>
          </button>
        )
      )}
    </div>
  )
}
