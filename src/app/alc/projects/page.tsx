'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import Image from 'next/image'
import Link from 'next/link'
import { logger } from '@/lib/logger'

interface Project {
  id: string
  userId: string
  title: string
  description: string
  projectNumber: number
  difficulty: string
  estimatedHours: number
  completed: boolean
  githubUrl?: string
  deploymentUrl?: string
  completedAt?: string
  createdAt: string
}

export default function ProjectsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)

  // Filter state
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'completed' | 'in-progress'
  >('all')
  const [filterDifficulty, setFilterDifficulty] = useState<
    'all' | 'beginner' | 'intermediate' | 'advanced'
  >('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'project-number'>(
    'newest'
  )

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  // Load projects
  useEffect(() => {
    const loadProjects = async () => {
      if (!user) return

      setLoadingProjects(true)
      try {
        const projectsRef = collection(db, 'userProjects')
        const q = query(
          projectsRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )
        const snapshot = await getDocs(q)

        const loadedProjects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[]

        setProjects(loadedProjects)
      } catch (error) {
        logger.error('ProjectsPage', 'Failed to load projects', { error })
      } finally {
        setLoadingProjects(false)
      }
    }

    loadProjects()
  }, [user])

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects]

    // Status filter
    if (filterStatus === 'completed') {
      filtered = filtered.filter((p) => p.completed)
    } else if (filterStatus === 'in-progress') {
      filtered = filtered.filter((p) => !p.completed)
    }

    // Difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(
        (p) => p.difficulty?.toLowerCase() === filterDifficulty
      )
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else if (sortBy === 'oldest') {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    } else if (sortBy === 'project-number') {
      filtered.sort((a, b) => b.projectNumber - a.projectNumber)
    }

    return filtered
  }, [projects, filterStatus, filterDifficulty, sortBy])

  // Calculate stats
  const stats = useMemo(() => {
    const completed = projects.filter((p) => p.completed).length
    const inProgress = projects.filter((p) => !p.completed).length
    const totalHours = projects
      .filter((p) => p.completed)
      .reduce((sum, p) => sum + (p.estimatedHours || 0), 0)

    return { total: projects.length, completed, inProgress, totalHours }
  }, [projects])

  if (loading || loadingProjects) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/alc"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Project History
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt={user.displayName || 'User'}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-700">
              {user.displayName || user.email}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Total Projects
              </span>
              <span className="text-2xl">📚</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.total}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Completed
              </span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {stats.completed}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                In Progress
              </span>
              <span className="text-2xl">🚀</span>
            </div>
            <div className="text-3xl font-bold text-orange-600">
              {stats.inProgress}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Total Hours
              </span>
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {stats.totalHours}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Filter Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label
                htmlFor="filter-status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                📊 Status
              </label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value as 'all' | 'completed' | 'in-progress'
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Projects</option>
                <option value="completed">Completed Only</option>
                <option value="in-progress">In Progress Only</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label
                htmlFor="filter-difficulty"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                🎯 Difficulty
              </label>
              <select
                id="filter-difficulty"
                value={filterDifficulty}
                onChange={(e) =>
                  setFilterDifficulty(
                    e.target.value as
                      | 'all'
                      | 'beginner'
                      | 'intermediate'
                      | 'advanced'
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label
                htmlFor="sort-by"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                🔄 Sort By
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'newest' | 'oldest' | 'project-number'
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="project-number">Project Number</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(filterStatus !== 'all' ||
            filterDifficulty !== 'all' ||
            sortBy !== 'newest') && (
            <button
              onClick={() => {
                setFilterStatus('all')
                setFilterDifficulty('all')
                setSortBy('newest')
              }}
              className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {projects.length === 0
                ? 'No Projects Yet'
                : 'No Projects Match Your Filters'}
            </h3>
            <p className="text-gray-700 mb-6">
              {projects.length === 0
                ? 'Start your learning journey on the dashboard!'
                : 'Try adjusting your filters to see more projects'}
            </p>
            {projects.length === 0 ? (
              <Link
                href="/alc"
                className="inline-block bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={() => {
                  setFilterStatus('all')
                  setFilterDifficulty('all')
                  setSortBy('newest')
                }}
                className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`bg-white rounded-lg shadow-lg p-6 border-2 transition-colors hover:shadow-xl ${
                  project.completed
                    ? 'border-green-200 hover:border-green-300'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {project.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {project.completed ? '✅ Completed' : '🚀 In Progress'}
                      </span>
                      {project.difficulty && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                          {project.difficulty}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Project #{project.projectNumber}</span>
                      {project.estimatedHours && (
                        <span>~{project.estimatedHours}h</span>
                      )}
                      <span>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      {project.completedAt && (
                        <span className="text-green-600 font-medium">
                          Completed:{' '}
                          {new Date(project.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Links */}
                {(project.githubUrl || project.deploymentUrl) && (
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                      >
                        View Code →
                      </a>
                    )}
                    {project.deploymentUrl && (
                      <a
                        href={project.deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
