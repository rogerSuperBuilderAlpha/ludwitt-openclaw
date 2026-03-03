'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useAuth } from '@/components/auth/ClientProvider'
import { NotificationProvider } from '@/components/ui/NotificationProvider'

import { LoadingState } from '@/components/basics/DashboardStates'

const DashboardProvider = dynamic(
  () => import('./dashboard').then(mod => ({ default: mod.DashboardProvider })),
  { ssr: false }
)
const DashboardContent = dynamic(
  () => import('./DashboardContent'),
  { loading: () => <LoadingState />, ssr: false }
)

function HomeContent() {
  const { user, loading: authLoading } = useAuth()

  if (authLoading) {
    return <LoadingState />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ludwitt</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Adaptive learning platform for K-12 students and adults rebuilding foundational skills.
        </p>
        <Link
          href="/login"
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Sign in to get started
        </Link>
      </div>
    )
  }

  return (
    <NotificationProvider>
      <DashboardProvider>
        <DashboardContent userId={user.uid} />
      </DashboardProvider>
    </NotificationProvider>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingState />}>
      <HomeContent />
    </Suspense>
  )
}
