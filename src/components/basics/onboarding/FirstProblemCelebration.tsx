'use client'

import { useEffect, useState } from 'react'
import { Trophy, Sparkle, ArrowRight, User } from '@phosphor-icons/react'
import { Portal } from '../Portal'

interface FirstProblemCelebrationProps {
  onContinue: () => void
  onSetupProfile?: () => void
  xpEarned?: number
}

// Simple confetti particle
interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  velocityY: number
  velocityX: number
}

const COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
]

export function FirstProblemCelebration({
  onContinue,
  onSetupProfile,
  xpEarned = 10,
}: FirstProblemCelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isVisible, setIsVisible] = useState(true)

  // Create confetti particles on mount
  useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        velocityY: 2 + Math.random() * 3,
        velocityX: (Math.random() - 0.5) * 2,
      })
    }
    setParticles(newParticles)

    // Animate particles
    const interval = setInterval(() => {
      setParticles(
        (prev) =>
          prev
            .map((p) => ({
              ...p,
              y: p.y + p.velocityY,
              x: p.x + p.velocityX,
              rotation: p.rotation + 5,
            }))
            .filter((p) => p.y < 110) // Remove particles that fall off screen
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handleContinue = () => {
    setIsVisible(false)
    setTimeout(onContinue, 200)
  }

  const handleSetupProfile = () => {
    setIsVisible(false)
    setTimeout(() => {
      if (onSetupProfile) onSetupProfile()
    }, 200)
  }

  if (!isVisible) return null

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: particle.color,
                transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
                transition: 'none',
              }}
            />
          ))}
        </div>

        {/* Modal */}
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative animate-bounce-in"
          style={{
            animation: 'bounceIn 0.5s ease-out',
          }}
        >
          <style jsx>{`
            @keyframes bounceIn {
              0% {
                transform: scale(0.5);
                opacity: 0;
              }
              50% {
                transform: scale(1.05);
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>

          <div className="px-6 py-8 text-center">
            {/* Trophy Icon */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-yellow-200 flex items-center justify-center">
                <Trophy size={48} className="text-amber-600" weight="fill" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <Sparkle size={16} className="text-white" weight="fill" />
              </div>
            </div>

            {/* Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              First Problem Solved!
            </h2>
            <p className="text-gray-600 mb-6">
              You&apos;re on your way! Keep going to build your skills.
            </p>

            {/* XP Earned */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-6">
              <Sparkle size={18} weight="fill" />+{xpEarned} XP earned
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-bold"
              >
                Keep Learning
                <ArrowRight size={18} weight="bold" />
              </button>

              {onSetupProfile && (
                <button
                  onClick={handleSetupProfile}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all font-medium"
                >
                  <User size={18} weight="fill" />
                  Set up profile for leaderboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
