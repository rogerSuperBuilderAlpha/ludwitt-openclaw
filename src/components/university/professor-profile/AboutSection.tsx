'use client'

interface AboutSectionProps {
  bio?: string
  teachingPhilosophy?: string
  whyITeach?: string
}

export function AboutSection({ bio, teachingPhilosophy, whyITeach }: AboutSectionProps) {
  if (!bio && !teachingPhilosophy && !whyITeach) return null

  return (
    <div className="space-y-5">
      {bio && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{bio}</p>
        </div>
      )}
      {teachingPhilosophy && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Teaching Philosophy</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{teachingPhilosophy}</p>
        </div>
      )}
      {whyITeach && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Why I Teach</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{whyITeach}</p>
        </div>
      )}
    </div>
  )
}
