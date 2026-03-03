'use client'

import Image from 'next/image'

// =============================================================================
// Flowing Background - Matching landing page design
// =============================================================================

function LoginFlowingBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large flowing curve - top right */}
      <svg
        className="absolute -top-20 -right-40 w-[600px] h-[600px] opacity-[0.04]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M50 350 Q100 200 200 150 T350 50"
          stroke="#0a0a0a"
          strokeWidth="60"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M30 380 Q80 250 180 180 T320 80"
          stroke="#0a0a0a"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Flowing curve - bottom left */}
      <svg
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-[0.03]"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M250 50 Q150 100 100 200 T50 280"
          stroke="#0a0a0a"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Circular motif */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-[#0a0a0a]/5 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-36 h-36 translate-x-6 translate-y-6 border border-[#0a0a0a]/3 rounded-full" />
    </div>
  )
}

// =============================================================================
// Brush Stroke Underline
// =============================================================================

function BrushUnderline() {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full h-2"
      viewBox="0 0 200 12"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M2 8 Q40 2 100 6 T198 4"
        stroke="#d64933"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// =============================================================================
// Left Panel Component - Matching Basics Design Schema
// =============================================================================

export function LeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#faf8f5]">
      <LoginFlowingBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        {/* Top - Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 relative">
            <Image
              src="/logos/logo.png"
              alt="Ludwitt"
              width={44}
              height={44}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-lg font-semibold text-[#0a0a0a] tracking-tight">Ludwitt</span>
            <span className="text-[#6b6b6b] text-sm ml-2">Adaptive Learning</span>
          </div>
        </div>

        {/* Middle - Hero Content */}
        <div className="max-w-lg">
          <p className="text-sm font-medium text-[#d64933] mb-4 tracking-wide uppercase">
            Welcome back
          </p>
          <h1 className="text-4xl xl:text-5xl font-bold text-[#0a0a0a] leading-tight mb-6">
            Where curiosity{' '}
            <span className="relative inline-block">
              flows
              <BrushUnderline />
            </span>{' '}
            into mastery
          </h1>
          <p className="text-lg text-[#6b6b6b] mb-10 leading-relaxed">
            AI-powered practice that adapts to your unique pace. Master math, reading, and critical thinking.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              { icon: '🎯', text: 'Adaptive practice that meets you where you are' },
              { icon: '📊', text: 'Track progress across math, reading & logic' },
              { icon: '🏆', text: 'Earn XP, badges, and compete on leaderboards' },
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-[#0a0a0a]/80">
                <span className="text-xl">{benefit.icon}</span>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom - Testimonial */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#0a0a0a]/5 shadow-sm">
          <p className="text-[#0a0a0a]/70 italic mb-4">
            &ldquo;My daughter went from struggling with fractions to mastering algebra concepts.
            The adaptive system really works!&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d64933] flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <div className="text-[#0a0a0a] font-medium">Sarah M.</div>
              <div className="text-[#6b6b6b] text-sm">Parent of 6th grader</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
