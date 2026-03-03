/**
 * MiniGameSection - Handles mini-game interface
 * Simple math problems to play with companions
 */

import { MiniGameModal } from '@/components/basics/companions'
import { MiniGameSectionProps } from './types'

export function MiniGameSection({
  miniGame,
  onClose,
  onAnswer,
}: MiniGameSectionProps) {
  if (!miniGame) return null

  return (
    <MiniGameModal
      isOpen={!!miniGame}
      onClose={onClose}
      question={miniGame.question}
      options={miniGame.options}
      onAnswer={onAnswer}
    />
  )
}
