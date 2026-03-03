'use client'

/**
 * Subject Companions System with AI-Generated Evolution
 *
 * Main container component that orchestrates all companion functionality
 * Each subject has ONE companion that evolves uniquely through AI generation
 *
 * Rewards: Free AI hints, explanations, and other features
 */

import { useState } from 'react'
import { Subject } from '@/data/companions/attributes'
import { useCompanions } from './hooks/useCompanions'
import { CompanionDisplay } from './CompanionDisplay'
import { CompanionStats } from './CompanionStats'
import { EvolutionFlow } from './EvolutionFlow'
import { MiniGameSection } from './MiniGameSection'
import { AvatarGenerator } from './AvatarGenerator'
import { VirtualPetSystemProps, MiniGame } from './types'

export function VirtualPetSystem({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  dailyXP,
  userId,
  onXpChange,
}: VirtualPetSystemProps) {
  // Use custom hook for companion state management
  const {
    companions,
    isLoading,
    notification,
    userCredits,
    adoptCompanion,
    feedCompanion,
    saveCompanions,
    showNotif,
    refreshCredits,
  } = useCompanions({
    userId,
    mathProgress,
    readingProgress,
    latinXP,
    greekXP,
    logicXP,
    dailyXP,
    onXpChange,
  })

  // Local UI state
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [showEvolution, setShowEvolution] = useState(false)
  const [miniGame, setMiniGame] = useState<MiniGame | null>(null)
  const [avatarSubject, setAvatarSubject] = useState<Subject | null>(null)

  // Start evolution process
  const startEvolution = (subject: Subject) => {
    setSelectedSubject(subject)
    setShowEvolution(true)
  }

  // Play mini-game
  const startPlay = (subject: Subject) => {
    const companion = companions[subject]
    if (!companion || companion.energy < 15) {
      showNotif('😴 Too tired to play!')
      return
    }

    const a = Math.floor(Math.random() * 10) + 1
    const b = Math.floor(Math.random() * 10) + 1
    const ops = ['+', '-', '×']
    const op = ops[Math.floor(Math.random() * 3)]
    let answer: number
    if (op === '+') answer = a + b
    else if (op === '-') answer = a - b
    else answer = a * b

    const options = [String(answer)]
    while (options.length < 4) {
      const wrong = answer + Math.floor(Math.random() * 10) - 5
      if (!options.includes(String(wrong)) && wrong !== answer) {
        options.push(String(wrong))
      }
    }
    options.sort(() => Math.random() - 0.5)

    setSelectedSubject(subject)
    setMiniGame({
      question: `${a} ${op} ${b} = ?`,
      answer: String(answer),
      options,
    })
  }

  // Handle mini-game answer
  const handlePlayAnswer = async (selected: string) => {
    if (!miniGame || !selectedSubject) return

    const companion = companions[selectedSubject]
    if (!companion) return

    const correct = selected === miniGame.answer

    await saveCompanions({
      ...companions,
      [selectedSubject]: {
        ...companion,
        happiness: Math.min(100, companion.happiness + (correct ? 25 : 10)),
        energy: Math.max(0, companion.energy - 15),
        totalPlayed: companion.totalPlayed + 1,
        lastCaredAt: Date.now(),
      },
    })

    if (correct) {
      showNotif(`🎮 Correct! ${companion.name} says: ${companion.catchphrase}`)
    } else {
      showNotif(`🎮 Nice try! ${companion.name} had fun!`)
    }

    setMiniGame(null)
    setSelectedSubject(null)
  }

  // Start avatar generation
  const handleGenerateAvatar = (subject: Subject) => {
    setAvatarSubject(subject)
  }

  // Avatar generation complete
  const handleAvatarComplete = () => {
    setAvatarSubject(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-2xl mb-2">🐾</div>
          <div className="b-text-muted">Loading companions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Notification */}
      {notification && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-b-modal z-[100] animate-bounce font-medium"
          style={{ backgroundColor: 'var(--b-logic)', color: 'white' }}
        >
          {notification}
        </div>
      )}

      {/* Credits and Stats */}
      <CompanionStats userCredits={userCredits} />

      {/* Companions Grid */}
      <CompanionDisplay
        companions={companions}
        dailyXP={dailyXP}
        userCredits={userCredits}
        subjectXPs={{
          math: mathProgress?.totalXP || 0,
          reading: readingProgress?.totalXP || 0,
          latin: latinXP,
          greek: greekXP,
          logic: logicXP,
        }}
        onAdopt={adoptCompanion}
        onFeed={feedCompanion}
        onPlay={startPlay}
        onGenerateAvatar={handleGenerateAvatar}
        onStartEvolution={startEvolution}
      />

      {/* Evolution Modal */}
      <EvolutionFlow
        isOpen={showEvolution && !!selectedSubject}
        onClose={() => setShowEvolution(false)}
        subject={selectedSubject}
        companion={selectedSubject ? companions[selectedSubject] : null}
        userCredits={userCredits}
        companions={companions}
        saveCompanions={saveCompanions}
        showNotif={showNotif}
        refreshCredits={refreshCredits}
      />

      {/* Mini-Game Modal */}
      <MiniGameSection
        miniGame={miniGame}
        onClose={() => {
          setMiniGame(null)
          setSelectedSubject(null)
        }}
        onAnswer={handlePlayAnswer}
      />

      {/* Avatar Generator */}
      {avatarSubject && (
        <AvatarGenerator
          selectedSubject={avatarSubject}
          companion={companions[avatarSubject]}
          userCredits={userCredits}
          companions={companions}
          saveCompanions={saveCompanions}
          showNotif={showNotif}
          refreshCredits={refreshCredits}
          onGenerateComplete={handleAvatarComplete}
        />
      )}
    </div>
  )
}

// Re-export helper functions for backwards compatibility
export {
  getCompanionRewards,
  getCompanionAvatar,
} from '@/data/companions/attributes'
