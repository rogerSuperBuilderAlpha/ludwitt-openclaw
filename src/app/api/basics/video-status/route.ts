/**
 * API Route: GET /api/basics/video-status?videoId=xxx
 *
 * Checks the status of a D-ID video generation
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError, serviceUnavailableError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields } from '@/lib/api/validators'
import { getQueryParam } from '@/lib/api/request-helpers'
import { Collections } from '@/lib/basics/collections'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { mapDIDStatusToInternal } from '@/lib/utils/video-helpers'
import { isVideoServiceAvailable } from '@/lib/basics/config'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import {
  VideoStatusResponse,
  DIDGetTalkResponse
} from '@/lib/types/video-explanation'

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    // Get video ID from query params
    const videoId = getQueryParam(request, 'videoId')

    // Validate required fields
    const requiredFieldsError = validateRequiredFields({ videoId }, ['videoId'])
    if (requiredFieldsError) return requiredFieldsError

    // Check if D-ID API key is configured
    if (!isVideoServiceAvailable()) {
      return serviceUnavailableError('Video service not configured')
    }

    // Check video status with D-ID
    const didResponse = await fetch(`https://api.d-id.com/talks/${videoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${process.env.DID_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!didResponse.ok) {
      const error = await didResponse.text()
      apiLogger.apiError('video-status', 'D-ID API error', new Error(error))
      return serverError(new Error('D-ID API error'), 'Failed to check video status')
    }

    const didData: DIDGetTalkResponse = await didResponse.json()
    apiLogger.debug('video-status', 'Video status checked', { data: { videoId, status: didData.status } })

    // Map D-ID status to our status type
    const mappedStatus = mapDIDStatusToInternal(didData.status)

    // If video is complete, update Firestore cache with the video URL
    if (mappedStatus === 'done' && didData.result_url) {
      apiLogger.debug('video-status', 'Video complete, updating Firestore cache')

      // Find the cached video document by videoId
      const videoExplanationsRef = db.collection(Collections.VIDEO_EXPLANATIONS)
      const snapshot = await videoExplanationsRef.where('videoId', '==', videoId).limit(1).get()

      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        await doc.ref.update({
          status: mappedStatus,
          videoUrl: didData.result_url,
          completedAt: createISOTimestamp()
        })
        apiLogger.success('video-status', 'Cache updated', { data: { problemId: doc.id } })
      }
    }

    return successResponse({
      videoId: didData.id,
      status: mappedStatus,
      videoUrl: didData.result_url,
      resultUrl: didData.result_url
    })
  } catch (error) {
    return serverError(error, 'Failed to check video status')
  }
}
