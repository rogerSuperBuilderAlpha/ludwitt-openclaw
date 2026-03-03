'use client'

import { useMemo } from 'react'
import {
  FolderPlus,
  FileText,
  CheckCircle,
  Eye,
  ThumbsUp,
  Plus,
  Sparkles,
} from 'lucide-react'
import { CustomerDocument } from '@/lib/types/customer'
import { Project } from '@/lib/types/project'

type UserState =
  | 'no_projects'
  | 'no_documents'
  | 'pending_approval'
  | 'all_in_progress'
  | 'completed_work'
  | 'all_accepted'

interface HeroActionProps {
  projects: Project[]
  documents: CustomerDocument[]
  onCreateProject: () => void
  onAddDocument: () => void
  onApproveAll: () => void
  onViewInProgress: () => void
  onAcceptWork: (docId: string) => void
  onStartNextIteration: () => void
}

interface HeroConfig {
  icon: React.ReactNode
  title: string
  subtitle: string
  action: () => void
  actionLabel: string
  variant: 'primary' | 'success' | 'warning' | 'info'
  pulse?: boolean
}

export function HeroAction({
  projects,
  documents,
  onCreateProject,
  onAddDocument,
  onApproveAll,
  onViewInProgress,
  onAcceptWork,
  onStartNextIteration,
}: HeroActionProps) {
  const pendingDocs = documents.filter((d) => d.status === 'pending')
  const inProgressDocs = documents.filter(
    (d) => d.status === 'approved' || d.status === 'in-progress'
  )
  const completedDocs = documents.filter((d) => d.status === 'completed')
  const acceptedDocs = documents.filter((d) => d.status === 'accepted')

  const userState = useMemo((): UserState => {
    if (projects.length === 0) return 'no_projects'
    if (documents.length === 0) return 'no_documents'
    if (pendingDocs.length > 0) return 'pending_approval'
    if (completedDocs.length > 0) return 'completed_work'
    if (inProgressDocs.length > 0) return 'all_in_progress'
    if (
      acceptedDocs.length > 0 &&
      pendingDocs.length === 0 &&
      completedDocs.length === 0
    )
      return 'all_accepted'
    return 'no_documents'
  }, [
    projects.length,
    documents.length,
    pendingDocs.length,
    inProgressDocs.length,
    completedDocs.length,
    acceptedDocs.length,
  ])

  const heroConfig = useMemo((): HeroConfig => {
    switch (userState) {
      case 'no_projects':
        return {
          icon: <FolderPlus className="w-6 h-6" />,
          title: 'Create Your First Project',
          subtitle:
            'Projects help organize your work into focused development cycles.',
          action: onCreateProject,
          actionLabel: 'Create Project',
          variant: 'primary',
        }

      case 'no_documents':
        return {
          icon: <FileText className="w-6 h-6" />,
          title: 'Add Your First Requirements',
          subtitle:
            'Share a Google Doc with what you want to build. Your developer will take it from there.',
          action: onAddDocument,
          actionLabel: 'Add Requirements',
          variant: 'primary',
        }

      case 'pending_approval':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          title: `${pendingDocs.length} ${pendingDocs.length === 1 ? 'Document Needs' : 'Documents Need'} Your Approval`,
          subtitle: 'Approve to notify your developer and start development.',
          action: onApproveAll,
          actionLabel:
            pendingDocs.length === 1
              ? 'Review & Approve'
              : `Approve All (${pendingDocs.length})`,
          variant: 'warning',
          pulse: true,
        }

      case 'all_in_progress':
        return {
          icon: <Eye className="w-6 h-6" />,
          title: `${inProgressDocs.length} ${inProgressDocs.length === 1 ? 'Item' : 'Items'} In Development`,
          subtitle:
            'Your developer is working on your requirements. Check status below.',
          action: onViewInProgress,
          actionLabel: 'View Progress',
          variant: 'info',
        }

      case 'completed_work':
        return {
          icon: <ThumbsUp className="w-6 h-6" />,
          title: `${completedDocs.length} ${completedDocs.length === 1 ? 'Iteration' : 'Iterations'} Ready for Review`,
          subtitle:
            'Your developer has completed work. Review and accept to continue.',
          action: () => onAcceptWork(completedDocs[0]?.id || ''),
          actionLabel: 'Review Completed Work',
          variant: 'success',
          pulse: true,
        }

      case 'all_accepted':
        return {
          icon: <Plus className="w-6 h-6" />,
          title: 'Ready for Your Next Iteration',
          subtitle: `Great progress! You've completed ${acceptedDocs.length} ${acceptedDocs.length === 1 ? 'iteration' : 'iterations'}. Keep the momentum going.`,
          action: onStartNextIteration,
          actionLabel: 'Start Next Iteration',
          variant: 'primary',
        }

      default:
        return {
          icon: <Sparkles className="w-6 h-6" />,
          title: 'Welcome to Your Portal',
          subtitle: 'Get started by creating a project or adding requirements.',
          action: onAddDocument,
          actionLabel: 'Get Started',
          variant: 'primary',
        }
    }
  }, [
    userState,
    pendingDocs.length,
    inProgressDocs.length,
    completedDocs,
    acceptedDocs.length,
    onCreateProject,
    onAddDocument,
    onApproveAll,
    onViewInProgress,
    onAcceptWork,
    onStartNextIteration,
  ])

  const variantStyles = {
    primary: {
      container: 'from-blue-50 to-indigo-50 border-blue-200',
      icon: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
    },
    success: {
      container: 'from-green-50 to-emerald-50 border-green-200',
      icon: 'bg-green-100 text-green-600',
      button: 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/25',
    },
    warning: {
      container: 'from-amber-50 to-orange-50 border-amber-300',
      icon: 'bg-amber-100 text-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/25',
    },
    info: {
      container: 'from-purple-50 to-violet-50 border-purple-200',
      icon: 'bg-purple-100 text-purple-600',
      button:
        'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25',
    },
  }

  const styles = variantStyles[heroConfig.variant]

  return (
    <div
      className={`bg-gradient-to-r ${styles.container} border-2 rounded-xl p-6 mb-6`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 ${styles.icon} rounded-xl flex items-center justify-center ${heroConfig.pulse ? 'animate-pulse' : ''}`}
        >
          {heroConfig.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            {heroConfig.title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{heroConfig.subtitle}</p>

          <button
            onClick={heroConfig.action}
            className={`inline-flex items-center gap-2 px-5 py-2.5 ${styles.button} font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl`}
          >
            {heroConfig.icon}
            {heroConfig.actionLabel}
          </button>
        </div>
      </div>

      {/* Quick stats for context */}
      {documents.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-wrap gap-4 text-sm">
          {pendingDocs.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-gray-600">
                {pendingDocs.length} pending
              </span>
            </div>
          )}
          {inProgressDocs.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-gray-600">
                {inProgressDocs.length} in progress
              </span>
            </div>
          )}
          {completedDocs.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-600">
                {completedDocs.length} ready for review
              </span>
            </div>
          )}
          {acceptedDocs.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-gray-600">
                {acceptedDocs.length} completed
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
