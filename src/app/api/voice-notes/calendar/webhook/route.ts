import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import Anthropic from '@anthropic-ai/sdk'
import { getTemplateById } from '@/lib/voice-notes/templates'
import { apiLogger } from '@/lib/logger'
import { getDefaultModelForTier, getTaskConfig } from '@/lib/ai/providers'
import { trackCreditsAfterCall, checkBalance } from '@/lib/credits'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

// Webhook handler for Recall.ai bot updates
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    apiLogger.success('voice-notes/calendar/webhook', `Received: ${data.event}`)

    // Handle different webhook events (supports multiple naming conventions)
    const eventType = data.event || data.type || ''
    
    // Bot status changes (various naming conventions)
    if (eventType.includes('status') || eventType.includes('state')) {
      await handleBotStatusChange(data.data || data)
    }
    // Recording ready
    else if (eventType.includes('recording') && eventType.includes('ready')) {
      await handleRecordingReady(data.data || data)
    }
    // Transcript ready
    else if (eventType.includes('transcript') && eventType.includes('ready')) {
      await handleTranscriptReady(data.data || data)
    }
    // Bot completed
    else if (eventType.includes('complete') || eventType.includes('done')) {
      await handleTranscriptReady(data.data || data)
    }
    else {
      apiLogger.success('voice-notes/calendar/webhook', `Event received: ${eventType}`, data)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    apiLogger.apiError('voice-notes/calendar/webhook', 'Webhook processing failed', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle bot status changes
async function handleBotStatusChange(data: any) {
  const botId = data.bot_id
  const status = data.status.code

  apiLogger.success('voice-notes/calendar/webhook', `Bot ${botId} status: ${status}`)

  // Update bot status in Firestore
  const botDoc = await db.collection('meetingBots').doc(botId).get()
  
  if (botDoc.exists) {
    await db.collection('meetingBots').doc(botId).update({
      status: mapBotStatus(status),
      updatedAt: Timestamp.now()
    })
  }
}

// Handle recording ready
async function handleRecordingReady(data: any) {
  const botId = data.bot_id
  const videoUrl = data.video_url
  const mp4Url = data.mp4_url

  apiLogger.success('voice-notes/calendar/webhook', `Recording ready for bot ${botId}`)

  // Update bot with recording URL
  await db.collection('meetingBots').doc(botId).update({
    recordingUrl: mp4Url || videoUrl,
    updatedAt: Timestamp.now()
  })
}

// Handle transcript ready - process with Claude
async function handleTranscriptReady(data: any) {
  const botId = data.bot_id
  const transcript = data.transcript
  
  apiLogger.success('voice-notes/calendar/webhook', `Transcript ready for bot ${botId}`)

  // Get bot details
  const botDoc = await db.collection('meetingBots').doc(botId).get()
  
  if (!botDoc.exists) {
    apiLogger.apiError('voice-notes/calendar/webhook', `Bot not found: ${botId}`, null)
    return
  }

  const bot = botDoc.data()!
  
  // Process transcript with Claude
  if (!anthropic) {
    apiLogger.apiError('voice-notes/calendar/webhook', 'Anthropic not configured', null)
    return
  }

  try {
    // Use team-meeting template for calendar-based recordings
    const template = getTemplateById('team-meeting')
    
    const analysisPrompt = `You are analyzing a meeting transcript from an automatically recorded calendar event.

Meeting Title: ${bot.eventTitle}
Duration: ${Math.floor((bot.endTime - bot.startTime) / 60000)} minutes

Transcript:
${transcript}

${template.aiPrompt}

Provide comprehensive analysis in JSON format with:
- enhancedTranscript
- transcriptWithTimestamps
- summary
- actionItems
- nextSteps
- keyMoments
- speakers
- sentiment
- tags
- questions
- decisions
- commitments`

    // Use standard tier for webhook processing (no user context)
    const taskConfig = getTaskConfig('voice-processing')
    const model = getDefaultModelForTier(taskConfig.recommendedTier)

    const response = await anthropic.messages.create({
      model: model.id,
      max_tokens: taskConfig.defaultMaxTokens,
      temperature: taskConfig.defaultTemperature,
      messages: [{
        role: 'user',
        content: analysisPrompt
      }]
    })

    // Track credits for the AI call - charge to the user who set up the meeting bot
    try {
      await trackCreditsAfterCall(
        bot.userId,
        'voice-notes-calendar-webhook',
        model.id,
        response.usage
      )
    } catch (creditError) {
      // Log but don't fail the webhook - the meeting was recorded and user should get their notes
      apiLogger.apiError('voice-notes/calendar/webhook', 'Failed to track credits', creditError)
    }

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response')
    }

    const analysis = JSON.parse(jsonMatch[0])

    // Create recording in voiceNotes collection
    const recordingId = `calendar_${bot.eventId}_${Date.now()}`
    
    await db.collection('voiceNotes').doc(recordingId).set({
      id: recordingId,
      userId: bot.userId,
      title: bot.eventTitle,
      date: bot.startTime,
      duration: Math.floor((bot.endTime - bot.startTime) / 1000),
      audioUrl: bot.recordingUrl || '',
      transcript: analysis.enhancedTranscript || transcript,
      transcriptWithTimestamps: analysis.transcriptWithTimestamps || [],
      summary: analysis.summary,
      actionItems: analysis.actionItems || [],
      nextSteps: analysis.nextSteps || [],
      keyMoments: analysis.keyMoments || [],
      speakers: analysis.speakers || [],
      sentiment: analysis.sentiment || 'neutral',
      tags: analysis.tags || ['meeting'],
      questions: analysis.questions || [],
      decisions: analysis.decisions || [],
      commitments: analysis.commitments || [],
      template: 'team-meeting',
      calendarEventId: bot.eventId,
      autoRecorded: true,
      starred: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })

    // Update bot with recording ID
    await db.collection('meetingBots').doc(botId).update({
      recordingId,
      status: 'completed',
      updatedAt: Timestamp.now()
    })

    apiLogger.success('voice-notes/calendar/webhook', `Created recording ${recordingId} for event ${bot.eventId}`)

    // Meeting summary email to attendees is a planned feature
    // await sendMeetingSummaryEmail(bot, analysis)
  } catch (error) {
    apiLogger.apiError('voice-notes/calendar/webhook', 'Failed to process transcript', error)
    
    await db.collection('meetingBots').doc(botId).update({
      status: 'failed',
      error: error instanceof Error ? error.message : 'Processing failed',
      updatedAt: Timestamp.now()
    })
  }
}

function mapBotStatus(recallStatus: string): string {
  const mapping: Record<string, string> = {
    'ready': 'scheduled',
    'joining': 'joining',
    'in_call_not_recording': 'joining',
    'in_call_recording': 'recording',
    'done': 'completed',
    'fatal': 'failed'
  }
  return mapping[recallStatus] || 'scheduled'
}

