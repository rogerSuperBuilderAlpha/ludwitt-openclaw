import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { joinMeetingWithRecall, scheduleMeetingBot } from '@/lib/voice-notes/meeting-bot'
import { Timestamp } from 'firebase-admin/firestore'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    const { eventId, enabled, meetingLink, eventTitle } = await request.json()

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID required' },
        { status: 400 }
      )
    }

    if (enabled) {
      // Enable auto-join for this event
      const recallApiKey = process.env.RECALL_AI_API_KEY

      if (!recallApiKey) {
        return NextResponse.json(
          { error: 'Meeting bot service not configured. See MEETING_BOT_SETUP.md for instructions.' },
          { status: 503 }
        )
      }

      // Schedule bot to join meeting
      try {
        const { botId } = await joinMeetingWithRecall(
          meetingLink,
          eventTitle,
          recallApiKey
        )

        // Save bot instance to Firestore
        await db.collection('meetingBots').doc(botId).set({
          userId,
          eventId,
          meetingLink,
          eventTitle,
          provider: 'recall-ai',
          status: 'scheduled',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        })

        apiLogger.success('voice-notes/calendar/auto-join', `Scheduled bot ${botId} for event ${eventId}`)

        return NextResponse.json({
          success: true,
          botId,
          message: 'Bot scheduled to join meeting'
        })
      } catch (error) {
        apiLogger.apiError('voice-notes/calendar/auto-join', 'Failed to schedule bot', error)
        return NextResponse.json(
          { error: getErrorMessage(error, 'Failed to schedule bot') },
          { status: 500 }
        )
      }
    } else {
      // Disable auto-join (cancel bot if exists)
      // Bot cancellation on auto-join disable is a planned feature
      return NextResponse.json({
        success: true,
        message: 'Auto-join disabled'
      })
    }
  } catch (error) {
    apiLogger.apiError('voice-notes/calendar/auto-join', 'Failed to toggle auto-join', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to toggle auto-join') },
      { status: 500 }
    )
  }
}

