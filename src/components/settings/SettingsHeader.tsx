'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export function SettingsHeader() {
  return (
    <header className="b-bg-elevated b-border-b sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 b-text-secondary hover:b-text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="b-font-medium">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <Image
                src="/logos/logo.png"
                alt="Ludwitt"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="b-font-semibold b-text-primary">Settings</span>
          </div>
          <div className="w-[72px]" />
        </div>
      </div>
    </header>
  )
}
