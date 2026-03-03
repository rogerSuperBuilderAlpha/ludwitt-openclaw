'use client'

import Link from 'next/link'

const LEGAL_LINKS = [
  { href: '/legal/terms-of-service', label: 'Terms of Service' },
  { href: '/legal/privacy-policy', label: 'Privacy Policy' },
  { href: '/legal/data-policy', label: 'Data Policy' },
  { href: '/legal/acceptable-use', label: 'Acceptable Use' },
] as const

export function AboutSection() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 b-border-b" style={{ borderColor: 'var(--b-border-light)' }}>
        <span className="b-text-secondary">Version</span>
        <span className="b-font-medium b-text-primary">1.0.0</span>
      </div>
      <div className="flex flex-wrap gap-4 pt-2">
        {LEGAL_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="b-text-sm b-text-link hover:b-text-link-hover">
            {label}
          </Link>
        ))}
      </div>
      <p className="b-text-xs b-text-muted pt-2">
        &copy; {new Date().getFullYear()} Ludwitt. All rights reserved.
      </p>
    </div>
  )
}
