/**
 * CustomerHeader Component
 * Header for customer landing pages
 */

'use client'

interface CustomerHeaderProps {
  onSignIn?: () => void
  showSignIn?: boolean
  companyName?: string
}

export function CustomerHeader({
  onSignIn,
  showSignIn = true,
  companyName = 'Ludwitt',
}: CustomerHeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-xs font-medium text-amber-600">
              Customers
            </span>
            <span className="text-xs text-amber-400">Client Portal</span>
          </div>
        </div>

        {showSignIn && onSignIn && (
          <button
            onClick={onSignIn}
            className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  )
}
