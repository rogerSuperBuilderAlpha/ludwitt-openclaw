'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Bank, Plus, Users, BookOpen, Code, GraduationCap, MagnifyingGlass, X, Briefcase, Article, ChalkboardTeacher, ClipboardText, Compass, CalendarBlank, GitFork, ChartBar, Sparkle, Lightning, Certificate, UserCircle, VideoCamera, Terminal, Flask, List } from '@phosphor-icons/react'
import { LearningPathCard } from './LearningPathCard'
import { BusinessIdeaCard } from './BusinessIdeaCard'
import { ThesisIdeaCard } from './ThesisIdeaCard'
import { DegreeRoadmap } from './DegreeRoadmap'
import { ScheduleTab } from './schedule/ScheduleTab'
import type { UniversityLearningPathDisplay, UniversityBusinessIdeaDisplay, UniversityThesisIdeaDisplay } from '@/lib/types/university'

interface UniversityDashboardProps {
  paths: UniversityLearningPathDisplay[]
  businessIdeas: UniversityBusinessIdeaDisplay[]
  thesisIdeas: UniversityThesisIdeaDisplay[]
  loading: boolean
  onStartNew: () => void
  onSelectPath: (pathId: string) => void
  onBrowsePublished: () => void
  onStartNewBusinessIdea: () => void
  onStartNewThesisIdea: () => void
  onSelectBusinessIdea: (ideaId: string) => void
  onSelectThesisIdea: (ideaId: string) => void
  onBrowseProfessors: () => void
  onViewPeerReviews?: () => void
  onViewExplorations?: () => void
  onViewContributions?: () => void
  onViewAnalytics?: () => void
  onViewPortfolio?: () => void
  onViewSkills?: () => void
  onViewRecommendations?: () => void
  onViewStudyRooms?: () => void
  onViewCredentials?: () => void
}

const HOW_IT_WORKS = [
  {
    icon: BookOpen,
    title: 'Choose a topic',
    description: 'Enter any subject — from quantum physics to medieval history. AI designs a prerequisite chain of courses tailored to you.',
  },
  {
    icon: Code,
    title: 'Build real projects',
    description: 'Each course has 5 hands-on deliverables: apps, simulations, visualizations, and research tools you actually build.',
  },
  {
    icon: GraduationCap,
    title: 'Get expert feedback',
    description: 'Submit your work for review by professional mentors who provide detailed, actionable feedback.',
  },
]

function matchesLevel(path: UniversityLearningPathDisplay, levelFilter: string): boolean {
  if (levelFilter === 'all') return true
  if (!path.levelRange) return false
  const { min, max } = path.levelRange
  if (levelFilter === 'intro') return min <= 1
  if (levelFilter === 'intermediate') return min <= 3 && max >= 2
  if (levelFilter === 'advanced') return max >= 4
  return true
}


export function UniversityDashboard({
  paths,
  businessIdeas,
  thesisIdeas,
  loading,
  onStartNew,
  onSelectPath,
  onBrowsePublished,
  onStartNewBusinessIdea,
  onStartNewThesisIdea,
  onSelectBusinessIdea,
  onSelectThesisIdea,
  onBrowseProfessors,
  onViewPeerReviews,
  onViewExplorations,
  onViewContributions,
  onViewAnalytics,
  onViewPortfolio,
  onViewSkills,
  onViewRecommendations,
  onViewStudyRooms,
  onViewCredentials,
}: UniversityDashboardProps) {
  const [activeTab, setActiveTab] = useState<'paths' | 'business' | 'thesis' | 'schedule' | 'experiments'>('paths')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [professionFilter, setProfessionFilter] = useState('all')

  const uniqueSubjects = useMemo(() => {
    const set = new Set<string>()
    for (const p of paths) {
      for (const s of p.subjects || []) set.add(s)
    }
    return [...set].sort()
  }, [paths])

  const uniqueProfessions = useMemo(() => {
    const set = new Set<string>()
    for (const p of paths) {
      if (p.profession) set.add(p.profession)
    }
    return [...set].sort()
  }, [paths])

  const filteredPaths = useMemo(() => {
    const q = search.toLowerCase().trim()
    return paths.filter(p => {
      if (q) {
        const haystack = [
          p.targetTopic,
          p.targetDescription || '',
          ...(p.tags || []),
          ...(p.subjects || []),
        ].join(' ').toLowerCase()
        if (!haystack.includes(q)) return false
      }
      if (subjectFilter !== 'all') {
        if (!p.subjects?.includes(subjectFilter)) return false
      }
      if (!matchesLevel(p, levelFilter)) return false
      if (professionFilter !== 'all') {
        if (p.profession !== professionFilter) return false
      }
      return true
    })
  }, [paths, search, subjectFilter, levelFilter, professionFilter])

  const hasActiveFilters = search || subjectFilter !== 'all' || levelFilter !== 'all' || professionFilter !== 'all'

  function clearFilters() {
    setSearch('')
    setSubjectFilter('all')
    setLevelFilter('all')
    setProfessionFilter('all')
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    )
  }

  // Empty state — first-time student
  if (paths.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <div className="text-center mb-10">
          <Bank size={40} weight="duotone" className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to the University</h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            A project-based learning system where you study any academic topic by building
            real deliverables — reviewed by professional mentors.
          </p>
        </div>

        {/* How it works */}
        <div className="grid gap-4 mb-10">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <step.icon size={16} weight="bold" className="text-gray-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onStartNew}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} weight="bold" />
            Create Your First Learning Path
          </button>
          <button
            onClick={onBrowsePublished}
            className="inline-flex items-center gap-2 text-gray-600 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Users size={16} weight="bold" />
            Or browse and join an existing class
          </button>
          <button
            onClick={onBrowseProfessors}
            className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChalkboardTeacher size={16} weight="bold" />
            Browse Faculty
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <DegreeRoadmap paths={paths} />

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-gray-200 mb-5 -mx-4 px-4 overflow-visible">
        {([
          { key: 'paths' as const, label: 'Learning Paths', icon: BookOpen },
          { key: 'business' as const, label: 'Business Ideas', icon: Briefcase },
          { key: 'thesis' as const, label: 'Thesis Ideas', icon: Article },
        ]).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px whitespace-nowrap shrink-0 ${
              activeTab === tab.key
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon size={14} weight={activeTab === tab.key ? 'bold' : 'regular'} />
            {tab.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-0 shrink-0">
            {onViewContributions && (
              <button
                type="button"
                onClick={onViewContributions}
                className="flex items-center gap-1 px-3 py-2.5 text-[11px] font-medium border-b-2 border-transparent text-gray-300 hover:text-gray-500 transition-colors -mb-px whitespace-nowrap shrink-0"
              >
                <GitFork size={12} />
                Contribute
              </button>
            )}
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(prev => !prev)}
                className={`flex items-center gap-1 px-3 py-2.5 text-[11px] font-medium border-b-2 transition-colors -mb-px whitespace-nowrap shrink-0 ${
                  menuOpen || activeTab === 'schedule' || activeTab === 'experiments'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-300 hover:text-gray-500'
                }`}
              >
                <List size={14} />
                More
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('schedule'); setMenuOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    <CalendarBlank size={14} className="text-gray-400" />
                    Schedule
                  </button>
                  {onViewPeerReviews && (
                    <button
                      type="button"
                      onClick={() => { onViewPeerReviews(); setMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left"
                    >
                      <ClipboardText size={14} className="text-gray-400" />
                      Reviews
                    </button>
                  )}
                  {onViewExplorations && (
                    <button
                      type="button"
                      onClick={() => { onViewExplorations(); setMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Compass size={14} className="text-gray-400" />
                      Explore
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('experiments'); setMenuOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Flask size={14} className="text-gray-400" />
                    Experiments
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Learning Paths tab */}
      {activeTab === 'paths' && (
        <>
          {/* Explainer */}
          <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Learning paths are structured course sequences built around a topic you choose. Each path contains prerequisite courses with hands-on deliverables you build and submit for expert review. Completing paths develops deep, portfolio-ready expertise in your subject.
            </p>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Learning Paths</h2>
              <p className="text-xs text-gray-500 mt-0.5">{paths.length} path{paths.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onBrowseProfessors}
                className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChalkboardTeacher size={14} weight="bold" />
                Browse Faculty
              </button>
              <button
                onClick={onBrowsePublished}
                className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users size={14} weight="bold" />
                Join a Class
              </button>
              <button
                onClick={onStartNew}
                className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus size={14} weight="bold" />
                New Path
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          {paths.length > 0 && (
            <div className="mb-4 space-y-2">
              <div className="relative">
                <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by topic or tags..."
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {uniqueSubjects.length > 0 && (
                  <select
                    value={subjectFilter}
                    onChange={e => setSubjectFilter(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="all">All Subjects</option>
                    {uniqueSubjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                )}
                <select
                  value={levelFilter}
                  onChange={e => setLevelFilter(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="all">All Levels</option>
                  <option value="intro">Introductory (1)</option>
                  <option value="intermediate">Intermediate (2-3)</option>
                  <option value="advanced">Advanced (4-5)</option>
                </select>
                {uniqueProfessions.length > 0 && (
                  <select
                    value={professionFilter}
                    onChange={e => setProfessionFilter(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="all">All Professions</option>
                    {uniqueProfessions.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                )}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={12} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Paths list */}
          {filteredPaths.length === 0 && hasActiveFilters ? (
            <div className="text-center py-12">
              <MagnifyingGlass size={28} weight="duotone" className="text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No paths match your filters.</p>
              <button
                onClick={clearFilters}
                className="text-xs text-gray-500 hover:text-gray-700 mt-1 underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPaths.map(path => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  onClick={() => onSelectPath(path.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Schedule tab */}
      {activeTab === 'schedule' && <ScheduleTab />}

      {/* Experiments tab */}
      {activeTab === 'experiments' && (
        <>
          <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              These features are experimental and actively being developed. Try them out and consider contributing — each one is an opportunity to shape the platform.
            </p>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-4">Experimental Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="button" onClick={onViewAnalytics} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><ChartBar size={16} weight="duotone" className="text-gray-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Analytics</p>
                <p className="text-xs text-gray-500 mt-0.5">Track your learning patterns and progress trends</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Experimental — open for contributions</p>
              </div>
            </button>
            <button type="button" onClick={onViewSkills} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><Lightning size={16} weight="duotone" className="text-gray-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Skill Map</p>
                <p className="text-xs text-gray-500 mt-0.5">Visual map of competencies from completed work</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Experimental — open for contributions</p>
              </div>
            </button>
            <button type="button" onClick={onViewPortfolio} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><UserCircle size={16} weight="duotone" className="text-gray-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Portfolio</p>
                <p className="text-xs text-gray-500 mt-0.5">Shareable portfolio of your best deliverables</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Experimental — open for contributions</p>
              </div>
            </button>
            <button type="button" onClick={onViewCredentials} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><Certificate size={16} weight="duotone" className="text-gray-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Credentials</p>
                <p className="text-xs text-gray-500 mt-0.5">Verifiable proof of path completions</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Experimental — open for contributions</p>
              </div>
            </button>
            <button type="button" onClick={onViewRecommendations} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><Sparkle size={16} weight="duotone" className="text-gray-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Recommendations</p>
                <p className="text-xs text-gray-500 mt-0.5">AI-suggested paths based on your progress</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Experimental — open for contributions</p>
              </div>
            </button>
            <button type="button" onClick={onViewStudyRooms} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><VideoCamera size={16} weight="duotone" className="text-gray-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Study Rooms</p>
                <p className="text-xs text-gray-500 mt-0.5">Video rooms to collaborate with peers</p>
                <p className="text-[10px] text-gray-400 mt-1.5">Experimental — open for contributions</p>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Business Ideas tab */}
      {activeTab === 'business' && (
        <>
          {/* Explainer */}
          <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Develop a real business concept from scratch. You define your idea, then build out each required section — market analysis, financial model, go-to-market strategy — as Google Docs submitted for mentor feedback. This gives you a ready-to-pitch business plan and practical entrepreneurship experience.
            </p>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Business Ideas</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {businessIdeas.length} idea{businessIdeas.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onStartNewBusinessIdea}
              disabled={businessIdeas.some(i => i.status === 'draft')}
              className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={14} weight="bold" />
              New Idea
            </button>
          </div>

          {businessIdeas.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase size={36} weight="duotone" className="text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">No business ideas yet</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Create a business concept and submit Google Drive documents for each required section.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {businessIdeas.map(idea => (
                <BusinessIdeaCard
                  key={idea.id}
                  idea={idea}
                  onClick={() => onSelectBusinessIdea(idea.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Thesis Ideas tab */}
      {activeTab === 'thesis' && (
        <>
          {/* Explainer */}
          <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Propose and develop a research thesis. You define a research question, then build each section — literature review, methodology, analysis — as Google Docs reviewed by mentors. This prepares you for graduate-level research and produces a defensible thesis outline.
            </p>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Thesis Ideas</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {thesisIdeas.length} idea{thesisIdeas.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onStartNewThesisIdea}
              disabled={thesisIdeas.some(i => i.status === 'draft')}
              className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={14} weight="bold" />
              New Idea
            </button>
          </div>

          {thesisIdeas.length === 0 ? (
            <div className="text-center py-16">
              <Article size={36} weight="duotone" className="text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">No thesis ideas yet</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Start a research topic and submit Google Drive documents for each required section.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {thesisIdeas.map(idea => (
                <ThesisIdeaCard
                  key={idea.id}
                  idea={idea}
                  onClick={() => onSelectThesisIdea(idea.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
