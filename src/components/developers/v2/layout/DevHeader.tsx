'use client'

import { usePathname } from 'next/navigation'
import { 
  Sun, 
  Moon, 
  SignOut,
  CaretRight,
  Eye,
  EyeSlash,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { logout } from '@/lib/firebase/auth'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { isAdmin as isAdminEmail } from '@/config/developers'

interface Breadcrumb {
  label: string
  href?: string
}

const routeLabels: Record<string, string> = {
  '/developers': 'Documents',
  '/developers/kanban': 'Kanban Board',
  '/developers/projects': 'Projects',
  '/developers/workload': 'Workload',
  '/developers/team': 'Team Members',
  '/developers/pending': 'Pending Review',
  '/developers/analytics': 'Analytics',
  '/developers/settings': 'Settings',
}

/**
 * DevHeader - Top header bar with breadcrumbs and actions
 */
export function DevHeader() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { theme, toggleTheme, isAdminView, toggleAdminView, openCommandPalette } = useDevPortalStore()

  const getBreadcrumbs = (): Breadcrumb[] => {
    const crumbs: Breadcrumb[] = [{ label: 'Developer Portal', href: '/developers' }]
    
    const currentLabel = routeLabels[pathname]
    if (currentLabel && pathname !== '/developers') {
      crumbs.push({ label: currentLabel })
    }
    
    return crumbs
  }

  const breadcrumbs = getBreadcrumbs()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  return (
    <header className="dev-header">
      {/* Site Navigation + Breadcrumbs */}
      <div className="dev-header-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)' }}>
        {breadcrumbs.map((crumb, index) => (
          <span key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)' }}>
            {index > 0 && (
              <CaretRight size={12} className="dev-header-breadcrumb-separator" />
            )}
            <span className={index === breadcrumbs.length - 1 ? 'dev-header-breadcrumb-current' : ''}>
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      {/* Search (center) */}
      <div className="dev-header-search">
        <button className="dev-header-search-trigger" onClick={openCommandPalette}>
          <span>Search documents, projects...</span>
          <div className="dev-header-search-kbd">
            <span className="dev-kbd">⌘</span>
            <span className="dev-kbd">K</span>
          </div>
        </button>
      </div>

      {/* Actions */}
      <div className="dev-header-actions">
        {/* Admin View Toggle - only shown to actual admins */}
        {isAdminEmail(user?.email) && (
          <button
            className={`dev-btn dev-btn-sm ${isAdminView ? 'dev-btn-primary' : 'dev-btn-ghost'}`}
            onClick={toggleAdminView}
            title={isAdminView ? 'Switch to Developer View' : 'Switch to Admin View'}
          >
            {isAdminView ? <Eye size={16} /> : <EyeSlash size={16} />}
            <span style={{ fontSize: 'var(--dev-text-xs)' }}>
              {isAdminView ? 'Admin' : 'Dev'}
            </span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          className="dev-btn dev-btn-ghost dev-btn-icon"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)', marginLeft: 'var(--dev-space-2)' }}>
          <div className="dev-avatar dev-avatar-sm">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <button
            className="dev-btn dev-btn-ghost dev-btn-icon dev-btn-sm"
            onClick={handleLogout}
            title="Sign out"
          >
            <SignOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
