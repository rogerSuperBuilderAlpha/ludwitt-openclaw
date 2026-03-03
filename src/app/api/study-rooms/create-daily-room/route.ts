/**
 * Create Daily.co room for study sessions
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

    const { roomId, roomName } = await request.json()

    if (!roomId || !roomName) {
      return badRequestError('Missing required fields')
    }

    // Check if Daily API key is configured
    const dailyApiKey = process.env.DAILY_API_KEY
    if (!dailyApiKey) {
      apiLogger.validationError('study-rooms/create-daily-room', 'Daily API key not configured')
      return NextResponse.json(
        { error: 'Video conferencing not configured', roomUrl: null },
        { status: 200 }
      )
    }

    // Create Daily room
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dailyApiKey}`,
      },
      body: JSON.stringify({
        name: `study-room-${roomId}`,
        privacy: 'private',
        properties: {
          enable_screenshare: true,
          enable_chat: true,
          enable_knocking: false,
          start_video_off: true,
          start_audio_off: false,
          max_participants: 6,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4, // 4 hours
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      apiLogger.apiError('study-rooms/create-daily-room', 'Failed to create Daily.co room', error)
      
      // If room already exists, get it instead
      if (response.status === 400) {
        const getResponse = await fetch(
          `https://api.daily.co/v1/rooms/study-room-${roomId}`,
          {
            headers: {
              'Authorization': `Bearer ${dailyApiKey}`,
            },
          }
        )
        
        if (getResponse.ok) {
          const room = await getResponse.json()
          return NextResponse.json({ roomUrl: room.url })
        }
      }
      
      return serverError(null, 'Failed to create video room')
    }

    const room = await response.json()
    return NextResponse.json({ roomUrl: room.url })
  } catch (error) {
    apiLogger.apiError('study-rooms/create-daily-room', 'Daily.co API error', error)
    return serverError(error)
  }
}

