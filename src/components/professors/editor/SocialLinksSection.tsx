'use client'

import type { ProfessorProfile, ProfessorSocialLinks } from '@/lib/types/university'

interface SocialLinksSectionProps {
  formData: Partial<ProfessorProfile>
  updateField: <K extends keyof ProfessorProfile>(key: K, value: ProfessorProfile[K]) => void
}

const SOCIAL_FIELDS: { key: keyof ProfessorSocialLinks; label: string; placeholder: string }[] = [
  { key: 'website', label: 'Website', placeholder: 'https://yoursite.com' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/...' },
  { key: 'googleScholar', label: 'Google Scholar', placeholder: 'https://scholar.google.com/...' },
  { key: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/...' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
  { key: 'orcid', label: 'ORCID', placeholder: 'https://orcid.org/...' },
]

export function SocialLinksSection({ formData, updateField }: SocialLinksSectionProps) {
  const links = formData.socialLinks || {}

  function updateLink(key: keyof ProfessorSocialLinks, value: string) {
    updateField('socialLinks', { ...links, [key]: value || undefined })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Social Links</h3>
      <div className="space-y-3">
        {SOCIAL_FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label htmlFor={`prof-social-${key}`} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={`prof-social-${key}`}
              type="url"
              value={links[key] || ''}
              onChange={e => updateLink(key, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
