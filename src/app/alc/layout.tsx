'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { useProgressionGates } from '@/lib/progression'
import { ProgressionGatePage } from '@/components/shared/ProgressionGatePage'
import { logger } from '@/lib/logger'

interface ALCLayoutProps {
  children: React.ReactNode
}

export default function ALCLayout({ children }: ALCLayoutProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const progression = useProgressionGates()
  const [accessState, setAccessState] = useState<'loading' | 'gated' | 'authorized'>('loading')

  useEffect(() => {
    if (authLoading || progression.isLoading) return

    if (!user) {
      router.push('/login?redirect=/alc')
      return
    }

    if (!progression.canAccessALC) {
      setAccessState('gated')
      return
    }

    setAccessState('authorized')
  }, [user, authLoading, progression.isLoading, progression.canAccessALC, router])

  // Maintenance fee check for bypass users
  useEffect(() => {
    if (accessState !== 'authorized' || !user || !progression.alcBypassPurchased) return
    user.getIdToken().then(token => {
      fetch('/api/progression/maintenance-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ section: 'alc' }),
      }).catch((err) => logger.error('ALCLayout', 'Maintenance check failed', { error: err }))
    })
  }, [accessState, user, progression.alcBypassPurchased])

  if (authLoading || progression.isLoading || accessState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading ALC...</p>
        </div>
      </div>
    )
  }

  if (accessState === 'gated') {
    return <ProgressionGatePage targetSection="alc" progression={progression} />
  }

  return <>{children}</>

}
