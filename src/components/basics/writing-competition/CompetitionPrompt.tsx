import { Scroll } from '@phosphor-icons/react'
import { WritingCompetition } from '@/lib/types/writing-competition'

interface CompetitionPromptProps {
  competition: WritingCompetition
}

export function CompetitionPrompt({ competition }: CompetitionPromptProps) {
  return (
    <div className="b-mb-xl b-p-lg b-bg-writing-light b-border b-border-writing b-rounded-xl">
      <div className="flex items-start gap-3">
        <div className="p-2 b-bg-writing-light b-rounded-lg">
          <Scroll size={20} className="b-text-writing-dark" />
        </div>
        <div>
          <h3 className="b-font-semibold b-text-writing-dark b-mb-sm">
            This Week&apos;s Prompt
          </h3>
          <p className="b-text-writing-text leading-relaxed">
            &ldquo;{competition.prompt}&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
