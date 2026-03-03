/**
 * Cohort Member Dashboard
 * Dashboard for students in a cohort to view sessions, progress, and resources
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import Link from 'next/link'
import {
  ArrowLeft,
  CalendarBlank,
  Users,
  BookOpen,
  Trophy,
} from '@phosphor-icons/react'
import { logger } from '@/lib/logger'

interface Cohort {
  id: string
  name: string
  description: string
  mentorName?: string
  startDate: string
  status: string
}

interface Session {
  id: string
  title: string
  scheduledFor: string
  status: string
  duration: number
}

interface Progress {
  sessionsAttended: number
  totalSessions: number
  attendanceRate: number
  completedModules: number
}

export default function CohortDashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const cohortId = params.cohortId as string

  const [cohort, setCohort] = useState<Cohort | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [progress, setProgress] = useState<Progress>({
    sessionsAttended: 0,
    totalSessions: 0,
    attendanceRate: 0,
    completedModules: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/basics/cohorts/${cohortId}/dashboard`)
      return
    }

    if (!user) return

    const loadData = async () => {
      try {
        // Load cohort
        const cohortDoc = await getDoc(doc(db, 'cohorts', cohortId))
        if (!cohortDoc.exists()) {
          router.push('/basics/cohorts')
          return
        }

        setCohort({ id: cohortDoc.id, ...cohortDoc.data() } as Cohort)

        // Load sessions
        const sessionsQuery = query(
          collection(db, 'cohortSessions'),
          where('cohortId', '==', cohortId),
          orderBy('scheduledFor', 'asc')
        )
        const sessionsSnapshot = await getDocs(sessionsQuery)
        const loadedSessions = sessionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Session[]

        setSessions(loadedSessions)

        // Load progress
        const progressDoc = await getDoc(
          doc(db, 'studentProgress', `${cohortId}_${user.uid}`)
        )

        if (progressDoc.exists()) {
          const progressData = progressDoc.data()
          setProgress({
            sessionsAttended: progressData.sessionsAttended || 0,
            totalSessions: progressData.totalSessions || loadedSessions.length,
            attendanceRate: progressData.attendanceRate || 0,
            completedModules: progressData.totalModulesCompleted || 0,
          })
        }
      } catch (error) {
        logger.error('CohortDashboardPage', 'Error loading cohort data', {
          error,
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [cohortId, user, authLoading, router])

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!cohort) return null

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href={`/basics/cohorts/${cohortId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Cohort</span>
          </Link>
          <span className="text-sm text-gray-600">
            {user?.displayName || user?.email}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{cohort.name}</h1>
          <p className="mt-2 text-gray-600">{cohort.description}</p>
          {cohort.mentorName && (
            <p className="mt-2 text-sm text-gray-600">
              Mentor: <span className="font-medium">{cohort.mentorName}</span>
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <CalendarBlank className="text-blue-600" size={24} />
              <h3 className="font-semibold text-gray-900">Attendance</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {progress.attendanceRate}%
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {progress.sessionsAttended}/{progress.totalSessions} sessions
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-green-600" size={24} />
              <h3 className="font-semibold text-gray-900">Modules</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {progress.completedModules}
            </p>
            <p className="mt-1 text-sm text-gray-600">Completed</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-purple-600" size={24} />
              <h3 className="font-semibold text-gray-900">Cohort</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{cohort.status}</p>
            <p className="mt-1 text-sm text-gray-600">Status</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="text-yellow-600" size={24} />
              <h3 className="font-semibold text-gray-900">Progress</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(
                (progress.sessionsAttended / progress.totalSessions) * 100
              ) || 0}
              %
            </p>
            <p className="mt-1 text-sm text-gray-600">Overall</p>
          </div>
        </div>

        {/* Sessions */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Upcoming Sessions
          </h2>

          {sessions.length === 0 ? (
            <div className="py-12 text-center">
              <CalendarBlank size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">No sessions scheduled yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {session.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {new Date(session.scheduledFor).toLocaleString()} •{' '}
                      {session.duration} min
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      session.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : session.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
