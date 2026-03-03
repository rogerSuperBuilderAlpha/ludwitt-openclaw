/**
 * Type definitions for D-ID Video Explanations
 */

export interface VideoExplanationRequest {
  problemId: string
  subject: 'math' | 'reading'
  problemText: string
  difficulty: number
  type: string
}

export interface VideoExplanationResponse {
  success: boolean
  data?: {
    videoId: string
    status: 'pending' | 'processing' | 'done' | 'error'
    videoUrl?: string
    message: string
    cached?: boolean
  }
  error?: string
}

export interface VideoStatusRequest {
  videoId: string
}

export interface VideoStatusResponse {
  success: boolean
  data?: {
    videoId: string
    status: 'pending' | 'processing' | 'done' | 'error'
    videoUrl?: string
    resultUrl?: string
  }
  error?: string
}

export interface DIDCreateTalkRequest {
  script: {
    type: 'text'
    input: string
    provider: {
      type: 'microsoft' | 'amazon' | 'google'
      voice_id: string
    }
  }
  source_url: string
  config?: {
    stitch?: boolean
    result_format?: 'mp4' | 'gif' | 'mov'
  }
}

export interface DIDCreateTalkResponse {
  id: string
  status: 'created' | 'processing' | 'done' | 'error'
  created_at: string
}

export interface DIDGetTalkResponse {
  id: string
  status: 'created' | 'processing' | 'done' | 'error'
  result_url?: string
  error?: {
    description: string
    kind: string
  }
}
