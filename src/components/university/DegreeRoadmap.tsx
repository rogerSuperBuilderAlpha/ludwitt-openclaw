'use client'

import { useMemo, useState } from 'react'
import { Check, CaretDown, CaretUp } from '@phosphor-icons/react'
import type { UniversityLearningPathDisplay } from '@/lib/types/university'

interface DegreeRoadmapProps {
  paths: UniversityLearningPathDisplay[]
}

type YearStatus = 'completed' | 'active' | 'locked'

interface YearInfo {
  year: number
  title: string
  description: string
  milestones: string[]
  status: YearStatus
}

const YEAR_CONTENT = [
  {
    title: 'Liberal Arts Foundation',
    description:
      'Complete 10 learning paths across humanities and sciences to build a diversified liberal arts foundation.',
    milestones: [
      'Complete 10 learning paths across diverse subjects',
      'Cover humanities, sciences, and liberal arts',
      'Build a broad academic foundation before specializing',
    ],
  },
  {
    title: 'Specialization & Business Research',
    description:
      'Specialize in your favorite topic with 5 advanced learning paths. Develop 10 business proposals — each with TAM analysis and expansive ideal customer profiles.',
    milestones: [
      'Complete 5 specialized learning paths in your chosen field',
      'Write 10 business proposals',
      'Include TAM (Total Addressable Market) analysis for each',
      'Build expansive ICPs (Ideal Customer Profiles) for each business',
    ],
  },
  {
    title: 'Literature Review & Business Refinement',
    description:
      'Conduct a literature review as the foundation for your senior thesis. Critically evaluate your 10 business proposals and narrow them down to the 3 strongest.',
    milestones: [
      'Conduct a comprehensive literature review for your senior thesis',
      'Critically evaluate all 10 business proposals',
      'Eliminate 7 — keep only the 3 strongest ventures',
    ],
  },
  {
    title: 'Thesis & Company Building',
    description:
      'Write and defend your senior thesis. Launch the 3 remaining businesses into real ventures.',
    milestones: [
      'Write your senior thesis',
      'Defend your thesis',
      'Start building your 3 remaining companies',
    ],
  },
]

const YEAR1_PATH_TARGET = 10

export function DegreeRoadmap({ paths }: DegreeRoadmapProps) {
  const [expandedYear, setExpandedYear] = useState<number | null>(null)

  const { years, completedPathCount } = useMemo(() => {
    const completedPaths = paths.filter((p) => p.status === 'completed')
    const completedPathCount = completedPaths.length

    const year1Met = completedPathCount >= YEAR1_PATH_TARGET

    const years: YearInfo[] = YEAR_CONTENT.map((content, i) => {
      const year = i + 1
      let status: YearStatus = 'locked'

      if (year === 1) {
        status = year1Met ? 'completed' : 'active'
      } else if (year === 2 && year1Met) {
        status = 'active'
      }

      return { year, ...content, status }
    })

    return { years, completedPathCount }
  }, [paths])

  const activeYear = years.find((y) => y.status === 'active') || years[0]
  const expandedYearInfo = expandedYear !== null ? years.find((y) => y.year === expandedYear) : null

  function toggleYear(year: number) {
    setExpandedYear((prev) => (prev === year ? null : year))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5 shadow-sm mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Your Degree Roadmap</h3>

      {/* Timeline */}
      <div className="relative mb-4">
        {/* Connector lines (positioned behind circles) */}
        <div className="absolute top-4 left-0 right-0 flex px-[calc(12.5%-12px)] sm:px-[calc(12.5%-16px)]">
          {years.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className={`h-px flex-1 ${
                years[i + 1].status !== 'locked' ? 'bg-gray-900' : 'border-t border-dashed border-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Year nodes */}
        <div className="grid grid-cols-4">
          {years.map((y) => (
            <div key={y.year} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => toggleYear(y.year)}
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 ${
                  y.status === 'completed'
                    ? 'bg-green-600 text-white'
                    : y.status === 'active'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-400'
                } ${expandedYear === y.year ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`}
              >
                {y.status === 'completed' ? <Check size={14} weight="bold" /> : y.year}
              </button>
              <span
                className={`text-[10px] mt-1.5 text-center leading-tight max-w-[60px] sm:max-w-[80px] ${
                  y.status === 'active'
                    ? 'font-semibold text-gray-900'
                    : y.status === 'completed'
                      ? 'font-medium text-green-700'
                      : 'text-gray-400'
                }`}
              >
                {y.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active year summary (when nothing is expanded) */}
      {expandedYear === null && (
        <button
          type="button"
          onClick={() => toggleYear(activeYear.year)}
          className="w-full bg-gray-50 rounded-lg px-4 py-3 text-left hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">Year {activeYear.year}:</span>{' '}
                {activeYear.description}
              </p>
              {activeYear.year === 1 && (
                <p className="text-[11px] text-gray-400 mt-1.5">
                  {completedPathCount} of {YEAR1_PATH_TARGET} paths completed
                </p>
              )}
            </div>
            <CaretDown size={14} className="text-gray-400 mt-0.5 shrink-0" />
          </div>
        </button>
      )}

      {/* Expanded year detail */}
      {expandedYearInfo && (
        <button
          type="button"
          onClick={() => toggleYear(expandedYearInfo.year)}
          className="w-full bg-gray-50 rounded-lg px-4 py-3 text-left hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 mb-1">
                Year {expandedYearInfo.year}: {expandedYearInfo.title}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-2">
                {expandedYearInfo.description}
              </p>
              <ul className="space-y-1">
                {expandedYearInfo.milestones.map((m) => (
                  <li key={m} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                    <span className="text-gray-300 mt-px">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              {expandedYearInfo.year === 1 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-gray-400">
                      {completedPathCount} of {YEAR1_PATH_TARGET} paths completed
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {Math.round((Math.min(completedPathCount, YEAR1_PATH_TARGET) / YEAR1_PATH_TARGET) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 rounded-full transition-all"
                      style={{ width: `${Math.min((completedPathCount / YEAR1_PATH_TARGET) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <CaretUp size={14} className="text-gray-400 mt-0.5 shrink-0" />
          </div>
        </button>
      )}
    </div>
  )
}
