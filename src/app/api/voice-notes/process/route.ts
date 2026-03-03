import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { getStorage } from 'firebase-admin/storage'
import Anthropic from '@anthropic-ai/sdk'
import { Timestamp } from 'firebase-admin/firestore'
import { getTemplateById, RecordingTemplateType } from '@/lib/voice-notes/templates'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkCreditsBeforeCall, insufficientCreditsError, trackCreditsAfterCall } from '@/lib/credits'
import { checkBalance } from '@/lib/credits/balance'
import { apiLogger } from '@/lib/logger'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface ProcessedResult {
  recordingId: string
  audioUrl: string
  transcript: string
  transcriptWithTimestamps?: Array<{ timestamp: number; speaker?: string; text: string }>
  summary: string
  actionItems: string[]
  nextSteps: string[]
  keyMoments: { time: number; text: string }[]
  speakers: { name: string; segments: number }[]
  sentiment: 'positive' | 'neutral' | 'negative'
  tags: string[]
  questions?: string[]
  decisions?: string[]
  commitments?: string[]
}

export async function POST(request: NextRequest) {
  try {
    apiLogger.success('voice-notes/process', 'Processing request')
    
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid
    apiLogger.success('voice-notes/process', `User authenticated: ${userId}`)

    if (!anthropic) {
      apiLogger.apiError('voice-notes/process', 'Anthropic not configured', null)
      return NextResponse.json(
        { error: 'AI service not available' },
        { status: 503 }
      )
    }

    // Get form data
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const duration = parseInt(formData.get('duration') as string || '0')
    const realtimeTranscript = formData.get('transcript') as string || ''
    const title = formData.get('title') as string || `Recording ${new Date().toLocaleDateString()}`
    const template = (formData.get('template') as RecordingTemplateType) || 'general'

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    apiLogger.success('voice-notes/process', 'Processing', { 
      fileSize: audioFile.size, 
      duration, 
      hasTranscript: !!realtimeTranscript 
    })

    // Check if user has sufficient credits before processing
    const balanceCheck = await checkBalance(userId)
    if (!balanceCheck.allowed) {
      apiLogger.apiError('voice-notes/process', 'Insufficient credits', {
        userId,
        currentBalance: balanceCheck.currentBalance,
      })
      return insufficientCreditsError(balanceCheck.currentBalance, balanceCheck.minimumBalance)
    }

    // Upload audio to Firebase Storage using Admin SDK
    const recordingId = `${userId}_${Date.now()}`
    const audioPath = `voice-notes/${userId}/${recordingId}.webm`
    
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Get storage bucket
    const bucket = getStorage().bucket()
    const file = bucket.file(audioPath)
    
    // Upload file
    await file.save(buffer, {
      contentType: 'audio/webm',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: crypto.randomUUID()
        }
      }
    })
    
    // Generate a signed URL for authenticated access
    const [audioUrl] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
    })
    apiLogger.success('voice-notes/process', `Audio uploaded: ${audioUrl}`)

    // Process with AI
    const result = await processWithClaude(
      realtimeTranscript,
      duration,
      userId,
      recordingId,
      audioUrl,
      title,
      template
    )

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    apiLogger.apiError('voice-notes/process', 'Failed to process audio', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to process audio') },
      { status: 500 }
    )
  }
}

// Process with Claude AI
async function processWithClaude(
  transcript: string,
  duration: number,
  userId: string,
  recordingId: string,
  audioUrl: string,
  title: string,
  templateType: RecordingTemplateType = 'general'
): Promise<ProcessedResult> {
  apiLogger.success('voice-notes/process', `Processing with Claude, template: ${templateType}`)

  // If no transcript provided, use a placeholder
  const transcriptText = transcript || 'No real-time transcript available. Please review audio recording.'

  // Get template-specific prompt
  const template = getTemplateById(templateType)

  // Use Claude to analyze the transcript with template-specific prompts
  const analysisPrompt = `You are analyzing a voice recording conversation transcript for a ${template.name.toUpperCase()}.

Transcript:
${transcriptText}

Duration: ${Math.floor(duration / 60)} minutes ${duration % 60} seconds

${template.aiPrompt}

Provide a comprehensive analysis in JSON format with the following structure:
{
  "enhancedTranscript": "A cleaned up, properly formatted version of the transcript with speaker labels if you can identify different speakers",
  "transcriptWithTimestamps": [
    {"timestamp": seconds_into_recording, "speaker": "Speaker 1 or name", "text": "What they said"}
  ],
  "summary": "A concise 2-3 sentence summary of the entire conversation",
  "actionItems": ["List of specific action items or tasks mentioned"],
  "nextSteps": ["Suggested next steps based on the conversation"],
  "keyMoments": [
    {"time": seconds_into_recording, "text": "Description of key moment"}
  ],
  "speakers": [
    {"name": "Speaker 1 or identified name", "segments": estimated_number_of_times_they_spoke}
  ],
  "sentiment": "positive" | "neutral" | "negative",
  "tags": ["relevant", "topic", "tags"],
  "questions": ["All questions asked in the conversation"],
  "decisions": ["All decisions made during the conversation"],
  "commitments": ["All commitments or promises made"]
}

Make your best effort to:
- Create accurate timestamps for each segment
- Identify speakers consistently
- Extract ALL questions, decisions, and commitments
- Provide timestamps that allow jumping to specific moments in the audio

If the transcript is short or unclear, still provide helpful analysis based on what's available.`

  try {
    // Get user's preferred model for voice processing
    const model = await getModelForTask(userId, 'voice-processing')
    const taskConfig = getTaskConfig('voice-processing')
    
    const response = await anthropic!.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      temperature: taskConfig.defaultTemperature,
      messages: [{
        role: 'user',
        content: analysisPrompt
      }]
    })

    // Track credits for this AI call
    await trackCreditsAfterCall(userId, 'voice-notes/process', model, response.usage)

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Parse JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response')
    }

    const analysis = JSON.parse(jsonMatch[0])
    apiLogger.success('voice-notes/process', 'Claude analysis complete')

    // Save to Firestore
    const recordingData = {
      id: recordingId,
      userId,
      title,
      date: Timestamp.now(),
      duration,
      audioUrl,
      transcript: analysis.enhancedTranscript || transcriptText,
      transcriptWithTimestamps: analysis.transcriptWithTimestamps || [],
      summary: analysis.summary,
      actionItems: analysis.actionItems || [],
      nextSteps: analysis.nextSteps || [],
      keyMoments: analysis.keyMoments || [],
      speakers: analysis.speakers || [],
      sentiment: analysis.sentiment || 'neutral',
      tags: analysis.tags || ['general'],
      questions: analysis.questions || [],
      decisions: analysis.decisions || [],
      commitments: analysis.commitments || [],
      template: templateType,
      starred: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }

    await db.collection('voiceNotes').doc(recordingId).set(recordingData)
    apiLogger.success('voice-notes/process', `Saved to Firestore: ${recordingId}`)

    return {
      recordingId,
      audioUrl,
      transcript: analysis.enhancedTranscript || transcriptText,
      transcriptWithTimestamps: analysis.transcriptWithTimestamps || [],
      summary: analysis.summary,
      actionItems: analysis.actionItems || [],
      nextSteps: analysis.nextSteps || [],
      keyMoments: analysis.keyMoments || [],
      speakers: analysis.speakers || [],
      sentiment: analysis.sentiment || 'neutral',
      tags: analysis.tags || ['general'],
      questions: analysis.questions || [],
      decisions: analysis.decisions || [],
      commitments: analysis.commitments || []
    }
  } catch (error) {
    apiLogger.apiError('voice-notes/process', 'Claude processing error', error)
    
    // Fallback: save with basic data
    const fallbackData = {
      id: recordingId,
      userId,
      title,
      date: Timestamp.now(),
      duration,
      audioUrl,
      transcript: transcriptText,
      transcriptWithTimestamps: [],
      summary: 'Processing completed. Review the transcript and audio for details.',
      actionItems: ['Review recording'],
      nextSteps: ['Follow up on discussion points'],
      keyMoments: [],
      speakers: [{ name: 'Speaker 1', segments: 1 }],
      sentiment: 'neutral' as const,
      tags: ['general'],
      questions: [],
      decisions: [],
      commitments: [],
      template: templateType,
      starred: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }

    await db.collection('voiceNotes').doc(recordingId).set(fallbackData)
    apiLogger.success('voice-notes/process', `Saved with fallback data: ${recordingId}`)

    return {
      recordingId,
      audioUrl,
      transcript: transcriptText,
      transcriptWithTimestamps: [],
      summary: fallbackData.summary,
      actionItems: fallbackData.actionItems,
      nextSteps: fallbackData.nextSteps,
      keyMoments: [],
      speakers: fallbackData.speakers,
      sentiment: 'neutral',
      tags: ['general'],
      questions: [],
      decisions: [],
      commitments: []
    }
  }
}

