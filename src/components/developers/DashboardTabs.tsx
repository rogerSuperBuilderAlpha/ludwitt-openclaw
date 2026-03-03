'use client'

import { FileText, Briefcase, Users } from 'lucide-react'

type TabType = 'docs' | 'projects' | 'all'

interface DashboardTabsProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  userIsAdmin: boolean
  adminViewMode: 'developer' | 'admin'
  totalDocsCount: number
  totalProjectsCount: number
}

export function DashboardTabs({
  activeTab,
  setActiveTab,
  userIsAdmin,
  adminViewMode,
  totalDocsCount,
  totalProjectsCount,
}: DashboardTabsProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 flex gap-1 border-t border-gray-200 bg-white">
      <button
        onClick={() => setActiveTab('docs')}
        className={`relative px-6 py-3 font-medium transition-colors ${
          activeTab === 'docs'
            ? 'text-blue-600'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Documents
          <span
            className={`px-2 py-0.5 rounded-full text-xs transition-all ${
              userIsAdmin && adminViewMode === 'developer'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {totalDocsCount}
          </span>
        </div>
        {activeTab === 'docs' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
        )}
      </button>

      <button
        onClick={() => setActiveTab('projects')}
        className={`relative px-6 py-3 font-medium transition-colors ${
          activeTab === 'projects'
            ? 'text-blue-600'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Projects
          <span
            className={`px-2 py-0.5 rounded-full text-xs transition-all ${
              userIsAdmin && adminViewMode === 'developer'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {totalProjectsCount}
          </span>
        </div>
        {activeTab === 'projects' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
        )}
      </button>

      {userIsAdmin && (
        <button
          onClick={() => setActiveTab('all')}
          className={`relative px-6 py-3 font-medium transition-colors ${
            activeTab === 'all'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Manage All Docs
            <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">
              {totalDocsCount}
            </span>
          </div>
          {activeTab === 'all' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      )}
    </div>
  )
}
