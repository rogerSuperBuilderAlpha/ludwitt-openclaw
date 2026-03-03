'use client'

import type { PortfolioProject } from '@/lib/types/university'
import { GlobeSimple, GithubLogo, VideoCamera, Star } from '@phosphor-icons/react'

interface ProjectCardProps {
  project: PortfolioProject
  showPeerReviews?: boolean
}

const TYPE_LABELS: Record<string, string> = {
  application: 'Application',
  simulation: 'Simulation',
  'data-visualization': 'Data Viz',
  'research-tool': 'Research Tool',
  'interactive-content': 'Interactive',
}

export function ProjectCard({ project, showPeerReviews = true }: ProjectCardProps) {
  const formattedDate = project.approvedAt
    ? new Date(project.approvedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
          {project.title}
        </h3>
        <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {TYPE_LABELS[project.type] || project.type}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-3">
        {project.deployedUrl && (
          <a
            href={project.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
          >
            <GlobeSimple size={14} weight="bold" />
            Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
          >
            <GithubLogo size={14} weight="bold" />
            GitHub
          </a>
        )}
        {project.loomUrl && (
          <a
            href={project.loomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
          >
            <VideoCamera size={14} weight="bold" />
            Demo
          </a>
        )}
      </div>

      {/* Skills Tags */}
      {project.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer: date + peer review score */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        {formattedDate && (
          <span className="text-[11px] text-gray-400">
            Approved {formattedDate}
          </span>
        )}
        {showPeerReviews && project.peerReviewAvgScore != null && (
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
            <Star size={12} weight="fill" className="text-yellow-500" />
            {project.peerReviewAvgScore.toFixed(1)}/5
          </span>
        )}
      </div>
    </div>
  )
}
