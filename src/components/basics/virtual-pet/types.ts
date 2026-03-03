/**
 * Shared types and interfaces for Virtual Pet System
 */

import { SubjectProgressDisplay } from '@/lib/types/basics'
import {
  Subject,
  SubjectCompanion,
  GeneratedCompanion,
  EvolutionAttributes
} from '@/data/companions/attributes'

export type { Subject, SubjectCompanion, GeneratedCompanion, EvolutionAttributes }

export interface VirtualPetSystemProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  dailyXP: number
  userId?: string
  onXpChange?: (delta: number) => void
}

export interface MiniGame {
  question: string
  answer: string
  options: string[]
}

export interface UseCompanionsReturn {
  companions: Record<Subject, SubjectCompanion | null>
  isLoading: boolean
  notification: string | null
  userCredits: number
  adoptCompanion: (subject: Subject) => Promise<void>
  feedCompanion: (subject: Subject) => Promise<void>
  saveCompanions: (newCompanions: Record<Subject, SubjectCompanion | null>) => Promise<void>
  showNotif: (message: string) => void
  refreshCredits: () => void
}

export interface CompanionDisplayProps {
  companions: Record<Subject, SubjectCompanion | null>
  dailyXP: number
  userCredits: number
  subjectXPs: Record<Subject, number>
  onAdopt: (subject: Subject) => void
  onFeed: (subject: Subject) => void
  onPlay: (subject: Subject) => void
  onGenerateAvatar: (subject: Subject) => void
  onStartEvolution: (subject: Subject) => void
}

export interface CompanionStatsProps {
  userCredits: number
}

export interface EvolutionFlowProps {
  isOpen: boolean
  onClose: () => void
  subject: Subject | null
  companion: SubjectCompanion | null
  userCredits: number
  companions: Record<Subject, SubjectCompanion | null>
  saveCompanions: (newCompanions: Record<Subject, SubjectCompanion | null>) => Promise<void>
  showNotif: (message: string) => void
  refreshCredits: () => void
}

export interface MiniGameSectionProps {
  miniGame: MiniGame | null
  onClose: () => void
  onAnswer: (selected: string) => void
}

export interface AvatarGeneratorProps {
  selectedSubject: Subject | null
  companion: SubjectCompanion | null
  userCredits: number
  companions: Record<Subject, SubjectCompanion | null>
  saveCompanions: (newCompanions: Record<Subject, SubjectCompanion | null>) => Promise<void>
  showNotif: (message: string) => void
  refreshCredits: () => void
  onGenerateComplete: (subject: Subject, avatarUrl: string) => void
}
