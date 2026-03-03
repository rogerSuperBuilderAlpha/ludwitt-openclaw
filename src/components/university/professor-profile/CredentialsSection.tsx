'use client'

import { GraduationCap, Certificate } from '@phosphor-icons/react'
import type { ProfessorDegree, ProfessorCertification } from '@/lib/types/university'

interface CredentialsSectionProps {
  degrees?: ProfessorDegree[]
  certifications?: ProfessorCertification[]
}

export function CredentialsSection({ degrees, certifications }: CredentialsSectionProps) {
  const hasDegrees = degrees && degrees.length > 0
  const hasCerts = certifications && certifications.length > 0

  if (!hasDegrees && !hasCerts) return null

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Credentials</h3>

      {hasDegrees && (
        <div className="space-y-2">
          {degrees.map((deg, i) => (
            <div key={i} className="flex items-start gap-2">
              <GraduationCap size={16} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  {deg.degree} in {deg.field}
                </p>
                <p className="text-xs text-gray-400">
                  {deg.institution}{deg.year ? ` (${deg.year})` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasCerts && (
        <div className="space-y-2">
          {certifications.map((cert, i) => (
            <div key={i} className="flex items-start gap-2">
              <Certificate size={16} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-gray-700 font-medium">{cert.name}</p>
                <p className="text-xs text-gray-400">
                  {cert.issuer}{cert.year ? ` (${cert.year})` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
