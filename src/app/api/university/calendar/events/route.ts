import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    const { searchParams } = new URL(request.url)
    const month = parseInt(searchParams.get('month') || '', 10)
    const year = parseInt(searchParams.get('year') || '', 10)

    if (!month || !year || month < 1 || month > 12) {
      return badRequestError('Valid month and year are required')
    }

    // Get calendar integration
    const integrationDoc = await db.collection('calendarIntegrations').doc(userId).get()
    if (!integrationDoc.exists) {
      return NextResponse.json({ error: 'Calendar not connected' }, { status: 404 })
    }

    const integration = integrationDoc.data()!
    let accessToken = integration.accessToken

    // Refresh token if expired
    const now = Date.now()
    const expiresAt = integration.expiresAt.toMillis()

    if (now >= expiresAt) {
      const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CALENDAR_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET!,
          refresh_token: integration.refreshToken,
          grant_type: 'refresh_token',
        }),
      })

      if (!refreshResponse.ok) {
        throw new Error('Failed to refresh token')
      }

      const newTokens = await refreshResponse.json()
      accessToken = newTokens.access_token

      await db.collection('calendarIntegrations').doc(userId).update({
        accessToken: newTokens.access_token,
        expiresAt: new Date(Date.now() + (newTokens.expires_in * 1000)),
        updatedAt: new Date(),
      })
    }

    // Compute time range for the full month
    const timeMin = new Date(year, month - 1, 1).toISOString()
    const timeMax = new Date(year, month, 1).toISOString()

    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
      `timeMin=${encodeURIComponent(timeMin)}&` +
      `timeMax=${encodeURIComponent(timeMax)}&` +
      `singleEvents=true&` +
      `orderBy=startTime&` +
      `maxResults=250`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    if (!calendarResponse.ok) {
      throw new Error('Failed to fetch calendar events')
    }

    const calendarData = await calendarResponse.json()

    const events = (calendarData.items || []).map((event: Record<string, unknown>) => {
      const start = event.start as Record<string, string> | undefined
      const end = event.end as Record<string, string> | undefined
      const isAllDay = !start?.dateTime

      let date: string
      let startTime: string
      let endTime: string

      if (isAllDay) {
        date = (start?.date || '').slice(0, 10)
        startTime = '00:00'
        endTime = '23:59'
      } else {
        const startDT = new Date(start!.dateTime)
        const endDT = new Date(end?.dateTime || start!.dateTime)
        date = startDT.toISOString().split('T')[0]
        startTime = startDT.toTimeString().slice(0, 5)
        endTime = endDT.toTimeString().slice(0, 5)
      }

      return {
        id: event.id,
        title: (event.summary as string) || 'Untitled Event',
        date,
        startTime,
        endTime,
        isAllDay,
        location: (event.location as string) || undefined,
      }
    })

    return successResponse({ events })
  } catch (error) {
    return serverError(error, 'Failed to fetch calendar events')
  }
}
