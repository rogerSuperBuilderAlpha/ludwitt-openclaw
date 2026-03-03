'use client'

import { Globe, GithubLogo, LinkedinLogo, YoutubeLogo } from '@phosphor-icons/react'
import type { ProfessorSocialLinks } from '@/lib/types/university'

interface SocialLinksBarProps {
  links: ProfessorSocialLinks
}

const LINK_CONFIG: { key: keyof ProfessorSocialLinks; icon: typeof Globe; label: string }[] = [
  { key: 'website', icon: Globe, label: 'Website' },
  { key: 'linkedin', icon: LinkedinLogo, label: 'LinkedIn' },
  { key: 'github', icon: GithubLogo, label: 'GitHub' },
  { key: 'youtube', icon: YoutubeLogo, label: 'YouTube' },
]

export function SocialLinksBar({ links }: SocialLinksBarProps) {
  const activeLinks = LINK_CONFIG.filter(l => links[l.key])

  // Handle text-based links without specific icons
  const allTextLinks: { key: keyof ProfessorSocialLinks; label: string }[] = [
    { key: 'googleScholar', label: 'Scholar' },
    { key: 'twitter', label: 'X' },
    { key: 'orcid', label: 'ORCID' },
  ]
  const textLinks = allTextLinks.filter(l => links[l.key])

  if (activeLinks.length === 0 && textLinks.length === 0) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {activeLinks.map(({ key, icon: Icon, label }) => (
        <a
          key={key}
          href={links[key]!}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
        >
          <Icon size={16} weight="bold" />
        </a>
      ))}
      {textLinks.map(({ key, label }) => (
        <a
          key={key}
          href={links[key]!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-8 px-2.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
        >
          {label}
        </a>
      ))}
    </div>
  )
}
