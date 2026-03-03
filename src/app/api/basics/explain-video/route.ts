/**
 * API Route: POST /api/basics/explain-video
 *
 * Generates an explanation video using D-ID API
 * Creates AI avatar lecture explaining the concept
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, serviceUnavailableError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields, validateSubject } from '@/lib/api/validators'
import { buildVideoScriptPrompt } from '@/lib/basics/prompt-builders'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { mapDIDStatusToInternal } from '@/lib/utils/video-helpers'
import { isVideoServiceAvailable, isAIGenerationAvailable } from '@/lib/basics/config'
import { withCreditTracking } from '@/lib/credits'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import Anthropic from '@anthropic-ai/sdk'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import {
  VideoExplanationRequest,
  VideoExplanationResponse,
  DIDCreateTalkRequest,
  DIDCreateTalkResponse
} from '@/lib/types/video-explanation'

const anthropic = isAIGenerationAvailable()
  ? new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || ''
    })
  : null

export async function POST(request: NextRequest) {
  apiLogger.routeCall('explain-video')
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    apiLogger.authSuccess('explain-video', userId)

    // Parse request body
    const body: VideoExplanationRequest = await request.json()
    const { problemId, subject, problemText, difficulty, type } = body
    apiLogger.debug('explain-video', 'Generating explanation', { data: { subject, type, difficulty } })

    // Validate required fields
    const requiredFieldsError = validateRequiredFields(body, ['problemId', 'subject', 'problemText'])
    if (requiredFieldsError) return requiredFieldsError
    
    // Validate subject
    const subjectError = validateSubject(subject)
    if (subjectError) return subjectError

    // Check if services are available
    if (!isVideoServiceAvailable()) {
      apiLogger.apiError('explain-video', 'D-ID API key not configured')
      return serviceUnavailableError('Video service not configured')
    }
    
    if (!isAIGenerationAvailable()) {
      apiLogger.apiError('explain-video', 'Anthropic API key not configured')
      return serviceUnavailableError('AI service not configured')
    }

    // Check if we have a cached video for this problem
    apiLogger.debug('explain-video', 'Checking for cached video')
    const cachedVideoRef = db.collection('videoExplanations').doc(problemId)
    const cachedVideo = await cachedVideoRef.get()

    if (cachedVideo.exists) {
      const cachedData = cachedVideo.data()
      apiLogger.success('explain-video', 'Found cached video', { data: { videoId: cachedData?.videoId } })

      // Return cached video immediately
      return successResponse({
        videoId: cachedData?.videoId || '',
        status: cachedData?.status || 'done',
        videoUrl: cachedData?.videoUrl,
        message: 'Video loaded from cache',
        cached: true
      })
    }

    apiLogger.debug('explain-video', 'No cached video found, generating new one')

    // Generate explanation script using Claude
    apiLogger.debug('explain-video', 'Generating script with Claude')
    const scriptPrompt = buildVideoScriptPrompt({
      subject,
      problemText,
      difficulty,
      type
    })

    if (!anthropic) {
      return serviceUnavailableError('AI service not available')
    }

    // Get user's preferred model for video script tasks
    const model = await getModelForTask(userId, 'video-script')
    const taskConfig = getTaskConfig('video-script')

    // Execute AI call with credit tracking
    const creditResult = await withCreditTracking(userId, 'explain-video', async () => {
      const response = await anthropic!.messages.create({
        model,
        max_tokens: taskConfig.defaultMaxTokens,
        temperature: taskConfig.defaultTemperature,
        messages: [{
          role: 'user',
          content: scriptPrompt
        }]
      })

      return {
        response,
        usage: response.usage,
        model,
      }
    })

    // Check if credit tracking returned an error response
    if (creditResult instanceof NextResponse) {
      return creditResult
    }

    const script = creditResult.result.content[0].type === 'text' ? creditResult.result.content[0].text : ''
    apiLogger.debug('explain-video', 'Script generated', { data: { length: script.length, costCharged: creditResult.costCharged } })

    // Create video with D-ID
    apiLogger.debug('explain-video', 'Calling D-ID API')
    const didRequest: DIDCreateTalkRequest = {
      script: {
        type: 'text',
        input: script,
        provider: {
          type: 'microsoft',
          voice_id: 'en-US-JennyNeural' // Friendly female voice
        }
      },
      source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg', // Default D-ID presenter
      config: {
        stitch: true,
        result_format: 'mp4'
      }
    }

    const didResponse = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${process.env.DID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(didRequest)
    })

    if (!didResponse.ok) {
      const error = await didResponse.text()
      apiLogger.apiError('explain-video', 'D-ID API error', new Error(error))
      return serverError(new Error('D-ID API error'), 'Failed to create video')
    }

    const didData: DIDCreateTalkResponse = await didResponse.json()
    apiLogger.success('explain-video', 'Video created', { data: { videoId: didData.id, status: didData.status } })

    // Save video info to Firestore for caching
    apiLogger.debug('explain-video', 'Saving video to Firestore for future use')
    const mappedStatus = mapDIDStatusToInternal(didData.status)
    await cachedVideoRef.set({
      videoId: didData.id,
      status: mappedStatus,
      problemId,
      subject,
      difficulty,
      type,
      createdAt: createISOTimestamp(),
      createdBy: userId
    })

    return successResponse({
      videoId: didData.id,
      status: mappedStatus,
      message: 'Video is being generated. This usually takes 1-2 minutes.'
    })
  } catch (error) {
    return serverError(error, 'Failed to generate explanation video')
  }
}
