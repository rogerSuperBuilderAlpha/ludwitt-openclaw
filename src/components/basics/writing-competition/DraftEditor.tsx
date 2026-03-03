import { CheckCircle } from '@phosphor-icons/react'
import { EssayEditor } from '../EssayEditor'
import { WritingSubmission } from '@/lib/types/writing-competition'

interface DraftEditorProps {
  userSubmission: WritingSubmission | null
  essay: string
  setEssay: (essay: string) => void
  timeRemaining: number
  onTypingTimeUpdate: (seconds: number) => void
}

export function DraftEditor({
  userSubmission,
  essay,
  setEssay,
  timeRemaining,
  onTypingTimeUpdate,
}: DraftEditorProps) {
  if (userSubmission) {
    return (
      <div className="b-p-lg b-bg-muted b-rounded-xl b-border">
        <div className="flex items-center gap-2 b-mb-md b-text-secondary">
          <CheckCircle size={18} weight="fill" className="b-text-reading" />
          <span className="b-font-medium">Your Submitted Essay</span>
          <span className="b-text-sm b-text-muted">
            • {userSubmission.wordCount} words
          </span>
        </div>
        <p className="b-text-secondary leading-relaxed font-serif whitespace-pre-wrap">
          {userSubmission.essay}
        </p>
      </div>
    )
  }

  return (
    <EssayEditor
      value={essay}
      onChange={setEssay}
      disabled={timeRemaining <= 0}
      placeholder="Start typing your 100-word essay here..."
      onTypingTimeUpdate={onTypingTimeUpdate}
    />
  )
}
