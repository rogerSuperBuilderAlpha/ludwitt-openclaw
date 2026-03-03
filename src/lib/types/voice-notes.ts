// Voice Notes Types

import { RecordingTemplateType } from '@/lib/voice-notes/templates'

export interface Recording {
  id: string
  title: string
  date: Date
  duration: number
  audioBlob?: Blob
  audioUrl?: string
  transcript?: string
  transcriptWithTimestamps?: TranscriptSegment[]
  summary?: string
  actionItems?: string[]
  nextSteps?: string[]
  keyMoments?: KeyMoment[]
  speakers?: Speaker[]
  sentiment?: Sentiment
  tags?: string[]
  starred?: boolean
  userId?: string
  createdAt?: Date
  updatedAt?: Date
  template?: RecordingTemplateType
  questions?: string[]
  decisions?: string[]
  commitments?: string[]
}

export interface KeyMoment {
  time: number
  text: string
  importance?: 'high' | 'medium' | 'low'
}

export interface Speaker {
  name: string
  segments: number
  duration?: number
  customName?: string
}

export interface TranscriptSegment {
  timestamp: number
  speaker?: string
  text: string
}

export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface ProcessedResult {
  transcript: string
  transcriptWithTimestamps?: TranscriptSegment[]
  summary: string
  actionItems: string[]
  nextSteps: string[]
  keyMoments: KeyMoment[]
  speakers: Speaker[]
  sentiment: Sentiment
  tags: string[]
  questions?: string[]
  decisions?: string[]
  commitments?: string[]
}

export interface RecordingFilters {
  search?: string
  tag?: string
  sentiment?: Sentiment
  starred?: boolean
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface RecordingStats {
  totalRecordings: number
  totalDuration: number
  averageDuration: number
  byTag: Record<string, number>
  bySentiment: Record<Sentiment, number>
}

