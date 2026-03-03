'use client'

import React from 'react'
import { Plus, ChatCircle, CalendarBlank, FolderOpen } from '@phosphor-icons/react'
import { Project } from '@/lib/types/project'
import { CustomerDocument } from '@/lib/types/customer'

interface DashboardHeaderProps {
  projectsCount: number
  pendingDocsCount: number
  projects: Project[]
  documents: CustomerDocument[]
  onOpenProjects: () => void
  onOpenAddDocument: () => void
  onCreateProject: () => void
  onApproveAll: () => void
  onMessageDeveloper: () => void
  onScheduleCall: () => void
}

export default function DashboardHeader({
  projectsCount,
  onOpenProjects,
  onOpenAddDocument,
  onCreateProject,
  onMessageDeveloper,
  onScheduleCall,
}: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      {/* Secondary Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {projectsCount === 0 ? (
            <button
              onClick={onCreateProject}
              className="group flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-sm"
            >
              <FolderOpen size={16} weight="regular" className="text-gray-500 group-hover:text-gray-700" />
              <span className="font-medium text-gray-700">New Project</span>
            </button>
          ) : (
            <button
              onClick={onOpenProjects}
              className="group flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-sm"
            >
              <FolderOpen size={16} weight="regular" className="text-gray-500 group-hover:text-gray-700" />
              <span className="font-medium text-gray-700">Projects ({projectsCount})</span>
            </button>
          )}

          <button
            onClick={onOpenAddDocument}
            className="group flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-sm"
          >
            <Plus size={16} weight="regular" className="text-gray-500 group-hover:text-gray-700" />
            <span className="font-medium text-gray-700">Add Doc</span>
          </button>
        </div>

        {/* Communication Actions */}
        <div className="flex gap-2">
          <button
            onClick={onMessageDeveloper}
            className="group flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-sm"
            title="Message your developer"
          >
            <ChatCircle size={16} weight="regular" className="text-purple-500" />
            <span className="font-medium text-gray-700 hidden sm:inline">Message</span>
          </button>

          <button
            onClick={onScheduleCall}
            className="group flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm"
            title="Schedule a call"
          >
            <CalendarBlank size={16} weight="regular" className="text-indigo-500" />
            <span className="font-medium text-gray-700 hidden sm:inline">Schedule</span>
          </button>
        </div>
      </div>
    </div>
  )
}
