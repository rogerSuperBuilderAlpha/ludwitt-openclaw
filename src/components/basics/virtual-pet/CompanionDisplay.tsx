/**
 * CompanionDisplay - Renders the grid of minimal companion cards
 * Clicking a card opens the detail modal
 */

import { useState } from 'react'
import {
  CompanionMiniCard,
  CompanionDetailModal,
} from '@/components/basics/companions'
import { Subject } from '@/data/companions/attributes'
import { CompanionDisplayProps } from './types'

export function CompanionDisplay({
  companions,
  dailyXP,
  userCredits,
  subjectXPs,
  onAdopt,
  onFeed,
  onPlay,
  onGenerateAvatar,
  onStartEvolution,
}: CompanionDisplayProps) {
  const subjects: Subject[] = ['math', 'reading', 'latin', 'greek', 'logic']
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const selectedCompanion = selectedSubject ? companions[selectedSubject] : null

  return (
    <>
      {/* Compact grid of mini cards */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {subjects.map((subject) => (
          <CompanionMiniCard
            key={subject}
            subject={subject}
            companion={companions[subject]}
            subjectXP={subjectXPs[subject] || 0}
            onClick={() => setSelectedSubject(subject)}
            onAdopt={() => onAdopt(subject)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedSubject && selectedCompanion && (
        <CompanionDetailModal
          isOpen={!!selectedSubject && !!selectedCompanion}
          onClose={() => setSelectedSubject(null)}
          subject={selectedSubject}
          companion={selectedCompanion}
          subjectXP={subjectXPs[selectedSubject] || 0}
          dailyXP={dailyXP}
          userCredits={userCredits}
          onFeed={() => onFeed(selectedSubject)}
          onPlay={() => onPlay(selectedSubject)}
          onGenerateAvatar={() => onGenerateAvatar(selectedSubject)}
          onStartEvolution={() => onStartEvolution(selectedSubject)}
        />
      )}
    </>
  )
}
