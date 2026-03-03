'use client'

import { Certificate, Medal, Star, GraduationCap, ArrowSquareOut, CheckCircle, Link as LinkIcon } from '@phosphor-icons/react'
import type { DigitalCredential, CredentialType } from '@/lib/types/university'

interface CredentialViewProps {
  credential: DigitalCredential
}

const TYPE_CONFIG: Record<CredentialType, { label: string; color: string; icon: typeof Certificate }> = {
  'path-completion': { label: 'Path Completion', color: 'text-blue-700', icon: Certificate },
  'year-milestone': { label: 'Year Milestone', color: 'text-purple-700', icon: Medal },
  'skill-certification': { label: 'Skill Certification', color: 'text-green-700', icon: Star },
  'degree': { label: 'Degree', color: 'text-amber-700', icon: GraduationCap },
}

export function CredentialView({ credential }: CredentialViewProps) {
  const config = TYPE_CONFIG[credential.type]
  const Icon = config.icon
  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${credential.verificationUrl}`
    : credential.verificationUrl

  function handleCopyLink() {
    navigator.clipboard.writeText(verificationUrl)
  }

  function handleShareLinkedIn() {
    const url = encodeURIComponent(verificationUrl)
    const title = encodeURIComponent(credential.title)
    const summary = encodeURIComponent(credential.description)
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
      '_blank'
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Certificate card */}
      <div className="border-2 border-gray-900 rounded-xl p-8 bg-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Icon size={28} weight="bold" className={config.color} />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2">
            {config.label}
          </p>
          <h1 className="text-xl font-bold text-gray-900 mb-1">{credential.title}</h1>
          <p className="text-sm text-gray-500">{credential.description}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Recipient */}
        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-1">
            Awarded to
          </p>
          <p className="text-lg font-semibold text-gray-900">{credential.userName}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(credential.issuedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Skills */}
        {credential.skills.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2">
              Skills Demonstrated
            </p>
            <div className="flex flex-wrap gap-1.5">
              {credential.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Evidence Chain */}
        {credential.evidence.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2">
              Evidence
            </p>
            <div className="space-y-2">
              {credential.evidence.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle size={14} weight="fill" className="text-green-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="text-gray-700">{item.title}</span>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-gray-400 hover:text-gray-600 inline-flex items-center"
                      >
                        <ArrowSquareOut size={10} />
                      </a>
                    )}
                    <span className="text-gray-400 ml-1">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professor Signatures */}
        {credential.professorSignatures.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2">
              Professor Signatures
            </p>
            <div className="space-y-2">
              {credential.professorSignatures.map((sig) => (
                <div key={sig.professorId} className="flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <GraduationCap size={12} weight="bold" className="text-gray-500" />
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">{sig.professorName}</span>
                    <span className="text-gray-400 ml-1">
                      signed {new Date(sig.signedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Verification URL */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2">
            Verification URL
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-center gap-2">
            <code className="text-xs text-gray-600 truncate">{verificationUrl}</code>
            <button
              onClick={handleCopyLink}
              className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            >
              <LinkIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Share actions */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 text-xs font-medium border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LinkIcon size={14} />
          Copy Link
        </button>
        <button
          onClick={handleShareLinkedIn}
          className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowSquareOut size={14} />
          Share to LinkedIn
        </button>
      </div>
    </div>
  )
}
