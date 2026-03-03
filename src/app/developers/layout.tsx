'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { isAdmin } from '@/config/developers'
import { DevLayout } from '@/components/developers/v2/layout'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useProgressionGates } from '@/lib/progression'
import { ProgressionGatePage } from '@/components/shared/ProgressionGatePage'
import { logger } from '@/lib/logger'

interface DeveloperLayoutProps {
  children: React.ReactNode
}

/**
 * Developer Portal Layout
 *
 * Handles authentication, authorization via progression gates,
 * and provides the v2 layout wrapper for all developer portal pages.
 */
export default function DeveloperLayout({ children }: DeveloperLayoutProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { setAdminView } = useDevPortalStore()
  const progression = useProgressionGates()
  const [accessState, setAccessState] = useState<'loading' | 'gated' | 'authorized'>('loading')

  useEffect(() => {
    if (authLoading || progression.isLoading) return

    // Not logged in - redirect to login
    if (!user) {
      router.push('/login?redirect=/developers')
      return
    }

    // Not authorized - show gate page
    if (!progression.canAccessDeveloper) {
      setAccessState('gated')
      return
    }

    // Set admin view based on user role
    const email = user.email || ''
    setAdminView(isAdmin(email))
    setAccessState('authorized')
  }, [user, authLoading, progression.isLoading, progression.canAccessDeveloper, router, setAdminView])

  // Maintenance fee check for bypass users
  useEffect(() => {
    if (accessState !== 'authorized' || !user || !progression.developerBypassPurchased) return
    user.getIdToken().then(token => {
      fetch('/api/progression/maintenance-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ section: 'developer' }),
      }).catch((err) => logger.error('DeveloperLayout', 'Maintenance check failed', { error: err }))
    })
  }, [accessState, user, progression.developerBypassPurchased])

  // Show loading state while checking auth
  if (authLoading || progression.isLoading || accessState === 'loading') {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0B',
          color: '#FAFAFA',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: '3px solid rgba(255,255,255,0.1)',
              borderTopColor: '#6366F1',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ color: '#71717A', fontSize: 14 }}>Loading Developer Portal...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Gate page renders in light theme intentionally
  if (accessState === 'gated') {
    return <ProgressionGatePage targetSection="developers" progression={progression} />
  }

  return <DevLayout>{children}</DevLayout>

}
