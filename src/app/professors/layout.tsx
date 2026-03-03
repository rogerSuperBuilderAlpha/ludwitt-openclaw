'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { isProfessor } from '@/config/developers'
import { logout } from '@/lib/firebase/auth'
import { logger } from '@/lib/logger'

type GateState = 'loading' | 'authorized' | 'denied'

export default function ProfessorsLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [gateState, setGateState] = useState<GateState>('loading')

  useEffect(() => {
    if (loading) return

    // No user — force fresh login
    if (!user) {
      const alreadyRedirected = sessionStorage.getItem('professorLoginRedirect')
      if (alreadyRedirected) {
        // Came back from login but still no user — clear flag and redirect again
        sessionStorage.removeItem('professorLoginRedirect')
      }
      sessionStorage.removeItem('professorAuthenticated')
      logout().then(() => {
        sessionStorage.setItem('professorLoginRedirect', 'true')
        router.push('/login?redirect=/professors')
      }).catch(() => {
        router.push('/login?redirect=/professors')
      })
      return
    }

    // User exists — check session gate
    const isAuthenticated = sessionStorage.getItem('professorAuthenticated')
    if (!isAuthenticated) {
      // First visit in this tab — check whitelist
      if (isProfessor(user.email)) {
        sessionStorage.setItem('professorAuthenticated', 'true')
        sessionStorage.removeItem('professorLoginRedirect')
        setGateState('authorized')
      } else {
        setGateState('denied')
      }
      return
    }

    // Already authenticated this session — verify still a professor
    if (isProfessor(user.email)) {
      setGateState('authorized')
    } else {
      sessionStorage.removeItem('professorAuthenticated')
      setGateState('denied')
    }
  }, [user, loading, router])

  if (gateState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (gateState === 'denied') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-md text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 text-sm mb-6">
            This area is restricted to authorized professors. If you believe this is an error, please contact an administrator.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('professorAuthenticated')
              logout().then(() => { window.location.href = '/' }).catch((err) => logger.error('ProfessorsLayout', 'Logout failed', { error: err }))
            }}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
