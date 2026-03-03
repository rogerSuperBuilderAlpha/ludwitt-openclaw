'use client'

import { useState } from 'react'
import { User } from 'firebase/auth'
import { linkGithubToAccount, signInWithGithub } from '@/lib/firebase/auth'
import { Github } from 'lucide-react'

interface GithubLinkingButtonProps {
  user?: User | null
  onGithubLinked?: () => void
}

export function GithubLinkingButton({
  user,
  onGithubLinked,
}: GithubLinkingButtonProps) {
  const [isLinking, setIsLinking] = useState(false)
  const [linkError, setLinkError] = useState<string | null>(null)

  const handleLinkGithub = async () => {
    setIsLinking(true)
    setLinkError(null)

    try {
      if (user) {
        // User is already logged in - link GitHub to their account
        await linkGithubToAccount(user)
      } else {
        // User is not logged in - sign in with GitHub directly
        await signInWithGithub()
      }
      onGithubLinked?.()
      // Reload the page to refresh user data
      window.location.reload()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setLinkError(message || 'Failed to link GitHub account')
      setIsLinking(false)
    }
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 fade-in-scale space-y-4">
      <div className="text-center">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-semibold text-green-900 text-lg">
          GitHub Setup Complete!
        </p>
        <p className="text-green-800 mt-2 text-sm">
          {user
            ? 'Now link your GitHub account to continue to the next step.'
            : 'Sign in with your GitHub account to continue to the next step.'}
        </p>
      </div>

      {linkError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800 text-sm">{linkError}</p>
        </div>
      )}

      <button
        onClick={handleLinkGithub}
        disabled={isLinking}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
      >
        {isLinking ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Linking GitHub...
          </>
        ) : (
          <>
            <Github className="w-6 h-6" />
            {user ? 'Link GitHub Account' : 'Sign in with GitHub'}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        {user
          ? 'This will open a popup to connect your GitHub account.'
          : 'This will open a popup to sign in with your GitHub account.'}
      </p>
    </div>
  )
}
