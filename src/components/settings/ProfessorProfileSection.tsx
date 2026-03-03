'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ProfessorProfileSection() {
  return (
    <div className="space-y-3">
      <p className="b-text-sm b-text-secondary">
        Manage your professor profile — photo, bio, credentials, and publications.
      </p>
      <Link
        href="/professors"
        className="b-btn b-btn-logic b-btn-md inline-flex items-center gap-2"
      >
        Edit Professor Profile
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
