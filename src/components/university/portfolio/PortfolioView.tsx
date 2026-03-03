'use client'

import type { PublicPortfolio } from '@/lib/types/university'
import { GraduationCap, Star } from '@phosphor-icons/react'
import { ProjectCard } from './ProjectCard'

interface PortfolioViewProps {
  portfolio: PublicPortfolio
  isOwner?: boolean
}

const YEAR_LABELS: Record<number, string> = {
  1: 'Year 1',
  2: 'Year 2',
  3: 'Year 3',
  4: 'Year 4',
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-gray-200',
  intermediate: 'bg-gray-400',
  advanced: 'bg-gray-600',
  expert: 'bg-gray-900',
}

export function PortfolioView({ portfolio, isOwner = false }: PortfolioViewProps) {
  const { settings, projects, skills, degreeProgress } = portfolio

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-3 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {portfolio.displayName}
        </h1>
        {settings.headline && (
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            {settings.headline}
          </p>
        )}
        {settings.bio && (
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            {settings.bio}
          </p>
        )}
        {isOwner && !settings.isPublic && (
          <p className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 rounded px-3 py-1.5 inline-block">
            This portfolio is currently private. Only you can see it.
          </p>
        )}
      </div>

      {/* Degree Progress */}
      {settings.showDegreeProgress && (
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} weight="bold" className="text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">Degree Progress</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-gray-900">
                {YEAR_LABELS[degreeProgress.yearLevel] || `Year ${degreeProgress.yearLevel}`}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">Current Level</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">
                {degreeProgress.completedPaths}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">Paths Completed</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">
                {degreeProgress.totalXP.toLocaleString()}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">Total XP</p>
            </div>
          </div>
          {/* Year progress bar */}
          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4].map((year) => (
              <div
                key={year}
                className={`h-1.5 flex-1 rounded-full ${
                  year <= degreeProgress.yearLevel ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Projects ({projects.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.deliverableId}
                project={project}
                showPeerReviews={settings.showPeerReviews}
              />
            ))}
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <div className="text-center py-10 text-sm text-gray-400">
          No projects to display yet.
        </div>
      )}

      {/* Skills Section */}
      {settings.showSkills && skills.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} weight="bold" className="text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5"
              >
                <span className="text-xs text-gray-700">{skill.name}</span>
                <span
                  className={`w-2 h-2 rounded-full ${LEVEL_COLORS[skill.level] || 'bg-gray-300'}`}
                  title={skill.level}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-200" /> Beginner
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400" /> Intermediate
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-600" /> Advanced
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-900" /> Expert
            </span>
          </div>
        </section>
      )}
    </div>
  )
}
