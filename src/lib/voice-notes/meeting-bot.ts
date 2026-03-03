// Meeting Bot System for Auto-Joining Calls

import { CalendarEvent } from './calendar'

export interface MeetingBotConfig {
  provider: 'recall-ai' | 'fireflies' | 'custom' | 'disabled'
  apiKey?: string
  webhookUrl?: string
}

export interface BotInstance {
  id: string
  eventId: string
  meetingLink: string
  meetingType: 'google-meet' | 'zoom' | 'teams'
  status: 'scheduled' | 'joining' | 'recording' | 'completed' | 'failed'
  startedAt?: Date
  endedAt?: Date
  recordingUrl?: string
  transcript?: string
  error?: string
}

// Recall.ai Integration (Recommended for production)
// https://www.recall.ai - Meeting bot as a service
export async function joinMeetingWithRecall(
  meetingLink: string,
  meetingTitle: string,
  apiKey: string
): Promise<{ botId: string; status: string }> {
  const response = await fetch('https://us-west-2.recall.ai/api/v1/bot/', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meeting_url: meetingLink,
      bot_name: 'Voice Notes AI Assistant',
      transcription_options: {
        provider: 'assembly_ai' // or 'meeting_captions', 'aws_transcribe'
      },
      chat: {
        on_bot_join: {
          send_to: 'everyone',
          message: '🎙️ Voice Notes AI has joined to record and transcribe this meeting.'
        }
      },
      automatic_leave: {
        waiting_room_timeout: 600, // 10 minutes
        noone_joined_timeout: 300  // 5 minutes
      }
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to start bot: ${error.message || 'Unknown error'}`)
  }

  const data = await response.json()
  
  return {
    botId: data.id,
    status: data.status.code
  }
}

// Check bot status (Recall.ai)
export async function checkBotStatus(
  botId: string,
  apiKey: string
): Promise<BotInstance> {
  const response = await fetch(`https://us-west-2.recall.ai/api/v1/bot/${botId}/`, {
    headers: {
      'Authorization': `Token ${apiKey}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch bot status')
  }

  const data = await response.json()

  return {
    id: data.id,
    eventId: '',
    meetingLink: data.meeting_url,
    meetingType: detectMeetingTypeFromUrl(data.meeting_url),
    status: mapBotStatus(data.status.code),
    startedAt: data.join_at ? new Date(data.join_at) : undefined,
    endedAt: data.leave_at ? new Date(data.leave_at) : undefined,
    recordingUrl: data.video_url,
    transcript: data.transcript_text
  }
}

// Map Recall.ai status to our status
function mapBotStatus(recallStatus: string): BotInstance['status'] {
  const mapping: Record<string, BotInstance['status']> = {
    'ready': 'scheduled',
    'joining': 'joining',
    'in_call_not_recording': 'joining',
    'in_call_recording': 'recording',
    'done': 'completed',
    'fatal': 'failed'
  }
  return mapping[recallStatus] || 'scheduled'
}

function detectMeetingTypeFromUrl(url: string): 'google-meet' | 'zoom' | 'teams' {
  if (url.includes('meet.google.com')) return 'google-meet'
  if (url.includes('zoom.us')) return 'zoom'
  return 'teams'
}

// Fireflies.ai Integration (Alternative)
export async function joinMeetingWithFireflies(
  meetingLink: string,
  meetingTitle: string,
  apiKey: string
): Promise<{ botId: string }> {
  const response = await fetch('https://api.fireflies.ai/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        mutation {
          createTranscript(
            title: "${meetingTitle}"
            meeting_url: "${meetingLink}"
            auto_join: true
          ) {
            id
            title
          }
        }
      `
    })
  })

  const data = await response.json()
  
  if (data.errors) {
    throw new Error(`Fireflies error: ${data.errors[0].message}`)
  }

  return {
    botId: data.data.createTranscript.id
  }
}

// Schedule bot to join meeting
export async function scheduleMeetingBot(
  event: CalendarEvent,
  userId: string,
  config: MeetingBotConfig
): Promise<string> {
  if (!event.meetingLink) {
    throw new Error('Event has no meeting link')
  }

  if (config.provider === 'disabled') {
    throw new Error('Meeting bot is disabled')
  }

  // Save scheduled bot to Firestore
  const botDoc = await db.collection('meetingBots').add({
    userId,
    eventId: event.id,
    meetingLink: event.meetingLink,
    meetingType: event.meetingType,
    eventTitle: event.title,
    startTime: event.startTime,
    endTime: event.endTime,
    provider: config.provider,
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date()
  })

  return botDoc.id
}

// Custom Puppeteer-based bot (for self-hosted)
// Note: This requires a server with Chrome/Chromium
export async function joinMeetingWithPuppeteer(
  meetingLink: string,
  meetingType: 'google-meet' | 'zoom'
): Promise<{ success: boolean; message: string }> {
  // This would need to be implemented with Puppeteer
  // Running in a serverless environment like Vercel won't work
  // Needs a dedicated server or cloud function with longer timeout
  
  return {
    success: false,
    message: 'Puppeteer bot requires dedicated server. Use Recall.ai or Fireflies.ai instead.'
  }
}

// Helper: Import statement for Firestore
import { db } from '@/lib/firebase/admin'

