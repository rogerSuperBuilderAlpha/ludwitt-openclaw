import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { extractMeetingLink, detectMeetingType } from '@/lib/voice-notes/calendar'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    // Get calendar integration
    const integrationDoc = await db.collection('calendarIntegrations').doc(userId).get()
    
    if (!integrationDoc.exists) {
      return NextResponse.json(
        { error: 'Calendar not connected' },
        { status: 404 }
      )
    }

    const integration = integrationDoc.data()!

    // Check if token expired and refresh if needed
    const now = Date.now()
    const expiresAt = integration.expiresAt.toMillis()
    
    let accessToken = integration.accessToken

    if (now >= expiresAt) {
      // Refresh token
      const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CALENDAR_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET!,
          refresh_token: integration.refreshToken,
          grant_type: 'refresh_token'
        })
      })

      if (!refreshResponse.ok) {
        throw new Error('Failed to refresh token')
      }

      const newTokens = await refreshResponse.json()
      accessToken = newTokens.access_token

      // Update stored token
      await db.collection('calendarIntegrations').doc(userId).update({
        accessToken: newTokens.access_token,
        expiresAt: new Date(Date.now() + (newTokens.expires_in * 1000)),
        updatedAt: new Date()
      })
    }

    // Fetch calendar events
    const { days = 7 } = await request.json()
    
    const timeMin = new Date().toISOString()
    const timeMax = new Date(Date.now() + (days * 24 * 60 * 60 * 1000)).toISOString()

    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
      `timeMin=${encodeURIComponent(timeMin)}&` +
      `timeMax=${encodeURIComponent(timeMax)}&` +
      `singleEvents=true&` +
      `orderBy=startTime`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )

    if (!calendarResponse.ok) {
      throw new Error('Failed to fetch calendar events')
    }

    const calendarData = await calendarResponse.json()

    // Transform events and extract meeting links
    const events = (calendarData.items || []).map((event: any) => {
      const meetingLink = extractMeetingLink(event)
      const meetingType = meetingLink ? detectMeetingType(meetingLink) : undefined

      return {
        id: event.id,
        title: event.summary || 'Untitled Event',
        startTime: event.start.dateTime || event.start.date,
        endTime: event.end.dateTime || event.end.date,
        attendees: (event.attendees || []).map((a: any) => a.email),
        meetingLink,
        meetingType,
        description: event.description,
        location: event.location
      }
    })

    // Filter to only events with meeting links
    const meetingEvents = events.filter((e: any) => e.meetingLink)

    return NextResponse.json({
      success: true,
      events: meetingEvents,
      allEvents: events
    })
  } catch (error) {
    apiLogger.apiError('voice-notes/calendar/events', 'Failed to fetch events', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to fetch events') },
      { status: 500 }
    )
  }
}

